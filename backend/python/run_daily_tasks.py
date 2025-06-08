import os
import logging
from datetime import datetime
from dotenv import load_dotenv

# Absolute imports from your package
from backend.python.scraper import scrape_and_store_scholarships
from backend.python.recommend_scholarships import generate_recommendations

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('daily_tasks.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def run_daily_tasks():
    try:
        # Load .env (if you’re using one locally)
        load_dotenv()

        logger.info("Starting daily scholarship update process")
        start_time = datetime.now()

        logger.info("Starting scholarship scraping")
        scrape_and_store_scholarships()
        logger.info("Completed scholarship scraping")

        logger.info("Starting recommendation generation")
        generate_recommendations()
        logger.info("Completed recommendation generation")

        duration = datetime.now() - start_time
        logger.info(f"Daily tasks completed successfully in {duration}")

    except Exception:
        logger.exception("Error in daily tasks")
        raise

if __name__ == "__main__":
    run_daily_tasks()
