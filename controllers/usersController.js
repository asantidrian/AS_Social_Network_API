const { Users, Thoughts } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    Users.find()
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  // Get an user
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.userId })
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      // return if no user is found 
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No User with this ID found!' });
          return;
        }
        res.json(userData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err)
      })
  },

  // Create an user
  createUser(req, res) {
    Users.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update a user
  updateUser(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user with this id!' })
          return;
        }
        res.json(userData)
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete an user
  deleteUser(req, res) {
    Users.findOneAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No course with that ID' })
          return;
        }
        res.json({ message: 'Users and Thoughts deleted!' })
        res.json(userData)
      })
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.param.userId },
      { $addToSet: { friends: { friendId: req.params.friendId } } },
      { new: true })
      // .populate({ path: 'friends', select: ('-__v') })
      // .select('-__v')
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No User with this particular ID!' });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteFriend(req, res) {
    Users.findOneAndDelete(
      { _id: req.param.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { new: true })
      // .populate({ path: 'friends', select: ('-__v') })
      // .select('-__v')
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No User with this particular ID!' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

}




