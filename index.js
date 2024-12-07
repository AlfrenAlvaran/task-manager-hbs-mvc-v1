import express from 'express';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import 'dotenv/config';
import mongoose from 'mongoose';
import router from './src/routes/todo.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from "public"

// Set view engine and views directory
app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'src', 'views'));
hbs.registerPartials(path.join(__dirname, '/views/layouts'))
// Database connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connected');
    })
    .catch((error) => {
        console.error('Database Connection Error:', error.message);
    });

// Routes
app.use('/todos', router);

// Server setup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
