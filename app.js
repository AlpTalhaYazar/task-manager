require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/connect');

const taskRoutes = require('./routes/tasks');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// middleware

app.use(cors());
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
            .then(() => console.log('Connected to the database'))
            .catch((error) => console.error(error));

        app.listen(port, console.log(`Server is running on port ${port}`));
    } catch (error) {
        console.error(error);
    }
}

start();