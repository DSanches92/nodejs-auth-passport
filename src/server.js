import express from "express";
import routes from "./routes.js";
import session from "express-session";
import passport from "passport";
import authorize from "./middleware/authorize.js";

import "./database/index.js";

const PORT = 8080;
const app = express();

app.use(session({
  secret: "e8Ckb2Vu5qE7ebMJ96wNWxV23un9VUkZ",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000 //1 hora
  }
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.sendFile("D:\\Desenvolvimento\\Aplicativos\\nodejs-auth-passport\\src\\login.html");
});

app.use("/report", authorize(), routes);

app.listen(PORT, () => {
  console.log(`Server is runing in http://192.168.0.138:${PORT}`);
});
