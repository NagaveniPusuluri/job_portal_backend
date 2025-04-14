const fs=require('fs');
const path = require('path');

const responseLogger=(req,res,next)=>{
      const logDir=path.join(__dirname,"../../logs");
        const logPath=path.join(logDir,"res.txt");  
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        const originalSend=res.send;
        res.send=function (data){
            console.log(new Date().toLocaleDateString(),"response", data );
            return originalSend.call(this,data); 
            }
        const file= fs.createWriteStream('../logs/res.txt',{flags:"a"});
    fs.appendFile(logPath, new Date().toLocaleDateString()+"Response"+ req.method+" "+req.url+"\n",
    (err)=>{
        if (err) throw err;
    })
   
   
        next();
}
 module.exports= responseLogger;