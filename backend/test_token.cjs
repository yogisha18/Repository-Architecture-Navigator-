const axios = require('axios');

const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN_HERE';

async function testToken() {
  try {
    const res = await axios.get('https://api.github.com/rate_limit', {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'TestNode'
      }
    });
    console.log('Success! Remaining rate limit:', res.data.rate.remaining);
  } catch (err) {
    console.log('Error:', err.response?.status, err.response?.data);
  }
}

testToken();
