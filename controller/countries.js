const { response, request } = require("express");


function getCountry(){
    let arr = ["India","Nepal","Finland","Germany"];
    let random = Math.round(Math.random()*3);
    return arr[random];
}




exports.loadCountriesTag = async (request,response)=>{
    try {


        let countriesMatrix = [];
        let rank={}

        for (let x = 0; x < 3; x++) {
            let inArr = [];
            for (let y = 0; y < 3; y++) {
                inArr.push(getCountry())
                
            }
            countriesMatrix.push(inArr);
            
        }

      
        console.log(countriesMatrix)

        // for row consecutive...
        for (let i = 0; i < countriesMatrix.length; i++) {
            let exist = countriesMatrix[i][0];
            let mp = new Map();
            mp.set(exist,1);

            if(!(exist in rank)){

            }
            
            for (let y = 1; y < countriesMatrix[i].length; y++) {
                console.log(countriesMatrix[i][y],exist)
                if(countriesMatrix[i][y] != exist){
                    break;
                }
                if(countriesMatrix[i][y] == exist){
                    mp.set(exist , mp.get(exist)+1);
                    
                }
                
            }

            if(mp.get(exist)>1){
                let obj = Object.fromEntries(mp);
                console.log(obj)
                rank = {...rank,...obj}
            }

            
            
        }

        let res = {
            outcome:countriesMatrix,
            rank
        }

        return response.status(200).json({
            success:true,
            message:"success",
            data:res
        })
        
    } catch (error) {
        console.log(error)
        return response.json({
            success:false,
            message:error.message
        })
    }
}

