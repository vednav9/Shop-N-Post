"""
Configuration settings for the scraper service
"""

import os
from typing import List, Optional
from pydantic import BaseSettings, validator


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # Database Configuration
    MONGODB_URI: str = "mongodb://localhost:27017/shop-n-post"
    REDIS_URL: str = "redis://localhost:6379"
    REDIS_PASSWORD: Optional[str] = None
    
    # Scraper Configuration
    SCRAPER_DELAY: float = 1.0
    MAX_CONCURRENT_REQUESTS: int = 5
    REQUEST_TIMEOUT: int = 30
    MAX_RETRIES: int = 3
    RETRY_DELAY: float = 2.0
    
    # User Agents
    USE_RANDOM_USER_AGENT: bool = True
    CUSTOM_USER_AGENT: str = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    
    # Proxy Configuration
    USE_PROXY: bool = False
    PROXY_LIST: Optional[str] = None
    ROTATE_PROXY: bool = False
    
    # Selenium Configuration
    USE_SELENIUM: bool = False
    CHROME_DRIVER_PATH: Optional[str] = None
    HEADLESS_MODE: bool = True
    WINDOW_SIZE: str = "1920,1080"
    
    # Target Websites
    SCRAPE_AMAZON: bool = True
    SCRAPE_FLIPKART: bool = True
    SCRAPE_EBAY: bool = False
    SCRAPE_ETSY: bool = False
    
    # Data Processing
    CLEAN_DATA: bool = True
    NORMALIZE_PRICES: bool = True
    REMOVE_DUPLICATES: bool = True
    MIN_PRICE: float = 1.0
    MAX_PRICE: float = 999999.0
    
    # Scheduling
    ENABLE_SCHEDULER: bool = True
    SCRAPE_INTERVAL_HOURS: int = 24
    CLEANUP_INTERVAL_DAYS: int = 7
    
    # File Storage
    DATA_DIRECTORY: str = "./data"
    BACKUP_DIRECTORY: str = "./backups"
    LOG_DIRECTORY: str = "./logs"
    
    # Image Processing
    DOWNLOAD_IMAGES: bool = True
    IMAGE_QUALITY: int = 80
    MAX_IMAGE_SIZE: int = 1024
    ALLOWED_IMAGE_FORMATS: str = "jpg,jpeg,png,webp"
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_TO_FILE: bool = True
    LOG_ROTATION: bool = True
    MAX_LOG_SIZE: str = "10MB"
    BACKUP_COUNT: int = 5
    
    # Monitoring
    ENABLE_METRICS: bool = True
    METRICS_PORT: int = 8080
    HEALTH_CHECK_PORT: int = 8081
    
    # Rate Limiting
    REQUESTS_PER_MINUTE: int = 60
    BURST_LIMIT: int = 10
    
    # Error Handling
    CONTINUE_ON_ERROR: bool = True
    SAVE_FAILED_URLS: bool = True
    MAX_ERRORS_PER_SITE: int = 100
    
    # Data Quality
    MIN_DESCRIPTION_LENGTH: int = 50
    REQUIRED_FIELDS: str = "name,price,description"
    VALIDATE_IMAGES: bool = True
    CHECK_STOCK_STATUS: bool = True
    
    # API Integration
    BACKEND_API_URL: str = "http://localhost:5000/api"
    API_KEY: Optional[str] = None
    SYNC_INTERVAL_MINUTES: int = 30
    
    # Development
    DEBUG: bool = False
    VERBOSE: bool = False
    DRY_RUN: bool = False
    SAVE_RAW_HTML: bool = False
    
    @validator("ALLOWED_IMAGE_FORMATS")
    def parse_image_formats(cls, v):
        """Parse comma-separated image formats"""
        return [fmt.strip().lower() for fmt in v.split(",")]
    
    @validator("REQUIRED_FIELDS")
    def parse_required_fields(cls, v):
        """Parse comma-separated required fields"""
        return [field.strip() for field in v.split(",")]
    
    @validator("PROXY_LIST")
    def parse_proxy_list(cls, v):
        """Parse comma-separated proxy list"""
        if not v:
            return []
        return [proxy.strip() for proxy in v.split(",")]
    
    @validator("WINDOW_SIZE")
    def parse_window_size(cls, v):
        """Parse window size as tuple"""
        try:
            width, height = v.split(",")
            return (int(width.strip()), int(height.strip()))
        except:
            return (1920, 1080)
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()
