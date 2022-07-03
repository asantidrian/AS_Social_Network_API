const router = require('express').Router();
const {
  getUsers, // get all the users
  getSingleUser, //get single user by Id and populate thought and friend date
  createUser, // post a new user
  updateUser, //put to update user by its id
  deleteUser, //delete user by id
  addFriend, //create(add new friend by friendId by userId)
  deleteFriend, // delete friend by friendId by userId)
} = require('../../controllers/usersController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId/friends/:friendId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend)

module.exports = router;
