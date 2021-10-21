import ResponseBase from './response-model';

export default class SuccessResponse extends ResponseBase {
  constructor(data: Record<string, any> | Array<any>) {
    super();

    this.status = true;
    this.data = data;
  }
}
