"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBoolean = exports.toNumber = void 0;
const zod_1 = require("zod");
const toNumber = (label, min) => zod_1.z
    .string()
    .refine((val) => !isNaN(Number(val)), {
    message: `${label} must be a number`,
})
    .transform((val) => Number(val))
    .refine((val) => (min !== undefined ? val >= min : true), {
    message: `${label} must be >= ${min}`,
});
exports.toNumber = toNumber;
const toBoolean = (label) => zod_1.z
    .string()
    .refine((val) => val === 'true' || val === 'false', {
    message: `${label} must be 'true' or 'false'`,
})
    .transform((val) => val === 'true');
exports.toBoolean = toBoolean;
