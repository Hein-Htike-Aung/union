import { Response } from 'express';

const successResponse = (
  res: Response,
  message: string | null | undefined,
  data = {},
) => {
  res.status(200).json({
    statusCode: 200,
    message: message || 'Successfully retrieved',
    data,
  });
};

export default successResponse;
