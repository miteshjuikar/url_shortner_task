const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  alias: String,
  clicks: { type: Number, default: 0 },
  uniqueClicks: { type: Number, default: 0 },
  clicksByDate: [{
    date: Date,
    count: Number
  }],
  osType: [{
    osName: String,
    uniqueClicks: Number,
    uniqueUsers: Number
  }],
  deviceType: [{
    deviceName: String,
    uniqueClicks: Number,
    uniqueUsers: Number
  }]
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
