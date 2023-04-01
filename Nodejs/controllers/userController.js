import authModel from "../models/authModel.js";

class userController {
  static updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      if (!id) {
        return res.status(200).json({
          status: "ERR",
          message: "The userId is required",
        });
      }

      const checkUser = await authModel.findOne({
        _id: id,
      });
      if (checkUser === null) {
        return res.status(200).json({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updatedUser = await authModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return res.status(200).json(updatedUser);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(200).json({
          status: "ERR",
          message: "The userId is required",
        });
      }

      const checkUser = await authModel.findOne({
        _id: id,
      });
      if (checkUser == null) {
        return res.status(200).json({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete(id);
      return res.status(200).json({
        status: "OK",
        message: "Delete user success",
      });
    } catch (e) {
      return res.status(404).json({
        message: userId,
      });
    }
  };
}

export default userController;
