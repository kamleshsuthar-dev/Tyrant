"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idOrSlug = exports.objectId = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
// export const objectId = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
//   message: "Invalid ObjectId",
// });
const objectId = (label) => zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
    message: `Invalid ${label} id`,
});
exports.objectId = objectId;
const idOrSlug = (label) => zod_1.z.string().refine((val) => {
    const isObjectId = mongoose_1.default.Types.ObjectId.isValid(val);
    const isSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(val);
    return isObjectId || isSlug;
}, {
    message: `Invalid ${label} ID or slug`,
});
exports.idOrSlug = idOrSlug;
