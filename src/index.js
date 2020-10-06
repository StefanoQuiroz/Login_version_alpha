//inicializar servidor
const express = require('express');
//plantillas ejs motor
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
//express-sessions
const session = require('express-session');
const flash =require('connect-flash');
//Incializaciones
const app = express();
require('./db');
require('./passport/local_auth')
//settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
//Middleware se ejecutan antes de las rutas antes de procesarlos y antes de las rutas
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret : 'mysecretsession',
    resave : false,
    //no necesitamos una inicializacion previa
    saveUninitialized : false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.signupMessage =req.flash('signupMessage');
    app.locals.signinMessage =req.flash('signinMessage');
    console.log(app.locals);
    //para quitar el sign y el signup
    app.locals.user = req.user;
    next();
});


//ruta
app.use('/', require('./routes/index'));
//empezar el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));    
});

