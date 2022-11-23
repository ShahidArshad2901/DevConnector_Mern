const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcryptjs = require("bcryptjs");

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(), // not null validation
    check("email", "please write a valid email").isEmail(), // email format validation
    check(
      "password",
      "Please enter a password with 6 or more character"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if User exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already exists " }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt the password
      const salt = await bcrypt.genSalt(10); // this will create salt

      user.password = await bcrypt.hash(password, salt); // this will create a hash

      await user.save(); // used await because user.ssave returns promise

      // Return JSON web token

      res.send("User Registered");
    } catch (error) {
      console.log(error.message, "Error");
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
