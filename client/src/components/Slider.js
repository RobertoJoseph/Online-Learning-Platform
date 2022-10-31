import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import course from "../images/course.jpeg";
import useStyles from "../css/slider.js";
import { Stack } from "@mui/system";
import CourseDetails from "./Course/CourseDetails";
import { useRef } from "react";
import "../css/card.css";

import { useSelector } from "react-redux";
import currencyRates from "../reducers/currencyRates";
const arr = [
  { id: "1", title: "7amada Bena" },
  { id: "2", title: "Yalla yel3b" },
  { id: "3", title: "Essam ElDeen" },
  { id: "5", title: "ElDeen Ye3" },
  { id: "6", title: "Khaled ABo" },
  { id: "7", title: "ElWafaa kora" },
  { id: "8", title: "Khaled Essam" },
  { id: "9", title: "Heidar Khaled" },
  { id: "10", title: "Ahmed Heidar" },
];

export const SimpleSlider = () => {
  const [detailsBox, setDetailsBox] = useState(false);
  const [title, setTitle] = useState("");
  const courses = useSelector((c) => c.courses);
  const selectedCountry = useSelector((c) => c.selectedCountry);
  const rates = useSelector((c) => c.currencyRates);
  console.log(courses);
  console.log(selectedCountry);
  console.log(rates);

  const handleMouseOver = (event, title) => {
    console.log(event);
    console.log("sdsd");
    setTitle(title);
    setDetailsBox(true);
  };
  const handleMouseOut = (event) => {
    setDetailsBox(false);
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#808080" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#808080" }}
        onClick={onClick}
      />
    );
  }
  const { classes } = useStyles();
  var settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div positon="relative">
      <div style={{ width: "1200px" }}>
        <Slider {...settings}>
          {courses.map((course, index) => {
            return (
              <Card elevation={0} className={classes.cardGrid} key={index}>
                <CardMedia
                  component="img"
                  image={course}
                  className={classes.cardMedia}
                  // onMouseOver={(event) => handleMouseOver(event, item.title)}
                  // onMouseOut={handleMouseOut}
                ></CardMedia>

                <CardContent>
                  <Typography
                    className={classes.cardHeader}
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.summary}
                  </Typography>

                  <Stack spacing={1} direction="row">
                    <p>4.5</p>
                    <Rating readOnly sx={{ alignItems: "center" }}></Rating>
                    <p style={{ alignSelf: "center" }}>n5332</p>
                  </Stack>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedCountry==="USA"?"$"+(course.price*rates[0]).toFixed(2)+" USD":selectedCountry==="CANADA"?"$"+(course.price*rates[1]).toFixed(2)+" CAD":(course.price).toFixed(2)+" EGP"}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Slider>
      </div>

      
    </div>
  );
};
export default SimpleSlider;
