import authModel from "../models/authModel.js";
class teacherController {
  static updateTeacher = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      if (!id) {
        return res.status(200).json({
          status: "ERR",
          message: "The teacherId is required",
        });
      }

      const checkteacher = await authModel.findOne({
        _id: id,
      });

      if (checkteacher === null) {
        return res.status(200).json({
          status: "ERR",
          message: "The teacher is not defined",
        });
      }
      const updatedteacher = await authModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return res.status(200).json(updatedteacher);
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
          message: "The teacherId is required",
        });
      }

      const checkteacher = await authModel.findOne({
        _id: id,
      });
      if (checkteacher == null) {
        return res.status(200).json({
          status: "ERR",
          message: id,
        });
      }

      await authModel.findByIdAndDelete(id);
      return res.status(200).json({
        status: "OK",
        message: "Delete teacher success",
      });
    } catch (e) {
      return res.status(404).json({
        message: "e.message",
      });
    }
  };
}
export default teacherController;
