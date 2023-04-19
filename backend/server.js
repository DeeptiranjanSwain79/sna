const app = require('./app');
const cloudinary = require('cloudinary').v2;
const connectDatabase = require('./config/db');

//Handling Uncaught Exceptions  (Undefined variable)
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);;
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

//Connecting to the database
connectDatabase();

cloudinary.config({
    cloud_name: "dh4cuwzps",
    api_key: "641415751941482",
    api_secret: "HjIt8eVi2B8JymVLju4hmGAbvYM"
});
const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log(`Server working on http://localhost:${PORT}`);
})


//Unhandled promise rejection   (If any connection string or any server related error)
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Sutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    })
})
