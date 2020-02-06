const sqlite3 = require("sqlite3").verbose();

class DAOClass {
  constructor(dbfile_path) {
    this.db = new sqlite3.Database(dbfile_path, sqlite3.OPEN_READWRITE, err => {
      if (err) {
        return console.error(err.message);
      } else {
        console.log("Connected to the SQlite database.");
      }
    });
    this.successMsg = "Database operation successful";
    this.failureMsg = "Sorry! Database operation failed!";
  }

  get(sql, params = []) {
    //var that = this;
    return new Promise(
      function(resolve, reject) {
        // that.db.all(sql, [], (err, rows) => {
        this.db.get(sql, [], (err, row) => {
          if (err) {
            return console.log(err.message);
          } else {
            // rows.forEach(element => {
            //   arr.push(element);
            // });
            resolve(row);
          }
        });
      }.bind(this)
    );
  }

  all(sql, params = []) {
    //var that = this;
    return new Promise(
      function(resolve, reject) {
        // that.db.all(sql, [], (err, rows) => {
        this.db.all(sql, [], (err, rows) => {
          if (err) {
            return console.log(err.message);
          } else {
            // rows.forEach(element => {
            //   arr.push(element);
            // });
            resolve(rows);
          }
        });
      }.bind(this)
    );
  }

  run(sql) {
    return new Promise(
      function(resolve, reject) {
        try {
          this.db.run(sql, [], (err, rows) => {
            if (err) {
              resolve(this.failureMsg + " " + err.message);
            } else {
              resolve(this.successMsg);
            }
          });
        } catch (err) {
          console.log("in run module error" + err);
        }
      }.bind(this)
    );
  }

  // close the database connection
  // db.close(err => {
  //   if (err) {
  //     return console.error(err.message);
  //   } else {
  //     console.log("Close the database connection.");
  //   }
  // });
}

module.exports = DAOClass;
