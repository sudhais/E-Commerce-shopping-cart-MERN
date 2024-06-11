import  mongoose from 'mongoose';


const dbconnect = ()=>{

  mongoose.connect(process.env.MONG_URI)
  .then((con)=>{
      console.log(`Mongo db conncected to the host ${con.connection.host}`);
  }).catch((err)=>{
      console.log(err);
  })
}

export default dbconnect;