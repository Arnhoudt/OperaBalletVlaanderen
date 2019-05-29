const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = mongoose.Schema(
  {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  },
  {
    timestamps: true
  }
);

AdminSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

AdminSchema.pre('save', function(next) {
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

module.exports = mongoose.model('Admin', AdminSchema);
