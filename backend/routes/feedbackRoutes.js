const express = require('express');
const router = express.Router();
const {
  getAllFeedback,
  setFeedback,
  getFeedback,
  UpdateFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

const { protect } = require('../middleware/authMiddleware');
const {checkAdmin} = require('../middleware/checkAdminMiddleware');
// Logged-in users can view and submit feedback
router.route('/')
  .get(protect, getAllFeedback)
  .post(protect, setFeedback);

router.route('/:id')
  .get(protect, getFeedback)
  .put(protect, checkAdmin, UpdateFeedback)    // only admins can update
  .delete(protect, checkAdmin, deleteFeedback); // only admins can delete

module.exports = router;
