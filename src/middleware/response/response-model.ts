export default class ResponseBase {
  public status = false;
  public data?: Record<string, any> | Array<any>;
  public error?: {
    code: string;
    message: string;
    obj?: Record<string, any>;
  };
}
