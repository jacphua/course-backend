// This file will contain the queries to the customer table
const database = require("./database");
const express = require("express");

// Allows us to define a mapping from the URI to a function
router = express.Router();

// can be used to define a GET API.   URI -> CB function.
router.get("/customer/all", (request, response) => {
  sqlst = 'select * from customer',
  database.connection.all (
    sqlst,
    (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send(results);
    }
  }
  )
});
//Note: use query instead of all for MySQL - database.connection.query("select * from customer")

// defines an API which takes id in the request and return the record in response
router.get("/customer/id", (request, response) => {
  database.connection.all(
    `select * from customer where customer_id = ${request.query.cid}`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send(results);
      }
    }
  );
});

// defines an API which takes email in the request and return the record in response
router.get("/customer/email", (request, response) => {
  database.connection.all(
    `select * from customer where email = ${request.query.cemail}`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send(results);
      }
    }
  );
});

// CHECK - defines an API which takes id & password in the request and return the record in response
router.get("/customer/login", (request, response) => {
  sqlst = 'select * from customer where customer_id = ${request.query.cid} & password = ${request.query.pwd}',
  database.connection.all(
    sqlst,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send(results);
      }
    }
  );
});

// a POST API to store the record received in the request
router.post("/customer/add", (request, response) => {
  console.log({response},{request})
  database.connection.all(
    `insert into customer (name, email) values ('${request.body.name}','${request.body.email}')`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send("Record saved successfully!");
      }
    }
  );
});

// POST + PUT = Body, GET + DELETE = Query
router.delete("/customer/delete", (request, response) => {
  database.connection.all(
    `delete from customer where customer_id  = ${request.query.cid}`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send("Record deleted successfully!");
      }
    }
  );
});


// can be used to define a GET API.   URI -> CB function.
router.get("/orders/all", (request, response) => {
  sqlst = 
  `SELECT shop_order.id , customer.name as custName, item.name as itemName, shop_order.quantity, shop_order.shipping_date
  from shop_order, customer, item
  where shop_order.itemID = item.id AND shop_order.customerID = customer.id`
  database.connection.all (
    sqlst,
    (errors, results) => {
    if (errors) {
      console.log(errors)
      response.status(500).send("Some error occurred");
    } else {
      console.log(results),
      response.status(200).send(results);
    }
  }
  )
});

module.exports = {
  router,
};

