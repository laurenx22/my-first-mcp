// ============================================
// My First MCP Server - A Simple Timer
// ============================================
// This server gives Claude two tools:
//   start_timer  -> saves the current time under a task name
//   stop_timer   -> calculates how many seconds have passed

const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { z } = require("zod");
const fs = require("fs");
const path = require("path");

// --- File storage setup ---
// We store timer data in a JSON file next to this script.
const TIMERS_FILE = path.join(__dirname, "timers.json");

// Read all saved timers from disk (returns {} if file doesn't exist yet)
function loadTimers() {
  if (!fs.existsSync(TIMERS_FILE)) return {};
  return JSON.parse(fs.readFileSync(TIMERS_FILE, "utf-8"));
}

// Write the timers object back to disk
function saveTimers(timers) {
  fs.writeFileSync(TIMERS_FILE, JSON.stringify(timers, null, 2));
}

// --- Create the MCP server ---
const server = new McpServer({
  name: "timer-server",        // Name shown to Claude
  version: "1.0.0",
});

// --- Tool 1: start_timer ---
// Saves the current timestamp under the given task name.
server.tool(
  "start_timer",                           // tool name
  "Start a timer for a named task",        // description Claude sees
  { name: z.string().describe("The name of the task to time") },  // input schema
  async ({ name }) => {
    const timers = loadTimers();
    timers[name] = Date.now();             // save current time in milliseconds
    saveTimers(timers);

    return {
      content: [
        { type: "text", text: `Timer "${name}" started.` },
      ],
    };
  }
);

// --- Tool 2: stop_timer ---
// Reads the saved timestamp, calculates elapsed seconds, and removes the timer.
server.tool(
  "stop_timer",                            // tool name
  "Stop a timer and return elapsed time",  // description Claude sees
  { name: z.string().describe("The name of the task to stop timing") },  // input schema
  async ({ name }) => {
    const timers = loadTimers();

    // Check if the timer exists
    if (!timers[name]) {
      return {
        content: [
          { type: "text", text: `No timer found for "${name}".` },
        ],
        isError: true,
      };
    }

    // Calculate elapsed time
    const elapsedMs = Date.now() - timers[name];
    const elapsedSec = (elapsedMs / 1000).toFixed(2);

    // Clean up - remove the finished timer
    delete timers[name];
    saveTimers(timers);

    return {
      content: [
        { type: "text", text: `Timer "${name}" stopped. Elapsed time: ${elapsedSec} seconds.` },
      ],
    };
  }
);

// --- Start the server ---
// MCP servers communicate over stdio (stdin/stdout).
// Claude Code launches this process and talks to it through pipes.
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Timer MCP server running...");   // stderr so it doesn't interfere with MCP protocol
}

main().catch(console.error);
