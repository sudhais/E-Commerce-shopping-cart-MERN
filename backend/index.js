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
app.use(cors());
app.use(express.json());

db();

//display the log of routes middleware
app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
})

// app.post("/api", (req,res)=> {
//   res.send('hellow')
// })


app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes)
app.use("/api/orders", orderRoutes )
app.use("api/upload", uploadRoutes)

const _dirname = path.resolve();
app.use("/uploads",express.static(path.join(_dirname, "/uploads")))

//error url middleware
app.use(notFound);
app.use(errorHandler);



app.listen(process.env.PORT, () => {
  console.log(`server listening to the port : ${process.env.PORT}`);
})
