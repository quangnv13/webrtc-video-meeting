const passport = require('passport');
const passportJWT = require('passport-jwt');
const CONFIG = require('../config');
const Logger = require('../lib/Logger');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
const logger = new Logger();

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = CONFIG.JWT_SECRET_KEY;
const strategy = new JwtStrategy(jwtOptions, async function (jwtPayload, next) {
  logger.info('JWT payload received', jwtPayload);
  const sql = `SELECT * FROM users WHERE id="${jwtPayload.id}"`;
  const users = await db.query(sql);
  if (users?.length > 0) {
    next(null, users[0]);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

module.exports = {
  jwtOptions,
  passport,
};
