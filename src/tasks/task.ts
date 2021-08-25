const queue = 'parse_queue';

export default msg => {
  (global as any).amqpChannel.assertQueue(queue, {
    durable: true
  });
  (global as any).amqpChannel.sendToQueue(queue, Buffer.from(msg), {
    persistent: true
  });
};
