import Course from "../models/courseModel.js";
class courseController {
  static createCourse = async (req, res) => {
    const { name, image, type, price, description, createdBy } = req.body;

    if (!name || !image || !type || !description || !price || !createdBy) {
      return res.json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const checkCourse = await Course.findOne({
      name: name,
    });
    if (checkCourse !== null) {
      return res.status(200).json({
        status: "ERR",
        message: "The name of Course is already",
      });
    }
    const newCourse = await Course.create({
      name,
      image,
      type,
      price,
      description,
      createdBy: createdBy,
    });
    if (newCourse) {
      return res.status(200).json({
        status: "OK",
        message: "SUCCESS",
        data: newCourse,
      });
    }
    if (!newCourse) {
      return res.status(404).json({
        status: "error",
        message: "no",
        data: newCourse,
      });
    }
  };

  static updateCourse = async (req, res) => {
    const courseId = req.params.id;
    const data = req.body;
    try {
      if (!courseId) {
        return res.status(200).json({
          status: "ERR",
          message: "The CourseId is required",
        });
      }
      const checkCourse = await Course.findOne({
        _id: courseId,
      });
      if (checkCourse === null) {
        return res.status(200).json({
          status: "ERR",
          message: "The Course is not defined",
        });
      }

      const updatedCourse = await Course.findByIdAndUpdate(courseId, data, {
        new: true,
      });
      return res.status(200).json({
        status: "OK",
        message: "SUCCESS",
        data: updatedCourse,
      });
    } catch (e) {
      return res.status(404).json({
        message: e.message,
      });
    }
  };
  static getAllCourse = async (req, res) => {
    try {
      const { limit, page, sort, filter } = req.query;
      const totalCourse = await Course.count();
      let allCourse = [];
      if (filter) {
        const label = filter[0];
        const allObjectFilter = await Course.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
        return res.status(200).json({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalCourse,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalCourse / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allCourseSort = await Course.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
          .sort({ createdAt: -1, updatedAt: -1 });
        return res.status(200).json({
          status: "OK",
          message: "Success",
          data: allCourseSort,
          total: totalCourse,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalCourse / limit),
        });
      }
      if (!limit) {
        allCourse = await Course.find().sort({ createdAt: -1, updatedAt: -1 });
      } else {
        allCourse = await Course.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }
      return res.status(200).json({
        status: "OK",
        message: "Success",
        data: allCourse,
        total: totalCourse,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalCourse / limit),
      });
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };
  static getDetailsCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
      if (!courseId) {
        return res.status(200).json({
          status: "ERR",
          message: "The CourseId is required",
        });
      }
      const DetailsCourse = await Course.findOne({
        _id: courseId,
      });
      if (DetailsCourse === null) {
        return res.status(200).json({
          status: "ERR",
          message: "The Course is not defined",
        });
      }

      return res.status(200).json({
        status: "OK",
        message: "SUCESS",
        data: DetailsCourse,
      });
    } catch (e) {
      return res.status(404).json({
        message: e.message,
      });
    }
  };
  static deleteCourse = async (req, res) => {
    try {
      const courseId = req.params.id;
      if (!courseId) {
        return res.status(200).json({
          status: "ERR",
          message: "The CourseId is required",
        });
      }
      const checkCourse = await Course.findOne({
        _id: courseId,
      });
      if (checkCourse === null) {
        return res.status(200).json({
          status: "ERR",
          message: "The Course is not defined",
        });
      }

      await Course.findByIdAndDelete(courseId);
      return res.status(200).json({
        status: "OK",
        message: "Delete Course success",
      });
    } catch (e) {
      return res.status(404).json({
        message: e.message,
      });
    }
  };
}
export default courseController;
