/* @flow */

// This grants us source map support, which is handy as our webpack bundling
// for the server will include source maps.  Therefore we will have nice stack
// traces again for our server.
import 'source-map-support/register';

import express from 'express';
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import morgan from 'morgan'
import hpp from 'hpp'
import helmet from 'helmet'
import passport from 'passport'

import universalReactAppMiddleware from './middleware/universalReactApp';
import apiRouterMiddleware from './middleware/router/api';
import {
  CLIENT_BUNDLE_HTTP_PATH,
  CLIENT_BUNDLE_OUTPUT_PATH,
  CLIENT_BUNDLE_CACHE_MAXAGE,
  SERVER_PORT,
  PUBLIC_DIR_PATH,
} from './config';

// Patch console.x methods in order to add timestamp information
require("console-stamp")(console, {
  pattern : "mm/dd HH:MM:ss.l",
  colors: {
    stamp: "white",
    label: "white",
    metadata: "green"
  }
})

// Create our express based server.
const app = express();

// logger
app.use(morgan(':date[clf] ":method :url" :status :response-time ms - :res[content-length] :remote-addr ":user-agent"'))

// Don't expose any software information to hackers.
app.disable('x-powered-by');

// Prevent HTTP Parameter pollution.
app.use(hpp());

// Content Security Policy
app.use(helmet.contentSecurityPolicy({
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'"],
  styleSrc: ["'self'"],
  imgSrc: ["'self'"],
  connectSrc: ["'self'", 'ws:'],
  fontSrc: ["'self'"],
  objectSrc: ["'none'"],
  mediaSrc: ["'none'"],
  frameSrc: ["'none'"],
}));
app.use(helmet.xssFilter());
app.use(helmet.frameguard('deny'));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());

// Response compression.
app.use(compression());

// app.use(function(req, res, next) {
//   console.log('UA: ', req.headers['user-agent'])
//   next()
// })

// Configure static serving of our webpack bundled client files.
app.use(
  CLIENT_BUNDLE_HTTP_PATH,
  express.static(CLIENT_BUNDLE_OUTPUT_PATH, { maxAge: CLIENT_BUNDLE_CACHE_MAXAGE })
);
// Configure static serving of our "public" root http path static files.
app.use(express.static(PUBLIC_DIR_PATH));


// Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(cookieParser())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// session
app.use(session({ resave: false, saveUninitialized: false, secret: 'keyboard cat' }))
// passport
app.use(passport.initialize())
app.use(passport.session())
// passport LocalStrategy
require('./middleware/passport')


// routing of API
app.use('/api', apiRouterMiddleware);

// Bind our universal react app middleware as the handler for all get requests.
app.get('*', universalReactAppMiddleware);

// Create an http listener for our express app.
const listener = app.listen(SERVER_PORT);

console.log(`==> 💚  HTTP Listener is running on port ${SERVER_PORT}`); // eslint-disable-line no-console,max-len

// We export the listener as it will be handy for our development hot reloader.
export default listener;
