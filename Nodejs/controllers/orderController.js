import orderModel from "../models/orderModel.js";
import courseModel from "../models/courseModel.js";

class orderController {
  static createOrder = async (req, res) => {
    const { orderItems, totalPrice, userId, userEmail, isPaid, paidAt } =
      req.body;
    try {
      if ((!totalPrice, !userId, !userEmail)) {
        return res.status(200).json({
          status: "ERR",
          message: "Không được để trống giá trị đầu vào",
        });
      }
      orderItems.map(async (order) => {
        const productData = await courseModel.findOne({
          _id: order.course,
        });
        if (productData) {
          return {
            status: "OK",
            message: "SUCCESS",
          };
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.course,
          };
        }
      });

      const createdOrder = await orderModel.create({
        orderItems,
        totalPrice,
        userId: userId,
        userEmail: userEmail,
        isPaid,
        paidAt,
      });
      if (createdOrder) {
        return res.status(200).json({
          status: "OK",
          message: "Tạo hóa đơn thành công",
        });
      }
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

  static getAllOrderDetails = async (req, res) => {
    const userId = req.params.id;
    try {
      if (!userId) {
        return res.status(200).json({
          status: "ERR",
          message: "UserId không được để trống",
        });
      }
      const order = await orderModel
        .find({
          user: id,
        })
        .sort({ createdAt: -1, updatedAt: -1 });
      if (order === null) {
        return res.status(200).json({
          status: "ERR",
          message: "Không tìm thấy hóa đơn",
        });
      }

      return res.status(200).json({
        status: "OK",
        message: "Lấy hóa đơn thành công",
        data: order,
      });
    } catch (e) {
      // console.log(e)
      return res.status(404).json({
        message: e,
      });
    }
  };

  static getDetailsOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(200).json({
          status: "ERR",
          message: "UserId không được để trống",
        });
      }
      const order = await orderModel.findById({
        _id: id,
      });
      if (order === null) {
        return res.status(200).json({
          status: "ERR",
          message: "Không tìm thấy hóa đơn",
        });
      }

      return res.status(200).json({
        status: "OK",
        message: "Tạo hóa đơn thành công",
        data: order,
      });
    } catch (e) {
      // console.log(e)
      return res.status(404).json({
        message: e,
      });
    }
  };
  static getDetailsOneOrder = async (req, res) => {
    try {
      const { idUser } = req.body;
      if (!idUser) {
        return res.status(200).json({
          status: "ERR",
          message: "UserId không được trống",
        });
      }
      const order = await orderModel.findOne({
        user: idUser,
      });
      if (order === null) {
        return res.status(200).json({
          status: "ERR",
          message: "Không tìm thấy hóa đơn",
        });
      }

      return res.status(200).json({
        status: "OK",
        message: "SUCESSS",
        data: order.orderItems,
      });
    } catch (e) {
      // console.log(e)
      return res.status(404).json({
        message: e,
      });
    }
  };

  static cancelOrderDetails = async (req, res) => {
    const data = req.body.orderItems;
    const orderId = req.body.orderId;
    try {
      if (!orderId) {
        return res.status(200).json({
          status: "ERR",
          message: "orderId không được trống",
        });
      }
      let order = [];
      const promises = data.map(async (order) => {
        const productData = await courseModel.findOne(
          {
            _id: order.course,
          },
          { new: true }
        );
        if (productData) {
          order = await orderModel.findByIdAndDelete(id);
          if (order === null) {
            return res.status(200).json({
              status: "ERR",
              message: "Không tìm thấy hóa đơn",
            });
          }
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.course,
          };
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results[0] && results[0].id;

      if (newData) {
        return res.status(200).json({
          status: "ERR",
          message: `Sản phẩm với id: ${newData} không tồn tại`,
        });
      }
      return res.status(200).json({
        status: "OK",
        message: "success",
        data: order,
      });
    } catch (e) {
      // console.log(e)
      return res.status(404).json({
        message: e,
      });
    }
  };

  static getAllOrder = async (req, res) => {
    try {
      const allOrder = await orderModel.find().sort({
        createdAt: -1,
        updatedAt: -1,
      });
      return res.status(200).json({
        status: "OK",
        message: "Success",
        data: allOrder,
      });
    } catch (e) {
      // console.log(e)
      return res.status(404).json({
        message: e,
      });
    }
  };
}
export default orderController;
