import express from "express";
import {
  createInstructor,
  filterCourseBySubjectAndPrice,
  updateInformation,
} from "../controller/instructor.js";
import { viewCourseTitles } from "../controller/instructor.js";
import { addNewCourse } from "../controller/instructor.js";
import { searchByTitleOrSubjectOrInstructor } from "../controller/course.js";
const router = express.Router();

router.post("/", createInstructor);
router.get("/viewTitles/:id", viewCourseTitles);

router.get("/filterBySubjectAndPrice/:id", filterCourseBySubjectAndPrice);

router.post("/addNewCourse/:id", addNewCourse);
router.patch("/updateInformation/:id", updateInformation);


export default router;
