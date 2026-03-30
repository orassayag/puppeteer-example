# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/puppeteer-example/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Error messages or logs (if applicable)
   - Your environment details (OS, Node version, npm version)

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **JavaScript (ES6+)** with modern syntax
- **ESLint** for code quality

Before submitting:
```bash
# Install dependencies
npm install

# Test your changes
npm start
```

### Coding Standards

1. **Clear naming**: Use descriptive names for variables, functions, and classes
2. **Modular design**: Keep files focused on a single responsibility
3. **Error handling**: Add proper error handling with meaningful messages
4. **Documentation**: Add JSDoc comments for public methods and complex logic
5. **Constants**: Use configuration files for magic numbers and strings

### Adding New Features

When adding new features:
1. Update search keys in `src/core/lists/searchKeys.list.js` if adding new search terms
2. Add new services in `src/services/files/` following existing patterns
3. Update configuration in `src/settings/settings.js` if needed
4. Add utility functions in `src/utils/files/` for reusable logic
5. Test with both test mode and live mode

### Search Engine Support

When adding support for new search engines:
1. Add the engine type to settings
2. Create appropriate selectors and parsing logic
3. Test URL extraction thoroughly
4. Document the search engine configuration

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏
