import express, { request, response } from "express";
import mongoose, { get } from "mongoose";
import { Book } from "./models/bookModels.js"; 
import bookRoutes from "./routes/bookRoutes.js"; 
import cors from "cors";

const app = express();


//THIS ENABLES US TO BE ABLE TO USE JSON FOR TESTING AND OTHER QUERIES 
app.use(express.json());
  

// -------------------------------------CORS POLICY HANDLING FOR FRONTEND 
//Middleware to handle cors policy 
// 1st way is simply to allow every route -> app.use(cors()); but by using this way we allow every one to access the data with our 
//endpoints 
// app.use(cors()); so this is why in general this method is not used that frequently
app.use(cors());
// instead we can use this second method ------------> Allowing Custom Origins by using this way we have more control on our routing
// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// ) 
// -------------------------------------NOW ONLY THE CLIENT WITH THESE ORIGINS CAN ACCESS OUR SERVERS 

app.use('/books',bookRoutes);  

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome To Mern Stack Book Store Project ");
  });   



//function to listen to our port 
const port = 5555; // You can choose any available port


const mongoUrl ="mongodb+srv://adityamehto19:IQmCLEyDEhlDOUeK@book-store-mern.rlpfsvf.mongodb.net/books-collection?retryWrites=true&w=majority"
mongoose.connect(mongoUrl).then((result) => {
   console.log("Connected To MongoDB")
   app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}); 
}).catch((err) => {
    console.log(err)
}); 