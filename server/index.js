const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
connectToMongo();

const app = express();
const port = 5000;

//middleware
// app.use(express.json());
app.use(cors());
app.use(express.json());
//Available Routes

app.get("/",(req,res) =>{
  res.json("Server Connected");
})
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(
    `Successfully Backend Connected! app listening at http://localhost:${port}`
  );
});
