import { Server } from 'ws';
import { Server as HttpServer } from 'http';

class Socket {
  public initialize(server: HttpServer):void {
    const wsServer = new Server({ server });
    
    wsServer.on('connection', (ws) => {
      console.log('New client connected');
      ws.send('Welcome');
      ws.on('message', (msg) => {
        wsServer.clients.forEach((client) => {
          client.send(`${msg}`);
        });
      });
    });
  }
}

export { Socket };
