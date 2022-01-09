require('dotenv').config()

const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winston = require('winston');
const expressWinston = require('express-winston');
const APP_PORT = 5000;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ]
});

if (!process.env.MONGO_URL) {
  logger.error("PLEASE_SPECIFY MONGO_URL !");
  process.exit(1);
}

// prepare db
mongoose
  .connect(process.env.MONGO_URL, { connectTimeoutMS: 1000 })
  .then(function () {
    app.listen(APP_PORT, function () {
      logger.info(`application is running on port ${APP_PORT}`);
    });
  })
  .catch(function (err) {
    logger.error(err);
    process.exit(1);
  });

const User = mongoose.model('User', {
  name: String,
  age: Number
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.json()
  ),
  responseField: null,
  requestWhitelist: [],
  responseWhitelist: ['body'],
  metaField: null,
  msg: 'ok',
  dynamicMeta: function (req, res) {
    return {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      message: "pok",
    };
  },
}));

app.disable('etag');

app.get('/', function (req, res) {
  res.status(200).json({
    data: {
      message: "Hello :)"
    }
  });
});

app.get('/users', async function (req, res) {
  const users = await User.find();

  res.json({
    data: users,
  });
});

app.post('/users', async function (req, res) {
  const { name, age } = req.body;
  const user = new User({ name, age });
  await user.save();

  res.json({
    data: user,
  });

});
