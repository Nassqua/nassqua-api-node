module.exports = {
  port : process.env.PORT || 3000,
  db : process.env.MONGODB || 'mongodb://localhost:27017/nassqua',
  SECRET_TOKEN : 'miclavedetokens'
}

// localhost DB = 'mongodb://localhost:27017/nassqua'
// atlas DB = 'mongo "mongodb://cluster0-shard-00-00-nujhp.mongodb.net:27017,cluster0-shard-00-01-nujhp.mongodb.net:27017,cluster0-shard-00-02-nujhp.mongodb.net:27017/test?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl --username nassquadb --password Chich@ng@!91'
// mlab : 'mongodb://hzapata:Chichanga91@ds149743.mlab.com:49743/nassqua'
