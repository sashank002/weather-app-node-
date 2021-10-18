const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const { jar } = require("request");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views locaion
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicPath));

// app.get("", (req, response) => {
//   response.send("<h1>hello </h1>");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "sashank",
  });
});

app.get("/help", (req, response) => {
  response.render("help", {
    title: "help",
    name: "sashank",
  });
});

app.get("/about", (req, response) => {
  response.render("about", {
    title: "help",
    name: "sashank",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "PLEASE PROVIDE AN ADDRESS",
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      return res.send({
        location: data.location,
        weather: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send("PAGE NOT FOUND");
});

// starting server
app.listen(3000, () => {
  console.log("server started");
});
