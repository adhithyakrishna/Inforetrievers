var express = require('express');
var router = express.Router();

router.get('/inforetrivers',function(req, res){
	res.render('inforetrivers' /*,{layout: false}*/);
});

router.all('*', function(req, res) {
  res.redirect("/inforetrivers");
});

module.exports = router;