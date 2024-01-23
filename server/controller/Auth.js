const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//signup logic

exports.signUp = async (req, res) => {
  try {
    //fetch all data from req body

    const { firstName, lastName, email, password, confirmPassword } = req.body;
    //validate entered data

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All Feildes Are Required.",
      });
    }
    // match the confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password Not Match",
      });
    }

    //check user already easist or not

    const exstingUser = await User.findOne({ email });

    //if found
    if (exstingUser) {
      return res.status(400).json({
        success: false,
        message: "User Is Already Registered",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,

      password: hashedPassword,
    });

    console.log(newUser);
    //return res
    return res.status(200).json({
      success: true,
      message: "User Registerd Successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//login logic

exports.login = async (req, res) => {
  try {
    //fetch email,password data from req body

    const { email, password } = req.body;

    //validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }
    //check user

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    //generate jwt token after matching password

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      //create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        message: `User Login Success`,
        user,
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Login Failure, Please Try Again",
    });
  }
};
