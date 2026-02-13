require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Summarize reviews endpoint
app.post('/api/summarize', async (req, res) => {
  try {
    const { reviews } = req.body;

    if (!reviews || reviews.length === 0) {
      return res.status(400).json({ error: 'No reviews provided' });
    }

    // Format reviews for Claude
    const reviewText = reviews.map((r, i) => 
      `Review ${i + 1} (${r.rating}⭐): ${r.text}`
    ).join('\n\n');

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `Analyze these business reviews and provide:
1. Overall sentiment (Positive/Mixed/Negative)
2. Key themes (top 3-5 points customers mention)
3. Strengths (what customers love)
4. Areas for improvement
5. One-sentence summary

Reviews:
${reviewText}`
        }]
      })
    });

    const data = await response.json();
    const summary = data.content[0].text;

    res.json({ 
      success: true, 
      summary,
      reviewCount: reviews.length 
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to summarize reviews',
      details: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'GMB Review Summarizer' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
