# AirPlay with HomeKit for Raspberry Pi

This project creates an AirPlay stream target on a Raspberry Pi. It also makes
a HomeKit virtual switch available that turns on whenever a stream is active
and off whenever a stream stops. This allows you to create automations
that, for example, turn on smart switches attached to an audio system or set
mood lighting whenever you play music.

## Requirements

* Raspberry Pi configured on your network
* Docker CE. For raspbian OS, see these setup instructions on the [Docker docs site](https://docs.docker.com/install/linux/docker-ce/debian/#upgrade-docker-ce-1)

## Running

Running is simple. Just run the following Docker command:
`docker run -d --net host --device /dev/snd -v $HOME/persist:/persist -e HOMEKIT_CODE=872-78-174 -e AIRPLAY_NAME=<name your airplay speaker> ccaum/airplay-homekit-rpi`

Replace `<name your airplay speaker>` with whatever you want your speaker to
show up as in AirPlay.

If you need to set a different HomeKit code, if for example it conflicts with a
code already in use, you can set a different value to HOMEKIT_CODE.

## Setting up HomeKit

* In the Home app, tap the '+' symbol, then tap the "Add Accessory" option
* Select the "Don't Have a Code or Can't Scan" option at the bottom of the screen
* The "AirPlay Stream Switch" should be available as an option. Select it and complete the accessory addition process

Once the AirPlay switch is set up in HomeKit, you can create automations
automatically turn on audio equipment or set lighting scenes.

## Streaming Audio

In iOS, tap the AirPlay symbol in you Music app, or whatever app you'd like to
stream audio from. Whatever you named the AirPlay speaker should appear as 
an option.

## Thanks

Huge thanks to [orbsmiv](https://github.com/orbsmiv) for [packaging](https://github.com/orbsmiv/docker-shairport-sync-rpi) shairplay-sync for the RPi platform.