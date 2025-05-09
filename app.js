import express from "express";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";  
import { fileURLToPath } from "url";
import connectDB from "./db/connection.js";
import bodyParser from "body-parser";
import loginRoutes from './route/login.route.js';
import signupRoutes from './route/signup.route.js';
import contactRoutes from './route/contact.route.js';
import likeRoute from './route/like.route.js';
import orderRoutes from './route/order.route.js';
import occasionRoutes from './route/occasion.route.js';
import productRoutes from './route/product.route.js';

dotenv.config();
const app = express();
connectDB();  

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,  // Use an environment variable for the session secret
  resave: false,
  saveUninitialized: true,
}));

// Middleware to pass success/error messages to views
app.use((req, res, next) => {
  res.locals.success = req.query.success || null;
  res.locals.error = req.query.error || null;
  next();
});

// Routes
app.use('/user', likeRoute);
app.use('/user', occasionRoutes);
app.use('/contact', contactRoutes);
app.use('/user', loginRoutes);
app.use('/user', signupRoutes);
app.use('/user', orderRoutes);
// Routes
app.use('/api/products', productRoutes);
// Static files
app.use(express.static(path.join(__dirname, "public")));  // Serve static files from 'public'

// Get Routes
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/products", (req, res) => res.render("products"));
app.get("/occasions", (req, res) => res.render("occasions"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/blog", (req, res) => res.render("blog"));
app.get("/cart", (req, res) => res.render("cart")); 
app.get("/login", (req, res) => res.render("login"));
app.get("/order", (req, res) => res.render("order"));
// 404 Error Page
app.use((req, res) => {
  res.status(404).render("404");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
