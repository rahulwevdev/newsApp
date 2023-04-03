const { response, request } = require("express");


function getCountry(){
    let arr = ["India","Nepal","Finland","Germany"];
    let random = Math.round(Math.random()*3);
    return arr[random];
}




exports.loadCountriesTag = async (request,response)=>{
    try {


        let countriesMatrix = [];
        let rankRow={};
        let rankColumn={};

        for (let x = 0; x < 3; x++) {
            let inArr = [];
            for (let y = 0; y < 3; y++) {
                inArr.push(getCountry())
                
            }
            countriesMatrix.push(inArr);
            
        }

    

        // for row consecutive...
        for (let i = 0; i < countriesMatrix.length; i++) {
            let exist = countriesMatrix[i][0];
            let mp = new Map();
            mp.set(exist,1);

            
            for (let y = 1; y < countriesMatrix[i].length; y++) {
                if(countriesMatrix[i][y] != exist){
                    break;
                }
                if(countriesMatrix[i][y] == exist){
                    mp.set(exist , mp.get(exist)+1);
                    
                }
                
            }

            if(mp.get(exist)>1){
                let obj = Object.fromEntries(mp);
                rankRow = {...rankRow,...obj}
            }

            
            
        }

        // for coloumn consecutive...

        for (let i = 0; i < countriesMatrix.length; i++) {
            let exist = countriesMatrix[0][i];
            let mp = new Map();
            mp.set(exist,1);
            if(exist == countriesMatrix[1][i]){
                mp.set(exist,2);
                if(exist == countriesMatrix[2][i]){
                    mp.set(exist,3)
                }
            }
            

            if(mp.get(exist)>1){
                let obj = Object.fromEntries(mp);
                console.log(obj)
                rankColumn = {...rankColumn,...obj}
            }

            
            
        }

        let res = {
            outcome:countriesMatrix,
            rankRow,
            rankColumn
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

