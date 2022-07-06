const { sendError, sendRes } = require('../utils');
const db = require('../services/db');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.get('/api/department/get-all', requireLogin, async (req, res) => {
    const sql = `SELECT * FROM departments`;
    try {
      const departments = await db.query(sql);
      res.json(sendRes(departments));
    } catch (ex) {
      res.status(500).json(sendError(5000, ex.message));
    }
  });
};
