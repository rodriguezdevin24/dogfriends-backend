const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DogModel = require('../models/dogmodel');
const OwnerModel = require('../models/ownermodel');
const PostModel = require('../models/postmodel');
const connection = require('./connection.js');

async function seedDatabase() {
    // Delete existing data
    await DogModel.deleteMany({});
    await OwnerModel.deleteMany({});
    await PostModel.deleteMany({});

    // Create owners
    const owner1 = new OwnerModel({
        username: 'jane_doe',
        name: 'Jane Doe',
        password: 'password123',
        socialLink: 'https://example.com/jane_doe',
    });

    const owner2 = new OwnerModel({
        username: 'john_doe',
        name: 'John Doe',
        password: 'password123',
        socialLink: 'https://example.com/john_doe',
    });

    await owner1.save();
    await owner2.save();

    // Create dogs
    const dog1 = new DogModel({
        name: 'Buddy',
        image: 'https://example.com/buddy.jpg',
        caption: 'The goodest boy',
        breed: 'Golden Retriever',
        birthday: new Date(2015, 2, 15),
        owner: owner1._id,
    });

    const dog2 = new DogModel({
        name: 'Bella',
        image: 'https://example.com/bella.jpg',
        caption: 'Such a cute doggo',
        breed: 'Labrador',
        birthday: new Date(2017, 5, 23),
        owner: owner2._id,
    });

    await dog1.save();
    await dog2.save();

    // Create posts
    const post1 = new PostModel({
        dog: dog1._id,
        text: 'I went for a walk today!',
        date: new Date(),
        photo: 'https://example.com/buddy_walk.jpg'
    });
    await post1.save();

    const post2 = new PostModel({
        dog: dog1._id,
        text: 'I pooped on the couch',
        date: new Date(),
        photo: 'https://example.com/buddy_walk.jpg',
    });
    await post2.save();

    const post3 = new PostModel({
        dog: dog2._id,
        text: 'I think Buddy is kinda hot',
        date: new Date(),
        photo: '',
    });
    await post3.save();

    const post4 = new PostModel({
        dog: dog2._id,
        text: 'Is there a dog heaven?',
        date: new Date(),
        photo: '',
    });
    await post4.save();

    console.log('Data seeded successfully');
    mongoose.connection.close();
}

seedDatabase();