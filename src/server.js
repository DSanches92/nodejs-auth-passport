import express from "express";
import routes from "./routes.js";

import "./database/index.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.listen(8080);
