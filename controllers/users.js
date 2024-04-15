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

module.exports.renderresetpassword = function (req, res) {
    res.render('users/resetpassword', { user: req.user });
};

module.exports.resetpassword = function (req, res) {
    // Find the user based on the provided username
    User.findOne({ username: req.body.username })
        .then(user => {
            // If user not found, set an error flash message and render the reset password page
            if (!user) {
                req.flash('error', 'Incorrect username or password');
                return res.render('users/resetpassword', { user: req.user, error: req.flash('error') });
            }

            // If user is found, attempt to change the password
            return user.changePassword(req.body['current-password'], req.body['new-password'])
                .then(() => {
                    // If password change is successful, set a success flash message and render the reset password page
                    req.flash('success', 'Successfully changed password');
                    return res.render('users/resetpassword', { user: req.user, success: req.flash('success') });
                })
                .catch(err => {
                    // If there's an error during password change, set an error flash message and render the reset password page
                    req.flash('error', err.message || 'Failed to change password');
                    return res.render('users/resetpassword', { user: req.user, error: req.flash('error') });
                });
        })
        .catch(err => {
            // If there's an error finding the user, set an error flash message and render the reset password page
            req.flash('error', err.message || 'An error occurred');
            return res.render('users/resetpassword', { user: req.user, error: req.flash('error') });
        });
};