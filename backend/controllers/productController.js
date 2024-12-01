
import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js'
// function for add product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )
        const productData = {
            name, description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save()
        res.json({
            success: true,
            message: "Product added successfully",
            product
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// function for list product
export const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({
            success: true,
            products
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// function for removing product
export const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Product removed"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// function for single product info
export const singleProduct = async (req, res) => {
    try {
        // const { productId } = req.params.id;

        const product = await productModel.findById(req.params.id);
        res.json({
            success: true,
            message: "Getting single product",
            product
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



