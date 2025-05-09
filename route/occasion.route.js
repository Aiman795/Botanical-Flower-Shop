import express from 'express';
const router = express.Router();

// Example route for /like
router.get('/occasion', (req, res) => {
  res.render('occasion');  // Render the 'like' page (you can create this view)
});

export default router;