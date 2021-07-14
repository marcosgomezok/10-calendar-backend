const moment = require('moment');


const isDate = (value/* , {req,location,path } */ )=>{

    if(!value){
        return false;
    }

    const fecha = moment(value);

    if(fecha.isValid()){
        return true;
    }else{
        return false
    }


/*     console.log(value)
    console.log(req,location,path) */
}


module.exports = {
    isDate
}