

module.exports = function close(db) {
  db.close(function (err) {
        if (err) throw err;
      });
}