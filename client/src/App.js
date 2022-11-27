import React from "react";
import Navbar from "./components/Navbar";
import MenuAppBar from "./components/Navbar";
import Home from "./components/HomePage/Home";
import ViewAllCourses from "./components/ViewAllCoursesPage/ViewAllCourses";
import { InstructorCourses } from "./components/Instructor/InstructorCourses";
import { Switch, Route } from "react-router-dom";
import CourseStructure from "./components/Instructor/CourseStructure";
import Admin from "./components/Admin/Admin.js";
import Exercise from "./components/Instructor/Exercise";
import { CourseContent } from "./components/Course/CourseContent";
import CoursePage from "./components/Course/CoursePage";
import ScrollToTop from "./components/ScrollToTop";
import { MyCourses } from "./components/Trainee/MyCourses";
import { Profile } from "./components/Profile/Profile";
export const App = () => {
  return (
    <>
      {/* <MenuAppBar></MenuAppBar>
      <Home></Home> */}
      <Navbar></Navbar>
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/viewAll">
            <ViewAllCourses />
          </Route>
          <Route exact path="/instructorpage">
            <InstructorCourses></InstructorCourses>
          </Route>
          <Route exact path="/createCourse">
            <CourseStructure></CourseStructure>
          </Route>
          <Route path="/adminPage">
            <Admin></Admin>
          </Route>
          <Route path="/course/*">
            <CoursePage></CoursePage>
          </Route>
          <Route path="/myCourses">
            <MyCourses></MyCourses>
          </Route>
          <Route path="/profile">
            <Profile></Profile>
          </Route>
        </Switch>
      </ScrollToTop>
    </>
  );
};

export default App;
