import cors from 'cors';
import { isDev } from './constants';

const getCorsOptions = (whitelist: string[]): cors.CorsOptions => ({
  origin: isDev
    ? '*'
    : function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
});

const customCors = async (
  req: cors.CorsRequest,
  res: {
    statusCode?: number;
    setHeader(key: string, value: string): any;
    end(): any;
  },
  next: (err?: any) => any
) => {

  // get this list from the database
  const whitelist = ['http://example1.com', 'http://example2.com'];

  // if error, .catch(next)

  // generate the cors handler
  return await cors(getCorsOptions(whitelist))(req, res, next);
};

export default customCors;
