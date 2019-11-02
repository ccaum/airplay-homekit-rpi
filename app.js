var hap = require('/usr/lib/node_modules/hap-nodejs')
var express = require('/usr/lib/node_modules/express')
var app = express();
hap.init();

// HAP necessities
var Accessory = hap.Accessory;
var Service = hap.Service;
var Characteristic = hap.Characteristic;
var uuid = hap.uuid;
var homekitCode = process.env.HOMEKIT_CODE;
var offDelay = process.env.OFF_DELAY || 0;
var offDelayTimer;
console.log(homekitCode);

var SWITCH = {
  on: false,

  getStatus: function() {
    return SWITCH.on;
  },

  identify: function() {
    console.log("Identify the AirPlay switch!");
  }
}

var switchUUID = uuid.generate('hap-nodejs:accessories:statefulswitch');

var streamSwitch = exports.accessory = new Accessory('AirPlay Stream', switchUUID);

function turnOff() {
  SWITCH.on = false;
  streamSwitch
    .getService(Service.Switch)
    .updateCharacteristic(Characteristic.On, false);
}

// Create the HTTP API endpoint
app.get('/on', function(request, response) {
  if (offDelay != undefined) {
    clearInterval(offDelayTimer);
  }

  SWITCH.on = true;
  streamSwitch
    .getService(Service.Switch)
    .updateCharacteristic(Characteristic.On, true);

  response.send('Stream switch is on');
});

app.get('/off', function(request, response) {
  if (offDelay == undefined) {
    turnOff();
  } else {
    offDelayTimer = setInterval(turnOff, 1000 * offDelay);
  }

  response.send('Stream switch is off');
});

app.listen(9999);

streamSwitch.username = "2A:2B:3D:5A:2E:AD";
streamSwitch.pincode = homekitCode;

streamSwitch
  .getService(Service.AccessoryInformation)
  .setCharacteristic(Characteristic.Manufacturer, "AirPlay Switcheroo Corp")
  .setCharacteristic(Characteristic.Model, "Rev-1")
  .setCharacteristic(Characteristic.SerialNumber, "21T2NASF89EW");

streamSwitch.on('identify', function(paired, callback) {
  SWITCH.identify();
  callback(); // success
});

streamSwitch
  .addService(Service.Switch, "AirPlay Stream Switch")
  .getCharacteristic(Characteristic.On)
  .on('get', function(callback) {
     SWITCH.on,
     callback(null, Boolean(SWITCH.on));
});

streamSwitch.publish({
  port: 51826,
  username: streamSwitch.username,
  pincode: streamSwitch.pincode
});

exports.streamStarted = function(on = true) {
  if (SWITCH.getStatus() !== on) {
    streamSwitch
      .getService(Service.StatefulProgrammableSwitch)
      .updateCharacteristic(Characteristic.ProgrammableSwitchOutputState, on);
  }
}
