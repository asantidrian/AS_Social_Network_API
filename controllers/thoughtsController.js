const { Users, Thoughts } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then((thoughtsData) => {
        res.json(thoughtsData);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  },

  getSingleThought(req, res) {
    Thoughts.findOne(
      { _id: req.params.thoughtId }
    )
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then(thoughtsData => {
        if (!thoughtsData) {
          res.status(404).json({ message: 'No thoughts with this ID!' });
          return;
        }
        res.json(thoughtsData)
      })
      .catch((err) => res.Status(500).json(err));
  },

  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thoughtsData) => {
        return Users.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thoughtsData._id } },
          { new: true });
      })
      .then(thoughtsData => {
        if (!thoughtsData) {
          res.status(404).json({ message: 'No thoughts with this particular ID!' });
          return;
        }
        res.json(thoughtsData)
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // Create a new thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true })
      .populate({ path: 'reactions', select: '-__v' })
      .select('-___v')
      .then(thoughtsData => {
        if (!thoughtsData) {
          res.status(404).json({ message: 'No thoughts with this ID!' });
          return;
        }
        res.json({ message: 'thought updated', thoughtsData });
      })
      .catch(err => res.Status(500).json(err));
  },

  // Create a new thought by Id
  deleteThought(req, res) {
    Thoughts.findOneAndDelete(
      { _id: req.params.thoughtId })
      .then(thoughtsData => {
        if (!thoughtsData) {
          res.status(404).json({ message: 'No thoughts with this ID!' });
          return;
        }
        res.json({ message: 'thought deleted', thoughtsData });
      })
      .catch(err => res.status(500).json(err));
  },

  // Add a new Reaction
  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true })
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then(thoughtsData => {
        if (!thoughtsData) {
          res.status(404).json({ message: 'No thoughts with this ID!' });
          return;
        }
        res.json(thoughtsData);
      })
      .catch(err => res.status(500).json(err));

  },

  // Delete a reaction by ID
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true })
      .then(thoughtsData => {
        if (!thoughtsData) {
          res.status(404).json({ message: 'No thoughts with this ID!' });
          return;
        }
        res.json({ message: 'reaction deleted', thoughtsData });
      })
      .catch(err => res.status(500).json(err));
  }
}

