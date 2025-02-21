const Video = require('../models/Video');

exports.createVideo = async (req, res) => {
  const { title, url, signLanguageTranslation } = req.body;
  try {
    const newVideo = new Video({ title, url, signLanguageTranslation });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};