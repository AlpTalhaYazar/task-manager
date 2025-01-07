import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db/connect.js';
import { taskRoutes } from './routes/tasks.js';
import { notFoundMiddleware } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

const app = express();

// middleware
app.use(cors());
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', taskRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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