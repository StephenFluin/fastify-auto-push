import * as fastify from 'fastify';
import {staticServe} from 'fastify-auto-push';
import * as fs from 'fs';
import * as path from 'path';

console.log('trying to start server.');


let ssl  = {
    key: fs.readFileSync(path.join(__dirname, 'file.key')),
    cert: fs.readFileSync(path.join(__dirname, 'file.cert'))
}
const app = fastify({
    http2: true,
    https: {
      key: ssl.key,
      cert: ssl.cert,
    }
  })
  
  const opts = {
    schema: {
      response: {
        '2xx': {
          type: 'object',
          properties: {
            hello: {
              type: 'string'
            }
          }
        }
      }
    }
  }
  
//   app
//     .get('/', opts, function (req, reply) {
//       reply.header('Content-Type', 'application/json').code(200)
//       reply.send({ hello: 'world' })
//     })

app.register(staticServe, {root: path.join(__dirname, 'public')});
// app.use((req, res) => {
//     res.s`${__dirname}/public/index.html`
// });

  
  app.listen(3000, (err, address) => {
    if (err) throw err
    console.log(`server listening on ${address}`)
  })
