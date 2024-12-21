const Analytics = require('../Models/analytics');

exports.getAnalytics = async (req, res) => {
  const alias = req.params.alias;

  const analyticsData = await Analytics.findOne({ alias });

  if (!analyticsData) {
    return res.status(404).json({ message: 'Analytics not found for this alias' });
  }

  res.json(analyticsData);
};
