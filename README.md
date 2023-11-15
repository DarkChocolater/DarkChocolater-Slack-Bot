
# @DarkChocolater/slack-bot

Welcome to the DarkChocolater's Slack Bot! It communicates using OpenAI's GPT-3, providing a ChatGPT-like conversation experience. As a user sends a new message, the entire conversation is sent to GPT-3 for completion. The bot is also capable of summarizing long conversations to maintain concise conversations and minimize token usage.

https://user-images.githubusercontent.com/3743507/209952150-4555aee0-3f1b-4481-893a-0675a6108e3d.mp4

## Core Features

- Personalizes the bot's persona.
- Engages in conversations initiated by user mentioning the bot such as `@DarkChocolater hello!`
- Maintains conversation history for every thread, understands multiple actors and their details, and addresses them accurately. 
- Conversations are summarized as per configuration to reduce token usage, with a limit set for maximum tokens used per conversation.
- Shows a simple loading indicator just before calling OpenAI.
- Uses Markdown and Slack Blocks for output formatting

From the setup standpoint, this project uses the AWS CDK for deployment. All infrastructure is automatically provisioned and managed for you, keeping costs minimal. Charges apply only for OpenAI API tokens used.

### Setup process and token usage limits are outlined in detail within source code documentation.

Here's to enhanced and intelligent Slack conversations. Happy chatting!

## Active Development Notice

This bot is in active early development phase and may undergo non-backward compatible changes. E.g., some older conversations may stop functioning post a new bot version deployment.

### Acknowledgements

The progression of this bot was facilitated by the following projects:

- [firtoz/GPT-Shell](https://github.com/firtoz/GPT-Shell)
- [Kav-K/GPT3Discord](https://github.com/Kav-K/GPT3Discord)
- [openai/gpt-discord-bot](https://github.com/openai/gpt-discord-bot)

Please do check them out to understand more about the bot's origins and the technology behind it.