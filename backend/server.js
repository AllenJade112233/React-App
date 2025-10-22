const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', menuRoutes);
app.use('/api', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
