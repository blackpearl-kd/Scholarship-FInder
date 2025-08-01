from pymongo import MongoClient
import re

# Connect to MongoDB
client = MongoClient("mongodb+srv://test:test12345678!!@cluster0.ywto1wl.mongodb.net/")
db = client["scholarship_db"]
collection = db["scholarships"]

# ------------------------ #
# Mappings and Keywords
# ------------------------ #

states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
]

religions = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist"]

countries = ["India", "USA", "UK", "Canada", "Australia"]

education_levels = {
    "Class 10": ["class 10", "matric", "10th", "tenth"],
    "Class 12": ["class 12", "intermediate", "12th", "twelfth", "senior secondary"],
    "UG": ["undergraduate", "bachelor", "b.tech", "b.e", "bsc", "ba", "bcom"],
    "PG": ["postgraduate", "master", "m.tech", "m.e", "msc", "ma", "mcom"],
    "PhD": ["phd", "doctoral", "doctorate", "research scholar"]
}

# ------------------------ #
# Helper Functions
# ------------------------ #

def infer_single_field(text, keywords):
    for kw in keywords:
        if re.search(rf'\b{re.escape(kw)}\b', text, re.IGNORECASE):
            return kw
    return "Any"

def infer_multiple_fields(text, mapping):
    matched = set()
    for key, patterns in mapping.items():
        for pat in patterns:
            if re.search(rf'\b{re.escape(pat)}\b', text, re.IGNORECASE):
                matched.add(key)
    return list(matched) or ["Any"]

# ------------------------ #
# Main Update Loop
# ------------------------ #

def update_scholarship_fields():
    count = 0
    for doc in collection.find():
        # Combine searchable text from relevant fields
        combined_text = " ".join([
            str(doc.get("title", "")),
            str(doc.get("eligibility", "")),
            str(doc.get("how_to_apply", "")),
            str(doc.get("benefits", "")),
            str(doc.get("criteria", "")),
            str(doc.get("selection_criteria", "")),
        ]).lower()

        updated_fields = {
            "country": infer_single_field(combined_text, countries),
            "state": infer_single_field(combined_text, states),
            "religion": infer_single_field(combined_text, religions),
            "education_level": infer_multiple_fields(combined_text, education_levels)
        }

        collection.update_one({"_id": doc["_id"]}, {"$set": updated_fields})
        count += 1

    print(f"✅ Updated {count} scholarships with filtering fields.")

# Run the updater
update_scholarship_fields()
