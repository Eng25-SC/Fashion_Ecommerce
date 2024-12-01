// import { currency } from '../../admin/src/App.jsx';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe'
import razorpay from 'razorpay'

// global variables
const currency = 'inr'
const deliveryCharge = 10


// getway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


// Placing order using Cash on Delivery method
export const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Correcting the field name from PaymentMethod to paymentMethod
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'cod', // Consistent field name
            payment: false,
            date: Date.now(),
        };

        // Creating and saving the new order
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Clearing the user's cart after placing the order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Returning success response
        res.status(201).json({
            success: true,
            message: "Order placed successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Additional methods (Stripe, Razorpay, etc.) can be added here
// Placeing order using  Stripe  method
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        // Correcting the field name from PaymentMethod to paymentMethod
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Stripe', // Consistent field name
            payment: false,
            date: Date.now(),
        };

        // Creating and saving the new order
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({
            success: true,
            session_url: session.url
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Placeing order using Razorpay method
export const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Validate input fields
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        if (typeof amount !== "number" || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount provided.",
            });
        }

        // Prepare order data
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now(),
        };

        // Create the order in the database
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Razorpay order options
        const options = {
            amount: amount * 100, // Convert to paise
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        };

        // Create Razorpay order
        const razorpayOrder = await razorpayInstance.orders.create(options);

        // Send success response with Razorpay order details
        res.status(201).json({
            success: true,
            order: razorpayOrder,
        });
    } catch (error) {
        console.error("Error in placeOrderRazorpay:", error);

        // Rollback if order creation in database was successful but Razorpay order creation failed
        if (error.code === 'RZR_ORDER_CREATION_ERROR') {
            await orderModel.findByIdAndDelete(newOrder._id);
        }

        res.status(500).json({
            success: false,
            message: "An error occurred while placing the order.",
        });
    }
};

// verify razorpay
export const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({
                success: true,
                message: "Payment successfully",
            })
        } else {
            res.json({
                success: false,
                message: 'Payment failed'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

// All orders data for Admin Panel
export const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({
            success: true,
            orders
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// User order data for frontend
export const userOrders = async (req, res) => {
    try {

        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        // Returning success response
        res.status(201).json({
            success: true,
            message: "Orders",
            orders
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Verify Stripe
export const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;
    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({
                success: true,
                message: "Payment Successfull"

            })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({
                success: false,
                message: "Payment Failed"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// update order status from Admin panel --> only admin can update the status
export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({
            success: true,
            message: "Order status updated successfully"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}