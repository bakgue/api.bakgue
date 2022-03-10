export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Page Two";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.accessArea = req.session.accessArea || "Guest";
  res.locals.grad = req.session.grad || "Guest";
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Login First.");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Logout(?) First.");
    return res.redirect("/");
  }
};
