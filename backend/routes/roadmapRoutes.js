const express = require('express');
const router = express.Router();
const {
  getRoadmapItems,
  setRoadmapItem,
  getRoadmapItem,
  updateRoadmapItem,
  deleteRoadmapItem
} = require('../controllers/roadmapController');

const { protect } = require('../middleware/authMiddleware');
const {checkAdmin} = require('../middleware/checkAdminMiddleware');

// Public routes
router.route('/')
  .get(protect, getRoadmapItems);  // public
router.route('/:id')
  .get(protect, getRoadmapItem);   // public

// Admin-only routes
router.route('/')
  .post(protect, checkAdmin, setRoadmapItem);  // create
router.route('/:id')
  .put(protect, checkAdmin, updateRoadmapItem)   // update
  .delete(protect, checkAdmin, deleteRoadmapItem); // delete

module.exports = router;
