const mongoose = require('mongoose');

const ActSchema = mongoose.Schema(
  {
    name: String,
    spotifyPlaylist: String,
    param1: {type: Number, min: 0, max: 100},
    param2: {type: Number, min: 0, max: 100},
    param3: {type: Number, min: 0, max: 100},
    param4: {type: Number, min: 0, max: 100},
    param5: {type: Number, min: 0, max: 100}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Act', ActSchema);
