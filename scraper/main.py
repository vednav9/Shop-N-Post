"""
Shop-N-Post Scraper Main Module
Entry point for the web scraping service
"""

import asyncio
import logging
import os
import sys
from pathlib import Path

# Add src directory to path
sys.path.insert(0, str(Path(__file__).parent / "src"))

from src.config.settings import settings
from src.utils.logger import setup_logger
from src.scrapers.scheduler import ScraperScheduler
from src.utils.database import DatabaseManager


async def main():
    """Main entry point for the scraper service"""
    
    # Setup logging
    logger = setup_logger(__name__)
    logger.info("🚀 Starting Shop-N-Post Scraper Service")
    
    try:
        # Initialize database connections
        db_manager = DatabaseManager()
        await db_manager.connect()
        logger.info("📁 Database connections established")
        
        # Initialize scheduler
        scheduler = ScraperScheduler(db_manager)
        
        if settings.ENABLE_SCHEDULER:
            logger.info("⏰ Starting scheduled scraping service")
            await scheduler.start()
        else:
            logger.info("🔄 Running one-time scraping operation")
            await scheduler.run_once()
            
    except KeyboardInterrupt:
        logger.info("⏹️ Received shutdown signal")
    except Exception as e:
        logger.error(f"❌ Fatal error: {e}", exc_info=True)
        sys.exit(1)
    finally:
        logger.info("🔄 Cleaning up resources")
        if 'db_manager' in locals():
            await db_manager.close()
        logger.info("👋 Scraper service stopped")


if __name__ == "__main__":
    asyncio.run(main())
