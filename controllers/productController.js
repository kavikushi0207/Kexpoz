const Product = require('../models/productModel')

const productController = {
    getProducts: async(req,res)=>{
       try {
           const products = await Product.find()
           res.json(products)
       } catch (error) {
           return res.status(500).json({msg:error.message})
       }
    },
    createProduct: async (req,res)=>{
        try {
            //by giving role as 1 for a user it indicates that the user is an admin.
            // admin has possess to create, update, delete products

            const {name} = req.body;
            const product = await Product.findOne({name})
            if(product) return res.status(400).json({msg:"This product is already added."})

            const newProduct = new Product({name})

            await newProduct.save();

            res.json('A new product is added.')
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    deleteProduct: async (req,res)=>{
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.json({msg:"A product is deleted."})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    updateProduct: async (req,res)=>{
        try {
            
            const {name}=req.body;
            await Product.findByIdAndUpdate({_id:req.params.id},{name})
            res.json({msg:"The product is updated."})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }

}
module.exports = productController