const express = require("express");
const cors = require("cors");

const {controllerDebug} = require("../controller/controllerDebug");

const app = express();
app.use(express.urlencoded({extends:true}));
app.use(express.json());
app.use(cors({origin: '*'}));


app.get("/api/debug", controllerDebug);
app.post("/api/line/push", )

export {app}