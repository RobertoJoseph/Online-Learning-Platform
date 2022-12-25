import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Link } from "@mui/material";
import useStyles from "../../css/course";
import styled from "@emotion/styled";
import { payCourse } from "../../api/individualTrainees";

import { useHistory } from "react-router-dom";
export default function CourseCard({
  isCourseInUserCourses,
  course,
  traineeType,
}) {
  const { classes } = useStyles();
  const history = useHistory();
  const MyInfo = styled(Typography)({
    color: "#757071",
    fontSize: 12,
  });
  console.log("IS HERE COURSE ? : ", isCourseInUserCourses);
  console.log("THE CoURSE IS  : ", course);

  const payForCourse = async () => {
    try {
      const { data } = await payCourse({
        course,
        instructorId: course.instructor.instructorId,
      });
      window.location = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const requestCourse = () => {
    console.log("Request Course");
  };

  let button;
  if (isCourseInUserCourses) {
    button = (
      <Button
        fullWidth
        onClick={() => history.push("/test")}
        sx={{
          "&:hover": { backgroundColor: "#2F2B2E" },
          backgroundColor: "#2F2B2E",
        }}
        variant="contained"
      >
        Go to Course
      </Button>
    );
  } else if (traineeType === "corporateTrainee") {
    button = (
      <Button
        fullWidth
        sx={{
          "&:hover": { backgroundColor: "#2F2B2E" },
          backgroundColor: "#2F2B2E",
        }}
        variant="contained"
        onClick={requestCourse}
      >
        {" "}
        Request Course
      </Button>
    );
  } else {
    button = (
      <Button
        fullWidth
        sx={{
          "&:hover": { backgroundColor: "#2F2B2E" },
          backgroundColor: "#2F2B2E",
        }}
        variant="contained"
        onClick={payForCourse}
      >
        {" "}
        Add to Cart
      </Button>
    );
  }

  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
        component="iframe"
        image="https://www.youtube.com/embed/TpWqNqNv2AQ"
        title="YouTube video player"
        controls
        alt="green iguana"
        sx={{ width: "100%", height: "230px" }}
      />
      <CardContent>
        <Typography
          className={classes.coursePrice}
          gutterBottom
          variant="h5"
          component="div"
        >
          ${course.price}
        </Typography>
        <Grid columnSpacing={4} container direction="row">
          <Grid item md={12}>
            {" "}
            {button}{" "}
          </Grid>

          <Grid mt={2} item md={12}>
            <div className={classes.buyNow}>
              <Typography
                sx={{ fontWeight: "bold", padding: 1, textAlign: "center" }}
                variant="body1"
              >
                {/* TODO Checking if he has the course */}
                Buy Now
              </Typography>
            </div>
          </Grid>
          <Grid container alignItems="center" direction="column" item>
            <Grid mt={1} item>
              <MyInfo>30-Day Money-Back Guarantee</MyInfo>
            </Grid>
            <Grid mt={1} item>
              <MyInfo>Full Lifetime Access</MyInfo>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
