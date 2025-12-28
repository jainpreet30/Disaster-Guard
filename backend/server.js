// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const alertRoutes = require('./routes/alertRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const reportRoutes = require('./routes/reportRoutes');
const externalApiRoutes = require('./routes/externalApiRoutes');

// Import middleware
const errorMiddleware = require('./middleware/errorMiddleware');

// Initialize app 
const app = express();

// Connect to database
console.log("DB URI from Env:", process.env.MONGODB_URI);
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.get('/', (req, res) => {
//   res.send('Disaster Management Backend is running!');
// });
app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/external', externalApiRoutes); // New external API routes

// Error handling middleware
app.use(errorMiddleware);

// Serve static assets in production
if (process.env.NODE_ENV === 'deployment') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});