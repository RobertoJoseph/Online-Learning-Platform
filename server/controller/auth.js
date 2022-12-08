import IndividualTrainee from "../models/individualTrainee.js";
import Instructor from "../models/instructor.js";
import CorporateTrainee from "../models/corporateTrainee.js";
import bcrypt from "bcryptjs";

//Make function to return if it is same password or not
async function checkPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export const signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("BAckend is working", email, password);
  const individualTrainee = await IndividualTrainee.findOne({ email });
  console.log("THIS IS THE INDIVIDUAL TRAINNEE", individualTrainee);
  if (!individualTrainee) {
    const instructor = await Instructor.findOne({ email });
    if (!instructor) {
      const corporateTrainee = await CorporateTrainee.findOne({ email });
      if (!corporateTrainee) {
        return res.status(404).json({ message: "User doesn't exist" });
      }
      const isValidPassword = checkPassword(
        password,
        corporateTrainee.password
      );
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = await corporateTrainee.generateAuthToken();
      res.status(200).json({
        result: corporateTrainee,
        type: "corporateTrainee",
        token: token,
      });
    }
    const isValidPassword = checkPassword(password, instructor.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await instructor.generateAuthToken();
    res
      .status(200)
      .json({ result: instructor, type: "instructor", token: token });
  }
  const isValidPassword = await checkPassword(
    password,
    individualTrainee.password
  );
  console.log("isValidPassword", isValidPassword);
  if (!isValidPassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = await individualTrainee.generateAuthToken();
  res.status(200).json({
    result: individualTrainee,
    type: "individualTrainee",
    token: token,
  });
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const individualTrainee = await IndividualTrainee.findOne({ email });
  if (individualTrainee) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }
  const hashPassword = await bcrypt.hash(password, 12);
  const newIndividualTrainee = await IndividualTrainee.create({
    email,
    password: hashPassword,
    firstName,
    lastName,
  });
  const token = await newIndividualTrainee.generateAuthToken();
  res.status(200).json({
    result: newIndividualTrainee,
    type: "individualTrainee",
    token: token,
  });
};
