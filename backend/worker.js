const express = require('express');
const mysql = require('promise-mysql');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const app = express();
const compression=require('compression');
const cors=require('cors');

const PORT = 5000;
app.use(bodyParser.json());
app.use(express.json());
// Create TCP Connection Pool
const createTcpPool = async (config) => {
  const dbConfig = {
    host: '34.66.234.203',
    port: '3306',
    user: 'insert_ac',
    password: 'google@123',
    database: 'onehub_db_testing',
    ...config,
  };
  return mysql.createPool(dbConfig);
};

app.use(cors({
  origin: '*', // Allow requests from all origins, replace '*' with your frontend domain if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the specified HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow the specified headers
}));
// Create MySQL Connection Pool using TCP
const createPool = async () => {
  return createTcpPool({
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
};


let pool;

(async () => {
  try {
    pool = await createPool();
    console.log('MySQL connection pool initialized.');
  } catch (error) {
    console.error('Error initializing MySQL connection pool:', error);
  }
})();

// WebSocket Server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Client connected');
  // WebSocket message handling
});

// HTTP Server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Upgrade HTTP Server for WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

