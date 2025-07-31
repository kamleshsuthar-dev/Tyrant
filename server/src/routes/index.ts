import express from 'express';
const router = express.Router();
import authRouter from 'routes/auth';
import categoryRouter from 'routes/category';
import productRouter from 'routes/product'

export default (): express.Router => {
    authRouter(router);
    categoryRouter(router);
    productRouter(router);
    return router;
}
