import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

class authController {
  static userRegistration = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      if (name && email && password) {
        const isUser = await authModel.findOne({ email: email });
        if (isUser) {
          return res
            .status(400)
            .json({ message: "Email người dùng đã tồn tại" });
        } else {
          // Password HAshing
          const genSalt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, genSalt);

          // Generate Token

          const secretKey = "websitehoctap";

          const token = jwt.sign({ email: email }, secretKey, {
            expiresIn: "10m",
          });

          const link = `https://website-study.onrender.com/api/auth/verify/${token}`;

          await sendEmail(email, "register", link);
          // save the user
          const newUser = authModel({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            role: "student",
          });

          const resUser = await newUser.save();
          if (resUser) {
            return res.status(201).json({
              message: "Đăng ký thành công, hãy xác thực email",
              user: resUser,
            });
          }
        }
      } else {
        return res.status(400).json({ message: "Không được để trống dữ liệu" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isUser = await authModel.findOne({ email: email });
        if (isUser) {
          // Check is User Verified

          const isVerifiedProfile = await authModel.findById(isUser._id);

          if (isVerifiedProfile.isVerified) {
            if (
              email === isUser.email &&
              (await bcryptjs.compare(password.toString(), isUser.password))
            ) {
              // Generate token
              const token = jwt.sign({ userID: isUser._id }, "bang", {
                expiresIn: "2d",
              });
              return res.status(200).json({
                message: "Đăng nhập thành công",
                token,
                name: isUser.name,
                role: isUser.role,
                id: isUser._id,
                email: isUser.email,
              });
            } else {
              return res
                .status(400)
                .json({ message: "Thông tin không hợp lệ" });
            }
          } else {
            return res.status(400).json({ message: "Đang chờ xác minh email" });
          }
        } else {
          return res.status(400).json({ message: "Người dùng chưa đăng ký" });
        }
      } else {
        return res.status(400).json({ message: "Không được để trống dữ liệu" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static changePassword = async (req, res) => {
    const { newpassword, confirmpassword } = req.body;
    try {
      if (newpassword === confirmpassword) {
        const gensalt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newpassword, gensalt);
        await authModel.findByIdAndUpdate(req.user._id, {
          password: hashedPassword,
        });
        return res.status(200).json({ message: "Đổi mật khẩu thành công" });
      } else {
        return res
          .status(400)
          .json({ message: "Mật khẩu và xác nhận mật khẩu không khớp" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
      if (email) {
        const isUser = await authModel.findOne({ email: email });
        if (isUser) {
          // generate token
          const secretKey = isUser._id + "bang";

          const token = jwt.sign({ userID: isUser._id }, secretKey, {
            expiresIn: "5m",
          });

          const link = `https://website-study.onrender.com/user/reset/${isUser._id}/${token}`;
          // email sending
          await sendEmail(email, "resetpassword", link);
          return res.status(200).json({ message: "Đã gửi email" });
        } else {
          return res.status(201).json({ message: "Email không hợp lệ" });
        }
      } else {
        return res.status(202).json({ message: "Email không được trống" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static forgetPasswordEmail = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const { id, token } = req.params;

    try {
      if (newPassword && confirmPassword && id && token) {
        if (newPassword === confirmPassword) {
          // token verifiying
          const isUser = await authModel.findById(id);
          const secretKey = isUser._id + "bang";
          const isValid = await jwt.verify(token, secretKey);
          if (isValid) {
            // password hashing

            const genSalt = await bcryptjs.genSalt(10);
            const hashedPass = await bcryptjs.hash(newPassword, genSalt);

            const isSuccess = await authModel.findByIdAndUpdate(isUser._id, {
              $set: {
                password: hashedPass,
              },
            });

            if (isSuccess) {
              return res.status(200).json({
                message: "Đổi mật khẩu thành công",
              });
            }
          } else {
            return res.status(400).json({
              message: "Liên kết đã hết hạn",
            });
          }
        } else {
          return res
            .status(400)
            .json({ message: "Mật khẩu và xác nhận mật khẩu không khớp" });
        }
      } else {
        return res.status(400).json({ message: "Không được để trống dữ liệu" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static saveVerifiedEmail = async (req, res) => {
    const { token } = req.params;
    try {
      if (token) {
        // token verify
        const secretKey = "websitehoctap";
        const isEmailVerified = await jwt.verify(token, secretKey);
        if (isEmailVerified) {
          const getUser = await authModel.findOne({
            email: isEmailVerified.email,
          });

          const saveEmail = await authModel.findByIdAndUpdate(getUser._id, {
            $set: {
              isVerified: true,
            },
          });

          if (saveEmail) {
            return res
              .status(200)
              .json({ message: "Email xác thực thành công" });
          }

          //
        } else {
          return res.status(400).json({ message: "Liên kết đã hết hạn" });
        }
      } else {
        return res.status(400).json({ message: "URL không hợp lệ" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static teacherRegistration = async (req, res) => {
    const { name, email, password, description } = req.body;
    try {
      if (name && email && password) {
        const isteacher = await authModel.findOne({ email: email });
        if (isteacher) {
          return res.status(400).json({ message: "Email đã tốn tại" });
        } else {
          // Password HAshing
          const genSalt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, genSalt);
          const secretKey = "websitehoctap";

          const token = jwt.sign({ email: email }, secretKey, {
            expiresIn: "10m",
          });

          const link = `https://website-study.onrender.com/api/auth/verify/${token}`;

          await sendEmail(email, "register", link);
          // save the teacher
          const newteacher = authModel({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            role: "teacher",
            description,
          });

          const resteacher = await newteacher.save();
          if (resteacher) {
            return res.status(200).json({
              message: "Đăng ký thành công, hãy xác thực email",
              teacher: resteacher,
            });
          }
        }
      } else {
        return res.status(400).json({ message: "Không được để trống dữ liệu" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static teacherLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isteacher = await authModel.findOne({ email: email });
        if (isteacher) {
          // Check is teacher Verified

          const isVerifiedProfile = await authModel.findById(isteacher._id);

          if (isVerifiedProfile.isVerified) {
            if (
              email === isteacher.email &&
              (await bcryptjs.compare(password.toString(), isteacher.password))
            ) {
              // Generate token
              const token = jwt.sign({ teacherID: isteacher._id }, "bang", {
                expiresIn: "2d",
              });
              return res.status(200).json({
                message: "Login Successfully",
                token,
                name: isteacher.name,
                role,
                description,
              });
            } else {
              return res
                .status(400)
                .json({ message: "Thông tin không hợp lệ!" });
            }
          } else {
            return res.status(400).json({ message: "Email đang chờ xác thực" });
          }
        } else {
          return res.status(400).json({ message: "Giáo viên chưa đăng ký" });
        }
      } else {
        return res.status(400).json({ message: "Không được để trống dữ liệu" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default authController;
