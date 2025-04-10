import express from 'express';

export default function generateblogRoute(openai) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    try {
      const chatResponse = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You are a professional blog writer. Create high-quality blog posts with SEO-friendly structure and engaging language.',
          },
          {
            role: 'user',
            content: `Write a trending blog post about "${topic}" with a title and detailed HTML content.`,
          },
        ],
        temperature: 0.8,
      });

      const aiResponse = chatResponse.choices[0].message.content;

      const [titleLine, ...contentLines] = aiResponse.split('\n');
      const title = titleLine.replace(/^Title:\s*/i, '').trim();
      const content = contentLines.join('\n').replace(/^Content:\s*/i, '').trim();

      res.status(200).json({ title, content });
    } catch (error) {
      console.error('Error generating blog:', error.message);
      res.status(500).json({ message: 'Failed to generate blog content' });
    }
  });

  return router;
}
