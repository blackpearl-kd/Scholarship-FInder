from datetime import datetime
from pymongo import MongoClient
import os

# MongoDB setup (adjust connection string as needed)
MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb+srv://test:test12345678!!@cluster0.ywto1wl.mongodb.net/"
)

client = MongoClient(MONGO_URI)
db = client["scholarship_finder"]
scholarships_collection = db["scholarships"]

# Sample student profile
student_profile = {
    "student_id": "S12345",
    "name": "John Doe",
    "gpa": 8.7,
    "course": "M.Sc. Data Science",
    "location": "Mumbai",
    "citizenship": "India",
    "degree_level": "Master",
    "start_date": "2025-09",
    "income_status": "Above_2L",
    "categories": ["OBC"],
    "current_status": "New Applicant",
    "interests": ["AI", "Innovation", "Leadership"]
}

def compute_match_score(student, scholarship):
    score = 0
    
    # Nationality match
    if "India" in scholarship.get('eligibility_summary', ''):
        score += 2

    # Degree level match
    if "Master" in scholarship.get('eligibility_summary', ''):
        score += 2

    # GPA match
    if student.get("gpa", 0) >= 7.5:
        score += 1.5

    # Interests vs selection criteria
    selection_text = scholarship.get("selection_criteria", "").lower()
    for interest in student.get("interests", []):
        if interest.lower() in selection_text:
            score += 1.5
            break

    # Deadline proximity
    try:
        deadline = datetime.strptime(scholarship['eligibility']['deadline_date'], "%d-%b-%Y")
        days_left = (deadline - datetime.now()).days
        score += 3 if days_left <= 7 else 2 if days_left <= 30 else 1
    except:
        pass

    # Amount type
    amount_text = scholarship.get("amount", "").lower()
    if "full" in amount_text:
        score += 2
    elif "partial" in amount_text:
        score += 1.5
    elif "grant" in amount_text:
        score += 1

    return score

def get_ranked_scholarships(student_profile):
    scholarships = scholarships_collection.find({})
    ranked_list = []

    for scholarship in scholarships:
        score = compute_match_score(student_profile, scholarship)
        ranked_list.append({
            "title": scholarship.get("title"),
            "score": score,
            "link": scholarship.get("link"),
            "deadline": scholarship.get("eligibility", {}).get("deadline_date", "")
        })

    ranked_list.sort(key=lambda x: x["score"], reverse=True)
    return ranked_list[:10]

if __name__ == "__main__":
    top_matches = get_ranked_scholarships(student_profile)
    for match in top_matches:
        print(f"{match['title']} - Score: {match['score']} - Deadline: {match['deadline']} - Link: {match['link']}")
