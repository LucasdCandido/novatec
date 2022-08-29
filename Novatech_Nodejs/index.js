const app = require('./src/app');
const cpus = require('os').cpus().length;
const cluster = require('cluster');

if (cluster.isMaster) {
  for (let i = 0; i < cpus; i++) {
    const worker = cluster.fork()
    worker.on('exit', () => {
      console.log('worker error')
      cluster.fork()
    })
  }
} else {
  app.listen({ port: 3000}, () => {
    console.log('server on')
  })
}
