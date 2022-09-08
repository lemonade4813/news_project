const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')

const {User} = require("./User")



//appication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))

//applicaton/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())

const mongoose = require('mongoose')
const { JsonWebTokenError } = require('jsonwebtoken')

mongoose.connect(config.mongoURI).then(()=> console.log('MongoDB connected'))
  .catch(err=>console.log(err)) 

//mongoose 6.0 이상에서는 다음과 같이 설정할 필요 없음

  /* mongoose.connect('mongodb+srv://lemonade4813:l2j0wo6212@cluster0.pl8yc6b.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB connected'))
.catch(err=>console.log(err)) 
*/


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/register', (req, res) => {

    const user = new User(req.body)

    user.save((err, doc)=>{
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success: true
        })
    })
})


app.post('/login', (req, res)=>{

  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.find({email : req.body.email}, (err, user) => {
      if(!user){
          return res.json({
              loginSuccess : false,
              message:"제공된 이메일에 해당하는 유저가 없습니다."
          })
      }
     
     /* User.findOne({email:req.body.email}).exec((err, detail)=>{
        if(err) return res.status(400).send(err);
  
        return res.status(200).json(detail)
  
    }) */
  //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
 /* user.comparePassword(req.body.password,(err, isMatch)=>{
      if(!isMatch)
          return res.json({loginSuccess : false, message : "비밀번호가 틀렸습니다." })

         //비밀번호 까지 맞다면 토큰을 생성하기.
         user.generateToken((err, user)=>{
          if(err) return res.status(400).send(err);


        // 토큰을 저장하다.  어디에? 쿠키, 로컬스토리지
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess:true, userId: user._id})
         })
      }) */
  
   
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})