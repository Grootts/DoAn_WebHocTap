import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
class teacherController {
  static updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { password, name, description } = req.body;
    try {
      if (!id) {
        return res.status(200).json({
          status: "ERR",
          message: "Không tìm thấy giáo viên",
        });
      }

      const checkteacher = await authModel.findOne({
        _id: id,
      });

      if (checkteacher === null) {
        return res.status(200).json({
          status: "ERR",
          message: "Không tìm thấy giáo viên",
        });
      }
      if (password || name || description) {
        if (password.length < 16 && password) {
          const gensalt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, gensalt);
          await authModel.findByIdAndUpdate(
            checkteacher._id,
            {
              $set: {
                password: hashedPassword,
              },
            },
            { returnDocument: "after" }
          );
        }
        await authModel.findByIdAndUpdate(
          checkteacher._id,
          {
            $set: {
              name: name,
              description: description,
            },
          },
          { returnDocument: "after" }
        );
        return res.status(200).json(checkteacher);
      }
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

  static deleteTeacher = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(200).json({
          status: "ERR",
          message: "Id giáo viên không được trống",
        });
      }

      const checkteacher = await authModel.findOne({
        _id: id,
      });
      if (checkteacher == null) {
        return res.status(200).json({
          status: "ERR",
          message: "Không tìm thấy giáo viên",
        });
      }

      await authModel.findByIdAndDelete(id);
      return res.status(200).json({
        status: "OK",
        message: "Xóa giáo viên thành công",
      });
    } catch (e) {
      return res.status(404).json({
        message: "e.message",
      });
    }
  };
}
export default teacherController;
