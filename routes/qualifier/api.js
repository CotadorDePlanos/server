var router = require('express').Router();
var axios  = require('axios');

router.post('/make-webhook', function(req, res, next) {
  // console.log(req.body)

  // axios.post('https://hook.us1.make.com/etrfbw82c2m16gtt6236rdy0awbr5duf', {
  //   name: req.body.name,
  //   email: req.body.email,
  //   phone: req.body.phone,
  //   message: req.body.message,
  //   modality: req.body.modality,
  //   hasPlan: req.body.hasPlan,
  //   tag: req.body.tag,
  //   priority: req.body.priority,
  //   start: req.body.start,
  //   postal: req.body.postal,
  //   p18: req.body.p18,
  //   p23: req.body.p23,
  //   p28: req.body.p28,
  //   p33: req.body.p33,
  //   p38: req.body.p38,
  //   p43: req.body.p43,
  //   p48: req.body.p48,
  //   p53: req.body.p53,
  //   p58: req.body.p58,
  //   p59: req.body.p59,
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  res.send('webhook req sent');
});


router.post('/zapi-send', function(req,res) {
  var message = "texto texto texto texto texto texto texto Plano de saude: " + req.body.message

  axios.post('https://api.z-api.io/instances/3B3847FF8D6A20664DB6928AC4BCDF37/token/E1A47751C173CA2942BE2A7F/send-messages', {
  phone: "5511988291146",
  message: message
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  res.send('zapi req sent')
})

module.exports = router;
