const { User, Thoughts } = require('../models');

const thoughtsController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thoughts.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username, userId } = req.body;

      const newThought = await Thoughts.create({ thoughtText, username });
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.thoughts.push(newThought._id);
      await user.save();

      res.status(201).json(newThought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thoughts.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(updatedThought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thoughts.findByIdAndDelete(req.params.thoughtId);

      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(deletedThought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createReaction: async (req, res) => {
    try {
      const thought = await Thoughts.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      thought.reactions.push(req.body);
      await thought.save();

      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const thought = await Thoughts.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      thought.reactions = thought.reactions.filter(
        (reaction) => reaction.reactionId.toString() !== req.params.reactionId
      );

      await thought.save();

      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = thoughtsController;