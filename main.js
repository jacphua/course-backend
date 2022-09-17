const customer = require("./customer");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.port || 3000;
require('dotenv').config();

const { auth } = require('express-openid-connect');

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? res.redirect("http://localhost:5500/frontend/index.html?IsLoggedIn=true") : 'Logged out')
  });

  const { requiresAuth } = require('express-openid-connect');

  app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });


// app = express();
app.use(cors("*"));
app.use(bodyparser.json());

app.use(customer.router);

app.listen(port, () => {
    console.log("listening on port 3000");
});
