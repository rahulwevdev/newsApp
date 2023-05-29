const User = require("../model/user");

exports.loadProfile = async (request,response)=>{
    try {

        let userData = request.userData

        let getUser = await User.findOne({_id:userData._id}).lean();
        
        return response.status(200).json({
            success:true,
            message:"success",
            data:getUser
        })


        
    } catch (error) {
        console.log(error)
        return response.status(404).json({
            success:false,
            message:error.message
        })
    }
}