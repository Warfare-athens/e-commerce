import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"; 
import dotenv from "dotenv";
import path from "path";
import bodyParser from 'body-parser';
const { urlencoded } = bodyParser;



import authRouter from './routes/auth/auth-routes.js';
import adminProductsRouter from './routes/admin/products-routes.js';
import adminOrderRouter from './routes/admin/order-routes.js';
import shopProductsRouter from './routes/shop/products-routes.js';
import shopCartRouter from './routes/shop/cart-routes.js';
import shopAddressRouter from './routes/shop/address-routes.js';
import shopOrderRouter from './routes/shop/order-routes.js';
import shopSearchRouter from './routes/shop/search-routes.js';
import shopReviewRouter from './routes/shop/review-routes.js';
import commonFeatureRouter from './routes/common/feature-routes.js';

//create a database connection -> u can also
//create a separate file for this and then import/use that file here



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(urlencoded({extended:true}));


const __dirname = path.resolve();


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


mongoose.connect(
  process.env.MONGO_URL
).then(console.log("MongoDb Connected"))
.catch((error) => console.log(error))


app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
})

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));