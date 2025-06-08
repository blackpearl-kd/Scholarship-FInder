import os
import logging
from datetime import datetime
from backend.python.scraper import scrape_and_store_scholarships
from recommend_scholarships import generate_recommendations
from dotenv import load_dotenv

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
        # Load environment variables
        load_dotenv()
        
        # Log start of process
        logger.info("Starting daily scholarship update process")
        start_time = datetime.now()
        
        # Run scraper
        logger.info("Starting scholarship scraping")
        scrape_and_store_scholarships()
        logger.info("Completed scholarship scraping")
        
        # Run recommendation engine
        logger.info("Starting recommendation generation")
        generate_recommendations()
        logger.info("Completed recommendation generation")
        
        # Log completion
        end_time = datetime.now()
        duration = end_time - start_time
        logger.info(f"Daily tasks completed successfully in {duration}")
        
    except Exception as e:
        logger.error(f"Error in daily tasks: {str(e)}", exc_info=True)
        raise

if __name__ == "__main__":
    run_daily_tasks() 
