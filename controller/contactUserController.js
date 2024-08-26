
const User = require("../model/contactUserSchema");

exports.getContactUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json({ user });
  } catch (err) {
    res.status(400).json({
      message: "user not found",
    });
  }
};

exports.addContactUser = async (req, res) => {
  const { name, email, subject, message } = req.body;
  const location =req.body.location;

    try {
        const newContactUser = await User.create(
          {
            name,
                email,
                subject,
                message,
                location
          },
        );
        res.status(200).json({ message: " user is created" });
      console.log(newContactUser)
      res.json({newContactUser})

    // const newUser = new User([
    //   {
    //     name,
    //     email,
    //     subject,
    //     message,
    //   },
    // ]);
    // await newUser.save();
    // res.status(200).json({ message: " user is created" });
  } catch (error) {
    res.status(400).json({
      message: "user not found",
    });
  }
};
