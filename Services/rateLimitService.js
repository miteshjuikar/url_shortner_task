let userRequestCount = {};  // In-memory object to track user request counts

// Example rate limiting logic (10 URLs per minute per user)
exports.checkRateLimit = (userId) => {
  const currentTime = new Date().getTime();
  const timeWindow = 60 * 1000;  // 1 minute in milliseconds

  // Initialize user request count if it doesn't exist
  if (!userRequestCount[userId]) {
    userRequestCount[userId] = [];
  }

  // Filter out requests that are older than 1 minute
  userRequestCount[userId] = userRequestCount[userId].filter(timestamp => currentTime - timestamp < timeWindow);

  // Check if the user has exceeded the limit
  if (userRequestCount[userId].length >= 10) {
    return false;  // Rate limit exceeded
  }

  // Log the current request
  userRequestCount[userId].push(currentTime);

  return true;  // Rate limit not exceeded
};

exports.generateAlias = () => {
  // Generate a random short alias
  return Math.random().toString(36).substr(2, 8);
};
