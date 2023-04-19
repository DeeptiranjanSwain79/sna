const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const cloudinary = require("cloudinary");

//Creating a product -- admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    // console.log(req.body.name);
    let images = [];

    if (typeof (req.body.images) === "string") {   //If only one image then we just push it to array
        images.push(req.body.images);
    } else { //Else it itself the total array
        images = req.body.images;
    }

    const imageLinks = [];
    // console.log(images);
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "internship"
        });
        imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imageLinks;
    // req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
});

//Get all products 
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const product = await Product.find();

    res.status(200).json({
        success: true,
        product
    });
})

