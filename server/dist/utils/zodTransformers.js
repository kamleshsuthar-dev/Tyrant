import { z } from 'zod';
export const toNumber = (label, min) => z
    .string()
    .refine((val) => !isNaN(Number(val)), {
    message: `${label} must be a number`,
})
    .transform((val) => Number(val))
    .refine((val) => (min !== undefined ? val >= min : true), {
    message: `${label} must be >= ${min}`,
});
export const toBoolean = (label) => z
    .string()
    .refine((val) => val === 'true' || val === 'false', {
    message: `${label} must be 'true' or 'false'`,
})
    .transform((val) => val === 'true');
//# sourceMappingURL=zodTransformers.js.map