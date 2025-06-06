const OrderModel = require("../model/OrderPet");
const PetModel = require("../model/PetModel");
const UserModel = require("../model/userModel");

exports.MakeOrder = async (req, res) => {
    const { userId, petId } = req.body;
    try {
        console.log("Received data:", userId, petId);
        
        // Check if user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Check if product exists
        const product = await PetModel.findById(petId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        // Check if the product is already in the cart
        const exist = await OrderModel.findOne({ userId, petId });
        if (exist) {
            return res.status(409).json({
                message: "Product already in cart",
            });
        }

        // Create the order
        const order = await OrderModel.create({
            userId,
            petId,
        });

        res.status(200).json({
            message: "Order placed successfully",
            order, // return order object
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "An error occurred while placing the order",
            error: error.message,
        });
    }
};



exports.MyOrders = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const cartItems = await OrderModel.find({ userId });
  
      if (cartItems.length === 0) {
        return res.status(200).json({
          message: "Cart is empty",
          cartItems: [],
        });
      }
  
      res.status(200).json({
        message: "Cart products retrieved successfully",
        cartItems,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving cart items",
        error: error.message,
      });
    }
  };


  exports.AllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({});

        if (orders.length === 0) { 
            return res.status(400).json({
                message: "No orders found"
            });
        }

        return res.status(200).json({
            orders
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};



