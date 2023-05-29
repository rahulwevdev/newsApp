const Banner = require("../model/banner");
const Type = require("../model/type");
const fs = require("fs");

exports.postBanner = async (request,response)=>{
    try {

        let {typeId} = request.body;

        console.log(request.body)

        let findType = await Type.findOne({typeId}).lean();

        if(!findType){
            return response.status(403).json({
                success:false,
                message:"type does not not exist"
            })
        }

        let file = request.file;

        console.log(file);
       

        let obj = {
            ...{typeInfo:findType._id},
            ...(file.path && {image:file.path}),
            ...request.body
        }

        let newBanner = new Banner(obj);

        let saveDoc = await newBanner.save();

        
        return response.status(200).json({
            success:true,
            message:"success",
            data:saveDoc
        })


        
    } catch (error) {
        console.log(error)
        return response.status(404).json({
            success:false,
            message:error.message
        })
    }
}

exports.loadBanner = async (request,response)=>{
    try {

        let {limit,skip,searchKey} = request.body;

        limit = limt||10;
        skip = skip??0

        let regex = { $regex: new RegExp(searchKey, "i"), $options: "$i" }
        let searchQuery = {
            $or: [
                { "title": regex },
                { "typeId": regex }
            ]
        }

        let Query = {
            ...(searchKey && searchQuery)
        }

        let bannerFound = await Banner.find(Query).limit(limit).skip(skip).lean();
        let count = await Banner.count(Query);
        
        if(!bannerFound){
            return response.status(404).json({
                success:false,
                message:"banner not found"
            })
        }
        

        return response.status(200).json({
            success:true,
            message:"success",
            data:bannerFound,
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

exports.loadBannerById = async (request,response)=>{
    try {

        let {bannerId} = request.params;
        let bannerFound = await Category.findOne({_id:bannerId}).lean();

        if(!bannerFound){
            return response.status(404).json({
                success:false,
                message:"banner not found"
            })
        }
        

        return response.status(200).json({
            success:true,
            message:"success",
            data:bannerFound
        })
        
      
            
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteBanner = async (request,response)=>{
    try {

        let {id} = request.params;
        let bannerFound = await Banner.findOne({_id:id}).lean();
        if(!bannerFound){
            return response.status(404).json({
                success:false,
                message:"banner not found"
            })
        }
        

        let deleteBanner = await Banner.deleteOne({_id:id});


        if(!deleteBanner){
            return response.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
        else{
            return response.status(200).json({
                success:true,
                message:"banner deleted succesfully",
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

exports.updateBanner = async (request,response)=>{
    try {

        let {bannerId} = request.body;

        let updateQuery = {
            ...request.body,
            ...(request.file?.path && {image:request.file.path})
        }

        if(request.file?.path){
            let banner = await Banner.findOne({_id:bannerId}).lean();
            let  filePath = `public/banner/${banner.image}`; 
            fs.unlink(filePath,()=>{});
        }

        

        let updateCategory = await Banner.findOneAndUpdate(
            {_id:bannerId},
            updateQuery,
            {new:true}
        ).lean();

        if(!updateCategory){
            return response.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
        

        return response.status(200).json({
            success:true,
            message:"category updated succesfully",
            data:updateCategory
        })
        
      
            
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success:false,
            message:error.message
        })
    }
}