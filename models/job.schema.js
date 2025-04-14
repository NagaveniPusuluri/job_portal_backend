const mongoose =require('mongoose')

const jobSchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    addLogo:{
        type:String,
        required:true
    },
    jobPosition:{
        type:String,
        required:true
    },
    monthlySalary:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    remoteOrOffice:{
        type:[String],
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    aboutCompany:{
        type:String,
        required:true
    },
    skillsRequired:{
        type:[String],
        required:true
    },
    information:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

})

const Job =mongoose.model("Job",jobSchema);

module.exports=Job;