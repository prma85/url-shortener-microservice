import ResponseBase from './response-model';

export default class ErrorResponse extends ResponseBase {
  constructor(code: string, message: string, obj?: Record<string, any>) {
    super();

    this.status = false;
    this.error = { code, message, obj };
  }
}
