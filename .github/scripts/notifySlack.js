const https = require('https');

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL; // Set this in GitHub secrets
const message = {
  text: "⚠️ E2E test failed due to infrastructure issue. Please investigate.",
};

const data = JSON.stringify(message);

const options = {
  hostname: 'hooks.slack.com',
  path: slackWebhookUrl.replace('https://hooks.slack.com', ''),
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = https.request(options, (res) => {
  console.log(`Slack response status: ${res.statusCode}`);
});

req.on('error', (error) => {
  console.error('Slack notification failed:', error);
});

req.write(data);
req.end();