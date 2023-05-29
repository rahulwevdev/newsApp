const { request } = require("http");
const News = require("../model/news");
const fs = require("fs");
const { response } = require("express");

exports.postNews = async (request,response)=>{
    try {



        let obj = {
            ...request.body,
        }

        let newNews = new News(obj);

        let saveDoc = await newNews.save();

        
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

exports.uploadNewsVideo = async (request,response)=>{
    try {

        let {newsId} = request.body;



        let updateNews = await News.findOneAndUpdate({_id:newsId},{video:request.file.video}).lean();
        

        return response.status(200).json({
            success:true,
            message:"success",
            data:updateNews
        })
        
      
            
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.loadNews = async (request,response)=>{
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

exports.deleteNews = async (request,response)=>{
    try {

        let {id} = request.params;
        let newsFound = await News.findOne({_id:id}).lean();
        if(!newsFound){
            return response.status(404).json({
                success:false,
                message:"news not found"
            })
        }
        

        let deleteNews = await News.deleteOne({_id:id});


        if(!deleteNews){
            return response.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
        else{
            return response.status(200).json({
                success:true,
                message:"news deleted succesfully",
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

exports.updateNews = async (request,response)=>{
    try {

        let {newsId} = request.body;

        

        let updateNews = await News.findOneAndUpdate(
            {_id:newsId},
            request.body,
            {new:true}
        ).lean();

        if(!updateNews){
            return response.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
        

        return response.status(200).json({
            success:true,
            message:"news updated succesfully",
            data:updateNews
        })
        
      
            
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.uploadImage = async(request,response)=>{
    try {

        let url = request.file.path;

        return response.status(200).json({
            success:true,
            message:"image upload successfully",
            url:url
        })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success:false,
            message:error.message
        })
    }
}