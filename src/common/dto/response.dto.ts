import { HttpStatus } from '@nestjs/common';

export class SuccessResponse<T> {
  constructor(responseData: T | T[]) {
    const response = {
      isSuccess: true,
      status: HttpStatus.CREATED,
      message: 'API Executed successfully',
      data: responseData,
    };

    return response;
  }
}
