#!/bin/ash

/bin/rm -rf /var/run
/bin/mkdir -p /var/run/dbus

dbus-uuidgen --ensure
dbus-daemon --system

avahi-daemon --daemonize --no-chroot

node /app.js &

/usr/local/bin/shairport-sync -c /etc/shairport-sync.conf -m avahi -a "$AIRPLAY_NAME" "$@"
