const express = require('express')
//const router=require('./routes')
const app = express();
const port = 2021;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello!!!!')
});
require("./routes")(app);
app.listen(port, () => {
  console.log(`listening on port ${port}!`)
});