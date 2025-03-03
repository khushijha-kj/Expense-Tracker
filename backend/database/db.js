import mongoose from 'mongoose';
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI); 
        console.log('mongoDB connected');
            
    }
    catch(error){
        console.log(err);
        // process.exit(1);
    }
}

export default connectDB;