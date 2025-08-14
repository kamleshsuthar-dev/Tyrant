import express from 'express';
const router = express.Router();
import authRouter from '../routes/auth.route';
import categoryRouter from '../routes/category.route';
import productRouter from '../routes/product.route'

export default (): express.Router => {
    authRouter(router);
    categoryRouter(router);
    productRouter(router);
    return router;
}
