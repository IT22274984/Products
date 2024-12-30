//C:\Users\shant\Downloads\Appointment-Management-System-main\Appointment-Management-System-main\backend\db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use a properly formatted MongoDB connection string
    await mongoose.connect('mongodb+srv://navamshanth:C7nUdzDqH9vtxfVi@product.pjafv.mongodb.net/yourDatabaseName?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;


//C7nUdzDqH9vtxfVi   password            , username   ...   navamshanth


// mongodb+srv://navamshanth:C7nUdzDqH9vtxfVi@product.pjafv.mongodb.net/?retryWrites=true&w=majority&appName=product

//mongodb+srv://navamshanth:C7nUdzDqH9vtxfVi@product.pjafv.mongodb.net/