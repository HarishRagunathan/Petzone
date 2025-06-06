const FavoriteModel = require("../model/FavoriteModel");
const PetModel = require("../model/PetModel");
const UserModel = require("../model/userModel");

exports.AddtoFav = async (req, res) => {
    const { userId, petId } = req.body;
    try {

        
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const product = await PetModel.findById(petId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        const exist = await FavoriteModel.findOne({userId,petId})
        if (exist) {
            return res.status(201).json({
                message: "Product Already in cart",
            });
        }

        const FavItem = await FavoriteModel.create({
            userId,
            petId,
        });

        res.status(200).json({
            message: "Product added to cart",
            product,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "An error occurred while adding the product to the cart",
            error: error.message, 
        });
    }
};


exports.ViewFav = async(req,res)=>{
    const userID = req.params.id;
    try {
        const favItems = await FavoriteModel.find({userId:userID})
        if(favItems.length==0){
            return res.status(201).json({
                message:"Cart is empty"
            })
        }
        res.status(201).json({
            message:"cart Products",
            favItems
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}



exports.DeleteFav = async(req,res)=>{
    const {userId,petId}=req.body
    try {
        const DeleteCart = await FavoriteModel.findOneAndDelete({userId,petId})
        if(!DeleteCart){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.status(200).json({
            message:"Product deleted sucessfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}