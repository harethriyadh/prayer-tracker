const mongoose = require("mongoose");
const dbUrl = "mongodb+srv://harithriyadh:1234@harith.pl58u3c.mongodb.net/?retryWrites=true&w=majority"

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}; 
mongoose
.connect(dbUrl, connectionParams)
.then(() => {
  console.info ("Connected to the DB");
})
.catch((e) => {
  console.log ("Error:", e)
});