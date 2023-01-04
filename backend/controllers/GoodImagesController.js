const GoodImage = require("../models/GoodImage");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    createGoodImage: async (req, res) => {
        try {
            const data = {
                user: req.user?.id,
                type: req.body.type,
                query: req.params.query,
            }
            if (req.body.imageURL) data.url = req.body.imageURL

            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                data.url = result.secure_url;
                data.cloudinaryID = result.public_id;
            }

            return res.json(await GoodImage.create(data));
        } catch (err) {
            console.log(err);
        }
    },
    getGoodImages: async (req, res) => {
        try {
            const newGoodImages = await GoodImage.find({
                user: req.user?.id,
                query: req.params.query
            }).sort({ updatedAt: -1 });
            const goodImagesByType = newGoodImages.reduce((acc, query) => {
                if (acc[query.type]) {
                    acc[query.type].push(query);
                } else {
                    acc[query.type] = [query];
                }
                return acc;
            }, {});
            res.json(goodImagesByType);
        } catch (err) {
            console.log(err);
        }
    },
    deleteGoodImage: async (req, res) => {
        try {
            await GoodImage.findOneAndDelete({
                _id: req.params.id,
                user: req.user?.id,
            });
            res.status(200).end();
        } catch (err) {
            console.log(err);
        }
    },
    selectGoodImage: async (req, res) => {
        try {
            const goodImage = await GoodImage.findOneAndUpdate({
                _id: req.params.id,
                user: req.user?.id,
            }, { selected: true }, { new: true });
            await GoodImage.updateMany(
                {
                    query: goodImage.query,
                    type: goodImage.type,
                    user: req.user?.id,
                },
                { selected: false }
            );
            res.status(200).end();
        } catch (err) {
            console.log(err);
        }
    },
    unselectGoodImage: async (req, res) => {
        try {
            await GoodImage.updateOne({
                _id: req.params.id,
                user: req.user?.id,
            }, { selected: false });
            res.status(200).end();
        } catch (err) {
            console.log(err);
        }
    }
};


