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
  static getDetailsUser = async (req, res) => {
    const userId = req.params.id;
    try {
      if (!userId) {
        return res.status(200).json({
          status: "ERR",
          message: "The UserId is required",
        });
      }
      const DetailsUser = await authModel.findOne({
        _id: userId,
      });
      if (DetailsUser === null) {
        return res.status(200).json({
          status: "ERR",
          message: "The User is not defined",
        });
      }

      return res.status(200).json({
        status: "OK",
        message: "SUCESS",
        data: DetailsUser,
      });
    } catch (e) {
      return res.status(404).json({
        message: e.message,
      });
    }
  };
  static getAllUser = async (req, res) => {
    try {
      const allUser = await authModel
        .find()
        .sort({ createdAt: -1, updatedAt: -1 });
      res.status(200).json({
        status: "OK",
        message: "Success",
        data: allUser,
      });
    } catch (e) {
      return res.status(404).json({
        message: e.message,
      });
    }
  };
  static deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
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
      console.log(checkUser.role);
      if (checkUser.role === "User") {
        return res.status(200).json({
          status: "ERR",
          message: "no permission",
        });
      }
      await authModel.findByIdAndDelete(id);
      return res.status(200).json({
        status: "OK",
        message: "Delete user success",
      });
    } catch (e) {
      return res.status(404).json({
        message: e.message,
      });
    }
  };
}

export default userController;
