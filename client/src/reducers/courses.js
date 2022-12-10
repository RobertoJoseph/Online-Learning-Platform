import {
  CREATE_COURSE,
  FETCH_ALL,
  GET_COURSE_DATA,
  FILTER_COURSES,
  GET_COURSE,
  ADD_RATING,
  ADD_REVIEW,
} from "../constants/courses";

export default (courses = [], action) => {
  console.log("Iam here");
  switch (action.type) {
    case FILTER_COURSES:
      return action.payload;
    case "FETCH_ALL": {
      return [...courses, ...action.payload];
    }
    case "FILTER_SUBJECT_RATING":
      return action.payload;
    case "FETCH_ALL_INSTRUCTOR_COURSES":
      return action.payload;
    case "FILTER_INSTRUCTOR_COURSES":
      return action.payload;
    case CREATE_COURSE:
      return [...courses, action.payload];
    case GET_COURSE_DATA: {
      console.log("THE REDUCER COURSES", courses);
      console.log(action.payload);
      return courses.filter((course) => course._id === action.payload._id);
    }
    case GET_COURSE:
      return courses.filter((course) => course._id === action.payload._id);
    case ADD_RATING:
      console.log("Im in reducer add rating");
      return courses.filter((course) => course._id === action.payload._id);
    case ADD_REVIEW:
      return courses.filter((course) => course._id === action.payload._id);
    default:
      return courses;
  }
};
