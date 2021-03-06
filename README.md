# AirPlay with HomeKit for Raspberry Pi

This project creates an AirPlay stream target on a Raspberry Pi. It also makes
a HomeKit virtual power switch available that turns on whenever a stream is
active and off whenever a stream stops. This allows you to create automations
that, for example, turn on smart plug (e.g. [iHome ISP6x](https://www.amazon.com/iHome-control-connected-Assistant-speakers/dp/B01HCVG9NG/ref=sr_1_2_sspa?ie=UTF8&qid=1528072565&sr=8-2-spons&keywords=ihome+smart+plug&psc=1)) attached 
to an audio system or set mood lighting whenever you play music.

## Requirements

* Raspberry Pi configured on your network
* Docker CE. For raspbian OS, see these setup instructions on the [Docker docs site](https://docs.docker.com/install/linux/docker-ce/debian/#upgrade-docker-ce-1)

### Recommended hardware

I highly recommend the following hardware components

* [Raspberry Pi Zero W](https://www.amazon.com/CanaKit-Raspberry-Wireless-Official-Supply/dp/B071L2ZQZX/ref=sr_1_2?s=pc&ie=UTF8&qid=1527567717&sr=1-2&keywords=raspberry+pi+zero+w&dpID=51zutywP8gL&preST=_SY300_QL70_&dpSrc=srch)
* [Raspberry Pi Zero Headers](https://www.amazon.com/Break-away-2x20-pin-Strip-Header-Raspberry/dp/B07CKQWLFF/ref=sr_1_3?s=electronics&ie=UTF8&qid=1527568280&sr=1-3&keywords=raspberry+pi+zero+break+away)
* [HifiBerry DAC+ Zero](https://www.hifiberry.com/shop/boards/hifiberry-dac-zero/)
* [HifiBerry DAC+ Zero Case](https://www.hifiberry.com/shop/cases/hifiberry-case-for-dac-zero/)

You can skip the HifiBerry DAC, but you'll be seriously missing out. They sound WAY better than the RPi built in DAC.

## Running

Running is simple. Just run the following Docker command:
`docker run -d --net host --device /dev/snd -v $HOME/persist:/persist -e HOMEKIT_CODE=872-78-174 -e AIRPLAY_NAME=AirPlay_HomeKit ccaum/airplay-homekit-rpi:latest`

Replace `AirPlay_HomeKit` with whatever you want your speaker to
show up as in AirPlay.

If you need to set a different HomeKit code, if for example it conflicts with a
code already in use, you can set a different value to HOMEKIT_CODE.

### Systemd

If you'd like the container to be controlled by systemd so it can start on
boot, there's an example [airplay.service](airplay.service) file in this
repository. 

* Place the file in `/etc/systemd/system/airplay.service` on the raspberry pi.
* Reload systemd with `systemctl daemon-reload`
* Set it to start on boot with `systemctl enable airplay`
* Start the airplay service with `systemctl start airplay`

## Setting up HomeKit

* In the Home app, tap the '+' symbol, then tap the "Add Accessory" option
* Select the "Don't Have a Code or Can't Scan" option at the bottom of the screen
* The "AirPlay Stream Switch" should be available as an option. Select it and complete the accessory addition process

Once the AirPlay power switch is set up in HomeKit, you can create automations
automatically turn on audio equipment or set lighting scenes.

## Streaming Audio

In iOS, tap the AirPlay symbol in your Music app, or whatever app you'd like to
stream audio from. Whatever you named the AirPlay speaker should appear as 
an option.

## Thanks

Huge thanks to...

* [orbsmiv](https://github.com/orbsmiv) for [packaging](https://github.com/orbsmiv/docker-shairport-sync-rpi) shairplay-sync for the RPi platform.
* [The shairport-sync project](https://github.com/mikebrady/shairport-sync)
* [The hap-nodejs project](https://github.com/KhaosT/HAP-NodeJS)
