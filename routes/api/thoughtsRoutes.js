const router = require('express').Router();
const {
  getThoughts, // get all the thoughts
  getSingleThought, //get single thought by Id 
  createThought, // post a new thought
  updateThought, //put (update)  thought by its id
  deleteThought, //delete thought by id
  addReaction, //create(add new friend by friendId by userId)
  deleteReaction, // delete friend by friendId by userId)
} = require('../../controllers/thoughtsController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);


// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction)

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)


module.exports = router;
