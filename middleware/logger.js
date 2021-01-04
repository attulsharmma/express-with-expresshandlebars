import fs from "fs";
import moment from "moment";

/*Middleware 1 which is used to logging of the  */
const logger = (req, res, next) => {
  // console.log(
  //   `${req.protocol}://${req.get("host")}${
  //     req.originalUrl
  //   }: ${moment().format()}`
  // );
  fs.writeFile(
    "logs.txt",
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    } : ${moment().format()}`,
    (err) => {
      if (err) return console.log(err);
    }
  );
  next();
};

export default logger;
