FROM orbsmiv/shairport-sync-rpi

ENV NODE_VERSION 9.11.1

RUN apk update && apk add xz \
      nodejs \
      nodejs-npm \
      g++ \
      make \
      python \
      avahi-compat-libdns_sd \
    && npm install -g hap-nodejs express --unsafe-perms

COPY shairport-sync.conf /etc/shairport-sync.conf
COPY app.js /app.js
COPY start.sh /start

CMD ["/start"]
