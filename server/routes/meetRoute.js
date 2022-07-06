const {
  sendError,
  sendRes,
  makeid,
  makeInsertQuery,
  removeVietnameseTones,
} = require('../utils');
const db = require('../services/db');
const requireLogin = require('../middlewares/requireLogin');
const moment = require('moment');
const Logger = require('../lib/Logger');
const logger = new Logger();

module.exports = (app) => {
  app.post('/api/meet', requireLogin, async function (req, res) {
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const fields = ['userId', 'name', 'password', 'path', 'createdAt'];
    let path = '';
    if (req.body.name) {
      path = removeVietnameseTones(`${req.body.name}-${makeid(10)}`).replace(
        / /g,
        '_'
      );
    }
    logger.info(path);

    const sql = makeInsertQuery(
      'meets',
      {
        ...req.body,
        userId: req.user.id,
        password: req.body.password || '',
        path,
        createdAt,
      },
      fields
    );
    try {
      await db.query(sql);
      res.json({
        ...req.body,
        userId: req.user.id,
        password: req.body.password || '',
        path,
        createdAt,
      });
    } catch (ex) {
      res.status(500).json(sendError(5000, ex.message));
    }
  });

  app.get('/api/meet/:id', requireLogin, async function (req, res, next) {
    if (isNaN(Number(req.params.id))) {
      next();
      return;
    }
    if (!req.params.id) {
      res.status(404).json(sendError(4401, 'Không tồn tại phòng này'));
      return;
    }
    const sql = `SELECT u.username,u.fullname,m.name as meetName,m.createdAt,m.path FROM meets as m LEFT JOIN users as u ON m.userId = u.id WHERE m.id=${req.params.id}`;
    try {
      const meets = await db.query(sql);
      if (meets?.length > 0) {
        res.json(sendRes(meets[0]));
      } else {
        res.status(404).json(sendError(4401, 'Không tồn tại phòng này'));
      }
    } catch (ex) {
      res.status(500).json(sendError(5000, ex.message));
    }
  });

  app.get('/api/meet/get-all', requireLogin, async function (req, res) {
    const sql = `SELECT u.username,u.fullname,m.name as meetName,m.createdAt,m.path FROM meets as m LEFT JOIN users as u ON m.userId = u.id`;
    try {
      const meets = await db.query(sql);
      res.json(sendRes(meets));
    } catch (ex) {
      res.status(500).json(sendError(5000, ex.message));
    }
  });

  app.delete('/api/meet/:id', requireLogin, async function (req, res) {
    if (!req.params.id) {
      res.status(404).json(sendError(4401, 'Không tồn tại phòng này'));
      return;
    }
    const sql = `DELETE FROM meets WHERE id=${req.params.id}`;
    try {
      await db.query(sql);
      res.json(sendRes('ok'));
    } catch (ex) {
      res.status(500).json(sendError(5000, ex.message));
    }
  });
};
