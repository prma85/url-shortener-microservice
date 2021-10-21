import mongoose from 'mongoose';

import { MONGO_URI } from './constants';

export class Database {
  constructor() {
    this.init();
  }

  async init() {
    try {
      await mongoose.connect(`${MONGO_URI}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0, // and MongoDB driver buffering
      });

      mongoose.connection.on('error', (err: object) => {
        console.log('database error: ', err);
      });
    } catch (error) {
      console.log('database error to connect:', error);
    }
  }
}

export default new Database();
