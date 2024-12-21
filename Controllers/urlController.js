const Url = require('../Models/url');
const Analytics = require('../Models/analytics');
const { generateAlias } = require('../services/rateLimitService');
const { checkRateLimit } = require('../services/rateLimitService');

let urlCache = {};  // In-memory cache for short-to-long URL mapping

exports.shortenUrl = async (req, res) => {
  try {
    const { longUrl, customAlias, topic } = req.body;
    const userId = req.user.id;

    // Check if the user has exceeded the rate limit
    if (!checkRateLimit(userId)) {
      return res.status(429).json({ message: 'Rate limit exceeded. Please try again later.' });
    }

    const alias = customAlias || generateAlias();
    const shortUrl = `http://short.url/${alias}`;

    const newUrl = new Url({
      longUrl,
      shortUrl,
      customAlias: alias,
      userId,
      topic
    });

    await newUrl.save();

    // Cache the URL mapping in memory (for future accesses)
    urlCache[alias] = longUrl;

    // Initialize analytics for this URL
    const newAnalytics = new Analytics({ alias });
    await newAnalytics.save();

    res.json({
      shortUrl,
      createdAt: newUrl.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating short URL', error: err });
  }
};

exports.redirectUrl = async (req, res) => {
  const alias = req.params.alias;

  // Check cache first
  let longUrl = urlCache[alias];

  if (!longUrl) {
    const urlData = await Url.findOne({ customAlias: alias });
    if (!urlData) {
      return res.status(404).json({ message: 'Short URL not found' });
    }
    longUrl = urlData.longUrl;

    // Cache the long URL
    urlCache[alias] = longUrl;
  }

  // Track click analytics
  await Analytics.updateOne({ alias }, { $inc: { clicks: 1 } });

  res.redirect(longUrl);
};
