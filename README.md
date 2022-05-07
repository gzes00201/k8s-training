# Ami作業
* * *

## 前端主檔
1. /front 裏面

## GKE 版
1. [ping 連結](http://104.155.225.88:3000/ping)
2. yaml在 gke資料夾內

## VM 版
1. [ping 連結](http://34.81.41.241:3000/ping)
2. 機器名稱 ami-test-vm
  
# K8s redis API 格式
## POST /redis

http://104.155.225.88:3000/redis  傳入body會將資料暫存在redis

* 自定義key: 自定義資料

## GET /redis/{key}

http://104.155.225.88:3000/redis 取得暫存在redis的資料

```json
{
    "msg": "",
    "data": {
        "redisKey": "redisValue"
    }
}
```

# VM版 mysql
```docker
$ docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=amiroot mysql:5.7.24
$ docker run --name phpmyadmin -d --link mysql -e PMA_HOST="mysql" -p 8080:80 phpmyadmin/phpmyadmin
$ docker start mysql
$ docker start phpmyadmin
```