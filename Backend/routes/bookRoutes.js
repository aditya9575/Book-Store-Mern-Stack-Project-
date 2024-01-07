import express from "express";
import { Book } from "../models/bookModels.js";


const router = express.Router();
//now simply instead of apps we can use this router ex router.get , router.put etc so change the app. --> to router.
//and at the end we export this router as default router

//setting up our routes


//Route to Create/save new book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send All The Required Fields : title , author , publishYear",
      });
    }

    //creating a variable for new book
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route to get all books from the database READ ALL
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route to fetch a single book by ID given by our database -> atlas READ ONE
router.get("/:id", async (request, response) => {
  try {
    //we start by destructuring our id from our request
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//UPDATION ROUTES
//Route To Update A Book With Mongoose
//for updation we will be needing both request.params and request.body and also in cases id
//as in the same way when we were creating a book we added in fields validation so here also while updating we will do the same
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send All The Required Fields : title , author , publishYear",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!result) {
      return response.status(404).json({ message: "Book Not Found !" });
    } else {
      return response
        .status(200)
        .send({ message: "Book Updated Successfully." });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

//deletion route
router.delete("/:id", async (request, response) => {
  try {
    //we destructure the id
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    //now we check if our result is false we return book not found else we return book deleted successfully
    if (!result) {
      return response.status(404).json({ message: "Book Not Found !" });
    } else {
      return response
        .status(200)
        .send({ message: "Book Deleted Successfully." });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});


export default router;