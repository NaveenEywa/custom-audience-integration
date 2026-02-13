# Claude Agents Configuration

This directory contains the configuration for Claude Code agents used in our CI/CD pipeline.

## Files

- `config.json` - Main configuration for Claude code review behavior

## How it works

When Claude reviews PRs, it follows the instructions in `config.json`:

1. **References CLAUDE.md** for our team's coding standards
2. **Focuses on** security, quality, and maintainability
3. **Flags critical changes** that need human review
4. **Provides constructive feedback** with examples

## Modifying the config

To update Claude's review behavior:

1. Edit `config.json`
2. Commit changes
3. New PRs will use the updated configuration

## Review Focus Areas

- Code quality and maintainability
- Security vulnerabilities
- Performance implications
- Test coverage
- Documentation completeness
- Adherence to Eywa standards

## Customization Examples

### Stricter Security
```json
"security_priorities": [
  "All input validation mandatory",
  "Zero tolerance for hardcoded secrets"
]
```

### Focus on Performance
```json
"review_focus": [
  "Performance implications",
  "Database query optimization",
  "Caching strategies"
]
```

### Educational Tone
```json
"tone": "constructive and educational",
"provide_examples": true,
"explain_reasoning": true
```
