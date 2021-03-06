
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash =  require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');


//Initializatios
const app = express();
require('./lib/passport');

//setiings 
app.set('port', process.env.PORT || 4000);

//Esta linea le dice a node , donde esta la carpeta views.
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout : 'main',
    layoutsDir : path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname : '.hbs',
    helpers : require ('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//middlewares
app.use(session({
    secret:'stevenmysqlnodemysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
    
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


// Global Variables
app.use((req,res, next)=>{

    app.locals.success = req.flash('success');
    next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentications'));
app.use('/links', require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname , 'public')));
// Starting the server

app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);

});
