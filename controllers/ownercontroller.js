const ownermodel = require('../models/ownermodel');

// Get all owners
exports.getOwners = async (req, res) => {
    try {
        const owners = await ownermodel.find();
        res.status(200).json(owners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get owner by ID
exports.getOwnerById = async (req, res) => {
    try {
        const owner = await ownermodel.findById(req.params.id);
        res.status(200).json(owner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new owner
exports.createOwner = async (req, res) => {
    const newOwner = new ownermodel (req.body);

    try {
        await newOwner.save();
        res.status(201).json(newOwner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an owner
exports.updateOwner = async (req, res) => {
    try {
        const updatedOwner = await ownermodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        res.status(200).json(updatedOwner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an owner
exports.deleteOwner = async (req, res) => {
    try {
        await ownermodel.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Owner deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
