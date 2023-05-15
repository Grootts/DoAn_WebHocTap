import Lesson from "../models/lessonModel.js";
class lessonController {
  static createLesson = async (res, req) => {
    const { course_id } = req.body;
    try {
      if (!course_id) {
        return res.status(200).json({
          status: "ERR",
          message: "The input is required",
        });
      }
      const createLesson = await Lesson.create({
        course_id,
        lesson,
      });
      if (createLesson) {
        return res.status(200).json({
          status: "OK",
          message: "SUCCESS",
          data: newCourse,
        });
      }
      if (!createLesson) {
        return res.status(404).json({
          status: "error",
          message: "no",
          data: createLesson,
        });
      }
    } catch (error) {
      return res.status(404).json({
        message: e.message,
      });
    }
  };
  static getAllLesson = async (req, res) => {
    try {
      const allLesson = await Lesson.find().sort({
        createdAt: -1,
        updatedAt: -1,
      });
      res.status(200).json({
        status: "OK",
        message: "Success",
        data: allLesson,
      });
    } catch (e) {
      return res.status(404).json({
        message: e.message,
      });
    }
  };
  static getDetailsLesson = async (req, res) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(200).json({
          status: "ERR",
          message: "The course_id is required",
        });
      }
      const DetailsLesson = await Lesson.findOne({ course_id: id });

      if (DetailsLesson === null) {
        return res.status(200).json({
          status: "ERR",
          message: "The Lesson is not defined",
        });
      }

      return res.status(200).json({
        status: "OK",
        message: "SUCESS",
        data: DetailsLesson,
      });
    } catch (e) {
      return res.status(404).json({
        message: e.message,
      });
    }
  };
  static addLesson = async (req, res) => {
    const { id } = req.params;
    const { nameLesson, description } = req.body;

    const newLesson = await Lesson.findOne({ course_id: id });
    if (newLesson) {
      var addLesson = [];
      for (let i = 0; i < newLesson.lesson.length; i++) {
        addLesson.push(newLesson.lesson[i]);
      }
      addLesson.push(req.body);
      const updateLesson = await Lesson.findOneAndUpdate(
        { course_id: id },
        { $set: { lesson: addLesson } },
        { returnDocument: "after" }
      );
      res.status(200).json({
        status: "OK",
        message: "SUCCESS",
        data: updateLesson,
      });
    } else {
      const newLesson = Lesson({
        course_id: id,
        lesson: [
          {
            nameLesson,
            description,
          },
        ],
      });
      const createLesson = newLesson.save();
      res.status(200).json({
        status: "OK",
        message: "SUCCESS",
        data: createLesson,
      });
    }
  };
  static updateLesson = async (req, res) => {
    const { id } = req.params;
    const updateLesson = await Lesson.findOneAndUpdate(
      { "lesson._id": id },
      { $set: { "lesson.$": req.body } },
      { new: true }
    );
    res.status(200).json({
      status: "OK",
      message: "SUCCESS",
      data: updateLesson,
    });
  };
  static deleteLesson = async (req, res) => {
    const { id } = req.params;
    const updateLesson = await Lesson.findOneAndUpdate(
      { "lesson._id": id },
      { $set: { "lesson.$": [] } },
      { new: true }
    );
    res.status(200).json({
      status: "OK",
      message: "SUCCESS",
      data: updateLesson,
    });
  };
}
export default lessonController;
