import { verifyToken } from 'middlewares/auth/authenticate';
import AuthController from 'controllers/auth.controller.js';
import validateRequest from 'middlewares/validateRequest';
import { googleAuthSchema, isRegisteredSchema, loginUserSchema, registerUserSchema, resetPasswordSchema } from 'validations/zod/auth.schema.js';
export default (router) => {
    router.post('/auth/register', validateRequest(registerUserSchema), AuthController.registerUser);
    router.post('/auth/login', validateRequest(loginUserSchema), AuthController.loginUser);
    router.get('/auth/google', validateRequest(googleAuthSchema), AuthController.googleAuth);
    router.post('/auth/logout', AuthController.logoutUser);
    router.post('/auth/reset-password', validateRequest(resetPasswordSchema), AuthController.resetPassword);
    router.get('/auth/isregistered', validateRequest(isRegisteredSchema), AuthController.isRegistered);
    router.get('/auth/me', verifyToken, AuthController.getCurrentUser);
};
//# sourceMappingURL=auth.route.js.map