const BadImage = require("../models/BadImage");

module.exports = {

  createBadImage: async (req, res) => {
    try {
      const newBadImage = await BadImage.create({
        user: req.user?.id,
        BadURL: req.body.BadURL,
        type: req.body.type
      });
      console.log("Image has been archived");
      res.json(newBadImage);
    } catch (err) {
      console.log(err);
    }
  },
  removeBadImage: async (req, res) => {
    try {
      // Find post by id
      let badImage = await BadImage.findById({ _id: req.params.id });
      // Delete post from db
      await BadImage.remove({ _id: req.params.id });
      console.log("Deleted Image");
      res.status(200).end();
    } catch (err) {
      console.log(err);
    }
  }
};












 // deletePost: async (req, res) => {
  //   try {
  //     // Find post by id
  //     let post = await Post.findById({ _id: req.params.id });
  //     // Delete post from db
  //     await Post.remove({ _id: req.params.id });
  //     console.log("Deleted Post");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     res.redirect("/profile");
  //   }
  // },