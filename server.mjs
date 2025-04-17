import express from 'express';
import userRoutes from './routes/userRoutes.mjs';
import postRoutes from './routes/postRoutes.mjs';
import commentRoutes from './routes/commentRoutes.mjs';
import error from './utiities/error.mjs';

const app = express();
const PORT = 3004;

app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/comments',commentRoutes);

// Middleware
// Routes
app.get('/api/users/:id/posts',userRoutes);
app.get('/posts/:postId/comments',commentRoutes);
app.get('/users/:userId/comments',commentRoutes);

// app.get('/api/posts',postRoutes);

app.get('/',(req,res)=>{
    res.send("Welcome!!!");
})

// error handing middleware


app.use((req,res,next)=>{
    next(error(404,'Resource not found!!!'));
});

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).json({error : err.message});
    // res.json({error : err.message});
});

app.listen(PORT,(req,res)=>{
    console.log(`Listening to the port: ${PORT}`)
});