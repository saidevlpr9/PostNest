const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 8000

mongoose.connect('mongodb://localhost:27017/blogiees').then(e=>console.log("MongoDB Connected"))


const userRoute = require('./routes/user')
const path = require('path')
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
  res.render('home')
})
app.use('/user',userRoute)

app.listen(PORT,()=>console.log(`Server Started On ${PORT}`))
