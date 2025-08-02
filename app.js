//imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');
const _handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const cookieParser = require('cookie-parser');

// const handlebar = require('express-handlebars');

//custom Inports
const apiRoutes = require(`./routes/apiRoutes`);
const userRoutes = require(`./routes/userRoutes`);
const globalErrorHandler = require('./controllers/errorController');
const webController = require('./controllers/webController');
const AppError = require('./utils/appError');
const webRouter = require('./routes/webRoutes');

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

const hbs = require('express-handlebars');

app.use(cors({ origin: 'http://localhost:3000' })); // TODO: Make this configurable via environment variable

app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts/'),
    partialsDir: path.join(__dirname, '/views/partials/'),
    handlebars: allowInsecurePrototypeAccess(_handlebars),
  }),
);
app.set('view engine', 'hbs');

//middlewares
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data:'],
      'script-src': ["'self'", 'https: data:'],
      'default-src': ["'self'", 'https: data:'],
    },
  }),
); // Set security HTTP headers
app.use(morgan('dev')); // Dev Logger
app.use(express.json({ limit: '10kb' })); //Json body parser
app.use(cookieParser());

app.use('/api', limiter); //expres rate limiter
app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
app.use(xss()); // Data sanitization against XSS
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api', apiRoutes);
app.use('/user', userRoutes);
app.use('/', webRouter);
//Url not found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global Error handler
app.use(globalErrorHandler);

//Export
module.exports = app;
