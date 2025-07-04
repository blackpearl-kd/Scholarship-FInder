# 🎓 Scholarship Finder Tool (Scholar Hub)

## 🧩 Problem Statement

Finding relevant scholarships is often time-consuming and overwhelming for students. Many available opportunities are scattered across various platforms, with differing eligibility criteria, deadlines, and unclear application processes. Our Scholarship Finder tool aims to **simplify and automate** this search, ensuring that students discover scholarships that truly match their academic background, location, and personal needs.

---

## 🎯 Goals

- Automatically **scrape and aggregate** scholarships from multiple trusted sources.
- Enable students to input their **personal profiles** (course, GPA, location, etc.) to receive tailored results.
- Use a **matching algorithm** to sort and recommend scholarships based on relevance and urgency.
- Present a clean, accessible UI for browsing and applying to scholarships.

---

## ⚙️ Tech Stack / Frameworks Used

| Layer        | Tools / Frameworks |
|--------------|--------------------|
| Frontend     | HTML, CSS, React.js, Typescript |
| Backend      | Node.js, Express.js |
| Scraping     | BeautifulSoup, Selenium|
| Sentiment Analysis | TextBlob |
| Database     | MongoDB |

---

## 🚀 Features

### 🔐 Student Profile Section
- Input fields for:
  - Course of study
  - GPA / Grades
  - Location
  - Optional: Income status, Special categories (minority, disability, etc.)

### 🕸️ Web Scraping Sources
- Major platforms like:
  - Chegg
  - Scholarships.com
  - Fastweb
- University-specific portals
- Niche platforms for demographic or field-specific opportunities

### 🧠 Scholarship Categorization & Matching
- Attributes:
  - **Amount**: Full / Partial / Small Grants
  - **Eligibility**: Based on course, GPA, region, income, etc.
  - **Deadline**: Filter by urgency (notifications for upcoming ones)

### 📄 Personalized Scholarship List
- Ranks scholarships by:
  - Profile relevance
  - Deadline urgency
  - Scholarship amount
- Each entry includes:
  - Eligibility summary
  - Application deadline
  - Award amount
  - Direct application link

---

### Automation
- This project uses GitHub Actions to automate workflows such as testing, deployment, or database operations with a secure connection to MongoDB.
Features
 - Automated CI/CD with GitHub Actions
 - Secure MongoDB connection using GitHub Secrets
 - Environment variable management for sensitive data

## 🚀 Deployment (on [Render](https://render.com))

We use [Render](https://render.com) to host both frontend and backend:

website: https://scholarship-finder-1-nq0u.onrender.com

