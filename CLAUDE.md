# Eywa Coding Standards

## Code Style
- Use meaningful variable and function names
- Follow language-specific conventions (PEP 8 for Python, ESLint for JavaScript)
- Maximum line length: 100 characters
- Use consistent indentation (2 or 4 spaces)
- No commented-out code in production

## Documentation
- All functions must have docstrings/comments explaining purpose, parameters, and return values
- Update README.md for any new features
- Include inline comments for complex logic

## Testing
- Minimum 80% code coverage required
- Write unit tests for all new functions
- Include integration tests for API endpoints
- Test edge cases and error handling

## Security
- No hardcoded credentials or API keys
- Sanitize all user inputs
- Use environment variables for configuration
- Follow OWASP security guidelines
- Regular dependency updates

## Git Practices
- Commit messages must be descriptive and follow conventional commits
- One feature per pull request
- Reference issue numbers in commits (e.g., "fixes #123")
- Keep commits atomic and focused

## Code Review Guidelines
- All PRs require at least one approval
- Address all review comments before merging
- Run all tests locally before creating PR
