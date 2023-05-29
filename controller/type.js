const Type = require("../model/type");

function generateRandomString(x){
    const randomstring = require("randomstring");

    return randomstring.generate(x);
}

exports.createType = async (request,response)=>{
    try {

        let {name} = request.body;

        let existType= await Type.findOne({name}).lean();

        if(existType){
            return response.status(403).json({
                success:false,
                message:"type exist"
            })
        }

        let newType = new Type({...request.body,...{typeId:generateRandomString(6)}});

        let saveDoc = await newType.save();

        
        return response.status(200).json({
            success:true,
            message:"success",
            data:newType
        })


        
    } catch (error) {
        console.log(error)
        return response.status(404).json({
            success:false,
            message:error.message
        })
    }
}

exports.loadType = async (request,response)=>{
    try {

        let {limit,skip,searchKey} = request.body;

        limit = limt||10;
        skip = skip??0

        let regex = { $regex: new RegExp(searchKey, "i"), $options: "$i" }
        let searchQuery = {
            $or: [
                { "name": regex },
                { "typeId": regex }
            ]
        }

        let Query = {
            ...(searchKey && searchQuery)
        }

        let typeFound = await Type.find(Query).limit(limit).skip(skip).lean();
        let count = await Type.count(Query);
        
        if(!categoryFound){
            return response.status(404).json({
                success:false,
                message:"type not found"
            })
        }
        

        return response.status(200).json({
            success:true,
            message:"success",
            data:typeFound,
            total:count
        })
        
      
            
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.loadTypeById = async (request,response)=>{
    try {

        let {typeId} = request.params;
        let typeFound = await Type.findOne({_id:typeId}).lean();

        if(!typeFound){
            return response.status(404).json({
                success:false,
                message:"type not found"
            })
        }
        

        return response.status(200).json({
            success:true,
            message:"success",
            data:typeFound
        })
        
      
            
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteType =async (request,response)=>{
    try {

        let {id} = request.params;
        let typeFound = await Type.findOne({_id:id}).lean();
        if(!typeFound){
            return response.status(404).json({
                success:false,
                message:"type not found"
            })
        }
        

        let deleteType = await Type.deleteOne({_id:id});


        if(!deleteType){
            return response.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
        else{
            return response.status(200).json({
                success:true,
                message:"type deleted succesfully",
            })
        }


        
    } catch (error) {
        console.log(error)
        return response.status(404).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateType = async (request,response)=>{
    try {

        let {typeId} = request.body;

        let updateType = await Category.findOneAndUpdate(
            {_id:typeId},
            request.body,
            {new:true}
        ).lean();

        if(!updateType){
            return response.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
        

        return response.status(200).json({
            success:true,
            message:"category updated succesfully",
            data:updateType
        })
        
      
            
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success:false,
            message:error.message
        })
    }
}