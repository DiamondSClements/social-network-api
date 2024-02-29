const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtsSchema = new mongoose.Schema({
  thoughtsText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => dateFormat(createdAt),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// Create a virtual called `reactionCount`
thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

function dateFormat(date) {
    return new Date(date).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      });
    }
    const Thoughts = mongoose.model('Thoughts', thoughtsSchema);

    module.exports = Thoughts;
