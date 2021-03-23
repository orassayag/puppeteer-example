const pathUtils = require('../utils/files/path.utils');

const searchEmailAddressesSettings = {
    // ===FLAG=== //
    // Determine if to load local sources (engine and pages) or to do real requests for
    // sources with puppeteer.js NPM packages.
    IS_TEST_MODE: true,

    // ===TYPE=== //
    // Determine which search engine to crawl on. For now, only 'bing' is available.
    SEARCH_ENGINE_TYPE: 'bing',

    // ===COUNT & LIMIT=== //
    // Determine the maximum email address count to reach, until to stop running processes.
    // What will come first - MAXIMUM_SEARCH_PROCESSES_COUNT - or this.
    GOAL: 1000,

    // Determine how many processes to run during a single lifetime of the application.
    MAXIMUM_SEARCH_PROCESSES_COUNT: 100,
    // Determine how many pages to pager with the search engine during a single process.
    SEARCH_ENGINE_PAGES_COUNT_PER_PROCESS: 3,

    // ===PATH=== //
    // Determine the path of all the local sources (engine and page) for the test mode.
    SOURCES_PATH: pathUtils.getJoinPath({
        targetPath: __dirname,
        targetName: `../../sources/`
    }),

    DIST_PATH: pathUtils.getJoinPath({
        targetPath: __dirname,
        targetName: `../../dist/`
    }),

    // ===DATA BASE=== //
    // Determine the connection string path of the Mongo database.
    MONGO_DATA_BASE_CONNECTION_STRING: 'mongodb://localhost:27017/crawl'
};

module.exports = searchEmailAddressesSettings;