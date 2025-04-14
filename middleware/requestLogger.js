const fs=require('fs');
const path=require("path");
const requestLogger=(req,res,next)=>{  
    const logDir=path.join(__dirname,"../../logs");
    const logPath=path.join(logDir,"req.txt");  
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    const file= fs.createWriteStream('../logs/req.txt',{flags:"a"});
fs.appendFile(logPath, new Date().toLocaleDateString()+"Request"+ req.method+" "+req.url+ JSON.stringify(req.headers)+" "+JSON.stringify(req.body)+"\n",
(err)=>{
    if (err) throw err;
})
// console.log(new Date().toLocaleDateString(),req.method,req.url);
// console.log(req.headers);
// console.log(req.body);
next();
}
module.exports=requestLogger;