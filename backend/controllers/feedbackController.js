const asyncHandler = require('express-async-handler');
const Feedback = require('../models/Feedback');
const User = require('../models/User');



//POST /api/feedback
const setFeedback = asyncHandler(async(req, res)=>{
    const {content, category} = req.body;
    if(!content || !category){
        res.status(400)
        throw new Error('please provide content and category');
    }
    const newFeedback = await Feedback.create({
        userId:req.user.id,
        content,
        category
    })
    res.status(201).json(newFeedback);
    
})

//GET /api/feedback:id

const getFeedback = asyncHandler(async(req,res)=>{
    const feedbackItem = await Feedback.findById(req.params.id);
    if(!feedbackItem){
        res.status(404);
        throw new Error('Feedback not found');
    }

    if(feedbackItem.userId.toString() !==req.user.id){
        res.status(401)
        throw new Error('User not authorized to view this feedback')
    }
    res.status(200).json(feedbackItem);

})
//PUT /api/feedback:id

const UpdateFeedback = asyncHandler(async(req,res)=>{
    const feedback = await Feedback.findById(req.params.id);
    if(!feedback){
        res.status(404)
        throw new Error('Feedback not found');
    }
   const user  = await User.findById(req.user.id);
   if(!user){
    res.status(401);
    throw new Error('User not found');
   }
   if(feedback.userId.toString() !== req.user.id){
    res.status(401);
    throw new Error('User not authorized');
   }


    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body,  {new: true})
    res.status(200).json(updatedFeedback);
})

//DELETE /api/feedback:id

const deleteFeedback = asyncHandler(async(req,res)=>{
   const delFeedback = await Feedback.findById(req.params.id);
    if(!delFeedback){
        res.status(404)
        throw new Error('Feedback not found');
    }
   const user  = await User.findById(req.user.id);
   if(!user){
    res.status(401);
    throw new Error('User not found');
   }
   if(delFeedback.userId.toString() !== req.user.id){
    res.status(401);
    throw new Error('User not authorized');
   }
   await Feedback.findByIdAndDelete(req.params.id);
   res.status(200).json({message: "Feedback deleted", id: req.params.id});

})

//GET /api/feedback

const getAllFeedback = asyncHandler(async(req,res)=>{
    const feedackItems = await Feedback.find({userId: req.user.id})
    res.status(200).json(feedackItems);

})


module.exports = {
    getAllFeedback,setFeedback
    , UpdateFeedback, deleteFeedback,
    getFeedback
}