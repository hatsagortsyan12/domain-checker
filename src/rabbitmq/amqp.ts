import amqp from 'amqplib/callback_api';
import worker from '../workers/worker'

class Amqp {
  constructor() {
    amqp.connect('amqp://localhost', (error0, connection) => {
      if (error0) {
        console.error(error0);
        throw error0;
      }

      connection.createChannel((error1, channel: amqp.Channel) => {
        if (error1) {
          console.error(error1);
          throw error1;
        }

        (global as any).amqpChannel = channel;
        worker();
      });
    });
  }
}

export default new Amqp();
