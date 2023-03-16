const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "Yingyi",
  password: "Password123!",
  database: "phplogin",
});

connection.connect();

function createUser(username, password, callback) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
  
    const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`;
  
    connection.query(query, [username, hash], function (error, results, fields) {
      if (error) {
        return false;
      }
  
      return true;
    });
  }
  
async function authenticateUser(username, password) {
  const query = `SELECT * FROM accounts WHERE username = ?`;

  console.log("mysql: ", username, password);

  const userRows = await new Promise((resolve, reject) => {
    connection.query(query, [username], function (error, results, fields) {
      if (error) {
        reject(error);
        return;
      }

      resolve(results);
    });
  });

  if (userRows.length === 0) {
    return false;
  }

  const user = userRows[0];
  console.log("user: ", user);

  if (bcrypt.compareSync(password, user.password)) {
    console.log("TRUE");
    return user;
  } else {
    false;
  }
}



module.exports = {
  authenticateUser,
  createUser
};