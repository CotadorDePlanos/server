var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var apiRouter = require('./routes/qualifier/api');
var viacepRouter = require('./routes/qualifier/viacep');
var dbRouter = require('./routes/db');

var app = express();

// cors setup
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// router setup
app.use('/api', apiRouter);
app.use('/viacep', viacepRouter);
app.use('/db', dbRouter.router);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error status
  res.status(err.status || 500);
});

// start the server in the port 3000 !
app.listen(5000, function () {
  console.log('Example app listening on port 5000.');
});
