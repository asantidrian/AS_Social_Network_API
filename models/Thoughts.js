// const { Schema, model } = require('mongoose');
const moment = require('moment');
const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },

    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('DD MM YYYY, hh:mm a')
    },
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },

)

// Schema to create a course model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('DD MM YYYY, hh:mm a')
    },

    username: {
      type: String,
      required: true,
    },

    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of reactions
thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;
