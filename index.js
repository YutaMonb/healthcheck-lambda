const https = require('https');
const target = process.env.TARGET;
const slackPath = process.env.SLACKPATH;

exports.handler = (event, context, callback) => {
  if (!target) {
    callback('target undefined');
    return;
  }

  https.get(target, res => {
    console.log(res.statusCode);
    if (res.statusCode == 200) {
      callback('statusCode 200');
      return;
    }
    postSlack(res.statusCode);
    callback('slack post');
  });
};

function postSlack(statusCode) {
  const data = JSON.stringify({
    username: 'HealthCheck',
    text: `${target} ${statusCode}`,
    icon_emoji: ':male-police-officer:'
  });

  const options = {
    hostname: 'hooks.slack.com',
    port: 443,
    path: slackPath,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const request = https.request(options, res => {
    console.log(`Slack POST: ${res.statusCode}`);
  });

  request.write(data);
  request.end();
}
