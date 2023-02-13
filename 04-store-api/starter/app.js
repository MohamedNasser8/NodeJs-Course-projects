require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">Products</a>');
});
app.use("/api/v1/products", productsRouter);
app.use(notFound);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
