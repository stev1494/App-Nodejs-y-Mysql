const express = require('express');
const router = express.Router();

const passport = require('passport');


// SIGNUP
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});


router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));
/*
router.post ('/signup', (req,res)=>{
  console.log(req.body);
  res.send('recibido');

});*/



router.get('/profile', (req, res) => {
  res.render('profile');
});

module.exports = router;