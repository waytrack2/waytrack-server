import { BasePosition } from "../basePosition.js";
import { degreesMSToDDegrees } from "../utils/decode/coordinates.js";
import { strSizeSplit } from "../utils/string.js";
import { dateISO8601 } from "../utils/decode/formatDate.js";
import { knotHTokmH } from "../utils/decode/speed.js";

const TYPE = "H02";

/*
const PARAMETERS1 = [
  "id",
  ["message", ["type"]],
  ["device", ["id", "name", "type"]],
  [
    "position",
    [
      "valid",
      "latitude",
      "longitude",
      //decimalDegrees: (lat, lon) => [lat, lon],
      "date",
      //timestamp: (date) => new Date(date),
      "direction",
      "speed",
      // altitude: null,
      // satellites: null,
      // hdop: null,
    ],
  ],
  "alarm",
];
*/

export class Position extends BasePosition {
  parameters = {
    id: null,
    message: {
      type: null,
    },
    // device: {
    //   id: null,
    //   name: null,
    //   type: null,
    // },
    position: {
      valid: null,
      latitude: null,
      longitude: null,
      //decimalDegrees: (lat, lon) => [lat, lon],
      date: null,
      //timestamp: (date) => new Date(date),
      direction: null,
      speed: null,
      // altitude: null,
      // satellites: null,
      // hdop: null,
    },
    alarm: null,
  };

  constructor(device) {
    super(device);
  }

  // encode
  decode(pattern) {
    const assignParameters = (obj, name = "") => {
      // const t = this.parameters;
      Object.entries(obj).forEach(([key, value]) => {
        if (!value) {
          const method = `_${name}${!name ? key : key.toUpperCase()}`;
          if (!name) {
            // this.parameters[key] = method;
            this.parameters[key] = this[method](pattern);
          } else {
            this.parameters[name][key] = this[method](pattern);
          }
        } else {
          assignParameters(value, key);
        }
      });
    };
    // console.log(pattern); // debug
    assignParameters(this.parameters);
  }

  _id({ id }) {
    return id;
  }

  _messageTYPE({ command }) {
    return command;
  }

  _positionVALID({ valid }) {
    const isValid = {
      A: true,
      V: false,
      B: false,
    };
    return isValid[valid];
  }

  _positionLATITUDE({ lat, latSymbol }) {
    return degreesMSToDDegrees(lat, latSymbol);
  }

  _positionLONGITUDE({ lon, lonSymbol }) {
    return degreesMSToDDegrees(lon, lonSymbol);
  }

  _positionSPEED({ speed }) {
    return knotHTokmH(speed);
  }

  _positionDIRECTION({ direction }) {
    return direction;
  }

  _positionDATE({ time, date }) {
    const [hour, minute, second] = strSizeSplit(time, 2);
    const [day, month, year] = strSizeSplit(date, 2);

    return dateISO8601(
      `${day}-${month}-${year} ${hour}:${minute}:${second}`,
      "dd-MM-yy HH:mm:ss",
    ); 
  }

  _alarm({ status }) {
    return status;
  }
}
