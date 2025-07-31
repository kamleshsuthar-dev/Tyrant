import { Request, Response, NextFunction } from "express";
import { AnyZodObject, z, ZodError} from "zod";


const formatZodError = (error: ZodError) => {
  const errors: Record<string, string[]> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(err.message);
  });

  return {
    success: false,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
    error: error.errors[0]?.message || "Validation failed"
  };
};


const validateRequest = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data ={
      body: req.body,
      query: req.query,
      params: req.params,
    };
    const result = await schema.safeParseAsync(
      schema instanceof z.ZodObject && !('shape' in schema && 'body' in schema.shape)
        ? req.body  
        : data  
    );
    if (!result.success) {
      res.status(400).json(formatZodError(result.error));
      return;
    }
    if ('body' in result.data) {
      req.body = result.data.body;
    }
    if ('query' in result.data) {
      req.query = result.data.query;
    }
    if ('params' in result.data) {
      req.params = result.data.params;
    }
    next();
    return; 
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(formatZodError(error));
      return;
    }
    res.status(500).json({ success: false, message: "Internal server error"});
    return; 
  }
};

export default validateRequest;
