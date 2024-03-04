
//if in development mode take .env package and take variables in file, add them to process.env in node app
//define key value pairs in .env files for API
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
    }
    
    const express = require('express');
    const app = express();
    const path = require('path');
    const mongoose = require('mongoose');
    const methodOverride = require('method-override');
    const ejsMate = require('ejs-mate');
    const ExpressError = require('./utils/ExpressError')
    const session = require('express-session');
    const flash = require('connect-flash');
    const passport = require('passport');
    const LocalStrategy = require('passport-local');
    const User = require('./models/user')
    const mongoSanitize = require('express-mongo-sanitize');
    const helmet = require('helmet');
    const MongoStore = require('connect-mongo')(session); //uses Mongo to store session info rather than using express memory
    
    //require routes
    const userRoutes = require('./routes/users')
    //testing app.js
    const campgroundRoutes = require('./routes/campgrounds');
    const reviewRoutes = require('./routes/reviews');
    // const dbURL = 'mongodb://localhost:27017/YelpCamp'; //enable when working locally
    const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/YelpCamp'; //enable once ready to deploy database to MongoDB Atlas
    mongoose.connect(dbURL)
        .then(() => {
            console.log("MONGO CONNECTION OPEN!!!")
        })
        .catch(err => {
            console.log("OH NO MONGO CONNECTION ERROR!!!!")
            console.log(err)
        })
    
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Serving on port ${port}`)
        })
    
    
    app.engine('ejs', ejsMate);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs')
    
    app.use(express.urlencoded({extended:true}));
    app.use(methodOverride('_method'));
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(mongoSanitize()); //will not allow any keys that contain a dollar sign or period in req.query to disable DB injections
    
    const secret = process.env.SECRET || 'ToLiveIsToSuffer1985!@#';
    
    const store = new MongoStore({
        url: dbURL, 
        secret: 'ToLiveIsToSuffer1985!@#',
        touchAfter: 24 * 60 * 60
    });
    
    store.on("error", function(e){
        console.log('session store error!', e)
    })
    
    const sessionConfig = {
        store, //uses MongoStore instead of default express memory
        name: 'session', //changes connect.sid default cookie name
        secret,
        resave: false,
        saveUninitialized: true, 
        cookie: {
            httpOnly: true, //cookies can only be used with http and not javascript. prevents xss attack to extract cookies from site.
            secure: false, //required cookies to be used only over https
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        }
    }
    app.use(session(sessionConfig))
    app.use(flash());
    app.use(helmet({contentSecurityPolicy:false})); //ContentSecurityPolicy is creating problems with styles and formatting. Disabling for now.
    
    // const scriptSrcUrls = [
    //     "https://stackpath.bootstrapcdn.com/",
    //     "https://api.tiles.mapbox.com/",
    //     "https://api.mapbox.com/",
    //     "https://kit.fontawesome.com/",
    //     "https://cdnjs.cloudflare.com/",
    //     "https://cdn.jsdelivr.net",
    // ];
    // const styleSrcUrls = [
    //     "https://kit-free.fontawesome.com/",
    //     "https://stackpath.bootstrapcdn.com/",
    //     "https://api.mapbox.com/",
    //     "https://api.tiles.mapbox.com/",
    //     "https://fonts.googleapis.com/",
    //     "https://use.fontawesome.com/",
    //     "https://kit.fontawesome.com/",
    //     "https://fonts.google.com/"
    // ];
    // const connectSrcUrls = [
    //     "https://api.mapbox.com/",
    //     "https://a.tiles.mapbox.com/",
    //     "https://b.tiles.mapbox.com/",
    //     "https://events.mapbox.com/",
    // ];
    // const fontSrcUrls = [];
    // app.use(
    //     helmet.contentSecurityPolicy({
    //         directives: {
    //             defaultSrc: [],
    //             connectSrc: ["'self'", ...connectSrcUrls],
    //             scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
    //             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
    //             workerSrc: ["'self'", "blob:"],
    //             objectSrc: [],
    //             imgSrc: [
    //                 "'self'",
    //                 "blob:",
    //                 "data:",
    //                 "https://res.cloudinary.com/dn2hubzli/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
    //                 "https://images.unsplash.com/",
    //                 "https://www.pexels.com/",
    //                 "https://fontawesome.com/",
    //             ],
    //             fontSrc: ["'self'", ...fontSrcUrls],
    //         },
    //     })
    // );
    
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(new LocalStrategy(User.authenticate()))
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    app.use((req, res, next) => {
        //all templates now have access to req.user
        //In Express.js, res.locals is an object that provides a way to pass data 
        //through the application during the request-response cycle. It allows you to 
        //store variables that can be accessed by your templates and other middleware functions.
        res.locals.currentUser = req.user;
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
        next();
    })
    
    // app.get('/fakeUser',async (req, res) => {
    //     const user = new User({email: 'justin@gmail.com', username: 'justinnn'})
    //     const newUser = await User.register(user, 'chicken');
    //     res.send(newUser);
    // })
    
    //used to set middleware routes and link path to a 
    app.use('/', userRoutes)
    app.use('/campgrounds', campgroundRoutes)
    app.use('/campgrounds/:id/reviews', reviewRoutes)
    
    app.get('/', (req, res) => {
        res.render('home')
    })
    
    app.all('*', (req, res, next) => {
        next(new ExpressError('Page Not Found!', 404))
    })
    
    app.use((err, req, res, next) => {
        const {statusCode = 500, message = 'Something went wrong'} = err;
        if(!err.message) err.message='Oh No, Something Went Wrong!'
        res.status(statusCode).render('error', {err});
    })
    
    // app.get('/makecampground', async (req, res) => {
    //     const camp = new Campground ({title: 'My Backyard', description: 'cheap camping'})
    //     await camp.save()
    //     res.send(camp)
    // })
