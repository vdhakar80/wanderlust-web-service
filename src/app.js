/*eslint-disable*/
const express = require("express");
const bodyParser = require("body-parser");
/*Importing the necessary modules */
const myErrorLogger = require("./utilities/ErrorLogger");
const myRequestLogger = require("./utilities/RequestLogger");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const setupUser = require("./model/setupUser");
const setupBooking = require("./model/setupBooking");
const setupDestination = require("./model/setupDestination");
const packageRouter = require("./routes/packageRouter");
const bookingRouter = require("./routes/bookingRouter");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(myRequestLogger);
app.get("/setupDB", async (req, res, next) => {
  try {
    let user = await setupUser.userSetup();
    let destination = await setupDestination.destinationSetup();
    let booking = await setupBooking.bookingSetup();
    res.json({ user: user, booking: booking, destination: destination });
  } catch (err) {
    next(err);
  }
});
app.use("/user", userRouter);
app.use("/", packageRouter);
app.use("/", bookingRouter);

app.use(myErrorLogger);

app.listen(8000, () => {
  console.log("Server listening in port 8000 ");
});
// console.log("Server listening in port 8000 ");
//exporting the app
module.exports = app;
