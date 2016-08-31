// All the below items match the config items in our .env file. Go for a description of each key.

// for example...
// SERVER_PORT: JSON.stringify(process.env.SERVER_PORT),
// CLIENT_DEVSERVER_PORT: JSON.stringify(process.env.CLIENT_DEVSERVER_PORT),
// SERVER_BUNDLE_OUTPUT_PATH: JSON.stringify(process.env.SERVER_BUNDLE_OUTPUT_PATH),
// .....

module.exports = Object
  .keys(process.env)
  .reduce((env, key) => {
    env['process.env.' + key] = JSON.stringify(process.env[key]);
    return env;
  }, {});