import express from "express"
import { config } from "dotenv"
import path from 'path'
import cors from "cors"
import db from './config/dbconnect.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

config();

const app = express();

const allowedOrigins = ['http://localhost:8000'];
    
app.use(cors({
  origin: (origin, callback) => {
    console.log(origin);
    // Allow requests with no origin (like mobile apps, curl requests, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Origin: ${origin} is not allowed by CORS`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

db();

//display the log of routes middleware
app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
})


app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes)
app.use("/api/orders", orderRoutes )
app.use("/api/upload", uploadRoutes)

const _dirname = path.resolve();
app.use("/uploads",express.static(path.join(_dirname, "/uploads")))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(_dirname, "/frontend/dist")));
  app.get("*", (req,res) => {
    res.sendFile(path.resolve(_dirname,'frontend', 'dist', 'index.html'))
  })
}

//error url middleware
app.use(notFound);
app.use(errorHandler);



app.listen(process.env.PORT, () => {
  console.log(`server listening to the port : ${process.env.PORT}`);
})
