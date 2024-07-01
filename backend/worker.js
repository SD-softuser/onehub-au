const express = require("express");
const mysql = require("promise-mysql");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const app = express();
const compression = require("compression");
const cors = require("cors");
const path = require("path");
const { connect } = require("http2");
const PORT = 5000;
app.use(bodyParser.json());
app.use(express.json());
// Create TCP Connection Pool
const createTcpPool = async (config) => {
  const dbConfig = {
    host: "34.66.234.203",
    port: "3306",
    user: "insert_ac",
    password: "google@123",
    database: "onehub_db",
    ...config,
  };
  return mysql.createPool(dbConfig);
};

app.use(
  cors({
    origin: "*", // Allow requests from all origins, replace '*' with your frontend domain if needed
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow the specified HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow the specified headers
  })
);

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
    console.log("MySQL connection pool initialized.");
  } catch (error) {
    console.error("Error initializing MySQL connection pool:", error);
  }
})();

// WebSocket Server
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  console.log("Client connected");
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Upgrade HTTP Server for WebSocket
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

app.get("/api/testing", async (req, res) => {
  res.status(200).send({ message: "Hello JB" });
});

app.get("/api/fetchLeaderBoard", async (req, res) => {
  let { country, startdate, partner, productModel, enddate } = req.query;
  if (!country || !startdate || !enddate || !partner || !productModel) {
    res.status(400).send({ message: "Please fill all the fields" });
  }
  if (productModel === "Overall" && partner === "Overall") {
    productModel = "%";
    partner = "%";
  }
  if (productModel === "Overall") {
    productModel = "%";
  }
  if (partner === "Overall") {
    partner = "%";
  }
  try {
    const connection = await pool.getConnection();
    const query = `SELECT territory, SUM(sales) AS total_sales
      FROM Daily_sales
      WHERE country = ?
      AND date BETWEEN ? AND ?
      AND partner LIKE ?
      AND product_model LIKE ?
      GROUP BY territory
      ORDER BY total_sales DESC
      LIMIT 10`;
    const values = [country, startdate, enddate, partner, productModel];
    const row = await connection.query(query, values);
    // console.log(row)
    res.status(200).json(row);
  } catch (err) {
    res.status(500).send("internal server error");
  }
});


// app.get("/api/fetchProductSales", async (req, res) => {
//   // console.log("req.query is : ", req.query)
//   const { territory_id, partner } = req.body;
//   console.log("Request received with params:", { territory_id, partner });
//   // console.log("req.query descturtue", territory_id, date, partner);
//   if (!territory_id  || !partner) {
//     return res
//       .status(400)
//       .send({
//         message: "Please provide territory, date, and partner",
//         data: `${territory_id}, ${partner}`,
//       });
//   }

//   try {
//     const connection = await pool.getConnection();
//     const query = `
//      SELECT
//     store_name,
//     city,
//     date,
//     MAX(country) AS country,
//     MAX(CASE WHEN product_model = 'Pixel 8a' THEN sales ELSE 0 END) AS 'Pixel 8a',
//     MAX(CASE WHEN product_model = 'Pixel 8' THEN sales ELSE 0 END) AS 'Pixel 8',
//     MAX(CASE WHEN product_model = 'Pixel 8 Pro' THEN sales ELSE 0 END) AS 'Pixel 8 Pro',
//     MAX(CASE WHEN product_model = 'Pixel Watch' THEN sales ELSE 0 END) AS 'Pixel Watch'
// FROM Daily_sales
// WHERE territory = ? and partner=?
// GROUP BY store_name, city, date
// ORDER BY store_name, date`;
//     const values = [territory_id, partner];
//     const rows = await connection.query(query, values);
//     connection.release(); // Release the connection back to the pool
//     // console.log(rows);
//     if(rows.length===0){
//       res.status(204).json("data does not exist")
//     }
//     res.status(200).json(rows);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal server error");
//   }
// });

app.get("/api/fetchProductSales", async (req, res) => {
  const { territory_id, partner, code } = req.query;
  console.log("Request received with params:", { territory_id, partner });

  if (!territory_id || !partner || !code) {
    return res.status(400).send({
      message: "Please provide territory and partner",
      data: `${territory_id}, ${partner}, ${code}`,
    });
  }

  try {
    const connection = await pool.getConnection();
    const query = `
     SELECT
      store_name,
      city,
      date,
      MAX(country) AS country,
      MAX(CASE WHEN product_model = 'Pixel 8a' THEN sales ELSE 0 END) AS 'Pixel 8a',
      MAX(CASE WHEN product_model = 'Pixel 8' THEN sales ELSE 0 END) AS 'Pixel 8',
      MAX(CASE WHEN product_model = 'Pixel 8 Pro' THEN sales ELSE 0 END) AS 'Pixel 8 Pro',
      MAX(CASE WHEN product_model = 'Pixel Watch' THEN sales ELSE 0 END) AS 'Pixel Watch'
    FROM Daily_sales
    WHERE territory = ? AND partner = ? AND store_name like ?
    GROUP BY store_name, city, date
    ORDER BY store_name, date`;
    const values = [territory_id, partner, code];
    const rows = await connection.query(query, values);
    connection.release(); // Release the connection back to the pool

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.put("/api/updateProductSales", async (req, res) => {
  const { sales, store_name, productModel, date } = req.body;
  if (!sales || !store_name || !productModel || !date) {
    return res
      .status(400)
      .send({ message: "Please provide sales, store_name, product,date" });
  }
  try {
    const connection = await pool.getConnection();
    const query = `update Daily_sales set sales=? where store_name=? AND product_model=? and date=?`;
    const values = [sales, store_name, productModel, date];
    const result = await connection.query(query, values);
    connection.release();
    console.log(result);
    res.status(200).json({
      message: "Updated successfully",
      updatedRow: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/fetchCountry", async (req, res) => {
  // console.log("req.query is : ", req.query)
  const { territory_id } = req.query;
  // console.log("req.query descturtue", territory_id, date, partner);
  if (!territory_id) {
    return res
      .status(400)
      .send({ message: "Please provide territory", data: `${territory_id}` });
  }

  try {
    const connection = await pool.getConnection();
    const query = `
      SELECT country FROM
      onehub_db.TSM_ASM_merged where TAG=?;
    `;
    const values = [territory_id];
    const rows = await connection.query(query, values);
    connection.release(); // Release the connection back to the pool
    // console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.post("/api/createEntry", async (req, res) => {
  let { date, country, partner, territory_id, sales, city, store_name, productModel } = req.body;

  console.log(req.body);

  if (!date || !country || !partner || !territory_id || !city || !store_name || !productModel || !sales) {
    return res.status(400)
      .send({ message: `Please provide all fields ${date}, ${country}, ${partner}, ${territory_id}, ${sales}, ${city}, ${store_name}, ${productModel}` });
  }
  let d = date.split("-");
  let newDate = d[2] + "-" + d[1] + "-" + d[0];
  const id = `${newDate}_${country}_${partner}_${territory_id}_${city}_${store_name}_${productModel}`;
  console.log(id, req.body);

  try {
    const connection = await pool.getConnection();
    const query = `insert into onehub_db.Daily_sales (sales,id,product_model ,territory, store_name,city,date,country,partner) values(?,?,?,?,?,?,?,?,?)`;
    const values = [sales, id, productModel, territory_id, store_name, city, date, country, partner];
    const rows = await connection.query(query, values);
    connection.release();
    res.status(201).json({ message: `Entry created successfully for ${date}, ${country}, ${partner}, ${territory_id}, ${sales}, ${city}, ${store_name}, ${productModel}` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
})
// app.use(express.static(path.join(__dirname, '/../frontend/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
// });

app.use(express.static(path.join(__dirname, "/../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});


