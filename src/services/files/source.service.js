const { pathUtils, fileUtils, textUtils, validationUtils } = require('../../utils');
const { SourceType } = require('../../core/enums/files/search.enum');

class SourceService {

    constructor() {
        this.isTestMode = null;
        this.sourcesPath = null;
        this.searchEngineSourcesList = null;
        this.pageSourcesList = null;
    }

    initiate(data) {
        const { isTestMode, sourcesPath } = data;
        this.isTestMode = isTestMode;
        this.sourcesPath = sourcesPath;

        if (isTestMode) {
            this.searchEngineSourcesList = [];
            this.pageSourcesList = [];
            this.loadAllTestModeSources();
        }
    }

    async loadAllTestModeSources() {
        await this.loadTestModeSourcesByType(SourceType.ENGINE);
        await this.loadTestModeSourcesByType(SourceType.PAGE);
    }

    async loadTestModeSourcesByType(sourceType) {
        const sourcePath = pathUtils.getJoinPath({
            targetPath: this.sourcesPath,
            targetName: sourceType
        });

        // Get all the files.
        let files = await fileUtils.getDirectoryFiles(sourcePath);

        // Validate that there is at least 1 file in the source directory.
        if (!validationUtils.isExists(files)) {
            throw new Error(`No any files exists in ${sourcePath} (1000118)`);
        }

        // Validate that there is at least 1 TXT file in the source directory.
        files = files.filter(f => {
            return pathUtils.isTypeFile({
                fileName: f,
                fileExtension: 'txt'
            });
        });

        // Validate that there is at least 1 TXT file in the source directory.
        if (!validationUtils.isExists(files)) {
            throw new Error(`No TXT files exists in ${sourcePath} (1000119)`);
        }

        for (let i = 0, length = files.length; i < length; i++) {
            const pageSource = await fileUtils.readFile(pathUtils.getJoinPath({
                targetPath: sourcePath,
                targetName: files[i]
            }));

            switch (sourceType) {
                case SourceType.ENGINE:
                    this.searchEngineSourcesList.push(pageSource);
                    break;
                case SourceType.PAGE:
                    this.pageSourcesList.push(pageSource);
                    break;
            }
        }
    }

    async getPageSource(data) {
        const { sourceType, pageURL } = data;
        let pageSource = null;
        if (this.isTestMode) {
            switch (sourceType) {
                case SourceType.ENGINE:
                    pageSource = textUtils.getRandomKeyFromArray(this.searchEngineSourcesList);
                    break;
                case SourceType.PAGE:
                    pageSource = textUtils.getRandomKeyFromArray(this.pageSourcesList);
                    break;
            }
        } else { }
        return pageSource;
    }
}

const sourceService = new SourceService();
module.exports = sourceService;