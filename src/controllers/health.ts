import Database from 'mongoose';
import { Get, Route } from 'tsoa';

interface HealthResponse {
  api: boolean;
  database: boolean;
  version: string;
}

enum ConnectionStates {
  disconnected = 0,
  connected = 1,
  connecting = 2,
  disconnecting = 3,
  uninitialized = 99,
}

@Route('/api/health')
export default class PingController {
  @Get('/')
  public getStatus(): HealthResponse {
    return {
      api: true,
      database: Database.connection.readyState === ConnectionStates.connected,
      version: '1.0.0',
    };
  }
}
