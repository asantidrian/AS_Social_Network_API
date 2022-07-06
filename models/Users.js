const { Schema, model } = require('mongoose');

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: "Email address is required",
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],

  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
);

// Create a virtual property `friendCount` that gets the number of friends per user
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// create the Users model using the Users Schema
const Users = model('Users', userSchema);

module.exports = Users;
