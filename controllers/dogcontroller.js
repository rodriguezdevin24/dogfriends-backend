const DogModel = require('../models/dogmodel.js');
const Owner = require('../models/ownermodel.js');

exports.getDogs = async (req, res) => {
    try {
        const dogs = await DogModel.find();
        res.json(dogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDogByOwnerId = async (req, res) => {
    try {
        const dogs = await DogModel.find({owner: req.params.id})
        console.log(req.params.id)
        res.json(dogs)
        // Populate method?
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getDogById = async (req, res) => {
    try {
        const dog = await DogModel.findById(req.params.id);
        res.json(dog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createDog = async (req, res) => {
    try {
        const { name, image, caption, breed, birthday, ownerName } = req.body;
        const owner = await Owner.findOne({ username: ownerName });
        console.log(owner, "here");
        console.log(req.username, "also here")
        console.log(req.data, "maybe here?")
        if (!owner) {
            throw new Error(`Owner ${ownerName} doesn't exist`);
        }

        const newDog = await DogModel.create({
            name,
            image,
            caption,
            breed,
            birthday,
            owner: owner._id
        });

        res.status(200).json(newDog);
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

// exports.updateDog = async (req, res) => {
//     const { id } = req.params;
//     const updatedData = req.body;
//     try {
//         const updatedDog = await DogModel.findByIdAndUpdate(id, updatedData, { new: true });
//         res.json(updatedDog);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
exports.updateDog = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedDog = await DogModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedDog) {
            return res.status(404).json({ message: 'Dog not found' });
        }
        res.json(updatedDog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};





exports.deleteDog = async (req, res) => {
    const { id } = req.params;
    try {
        await DogModel.findByIdAndRemove(id);
        res.json({ message: 'Dog deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
