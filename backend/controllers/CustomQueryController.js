const CustomQuery = require("../models/CustomQuery");

module.exports = {
    createCustomQuery: async (req, res) => {
        try {
            const newCustomQuery = await CustomQuery.create({
                user: req.user?.id,
                type: req.body.type,
                originalQuery: req.params.originalQuery,
                convertedQuery: req.body.convertedQuery,
            });
            res.json(newCustomQuery);
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
            const deletedCustomQuery = await CustomQuery.findByIdAndDelete(req.params.id);
            res.status(200).end();
        } catch (err) {
            console.log(err);
        }
    }
};


