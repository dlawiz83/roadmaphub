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

    res.status(200).json(feedbackItem);

})

//PUT /api/feedback:id
const UpdateFeedback = asyncHandler(async(req,res)=>{
    const feedback = await Feedback.findById(req.params.id);
    if(!feedback){
        res.status(404)
        throw new Error('Feedback not found');
    }
 if (req.user.role !== "admin" && feedback.userId.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to update this feedback");
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
    if (req.user.role !== "admin" && feedback.userId.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this feedback");
}

   
   await Feedback.findByIdAndDelete(req.params.id);
   res.status(200).json({message: "Feedback deleted", id: req.params.id});

})

//GET /api/feedback

const getAllFeedback = asyncHandler(async(req,res)=>{
    let feedbackItems;

    if(req.user.role === "admin") {
        // Admin sees all feedback
        feedbackItems = await Feedback.find({});
    } else {
        // Normal users see only their own feedback
        feedbackItems = await Feedback.find({userId: req.user.id});
    }

    res.status(200).json(feedbackItems);

})


module.exports = {
    getAllFeedback,setFeedback
    , UpdateFeedback, deleteFeedback,
    getFeedback
}