const Category = require("../model/category");

exports.createCategory = async (request,response)=>{
    try {

        let {name} = request.body;

        let existCate = await Category.findOne({name}).lean();

        if(existCate){
            return response.status(403).json({
                success:false,
                message:"category exist"
            })
        }

        let newCategory = new Category(request.body);

        let saveDoc = await newCategory.save();

        
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

exports.loadCategory = async (request,response)=>{
    try {

        let {limit,skip,searchKey} = request.body;

        limit = limt||10;
        skip = skip??0

        let regex = { $regex: new RegExp(searchKey, "i"), $options: "$i" }
        let searchQuery = {
            $or: [
                { "name": regex },
                { "description": regex },
                { "slug": regex }
            ]
        }

        let Query = {
            ...(searchKey && searchQuery)
        }

        let categoryFound = await Category.find(Query).populate("parentCategory").limit(limit).skip(skip).lean();
        let count = await Category.count(Query);
        
        if(!categoryFound){
            return response.status(404).json({
                success:false,
                message:"category not found"
            })
        }
        

        return response.status(200).json({
            success:true,
            message:"success",
            data:categoryFound,
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

exports.loadCategoryById = async (request,response)=>{
    try {

        let {categoryId} = request.params;
        let categoryFound = await Category.findOne({_id:categoryId}).populate("parentCategory").lean();

        if(!categoryFound){
            return response.status(404).json({
                success:false,
                message:"category not found"
            })
        }
        

        return response.status(200).json({
            success:true,
            message:"success",
            data:categoryFound
        })
        
      
            
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteCategory = async (request,response)=>{
    try {

        let {id} = request.params;
        let categoryFound = await Category.findOne({_id:id}).lean();
        if(!categoryFound){
            return response.status(404).json({
                success:false,
                message:"category not found"
            })
        }
        

        let deleteCategory = await Category.deleteOne({_id:id});


        if(!deleteCategory){
            return response.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
        else{
            return response.status(200).json({
                success:true,
                message:"category deleted succesfully",
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

exports.updateCategory = async (request,response)=>{
    try {

        let {categoryId} = request.body;

        // let updateQuery = {
        //     ...(name && {name}),
        //     ...(description && {description})
        // }

        let updateCategory = await Category.findOneAndUpdate(
            {_id:categoryId},
            request.body,
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