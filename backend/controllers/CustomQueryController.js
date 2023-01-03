const CustomQuery = require("../models/CustomQuery");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    createCustomQuery: async (req, res) => {
        try {
            const data = {
                user: req.user?.id,
                type: req.body.type,
                originalQuery: req.params.originalQuery,
                convertedQuery: req.body.convertedQuery,
            }

            const oldQuery = await CustomQuery.findOne({
                user: req.user?.id,
                originalQuery: req.params.originalQuery,
                type: req.body.type,
            });
            if (!oldQuery) return res.json(await CustomQuery.create(data));

            oldQuery.convertedQuery = req.body.convertedQuery;
            res.json(await oldQuery.save());
        } catch (err) {
            console.log(err);
        }
    },
    getCustomQueries: async (req, res) => {
        try {
            const newCustomQueries = await CustomQuery.find({
                user: req.user?.id,
                originalQuery: req.params.originalQuery
            });
            const customQueriesByType = newCustomQueries.reduce((acc, query) => {
                acc[query.type] = query;
                return acc;
            }, {});
            res.json(customQueriesByType);
        } catch (err) {
            console.log(err);
        }
    },
    deleteCustomQuery: async (req, res) => {
        try {
            await CustomQuery.findOneAndDelete({
                _id: req.params.id,
                user: req.user?.id,
            });
            res.status(200).end();
        } catch (err) {
            console.log(err);
        }
    }
};


