const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const BadImage = require("../models/BadImage");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.redirect("/", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    return res.json({ message: validationErrors.map(obj => obj.msg).join('\n') })
  }

  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ user, message: info.message })
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ user, message: 'Success! You are logged in.'})
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
    res.json({ user: null })
  })
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  return res.redirect("/");
};
exports.getUser = (req, res) => {
  return res.json(req.user || null)
}
exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    return res.json({ message: validationErrors.map(obj => obj.msg).join('\n') })
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        return res.json({ message: "Account with that email address or username already exists." })
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
       
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.json({ user })
        });
      });
    }
  );
};
exports.getBadImages = async (req, res) => {
  const badImages = await BadImage.find({ user: req.user?.id })
  return res.json(badImages)

}