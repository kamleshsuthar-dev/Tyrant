import { z } from "zod";
import mongoose from "mongoose";

// export const objectId = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
//   message: "Invalid ObjectId",
// });

export const objectId = (label: string) =>
  z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: `Invalid ${label} id`,
  });

export const idOrSlug = (label: string) => z.string().refine(
  (val) => {
    const isObjectId = mongoose.Types.ObjectId.isValid(val);
    const isSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(val); 
    return isObjectId || isSlug;
  },
  {
    message: `Invalid ${label} ID or slug`,
  }
);