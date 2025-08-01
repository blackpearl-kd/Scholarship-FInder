import time
import logging
import sys
import os
from datetime import datetime
from textblob import TextBlob  # pip install textblob

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
from webdriver_manager.chrome import ChromeDriverManager

from bs4 import BeautifulSoup
from pymongo import MongoClient

# ───── Logging Setup ───────────────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)

# ───── MongoDB Configuration ──────────────────────────────────────────────────
MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb+srv://test:test12345678!!@cluster0.ywto1wl.mongodb.net/"
)
DB_NAME = "scholarship_db"
COLLECTION_NAME = "scholarships"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# ───── Constants ───────────────────────────────────────────────────────────────
BASE_URL = "https://www.buddy4study.com/scholarships"

def get_driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)
    try:
        return webdriver.Chrome(
            service=ChromeService(ChromeDriverManager().install()),
            options=options
        )
    except WebDriverException as e:
        logger.error(f"WebDriver initialization failed: {e}")
        raise

def normalize_date(raw_date: str):
    """Convert date like '01-Aug-2025' to '2025-08-01'."""
    try:
        return datetime.strptime(raw_date.strip(), "%d-%b-%Y").strftime("%Y-%m-%d")
    except:
        return raw_date.strip()

def get_scholarship_list():
    driver = get_driver()
    try:
        driver.get(BASE_URL)
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CLASS_NAME, "Listing_categoriesBox__CiGvQ"))
        )
        time.sleep(1)
        soup = BeautifulSoup(driver.page_source, "html.parser")
        cards = soup.find_all("a", class_="Listing_categoriesBox__CiGvQ")

        scholarships = []
        for card in cards:
            try:
                title = card.find("h4", class_="Listing_scholarshipName__VLFMj").get_text(strip=True)
                link = "https://www.buddy4study.com" + card.get("href")
                img_tag = card.find("img")
                image_url = img_tag["src"] if img_tag else None

                award_blocks = card.find_all("div", class_="Listing_awardCont__qnjQK")
                amount = (
                    award_blocks[0].find("span").get_text(strip=True)
                    if len(award_blocks) > 0 else "N/A"
                )
                eligibility_summary = (
                    award_blocks[1].find("span").get_text(strip=True)
                    if len(award_blocks) > 1 else "N/A"
                )

                last_updated_tag = card.find("div", class_="Listing_categoriesRight__7Zjyu")
                last_updated = (
                    last_updated_tag.find("span").get_text(strip=True)
                    if last_updated_tag else "N/A"
                )

                scholarships.append({
                    "title": title,
                    "link": link,
                    "amount": amount,
                    "eligibility_summary": eligibility_summary,
                    "last_updated": last_updated,
                    "image_url": image_url
                })
            except Exception:
                continue
        return scholarships
    finally:
        driver.quit()

def extract_detailed_info(driver, url: str) -> dict:
    try:
        driver.get(url)
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CLASS_NAME, "ScholarshipDetails_aboutScholarship__yFqOS"))
        )
        time.sleep(1)
        soup = BeautifulSoup(driver.page_source, "html.parser")
        data = {}

        # --- About Program ---
        about_div = soup.find("div", class_="ScholarshipDetails_aboutProgram__6iIDA")
        data["about_program"] = about_div.get_text(separator=" ", strip=True) if about_div else None

        def get_section(title: str):
            h5 = soup.find("h5", string=lambda s: s and title.lower() in s.lower())
            return h5.find_next_sibling(["div", "article"]) if h5 else None

        # --- Eligibility ---
        eligibility_data = {}
        elig_h5 = soup.find("h5", string=lambda s: s and "eligibility" in s.lower())
        if elig_h5:
            deadline_span = elig_h5.find("span")
            deadline = None
            if deadline_span:
                raw = deadline_span.get_text(strip=True).replace("Deadline Date:", "").strip()
                deadline = normalize_date(raw)
            elig_div = elig_h5.find_next_sibling("div")
            criteria = [li.get_text(strip=True) for li in elig_div.find_all("li")] if elig_div else []
            eligibility_data = {"deadline_date": deadline, "criteria": criteria}
        data["eligibility"] = eligibility_data

        # --- Benefits ---
        ben_div = get_section("benefits")
        data["benefits"] = [li.get_text(strip=True) for li in ben_div.find_all("li")] if ben_div else []

        # --- Documents ---
        docs_div = get_section("documents")
        data["documents"] = [li.get_text(strip=True) for li in docs_div.find_all("li")] if docs_div else []

        # --- How to Apply ---
        apply_div = get_section("how can you apply")
        instructions, notes = [], []
        if apply_div:
            instructions = [p.get_text(separator=" ", strip=True) for p in apply_div.find_all("p")]
            notes = [li.get_text(strip=True) for li in apply_div.find_all("li")]
        data["how_to_apply"] = {"instructions": instructions, "notes": notes}

        # --- Important Dates ---
        dates_div = get_section("important dates")
        data["important_dates"] = dates_div.get_text(separator=" ", strip=True) if dates_div else None

        # --- Selection Criteria ---
        selection_div = get_section("selection criteria")
        data["selection_criteria"] = selection_div.get_text(separator=" ", strip=True) if selection_div else None

        # --- Terms & Conditions ---
        terms_div = get_section("terms and conditions")
        data["terms_and_conditions"] = [li.get_text(strip=True) for li in terms_div.find_all("li")] if terms_div else []

        # --- Contact Details ---
        contact_div = get_section("contact details")
        data["contact_details"] = contact_div.get_text(separator=" ", strip=True) if contact_div else None

        # --- Important Links ---
        links_div = get_section("important links")
        data["important_links"] = [{"text": a.get_text(strip=True), "href": a.get("href")} for a in links_div.find_all("a", href=True)] if links_div else []

        # --- FAQs ---
        faq_div = get_section("faq")
        faqs = []
        if faq_div:
            for p in faq_div.find_all("p"):
                text = p.get_text(" ", strip=True)
                if "Answer:" in text:
                    q, a = text.split("Answer:", 1)
                    faqs.append({"question": q.replace("Question:", "").strip(), "answer": a.strip()})
        data["faqs"] = faqs

        # --- Metadata defaults ---
        data["country"] = "Any"
        data["education_level"] = ["Any"]
        data["gender"] = "Any"
        data["religion"] = "Any"
        data["state"] = "Any"
        data["sentiment_score"] = float(TextBlob(data.get("about_program") or "").sentiment.polarity)
        data["scraped_at"] = datetime.utcnow().isoformat()

        return data

    except TimeoutException:
        logger.warning(f"Timeout while scraping {url}")
        return {}
    except Exception as e:
        logger.error(f"Error scraping {url}: {e}")
        return {}

def scrape_and_store_scholarships():
    all_scholarships = get_scholarship_list()
    if not all_scholarships:
        return

    driver = get_driver()
    try:
        for idx, scholarship in enumerate(all_scholarships, start=1):
            title = scholarship.get("title", "<no-title>")
            link = scholarship.get("link")
            logger.info(f"Started scraping: {title}")

            details = extract_detailed_info(driver, link)
            full_data = {**scholarship, **details}
            query = {"title": full_data["title"], "link": full_data["link"]}
            collection.update_one(query, {"$set": full_data}, upsert=True)
            logger.info(f"Updated: {title}")

            time.sleep(1)
    finally:
        driver.quit()

if __name__ == "__main__":
    try:
        scrape_and_store_scholarships()
    except KeyboardInterrupt:
        sys.exit(0)
