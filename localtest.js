const index = require('./index');

index.handler({}, {}, callback => {
    console.log(callback);
});
