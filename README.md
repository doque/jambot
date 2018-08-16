# Jambot

Telegram bot to find doctors in cities using Jameda's public API.

## Setup

1. Get a `TOKEN` from the [@Botfather](https://t.me/Botfather) and export as
   `process.env.TOKEN`:

   ```bash
     export TOKEN=<your.token>
   ```

2. Deploy this function to receive your endpoint URL:

   ```bash
    npm install

    sls deploy

    // snip
    endpoints:
      POST - https://your-url.us-east-1.amazonaws.com/dev/find
   ```

3. Register the endpoint URL with the bot:

   ```bash
      curl \
        --request POST \
        --url https://api.telegram.org/bot<TOKEN>/setWebhook \
        --header 'content-type: application/json' \
        --data '{"url": "https://your-url.us-east-1.amazonaws.com/dev/find"}'
   ```

4. Talk to your bot!
