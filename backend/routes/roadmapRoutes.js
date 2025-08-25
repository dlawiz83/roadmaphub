const express = require('express');
const router =express.Router();
const { getRoadmapItems, setRoadmapItem, getRoadmapItem, updateRoadmapItem, deleteRoadmapItem } = require('../controllers/roadmapController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getRoadmapItems).post(protect, setRoadmapItem);
router.route('/:id').get(protect, getRoadmapItem).put(protect, updateRoadmapItem).delete( protect, deleteRoadmapItem);

module.exports = router