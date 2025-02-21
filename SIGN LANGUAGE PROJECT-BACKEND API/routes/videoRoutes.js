const express = require('express');
const Video = require('../models/Video');


const router = express.Router();

router.post('/api/videos', async (req, res) => {
  const { title, url, signLanguageTranslation } = req.body;
  try {
    const newVideo = new Video({ title, url, signLanguageTranslation });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/api/videos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, url, signLanguageTranslation } = req.body;
    try {
      const updatedVideo = await Video.findByIdAndUpdate(
        id,
        { title, url, signLanguageTranslation },
        { new: true } // Return the updated document
      );
      if (!updatedVideo) {
        return res.status(404).json({ error: 'Video not found' });
      }
      res.json(updatedVideo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete('/api/videos/:id', async (req, res) => {
    try {
      const video = await Video.findByIdAndDelete(req.params.id);
      if (!video) return res.status(404).send('Video not found');
      res.send('Video deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;