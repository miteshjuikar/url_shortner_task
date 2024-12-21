const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  customAlias: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  topic: String
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
