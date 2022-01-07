const Items = require('../models/itemModel')

//filtering,sorting and paginating

class APIfeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObject = {...this.queryString} //queryString = req.query
        console.log({before: queryObject}) //before delete page
        const excludeFields = ['page','sort','limit']
        excludeFields.forEach(el=> delete(queryObject[el]))
        console.log({after: queryObject}) //after delete page

        let queryStr = JSON.stringify(queryObject)

        //gte = greater than or equal
        //gt = grater than
        //lte = less than or equal
        //lt = less than
        //regex = finding words
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g , match => '$'+ match)
        console.log({queryStr})
        this.query.find(JSON.parse(queryStr))
        return this;
    }
 
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }
        else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = ( page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;

    }
}

const itemController = {
getItems: async(req,res)=>{
    try {
        console.log(req.query)
        const features = new APIfeatures(Items.find(),req.query).filtering().sorting().paginating()
        const items = await features.query

        res.json({
            status: 'success',
            result : items.length,
            items:items
        })
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
createItems: async(req,res)=>{
    try {
        const{item_id, Name,Origin,price,images,product} = req.body;
        if(!images) return res.status(400).json({msg:"No image is uploaded"})

        const item = await Items.findOne({item_id})
        if(item)
            return res.status(400).json({msg:"This item is already added."})
        const newItem = new Items({
            item_id, Name:Name.toLowerCase(),Origin,price,images,product
        })
        await newItem.save()
        res.json({newItem})
        
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
deleteItems: async(req,res)=>{
    try {
        await Items.findByIdAndDelete(req.params.id)
        res.json({msg:"An item was deleted."})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
updateItems: async(req,res)=>{
    try {
        const{Name,Origin,price,images,product} = req.body;
        if(!images) return res.status(400).json({msg:"No image is uploaded"})

        await Items.findOneAndUpdate({_id: req.params.id},{
             Name:Name.toLowerCase(),Origin,price,images,product

        })
        res.json({msg:"The item is updated."})
        
        
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}
}

module.exports = itemController