import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkIsUserAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      // verify token
      const { userID } = jwt.verify(token, "bang");
      // Get User from Token
      req.user = await authModel.findById(userID).select("--password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "unAuthorized User" });
    }
  } else {
    return res.status(401).json({ message: "unAuthorized User" });
  }
};
// export const checkIsAdmin = async (req, res, next) => {
//   const { id } = req.body;
//   if (id) {
//     try {
//       const checkUser = await authModel.findOne({
//         _id: id,
//       });
//       if (checkUser.role === "admin") {
//         next();
//       }
//     } catch (error) {
//       return res.status(401).json({ message: "no permission" });
//     }
//   } else {
//     return res.status(401).json({ message: "id empty" });
//   }
// };
// export const checkIsTeacher = async (req, res, next) => {
//   const { id } = req.body;
//   if (id) {
//     try {
//       const checkUser = await authModel.findOne({
//         _id: id,
//       });
//       if (checkUser.role === "teacher") {
//         next();
//       }
//     } catch (error) {
//       return res.status(401).json({ message: "no permission" });
//     }
//   } else {
//     return res.status(401).json({ message: "id empty" });
//   }
// };
export default checkIsUserAuthenticated;
