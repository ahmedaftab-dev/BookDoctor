const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor=require("../models/doctorModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
    try {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(200).send({ message: "User already exists", success: false });
      }
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const newUser = new User(req.body);
      await newUser.save();
      res.status(200).send({ message: "User created successfully", success: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error creating user", success: false, error });
    }
  });
  router.post('/login',async(req,res)=>{
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(200)
          .send({ message: "User does not exist", success: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: "Password is incorrect", success: false });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res
          .status(200)
          .send({ message: "Login successful", success: true, data:{
            id:user._id,
            token:token
          } });
      }
    } catch(error){
      console.log(error);
      res
      .status(500)
      .send({ message: "Something", success: false, error });
    }
  });

  router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      user.password=undefined
      if (!user) {
        return res
          .status(200)
          .send({ message: "User does not exist", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: user
        });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error getting user info", success: false, error });
    }
  });
  router.post('/apply-doctor',authMiddleware,async(req,res)=>{
    try {
      const newDoctor=new Doctor({...req.body,staus:"pending"})
      await newDoctor.save()
      const admin=await User.findOne({isAdmin:true})
      const unseenNotifications=admin.unseenNotifications
      unseenNotifications.push({
        type:"new doctor request",
        message:`${newDoctor.firstName} ${newDoctor.lastName} has applied as a doctor`,
        data:{
          doctorID:newDoctor._id,
          name:newDoctor.firstName+' '+newDoctor.lastName
        },
        onClickPath:"/admin/doctors"
      })
      await User.findByIdAndUpdate(admin._id,{ unseenNotifications })
      res.status(200).send({ message: "Applied as a Doctor successfully", success: true });
    }
    catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error applying as a doctor", success: false, error });
    }
  })
  router.post('/mark-unseen-as-seen-notifications',authMiddleware,async (req,res)=>{
   try{
    const userNotified=await User.findOne({_id:req.body.userId})
    const unseenNotifications=userNotified.unseenNotifications
    const seenNotifications=userNotified.seenNotifications
    seenNotifications.push(...unseenNotifications)
    userNotified.unseenNotifications=[]
    userNotified.seenNotifications=seenNotifications
    const updatedUser=await userNotified.save()
    updatedUser.password=undefined
    res.status(200).send({ 
      message: "All notifications marked as Seen",
       success: true,
       data:updatedUser
       });
   }
   catch{
    console.log(error);
    res.status(500).send({ message: "Failed to mark notification as seen", success: false, error });
   }
  })
  router.post('/delete-all-notifications',authMiddleware,async (req,res)=>{
    try{
     const userNotified=await User.findOne({_id:req.body.userId})
     userNotified.seenNotifications=[]
     const updatedUser=await userNotified.save()
     updatedUser.password=undefined
     res.status(200).send({ 
       message: "All notifications have been deleted",
        success: true,
        data:updatedUser
        });
    }
    catch{
     console.log(error);
     res.status(500).send({ message: "Failed to delete notifications", success: false, error });
    }
   })
  module.exports = router;