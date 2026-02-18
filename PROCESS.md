- What I built: Describe your server and design decisions - 
I built a simple MCP server that is a timer tool. It has two tools with "start_timer" and "stop_timer." The start timer tool starts a timer for a named task and saves the start time to a file. The stop timer tool stops the timer and returns the elapsed time.
I decided to keep it really simple and followed the description in the assignment instructions.

- How Claude Code helped: 2-3 examples of effective prompts - 
Claude was super helpful in the process of this build and took my prompts and made the MCP server.

  Effective prompts used:
  1. This was my big initial prompt to make a MCP server with all my specifications.
    Create a simple MCP server for Claude Code.

     The server should have two tools:
        1. "start_timer"
          - Accepts: name (string)
          - Saves the current timestamp to a file using the task name
        2. "stop_timer"
          - Accepts: name (string)
          - Reads the saved timestamp
          - Returns the elapsed time in seconds

    Please create:
      1. package.json with the @modelcontextprotocol/sdk dependency
      2. index.js with the complete server code
      3. Clear comments explaining what each part does

    Use simple file storage.
    Keep it simple - this is my first MCP server.

2. This was to tell claude I wanted to add a new MCP server, how to start it, and to be able to use it.
    claude mcp add --transport stdio my-first-mcp -- node C:\Users\Lauren\mcp-projects\my-first-mcp\index.js


- Debugging journey: Describe errors you encountered and your debugging process -
  I did not run into any big errors while doing this. My main debugging was just to make sure my file paths were correct and pushing to github correctly.


- How MCP works: Explain the MCP architecture in your own words -
MCP servers are tools that you can connect to Claude (or other MCP compatible tools). Claude can connect to the MCP server and then use its functions


- What I’d do differently: Reflections on your approach -
I think my approach worked well. I wanted to be very specific in my prompt and from that I got what I was looking for. Next time I would want to make something a little more complicated so it would have more functionality.
There is not much you can do when it is only a stopwatch timer that can only count up.

