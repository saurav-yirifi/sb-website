# Substack MCP Setup

## Refreshing the Session Token

The Substack MCP server uses a session token from your browser cookie. It expires every ~30 days. When it does, follow these steps to get a new one:

1. Make sure you're logged in to Substack (blog.sauravbhatia.com or substack.com)
2. Open Developer Tools (`Cmd + Option + I`)
3. Go to **Application** tab (Chrome) or **Storage** tab (Safari)
4. Under **Cookies**, click `substack.com`
5. Find the cookie named **`substack.sid`**
6. Copy its **Value** (starts with `s%3A...`)
7. Update the `SUBSTACK_SESSION_TOKEN` value in `.mcp.json`
8. Restart Claude Code

## Config Location

`.mcp.json` in the project root (gitignored — contains the token).

```json
{
  "mcpServers": {
    "substack-mcp-plus": {
      "command": "/opt/homebrew/Cellar/node/25.2.1/bin/substack-mcp-plus",
      "env": {
        "SUBSTACK_PUBLICATION_URL": "https://blog.sauravbhatia.com",
        "SUBSTACK_SESSION_TOKEN": "<paste token here>"
      }
    }
  }
}
```
