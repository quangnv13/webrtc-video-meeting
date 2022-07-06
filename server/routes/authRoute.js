const requireLogin = require('../middlewares/requireLogin');
const { sendError, sendRes, makeInsertQuery } = require('../utils');
const jwt = require('jsonwebtoken');
const { jwtOptions } = require('../services/passport');
const moment = require('moment');
const db = require('../services/db');

const bcrypt = require('bcrypt');
const CONFIG = require('../config');
const Logger = require('../lib/Logger');
const logger = new Logger();
module.exports = (app) => {
  app.get('/api/auth/account-info', requireLogin, async (req, res) => {
    const id = req.user.id;
    const sql = `SELECT u.id,
    u.username,
    u.fullname,
    u.departmentId,
    d.name as departmentName,
    u.position,
    u.phoneNumber,
    u.address,
    u.email,
    u.dateOfBirth,
    u.createdAt,
    u.updatedAt FROM users as u LEFT JOIN departments as d ON u.departmentId = d.id WHERE u.id=${id}`;
    logger.info(sql);
    const users = await db.query(sql);
    res.json(sendRes(users[0]));
  });

  app.post('/api/auth/login', async function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(401).json(sendError(4101, 'All fields is required!'));
      return;
    }
    const sql = `
    SELECT id, username, password FROM users WHERE username="${username}"
    `;
    const users = await db.query(sql);
    if (users?.length === 0) {
      res.status(401).json(sendError(4104, 'No such user found'));
    }
    const passwordIsMatch = await bcrypt.compare(password, users[0].password);
    logger.info(users[0]);
    if (passwordIsMatch) {
      const payload = { id: users[0].id };
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json(sendRes({ token }));
    } else {
      res.status(401).json(sendError(4103, 'Password is incorrect'));
    }
  });

  app.post('/api/auth/register', async function (req, res) {
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const fields = [
      'username',
      'fullname',
      'departmentId',
      'position',
      'phoneNumber',
      'address',
      'email',
      'password',
      'dateOfBirth',
      'createdAt',
    ];
    try {
      if (!req.body.password) {
        return res.status(403).json(sendError(4302, 'Password is required'));
      }
      const hashedPassword = await bcrypt.hash(
        req.body.password,
        CONFIG.PW_SALT
      );
      const sql = makeInsertQuery(
        'users',
        { ...req.body, password: hashedPassword, createdAt },
        fields
      );
      await db.query(sql);
      res.send('Ok');
    } catch (ex) {
      res.status(500).json(sendError(5000, ex.message));
    }
  });
};
