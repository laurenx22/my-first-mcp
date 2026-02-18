- MCP Timer -

- What your server does and why it’s useful -
This MCP server provides a simple timer tool where you can start a timer you name. It is useful for anytime you need specific timers to track how long you spend on different tasks.


- Installation instructions -
1. Clone repository
2. Run "npm install"
3. Start server with "node index.js"
4. Connect to Claude
5. Use MCP confirguration: claude mcp add --transport stdio my-first-mcp -- node /full/path/to/my-first-mcp/index.js

- 2-3 usage examples -
1. You are trying to see how long it takes you to do a specific tasks.
2. You are doing multiple tasks at once and need to see how long they take you to do.

- Any limitations or known issues -
1. You must put in a name for the timer to start. If you do not put in a name Claude will ask you to provide one.
2. This is a stopwatch like timer so it only counts up. You can't ask for it to count down.
