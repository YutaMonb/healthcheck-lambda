//@ts-check
const request = require('request');
const target = process.env.TARGET;
const slackPath = process.env.SLACKPATH;

exports.handler = (event, context, callback) => {
  if (!target || !slackPath) {
    callback(null, 'env undefined.');
    return;
  }

  request.get(target, (error, res, body) => {
    console.log(res.statusCode);
    if (res.statusCode == 200) {
      callback(null, 'statusCode 200');
      return;
    }
    postSlack(res.statusCode);
    callback(null, 'slack post');
  });
};

function postSlack(statusCode) {
  const options = {
    uri: slackPath,
    headers: {
      'Content-type': 'application/json'
    },
    json: {
      username: 'HealthCheck',
      text: `${target} ${statusCode}`,
      icon_emoji: ':male-police-officer:'
    }
  };

  request.post(options, (error, response, body) => {
    if (response.statusCode === 200) console.log('slack post.');
    else console.error(`slack post error. ${response.statusCode}`);
  });
}
