import express from "express";
import exphbs from "express-handlebars";
import path from "path";
// import logger from "./middleware/logger.js";
import MemberRouter from "./routes/api/MemberRoutes.js";
import members from "./Members.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // used to get form data

// app.use(logger);
//Handlebars Middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.get("/", (req, res) =>
  res.render("index", {
    title: "Members App : List",
    heading: "Members List",
    members,
  })
);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

//Members API route
app.use("/api/members", MemberRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
