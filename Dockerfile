FROM alpine:3.12

WORKDIR /home/app

ENV NODE_ENV production
# ENV NODE_VERSION 12.18.4-r0

# 安装nodejs环境
RUN apk update \
    && apk add --no-cache --update "nodejs" \
    && node -v
# RUN echo "https://mirrors.aliyun.com/alpine/v3.12/main/" > /etc/apk/repositories \
#     && echo "https://mirrors.aliyun.com/alpine/v3.12/community/" >> /etc/apk/repositories \
#     && apk update \
#     && apk add --no-cache --update "nodejs=${NODE_VERSION}" \
#     && node -v

COPY . /home/app/

EXPOSE 5000

CMD ["node","dist/index.js"]