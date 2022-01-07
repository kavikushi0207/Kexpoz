const Countries = require('../models/countryModel')

class APIfeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }
}

const countryController = {
    getCountries: async(req,res)=>{
        try {
            console.log(req.query)
            const features = new APIfeatures(Countries.find(),req.query)
            const countries = await features.query
    
            res.json({
                status: 'success',
                result : countries.length,
                countries:countries
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    createCountries: async(req,res)=>{
        try {
            const{country_id, Name,images,Description} = req.body;
            if(!images) return res.status(400).json({msg:"No image is uploaded"})
    
            const country = await Countries.findOne({country_id})
            if(country)
                return res.status(400).json({msg:"This country is already added."})
            const newCountry = new Countries({
                country_id, Name:Name.toLowerCase(),images,Description
            })
            await newCountry.save()
            res.json({newCountry})
            
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    deleteCountries: async(req,res)=>{
        try {
            await Countries.findByIdAndDelete(req.params.id)
            res.json({msg:"This country is deleted."})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    updateCountries: async(req,res)=>{
        try {
            const{Name,images,Description} = req.body;
            if(!images) return res.status(400).json({msg:"No image is uploaded"})
    
            await Countries.findOneAndUpdate({_id: req.params.id},{
                 Name:Name.toLowerCase(),images,Description
    
            })
            res.json({msg:"This country is updated."})
            
            
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
    }
    module.exports = countryController