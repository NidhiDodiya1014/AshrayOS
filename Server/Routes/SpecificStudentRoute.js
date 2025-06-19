const express=require('express')
const router=express.Router()
const db=require('../db')


router.get('/getStudentInfo',(req, res)=>{
    const ID=req.query.ID;
    db.query(`select * from student where StudentID=${ID}`, (err, result)=>{
        if(err){
            // console.log('error in finding the student')
            res.status(500).send("Database error")
        } else {
            // console.log('yay')
            res.send(result)
        }
    })
})

module.exports=router