var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var whatsappRouter = require('./routes/whatsapp');
var viacepRouter = require('./routes/viacep');
var planRouter = require('./routes/plan');
var userRouter = require('./routes/user');
var operatorRouter = require('./routes/operator');
var messageRouter = require('./routes/message');

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
app.use('/api/whatsapp', whatsappRouter);
app.use('/api/viacep', viacepRouter);
app.use('/api/user', userRouter);
app.use('/api/operator', operatorRouter);
app.use('/api/message', messageRouter);
app.use('/api/plan', planRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error status
  res.status(err.status || 500);
});

// start the server!
const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`App listening on port ${port}.`);
});
