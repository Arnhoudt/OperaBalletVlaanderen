const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = mongoose.Schema(
  {
    _id: {type: ObjectId, required: true},
    name: String,
    email: {type: String, lowercase: true, required: true, unique: true},
    password: {type: String, required: true}
  },
  {
    timestamps: true
  }
);

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, 12, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);
