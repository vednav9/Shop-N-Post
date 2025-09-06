# Shared Types and Utilities

This directory contains shared utilities, types, and configurations that can be used across different services (frontend, backend, scraper).

## Structure

```
shared/
├── types/          # TypeScript type definitions
├── utils/          # Shared utility functions
├── constants/      # Application constants
└── config/         # Shared configuration files
```

## Usage

These shared modules can be imported and used in any service:

```javascript
// Backend usage
const { API_ENDPOINTS } = require('../shared/constants/api');

// Frontend usage
import { formatCurrency } from '../shared/utils/formatters';

// Scraper usage
from shared.utils.validators import validate_product_data
```
