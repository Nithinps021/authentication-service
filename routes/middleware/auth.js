
const ifAuthenticated=()=>{
    return (req,res,next)=>{
        if(req.user){
            next()
        }
        else{
            res.status(401).send({message:"Unauthorized"})
        }
    }
}

const onlyAgent=()=>{
    return (req,res,next)=>{
        if(req.user.role==='agent'){
            next()
        }
        else{
            res.status(401).send({message:"Unauthorized"})
        }
    }
}

const onlyAdmin = () =>{
    return (req,res,next)=>{
        if(req.user.role==='admin'){
            next()
        }
        else{
            res.status(40).json({message:'You are unauthorized'})
        }
    }
}

const adminOrAgant=()=>{
    return (req,res,next)=>{
        if (req.user.role==='admin' || req.user.role==='agent'){
            next()
        }
        else{
            res.status(401).json({message:'You are unauthorized'})
        }
    }
}

module.exports={ifAuthenticated,onlyAgent,onlyAdmin,adminOrAgant}