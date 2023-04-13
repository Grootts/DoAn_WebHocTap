import orderModel from "../models/orderModel.js";
import courseModel from "../models/courseModel.js";

class orderController {
  static createOrder = async (req, res) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      totalPrice,
      user,
      isPaid,
      paidAt,
    } = req.body;
    try {
      if (!itemsPrice || !totalPrice) {
        return res.status(200).json({
          status: "ERR",
          message: "The input is required",
        });
      }
      const promises = orderItems.map(async (order) => {
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
      const results = await Promise.all(promises);
      const newData = results && results.filter((item) => item.id);
      if (newData.length) {
        const arrId = [];
        newData.forEach((item) => {
          arrId.push(item.id);
        });
        return res.status(200).json({
          status: "ERR",
          message: `San pham voi id: ${arrId.join(",")} khong du hang`,
        });
      } else {
        const createdOrder = await orderModel.create({
          orderItems,
          paymentMethod,
          itemsPrice,
          totalPrice,
          user: user,
          isPaid,
          paidAt,
        });
        if (createdOrder) {
          return res.status(200).json({
            status: "OK",
            message: "success",
          });
        }
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
          message: "The userId is required",
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
          message: "The order is not defined",
        });
      }

      return res.status(200).json({
        status: "OK",
        message: "SUCESSS",
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
          message: "The userId is required",
        });
      }
      const order = await orderModel.findById({
        _id: id,
      });
      if (order === null) {
        return res.status(200).json({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      return res.status(200).json({
        status: "OK",
        message: "SUCESSS",
        data: order,
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
          message: "The orderId is required",
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
              message: "The order is not defined",
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
          message: `San pham voi id: ${newData} khong ton tai`,
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
