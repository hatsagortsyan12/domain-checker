const queue = 'parse_queue';

export default () => {
  (global as any).amqpChannel.assertQueue(queue, {
    durable: true
  });

  (global as any).amqpChannel.prefetch(1);

  (global as any).amqpChannel.consume(queue, msg => {
    console.log(" [x] Received %s", msg.content.toString());
    (global as any).amqpChannel.ack(msg);
  }, {
    noAck: false
  });
};
