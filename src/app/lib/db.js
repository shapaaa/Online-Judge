import mongoose from "mongoose";

const DBConnection = async()=> {
      const MONGODB_URL = process.env.MONGODB_URL
      try{
            await mongoose.connect( MONGODB_URL,{ useNewUrlParser:true } )
      }
      catch(error)
      {
         console.log("Error while connecting database",error.message)
      }
}
export default DBConnection;