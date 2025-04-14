const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
const env=require('dotenv');
env.config();
const port=process.env.PORT || 8000;
const cors=require('cors');
const bodyParser = require('body-parser');
const userRouter=require('./routes/user');
const requestLogger=require('./middleware/requestLogger');
const responseLogger=require('./middleware/responseLogger');
const errorhandling = require('./middleware/errorhanding');
const jobRouter=require('./routes/job')
app.use(cors());
app.use(cors({
    origin: '*',
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.status(200).json({message:"hello from server"})
})

app.use(requestLogger);
app.use(responseLogger);
app.use('/user',userRouter);
app.use('/job',jobRouter);

app.use(errorhandling);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    mongoose.connect(process.env.Mongo_URI).then(()=>{
        console.log("MongoDB connected");
    }).catch((err)=>{
        console.log(err);
    });
})