const checkLoggedIn = function(req) {
  const currCookie = req.session.user_id;
  if (currCookie === null) {
    return false;
  } else {
    return true;
  }
}

module.exports.checkLoggedIn = checkLoggedIn;