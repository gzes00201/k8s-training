const express = require('express')
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const redis = require('redis');

const app = express()

const port = 3000

const client = redis.createClient({
  url: 'redis://:amitest@hello-ami-redis-service:6379'
});
client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => {
  console.log('Redis client connected');
});
client.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formData.parse());

app.get('/ping', (req, res) => {
  res.send('Hello World!')
})
app.get('/redis/:rediskey', async (req, res) => {
  console.log('rediskey', req.params.rediskey)
  var value = await client.get(req.params.rediskey);
  if(value){
    res.send({msg: '', data: { [req.params.rediskey]: value  }})  
  } else {
    res.send({msg: '查無資料', data: { }})  
  }
 
})

app.post('/redis', (req, res) => {
  console.log(req.body);
  var resData = {}
  var joblist =  Object.keys(req.body).map(k=> client.set(k, req.body[k], redis.print))
  
  Promise.all(joblist).then(values => {
    console.log(values); // [3, 1337, "foo"]
    res.send({msg: '',data: resData})  
  }).catch((err)=>{
    console.log(err)
    res.send({msg: '儲存失敗',data: {}})  
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
