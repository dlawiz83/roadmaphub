const asyncHandler = require('express-async-handler');
const Roadmap = require('../models/RoadmapItem');
const User = require('../models/User');


const getRoadmapItem = asyncHandler(async(req, res)=>{
    const roadmapItem = await Roadmap.findById(req.params.id);
    if(!roadmapItem){
        res.status(404)
        throw new Error('Roadmap not found')
    }
    
    res.status(200).json(roadmapItem);
})


const setRoadmapItem = asyncHandler(async(req, res)=>{
     const { title, description, status, category, feedbackRef, isPublic } = req.body;
      if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const newRoadmap = await Roadmap.create({
    userId: req.user.id,  
    title,
    description,
    status,
    category,
    feedbackRef,
    isPublic
  });

  res.status(201).json(newRoadmap);
});



const updateRoadmapItem = asyncHandler(async(req, res)=>{
    const roadmap = await Roadmap.findById(req.params.id);
    if(!roadmap){
        res.status(404)
        throw new Error('Roadmap not found')
    }
    if(req.user.role !== "admin" && roadmap.userId.toString() !== req.user.id) {
    res.status(403)
    throw new Error("Not authorized to update this item");
}
   

    const updatedRoadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedRoadmap);
    
})


const deleteRoadmapItem = asyncHandler(async(req, res)=>{
     const deleteRoadmap = await Roadmap.findById(req.params.id);
    if(!deleteRoadmap){
        res.status(404)
        throw new Error('Roadmap not found')
    }
    if(req.user.role !== "admin" && roadmap.userId.toString() !== req.user.id) {
    res.status(403)
    throw new Error("Not authorized to delete this item");
}
    

    await Roadmap.findByIdAndDelete(req.params.id);
    res.status(200).json({message: 'Roadmap deleted',id: req.params.id});
    
})


const getRoadmapItems = asyncHandler(async(req, res)=>{
    let roadmapItems;

    if(req.user.role === "admin") {
        // Admin sees all roadmap items
        roadmapItems = await Roadmap.find({});
    } else {
        // Normal users see their own items and public items
        roadmapItems = await Roadmap.find({
            $or: [
                { userId: req.user.id }, 
                { isPublic: true }
            ]
        });
    }

    res.status(200).json(roadmapItems);
});


module.exports = {
    getRoadmapItem, getRoadmapItems,
    setRoadmapItem, updateRoadmapItem,
    deleteRoadmapItem
}