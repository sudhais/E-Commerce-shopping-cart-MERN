import express from "express"
import { config } from "dotenv"
import {join} from 'path'
import cors from "cors"
import db from './config/dbconnect.js'

config();

const app = express();
app.use(cors());
app.use(express.json);

db();

//display the log of routes middleware
app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
})

app.use('/', (req,res) => {
  res.status(200).json('hellow');
})

//error url middleware
app.use('*', (req,res)=>{
  res.status(404).json({message:'page not found'})
})

app.listen(process.env.PORT, () => {
  console.log(`server listening to the port : ${process.env.PORT}`);
})
