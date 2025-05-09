import express from 'express';
const router = express.Router();


router.get('/like', (req, res) => {
  res.render('like');  
});

export default router;
