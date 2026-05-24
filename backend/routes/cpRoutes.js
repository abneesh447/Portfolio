const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

// Fetch Codeforces Stats
router.get('/codeforces/:handle', async (req, res) => {
  try {
    const { handle } = req.params;
    
    // 1. Fetch rating and rating history
    const userInfoRes = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    const ratingRes = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
    
    if (userInfoRes.data.status !== 'OK') {
      return res.status(400).json({ message: 'Codeforces user not found' });
    }

    const user = userInfoRes.data.result[0];
    
    // Map rating history
    const ratingHistory = ratingRes.data.result.map(c => ({
      contest: c.contestName,
      rating: c.newRating
    }));

    // 2. Fetch total solved using user.status (could be large, but it's the only way for CF without scraping)
    let totalSolved = 0;
    try {
      const statusRes = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
      if (statusRes.data.status === 'OK') {
        const uniqueSolved = new Set();
        statusRes.data.result.forEach(sub => {
          if (sub.verdict === 'OK' && sub.problem && sub.problem.name) {
            uniqueSolved.add(sub.problem.name);
          }
        });
        totalSolved = uniqueSolved.size;
      }
    } catch(err) {
      console.error('Error fetching CF status:', err.message);
    }

    res.json({
      rating: user.rating || 0,
      maxRating: user.maxRating || user.rating || 0,
      rank: user.rank || 'Unrated',
      totalSolved,
      ratingHistory
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching Codeforces data' });
  }
});

// Fetch LeetCode Stats
router.get('/leetcode/:handle', async (req, res) => {
  try {
    const { handle } = req.params;
    
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
        userContestRanking(username: $username) {
          rating
        }
        userContestRankingHistory(username: $username) {
          contest { title }
          rating
        }
      }
    `;
    const response = await axios.post('https://leetcode.com/graphql', {
      query,
      variables: { username: handle }
    });
    
    if (response.data.data && response.data.data.matchedUser) {
      const stats = response.data.data.matchedUser.submitStats.acSubmissionNum;
      const totalSolved = stats.find(item => item.difficulty === 'All')?.count || 0;
      const easySolved = stats.find(item => item.difficulty === 'Easy')?.count || 0;
      const mediumSolved = stats.find(item => item.difficulty === 'Medium')?.count || 0;
      const hardSolved = stats.find(item => item.difficulty === 'Hard')?.count || 0;
      
      const currentRating = response.data.data.userContestRanking?.rating 
        ? Math.round(response.data.data.userContestRanking.rating) 
        : 0;

      const historyData = response.data.data.userContestRankingHistory || [];
      const ratingHistory = historyData.filter(c => c.rating).map(c => ({
        contest: c.contest.title,
        rating: Math.round(c.rating)
      }));
      
      res.json({
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        rating: currentRating,
        ratingHistory
      });
    } else {
      res.status(400).json({ message: 'LeetCode user not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching LeetCode data' });
  }
});

// Fetch CodeChef Stats
router.get('/codechef/:handle', async (req, res) => {
  try {
    const { handle } = req.params;
    const response = await axios.get(`https://www.codechef.com/users/${handle}`);
    const $ = cheerio.load(response.data);
    
    // Extract rating and stars
    let ratingStr = $('.rating').first().text();
    let rating = 0;
    let stars = '';
    if (ratingStr) {
      const starMatch = ratingStr.match(/(\d+★)/);
      if (starMatch) stars = starMatch[0];

      const ratingMatch = ratingStr.replace(stars, '').match(/\d+/);
      if (ratingMatch) rating = parseInt(ratingMatch[0], 10);
    }
    
    // Extract total solved
    let totalSolved = 0;
    $('h3').each((i, el) => {
      const text = $(el).text();
      if (text.includes('Total Problems Solved:')) {
        const match = text.match(/\d+/);
        if (match) totalSolved = parseInt(match[0], 10);
      }
    });

    // Extract rating history script
    let ratingHistory = [];
    const scriptMatch = response.data.match(/var all_rating = (\[.*?\]);/s);
    if (scriptMatch) {
      try {
        const history = JSON.parse(scriptMatch[1]);
        ratingHistory = history.map(c => ({
          contest: c.name,
          rating: parseInt(c.rating, 10)
        }));
      } catch (e) {
        console.error('Error parsing CodeChef rating history', e);
      }
    }

    res.json({
      rating,
      stars,
      totalSolved,
      ratingHistory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching CodeChef data' });
  }
});

module.exports = router;
