const {Client, Pool} = require('pg')

Pool(min=50,max=50)

const cliente = new Cliente()
await cliente.connect()

const sql = 'SELECT'