/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async (req, res) => {
        try {
            const { name, amount, price, currency } = req.body;
            if (!name) return res.status(400).json({ status: "error", message: "Name is required.", data: false });
            if (!amount) return res.status(400).json({ status: "error", message: "Amount is required.", data: false });
            if (!price) return res.status(400).json({ status: "error", message: "Price is required.", data: false });
            const product = await Product.create({ name, amount, price, currency }).fetch();
            return res.status(201).json({ status: "success", message: "user created successfully.", data: product });
        } catch (err) {
            return res.serverError(err);
        }
    },

    list: async (req, res) => {
        try {
            const populate = "";
            const { sort_by = 'createdAt', sort_dir = 'DESC', limit = 10, page = 1, ...conditions } = req.query
            const data = await UtilService.paginate(Product, conditions, page, limit, populate, `${sort_by} ${sort_dir.toUpperCase()}`);
            return res.status(200).json({ status: "success", message: "products fetched successfully.", data });
        } catch (err) {
            return res.serverError(err);
        }
    },
};

