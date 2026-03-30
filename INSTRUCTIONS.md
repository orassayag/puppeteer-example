# Instructions

## Setup Instructions

1. Open the project in your IDE (VSCode recommended)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install MongoDB locally or have access to a MongoDB instance

## Configuration

### Settings File

Edit `src/settings/settings.js` to configure the application:

#### Test Mode
```javascript
IS_TEST_MODE: true  // Use local sources for testing
IS_TEST_MODE: false // Use live Puppeteer crawling
```

#### Search Engine
```javascript
SEARCH_ENGINE_TYPE: 'bing' // Currently only Bing is supported
```

#### Goals and Limits
```javascript
GOAL: 1000 // Maximum email addresses to collect
MAXIMUM_SEARCH_PROCESSES_COUNT: 100 // Max number of search processes
SEARCH_ENGINE_PAGES_COUNT_PER_PROCESS: 3 // Pages to crawl per process
```

#### Database Connection
```javascript
MONGO_DATA_BASE_CONNECTION_STRING: 'mongodb://localhost:27017/crawl'
```
Update this with your MongoDB connection string.

### Search Keys Configuration

Edit `src/core/lists/searchKeys.list.js` to customize search terms:

- `want`: Job search keywords (e.g., "דרושה", "דרוש")
- `profession`: Job titles and professions to search for
- `city`: Cities to include in searches
- `email`: Email-related keywords in different languages

### Filter Keys

Edit `src/core/lists/filterKeys.list.js` to customize filtering logic for search results.

## Running the Application

### Start the Crawler
```bash
npm start
```

This will:
1. Initialize the database connection
2. Start the crawling process based on configured search keys
3. Extract URLs from search results
4. Parse email addresses from found pages
5. Validate and clean email addresses
6. Store unique email addresses in MongoDB

## How It Works

### 1. Search Process
The application constructs search queries by combining:
- Job want keywords (דרושה/דרוש)
- Profession types (מנהלת/פקידת/etc.)
- City names (כפר-סבא/רעננה/etc.)

### 2. URL Extraction
Puppeteer navigates to search engine results and extracts all URLs from the page content.

### 3. Email Collection
- Extracts email addresses using regex patterns
- Applies extensive cleaning and validation
- Fixes common Israeli domain issues (.co.il, .org.il, etc.)
- Validates using the `validator` library

### 4. Data Storage
Valid email addresses are stored in MongoDB with a unique constraint to prevent duplicates.

## Development

### Project Structure

```
puppeteer-example/
├── src/
│   ├── core/
│   │   ├── enums/          # Enums and enum utilities
│   │   ├── lists/          # Search and filter keys
│   │   └── models/         # MongoDB models
│   ├── logics/             # Business logic
│   ├── scripts/            # Entry point scripts
│   ├── services/           # Service layer (DB, setup, etc.)
│   ├── settings/           # Configuration files
│   └── utils/              # Utility functions
├── sources/                # Local test sources (test mode)
├── dist/                   # Output directory
└── package.json
```

### Test Mode

For development and testing without live crawling:

1. Set `IS_TEST_MODE: true` in settings
2. Place test HTML files in `sources/` directory
3. The application will use local files instead of making live requests

### Live Crawling Mode

For production use:

1. Set `IS_TEST_MODE: false` in settings
2. Ensure stable internet connection
3. Monitor for rate limiting from search engines
4. Consider adding delays between requests

## Database Schema

### EmailAddress Collection
```javascript
{
  emailAddress: String (required, unique, trimmed)
}
```

## Error Handling

The application includes:
- MongoDB connection error handling
- Puppeteer navigation timeout handling (set to 0 for unlimited)
- Email validation and cleaning with fallback
- Resource blocking for faster page loads (images, stylesheets, fonts, scripts)

## Performance Optimization

The application optimizes Puppeteer by:
- Blocking unnecessary resources (images, CSS, fonts, scripts)
- Setting request interception
- Using `waitUntil: 'load'` strategy
- Closing browser after each operation

## Notes

- The application was built for Hebrew job search queries
- Email cleaning includes Israeli-specific domain fixes
- MongoDB must be running before starting the application
- In test mode, no internet connection is required
- Resource blocking significantly improves crawling speed

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in settings
- Verify MongoDB port (default: 27017)

### Puppeteer Issues
- Install Chromium dependencies if on Linux
- Check for Puppeteer installation errors
- Try updating Puppeteer: `npm update puppeteer`

### No Results Found
- Verify search keys are properly configured
- Check if search engine changed its HTML structure
- Try test mode with known good HTML files

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag
