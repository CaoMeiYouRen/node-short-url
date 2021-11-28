FROM alpine:latest

WORKDIR /home/app

ENV NODE_ENV production

# 安装nodejs环境
RUN apk update \
    && apk add --no-cache --update "nodejs" \
    && node -v
# RUN echo "https://mirrors.aliyun.com/alpine/edge/main/" > /etc/apk/repositories \
#     && echo "https://mirrors.aliyun.com/alpine/edge/community/" >> /etc/apk/repositories \
#     && apk update \
#     && apk add --no-cache --update nodejs \
#     && node -v

COPY . /home/app/

EXPOSE 5000

CMD ["node","dist/index.js"]