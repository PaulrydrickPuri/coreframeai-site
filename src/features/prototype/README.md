# MCP Playground

This feature provides a user-friendly interface for interacting with MCP (Machine Cognition Protocol) tools, showing reasoning previews, and allowing users to deploy tools into their real-world workflows.

## Overview

The MCP Playground is a deployable cognition tool experience where users can:
- Interact with MCP tools like `calculate_time_value`
- View Chain of Thought (CoT) reasoning
- Choose how they want to use the tool after execution (browser, background, reminders, etc.)

## Architecture

The MCP Playground follows the project's feature-based architecture:

```
/src
  /app
    /prototype
      /mcp-playground
        page.tsx           # Next.js page component
  /features
    /prototype
      /components
        MCPPlayground.tsx  # Main container component
        MCPResultCard.tsx  # Displays calculation results and CoT
        PostRunActions.tsx # Deployment options UI
  /scripts
    /supabase
      /schema
        reminder_triggers.sql # SQL schema for reminders
```

## Features

1. **Time Value Calculator**
   - Computes the value of a user's time based on income and working hours
   - Provides insightful recommendations based on the calculated hourly rate

2. **Deployment Options**
   - Share as Link: Generate a shareable URL with prefilled parameters
   - Add to Browser: Code snippet for browser extension integration
   - Generate Background: Create a custom background image with the insight
   - Set Daily Reminder: Schedule daily reminders via email

3. **Chain of Thought**
   - Shows the reasoning process behind the calculation
   - Helps users understand how the tool works

## Development Setup

1. **Local Development**
   ```bash
   # Start the development server
   npm run dev
   ```

2. **Supabase Setup (for reminders feature)**
   - Create a Supabase project
   - Run the SQL script in `scripts/supabase/schema/reminder_triggers.sql`
   - Configure environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

## Integration with Backend

The MCP Playground is designed to work with a Go backend API:

- Endpoint: `POST /mcp/calculate_time_value`
- Request Body:
  ```json
  {
    "monthly_income": 5000,
    "working_hours_per_week": 40
  }
  ```
- Response:
  ```json
  {
    "hourly_rate": 28.85,
    "time_value_insight": "Your time is worth RM28.85/hour...",
    "chain_of_thought": "1. Received query with monthly_income=5000..."
  }
  ```

## Future Enhancements

- Add more MCP tools beyond the time value calculator
- Implement user authentication for saved tools
- Create a tool builder interface for custom MCP tools
- Add more deployment options (e.g., calendar integration, Slack bot)
