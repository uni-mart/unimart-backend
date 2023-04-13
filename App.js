const express = require('express');
const connectDB = require('./db/connect');
const app = express();
require('dotenv').config();
require('express-async-errors');
//other packages
const morgan = require('morgan')

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'))
app.use(express.json());
app.get('/',(req, res)=>{
    res.send('e-commerce api')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();