const FamousImage = require("../models/FamousImage");

module.exports = {

    createFamousImage: async (req, res) => {
        console.log(req.body)
        try {
            const newFamousImage = await FamousImage.create({
                user: req.user?.id,
                FamousURL: req.body.FamousURL,
                query: req.body.query
            });
            console.log("Image has been saved for future use");
            res.json(newFamousImage);
        } catch (err) {
            console.log(err);
        }
    },
    getFamousImage: async (req, res) => {
        try {
            const newFamousImage = await FamousImage.findOne({
                user: req.user?.id,
                query: req.params.query
            });
            console.log("Image has been saved for future use");
            res.json(newFamousImage);
        } catch (err) {
            console.log(err);
        }
    },


};


