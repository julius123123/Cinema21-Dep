const express= require("express")
const app = express()
const path = require("path")
const hbs= require("hbs")
const LogInCollectionction1 = require("./mongodb")

const templatePath = path.join(__dirname, '../templates')


app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})


app.post("/signup",async (req,res)=>{

    const data=await LogInCollectionction1.create({
        username:req.body.username,
        password:req.body.password
    });

    return res.status(200).json(LogInCollectionction1);
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",async (req,res)=>{

   try{
    const check= await LogInCollectionction1.findOne({username:req.body.username})
    if (check){
        if (check.password===req.body.password){
            res.render("home")
          } else{
            res.status(400).json({error:"password doesnt match"});
        }
       }else{
        res.status(400).json({error: "User doesnt exist"});
       }
    }


   catch(error){
    res.status(400).json({erorr});
   }
})


app.listen(3000,()=>{
    console.log("port connected");
})
