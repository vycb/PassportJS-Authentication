var User = require('../../app/models/user');

exports.isAuthenticated = function (req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/login");
    }
}

exports.userExist = function(req, res, next) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (!user) {
            next();
        } else {
	        req.user = user;
	        next();
//            res.redirect("/signup");
        }
    });
};
