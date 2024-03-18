const express = require('express');
const router = express.Router();
const { User, Thoughts } = require('./controllers/thoughtsController.js');

// GET all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thoughts.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single thought by its _id
router.get('/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thoughts.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
} catch (error) {
  res.status(500).json({ message: error.message });
}
});

// POST to create a new thought
router.post('/thoughts', async (req, res) => {
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
  });

  // PUT to update a thought by its _id
router.put('/thoughts/:thoughtId', async (req, res) => {
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
  });
  
  // DELETE to remove a thought by its _id
  router.delete('/thoughts/:thoughtId', async (req, res) => {
    try {
      const deletedThought = await Thoughts.findByIdAndDelete(req.params.thoughtId);
  
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.json(deletedThought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // POST to create a reaction stored in a single thought's reactions array field
  router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
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
  });
  
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
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
});

module.exports = router;