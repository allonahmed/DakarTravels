const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const bodyParser = require("body-parser");
var addDays = require("date-fns/addDays");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());
const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  methods: ["GET", "POST"],
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "Dakar",
  port: "3306",
  multipleStatements: true
});

app.post("/payment", cors(), async (req, res) => {
  let { amount, id, description } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: description,
      payment_method: id,
      confirm: true
    });
    console.log("payment:", payment);
    res.json({
      message: "Payment successful",
      success: true
    });
  } catch (error) {
    console.log("error:", error);
    res.json({
      message: "Payment failed",
      success: false
    });
  }
});

//make this a post request so we can pick what the count should be;
app.post("/view_availability", (req, res) => {
  const roomCount = req.body.roomCount;
  db.query(
    `Select * from Dakar.dakar_availability where (COUNT + ${roomCount}) > 6`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/send-dates", (req, res) => {
  const check_in = req.body.check_in;
  const day_count = req.body.day_count;
  const room_count = req.body.room_count;
  let dates = "";
  //get the days from check in to checkout
  for (let i = 0; i < day_count; i += 1) {
    if (i < day_count - 1)
      dates += `date = '${addDays(
        new Date(check_in),
        i
      ).toLocaleDateString()}' or `;
    else
      dates += `date = '${addDays(
        new Date(check_in),
        i
      ).toLocaleDateString()}'; `;
  }

  const query = `UPDATE dakar.dakar_availability SET count = count + ${room_count} where ${dates}`;
  db.query(query, (error, result) => {
    if (error) res.send(error);
    else res.send(result);
  });
});

//send customer information to db
app.post("/send-info", (req, res) => {
  const data = req.body;
  console.log(data);
  const query1 = `insert into dakar.customer_information (full_name, email_address, phone_number, check_in, check_out, day_count, room_count, guest_count, price, total_price) values (?,?,?,?,?,?,?,?,?,?);`;
  const query2 =
    "insert into dakar.additional_options (personal_chef, personal_chef_count, atv_ride, atv_ride_count, goree_island, goree_island_count, cooking_lessons, cooking_lessons_count, safari, safari_count, renaissance, renaissance_count) values (?,?,?,?,?,?,?,?,?,?,?,?);";

  db.query(
    query1 + query2,
    [
      data.full_name,
      data.email_address,
      data.phone_number,
      data.check_in,
      data.check_out,
      data.day_count,
      data.room_count,
      data.guest_count,
      data.price,
      data.total_price,
      data.personal_chef,
      data.personal_chef_count,
      data.atv_ride,
      data.atv_ride_count,
      data.goree_island,
      data.goree_island_count,
      data.cooking_lessons,
      data.cooking_lessons_count,
      data.safari,
      data.safari_count,
      data.renaissance,
      data.renaissance_count
    ],
    (error, result) => {
      if (error) {
        res.send(error);
        console.log(error);
      } else res.send(result);
    }
  );
});

app.listen(process.env.PORT || 8083, () => {
  console.log(`You are connected`);
});
