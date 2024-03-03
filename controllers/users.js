const User = require('../models/user')

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

// Logic to register a user
//async to catch errors
//added try and catch 
module.exports.register = async (req, res, next) => {
    try{
        // create basic user model instance to pass in user name and email
        // get email, username, password from req.body post request
        const {email, username, password} = req.body;
        // pass email, username in an object into new user and save to variable
        const user = new User({ email, username});
        //take new user, save to database and password to hash/salt password to store on new user
        const registeredUser = await User.register(user, password);
        //req.login automatically logs in the newly registered user
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp')
            res.redirect('/campgrounds')
        })
        //flash will display a message to the user. key = success
    } catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}

// serves a form
//links to login.ejs
module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

// logging in and ensure creds are valid
//passport.authenticate expects strategy as param followed by options to specify in an object. redirect to /login if failure.
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // update this line to use res.locals.returnTo now
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}