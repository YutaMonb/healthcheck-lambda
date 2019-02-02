const https = require("https");
const target = process.env.TARGET;
const slackUrl = process.env.SLACKURL;

exports.handler = async (event, context, callback) => {
  if (!target) {
    callback("endpoint undefined");
    return;
  }

  https.get(target, res => {
    console.log(res.statusCode);
    if (res.statusCode == 200) {
      callback("statusCode 200");
      return;
    }
  });
};
