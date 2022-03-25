export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Page Two";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.accessArea = req.session.accessArea || "Guest";
  res.locals.grad = req.session.grad || "Guest";
  res.locals.loggedInUser = req.session.loggedInUser || {};

  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/signin");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};
