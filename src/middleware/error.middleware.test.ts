import { errorHandler } from '../errorHandler';
import { Request, Response, NextFunction } from 'express';
import HttpException from '../common/http-exception';
describe('errorHandlerPippo', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });
  it('should return 500 when no status code is provided', () => {
    const error = new HttpException('Internal Server Error');
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockResponse.status).toBeCalledWith(500);
    expect(mockResponse.send).toBeCalledWith(error);
  });
  it('should return the status code of the error object when statusCode is present', () => {
    const error = new HttpException('Bad Request', 400);
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith(error);
  });
  it('should return the status code of the error object when status is present', () => {
    const error = {
      status: 403,
      message: 'Forbidden'
    };
    errorHandler(error as HttpException, mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockResponse.status).toBeCalledWith(403);
    expect(mockResponse.send).toBeCalledWith(error);
  });
});
