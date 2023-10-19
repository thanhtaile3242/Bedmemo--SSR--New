const express = require("express");
const app = express();
const port = 8000;


// // View Engine
    app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(express.static('public'));



// Config req.body
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

// Router
    const webRouters = require("./routes/bedmemoRoutes");
    app.use("/", webRouters);

// Run server
 app.listen(port, () => console.log("Backend running on", port));