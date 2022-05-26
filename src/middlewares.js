export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Bak Gue";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.accessArea = req.session.accessArea || "Guest";
  res.locals.grad = req.session.grad || "Guest";
  res.locals.loggedInUser = req.session.loggedInUser || {};

  if (req.session.loggedInUser) {
    console.log(
      `User : ${req.session.loggedInUser.number} ${req.session.loggedInUser.name}`
    );
  } else {
    console.log(`User : NONE`);
  }
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
