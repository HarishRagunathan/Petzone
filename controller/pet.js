const PetModel = require("../model/PetModel");


exports.PetUpload = async (req, res) => {
    try {
      const {
        petName,
        petCategory,
        petDescription,
        petBreed,
        petAge,
        petWeight,
        petNewPrice,  
        petOldPrice,  
        petHotStatus,
        petAdoption
      } = req.body;
  
      if (!petName || !petCategory || !petNewPrice || !petOldPrice) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }
  
      
      const petImage = req.file ? `/uploads/${req.file.filename}` : null;
  
      const petHotStatusBool = petHotStatus === 'true';
      const petAdoptionBool = petAdoption === 'true';
  
      const pet = await PetModel.create({
        petName,
        petImage,
        petCategory,
        petDescription,
        petBreed,
        petAge,
        petWeight,
        petNewPrice,  
        petOldPrice,  
        petHotStatus: petHotStatusBool,
        petAdoption: petAdoptionBool
      });
  
      res.status(201).json({
        message: "Pet Uploaded Successfully",
        pet
      });
  
    } catch (error) {
      console.error("Error:", error.message); 
  
      res.status(500).json({
        message: "Error uploading product",
        error: error.message
      });
    }
  };


exports.PetView = async(req,res,next)=>{
    const pets = await PetModel.find({})
    res.json({
        message:"Pet View",
        pets
    })
}


exports.SinglePet=async(req,res)=>{
    const id = req.params.id
    try {
        const pet = await PetModel.find({_id:id})
        if(!pet){
            return res.status(404).json({
                message:"Pet not found"
            })
        }
        res.status(200).json({
            pet
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

exports.DeletePet = async (req, res) => {
    const petId = req.params.id;
    console.log(petId, 'deletion');
    try {
        const pet = await PetModel.findById(petId);

        if (!pet) {
            return res.status(404).json({
                message: "Pet not found"
            });
        }

        await pet.deleteOne(); 

        res.status(200).json({
            message: "Pet deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

