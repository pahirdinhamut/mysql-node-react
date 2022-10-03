import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "8080",
  database: "book",
});

app.use(express.json());
app.use(cors());

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/books", (req, res) => {
  const q = "SELECT * FROM book";
  db.query(q, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO book (`title`,`desc`,`cover`,`price`) VALUES (?) ";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [values], (err, results) => {
    if (err) return res.json(err);
    return res.json(results);
  });
});

app.delete("/books/:id", (req, res) => {
  const BookId = req.params.id; // req'ten gelen id parametresi
  const q = "DELETE FROM book WHERE id = ?";

  db.query(q, [BookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleteted successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const BookId = req.params.id;

  const q =
    "UPDATE book SET `title` = ? , `desc` = ? , `cover` = ? , `price`= ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [...values, BookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been updated successfuly");
  });
});

app.listen(8000, () => {
  console.log("ok");
});
