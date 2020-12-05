# node-short-url

闲得无聊，随手做了一个基于 nodejs 的短链接系统

## 安装

### 方法一：docker-compose 部署（推荐）

下载 `docker-compose.yml` 文件到任意路径，然后切换到该目录，执行

```sh
docker-compose up
```

即可。

默认监听 5000 端口，如果是部署在本地请访问 `http://127.0.0.1:5000`，部署在服务器请访问 `http://[服务器ip]:5000`

docker-compose 安装及下载请自行搜索

### 方法二：手动部署

>   提示：本项目采用 webpack 打包，无需额外安装 node_modules 依赖即可执行。

运行环境：Node.js >= 12 ； Redis >= 3

从 release 下载 index.js 文件，存放到任意路径，执行

```sh
node index.js
```

即可。

访问路径同上

## 配置

修改 `.env` 文件即可

```ini
# 端口
PORT=5000
# 根路由
ROOT_URL='/'
#生成的短链的基准 url ，末尾不带 /
BASE_URL='http://localhost:5000'
# 超时时间(毫秒)
TIMEOUT=10000
# 限流区间，每多少秒
LIMIT_INTERVAL=60
# 限流值，每个区间内可访问多少次
LIMIT_MAX=30

# Redis配置
REDIS_PORT=6379
REDIS_HOST='127.0.0.1'
REDIS_PASSWORD=''
# Redis前缀
REDIS_KEY_PREFIX='my-redis-'
```

## API

### /shortUrl

取短链接

| query      | 类型   | 必须 | 说明                                          |
| ---------- | ------ | ---- | --------------------------------------------- |
| url        | string | 是   | 要缩短的链接，必须带 http:// 或 https// 前缀  |
| len        | number | 否   | 短链接长度，默认为 6 个字符，合法区间为 [4,8] |
| expiryTime | string | 否   | 过期时间，默认为1个月                         |

### /longUrl

还原短链接

| query | 类型   | 必须 | 说明                                         |
| ----- | ------ | ---- | -------------------------------------------- |
| url   | string | 是   | 要还原的链接，必须带 http:// 或 https// 前缀 |

### /:short

将短链接301跳转到原本的长链接

| params | 类型   | 必须 | 说明        |
| ------ | ------ | ---- | ----------- |
| short  | string | 是   | 短链接 hash |