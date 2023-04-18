const express = require('express');
const app = express();
require('dotenv').config();
require('express-asyn-errors');
//other packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
//database
const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'))
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'))
app.use(fileUpload())

app.get('/',(req, res)=>{
    res.send('e-commerce api')
})
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);


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