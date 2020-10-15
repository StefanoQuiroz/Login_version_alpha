//rutas principales express y usar router
const express = require('express');
const router = express.Router();
const passport = require('passport');
//primera pagina que el usuario visita .get para pedir
//(re,res,next) manejador de peticiones
router.get('/sign', (req,res,next) => {
    res.render('new_sign')
});
//cuando el usuario ingrese, ventana para registrarse
router.get('/signup', (req,res,next) => {
    res.render('new_signup');
});
//cuando el usuario ingrese, ventana para registrarse
router.get('/signup', (req,res,next) => {
    res.render('new_signup');
});
//enviar escucha
router.post('/signup', passport.authenticate('local-signup', {
    //redireccione al usuario
    successRedirect:'/profile',
    failureRedirect:'/signup',
    //pasarle todos los datos del cliente
    passReqToCallback: true  
}));
//logear si ya esta creada su cuenta usuario y contraseña
router.get('/sign', (req,res,next) => {
    res.render('new_sign');    
});
router.get('/sign', (req,res,next) => {
    res.render('new_sign');    
});
//validar email y password
router.post('/sign', passport.authenticate('local-sign', {
    successRedirect: '/profile',
    failureRedirect: '/sign',
    passReqToCallback : true    
}) );

router.get('/logout', (req,res,next) => {
    req.logout();
    res.redirect('/sign'); 
});
//para rutas que se esta protegiendo el use se ejcuta primero
router.use((req,res,next) => {
    isAuthenticated(req,res,next);
    next(); 
});

router.get('/profile', (req,res,next)=>{
    res.render('profile');
});

router.get('/dashboard', (req,res, next)=>{
    res.send('dashboard');
});

function isAuthenticated (req,res,next) {
    if(req.isAuthenticated ()){
        return next();
    }
    res.redirect('/sign');
}


module.exports = router;

