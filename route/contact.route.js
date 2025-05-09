import express from 'express';
import Contact from '../models/contact.model.js';

const router = express.Router();

// Route to handle contact form submissions
router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.redirect('/contact?error=All fields are required.');
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.redirect('/contact?success=Contact form submitted successfully!');
  } catch (error) {
    console.error(error);
    res.redirect('/contact?error=An error occurred while submitting the form.');
  }
});

export default router;
