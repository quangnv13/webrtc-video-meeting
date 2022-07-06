const sendError = (code, message) => {
  return { code, error: message };
};

const sendRes = (data, meta) => {
  return { data, meta };
};

const makeInsertQuery = (table, data, fields) => {
  const fieldsNotNullOrUndefined = [];
  const insertDatas = [];
  for (const key in data) {
    if (!fields.includes(key)) {
      throw new Error(`Key "${key}"" not found in fields`);
    }
    if (data[key] !== undefined || data[key] !== null) {
      fieldsNotNullOrUndefined.push(key);
      insertDatas.push(
        `${typeof data[key] === 'number' ? data[key] : '"' + data[key] + '"'}`
      );
    }
  }

  const sql = `INSERT INTO ${table} 
    (${fieldsNotNullOrUndefined.join(',')}) VALUES
    (${insertDatas.join(',')})`;
  return sql;
};

module.exports = {
  sendError,
  sendRes,
  makeInsertQuery,
};
