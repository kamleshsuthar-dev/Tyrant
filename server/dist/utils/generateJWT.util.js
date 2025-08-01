import jwt from "jsonwebtoken";
import { env } from "config/env";
export function generateToken(user) {
    if (!env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    let token = jwt.sign({ email: user.email, id: user._id }, env.JWT_SECRET);
    return token;
}
;
//# sourceMappingURL=generateJWT.util.js.map