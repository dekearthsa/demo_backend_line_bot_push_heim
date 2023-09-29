"use strict";
const { app } = require("./route/app");
// const path = require("path");
// require('dotenv').config({ path: path.resolve(__dirname, "../.env") });
const PORT = 9291;
app.listen(PORT, () => {
    console.log(`service haddle backend listen to port: ${PORT}, http://localhost:${PORT}/api/debug`);
});
