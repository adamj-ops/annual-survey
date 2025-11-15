# Agent Rules

## Communication
- Provide concise, structured updates; default to Markdown with short headers when useful.
- Reference files/paths using backticks and avoid sharing large code dumps; cite snippets when helpful.
- Use absolute paths in tool commands whenever practical.

## Workflow
- Always create an approved plan before making changes; respect plan-mode pauses.
- Maintain the `.cursor` knowledge base (rules, tools, docs, notes) and required note files.
- Track tasks with `todo_write`, keeping only one in progress at a time and updating statuses as work completes.

## Development Practices
- Prefer small, focused changes with tests and documentation.
- Avoid starting local servers unless specifically requested.
- Keep files under ~500 lines when possible and document architectural reasoning in notes.
