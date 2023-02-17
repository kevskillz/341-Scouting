const mysql = require('mysql2');
const { Client } = require('ssh2');
const dotenv = require('dotenv');
dotenv.config();
const sshClient = new Client();
const dbServer = {
  host: process.env.dbHOST,
  port: 3306,
  user: process.env.dbUSER,
  password: process.env.dbPASS,
  database: process.env.dbDB
}
const tunnelConfig = {
  host: process.env.tunnelHOST,
  port: 22,
  username: process.env.tunnelUSER,
  password: process.env.tunnelPASS
}
const forwardConfig = {
  srcHost: 'scouting.team341.com',
  srcPort: 3306,
  dstHost: dbServer.host,
  dstPort: dbServer.port
};

const c = new Promise((resolve, reject) => {
  sshClient.on('ready', () => {
    sshClient.forwardOut(
      forwardConfig.srcHost,
      forwardConfig.srcPort,
      forwardConfig.dstHost,
      forwardConfig.dstPort,
      (err, stream) => {
        if (err) reject(err);
        const updatedDbServer = {
          ...dbServer,
          stream
        };
        const connection = mysql.createConnection(updatedDbServer);
        connection.connect((error) => {
          if (error) {
            reject(error);
          }
          console.log("connected!")
          resolve(connection);
        });
        
      });
  }).connect(tunnelConfig);
  
});

function query() {
  return c;
}





module.exports = {
  query: query
};