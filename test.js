
function square(x){
    return x*x;
}

function add2(x){
    return x+2;
}

function multiply3(x){
    return x*3;
}

// function fn(val){
//     let res = compose(
//         add2,
//         square
        
//     );
//     return res(val)
// }
let res = compose(multiply3,square);

console.log(res(2))

// let composite = (...fn)=>(arg)=> fn.reduceRight((x,val)=>  val(x), arg)

// console.log(composite(multiply3,add2,square)(2))

