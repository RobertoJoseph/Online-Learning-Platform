import mongoose from "mongoose";
import Course from "../models/course.js";
import { validateCourse } from "../models/course.js";
import Instructor from "../models/instructor.js";

export const createCourse = async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    title,
    summary,
    subject,
    duration,
    releaseDate,
    language,
    image,
    rating,
    previewVideo,
    outlines,
    excercises,
    price,
    instructorId,
    discount,
  } = req.body;
  console.log(outlines[0]);

  try {
    const course = await new Course({
      title,
      summary,
      subject,
      duration,
      releaseDate,
      language,
      image,
      rating,
      previewVideo,
      outlines,
      excercises,
      price,
      instructorId,
      discount,
    });
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.send(error.message); //test
  }
};

//guest/instructor/individual trainee/corporate trainee
export const getCoursesDetails = async (_req, res) => {
  try {
    const courses = await Course.find().select({
      title: 1,
      duration: 1,
      rating: 1,
    });
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send(err);
  }
};

//guest/instructor/individual trainee
export const getPriceOfCourses = async (_req, res) => {
  try {
    const courses = await Course.find().select({ price: 1 });
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send(err);
  }
};

//guest/instructor/individual trainee
export const getCourseInformation = async (req, res) => {
  try {
    const id = req.params.id;
    const courses = await Course.findById(id).select({
      subTitles: 1,
      exercises: 1,
      duration: 1,
      price: 1,
      discount: 1,
    });
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send(err);
  }
};

//guest/instructor/individual trainee
export const filterBasedOnPrice = async (req, res) => {
  const courses = await Course.find({
    price: { $lte: parseInt(req.body.max) },
  }).and({
    price: { $gte: parseInt(req.body.min) },
  });
  res.send(courses);
};

//TODO search for a course based on course title or subject or instructor
//guest/instructor/individual trainee /corporate trainee
export const findCourseBySubjectAndRating = async (req, res) => {
  try {
    const { subject, rating } = req.body;
    const courses = await Course.find().or([
      { rating: rating },
      { subject: subject },
    ]);
    if (!courses) return res.status(200).send({ message: "No course found" });
    return res.status(200).send(courses);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const searchByTitleOrSubjectOrInstructor = async (req, res) => {
  try {
    const { title, subject, instructor } = req.body;
    const titleRgx = new RegExp("^" + title, "i");
    const subjectRgx = new RegExp("^" + subject, "i");
    const instructorRgx = new RegExp("^" + instructor, "i");
    const instructorID = await Instructor.find({
      $or: [{ userName: instructorRgx }],
    }).select("_id");
    const courses = await Course.find({
      $or: [
        { title: titleRgx },
        { subject: subjectRgx },
        {
          instructorId: {
            $in: instructorID,
          },
        },
      ],
    });
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const getAllCourses = async (_req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send(err);
  }
};
