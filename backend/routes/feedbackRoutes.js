const express = require('express');
const router  = express.Router();
const { getAllFeedback, setFeedback, getFeedback, UpdateFeedback, deleteFeedback } = require('../controllers/feedbackController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get( protect, getAllFeedback).post( protect,setFeedback);
router.route('/:id').get(protect, getFeedback).put(protect, UpdateFeedback).delete(protect, deleteFeedback);

module.exports = router;