/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async (req, res) => {
        try {
            const { product, quantity, deliveryOption, currency, shippingAddress } = req.body;
            if (!product) return res.status(400).json({ status: "error", message: "Product is required.", data: false });
            if (!quantity) return res.status(400).json({ status: "error", message: "Quantity is required.", data: false });
            if (!deliveryOption) return res.status(400).json({ status: "error", message: "Delivery option is required.", data: false });
            const findProduct = await Product.findOne({ id: product, amount: { '>': 0 }, status: 'available' })
            if (!findProduct) return res.status(400).json({ status: "error", message: "Product is unavailable.", data: false });
            let orderData = { user: req.user.id, product, quantity, deliveryOption, currency, shippingAddress }
            orderData.cost = Number(quantity) * Number(findProduct.price);
            if (deliveryOption == 'delivery') {
                if (!shippingAddress) return res.status(400).json({ status: "error", message: "Shipping Address is required.", data: false });
                orderData.shippingFee = 500;
                orderData.cost = orderData.cost + orderData.shippingFee
            }
            const productQuantity = await Product.reduceAmount(findProduct, quantity);
            if (!productQuantity) return res.status(400).json({ status: "error", message: "Selected quantity is greater than the quantity in stock.", data: false });
            const order = await Order.create(orderData).fetch();
            return res.status(201).json({ status: "success", message: "order created successfully.", data: order });
        } catch (err) {
            return res.serverError(err);
        }
    },

    update: async (req, res) => {
        try {
            const { status } = req.body;
            const { id } = req.params;
            if (!status) return res.status(400).json({ status: "error", message: "Status is required.", data: false });
            const order = await Order.findOne({ id });
            if (!order) return res.status(404).json({ status: "error", message: "order not found.", data: false });
            await Order.update({ id }).set({ status });
            return res.status(201).json({ status: "success", message: `order status updated to ${status} successfully.`, data: true });
        } catch (err) {
            return res.serverError(err);
        }
    },

    list: async (req, res) => {
        try {
            const populate = "product";
            const { sort_by = 'createdAt', sort_dir = 'DESC', limit = 10, page = 1, ...conditions } = req.query
            const data = await UtilService.paginate(Order, conditions, page, limit, populate, `${sort_by} ${sort_dir.toUpperCase()}`);
            return res.status(200).json({ status: "success", message: "products fetched successfully.", data });
        } catch (err) {
            return res.serverError(err);
        }
    },
};

