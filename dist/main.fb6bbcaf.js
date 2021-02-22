// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@brazilian-utils/brazilian-utils/dist/brazilian-utils.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
exports.formatBoleto = format$2;
exports.formatCEP = format$1;
exports.formatCNPJ = format$5;
exports.formatCPF = format$4;
exports.formatCurrency = format$3;
exports.formatPJ = format;
exports.generateCNPJ = generate$1;
exports.generateCPF = generate;
exports.generateChecksum = generateChecksum;
exports.generateRandomNumber = generateRandomNumber;
exports.getCities = getCities;
exports.getStates = getStates;
exports.isLastChar = isLastChar;
exports.isValidBoleto = isValid$6;
exports.isValidCEP = isValid$5;
exports.isValidCNPJ = isValid$8;
exports.isValidCPF = isValid$7;
exports.isValidEmail = isValid$3;
exports.isValidIE = isValid;
exports.isValidLandlinePhone = isValidLandlinePhone;
exports.isValidLicensePlate = isValid$4;
exports.isValidMobilePhone = isValidMobilePhone;
exports.isValidPIS = isValid$1;
exports.isValidPhone = isValid$2;
exports.onlyNumbers = onlyNumbers;
exports.parseCurrency = parse$1;

function isLastChar(index, input) {
  return index === input.length - 1;
}

function onlyNumbers(input) {
  return String(input).replace(/[^\d]/g, '');
}

function generateChecksum(base, weight) {
  var digits = onlyNumbers(base);
  var weights = typeof weight === 'number' ? Array(digits.length).fill(0).map(function (_, i) {
    return weight - i;
  }) : weight;
  return digits.split('').reduce(function (acc, digit, i) {
    return acc + parseInt(digit, 10) * weights[i];
  }, 0);
}

function generateRandomNumber(length) {
  return Array(length).fill(1).reduce(function (acc, number) {
    return "" + acc + Math.random().toString().substr(2, number);
  }, '');
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var STATES_DATA = {
  AC: {
    code: '2',
    areaCodes: [68],
    ieLength: 13,
    name: 'Acre'
  },
  AL: {
    code: '4',
    areaCodes: [82],
    ieLength: 9,
    name: 'Alagoas'
  },
  AP: {
    code: '2',
    areaCodes: [96],
    ieLength: 9,
    name: 'Amapá'
  },
  AM: {
    code: '2',
    areaCodes: [92, 97],
    ieLength: 9,
    name: 'Amazonas'
  },
  BA: {
    code: '5',
    areaCodes: [71, 73, 74, 75, 77],
    ieLength: [8, 9],
    name: 'Bahia'
  },
  CE: {
    code: '3',
    areaCodes: [85, 88],
    ieLength: 9,
    name: 'Ceará'
  },
  DF: {
    code: '1',
    areaCodes: [61],
    ieLength: 13,
    name: 'Distrito Federal'
  },
  ES: {
    code: '7',
    areaCodes: [27, 28],
    ieLength: 9,
    name: 'Espírito Santo'
  },
  GO: {
    code: '1',
    areaCodes: [62, 64],
    ieLength: 9,
    name: 'Goiás'
  },
  MA: {
    code: '3',
    areaCodes: [98, 99],
    ieLength: 9,
    name: 'Maranhão'
  },
  MG: {
    code: '6',
    areaCodes: [31, 32, 33, 34, 35, 37, 38],
    ieLength: 13,
    name: 'Minas Gerais'
  },
  MT: {
    code: '1',
    areaCodes: [65, 66],
    ieLength: 11,
    name: 'Mato Grosso'
  },
  MS: {
    code: '1',
    areaCodes: [67],
    ieLength: 9,
    name: 'Mato Grosso do Sul'
  },
  PA: {
    code: '2',
    areaCodes: [91, 93, 94],
    ieLength: 9,
    name: 'Pará'
  },
  PB: {
    code: '4',
    areaCodes: [83],
    ieLength: 9,
    name: 'Paraíba'
  },
  PE: {
    code: '4',
    areaCodes: [81, 87],
    ieLength: 9,
    name: 'Pernambuco'
  },
  PI: {
    code: '3',
    areaCodes: [86, 89],
    ieLength: 9,
    name: 'Piauí'
  },
  PR: {
    code: '9',
    areaCodes: [41, 42, 43, 44, 45, 46],
    ieLength: 10,
    name: 'Paraná'
  },
  RJ: {
    code: '7',
    areaCodes: [21, 22, 24],
    ieLength: 8,
    name: 'Rio de Janeiro'
  },
  RN: {
    code: '4',
    areaCodes: [84],
    ieLength: [9, 10],
    name: 'Rio Grande do Norte'
  },
  RO: {
    code: '2',
    areaCodes: [69],
    ieLength: 14,
    name: 'Rondônia'
  },
  RS: {
    code: '0',
    areaCodes: [51, 53, 54, 55],
    ieLength: 10,
    name: 'Rio Grande do Sul'
  },
  RR: {
    code: '2',
    areaCodes: [95],
    ieLength: 9,
    name: 'Roraima'
  },
  SC: {
    code: '9',
    areaCodes: [47, 48, 49],
    ieLength: 9,
    name: 'Santa Catarina'
  },
  SE: {
    code: '5',
    areaCodes: [79],
    ieLength: 9,
    name: 'Sergipe'
  },
  SP: {
    code: '8',
    areaCodes: [11, 12, 13, 14, 15, 16, 17, 18, 19],
    ieLength: 12,
    name: 'São Paulo'
  },
  TO: {
    code: '1',
    areaCodes: [63],
    ieLength: [9, 11],
    name: 'Tocantins'
  }
};
var STATES = /*#__PURE__*/Object.keys(STATES_DATA);

var Validator = /*#__PURE__*/function () {
  function Validator() {}

  var _proto = Validator.prototype;

  _proto.isValid = function isValid(ie) {
    return this.checkLength(ie) && this.itStartsWith(ie) && this.calcIe(ie);
  };

  return Validator;
}();

var AC = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(AC, _Validator);

  function AC() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = AC.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.AC.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return ie.substr(0, 2) === '01';
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigits(ie);
  };

  _proto.calcDigits = function calcDigits(inscricaoEstadual) {
    var length = inscricaoEstadual.length;
    var body = inscricaoEstadual.substr(0, length - 2);
    var fDig = this.calcDigit(body);
    var sDig = this.calcDigit(body + fDig.toString());
    var pos2dig = inscricaoEstadual.length - 1;
    var pos1dig = inscricaoEstadual.length - 2;
    return parseInt(inscricaoEstadual[pos1dig], 10) === fDig && parseInt(inscricaoEstadual[pos2dig], 10) === sDig;
  };

  _proto.calcDigit = function calcDigit(body) {
    var weight = body.length - 7;
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;

      if (weight === 1) {
        weight = 9;
      }
    });
    var mod = 11;
    var rest = sum % mod;
    var dig = mod - rest;

    if (dig >= 10) {
      dig = 0;
    }

    return dig;
  };

  return AC;
}(Validator);

var AL = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(AL, _Validator);

  function AL() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = AL.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.AL.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return ie.substr(0, 2) === '24';
  };

  _proto.calcIe = function calcIe(ie) {
    return this.digitCalc(ie);
  };

  _proto.digitCalc = function digitCalc(ie) {
    var weight = 9;
    var position = 8;
    var sum = 0;

    for (var i = 0; i < position; i++) {
      sum += parseInt(ie.charAt(i), 10) * weight;
      weight--;
    }

    var product = sum * 10;
    var digit = product - Math.floor(product / 11) * 11;

    if (digit >= 10) {
      digit = 0;
    }

    return digit === parseInt(ie.charAt(position), 10);
  };

  return AL;
}(Validator);

var AP = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(AP, _Validator);

  function AP() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = AP.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.AP.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return ie.substr(0, 2) === '03';
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigit(ie);
  };

  _proto.calcDigit = function calcDigit(ie) {
    var length = ie.length;
    var position = length - 1;
    var weight = length;
    var body = ie.substr(0, position);
    var bodyInt = parseInt(body, 10);
    var p = 0;
    var d = 0;

    if (3000001 <= bodyInt && bodyInt <= 3017000) {
      p = 5;
      d = 0;
    } else if (bodyInt >= 3017001 && bodyInt <= 3019022) {
      p = 9;
      d = 1;
    }

    var sum = p;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;
    });
    var dig = 11 - sum % 11;

    if (dig === 10) {
      dig = 0;
    }

    if (dig === 11) {
      dig = d;
    }

    return dig === parseInt(ie.charAt(position), 10);
  };

  return AP;
}(Validator);

var AM = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(AM, _Validator);

  function AM() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = AM.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.AM.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return Boolean(ie);
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigit(ie);
  };

  _proto.calcDigit = function calcDigit(ie) {
    var length = ie.length;
    var position = length - 1;
    var weight = length;
    var body = ie.substr(0, position);
    var sum = 0;
    var dig = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;
    });

    if (sum < 11) {
      dig = 11 - sum;
    } else {
      var rest = sum % 11;
      dig = 11 - rest;

      if (dig >= 10) {
        dig = 0;
      }
    }

    return dig === parseInt(ie.charAt(position), 10);
  };

  return AM;
}(Validator);

var BA = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(BA, _Validator);

  function BA() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = BA.prototype;

  _proto.checkLength = function checkLength(ie) {
    return STATES_DATA.BA.ieLength.includes(ie.length);
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return Boolean(ie);
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigits(ie);
  };

  _proto.calcDigits = function calcDigits(ie) {
    var length = ie.length;
    var body = ie.substr(0, length - 2);
    var mod = this.getModule(ie);
    var secondDig = this.calcDigit(body, mod);
    var firstDig = this.calcDigit(body + secondDig, mod);
    var posSecondDig = length - 1;
    var posFirstDig = length - 2;
    var ieAtFirstPos = parseInt(ie.charAt(posFirstDig), 10);
    var ieAtSecondPos = parseInt(ie.charAt(posSecondDig), 10);
    return ieAtFirstPos === firstDig && ieAtSecondPos === secondDig;
  };

  _proto.getModule = function getModule(ie) {
    var pos = 0;

    if (ie.length === 9) {
      pos = 1;
    }

    var charAt = parseInt(ie.substr(pos, 1), 10);
    var arr = [0, 1, 2, 3, 4, 5, 8];

    if (arr.indexOf(charAt) >= 0) {
      return 10;
    }

    return 11;
  };

  _proto.calcDigit = function calcDigit(body, mod) {
    var weight = body.length + 1;
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;
    });
    var rest = sum % mod;
    var dig = mod - rest;

    if (dig >= 10) {
      dig = 0;
    }

    return dig;
  };

  return BA;
}(Validator);

var CE = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(CE, _Validator);

  function CE() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = CE.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.CE.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return Boolean(ie);
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigit(ie);
  };

  _proto.calcDigit = function calcDigit(ie) {
    var length = ie.length;
    var position = length - 1;
    var weight = length;
    var body = ie.substr(0, position);
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;
    });
    var rest = sum % 11;
    var dig = 11 - rest;

    if (dig >= 10) {
      dig = 0;
    }

    return dig === parseInt(ie.charAt(position), 10);
  };

  return CE;
}(Validator);

var DF = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(DF, _Validator);

  function DF() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = DF.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.DF.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return ie.substr(0, 2) === '07';
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigits(ie);
  };

  _proto.calcDigits = function calcDigits(ie) {
    var length = ie.length;
    var body = ie.substr(0, length - 2);
    var firstDig = this.calcDigit(body);
    var secondDig = this.calcDigit(body + firstDig);
    var posSecondDig = length - 1;
    var posFirstDig = length - 2;
    var ieAtFirstPos = parseInt(ie.charAt(posFirstDig), 10);
    var ieAtSecondPos = parseInt(ie.charAt(posSecondDig), 10);
    return ieAtFirstPos === firstDig && ieAtSecondPos === secondDig;
  };

  _proto.calcDigit = function calcDigit(body) {
    var weight = body.length - 7;
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;

      if (weight === 1) {
        weight = 9;
      }
    });
    var mod = 11;
    var rest = sum % mod;
    var dig = mod - rest;

    if (dig >= 10) {
      dig = 0;
    }

    return dig;
  };

  return DF;
}(Validator);

var ES = /*#__PURE__*/function (_CE) {
  _inheritsLoose(ES, _CE);

  function ES() {
    return _CE.apply(this, arguments) || this;
  }

  return ES;
}(CE);

var GO = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(GO, _Validator);

  function GO() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = GO.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.GO.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    var beginWith = ['10', '11', '12'];
    var begin = ie.substr(0, 2);
    return beginWith.indexOf(begin) >= 0;
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigit(ie);
  };

  _proto.calcDigit = function calcDigit(ie) {
    var length = ie.length;
    var position = length - 1;
    var weight = length;
    var body = ie.substr(0, position);
    var bodyInt = parseInt(body, 10);
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;
    });
    var rest = sum % 11;
    var dig = 11 - rest;

    if (dig >= 10) {
      if (dig === 11 && 10103105 <= bodyInt && bodyInt <= 10119997) {
        dig = 1;
      } else {
        dig = 0;
      }
    }

    return dig === parseInt(ie.charAt(position), 10);
  };

  return GO;
}(Validator);

var MA = /*#__PURE__*/function (_CE) {
  _inheritsLoose(MA, _CE);

  function MA() {
    return _CE.apply(this, arguments) || this;
  }

  var _proto = MA.prototype;

  _proto.itStartsWith = function itStartsWith(ie) {
    return ie.substr(0, 2) === '12';
  };

  return MA;
}(CE);

var MT = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(MT, _Validator);

  function MT() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = MT.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.MT.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return Boolean(ie);
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigit(ie);
  };

  _proto.calcDigit = function calcDigit(ie) {
    var length = ie.length;
    var position = length - 1;
    var weight = 3;
    var body = ie.substr(0, position);
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;

      if (weight === 1) {
        weight = 9;
      }
    });
    var rest = sum % 11;
    var dig = 11 - rest;

    if (dig >= 10) {
      dig = 0;
    }

    return dig === parseInt(ie.charAt(position), 10);
  };

  return MT;
}(Validator);

var MS = /*#__PURE__*/function (_CE) {
  _inheritsLoose(MS, _CE);

  function MS() {
    return _CE.apply(this, arguments) || this;
  }

  var _proto = MS.prototype;

  _proto.itStartsWith = function itStartsWith(ie) {
    return ie.substr(0, 2) === '28';
  };

  return MS;
}(CE);

var MG = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(MG, _Validator);

  function MG() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = MG.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.MG.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return Boolean(ie);
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigit(ie);
  };

  _proto.calcDigit = function calcDigit(ie) {
    var length = ie.length;
    var posFirstDigit = length - 2;
    var posSecondDigit = length - 1;
    var body = ie.substring(0, 11);
    var firstDigit = this.calcFirstDigit(body);
    var secondDigit = this.calcSecondDigit(body + firstDigit);
    var digitAtFirstDigit = parseInt(ie.charAt(posFirstDigit), 10);
    var digitAtSecondDigit = parseInt(ie.charAt(posSecondDigit), 10);
    return firstDigit === digitAtFirstDigit && secondDigit === digitAtSecondDigit;
  };

  _proto.calcFirstDigit = function calcFirstDigit(ie) {
    var body = ie.slice(0, 3) + 0 + ie.slice(3);
    var concat = '';
    body.split('').forEach(function (item, index) {
      var weight = (index + 3) % 2 === 0 ? 2 : 1;
      concat += parseInt(item, 10) * weight;
    });
    var sum = 0;
    concat.split('').forEach(function (item) {
      sum += parseInt(item, 10);
    });
    var sumString = sum.toString();
    var length = sumString.length;
    var lastChar = sumString.substr(length - 1, 1);
    var lastCharInt = parseInt(lastChar, 10);
    return lastCharInt === 0 ? 0 : 10 - lastCharInt;
  };

  _proto.calcSecondDigit = function calcSecondDigit(body) {
    var weight = 3;
    var sum = 0;
    body.split('').forEach(function (item) {
      sum += parseInt(item, 10) * weight;
      weight--;

      if (weight === 1) {
        weight = 11;
      }
    });
    var rest = sum % 11;
    var digit = 11 - rest;

    if (digit >= 10) {
      digit = 0;
    }

    return digit;
  };

  return MG;
}(Validator);

var PA = /*#__PURE__*/function (_CE) {
  _inheritsLoose(PA, _CE);

  function PA() {
    return _CE.apply(this, arguments) || this;
  }

  var _proto = PA.prototype;

  _proto.itStartsWith = function itStartsWith(ie) {
    return ie.substr(0, 2) === '15';
  };

  return PA;
}(CE);

var PB = /*#__PURE__*/function (_CE) {
  _inheritsLoose(PB, _CE);

  function PB() {
    return _CE.apply(this, arguments) || this;
  }

  return PB;
}(CE);

var PR = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(PR, _Validator);

  function PR() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = PR.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.PR.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return Boolean(ie);
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigits(ie);
  };

  _proto.calcDigits = function calcDigits(ie) {
    var length = ie.length;
    var body = ie.substr(0, length - 2);
    var firstDig = this.calcDigit(body);
    var secondDig = this.calcDigit(body + firstDig);
    var posSecondDig = length - 1;
    var posFirstDig = length - 2;
    var ieAtFirstPos = parseInt(ie.charAt(posFirstDig), 10);
    var ieAtSecondPos = parseInt(ie.charAt(posSecondDig), 10);
    return ieAtFirstPos === firstDig && ieAtSecondPos === secondDig;
  };

  _proto.calcDigit = function calcDigit(body) {
    var weight = body.length - 5;
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;

      if (weight === 1) {
        weight = 7;
      }
    });
    var mod = 11;
    var rest = sum % mod;
    var dig = mod - rest;

    if (dig >= 10) {
      dig = 0;
    }

    return dig;
  };

  return PR;
}(Validator);

var PE = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(PE, _Validator);

  function PE() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = PE.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.PE.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return Boolean(ie);
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigits(ie);
  };

  _proto.calcDigits = function calcDigits(ie) {
    var length = ie.length;
    var body = ie.substr(0, length - 2);
    var firstDig = this.calcDigit(body);
    var secondDig = this.calcDigit(body + firstDig);
    var posSecondDig = length - 1;
    var posFirstDig = length - 2;
    var ieAtFirstPos = parseInt(ie.charAt(posFirstDig), 10);
    var ieAtSecondPos = parseInt(ie.charAt(posSecondDig), 10);
    return ieAtFirstPos === firstDig && ieAtSecondPos === secondDig;
  };

  _proto.calcDigit = function calcDigit(body) {
    var weight = body.length + 1;
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;
    });
    var mod = 11;
    var rest = sum % mod;
    var dig = mod - rest;

    if (dig >= 10) {
      dig = 0;
    }

    return dig;
  };

  return PE;
}(Validator);

var PI = /*#__PURE__*/function (_CE) {
  _inheritsLoose(PI, _CE);

  function PI() {
    return _CE.apply(this, arguments) || this;
  }

  return PI;
}(CE);

var RJ = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(RJ, _Validator);

  function RJ() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = RJ.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.RJ.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return Boolean(ie);
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigit(ie);
  };

  _proto.calcDigit = function calcDigit(ie) {
    var length = ie.length;
    var position = length - 1;
    var weight = 2;
    var body = ie.substr(0, position);
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;

      if (weight === 1) {
        weight = 7;
      }
    });
    var rest = sum % 11;
    var dig = 11 - rest;

    if (dig >= 10) {
      dig = 0;
    }

    return dig === parseInt(ie.charAt(position), 10);
  };

  return RJ;
}(Validator);

var RN = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(RN, _Validator);

  function RN() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = RN.prototype;

  _proto.checkLength = function checkLength(ie) {
    return STATES_DATA.RN.ieLength.includes(ie.length);
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return ie.substr(0, 2) === '20';
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigit(ie);
  };

  _proto.calcDigit = function calcDigit(ie) {
    var length = ie.length;
    var position = length - 1;
    var weight = length;
    var body = ie.substr(0, position);
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;
    });
    var rest = sum % 11;
    var dig = 11 - rest;

    if (dig >= 10) {
      dig = 0;
    }

    return dig === parseInt(ie.charAt(position), 10);
  };

  return RN;
}(Validator);

var RS = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(RS, _Validator);

  function RS() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = RS.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.RS.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return Boolean(ie);
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigit(ie);
  };

  _proto.calcDigit = function calcDigit(ie) {
    var length = ie.length;
    var position = length - 1;
    var weight = 2;
    var body = ie.substr(0, position);
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;

      if (weight === 1) {
        weight = 9;
      }
    });
    var rest = sum % 11;
    var dig = 11 - rest;

    if (dig >= 10) {
      dig = 0;
    }

    return dig === parseInt(ie.charAt(position), 10);
  };

  return RS;
}(Validator);

var RO = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(RO, _Validator);

  function RO() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = RO.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.RO.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return Boolean(ie);
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigit(ie);
  };

  _proto.calcDigit = function calcDigit(ie) {
    var length = ie.length;
    var position = length - 1;
    var weight = 6;
    var body = ie.substr(0, position);
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;

      if (weight === 1) {
        weight = 9;
      }
    });
    var rest = sum % 11;
    var dig = 11 - rest;

    if (dig >= 10) {
      dig -= 10;
    }

    return dig === parseInt(ie.charAt(position), 10);
  };

  return RO;
}(Validator);

var RR = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(RR, _Validator);

  function RR() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = RR.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.RR.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return ie.substr(0, 2) === '24';
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigit(ie);
  };

  _proto.calcDigit = function calcDigit(ie) {
    var length = ie.length;
    var position = length - 1;
    var weight = 1;
    var body = ie.substr(0, position);
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight++;
    });
    var dig = sum % 9;
    return dig === parseInt(ie.charAt(position), 10);
  };

  return RR;
}(Validator);

var SC = /*#__PURE__*/function (_CE) {
  _inheritsLoose(SC, _CE);

  function SC() {
    return _CE.apply(this, arguments) || this;
  }

  return SC;
}(CE);

var SP = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(SP, _Validator);

  function SP() {
    return _Validator.apply(this, arguments) || this;
  }

  var _proto = SP.prototype;

  _proto.checkLength = function checkLength(ie) {
    return ie.length === STATES_DATA.SP.ieLength;
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return Boolean(ie);
  };

  _proto.calcIe = function calcIe(ie) {
    return this.calcDigit(ie);
  };

  _proto.calcDigit = function calcDigit(ie) {
    var length = ie.length;
    var positionFirstDigit = length - 4;
    var positionSecondDigit = length - 1;
    var firstDigit = this.calcFirstDigit(ie);
    var secondDigit = this.calcSecondDigit(ie);
    var ieAtFirstPos = parseInt(ie.charAt(positionFirstDigit), 10);
    var ieAtSecondPos = parseInt(ie.charAt(positionSecondDigit), 10);
    return firstDigit === ieAtFirstPos && secondDigit === ieAtSecondPos;
  };

  _proto.calcFirstDigit = function calcFirstDigit(ie) {
    var body = ie.substr(0, 8);
    var weight = [1, 3, 4, 5, 6, 7, 8, 10];
    var sum = 0;
    body.split('').forEach(function (digit, index) {
      sum += parseInt(digit, 10) * weight[index];
    });
    var dig = sum % 11;
    var digit = dig.toString();
    return parseInt(digit.substr(digit.length - 1, 1), 10);
  };

  _proto.calcSecondDigit = function calcSecondDigit(ie) {
    var body = ie.substr(0, 11);
    var weight = 3;
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;

      if (weight === 1) {
        weight = 10;
      }
    });
    var dig = sum % 11;
    var digit = dig.toString();
    return parseInt(digit.substr(digit.length - 1, 1), 10);
  };

  return SP;
}(Validator);

var SE = /*#__PURE__*/function (_CE) {
  _inheritsLoose(SE, _CE);

  function SE() {
    return _CE.apply(this, arguments) || this;
  }

  return SE;
}(CE);

var TO = /*#__PURE__*/function (_CE) {
  _inheritsLoose(TO, _CE);

  function TO() {
    return _CE.apply(this, arguments) || this;
  }

  var _proto = TO.prototype;

  _proto.checkLength = function checkLength(ie) {
    return STATES_DATA.TO.ieLength.includes(ie.length);
  };

  _proto.itStartsWith = function itStartsWith(ie) {
    return Boolean(ie);
  };

  _proto.calcIe = function calcIe(ie) {
    return this.checkOld(ie) || this.checkNew(ie);
  };

  _proto.checkOld = function checkOld(ie) {
    var body = ie.slice(0, 2) + ie.slice(4);
    return this.oldStartsWith(ie) && this.calcOld(body);
  };

  _proto.oldStartsWith = function oldStartsWith(ie) {
    var beginWith = ['01', '02', '03', '99'];
    var begin = ie.substr(2, 2);
    return beginWith.indexOf(begin) >= 0;
  };

  _proto.calcOld = function calcOld(ie) {
    return this.calcDigit(ie);
  };

  _proto.checkNew = function checkNew(ie) {
    return this.calcNew(ie);
  };

  _proto.calcNew = function calcNew(ie) {
    var length = ie.length;
    var position = length - 1;
    var weight = 9;
    var body = ie.substr(0, position);
    var sum = 0;
    body.split('').forEach(function (digit) {
      sum += parseInt(digit, 10) * weight;
      weight--;
    });
    var rest = sum % 11;
    var dig = 11 - rest;

    if (rest < 2) {
      dig = 0;
    }

    return dig === parseInt(ie.charAt(position), 10);
  };

  return TO;
}(CE);

var STATE = {
  AC: AC,
  AL: AL,
  AP: AP,
  AM: AM,
  BA: BA,
  CE: CE,
  DF: DF,
  ES: ES,
  GO: GO,
  MA: MA,
  MT: MT,
  MS: MS,
  MG: MG,
  PA: PA,
  PB: PB,
  PR: PR,
  PE: PE,
  PI: PI,
  RJ: RJ,
  RN: RN,
  RS: RS,
  RO: RO,
  RR: RR,
  SC: SC,
  SP: SP,
  SE: SE,
  TO: TO
};

function isValid(uf, inscricaoEstadual) {
  var digits = onlyNumbers(inscricaoEstadual);
  var state = new STATE[uf]();
  return state.isValid(digits);
}

var LENGTH = 11;
var WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
var RESERVED_NUMBERS = ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'];

function isValidLength(pis) {
  return pis.length === LENGTH;
}

function isReservedNumber(pis) {
  return RESERVED_NUMBERS.indexOf(pis) >= 0;
}

function hasOnlyNumbers(pis) {
  return !!pis.match(/^[0-9]+$/);
}

function removeSeparators(pis) {
  return pis.replace(/[ ().,*-]/g, '');
}

function isValid$1(pis) {
  if (!pis || typeof pis !== 'string') return false;
  var numeric = removeSeparators(pis);
  if (!isValidLength(numeric) || isReservedNumber(numeric) || !hasOnlyNumbers(numeric)) return false;
  var weightedChecksum = generateChecksum(numeric.substr(0, numeric.length - 1), WEIGHTS);
  var verifyingDigit = +numeric.charAt(numeric.length - 1);
  var calculatedDigit = 11 - weightedChecksum % 11;
  return calculatedDigit === verifyingDigit || calculatedDigit === 10 && verifyingDigit === 0 || calculatedDigit === 11 && verifyingDigit === 0;
}

var VALID_AREA_CODES = /*#__PURE__*/Object.keys(STATES_DATA).reduce(function (acc, state) {
  return acc.concat(STATES_DATA[state].areaCodes);
}, []);
var PHONE_MIN_LENGTH = 10;
var PHONE_MAX_LENGTH = 11;
var MOBILE_VALID_FIRST_NUMBERS = [6, 7, 8, 9];
var LANDLINE_VALID_FIRST_NUMBERS = [2, 3, 4, 5];

function isValidDDD(phone) {
  return VALID_AREA_CODES.includes(Number(phone.substr(0, 2)));
}

function isValidMobilePhoneLength(phone) {
  return phone.length === PHONE_MAX_LENGTH;
}

function isValidLandlinePhoneLength(phone) {
  return phone.length >= PHONE_MIN_LENGTH && phone.length < PHONE_MAX_LENGTH;
}

function isValidLength$1(phone) {
  return isValidLandlinePhoneLength(phone) || isValidMobilePhoneLength(phone);
}

function isValidMobilePhoneFirstNumber(phone) {
  return MOBILE_VALID_FIRST_NUMBERS.includes(Number(phone.charAt(2)));
}

function isValidLandlinePhoneFirstNumber(phone) {
  return LANDLINE_VALID_FIRST_NUMBERS.includes(Number(phone.charAt(2)));
}

function isValidFirstNumber(phone) {
  return phone.length === PHONE_MIN_LENGTH ? isValidLandlinePhoneFirstNumber(phone) : isValidMobilePhoneFirstNumber(phone);
}

function parsePhoneDigits(phone) {
  return {
    isValidDigits: !!phone && typeof phone === 'string',
    digits: onlyNumbers(phone)
  };
}

function isValidMobilePhone(phone) {
  var _parsePhoneDigits = parsePhoneDigits(phone),
      isValidDigits = _parsePhoneDigits.isValidDigits,
      digits = _parsePhoneDigits.digits;

  if (!isValidDigits) return false;
  return isValidMobilePhoneLength(digits) && isValidMobilePhoneFirstNumber(digits) && isValidDDD(digits);
}

function isValidLandlinePhone(phone) {
  var _parsePhoneDigits2 = parsePhoneDigits(phone),
      isValidDigits = _parsePhoneDigits2.isValidDigits,
      digits = _parsePhoneDigits2.digits;

  if (!isValidDigits) return false;
  return isValidLandlinePhoneLength(digits) && isValidLandlinePhoneFirstNumber(digits) && isValidDDD(digits);
}

function isValid$2(phone) {
  var _parsePhoneDigits3 = parsePhoneDigits(phone),
      isValidDigits = _parsePhoneDigits3.isValidDigits,
      digits = _parsePhoneDigits3.digits;

  if (!isValidDigits) return false;
  return isValidLength$1(digits) && isValidFirstNumber(digits) && isValidDDD(digits);
}

var MAX_RECIPIENT_LENGTH = 64;
var MAX_DOMAIN_LENGTH = 253;
var MAX_EMAIL_LENGTH = MAX_RECIPIENT_LENGTH + 1 + MAX_DOMAIN_LENGTH;
var validEmailRegex = /^([!#$%&'*+\-/=?^_`{|}~]{0,1}([a-zA-Z0-9][!#$%&'*+\-/=?^_`{|}~.]{0,1})+)@(([a-zA-Z0-9][-.]{0,1})+)([.]{1}[a-zA-Z0-9]+)$/;

var stringIsBiggerThan = function stringIsBiggerThan(len) {
  for (var _len = arguments.length, strs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    strs[_key - 1] = arguments[_key];
  }

  return strs.reduce(function (length, s) {
    return length + s.length;
  }, 0) > len;
};

function isValid$3(email) {
  if (!email || typeof email !== 'string') return false;
  if (stringIsBiggerThan(MAX_EMAIL_LENGTH, email)) return false;
  var matchedEmail = validEmailRegex.exec(email);
  if (!matchedEmail) return false;
  var recipient = matchedEmail[1],
      domain = matchedEmail[3],
      topLevelDomain = matchedEmail[5];
  if (stringIsBiggerThan(MAX_RECIPIENT_LENGTH, recipient)) return false;
  if (stringIsBiggerThan(MAX_DOMAIN_LENGTH, domain, topLevelDomain)) return false;
  return true;
}

var validMercosulLicensePlateRegex = /^[a-z]{3}[0-9]{1}[a-z]{1}[0-9]{2}$/i;
var validBrazilianLicensePlateRegex = /^[a-z]{3}-?[0-9]{4}$/i;

function isValid$4(licensePlate) {
  if (!licensePlate || typeof licensePlate !== 'string') return false;
  return validMercosulLicensePlateRegex.test(licensePlate) || validBrazilianLicensePlateRegex.test(licensePlate);
}

var LENGTH$1 = 20;
var DOT_INDEXES = [8, 12, 15];
var HYPHEN_INDEXES = [6];

function format(processoJuridico) {
  var digits = onlyNumbers(processoJuridico);
  return digits.slice(0, LENGTH$1).split('').reduce(function (acc, digit, index) {
    var result = "" + acc + digit;

    if (!isLastChar(index, processoJuridico)) {
      if (DOT_INDEXES.includes(index)) return result + ".";
      if (HYPHEN_INDEXES.includes(index)) return result + "-";
    }

    return result;
  }, '');
}

var LENGTH$2 = 8;
var HYPHEN_INDEXES$1 = [4];

function isValidLength$2(cep) {
  return cep.length === LENGTH$2;
}

function format$1(cep) {
  var digits = onlyNumbers(cep);
  return digits.slice(0, LENGTH$2).split('').reduce(function (acc, digit, i) {
    var result = "" + acc + digit;

    if (!isLastChar(i, digits)) {
      if (HYPHEN_INDEXES$1.indexOf(i) >= 0) return result + "-";
    }

    return result;
  }, '');
}

function isValid$5(cep) {
  if (!cep || typeof cep !== 'string') return false;
  var digits = onlyNumbers(cep);
  return isValidLength$2(digits);
}

var PARTIALS = [{
  end: 9,
  start: 0,
  index: 9
}, {
  end: 20,
  start: 10,
  index: 20
}, {
  end: 31,
  start: 21,
  index: 31
}];
var DOT_INDEXES$1 = [4, 14, 25];
var SPACE_INDEXES = [9, 20, 31, 32];
var LENGTH$3 = 47;
var CHECK_DIGIT_POSITION = 4;
var MOD_11_WEIGHTS = {
  end: 9,
  initial: 2
};
var MOD_10_WEIGHTS = [2, 1];
var DIGITABLE_LINE_TO_BOLETO_CONVERT_POSITIONS = [{
  end: 4,
  start: 0
}, {
  end: 47,
  start: 32
}, {
  end: 9,
  start: 4
}, {
  end: 20,
  start: 10
}, {
  end: 31,
  start: 21
}];

function isValidLength$3(digitableLine) {
  return digitableLine.length === LENGTH$3;
}

function mod10(partial) {
  var sum = partial.split('').reverse().reduce(function (acc, digit, index) {
    var result = parseInt(digit, 10) * MOD_10_WEIGHTS[index % 2];
    return acc + (result > 9 ? 1 + result % 10 : result);
  }, 0);
  var mod = sum % 10;
  return mod > 0 ? 10 - mod : 0;
}

function mod11(value) {
  var initial = MOD_11_WEIGHTS.initial,
      end = MOD_11_WEIGHTS.end;
  var weight = initial;
  var sum = value.split('').reverse().reduce(function (acc, digit) {
    var result = parseInt(digit, 10) * weight;
    weight = weight < end ? weight + 1 : initial;
    return acc + result;
  }, 0);
  var mod = sum % 11;
  return mod === 0 || mod === 1 ? 1 : 11 - mod;
}

function isValidPartials(digitableLine) {
  return PARTIALS.every(function (_ref) {
    var start = _ref.start,
        end = _ref.end,
        index = _ref.index;
    var mod = mod10(digitableLine.substring(start, end));
    return +digitableLine[index] === mod;
  });
}

function parse(digitableLine) {
  return DIGITABLE_LINE_TO_BOLETO_CONVERT_POSITIONS.reduce(function (acc, pos) {
    return acc + digitableLine.substring(pos.start, pos.end);
  }, '');
}

function isValidCheckDigit(parsedDigitableLine) {
  var mod = mod11(parsedDigitableLine.slice(0, CHECK_DIGIT_POSITION) + parsedDigitableLine.slice(CHECK_DIGIT_POSITION + 1));
  return +parsedDigitableLine[CHECK_DIGIT_POSITION] === mod;
}

function isValid$6(digitableLine) {
  if (!digitableLine || typeof digitableLine !== 'string') return false;
  var digits = onlyNumbers(digitableLine);
  if (!isValidLength$3(digits)) return false;
  if (!isValidPartials(digits)) return false;
  var parsedDigits = parse(digits);
  return isValidCheckDigit(parsedDigits);
}

function format$2(boleto) {
  var digits = onlyNumbers(boleto);
  return digits.slice(0, LENGTH$3).split('').reduce(function (acc, digit, index) {
    var result = "" + acc + digit;

    if (!isLastChar(index, digits)) {
      if (DOT_INDEXES$1.indexOf(index) >= 0) return result + ".";
      if (SPACE_INDEXES.indexOf(index) >= 0) return result + " ";
    }

    return result;
  }, '');
}

function format$3(value, options) {
  if (options === void 0) {
    options = {
      precision: 2
    };
  }

  return value.toFixed(options.precision).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function parse$1(value) {
  return parseInt(value.replace(/\D/g, '') || '0', 10) / 100;
}

var LENGTH$4 = 11;
var DOT_INDEXES$2 = [2, 5];
var HYPHEN_INDEXES$2 = [8];
var RESERVED_NUMBERS$1 = ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'];
var CHECK_DIGITS_INDEXES = [9, 10];

function format$4(cpf, options) {
  if (options === void 0) {
    options = {};
  }

  var digits = onlyNumbers(cpf);

  if (options.pad) {
    digits = digits.padStart(LENGTH$4, '0');
  }

  return digits.slice(0, LENGTH$4).split('').reduce(function (acc, digit, i) {
    var result = "" + acc + digit;

    if (!isLastChar(i, digits)) {
      if (DOT_INDEXES$2.indexOf(i) >= 0) return result + ".";
      if (HYPHEN_INDEXES$2.indexOf(i) >= 0) return result + "-";
    }

    return result;
  }, '');
}

function generate(state) {
  var stateCode = state && STATES.includes(state) ? STATES_DATA[state].code : generateRandomNumber(1);
  var baseCPF = generateRandomNumber(LENGTH$4 - 3) + stateCode;
  var firstCheckDigitMod = generateChecksum(baseCPF, 10) % 11;
  var firstCheckDigit = (firstCheckDigitMod < 2 ? 0 : 11 - firstCheckDigitMod).toString();
  var secondCheckDigitMod = generateChecksum(baseCPF + firstCheckDigit, 11) % 11;
  var secondCheckDigit = (secondCheckDigitMod < 2 ? 0 : 11 - secondCheckDigitMod).toString();
  return "" + baseCPF + firstCheckDigit.toString() + secondCheckDigit.toString();
}

function isValidFormat(cpf) {
  return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf);
}

function isReservedNumber$1(cpf) {
  return RESERVED_NUMBERS$1.indexOf(cpf) >= 0;
} // TODO: move to checksum helper


function isValidChecksum(cpf) {
  return CHECK_DIGITS_INDEXES.every(function (i) {
    var mod = generateChecksum(cpf.slice(0, i).split('').reduce(function (acc, digit) {
      return acc + digit;
    }, ''), i + 1) % 11;
    return cpf[i] === String(mod < 2 ? 0 : 11 - mod);
  });
}

function isValid$7(cpf) {
  if (!cpf || typeof cpf !== 'string') return false;
  var digits = onlyNumbers(cpf);
  return isValidFormat(cpf) && !isReservedNumber$1(digits) && isValidChecksum(digits);
}

var LENGTH$5 = 14;
var DOT_INDEXES$3 = [1, 4];
var SLASH_INDEXES = [7];
var HYPHEN_INDEXES$3 = [11];
var RESERVED_NUMBERS$2 = ['00000000000000', '11111111111111', '22222222222222', '33333333333333', '44444444444444', '55555555555555', '66666666666666', '77777777777777', '88888888888888', '99999999999999'];
var CHECK_DIGITS_INDEXES$1 = [12, 13];
var FIRST_CHECK_DIGIT_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
var SECOND_CHECK_DIGIT_WEIGHTS = /*#__PURE__*/[6].concat(FIRST_CHECK_DIGIT_WEIGHTS);

function format$5(cnpj, options) {
  if (options === void 0) {
    options = {};
  }

  var digits = onlyNumbers(cnpj);

  if (options.pad) {
    digits = digits.padStart(LENGTH$5, '0');
  }

  return digits.slice(0, LENGTH$5).split('').reduce(function (acc, digit, index) {
    var result = "" + acc + digit;

    if (!isLastChar(index, digits)) {
      if (DOT_INDEXES$3.includes(index)) return result + ".";
      if (SLASH_INDEXES.includes(index)) return result + "/";
      if (HYPHEN_INDEXES$3.includes(index)) return result + "-";
    }

    return result;
  }, '');
}

function generate$1() {
  var baseCNPJ = generateRandomNumber(LENGTH$5 - 2);
  var firstCheckDigitMod = generateChecksum(baseCNPJ, FIRST_CHECK_DIGIT_WEIGHTS) % 11;
  var firstCheckDigit = (firstCheckDigitMod < 2 ? 0 : 11 - firstCheckDigitMod).toString();
  var secondCheckDigitMod = generateChecksum(baseCNPJ + firstCheckDigit, SECOND_CHECK_DIGIT_WEIGHTS) % 11;
  var secondCheckDigit = (secondCheckDigitMod < 2 ? 0 : 11 - secondCheckDigitMod).toString();
  return "" + baseCNPJ + firstCheckDigit + secondCheckDigit;
}

function isValidFormat$1(cnpj) {
  return /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/.test(cnpj);
}

function isReservedNumber$2(cpf) {
  return RESERVED_NUMBERS$2.indexOf(cpf) >= 0;
} // TODO: move to checksum helper


function isValidChecksum$1(cnpj) {
  var weights = [].concat(FIRST_CHECK_DIGIT_WEIGHTS);
  return CHECK_DIGITS_INDEXES$1.every(function (i) {
    if (i === CHECK_DIGITS_INDEXES$1[CHECK_DIGITS_INDEXES$1.length - 1]) {
      weights.unshift(6);
    }

    var mod = generateChecksum(cnpj.slice(0, i).split('').reduce(function (acc, digit) {
      return acc + digit;
    }, ''), weights) % 11;
    return cnpj[i] === String(mod < 2 ? 0 : 11 - mod);
  });
}

function isValid$8(cnpj) {
  if (!cnpj || typeof cnpj !== 'string') return false;
  var numbers = onlyNumbers(cnpj);
  return isValidFormat$1(cnpj) && !isReservedNumber$2(numbers) && isValidChecksum$1(numbers);
}

var ACRONYMS = ['cia', 'cnpj', 'cpf', 'ltda', 'me', 'rg'];
var PREPOSITIONS = ['a', 'com', 'da', 'das', 'de', 'do', 'dos', 'e', 'em', 'na', 'nas', 'no', 'nos', 'o', 'por', 'sem'];

function capitalize(value, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$lowerCaseWords = _ref.lowerCaseWords,
      lowerCaseWords = _ref$lowerCaseWords === void 0 ? PREPOSITIONS : _ref$lowerCaseWords,
      _ref$upperCaseWords = _ref.upperCaseWords,
      upperCaseWords = _ref$upperCaseWords === void 0 ? ACRONYMS : _ref$upperCaseWords;

  return value.split(' ').filter(function (word) {
    return !!word;
  }).map(function (word, index) {
    var lowerCaseWord = word.toLocaleLowerCase();
    if (index > 0 && lowerCaseWords.indexOf(lowerCaseWord) !== -1) return lowerCaseWord;
    var upperCaseWord = word.toLocaleUpperCase();
    if (upperCaseWords.indexOf(upperCaseWord) !== -1) return upperCaseWord;
    return upperCaseWord.charAt(0) + lowerCaseWord.substr(1);
  }).join(' ');
}

var stateNameComparer = function stateNameComparer(_ref, _ref2) {
  var nameA = _ref.name;
  var nameB = _ref2.name;
  return nameA.localeCompare(nameB);
};

var sortByStateName = function sortByStateName(states) {
  return states.sort(stateNameComparer);
};

function getStates() {
  var states = STATES.map(function (code) {
    return {
      code: code,
      name: STATES_DATA[code].name
    };
  });
  return sortByStateName(states);
}

var CITIES_DATA = {
  GO: ['Abadia de Goiás', 'Abadiânia', 'Acreúna', 'Adelândia', 'Alexânia', 'Aloândia', 'Alto Horizonte', 'Alto Paraíso de Goiás', 'Alvorada do Norte', 'Amaralina', 'Americano do Brasil', 'Amorinópolis', 'Anhanguera', 'Anicuns', 'Anápolis', 'Aparecida de Goiânia', 'Aparecida do Rio Doce', 'Aporé', 'Aragarças', 'Aragoiânia', 'Araguapaz', 'Araçu', 'Arenópolis', 'Aruanã', 'Aurilândia', 'Avelinópolis', 'Baliza', 'Barro Alto', 'Bela Vista de Goiás', 'Bom Jardim de Goiás', 'Bom Jesus de Goiás', 'Bonfinópolis', 'Bonópolis', 'Brazabrantes', 'Britânia', 'Buriti Alegre', 'Buriti de Goiás', 'Buritinópolis', 'Cabeceiras', 'Cachoeira Alta', 'Cachoeira Dourada', 'Cachoeira de Goiás', 'Caiapônia', 'Caldas Novas', 'Caldazinha', 'Campestre de Goiás', 'Campinaçu', 'Campinorte', 'Campo Alegre de Goiás', 'Campo Limpo de Goiás', 'Campos Belos', 'Campos Verdes', 'Carmo do Rio Verde', 'Castelândia', 'Catalão', 'Caturaí', 'Cavalcante', 'Caçu', 'Ceres', 'Cezarina', 'Chapadão do Céu', 'Cidade Ocidental', 'Cocalzinho de Goiás', 'Colinas do Sul', 'Corumbaíba', 'Corumbá de Goiás', 'Cristalina', 'Cristianópolis', 'Crixás', 'Cromínia', 'Cumari', 'Córrego do Ouro', 'Damianópolis', 'Damolândia', 'Davinópolis', 'Diorama', 'Divinópolis de Goiás', 'Doverlândia', 'Edealina', 'Edéia', 'Estrela do Norte', 'Faina', 'Fazenda Nova', 'Firminópolis', 'Flores de Goiás', 'Formosa', 'Formoso', 'Gameleira de Goiás', 'Goiandira', 'Goianira', 'Goianápolis', 'Goianésia', 'Goiatuba', 'Goiás', 'Goiânia', 'Gouvelândia', 'Guapó', 'Guarani de Goiás', 'Guaraíta', 'Guarinos', 'Heitoraí', 'Hidrolina', 'Hidrolândia', 'Iaciara', 'Inaciolândia', 'Indiara', 'Inhumas', 'Ipameri', 'Ipiranga de Goiás', 'Iporá', 'Israelândia', 'Itaberaí', 'Itaguari', 'Itaguaru', 'Itajá', 'Itapaci', 'Itapirapuã', 'Itapuranga', 'Itarumã', 'Itauçu', 'Itumbiara', 'Ivolândia', 'Jandaia', 'Jaraguá', 'Jataí', 'Jaupaci', 'Jesúpolis', 'Joviânia', 'Jussara', 'Lagoa Santa', 'Leopoldo de Bulhões', 'Luziânia', 'Mairipotaba', 'Mambaí', 'Mara Rosa', 'Marzagão', 'Matrinchã', 'Maurilândia', 'Mimoso de Goiás', 'Minaçu', 'Mineiros', 'Moiporá', 'Monte Alegre de Goiás', 'Montes Claros de Goiás', 'Montividiu', 'Montividiu do Norte', 'Morrinhos', 'Morro Agudo de Goiás', 'Mossâmedes', 'Mozarlândia', 'Mundo Novo', 'Mutunópolis', 'Nazário', 'Nerópolis', 'Niquelândia', 'Nova América', 'Nova Aurora', 'Nova Crixás', 'Nova Glória', 'Nova Iguaçu de Goiás', 'Nova Roma', 'Nova Veneza', 'Novo Brasil', 'Novo Gama', 'Novo Planalto', 'Orizona', 'Ouro Verde de Goiás', 'Ouvidor', 'Padre Bernardo', 'Palestina de Goiás', 'Palmeiras de Goiás', 'Palmelo', 'Palminópolis', 'Panamá', 'Paranaiguara', 'Paraúna', 'Perolândia', 'Petrolina de Goiás', 'Pilar de Goiás', 'Piracanjuba', 'Piranhas', 'Pirenópolis', 'Pires do Rio', 'Planaltina', 'Pontalina', 'Porangatu', 'Porteirão', 'Portelândia', 'Posse', 'Professor Jamil', 'Quirinópolis', 'Rialma', 'Rianápolis', 'Rio Quente', 'Rio Verde', 'Rubiataba', 'Sanclerlândia', 'Santa Bárbara de Goiás', 'Santa Cruz de Goiás', 'Santa Fé de Goiás', 'Santa Helena de Goiás', 'Santa Isabel', 'Santa Rita do Araguaia', 'Santa Rita do Novo Destino', 'Santa Rosa de Goiás', 'Santa Tereza de Goiás', 'Santa Terezinha de Goiás', 'Santo Antônio da Barra', 'Santo Antônio de Goiás', 'Santo Antônio do Descoberto', 'Senador Canedo', 'Serranópolis', 'Silvânia', 'Simolândia', 'São Domingos', 'São Francisco de Goiás', "São João d'Aliança", 'São João da Paraúna', 'São Luiz do Norte', 'São Luís de Montes Belos', 'São Miguel do Araguaia', 'São Miguel do Passa Quatro', 'São Patrício', 'São Simão', "Sítio d'Abadia", 'Taquaral de Goiás', 'Teresina de Goiás', 'Terezópolis de Goiás', 'Trindade', 'Trombas', 'Três Ranchos', 'Turvelândia', 'Turvânia', 'Uirapuru', 'Uruana', 'Uruaçu', 'Urutaí', 'Valparaíso de Goiás', 'Varjão', 'Vianópolis', 'Vicentinópolis', 'Vila Boa', 'Vila Propício', 'Água Fria de Goiás', 'Água Limpa', 'Águas Lindas de Goiás'],
  MG: ['Abadia dos Dourados', 'Abaeté', 'Abre Campo', 'Acaiaca', 'Aguanil', 'Aimorés', 'Aiuruoca', 'Alagoa', 'Albertina', 'Alfenas', 'Alfredo Vasconcelos', 'Almenara', 'Alpercata', 'Alpinópolis', 'Alterosa', 'Alto Caparaó', 'Alto Jequitibá', 'Alto Rio Doce', 'Alvarenga', 'Alvinópolis', 'Alvorada de Minas', 'Além Paraíba', 'Amparo do Serra', 'Andradas', 'Andrelândia', 'Angelândia', 'Antônio Carlos', 'Antônio Dias', 'Antônio Prado de Minas', 'Aracitaba', 'Araguari', 'Arantina', 'Araponga', 'Araporã', 'Arapuá', 'Araxá', 'Araçaí', 'Araçuaí', 'Araújos', 'Arceburgo', 'Arcos', 'Areado', 'Argirita', 'Aricanduva', 'Arinos', 'Astolfo Dutra', 'Ataléia', 'Augusto de Lima', 'Açucena', 'Baependi', 'Baldim', 'Bambuí', 'Bandeira', 'Bandeira do Sul', 'Barbacena', 'Barra Longa', 'Barroso', 'Barão de Cocais', 'Barão de Monte Alto', 'Bela Vista de Minas', 'Belmiro Braga', 'Belo Horizonte', 'Belo Oriente', 'Belo Vale', 'Berilo', 'Berizal', 'Bertópolis', 'Betim', 'Bias Fortes', 'Bicas', 'Biquinhas', 'Boa Esperança', 'Bocaina de Minas', 'Bocaiúva', 'Bom Despacho', 'Bom Jardim de Minas', 'Bom Jesus da Penha', 'Bom Jesus do Amparo', 'Bom Jesus do Galho', 'Bom Repouso', 'Bom Sucesso', 'Bonfim', 'Bonfinópolis de Minas', 'Bonito de Minas', 'Borda da Mata', 'Botelhos', 'Botumirim', 'Brasilândia de Minas', 'Brasília de Minas', 'Brazópolis', 'Braúnas', 'Brumadinho', 'Brás Pires', 'Bueno Brandão', 'Buenópolis', 'Bugre', 'Buritis', 'Buritizeiro', 'Cabeceira Grande', 'Cabo Verde', 'Cachoeira Dourada', 'Cachoeira da Prata', 'Cachoeira de Minas', 'Cachoeira de Pajeú', 'Caetanópolis', 'Caeté', 'Caiana', 'Cajuri', 'Caldas', 'Camacho', 'Camanducaia', 'Cambuquira', 'Cambuí', 'Campanha', 'Campanário', 'Campestre', 'Campina Verde', 'Campo Azul', 'Campo Belo', 'Campo Florido', 'Campo do Meio', 'Campos Altos', 'Campos Gerais', 'Cana Verde', 'Canaã', 'Candeias', 'Cantagalo', 'Canápolis', 'Caparaó', 'Capela Nova', 'Capelinha', 'Capetinga', 'Capim Branco', 'Capinópolis', 'Capitão Andrade', 'Capitão Enéas', 'Capitólio', 'Caputira', 'Caranaíba', 'Carandaí', 'Carangola', 'Caratinga', 'Caraí', 'Carbonita', 'Careaçu', 'Carlos Chagas', 'Carmo da Cachoeira', 'Carmo da Mata', 'Carmo de Minas', 'Carmo do Cajuru', 'Carmo do Paranaíba', 'Carmo do Rio Claro', 'Carmésia', 'Carmópolis de Minas', 'Carneirinho', 'Carrancas', 'Carvalhos', 'Carvalhópolis', 'Casa Grande', 'Cascalho Rico', 'Cataguases', 'Catas Altas', 'Catas Altas da Noruega', 'Catuji', 'Catuti', 'Caxambu', 'Cedro do Abaeté', 'Central de Minas', 'Centralina', 'Chalé', 'Chapada Gaúcha', 'Chapada do Norte', 'Chiador', 'Chácara', 'Cipotânea', 'Claraval', 'Claro dos Poções', 'Cláudio', 'Coimbra', 'Coluna', 'Comendador Gomes', 'Comercinho', 'Conceição da Aparecida', 'Conceição da Barra de Minas', 'Conceição das Alagoas', 'Conceição das Pedras', 'Conceição de Ipanema', 'Conceição do Mato Dentro', 'Conceição do Pará', 'Conceição do Rio Verde', 'Conceição dos Ouros', 'Confins', 'Congonhal', 'Congonhas', 'Congonhas do Norte', 'Conquista', 'Conselheiro Lafaiete', 'Conselheiro Pena', 'Consolação', 'Contagem', 'Coqueiral', 'Coração de Jesus', 'Cordisburgo', 'Cordislândia', 'Corinto', 'Coroaci', 'Coromandel', 'Coronel Fabriciano', 'Coronel Murta', 'Coronel Pacheco', 'Coronel Xavier Chaves', 'Couto de Magalhães de Minas', 'Cristais', 'Cristiano Otoni', 'Cristina', 'Cristália', 'Crisólita', 'Crucilândia', 'Cruzeiro da Fortaleza', 'Cruzília', 'Cuparaque', 'Curral de Dentro', 'Curvelo', 'Cássia', 'Córrego Danta', 'Córrego Fundo', 'Córrego Novo', 'Córrego do Bom Jesus', 'Cônego Marinho', 'Datas', 'Delfim Moreira', 'Delfinópolis', 'Delta', 'Descoberto', 'Desterro de Entre Rios', 'Desterro do Melo', 'Diamantina', 'Diogo de Vasconcelos', 'Dionísio', 'Divino', 'Divino das Laranjeiras', 'Divinolândia de Minas', 'Divinésia', 'Divinópolis', 'Divisa Alegre', 'Divisa Nova', 'Divisópolis', 'Dom Bosco', 'Dom Cavati', 'Dom Joaquim', 'Dom Silvério', 'Dom Viçoso', 'Dona Euzébia', 'Dores de Campos', 'Dores de Guanhães', 'Dores do Indaiá', 'Dores do Turvo', 'Doresópolis', 'Douradoquara', 'Durandé', 'Elói Mendes', 'Engenheiro Caldas', 'Engenheiro Navarro', 'Entre Folhas', 'Entre Rios de Minas', 'Ervália', 'Esmeraldas', 'Espera Feliz', 'Espinosa', 'Espírito Santo do Dourado', 'Estiva', 'Estrela Dalva', 'Estrela do Indaiá', 'Estrela do Sul', 'Eugenópolis', 'Ewbank da Câmara', 'Extrema', 'Fama', 'Faria Lemos', 'Felisburgo', 'Felixlândia', 'Felício dos Santos', 'Fernandes Tourinho', 'Ferros', 'Fervedouro', 'Florestal', 'Formiga', 'Formoso', 'Fortaleza de Minas', 'Fortuna de Minas', 'Francisco Badaró', 'Francisco Dumont', 'Francisco Sá', 'Franciscópolis', 'Frei Gaspar', 'Frei Inocêncio', 'Frei Lagonegro', 'Fronteira', 'Fronteira dos Vales', 'Fruta de Leite', 'Frutal', 'Funilândia', 'Galiléia', 'Gameleiras', 'Glaucilândia', 'Goiabeira', 'Goianá', 'Gonzaga', 'Gonçalves', 'Gouveia', 'Governador Valadares', 'Grupiara', 'Grão Mogol', 'Guanhães', 'Guapé', 'Guaraciaba', 'Guaraciama', 'Guarani', 'Guaranésia', 'Guarará', 'Guarda-Mor', 'Guaxupé', 'Guidoval', 'Guimarânia', 'Guiricema', 'Gurinhatã', 'Heliodora', 'Iapu', 'Ibertioga', 'Ibiaí', 'Ibiracatu', 'Ibiraci', 'Ibirité', 'Ibitiúra de Minas', 'Ibituruna', 'Ibiá', 'Icaraí de Minas', 'Igarapé', 'Igaratinga', 'Iguatama', 'Ijaci', 'Ilicínea', 'Imbé de Minas', 'Inconfidentes', 'Indaiabira', 'Indianópolis', 'Ingaí', 'Inhapim', 'Inhaúma', 'Inimutaba', 'Ipaba', 'Ipanema', 'Ipatinga', 'Ipiaçu', 'Ipuiúna', 'Iraí de Minas', 'Itabira', 'Itabirinha', 'Itabirito', 'Itacambira', 'Itacarambi', 'Itaguara', 'Itaipé', 'Itajubá', 'Itamarandiba', 'Itamarati de Minas', 'Itambacuri', 'Itambé do Mato Dentro', 'Itamogi', 'Itamonte', 'Itanhandu', 'Itanhomi', 'Itaobim', 'Itapagipe', 'Itapecerica', 'Itapeva', 'Itatiaiuçu', 'Itaverava', 'Itaú de Minas', 'Itaúna', 'Itinga', 'Itueta', 'Ituiutaba', 'Itumirim', 'Iturama', 'Itutinga', 'Jaboticatubas', 'Jacinto', 'Jacutinga', 'Jacuí', 'Jaguaraçu', 'Jampruca', 'Janaúba', 'Januária', 'Japaraíba', 'Japonvar', 'Jaíba', 'Jeceaba', 'Jenipapo de Minas', 'Jequeri', 'Jequitaí', 'Jequitibá', 'Jequitinhonha', 'Jesuânia', 'Joanésia', 'Joaquim Felício', 'Joaíma', 'Jordânia', 'Josenópolis', 'José Gonçalves de Minas', 'José Raydan', 'João Monlevade', 'João Pinheiro', 'Juatuba', 'Juiz de Fora', 'Juramento', 'Juruaia', 'Juvenília', 'Ladainha', 'Lagamar', 'Lagoa Dourada', 'Lagoa Formosa', 'Lagoa Grande', 'Lagoa Santa', 'Lagoa da Prata', 'Lagoa dos Patos', 'Lajinha', 'Lambari', 'Lamim', 'Laranjal', 'Lassance', 'Lavras', 'Leandro Ferreira', 'Leme do Prado', 'Leopoldina', 'Liberdade', 'Lima Duarte', 'Limeira do Oeste', 'Lontra', 'Luisburgo', 'Luislândia', 'Luminárias', 'Luz', 'Machacalis', 'Machado', 'Madre de Deus de Minas', 'Malacacheta', 'Mamonas', 'Manga', 'Manhuaçu', 'Manhumirim', 'Mantena', 'Mar de Espanha', 'Maravilhas', 'Maria da Fé', 'Mariana', 'Marilac', 'Maripá de Minas', 'Marliéria', 'Marmelópolis', 'Martinho Campos', 'Martins Soares', 'Mata Verde', 'Materlândia', 'Mateus Leme', 'Mathias Lobato', 'Matias Barbosa', 'Matias Cardoso', 'Matipó', 'Mato Verde', 'Matozinhos', 'Matutina', 'Medeiros', 'Medina', 'Mendes Pimentel', 'Mercês', 'Mesquita', 'Minas Novas', 'Minduri', 'Mirabela', 'Miradouro', 'Miravânia', 'Miraí', 'Moeda', 'Moema', 'Monjolos', 'Monsenhor Paulo', 'Montalvânia', 'Monte Alegre de Minas', 'Monte Azul', 'Monte Belo', 'Monte Carmelo', 'Monte Formoso', 'Monte Santo de Minas', 'Monte Sião', 'Montes Claros', 'Montezuma', 'Morada Nova de Minas', 'Morro da Garça', 'Morro do Pilar', 'Munhoz', 'Muriaé', 'Mutum', 'Muzambinho', 'Mário Campos', 'Nacip Raydan', 'Nanuque', 'Naque', 'Natalândia', 'Natércia', 'Nazareno', 'Nepomuceno', 'Ninheira', 'Nova Belém', 'Nova Era', 'Nova Lima', 'Nova Módica', 'Nova Ponte', 'Nova Porteirinha', 'Nova Resende', 'Nova Serrana', 'Nova União', 'Novo Cruzeiro', 'Novo Oriente de Minas', 'Novorizonte', 'Olaria', "Olhos-d'Água", 'Oliveira', 'Oliveira Fortes', 'Olímpio Noronha', 'Onça de Pitangui', 'Oratórios', 'Orizânia', 'Ouro Branco', 'Ouro Fino', 'Ouro Preto', 'Ouro Verde de Minas', 'Padre Carvalho', 'Padre Paraíso', 'Pai Pedro', 'Paineiras', 'Pains', 'Paiva', 'Palma', 'Palmópolis', 'Papagaios', 'Paracatu', 'Paraguaçu', 'Paraisópolis', 'Paraopeba', 'Pará de Minas', 'Passa Quatro', 'Passa Tempo', 'Passa Vinte', 'Passabém', 'Passos', 'Patis', 'Patos de Minas', 'Patrocínio', 'Patrocínio do Muriaé', 'Paula Cândido', 'Paulistas', 'Pavão', 'Pedra Azul', 'Pedra Bonita', 'Pedra Dourada', 'Pedra do Anta', 'Pedra do Indaiá', 'Pedralva', 'Pedras de Maria da Cruz', 'Pedrinópolis', 'Pedro Leopoldo', 'Pedro Teixeira', 'Pequeri', 'Pequi', 'Perdigão', 'Perdizes', 'Perdões', 'Periquito', 'Pescador', 'Peçanha', 'Piau', 'Piedade de Caratinga', 'Piedade de Ponte Nova', 'Piedade do Rio Grande', 'Piedade dos Gerais', 'Pimenta', "Pingo d'Água", 'Pintópolis', 'Piracema', 'Pirajuba', 'Piranga', 'Piranguinho', 'Piranguçu', 'Pirapetinga', 'Pirapora', 'Piraúba', 'Pitangui', 'Piumhi', 'Planura', 'Pocrane', 'Pompéu', 'Ponte Nova', 'Ponto Chique', 'Ponto dos Volantes', 'Porteirinha', 'Porto Firme', 'Poté', 'Pouso Alegre', 'Pouso Alto', 'Poço Fundo', 'Poços de Caldas', 'Prados', 'Prata', 'Pratinha', 'Pratápolis', 'Presidente Bernardes', 'Presidente Juscelino', 'Presidente Kubitschek', 'Presidente Olegário', 'Prudente de Morais', 'Quartel Geral', 'Queluzito', 'Raposos', 'Raul Soares', 'Recreio', 'Reduto', 'Resende Costa', 'Resplendor', 'Ressaquinha', 'Riachinho', 'Riacho dos Machados', 'Ribeirão Vermelho', 'Ribeirão das Neves', 'Rio Acima', 'Rio Casca', 'Rio Doce', 'Rio Espera', 'Rio Manso', 'Rio Novo', 'Rio Paranaíba', 'Rio Pardo de Minas', 'Rio Piracicaba', 'Rio Pomba', 'Rio Preto', 'Rio Vermelho', 'Rio do Prado', 'Ritápolis', 'Rochedo de Minas', 'Rodeiro', 'Romaria', 'Rosário da Limeira', 'Rubelita', 'Rubim', 'Sabará', 'Sabinópolis', 'Sacramento', 'Salinas', 'Salto da Divisa', 'Santa Bárbara', 'Santa Bárbara do Leste', 'Santa Bárbara do Monte Verde', 'Santa Bárbara do Tugúrio', 'Santa Cruz de Minas', 'Santa Cruz de Salinas', 'Santa Cruz do Escalvado', 'Santa Efigênia de Minas', 'Santa Fé de Minas', 'Santa Helena de Minas', 'Santa Juliana', 'Santa Luzia', 'Santa Margarida', 'Santa Maria de Itabira', 'Santa Maria do Salto', 'Santa Maria do Suaçuí', 'Santa Rita de Caldas', 'Santa Rita de Ibitipoca', 'Santa Rita de Jacutinga', 'Santa Rita de Minas', 'Santa Rita do Itueto', 'Santa Rita do Sapucaí', 'Santa Rosa da Serra', 'Santa Vitória', 'Santana da Vargem', 'Santana de Cataguases', 'Santana de Pirapama', 'Santana do Deserto', 'Santana do Garambéu', 'Santana do Jacaré', 'Santana do Manhuaçu', 'Santana do Paraíso', 'Santana do Riacho', 'Santana dos Montes', 'Santo Antônio do Amparo', 'Santo Antônio do Aventureiro', 'Santo Antônio do Grama', 'Santo Antônio do Itambé', 'Santo Antônio do Jacinto', 'Santo Antônio do Monte', 'Santo Antônio do Retiro', 'Santo Antônio do Rio Abaixo', 'Santo Hipólito', 'Santos Dumont', 'Sapucaí-Mirim', 'Sardoá', 'Sarzedo', 'Sem-Peixe', 'Senador Amaral', 'Senador Cortes', 'Senador Firmino', 'Senador José Bento', 'Senador Modestino Gonçalves', 'Senhora de Oliveira', 'Senhora do Porto', 'Senhora dos Remédios', 'Sericita', 'Seritinga', 'Serra Azul de Minas', 'Serra da Saudade', 'Serra do Salitre', 'Serra dos Aimorés', 'Serrania', 'Serranos', 'Serranópolis de Minas', 'Serro', 'Sete Lagoas', 'Setubinha', 'Silveirânia', 'Silvianópolis', 'Simonésia', 'Simão Pereira', 'Sobrália', 'Soledade de Minas', 'São Bento Abade', 'São Brás do Suaçuí', 'São Domingos das Dores', 'São Domingos do Prata', 'São Francisco', 'São Francisco de Paula', 'São Francisco de Sales', 'São Francisco do Glória', 'São Félix de Minas', 'São Geraldo', 'São Geraldo da Piedade', 'São Geraldo do Baixio', 'São Gonçalo do Abaeté', 'São Gonçalo do Pará', 'São Gonçalo do Rio Abaixo', 'São Gonçalo do Rio Preto', 'São Gonçalo do Sapucaí', 'São Gotardo', 'São Joaquim de Bicas', 'São José da Barra', 'São José da Lapa', 'São José da Safira', 'São José da Varginha', 'São José do Alegre', 'São José do Divino', 'São José do Goiabal', 'São José do Jacuri', 'São José do Mantimento', 'São João Batista do Glória', 'São João Evangelista', 'São João Nepomuceno', 'São João da Lagoa', 'São João da Mata', 'São João da Ponte', 'São João das Missões', 'São João del Rei', 'São João do Manhuaçu', 'São João do Manteninha', 'São João do Oriente', 'São João do Pacuí', 'São João do Paraíso', 'São Lourenço', 'São Miguel do Anta', 'São Pedro da União', 'São Pedro do Suaçuí', 'São Pedro dos Ferros', 'São Romão', 'São Roque de Minas', 'São Sebastião da Bela Vista', 'São Sebastião da Vargem Alegre', 'São Sebastião do Anta', 'São Sebastião do Maranhão', 'São Sebastião do Oeste', 'São Sebastião do Paraíso', 'São Sebastião do Rio Preto', 'São Sebastião do Rio Verde', 'São Tiago', 'São Tomás de Aquino', 'São Tomé das Letras', 'São Vicente de Minas', 'Tabuleiro', 'Taiobeiras', 'Taparuba', 'Tapira', 'Tapiraí', 'Taquaraçu de Minas', 'Tarumirim', 'Teixeiras', 'Teófilo Otoni', 'Timóteo', 'Tiradentes', 'Tiros', 'Tocantins', 'Tocos do Moji', 'Toledo', 'Tombos', 'Três Corações', 'Três Marias', 'Três Pontas', 'Tumiritinga', 'Tupaciguara', 'Turmalina', 'Turvolândia', 'Ubaporanga', 'Ubaí', 'Uberaba', 'Uberlândia', 'Ubá', 'Umburatiba', 'Unaí', 'União de Minas', 'Uruana de Minas', 'Urucuia', 'Urucânia', 'Vargem Alegre', 'Vargem Bonita', 'Vargem Grande do Rio Pardo', 'Varginha', 'Varjão de Minas', 'Varzelândia', 'Vazante', 'Verdelândia', 'Veredinha', 'Vermelho Novo', 'Veríssimo', 'Vespasiano', 'Vieiras', 'Virgem da Lapa', 'Virginópolis', 'Virgolândia', 'Virgínia', 'Visconde do Rio Branco', 'Viçosa', 'Volta Grande', 'Várzea da Palma', 'Wenceslau Braz', 'Água Boa', 'Água Comprida', 'Águas Formosas', 'Águas Vermelhas'],
  PA: ['Abaetetuba', 'Abel Figueiredo', 'Acará', 'Afuá', 'Alenquer', 'Almeirim', 'Altamira', 'Anajás', 'Ananindeua', 'Anapu', 'Augusto Corrêa', 'Aurora do Pará', 'Aveiro', 'Bagre', 'Baião', 'Bannach', 'Barcarena', 'Belterra', 'Belém', 'Benevides', 'Bom Jesus do Tocantins', 'Bonito', 'Bragança', 'Brasil Novo', 'Brejo Grande do Araguaia', 'Breu Branco', 'Breves', 'Bujaru', 'Cachoeira do Arari', 'Cachoeira do Piriá', 'Cametá', 'Canaã dos Carajás', 'Capanema', 'Capitão Poço', 'Castanhal', 'Chaves', 'Colares', 'Conceição do Araguaia', 'Concórdia do Pará', 'Cumaru do Norte', 'Curionópolis', 'Curralinho', 'Curuá', 'Curuçá', 'Dom Eliseu', 'Eldorado do Carajás', 'Faro', 'Floresta do Araguaia', 'Garrafão do Norte', 'Goianésia do Pará', 'Gurupá', 'Igarapé-Açu', 'Igarapé-Miri', 'Inhangapi', 'Ipixuna do Pará', 'Irituia', 'Itaituba', 'Itupiranga', 'Jacareacanga', 'Jacundá', 'Juruti', 'Limoeiro do Ajuru', 'Magalhães Barata', 'Marabá', 'Maracanã', 'Marapanim', 'Marituba', 'Medicilândia', 'Melgaço', 'Mocajuba', 'Moju', 'Mojuí dos Campos', 'Monte Alegre', 'Muaná', 'Mãe do Rio', 'Nova Esperança do Piriá', 'Nova Ipixuna', 'Nova Timboteua', 'Novo Progresso', 'Novo Repartimento', 'Oeiras do Pará', 'Oriximiná', 'Ourilândia do Norte', 'Ourém', 'Pacajá', 'Palestina do Pará', 'Paragominas', 'Parauapebas', "Pau D'Arco", 'Peixe-Boi', 'Piçarra', 'Placas', 'Ponta de Pedras', 'Portel', 'Porto de Moz', 'Prainha', 'Primavera', 'Quatipuru', 'Redenção', 'Rio Maria', 'Rondon do Pará', 'Rurópolis', 'Salinópolis', 'Salvaterra', 'Santa Bárbara do Pará', 'Santa Cruz do Arari', 'Santa Izabel do Pará', 'Santa Luzia do Pará', 'Santa Maria das Barreiras', 'Santa Maria do Pará', 'Santana do Araguaia', 'Santarém', 'Santarém Novo', 'Santo Antônio do Tauá', 'Sapucaia', 'Senador José Porfírio', 'Soure', 'São Caetano de Odivelas', 'São Domingos do Araguaia', 'São Domingos do Capim', 'São Francisco do Pará', 'São Félix do Xingu', 'São Geraldo do Araguaia', 'São João da Ponta', 'São João de Pirabas', 'São João do Araguaia', 'São Miguel do Guamá', 'São Sebastião da Boa Vista', 'Tailândia', 'Terra Alta', 'Terra Santa', 'Tomé-Açu', 'Tracuateua', 'Trairão', 'Tucumã', 'Tucuruí', 'Ulianópolis', 'Uruará', 'Vigia', 'Viseu', 'Vitória do Xingu', 'Xinguara', 'Água Azul do Norte', 'Óbidos'],
  CE: ['Abaiara', 'Acarape', 'Acaraú', 'Acopiara', 'Aiuaba', 'Alcântaras', 'Altaneira', 'Alto Santo', 'Amontada', 'Antonina do Norte', 'Apuiarés', 'Aquiraz', 'Aracati', 'Aracoiaba', 'Ararendá', 'Araripe', 'Aratuba', 'Arneiroz', 'Assaré', 'Aurora', 'Baixio', 'Banabuiú', 'Barbalha', 'Barreira', 'Barro', 'Barroquinha', 'Baturité', 'Beberibe', 'Bela Cruz', 'Boa Viagem', 'Brejo Santo', 'Camocim', 'Campos Sales', 'Canindé', 'Capistrano', 'Caridade', 'Caririaçu', 'Cariré', 'Cariús', 'Carnaubal', 'Cascavel', 'Catarina', 'Catunda', 'Caucaia', 'Cedro', 'Chaval', 'Chorozinho', 'Choró', 'Coreaú', 'Crateús', 'Crato', 'Croatá', 'Cruz', 'Deputado Irapuan Pinheiro', 'Ereré', 'Eusébio', 'Farias Brito', 'Forquilha', 'Fortaleza', 'Fortim', 'Frecheirinha', 'General Sampaio', 'Granja', 'Granjeiro', 'Graça', 'Groaíras', 'Guaiúba', 'Guaraciaba do Norte', 'Guaramiranga', 'Hidrolândia', 'Horizonte', 'Ibaretama', 'Ibiapina', 'Ibicuitinga', 'Icapuí', 'Icó', 'Iguatu', 'Independência', 'Ipaporanga', 'Ipaumirim', 'Ipu', 'Ipueiras', 'Iracema', 'Irauçuba', 'Itaitinga', 'Itaiçaba', 'Itapajé', 'Itapipoca', 'Itapiúna', 'Itarema', 'Itatira', 'Jaguaretama', 'Jaguaribara', 'Jaguaribe', 'Jaguaruana', 'Jardim', 'Jati', 'Jijoca de Jericoacoara', 'Juazeiro do Norte', 'Jucás', 'Lavras da Mangabeira', 'Limoeiro do Norte', 'Madalena', 'Maracanaú', 'Maranguape', 'Marco', 'Martinópole', 'Massapê', 'Mauriti', 'Meruoca', 'Milagres', 'Milhã', 'Miraíma', 'Missão Velha', 'Mombaça', 'Monsenhor Tabosa', 'Morada Nova', 'Moraújo', 'Morrinhos', 'Mucambo', 'Mulungu', 'Nova Olinda', 'Nova Russas', 'Novo Oriente', 'Ocara', 'Orós', 'Pacajus', 'Pacatuba', 'Pacoti', 'Pacujá', 'Palhano', 'Palmácia', 'Paracuru', 'Paraipaba', 'Parambu', 'Paramoti', 'Pedra Branca', 'Penaforte', 'Pentecoste', 'Pereiro', 'Pindoretama', 'Piquet Carneiro', 'Pires Ferreira', 'Poranga', 'Porteiras', 'Potengi', 'Potiretama', 'Quiterianópolis', 'Quixadá', 'Quixelô', 'Quixeramobim', 'Quixeré', 'Redenção', 'Reriutaba', 'Russas', 'Saboeiro', 'Salitre', 'Santa Quitéria', 'Santana do Acaraú', 'Santana do Cariri', 'Senador Pompeu', 'Senador Sá', 'Sobral', 'Solonópole', 'São Benedito', 'São Gonçalo do Amarante', 'São João do Jaguaribe', 'São Luís do Curu', 'Tabuleiro do Norte', 'Tamboril', 'Tarrafas', 'Tauá', 'Tejuçuoca', 'Tianguá', 'Trairi', 'Tururu', 'Ubajara', 'Umari', 'Umirim', 'Uruburetama', 'Uruoca', 'Varjota', 'Viçosa do Ceará', 'Várzea Alegre'],
  BA: ['Abaré', 'Abaíra', 'Acajutiba', 'Adustina', 'Aiquara', 'Alagoinhas', 'Alcobaça', 'Almadina', 'Amargosa', 'Amélia Rodrigues', 'América Dourada', 'Anagé', 'Andaraí', 'Andorinha', 'Angical', 'Anguera', 'Antas', 'Antônio Cardoso', 'Antônio Gonçalves', 'Aporá', 'Apuarema', 'Aracatu', 'Araci', 'Aramari', 'Arataca', 'Aratuípe', 'Araçás', 'Aurelino Leal', 'Baianópolis', 'Baixa Grande', 'Banzaê', 'Barra', 'Barra da Estiva', 'Barra do Choça', 'Barra do Mendes', 'Barra do Rocha', 'Barreiras', 'Barro Alto', 'Barro Preto', 'Barrocas', 'Belmonte', 'Belo Campo', 'Biritinga', 'Boa Nova', 'Boa Vista do Tupim', 'Bom Jesus da Lapa', 'Bom Jesus da Serra', 'Boninal', 'Bonito', 'Boquira', 'Botuporã', 'Brejolândia', 'Brejões', 'Brotas de Macaúbas', 'Brumado', 'Buerarema', 'Buritirama', 'Caatiba', 'Cabaceiras do Paraguaçu', 'Cachoeira', 'Caculé', 'Caetanos', 'Caetité', 'Cafarnaum', 'Cairu', 'Caldeirão Grande', 'Camacan', 'Camamu', 'Camaçari', 'Campo Alegre de Lourdes', 'Campo Formoso', 'Canarana', 'Canavieiras', 'Candeal', 'Candeias', 'Candiba', 'Cansanção', 'Canudos', 'Canápolis', 'Capela do Alto Alegre', 'Capim Grosso', 'Caravelas', 'Caraíbas', 'Cardeal da Silva', 'Carinhanha', 'Casa Nova', 'Castro Alves', 'Catolândia', 'Catu', 'Caturama', 'Caém', 'Central', 'Chorrochó', 'Cipó', 'Coaraci', 'Cocos', 'Conceição da Feira', 'Conceição do Almeida', 'Conceição do Coité', 'Conceição do Jacuípe', 'Conde', 'Condeúba', 'Contendas do Sincorá', 'Coração de Maria', 'Cordeiros', 'Coribe', 'Coronel João Sá', 'Correntina', 'Cotegipe', 'Cravolândia', 'Cristópolis', 'Crisópolis', 'Cruz das Almas', 'Curaçá', 'Cândido Sales', 'Cícero Dantas', "Dias d'Ávila", 'Dom Basílio', 'Dom Macedo Costa', 'Dário Meira', 'Elísio Medrado', 'Encruzilhada', 'Entre Rios', 'Esplanada', 'Euclides da Cunha', 'Eunápolis', 'Feira da Mata', 'Feira de Santana', 'Filadélfia', 'Firmino Alves', 'Floresta Azul', 'Formosa do Rio Preto', 'Fátima', 'Gandu', 'Gavião', 'Gentio do Ouro', 'Glória', 'Gongogi', 'Governador Mangabeira', 'Guajeru', 'Guanambi', 'Guaratinga', 'Heliópolis', 'Iaçu', 'Ibiassucê', 'Ibicaraí', 'Ibicoara', 'Ibicuí', 'Ibipeba', 'Ibipitanga', 'Ibiquera', 'Ibirapitanga', 'Ibirapuã', 'Ibirataia', 'Ibitiara', 'Ibititá', 'Ibotirama', 'Ichu', 'Igaporã', 'Igrapiúna', 'Iguaí', 'Ilhéus', 'Inhambupe', 'Ipecaetá', 'Ipiaú', 'Ipirá', 'Ipupiara', 'Irajuba', 'Iramaia', 'Iraquara', 'Irará', 'Irecê', 'Itabela', 'Itaberaba', 'Itabuna', 'Itacaré', 'Itaeté', 'Itagi', 'Itagibá', 'Itagimirim', 'Itaguaçu da Bahia', 'Itaju do Colônia', 'Itajuípe', 'Itamaraju', 'Itamari', 'Itambé', 'Itanagra', 'Itanhém', 'Itaparica', 'Itapebi', 'Itapetinga', 'Itapicuru', 'Itapitanga', 'Itapé', 'Itaquara', 'Itarantim', 'Itatim', 'Itiruçu', 'Itiúba', 'Itororó', 'Ituaçu', 'Ituberá', 'Iuiu', 'Jaborandi', 'Jacaraci', 'Jacobina', 'Jaguaquara', 'Jaguarari', 'Jaguaripe', 'Jandaíra', 'Jequié', 'Jeremoabo', 'Jiquiriçá', 'Jitaúna', 'João Dourado', 'Juazeiro', 'Jucuruçu', 'Jussara', 'Jussari', 'Jussiape', 'Lafaiete Coutinho', 'Lagoa Real', 'Laje', 'Lajedinho', 'Lajedo do Tabocal', 'Lajedão', 'Lamarão', 'Lapão', 'Lauro de Freitas', 'Lençóis', 'Licínio de Almeida', 'Livramento de Nossa Senhora', 'Luís Eduardo Magalhães', 'Macajuba', 'Macarani', 'Macaúbas', 'Macururé', 'Madre de Deus', 'Maetinga', 'Maiquinique', 'Mairi', 'Malhada', 'Malhada de Pedras', 'Manoel Vitorino', 'Mansidão', 'Maracás', 'Maragogipe', 'Maraú', 'Marcionílio Souza', 'Mascote', 'Mata de São João', 'Matina', 'Medeiros Neto', 'Miguel Calmon', 'Milagres', 'Mirangaba', 'Mirante', 'Monte Santo', 'Morpará', 'Morro do Chapéu', 'Mortugaba', 'Mucugê', 'Mucuri', 'Mulungu do Morro', 'Mundo Novo', 'Muniz Ferreira', 'Muquém do São Francisco', 'Muritiba', 'Mutuípe', 'Nazaré', 'Nilo Peçanha', 'Nordestina', 'Nova Canaã', 'Nova Fátima', 'Nova Ibiá', 'Nova Itarana', 'Nova Redenção', 'Nova Soure', 'Nova Viçosa', 'Novo Horizonte', 'Novo Triunfo', 'Olindina', 'Oliveira dos Brejinhos', 'Ouriçangas', 'Ourolândia', 'Palmas de Monte Alto', 'Palmeiras', 'Paramirim', 'Paratinga', 'Paripiranga', 'Pau Brasil', 'Paulo Afonso', 'Pedro Alexandre', 'Pedrão', 'Piatã', 'Pilão Arcado', 'Pindaí', 'Pindobaçu', 'Pintadas', 'Piraí do Norte', 'Piripá', 'Piritiba', 'Planaltino', 'Planalto', 'Pojuca', 'Ponto Novo', 'Porto Seguro', 'Potiraguá', 'Poções', 'Prado', 'Presidente Dutra', 'Presidente Jânio Quadros', 'Presidente Tancredo Neves', 'Pé de Serra', 'Queimadas', 'Quijingue', 'Quixabeira', 'Rafael Jambeiro', 'Remanso', 'Retirolândia', 'Riacho de Santana', 'Riachão das Neves', 'Riachão do Jacuípe', 'Ribeira do Amparo', 'Ribeira do Pombal', 'Ribeirão do Largo', 'Rio Real', 'Rio de Contas', 'Rio do Antônio', 'Rio do Pires', 'Rodelas', 'Ruy Barbosa', 'Salinas da Margarida', 'Salvador', 'Santa Brígida', 'Santa Bárbara', 'Santa Cruz Cabrália', 'Santa Cruz da Vitória', 'Santa Inês', 'Santa Luzia', 'Santa Maria da Vitória', 'Santa Rita de Cássia', 'Santa Terezinha', 'Santaluz', 'Santana', 'Santanópolis', 'Santo Amaro', 'Santo Antônio de Jesus', 'Santo Estêvão', 'Sapeaçu', 'Saubara', 'Saúde', 'Seabra', 'Sebastião Laranjeiras', 'Senhor do Bonfim', 'Sento Sé', 'Serra Dourada', 'Serra Preta', 'Serra do Ramalho', 'Serrinha', 'Serrolândia', 'Simões Filho', 'Sobradinho', 'Souto Soares', 'Sátiro Dias', 'São Desidério', 'São Domingos', 'São Felipe', 'São Francisco do Conde', 'São Félix', 'São Félix do Coribe', 'São Gabriel', 'São Gonçalo dos Campos', 'São José da Vitória', 'São José do Jacuípe', 'São Miguel das Matas', 'São Sebastião do Passé', 'Sítio do Mato', 'Sítio do Quinto', 'Tabocas do Brejo Velho', 'Tanhaçu', 'Tanque Novo', 'Tanquinho', 'Taperoá', 'Tapiramutá', 'Teixeira de Freitas', 'Teodoro Sampaio', 'Teofilândia', 'Teolândia', 'Terra Nova', 'Tremedal', 'Tucano', 'Uauá', 'Ubaitaba', 'Ubatã', 'Ubaíra', 'Uibaí', 'Umburanas', 'Una', 'Urandi', 'Uruçuca', 'Utinga', 'Valente', 'Valença', 'Varzedo', 'Vera Cruz', 'Vereda', 'Vitória da Conquista', 'Várzea Nova', 'Várzea da Roça', 'Várzea do Poço', 'Wagner', 'Wanderley', 'Wenceslau Guimarães', 'Xique-Xique', 'Água Fria', 'Érico Cardoso'],
  PR: ['Abatiá', 'Adrianópolis', 'Agudos do Sul', 'Almirante Tamandaré', 'Altamira do Paraná', 'Alto Paraná', 'Alto Paraíso', 'Alto Piquiri', 'Altônia', 'Alvorada do Sul', 'Amaporã', 'Ampére', 'Anahy', 'Andirá', 'Antonina', 'Antônio Olinto', 'Apucarana', 'Arapongas', 'Arapoti', 'Arapuã', 'Araruna', 'Araucária', 'Ariranha do Ivaí', 'Assaí', 'Assis Chateaubriand', 'Astorga', 'Atalaia', 'Balsa Nova', 'Bandeirantes', 'Barbosa Ferraz', 'Barra do Jacaré', 'Barracão', 'Bela Vista da Caroba', 'Bela Vista do Paraíso', 'Bituruna', 'Boa Esperança', 'Boa Esperança do Iguaçu', 'Boa Ventura de São Roque', 'Boa Vista da Aparecida', 'Bocaiúva do Sul', 'Bom Jesus do Sul', 'Bom Sucesso', 'Bom Sucesso do Sul', 'Borrazópolis', 'Braganey', 'Brasilândia do Sul', 'Cafeara', 'Cafelândia', 'Cafezal do Sul', 'Califórnia', 'Cambará', 'Cambira', 'Cambé', 'Campina Grande do Sul', 'Campina da Lagoa', 'Campina do Simão', 'Campo Bonito', 'Campo Largo', 'Campo Magro', 'Campo Mourão', 'Campo do Tenente', 'Candói', 'Cantagalo', 'Capanema', 'Capitão Leônidas Marques', 'Carambeí', 'Carlópolis', 'Cascavel', 'Castro', 'Catanduvas', 'Centenário do Sul', 'Cerro Azul', 'Chopinzinho', 'Cianorte', 'Cidade Gaúcha', 'Clevelândia', 'Colombo', 'Colorado', 'Congonhinhas', 'Conselheiro Mairinck', 'Contenda', 'Corbélia', 'Cornélio Procópio', 'Coronel Domingos Soares', 'Coronel Vivida', 'Corumbataí do Sul', 'Cruz Machado', 'Cruzeiro do Iguaçu', 'Cruzeiro do Oeste', 'Cruzeiro do Sul', 'Cruzmaltina', 'Curitiba', 'Curiúva', 'Cândido de Abreu', 'Céu Azul', "Diamante D'Oeste", 'Diamante do Norte', 'Diamante do Sul', 'Dois Vizinhos', 'Douradina', 'Doutor Camargo', 'Doutor Ulysses', 'Engenheiro Beltrão', 'Entre Rios do Oeste', 'Enéas Marques', 'Esperança Nova', 'Espigão Alto do Iguaçu', 'Farol', 'Faxinal', 'Fazenda Rio Grande', 'Fernandes Pinheiro', 'Figueira', 'Flor da Serra do Sul', 'Floraí', 'Floresta', 'Florestópolis', 'Flórida', 'Formosa do Oeste', 'Foz do Iguaçu', 'Foz do Jordão', 'Francisco Alves', 'Francisco Beltrão', 'Fênix', 'General Carneiro', 'Godoy Moreira', 'Goioerê', 'Goioxim', 'Grandes Rios', 'Guairaçá', 'Guamiranga', 'Guapirama', 'Guaporema', 'Guaraci', 'Guaraniaçu', 'Guarapuava', 'Guaraqueçaba', 'Guaratuba', 'Guaíra', 'Honório Serpa', 'Ibaiti', 'Ibema', 'Ibiporã', 'Icaraíma', 'Iguaraçu', 'Iguatu', 'Imbaú', 'Imbituva', 'Inajá', 'Indianópolis', 'Inácio Martins', 'Ipiranga', 'Iporã', 'Iracema do Oeste', 'Irati', 'Iretama', 'Itaguajé', 'Itaipulândia', 'Itambaracá', 'Itambé', "Itapejara d'Oeste", 'Itaperuçu', 'Itaúna do Sul', 'Ivaiporã', 'Ivatuba', 'Ivaté', 'Ivaí', 'Jaboti', 'Jacarezinho', 'Jaguapitã', 'Jaguariaíva', 'Jandaia do Sul', 'Janiópolis', 'Japira', 'Japurá', 'Jardim Alegre', 'Jardim Olinda', 'Jataizinho', 'Jesuítas', 'Joaquim Távora', 'Jundiaí do Sul', 'Juranda', 'Jussara', 'Kaloré', 'Lapa', 'Laranjal', 'Laranjeiras do Sul', 'Leópolis', 'Lidianópolis', 'Lindoeste', 'Loanda', 'Lobato', 'Londrina', 'Luiziana', 'Lunardelli', 'Lupionópolis', 'Mallet', 'Mamborê', 'Mandaguari', 'Mandaguaçu', 'Mandirituba', 'Manfrinópolis', 'Mangueirinha', 'Manoel Ribas', 'Marechal Cândido Rondon', 'Maria Helena', 'Marialva', 'Marilena', 'Mariluz', 'Marilândia do Sul', 'Maringá', 'Maripá', 'Mariópolis', 'Marmeleiro', 'Marquinho', 'Marumbi', 'Matelândia', 'Matinhos', 'Mato Rico', 'Mauá da Serra', 'Medianeira', 'Mercedes', 'Mirador', 'Miraselva', 'Missal', 'Moreira Sales', 'Morretes', 'Munhoz de Melo', 'Nossa Senhora das Graças', 'Nova Aliança do Ivaí', 'Nova América da Colina', 'Nova Aurora', 'Nova Cantu', 'Nova Esperança', 'Nova Esperança do Sudoeste', 'Nova Fátima', 'Nova Laranjeiras', 'Nova Londrina', 'Nova Olímpia', 'Nova Prata do Iguaçu', 'Nova Santa Bárbara', 'Nova Santa Rosa', 'Nova Tebas', 'Novo Itacolomi', 'Ortigueira', 'Ourizona', 'Ouro Verde do Oeste', 'Paiçandu', 'Palmas', 'Palmeira', 'Palmital', 'Palotina', 'Paranacity', 'Paranaguá', 'Paranapoema', 'Paranavaí', 'Paraíso do Norte', 'Pato Bragado', 'Pato Branco', 'Paula Freitas', 'Paulo Frontin', 'Peabiru', 'Perobal', 'Pinhais', 'Pinhal de São Bento', 'Pinhalão', 'Pinhão', 'Piraquara', 'Piraí do Sul', 'Pitanga', 'Pitangueiras', 'Piên', 'Planaltina do Paraná', 'Planalto', 'Ponta Grossa', 'Pontal do Paraná', 'Porecatu', 'Porto Amazonas', 'Porto Barreiro', 'Porto Rico', 'Porto Vitória', 'Prado Ferreira', 'Pranchita', 'Presidente Castelo Branco', 'Primeiro de Maio', 'Prudentópolis', 'Pérola', "Pérola d'Oeste", 'Quarto Centenário', 'Quatiguá', 'Quatro Barras', 'Quatro Pontes', 'Quedas do Iguaçu', 'Querência do Norte', 'Quinta do Sol', 'Quitandinha', 'Ramilândia', 'Rancho Alegre', "Rancho Alegre D'Oeste", 'Realeza', 'Rebouças', 'Renascença', 'Reserva', 'Reserva do Iguaçu', 'Ribeirão Claro', 'Ribeirão do Pinhal', 'Rio Azul', 'Rio Bom', 'Rio Bonito do Iguaçu', 'Rio Branco do Ivaí', 'Rio Branco do Sul', 'Rio Negro', 'Rolândia', 'Roncador', 'Rondon', 'Rosário do Ivaí', 'Sabáudia', 'Salgado Filho', 'Salto do Itararé', 'Salto do Lontra', 'Santa Amélia', 'Santa Cecília do Pavão', 'Santa Cruz de Monte Castelo', 'Santa Fé', 'Santa Helena', 'Santa Inês', 'Santa Isabel do Ivaí', 'Santa Izabel do Oeste', 'Santa Lúcia', 'Santa Maria do Oeste', 'Santa Mariana', 'Santa Mônica', 'Santa Tereza do Oeste', 'Santa Terezinha de Itaipu', 'Santana do Itararé', 'Santo Antônio da Platina', 'Santo Antônio do Caiuá', 'Santo Antônio do Paraíso', 'Santo Antônio do Sudoeste', 'Santo Inácio', 'Sapopema', 'Sarandi', 'Saudade do Iguaçu', 'Sengés', 'Serranópolis do Iguaçu', 'Sertaneja', 'Sertanópolis', 'Siqueira Campos', 'Sulina', 'São Carlos do Ivaí', 'São Jerônimo da Serra', "São Jorge d'Oeste", 'São Jorge do Ivaí', 'São Jorge do Patrocínio', 'São José da Boa Vista', 'São José das Palmeiras', 'São José dos Pinhais', 'São João', 'São João do Caiuá', 'São João do Ivaí', 'São João do Triunfo', 'São Manoel do Paraná', 'São Mateus do Sul', 'São Miguel do Iguaçu', 'São Pedro do Iguaçu', 'São Pedro do Ivaí', 'São Pedro do Paraná', 'São Sebastião da Amoreira', 'São Tomé', 'Tamarana', 'Tamboara', 'Tapejara', 'Tapira', 'Teixeira Soares', 'Telêmaco Borba', 'Terra Boa', 'Terra Rica', 'Terra Roxa', 'Tibagi', 'Tijucas do Sul', 'Toledo', 'Tomazina', 'Três Barras do Paraná', 'Tunas do Paraná', 'Tuneiras do Oeste', 'Tupãssi', 'Turvo', 'Ubiratã', 'Umuarama', 'Uniflor', 'União da Vitória', 'Uraí', 'Ventania', 'Vera Cruz do Oeste', 'Verê', 'Virmond', 'Vitorino', 'Wenceslau Braz', 'Xambrê', 'Ângulo'],
  SC: ['Abdon Batista', 'Abelardo Luz', 'Agrolândia', 'Agronômica', 'Alfredo Wagner', 'Alto Bela Vista', 'Anchieta', 'Angelina', 'Anita Garibaldi', 'Anitápolis', 'Antônio Carlos', 'Apiúna', 'Arabutã', 'Araquari', 'Araranguá', 'Armazém', 'Arroio Trinta', 'Arvoredo', 'Ascurra', 'Atalanta', 'Aurora', 'Balneário Arroio do Silva', 'Balneário Barra do Sul', 'Balneário Camboriú', 'Balneário Gaivota', 'Balneário Piçarras', 'Balneário Rincão', 'Bandeirante', 'Barra Bonita', 'Barra Velha', 'Bela Vista do Toldo', 'Belmonte', 'Benedito Novo', 'Biguaçu', 'Blumenau', 'Bocaina do Sul', 'Bom Jardim da Serra', 'Bom Jesus', 'Bom Jesus do Oeste', 'Bom Retiro', 'Bombinhas', 'Botuverá', 'Braço do Norte', 'Braço do Trombudo', 'Brunópolis', 'Brusque', 'Caibi', 'Calmon', 'Camboriú', 'Campo Alegre', 'Campo Belo do Sul', 'Campo Erê', 'Campos Novos', 'Canelinha', 'Canoinhas', 'Capinzal', 'Capivari de Baixo', 'Capão Alto', 'Catanduvas', 'Caxambu do Sul', 'Caçador', 'Celso Ramos', 'Cerro Negro', 'Chapadão do Lageado', 'Chapecó', 'Cocal do Sul', 'Concórdia', 'Cordilheira Alta', 'Coronel Freitas', 'Coronel Martins', 'Correia Pinto', 'Corupá', 'Criciúma', 'Cunha Porã', 'Cunhataí', 'Curitibanos', 'Descanso', 'Dionísio Cerqueira', 'Dona Emma', 'Doutor Pedrinho', 'Entre Rios', 'Ermo', 'Erval Velho', 'Faxinal dos Guedes', 'Flor do Sertão', 'Florianópolis', 'Formosa do Sul', 'Forquilhinha', 'Fraiburgo', 'Frei Rogério', 'Galvão', 'Garopaba', 'Garuva', 'Gaspar', 'Governador Celso Ramos', 'Gravatal', 'Grão Pará', 'Guabiruba', 'Guaraciaba', 'Guaramirim', 'Guarujá do Sul', 'Guatambú', "Herval d'Oeste", 'Ibiam', 'Ibicaré', 'Ibirama', 'Ilhota', 'Imaruí', 'Imbituba', 'Imbuia', 'Indaial', 'Iomerê', 'Ipira', 'Iporã do Oeste', 'Ipuaçu', 'Ipumirim', 'Iraceminha', 'Irani', 'Irati', 'Irineópolis', 'Itaiópolis', 'Itajaí', 'Itapema', 'Itapiranga', 'Itapoá', 'Ituporanga', 'Itá', 'Içara', 'Jaborá', 'Jacinto Machado', 'Jaguaruna', 'Jaraguá do Sul', 'Jardinópolis', 'Joaçaba', 'Joinville', 'José Boiteux', 'Jupiá', 'Lacerdópolis', 'Lages', 'Laguna', 'Lajeado Grande', 'Laurentino', 'Lauro Müller', 'Lebon Régis', 'Leoberto Leal', 'Lindóia do Sul', 'Lontras', 'Luiz Alves', 'Luzerna', 'Macieira', 'Mafra', 'Major Gercino', 'Major Vieira', 'Maracajá', 'Maravilha', 'Marema', 'Massaranduba', 'Matos Costa', 'Meleiro', 'Mirim Doce', 'Modelo', 'Mondaí', 'Monte Carlo', 'Monte Castelo', 'Morro Grande', 'Morro da Fumaça', 'Navegantes', 'Nova Erechim', 'Nova Itaberaba', 'Nova Trento', 'Nova Veneza', 'Novo Horizonte', 'Orleans', 'Otacílio Costa', 'Ouro', 'Ouro Verde', 'Paial', 'Painel', 'Palhoça', 'Palma Sola', 'Palmeira', 'Palmitos', 'Papanduva', 'Paraíso', 'Passo de Torres', 'Passos Maia', 'Paulo Lopes', 'Pedras Grandes', 'Penha', 'Peritiba', 'Pescaria Brava', 'Petrolândia', 'Pinhalzinho', 'Pinheiro Preto', 'Piratuba', 'Planalto Alegre', 'Pomerode', 'Ponte Alta', 'Ponte Alta do Norte', 'Ponte Serrada', 'Porto Belo', 'Porto União', 'Pouso Redondo', 'Praia Grande', 'Presidente Castello Branco', 'Presidente Getúlio', 'Presidente Nereu', 'Princesa', 'Quilombo', 'Rancho Queimado', 'Rio Fortuna', 'Rio Negrinho', 'Rio Rufino', 'Rio das Antas', 'Rio do Campo', 'Rio do Oeste', 'Rio do Sul', 'Rio dos Cedros', 'Riqueza', 'Rodeio', 'Romelândia', 'Salete', 'Saltinho', 'Salto Veloso', 'Sangão', 'Santa Cecília', 'Santa Helena', 'Santa Rosa de Lima', 'Santa Rosa do Sul', 'Santa Terezinha', 'Santa Terezinha do Progresso', 'Santiago do Sul', 'Santo Amaro da Imperatriz', 'Saudades', 'Schroeder', 'Seara', 'Serra Alta', 'Siderópolis', 'Sombrio', 'Sul Brasil', 'São Bento do Sul', 'São Bernardino', 'São Bonifácio', 'São Carlos', 'São Cristóvão do Sul', 'São Domingos', 'São Francisco do Sul', 'São Joaquim', 'São José', 'São José do Cedro', 'São José do Cerrito', 'São João Batista', 'São João do Itaperiú', 'São João do Oeste', 'São João do Sul', 'São Lourenço do Oeste', 'São Ludgero', 'São Martinho', 'São Miguel da Boa Vista', 'São Miguel do Oeste', 'São Pedro de Alcântara', 'Taió', 'Tangará', 'Tigrinhos', 'Tijucas', 'Timbé do Sul', 'Timbó', 'Timbó Grande', 'Treviso', 'Treze Tílias', 'Treze de Maio', 'Trombudo Central', 'Três Barras', 'Tubarão', 'Tunápolis', 'Turvo', 'União do Oeste', 'Urubici', 'Urupema', 'Urussanga', 'Vargem', 'Vargem Bonita', 'Vargeão', 'Vidal Ramos', 'Videira', 'Vitor Meireles', 'Witmarsum', 'Xanxerê', 'Xavantina', 'Xaxim', 'Zortéa', 'Água Doce', 'Águas Frias', 'Águas Mornas', 'Águas de Chapecó'],
  PE: ['Abreu e Lima', 'Afogados da Ingazeira', 'Afrânio', 'Agrestina', 'Alagoinha', 'Aliança', 'Altinho', 'Amaraji', 'Angelim', 'Araripina', 'Araçoiaba', 'Arcoverde', 'Barra de Guabiraba', 'Barreiros', 'Belo Jardim', 'Belém de Maria', 'Belém do São Francisco', 'Betânia', 'Bezerros', 'Bodocó', 'Bom Conselho', 'Bom Jardim', 'Bonito', 'Brejinho', 'Brejo da Madre de Deus', 'Brejão', 'Buenos Aires', 'Buíque', 'Cabo de Santo Agostinho', 'Cabrobó', 'Cachoeirinha', 'Caetés', 'Calumbi', 'Calçado', 'Camaragibe', 'Camocim de São Félix', 'Camutanga', 'Canhotinho', 'Capoeiras', 'Carnaubeira da Penha', 'Carnaíba', 'Carpina', 'Caruaru', 'Casinhas', 'Catende', 'Cedro', 'Chã Grande', 'Chã de Alegria', 'Condado', 'Correntes', 'Cortês', 'Cumaru', 'Cupira', 'Custódia', 'Dormentes', 'Escada', 'Exu', 'Feira Nova', 'Fernando de Noronha', 'Ferreiros', 'Flores', 'Floresta', 'Frei Miguelinho', 'Gameleira', 'Garanhuns', 'Glória do Goitá', 'Goiana', 'Granito', 'Gravatá', 'Iati', 'Ibimirim', 'Ibirajuba', 'Igarassu', 'Iguaracy', 'Ilha de Itamaracá', 'Inajá', 'Ingazeira', 'Ipojuca', 'Ipubi', 'Itacuruba', 'Itambé', 'Itapetim', 'Itapissuma', 'Itaquitinga', 'Itaíba', 'Jaboatão dos Guararapes', 'Jaqueira', 'Jataúba', 'Jatobá', 'Joaquim Nabuco', 'João Alfredo', 'Jucati', 'Jupi', 'Jurema', 'Lagoa Grande', 'Lagoa de Itaenga', 'Lagoa do Carro', 'Lagoa do Ouro', 'Lagoa dos Gatos', 'Lajedo', 'Limoeiro', 'Macaparana', 'Machados', 'Manari', 'Maraial', 'Mirandiba', 'Moreilândia', 'Moreno', 'Nazaré da Mata', 'Olinda', 'Orobó', 'Orocó', 'Ouricuri', 'Palmares', 'Palmeirina', 'Panelas', 'Paranatama', 'Parnamirim', 'Passira', 'Paudalho', 'Paulista', 'Pedra', 'Pesqueira', 'Petrolina', 'Petrolândia', 'Pombos', 'Poção', 'Primavera', 'Quipapá', 'Quixaba', 'Recife', 'Riacho das Almas', 'Ribeirão', 'Rio Formoso', 'Sairé', 'Salgadinho', 'Salgueiro', 'Saloá', 'Sanharó', 'Santa Cruz', 'Santa Cruz da Baixa Verde', 'Santa Cruz do Capibaribe', 'Santa Filomena', 'Santa Maria da Boa Vista', 'Santa Maria do Cambucá', 'Santa Terezinha', 'Serra Talhada', 'Serrita', 'Sertânia', 'Sirinhaém', 'Solidão', 'Surubim', 'São Benedito do Sul', 'São Bento do Una', 'São Caitano', 'São Joaquim do Monte', 'São José da Coroa Grande', 'São José do Belmonte', 'São José do Egito', 'São João', 'São Lourenço da Mata', 'São Vicente Férrer', 'Tabira', 'Tacaimbó', 'Tacaratu', 'Tamandaré', 'Taquaritinga do Norte', 'Terezinha', 'Terra Nova', 'Timbaúba', 'Toritama', 'Tracunhaém', 'Trindade', 'Triunfo', 'Tupanatinga', 'Tuparetama', 'Venturosa', 'Verdejante', 'Vertente do Lério', 'Vertentes', 'Vicência', 'Vitória de Santo Antão', 'Xexéu', 'Água Preta', 'Águas Belas'],
  TO: ['Abreulândia', 'Aguiarnópolis', 'Aliança do Tocantins', 'Almas', 'Alvorada', 'Ananás', 'Angico', 'Aparecida do Rio Negro', 'Aragominas', 'Araguacema', 'Araguanã', 'Araguatins', 'Araguaçu', 'Araguaína', 'Arapoema', 'Arraias', 'Augustinópolis', 'Aurora do Tocantins', 'Axixá do Tocantins', 'Babaçulândia', 'Bandeirantes do Tocantins', 'Barra do Ouro', 'Barrolândia', 'Bernardo Sayão', 'Bom Jesus do Tocantins', 'Brasilândia do Tocantins', 'Brejinho de Nazaré', 'Buriti do Tocantins', 'Cachoeirinha', 'Campos Lindos', 'Cariri do Tocantins', 'Carmolândia', 'Carrasco Bonito', 'Caseara', 'Centenário', 'Chapada da Natividade', 'Chapada de Areia', 'Colinas do Tocantins', 'Colméia', 'Combinado', 'Conceição do Tocantins', 'Couto Magalhães', 'Cristalândia', 'Crixás do Tocantins', 'Darcinópolis', 'Dianópolis', 'Divinópolis do Tocantins', 'Dois Irmãos do Tocantins', 'Dueré', 'Esperantina', 'Figueirópolis', 'Filadélfia', 'Formoso do Araguaia', 'Fátima', 'Goianorte', 'Goiatins', 'Guaraí', 'Gurupi', 'Ipueiras', 'Itacajá', 'Itaguatins', 'Itapiratins', 'Itaporã do Tocantins', 'Jaú do Tocantins', 'Juarina', 'Lagoa da Confusão', 'Lagoa do Tocantins', 'Lajeado', 'Lavandeira', 'Lizarda', 'Luzinópolis', 'Marianópolis do Tocantins', 'Mateiros', 'Maurilândia do Tocantins', 'Miracema do Tocantins', 'Miranorte', 'Monte Santo do Tocantins', 'Monte do Carmo', 'Muricilândia', 'Natividade', 'Nazaré', 'Nova Olinda', 'Nova Rosalândia', 'Novo Acordo', 'Novo Alegre', 'Novo Jardim', 'Oliveira de Fátima', 'Palmas', 'Palmeirante', 'Palmeiras do Tocantins', 'Palmeirópolis', 'Paranã', 'Paraíso do Tocantins', "Pau D'Arco", 'Pedro Afonso', 'Peixe', 'Pequizeiro', 'Pindorama do Tocantins', 'Piraquê', 'Pium', 'Ponte Alta do Bom Jesus', 'Ponte Alta do Tocantins', 'Porto Alegre do Tocantins', 'Porto Nacional', 'Praia Norte', 'Presidente Kennedy', 'Pugmil', 'Recursolândia', 'Riachinho', 'Rio Sono', 'Rio da Conceição', 'Rio dos Bois', 'Sampaio', 'Sandolândia', 'Santa Fé do Araguaia', 'Santa Maria do Tocantins', 'Santa Rita do Tocantins', 'Santa Rosa do Tocantins', 'Santa Tereza do Tocantins', 'Santa Terezinha do Tocantins', 'Silvanópolis', 'Sucupira', 'São Bento do Tocantins', 'São Félix do Tocantins', 'São Miguel do Tocantins', 'São Salvador do Tocantins', 'São Sebastião do Tocantins', 'São Valério', 'Sítio Novo do Tocantins', 'Tabocão', 'Taguatinga', 'Taipas do Tocantins', 'Talismã', 'Tocantinópolis', 'Tocantínia', 'Tupirama', 'Tupiratins', 'Wanderlândia', 'Xambioá'],
  RN: ['Acari', 'Afonso Bezerra', 'Alexandria', 'Almino Afonso', 'Alto do Rodrigues', 'Angicos', 'Antônio Martins', 'Apodi', 'Areia Branca', 'Arês', 'Açu', 'Baraúna', 'Barcelona', 'Baía Formosa', 'Bento Fernandes', 'Bodó', 'Bom Jesus', 'Brejinho', 'Caicó', 'Caiçara do Norte', 'Caiçara do Rio do Vento', 'Campo Grande', 'Campo Redondo', 'Canguaretama', 'Caraúbas', 'Carnaubais', 'Carnaúba dos Dantas', 'Ceará-Mirim', 'Cerro Corá', 'Coronel Ezequiel', 'Coronel João Pessoa', 'Cruzeta', 'Currais Novos', 'Doutor Severiano', 'Encanto', 'Equador', 'Espírito Santo', 'Extremoz', 'Felipe Guerra', 'Fernando Pedroza', 'Florânia', 'Francisco Dantas', 'Frutuoso Gomes', 'Galinhos', 'Goianinha', 'Governador Dix-Sept Rosado', 'Grossos', 'Guamaré', 'Ielmo Marinho', 'Ipanguaçu', 'Ipueira', 'Itajá', 'Itaú', 'Jandaíra', 'Janduís', 'Januário Cicco', 'Japi', 'Jardim de Angicos', 'Jardim de Piranhas', 'Jardim do Seridó', 'Jaçanã', 'José da Penha', 'João Câmara', 'João Dias', 'Jucurutu', 'Jundiá', 'Lagoa Nova', 'Lagoa Salgada', "Lagoa d'Anta", 'Lagoa de Pedras', 'Lagoa de Velhos', 'Lajes', 'Lajes Pintadas', 'Lucrécia', 'Luís Gomes', 'Macau', 'Macaíba', 'Major Sales', 'Marcelino Vieira', 'Martins', 'Maxaranguape', 'Messias Targino', 'Montanhas', 'Monte Alegre', 'Monte das Gameleiras', 'Mossoró', 'Natal', 'Nova Cruz', 'Nísia Floresta', "Olho d'Água do Borges", 'Ouro Branco', 'Paraná', 'Parazinho', 'Paraú', 'Parelhas', 'Parnamirim', 'Passa e Fica', 'Passagem', 'Patu', 'Pau dos Ferros', 'Pedra Grande', 'Pedra Preta', 'Pedro Avelino', 'Pedro Velho', 'Pendências', 'Pilões', 'Portalegre', 'Porto do Mangue', 'Poço Branco', 'Pureza', 'Rafael Fernandes', 'Rafael Godeiro', 'Riacho da Cruz', 'Riacho de Santana', 'Riachuelo', 'Rio do Fogo', 'Rodolfo Fernandes', 'Ruy Barbosa', 'Santa Cruz', 'Santa Maria', 'Santana do Matos', 'Santana do Seridó', 'Santo Antônio', 'Senador Elói de Souza', 'Senador Georgino Avelino', 'Serra Caiada', 'Serra Negra do Norte', 'Serra de São Bento', 'Serra do Mel', 'Serrinha', 'Serrinha dos Pintos', 'Severiano Melo', 'São Bento do Norte', 'São Bento do Trairí', 'São Fernando', 'São Francisco do Oeste', 'São Gonçalo do Amarante', 'São José de Mipibu', 'São José do Campestre', 'São José do Seridó', 'São João do Sabugi', 'São Miguel', 'São Miguel do Gostoso', 'São Paulo do Potengi', 'São Pedro', 'São Rafael', 'São Tomé', 'São Vicente', 'Sítio Novo', 'Taboleiro Grande', 'Taipu', 'Tangará', 'Tenente Ananias', 'Tenente Laurentino Cruz', 'Tibau', 'Tibau do Sul', 'Timbaúba dos Batistas', 'Touros', 'Triunfo Potiguar', 'Umarizal', 'Upanema', 'Venha-Ver', 'Vera Cruz', 'Vila Flor', 'Viçosa', 'Várzea', 'Água Nova'],
  PI: ['Acauã', 'Agricolândia', 'Alagoinha do Piauí', 'Alegrete do Piauí', 'Alto Longá', 'Altos', 'Alvorada do Gurguéia', 'Amarante', 'Angical do Piauí', 'Antônio Almeida', 'Anísio de Abreu', 'Aroazes', 'Aroeiras do Itaim', 'Arraial', 'Assunção do Piauí', 'Avelino Lopes', 'Baixa Grande do Ribeiro', "Barra D'Alcântara", 'Barras', 'Barreiras do Piauí', 'Barro Duro', 'Batalha', 'Bela Vista do Piauí', 'Belém do Piauí', 'Beneditinos', 'Bertolínia', 'Betânia do Piauí', 'Boa Hora', 'Bocaina', 'Bom Jesus', 'Bom Princípio do Piauí', 'Bonfim do Piauí', 'Boqueirão do Piauí', 'Brasileira', 'Brejo do Piauí', 'Buriti dos Lopes', 'Buriti dos Montes', 'Cabeceiras do Piauí', 'Cajazeiras do Piauí', 'Cajueiro da Praia', 'Caldeirão Grande do Piauí', 'Campinas do Piauí', 'Campo Alegre do Fidalgo', 'Campo Grande do Piauí', 'Campo Largo do Piauí', 'Campo Maior', 'Canavieira', 'Canto do Buriti', 'Capitão Gervásio Oliveira', 'Capitão de Campos', 'Caracol', 'Caraúbas do Piauí', 'Caridade do Piauí', 'Castelo do Piauí', 'Caxingó', 'Cocal', 'Cocal de Telha', 'Cocal dos Alves', 'Coivaras', 'Colônia do Gurguéia', 'Colônia do Piauí', 'Conceição do Canindé', 'Coronel José Dias', 'Corrente', 'Cristalândia do Piauí', 'Cristino Castro', 'Curimatá', 'Currais', 'Curral Novo do Piauí', 'Curralinhos', 'Demerval Lobão', 'Dirceu Arcoverde', 'Dom Expedito Lopes', 'Dom Inocêncio', 'Domingos Mourão', 'Elesbão Veloso', 'Eliseu Martins', 'Esperantina', 'Fartura do Piauí', 'Flores do Piauí', 'Floresta do Piauí', 'Floriano', 'Francinópolis', 'Francisco Ayres', 'Francisco Macedo', 'Francisco Santos', 'Fronteiras', 'Geminiano', 'Gilbués', 'Guadalupe', 'Guaribas', 'Hugo Napoleão', 'Ilha Grande', 'Inhuma', 'Ipiranga do Piauí', 'Isaías Coelho', 'Itainópolis', 'Itaueira', 'Jacobina do Piauí', 'Jaicós', 'Jardim do Mulato', 'Jatobá do Piauí', 'Jerumenha', 'Joaquim Pires', 'Joca Marques', 'José de Freitas', 'João Costa', 'Juazeiro do Piauí', 'Jurema', 'Júlio Borges', 'Lagoa Alegre', 'Lagoa de São Francisco', 'Lagoa do Barro do Piauí', 'Lagoa do Piauí', 'Lagoa do Sítio', 'Lagoinha do Piauí', 'Landri Sales', 'Luzilândia', 'Luís Correia', 'Madeiro', 'Manoel Emídio', 'Marcolândia', 'Marcos Parente', 'Massapê do Piauí', 'Matias Olímpio', 'Miguel Alves', 'Miguel Leão', 'Milton Brandão', 'Monsenhor Gil', 'Monsenhor Hipólito', 'Monte Alegre do Piauí', 'Morro Cabeça no Tempo', 'Morro do Chapéu do Piauí', 'Murici dos Portelas', 'Nazaré do Piauí', 'Nazária', 'Nossa Senhora de Nazaré', 'Nossa Senhora dos Remédios', 'Nova Santa Rita', 'Novo Oriente do Piauí', 'Novo Santo Antônio', 'Oeiras', "Olho D'Água do Piauí", 'Padre Marcos', 'Paes Landim', 'Pajeú do Piauí', 'Palmeira do Piauí', 'Palmeirais', 'Paquetá', 'Parnaguá', 'Parnaíba', 'Passagem Franca do Piauí', 'Patos do Piauí', "Pau D'Arco do Piauí", 'Paulistana', 'Pavussu', 'Pedro II', 'Pedro Laurentino', 'Picos', 'Pimenteiras', 'Pio IX', 'Piracuruca', 'Piripiri', 'Porto', 'Porto Alegre do Piauí', 'Prata do Piauí', 'Queimada Nova', 'Redenção do Gurguéia', 'Regeneração', 'Riacho Frio', 'Ribeira do Piauí', 'Ribeiro Gonçalves', 'Rio Grande do Piauí', 'Santa Cruz do Piauí', 'Santa Cruz dos Milagres', 'Santa Filomena', 'Santa Luz', 'Santa Rosa do Piauí', 'Santana do Piauí', 'Santo Antônio de Lisboa', 'Santo Antônio dos Milagres', 'Santo Inácio do Piauí', 'Sebastião Barros', 'Sebastião Leal', 'Sigefredo Pacheco', 'Simplício Mendes', 'Simões', 'Socorro do Piauí', 'Sussuapara', 'São Braz do Piauí', 'São Francisco de Assis do Piauí', 'São Francisco do Piauí', 'São Félix do Piauí', 'São Gonçalo do Gurguéia', 'São Gonçalo do Piauí', 'São José do Divino', 'São José do Peixe', 'São José do Piauí', 'São João da Canabrava', 'São João da Fronteira', 'São João da Serra', 'São João da Varjota', 'São João do Arraial', 'São João do Piauí', 'São Julião', 'São Lourenço do Piauí', 'São Luis do Piauí', 'São Miguel da Baixa Grande', 'São Miguel do Fidalgo', 'São Miguel do Tapuio', 'São Pedro do Piauí', 'São Raimundo Nonato', 'Tamboril do Piauí', 'Tanque do Piauí', 'Teresina', 'União', 'Uruçuí', 'Valença do Piauí', 'Vera Mendes', 'Vila Nova do Piauí', 'Várzea Branca', 'Várzea Grande', 'Wall Ferraz', 'Água Branca'],
  RS: ['Aceguá', 'Agudo', 'Ajuricaba', 'Alecrim', 'Alegrete', 'Alegria', 'Almirante Tamandaré do Sul', 'Alpestre', 'Alto Alegre', 'Alto Feliz', 'Alvorada', 'Amaral Ferrador', 'Ametista do Sul', 'André da Rocha', 'Anta Gorda', 'Antônio Prado', 'Arambaré', 'Araricá', 'Aratiba', 'Arroio Grande', 'Arroio do Meio', 'Arroio do Padre', 'Arroio do Sal', 'Arroio do Tigre', 'Arroio dos Ratos', 'Arvorezinha', 'Augusto Pestana', 'Bagé', 'Balneário Pinhal', 'Barra Funda', 'Barra do Guarita', 'Barra do Quaraí', 'Barra do Ribeiro', 'Barra do Rio Azul', 'Barracão', 'Barros Cassal', 'Barão', 'Barão de Cotegipe', 'Barão do Triunfo', 'Benjamin Constant do Sul', 'Bento Gonçalves', 'Boa Vista das Missões', 'Boa Vista do Buricá', 'Boa Vista do Cadeado', 'Boa Vista do Incra', 'Boa Vista do Sul', 'Bom Jesus', 'Bom Princípio', 'Bom Progresso', 'Bom Retiro do Sul', 'Boqueirão do Leão', 'Bossoroca', 'Bozano', 'Braga', 'Brochier', 'Butiá', 'Cacequi', 'Cachoeira do Sul', 'Cachoeirinha', 'Cacique Doble', 'Caibaté', 'Caiçara', 'Camaquã', 'Camargo', 'Cambará do Sul', 'Campestre da Serra', 'Campina das Missões', 'Campinas do Sul', 'Campo Bom', 'Campo Novo', 'Campos Borges', 'Candelária', 'Candiota', 'Canela', 'Canguçu', 'Canoas', 'Canudos do Vale', 'Capela de Santana', 'Capitão', 'Capivari do Sul', 'Capão Bonito do Sul', 'Capão da Canoa', 'Capão do Cipó', 'Capão do Leão', 'Carazinho', 'Caraá', 'Carlos Barbosa', 'Carlos Gomes', 'Casca', 'Caseiros', 'Catuípe', 'Caxias do Sul', 'Caçapava do Sul', 'Centenário', 'Cerrito', 'Cerro Branco', 'Cerro Grande', 'Cerro Grande do Sul', 'Cerro Largo', 'Chapada', 'Charqueadas', 'Charrua', 'Chiapetta', 'Chuvisca', 'Chuí', 'Cidreira', 'Ciríaco', 'Colinas', 'Colorado', 'Condor', 'Constantina', 'Coqueiro Baixo', 'Coqueiros do Sul', 'Coronel Barros', 'Coronel Bicaco', 'Coronel Pilar', 'Cotiporã', 'Coxilha', 'Crissiumal', 'Cristal', 'Cristal do Sul', 'Cruz Alta', 'Cruzaltense', 'Cruzeiro do Sul', 'Cândido Godói', 'David Canabarro', 'Derrubadas', 'Dezesseis de Novembro', 'Dilermando de Aguiar', 'Dois Irmãos', 'Dois Irmãos das Missões', 'Dois Lajeados', 'Dom Feliciano', 'Dom Pedrito', 'Dom Pedro de Alcântara', 'Dona Francisca', 'Doutor Maurício Cardoso', 'Doutor Ricardo', 'Eldorado do Sul', 'Encantado', 'Encruzilhada do Sul', 'Engenho Velho', 'Entre Rios do Sul', 'Entre-Ijuís', 'Erebango', 'Erechim', 'Ernestina', 'Erval Grande', 'Erval Seco', 'Esmeralda', 'Esperança do Sul', 'Espumoso', 'Estação', 'Esteio', 'Estrela', 'Estrela Velha', 'Estância Velha', 'Eugênio de Castro', 'Fagundes Varela', 'Farroupilha', 'Faxinal do Soturno', 'Faxinalzinho', 'Fazenda Vilanova', 'Feliz', 'Flores da Cunha', 'Floriano Peixoto', 'Fontoura Xavier', 'Formigueiro', 'Forquetinha', 'Fortaleza dos Valos', 'Frederico Westphalen', 'Garibaldi', 'Garruchos', 'Gaurama', 'General Câmara', 'Gentil', 'Getúlio Vargas', 'Giruá', 'Glorinha', 'Gramado', 'Gramado Xavier', 'Gramado dos Loureiros', 'Gravataí', 'Guabiju', 'Guaporé', 'Guarani das Missões', 'Guaíba', 'Harmonia', 'Herval', 'Herveiras', 'Horizontina', 'Hulha Negra', 'Humaitá', 'Ibarama', 'Ibiaçá', 'Ibiraiaras', 'Ibirapuitã', 'Ibirubá', 'Igrejinha', 'Ijuí', 'Ilópolis', 'Imbé', 'Imigrante', 'Independência', 'Inhacorá', 'Ipiranga do Sul', 'Ipê', 'Iraí', 'Itaara', 'Itacurubi', 'Itapuca', 'Itaqui', 'Itati', 'Itatiba do Sul', 'Ivorá', 'Ivoti', 'Jaboticaba', 'Jacuizinho', 'Jacutinga', 'Jaguari', 'Jaguarão', 'Jaquirana', 'Jari', 'Jóia', 'Júlio de Castilhos', 'Lagoa Bonita do Sul', 'Lagoa Vermelha', 'Lagoa dos Três Cantos', 'Lagoão', 'Lajeado', 'Lajeado do Bugre', 'Lavras do Sul', 'Liberato Salzano', 'Lindolfo Collor', 'Linha Nova', 'Machadinho', 'Mampituba', 'Manoel Viana', 'Maquiné', 'Maratá', 'Marau', 'Marcelino Ramos', 'Mariana Pimentel', 'Mariano Moro', 'Marques de Souza', 'Mata', 'Mato Castelhano', 'Mato Leitão', 'Mato Queimado', 'Maximiliano de Almeida', 'Maçambará', 'Minas do Leão', 'Miraguaí', 'Montauri', 'Monte Alegre dos Campos', 'Monte Belo do Sul', 'Montenegro', 'Mormaço', 'Morrinhos do Sul', 'Morro Redondo', 'Morro Reuter', 'Mostardas', 'Muitos Capões', 'Muliterno', 'Muçum', 'Nicolau Vergueiro', 'Nonoai', 'Nova Alvorada', 'Nova Araçá', 'Nova Bassano', 'Nova Boa Vista', 'Nova Bréscia', 'Nova Candelária', 'Nova Esperança do Sul', 'Nova Hartz', 'Nova Palma', 'Nova Petrópolis', 'Nova Prata', 'Nova Pádua', 'Nova Ramada', 'Nova Roma do Sul', 'Nova Santa Rita', 'Novo Barreiro', 'Novo Cabrais', 'Novo Hamburgo', 'Novo Machado', 'Novo Tiradentes', 'Novo Xingu', 'Não-Me-Toque', 'Osório', 'Paim Filho', 'Palmares do Sul', 'Palmeira das Missões', 'Palmitinho', 'Panambi', 'Pantano Grande', 'Paraí', 'Paraíso do Sul', 'Pareci Novo', 'Parobé', 'Passa Sete', 'Passo Fundo', 'Passo do Sobrado', 'Paulo Bento', 'Paverama', 'Pedras Altas', 'Pedro Osório', 'Pejuçara', 'Pelotas', 'Picada Café', 'Pinhal', 'Pinhal Grande', 'Pinhal da Serra', 'Pinheirinho do Vale', 'Pinheiro Machado', 'Pinto Bandeira', 'Pirapó', 'Piratini', 'Planalto', 'Ponte Preta', 'Pontão', 'Porto Alegre', 'Porto Lucena', 'Porto Mauá', 'Porto Vera Cruz', 'Porto Xavier', 'Portão', 'Pouso Novo', 'Poço das Antas', 'Presidente Lucena', 'Progresso', 'Protásio Alves', 'Putinga', 'Quaraí', 'Quatro Irmãos', 'Quevedos', 'Quinze de Novembro', 'Redentora', 'Relvado', 'Restinga Sêca', 'Rio Grande', 'Rio Pardo', 'Rio dos Índios', 'Riozinho', 'Roca Sales', 'Rodeio Bonito', 'Rolador', 'Rolante', 'Ronda Alta', 'Rondinha', 'Roque Gonzales', 'Rosário do Sul', 'Sagrada Família', 'Saldanha Marinho', 'Salto do Jacuí', 'Salvador das Missões', 'Salvador do Sul', 'Sananduva', "Sant'Ana do Livramento", 'Santa Bárbara do Sul', 'Santa Cecília do Sul', 'Santa Clara do Sul', 'Santa Cruz do Sul', 'Santa Margarida do Sul', 'Santa Maria', 'Santa Maria do Herval', 'Santa Rosa', 'Santa Tereza', 'Santa Vitória do Palmar', 'Santana da Boa Vista', 'Santiago', 'Santo Antônio da Patrulha', 'Santo Antônio das Missões', 'Santo Antônio do Palma', 'Santo Antônio do Planalto', 'Santo Augusto', 'Santo Cristo', 'Santo Expedito do Sul', 'Santo Ângelo', 'Sapiranga', 'Sapucaia do Sul', 'Sarandi', 'Seberi', 'Sede Nova', 'Segredo', 'Selbach', 'Senador Salgado Filho', 'Sentinela do Sul', 'Serafina Corrêa', 'Sertão', 'Sertão Santana', 'Sete de Setembro', 'Severiano de Almeida', 'Silveira Martins', 'Sinimbu', 'Sobradinho', 'Soledade', 'São Borja', 'São Domingos do Sul', 'São Francisco de Assis', 'São Francisco de Paula', 'São Gabriel', 'São Jerônimo', 'São Jorge', 'São José das Missões', 'São José do Herval', 'São José do Hortêncio', 'São José do Inhacorá', 'São José do Norte', 'São José do Ouro', 'São José do Sul', 'São José dos Ausentes', 'São João da Urtiga', 'São João do Polêsine', 'São Leopoldo', 'São Lourenço do Sul', 'São Luiz Gonzaga', 'São Marcos', 'São Martinho', 'São Martinho da Serra', 'São Miguel das Missões', 'São Nicolau', 'São Paulo das Missões', 'São Pedro da Serra', 'São Pedro das Missões', 'São Pedro do Butiá', 'São Pedro do Sul', 'São Sebastião do Caí', 'São Sepé', 'São Valentim', 'São Valentim do Sul', 'São Valério do Sul', 'São Vendelino', 'São Vicente do Sul', 'Sério', 'Tabaí', 'Tapejara', 'Tapera', 'Tapes', 'Taquara', 'Taquari', 'Taquaruçu do Sul', 'Tavares', 'Tenente Portela', 'Terra de Areia', 'Teutônia', 'Tio Hugo', 'Tiradentes do Sul', 'Toropi', 'Torres', 'Tramandaí', 'Travesseiro', 'Trindade do Sul', 'Triunfo', 'Três Arroios', 'Três Cachoeiras', 'Três Coroas', 'Três Forquilhas', 'Três Palmeiras', 'Três Passos', 'Três de Maio', 'Tucunduva', 'Tunas', 'Tupanci do Sul', 'Tupanciretã', 'Tupandi', 'Tuparendi', 'Turuçu', 'Ubiretama', 'Unistalda', 'União da Serra', 'Uruguaiana', 'Vacaria', 'Vale Real', 'Vale Verde', 'Vale do Sol', 'Vanini', 'Venâncio Aires', 'Vera Cruz', 'Veranópolis', 'Vespasiano Corrêa', 'Viadutos', 'Viamão', 'Vicente Dutra', 'Victor Graeff', 'Vila Flores', 'Vila Lângaro', 'Vila Maria', 'Vila Nova do Sul', 'Vista Alegre', 'Vista Alegre do Prata', 'Vista Gaúcha', 'Vitória das Missões', 'Westfália', 'Xangri-lá', 'Água Santa', 'Áurea'],
  MT: ['Acorizal', 'Alta Floresta', 'Alto Araguaia', 'Alto Boa Vista', 'Alto Garças', 'Alto Paraguai', 'Alto Taquari', 'Apiacás', 'Araguaiana', 'Araguainha', 'Araputanga', 'Arenápolis', 'Aripuanã', 'Barra do Bugres', 'Barra do Garças', 'Barão de Melgaço', 'Bom Jesus do Araguaia', 'Brasnorte', 'Campinápolis', 'Campo Novo do Parecis', 'Campo Verde', 'Campos de Júlio', 'Canabrava do Norte', 'Canarana', 'Carlinda', 'Castanheira', 'Chapada dos Guimarães', 'Cláudia', 'Cocalinho', 'Colniza', 'Colíder', 'Comodoro', 'Confresa', "Conquista D'Oeste", 'Cotriguaçu', 'Cuiabá', 'Curvelândia', 'Cáceres', 'Denise', 'Diamantino', 'Dom Aquino', 'Feliz Natal', "Figueirópolis D'Oeste", 'Gaúcha do Norte', 'General Carneiro', "Glória D'Oeste", 'Guarantã do Norte', 'Guiratinga', 'Indiavaí', 'Ipiranga do Norte', 'Itanhangá', 'Itaúba', 'Itiquira', 'Jaciara', 'Jangada', 'Jauru', 'Juara', 'Juruena', 'Juscimeira', 'Juína', "Lambari D'Oeste", 'Lucas do Rio Verde', 'Luciara', 'Marcelândia', 'Matupá', "Mirassol d'Oeste", 'Nobres', 'Nortelândia', 'Nossa Senhora do Livramento', 'Nova Bandeirantes', 'Nova Brasilândia', 'Nova Canaã do Norte', 'Nova Guarita', 'Nova Lacerda', 'Nova Marilândia', 'Nova Maringá', 'Nova Monte Verde', 'Nova Mutum', 'Nova Nazaré', 'Nova Olímpia', 'Nova Santa Helena', 'Nova Ubiratã', 'Nova Xavantina', 'Novo Horizonte do Norte', 'Novo Mundo', 'Novo Santo Antônio', 'Novo São Joaquim', 'Paranatinga', 'Paranaíta', 'Pedra Preta', 'Peixoto de Azevedo', 'Planalto da Serra', 'Poconé', 'Pontal do Araguaia', 'Ponte Branca', 'Pontes e Lacerda', 'Porto Alegre do Norte', 'Porto Esperidião', 'Porto Estrela', 'Porto dos Gaúchos', 'Poxoréu', 'Primavera do Leste', 'Querência', 'Reserva do Cabaçal', 'Ribeirão Cascalheira', 'Ribeirãozinho', 'Rio Branco', 'Rondolândia', 'Rondonópolis', 'Rosário Oeste', 'Salto do Céu', 'Santa Carmem', 'Santa Cruz do Xingu', 'Santa Rita do Trivelato', 'Santa Terezinha', 'Santo Afonso', 'Santo Antônio do Leste', 'Santo Antônio do Leverger', 'Sapezal', 'Serra Nova Dourada', 'Sinop', 'Sorriso', 'São Félix do Araguaia', 'São José do Povo', 'São José do Rio Claro', 'São José do Xingu', 'São José dos Quatro Marcos', 'São Pedro da Cipa', 'Tabaporã', 'Tangará da Serra', 'Tapurah', 'Terra Nova do Norte', 'Tesouro', 'Torixoréu', 'União do Sul', 'Vale de São Domingos', 'Vera', 'Vila Bela da Santíssima Trindade', 'Vila Rica', 'Várzea Grande', 'Água Boa'],
  AC: ['Acrelândia', 'Assis Brasil', 'Brasiléia', 'Bujari', 'Capixaba', 'Cruzeiro do Sul', 'Epitaciolândia', 'Feijó', 'Jordão', 'Manoel Urbano', 'Marechal Thaumaturgo', 'Mâncio Lima', 'Plácido de Castro', 'Porto Acre', 'Porto Walter', 'Rio Branco', 'Rodrigues Alves', 'Santa Rosa do Purus', 'Sena Madureira', 'Senador Guiomard', 'Tarauacá', 'Xapuri'],
  SP: ['Adamantina', 'Adolfo', 'Aguaí', 'Agudos', 'Alambari', 'Alfredo Marcondes', 'Altair', 'Altinópolis', 'Alto Alegre', 'Alumínio', 'Alvinlândia', 'Americana', 'Amparo', 'Américo Brasiliense', 'Américo de Campos', 'Analândia', 'Andradina', 'Angatuba', 'Anhembi', 'Anhumas', 'Aparecida', "Aparecida d'Oeste", 'Apiaí', 'Aramina', 'Arandu', 'Arapeí', 'Araraquara', 'Araras', 'Araçariguama', 'Araçatuba', 'Araçoiaba da Serra', 'Arco-Íris', 'Arealva', 'Areias', 'Areiópolis', 'Ariranha', 'Artur Nogueira', 'Arujá', 'Aspásia', 'Assis', 'Atibaia', 'Auriflama', 'Avanhandava', 'Avaré', 'Avaí', 'Bady Bassitt', 'Balbinos', 'Bananal', 'Barbosa', 'Bariri', 'Barra Bonita', 'Barra do Chapéu', 'Barra do Turvo', 'Barretos', 'Barrinha', 'Barueri', 'Barão de Antonina', 'Bastos', 'Batatais', 'Bauru', 'Bebedouro', 'Bento de Abreu', 'Bernardino de Campos', 'Bertioga', 'Bilac', 'Birigui', 'Biritiba Mirim', 'Boa Esperança do Sul', 'Bocaina', 'Bofete', 'Boituva', 'Bom Jesus dos Perdões', 'Bom Sucesso de Itararé', 'Boracéia', 'Borborema', 'Borebi', 'Borá', 'Botucatu', 'Bragança Paulista', 'Braúna', 'Brejo Alegre', 'Brodowski', 'Brotas', 'Buri', 'Buritama', 'Buritizal', 'Bálsamo', 'Cabreúva', 'Cabrália Paulista', 'Cachoeira Paulista', 'Caconde', 'Cafelândia', 'Caiabu', 'Caieiras', 'Caiuá', 'Cajamar', 'Cajati', 'Cajobi', 'Cajuru', 'Campina do Monte Alegre', 'Campinas', 'Campo Limpo Paulista', 'Campos Novos Paulista', 'Campos do Jordão', 'Cananéia', 'Canas', 'Canitar', 'Capela do Alto', 'Capivari', 'Capão Bonito', 'Caraguatatuba', 'Carapicuíba', 'Cardoso', 'Casa Branca', 'Castilho', 'Catanduva', 'Catiguá', 'Caçapava', 'Cedral', 'Cerqueira César', 'Cerquilho', 'Cesário Lange', 'Charqueada', 'Chavantes', 'Clementina', 'Colina', 'Colômbia', 'Conchal', 'Conchas', 'Cordeirópolis', 'Coroados', 'Coronel Macedo', 'Corumbataí', 'Cosmorama', 'Cosmópolis', 'Cotia', 'Cravinhos', 'Cristais Paulista', 'Cruzeiro', 'Cruzália', 'Cubatão', 'Cunha', 'Cássia dos Coqueiros', 'Cândido Mota', 'Cândido Rodrigues', 'Descalvado', 'Diadema', 'Dirce Reis', 'Divinolândia', 'Dobrada', 'Dois Córregos', 'Dolcinópolis', 'Dourado', 'Dracena', 'Duartina', 'Dumont', 'Echaporã', 'Eldorado', 'Elias Fausto', 'Elisiário', 'Embaúba', 'Embu das Artes', 'Embu-Guaçu', 'Emilianópolis', 'Engenheiro Coelho', 'Espírito Santo do Pinhal', 'Espírito Santo do Turvo', 'Estiva Gerbi', "Estrela d'Oeste", 'Estrela do Norte', 'Euclides da Cunha Paulista', 'Fartura', 'Fernando Prestes', 'Fernandópolis', 'Fernão', 'Ferraz de Vasconcelos', 'Flora Rica', 'Floreal', 'Florínea', 'Flórida Paulista', 'Franca', 'Francisco Morato', 'Franco da Rocha', 'Gabriel Monteiro', 'Garça', 'Gastão Vidigal', 'Gavião Peixoto', 'General Salgado', 'Getulina', 'Glicério', 'Guaimbê', 'Guaiçara', 'Guapiara', 'Guapiaçu', 'Guaraci', "Guarani d'Oeste", 'Guarantã', 'Guararapes', 'Guararema', 'Guaratinguetá', 'Guaraçaí', 'Guareí', 'Guariba', 'Guarujá', 'Guarulhos', 'Guará', 'Guatapará', 'Guaíra', 'Guzolândia', 'Gália', 'Herculândia', 'Holambra', 'Hortolândia', 'Iacanga', 'Iacri', 'Iaras', 'Ibaté', 'Ibirarema', 'Ibirá', 'Ibitinga', 'Ibiúna', 'Icém', 'Iepê', 'Igarapava', 'Igaratá', 'Igaraçu do Tietê', 'Iguape', 'Ilha Comprida', 'Ilha Solteira', 'Ilhabela', 'Indaiatuba', 'Indiana', 'Indiaporã', 'Inúbia Paulista', 'Ipaussu', 'Iperó', 'Ipeúna', 'Ipiguá', 'Iporanga', 'Ipuã', 'Iracemápolis', 'Irapuru', 'Irapuã', 'Itaberá', 'Itajobi', 'Itaju', 'Itanhaém', 'Itaoca', 'Itapecerica da Serra', 'Itapetininga', 'Itapeva', 'Itapevi', 'Itapira', 'Itapirapuã Paulista', 'Itaporanga', 'Itapura', 'Itapuí', 'Itaquaquecetuba', 'Itararé', 'Itariri', 'Itatiba', 'Itatinga', 'Itaí', 'Itirapina', 'Itirapuã', 'Itobi', 'Itu', 'Itupeva', 'Ituverava', 'Itápolis', 'Jaborandi', 'Jaboticabal', 'Jacareí', 'Jaci', 'Jacupiranga', 'Jaguariúna', 'Jales', 'Jambeiro', 'Jandira', 'Jardinópolis', 'Jarinu', 'Jaú', 'Jeriquara', 'Joanópolis', 'José Bonifácio', 'João Ramalho', 'Jumirim', 'Jundiaí', 'Junqueirópolis', 'Juquitiba', 'Juquiá', 'Júlio Mesquita', 'Lagoinha', 'Laranjal Paulista', 'Lavrinhas', 'Lavínia', 'Leme', 'Lençóis Paulista', 'Limeira', 'Lindóia', 'Lins', 'Lorena', 'Lourdes', 'Louveira', 'Lucianópolis', 'Lucélia', 'Luiziânia', 'Lupércio', 'Lutécia', 'Luís Antônio', 'Macatuba', 'Macaubal', 'Macedônia', 'Magda', 'Mairinque', 'Mairiporã', 'Manduri', 'Marabá Paulista', 'Maracaí', 'Marapoama', 'Marinópolis', 'Mariápolis', 'Martinópolis', 'Marília', 'Matão', 'Mauá', 'Mendonça', 'Meridiano', 'Mesópolis', 'Miguelópolis', 'Mineiros do Tietê', 'Mira Estrela', 'Miracatu', 'Mirandópolis', 'Mirante do Paranapanema', 'Mirassol', 'Mirassolândia', 'Mococa', 'Mogi Guaçu', 'Mogi Mirim', 'Mogi das Cruzes', 'Mombuca', 'Mongaguá', 'Monte Alegre do Sul', 'Monte Alto', 'Monte Aprazível', 'Monte Azul Paulista', 'Monte Castelo', 'Monte Mor', 'Monteiro Lobato', 'Monções', 'Morro Agudo', 'Morungaba', 'Motuca', 'Murutinga do Sul', 'Nantes', 'Narandiba', 'Natividade da Serra', 'Nazaré Paulista', 'Neves Paulista', 'Nhandeara', 'Nipoã', 'Nova Aliança', 'Nova Campina', 'Nova Canaã Paulista', 'Nova Castilho', 'Nova Europa', 'Nova Granada', 'Nova Guataporanga', 'Nova Independência', 'Nova Luzitânia', 'Nova Odessa', 'Novais', 'Novo Horizonte', 'Nuporanga', 'Ocauçu', 'Olímpia', 'Onda Verde', 'Oriente', 'Orindiúva', 'Orlândia', 'Osasco', 'Oscar Bressane', 'Osvaldo Cruz', 'Ourinhos', 'Ouro Verde', 'Ouroeste', 'Pacaembu', 'Palestina', 'Palmares Paulista', "Palmeira d'Oeste", 'Palmital', 'Panorama', 'Paraguaçu Paulista', 'Paraibuna', 'Paranapanema', 'Paranapuã', 'Parapuã', 'Paraíso', 'Pardinho', 'Pariquera-Açu', 'Parisi', 'Patrocínio Paulista', 'Paulicéia', 'Paulistânia', 'Paulo de Faria', 'Paulínia', 'Pederneiras', 'Pedra Bela', 'Pedranópolis', 'Pedregulho', 'Pedreira', 'Pedrinhas Paulista', 'Pedro de Toledo', 'Penápolis', 'Pereira Barreto', 'Pereiras', 'Peruíbe', 'Piacatu', 'Piedade', 'Pilar do Sul', 'Pindamonhangaba', 'Pindorama', 'Pinhalzinho', 'Piquerobi', 'Piquete', 'Piracaia', 'Piracicaba', 'Piraju', 'Pirajuí', 'Pirangi', 'Pirapora do Bom Jesus', 'Pirapozinho', 'Pirassununga', 'Piratininga', 'Pitangueiras', 'Planalto', 'Platina', 'Poloni', 'Pompéia', 'Pongaí', 'Pontal', 'Pontalinda', 'Pontes Gestal', 'Populina', 'Porangaba', 'Porto Feliz', 'Porto Ferreira', 'Potim', 'Potirendaba', 'Poá', 'Pracinha', 'Pradópolis', 'Praia Grande', 'Pratânia', 'Presidente Alves', 'Presidente Bernardes', 'Presidente Epitácio', 'Presidente Prudente', 'Presidente Venceslau', 'Promissão', 'Quadra', 'Quatá', 'Queiroz', 'Queluz', 'Quintana', 'Rafard', 'Rancharia', 'Redenção da Serra', 'Regente Feijó', 'Reginópolis', 'Registro', 'Restinga', 'Ribeira', 'Ribeirão Bonito', 'Ribeirão Branco', 'Ribeirão Corrente', 'Ribeirão Grande', 'Ribeirão Pires', 'Ribeirão Preto', 'Ribeirão do Sul', 'Ribeirão dos Índios', 'Rifaina', 'Rincão', 'Rinópolis', 'Rio Claro', 'Rio Grande da Serra', 'Rio das Pedras', 'Riolândia', 'Riversul', 'Rosana', 'Roseira', 'Rubinéia', 'Rubiácea', 'Sabino', 'Sagres', 'Sales', 'Sales Oliveira', 'Salesópolis', 'Salmourão', 'Saltinho', 'Salto', 'Salto Grande', 'Salto de Pirapora', 'Sandovalina', 'Santa Adélia', 'Santa Albertina', 'Santa Branca', "Santa Bárbara d'Oeste", "Santa Clara d'Oeste", 'Santa Cruz da Conceição', 'Santa Cruz da Esperança', 'Santa Cruz das Palmeiras', 'Santa Cruz do Rio Pardo', 'Santa Ernestina', 'Santa Fé do Sul', 'Santa Gertrudes', 'Santa Isabel', 'Santa Lúcia', 'Santa Maria da Serra', 'Santa Mercedes', "Santa Rita d'Oeste", 'Santa Rita do Passa Quatro', 'Santa Rosa de Viterbo', 'Santa Salete', 'Santana da Ponte Pensa', 'Santana de Parnaíba', 'Santo Anastácio', 'Santo André', 'Santo Antônio da Alegria', 'Santo Antônio de Posse', 'Santo Antônio do Aracanguá', 'Santo Antônio do Jardim', 'Santo Antônio do Pinhal', 'Santo Expedito', 'Santos', 'Santópolis do Aguapeí', 'Sarapuí', 'Sarutaiá', 'Sebastianópolis do Sul', 'Serra Azul', 'Serra Negra', 'Serrana', 'Sertãozinho', 'Sete Barras', 'Severínia', 'Silveiras', 'Socorro', 'Sorocaba', 'Sud Mennucci', 'Sumaré', 'Suzano', 'Suzanápolis', 'São Bento do Sapucaí', 'São Bernardo do Campo', 'São Caetano do Sul', 'São Carlos', 'São Francisco', 'São Joaquim da Barra', 'São José da Bela Vista', 'São José do Barreiro', 'São José do Rio Pardo', 'São José do Rio Preto', 'São José dos Campos', 'São João da Boa Vista', 'São João das Duas Pontes', 'São João de Iracema', "São João do Pau d'Alho", 'São Lourenço da Serra', 'São Luiz do Paraitinga', 'São Manuel', 'São Miguel Arcanjo', 'São Paulo', 'São Pedro', 'São Pedro do Turvo', 'São Roque', 'São Sebastião', 'São Sebastião da Grama', 'São Simão', 'São Vicente', 'Tabapuã', 'Tabatinga', 'Taboão da Serra', 'Taciba', 'Taguaí', 'Taiaçu', 'Taiúva', 'Tambaú', 'Tanabi', 'Tapiratiba', 'Tapiraí', 'Taquaral', 'Taquaritinga', 'Taquarituba', 'Taquarivaí', 'Tarabai', 'Tarumã', 'Tatuí', 'Taubaté', 'Tejupá', 'Teodoro Sampaio', 'Terra Roxa', 'Tietê', 'Timburi', 'Torre de Pedra', 'Torrinha', 'Trabiju', 'Tremembé', 'Três Fronteiras', 'Tuiuti', 'Tupi Paulista', 'Tupã', 'Turiúba', 'Turmalina', 'Ubarana', 'Ubatuba', 'Ubirajara', 'Uchoa', 'União Paulista', 'Uru', 'Urupês', 'Urânia', 'Valentim Gentil', 'Valinhos', 'Valparaíso', 'Vargem', 'Vargem Grande Paulista', 'Vargem Grande do Sul', 'Vera Cruz', 'Vinhedo', 'Viradouro', 'Vista Alegre do Alto', 'Vitória Brasil', 'Votorantim', 'Votuporanga', 'Várzea Paulista', 'Zacarias', 'Águas da Prata', 'Águas de Lindóia', 'Águas de Santa Bárbara', 'Águas de São Pedro', 'Álvares Florence', 'Álvares Machado', 'Álvaro de Carvalho', 'Óleo'],
  ES: ['Afonso Cláudio', 'Alegre', 'Alfredo Chaves', 'Alto Rio Novo', 'Anchieta', 'Apiacá', 'Aracruz', 'Atílio Vivacqua', 'Baixo Guandu', 'Barra de São Francisco', 'Boa Esperança', 'Bom Jesus do Norte', 'Brejetuba', 'Cachoeiro de Itapemirim', 'Cariacica', 'Castelo', 'Colatina', 'Conceição da Barra', 'Conceição do Castelo', 'Divino de São Lourenço', 'Domingos Martins', 'Dores do Rio Preto', 'Ecoporanga', 'Fundão', 'Governador Lindenberg', 'Guarapari', 'Guaçuí', 'Ibatiba', 'Ibiraçu', 'Ibitirama', 'Iconha', 'Irupi', 'Itaguaçu', 'Itapemirim', 'Itarana', 'Iúna', 'Jaguaré', 'Jerônimo Monteiro', 'João Neiva', 'Laranja da Terra', 'Linhares', 'Mantenópolis', 'Marataízes', 'Marechal Floriano', 'Marilândia', 'Mimoso do Sul', 'Montanha', 'Mucurici', 'Muniz Freire', 'Muqui', 'Nova Venécia', 'Pancas', 'Pedro Canário', 'Pinheiros', 'Piúma', 'Ponto Belo', 'Presidente Kennedy', 'Rio Bananal', 'Rio Novo do Sul', 'Santa Leopoldina', 'Santa Maria de Jetibá', 'Santa Teresa', 'Serra', 'Sooretama', 'São Domingos do Norte', 'São Gabriel da Palha', 'São José do Calçado', 'São Mateus', 'São Roque do Canaã', 'Vargem Alta', 'Venda Nova do Imigrante', 'Viana', 'Vila Pavão', 'Vila Valério', 'Vila Velha', 'Vitória', 'Água Doce do Norte', 'Águia Branca'],
  MA: ['Afonso Cunha', 'Alcântara', 'Aldeias Altas', 'Altamira do Maranhão', 'Alto Alegre do Maranhão', 'Alto Alegre do Pindaré', 'Alto Parnaíba', 'Amapá do Maranhão', 'Amarante do Maranhão', 'Anajatuba', 'Anapurus', 'Apicum-Açu', 'Araguanã', 'Araioses', 'Arame', 'Arari', 'Axixá', 'Açailândia', 'Bacabal', 'Bacabeira', 'Bacuri', 'Bacurituba', 'Balsas', 'Barra do Corda', 'Barreirinhas', 'Barão de Grajaú', 'Bela Vista do Maranhão', 'Belágua', 'Benedito Leite', 'Bequimão', 'Bernardo do Mearim', 'Boa Vista do Gurupi', 'Bom Jardim', 'Bom Jesus das Selvas', 'Bom Lugar', 'Brejo', 'Brejo de Areia', 'Buriti', 'Buriti Bravo', 'Buriticupu', 'Buritirana', 'Cachoeira Grande', 'Cajapió', 'Cajari', 'Campestre do Maranhão', 'Cantanhede', 'Capinzal do Norte', 'Carolina', 'Carutapera', 'Caxias', 'Cedral', 'Central do Maranhão', 'Centro Novo do Maranhão', 'Centro do Guilherme', 'Chapadinha', 'Cidelândia', 'Codó', 'Coelho Neto', 'Colinas', 'Conceição do Lago-Açu', 'Coroatá', 'Cururupu', 'Cândido Mendes', 'Davinópolis', 'Dom Pedro', 'Duque Bacelar', 'Esperantinópolis', 'Estreito', 'Feira Nova do Maranhão', 'Fernando Falcão', 'Formosa da Serra Negra', 'Fortaleza dos Nogueiras', 'Fortuna', 'Godofredo Viana', 'Gonçalves Dias', 'Governador Archer', 'Governador Edison Lobão', 'Governador Eugênio Barros', 'Governador Luiz Rocha', 'Governador Newton Bello', 'Governador Nunes Freire', 'Grajaú', 'Graça Aranha', 'Guimarães', 'Humberto de Campos', 'Icatu', 'Igarapé Grande', 'Igarapé do Meio', 'Imperatriz', 'Itaipava do Grajaú', 'Itapecuru Mirim', 'Itinga do Maranhão', 'Jatobá', 'Jenipapo dos Vieiras', 'Joselândia', 'João Lisboa', 'Junco do Maranhão', 'Lago Verde', 'Lago da Pedra', 'Lago do Junco', 'Lago dos Rodrigues', 'Lagoa Grande do Maranhão', 'Lagoa do Mato', 'Lajeado Novo', 'Lima Campos', 'Loreto', 'Luís Domingues', 'Magalhães de Almeida', 'Maracaçumé', 'Marajá do Sena', 'Maranhãozinho', 'Mata Roma', 'Matinha', 'Matões', 'Matões do Norte', 'Milagres do Maranhão', 'Mirador', 'Miranda do Norte', 'Mirinzal', 'Montes Altos', 'Monção', 'Morros', 'Nina Rodrigues', 'Nova Colinas', 'Nova Iorque', 'Nova Olinda do Maranhão', "Olho d'Água das Cunhãs", 'Olinda Nova do Maranhão', 'Palmeirândia', 'Paraibano', 'Parnarama', 'Passagem Franca', 'Pastos Bons', 'Paulino Neves', 'Paulo Ramos', 'Paço do Lumiar', 'Pedreiras', 'Pedro do Rosário', 'Penalva', 'Peri Mirim', 'Peritoró', 'Pindaré-Mirim', 'Pinheiro', 'Pio XII', 'Pirapemas', 'Porto Franco', 'Porto Rico do Maranhão', 'Poção de Pedras', 'Presidente Dutra', 'Presidente Juscelino', 'Presidente Médici', 'Presidente Sarney', 'Presidente Vargas', 'Primeira Cruz', 'Raposa', 'Riachão', 'Ribamar Fiquene', 'Rosário', 'Sambaíba', 'Santa Filomena do Maranhão', 'Santa Helena', 'Santa Inês', 'Santa Luzia', 'Santa Luzia do Paruá', 'Santa Quitéria do Maranhão', 'Santa Rita', 'Santana do Maranhão', 'Santo Amaro do Maranhão', 'Santo Antônio dos Lopes', 'Satubinha', 'Senador Alexandre Costa', 'Senador La Rocque', 'Serrano do Maranhão', 'Sucupira do Norte', 'Sucupira do Riachão', 'São Benedito do Rio Preto', 'São Bento', 'São Bernardo', 'São Domingos do Azeitão', 'São Domingos do Maranhão', 'São Francisco do Brejão', 'São Francisco do Maranhão', 'São Félix de Balsas', 'São José de Ribamar', 'São José dos Basílios', 'São João Batista', 'São João do Carú', 'São João do Paraíso', 'São João do Soter', 'São João dos Patos', 'São Luís', 'São Luís Gonzaga do Maranhão', 'São Mateus do Maranhão', 'São Pedro da Água Branca', 'São Pedro dos Crentes', 'São Raimundo das Mangabeiras', 'São Raimundo do Doca Bezerra', 'São Roberto', 'São Vicente Ferrer', 'Sítio Novo', 'Tasso Fragoso', 'Timbiras', 'Timon', 'Trizidela do Vale', 'Tufilândia', 'Tuntum', 'Turiaçu', 'Turilândia', 'Tutóia', 'Urbano Santos', 'Vargem Grande', 'Viana', 'Vila Nova dos Martírios', 'Vitorino Freire', 'Vitória do Mearim', 'Zé Doca', 'Água Doce do Maranhão'],
  PB: ['Aguiar', 'Alagoa Grande', 'Alagoa Nova', 'Alagoinha', 'Alcantil', 'Algodão de Jandaíra', 'Alhandra', 'Amparo', 'Aparecida', 'Arara', 'Araruna', 'Araçagi', 'Areia', 'Areia de Baraúnas', 'Areial', 'Aroeiras', 'Assunção', 'Bananeiras', 'Baraúna', 'Barra de Santa Rosa', 'Barra de Santana', 'Barra de São Miguel', 'Bayeux', 'Baía da Traição', 'Belém', 'Belém do Brejo do Cruz', 'Bernardino Batista', 'Boa Ventura', 'Boa Vista', 'Bom Jesus', 'Bom Sucesso', 'Bonito de Santa Fé', 'Boqueirão', 'Borborema', 'Brejo do Cruz', 'Brejo dos Santos', 'Caaporã', 'Cabaceiras', 'Cabedelo', 'Cachoeira dos Índios', 'Cacimba de Areia', 'Cacimba de Dentro', 'Cacimbas', 'Caiçara', 'Cajazeiras', 'Cajazeirinhas', 'Caldas Brandão', 'Camalaú', 'Campina Grande', 'Capim', 'Caraúbas', 'Carrapateira', 'Casserengue', 'Catingueira', 'Catolé do Rocha', 'Caturité', 'Conceição', 'Condado', 'Conde', 'Congo', 'Coremas', 'Coxixola', 'Cruz do Espírito Santo', 'Cubati', 'Cuitegi', 'Cuité', 'Cuité de Mamanguape', 'Curral Velho', 'Curral de Cima', 'Damião', 'Desterro', 'Diamante', 'Dona Inês', 'Duas Estradas', 'Emas', 'Esperança', 'Fagundes', 'Frei Martinho', 'Gado Bravo', 'Guarabira', 'Gurinhém', 'Gurjão', 'Ibiara', 'Igaracy', 'Imaculada', 'Ingá', 'Itabaiana', 'Itaporanga', 'Itapororoca', 'Itatuba', 'Jacaraú', 'Jericó', 'Joca Claudino', 'João Pessoa', 'Juarez Távora', 'Juazeirinho', 'Junco do Seridó', 'Juripiranga', 'Juru', 'Lagoa', 'Lagoa Seca', 'Lagoa de Dentro', 'Lastro', 'Livramento', 'Logradouro', 'Lucena', 'Malta', 'Mamanguape', 'Manaíra', 'Marcação', 'Mari', 'Marizópolis', 'Massaranduba', 'Mataraca', 'Matinhas', 'Mato Grosso', 'Maturéia', 'Mogeiro', 'Montadas', 'Monte Horebe', 'Monteiro', 'Mulungu', "Mãe d'Água", 'Natuba', 'Nazarezinho', 'Nova Floresta', 'Nova Olinda', 'Nova Palmeira', "Olho d'Água", 'Olivedos', 'Ouro Velho', 'Parari', 'Passagem', 'Patos', 'Paulista', 'Pedra Branca', 'Pedra Lavrada', 'Pedras de Fogo', 'Pedro Régis', 'Piancó', 'Picuí', 'Pilar', 'Pilões', 'Pilõezinhos', 'Pirpirituba', 'Pitimbu', 'Pocinhos', 'Pombal', 'Poço Dantas', 'Poço de José de Moura', 'Prata', 'Princesa Isabel', 'Puxinanã', 'Queimadas', 'Quixaba', 'Remígio', 'Riacho de Santo Antônio', 'Riacho dos Cavalos', 'Riachão', 'Riachão do Bacamarte', 'Riachão do Poço', 'Rio Tinto', 'Salgadinho', 'Salgado de São Félix', 'Santa Cecília', 'Santa Cruz', 'Santa Helena', 'Santa Inês', 'Santa Luzia', 'Santa Rita', 'Santa Teresinha', 'Santana de Mangueira', 'Santana dos Garrotes', 'Santo André', 'Sapé', 'Serra Branca', 'Serra Grande', 'Serra Redonda', 'Serra da Raiz', 'Serraria', 'Sertãozinho', 'Sobrado', 'Soledade', 'Solânea', 'Sossêgo', 'Sousa', 'Sumé', 'São Bentinho', 'São Bento', 'São Domingos', 'São Domingos do Cariri', 'São Francisco', 'São José da Lagoa Tapada', 'São José de Caiana', 'São José de Espinharas', 'São José de Piranhas', 'São José de Princesa', 'São José do Bonfim', 'São José do Brejo do Cruz', 'São José do Sabugi', 'São José dos Cordeiros', 'São José dos Ramos', 'São João do Cariri', 'São João do Rio do Peixe', 'São João do Tigre', 'São Mamede', 'São Miguel de Taipu', 'São Sebastião de Lagoa de Roça', 'São Sebastião do Umbuzeiro', 'São Vicente do Seridó', 'Tacima', 'Taperoá', 'Tavares', 'Teixeira', 'Tenório', 'Triunfo', 'Uiraúna', 'Umbuzeiro', 'Vieirópolis', 'Vista Serrana', 'Várzea', 'Zabelê', 'Água Branca'],
  MS: ['Alcinópolis', 'Amambai', 'Anastácio', 'Anaurilândia', 'Angélica', 'Antônio João', 'Aparecida do Taboado', 'Aquidauana', 'Aral Moreira', 'Bandeirantes', 'Bataguassu', 'Batayporã', 'Bela Vista', 'Bodoquena', 'Bonito', 'Brasilândia', 'Caarapó', 'Camapuã', 'Campo Grande', 'Caracol', 'Cassilândia', 'Chapadão do Sul', 'Corguinho', 'Coronel Sapucaia', 'Corumbá', 'Costa Rica', 'Coxim', 'Deodápolis', 'Dois Irmãos do Buriti', 'Douradina', 'Dourados', 'Eldorado', 'Figueirão', 'Fátima do Sul', 'Glória de Dourados', 'Guia Lopes da Laguna', 'Iguatemi', 'Inocência', 'Itaporã', 'Itaquiraí', 'Ivinhema', 'Japorã', 'Jaraguari', 'Jardim', 'Jateí', 'Juti', 'Ladário', 'Laguna Carapã', 'Maracaju', 'Miranda', 'Mundo Novo', 'Naviraí', 'Nioaque', 'Nova Alvorada do Sul', 'Nova Andradina', 'Novo Horizonte do Sul', 'Paranaíba', 'Paranhos', 'Paraíso das Águas', 'Pedro Gomes', 'Ponta Porã', 'Porto Murtinho', 'Ribas do Rio Pardo', 'Rio Brilhante', 'Rio Negro', 'Rio Verde de Mato Grosso', 'Rochedo', 'Santa Rita do Pardo', 'Selvíria', 'Sete Quedas', 'Sidrolândia', 'Sonora', 'São Gabriel do Oeste', 'Tacuru', 'Taquarussu', 'Terenos', 'Três Lagoas', 'Vicentina', 'Água Clara'],
  RO: ["Alta Floresta D'Oeste", 'Alto Alegre dos Parecis', 'Alto Paraíso', "Alvorada D'Oeste", 'Ariquemes', 'Buritis', 'Cabixi', 'Cacaulândia', 'Cacoal', 'Campo Novo de Rondônia', 'Candeias do Jamari', 'Castanheiras', 'Cerejeiras', 'Chupinguaia', 'Colorado do Oeste', 'Corumbiara', 'Costa Marques', 'Cujubim', "Espigão D'Oeste", 'Governador Jorge Teixeira', 'Guajará-Mirim', 'Itapuã do Oeste', 'Jaru', 'Ji-Paraná', "Machadinho D'Oeste", 'Ministro Andreazza', 'Mirante da Serra', 'Monte Negro', "Nova Brasilândia D'Oeste", 'Nova Mamoré', 'Nova União', 'Novo Horizonte do Oeste', 'Ouro Preto do Oeste', 'Parecis', 'Pimenta Bueno', 'Pimenteiras do Oeste', 'Porto Velho', 'Presidente Médici', 'Primavera de Rondônia', 'Rio Crespo', 'Rolim de Moura', "Santa Luzia D'Oeste", 'Seringueiras', "São Felipe D'Oeste", 'São Francisco do Guaporé', 'São Miguel do Guaporé', 'Teixeirópolis', 'Theobroma', 'Urupá', 'Vale do Anari', 'Vale do Paraíso', 'Vilhena'],
  RR: ['Alto Alegre', 'Amajari', 'Boa Vista', 'Bonfim', 'Cantá', 'Caracaraí', 'Caroebe', 'Iracema', 'Mucajaí', 'Normandia', 'Pacaraima', 'Rorainópolis', 'São João da Baliza', 'São Luiz', 'Uiramutã'],
  AM: ['Alvarães', 'Amaturá', 'Anamã', 'Anori', 'Apuí', 'Atalaia do Norte', 'Autazes', 'Barcelos', 'Barreirinha', 'Benjamin Constant', 'Beruri', 'Boa Vista do Ramos', 'Boca do Acre', 'Borba', 'Caapiranga', 'Canutama', 'Carauari', 'Careiro', 'Careiro da Várzea', 'Coari', 'Codajás', 'Eirunepé', 'Envira', 'Fonte Boa', 'Guajará', 'Humaitá', 'Ipixuna', 'Iranduba', 'Itacoatiara', 'Itamarati', 'Itapiranga', 'Japurá', 'Juruá', 'Jutaí', 'Lábrea', 'Manacapuru', 'Manaquiri', 'Manaus', 'Manicoré', 'Maraã', 'Maués', 'Nhamundá', 'Nova Olinda do Norte', 'Novo Airão', 'Novo Aripuanã', 'Parintins', 'Pauini', 'Presidente Figueiredo', 'Rio Preto da Eva', 'Santa Isabel do Rio Negro', 'Santo Antônio do Içá', 'Silves', 'São Gabriel da Cachoeira', 'São Paulo de Olivença', 'São Sebastião do Uatumã', 'Tabatinga', 'Tapauá', 'Tefé', 'Tonantins', 'Uarini', 'Urucará', 'Urucurituba'],
  AP: ['Amapá', 'Calçoene', 'Cutias', 'Ferreira Gomes', 'Itaubal', 'Laranjal do Jari', 'Macapá', 'Mazagão', 'Oiapoque', 'Pedra Branca do Amapari', 'Porto Grande', 'Pracuúba', 'Santana', 'Serra do Navio', 'Tartarugalzinho', 'Vitória do Jari'],
  SE: ['Amparo do São Francisco', 'Aquidabã', 'Aracaju', 'Arauá', 'Areia Branca', 'Barra dos Coqueiros', 'Boquim', 'Brejo Grande', 'Campo do Brito', 'Canhoba', 'Canindé de São Francisco', 'Capela', 'Carira', 'Carmópolis', 'Cedro de São João', 'Cristinápolis', 'Cumbe', 'Divina Pastora', 'Estância', 'Feira Nova', 'Frei Paulo', 'Gararu', 'General Maynard', 'Gracho Cardoso', 'Ilha das Flores', 'Indiaroba', 'Itabaiana', 'Itabaianinha', 'Itabi', "Itaporanga d'Ajuda", 'Japaratuba', 'Japoatã', 'Lagarto', 'Laranjeiras', 'Macambira', 'Malhada dos Bois', 'Malhador', 'Maruim', 'Moita Bonita', 'Monte Alegre de Sergipe', 'Muribeca', 'Neópolis', 'Nossa Senhora Aparecida', 'Nossa Senhora da Glória', 'Nossa Senhora das Dores', 'Nossa Senhora de Lourdes', 'Nossa Senhora do Socorro', 'Pacatuba', 'Pedra Mole', 'Pedrinhas', 'Pinhão', 'Pirambu', 'Porto da Folha', 'Poço Redondo', 'Poço Verde', 'Propriá', 'Riachuelo', 'Riachão do Dantas', 'Ribeirópolis', 'Rosário do Catete', 'Salgado', 'Santa Luzia do Itanhy', 'Santa Rosa de Lima', 'Santana do São Francisco', 'Santo Amaro das Brotas', 'Simão Dias', 'Siriri', 'São Cristóvão', 'São Domingos', 'São Francisco', 'São Miguel do Aleixo', 'Telha', 'Tobias Barreto', 'Tomar do Geru', 'Umbaúba'],
  AL: ['Anadia', 'Arapiraca', 'Atalaia', 'Barra de Santo Antônio', 'Barra de São Miguel', 'Batalha', 'Belo Monte', 'Belém', 'Boca da Mata', 'Branquinha', 'Cacimbinhas', 'Cajueiro', 'Campestre', 'Campo Alegre', 'Campo Grande', 'Canapi', 'Capela', 'Carneiros', 'Chã Preta', 'Coité do Nóia', 'Colônia Leopoldina', 'Coqueiro Seco', 'Coruripe', 'Craíbas', 'Delmiro Gouveia', 'Dois Riachos', 'Estrela de Alagoas', 'Feira Grande', 'Feliz Deserto', 'Flexeiras', 'Girau do Ponciano', 'Ibateguara', 'Igaci', 'Igreja Nova', 'Inhapi', 'Jacaré dos Homens', 'Jacuípe', 'Japaratinga', 'Jaramataia', 'Jequiá da Praia', 'Joaquim Gomes', 'Jundiá', 'Junqueiro', 'Lagoa da Canoa', 'Limoeiro de Anadia', 'Maceió', 'Major Isidoro', 'Mar Vermelho', 'Maragogi', 'Maravilha', 'Marechal Deodoro', 'Maribondo', 'Mata Grande', 'Matriz de Camaragibe', 'Messias', 'Minador do Negrão', 'Monteirópolis', 'Murici', 'Novo Lino', "Olho d'Água Grande", "Olho d'Água das Flores", "Olho d'Água do Casado", 'Olivença', 'Ouro Branco', 'Palestina', 'Palmeira dos Índios', 'Pariconha', 'Paripueira', 'Passo de Camaragibe', 'Paulo Jacinto', 'Penedo', 'Piaçabuçu', 'Pilar', 'Pindoba', 'Piranhas', 'Porto Calvo', 'Porto Real do Colégio', 'Porto de Pedras', 'Poço das Trincheiras', 'Pão de Açúcar', 'Quebrangulo', 'Rio Largo', 'Roteiro', 'Santa Luzia do Norte', 'Santana do Ipanema', 'Santana do Mundaú', 'Satuba', 'Senador Rui Palmeira', 'São Brás', 'São José da Laje', 'São José da Tapera', 'São Luís do Quitunde', 'São Miguel dos Campos', 'São Miguel dos Milagres', 'São Sebastião', "Tanque d'Arca", 'Taquarana', 'Teotônio Vilela', 'Traipu', 'União dos Palmares', 'Viçosa', 'Água Branca'],
  RJ: ['Angra dos Reis', 'Aperibé', 'Araruama', 'Areal', 'Armação dos Búzios', 'Arraial do Cabo', 'Barra Mansa', 'Barra do Piraí', 'Belford Roxo', 'Bom Jardim', 'Bom Jesus do Itabapoana', 'Cabo Frio', 'Cachoeiras de Macacu', 'Cambuci', 'Campos dos Goytacazes', 'Cantagalo', 'Carapebus', 'Cardoso Moreira', 'Carmo', 'Casimiro de Abreu', 'Comendador Levy Gasparian', 'Conceição de Macabu', 'Cordeiro', 'Duas Barras', 'Duque de Caxias', 'Engenheiro Paulo de Frontin', 'Guapimirim', 'Iguaba Grande', 'Itaboraí', 'Itaguaí', 'Italva', 'Itaocara', 'Itaperuna', 'Itatiaia', 'Japeri', 'Laje do Muriaé', 'Macaé', 'Macuco', 'Magé', 'Mangaratiba', 'Maricá', 'Mendes', 'Mesquita', 'Miguel Pereira', 'Miracema', 'Natividade', 'Nilópolis', 'Niterói', 'Nova Friburgo', 'Nova Iguaçu', 'Paracambi', 'Paraty', 'Paraíba do Sul', 'Paty do Alferes', 'Petrópolis', 'Pinheiral', 'Piraí', 'Porciúncula', 'Porto Real', 'Quatis', 'Queimados', 'Quissamã', 'Resende', 'Rio Bonito', 'Rio Claro', 'Rio das Flores', 'Rio das Ostras', 'Rio de Janeiro', 'Santa Maria Madalena', 'Santo Antônio de Pádua', 'Sapucaia', 'Saquarema', 'Seropédica', 'Silva Jardim', 'Sumidouro', 'São Fidélis', 'São Francisco de Itabapoana', 'São Gonçalo', 'São José de Ubá', 'São José do Vale do Rio Preto', 'São João da Barra', 'São João de Meriti', 'São Pedro da Aldeia', 'São Sebastião do Alto', 'Tanguá', 'Teresópolis', 'Trajano de Moraes', 'Três Rios', 'Valença', 'Varre-Sai', 'Vassouras', 'Volta Redonda'],
  DF: ['Brasília']
};

var sortAlphabetically = function sortAlphabetically(cityA, cityB) {
  return cityA.localeCompare(cityB);
};

function getCities(state) {
  if (state) {
    var states = getStates();
    var foundState = states.find(function (_ref) {
      var name = _ref.name,
          code = _ref.code;
      return name === state || code === state;
    });

    if (!foundState) {
      return [];
    }

    return CITIES_DATA[foundState.code].sort(sortAlphabetically);
  }

  return Object.values(CITIES_DATA).reduce(function (acc, city) {
    return acc.concat(city);
  }, []).sort(sortAlphabetically);
}
},{}],"node_modules/faker/lib/fake.js":[function(require,module,exports) {
/*
  fake.js - generator method for combining faker methods based on string input

*/

function Fake (faker) {
  
  /**
   * Generator method for combining faker methods based on string input
   *
   * __Example:__
   *
   * ```
   * console.log(faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'));
   * //outputs: "Marks, Dean Sr."
   * ```
   *
   * This will interpolate the format string with the value of methods
   * [name.lastName]{@link faker.name.lastName}, [name.firstName]{@link faker.name.firstName},
   * and [name.suffix]{@link faker.name.suffix}
   *
   * @method faker.fake
   * @param {string} str
   */
  this.fake = function fake (str) {
    // setup default response as empty string
    var res = '';

    // if incoming str parameter is not provided, return error message
    if (typeof str !== 'string' || str.length === 0) {
      throw new Error('string parameter is required!');
    }

    // find first matching {{ and }}
    var start = str.search('{{');
    var end = str.search('}}');

    // if no {{ and }} is found, we are done
    if (start === -1 && end === -1) {
      return str;
    }

    // console.log('attempting to parse', str);

    // extract method name from between the {{ }} that we found
    // for example: {{name.firstName}}
    var token = str.substr(start + 2,  end - start - 2);
    var method = token.replace('}}', '').replace('{{', '');

    // console.log('method', method)

    // extract method parameters
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(method);
    var parameters = '';
    if (matches) {
      method = method.replace(regExp, '');
      parameters = matches[1];
    }

    // split the method into module and function
    var parts = method.split('.');

    if (typeof faker[parts[0]] === "undefined") {
      throw new Error('Invalid module: ' + parts[0]);
    }

    if (typeof faker[parts[0]][parts[1]] === "undefined") {
      throw new Error('Invalid method: ' + parts[0] + "." + parts[1]);
    }

    // assign the function from the module.function namespace
    var fn = faker[parts[0]][parts[1]];

    // If parameters are populated here, they are always going to be of string type
    // since we might actually be dealing with an object or array,
    // we always attempt to the parse the incoming parameters into JSON
    var params;
    // Note: we experience a small performance hit here due to JSON.parse try / catch
    // If anyone actually needs to optimize this specific code path, please open a support issue on github
    try {
      params = JSON.parse(parameters)
    } catch (err) {
      // since JSON.parse threw an error, assume parameters was actually a string
      params = parameters;
    }

    var result;
    if (typeof params === "string" && params.length === 0) {
      result = fn.call(this);
    } else {
      result = fn.call(this, params);
    }

    // replace the found tag with the returned fake value
    res = str.replace('{{' + token + '}}', result);

    // return the response recursively until we are done finding all tags
    return fake(res);    
  }
  
  return this;
  
  
}

module['exports'] = Fake;
},{}],"node_modules/faker/vendor/unique.js":[function(require,module,exports) {
// the `unique` module
var unique = {};

// global results store
// currently uniqueness is global to entire faker instance
// this means that faker should currently *never* return duplicate values across all API methods when using `Faker.unique`
// it's possible in the future that some users may want to scope found per function call instead of faker instance
var found = {};

// global exclude list of results
// defaults to nothing excluded
var exclude = [];

// current iteration or retries of unique.exec ( current loop depth )
var currentIterations = 0;

// uniqueness compare function
// default behavior is to check value as key against object hash
var defaultCompare = function(obj, key) {
  if (typeof obj[key] === 'undefined') {
    return -1;
  }
  return 0;
};

// common error handler for messages
unique.errorMessage = function (now, code, opts) {
  console.error('error', code);
  console.log('found', Object.keys(found).length, 'unique entries before throwing error. \nretried:', currentIterations, '\ntotal time:', now - opts.startTime, 'ms');
  throw new Error(code + ' for uniqueness check \n\nMay not be able to generate any more unique values with current settings. \nTry adjusting maxTime or maxRetries parameters for faker.unique()')
};

unique.exec = function (method, args, opts) {
  //console.log(currentIterations)

  var now = new Date().getTime();

  opts = opts || {};
  opts.maxTime = opts.maxTime || 3;
  opts.maxRetries = opts.maxRetries || 50;
  opts.exclude = opts.exclude || exclude;
  opts.compare = opts.compare || defaultCompare;

  if (typeof opts.currentIterations !== 'number') {
    opts.currentIterations = 0;
  }

  if (typeof opts.startTime === 'undefined') {
    opts.startTime = new Date().getTime();
  }

  var startTime = opts.startTime;

  // support single exclude argument as string
  if (typeof opts.exclude === 'string') {
    opts.exclude = [opts.exclude];
  }

  if (opts.currentIterations > 0) {
    // console.log('iterating', currentIterations)
  }

  // console.log(now - startTime)
  if (now - startTime >= opts.maxTime) {
    return unique.errorMessage(now, 'Exceeded maxTime:' + opts.maxTime, opts);
  }

  if (opts.currentIterations >= opts.maxRetries) {
    return unique.errorMessage(now, 'Exceeded maxRetries:' + opts.maxRetries, opts);
  }

  // execute the provided method to find a potential satifised value
  var result = method.apply(this, args);

  // if the result has not been previously found, add it to the found array and return the value as it's unique
  if (opts.compare(found, result) === -1 && opts.exclude.indexOf(result) === -1) {
    found[result] = result;
    opts.currentIterations = 0;
    return result;
  } else {
    // console.log('conflict', result);
    opts.currentIterations++;
    return unique.exec(method, args, opts);
  }
};

module.exports = unique;

},{}],"node_modules/faker/lib/unique.js":[function(require,module,exports) {
var uniqueExec = require('../vendor/unique');
/**
 *
 * @namespace faker.unique
 */
function Unique (faker) {

  // initialize unique module class variables

  // maximum time unique.exec will attempt to run before aborting
  var maxTime = 10;

  // maximum retries unique.exec will recurse before abortings ( max loop depth )
  var maxRetries = 10;

  // time the script started
  // var startTime = 0;

  /**
   * unique
   *
   * @method unique
   */
  this.unique = function unique (method, args, opts) {
    opts = opts || {};
    opts.startTime = new Date().getTime();
    if (typeof opts.maxTime !== 'number') {
      opts.maxTime = maxTime;
    }
    if (typeof opts.maxRetries !== 'number') {
      opts.maxRetries = maxRetries;
    }
    opts.currentIterations = 0;
    return uniqueExec.exec(method, args, opts);
  }
}

module['exports'] = Unique;
},{"../vendor/unique":"node_modules/faker/vendor/unique.js"}],"node_modules/faker/vendor/mersenne.js":[function(require,module,exports) {
// this program is a JavaScript version of Mersenne Twister, with concealment and encapsulation in class,
// an almost straight conversion from the original program, mt19937ar.c,
// translated by y. okada on July 17, 2006.
// and modified a little at july 20, 2006, but there are not any substantial differences.
// in this program, procedure descriptions and comments of original source code were not removed.
// lines commented with //c// were originally descriptions of c procedure. and a few following lines are appropriate JavaScript descriptions.
// lines commented with /* and */ are original comments.
// lines commented with // are additional comments in this JavaScript version.
// before using this version, create at least one instance of MersenneTwister19937 class, and initialize the each state, given below in c comments, of all the instances.
/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_genrand(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

function MersenneTwister19937()
{
	/* constants should be scoped inside the class */
	var N, M, MATRIX_A, UPPER_MASK, LOWER_MASK;
	/* Period parameters */
	//c//#define N 624
	//c//#define M 397
	//c//#define MATRIX_A 0x9908b0dfUL   /* constant vector a */
	//c//#define UPPER_MASK 0x80000000UL /* most significant w-r bits */
	//c//#define LOWER_MASK 0x7fffffffUL /* least significant r bits */
	N = 624;
	M = 397;
	MATRIX_A = 0x9908b0df;   /* constant vector a */
	UPPER_MASK = 0x80000000; /* most significant w-r bits */
	LOWER_MASK = 0x7fffffff; /* least significant r bits */
	//c//static unsigned long mt[N]; /* the array for the state vector  */
	//c//static int mti=N+1; /* mti==N+1 means mt[N] is not initialized */
	var mt = new Array(N);   /* the array for the state vector  */
	var mti = N+1;           /* mti==N+1 means mt[N] is not initialized */

	function unsigned32 (n1) // returns a 32-bits unsiged integer from an operand to which applied a bit operator.
	{
		return n1 < 0 ? (n1 ^ UPPER_MASK) + UPPER_MASK : n1;
	}

	function subtraction32 (n1, n2) // emulates lowerflow of a c 32-bits unsiged integer variable, instead of the operator -. these both arguments must be non-negative integers expressible using unsigned 32 bits.
	{
		return n1 < n2 ? unsigned32((0x100000000 - (n2 - n1)) & 0xffffffff) : n1 - n2;
	}

	function addition32 (n1, n2) // emulates overflow of a c 32-bits unsiged integer variable, instead of the operator +. these both arguments must be non-negative integers expressible using unsigned 32 bits.
	{
		return unsigned32((n1 + n2) & 0xffffffff)
	}

	function multiplication32 (n1, n2) // emulates overflow of a c 32-bits unsiged integer variable, instead of the operator *. these both arguments must be non-negative integers expressible using unsigned 32 bits.
	{
		var sum = 0;
		for (var i = 0; i < 32; ++i){
			if ((n1 >>> i) & 0x1){
				sum = addition32(sum, unsigned32(n2 << i));
			}
		}
		return sum;
	}

	/* initializes mt[N] with a seed */
	//c//void init_genrand(unsigned long s)
	this.init_genrand = function (s)
	{
		//c//mt[0]= s & 0xffffffff;
		mt[0]= unsigned32(s & 0xffffffff);
		for (mti=1; mti<N; mti++) {
			mt[mti] =
			//c//(1812433253 * (mt[mti-1] ^ (mt[mti-1] >> 30)) + mti);
			addition32(multiplication32(1812433253, unsigned32(mt[mti-1] ^ (mt[mti-1] >>> 30))), mti);
			/* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
			/* In the previous versions, MSBs of the seed affect   */
			/* only MSBs of the array mt[].                        */
			/* 2002/01/09 modified by Makoto Matsumoto             */
			//c//mt[mti] &= 0xffffffff;
			mt[mti] = unsigned32(mt[mti] & 0xffffffff);
			/* for >32 bit machines */
		}
	}

	/* initialize by an array with array-length */
	/* init_key is the array for initializing keys */
	/* key_length is its length */
	/* slight change for C++, 2004/2/26 */
	//c//void init_by_array(unsigned long init_key[], int key_length)
	this.init_by_array = function (init_key, key_length)
	{
		//c//int i, j, k;
		var i, j, k;
		//c//init_genrand(19650218);
		this.init_genrand(19650218);
		i=1; j=0;
		k = (N>key_length ? N : key_length);
		for (; k; k--) {
			//c//mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1664525))
			//c//	+ init_key[j] + j; /* non linear */
			mt[i] = addition32(addition32(unsigned32(mt[i] ^ multiplication32(unsigned32(mt[i-1] ^ (mt[i-1] >>> 30)), 1664525)), init_key[j]), j);
			mt[i] =
			//c//mt[i] &= 0xffffffff; /* for WORDSIZE > 32 machines */
			unsigned32(mt[i] & 0xffffffff);
			i++; j++;
			if (i>=N) { mt[0] = mt[N-1]; i=1; }
			if (j>=key_length) j=0;
		}
		for (k=N-1; k; k--) {
			//c//mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1566083941))
			//c//- i; /* non linear */
			mt[i] = subtraction32(unsigned32((dbg=mt[i]) ^ multiplication32(unsigned32(mt[i-1] ^ (mt[i-1] >>> 30)), 1566083941)), i);
			//c//mt[i] &= 0xffffffff; /* for WORDSIZE > 32 machines */
			mt[i] = unsigned32(mt[i] & 0xffffffff);
			i++;
			if (i>=N) { mt[0] = mt[N-1]; i=1; }
		}
		mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
	}

    /* moved outside of genrand_int32() by jwatte 2010-11-17; generate less garbage */
    var mag01 = [0x0, MATRIX_A];

	/* generates a random number on [0,0xffffffff]-interval */
	//c//unsigned long genrand_int32(void)
	this.genrand_int32 = function ()
	{
		//c//unsigned long y;
		//c//static unsigned long mag01[2]={0x0UL, MATRIX_A};
		var y;
		/* mag01[x] = x * MATRIX_A  for x=0,1 */

		if (mti >= N) { /* generate N words at one time */
			//c//int kk;
			var kk;

			if (mti == N+1)   /* if init_genrand() has not been called, */
				//c//init_genrand(5489); /* a default initial seed is used */
				this.init_genrand(5489); /* a default initial seed is used */

			for (kk=0;kk<N-M;kk++) {
				//c//y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
				//c//mt[kk] = mt[kk+M] ^ (y >> 1) ^ mag01[y & 0x1];
				y = unsigned32((mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK));
				mt[kk] = unsigned32(mt[kk+M] ^ (y >>> 1) ^ mag01[y & 0x1]);
			}
			for (;kk<N-1;kk++) {
				//c//y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
				//c//mt[kk] = mt[kk+(M-N)] ^ (y >> 1) ^ mag01[y & 0x1];
				y = unsigned32((mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK));
				mt[kk] = unsigned32(mt[kk+(M-N)] ^ (y >>> 1) ^ mag01[y & 0x1]);
			}
			//c//y = (mt[N-1]&UPPER_MASK)|(mt[0]&LOWER_MASK);
			//c//mt[N-1] = mt[M-1] ^ (y >> 1) ^ mag01[y & 0x1];
			y = unsigned32((mt[N-1]&UPPER_MASK)|(mt[0]&LOWER_MASK));
			mt[N-1] = unsigned32(mt[M-1] ^ (y >>> 1) ^ mag01[y & 0x1]);
			mti = 0;
		}

		y = mt[mti++];

		/* Tempering */
		//c//y ^= (y >> 11);
		//c//y ^= (y << 7) & 0x9d2c5680;
		//c//y ^= (y << 15) & 0xefc60000;
		//c//y ^= (y >> 18);
		y = unsigned32(y ^ (y >>> 11));
		y = unsigned32(y ^ ((y << 7) & 0x9d2c5680));
		y = unsigned32(y ^ ((y << 15) & 0xefc60000));
		y = unsigned32(y ^ (y >>> 18));

		return y;
	}

	/* generates a random number on [0,0x7fffffff]-interval */
	//c//long genrand_int31(void)
	this.genrand_int31 = function ()
	{
		//c//return (genrand_int32()>>1);
		return (this.genrand_int32()>>>1);
	}

	/* generates a random number on [0,1]-real-interval */
	//c//double genrand_real1(void)
	this.genrand_real1 = function ()
	{
		//c//return genrand_int32()*(1.0/4294967295.0);
		return this.genrand_int32()*(1.0/4294967295.0);
		/* divided by 2^32-1 */
	}

	/* generates a random number on [0,1)-real-interval */
	//c//double genrand_real2(void)
	this.genrand_real2 = function ()
	{
		//c//return genrand_int32()*(1.0/4294967296.0);
		return this.genrand_int32()*(1.0/4294967296.0);
		/* divided by 2^32 */
	}

	/* generates a random number on (0,1)-real-interval */
	//c//double genrand_real3(void)
	this.genrand_real3 = function ()
	{
		//c//return ((genrand_int32()) + 0.5)*(1.0/4294967296.0);
		return ((this.genrand_int32()) + 0.5)*(1.0/4294967296.0);
		/* divided by 2^32 */
	}

	/* generates a random number on [0,1) with 53-bit resolution*/
	//c//double genrand_res53(void)
	this.genrand_res53 = function ()
	{
		//c//unsigned long a=genrand_int32()>>5, b=genrand_int32()>>6;
		var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6;
		return(a*67108864.0+b)*(1.0/9007199254740992.0);
	}
	/* These real versions are due to Isaku Wada, 2002/01/09 added */
}

//  Exports: Public API

//  Export the twister class
exports.MersenneTwister19937 = MersenneTwister19937;

//  Export a simplified function to generate random numbers
var gen = new MersenneTwister19937;
gen.init_genrand((new Date).getTime() % 1000000000);

// Added max, min range functionality, Marak Squires Sept 11 2014
exports.rand = function(max, min) {
    if (max === undefined)
        {
        min = 0;
        max = 32768;
        }
    return Math.floor(gen.genrand_real2() * (max - min) + min);
}
exports.seed = function(S) {
    if (typeof(S) != 'number')
        {
        throw new Error("seed(S) must take numeric argument; is " + typeof(S));
        }
    gen.init_genrand(S);
}
exports.seed_array = function(A) {
    if (typeof(A) != 'object')
        {
        throw new Error("seed_array(A) must take array of numbers; is " + typeof(A));
        }
    gen.init_by_array(A, A.length);
}
},{}],"node_modules/faker/lib/random.js":[function(require,module,exports) {
var mersenne = require('../vendor/mersenne');

/**
 *
 * @namespace faker.random
 */
function Random (faker, seed) {
  // Use a user provided seed if it is an array or number
  if (Array.isArray(seed) && seed.length) {
    mersenne.seed_array(seed);
  }
  else if(!isNaN(seed)) {
    mersenne.seed(seed);
  }

  /**
   * returns a single random number based on a max number or range
   *
   * @method faker.random.number
   * @param {mixed} options {min, max, precision}
   */
  this.number = function (options) {

    if (typeof options === "number") {
      options = {
        max: options
      };
    }

    options = options || {};

    if (typeof options.min === "undefined") {
      options.min = 0;
    }

    if (typeof options.max === "undefined") {
      options.max = 99999;
    }
    if (typeof options.precision === "undefined") {
      options.precision = 1;
    }

    // Make the range inclusive of the max value
    var max = options.max;
    if (max >= 0) {
      max += options.precision;
    }

    var randomNumber = Math.floor(
      mersenne.rand(max / options.precision, options.min / options.precision));
    // Workaround problem in Float point arithmetics for e.g. 6681493 / 0.01
    randomNumber = randomNumber / (1 / options.precision);

    return randomNumber;

  }

  /**
   * returns a single random floating-point number based on a max number or range
   *
   * @method faker.random.float
   * @param {mixed} options
   */
  this.float = function (options) {
      if (typeof options === "number") {
        options = {
          precision: options
        };
      }
      options = options || {};
      var opts = {};
      for (var p in options) {
        opts[p] = options[p];
      }
      if (typeof opts.precision === 'undefined') {
        opts.precision = 0.01;
      }
      return faker.random.number(opts);
  }
  
  /**
   * takes an array and returns a random element of the array
   *
   * @method faker.random.arrayElement
   * @param {array} array
   */
  this.arrayElement = function (array) {
      array = array || ["a", "b", "c"];
      var r = faker.random.number({ max: array.length - 1 });
      return array[r];
  }

  /**
   * takes an array and returns a subset with random elements of the array
   *
   * @method faker.random.arrayElements
   * @param {array} array
   * @param {number} count number of elements to pick
   */
  this.arrayElements = function (array, count) {
      array = array || ["a", "b", "c"];

      if (typeof count !== 'number') {
        count = faker.random.number({ min: 1, max: array.length });
      } else if (count > array.length) {
        count = array.length;
      } else if (count < 0) {
        count = 0;
      }

      var arrayCopy = array.slice();
      var countToRemove = arrayCopy.length - count;
      for (var i = 0; i < countToRemove; i++) {
        var indexToRemove = faker.random.number({ max: arrayCopy.length - 1 });
        arrayCopy.splice(indexToRemove, 1);
      }

      return arrayCopy;
  }

  /**
   * takes an object and returns the randomly key or value
   *
   * @method faker.random.objectElement
   * @param {object} object
   * @param {mixed} field
   */
  this.objectElement = function (object, field) {
      object = object || { "foo": "bar", "too": "car" };
      var array = Object.keys(object);
      var key = faker.random.arrayElement(array);

      return field === "key" ? key : object[key];
  }

  /**
   * uuid
   *
   * @method faker.random.uuid
   */
  this.uuid = function () {
      var RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
      var replacePlaceholders = function (placeholder) {
          var random = faker.random.number({ min: 0, max: 15 });
          var value = placeholder == 'x' ? random : (random &0x3 | 0x8);
          return value.toString(16);
      };
      return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
  }

  /**
   * boolean
   *
   * @method faker.random.boolean
   */
  this.boolean = function () {
      return !!faker.random.number(1)
  }

  // TODO: have ability to return specific type of word? As in: noun, adjective, verb, etc
  /**
   * word
   *
   * @method faker.random.word
   * @param {string} type
   */
  this.word = function randomWord (type) {

    var wordMethods = [
    'commerce.department',
    'commerce.productName',
    'commerce.productAdjective',
    'commerce.productMaterial',
    'commerce.product',
    'commerce.color',

    'company.catchPhraseAdjective',
    'company.catchPhraseDescriptor',
    'company.catchPhraseNoun',
    'company.bsAdjective',
    'company.bsBuzz',
    'company.bsNoun',
    'address.streetSuffix',
    'address.county',
    'address.country',
    'address.state',

    'finance.accountName',
    'finance.transactionType',
    'finance.currencyName',

    'hacker.noun',
    'hacker.verb',
    'hacker.adjective',
    'hacker.ingverb',
    'hacker.abbreviation',

    'name.jobDescriptor',
    'name.jobArea',
    'name.jobType'];

    // randomly pick from the many faker methods that can generate words
    var randomWordMethod = faker.random.arrayElement(wordMethods);
    var result = faker.fake('{{' + randomWordMethod + '}}');
    return faker.random.arrayElement(result.split(' '));
  }

  /**
   * randomWords
   *
   * @method faker.random.words
   * @param {number} count defaults to a random value between 1 and 3
   */
  this.words = function randomWords (count) {
    var words = [];
    if (typeof count === "undefined") {
      count = faker.random.number({min:1, max: 3});
    }
    for (var i = 0; i<count; i++) {
      words.push(faker.random.word());
    }
    return words.join(' ');
  }

  /**
   * locale
   *
   * @method faker.random.image
   */
  this.image = function randomImage () {
    return faker.image.image();
  }

  /**
   * locale
   *
   * @method faker.random.locale
   */
  this.locale = function randomLocale () {
    return faker.random.arrayElement(Object.keys(faker.locales));
  };

    /**
   * alpha. returns lower/upper alpha characters based count and upcase options
   *
   * @method faker.random.alpha
   * @param {mixed} options // defaults to { count: 1, upcase: false }
   */
  this.alpha = function alpha(options) {
    if (typeof options === "undefined") {
      options = {
        count: 1
      }
    } else if (typeof options === "number") {
      options = {
        count: options,
      }
    } else if (typeof options.count === "undefined") {
      options.count = 1
    }

    if (typeof options.upcase === "undefined") {
      options.upcase = false;
    }

    var wholeString = "";
    for(var i = 0; i < options.count; i++) {
      wholeString += faker.random.arrayElement(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
    }

    return options.upcase ? wholeString.toUpperCase() : wholeString;
  };

  /**
   * alphaNumeric
   *
   * @method faker.random.alphaNumeric
   * @param {number} count defaults to 1
   */
  this.alphaNumeric = function alphaNumeric(count) {
    if (typeof count === "undefined") {
      count = 1;
    }

    var wholeString = "";
    for(var i = 0; i < count; i++) {
      wholeString += faker.random.arrayElement(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
    }

    return wholeString;
  };

  /**
   * hexaDecimal
   *
   * @method faker.random.hexaDecimal
   * @param {number} count defaults to 1
   */
  this.hexaDecimal = function hexaDecimal(count) {
    if (typeof count === "undefined") {
      count = 1;
    }

    var wholeString = "";
    for(var i = 0; i < count; i++) {
      wholeString += faker.random.arrayElement(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
    }

    return "0x"+wholeString;
  };

  return this;

}

module['exports'] = Random;

},{"../vendor/mersenne":"node_modules/faker/vendor/mersenne.js"}],"node_modules/faker/lib/helpers.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.helpers
 */
var Helpers = function (faker) {

  var self = this;

  /**
   * backward-compatibility
   *
   * @method faker.helpers.randomize
   * @param {array} array
   */
  self.randomize = function (array) {
      array = array || ["a", "b", "c"];
      return faker.random.arrayElement(array);
  };

  /**
   * slugifies string
   *
   * @method faker.helpers.slugify
   * @param {string} string
   */
  self.slugify = function (string) {
      string = string || "";
      return string.replace(/ /g, '-').replace(/[^\一-龠\ぁ-ゔ\ァ-ヴー\w\.\-]+/g, '');
  };

  /**
   * parses string for a symbol and replace it with a random number from 1-10
   *
   * @method faker.helpers.replaceSymbolWithNumber
   * @param {string} string
   * @param {string} symbol defaults to `"#"`
   */
  self.replaceSymbolWithNumber = function (string, symbol) {
      string = string || "";
      // default symbol is '#'
      if (symbol === undefined) {
          symbol = '#';
      }

      var str = '';
      for (var i = 0; i < string.length; i++) {
          if (string.charAt(i) == symbol) {
              str += faker.random.number(9);
          } else if (string.charAt(i) == "!"){
              str += faker.random.number({min: 2, max: 9});
          } else {
              str += string.charAt(i);
          }
      }
      return str;
  };

  /**
   * parses string for symbols (numbers or letters) and replaces them appropriately (# will be replaced with number,
   * ? with letter and * will be replaced with number or letter)
   *
   * @method faker.helpers.replaceSymbols
   * @param {string} string
   */
  self.replaceSymbols = function (string) {
      string = string || "";
      var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
      var str = '';

      for (var i = 0; i < string.length; i++) {
          if (string.charAt(i) == "#") {
              str += faker.random.number(9);
          } else if (string.charAt(i) == "?") {
              str += faker.random.arrayElement(alpha);
          } else if (string.charAt(i) == "*") {
            str += faker.random.boolean() ? faker.random.arrayElement(alpha) : faker.random.number(9);
          } else {
              str += string.charAt(i);
          }
      }
      return str;
  };

  /**
   * replace symbols in a credit card schems including Luhn checksum
   *
   * @method faker.helpers.replaceCreditCardSymbols
   * @param {string} string
   * @param {string} symbol
   */

   self.replaceCreditCardSymbols = function(string, symbol) {

     // default values required for calling method without arguments
     string = string || "6453-####-####-####-###L";
     symbol = symbol || "#";

     // Function calculating the Luhn checksum of a number string
     var getCheckBit = function(number) {
       number.reverse();
       number = number.map(function(num, index){
         if (index%2 === 0) {
           num *= 2;
           if(num>9) {
             num -= 9;
           }
         }
         return num;
       });
       var sum = number.reduce(function(prev,curr){return prev + curr;});
       return sum % 10;
     };

     string = faker.helpers.regexpStyleStringParse(string); // replace [4-9] with a random number in range etc...
     string = faker.helpers.replaceSymbolWithNumber(string, symbol); // replace ### with random numbers

     var numberList = string.replace(/\D/g,"").split("").map(function(num){return parseInt(num);});
     var checkNum = getCheckBit(numberList);
     return string.replace("L",checkNum);
   };

   /** string repeat helper, alternative to String.prototype.repeat.... See PR #382
   *
   * @method faker.helpers.repeatString
   * @param {string} string
   * @param {number} num
   */
   self.repeatString = function(string, num) {
     if(typeof num ==="undefined") {
       num = 0;
     }
     var text = "";
     for(var i = 0; i < num; i++){
       text += string.toString();
     }
     return text;
   };

   /**
    * parse string patterns in a similar way to RegExp
    *
    * e.g. "#{3}test[1-5]" -> "###test4"
    *
    * @method faker.helpers.regexpStyleStringParse
    * @param {string} string
    */
   self.regexpStyleStringParse = function(string){
     string = string || "";
     // Deal with range repeat `{min,max}`
     var RANGE_REP_REG = /(.)\{(\d+)\,(\d+)\}/;
     var REP_REG = /(.)\{(\d+)\}/;
     var RANGE_REG = /\[(\d+)\-(\d+)\]/;
     var min, max, tmp, repetitions;
     var token = string.match(RANGE_REP_REG);
     while(token !== null){
       min = parseInt(token[2]);
       max =  parseInt(token[3]);
       // switch min and max
       if(min>max) {
         tmp = max;
         max = min;
         min = tmp;
       }
       repetitions = faker.random.number({min:min,max:max});
       string = string.slice(0,token.index) + faker.helpers.repeatString(token[1], repetitions) + string.slice(token.index+token[0].length);
       token = string.match(RANGE_REP_REG);
     }
     // Deal with repeat `{num}`
     token = string.match(REP_REG);
     while(token !== null){
       repetitions = parseInt(token[2]);
       string = string.slice(0,token.index)+ faker.helpers.repeatString(token[1], repetitions) + string.slice(token.index+token[0].length);
       token = string.match(REP_REG);
     }
     // Deal with range `[min-max]` (only works with numbers for now)
     //TODO: implement for letters e.g. [0-9a-zA-Z] etc.

     token = string.match(RANGE_REG);
     while(token !== null){
       min = parseInt(token[1]); // This time we are not capturing the char before `[]`
       max =  parseInt(token[2]);
       // switch min and max
       if(min>max) {
         tmp = max;
         max = min;
         min = tmp;
       }
        string = string.slice(0,token.index) +
          faker.random.number({min:min, max:max}).toString() +
          string.slice(token.index+token[0].length);
        token = string.match(RANGE_REG);
     }
     return string;
   };

  /**
   * takes an array and randomizes it in place then returns it
   * 
   * uses the modern version of the Fisher–Yates algorithm
   *
   * @method faker.helpers.shuffle
   * @param {array} o
   */
  self.shuffle = function (o) {
      if (typeof o === 'undefined' || o.length === 0) {
        return o || [];
      }
      o = o || ["a", "b", "c"];
      for (var x, j, i = o.length - 1; i > 0; --i) {
        j = faker.random.number(i);
        x = o[i];
        o[i] = o[j];
        o[j] = x;
      }
      return o;
  };

  /**
   * mustache
   *
   * @method faker.helpers.mustache
   * @param {string} str
   * @param {object} data
   */
  self.mustache = function (str, data) {
    if (typeof str === 'undefined') {
      return '';
    }
    for(var p in data) {
      var re = new RegExp('{{' + p + '}}', 'g')
      str = str.replace(re, data[p]);
    }
    return str;
  };

  /**
   * createCard
   *
   * @method faker.helpers.createCard
   */
  self.createCard = function () {
      return {
          "name": faker.name.findName(),
          "username": faker.internet.userName(),
          "email": faker.internet.email(),
          "address": {
              "streetA": faker.address.streetName(),
              "streetB": faker.address.streetAddress(),
              "streetC": faker.address.streetAddress(true),
              "streetD": faker.address.secondaryAddress(),
              "city": faker.address.city(),
              "state": faker.address.state(),
              "country": faker.address.country(),
              "zipcode": faker.address.zipCode(),
              "geo": {
                  "lat": faker.address.latitude(),
                  "lng": faker.address.longitude()
              }
          },
          "phone": faker.phone.phoneNumber(),
          "website": faker.internet.domainName(),
          "company": {
              "name": faker.company.companyName(),
              "catchPhrase": faker.company.catchPhrase(),
              "bs": faker.company.bs()
          },
          "posts": [
              {
                  "words": faker.lorem.words(),
                  "sentence": faker.lorem.sentence(),
                  "sentences": faker.lorem.sentences(),
                  "paragraph": faker.lorem.paragraph()
              },
              {
                  "words": faker.lorem.words(),
                  "sentence": faker.lorem.sentence(),
                  "sentences": faker.lorem.sentences(),
                  "paragraph": faker.lorem.paragraph()
              },
              {
                  "words": faker.lorem.words(),
                  "sentence": faker.lorem.sentence(),
                  "sentences": faker.lorem.sentences(),
                  "paragraph": faker.lorem.paragraph()
              }
          ],
          "accountHistory": [faker.helpers.createTransaction(), faker.helpers.createTransaction(), faker.helpers.createTransaction()]
      };
  };

  /**
   * contextualCard
   *
   * @method faker.helpers.contextualCard
   */
  self.contextualCard = function () {
    var name = faker.name.firstName(),
        userName = faker.internet.userName(name);
    return {
        "name": name,
        "username": userName,
        "avatar": faker.internet.avatar(),
        "email": faker.internet.email(userName),
        "dob": faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)")),
        "phone": faker.phone.phoneNumber(),
        "address": {
            "street": faker.address.streetName(true),
            "suite": faker.address.secondaryAddress(),
            "city": faker.address.city(),
            "zipcode": faker.address.zipCode(),
            "geo": {
                "lat": faker.address.latitude(),
                "lng": faker.address.longitude()
            }
        },
        "website": faker.internet.domainName(),
        "company": {
            "name": faker.company.companyName(),
            "catchPhrase": faker.company.catchPhrase(),
            "bs": faker.company.bs()
        }
    };
  };


  /**
   * userCard
   *
   * @method faker.helpers.userCard
   */
  self.userCard = function () {
      return {
          "name": faker.name.findName(),
          "username": faker.internet.userName(),
          "email": faker.internet.email(),
          "address": {
              "street": faker.address.streetName(true),
              "suite": faker.address.secondaryAddress(),
              "city": faker.address.city(),
              "zipcode": faker.address.zipCode(),
              "geo": {
                  "lat": faker.address.latitude(),
                  "lng": faker.address.longitude()
              }
          },
          "phone": faker.phone.phoneNumber(),
          "website": faker.internet.domainName(),
          "company": {
              "name": faker.company.companyName(),
              "catchPhrase": faker.company.catchPhrase(),
              "bs": faker.company.bs()
          }
      };
  };

  /**
   * createTransaction
   *
   * @method faker.helpers.createTransaction
   */
  self.createTransaction = function(){
    return {
      "amount" : faker.finance.amount(),
      "date" : new Date(2012, 1, 2),  //TODO: add a ranged date method
      "business": faker.company.companyName(),
      "name": [faker.finance.accountName(), faker.finance.mask()].join(' '),
      "type" : self.randomize(faker.definitions.finance.transaction_type),
      "account" : faker.finance.account()
    };
  };

  return self;

};


/*
String.prototype.capitalize = function () { //v1.0
    return this.replace(/\w+/g, function (a) {
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
    });
};
*/

module['exports'] = Helpers;

},{}],"node_modules/faker/lib/name.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.name
 */
function Name (faker) {

  /**
   * firstName
   *
   * @method firstName
   * @param {mixed} gender
   * @memberof faker.name
   */
  this.firstName = function (gender) {
    if (typeof faker.definitions.name.male_first_name !== "undefined" && typeof faker.definitions.name.female_first_name !== "undefined") {
      // some locale datasets ( like ru ) have first_name split by gender. since the name.first_name field does not exist in these datasets,
      // we must randomly pick a name from either gender array so faker.name.firstName will return the correct locale data ( and not fallback )

      if(typeof gender === 'string') {
        if(gender.toLowerCase() === 'male') {
          gender = 0;
        }
        else if(gender.toLowerCase() === 'female') {
          gender = 1;
        }
      }

      if (typeof gender !== 'number') {
        if(typeof faker.definitions.name.first_name === "undefined") {
          gender = faker.random.number(1);
        }
        else {
          //Fall back to non-gendered names if they exist and gender wasn't specified
          return faker.random.arrayElement(faker.definitions.name.first_name);
        }
      }
      if (gender === 0) {
        return faker.random.arrayElement(faker.definitions.name.male_first_name)
      } else {
        return faker.random.arrayElement(faker.definitions.name.female_first_name);
      }
    }
    return faker.random.arrayElement(faker.definitions.name.first_name);
  };

  /**
   * lastName
   *
   * @method lastName
   * @param {mixed} gender
   * @memberof faker.name
   */
  this.lastName = function (gender) {
    if (typeof faker.definitions.name.male_last_name !== "undefined" && typeof faker.definitions.name.female_last_name !== "undefined") {
      // some locale datasets ( like ru ) have last_name split by gender. i have no idea how last names can have genders, but also i do not speak russian
      // see above comment of firstName method
      if (typeof gender !== 'number') {
        gender = faker.random.number(1);
      }
      if (gender === 0) {
        return faker.random.arrayElement(faker.locales[faker.locale].name.male_last_name);
      } else {
        return faker.random.arrayElement(faker.locales[faker.locale].name.female_last_name);
      }
    }
    return faker.random.arrayElement(faker.definitions.name.last_name);
  };

   /**
   * middleName
   *
   * @method middleName
   * @param {mixed} gender
   * @memberof faker.name
   */
  this.middleName = function (gender) {
    if (typeof faker.definitions.name.male_middle_name !== "undefined" && typeof faker.definitions.name.female_middle_name !== "undefined") {
      if (typeof gender !== 'number') {
        gender = faker.random.number(1);
      }
      if (gender === 0) {
        return faker.random.arrayElement(faker.locales[faker.locale].name.male_middle_name);
      } else {
        return faker.random.arrayElement(faker.locales[faker.locale].name.female_middle_name);
      }
    }
    return faker.random.arrayElement(faker.definitions.name.middle_name);
  };

  /**
   * findName
   *
   * @method findName
   * @param {string} firstName
   * @param {string} lastName
   * @param {mixed} gender
   * @memberof faker.name
   */
  this.findName = function (firstName, lastName, gender) {
      var r = faker.random.number(8);
      var prefix, suffix;
      // in particular locales first and last names split by gender,
      // thus we keep consistency by passing 0 as male and 1 as female
      if (typeof gender !== 'number') {
        gender = faker.random.number(1);
      }
      firstName = firstName || faker.name.firstName(gender);
      lastName = lastName || faker.name.lastName(gender);
      switch (r) {
      case 0:
          prefix = faker.name.prefix(gender);
          if (prefix) {
              return prefix + " " + firstName + " " + lastName;
          }
      case 1:
          suffix = faker.name.suffix(gender);
          if (suffix) {
              return firstName + " " + lastName + " " + suffix;
          }
      }

      return firstName + " " + lastName;
  };

  /**
   * jobTitle
   *
   * @method jobTitle
   * @memberof faker.name
   */
  this.jobTitle = function () {
    return  faker.name.jobDescriptor() + " " +
      faker.name.jobArea() + " " +
      faker.name.jobType();
  };

  /**
   * gender
   *
   * @method gender
   * @memberof faker.name
   */
  this.gender = function () {
    return faker.random.arrayElement(faker.definitions.name.gender);
  }
  
  /**
   * prefix
   *
   * @method prefix
   * @param {mixed} gender
   * @memberof faker.name
   */
  this.prefix = function (gender) {
    if (typeof faker.definitions.name.male_prefix !== "undefined" && typeof faker.definitions.name.female_prefix !== "undefined") {
      if (typeof gender !== 'number') {
        gender = faker.random.number(1);
      }
      if (gender === 0) {
        return faker.random.arrayElement(faker.locales[faker.locale].name.male_prefix);
      } else {
        return faker.random.arrayElement(faker.locales[faker.locale].name.female_prefix);
      }
    }
    return faker.random.arrayElement(faker.definitions.name.prefix);
  };

  /**
   * suffix
   *
   * @method suffix
   * @memberof faker.name
   */
  this.suffix = function () {
      return faker.random.arrayElement(faker.definitions.name.suffix);
  };

  /**
   * title
   *
   * @method title
   * @memberof faker.name
   */
  this.title = function() {
      var descriptor  = faker.random.arrayElement(faker.definitions.name.title.descriptor),
          level       = faker.random.arrayElement(faker.definitions.name.title.level),
          job         = faker.random.arrayElement(faker.definitions.name.title.job);

      return descriptor + " " + level + " " + job;
  };

  /**
   * jobDescriptor
   *
   * @method jobDescriptor
   * @memberof faker.name
   */
  this.jobDescriptor = function () {
    return faker.random.arrayElement(faker.definitions.name.title.descriptor);
  };

  /**
   * jobArea
   *
   * @method jobArea
   * @memberof faker.name
   */
  this.jobArea = function () {
    return faker.random.arrayElement(faker.definitions.name.title.level);
  };

  /**
   * jobType
   *
   * @method jobType
   * @memberof faker.name
   */
  this.jobType = function () {
    return faker.random.arrayElement(faker.definitions.name.title.job);
  };

}

module['exports'] = Name;

},{}],"node_modules/faker/lib/address.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.address
 */
function Address (faker) {
  var f = faker.fake,
      Helpers = faker.helpers;

  /**
   * Generates random zipcode from format. If format is not specified, the
   * locale's zip format is used.
   *
   * @method faker.address.zipCode
   * @param {String} format
   */
  this.zipCode = function(format) {
    // if zip format is not specified, use the zip format defined for the locale
    if (typeof format === 'undefined') {
      var localeFormat = faker.definitions.address.postcode;
      if (typeof localeFormat === 'string') {
        format = localeFormat;
      } else {
        format = faker.random.arrayElement(localeFormat);
      }
    }
    return Helpers.replaceSymbols(format);
  }

  /**
   * Generates random zipcode from state abbreviation. If state abbreviation is
   * not specified, a random zip code is generated according to the locale's zip format.
   * Only works for locales with postcode_by_state definition. If a locale does not
   * have a postcode_by_state definition, a random zip code is generated according
   * to the locale's zip format.
   *
   * @method faker.address.zipCodeByState
   * @param {String} state
   */
  this.zipCodeByState = function (state) {
    var zipRange = faker.definitions.address.postcode_by_state[state];
    if (zipRange) {
      return faker.random.number(zipRange);
    }
    return faker.address.zipCode();
  }

  /**
   * Generates a random localized city name. The format string can contain any
   * method provided by faker wrapped in `{{}}`, e.g. `{{name.firstName}}` in
   * order to build the city name.
   *
   * If no format string is provided one of the following is randomly used:
   *
   * * `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
   * * `{{address.cityPrefix}} {{name.firstName}}`
   * * `{{name.firstName}}{{address.citySuffix}}`
   * * `{{name.lastName}}{{address.citySuffix}}`
   *
   * @method faker.address.city
   * @param {String} format
   */
  this.city = function (format) {
    var formats = [
      '{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}',
      '{{address.cityPrefix}} {{name.firstName}}',
      '{{name.firstName}}{{address.citySuffix}}',
      '{{name.lastName}}{{address.citySuffix}}'
    ];

    if (typeof format !== "number") {
      format = faker.random.number(formats.length - 1);
    }

    return f(formats[format]);

  }

  /**
   * Return a random localized city prefix
   * @method faker.address.cityPrefix
   */
  this.cityPrefix = function () {
    return faker.random.arrayElement(faker.definitions.address.city_prefix);
  }

  /**
   * Return a random localized city suffix
   *
   * @method faker.address.citySuffix
   */
  this.citySuffix = function () {
    return faker.random.arrayElement(faker.definitions.address.city_suffix);
  }

  /**
   * Returns a random localized street name
   *
   * @method faker.address.streetName
   */
  this.streetName = function () {
      var result;
      var suffix = faker.address.streetSuffix();
      if (suffix !== "") {
          suffix = " " + suffix
      }

      switch (faker.random.number(1)) {
      case 0:
          result = faker.name.lastName() + suffix;
          break;
      case 1:
          result = faker.name.firstName() + suffix;
          break;
      }
      return result;
  }

  //
  // TODO: change all these methods that accept a boolean to instead accept an options hash.
  //
  /**
   * Returns a random localized street address
   *
   * @method faker.address.streetAddress
   * @param {Boolean} useFullAddress
   */
  this.streetAddress = function (useFullAddress) {
      if (useFullAddress === undefined) { useFullAddress = false; }
      var address = "";
      switch (faker.random.number(2)) {
      case 0:
          address = Helpers.replaceSymbolWithNumber("#####") + " " + faker.address.streetName();
          break;
      case 1:
          address = Helpers.replaceSymbolWithNumber("####") +  " " + faker.address.streetName();
          break;
      case 2:
          address = Helpers.replaceSymbolWithNumber("###") + " " + faker.address.streetName();
          break;
      }
      return useFullAddress ? (address + " " + faker.address.secondaryAddress()) : address;
  }

  /**
   * streetSuffix
   *
   * @method faker.address.streetSuffix
   */
  this.streetSuffix = function () {
      return faker.random.arrayElement(faker.definitions.address.street_suffix);
  }

  /**
   * streetPrefix
   *
   * @method faker.address.streetPrefix
   */
  this.streetPrefix = function () {
      return faker.random.arrayElement(faker.definitions.address.street_prefix);
  }

  /**
   * secondaryAddress
   *
   * @method faker.address.secondaryAddress
   */
  this.secondaryAddress = function () {
      return Helpers.replaceSymbolWithNumber(faker.random.arrayElement(
          [
              'Apt. ###',
              'Suite ###'
          ]
      ));
  }

  /**
   * county
   *
   * @method faker.address.county
   */
  this.county = function () {
    return faker.random.arrayElement(faker.definitions.address.county);
  }

  /**
   * country
   *
   * @method faker.address.country
   */
  this.country = function () {
    return faker.random.arrayElement(faker.definitions.address.country);
  }

  /**
   * countryCode
   *
   * @method faker.address.countryCode
   * @param {string} alphaCode default alpha-2
   */
  this.countryCode = function (alphaCode) {
    
    if (typeof alphaCode === 'undefined' || alphaCode === 'alpha-2') {
        return faker.random.arrayElement(faker.definitions.address.country_code);
    }

    if (alphaCode === 'alpha-3') {
        return faker.random.arrayElement(faker.definitions.address.country_code_alpha_3);
    }
      
    return faker.random.arrayElement(faker.definitions.address.country_code);

  }

  /**
   * state
   *
   * @method faker.address.state
   * @param {Boolean} useAbbr
   */
  this.state = function (useAbbr) {
      return faker.random.arrayElement(faker.definitions.address.state);
  }

  /**
   * stateAbbr
   *
   * @method faker.address.stateAbbr
   */
  this.stateAbbr = function () {
      return faker.random.arrayElement(faker.definitions.address.state_abbr);
  }

  /**
   * latitude
   *
   * @method faker.address.latitude
   * @param {Double} max default is 90
   * @param {Double} min default is -90
   * @param {number} precision default is 4
   */
  this.latitude = function (max, min, precision) {
      max       = max || 90
      min       = min || -90
      precision = precision || 4

      return faker.random.number({
        max: max,
        min: min,
        precision: parseFloat((0.0).toPrecision(precision) + '1')
      }).toFixed(precision);
  }

  /**
   * longitude
   *
   * @method faker.address.longitude
   * @param {Double} max default is 180
   * @param {Double} min default is -180
   * @param {number} precision default is 4
   */
  this.longitude = function (max, min, precision) {
      max       = max || 180
      min       = min || -180
      precision = precision || 4

      return faker.random.number({
        max: max,
        min: min,
        precision: parseFloat((0.0).toPrecision(precision) + '1')
      }).toFixed(precision);
  }

  /**
   *  direction
   *
   * @method faker.address.direction
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
  this.direction = function (useAbbr) {
    if (typeof useAbbr === 'undefined' || useAbbr === false) {
      return faker.random.arrayElement(faker.definitions.address.direction);
    }
    return faker.random.arrayElement(faker.definitions.address.direction_abbr);
  }

  this.direction.schema = {
    "description": "Generates a direction. Use optional useAbbr bool to return abbreviation",
    "sampleResults": ["Northwest", "South", "SW", "E"]
  };

  /**
   * cardinal direction
   *
   * @method faker.address.cardinalDirection
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
  this.cardinalDirection = function (useAbbr) {
    if (typeof useAbbr === 'undefined' || useAbbr === false) {
      return (
        faker.random.arrayElement(faker.definitions.address.direction.slice(0, 4))
      );
    }
    return (
      faker.random.arrayElement(faker.definitions.address.direction_abbr.slice(0, 4))
    );
  }

  this.cardinalDirection.schema = {
    "description": "Generates a cardinal direction. Use optional useAbbr boolean to return abbreviation",
    "sampleResults": ["North", "South", "E", "W"]
  };

  /**
   * ordinal direction
   *
   * @method faker.address.ordinalDirection
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
  this.ordinalDirection = function (useAbbr) {
    if (typeof useAbbr === 'undefined' || useAbbr === false) {
      return (
        faker.random.arrayElement(faker.definitions.address.direction.slice(4, 8))
      );
    }
    return (
      faker.random.arrayElement(faker.definitions.address.direction_abbr.slice(4, 8))
    );
  }

  this.ordinalDirection.schema = {
    "description": "Generates an ordinal direction. Use optional useAbbr boolean to return abbreviation",
    "sampleResults": ["Northwest", "Southeast", "SW", "NE"]
  };

  this.nearbyGPSCoordinate = function(coordinate, radius, isMetric) {
        function randomFloat(min, max) {
            return Math.random() * (max-min) + min;
        }
        function degreesToRadians(degrees) {
            return degrees * (Math.PI/180.0);
        }
        function radiansToDegrees(radians) {
            return radians * (180.0/Math.PI);
        }
        function kilometersToMiles(miles) {
            return miles * 0.621371;
        }
        function coordinateWithOffset(coordinate, bearing, distance, isMetric) {
            var R = 6378.137; // Radius of the Earth (http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html)
            var d = isMetric ? distance : kilometersToMiles(distance); // Distance in km

            var lat1 = degreesToRadians(coordinate[0]); //Current lat point converted to radians
            var lon1 = degreesToRadians(coordinate[1]); //Current long point converted to radians

            var lat2 = Math.asin(Math.sin(lat1) * Math.cos(d/R) +
                Math.cos(lat1) * Math.sin(d/R) * Math.cos(bearing));

            var lon2 = lon1 + Math.atan2(
                Math.sin(bearing) * Math.sin(d/R) * Math.cos(lat1),
                Math.cos(d/R) - Math.sin(lat1) * Math.sin(lat2));

            // Keep longitude in range [-180, 180]
            if (lon2 > degreesToRadians(180)) {
                lon2 = lon2 - degreesToRadians(360);
            } else if (lon2 < degreesToRadians(-180)) {
                lon2 = lon2 + degreesToRadians(360);
            }

            return [radiansToDegrees(lat2), radiansToDegrees(lon2)];
        }

        // If there is no coordinate, the best we can do is return a random GPS coordinate.
        if (coordinate === undefined) {
            return [faker.address.latitude(), faker.address.longitude()]
        }
        radius = radius || 10.0;
        isMetric = isMetric || false;

        // TODO: implement either a gaussian/uniform distribution of points in cicular region.
        // Possibly include param to function that allows user to choose between distributions.

        // This approach will likely result in a higher density of points near the center.
        var randomCoord = coordinateWithOffset(coordinate, degreesToRadians(Math.random() * 360.0), radius, isMetric);
        return [randomCoord[0].toFixed(4), randomCoord[1].toFixed(4)];
    }

    /**
     * Return a random time zone
     * @method faker.address.timeZone
     */
    this.timeZone = function() {
      return faker.random.arrayElement(faker.definitions.address.time_zone);
    }

  return this;
}

module.exports = Address;

},{}],"node_modules/faker/lib/company.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.company
 */
var Company = function (faker) {
  
  var self = this;
  var f = faker.fake;
  
  /**
   * suffixes
   *
   * @method faker.company.suffixes
   */
  this.suffixes = function () {
    // Don't want the source array exposed to modification, so return a copy
    return faker.definitions.company.suffix.slice(0);
  }

  /**
   * companyName
   *
   * @method faker.company.companyName
   * @param {string} format
   */
  this.companyName = function (format) {

    var formats = [
      '{{name.lastName}} {{company.companySuffix}}',
      '{{name.lastName}} - {{name.lastName}}',
      '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}'
    ];

    if (typeof format !== "number") {
      format = faker.random.number(formats.length - 1);
    }

    return f(formats[format]);
  }

  /**
   * companySuffix
   *
   * @method faker.company.companySuffix
   */
  this.companySuffix = function () {
      return faker.random.arrayElement(faker.company.suffixes());
  }

  /**
   * catchPhrase
   *
   * @method faker.company.catchPhrase
   */
  this.catchPhrase = function () {
    return f('{{company.catchPhraseAdjective}} {{company.catchPhraseDescriptor}} {{company.catchPhraseNoun}}')
  }

  /**
   * bs
   *
   * @method faker.company.bs
   */
  this.bs = function () {
    return f('{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}');
  }

  /**
   * catchPhraseAdjective
   *
   * @method faker.company.catchPhraseAdjective
   */
  this.catchPhraseAdjective = function () {
      return faker.random.arrayElement(faker.definitions.company.adjective);
  }

  /**
   * catchPhraseDescriptor
   *
   * @method faker.company.catchPhraseDescriptor
   */
  this.catchPhraseDescriptor = function () {
      return faker.random.arrayElement(faker.definitions.company.descriptor);
  }

  /**
   * catchPhraseNoun
   *
   * @method faker.company.catchPhraseNoun
   */
  this.catchPhraseNoun = function () {
      return faker.random.arrayElement(faker.definitions.company.noun);
  }

  /**
   * bsAdjective
   *
   * @method faker.company.bsAdjective
   */
  this.bsAdjective = function () {
      return faker.random.arrayElement(faker.definitions.company.bs_adjective);
  }

  /**
   * bsBuzz
   *
   * @method faker.company.bsBuzz
   */
  this.bsBuzz = function () {
      return faker.random.arrayElement(faker.definitions.company.bs_verb);
  }

  /**
   * bsNoun
   *
   * @method faker.company.bsNoun
   */
  this.bsNoun = function () {
      return faker.random.arrayElement(faker.definitions.company.bs_noun);
  }
  
}

module['exports'] = Company;
},{}],"node_modules/faker/lib/iban.js":[function(require,module,exports) {
module["exports"] = {
  alpha: [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
  ],
  pattern10: [
    "01", "02", "03", "04", "05", "06", "07", "08", "09"
  ],
  pattern100: [
    "001", "002", "003", "004", "005", "006", "007", "008", "009"
  ],
  toDigitString: function (str) {
      return str.replace(/[A-Z]/gi, function(match) {
          return match.toUpperCase().charCodeAt(0) - 55;
      });
  },
  mod97: function (digitStr) {
      var m = 0;
      for (var i = 0; i < digitStr.length; i++) {
          m = ((m * 10) + (digitStr[i] |0)) % 97;
      }
      return m;
  },
  formats: [
    {
      country: "AL",
      total: 28,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "c",
          count: 16
        }
      ],
      format: "ALkk bbbs sssx cccc cccc cccc cccc"
    },
    {
      country: "AD",
      total: 24,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "c",
          count: 12
        }
      ],
      format: "ADkk bbbb ssss cccc cccc cccc"
    },
    {
      country: "AT",
      total: 20,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "n",
          count: 11
        }
      ],
      format: "ATkk bbbb bccc cccc cccc"
    },
    {
      country: "AZ",
      total: 28,
      bban: [
        {
          type: "c",
          count: 4
        },
        {
          type: "n",
          count: 20
        }
      ],
      format: "AZkk bbbb cccc cccc cccc cccc cccc"
    },
    {
      country: "BH",
      total: 22,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "c",
          count: 14
        }
      ],
      format: "BHkk bbbb cccc cccc cccc cc"
    },
    {
      country: "BE",
      total: 16,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 9
        }
      ],
      format: "BEkk bbbc cccc ccxx"
    },
    {
      country: "BA",
      total: 20,
      bban: [
        {
          type: "n",
          count: 6
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "BAkk bbbs sscc cccc ccxx"
    },
    {
      country: "BR",
      total: 29,
      bban: [
        {
          type: "n",
          count: 13
        },
        {
          type: "n",
          count: 10
        },
        {
          type: "a",
          count: 1
        },
        {
          type: "c",
          count: 1
        }
      ],
      format: "BRkk bbbb bbbb ssss sccc cccc ccct n"
    },
    {
      country: "BG",
      total: 22,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 6
        },
        {
          type: "c",
          count: 8
        }
      ],
      format: "BGkk bbbb ssss ddcc cccc cc"
    },
    {
      country: "CR",
      total: 21,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 14
        }
      ],
      format: "CRkk bbbc cccc cccc cccc c"
    },
    {
      country: "HR",
      total: 21,
      bban: [
        {
          type: "n",
          count: 7
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "HRkk bbbb bbbc cccc cccc c"
    },
    {
      country: "CY",
      total: 28,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "c",
          count: 16
        }
      ],
      format: "CYkk bbbs ssss cccc cccc cccc cccc"
    },
    {
      country: "CZ",
      total: 24,
      bban: [
        {
          type: "n",
          count: 10
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "CZkk bbbb ssss sscc cccc cccc"
    },
    {
      country: "DK",
      total: 18,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "DKkk bbbb cccc cccc cc"
    },
    {
      country: "DO",
      total: 28,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 20
        }
      ],
      format: "DOkk bbbb cccc cccc cccc cccc cccc"
    },
    {
      country: "TL",
      total: 23,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "TLkk bbbc cccc cccc cccc cxx"
    },
    {
      country: "EE",
      total: 20,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 12
        }
      ],
      format: "EEkk bbss cccc cccc cccx"
    },
    {
      country: "FO",
      total: 18,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "FOkk bbbb cccc cccc cx"
    },
    {
      country: "FI",
      total: 18,
      bban: [
        {
          type: "n",
          count: 6
        },
        {
          type: "n",
          count: 8
        }
      ],
      format: "FIkk bbbb bbcc cccc cx"
    },
    {
      country: "FR",
      total: 27,
      bban: [
        {
          type: "n",
          count: 10
        },
        {
          type: "c",
          count: 11
        },
        {
          type: "n",
          count: 2
        }
      ],
      format: "FRkk bbbb bggg ggcc cccc cccc cxx"
    },
    {
      country: "GE",
      total: 22,
      bban: [
        {
          type: "c",
          count: 2
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "GEkk bbcc cccc cccc cccc cc"
    },
    {
      country: "DE",
      total: 22,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "DEkk bbbb bbbb cccc cccc cc"
    },
    {
      country: "GI",
      total: 23,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "c",
          count: 15
        }
      ],
      format: "GIkk bbbb cccc cccc cccc ccc"
    },
    {
      country: "GR",
      total: 27,
      bban: [
        {
          type: "n",
          count: 7
        },
        {
          type: "c",
          count: 16
        }
      ],
      format: "GRkk bbbs sssc cccc cccc cccc ccc"
    },
    {
      country: "GL",
      total: 18,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "GLkk bbbb cccc cccc cc"
    },
    {
      country: "GT",
      total: 28,
      bban: [
        {
          type: "c",
          count: 4
        },
        {
          type: "c",
          count: 4
        },
        {
          type: "c",
          count: 16
        }
      ],
      format: "GTkk bbbb mmtt cccc cccc cccc cccc"
    },
    {
      country: "HU",
      total: 28,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "HUkk bbbs sssk cccc cccc cccc cccx"
    },
    {
      country: "IS",
      total: 26,
      bban: [
        {
          type: "n",
          count: 6
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "ISkk bbbb sscc cccc iiii iiii ii"
    },
    {
      country: "IE",
      total: 22,
      bban: [
        {
          type: "c",
          count: 4
        },
        {
          type: "n",
          count: 6
        },
        {
          type: "n",
          count: 8
        }
      ],
      format: "IEkk aaaa bbbb bbcc cccc cc"
    },
    {
      country: "IL",
      total: 23,
      bban: [
        {
          type: "n",
          count: 6
        },
        {
          type: "n",
          count: 13
        }
      ],
      format: "ILkk bbbn nncc cccc cccc ccc"
    },
    {
      country: "IT",
      total: 27,
      bban: [
        {
          type: "a",
          count: 1
        },
        {
          type: "n",
          count: 10
        },
        {
          type: "c",
          count: 12
        }
      ],
      format: "ITkk xaaa aabb bbbc cccc cccc ccc"
    },
    {
      country: "JO",
      total: 30,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 18
        }
      ],
      format: "JOkk bbbb nnnn cccc cccc cccc cccc cc"
    },
    {
      country: "KZ",
      total: 20,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "c",
          count: 13
        }
      ],
      format: "KZkk bbbc cccc cccc cccc"
    },
    {
      country: "XK",
      total: 20,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 12
        }
      ],
      format: "XKkk bbbb cccc cccc cccc"
    },
    {
      country: "KW",
      total: 30,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "c",
          count: 22
        }
      ],
      format: "KWkk bbbb cccc cccc cccc cccc cccc cc"
    },
    {
      country: "LV",
      total: 21,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "c",
          count: 13
        }
      ],
      format: "LVkk bbbb cccc cccc cccc c"
    },
    {
      country: "LB",
      total: 28,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "c",
          count: 20
        }
      ],
      format: "LBkk bbbb cccc cccc cccc cccc cccc"
    },
    {
      country: "LI",
      total: 21,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "c",
          count: 12
        }
      ],
      format: "LIkk bbbb bccc cccc cccc c"
    },
    {
      country: "LT",
      total: 20,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "n",
          count: 11
        }
      ],
      format: "LTkk bbbb bccc cccc cccc"
    },
    {
      country: "LU",
      total: 20,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "c",
          count: 13
        }
      ],
      format: "LUkk bbbc cccc cccc cccc"
    },
    {
      country: "MK",
      total: 19,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "c",
          count: 10
        },
        {
          type: "n",
          count: 2
        }
      ],
      format: "MKkk bbbc cccc cccc cxx"
    },
    {
      country: "MT",
      total: 31,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 5
        },
        {
          type: "c",
          count: 18
        }
      ],
      format: "MTkk bbbb ssss sccc cccc cccc cccc ccc"
    },
    {
      country: "MR",
      total: 27,
      bban: [
        {
          type: "n",
          count: 10
        },
        {
          type: "n",
          count: 13
        }
      ],
      format: "MRkk bbbb bsss sscc cccc cccc cxx"
    },
    {
      country: "MU",
      total: 30,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 15
        },
        {
          type: "a",
          count: 3
        }
      ],
      format: "MUkk bbbb bbss cccc cccc cccc 000d dd"
    },
    {
      country: "MC",
      total: 27,
      bban: [
        {
          type: "n",
          count: 10
        },
        {
          type: "c",
          count: 11
        },
        {
          type: "n",
          count: 2
        }
      ],
      format: "MCkk bbbb bsss sscc cccc cccc cxx"
    },
    {
      country: "MD",
      total: 24,
      bban: [
        {
          type: "c",
          count: 2
        },
        {
          type: "c",
          count: 18
        }
      ],
      format: "MDkk bbcc cccc cccc cccc cccc"
    },
    {
      country: "ME",
      total: 22,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 15
        }
      ],
      format: "MEkk bbbc cccc cccc cccc xx"
    },
    {
      country: "NL",
      total: 18,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "NLkk bbbb cccc cccc cc"
    },
    {
      country: "NO",
      total: 15,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 7
        }
      ],
      format: "NOkk bbbb cccc ccx"
    },
    {
      country: "PK",
      total: 24,
      bban: [
        {
          type: "c",
          count: 4
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "PKkk bbbb cccc cccc cccc cccc"
    },
    {
      country: "PS",
      total: 29,
      bban: [
        {
          type: "c",
          count: 4
        },
        {
          type: "n",
          count: 9
        },
        {
          type: "n",
          count: 12
        }
      ],
      format: "PSkk bbbb xxxx xxxx xccc cccc cccc c"
    },
    {
      country: "PL",
      total: 28,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "PLkk bbbs sssx cccc cccc cccc cccc"
    },
    {
      country: "PT",
      total: 25,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "n",
          count: 13
        }
      ],
      format: "PTkk bbbb ssss cccc cccc cccx x"
    },
    {
      country: "QA",
      total: 29,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "c",
          count: 21
        }
      ],
      format: "QAkk bbbb cccc cccc cccc cccc cccc c"
    },
    {
      country: "RO",
      total: 24,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "c",
          count: 16
        }
      ],
      format: "ROkk bbbb cccc cccc cccc cccc"
    },
    {
      country: "SM",
      total: 27,
      bban: [
        {
          type: "a",
          count: 1
        },
        {
          type: "n",
          count: 10
        },
        {
          type: "c",
          count: 12
        }
      ],
      format: "SMkk xaaa aabb bbbc cccc cccc ccc"
    },
    {
      country: "SA",
      total: 24,
      bban: [
        {
          type: "n",
          count: 2
        },
        {
          type: "c",
          count: 18
        }
      ],
      format: "SAkk bbcc cccc cccc cccc cccc"
    },
    {
      country: "RS",
      total: 22,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 15
        }
      ],
      format: "RSkk bbbc cccc cccc cccc xx"
    },
    {
      country: "SK",
      total: 24,
      bban: [
        {
          type: "n",
          count: 10
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "SKkk bbbb ssss sscc cccc cccc"
    },
    {
      country: "SI",
      total: 19,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "SIkk bbss sccc cccc cxx"
    },
    {
      country: "ES",
      total: 24,
      bban: [
        {
          type: "n",
          count: 10
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "ESkk bbbb gggg xxcc cccc cccc"
    },
    {
      country: "SE",
      total: 24,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 17
        }
      ],
      format: "SEkk bbbc cccc cccc cccc cccc"
    },
    {
      country: "CH",
      total: 21,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "c",
          count: 12
        }
      ],
      format: "CHkk bbbb bccc cccc cccc c"
    },
    {
      country: "TN",
      total: 24,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "n",
          count: 15
        }
      ],
      format: "TNkk bbss sccc cccc cccc cccc"
    },
    {
      country: "TR",
      total: 26,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "c",
          count: 1
        },
        {
          type: "c",
          count: 16
        }
      ],
      format: "TRkk bbbb bxcc cccc cccc cccc cc"
    },
    {
      country: "AE",
      total: 23,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "AEkk bbbc cccc cccc cccc ccc"
    },
    {
      country: "GB",
      total: 22,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 6
        },
        {
          type: "n",
          count: 8
        }
      ],
      format: "GBkk bbbb ssss sscc cccc cc"
    },
    {
      country: "VG",
      total: 24,
      bban: [
        {
          type: "c",
          count: 4
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "VGkk bbbb cccc cccc cccc cccc"
    }
  ],
  iso3166: [
    "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AN", "AO", "AQ", "AR", "AS",
    "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI",
    "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BU", "BV", "BW", "BY",
    "BZ", "CA", "CC", "CD", "CE", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN",
    "CO", "CP", "CR", "CS", "CS", "CU", "CV", "CW", "CX", "CY", "CZ", "DD", "DE",
    "DG", "DJ", "DK", "DM", "DO", "DZ", "EA", "EC", "EE", "EG", "EH", "ER", "ES",
    "ET", "EU", "FI", "FJ", "FK", "FM", "FO", "FR", "FX", "GA", "GB", "GD", "GE",
    "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU",
    "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "IC", "ID", "IE", "IL", "IM",
    "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH",
    "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK",
    "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH",
    "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW",
    "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR",
    "NT", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN",
    "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB",
    "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR",
    "SS", "ST", "SU", "SV", "SX", "SY", "SZ", "TA", "TC", "TD", "TF", "TG", "TH",
    "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG",
    "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS",
    "YE", "YT", "YU", "ZA", "ZM", "ZR", "ZW"
  ]
}
},{}],"node_modules/faker/lib/finance.js":[function(require,module,exports) {
/**
 * @namespace faker.finance
 */
var Finance = function (faker) {
  var ibanLib = require("./iban");
  var Helpers = faker.helpers,
      self = this;

  /**
   * account
   *
   * @method faker.finance.account
   * @param {number} length
   */
  self.account = function (length) {

      length = length || 8;

      var template = '';

      for (var i = 0; i < length; i++) {
          template = template + '#';
      }
      length = null;
      return Helpers.replaceSymbolWithNumber(template);
  };

  /**
   * accountName
   *
   * @method faker.finance.accountName
   */
  self.accountName = function () {

      return [Helpers.randomize(faker.definitions.finance.account_type), 'Account'].join(' ');
  };

  /**
   * routingNumber
   *
   * @method faker.finance.routingNumber
   */
  self.routingNumber = function () {

      var routingNumber = Helpers.replaceSymbolWithNumber('########');

      // Modules 10 straight summation.
      var sum = 0;

      for (var i = 0; i < routingNumber.length; i += 3) {
        sum += Number(routingNumber[i]) * 3;
        sum += Number(routingNumber[i + 1]) * 7;
        sum += Number(routingNumber[i + 2]) || 0;
      }

      return routingNumber + (Math.ceil(sum / 10) * 10 - sum);
  }

  /**
   * mask
   *
   * @method faker.finance.mask
   * @param {number} length
   * @param {boolean} parens
   * @param {boolean} ellipsis
   */
  self.mask = function (length, parens, ellipsis) {

      //set defaults
      length = (length == 0 || !length || typeof length == 'undefined') ? 4 : length;
      parens = (parens === null) ? true : parens;
      ellipsis = (ellipsis === null) ? true : ellipsis;

      //create a template for length
      var template = '';

      for (var i = 0; i < length; i++) {
          template = template + '#';
      }

      //prefix with ellipsis
      template = (ellipsis) ? ['...', template].join('') : template;

      template = (parens) ? ['(', template, ')'].join('') : template;

      //generate random numbers
      template = Helpers.replaceSymbolWithNumber(template);

      return template;
  };

  //min and max take in minimum and maximum amounts, dec is the decimal place you want rounded to, symbol is $, €, £, etc
  //NOTE: this returns a string representation of the value, if you want a number use parseFloat and no symbol

  /**
   * amount
   *
   * @method faker.finance.amount
   * @param {number} min
   * @param {number} max
   * @param {number} dec
   * @param {string} symbol
   *
   * @return {string}
   */
  self.amount = function (min, max, dec, symbol) {

      min = min || 0;
      max = max || 1000;
      dec = dec === undefined ? 2 : dec;
      symbol = symbol || '';
      var randValue = faker.random.number({ max: max, min: min, precision: Math.pow(10, -dec) });
      var stringNumber = symbol + randValue.toFixed(dec);

      return symbol + randValue.toFixed(dec);
  };

  /**
   * transactionType
   *
   * @method faker.finance.transactionType
   */
  self.transactionType = function () {
      return Helpers.randomize(faker.definitions.finance.transaction_type);
  };

  /**
   * currencyCode
   *
   * @method faker.finance.currencyCode
   */
  self.currencyCode = function () {
      return faker.random.objectElement(faker.definitions.finance.currency)['code'];
  };

  /**
   * currencyName
   *
   * @method faker.finance.currencyName
   */
  self.currencyName = function () {
      return faker.random.objectElement(faker.definitions.finance.currency, 'key');
  };

  /**
   * currencySymbol
   *
   * @method faker.finance.currencySymbol
   */
  self.currencySymbol = function () {
      var symbol;

      while (!symbol) {
          symbol = faker.random.objectElement(faker.definitions.finance.currency)['symbol'];
      }
      return symbol;
  };

  /**
   * bitcoinAddress
   *
   * @method  faker.finance.bitcoinAddress
   */
  self.bitcoinAddress = function () {
    var addressLength = faker.random.number({ min: 25, max: 34 });

    var address = faker.random.arrayElement(['1', '3']);

    for (var i = 0; i < addressLength - 1; i++)
      address += faker.random.arrayElement('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split(''));

    return address;
  }

/**
 * litecoinAddress
 *
 * @method  faker.finance.litecoinAddress
 */
self.litecoinAddress = function () {
  var addressLength = faker.random.number({ min: 26, max: 33 });

  var address = faker.random.arrayElement(['L', 'M', '3']);

  for (var i = 0; i < addressLength - 1; i++)
    address += faker.random.arrayElement('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split(''));

  return address;
}

  /**
   * Credit card number
   * @method faker.finance.creditCardNumber
   * @param {string} provider | scheme
  */
  self.creditCardNumber = function(provider){
    provider = provider || "";
    var format, formats;
    var localeFormat = faker.definitions.finance.credit_card;
    if (provider in localeFormat) {
      formats = localeFormat[provider]; // there chould be multiple formats
      if (typeof formats === "string") {
        format = formats;
      } else {
        format = faker.random.arrayElement(formats);
      }
    } else if (provider.match(/#/)) { // The user chose an optional scheme
      format = provider;
    } else { // Choose a random provider
      if (typeof localeFormat === 'string') {
        format = localeFormat;
      } else if( typeof localeFormat === "object") {
        // Credit cards are in a object structure
        formats = faker.random.objectElement(localeFormat, "value"); // There chould be multiple formats
        if (typeof formats === "string") {
          format = formats;
        } else {
          format = faker.random.arrayElement(formats);
        }
      }
    }
    format = format.replace(/\//g,"")
    return Helpers.replaceCreditCardSymbols(format);
  };
  /**
   * Credit card CVV
   * @method faker.finance.creditCardCVV
  */
  self.creditCardCVV = function() {
    var cvv = "";
    for (var i = 0; i < 3; i++) {
      cvv += faker.random.number({max:9}).toString();
    }
    return cvv;
  };

  /**
   * ethereumAddress
   *
   * @method  faker.finance.ethereumAddress
   */
  self.ethereumAddress = function () {
    var address = faker.random.hexaDecimal(40).toLowerCase();

    return address;
  };

  /**
   * iban
   *
   * @param {boolean} [formatted=false] - Return a formatted version of the generated IBAN.
   * @param {string} [countryCode] - The country code from which you want to generate an IBAN, if none is provided a random country will be used.
   * @throws Will throw an error if the passed country code is not supported.
   *
   * @method  faker.finance.iban
   */
  self.iban = function (formatted, countryCode) {
      var ibanFormat;
      if (countryCode) {
          var findFormat = function(currentFormat) { return currentFormat.country === countryCode; };
          ibanFormat = ibanLib.formats.find(findFormat);
      } else {
          ibanFormat = faker.random.arrayElement(ibanLib.formats);
      }

      if (!ibanFormat) {
          throw new Error('Country code ' + countryCode + ' not supported.');
      }

      var s = "";
      var count = 0;
      for (var b = 0; b < ibanFormat.bban.length; b++) {
          var bban = ibanFormat.bban[b];
          var c = bban.count;
          count += bban.count;
          while (c > 0) {
              if (bban.type == "a") {
                  s += faker.random.arrayElement(ibanLib.alpha);
              } else if (bban.type == "c") {
                  if (faker.random.number(100) < 80) {
                      s += faker.random.number(9);
                  } else {
                      s += faker.random.arrayElement(ibanLib.alpha);
                  }
              } else {
                  if (c >= 3 && faker.random.number(100) < 30) {
                      if (faker.random.boolean()) {
                          s += faker.random.arrayElement(ibanLib.pattern100);
                          c -= 2;
                      } else {
                          s += faker.random.arrayElement(ibanLib.pattern10);
                          c--;
                      }
                  } else {
                      s += faker.random.number(9);
                  }
              }
              c--;
          }
          s = s.substring(0, count);
      }
      var checksum = 98 - ibanLib.mod97(ibanLib.toDigitString(s + ibanFormat.country + "00"));
      if (checksum < 10) {
          checksum = "0" + checksum;
      }
      var iban = ibanFormat.country + checksum + s;
      return formatted ? iban.match(/.{1,4}/g).join(" ") : iban;
  };

  /**
   * bic
   *
   * @method  faker.finance.bic
   */
  self.bic = function () {
      var vowels = ["A", "E", "I", "O", "U"];
      var prob = faker.random.number(100);
      return Helpers.replaceSymbols("???") +
          faker.random.arrayElement(vowels) +
          faker.random.arrayElement(ibanLib.iso3166) +
          Helpers.replaceSymbols("?") + "1" +
          (prob < 10 ?
              Helpers.replaceSymbols("?" + faker.random.arrayElement(vowels) + "?") :
          prob < 40 ?
              Helpers.replaceSymbols("###") : "");
  };

  /**
   * description
   *
   * @method  faker.finance.transactionDescription
   */
  self.transactionDescription = function() {
    var account = Helpers.createTransaction().account
    var card = faker.finance.mask();
    var currency = faker.finance.currencyCode();
    var amount = Helpers.createTransaction().amount
    var transactionType = Helpers.createTransaction().type
    var company = Helpers.createTransaction().business
    return transactionType + " transaction at " + company + " using card ending with ***" + card + " for " + currency + " " + amount + " in account ***" + account
  }

};

module['exports'] = Finance;

},{"./iban":"node_modules/faker/lib/iban.js"}],"node_modules/faker/lib/image_providers/lorempixel.js":[function(require,module,exports) {
/**
 *
 * @namespace lorempixel
 * @memberof faker.image
 */
var Lorempixel = function (faker) {

  var self = this;

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.image
   */
  self.image = function (width, height, randomize) {
    var categories = ["abstract", "animals", "business", "cats", "city", "food", "nightlife", "fashion", "people", "nature", "sports", "technics", "transport"];
    return self[faker.random.arrayElement(categories)](width, height, randomize);
  };
  /**
   * avatar
   *
   * @method faker.image.lorempixel.avatar
   */
  self.avatar = function () {
    return faker.internet.avatar();
  };
  /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string} category
   * @param {boolean} randomize
   * @method faker.image.lorempixel.imageUrl
   */
  self.imageUrl = function (width, height, category, randomize) {
      var width = width || 640;
      var height = height || 480;

      var url ='https://lorempixel.com/' + width + '/' + height;
      if (typeof category !== 'undefined') {
        url += '/' + category;
      }

      if (randomize) {
        url += '?' + faker.random.number()
      }

      return url;
  };
  /**
   * abstract
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.abstract
   */
  self.abstract = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'abstract', randomize);
  };
  /**
   * animals
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.animals
   */
  self.animals = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'animals', randomize);
  };
  /**
   * business
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.business
   */
  self.business = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'business', randomize);
  };
  /**
   * cats
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.cats
   */
  self.cats = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'cats', randomize);
  };
  /**
   * city
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.city
   */
  self.city = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'city', randomize);
  };
  /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.food
   */
  self.food = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'food', randomize);
  };
  /**
   * nightlife
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.nightlife
   */
  self.nightlife = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'nightlife', randomize);
  };
  /**
   * fashion
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.fashion
   */
  self.fashion = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'fashion', randomize);
  };
  /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.people
   */
  self.people = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'people', randomize);
  };
  /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.nature
   */
  self.nature = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'nature', randomize);
  };
  /**
   * sports
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.sports
   */
  self.sports = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'sports', randomize);
  };
  /**
   * technics
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.technics
   */
  self.technics = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'technics', randomize);
  };
  /**
   * transport
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.lorempixel.transport
   */
  self.transport = function (width, height, randomize) {
    return faker.image.lorempixel.imageUrl(width, height, 'transport', randomize);
  }
}

module["exports"] = Lorempixel;

},{}],"node_modules/faker/lib/image_providers/unsplash.js":[function(require,module,exports) {
/**
 *
 * @namespace unsplash
 * @memberof faker.image
 */
var Unsplash = function (faker) {

  var self = this;
  var categories = ["food", "nature", "people", "technology", "objects", "buildings"];

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.image
   * @description search image from unsplash
   */
  self.image = function (width, height, keyword) {
    return self.imageUrl(width, height, undefined, keyword);
  };
  /**
   * avatar
   *
   * @method faker.image.unsplash.avatar
   */
  self.avatar = function () {
    return faker.internet.avatar();
  };
  /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string} category
   * @param {string} keyword
   * @method faker.image.unsplash.imageUrl
   */
  self.imageUrl = function (width, height, category, keyword) {
      var width = width || 640;
      var height = height || 480;

      var url ='https://source.unsplash.com';

      if (typeof category !== 'undefined') {
          url += '/category/' + category;
      }

      url += '/' + width + 'x' + height;

      if (typeof keyword !== 'undefined') {
          var keywordFormat = new RegExp('^([A-Za-z0-9].+,[A-Za-z0-9]+)$|^([A-Za-z0-9]+)$');
          if (keywordFormat.test(keyword)) {
            url += '?' + keyword;
          }
      }

      return url;
  };
  /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.food
   */
  self.food = function (width, height, keyword) {
    return faker.image.unsplash.imageUrl(width, height, 'food', keyword);
  };
  /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.people
   */
  self.people = function (width, height, keyword) {
    return faker.image.unsplash.imageUrl(width, height, 'people', keyword);
  };
  /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.nature
   */
  self.nature = function (width, height, keyword) {
    return faker.image.unsplash.imageUrl(width, height, 'nature', keyword);
  };
  /**
   * technology
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.technology
   */
  self.technology = function (width, height, keyword) {
    return faker.image.unsplash.imageUrl(width, height, 'technology', keyword);
  };
  /**
   * objects
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.objects
   */
  self.objects = function (width, height, keyword) {
    return faker.image.unsplash.imageUrl(width, height, 'objects', keyword);
  };
  /**
   * buildings
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.buildings
   */
  self.buildings = function (width, height, keyword) {
    return faker.image.unsplash.imageUrl(width, height, 'buildings', keyword);
  };
}

module["exports"] = Unsplash;

},{}],"node_modules/faker/lib/image_providers/lorempicsum.js":[function(require,module,exports) {
/**
 *
 * @namespace lorempicsum
 * @memberof faker.image
 */
var LoremPicsum = function (faker) {

    var self = this;

    /**
     * image
     *
     * @param {number} width
     * @param {number} height
     * @param {boolean} grayscale
     * @param {number} blur 1-10
     * @method faker.image.lorempicsum.image
     * @description search image from unsplash
     */
    self.image = function (width, height, grayscale, blur) {
      return self.imageUrl(width, height, grayscale, blur);
    };
    /**
     * imageGrayscaled
     *
     * @param {number} width
     * @param {number} height
     * @param {boolean} grayscale
     * @method faker.image.lorempicsum.imageGrayscaled
     * @description search grayscale image from unsplash
     */
    self.imageGrayscale = function (width, height, grayscale) {
      return self.imageUrl(width, height, grayscale);
    };
    /**
     * imageBlurred
     *
     * @param {number} width
     * @param {number} height
     * @param {number} blur 1-10
     * @method faker.image.lorempicsum.imageBlurred
     * @description search blurred image from unsplash
     */
    self.imageBlurred = function (width, height, blur) {
      return self.imageUrl(width, height, undefined, blur);
    };
    /**
     * imageRandomSeeded
     *
     * @param {number} width
     * @param {number} height
     * @param {boolean} grayscale
     * @param {number} blur 1-10
     * @param {string} seed
     * @method faker.image.lorempicsum.imageRandomSeeded
     * @description search same random image from unsplash, based on a seed
     */
    self.imageRandomSeeded = function (width, height, grayscale, blur, seed) {
      return self.imageUrl(width, height, grayscale, blur, seed);
    };
    /**
     * avatar
     *
     * @method faker.image.lorempicsum.avatar
     */
    self.avatar = function () {
      return faker.internet.avatar();
    };
    /**
     * imageUrl
     *
     * @param {number} width
     * @param {number} height
     * @param {boolean} grayscale
     * @param {number} blur 1-10
     * @param {string} seed
     * @method faker.image.lorempicsum.imageUrl
     */
    self.imageUrl = function (width, height, grayscale, blur, seed) {
        var width = width || 640;
        var height = height || 480;
  
        var url = 'https://picsum.photos';
          
        if (seed) {
          url += '/seed/' + seed;
        }

        url += '/' + width + '/' + height;
        
        if (grayscale && blur) {
          return url + '?grayscale' + '&blur=' + blur;
        }

        if (grayscale) {
          return url + '?grayscale';
        }

        if (blur) {
          return url + '?blur=' + blur;
        }
    
        return url;
    };
  }
  
  module["exports"] = LoremPicsum;
  
},{}],"node_modules/faker/lib/image.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.image
 * @property {object} lorempixel - faker.image.lorempixel
 * @property {object} unsplash - faker.image.unsplash
 * @property {object} unsplash - faker.image.lorempicsum
 * @default Default provider is unsplash image provider
 */
var Image = function (faker) {

  var self = this;
  var Lorempixel = require('./image_providers/lorempixel');
  var Unsplash = require('./image_providers/unsplash');
  var LoremPicsum = require('./image_providers/lorempicsum');

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.image
   */
  self.image = function (width, height, randomize) {
    var categories = ["abstract", "animals", "business", "cats", "city", "food", "nightlife", "fashion", "people", "nature", "sports", "technics", "transport"];
    return self[faker.random.arrayElement(categories)](width, height, randomize);
  };
  /**
   * avatar
   *
   * @method faker.image.avatar
   */
  self.avatar = function () {
    return faker.internet.avatar();
  };
  /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string} category
   * @param {boolean} randomize
   * @method faker.image.imageUrl
   */
  self.imageUrl = function (width, height, category, randomize, https) {
      var width = width || 640;
      var height = height || 480;
      var protocol = 'http://';
      if (typeof https !== 'undefined' && https === true) {
        protocol = 'https://';
      }
      var url = protocol + 'placeimg.com/' + width + '/' + height;
      if (typeof category !== 'undefined') {
        url += '/' + category;
      }

      if (randomize) {
        url += '?' + faker.random.number()
      }

      return url;
  };
  /**
   * abstract
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.abstract
   */
  self.abstract = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'abstract', randomize);
  };
  /**
   * animals
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.animals
   */
  self.animals = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'animals', randomize);
  };
  /**
   * business
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.business
   */
  self.business = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'business', randomize);
  };
  /**
   * cats
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.cats
   */
  self.cats = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'cats', randomize);
  };
  /**
   * city
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.city
   */
  self.city = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'city', randomize);
  };
  /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.food
   */
  self.food = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'food', randomize);
  };
  /**
   * nightlife
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.nightlife
   */
  self.nightlife = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'nightlife', randomize);
  };
  /**
   * fashion
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.fashion
   */
  self.fashion = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'fashion', randomize);
  };
  /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.people
   */
  self.people = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'people', randomize);
  };
  /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.nature
   */
  self.nature = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'nature', randomize);
  };
  /**
   * sports
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.sports
   */
  self.sports = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'sports', randomize);
  };
  /**
   * technics
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.technics
   */
  self.technics = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'technics', randomize);
  };
  /**
   * transport
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.transport
   */
  self.transport = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'transport', randomize);
  };
  /**
   * dataUri
   *
   * @param {number} width
   * @param {number} height
   * @param {string} color
   * @method faker.image.dataUri
   */
  self.dataUri = function (width, height, color) {
    color = color || 'grey';
    var svgString = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="' + width + '" height="' + height + '"><rect width="100%" height="100%" fill="' + color + '"/><text x="' + width / 2 + '" y="' + height / 2 + '" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">' + width + 'x' + height + '</text></svg>';
    var rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
    return rawPrefix + encodeURIComponent(svgString);
  };

  self.lorempixel = new Lorempixel(faker);
  self.unsplash = new Unsplash(faker);
  self.lorempicsum = new LoremPicsum(faker);

  // Object.assign(self, self.unsplash);
  // How to set default as unsplash? should be image.default?
}


module["exports"] = Image;

},{"./image_providers/lorempixel":"node_modules/faker/lib/image_providers/lorempixel.js","./image_providers/unsplash":"node_modules/faker/lib/image_providers/unsplash.js","./image_providers/lorempicsum":"node_modules/faker/lib/image_providers/lorempicsum.js"}],"node_modules/faker/lib/lorem.js":[function(require,module,exports) {

/**
 *
 * @namespace faker.lorem
 */
var Lorem = function (faker) {
  var self = this;
  var Helpers = faker.helpers;

  /**
   * generates a word of a specified length
   *
   * @method faker.lorem.word
   * @param {number} length length of the word that should be returned. Defaults to a random length
   */
  self.word = function (length) {
    var hasRightLength = function(word) { return word.length === length; };
    var properLengthWords;
    if(typeof length === 'undefined') {
      properLengthWords = faker.definitions.lorem.words;
    } else {
      properLengthWords = faker.definitions.lorem.words.filter(hasRightLength);
    }
    return faker.random.arrayElement(properLengthWords);
  };

  /**
   * generates a space separated list of words
   *
   * @method faker.lorem.words
   * @param {number} num number of words, defaults to 3
   */
  self.words = function (num) {
      if (typeof num == 'undefined') { num = 3; }
      var words = [];
      for (var i = 0; i < num; i++) {
        words.push(faker.lorem.word());
      }
      return words.join(' ');
  };

  /**
   * sentence
   *
   * @method faker.lorem.sentence
   * @param {number} wordCount defaults to a random number between 3 and 10
   * @param {number} range
   */
  self.sentence = function (wordCount, range) {
      if (typeof wordCount == 'undefined') { wordCount = faker.random.number({ min: 3, max: 10 }); }
      // if (typeof range == 'undefined') { range = 7; }

      // strange issue with the node_min_test failing for captialize, please fix and add faker.lorem.back
      //return  faker.lorem.words(wordCount + Helpers.randomNumber(range)).join(' ').capitalize();

      var sentence = faker.lorem.words(wordCount);
      return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  /**
   * slug
   *
   * @method faker.lorem.slug
   * @param {number} wordCount number of words, defaults to 3
   */
  self.slug = function (wordCount) {
      var words = faker.lorem.words(wordCount);
      return Helpers.slugify(words);
  };

  /**
   * sentences
   *
   * @method faker.lorem.sentences
   * @param {number} sentenceCount defautls to a random number between 2 and 6
   * @param {string} separator defaults to `' '`
   */
  self.sentences = function (sentenceCount, separator) {
      if (typeof sentenceCount === 'undefined') { sentenceCount = faker.random.number({ min: 2, max: 6 });}
      if (typeof separator == 'undefined') { separator = " "; }
      var sentences = [];
      for (sentenceCount; sentenceCount > 0; sentenceCount--) {
        sentences.push(faker.lorem.sentence());
      }
      return sentences.join(separator);
  };

  /**
   * paragraph
   *
   * @method faker.lorem.paragraph
   * @param {number} sentenceCount defaults to 3
   */
  self.paragraph = function (sentenceCount) {
      if (typeof sentenceCount == 'undefined') { sentenceCount = 3; }
      return faker.lorem.sentences(sentenceCount + faker.random.number(3));
  };

  /**
   * paragraphs
   *
   * @method faker.lorem.paragraphs
   * @param {number} paragraphCount defaults to 3
   * @param {string} separator defaults to `'\n \r'`
   */
  self.paragraphs = function (paragraphCount, separator) {
    if (typeof separator === "undefined") {
      separator = "\n \r";
    }
    if (typeof paragraphCount == 'undefined') { paragraphCount = 3; }
    var paragraphs = [];
    for (paragraphCount; paragraphCount > 0; paragraphCount--) {
        paragraphs.push(faker.lorem.paragraph());
    }
    return paragraphs.join(separator);
  }

  /**
   * returns random text based on a random lorem method
   *
   * @method faker.lorem.text
   * @param {number} times
   */
  self.text = function loremText (times) {
    var loremMethods = ['lorem.word', 'lorem.words', 'lorem.sentence', 'lorem.sentences', 'lorem.paragraph', 'lorem.paragraphs', 'lorem.lines'];
    var randomLoremMethod = faker.random.arrayElement(loremMethods);
    return faker.fake('{{' + randomLoremMethod + '}}');
  };

  /**
   * returns lines of lorem separated by `'\n'`
   *
   * @method faker.lorem.lines
   * @param {number} lineCount defaults to a random number between 1 and 5
   */
  self.lines = function lines (lineCount) {
    if (typeof lineCount === 'undefined') { lineCount = faker.random.number({ min: 1, max: 5 });}
    return faker.lorem.sentences(lineCount, '\n')
  };

  return self;
};


module["exports"] = Lorem;

},{}],"node_modules/faker/lib/hacker.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.hacker
 */
var Hacker = function (faker) {
  var self = this;
  
  /**
   * abbreviation
   *
   * @method faker.hacker.abbreviation
   */
  self.abbreviation = function () {
    return faker.random.arrayElement(faker.definitions.hacker.abbreviation);
  };

  /**
   * adjective
   *
   * @method faker.hacker.adjective
   */
  self.adjective = function () {
    return faker.random.arrayElement(faker.definitions.hacker.adjective);
  };

  /**
   * noun
   *
   * @method faker.hacker.noun
   */
  self.noun = function () {
    return faker.random.arrayElement(faker.definitions.hacker.noun);
  };

  /**
   * verb
   *
   * @method faker.hacker.verb
   */
  self.verb = function () {
    return faker.random.arrayElement(faker.definitions.hacker.verb);
  };

  /**
   * ingverb
   *
   * @method faker.hacker.ingverb
   */
  self.ingverb = function () {
    return faker.random.arrayElement(faker.definitions.hacker.ingverb);
  };

  /**
   * phrase
   *
   * @method faker.hacker.phrase
   */
  self.phrase = function () {

    var data = {
      abbreviation: self.abbreviation,
      adjective: self.adjective,
      ingverb: self.ingverb,
      noun: self.noun,
      verb: self.verb
    };

    var phrase = faker.random.arrayElement(faker.definitions.hacker.phrase);
    return faker.helpers.mustache(phrase, data);
  };
  
  return self;
};

module['exports'] = Hacker;
},{}],"node_modules/faker/vendor/user-agent.js":[function(require,module,exports) {
/*

Copyright (c) 2012-2014 Jeffrey Mealo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

------------------------------------------------------------------------------------------------------------------------

Based loosely on Luka Pusic's PHP Script: http://360percents.com/posts/php-random-user-agent-generator/

The license for that script is as follows:

"THE BEER-WARE LICENSE" (Revision 42):

<pusic93@gmail.com> wrote this file. As long as you retain this notice you can do whatever you want with this stuff.
If we meet some day, and you think this stuff is worth it, you can buy me a beer in return. Luka Pusic

*/

exports.generate = function generate(faker) {

    function rnd(a, b) {
        //calling rnd() with no arguments is identical to rnd(0, 100)
        a = a || 0;
        b = b || 100;

        if (typeof b === 'number' && typeof a === 'number') {

            // 9/2018 - Added faker random to ensure mersenne and seed
            return faker.random.number({ min: a, max: b});

        }

        if (Object.prototype.toString.call(a) === "[object Array]") {
            //returns a random element from array (a), even weighting
            return faker.random.arrayElement(a);
        }

        if (a && typeof a === 'object') {
            //returns a random key from the passed object; keys are weighted by the decimal probability in their value
            return (function (obj) {
                var rand = rnd(0, 100) / 100, min = 0, max = 0, key, return_val;

                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        max = obj[key] + min;
                        return_val = key;
                        if (rand >= min && rand <= max) {
                            break;
                        }
                        min = min + obj[key];
                    }
                }

                return return_val;
            }(a));
        }

        throw new TypeError('Invalid arguments passed to rnd. (' + (b ? a + ', ' + b : a) + ')');
    }

    function randomLang() {
        return rnd(['AB', 'AF', 'AN', 'AR', 'AS', 'AZ', 'BE', 'BG', 'BN', 'BO', 'BR', 'BS', 'CA', 'CE', 'CO', 'CS',
                    'CU', 'CY', 'DA', 'DE', 'EL', 'EN', 'EO', 'ES', 'ET', 'EU', 'FA', 'FI', 'FJ', 'FO', 'FR', 'FY',
                    'GA', 'GD', 'GL', 'GV', 'HE', 'HI', 'HR', 'HT', 'HU', 'HY', 'ID', 'IS', 'IT', 'JA', 'JV', 'KA',
                    'KG', 'KO', 'KU', 'KW', 'KY', 'LA', 'LB', 'LI', 'LN', 'LT', 'LV', 'MG', 'MK', 'MN', 'MO', 'MS',
                    'MT', 'MY', 'NB', 'NE', 'NL', 'NN', 'NO', 'OC', 'PL', 'PT', 'RM', 'RO', 'RU', 'SC', 'SE', 'SK',
                    'SL', 'SO', 'SQ', 'SR', 'SV', 'SW', 'TK', 'TR', 'TY', 'UK', 'UR', 'UZ', 'VI', 'VO', 'YI', 'ZH']);
    }

    function randomBrowserAndOS() {
        var browser = rnd({
            chrome:    .45132810566,
            iexplorer: .27477061836,
            firefox:   .19384170608,
            safari:    .06186781118,
            opera:     .01574236955
        }),
        os = {
            chrome:  {win: .89,  mac: .09 , lin: .02},
            firefox: {win: .83,  mac: .16,  lin: .01},
            opera:   {win: .91,  mac: .03 , lin: .06},
            safari:  {win: .04 , mac: .96  },
            iexplorer: ['win']
        };

        return [browser, rnd(os[browser])];
    }

    function randomProc(arch) {
        var procs = {
            lin:['i686', 'x86_64'],
            mac: {'Intel' : .48, 'PPC': .01, 'U; Intel':.48, 'U; PPC' :.01},
            win:['', 'WOW64', 'Win64; x64']
        };
        return rnd(procs[arch]);
    }

    function randomRevision(dots) {
        var return_val = '';
        //generate a random revision
        //dots = 2 returns .x.y where x & y are between 0 and 9
        for (var x = 0; x < dots; x++) {
            return_val += '.' + rnd(0, 9);
        }
        return return_val;
    }

    var version_string = {
        net: function () {
            return [rnd(1, 4), rnd(0, 9), rnd(10000, 99999), rnd(0, 9)].join('.');
        },
        nt: function () {
            return rnd(5, 6) + '.' + rnd(0, 3);
        },
        ie: function () {
            return rnd(7, 11);
        },
        trident: function () {
            return rnd(3, 7) + '.' + rnd(0, 1);
        },
        osx: function (delim) {
            return [10, rnd(5, 10), rnd(0, 9)].join(delim || '.');
        },
        chrome: function () {
            return [rnd(13, 39), 0, rnd(800, 899), 0].join('.');
        },
        presto: function () {
            return '2.9.' + rnd(160, 190);
        },
        presto2: function () {
            return rnd(10, 12) + '.00';
        },
        safari: function () {
            return rnd(531, 538) + '.' + rnd(0, 2) + '.' + rnd(0,2);
        }
    };

    var browser = {
        firefox: function firefox(arch) {
            //https://developer.mozilla.org/en-US/docs/Gecko_user_agent_string_reference
            var firefox_ver = rnd(5, 15) + randomRevision(2),
                gecko_ver = 'Gecko/20100101 Firefox/' + firefox_ver,
                proc = randomProc(arch),
                os_ver = (arch === 'win') ? '(Windows NT ' + version_string.nt() + ((proc) ? '; ' + proc : '')
                : (arch === 'mac') ? '(Macintosh; ' + proc + ' Mac OS X ' + version_string.osx()
                : '(X11; Linux ' + proc;

            return 'Mozilla/5.0 ' + os_ver + '; rv:' + firefox_ver.slice(0, -2) + ') ' + gecko_ver;
        },

        iexplorer: function iexplorer() {
            var ver = version_string.ie();

            if (ver >= 11) {
                //http://msdn.microsoft.com/en-us/library/ie/hh869301(v=vs.85).aspx
                return 'Mozilla/5.0 (Windows NT 6.' + rnd(1,3) + '; Trident/7.0; ' + rnd(['Touch; ', '']) + 'rv:11.0) like Gecko';
            }

            //http://msdn.microsoft.com/en-us/library/ie/ms537503(v=vs.85).aspx
            return 'Mozilla/5.0 (compatible; MSIE ' + ver + '.0; Windows NT ' + version_string.nt() + '; Trident/' +
                version_string.trident() + ((rnd(0, 1) === 1) ? '; .NET CLR ' + version_string.net() : '') + ')';
        },

        opera: function opera(arch) {
            //http://www.opera.com/docs/history/
            var presto_ver = ' Presto/' + version_string.presto() + ' Version/' + version_string.presto2() + ')',
                os_ver = (arch === 'win') ? '(Windows NT ' + version_string.nt() + '; U; ' + randomLang() + presto_ver
                : (arch === 'lin') ? '(X11; Linux ' + randomProc(arch) + '; U; ' + randomLang() + presto_ver
                : '(Macintosh; Intel Mac OS X ' + version_string.osx() + ' U; ' + randomLang() + ' Presto/' +
                version_string.presto() + ' Version/' + version_string.presto2() + ')';

            return 'Opera/' + rnd(9, 14) + '.' + rnd(0, 99) + ' ' + os_ver;
        },

        safari: function safari(arch) {
            var safari = version_string.safari(),
                ver = rnd(4, 7) + '.' + rnd(0,1) + '.' + rnd(0,10),
                os_ver = (arch === 'mac') ? '(Macintosh; ' + randomProc('mac') + ' Mac OS X '+ version_string.osx('_') + ' rv:' + rnd(2, 6) + '.0; '+ randomLang() + ') '
                : '(Windows; U; Windows NT ' + version_string.nt() + ')';

            return 'Mozilla/5.0 ' + os_ver + 'AppleWebKit/' + safari + ' (KHTML, like Gecko) Version/' + ver + ' Safari/' + safari;
        },

        chrome: function chrome(arch) {
            var safari = version_string.safari(),
                os_ver = (arch === 'mac') ? '(Macintosh; ' + randomProc('mac') + ' Mac OS X ' + version_string.osx('_') + ') '
                : (arch === 'win') ? '(Windows; U; Windows NT ' + version_string.nt() + ')'
                : '(X11; Linux ' + randomProc(arch);

            return 'Mozilla/5.0 ' + os_ver + ' AppleWebKit/' + safari + ' (KHTML, like Gecko) Chrome/' + version_string.chrome() + ' Safari/' + safari;
        }
    };

    var random = randomBrowserAndOS();
    return browser[random[0]](random[1]);
};

},{}],"node_modules/faker/lib/internet.js":[function(require,module,exports) {
var random_ua = require('../vendor/user-agent');

/**
 *
 * @namespace faker.internet
 */
var Internet = function (faker) {
  var self = this;
  /**
   * avatar
   *
   * @method faker.internet.avatar
   */
  self.avatar = function () {
      return faker.random.arrayElement(faker.definitions.internet.avatar_uri);
  };

  self.avatar.schema = {
    "description": "Generates a URL for an avatar.",
    "sampleResults": ["https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg"]
  };

  /**
   * email
   *
   * @method faker.internet.email
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} provider
   */
  self.email = function (firstName, lastName, provider) {
      provider = provider || faker.random.arrayElement(faker.definitions.internet.free_email);
      return  faker.helpers.slugify(faker.internet.userName(firstName, lastName)) + "@" + provider;
  };

  self.email.schema = {
    "description": "Generates a valid email address based on optional input criteria",
    "sampleResults": ["foo.bar@gmail.com"],
    "properties": {
      "firstName": {
        "type": "string",
        "required": false,
        "description": "The first name of the user"
      },
      "lastName": {
        "type": "string",
        "required": false,
        "description": "The last name of the user"
      },
      "provider": {
        "type": "string",
        "required": false,
        "description": "The domain of the user"
      }
    }
  };
  /**
   * exampleEmail
   *
   * @method faker.internet.exampleEmail
   * @param {string} firstName
   * @param {string} lastName
   */
  self.exampleEmail = function (firstName, lastName) {
      var provider = faker.random.arrayElement(faker.definitions.internet.example_email);
      return self.email(firstName, lastName, provider);
  };

  /**
   * userName
   *
   * @method faker.internet.userName
   * @param {string} firstName
   * @param {string} lastName
   */
  self.userName = function (firstName, lastName) {
      var result;
      firstName = firstName || faker.name.firstName();
      lastName = lastName || faker.name.lastName();
      switch (faker.random.number(2)) {
      case 0:
          result = firstName + faker.random.number(99);
          break;
      case 1:
          result = firstName + faker.random.arrayElement([".", "_"]) + lastName;
          break;
      case 2:
          result = firstName + faker.random.arrayElement([".", "_"]) + lastName + faker.random.number(99);
          break;
      }
      result = result.toString().replace(/'/g, "");
      result = result.replace(/ /g, "");
      return result;
  };

  self.userName.schema = {
    "description": "Generates a username based on one of several patterns. The pattern is chosen randomly.",
    "sampleResults": [
      "Kirstin39",
      "Kirstin.Smith",
      "Kirstin.Smith39",
      "KirstinSmith",
      "KirstinSmith39",
    ],
    "properties": {
      "firstName": {
        "type": "string",
        "required": false,
        "description": "The first name of the user"
      },
      "lastName": {
        "type": "string",
        "required": false,
        "description": "The last name of the user"
      }
    }
  };

  /**
   * protocol
   *
   * @method faker.internet.protocol
   */
  self.protocol = function () {
      var protocols = ['http','https'];
      return faker.random.arrayElement(protocols);
  };

  self.protocol.schema = {
    "description": "Randomly generates http or https",
    "sampleResults": ["https", "http"]
  };

  /**
   * method
   *
   * @method faker.internet.httpMethod
   */
  self.httpMethod = function () {
      var httpMethods = ['GET','POST', 'PUT', 'DELETE', 'PATCH'];
      return faker.random.arrayElement(httpMethods);
  };

  self.httpMethod.schema = {
    "description": "Randomly generates HTTP Methods (GET, POST, PUT, DELETE, PATCH)",
    "sampleResults": ["GET","POST", "PUT", "DELETE", "PATCH"]
  };

  /**
   * url
   *
   * @method faker.internet.url
   */
  self.url = function () {
      return faker.internet.protocol() + '://' + faker.internet.domainName();
  };

  self.url.schema = {
    "description": "Generates a random URL. The URL could be secure or insecure.",
    "sampleResults": [
      "http://rashawn.name",
      "https://rashawn.name"
    ]
  };

  /**
   * domainName
   *
   * @method faker.internet.domainName
   */
  self.domainName = function () {
      return faker.internet.domainWord() + "." + faker.internet.domainSuffix();
  };

  self.domainName.schema = {
    "description": "Generates a random domain name.",
    "sampleResults": ["marvin.org"]
  };

  /**
   * domainSuffix
   *
   * @method faker.internet.domainSuffix
   */
  self.domainSuffix = function () {
      return faker.random.arrayElement(faker.definitions.internet.domain_suffix);
  };

  self.domainSuffix.schema = {
    "description": "Generates a random domain suffix.",
    "sampleResults": ["net"]
  };

  /**
   * domainWord
   *
   * @method faker.internet.domainWord
   */
  self.domainWord = function () {
      return faker.name.firstName().replace(/([\\~#&*{}/:<>?|\"'])/ig, '').toLowerCase();
  };

  self.domainWord.schema = {
    "description": "Generates a random domain word.",
    "sampleResults": ["alyce"]
  };

  /**
   * ip
   *
   * @method faker.internet.ip
   */
  self.ip = function () {
      var randNum = function () {
          return (faker.random.number(255)).toFixed(0);
      };

      var result = [];
      for (var i = 0; i < 4; i++) {
          result[i] = randNum();
      }

      return result.join(".");
  };

  self.ip.schema = {
    "description": "Generates a random IP.",
    "sampleResults": ["97.238.241.11"]
  };

  /**
   * ipv6
   *
   * @method faker.internet.ipv6
   */
  self.ipv6 = function () {
      var randHash = function () {
          var result = "";
          for (var i = 0; i < 4; i++) {
            result += (faker.random.arrayElement(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]));
          }
          return result
      };

      var result = [];
      for (var i = 0; i < 8; i++) {
        result[i] = randHash();
      }
      return result.join(":");
  };

  self.ipv6.schema = {
    "description": "Generates a random IPv6 address.",
    "sampleResults": ["2001:0db8:6276:b1a7:5213:22f1:25df:c8a0"]
  };

  /**
   * port
   * 
   * @method faker.internet.port
   */
  self.port = function() {
    return faker.random.number({ min: 0, max: 65535 });
  };

  self.port.schema = {
    "description": "Generates a random port number.",
    "sampleResults": ["4422"]
  };

  /**
   * userAgent
   *
   * @method faker.internet.userAgent
   */
  self.userAgent = function () {
    return random_ua.generate(faker);
  };

  self.userAgent.schema = {
    "description": "Generates a random user agent.",
    "sampleResults": ["Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_7_5 rv:6.0; SL) AppleWebKit/532.0.1 (KHTML, like Gecko) Version/7.1.6 Safari/532.0.1"]
  };

  /**
   * color
   *
   * @method faker.internet.color
   * @param {number} baseRed255
   * @param {number} baseGreen255
   * @param {number} baseBlue255
   */
  self.color = function (baseRed255, baseGreen255, baseBlue255) {
      baseRed255 = baseRed255 || 0;
      baseGreen255 = baseGreen255 || 0;
      baseBlue255 = baseBlue255 || 0;
      // based on awesome response : http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
      var red = Math.floor((faker.random.number(256) + baseRed255) / 2);
      var green = Math.floor((faker.random.number(256) + baseGreen255) / 2);
      var blue = Math.floor((faker.random.number(256) + baseBlue255) / 2);
      var redStr = red.toString(16);
      var greenStr = green.toString(16);
      var blueStr = blue.toString(16);
      return '#' +
        (redStr.length === 1 ? '0' : '') + redStr +
        (greenStr.length === 1 ? '0' : '') + greenStr +
        (blueStr.length === 1 ? '0': '') + blueStr;

  };

  self.color.schema = {
    "description": "Generates a random hexadecimal color.",
    "sampleResults": ["#06267f"],
    "properties": {
      "baseRed255": {
        "type": "number",
        "required": false,
        "description": "The red value. Valid values are 0 - 255."
      },
      "baseGreen255": {
        "type": "number",
        "required": false,
        "description": "The green value. Valid values are 0 - 255."
      },
      "baseBlue255": {
        "type": "number",
        "required": false,
        "description": "The blue value. Valid values are 0 - 255."
      }
    }
  };

  /**
   * mac
   *
   * @method faker.internet.mac
   * @param {string} sep
   */
  self.mac = function(sep){
      var i, 
        mac = "",
        validSep = ':';

      // if the client passed in a different separator than `:`, 
      // we will use it if it is in the list of acceptable separators (dash or no separator)
      if (['-', ''].indexOf(sep) !== -1) {
        validSep = sep;
      } 

      for (i=0; i < 12; i++) {
          mac+= faker.random.number(15).toString(16);
          if (i%2==1 && i != 11) {
              mac+=validSep;
          }
      }
      return mac;
  };

  self.mac.schema = {
    "description": "Generates a random mac address.",
    "sampleResults": ["78:06:cc:ae:b3:81"]
  };

  /**
   * password
   *
   * @method faker.internet.password
   * @param {number} len
   * @param {boolean} memorable
   * @param {string} pattern
   * @param {string} prefix
   */
   self.password = function (len, memorable, pattern, prefix) {
     len = len || 15;
     if (typeof memorable === "undefined") {
       memorable = false;
     }
     /*
      * password-generator ( function )
      * Copyright(c) 2011-2013 Bermi Ferrer <bermi@bermilabs.com>
      * MIT Licensed
      */
     var consonant, letter, vowel;
     letter = /[a-zA-Z]$/;
     vowel = /[aeiouAEIOU]$/;
     consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;
     var _password = function (length, memorable, pattern, prefix) {
       var char, n;
       if (length == null) {
         length = 10;
       }
       if (memorable == null) {
         memorable = true;
       }
       if (pattern == null) {
         pattern = /\w/;
       }
       if (prefix == null) {
         prefix = '';
       }
       if (prefix.length >= length) {
         return prefix;
       }
       if (memorable) {
         if (prefix.match(consonant)) {
           pattern = vowel;
         } else {
           pattern = consonant;
         }
       }
       n = faker.random.number(94) + 33;
       char = String.fromCharCode(n);
       if (memorable) {
         char = char.toLowerCase();
       }
       if (!char.match(pattern)) {
         return _password(length, memorable, pattern, prefix);
       }
       return _password(length, memorable, pattern, "" + prefix + char);
     };
     return _password(len, memorable, pattern, prefix);
   }

  self.password.schema = {
    "description": "Generates a random password.",
    "sampleResults": [
      "AM7zl6Mg",
      "susejofe"
    ],
    "properties": {
      "length": {
        "type": "number",
        "required": false,
        "description": "The number of characters in the password."
      },
      "memorable": {
        "type": "boolean",
        "required": false,
        "description": "Whether a password should be easy to remember."
      },
      "pattern": {
        "type": "regex",
        "required": false,
        "description": "A regex to match each character of the password against. This parameter will be negated if the memorable setting is turned on."
      },
      "prefix": {
        "type": "string",
        "required": false,
        "description": "A value to prepend to the generated password. The prefix counts towards the length of the password."
      }
    }
  };

};


module["exports"] = Internet;

},{"../vendor/user-agent":"node_modules/faker/vendor/user-agent.js"}],"node_modules/faker/lib/database.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.database
 */
var Database = function (faker) {
  var self = this;
  /**
   * column
   *
   * @method faker.database.column
   */
  self.column = function () {
      return faker.random.arrayElement(faker.definitions.database.column);
  };

  self.column.schema = {
    "description": "Generates a column name.",
    "sampleResults": ["id", "title", "createdAt"]
  };

  /**
   * type
   *
   * @method faker.database.type
   */
  self.type = function () {
      return faker.random.arrayElement(faker.definitions.database.type);
  };

  self.type.schema = {
    "description": "Generates a column type.",
    "sampleResults": ["byte", "int", "varchar", "timestamp"]
  };

  /**
   * collation
   *
   * @method faker.database.collation
   */
  self.collation = function () {
      return faker.random.arrayElement(faker.definitions.database.collation);
  };

  self.collation.schema = {
    "description": "Generates a collation.",
    "sampleResults": ["utf8_unicode_ci", "utf8_bin"]
  };

  /**
   * engine
   *
   * @method faker.database.engine
   */
  self.engine = function () {
      return faker.random.arrayElement(faker.definitions.database.engine);
  };

  self.engine.schema = {
    "description": "Generates a storage engine.",
    "sampleResults": ["MyISAM", "InnoDB"]
  };
};

module["exports"] = Database;

},{}],"node_modules/faker/lib/phone_number.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.phone
 */
var Phone = function (faker) {
  var self = this;

  /**
   * phoneNumber
   *
   * @method faker.phone.phoneNumber
   * @param {string} format
   * @memberOf faker.phone
   */
  self.phoneNumber = function (format) {
      format = format || faker.phone.phoneFormats();
      return faker.helpers.replaceSymbolWithNumber(format);
  };

  // FIXME: this is strange passing in an array index.
  /**
   * phoneNumberFormat
   *
   * @method faker.phone.phoneFormatsArrayIndex
   * @param phoneFormatsArrayIndex
   * @memberOf faker.phone
   */
  self.phoneNumberFormat = function (phoneFormatsArrayIndex) {
      phoneFormatsArrayIndex = phoneFormatsArrayIndex || 0;
      return faker.helpers.replaceSymbolWithNumber(faker.definitions.phone_number.formats[phoneFormatsArrayIndex]);
  };

  /**
   * phoneFormats
   *
   * @method faker.phone.phoneFormats
   */
  self.phoneFormats = function () {
    return faker.random.arrayElement(faker.definitions.phone_number.formats);
  };
  
  return self;

};

module['exports'] = Phone;

},{}],"node_modules/faker/lib/date.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.date
 */
var _Date = function (faker) {
  var self = this;
  /**
   * past
   *
   * @method faker.date.past
   * @param {number} years
   * @param {date} refDate
   */
  self.past = function (years, refDate) {
      var date = new Date();
      if (typeof refDate !== "undefined") {
          date = new Date(Date.parse(refDate));
      }

      var range = {
        min: 1000,
        max: (years || 1) * 365 * 24 * 3600 * 1000
      };

      var past = date.getTime();
      past -= faker.random.number(range); // some time from now to N years ago, in milliseconds
      date.setTime(past);

      return date;
  };

  /**
   * future
   *
   * @method faker.date.future
   * @param {number} years
   * @param {date} refDate
   */
  self.future = function (years, refDate) {
      var date = new Date();
      if (typeof refDate !== "undefined") {
          date = new Date(Date.parse(refDate));
      }

      var range = {
        min: 1000,
        max: (years || 1) * 365 * 24 * 3600 * 1000
      };

      var future = date.getTime();
      future += faker.random.number(range); // some time from now to N years later, in milliseconds
      date.setTime(future);

      return date;
  };

  /**
   * between
   *
   * @method faker.date.between
   * @param {date} from
   * @param {date} to
   */
  self.between = function (from, to) {
      var fromMilli = Date.parse(from);
      var dateOffset = faker.random.number(Date.parse(to) - fromMilli);

      var newDate = new Date(fromMilli + dateOffset);

      return newDate;
  };

    /**
   * betweens
   *
   * @method faker.date.between
   * @param {date} from
   * @param {date} to
   */
  self.betweens = function (from, to, num) {
    if (typeof num == 'undefined') { num = 3; }
    var newDates = [];
    var fromMilli = Date.parse(from);
    var dateOffset = (Date.parse(to) - fromMilli) / ( num + 1 );
    var lastDate = from
    for (var i = 0; i < num; i++) {
        fromMilli = Date.parse(lastDate);
        lastDate = new Date(fromMilli + dateOffset)
        newDates.push(lastDate)
    }
    return newDates;
  };


  /**
   * recent
   *
   * @method faker.date.recent
   * @param {number} days
   * @param {date} refDate
   */
  self.recent = function (days, refDate) {
      var date = new Date();
      if (typeof refDate !== "undefined") {
          date = new Date(Date.parse(refDate));
      }

      var range = {
        min: 1000,
        max: (days || 1) * 24 * 3600 * 1000
      };

      var future = date.getTime();
      future -= faker.random.number(range); // some time from now to N days ago, in milliseconds
      date.setTime(future);

      return date;
  };

  /**
   * soon
   *
   * @method faker.date.soon
   * @param {number} days
   * @param {date} refDate
   */
  self.soon = function (days, refDate) {
      var date = new Date();
      if (typeof refDate !== "undefined") {
          date = new Date(Date.parse(refDate));
      }

      var range = {
        min: 1000,
        max: (days || 1) * 24 * 3600 * 1000
      };

      var future = date.getTime();
      future += faker.random.number(range); // some time from now to N days later, in milliseconds
      date.setTime(future);

      return date;
  };

  /**
   * month
   *
   * @method faker.date.month
   * @param {object} options
   */
  self.month = function (options) {
      options = options || {};

      var type = 'wide';
      if (options.abbr) {
          type = 'abbr';
      }
      if (options.context && typeof faker.definitions.date.month[type + '_context'] !== 'undefined') {
          type += '_context';
      }

      var source = faker.definitions.date.month[type];

      return faker.random.arrayElement(source);
  };

  /**
   * weekday
   *
   * @param {object} options
   * @method faker.date.weekday
   */
  self.weekday = function (options) {
      options = options || {};

      var type = 'wide';
      if (options.abbr) {
          type = 'abbr';
      }
      if (options.context && typeof faker.definitions.date.weekday[type + '_context'] !== 'undefined') {
          type += '_context';
      }

      var source = faker.definitions.date.weekday[type];

      return faker.random.arrayElement(source);
  };

  return self;

};

module['exports'] = _Date;

},{}],"node_modules/faker/lib/time.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.time
 */
var _Time = function(faker) {
  var self = this;

  /**
   * recent
   *
   * @method faker.time.recent
   * @param {string} outputType - 'abbr' || 'wide' || 'unix' (default choice)
   */
  self.recent = function(outputType) {
    if (typeof outputType === "undefined") {
        outputType = 'unix';
    }

    var date = new Date();
    switch (outputType) {
      case "abbr":
        date = date.toLocaleTimeString();
        break;
      case "wide":
        date = date.toTimeString();
        break;
      case "unix":
        date = date.getTime();
        break;
    }
    return date;
  };

  return self;
};

module["exports"] = _Time;

},{}],"node_modules/faker/lib/commerce.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.commerce
 */
var Commerce = function (faker) {
  var self = this;

  /**
   * color
   *
   * @method faker.commerce.color
   */
  self.color = function() {
      return faker.random.arrayElement(faker.definitions.commerce.color);
  };

  /**
   * department
   *
   * @method faker.commerce.department
   */
  self.department = function() {
      return faker.random.arrayElement(faker.definitions.commerce.department);
  };

  /**
   * productName
   *
   * @method faker.commerce.productName
   */
  self.productName = function() {
      return faker.commerce.productAdjective() + " " +
              faker.commerce.productMaterial() + " " +
              faker.commerce.product();
  };

  /**
   * price
   *
   * @method faker.commerce.price
   * @param {number} min
   * @param {number} max
   * @param {number} dec
   * @param {string} symbol
   *
   * @return {string}
   */
  self.price = function(min, max, dec, symbol) {
      min = min || 1;
      max = max || 1000;
      dec = dec === undefined ? 2 : dec;
      symbol = symbol || '';

      if (min < 0 || max < 0) {
          return symbol + 0.00;
      }

      var randValue = faker.random.number({ max: max, min: min });

      return symbol + (Math.round(randValue * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
  };

  /*
  self.categories = function(num) {
      var categories = [];

      do {
          var category = faker.random.arrayElement(faker.definitions.commerce.department);
          if(categories.indexOf(category) === -1) {
              categories.push(category);
          }
      } while(categories.length < num);

      return categories;
  };

  */
  /*
  self.mergeCategories = function(categories) {
      var separator = faker.definitions.separator || " &";
      // TODO: find undefined here
      categories = categories || faker.definitions.commerce.categories;
      var commaSeparated = categories.slice(0, -1).join(', ');

      return [commaSeparated, categories[categories.length - 1]].join(separator + " ");
  };
  */

  /**
   * productAdjective
   *
   * @method faker.commerce.productAdjective
   */
  self.productAdjective = function() {
      return faker.random.arrayElement(faker.definitions.commerce.product_name.adjective);
  };

  /**
   * productMaterial
   *
   * @method faker.commerce.productMaterial
   */
  self.productMaterial = function() {
      return faker.random.arrayElement(faker.definitions.commerce.product_name.material);
  };

  /**
   * product
   *
   * @method faker.commerce.product
   */
  self.product = function() {
      return faker.random.arrayElement(faker.definitions.commerce.product_name.product);
  };

  /**
   * productDescription
   *
   * @method faker.commerce.productDescription
   */
  self.productDescription = function() {
      return faker.random.arrayElement(faker.definitions.commerce.product_description);
  };

  return self;
};

module['exports'] = Commerce;

},{}],"node_modules/faker/lib/system.js":[function(require,module,exports) {
// generates fake data for many computer systems properties

/**
 *
 * @namespace faker.system
 */
function System (faker) {

  /**
   * generates a file name with extension or optional type
   *
   * @method faker.system.fileName
   * @param {string} ext
   * @param {string} type
   */
  this.fileName = function (ext, type) {
    var str = faker.fake("{{random.words}}.{{system.fileExt}}");
    str = str.replace(/ /g, '_');
    str = str.replace(/\,/g, '_');
    str = str.replace(/\-/g, '_');
    str = str.replace(/\\/g, '_');
    str = str.replace(/\//g, '_');
    str = str.toLowerCase();
    return str;
  };

  /**
   * commonFileName
   *
   * @method faker.system.commonFileName
   * @param {string} ext
   * @param {string} type
   */
  this.commonFileName = function (ext, type) {
    var str = faker.random.words() + "." + (ext || faker.system.commonFileExt());
    str = str.replace(/ /g, '_');
    str = str.replace(/\,/g, '_');
    str = str.replace(/\-/g, '_');
    str = str.replace(/\\/g, '_');
    str = str.replace(/\//g, '_');
    str = str.toLowerCase();
    return str;
  };

  /**
   * mimeType
   *
   * @method faker.system.mimeType
   */
  this.mimeType = function () {
    return faker.random.arrayElement(Object.keys(faker.definitions.system.mimeTypes));
  };

  /**
   * returns a commonly used file type
   *
   * @method faker.system.commonFileType
   */
  this.commonFileType = function () {
    var types = ['video', 'audio', 'image', 'text', 'application'];
    return faker.random.arrayElement(types)
  };

  /**
   * returns a commonly used file extension based on optional type
   *
   * @method faker.system.commonFileExt
   * @param {string} type
   */
  this.commonFileExt = function (type) {
    var types = [
      'application/pdf',
      'audio/mpeg',
      'audio/wav',
      'image/png',
      'image/jpeg',
      'image/gif',
      'video/mp4',
      'video/mpeg',
      'text/html'
    ];
    return faker.system.fileExt(faker.random.arrayElement(types));
  };


  /**
   * returns any file type available as mime-type
   *
   * @method faker.system.fileType
   */
  this.fileType = function () {
    var types = [];
    var mimes = faker.definitions.system.mimeTypes;
    Object.keys(mimes).forEach(function(m){
      var parts = m.split('/');
      if (types.indexOf(parts[0]) === -1) {
        types.push(parts[0]);
      }
    });
    return faker.random.arrayElement(types);
  };

  /**
   * fileExt
   *
   * @method faker.system.fileExt
   * @param {string} mimeType
   */
  this.fileExt = function (mimeType) {
    var exts = [];
    var mimes = faker.definitions.system.mimeTypes;

    // get specific ext by mime-type
    if (typeof mimes[mimeType] === "object") {
      return faker.random.arrayElement(mimes[mimeType].extensions);
    }

    // reduce mime-types to those with file-extensions
    Object.keys(mimes).forEach(function(m){
      if (mimes[m].extensions instanceof Array) {
        mimes[m].extensions.forEach(function(ext){
          exts.push(ext)
        });
      }
    });
    return faker.random.arrayElement(exts);
  };

  /**
   * returns directory path
   *
   * @method faker.system.directoryPath
   */
  this.directoryPath = function () {
      var paths = faker.definitions.system.directoryPaths
      return faker.random.arrayElement(paths);
  };

  /**
   * returns file path
   *
   * @method faker.system.filePath
   */
  this.filePath = function () {
      return faker.fake("{{system.directoryPath}}/{{system.fileName}}");
  };

  /**
   * semver
   *
   * @method faker.system.semver
   */
  this.semver = function () {
      return [faker.random.number(9),
              faker.random.number(9),
              faker.random.number(9)].join('.');
  }

}

module['exports'] = System;

},{}],"node_modules/faker/lib/git.js":[function(require,module,exports) {
/**
 * @namespace faker.git
 */

var Git = function(faker) {
  var self = this;
  var f = faker.fake;

  var hexChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

  /**
   * branch
   *
   * @method faker.git.branch
   */
  self.branch = function() {
    var noun = faker.hacker.noun().replace(' ', '-');
    var verb = faker.hacker.verb().replace(' ', '-');
    return noun + '-' + verb;
  }

  /**
   * commitEntry
   *
   * @method faker.git.commitEntry
   * @param {object} options
   */
  self.commitEntry = function(options) {
    options = options || {};

    var entry = 'commit {{git.commitSha}}\r\n';

    if (options.merge || (faker.random.number({ min: 0, max: 4 }) === 0)) {
      entry += 'Merge: {{git.shortSha}} {{git.shortSha}}\r\n';
    }

    entry += 'Author: {{name.firstName}} {{name.lastName}} <{{internet.email}}>\r\n';
    entry += 'Date: ' + faker.date.recent().toString() + '\r\n';
    entry += '\r\n\xa0\xa0\xa0\xa0{{git.commitMessage}}\r\n';

    return f(entry);
  };

  /**
   * commitMessage
   *
   * @method faker.git.commitMessage
   */
  self.commitMessage = function() {
    var format = '{{hacker.verb}} {{hacker.adjective}} {{hacker.noun}}';
    return f(format);
  };

  /**
   * commitSha
   *
   * @method faker.git.commitSha
   */
  self.commitSha = function() {
    var commit = "";

    for (var i = 0; i < 40; i++) {
      commit += faker.random.arrayElement(hexChars);
    }

    return commit;
  };

  /**
   * shortSha
   *
   * @method faker.git.shortSha
   */
  self.shortSha = function() {
    var shortSha = "";

    for (var i = 0; i < 7; i++) {
      shortSha += faker.random.arrayElement(hexChars);
    }

    return shortSha;
  };

  return self;
}

module['exports'] = Git;

},{}],"node_modules/faker/lib/vehicle.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.vehicle
 */
var Vehicle = function (faker) {
  var self = this;
  var fake = faker.fake;

  /**
   * vehicle
   *
   * @method faker.vehicle.vehicle
   */
  self.vehicle = function () {
    return fake('{{vehicle.manufacturer}} {{vehicle.model}}');
  };

  self.vehicle.schema = {
    "description": "Generates a random vehicle.",
    "sampleResults": ["BMW Explorer", "Ford Camry", "Lamborghini Ranchero"]
  };

  /**
   * manufacturer
   *
   * @method faker.vehicle.manufacturer
   */
  self.manufacturer = function () {
    return faker.random.arrayElement(faker.definitions.vehicle.manufacturer);
  };

  self.manufacturer.schema = {
    "description": "Generates a manufacturer name.",
    "sampleResults": ["Ford", "Jeep", "Tesla"]
  };


  /**
   * model
   *
   * @method faker.vehicle.model
   */
  self.model = function () {
    return faker.random.arrayElement(faker.definitions.vehicle.model);
  };

  self.model.schema = {
    "description": "Generates a vehicle model.",
    "sampleResults": ["Explorer", "Camry", "Ranchero"]
  };

  /**
   * type
   *
   * @method faker.vehicle.type
   */
  self.type = function () {
    return faker.random.arrayElement(faker.definitions.vehicle.type);
  };

  self.type.schema = {
    "description": "Generates a vehicle type.",
    "sampleResults": ["Coupe", "Convertable", "Sedan", "SUV"]
  };

  /**
   * fuel
   *
   * @method faker.vehicle.fuel
   */
  self.fuel = function () {
    return faker.random.arrayElement(faker.definitions.vehicle.fuel);
  };

  self.fuel.schema = {
    "description": "Generates a fuel type.",
    "sampleResults": ["Electric", "Gasoline", "Diesel"]
  };

  /**
   * vin
   *
   * @method faker.vehicle.vin
   */
  self.vin = function () {
    return (
      faker.random.alphaNumeric(10) +
      faker.random.alpha({ count: 1, upcase: true }) +
      faker.random.alphaNumeric(1) +
      faker.random.number({ min: 10000, max: 100000}) // return five digit #
    ).toUpperCase();
  };

  self.vin.schema = {
    "description": "Generates a valid VIN number.",
    "sampleResults": ["YV1MH682762184654", "3C7WRMBJ2EG208836"]
  };

  /**
   * color
   *
   * @method faker.vehicle.color
   */
  self.color = function () {
    return fake('{{commerce.color}}');
  };

  self.color.schema = {
    "description": "Generates a color",
    "sampleResults": ["red", "white", "black"]
  };

    /**
     * vrm
     *
     * @method faker.vehicle.vrm
     */
    self.vrm = function () {
        return (
            faker.random.alpha({ count: 2, upcase: true }) +
            faker.random.number({ min: 0, max: 9 }) +
            faker.random.number({ min: 0, max: 9 }) +
            faker.random.alpha({ count: 3, upcase: true })
        ).toUpperCase();
    };

    self.vrm.schema = {
        "description": "Generates a vehicle vrm",
        "sampleResults": ["MF56UPA", "GL19AAQ", "SF20TTA"]
    };
};

module["exports"] = Vehicle;

},{}],"node_modules/faker/lib/music.js":[function(require,module,exports) {
/**
 *
 * @namespace faker.music
 */
var Music = function (faker) {
    var self = this;
    /**
     * genre
     *
     * @method faker.music.genre
     */
    self.genre = function () {
        return faker.random.arrayElement(faker.definitions.music.genre);
    };

    self.genre.schema = {
        "description": "Generates a genre.",
        "sampleResults": ["Rock", "Metal", "Pop"]
    };
};

module["exports"] = Music;

},{}],"node_modules/faker/lib/index.js":[function(require,module,exports) {
/*

   this index.js file is used for including the faker library as a CommonJS module, instead of a bundle

   you can include the faker library into your existing node.js application by requiring the entire /faker directory

    var faker = require(./faker);
    var randomName = faker.name.findName();

   you can also simply include the "faker.js" file which is the auto-generated bundled version of the faker library

    var faker = require(./customAppPath/faker);
    var randomName = faker.name.findName();


  if you plan on modifying the faker library you should be performing your changes in the /lib/ directory

*/

/**
 *
 * @namespace faker
 */
function Faker (opts) {

  var self = this;

  opts = opts || {};

  // assign options
  var locales = self.locales || opts.locales || {};
  var locale = self.locale || opts.locale || "en";
  var localeFallback = self.localeFallback || opts.localeFallback || "en";

  self.locales = locales;
  self.locale = locale;
  self.localeFallback = localeFallback;

  self.definitions = {};

  var Fake = require('./fake');
  self.fake = new Fake(self).fake;

  var Unique = require('./unique');
  self.unique = new Unique(self).unique;

  var Random = require('./random');
  self.random = new Random(self);

  var Helpers = require('./helpers');
  self.helpers = new Helpers(self);

  var Name = require('./name');
  self.name = new Name(self);

  var Address = require('./address');
  self.address = new Address(self);

  var Company = require('./company');
  self.company = new Company(self);

  var Finance = require('./finance');
  self.finance = new Finance(self);

  var Image = require('./image');
  self.image = new Image(self);

  var Lorem = require('./lorem');
  self.lorem = new Lorem(self);

  var Hacker = require('./hacker');
  self.hacker = new Hacker(self);

  var Internet = require('./internet');
  self.internet = new Internet(self);

  var Database = require('./database');
  self.database = new Database(self);

  var Phone = require('./phone_number');
  self.phone = new Phone(self);

  var _Date = require('./date');
  self.date = new _Date(self);

  var _Time = require('./time');
  self.time = new _Time(self);

  var Commerce = require('./commerce');
  self.commerce = new Commerce(self);

  var System = require('./system');
  self.system = new System(self);

  var Git = require('./git');
  self.git = new Git(self);

  var Vehicle = require('./vehicle');
  self.vehicle = new Vehicle(self);

  var Music = require('./music');
  self.music = new Music(self);

  var _definitions = {
    "name": ["first_name", "last_name", "prefix", "suffix", "gender", "title", "male_prefix", "female_prefix", "male_first_name", "female_first_name", "male_middle_name", "female_middle_name", "male_last_name", "female_last_name"],
    "address": ["city_prefix", "city_suffix", "street_suffix", "county", "country", "country_code", "country_code_alpha_3", "state", "state_abbr", "street_prefix", "postcode", "postcode_by_state", "direction", "direction_abbr", "time_zone"],
    "company": ["adjective", "noun", "descriptor", "bs_adjective", "bs_noun", "bs_verb", "suffix"],
    "lorem": ["words"],
    "hacker": ["abbreviation", "adjective", "noun", "verb", "ingverb", "phrase"],
    "phone_number": ["formats"],
    "finance": ["account_type", "transaction_type", "currency", "iban", "credit_card"],
    "internet": ["avatar_uri", "domain_suffix", "free_email", "example_email", "password"],
    "commerce": ["color", "department", "product_name", "price", "categories", "product_description"],
    "database": ["collation", "column", "engine", "type"],
    "system": ["mimeTypes", "directoryPaths"],
    "date": ["month", "weekday"],
    "vehicle": ["vehicle", "manufacturer", "model", "type", "fuel", "vin", "color"],
    "music": ["genre"],
    "title": "",
    "separator": ""
  };

  // Create a Getter for all definitions.foo.bar properties
  Object.keys(_definitions).forEach(function(d){
    if (typeof self.definitions[d] === "undefined") {
      self.definitions[d] = {};
    }

    if (typeof _definitions[d] === "string") {
        self.definitions[d] = _definitions[d];
      return;
    }

    _definitions[d].forEach(function(p){
      Object.defineProperty(self.definitions[d], p, {
        get: function () {
          if (typeof self.locales[self.locale][d] === "undefined" || typeof self.locales[self.locale][d][p] === "undefined") {
            // certain localization sets contain less data then others.
            // in the case of a missing definition, use the default localeFallback to substitute the missing set data
            // throw new Error('unknown property ' + d + p)
            return self.locales[localeFallback][d][p];
          } else {
            // return localized data
            return self.locales[self.locale][d][p];
          }
        }
      });
    });
  });

};

Faker.prototype.setLocale = function (locale) {
  this.locale = locale;
}

Faker.prototype.seed = function(value) {
  var Random = require('./random');
  this.seedValue = value;
  this.random = new Random(this, this.seedValue);
}
module['exports'] = Faker;

},{"./fake":"node_modules/faker/lib/fake.js","./unique":"node_modules/faker/lib/unique.js","./random":"node_modules/faker/lib/random.js","./helpers":"node_modules/faker/lib/helpers.js","./name":"node_modules/faker/lib/name.js","./address":"node_modules/faker/lib/address.js","./company":"node_modules/faker/lib/company.js","./finance":"node_modules/faker/lib/finance.js","./image":"node_modules/faker/lib/image.js","./lorem":"node_modules/faker/lib/lorem.js","./hacker":"node_modules/faker/lib/hacker.js","./internet":"node_modules/faker/lib/internet.js","./database":"node_modules/faker/lib/database.js","./phone_number":"node_modules/faker/lib/phone_number.js","./date":"node_modules/faker/lib/date.js","./time":"node_modules/faker/lib/time.js","./commerce":"node_modules/faker/lib/commerce.js","./system":"node_modules/faker/lib/system.js","./git":"node_modules/faker/lib/git.js","./vehicle":"node_modules/faker/lib/vehicle.js","./music":"node_modules/faker/lib/music.js"}],"node_modules/faker/lib/locales/pt_BR/address/city_prefix.js":[function(require,module,exports) {
module["exports"] = [
];

},{}],"node_modules/faker/lib/locales/pt_BR/address/city_suffix.js":[function(require,module,exports) {
module["exports"] = [
];

},{}],"node_modules/faker/lib/locales/pt_BR/address/country.js":[function(require,module,exports) {
module["exports"] = [
  "Afeganistão",
  "Albânia",
  "Algéria",
  "Samoa",
  "Andorra",
  "Angola",
  "Anguila",
  "Antigua and Barbada",
  "Argentina",
  "Armênia",
  "Aruba",
  "Austrália",
  "Áustria",
  "Azerbaijão",
  "Bahamas",
  "Barém",
  "Bangladesh",
  "Barbados",
  "Bélgica",
  "Belize",
  "Benin",
  "Bermuda",
  "Butão",
  "Bolívia",
  "Bôsnia",
  "Botsuana",
  "Ilha Bouvet",
  "Brasil",
  "Arquipélago de Chagos",
  "Ilhas Virgens",
  "Brunei",
  "Bulgária",
  "Burkina Faso",
  "Burundi",
  "Camboja",
  "Camarões",
  "Canadá",
  "Cabo Verde",
  "Ilhas Caiman",
  "República da África Central",
  "Chade",
  "Chile",
  "China",
  "Ilha do Natal",
  "Ilhas Cocos",
  "Colômbia",
  "Comores",
  "Congo",
  "Ilhas Cook",
  "Costa Rica",
  "Costa do Marfim",
  "Croácia",
  "Cuba",
  "Chipre",
  "República Tcheca",
  "Dinamarca",
  "Jibuti",
  "Dominica",
  "República Dominicana",
  "Equador",
  "Egito",
  "El Salvador",
  "Guiné Equatorial",
  "Eritreia",
  "Estônia",
  "Etiópia",
  "Ilhas Faroe",
  "Malvinas",
  "Fiji",
  "Finlândia",
  "França",
  "Guiné Francesa",
  "Polinésia Francesa",
  "Gabão",
  "Gâmbia",
  "Georgia",
  "Alemanha",
  "Gana",
  "Gibraltar",
  "Grécia",
  "Groelândia",
  "Granada",
  "Guadalupe",
  "Guatemala",
  "Guernesey",
  "Guiné",
  "Guiné-Bissau",
  "Guiana",
  "Haiti",
  "Ilhas Heard e McDonald",
  "Vaticano",
  "Honduras",
  "Hong Kong",
  "Hungria",
  "Islândia",
  "Índia",
  "Indonésia",
  "Irã",
  "Iraque",
  "Irlanda",
  "Ilha de Man",
  "Israel",
  "Itália",
  "Jamaica",
  "Japão",
  "Jersey",
  "Jordânia",
  "Cazaquistão",
  "Quênia",
  "Quiribati",
  "Coreia do Norte",
  "Coreia do Sul",
  "Kuwait",
  "Quirguistão",
  "Laos",
  "Latvia",
  "Líbano",
  "Lesoto",
  "Libéria",
  "Líbia",
  "Liechtenstein",
  "Lituânia",
  "Luxemburgo",
  "Macao",
  "Macedônia",
  "Madagascar",
  "Malawi",
  "Malásia",
  "Maldives",
  "Mali",
  "Malta",
  "Ilhas Marshall",
  "Martinica",
  "Mauritânia",
  "Maurícia",
  "Maiote",
  "México",
  "Micronésia",
  "Moldávia",
  "Mônaco",
  "Mongólia",
  "Montenegro",
  "Montserrat",
  "Marrocos",
  "Moçambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Antilhas Holandesas",
  "Holanda",
  "Nova Caledonia",
  "Nova Zelândia",
  "Nicarágua",
  "Nigéria",
  "Niue",
  "Ilha Norfolk",
  "Marianas Setentrionais",
  "Noruega",
  "Omã",
  "Paquistão",
  "Palau",
  "Território da Palestina",
  "Panamá",
  "Papua-Nova Guiné",
  "Paraguai",
  "Peru",
  "Filipinas",
  "Polônia",
  "Portugal",
  "Porto Rico",
  "Qatar",
  "Romênia",
  "Rússia",
  "Ruanda",
  "São Bartolomeu",
  "Santa Helena",
  "Santa Lúcia",
  "São Martinho",
  "São Pedro e Miquelão",
  "São Vicente e Granadinas",
  "Samoa",
  "San Marino",
  "Sao Tomé e Príncipe",
  "Arábia Saudita",
  "Senegal",
  "Sérvia",
  "Seicheles",
  "Serra Leoa",
  "Singapura",
  "Eslováquia",
  "Eslovênia",
  "Ilhas Salomão",
  "Somália",
  "África do Sul",
  "Ilhas Geórgia do Sul e Sandwich do Sul",
  "Espanha",
  "Sri Lanka",
  "Sudão",
  "Suriname",
  "Ilhas Svalbard & Jan Mayen",
  "Suazilândia",
  "Suécia",
  "Suíça",
  "Síria",
  "Taiwan",
  "Tajiquistão",
  "Tanzânia",
  "Tailândia",
  "Timor-Leste",
  "Togo",
  "Toquelau",
  "Tonga",
  "Trinidad e Tobago",
  "Tunísia",
  "Turquia",
  "Turcomenistão",
  "Turcas e Caicos",
  "Tuvalu",
  "Uganda",
  "Ucrânia",
  "Emirados Árabes Unidos",
  "Reino Unido",
  "Estados Unidos da América",
  "Estados Unidos das Ilhas Virgens",
  "Uruguai",
  "Uzbequistão",
  "Vanuatu",
  "Venezuela",
  "Vietnã",
  "Wallis e Futuna",
  "Iêmen",
  "Zâmbia",
  "Zimbábue"
];

},{}],"node_modules/faker/lib/locales/pt_BR/address/building_number.js":[function(require,module,exports) {
module["exports"] = [
  "#####",
  "####",
  "###"
];

},{}],"node_modules/faker/lib/locales/pt_BR/address/street_suffix.js":[function(require,module,exports) {
module["exports"] = [
  "Rua",
  "Avenida",
  "Travessa",
  "Alameda",
  "Marginal",
  "Rodovia"
];

},{}],"node_modules/faker/lib/locales/pt_BR/address/secondary_address.js":[function(require,module,exports) {
module["exports"] = [
  "Apto. ###",
  "Sobrado ##",
  "Casa #",
  "Lote ##",
  "Quadra ##"
];

},{}],"node_modules/faker/lib/locales/pt_BR/address/postcode.js":[function(require,module,exports) {
module["exports"] = [
  "#####-###"
];

},{}],"node_modules/faker/lib/locales/pt_BR/address/state.js":[function(require,module,exports) {
module["exports"] = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins"
];

},{}],"node_modules/faker/lib/locales/pt_BR/address/state_abbr.js":[function(require,module,exports) {
module["exports"] = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO"
];

},{}],"node_modules/faker/lib/locales/pt_BR/address/default_country.js":[function(require,module,exports) {
module["exports"] = [
  "Brasil"
];

},{}],"node_modules/faker/lib/locales/pt_BR/address/index.js":[function(require,module,exports) {
var address = {};
module['exports'] = address;
address.city_prefix = require("./city_prefix");
address.city_suffix = require("./city_suffix");
address.country = require("./country");
address.building_number = require("./building_number");
address.street_suffix = require("./street_suffix");
address.secondary_address = require("./secondary_address");
address.postcode = require("./postcode");
address.state = require("./state");
address.state_abbr = require("./state_abbr");
address.default_country = require("./default_country");

},{"./city_prefix":"node_modules/faker/lib/locales/pt_BR/address/city_prefix.js","./city_suffix":"node_modules/faker/lib/locales/pt_BR/address/city_suffix.js","./country":"node_modules/faker/lib/locales/pt_BR/address/country.js","./building_number":"node_modules/faker/lib/locales/pt_BR/address/building_number.js","./street_suffix":"node_modules/faker/lib/locales/pt_BR/address/street_suffix.js","./secondary_address":"node_modules/faker/lib/locales/pt_BR/address/secondary_address.js","./postcode":"node_modules/faker/lib/locales/pt_BR/address/postcode.js","./state":"node_modules/faker/lib/locales/pt_BR/address/state.js","./state_abbr":"node_modules/faker/lib/locales/pt_BR/address/state_abbr.js","./default_country":"node_modules/faker/lib/locales/pt_BR/address/default_country.js"}],"node_modules/faker/lib/locales/pt_BR/company/suffix.js":[function(require,module,exports) {
module["exports"] = [
  "S.A.",
  "LTDA",
  "EIRELI",
  "e Associados",
  "Comércio"
];

},{}],"node_modules/faker/lib/locales/pt_BR/company/name.js":[function(require,module,exports) {
module["exports"] = [
  "#{Name.last_name} #{suffix}",
  "#{Name.last_name}-#{Name.last_name}",
  "#{Name.last_name}, #{Name.last_name} e #{Name.last_name}"
];

},{}],"node_modules/faker/lib/locales/pt_BR/company/index.js":[function(require,module,exports) {
var company = {};
module['exports'] = company;
company.suffix = require("./suffix");
company.name = require("./name");

},{"./suffix":"node_modules/faker/lib/locales/pt_BR/company/suffix.js","./name":"node_modules/faker/lib/locales/pt_BR/company/name.js"}],"node_modules/faker/lib/locales/pt_BR/commerce/color.js":[function(require,module,exports) {
module["exports"] = [
  "amarelo",
  "âmbar",
  "ametista",
  "azul",
  "azul celeste",
  "azul marinho",
  "azul petróleo",
  "açafrão",
  "bordô",
  "bronze",
  "caramelo",
  "castanho ",
  "cenoura",
  "cinza",
  "cobre",
  "coral",
  "dourado",
  "escarlate",
  "esmeralda",
  "ferrugem",
  "fuligem",
  "fúchsia",
  "grená",
  "índigo",
  "jade",
  "laranja",
  "lilás",
  "limão",
  "madeira",
  "magenta",
  "marrom",
  "ouro",
  "pele",
  "prata",
  "preto",
  "púrpura",
  "rosa",
  "roxo",
  "salmão",
  "turquesa",
  "verde",
  "verde lima",
  "verde-azulado",
  "vermelho",
  "violeta"
];

},{}],"node_modules/faker/lib/locales/pt_BR/commerce/department.js":[function(require,module,exports) {
module["exports"] = [
  "Livros",
  "Filmes",
  "Música",
  "Jogos",
  "Eletrônicos",
  "Computadores",
  "Casa",
  "Jardim",
  "Ferramentas",
  "Mercearia",
  "Saúde",
  "Beleza",
  "Brinquedos",
  "Crianças",
  "Bebê",
  "Roupas",
  "Sapatos",
  "Jóias",
  "Esportes",
  "Turismo",
  "Automotivo",
  "Industrial"
];

},{}],"node_modules/faker/lib/locales/pt_BR/commerce/product_name.js":[function(require,module,exports) {
module["exports"] = {
  "adjective": [
    "Pequeno",
    "Ergonômico",
    "Rústico",
    "Inteligente",
    "Lindo",
    "Incrível",
    "Fantástico",
    "Prático",
    "Lustroso",
    "Impressionante",
    "Genérico",
    "Feito à mão",
    "Licenciado",
    "Refinado",
    "Sem marca",
    "Gostoso"
  ],
  "material": [
    "Aço",
    "Madeira",
    "Concreto",
    "Plástico",
    "Algodão",
    "Granito",
    "Borracha",
    "Metal",
    "Macio",
    "Fresco",
    "Congelado"
  ],
  "product": [
    "Cadeira",
    "Carro",
    "Computador",
    "Teclado",
    "Mouse",
    "Bicicleta",
    "Bola",
    "Luvas",
    "Calças",
    "Camiseta",
    "Mesa",
    "Sapatos",
    "Chapéu",
    "Toalhas",
    "Sabonete",
    "Atum",
    "Frango",
    "Peixe",
    "Queijo",
    "Bacon",
    "Pizza",
    "Salada",
    "Salsicha",
    "Salgadinhos"
  ]
};

},{}],"node_modules/faker/lib/locales/pt_BR/commerce/index.js":[function(require,module,exports) {
var commerce = {};
module['exports'] = commerce;
commerce.color = require("./color");
commerce.department = require("./department");
commerce.product_name = require("./product_name");

},{"./color":"node_modules/faker/lib/locales/pt_BR/commerce/color.js","./department":"node_modules/faker/lib/locales/pt_BR/commerce/department.js","./product_name":"node_modules/faker/lib/locales/pt_BR/commerce/product_name.js"}],"node_modules/faker/lib/locales/pt_BR/internet/free_email.js":[function(require,module,exports) {
module["exports"] = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "live.com",
  "bol.com.br"
];

},{}],"node_modules/faker/lib/locales/pt_BR/internet/domain_suffix.js":[function(require,module,exports) {
module["exports"] = [
  "br",
  "com",
  "biz",
  "info",
  "name",
  "net",
  "org"
];

},{}],"node_modules/faker/lib/locales/pt_BR/internet/index.js":[function(require,module,exports) {
var internet = {};
module['exports'] = internet;
internet.free_email = require("./free_email");
internet.domain_suffix = require("./domain_suffix");

},{"./free_email":"node_modules/faker/lib/locales/pt_BR/internet/free_email.js","./domain_suffix":"node_modules/faker/lib/locales/pt_BR/internet/domain_suffix.js"}],"node_modules/faker/lib/locales/pt_BR/lorem/words.js":[function(require,module,exports) {
module["exports"] = [
  "alias",
  "consequatur",
  "aut",
  "perferendis",
  "sit",
  "voluptatem",
  "accusantium",
  "doloremque",
  "aperiam",
  "eaque",
  "ipsa",
  "quae",
  "ab",
  "illo",
  "inventore",
  "veritatis",
  "et",
  "quasi",
  "architecto",
  "beatae",
  "vitae",
  "dicta",
  "sunt",
  "explicabo",
  "aspernatur",
  "aut",
  "odit",
  "aut",
  "fugit",
  "sed",
  "quia",
  "consequuntur",
  "magni",
  "dolores",
  "eos",
  "qui",
  "ratione",
  "voluptatem",
  "sequi",
  "nesciunt",
  "neque",
  "dolorem",
  "ipsum",
  "quia",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipisci",
  "velit",
  "sed",
  "quia",
  "non",
  "numquam",
  "eius",
  "modi",
  "tempora",
  "incidunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magnam",
  "aliquam",
  "quaerat",
  "voluptatem",
  "ut",
  "enim",
  "ad",
  "minima",
  "veniam",
  "quis",
  "nostrum",
  "exercitationem",
  "ullam",
  "corporis",
  "nemo",
  "enim",
  "ipsam",
  "voluptatem",
  "quia",
  "voluptas",
  "sit",
  "suscipit",
  "laboriosam",
  "nisi",
  "ut",
  "aliquid",
  "ex",
  "ea",
  "commodi",
  "consequatur",
  "quis",
  "autem",
  "vel",
  "eum",
  "iure",
  "reprehenderit",
  "qui",
  "in",
  "ea",
  "voluptate",
  "velit",
  "esse",
  "quam",
  "nihil",
  "molestiae",
  "et",
  "iusto",
  "odio",
  "dignissimos",
  "ducimus",
  "qui",
  "blanditiis",
  "praesentium",
  "laudantium",
  "totam",
  "rem",
  "voluptatum",
  "deleniti",
  "atque",
  "corrupti",
  "quos",
  "dolores",
  "et",
  "quas",
  "molestias",
  "excepturi",
  "sint",
  "occaecati",
  "cupiditate",
  "non",
  "provident",
  "sed",
  "ut",
  "perspiciatis",
  "unde",
  "omnis",
  "iste",
  "natus",
  "error",
  "similique",
  "sunt",
  "in",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollitia",
  "animi",
  "id",
  "est",
  "laborum",
  "et",
  "dolorum",
  "fuga",
  "et",
  "harum",
  "quidem",
  "rerum",
  "facilis",
  "est",
  "et",
  "expedita",
  "distinctio",
  "nam",
  "libero",
  "tempore",
  "cum",
  "soluta",
  "nobis",
  "est",
  "eligendi",
  "optio",
  "cumque",
  "nihil",
  "impedit",
  "quo",
  "porro",
  "quisquam",
  "est",
  "qui",
  "minus",
  "id",
  "quod",
  "maxime",
  "placeat",
  "facere",
  "possimus",
  "omnis",
  "voluptas",
  "assumenda",
  "est",
  "omnis",
  "dolor",
  "repellendus",
  "temporibus",
  "autem",
  "quibusdam",
  "et",
  "aut",
  "consequatur",
  "vel",
  "illum",
  "qui",
  "dolorem",
  "eum",
  "fugiat",
  "quo",
  "voluptas",
  "nulla",
  "pariatur",
  "at",
  "vero",
  "eos",
  "et",
  "accusamus",
  "officiis",
  "debitis",
  "aut",
  "rerum",
  "necessitatibus",
  "saepe",
  "eveniet",
  "ut",
  "et",
  "voluptates",
  "repudiandae",
  "sint",
  "et",
  "molestiae",
  "non",
  "recusandae",
  "itaque",
  "earum",
  "rerum",
  "hic",
  "tenetur",
  "a",
  "sapiente",
  "delectus",
  "ut",
  "aut",
  "reiciendis",
  "voluptatibus",
  "maiores",
  "doloribus",
  "asperiores",
  "repellat"
];

},{}],"node_modules/faker/lib/locales/pt_BR/lorem/index.js":[function(require,module,exports) {
var lorem = {};
module['exports'] = lorem;
lorem.words = require("./words");

},{"./words":"node_modules/faker/lib/locales/pt_BR/lorem/words.js"}],"node_modules/faker/lib/locales/pt_BR/name/male_first_name.js":[function(require,module,exports) {
module["exports"] = [
  "Alessandro",
  "Alexandre",
  "Anthony",
  "Antônio",
  "Arthur",
  "Benjamin",
  "Benício",
  "Bernardo",
  "Breno",
  "Bryan",
  "Caio",
  "Calebe",
  "Carlos",
  "Cauã",
  "César",
  "Daniel",
  "Danilo",
  "Davi",
  "Davi Lucca",
  "Deneval",
  "Eduardo",
  "Elísio",
  "Emanuel",
  "Enzo",
  "Enzo Gabriel",
  "Fabiano",
  "Fabrício",
  "Feliciano",
  "Felipe",
  "Frederico",
  "Fábio",
  "Félix",
  "Gabriel",
  "Gael",
  "Guilherme",
  "Gustavo",
  "Gúbio",
  "Heitor",
  "Henrique",
  "Hugo",
  "Hélio",
  "Isaac",
  "Joaquim",
  "João",
  "João Lucas",
  "João Miguel",
  "João Pedro",
  "Júlio",
  "Júlio César",
  "Kléber",
  "Ladislau",
  "Leonardo",
  "Lorenzo",
  "Lucas",
  "Lucca",
  "Marcelo",
  "Marcos",
  "Matheus",
  "Miguel",
  "Murilo",
  "Nataniel",
  "Nicolas",
  "Noah",
  "Norberto",
  "Pablo",
  "Paulo",
  "Pedro",
  "Pedro Henrique",
  "Pietro",
  "Rafael",
  "Raul",
  "Ricardo",
  "Roberto",
  "Salvador",
  "Samuel",
  "Silas",
  "Sirineu",
  "Tertuliano",
  "Théo",
  "Vicente",
  "Vitor",
  "Víctor",
  "Warley",
  "Washington",
  "Yago",
  "Yango",
  "Yuri",
  "Ígor"
];
},{}],"node_modules/faker/lib/locales/pt_BR/name/female_first_name.js":[function(require,module,exports) {
module["exports"] = [
  "Alessandra",
  "Alice",
  "Aline",
  "Alícia",
  "Ana Clara",
  "Ana Júlia",
  "Ana Laura",
  "Ana Luiza",
  "Antonella",
  "Beatriz",
  "Bruna",
  "Carla",
  "Cecília",
  "Clara",
  "Célia",
  "Dalila",
  "Eduarda",
  "Elisa",
  "Eloá",
  "Emanuelly",
  "Esther",
  "Fabrícia",
  "Felícia",
  "Giovanna",
  "Helena",
  "Heloísa",
  "Isabel",
  "Isabela",
  "Isabella",
  "Isabelly",
  "Isis",
  "Janaína",
  "Joana",
  "Júlia",
  "Karla",
  "Lara",
  "Larissa",
  "Laura",
  "Lavínia",
  "Liz",
  "Lorena",
  "Lorraine",
  "Luiza",
  "Lívia",
  "Maitê",
  "Manuela",
  "Marcela",
  "Margarida",
  "Maria",
  "Maria Alice",
  "Maria Cecília",
  "Maria Clara",
  "Maria Eduarda",
  "Maria Helena",
  "Maria Júlia",
  "Maria Luiza",
  "Mariana",
  "Marina",
  "Marli",
  "Meire",
  "Melissa",
  "Morgana",
  "Márcia",
  "Mércia",
  "Natália",
  "Núbia",
  "Ofélia",
  "Paula",
  "Rafaela",
  "Rebeca",
  "Roberta",
  "Sara",
  "Sarah",
  "Sophia",
  "Suélen",
  "Sílvia",
  "Talita",
  "Valentina",
  "Vitória",
  "Yasmin"
];
},{}],"node_modules/faker/lib/locales/pt_BR/name/first_name.js":[function(require,module,exports) {
module["exports"] = [
  "Alessandra",
  "Alessandro",
  "Alexandre",
  "Alice",
  "Aline",
  "Alícia",
  "Ana Clara",
  "Ana Júlia",
  "Ana Laura",
  "Ana Luiza",
  "Anthony",
  "Antonella",
  "Antônio",
  "Arthur",
  "Beatriz",
  "Benjamin",
  "Benício",
  "Bernardo",
  "Breno",
  "Bruna",
  "Bryan",
  "Caio",
  "Calebe",
  "Carla",
  "Carlos",
  "Cauã",
  "Cecília",
  "Clara",
  "Célia",
  "César",
  "Dalila",
  "Daniel",
  "Danilo",
  "Davi",
  "Davi Lucca",
  "Deneval",
  "Eduarda",
  "Eduardo",
  "Elisa",
  "Eloá",
  "Elísio",
  "Emanuel",
  "Emanuelly",
  "Enzo",
  "Enzo Gabriel",
  "Esther",
  "Fabiano",
  "Fabrícia",
  "Fabrício",
  "Feliciano",
  "Felipe",
  "Felícia",
  "Frederico",
  "Fábio",
  "Félix",
  "Gabriel",
  "Gael",
  "Giovanna",
  "Guilherme",
  "Gustavo",
  "Gúbio",
  "Heitor",
  "Helena",
  "Heloísa",
  "Henrique",
  "Hugo",
  "Hélio",
  "Isaac",
  "Isabel",
  "Isabela",
  "Isabella",
  "Isabelly",
  "Isadora",
  "Isis",
  "Janaína",
  "Joana",
  "Joaquim",
  "João",
  "João Lucas",
  "João Miguel",
  "João Pedro",
  "Júlia",
  "Júlio",
  "Júlio César",
  "Karla",
  "Kléber",
  "Ladislau",
  "Lara",
  "Larissa",
  "Laura",
  "Lavínia",
  "Leonardo",
  "Liz",
  "Lorena",
  "Lorenzo",
  "Lorraine",
  "Lucas",
  "Lucca",
  "Luiza",
  "Lívia",
  "Maitê",
  "Manuela",
  "Marcela",
  "Marcelo",
  "Marcos",
  "Margarida",
  "Maria",
  "Maria Alice",
  "Maria Cecília",
  "Maria Clara",
  "Maria Eduarda",
  "Maria Helena",
  "Maria Júlia",
  "Maria Luiza",
  "Mariana",
  "Marina",
  "Marli",
  "Matheus",
  "Meire",
  "Melissa",
  "Miguel",
  "Morgana",
  "Murilo",
  "Márcia",
  "Mércia",
  "Nataniel",
  "Natália",
  "Nicolas",
  "Noah",
  "Norberto",
  "Núbia",
  "Ofélia",
  "Pablo",
  "Paula",
  "Paulo",
  "Pedro",
  "Pedro Henrique",
  "Pietro",
  "Rafael",
  "Rafaela",
  "Raul",
  "Rebeca",
  "Ricardo",
  "Roberta",
  "Roberto",
  "Salvador",
  "Samuel",
  "Sara",
  "Sarah",
  "Silas",
  "Sirineu",
  "Sophia",
  "Suélen",
  "Sílvia",
  "Talita",
  "Tertuliano",
  "Théo",
  "Valentina",
  "Vicente",
  "Vitor",
  "Vitória",
  "Víctor",
  "Warley",
  "Washington",
  "Yago",
  "Yango",
  "Yasmin",
  "Yuri",
  "Ígor"
];

},{}],"node_modules/faker/lib/locales/pt_BR/name/last_name.js":[function(require,module,exports) {
module["exports"] = [
  "Silva",
  "Souza",
  "Carvalho",
  "Santos",
  "Reis",
  "Xavier",
  "Franco",
  "Braga",
  "Macedo",
  "Batista",
  "Barros",
  "Moraes",
  "Costa",
  "Pereira",
  "Carvalho",
  "Melo",
  "Saraiva",
  "Nogueira",
  "Oliveira",
  "Martins",
  "Moreira",
  "Albuquerque"
];

},{}],"node_modules/faker/lib/locales/pt_BR/name/prefix.js":[function(require,module,exports) {
module["exports"] = [
  "Sr.",
  "Sra.",
  "Srta.",
  "Dr.",
  "Dra."
];

},{}],"node_modules/faker/lib/locales/pt_BR/name/suffix.js":[function(require,module,exports) {
module["exports"] = [
  "Jr.",
  "Neto",
  "Filho"
];

},{}],"node_modules/faker/lib/locales/pt_BR/name/index.js":[function(require,module,exports) {
var name = {};
module['exports'] = name;
name.male_first_name = require("./male_first_name");
name.female_first_name = require("./female_first_name");
name.first_name = require("./first_name");
name.last_name = require("./last_name");
name.prefix = require("./prefix");
name.suffix = require("./suffix");

},{"./male_first_name":"node_modules/faker/lib/locales/pt_BR/name/male_first_name.js","./female_first_name":"node_modules/faker/lib/locales/pt_BR/name/female_first_name.js","./first_name":"node_modules/faker/lib/locales/pt_BR/name/first_name.js","./last_name":"node_modules/faker/lib/locales/pt_BR/name/last_name.js","./prefix":"node_modules/faker/lib/locales/pt_BR/name/prefix.js","./suffix":"node_modules/faker/lib/locales/pt_BR/name/suffix.js"}],"node_modules/faker/lib/locales/pt_BR/phone_number/formats.js":[function(require,module,exports) {
module["exports"] = [
  "(##) ####-####",
  "+55 (##) ####-####",
  "(##) #####-####"
];

},{}],"node_modules/faker/lib/locales/pt_BR/phone_number/index.js":[function(require,module,exports) {
var phone_number = {};
module['exports'] = phone_number;
phone_number.formats = require("./formats");

},{"./formats":"node_modules/faker/lib/locales/pt_BR/phone_number/formats.js"}],"node_modules/faker/lib/locales/pt_BR/date/month.js":[function(require,module,exports) {
// Source: http://unicode.org/cldr/trac/browser/tags/release-27/common/main/en.xml#L1799
module["exports"] = {
  wide: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ],
  // Property "wide_context" is optional, if not set then "wide" will be used instead
  // It is used to specify a word in context, which may differ from a stand-alone word
  wide_context: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ],
  abbr: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
  ],
  // Property "abbr_context" is optional, if not set then "abbr" will be used instead
  // It is used to specify a word in context, which may differ from a stand-alone word
  abbr_context: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
  ]
};

},{}],"node_modules/faker/lib/locales/pt_BR/date/weekday.js":[function(require,module,exports) {
// Source: http://unicode.org/cldr/trac/browser/tags/release-27/common/main/en.xml#L1847
module["exports"] = {
  wide: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ],
  // Property "wide_context" is optional, if not set then "wide" will be used instead
  // It is used to specify a word in context, which may differ from a stand-alone word
  wide_context: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ],
  abbr: [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb"
  ],
  // Property "abbr_context" is optional, if not set then "abbr" will be used instead
  // It is used to specify a word in context, which may differ from a stand-alone word
  abbr_context: [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb"
  ]
};

},{}],"node_modules/faker/lib/locales/pt_BR/date/index.js":[function(require,module,exports) {
var date = {};
module["exports"] = date;
date.month = require("./month");
date.weekday = require("./weekday");

},{"./month":"node_modules/faker/lib/locales/pt_BR/date/month.js","./weekday":"node_modules/faker/lib/locales/pt_BR/date/weekday.js"}],"node_modules/faker/lib/locales/pt_BR/index.js":[function(require,module,exports) {
var pt_BR = {};
module['exports'] = pt_BR;
pt_BR.title = "Portuguese (Brazil)";
pt_BR.address = require("./address");
pt_BR.company = require("./company");
pt_BR.commerce = require("./commerce");
pt_BR.internet = require("./internet");
pt_BR.lorem = require("./lorem");
pt_BR.name = require("./name");
pt_BR.phone_number = require("./phone_number");
pt_BR.date = require("./date");

},{"./address":"node_modules/faker/lib/locales/pt_BR/address/index.js","./company":"node_modules/faker/lib/locales/pt_BR/company/index.js","./commerce":"node_modules/faker/lib/locales/pt_BR/commerce/index.js","./internet":"node_modules/faker/lib/locales/pt_BR/internet/index.js","./lorem":"node_modules/faker/lib/locales/pt_BR/lorem/index.js","./name":"node_modules/faker/lib/locales/pt_BR/name/index.js","./phone_number":"node_modules/faker/lib/locales/pt_BR/phone_number/index.js","./date":"node_modules/faker/lib/locales/pt_BR/date/index.js"}],"node_modules/faker/lib/locales/en/address/city_prefix.js":[function(require,module,exports) {
module["exports"] = [
  "North",
  "East",
  "West",
  "South",
  "New",
  "Lake",
  "Port"
];

},{}],"node_modules/faker/lib/locales/en/address/city_suffix.js":[function(require,module,exports) {
module["exports"] = [
  "town",
  "ton",
  "land",
  "ville",
  "berg",
  "burgh",
  "borough",
  "bury",
  "view",
  "port",
  "mouth",
  "stad",
  "furt",
  "chester",
  "mouth",
  "fort",
  "haven",
  "side",
  "shire"
];

},{}],"node_modules/faker/lib/locales/en/address/county.js":[function(require,module,exports) {
module["exports"] = [
  "Avon",
  "Bedfordshire",
  "Berkshire",
  "Borders",
  "Buckinghamshire",
  "Cambridgeshire"
];

},{}],"node_modules/faker/lib/locales/en/address/country.js":[function(require,module,exports) {
module["exports"] = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica (the territory South of 60 deg S)",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island (Bouvetoya)",
  "Brazil",
  "British Indian Ocean Territory (Chagos Archipelago)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Faroe Islands",
  "Falkland Islands (Malvinas)",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (Vatican City State)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Democratic People's Republic of Korea",
  "Republic of Korea",
  "Kuwait",
  "Kyrgyz Republic",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libyan Arab Jamahiriya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands Antilles",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestinian Territory",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn Islands",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Barthelemy",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia (Slovak Republic)",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard & Jan Mayen Islands",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Virgin Islands, British",
  "Virgin Islands, U.S.",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

},{}],"node_modules/faker/lib/locales/en/address/country_code.js":[function(require,module,exports) {
module["exports"] = [
  "AD",
  "AE",
  "AF",
  "AG",
  "AI",
  "AL",
  "AM",
  "AO",
  "AQ",
  "AR",
  "AS",
  "AT",
  "AU",
  "AW",
  "AX",
  "AZ",
  "BA",
  "BB",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BL",
  "BM",
  "BN",
  "BO",
  "BQ",
  "BR",
  "BS",
  "BT",
  "BV",
  "BW",
  "BY",
  "BZ",
  "CA",
  "CC",
  "CD",
  "CF",
  "CG",
  "CH",
  "CI",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CU",
  "CV",
  "CW",
  "CX",
  "CY",
  "CZ",
  "DE",
  "DJ",
  "DK",
  "DM",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  "EH",
  "ER",
  "ES",
  "ET",
  "FI",
  "FJ",
  "FK",
  "FM",
  "FO",
  "FR",
  "GA",
  "GB",
  "GD",
  "GE",
  "GF",
  "GG",
  "GH",
  "GI",
  "GL",
  "GM",
  "GN",
  "GP",
  "GQ",
  "GR",
  "GS",
  "GT",
  "GU",
  "GW",
  "GY",
  "HK",
  "HM",
  "HN",
  "HR",
  "HT",
  "HU",
  "ID",
  "IE",
  "IL",
  "IM",
  "IN",
  "IO",
  "IQ",
  "IR",
  "IS",
  "IT",
  "JE",
  "JM",
  "JO",
  "JP",
  "KE",
  "KG",
  "KH",
  "KI",
  "KM",
  "KN",
  "KP",
  "KR",
  "KW",
  "KY",
  "KZ",
  "LA",
  "LB",
  "LC",
  "LI",
  "LK",
  "LR",
  "LS",
  "LT",
  "LU",
  "LV",
  "LY",
  "MA",
  "MC",
  "MD",
  "ME",
  "MF",
  "MG",
  "MH",
  "MK",
  "ML",
  "MM",
  "MN",
  "MO",
  "MP",
  "MQ",
  "MR",
  "MS",
  "MT",
  "MU",
  "MV",
  "MW",
  "MX",
  "MY",
  "MZ",
  "NA",
  "NC",
  "NE",
  "NF",
  "NG",
  "NI",
  "NL",
  "NO",
  "NP",
  "NR",
  "NU",
  "NZ",
  "OM",
  "PA",
  "PE",
  "PF",
  "PG",
  "PH",
  "PK",
  "PL",
  "PM",
  "PN",
  "PR",
  "PS",
  "PT",
  "PW",
  "PY",
  "QA",
  "RE",
  "RO",
  "RS",
  "RU",
  "RW",
  "SA",
  "SB",
  "SC",
  "SD",
  "SE",
  "SG",
  "SH",
  "SI",
  "SJ",
  "SK",
  "SL",
  "SM",
  "SN",
  "SO",
  "SR",
  "SS",
  "ST",
  "SV",
  "SX",
  "SY",
  "SZ",
  "TC",
  "TD",
  "TF",
  "TG",
  "TH",
  "TJ",
  "TK",
  "TL",
  "TM",
  "TN",
  "TO",
  "TR",
  "TT",
  "TV",
  "TW",
  "TZ",
  "UA",
  "UG",
  "UM",
  "US",
  "UY",
  "UZ",
  "VA",
  "VC",
  "VE",
  "VG",
  "VI",
  "VN",
  "VU",
  "WF",
  "WS",
  "YE",
  "YT",
  "ZA",
  "ZM",
  "ZW"
];

},{}],"node_modules/faker/lib/locales/en/address/country_code_alpha_3.js":[function(require,module,exports) {
module["exports"] = [
    "BGD",
    "BEL",
    "BFA",
    "BGR",
    "BIH",
    "BRB",
    "WLF",
    "BLM",
    "BMU",
    "BRN",
    "BOL",
    "BHR",
    "BDI",
    "BEN",
    "BTN",
    "JAM",
    "BVT",
    "BWA",
    "WSM",
    "BES",
    "BRA",
    "BHS",
    "JEY",
    "BLR",
    "BLZ",
    "RUS",
    "RWA",
    "SRB",
    "TLS",
    "REU",
    "TKM",
    "TJK",
    "ROU",
    "TKL",
    "GNB",
    "GUM",
    "GTM",
    "SGS",
    "GRC",
    "GNQ",
    "GLP",
    "JPN",
    "GUY",
    "GGY",
    "GUF",
    "GEO",
    "GRD",
    "GBR",
    "GAB",
    "SLV",
    "GIN",
    "GMB",
    "GRL",
    "GIB",
    "GHA",
    "OMN",
    "TUN",
    "JOR",
    "HRV",
    "HTI",
    "HUN",
    "HKG",
    "HND",
    "HMD",
    "VEN",
    "PRI",
    "PSE",
    "PLW",
    "PRT",
    "SJM",
    "PRY",
    "IRQ",
    "PAN",
    "PYF",
    "PNG",
    "PER",
    "PAK",
    "PHL",
    "PCN",
    "POL",
    "SPM",
    "ZMB",
    "ESH",
    "EST",
    "EGY",
    "ZAF",
    "ECU",
    "ITA",
    "VNM",
    "SLB",
    "ETH",
    "SOM",
    "ZWE",
    "SAU",
    "ESP",
    "ERI",
    "MNE",
    "MDA",
    "MDG",
    "MAF",
    "MAR",
    "MCO",
    "UZB",
    "MMR",
    "MLI",
    "MAC",
    "MNG",
    "MHL",
    "MKD",
    "MUS",
    "MLT",
    "MWI",
    "MDV",
    "MTQ",
    "MNP",
    "MSR",
    "MRT",
    "IMN",
    "UGA",
    "TZA",
    "MYS",
    "MEX",
    "ISR",
    "FRA",
    "IOT",
    "SHN",
    "FIN",
    "FJI",
    "FLK",
    "FSM",
    "FRO",
    "NIC",
    "NLD",
    "NOR",
    "NAM",
    "VUT",
    "NCL",
    "NER",
    "NFK",
    "NGA",
    "NZL",
    "NPL",
    "NRU",
    "NIU",
    "COK",
    "XKX",
    "CIV",
    "CHE",
    "COL",
    "CHN",
    "CMR",
    "CHL",
    "CCK",
    "CAN",
    "COG",
    "CAF",
    "COD",
    "CZE",
    "CYP",
    "CXR",
    "CRI",
    "CUW",
    "CPV",
    "CUB",
    "SWZ",
    "SYR",
    "SXM",
    "KGZ",
    "KEN",
    "SSD",
    "SUR",
    "KIR",
    "KHM",
    "KNA",
    "COM",
    "STP",
    "SVK",
    "KOR",
    "SVN",
    "PRK",
    "KWT",
    "SEN",
    "SMR",
    "SLE",
    "SYC",
    "KAZ",
    "CYM",
    "SGP",
    "SWE",
    "SDN",
    "DOM",
    "DMA",
    "DJI",
    "DNK",
    "VGB",
    "DEU",
    "YEM",
    "DZA",
    "USA",
    "URY",
    "MYT",
    "UMI",
    "LBN",
    "LCA",
    "LAO",
    "TUV",
    "TWN",
    "TTO",
    "TUR",
    "LKA",
    "LIE",
    "LVA",
    "TON",
    "LTU",
    "LUX",
    "LBR",
    "LSO",
    "THA",
    "ATF",
    "TGO",
    "TCD",
    "TCA",
    "LBY",
    "VAT",
    "VCT",
    "ARE",
    "AND",
    "ATG",
    "AFG",
    "AIA",
    "VIR",
    "ISL",
    "IRN",
    "ARM",
    "ALB",
    "AGO",
    "ATA",
    "ASM",
    "ARG",
    "AUS",
    "AUT",
    "ABW",
    "IND",
    "ALA",
    "AZE",
    "IRL",
    "IDN",
    "UKR",
    "QAT",
    "MOZ"
];
},{}],"node_modules/faker/lib/locales/en/address/building_number.js":[function(require,module,exports) {
module["exports"] = [
  "#####",
  "####",
  "###"
];

},{}],"node_modules/faker/lib/locales/en/address/street_suffix.js":[function(require,module,exports) {
module["exports"] = [
  "Alley",
  "Avenue",
  "Branch",
  "Bridge",
  "Brook",
  "Brooks",
  "Burg",
  "Burgs",
  "Bypass",
  "Camp",
  "Canyon",
  "Cape",
  "Causeway",
  "Center",
  "Centers",
  "Circle",
  "Circles",
  "Cliff",
  "Cliffs",
  "Club",
  "Common",
  "Corner",
  "Corners",
  "Course",
  "Court",
  "Courts",
  "Cove",
  "Coves",
  "Creek",
  "Crescent",
  "Crest",
  "Crossing",
  "Crossroad",
  "Curve",
  "Dale",
  "Dam",
  "Divide",
  "Drive",
  "Drive",
  "Drives",
  "Estate",
  "Estates",
  "Expressway",
  "Extension",
  "Extensions",
  "Fall",
  "Falls",
  "Ferry",
  "Field",
  "Fields",
  "Flat",
  "Flats",
  "Ford",
  "Fords",
  "Forest",
  "Forge",
  "Forges",
  "Fork",
  "Forks",
  "Fort",
  "Freeway",
  "Garden",
  "Gardens",
  "Gateway",
  "Glen",
  "Glens",
  "Green",
  "Greens",
  "Grove",
  "Groves",
  "Harbor",
  "Harbors",
  "Haven",
  "Heights",
  "Highway",
  "Hill",
  "Hills",
  "Hollow",
  "Inlet",
  "Inlet",
  "Island",
  "Island",
  "Islands",
  "Islands",
  "Isle",
  "Isle",
  "Junction",
  "Junctions",
  "Key",
  "Keys",
  "Knoll",
  "Knolls",
  "Lake",
  "Lakes",
  "Land",
  "Landing",
  "Lane",
  "Light",
  "Lights",
  "Loaf",
  "Lock",
  "Locks",
  "Locks",
  "Lodge",
  "Lodge",
  "Loop",
  "Mall",
  "Manor",
  "Manors",
  "Meadow",
  "Meadows",
  "Mews",
  "Mill",
  "Mills",
  "Mission",
  "Mission",
  "Motorway",
  "Mount",
  "Mountain",
  "Mountain",
  "Mountains",
  "Mountains",
  "Neck",
  "Orchard",
  "Oval",
  "Overpass",
  "Park",
  "Parks",
  "Parkway",
  "Parkways",
  "Pass",
  "Passage",
  "Path",
  "Pike",
  "Pine",
  "Pines",
  "Place",
  "Plain",
  "Plains",
  "Plains",
  "Plaza",
  "Plaza",
  "Point",
  "Points",
  "Port",
  "Port",
  "Ports",
  "Ports",
  "Prairie",
  "Prairie",
  "Radial",
  "Ramp",
  "Ranch",
  "Rapid",
  "Rapids",
  "Rest",
  "Ridge",
  "Ridges",
  "River",
  "Road",
  "Road",
  "Roads",
  "Roads",
  "Route",
  "Row",
  "Rue",
  "Run",
  "Shoal",
  "Shoals",
  "Shore",
  "Shores",
  "Skyway",
  "Spring",
  "Springs",
  "Springs",
  "Spur",
  "Spurs",
  "Square",
  "Square",
  "Squares",
  "Squares",
  "Station",
  "Station",
  "Stravenue",
  "Stravenue",
  "Stream",
  "Stream",
  "Street",
  "Street",
  "Streets",
  "Summit",
  "Summit",
  "Terrace",
  "Throughway",
  "Trace",
  "Track",
  "Trafficway",
  "Trail",
  "Trail",
  "Tunnel",
  "Tunnel",
  "Turnpike",
  "Turnpike",
  "Underpass",
  "Union",
  "Unions",
  "Valley",
  "Valleys",
  "Via",
  "Viaduct",
  "View",
  "Views",
  "Village",
  "Village",
  "Villages",
  "Ville",
  "Vista",
  "Vista",
  "Walk",
  "Walks",
  "Wall",
  "Way",
  "Ways",
  "Well",
  "Wells"
];

},{}],"node_modules/faker/lib/locales/en/address/secondary_address.js":[function(require,module,exports) {
module["exports"] = [
  "Apt. ###",
  "Suite ###"
];

},{}],"node_modules/faker/lib/locales/en/address/postcode.js":[function(require,module,exports) {
module["exports"] = [
  "#####",
  "#####-####"
];

},{}],"node_modules/faker/lib/locales/en/address/postcode_by_state.js":[function(require,module,exports) {
module["exports"] = [
  "#####",
  "#####-####"
];

},{}],"node_modules/faker/lib/locales/en/address/state.js":[function(require,module,exports) {
module["exports"] = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

},{}],"node_modules/faker/lib/locales/en/address/state_abbr.js":[function(require,module,exports) {
module["exports"] = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY"
];

},{}],"node_modules/faker/lib/locales/en/address/time_zone.js":[function(require,module,exports) {
module["exports"] = [
  "Pacific/Midway",
  "Pacific/Pago_Pago",
  "Pacific/Honolulu",
  "America/Juneau",
  "America/Los_Angeles",
  "America/Tijuana",
  "America/Denver",
  "America/Phoenix",
  "America/Chihuahua",
  "America/Mazatlan",
  "America/Chicago",
  "America/Regina",
  "America/Mexico_City",
  "America/Mexico_City",
  "America/Monterrey",
  "America/Guatemala",
  "America/New_York",
  "America/Indiana/Indianapolis",
  "America/Bogota",
  "America/Lima",
  "America/Lima",
  "America/Halifax",
  "America/Caracas",
  "America/La_Paz",
  "America/Santiago",
  "America/St_Johns",
  "America/Sao_Paulo",
  "America/Argentina/Buenos_Aires",
  "America/Guyana",
  "America/Godthab",
  "Atlantic/South_Georgia",
  "Atlantic/Azores",
  "Atlantic/Cape_Verde",
  "Europe/Dublin",
  "Europe/London",
  "Europe/Lisbon",
  "Europe/London",
  "Africa/Casablanca",
  "Africa/Monrovia",
  "Etc/UTC",
  "Europe/Belgrade",
  "Europe/Bratislava",
  "Europe/Budapest",
  "Europe/Ljubljana",
  "Europe/Prague",
  "Europe/Sarajevo",
  "Europe/Skopje",
  "Europe/Warsaw",
  "Europe/Zagreb",
  "Europe/Brussels",
  "Europe/Copenhagen",
  "Europe/Madrid",
  "Europe/Paris",
  "Europe/Amsterdam",
  "Europe/Berlin",
  "Europe/Berlin",
  "Europe/Rome",
  "Europe/Stockholm",
  "Europe/Vienna",
  "Africa/Algiers",
  "Europe/Bucharest",
  "Africa/Cairo",
  "Europe/Helsinki",
  "Europe/Kiev",
  "Europe/Riga",
  "Europe/Sofia",
  "Europe/Tallinn",
  "Europe/Vilnius",
  "Europe/Athens",
  "Europe/Istanbul",
  "Europe/Minsk",
  "Asia/Jerusalem",
  "Africa/Harare",
  "Africa/Johannesburg",
  "Europe/Moscow",
  "Europe/Moscow",
  "Europe/Moscow",
  "Asia/Kuwait",
  "Asia/Riyadh",
  "Africa/Nairobi",
  "Asia/Baghdad",
  "Asia/Tehran",
  "Asia/Muscat",
  "Asia/Muscat",
  "Asia/Baku",
  "Asia/Tbilisi",
  "Asia/Yerevan",
  "Asia/Kabul",
  "Asia/Yekaterinburg",
  "Asia/Karachi",
  "Asia/Karachi",
  "Asia/Tashkent",
  "Asia/Kolkata",
  "Asia/Kolkata",
  "Asia/Kolkata",
  "Asia/Kolkata",
  "Asia/Kathmandu",
  "Asia/Dhaka",
  "Asia/Dhaka",
  "Asia/Colombo",
  "Asia/Almaty",
  "Asia/Novosibirsk",
  "Asia/Rangoon",
  "Asia/Bangkok",
  "Asia/Bangkok",
  "Asia/Jakarta",
  "Asia/Krasnoyarsk",
  "Asia/Shanghai",
  "Asia/Chongqing",
  "Asia/Hong_Kong",
  "Asia/Urumqi",
  "Asia/Kuala_Lumpur",
  "Asia/Singapore",
  "Asia/Taipei",
  "Australia/Perth",
  "Asia/Irkutsk",
  "Asia/Ulaanbaatar",
  "Asia/Seoul",
  "Asia/Tokyo",
  "Asia/Tokyo",
  "Asia/Tokyo",
  "Asia/Yakutsk",
  "Australia/Darwin",
  "Australia/Adelaide",
  "Australia/Melbourne",
  "Australia/Melbourne",
  "Australia/Sydney",
  "Australia/Brisbane",
  "Australia/Hobart",
  "Asia/Vladivostok",
  "Pacific/Guam",
  "Pacific/Port_Moresby",
  "Asia/Magadan",
  "Asia/Magadan",
  "Pacific/Noumea",
  "Pacific/Fiji",
  "Asia/Kamchatka",
  "Pacific/Majuro",
  "Pacific/Auckland",
  "Pacific/Auckland",
  "Pacific/Tongatapu",
  "Pacific/Fakaofo",
  "Pacific/Apia"
];

},{}],"node_modules/faker/lib/locales/en/address/city.js":[function(require,module,exports) {
module["exports"] = [
  "#{city_prefix} #{Name.first_name}#{city_suffix}",
  "#{city_prefix} #{Name.first_name}",
  "#{Name.first_name}#{city_suffix}",
  "#{Name.last_name}#{city_suffix}"
];

},{}],"node_modules/faker/lib/locales/en/address/street_name.js":[function(require,module,exports) {
module["exports"] = [
  "#{Name.first_name} #{street_suffix}",
  "#{Name.last_name} #{street_suffix}"
];

},{}],"node_modules/faker/lib/locales/en/address/street_address.js":[function(require,module,exports) {
module["exports"] = [
  "#{building_number} #{street_name}"
];

},{}],"node_modules/faker/lib/locales/en/address/default_country.js":[function(require,module,exports) {
module["exports"] = [
  "United States of America"
];

},{}],"node_modules/faker/lib/locales/en/address/direction.js":[function(require,module,exports) {
module["exports"] = [
  "North",
  "East",
  "South",
  "West",
  "Northeast",
  "Northwest",
  "Southeast",
  "Southwest"
];

},{}],"node_modules/faker/lib/locales/en/address/direction_abbr.js":[function(require,module,exports) {
module["exports"] = [
  "N",
  "E",
  "S",
  "W",
  "NE",
  "NW",
  "SE",
  "SW"
];

},{}],"node_modules/faker/lib/locales/en/address/index.js":[function(require,module,exports) {
var address = {};
module['exports'] = address;
address.city_prefix = require("./city_prefix");
address.city_suffix = require("./city_suffix");
address.county = require("./county");
address.country = require("./country");
address.country_code = require("./country_code");
address.country_code_alpha_3 = require("./country_code_alpha_3");
address.building_number = require("./building_number");
address.street_suffix = require("./street_suffix");
address.secondary_address = require("./secondary_address");
address.postcode = require("./postcode");
address.postcode_by_state = require("./postcode_by_state");
address.state = require("./state");
address.state_abbr = require("./state_abbr");
address.time_zone = require("./time_zone");
address.city = require("./city");
address.street_name = require("./street_name");
address.street_address = require("./street_address");
address.default_country = require("./default_country");
address.direction = require("./direction");
address.direction_abbr = require("./direction_abbr");

},{"./city_prefix":"node_modules/faker/lib/locales/en/address/city_prefix.js","./city_suffix":"node_modules/faker/lib/locales/en/address/city_suffix.js","./county":"node_modules/faker/lib/locales/en/address/county.js","./country":"node_modules/faker/lib/locales/en/address/country.js","./country_code":"node_modules/faker/lib/locales/en/address/country_code.js","./country_code_alpha_3":"node_modules/faker/lib/locales/en/address/country_code_alpha_3.js","./building_number":"node_modules/faker/lib/locales/en/address/building_number.js","./street_suffix":"node_modules/faker/lib/locales/en/address/street_suffix.js","./secondary_address":"node_modules/faker/lib/locales/en/address/secondary_address.js","./postcode":"node_modules/faker/lib/locales/en/address/postcode.js","./postcode_by_state":"node_modules/faker/lib/locales/en/address/postcode_by_state.js","./state":"node_modules/faker/lib/locales/en/address/state.js","./state_abbr":"node_modules/faker/lib/locales/en/address/state_abbr.js","./time_zone":"node_modules/faker/lib/locales/en/address/time_zone.js","./city":"node_modules/faker/lib/locales/en/address/city.js","./street_name":"node_modules/faker/lib/locales/en/address/street_name.js","./street_address":"node_modules/faker/lib/locales/en/address/street_address.js","./default_country":"node_modules/faker/lib/locales/en/address/default_country.js","./direction":"node_modules/faker/lib/locales/en/address/direction.js","./direction_abbr":"node_modules/faker/lib/locales/en/address/direction_abbr.js"}],"node_modules/faker/lib/locales/en/company/suffix.js":[function(require,module,exports) {
module["exports"] = [
  "Inc",
  "and Sons",
  "LLC",
  "Group"
];

},{}],"node_modules/faker/lib/locales/en/company/adjective.js":[function(require,module,exports) {
module["exports"] = [
  "Adaptive",
  "Advanced",
  "Ameliorated",
  "Assimilated",
  "Automated",
  "Balanced",
  "Business-focused",
  "Centralized",
  "Cloned",
  "Compatible",
  "Configurable",
  "Cross-group",
  "Cross-platform",
  "Customer-focused",
  "Customizable",
  "Decentralized",
  "De-engineered",
  "Devolved",
  "Digitized",
  "Distributed",
  "Diverse",
  "Down-sized",
  "Enhanced",
  "Enterprise-wide",
  "Ergonomic",
  "Exclusive",
  "Expanded",
  "Extended",
  "Face to face",
  "Focused",
  "Front-line",
  "Fully-configurable",
  "Function-based",
  "Fundamental",
  "Future-proofed",
  "Grass-roots",
  "Horizontal",
  "Implemented",
  "Innovative",
  "Integrated",
  "Intuitive",
  "Inverse",
  "Managed",
  "Mandatory",
  "Monitored",
  "Multi-channelled",
  "Multi-lateral",
  "Multi-layered",
  "Multi-tiered",
  "Networked",
  "Object-based",
  "Open-architected",
  "Open-source",
  "Operative",
  "Optimized",
  "Optional",
  "Organic",
  "Organized",
  "Persevering",
  "Persistent",
  "Phased",
  "Polarised",
  "Pre-emptive",
  "Proactive",
  "Profit-focused",
  "Profound",
  "Programmable",
  "Progressive",
  "Public-key",
  "Quality-focused",
  "Reactive",
  "Realigned",
  "Re-contextualized",
  "Re-engineered",
  "Reduced",
  "Reverse-engineered",
  "Right-sized",
  "Robust",
  "Seamless",
  "Secured",
  "Self-enabling",
  "Sharable",
  "Stand-alone",
  "Streamlined",
  "Switchable",
  "Synchronised",
  "Synergistic",
  "Synergized",
  "Team-oriented",
  "Total",
  "Triple-buffered",
  "Universal",
  "Up-sized",
  "Upgradable",
  "User-centric",
  "User-friendly",
  "Versatile",
  "Virtual",
  "Visionary",
  "Vision-oriented"
];

},{}],"node_modules/faker/lib/locales/en/company/descriptor.js":[function(require,module,exports) {
module["exports"] = [
  "24 hour",
  "24/7",
  "3rd generation",
  "4th generation",
  "5th generation",
  "6th generation",
  "actuating",
  "analyzing",
  "asymmetric",
  "asynchronous",
  "attitude-oriented",
  "background",
  "bandwidth-monitored",
  "bi-directional",
  "bifurcated",
  "bottom-line",
  "clear-thinking",
  "client-driven",
  "client-server",
  "coherent",
  "cohesive",
  "composite",
  "context-sensitive",
  "contextually-based",
  "content-based",
  "dedicated",
  "demand-driven",
  "didactic",
  "directional",
  "discrete",
  "disintermediate",
  "dynamic",
  "eco-centric",
  "empowering",
  "encompassing",
  "even-keeled",
  "executive",
  "explicit",
  "exuding",
  "fault-tolerant",
  "foreground",
  "fresh-thinking",
  "full-range",
  "global",
  "grid-enabled",
  "heuristic",
  "high-level",
  "holistic",
  "homogeneous",
  "human-resource",
  "hybrid",
  "impactful",
  "incremental",
  "intangible",
  "interactive",
  "intermediate",
  "leading edge",
  "local",
  "logistical",
  "maximized",
  "methodical",
  "mission-critical",
  "mobile",
  "modular",
  "motivating",
  "multimedia",
  "multi-state",
  "multi-tasking",
  "national",
  "needs-based",
  "neutral",
  "next generation",
  "non-volatile",
  "object-oriented",
  "optimal",
  "optimizing",
  "radical",
  "real-time",
  "reciprocal",
  "regional",
  "responsive",
  "scalable",
  "secondary",
  "solution-oriented",
  "stable",
  "static",
  "systematic",
  "systemic",
  "system-worthy",
  "tangible",
  "tertiary",
  "transitional",
  "uniform",
  "upward-trending",
  "user-facing",
  "value-added",
  "web-enabled",
  "well-modulated",
  "zero administration",
  "zero defect",
  "zero tolerance"
];

},{}],"node_modules/faker/lib/locales/en/company/noun.js":[function(require,module,exports) {
module["exports"] = [
  "ability",
  "access",
  "adapter",
  "algorithm",
  "alliance",
  "analyzer",
  "application",
  "approach",
  "architecture",
  "archive",
  "artificial intelligence",
  "array",
  "attitude",
  "benchmark",
  "budgetary management",
  "capability",
  "capacity",
  "challenge",
  "circuit",
  "collaboration",
  "complexity",
  "concept",
  "conglomeration",
  "contingency",
  "core",
  "customer loyalty",
  "database",
  "data-warehouse",
  "definition",
  "emulation",
  "encoding",
  "encryption",
  "extranet",
  "firmware",
  "flexibility",
  "focus group",
  "forecast",
  "frame",
  "framework",
  "function",
  "functionalities",
  "Graphic Interface",
  "groupware",
  "Graphical User Interface",
  "hardware",
  "help-desk",
  "hierarchy",
  "hub",
  "implementation",
  "info-mediaries",
  "infrastructure",
  "initiative",
  "installation",
  "instruction set",
  "interface",
  "internet solution",
  "intranet",
  "knowledge user",
  "knowledge base",
  "local area network",
  "leverage",
  "matrices",
  "matrix",
  "methodology",
  "middleware",
  "migration",
  "model",
  "moderator",
  "monitoring",
  "moratorium",
  "neural-net",
  "open architecture",
  "open system",
  "orchestration",
  "paradigm",
  "parallelism",
  "policy",
  "portal",
  "pricing structure",
  "process improvement",
  "product",
  "productivity",
  "project",
  "projection",
  "protocol",
  "secured line",
  "service-desk",
  "software",
  "solution",
  "standardization",
  "strategy",
  "structure",
  "success",
  "superstructure",
  "support",
  "synergy",
  "system engine",
  "task-force",
  "throughput",
  "time-frame",
  "toolset",
  "utilisation",
  "website",
  "workforce"
];

},{}],"node_modules/faker/lib/locales/en/company/bs_verb.js":[function(require,module,exports) {
module["exports"] = [
  "implement",
  "utilize",
  "integrate",
  "streamline",
  "optimize",
  "evolve",
  "transform",
  "embrace",
  "enable",
  "orchestrate",
  "leverage",
  "reinvent",
  "aggregate",
  "architect",
  "enhance",
  "incentivize",
  "morph",
  "empower",
  "envisioneer",
  "monetize",
  "harness",
  "facilitate",
  "seize",
  "disintermediate",
  "synergize",
  "strategize",
  "deploy",
  "brand",
  "grow",
  "target",
  "syndicate",
  "synthesize",
  "deliver",
  "mesh",
  "incubate",
  "engage",
  "maximize",
  "benchmark",
  "expedite",
  "reintermediate",
  "whiteboard",
  "visualize",
  "repurpose",
  "innovate",
  "scale",
  "unleash",
  "drive",
  "extend",
  "engineer",
  "revolutionize",
  "generate",
  "exploit",
  "transition",
  "e-enable",
  "iterate",
  "cultivate",
  "matrix",
  "productize",
  "redefine",
  "recontextualize"
];

},{}],"node_modules/faker/lib/locales/en/company/bs_adjective.js":[function(require,module,exports) {
module["exports"] = [
  "clicks-and-mortar",
  "value-added",
  "vertical",
  "proactive",
  "robust",
  "revolutionary",
  "scalable",
  "leading-edge",
  "innovative",
  "intuitive",
  "strategic",
  "e-business",
  "mission-critical",
  "sticky",
  "one-to-one",
  "24/7",
  "end-to-end",
  "global",
  "B2B",
  "B2C",
  "granular",
  "frictionless",
  "virtual",
  "viral",
  "dynamic",
  "24/365",
  "best-of-breed",
  "killer",
  "magnetic",
  "bleeding-edge",
  "web-enabled",
  "interactive",
  "dot-com",
  "sexy",
  "back-end",
  "real-time",
  "efficient",
  "front-end",
  "distributed",
  "seamless",
  "extensible",
  "turn-key",
  "world-class",
  "open-source",
  "cross-platform",
  "cross-media",
  "synergistic",
  "bricks-and-clicks",
  "out-of-the-box",
  "enterprise",
  "integrated",
  "impactful",
  "wireless",
  "transparent",
  "next-generation",
  "cutting-edge",
  "user-centric",
  "visionary",
  "customized",
  "ubiquitous",
  "plug-and-play",
  "collaborative",
  "compelling",
  "holistic",
  "rich"
];

},{}],"node_modules/faker/lib/locales/en/company/bs_noun.js":[function(require,module,exports) {
module["exports"] = [
  "synergies",
  "web-readiness",
  "paradigms",
  "markets",
  "partnerships",
  "infrastructures",
  "platforms",
  "initiatives",
  "channels",
  "eyeballs",
  "communities",
  "ROI",
  "solutions",
  "e-tailers",
  "e-services",
  "action-items",
  "portals",
  "niches",
  "technologies",
  "content",
  "vortals",
  "supply-chains",
  "convergence",
  "relationships",
  "architectures",
  "interfaces",
  "e-markets",
  "e-commerce",
  "systems",
  "bandwidth",
  "infomediaries",
  "models",
  "mindshare",
  "deliverables",
  "users",
  "schemas",
  "networks",
  "applications",
  "metrics",
  "e-business",
  "functionalities",
  "experiences",
  "web services",
  "methodologies",
  "blockchains"
];

},{}],"node_modules/faker/lib/locales/en/company/name.js":[function(require,module,exports) {
module["exports"] = [
  "#{Name.last_name} #{suffix}",
  "#{Name.last_name}-#{Name.last_name}",
  "#{Name.last_name}, #{Name.last_name} and #{Name.last_name}"
];

},{}],"node_modules/faker/lib/locales/en/company/index.js":[function(require,module,exports) {
var company = {};
module['exports'] = company;
company.suffix = require("./suffix");
company.adjective = require("./adjective");
company.descriptor = require("./descriptor");
company.noun = require("./noun");
company.bs_verb = require("./bs_verb");
company.bs_adjective = require("./bs_adjective");
company.bs_noun = require("./bs_noun");
company.name = require("./name");

},{"./suffix":"node_modules/faker/lib/locales/en/company/suffix.js","./adjective":"node_modules/faker/lib/locales/en/company/adjective.js","./descriptor":"node_modules/faker/lib/locales/en/company/descriptor.js","./noun":"node_modules/faker/lib/locales/en/company/noun.js","./bs_verb":"node_modules/faker/lib/locales/en/company/bs_verb.js","./bs_adjective":"node_modules/faker/lib/locales/en/company/bs_adjective.js","./bs_noun":"node_modules/faker/lib/locales/en/company/bs_noun.js","./name":"node_modules/faker/lib/locales/en/company/name.js"}],"node_modules/faker/lib/locales/en/internet/free_email.js":[function(require,module,exports) {
module["exports"] = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com"
];

},{}],"node_modules/faker/lib/locales/en/internet/example_email.js":[function(require,module,exports) {
module["exports"] = [
  "example.org",
  "example.com",
  "example.net"
];

},{}],"node_modules/faker/lib/locales/en/internet/domain_suffix.js":[function(require,module,exports) {
module["exports"] = [
  "com",
  "biz",
  "info",
  "name",
  "net",
  "org"
];

},{}],"node_modules/faker/lib/locales/en/internet/avatar_uri.js":[function(require,module,exports) {
module["exports"] = [
  "https://s3.amazonaws.com/uifaces/faces/twitter/jarjan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mahdif/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sprayaga/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ruzinav/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/Skyhartman/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/moscoz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kurafire/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/91bilal/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/malykhinv/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joelhelin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kushsolitary/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/coreyweb/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/snowshade/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/areus/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/holdenweb/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/heyimjuani/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/envex/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/unterdreht/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/collegeman/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/peejfancher/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/andyisonline/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ultragex/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ateneupopular/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ahmetalpbalkan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/Stievius/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kerem/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/osvaldas/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/angelceballos/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thierrykoblentz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/peterlandt/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/catarino/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/weglov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/brandclay/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ahmetsulek/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nicolasfolliot/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jayrobinson/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/victorerixon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/michzen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/markjenkins/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nicolai_larsen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/noxdzine/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/alagoon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/idiot/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mizko/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chadengle/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mutlu82/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/simobenso/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vocino/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/guiiipontes/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/soyjavi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joshaustin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tomaslau/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/VinThomas/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ManikRathee/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/langate/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cemshid/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/leemunroe/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/_shahedk/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/enda/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/BillSKenney/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/divya/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joshhemsley/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/linux29/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/Chakintosh/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/anaami/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joreira/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/shadeed9/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/scottkclark/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jedbridges/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/salleedesign/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/marakasina/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ariil/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/BrianPurkiss/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/michaelmartinho/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bublienko/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/devankoshal/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ZacharyZorbas/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/timmillwood/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joshuasortino/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/damenleeturks/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tomas_janousek/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/herrhaase/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/RussellBishop/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/brajeshwar/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cbracco/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bermonpainter/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/abdullindenis/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/isacosta/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/suprb/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/yalozhkin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chandlervdw/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/iamgarth/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/_victa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/commadelimited/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/roybarberuk/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/axel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ffbel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/syropian/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ankitind/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/traneblow/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/flashmurphy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ChrisFarina78/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/baliomega/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/saschamt/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jm_denis/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/anoff/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kennyadr/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chatyrko/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dingyi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mds/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/terryxlife/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aaroni/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kinday/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/prrstn/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/eduardostuart/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dhilipsiva/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/GavicoInd/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/baires/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rohixx/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/blakesimkins/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/leeiio/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tjrus/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/uberschizo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kylefoundry/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/claudioguglieri/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ripplemdk/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jakemoore/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joaoedumedeiros/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/poormini/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tereshenkov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/keryilmaz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/haydn_woods/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rude/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/llun/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sgaurav_baghel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jamiebrittain/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/badlittleduck/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/pifagor/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/agromov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/benefritz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/erwanhesry/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/diesellaws/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jeremiaha/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/koridhandy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chaensel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/andrewcohen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/smaczny/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gonzalorobaina/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nandini_m/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sydlawrence/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cdharrison/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tgerken/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lewisainslie/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/charliecwaite/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/robbschiller/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/flexrs/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mattdetails/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/raquelwilson/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/karsh/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mrmartineau/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/opnsrce/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hgharrygo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/maximseshuk/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/uxalex/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chanpory/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sharvin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/josemarques/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jefffis/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/krystalfister/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lokesh_coder/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thedamianhdez/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dpmachado/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/funwatercat/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/timothycd/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ivanfilipovbg/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/picard102/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/marcobarbosa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/krasnoukhov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/g3d/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ademilter/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rickdt/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/operatino/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bungiwan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hugomano/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/logorado/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dc_user/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/horaciobella/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/SlaapMe/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/teeragit/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/iqonicd/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ilya_pestov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/andrewarrow/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ssiskind/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/stan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rdsaunders/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/adamsxu/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/curiousoffice/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/themadray/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/michigangraham/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kohette/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nickfratter/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/runningskull/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/madysondesigns/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/brenton_clarke/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jennyshen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bradenhamm/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kurtinc/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/amanruzaini/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/coreyhaggard/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/Karimmove/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aaronalfred/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/wtrsld/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jitachi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/therealmarvin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/pmeissner/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ooomz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chacky14/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jesseddy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/shanehudson/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/akmur/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/IsaryAmairani/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/arthurholcombe1/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/boxmodel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ehsandiary/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/LucasPerdidao/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/shalt0ni/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/swaplord/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kaelifa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/plbabin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/guillemboti/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/arindam_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/renbyrd/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thiagovernetti/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jmillspaysbills/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mikemai2awesome/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jervo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mekal/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sta1ex/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/robergd/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/felipecsl/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/andrea211087/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/garand/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dhooyenga/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/abovefunction/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/pcridesagain/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/BryanHorsey/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/heykenneth/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dahparra/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/allthingssmitty/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/danvernon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/beweinreich/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/increase/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/falvarad/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/alxndrustinov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/souuf/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/orkuncaylar/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/AM_Kn2/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gearpixels/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bassamology/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vimarethomas/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kosmar/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/SULiik/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mrjamesnoble/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/silvanmuhlemann/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/shaneIxD/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nacho/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/yigitpinarbasi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/buzzusborne/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aaronkwhite/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rmlewisuk/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/giancarlon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nbirckel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/d_nny_m_cher/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sdidonato/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/atariboy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/abotap/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/karalek/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/psdesignuk/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ludwiczakpawel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nemanjaivanovic/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/baluli/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ahmadajmi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vovkasolovev/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/samgrover/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/derienzo777/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jonathansimmons/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nelsonjoyce/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/S0ufi4n3/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/xtopherpaul/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/oaktreemedia/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nateschulte/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/findingjenny/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/namankreative/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/antonyzotov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/we_social/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/leehambley/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/solid_color/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/abelcabans/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mbilderbach/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kkusaa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jordyvdboom/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/carlosgavina/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/pechkinator/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vc27/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rdbannon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/croakx/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/suribbles/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/catadeleon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gcmorley/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/duivvv/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/saschadroste/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/victorDubugras/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/wintopia/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mattbilotti/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/taylorling/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/megdraws/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/meln1ks/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mahmoudmetwally/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/Silveredge9/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/derekebradley/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/happypeter1983/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/travis_arnold/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/artem_kostenko/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/adobi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/daykiine/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/alek_djuric/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/scips/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/miguelmendes/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/justinrhee/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/alsobrooks/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/fronx/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mcflydesign/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/santi_urso/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/allfordesign/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/stayuber/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bertboerland/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/marosholly/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/adamnac/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cynthiasavard/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/muringa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/danro/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hiemil/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jackiesaik/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/iduuck/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/antjanus/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aroon_sharma/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dshster/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thehacker/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/michaelbrooksjr/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ryanmclaughlin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/clubb3rry/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/taybenlor/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/xripunov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/myastro/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/adityasutomo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/digitalmaverick/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hjartstrorn/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/itolmach/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vaughanmoffitt/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/abdots/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/isnifer/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sergeysafonov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/maz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/scrapdnb/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chrismj83/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vitorleal/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sokaniwaal/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/zaki3d/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/illyzoren/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mocabyte/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/osmanince/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/djsherman/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/davidhemphill/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/waghner/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/necodymiconer/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/praveen_vijaya/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/fabbrucci/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/travishines/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kuldarkalvik/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/Elt_n/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/phillapier/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/okseanjay/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/id835559/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kudretkeskin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/anjhero/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/scott_riley/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/noufalibrahim/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/borges_marcos/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/devinhalladay/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ciaranr/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/stefooo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mikebeecham/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tonymillion/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joshuaraichur/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/irae/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/petrangr/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dmitriychuta/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/charliegann/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/arashmanteghi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ainsleywagon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/svenlen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/faisalabid/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/beshur/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/carlyson/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dutchnadia/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/teddyzetterlund/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/samuelkraft/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aoimedia/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/toddrew/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/codepoet_ru/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/artvavs/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/benoitboucart/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jomarmen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kolmarlopez/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/creartinc/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/homka/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gaborenton/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/robinclediere/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/maximsorokin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/plasticine/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/j2deme/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/peachananr/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kapaluccio/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/de_ascanio/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rikas/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dawidwu/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/angelcreative/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rpatey/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/popey/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rehatkathuria/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/the_purplebunny/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/1markiz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ajaxy_ru/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/brenmurrell/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dudestein/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/oskarlevinson/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/victorstuber/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nehfy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vicivadeline/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/leandrovaranda/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/scottgallant/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/victor_haydin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sawrb/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ryhanhassan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/amayvs/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/a_brixen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/karolkrakowiak_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/herkulano/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/geran7/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cggaurav/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chris_witko/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lososina/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/polarity/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mattlat/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/brandonburke/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/constantx/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/teylorfeliz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/craigelimeliah/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rachelreveley/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/reabo101/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rahmeen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ky/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rickyyean/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/j04ntoh/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sebashton/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jpenico/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/francis_vega/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/oktayelipek/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kikillo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/fabbianz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/larrygerard/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/BroumiYoussef/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/0therplanet/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mbilalsiddique1/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ionuss/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/grrr_nl/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/liminha/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rawdiggie/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ryandownie/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sethlouey/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/pixage/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/switmer777/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/josevnclch/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kanickairaj/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/puzik/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tbakdesigns/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/besbujupi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/supjoey/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lowie/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/linkibol/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/balintorosz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/imcoding/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/agustincruiz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gusoto/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thomasschrijer/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/superoutman/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kalmerrautam/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gabrielizalo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gojeanyn/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/davidbaldie/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/_vojto/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/laurengray/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jydesign/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mymyboy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nellleo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/marciotoledo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ninjad3m0/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/to_soham/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hasslunsford/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/muridrahhal/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/levisan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/grahamkennery/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lepetitogre/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/antongenkin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nessoila/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/amandabuzard/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/safrankov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cocolero/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dss49/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/matt3224/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bluesix/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/quailandquasar/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/AlbertoCococi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lepinski/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sementiy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mhudobivnik/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thibaut_re/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/olgary/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/shojberg/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mtolokonnikov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bereto/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/naupintos/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/wegotvices/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/xadhix/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/macxim/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rodnylobos/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/madcampos/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/madebyvadim/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bartoszdawydzik/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/supervova/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/markretzloff/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vonachoo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/darylws/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/stevedesigner/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mylesb/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/herbigt/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/depaulawagner/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/geshan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gizmeedevil1991/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/_scottburgess/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lisovsky/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/davidsasda/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/artd_sign/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/YoungCutlass/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mgonto/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/itstotallyamy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/victorquinn/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/osmond/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/oksanafrewer/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/zauerkraut/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/iamkeithmason/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nitinhayaran/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lmjabreu/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mandalareopens/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thinkleft/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ponchomendivil/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/juamperro/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/brunodesign1206/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/caseycavanagh/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/luxe/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dotgridline/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/spedwig/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/madewulf/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mattsapii/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/helderleal/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chrisstumph/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jayphen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nsamoylov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/justme_timothyg/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/otozk/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/prinzadi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gu5taf/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cyril_gaillard/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/d_kobelyatsky/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/daniloc/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nwdsha/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/romanbulah/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/skkirilov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dvdwinden/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dannol/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thekevinjones/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jwalter14/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/timgthomas/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/buddhasource/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/uxpiper/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thatonetommy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/diansigitp/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/adrienths/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/klimmka/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gkaam/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/derekcramer/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jennyyo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nerrsoft/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/xalionmalik/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/edhenderson/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/keyuri85/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/roxanejammet/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kimcool/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/edkf/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/matkins/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/alessandroribe/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jacksonlatka/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lebronjennan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kostaspt/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/karlkanall/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/moynihan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/danpliego/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/saulihirvi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/wesleytrankin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/fjaguero/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bowbrick/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mashaaaaal/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/yassiryahya/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dparrelli/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/fotomagin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aka_james/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/denisepires/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/iqbalperkasa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/martinansty/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jarsen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/r_oy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/justinrob/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gabrielrosser/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/malgordon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/carlfairclough/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/michaelabehsera/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/pierrestoffe/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/enjoythetau/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/loganjlambert/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rpeezy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/coreyginnivan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/michalhron/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/msveet/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lingeswaran/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kolsvein/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/peter576/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/reideiredale/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joeymurdah/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/raphaelnikson/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mvdheuvel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/maxlinderman/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jimmuirhead/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/begreative/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/frankiefreesbie/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/robturlinckx/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/Talbi_ConSept/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/longlivemyword/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vanchesz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/maiklam/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rez___a/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gregsqueeb/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/greenbes/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/_ragzor/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/anthonysukow/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/fluidbrush/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dactrtr/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jehnglynn/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bergmartin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hugocornejo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/_kkga/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dzantievm/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sawalazar/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sovesove/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jonsgotwood/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/byryan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vytautas_a/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mizhgan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cicerobr/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nilshelmersson/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/d33pthought/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/davecraige/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nckjrvs/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/alexandermayes/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jcubic/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/craigrcoles/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bagawarman/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rob_thomas10/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cofla/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/maikelk/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rtgibbons/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/russell_baylis/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mhesslow/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/codysanfilippo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/webtanya/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/madebybrenton/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dcalonaci/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/perfectflow/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jjsiii/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/saarabpreet/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kumarrajan12123/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/iamsteffen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/themikenagle/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ceekaytweet/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/larrybolt/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/conspirator/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dallasbpeters/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/n3dmax/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/terpimost/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/byrnecore/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/j_drake_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/calebjoyce/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hoangloi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tobysaxon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gofrasdesign/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dimaposnyy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tjisousa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/okandungel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/billyroshan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/oskamaya/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/motionthinks/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/knilob/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ashocka18/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/marrimo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bartjo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/omnizya/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ernestsemerda/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/andreas_pr/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/edgarchris99/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thomasgeisen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gseguin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joannefournier/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/demersdesigns/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/adammarsbar/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nasirwd/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/n_tassone/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/javorszky/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/themrdave/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/yecidsm/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nicollerich/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/canapud/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nicoleglynn/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/judzhin_miles/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/designervzm/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kianoshp/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/evandrix/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/alterchuca/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dhrubo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ma_tiax/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ssbb_me/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dorphern/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mauriolg/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bruno_mart/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mactopus/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/the_winslet/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joemdesign/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/Shriiiiimp/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jacobbennett/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nfedoroff/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/iamglimy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/allagringaus/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aiiaiiaii/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/olaolusoga/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/buryaknick/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/wim1k/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nicklacke/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/a1chapone/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/steynviljoen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/strikewan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ryankirkman/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/andrewabogado/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/doooon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jagan123/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ariffsetiawan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/elenadissi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mwarkentin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thierrymeier_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/r_garcia/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dmackerman/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/borantula/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/konus/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/spacewood_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ryuchi311/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/evanshajed/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tristanlegros/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/shoaib253/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aislinnkelly/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/okcoker/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/timpetricola/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sunshinedgirl/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chadami/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aleclarsoniv/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nomidesigns/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/petebernardo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/scottiedude/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/millinet/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/imsoper/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/imammuht/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/benjamin_knight/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nepdud/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joki4/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lanceguyatt/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bboy1895/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/amywebbb/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rweve/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/haruintesettden/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ricburton/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nelshd/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/batsirai/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/primozcigler/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jffgrdnr/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/8d3k/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/al_li/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/souperphly/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mslarkina/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/2fockus/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cdavis565/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/xiel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/turkutuuli/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/uxward/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lebinoclard/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gauravjassal/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/davidmerrique/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mdsisto/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/andrewofficer/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kojourin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dnirmal/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kevka/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mr_shiznit/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aluisio_azevedo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cloudstudio/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/danvierich/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/alexivanichkin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/fran_mchamy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/perretmagali/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/betraydan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cadikkara/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/matbeedotcom/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jeremyworboys/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bpartridge/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/michaelkoper/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/silv3rgvn/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/alevizio/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/johnsmithagency/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lawlbwoy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vitor376/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/desastrozo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thimo_cz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jasonmarkjones/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lhausermann/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/xravil/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/guischmitt/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vigobronx/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/panghal0/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/miguelkooreman/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/surgeonist/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/christianoliff/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/iamkarna/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ipavelek/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/pierre_nel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/y2graphic/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sterlingrules/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/elbuscainfo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bennyjien/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/stushona/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/estebanuribe/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/embrcecreations/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/danillos/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/elliotlewis/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/charlesrpratt/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vladyn/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/emmeffess/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/carlosblanco_eu/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/leonfedotov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rangafangs/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tgormtx/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bryan_topham/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jpscribbles/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mighty55/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/carbontwelve/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/isaacfifth/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/iamjdeleon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/snowwrite/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/barputro/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/drewbyreese/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sachacorazzi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bistrianiosip/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/magoo04/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/pehamondello/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/yayteejay/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/a_harris88/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/algunsanabria/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/zforrester/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ovall/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/carlosjgsousa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/geobikas/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ah_lice/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/looneydoodle/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nerdgr8/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ddggccaa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/zackeeler/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/normanbox/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/el_fuertisimo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ismail_biltagi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/juangomezw/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jnmnrd/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/patrickcoombe/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ryanjohnson_me/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/markolschesky/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jeffgolenski/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kvasnic/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gauchomatt/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/afusinatto/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kevinoh/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/okansurreel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/adamawesomeface/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/emileboudeling/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/arishi_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/juanmamartinez/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/wikiziner/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/danthms/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mkginfo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/terrorpixel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/curiousonaut/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/prheemo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/michaelcolenso/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/foczzi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/martip07/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thaodang17/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/johncafazza/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/robinlayfield/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/franciscoamk/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/abdulhyeuk/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/marklamb/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/edobene/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/andresenfredrik/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mikaeljorhult/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chrisslowik/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vinciarts/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/meelford/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/elliotnolten/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/yehudab/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vijaykarthik/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bfrohs/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/josep_martins/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/attacks/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sur4dye/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tumski/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/instalox/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mangosango/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/paulfarino/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kazaky999/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kiwiupover/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nvkznemo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tom_even/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ratbus/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/woodsman001/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joshmedeski/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thewillbeard/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/psaikali/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joe_black/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aleinadsays/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/marcusgorillius/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hota_v/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jghyllebert/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/shinze/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/janpalounek/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jeremiespoken/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/her_ruu/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dansowter/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/felipeapiress/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/magugzbrand2d/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/posterjob/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nathalie_fs/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bobbytwoshoes/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dreizle/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jeremymouton/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/elisabethkjaer/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/notbadart/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mohanrohith/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jlsolerdeltoro/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/itskawsar/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/slowspock/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/zvchkelly/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/wiljanslofstra/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/craighenneberry/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/trubeatto/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/juaumlol/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/samscouto/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/BenouarradeM/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gipsy_raf/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/netonet_il/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/arkokoley/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/itsajimithing/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/smalonso/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/victordeanda/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/_dwite_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/richardgarretts/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gregrwilkinson/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/anatolinicolae/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lu4sh1i/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/stefanotirloni/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ostirbu/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/darcystonge/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/naitanamoreno/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/michaelcomiskey/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/adhiardana/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/marcomano_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/davidcazalis/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/falconerie/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gregkilian/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bcrad/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bolzanmarco/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/low_res/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vlajki/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/petar_prog/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jonkspr/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/akmalfikri/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mfacchinello/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/atanism/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/harry_sistalam/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/murrayswift/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bobwassermann/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gavr1l0/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/madshensel/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mr_subtle/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/deviljho_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/salimianoff/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joetruesdell/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/twittypork/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/airskylar/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dnezkumar/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dgajjar/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cherif_b/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/salvafc/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/louis_currie/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/deeenright/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cybind/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/eyronn/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sweetdelisa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/cboller1/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/andresdjasso/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/melvindidit/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/andysolomon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thaisselenator_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lvovenok/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/giuliusa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/belyaev_rs/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/overcloacked/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kamal_chaneman/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/incubo82/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hellofeverrrr/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mhaligowski/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sunlandictwin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bu7921/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/andytlaw/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jeremery/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/finchjke/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/manigm/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/umurgdk/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/scottfeltham/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ganserene/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mutu_krish/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jodytaggart/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ntfblog/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tanveerrao/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hfalucas/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/alxleroydeval/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kucingbelang4/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bargaorobalo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/colgruv/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/stalewine/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kylefrost/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/baumannzone/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/angelcolberg/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sachingawas/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jjshaw14/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ramanathan_pdy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/johndezember/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nilshoenson/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/brandonmorreale/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nutzumi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/brandonflatsoda/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sergeyalmone/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/klefue/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kirangopal/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/baumann_alex/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/matthewkay_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jay_wilburn/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/shesgared/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/apriendeau/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/johnriordan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/wake_gs/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aleksitappura/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/emsgulam/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/xilantra/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/imomenui/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sircalebgrove/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/newbrushes/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hsinyo23/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/m4rio/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/katiemdaly/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/s4f1/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ecommerceil/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/marlinjayakody/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/swooshycueb/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sangdth/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/coderdiaz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bluefx_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sasha_shestakov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/eugeneeweb/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dgclegg/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/n1ght_coder/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dixchen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/blakehawksworth/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/trueblood_33/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hai_ninh_nguyen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/marclgonzales/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/yesmeck/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/stephcoue/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/doronmalki/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ruehldesign/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/anasnakawa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kijanmaharjan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/wearesavas/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/stefvdham/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tweetubhai/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/alecarpentier/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/fiterik/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/antonyryndya/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/d00maz/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/theonlyzeke/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/missaaamy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/carlosm/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/manekenthe/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/reetajayendra/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jeremyshimko/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/justinrgraham/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/stefanozoffoli/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/overra/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mrebay007/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/shvelo96/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/pyronite/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/thedjpetersen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/rtyukmaev/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/_williamguerra/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/albertaugustin/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vikashpathak18/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kevinjohndayy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vj_demien/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/colirpixoil/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/goddardlewis/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/laasli/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jqiuss/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/heycamtaylor/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nastya_mane/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mastermindesign/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ccinojasso1/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/nyancecom/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sandywoodruff/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/bighanddesign/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sbtransparent/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aviddayentonbay/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/richwild/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kaysix_dizzy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/tur8le/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/seyedhossein1/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/privetwagner/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/emmandenn/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dev_essentials/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jmfsocial/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/_yardenoon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mateaodviteza/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/weavermedia/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mufaddal_mw/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hafeeskhan/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ashernatali/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sulaqo/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/eddiechen/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/josecarlospsh/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vm_f/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/enricocicconi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/danmartin70/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/gmourier/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/donjain/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mrxloka/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/_pedropinho/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/eitarafa/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/oscarowusu/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ralph_lam/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/panchajanyag/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/woodydotmx/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/jerrybai1907/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/marshallchen_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/xamorep/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aio___/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/chaabane_wail/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/txcx/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/akashsharma39/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/falling_soul/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sainraja/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mugukamil/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/johannesneu/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/markwienands/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/karthipanraj/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/balakayuriy/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/alan_zhang_/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/layerssss/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/kaspernordkvist/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/mirfanqureshi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/hanna_smi/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/VMilescu/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/aeon56/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/m_kalibry/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/sreejithexp/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dicesales/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/dhoot_amit/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/smenov/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/lonesomelemon/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vladimirdevic/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/joelcipriano/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/haligaliharun/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/buleswapnil/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/serefka/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/ifarafonow/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/vikasvinfotech/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/urrutimeoli/128.jpg",
  "https://s3.amazonaws.com/uifaces/faces/twitter/areandacom/128.jpg"
];

},{}],"node_modules/faker/lib/locales/en/internet/index.js":[function(require,module,exports) {
var internet = {};
module['exports'] = internet;
internet.free_email = require("./free_email");
internet.example_email = require("./example_email");
internet.domain_suffix = require("./domain_suffix");
internet.avatar_uri = require("./avatar_uri");

},{"./free_email":"node_modules/faker/lib/locales/en/internet/free_email.js","./example_email":"node_modules/faker/lib/locales/en/internet/example_email.js","./domain_suffix":"node_modules/faker/lib/locales/en/internet/domain_suffix.js","./avatar_uri":"node_modules/faker/lib/locales/en/internet/avatar_uri.js"}],"node_modules/faker/lib/locales/en/database/collation.js":[function(require,module,exports) {
module["exports"] = [
  "utf8_unicode_ci",
  "utf8_general_ci",
  "utf8_bin",
  "ascii_bin",
  "ascii_general_ci",
  "cp1250_bin",
  "cp1250_general_ci"
];

},{}],"node_modules/faker/lib/locales/en/database/column.js":[function(require,module,exports) {
module["exports"] = [
  "id",
  "title",
  "name",
  "email",
  "phone",
  "token",
  "group",
  "category",
  "password",
  "comment",
  "avatar",
  "status",
  "createdAt",
  "updatedAt"
];

},{}],"node_modules/faker/lib/locales/en/database/engine.js":[function(require,module,exports) {
module["exports"] = [
  "InnoDB",
  "MyISAM",
  "MEMORY",
  "CSV",
  "BLACKHOLE",
  "ARCHIVE"
];

},{}],"node_modules/faker/lib/locales/en/database/type.js":[function(require,module,exports) {
module["exports"] = [
  "int",
  "varchar",
  "text",
  "date",
  "datetime",
  "tinyint",
  "time",
  "timestamp",
  "smallint",
  "mediumint",
  "bigint",
  "decimal",
  "float",
  "double",
  "real",
  "bit",
  "boolean",
  "serial",
  "blob",
  "binary",
  "enum",
  "set",
  "geometry",
  "point"
];

},{}],"node_modules/faker/lib/locales/en/database/index.js":[function(require,module,exports) {
var database = {};
module['exports'] = database;
database.collation = require("./collation");
database.column = require("./column");
database.engine = require("./engine");
database.type = require("./type");
},{"./collation":"node_modules/faker/lib/locales/en/database/collation.js","./column":"node_modules/faker/lib/locales/en/database/column.js","./engine":"node_modules/faker/lib/locales/en/database/engine.js","./type":"node_modules/faker/lib/locales/en/database/type.js"}],"node_modules/faker/lib/locales/en/lorem/words.js":[function(require,module,exports) {
module["exports"] = [
  "alias",
  "consequatur",
  "aut",
  "perferendis",
  "sit",
  "voluptatem",
  "accusantium",
  "doloremque",
  "aperiam",
  "eaque",
  "ipsa",
  "quae",
  "ab",
  "illo",
  "inventore",
  "veritatis",
  "et",
  "quasi",
  "architecto",
  "beatae",
  "vitae",
  "dicta",
  "sunt",
  "explicabo",
  "aspernatur",
  "aut",
  "odit",
  "aut",
  "fugit",
  "sed",
  "quia",
  "consequuntur",
  "magni",
  "dolores",
  "eos",
  "qui",
  "ratione",
  "voluptatem",
  "sequi",
  "nesciunt",
  "neque",
  "dolorem",
  "ipsum",
  "quia",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipisci",
  "velit",
  "sed",
  "quia",
  "non",
  "numquam",
  "eius",
  "modi",
  "tempora",
  "incidunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magnam",
  "aliquam",
  "quaerat",
  "voluptatem",
  "ut",
  "enim",
  "ad",
  "minima",
  "veniam",
  "quis",
  "nostrum",
  "exercitationem",
  "ullam",
  "corporis",
  "nemo",
  "enim",
  "ipsam",
  "voluptatem",
  "quia",
  "voluptas",
  "sit",
  "suscipit",
  "laboriosam",
  "nisi",
  "ut",
  "aliquid",
  "ex",
  "ea",
  "commodi",
  "consequatur",
  "quis",
  "autem",
  "vel",
  "eum",
  "iure",
  "reprehenderit",
  "qui",
  "in",
  "ea",
  "voluptate",
  "velit",
  "esse",
  "quam",
  "nihil",
  "molestiae",
  "et",
  "iusto",
  "odio",
  "dignissimos",
  "ducimus",
  "qui",
  "blanditiis",
  "praesentium",
  "laudantium",
  "totam",
  "rem",
  "voluptatum",
  "deleniti",
  "atque",
  "corrupti",
  "quos",
  "dolores",
  "et",
  "quas",
  "molestias",
  "excepturi",
  "sint",
  "occaecati",
  "cupiditate",
  "non",
  "provident",
  "sed",
  "ut",
  "perspiciatis",
  "unde",
  "omnis",
  "iste",
  "natus",
  "error",
  "similique",
  "sunt",
  "in",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollitia",
  "animi",
  "id",
  "est",
  "laborum",
  "et",
  "dolorum",
  "fuga",
  "et",
  "harum",
  "quidem",
  "rerum",
  "facilis",
  "est",
  "et",
  "expedita",
  "distinctio",
  "nam",
  "libero",
  "tempore",
  "cum",
  "soluta",
  "nobis",
  "est",
  "eligendi",
  "optio",
  "cumque",
  "nihil",
  "impedit",
  "quo",
  "porro",
  "quisquam",
  "est",
  "qui",
  "minus",
  "id",
  "quod",
  "maxime",
  "placeat",
  "facere",
  "possimus",
  "omnis",
  "voluptas",
  "assumenda",
  "est",
  "omnis",
  "dolor",
  "repellendus",
  "temporibus",
  "autem",
  "quibusdam",
  "et",
  "aut",
  "consequatur",
  "vel",
  "illum",
  "qui",
  "dolorem",
  "eum",
  "fugiat",
  "quo",
  "voluptas",
  "nulla",
  "pariatur",
  "at",
  "vero",
  "eos",
  "et",
  "accusamus",
  "officiis",
  "debitis",
  "aut",
  "rerum",
  "necessitatibus",
  "saepe",
  "eveniet",
  "ut",
  "et",
  "voluptates",
  "repudiandae",
  "sint",
  "et",
  "molestiae",
  "non",
  "recusandae",
  "itaque",
  "earum",
  "rerum",
  "hic",
  "tenetur",
  "a",
  "sapiente",
  "delectus",
  "ut",
  "aut",
  "reiciendis",
  "voluptatibus",
  "maiores",
  "doloribus",
  "asperiores",
  "repellat"
];

},{}],"node_modules/faker/lib/locales/en/lorem/supplemental.js":[function(require,module,exports) {
module["exports"] = [
  "abbas",
  "abduco",
  "abeo",
  "abscido",
  "absconditus",
  "absens",
  "absorbeo",
  "absque",
  "abstergo",
  "absum",
  "abundans",
  "abutor",
  "accedo",
  "accendo",
  "acceptus",
  "accipio",
  "accommodo",
  "accusator",
  "acer",
  "acerbitas",
  "acervus",
  "acidus",
  "acies",
  "acquiro",
  "acsi",
  "adamo",
  "adaugeo",
  "addo",
  "adduco",
  "ademptio",
  "adeo",
  "adeptio",
  "adfectus",
  "adfero",
  "adficio",
  "adflicto",
  "adhaero",
  "adhuc",
  "adicio",
  "adimpleo",
  "adinventitias",
  "adipiscor",
  "adiuvo",
  "administratio",
  "admiratio",
  "admitto",
  "admoneo",
  "admoveo",
  "adnuo",
  "adopto",
  "adsidue",
  "adstringo",
  "adsuesco",
  "adsum",
  "adulatio",
  "adulescens",
  "adultus",
  "aduro",
  "advenio",
  "adversus",
  "advoco",
  "aedificium",
  "aeger",
  "aegre",
  "aegrotatio",
  "aegrus",
  "aeneus",
  "aequitas",
  "aequus",
  "aer",
  "aestas",
  "aestivus",
  "aestus",
  "aetas",
  "aeternus",
  "ager",
  "aggero",
  "aggredior",
  "agnitio",
  "agnosco",
  "ago",
  "ait",
  "aiunt",
  "alienus",
  "alii",
  "alioqui",
  "aliqua",
  "alius",
  "allatus",
  "alo",
  "alter",
  "altus",
  "alveus",
  "amaritudo",
  "ambitus",
  "ambulo",
  "amicitia",
  "amiculum",
  "amissio",
  "amita",
  "amitto",
  "amo",
  "amor",
  "amoveo",
  "amplexus",
  "amplitudo",
  "amplus",
  "ancilla",
  "angelus",
  "angulus",
  "angustus",
  "animadverto",
  "animi",
  "animus",
  "annus",
  "anser",
  "ante",
  "antea",
  "antepono",
  "antiquus",
  "aperio",
  "aperte",
  "apostolus",
  "apparatus",
  "appello",
  "appono",
  "appositus",
  "approbo",
  "apto",
  "aptus",
  "apud",
  "aqua",
  "ara",
  "aranea",
  "arbitro",
  "arbor",
  "arbustum",
  "arca",
  "arceo",
  "arcesso",
  "arcus",
  "argentum",
  "argumentum",
  "arguo",
  "arma",
  "armarium",
  "armo",
  "aro",
  "ars",
  "articulus",
  "artificiose",
  "arto",
  "arx",
  "ascisco",
  "ascit",
  "asper",
  "aspicio",
  "asporto",
  "assentator",
  "astrum",
  "atavus",
  "ater",
  "atqui",
  "atrocitas",
  "atrox",
  "attero",
  "attollo",
  "attonbitus",
  "auctor",
  "auctus",
  "audacia",
  "audax",
  "audentia",
  "audeo",
  "audio",
  "auditor",
  "aufero",
  "aureus",
  "auris",
  "aurum",
  "aut",
  "autem",
  "autus",
  "auxilium",
  "avaritia",
  "avarus",
  "aveho",
  "averto",
  "avoco",
  "baiulus",
  "balbus",
  "barba",
  "bardus",
  "basium",
  "beatus",
  "bellicus",
  "bellum",
  "bene",
  "beneficium",
  "benevolentia",
  "benigne",
  "bestia",
  "bibo",
  "bis",
  "blandior",
  "bonus",
  "bos",
  "brevis",
  "cado",
  "caecus",
  "caelestis",
  "caelum",
  "calamitas",
  "calcar",
  "calco",
  "calculus",
  "callide",
  "campana",
  "candidus",
  "canis",
  "canonicus",
  "canto",
  "capillus",
  "capio",
  "capitulus",
  "capto",
  "caput",
  "carbo",
  "carcer",
  "careo",
  "caries",
  "cariosus",
  "caritas",
  "carmen",
  "carpo",
  "carus",
  "casso",
  "caste",
  "casus",
  "catena",
  "caterva",
  "cattus",
  "cauda",
  "causa",
  "caute",
  "caveo",
  "cavus",
  "cedo",
  "celebrer",
  "celer",
  "celo",
  "cena",
  "cenaculum",
  "ceno",
  "censura",
  "centum",
  "cerno",
  "cernuus",
  "certe",
  "certo",
  "certus",
  "cervus",
  "cetera",
  "charisma",
  "chirographum",
  "cibo",
  "cibus",
  "cicuta",
  "cilicium",
  "cimentarius",
  "ciminatio",
  "cinis",
  "circumvenio",
  "cito",
  "civis",
  "civitas",
  "clam",
  "clamo",
  "claro",
  "clarus",
  "claudeo",
  "claustrum",
  "clementia",
  "clibanus",
  "coadunatio",
  "coaegresco",
  "coepi",
  "coerceo",
  "cogito",
  "cognatus",
  "cognomen",
  "cogo",
  "cohaero",
  "cohibeo",
  "cohors",
  "colligo",
  "colloco",
  "collum",
  "colo",
  "color",
  "coma",
  "combibo",
  "comburo",
  "comedo",
  "comes",
  "cometes",
  "comis",
  "comitatus",
  "commemoro",
  "comminor",
  "commodo",
  "communis",
  "comparo",
  "compello",
  "complectus",
  "compono",
  "comprehendo",
  "comptus",
  "conatus",
  "concedo",
  "concido",
  "conculco",
  "condico",
  "conduco",
  "confero",
  "confido",
  "conforto",
  "confugo",
  "congregatio",
  "conicio",
  "coniecto",
  "conitor",
  "coniuratio",
  "conor",
  "conqueror",
  "conscendo",
  "conservo",
  "considero",
  "conspergo",
  "constans",
  "consuasor",
  "contabesco",
  "contego",
  "contigo",
  "contra",
  "conturbo",
  "conventus",
  "convoco",
  "copia",
  "copiose",
  "cornu",
  "corona",
  "corpus",
  "correptius",
  "corrigo",
  "corroboro",
  "corrumpo",
  "coruscus",
  "cotidie",
  "crapula",
  "cras",
  "crastinus",
  "creator",
  "creber",
  "crebro",
  "credo",
  "creo",
  "creptio",
  "crepusculum",
  "cresco",
  "creta",
  "cribro",
  "crinis",
  "cruciamentum",
  "crudelis",
  "cruentus",
  "crur",
  "crustulum",
  "crux",
  "cubicularis",
  "cubitum",
  "cubo",
  "cui",
  "cuius",
  "culpa",
  "culpo",
  "cultellus",
  "cultura",
  "cum",
  "cunabula",
  "cunae",
  "cunctatio",
  "cupiditas",
  "cupio",
  "cuppedia",
  "cupressus",
  "cur",
  "cura",
  "curatio",
  "curia",
  "curiositas",
  "curis",
  "curo",
  "curriculum",
  "currus",
  "cursim",
  "curso",
  "cursus",
  "curto",
  "curtus",
  "curvo",
  "curvus",
  "custodia",
  "damnatio",
  "damno",
  "dapifer",
  "debeo",
  "debilito",
  "decens",
  "decerno",
  "decet",
  "decimus",
  "decipio",
  "decor",
  "decretum",
  "decumbo",
  "dedecor",
  "dedico",
  "deduco",
  "defaeco",
  "defendo",
  "defero",
  "defessus",
  "defetiscor",
  "deficio",
  "defigo",
  "defleo",
  "defluo",
  "defungo",
  "degenero",
  "degero",
  "degusto",
  "deinde",
  "delectatio",
  "delego",
  "deleo",
  "delibero",
  "delicate",
  "delinquo",
  "deludo",
  "demens",
  "demergo",
  "demitto",
  "demo",
  "demonstro",
  "demoror",
  "demulceo",
  "demum",
  "denego",
  "denique",
  "dens",
  "denuncio",
  "denuo",
  "deorsum",
  "depereo",
  "depono",
  "depopulo",
  "deporto",
  "depraedor",
  "deprecator",
  "deprimo",
  "depromo",
  "depulso",
  "deputo",
  "derelinquo",
  "derideo",
  "deripio",
  "desidero",
  "desino",
  "desipio",
  "desolo",
  "desparatus",
  "despecto",
  "despirmatio",
  "infit",
  "inflammatio",
  "paens",
  "patior",
  "patria",
  "patrocinor",
  "patruus",
  "pauci",
  "paulatim",
  "pauper",
  "pax",
  "peccatus",
  "pecco",
  "pecto",
  "pectus",
  "pecunia",
  "pecus",
  "peior",
  "pel",
  "ocer",
  "socius",
  "sodalitas",
  "sol",
  "soleo",
  "solio",
  "solitudo",
  "solium",
  "sollers",
  "sollicito",
  "solum",
  "solus",
  "solutio",
  "solvo",
  "somniculosus",
  "somnus",
  "sonitus",
  "sono",
  "sophismata",
  "sopor",
  "sordeo",
  "sortitus",
  "spargo",
  "speciosus",
  "spectaculum",
  "speculum",
  "sperno",
  "spero",
  "spes",
  "spiculum",
  "spiritus",
  "spoliatio",
  "sponte",
  "stabilis",
  "statim",
  "statua",
  "stella",
  "stillicidium",
  "stipes",
  "stips",
  "sto",
  "strenuus",
  "strues",
  "studio",
  "stultus",
  "suadeo",
  "suasoria",
  "sub",
  "subito",
  "subiungo",
  "sublime",
  "subnecto",
  "subseco",
  "substantia",
  "subvenio",
  "succedo",
  "succurro",
  "sufficio",
  "suffoco",
  "suffragium",
  "suggero",
  "sui",
  "sulum",
  "sum",
  "summa",
  "summisse",
  "summopere",
  "sumo",
  "sumptus",
  "supellex",
  "super",
  "suppellex",
  "supplanto",
  "suppono",
  "supra",
  "surculus",
  "surgo",
  "sursum",
  "suscipio",
  "suspendo",
  "sustineo",
  "suus",
  "synagoga",
  "tabella",
  "tabernus",
  "tabesco",
  "tabgo",
  "tabula",
  "taceo",
  "tactus",
  "taedium",
  "talio",
  "talis",
  "talus",
  "tam",
  "tamdiu",
  "tamen",
  "tametsi",
  "tamisium",
  "tamquam",
  "tandem",
  "tantillus",
  "tantum",
  "tardus",
  "tego",
  "temeritas",
  "temperantia",
  "templum",
  "temptatio",
  "tempus",
  "tenax",
  "tendo",
  "teneo",
  "tener",
  "tenuis",
  "tenus",
  "tepesco",
  "tepidus",
  "ter",
  "terebro",
  "teres",
  "terga",
  "tergeo",
  "tergiversatio",
  "tergo",
  "tergum",
  "termes",
  "terminatio",
  "tero",
  "terra",
  "terreo",
  "territo",
  "terror",
  "tersus",
  "tertius",
  "testimonium",
  "texo",
  "textilis",
  "textor",
  "textus",
  "thalassinus",
  "theatrum",
  "theca",
  "thema",
  "theologus",
  "thermae",
  "thesaurus",
  "thesis",
  "thorax",
  "thymbra",
  "thymum",
  "tibi",
  "timidus",
  "timor",
  "titulus",
  "tolero",
  "tollo",
  "tondeo",
  "tonsor",
  "torqueo",
  "torrens",
  "tot",
  "totidem",
  "toties",
  "totus",
  "tracto",
  "trado",
  "traho",
  "trans",
  "tredecim",
  "tremo",
  "trepide",
  "tres",
  "tribuo",
  "tricesimus",
  "triduana",
  "triginta",
  "tripudio",
  "tristis",
  "triumphus",
  "trucido",
  "truculenter",
  "tubineus",
  "tui",
  "tum",
  "tumultus",
  "tunc",
  "turba",
  "turbo",
  "turpe",
  "turpis",
  "tutamen",
  "tutis",
  "tyrannus",
  "uberrime",
  "ubi",
  "ulciscor",
  "ullus",
  "ulterius",
  "ultio",
  "ultra",
  "umbra",
  "umerus",
  "umquam",
  "una",
  "unde",
  "undique",
  "universe",
  "unus",
  "urbanus",
  "urbs",
  "uredo",
  "usitas",
  "usque",
  "ustilo",
  "ustulo",
  "usus",
  "uter",
  "uterque",
  "utilis",
  "utique",
  "utor",
  "utpote",
  "utrimque",
  "utroque",
  "utrum",
  "uxor",
  "vaco",
  "vacuus",
  "vado",
  "vae",
  "valde",
  "valens",
  "valeo",
  "valetudo",
  "validus",
  "vallum",
  "vapulus",
  "varietas",
  "varius",
  "vehemens",
  "vel",
  "velociter",
  "velum",
  "velut",
  "venia",
  "venio",
  "ventito",
  "ventosus",
  "ventus",
  "venustas",
  "ver",
  "verbera",
  "verbum",
  "vere",
  "verecundia",
  "vereor",
  "vergo",
  "veritas",
  "vero",
  "versus",
  "verto",
  "verumtamen",
  "verus",
  "vesco",
  "vesica",
  "vesper",
  "vespillo",
  "vester",
  "vestigium",
  "vestrum",
  "vetus",
  "via",
  "vicinus",
  "vicissitudo",
  "victoria",
  "victus",
  "videlicet",
  "video",
  "viduata",
  "viduo",
  "vigilo",
  "vigor",
  "vilicus",
  "vilis",
  "vilitas",
  "villa",
  "vinco",
  "vinculum",
  "vindico",
  "vinitor",
  "vinum",
  "vir",
  "virga",
  "virgo",
  "viridis",
  "viriliter",
  "virtus",
  "vis",
  "viscus",
  "vita",
  "vitiosus",
  "vitium",
  "vito",
  "vivo",
  "vix",
  "vobis",
  "vociferor",
  "voco",
  "volaticus",
  "volo",
  "volubilis",
  "voluntarius",
  "volup",
  "volutabrum",
  "volva",
  "vomer",
  "vomica",
  "vomito",
  "vorago",
  "vorax",
  "voro",
  "vos",
  "votum",
  "voveo",
  "vox",
  "vulariter",
  "vulgaris",
  "vulgivagus",
  "vulgo",
  "vulgus",
  "vulnero",
  "vulnus",
  "vulpes",
  "vulticulus",
  "vultuosus",
  "xiphias"
];

},{}],"node_modules/faker/lib/locales/en/lorem/index.js":[function(require,module,exports) {
var lorem = {};
module['exports'] = lorem;
lorem.words = require("./words");
lorem.supplemental = require("./supplemental");

},{"./words":"node_modules/faker/lib/locales/en/lorem/words.js","./supplemental":"node_modules/faker/lib/locales/en/lorem/supplemental.js"}],"node_modules/faker/lib/locales/en/name/male_first_name.js":[function(require,module,exports) {
module["exports"] = [
	"James",
	"John",
	"Robert",
	"Michael",
	"William",
	"David",
	"Richard",
	"Charles",
	"Joseph",
	"Thomas",
	"Christopher",
	"Daniel",
	"Paul",
	"Mark",
	"Donald",
	"George",
	"Kenneth",
	"Steven",
	"Edward",
	"Brian",
	"Ronald",
	"Anthony",
	"Kevin",
	"Jason",
	"Matthew",
	"Gary",
	"Timothy",
	"Jose",
	"Larry",
	"Jeffrey",
	"Frank",
	"Scott",
	"Eric",
	"Stephen",
	"Andrew",
	"Raymond",
	"Gregory",
	"Joshua",
	"Jerry",
	"Dennis",
	"Walter",
	"Patrick",
	"Peter",
	"Harold",
	"Douglas",
	"Henry",
	"Carl",
	"Arthur",
	"Ryan",
	"Roger",
	"Joe",
	"Juan",
	"Jack",
	"Albert",
	"Jonathan",
	"Justin",
	"Terry",
	"Gerald",
	"Keith",
	"Samuel",
	"Willie",
	"Ralph",
	"Lawrence",
	"Nicholas",
	"Roy",
	"Benjamin",
	"Bruce",
	"Brandon",
	"Adam",
	"Harry",
	"Fred",
	"Wayne",
	"Billy",
	"Steve",
	"Louis",
	"Jeremy",
	"Aaron",
	"Randy",
	"Howard",
	"Eugene",
	"Carlos",
	"Russell",
	"Bobby",
	"Victor",
	"Martin",
	"Ernest",
	"Phillip",
	"Todd",
	"Jesse",
	"Craig",
	"Alan",
	"Shawn",
	"Clarence",
	"Sean",
	"Philip",
	"Chris",
	"Johnny",
	"Earl",
	"Jimmy",
	"Antonio",
	"Danny",
	"Bryan",
	"Tony",
	"Luis",
	"Mike",
	"Stanley",
	"Leonard",
	"Nathan",
	"Dale",
	"Manuel",
	"Rodney",
	"Curtis",
	"Norman",
	"Allen",
	"Marvin",
	"Vincent",
	"Glenn",
	"Jeffery",
	"Travis",
	"Jeff",
	"Chad",
	"Jacob",
	"Lee",
	"Melvin",
	"Alfred",
	"Kyle",
	"Francis",
	"Bradley",
	"Jesus",
	"Herbert",
	"Frederick",
	"Ray",
	"Joel",
	"Edwin",
	"Don",
	"Eddie",
	"Ricky",
	"Troy",
	"Randall",
	"Barry",
	"Alexander",
	"Bernard",
	"Mario",
	"Leroy",
	"Francisco",
	"Marcus",
	"Micheal",
	"Theodore",
	"Clifford",
	"Miguel",
	"Oscar",
	"Jay",
	"Jim",
	"Tom",
	"Calvin",
	"Alex",
	"Jon",
	"Ronnie",
	"Bill",
	"Lloyd",
	"Tommy",
	"Leon",
	"Derek",
	"Warren",
	"Darrell",
	"Jerome",
	"Floyd",
	"Leo",
	"Alvin",
	"Tim",
	"Wesley",
	"Gordon",
	"Dean",
	"Greg",
	"Jorge",
	"Dustin",
	"Pedro",
	"Derrick",
	"Dan",
	"Lewis",
	"Zachary",
	"Corey",
	"Herman",
	"Maurice",
	"Vernon",
	"Roberto",
	"Clyde",
	"Glen",
	"Hector",
	"Shane",
	"Ricardo",
	"Sam",
	"Rick",
	"Lester",
	"Brent",
	"Ramon",
	"Charlie",
	"Tyler",
	"Gilbert",
	"Gene",
	"Marc",
	"Reginald",
	"Ruben",
	"Brett",
	"Angel",
	"Nathaniel",
	"Rafael",
	"Leslie",
	"Edgar",
	"Milton",
	"Raul",
	"Ben",
	"Chester",
	"Cecil",
	"Duane",
	"Franklin",
	"Andre",
	"Elmer",
	"Brad",
	"Gabriel",
	"Ron",
	"Mitchell",
	"Roland",
	"Arnold",
	"Harvey",
	"Jared",
	"Adrian",
	"Karl",
	"Cory",
	"Claude",
	"Erik",
	"Darryl",
	"Jamie",
	"Neil",
	"Jessie",
	"Christian",
	"Javier",
	"Fernando",
	"Clinton",
	"Ted",
	"Mathew",
	"Tyrone",
	"Darren",
	"Lonnie",
	"Lance",
	"Cody",
	"Julio",
	"Kelly",
	"Kurt",
	"Allan",
	"Nelson",
	"Guy",
	"Clayton",
	"Hugh",
	"Max",
	"Dwayne",
	"Dwight",
	"Armando",
	"Felix",
	"Jimmie",
	"Everett",
	"Jordan",
	"Ian",
	"Wallace",
	"Ken",
	"Bob",
	"Jaime",
	"Casey",
	"Alfredo",
	"Alberto",
	"Dave",
	"Ivan",
	"Johnnie",
	"Sidney",
	"Byron",
	"Julian",
	"Isaac",
	"Morris",
	"Clifton",
	"Willard",
	"Daryl",
	"Ross",
	"Virgil",
	"Andy",
	"Marshall",
	"Salvador",
	"Perry",
	"Kirk",
	"Sergio",
	"Marion",
	"Tracy",
	"Seth",
	"Kent",
	"Terrance",
	"Rene",
	"Eduardo",
	"Terrence",
	"Enrique",
	"Freddie",
	"Wade",
	"Austin",
	"Stuart",
	"Fredrick",
	"Arturo",
	"Alejandro",
	"Jackie",
	"Joey",
	"Nick",
	"Luther",
	"Wendell",
	"Jeremiah",
	"Evan",
	"Julius",
	"Dana",
	"Donnie",
	"Otis",
	"Shannon",
	"Trevor",
	"Oliver",
	"Luke",
	"Homer",
	"Gerard",
	"Doug",
	"Kenny",
	"Hubert",
	"Angelo",
	"Shaun",
	"Lyle",
	"Matt",
	"Lynn",
	"Alfonso",
	"Orlando",
	"Rex",
	"Carlton",
	"Ernesto",
	"Cameron",
	"Neal",
	"Pablo",
	"Lorenzo",
	"Omar",
	"Wilbur",
	"Blake",
	"Grant",
	"Horace",
	"Roderick",
	"Kerry",
	"Abraham",
	"Willis",
	"Rickey",
	"Jean",
	"Ira",
	"Andres",
	"Cesar",
	"Johnathan",
	"Malcolm",
	"Rudolph",
	"Damon",
	"Kelvin",
	"Rudy",
	"Preston",
	"Alton",
	"Archie",
	"Marco",
	"Wm",
	"Pete",
	"Randolph",
	"Garry",
	"Geoffrey",
	"Jonathon",
	"Felipe",
	"Bennie",
	"Gerardo",
	"Ed",
	"Dominic",
	"Robin",
	"Loren",
	"Delbert",
	"Colin",
	"Guillermo",
	"Earnest",
	"Lucas",
	"Benny",
	"Noel",
	"Spencer",
	"Rodolfo",
	"Myron",
	"Edmund",
	"Garrett",
	"Salvatore",
	"Cedric",
	"Lowell",
	"Gregg",
	"Sherman",
	"Wilson",
	"Devin",
	"Sylvester",
	"Kim",
	"Roosevelt",
	"Israel",
	"Jermaine",
	"Forrest",
	"Wilbert",
	"Leland",
	"Simon",
	"Guadalupe",
	"Clark",
	"Irving",
	"Carroll",
	"Bryant",
	"Owen",
	"Rufus",
	"Woodrow",
	"Sammy",
	"Kristopher",
	"Mack",
	"Levi",
	"Marcos",
	"Gustavo",
	"Jake",
	"Lionel",
	"Marty",
	"Taylor",
	"Ellis",
	"Dallas",
	"Gilberto",
	"Clint",
	"Nicolas",
	"Laurence",
	"Ismael",
	"Orville",
	"Drew",
	"Jody",
	"Ervin",
	"Dewey",
	"Al",
	"Wilfred",
	"Josh",
	"Hugo",
	"Ignacio",
	"Caleb",
	"Tomas",
	"Sheldon",
	"Erick",
	"Frankie",
	"Stewart",
	"Doyle",
	"Darrel",
	"Rogelio",
	"Terence",
	"Santiago",
	"Alonzo",
	"Elias",
	"Bert",
	"Elbert",
	"Ramiro",
	"Conrad",
	"Pat",
	"Noah",
	"Grady",
	"Phil",
	"Cornelius",
	"Lamar",
	"Rolando",
	"Clay",
	"Percy",
	"Dexter",
	"Bradford",
	"Merle",
	"Darin",
	"Amos",
	"Terrell",
	"Moses",
	"Irvin",
	"Saul",
	"Roman",
	"Darnell",
	"Randal",
	"Tommie",
	"Timmy",
	"Darrin",
	"Winston",
	"Brendan",
	"Toby",
	"Van",
	"Abel",
	"Dominick",
	"Boyd",
	"Courtney",
	"Jan",
	"Emilio",
	"Elijah",
	"Cary",
	"Domingo",
	"Santos",
	"Aubrey",
	"Emmett",
	"Marlon",
	"Emanuel",
	"Jerald",
	"Edmond"
	];
},{}],"node_modules/faker/lib/locales/en/name/female_first_name.js":[function(require,module,exports) {
module["exports"] = [
	"Mary",
	"Patricia",
	"Linda",
	"Barbara",
	"Elizabeth",
	"Jennifer",
	"Maria",
	"Susan",
	"Margaret",
	"Dorothy",
	"Lisa",
	"Nancy",
	"Karen",
	"Betty",
	"Helen",
	"Sandra",
	"Donna",
	"Carol",
	"Ruth",
	"Sharon",
	"Michelle",
	"Laura",
	"Sarah",
	"Kimberly",
	"Deborah",
	"Jessica",
	"Shirley",
	"Cynthia",
	"Angela",
	"Melissa",
	"Brenda",
	"Amy",
	"Anna",
	"Rebecca",
	"Virginia",
	"Kathleen",
	"Pamela",
	"Martha",
	"Debra",
	"Amanda",
	"Stephanie",
	"Carolyn",
	"Christine",
	"Marie",
	"Janet",
	"Catherine",
	"Frances",
	"Ann",
	"Joyce",
	"Diane",
	"Alice",
	"Julie",
	"Heather",
	"Teresa",
	"Doris",
	"Gloria",
	"Evelyn",
	"Jean",
	"Cheryl",
	"Mildred",
	"Katherine",
	"Joan",
	"Ashley",
	"Judith",
	"Rose",
	"Janice",
	"Kelly",
	"Nicole",
	"Judy",
	"Christina",
	"Kathy",
	"Theresa",
	"Beverly",
	"Denise",
	"Tammy",
	"Irene",
	"Jane",
	"Lori",
	"Rachel",
	"Marilyn",
	"Andrea",
	"Kathryn",
	"Louise",
	"Sara",
	"Anne",
	"Jacqueline",
	"Wanda",
	"Bonnie",
	"Julia",
	"Ruby",
	"Lois",
	"Tina",
	"Phyllis",
	"Norma",
	"Paula",
	"Diana",
	"Annie",
	"Lillian",
	"Emily",
	"Robin",
	"Peggy",
	"Crystal",
	"Gladys",
	"Rita",
	"Dawn",
	"Connie",
	"Florence",
	"Tracy",
	"Edna",
	"Tiffany",
	"Carmen",
	"Rosa",
	"Cindy",
	"Grace",
	"Wendy",
	"Victoria",
	"Edith",
	"Kim",
	"Sherry",
	"Sylvia",
	"Josephine",
	"Thelma",
	"Shannon",
	"Sheila",
	"Ethel",
	"Ellen",
	"Elaine",
	"Marjorie",
	"Carrie",
	"Charlotte",
	"Monica",
	"Esther",
	"Pauline",
	"Emma",
	"Juanita",
	"Anita",
	"Rhonda",
	"Hazel",
	"Amber",
	"Eva",
	"Debbie",
	"April",
	"Leslie",
	"Clara",
	"Lucille",
	"Jamie",
	"Joanne",
	"Eleanor",
	"Valerie",
	"Danielle",
	"Megan",
	"Alicia",
	"Suzanne",
	"Michele",
	"Gail",
	"Bertha",
	"Darlene",
	"Veronica",
	"Jill",
	"Erin",
	"Geraldine",
	"Lauren",
	"Cathy",
	"Joann",
	"Lorraine",
	"Lynn",
	"Sally",
	"Regina",
	"Erica",
	"Beatrice",
	"Dolores",
	"Bernice",
	"Audrey",
	"Yvonne",
	"Annette",
	"June",
	"Samantha",
	"Marion",
	"Dana",
	"Stacy",
	"Ana",
	"Renee",
	"Ida",
	"Vivian",
	"Roberta",
	"Holly",
	"Brittany",
	"Melanie",
	"Loretta",
	"Yolanda",
	"Jeanette",
	"Laurie",
	"Katie",
	"Kristen",
	"Vanessa",
	"Alma",
	"Sue",
	"Elsie",
	"Beth",
	"Jeanne",
	"Vicki",
	"Carla",
	"Tara",
	"Rosemary",
	"Eileen",
	"Terri",
	"Gertrude",
	"Lucy",
	"Tonya",
	"Ella",
	"Stacey",
	"Wilma",
	"Gina",
	"Kristin",
	"Jessie",
	"Natalie",
	"Agnes",
	"Vera",
	"Willie",
	"Charlene",
	"Bessie",
	"Delores",
	"Melinda",
	"Pearl",
	"Arlene",
	"Maureen",
	"Colleen",
	"Allison",
	"Tamara",
	"Joy",
	"Georgia",
	"Constance",
	"Lillie",
	"Claudia",
	"Jackie",
	"Marcia",
	"Tanya",
	"Nellie",
	"Minnie",
	"Marlene",
	"Heidi",
	"Glenda",
	"Lydia",
	"Viola",
	"Courtney",
	"Marian",
	"Stella",
	"Caroline",
	"Dora",
	"Jo",
	"Vickie",
	"Mattie",
	"Terry",
	"Maxine",
	"Irma",
	"Mabel",
	"Marsha",
	"Myrtle",
	"Lena",
	"Christy",
	"Deanna",
	"Patsy",
	"Hilda",
	"Gwendolyn",
	"Jennie",
	"Nora",
	"Margie",
	"Nina",
	"Cassandra",
	"Leah",
	"Penny",
	"Kay",
	"Priscilla",
	"Naomi",
	"Carole",
	"Brandy",
	"Olga",
	"Billie",
	"Dianne",
	"Tracey",
	"Leona",
	"Jenny",
	"Felicia",
	"Sonia",
	"Miriam",
	"Velma",
	"Becky",
	"Bobbie",
	"Violet",
	"Kristina",
	"Toni",
	"Misty",
	"Mae",
	"Shelly",
	"Daisy",
	"Ramona",
	"Sherri",
	"Erika",
	"Katrina",
	"Claire",
	"Lindsey",
	"Lindsay",
	"Geneva",
	"Guadalupe",
	"Belinda",
	"Margarita",
	"Sheryl",
	"Cora",
	"Faye",
	"Ada",
	"Natasha",
	"Sabrina",
	"Isabel",
	"Marguerite",
	"Hattie",
	"Harriet",
	"Molly",
	"Cecilia",
	"Kristi",
	"Brandi",
	"Blanche",
	"Sandy",
	"Rosie",
	"Joanna",
	"Iris",
	"Eunice",
	"Angie",
	"Inez",
	"Lynda",
	"Madeline",
	"Amelia",
	"Alberta",
	"Genevieve",
	"Monique",
	"Jodi",
	"Janie",
	"Maggie",
	"Kayla",
	"Sonya",
	"Jan",
	"Lee",
	"Kristine",
	"Candace",
	"Fannie",
	"Maryann",
	"Opal",
	"Alison",
	"Yvette",
	"Melody",
	"Luz",
	"Susie",
	"Olivia",
	"Flora",
	"Shelley",
	"Kristy",
	"Mamie",
	"Lula",
	"Lola",
	"Verna",
	"Beulah",
	"Antoinette",
	"Candice",
	"Juana",
	"Jeannette",
	"Pam",
	"Kelli",
	"Hannah",
	"Whitney",
	"Bridget",
	"Karla",
	"Celia",
	"Latoya",
	"Patty",
	"Shelia",
	"Gayle",
	"Della",
	"Vicky",
	"Lynne",
	"Sheri",
	"Marianne",
	"Kara",
	"Jacquelyn",
	"Erma",
	"Blanca",
	"Myra",
	"Leticia",
	"Pat",
	"Krista",
	"Roxanne",
	"Angelica",
	"Johnnie",
	"Robyn",
	"Francis",
	"Adrienne",
	"Rosalie",
	"Alexandra",
	"Brooke",
	"Bethany",
	"Sadie",
	"Bernadette",
	"Traci",
	"Jody",
	"Kendra",
	"Jasmine",
	"Nichole",
	"Rachael",
	"Chelsea",
	"Mable",
	"Ernestine",
	"Muriel",
	"Marcella",
	"Elena",
	"Krystal",
	"Angelina",
	"Nadine",
	"Kari",
	"Estelle",
	"Dianna",
	"Paulette",
	"Lora",
	"Mona",
	"Doreen",
	"Rosemarie",
	"Angel",
	"Desiree",
	"Antonia",
	"Hope",
	"Ginger",
	"Janis",
	"Betsy",
	"Christie",
	"Freda",
	"Mercedes",
	"Meredith",
	"Lynette",
	"Teri",
	"Cristina",
	"Eula",
	"Leigh",
	"Meghan",
	"Sophia",
	"Eloise",
	"Rochelle",
	"Gretchen",
	"Cecelia",
	"Raquel",
	"Henrietta",
	"Alyssa",
	"Jana",
	"Kelley",
	"Gwen",
	"Kerry",
	"Jenna",
	"Tricia",
	"Laverne",
	"Olive",
	"Alexis",
	"Tasha",
	"Silvia",
	"Elvira",
	"Casey",
	"Delia",
	"Sophie",
	"Kate",
	"Patti",
	"Lorena",
	"Kellie",
	"Sonja",
	"Lila",
	"Lana",
	"Darla",
	"May",
	"Mindy",
	"Essie",
	"Mandy",
	"Lorene",
	"Elsa",
	"Josefina",
	"Jeannie",
	"Miranda",
	"Dixie",
	"Lucia",
	"Marta",
	"Faith",
	"Lela",
	"Johanna",
	"Shari",
	"Camille",
	"Tami",
	"Shawna",
	"Elisa",
	"Ebony",
	"Melba",
	"Ora",
	"Nettie",
	"Tabitha",
	"Ollie",
	"Jaime",
	"Winifred",
	"Kristie"
	];
},{}],"node_modules/faker/lib/locales/en/name/first_name.js":[function(require,module,exports) {
module["exports"] = [
  "Aaliyah",
  "Aaron",
  "Abagail",
  "Abbey",
  "Abbie",
  "Abbigail",
  "Abby",
  "Abdiel",
  "Abdul",
  "Abdullah",
  "Abe",
  "Abel",
  "Abelardo",
  "Abigail",
  "Abigale",
  "Abigayle",
  "Abner",
  "Abraham",
  "Ada",
  "Adah",
  "Adalberto",
  "Adaline",
  "Adam",
  "Adan",
  "Addie",
  "Addison",
  "Adela",
  "Adelbert",
  "Adele",
  "Adelia",
  "Adeline",
  "Adell",
  "Adella",
  "Adelle",
  "Aditya",
  "Adolf",
  "Adolfo",
  "Adolph",
  "Adolphus",
  "Adonis",
  "Adrain",
  "Adrian",
  "Adriana",
  "Adrianna",
  "Adriel",
  "Adrien",
  "Adrienne",
  "Afton",
  "Aglae",
  "Agnes",
  "Agustin",
  "Agustina",
  "Ahmad",
  "Ahmed",
  "Aida",
  "Aidan",
  "Aiden",
  "Aileen",
  "Aimee",
  "Aisha",
  "Aiyana",
  "Akeem",
  "Al",
  "Alaina",
  "Alan",
  "Alana",
  "Alanis",
  "Alanna",
  "Alayna",
  "Alba",
  "Albert",
  "Alberta",
  "Albertha",
  "Alberto",
  "Albin",
  "Albina",
  "Alda",
  "Alden",
  "Alec",
  "Aleen",
  "Alejandra",
  "Alejandrin",
  "Alek",
  "Alena",
  "Alene",
  "Alessandra",
  "Alessandro",
  "Alessia",
  "Aletha",
  "Alex",
  "Alexa",
  "Alexander",
  "Alexandra",
  "Alexandre",
  "Alexandrea",
  "Alexandria",
  "Alexandrine",
  "Alexandro",
  "Alexane",
  "Alexanne",
  "Alexie",
  "Alexis",
  "Alexys",
  "Alexzander",
  "Alf",
  "Alfonso",
  "Alfonzo",
  "Alford",
  "Alfred",
  "Alfreda",
  "Alfredo",
  "Ali",
  "Alia",
  "Alice",
  "Alicia",
  "Alisa",
  "Alisha",
  "Alison",
  "Alivia",
  "Aliya",
  "Aliyah",
  "Aliza",
  "Alize",
  "Allan",
  "Allen",
  "Allene",
  "Allie",
  "Allison",
  "Ally",
  "Alphonso",
  "Alta",
  "Althea",
  "Alva",
  "Alvah",
  "Alvena",
  "Alvera",
  "Alverta",
  "Alvina",
  "Alvis",
  "Alyce",
  "Alycia",
  "Alysa",
  "Alysha",
  "Alyson",
  "Alysson",
  "Amalia",
  "Amanda",
  "Amani",
  "Amara",
  "Amari",
  "Amaya",
  "Amber",
  "Ambrose",
  "Amelia",
  "Amelie",
  "Amely",
  "America",
  "Americo",
  "Amie",
  "Amina",
  "Amir",
  "Amira",
  "Amiya",
  "Amos",
  "Amparo",
  "Amy",
  "Amya",
  "Ana",
  "Anabel",
  "Anabelle",
  "Anahi",
  "Anais",
  "Anastacio",
  "Anastasia",
  "Anderson",
  "Andre",
  "Andreane",
  "Andreanne",
  "Andres",
  "Andrew",
  "Andy",
  "Angel",
  "Angela",
  "Angelica",
  "Angelina",
  "Angeline",
  "Angelita",
  "Angelo",
  "Angie",
  "Angus",
  "Anibal",
  "Anika",
  "Anissa",
  "Anita",
  "Aniya",
  "Aniyah",
  "Anjali",
  "Anna",
  "Annabel",
  "Annabell",
  "Annabelle",
  "Annalise",
  "Annamae",
  "Annamarie",
  "Anne",
  "Annetta",
  "Annette",
  "Annie",
  "Ansel",
  "Ansley",
  "Anthony",
  "Antoinette",
  "Antone",
  "Antonetta",
  "Antonette",
  "Antonia",
  "Antonietta",
  "Antonina",
  "Antonio",
  "Antwan",
  "Antwon",
  "Anya",
  "April",
  "Ara",
  "Araceli",
  "Aracely",
  "Arch",
  "Archibald",
  "Ardella",
  "Arden",
  "Ardith",
  "Arely",
  "Ari",
  "Ariane",
  "Arianna",
  "Aric",
  "Ariel",
  "Arielle",
  "Arjun",
  "Arlene",
  "Arlie",
  "Arlo",
  "Armand",
  "Armando",
  "Armani",
  "Arnaldo",
  "Arne",
  "Arno",
  "Arnold",
  "Arnoldo",
  "Arnulfo",
  "Aron",
  "Art",
  "Arthur",
  "Arturo",
  "Arvel",
  "Arvid",
  "Arvilla",
  "Aryanna",
  "Asa",
  "Asha",
  "Ashlee",
  "Ashleigh",
  "Ashley",
  "Ashly",
  "Ashlynn",
  "Ashton",
  "Ashtyn",
  "Asia",
  "Assunta",
  "Astrid",
  "Athena",
  "Aubree",
  "Aubrey",
  "Audie",
  "Audra",
  "Audreanne",
  "Audrey",
  "August",
  "Augusta",
  "Augustine",
  "Augustus",
  "Aurelia",
  "Aurelie",
  "Aurelio",
  "Aurore",
  "Austen",
  "Austin",
  "Austyn",
  "Autumn",
  "Ava",
  "Avery",
  "Avis",
  "Axel",
  "Ayana",
  "Ayden",
  "Ayla",
  "Aylin",
  "Baby",
  "Bailee",
  "Bailey",
  "Barbara",
  "Barney",
  "Baron",
  "Barrett",
  "Barry",
  "Bart",
  "Bartholome",
  "Barton",
  "Baylee",
  "Beatrice",
  "Beau",
  "Beaulah",
  "Bell",
  "Bella",
  "Belle",
  "Ben",
  "Benedict",
  "Benjamin",
  "Bennett",
  "Bennie",
  "Benny",
  "Benton",
  "Berenice",
  "Bernadette",
  "Bernadine",
  "Bernard",
  "Bernardo",
  "Berneice",
  "Bernhard",
  "Bernice",
  "Bernie",
  "Berniece",
  "Bernita",
  "Berry",
  "Bert",
  "Berta",
  "Bertha",
  "Bertram",
  "Bertrand",
  "Beryl",
  "Bessie",
  "Beth",
  "Bethany",
  "Bethel",
  "Betsy",
  "Bette",
  "Bettie",
  "Betty",
  "Bettye",
  "Beulah",
  "Beverly",
  "Bianka",
  "Bill",
  "Billie",
  "Billy",
  "Birdie",
  "Blair",
  "Blaise",
  "Blake",
  "Blanca",
  "Blanche",
  "Blaze",
  "Bo",
  "Bobbie",
  "Bobby",
  "Bonita",
  "Bonnie",
  "Boris",
  "Boyd",
  "Brad",
  "Braden",
  "Bradford",
  "Bradley",
  "Bradly",
  "Brady",
  "Braeden",
  "Brain",
  "Brandi",
  "Brando",
  "Brandon",
  "Brandt",
  "Brandy",
  "Brandyn",
  "Brannon",
  "Branson",
  "Brant",
  "Braulio",
  "Braxton",
  "Brayan",
  "Breana",
  "Breanna",
  "Breanne",
  "Brenda",
  "Brendan",
  "Brenden",
  "Brendon",
  "Brenna",
  "Brennan",
  "Brennon",
  "Brent",
  "Bret",
  "Brett",
  "Bria",
  "Brian",
  "Briana",
  "Brianne",
  "Brice",
  "Bridget",
  "Bridgette",
  "Bridie",
  "Brielle",
  "Brigitte",
  "Brionna",
  "Brisa",
  "Britney",
  "Brittany",
  "Brock",
  "Broderick",
  "Brody",
  "Brook",
  "Brooke",
  "Brooklyn",
  "Brooks",
  "Brown",
  "Bruce",
  "Bryana",
  "Bryce",
  "Brycen",
  "Bryon",
  "Buck",
  "Bud",
  "Buddy",
  "Buford",
  "Bulah",
  "Burdette",
  "Burley",
  "Burnice",
  "Buster",
  "Cade",
  "Caden",
  "Caesar",
  "Caitlyn",
  "Cale",
  "Caleb",
  "Caleigh",
  "Cali",
  "Calista",
  "Callie",
  "Camden",
  "Cameron",
  "Camila",
  "Camilla",
  "Camille",
  "Camren",
  "Camron",
  "Camryn",
  "Camylle",
  "Candace",
  "Candelario",
  "Candice",
  "Candida",
  "Candido",
  "Cara",
  "Carey",
  "Carissa",
  "Carlee",
  "Carleton",
  "Carley",
  "Carli",
  "Carlie",
  "Carlo",
  "Carlos",
  "Carlotta",
  "Carmel",
  "Carmela",
  "Carmella",
  "Carmelo",
  "Carmen",
  "Carmine",
  "Carol",
  "Carolanne",
  "Carole",
  "Carolina",
  "Caroline",
  "Carolyn",
  "Carolyne",
  "Carrie",
  "Carroll",
  "Carson",
  "Carter",
  "Cary",
  "Casandra",
  "Casey",
  "Casimer",
  "Casimir",
  "Casper",
  "Cassandra",
  "Cassandre",
  "Cassidy",
  "Cassie",
  "Catalina",
  "Caterina",
  "Catharine",
  "Catherine",
  "Cathrine",
  "Cathryn",
  "Cathy",
  "Cayla",
  "Ceasar",
  "Cecelia",
  "Cecil",
  "Cecile",
  "Cecilia",
  "Cedrick",
  "Celestine",
  "Celestino",
  "Celia",
  "Celine",
  "Cesar",
  "Chad",
  "Chadd",
  "Chadrick",
  "Chaim",
  "Chance",
  "Chandler",
  "Chanel",
  "Chanelle",
  "Charity",
  "Charlene",
  "Charles",
  "Charley",
  "Charlie",
  "Charlotte",
  "Chase",
  "Chasity",
  "Chauncey",
  "Chaya",
  "Chaz",
  "Chelsea",
  "Chelsey",
  "Chelsie",
  "Chesley",
  "Chester",
  "Chet",
  "Cheyanne",
  "Cheyenne",
  "Chloe",
  "Chris",
  "Christ",
  "Christa",
  "Christelle",
  "Christian",
  "Christiana",
  "Christina",
  "Christine",
  "Christop",
  "Christophe",
  "Christopher",
  "Christy",
  "Chyna",
  "Ciara",
  "Cicero",
  "Cielo",
  "Cierra",
  "Cindy",
  "Citlalli",
  "Clair",
  "Claire",
  "Clara",
  "Clarabelle",
  "Clare",
  "Clarissa",
  "Clark",
  "Claud",
  "Claude",
  "Claudia",
  "Claudie",
  "Claudine",
  "Clay",
  "Clemens",
  "Clement",
  "Clementina",
  "Clementine",
  "Clemmie",
  "Cleo",
  "Cleora",
  "Cleta",
  "Cletus",
  "Cleve",
  "Cleveland",
  "Clifford",
  "Clifton",
  "Clint",
  "Clinton",
  "Clotilde",
  "Clovis",
  "Cloyd",
  "Clyde",
  "Coby",
  "Cody",
  "Colby",
  "Cole",
  "Coleman",
  "Colin",
  "Colleen",
  "Collin",
  "Colt",
  "Colten",
  "Colton",
  "Columbus",
  "Concepcion",
  "Conner",
  "Connie",
  "Connor",
  "Conor",
  "Conrad",
  "Constance",
  "Constantin",
  "Consuelo",
  "Cooper",
  "Cora",
  "Coralie",
  "Corbin",
  "Cordelia",
  "Cordell",
  "Cordia",
  "Cordie",
  "Corene",
  "Corine",
  "Cornelius",
  "Cornell",
  "Corrine",
  "Cortez",
  "Cortney",
  "Cory",
  "Coty",
  "Courtney",
  "Coy",
  "Craig",
  "Crawford",
  "Creola",
  "Cristal",
  "Cristian",
  "Cristina",
  "Cristobal",
  "Cristopher",
  "Cruz",
  "Crystal",
  "Crystel",
  "Cullen",
  "Curt",
  "Curtis",
  "Cydney",
  "Cynthia",
  "Cyril",
  "Cyrus",
  "Dagmar",
  "Dahlia",
  "Daija",
  "Daisha",
  "Daisy",
  "Dakota",
  "Dale",
  "Dallas",
  "Dallin",
  "Dalton",
  "Damaris",
  "Dameon",
  "Damian",
  "Damien",
  "Damion",
  "Damon",
  "Dan",
  "Dana",
  "Dandre",
  "Dane",
  "D'angelo",
  "Dangelo",
  "Danial",
  "Daniela",
  "Daniella",
  "Danielle",
  "Danika",
  "Dannie",
  "Danny",
  "Dante",
  "Danyka",
  "Daphne",
  "Daphnee",
  "Daphney",
  "Darby",
  "Daren",
  "Darian",
  "Dariana",
  "Darien",
  "Dario",
  "Darion",
  "Darius",
  "Darlene",
  "Daron",
  "Darrel",
  "Darrell",
  "Darren",
  "Darrick",
  "Darrin",
  "Darrion",
  "Darron",
  "Darryl",
  "Darwin",
  "Daryl",
  "Dashawn",
  "Dasia",
  "Dave",
  "David",
  "Davin",
  "Davion",
  "Davon",
  "Davonte",
  "Dawn",
  "Dawson",
  "Dax",
  "Dayana",
  "Dayna",
  "Dayne",
  "Dayton",
  "Dean",
  "Deangelo",
  "Deanna",
  "Deborah",
  "Declan",
  "Dedric",
  "Dedrick",
  "Dee",
  "Deion",
  "Deja",
  "Dejah",
  "Dejon",
  "Dejuan",
  "Delaney",
  "Delbert",
  "Delfina",
  "Delia",
  "Delilah",
  "Dell",
  "Della",
  "Delmer",
  "Delores",
  "Delpha",
  "Delphia",
  "Delphine",
  "Delta",
  "Demarco",
  "Demarcus",
  "Demario",
  "Demetris",
  "Demetrius",
  "Demond",
  "Dena",
  "Denis",
  "Dennis",
  "Deon",
  "Deondre",
  "Deontae",
  "Deonte",
  "Dereck",
  "Derek",
  "Derick",
  "Deron",
  "Derrick",
  "Deshaun",
  "Deshawn",
  "Desiree",
  "Desmond",
  "Dessie",
  "Destany",
  "Destin",
  "Destinee",
  "Destiney",
  "Destini",
  "Destiny",
  "Devan",
  "Devante",
  "Deven",
  "Devin",
  "Devon",
  "Devonte",
  "Devyn",
  "Dewayne",
  "Dewitt",
  "Dexter",
  "Diamond",
  "Diana",
  "Dianna",
  "Diego",
  "Dillan",
  "Dillon",
  "Dimitri",
  "Dina",
  "Dino",
  "Dion",
  "Dixie",
  "Dock",
  "Dolly",
  "Dolores",
  "Domenic",
  "Domenica",
  "Domenick",
  "Domenico",
  "Domingo",
  "Dominic",
  "Dominique",
  "Don",
  "Donald",
  "Donato",
  "Donavon",
  "Donna",
  "Donnell",
  "Donnie",
  "Donny",
  "Dora",
  "Dorcas",
  "Dorian",
  "Doris",
  "Dorothea",
  "Dorothy",
  "Dorris",
  "Dortha",
  "Dorthy",
  "Doug",
  "Douglas",
  "Dovie",
  "Doyle",
  "Drake",
  "Drew",
  "Duane",
  "Dudley",
  "Dulce",
  "Duncan",
  "Durward",
  "Dustin",
  "Dusty",
  "Dwight",
  "Dylan",
  "Earl",
  "Earlene",
  "Earline",
  "Earnest",
  "Earnestine",
  "Easter",
  "Easton",
  "Ebba",
  "Ebony",
  "Ed",
  "Eda",
  "Edd",
  "Eddie",
  "Eden",
  "Edgar",
  "Edgardo",
  "Edison",
  "Edmond",
  "Edmund",
  "Edna",
  "Eduardo",
  "Edward",
  "Edwardo",
  "Edwin",
  "Edwina",
  "Edyth",
  "Edythe",
  "Effie",
  "Efrain",
  "Efren",
  "Eileen",
  "Einar",
  "Eino",
  "Eladio",
  "Elaina",
  "Elbert",
  "Elda",
  "Eldon",
  "Eldora",
  "Eldred",
  "Eldridge",
  "Eleanora",
  "Eleanore",
  "Eleazar",
  "Electa",
  "Elena",
  "Elenor",
  "Elenora",
  "Eleonore",
  "Elfrieda",
  "Eli",
  "Elian",
  "Eliane",
  "Elias",
  "Eliezer",
  "Elijah",
  "Elinor",
  "Elinore",
  "Elisa",
  "Elisabeth",
  "Elise",
  "Eliseo",
  "Elisha",
  "Elissa",
  "Eliza",
  "Elizabeth",
  "Ella",
  "Ellen",
  "Ellie",
  "Elliot",
  "Elliott",
  "Ellis",
  "Ellsworth",
  "Elmer",
  "Elmira",
  "Elmo",
  "Elmore",
  "Elna",
  "Elnora",
  "Elody",
  "Eloisa",
  "Eloise",
  "Elouise",
  "Eloy",
  "Elroy",
  "Elsa",
  "Else",
  "Elsie",
  "Elta",
  "Elton",
  "Elva",
  "Elvera",
  "Elvie",
  "Elvis",
  "Elwin",
  "Elwyn",
  "Elyse",
  "Elyssa",
  "Elza",
  "Emanuel",
  "Emelia",
  "Emelie",
  "Emely",
  "Emerald",
  "Emerson",
  "Emery",
  "Emie",
  "Emil",
  "Emile",
  "Emilia",
  "Emiliano",
  "Emilie",
  "Emilio",
  "Emily",
  "Emma",
  "Emmalee",
  "Emmanuel",
  "Emmanuelle",
  "Emmet",
  "Emmett",
  "Emmie",
  "Emmitt",
  "Emmy",
  "Emory",
  "Ena",
  "Enid",
  "Enoch",
  "Enola",
  "Enos",
  "Enrico",
  "Enrique",
  "Ephraim",
  "Era",
  "Eriberto",
  "Eric",
  "Erica",
  "Erich",
  "Erick",
  "Ericka",
  "Erik",
  "Erika",
  "Erin",
  "Erling",
  "Erna",
  "Ernest",
  "Ernestina",
  "Ernestine",
  "Ernesto",
  "Ernie",
  "Ervin",
  "Erwin",
  "Eryn",
  "Esmeralda",
  "Esperanza",
  "Esta",
  "Esteban",
  "Estefania",
  "Estel",
  "Estell",
  "Estella",
  "Estelle",
  "Estevan",
  "Esther",
  "Estrella",
  "Etha",
  "Ethan",
  "Ethel",
  "Ethelyn",
  "Ethyl",
  "Ettie",
  "Eudora",
  "Eugene",
  "Eugenia",
  "Eula",
  "Eulah",
  "Eulalia",
  "Euna",
  "Eunice",
  "Eusebio",
  "Eva",
  "Evalyn",
  "Evan",
  "Evangeline",
  "Evans",
  "Eve",
  "Eveline",
  "Evelyn",
  "Everardo",
  "Everett",
  "Everette",
  "Evert",
  "Evie",
  "Ewald",
  "Ewell",
  "Ezekiel",
  "Ezequiel",
  "Ezra",
  "Fabian",
  "Fabiola",
  "Fae",
  "Fannie",
  "Fanny",
  "Fatima",
  "Faustino",
  "Fausto",
  "Favian",
  "Fay",
  "Faye",
  "Federico",
  "Felicia",
  "Felicita",
  "Felicity",
  "Felipa",
  "Felipe",
  "Felix",
  "Felton",
  "Fermin",
  "Fern",
  "Fernando",
  "Ferne",
  "Fidel",
  "Filiberto",
  "Filomena",
  "Finn",
  "Fiona",
  "Flavie",
  "Flavio",
  "Fleta",
  "Fletcher",
  "Flo",
  "Florence",
  "Florencio",
  "Florian",
  "Florida",
  "Florine",
  "Flossie",
  "Floy",
  "Floyd",
  "Ford",
  "Forest",
  "Forrest",
  "Foster",
  "Frances",
  "Francesca",
  "Francesco",
  "Francis",
  "Francisca",
  "Francisco",
  "Franco",
  "Frank",
  "Frankie",
  "Franz",
  "Fred",
  "Freda",
  "Freddie",
  "Freddy",
  "Frederic",
  "Frederick",
  "Frederik",
  "Frederique",
  "Fredrick",
  "Fredy",
  "Freeda",
  "Freeman",
  "Freida",
  "Frida",
  "Frieda",
  "Friedrich",
  "Fritz",
  "Furman",
  "Gabe",
  "Gabriel",
  "Gabriella",
  "Gabrielle",
  "Gaetano",
  "Gage",
  "Gail",
  "Gardner",
  "Garett",
  "Garfield",
  "Garland",
  "Garnet",
  "Garnett",
  "Garret",
  "Garrett",
  "Garrick",
  "Garrison",
  "Garry",
  "Garth",
  "Gaston",
  "Gavin",
  "Gay",
  "Gayle",
  "Gaylord",
  "Gene",
  "General",
  "Genesis",
  "Genevieve",
  "Gennaro",
  "Genoveva",
  "Geo",
  "Geoffrey",
  "George",
  "Georgette",
  "Georgiana",
  "Georgianna",
  "Geovanni",
  "Geovanny",
  "Geovany",
  "Gerald",
  "Geraldine",
  "Gerard",
  "Gerardo",
  "Gerda",
  "Gerhard",
  "Germaine",
  "German",
  "Gerry",
  "Gerson",
  "Gertrude",
  "Gia",
  "Gianni",
  "Gideon",
  "Gilbert",
  "Gilberto",
  "Gilda",
  "Giles",
  "Gillian",
  "Gina",
  "Gino",
  "Giovani",
  "Giovanna",
  "Giovanni",
  "Giovanny",
  "Gisselle",
  "Giuseppe",
  "Gladyce",
  "Gladys",
  "Glen",
  "Glenda",
  "Glenna",
  "Glennie",
  "Gloria",
  "Godfrey",
  "Golda",
  "Golden",
  "Gonzalo",
  "Gordon",
  "Grace",
  "Gracie",
  "Graciela",
  "Grady",
  "Graham",
  "Grant",
  "Granville",
  "Grayce",
  "Grayson",
  "Green",
  "Greg",
  "Gregg",
  "Gregoria",
  "Gregorio",
  "Gregory",
  "Greta",
  "Gretchen",
  "Greyson",
  "Griffin",
  "Grover",
  "Guadalupe",
  "Gudrun",
  "Guido",
  "Guillermo",
  "Guiseppe",
  "Gunnar",
  "Gunner",
  "Gus",
  "Gussie",
  "Gust",
  "Gustave",
  "Guy",
  "Gwen",
  "Gwendolyn",
  "Hadley",
  "Hailee",
  "Hailey",
  "Hailie",
  "Hal",
  "Haleigh",
  "Haley",
  "Halie",
  "Halle",
  "Hallie",
  "Hank",
  "Hanna",
  "Hannah",
  "Hans",
  "Hardy",
  "Harley",
  "Harmon",
  "Harmony",
  "Harold",
  "Harrison",
  "Harry",
  "Harvey",
  "Haskell",
  "Hassan",
  "Hassie",
  "Hattie",
  "Haven",
  "Hayden",
  "Haylee",
  "Hayley",
  "Haylie",
  "Hazel",
  "Hazle",
  "Heath",
  "Heather",
  "Heaven",
  "Heber",
  "Hector",
  "Heidi",
  "Helen",
  "Helena",
  "Helene",
  "Helga",
  "Hellen",
  "Helmer",
  "Heloise",
  "Henderson",
  "Henri",
  "Henriette",
  "Henry",
  "Herbert",
  "Herman",
  "Hermann",
  "Hermina",
  "Herminia",
  "Herminio",
  "Hershel",
  "Herta",
  "Hertha",
  "Hester",
  "Hettie",
  "Hilario",
  "Hilbert",
  "Hilda",
  "Hildegard",
  "Hillard",
  "Hillary",
  "Hilma",
  "Hilton",
  "Hipolito",
  "Hiram",
  "Hobart",
  "Holden",
  "Hollie",
  "Hollis",
  "Holly",
  "Hope",
  "Horace",
  "Horacio",
  "Hortense",
  "Hosea",
  "Houston",
  "Howard",
  "Howell",
  "Hoyt",
  "Hubert",
  "Hudson",
  "Hugh",
  "Hulda",
  "Humberto",
  "Hunter",
  "Hyman",
  "Ian",
  "Ibrahim",
  "Icie",
  "Ida",
  "Idell",
  "Idella",
  "Ignacio",
  "Ignatius",
  "Ike",
  "Ila",
  "Ilene",
  "Iliana",
  "Ima",
  "Imani",
  "Imelda",
  "Immanuel",
  "Imogene",
  "Ines",
  "Irma",
  "Irving",
  "Irwin",
  "Isaac",
  "Isabel",
  "Isabell",
  "Isabella",
  "Isabelle",
  "Isac",
  "Isadore",
  "Isai",
  "Isaiah",
  "Isaias",
  "Isidro",
  "Ismael",
  "Isobel",
  "Isom",
  "Israel",
  "Issac",
  "Itzel",
  "Iva",
  "Ivah",
  "Ivory",
  "Ivy",
  "Izabella",
  "Izaiah",
  "Jabari",
  "Jace",
  "Jacey",
  "Jacinthe",
  "Jacinto",
  "Jack",
  "Jackeline",
  "Jackie",
  "Jacklyn",
  "Jackson",
  "Jacky",
  "Jaclyn",
  "Jacquelyn",
  "Jacques",
  "Jacynthe",
  "Jada",
  "Jade",
  "Jaden",
  "Jadon",
  "Jadyn",
  "Jaeden",
  "Jaida",
  "Jaiden",
  "Jailyn",
  "Jaime",
  "Jairo",
  "Jakayla",
  "Jake",
  "Jakob",
  "Jaleel",
  "Jalen",
  "Jalon",
  "Jalyn",
  "Jamaal",
  "Jamal",
  "Jamar",
  "Jamarcus",
  "Jamel",
  "Jameson",
  "Jamey",
  "Jamie",
  "Jamil",
  "Jamir",
  "Jamison",
  "Jammie",
  "Jan",
  "Jana",
  "Janae",
  "Jane",
  "Janelle",
  "Janessa",
  "Janet",
  "Janice",
  "Janick",
  "Janie",
  "Janis",
  "Janiya",
  "Jannie",
  "Jany",
  "Jaquan",
  "Jaquelin",
  "Jaqueline",
  "Jared",
  "Jaren",
  "Jarod",
  "Jaron",
  "Jarred",
  "Jarrell",
  "Jarret",
  "Jarrett",
  "Jarrod",
  "Jarvis",
  "Jasen",
  "Jasmin",
  "Jason",
  "Jasper",
  "Jaunita",
  "Javier",
  "Javon",
  "Javonte",
  "Jay",
  "Jayce",
  "Jaycee",
  "Jayda",
  "Jayde",
  "Jayden",
  "Jaydon",
  "Jaylan",
  "Jaylen",
  "Jaylin",
  "Jaylon",
  "Jayme",
  "Jayne",
  "Jayson",
  "Jazlyn",
  "Jazmin",
  "Jazmyn",
  "Jazmyne",
  "Jean",
  "Jeanette",
  "Jeanie",
  "Jeanne",
  "Jed",
  "Jedediah",
  "Jedidiah",
  "Jeff",
  "Jefferey",
  "Jeffery",
  "Jeffrey",
  "Jeffry",
  "Jena",
  "Jenifer",
  "Jennie",
  "Jennifer",
  "Jennings",
  "Jennyfer",
  "Jensen",
  "Jerad",
  "Jerald",
  "Jeramie",
  "Jeramy",
  "Jerel",
  "Jeremie",
  "Jeremy",
  "Jermain",
  "Jermaine",
  "Jermey",
  "Jerod",
  "Jerome",
  "Jeromy",
  "Jerrell",
  "Jerrod",
  "Jerrold",
  "Jerry",
  "Jess",
  "Jesse",
  "Jessica",
  "Jessie",
  "Jessika",
  "Jessy",
  "Jessyca",
  "Jesus",
  "Jett",
  "Jettie",
  "Jevon",
  "Jewel",
  "Jewell",
  "Jillian",
  "Jimmie",
  "Jimmy",
  "Jo",
  "Joan",
  "Joana",
  "Joanie",
  "Joanne",
  "Joannie",
  "Joanny",
  "Joany",
  "Joaquin",
  "Jocelyn",
  "Jodie",
  "Jody",
  "Joe",
  "Joel",
  "Joelle",
  "Joesph",
  "Joey",
  "Johan",
  "Johann",
  "Johanna",
  "Johathan",
  "John",
  "Johnathan",
  "Johnathon",
  "Johnnie",
  "Johnny",
  "Johnpaul",
  "Johnson",
  "Jolie",
  "Jon",
  "Jonas",
  "Jonatan",
  "Jonathan",
  "Jonathon",
  "Jordan",
  "Jordane",
  "Jordi",
  "Jordon",
  "Jordy",
  "Jordyn",
  "Jorge",
  "Jose",
  "Josefa",
  "Josefina",
  "Joseph",
  "Josephine",
  "Josh",
  "Joshua",
  "Joshuah",
  "Josiah",
  "Josiane",
  "Josianne",
  "Josie",
  "Josue",
  "Jovan",
  "Jovani",
  "Jovanny",
  "Jovany",
  "Joy",
  "Joyce",
  "Juana",
  "Juanita",
  "Judah",
  "Judd",
  "Jude",
  "Judge",
  "Judson",
  "Judy",
  "Jules",
  "Julia",
  "Julian",
  "Juliana",
  "Julianne",
  "Julie",
  "Julien",
  "Juliet",
  "Julio",
  "Julius",
  "June",
  "Junior",
  "Junius",
  "Justen",
  "Justice",
  "Justina",
  "Justine",
  "Juston",
  "Justus",
  "Justyn",
  "Juvenal",
  "Juwan",
  "Kacey",
  "Kaci",
  "Kacie",
  "Kade",
  "Kaden",
  "Kadin",
  "Kaela",
  "Kaelyn",
  "Kaia",
  "Kailee",
  "Kailey",
  "Kailyn",
  "Kaitlin",
  "Kaitlyn",
  "Kale",
  "Kaleb",
  "Kaleigh",
  "Kaley",
  "Kali",
  "Kallie",
  "Kameron",
  "Kamille",
  "Kamren",
  "Kamron",
  "Kamryn",
  "Kane",
  "Kara",
  "Kareem",
  "Karelle",
  "Karen",
  "Kari",
  "Kariane",
  "Karianne",
  "Karina",
  "Karine",
  "Karl",
  "Karlee",
  "Karley",
  "Karli",
  "Karlie",
  "Karolann",
  "Karson",
  "Kasandra",
  "Kasey",
  "Kassandra",
  "Katarina",
  "Katelin",
  "Katelyn",
  "Katelynn",
  "Katharina",
  "Katherine",
  "Katheryn",
  "Kathleen",
  "Kathlyn",
  "Kathryn",
  "Kathryne",
  "Katlyn",
  "Katlynn",
  "Katrina",
  "Katrine",
  "Kattie",
  "Kavon",
  "Kay",
  "Kaya",
  "Kaycee",
  "Kayden",
  "Kayla",
  "Kaylah",
  "Kaylee",
  "Kayleigh",
  "Kayley",
  "Kayli",
  "Kaylie",
  "Kaylin",
  "Keagan",
  "Keanu",
  "Keara",
  "Keaton",
  "Keegan",
  "Keeley",
  "Keely",
  "Keenan",
  "Keira",
  "Keith",
  "Kellen",
  "Kelley",
  "Kelli",
  "Kellie",
  "Kelly",
  "Kelsi",
  "Kelsie",
  "Kelton",
  "Kelvin",
  "Ken",
  "Kendall",
  "Kendra",
  "Kendrick",
  "Kenna",
  "Kennedi",
  "Kennedy",
  "Kenneth",
  "Kennith",
  "Kenny",
  "Kenton",
  "Kenya",
  "Kenyatta",
  "Kenyon",
  "Keon",
  "Keshaun",
  "Keshawn",
  "Keven",
  "Kevin",
  "Kevon",
  "Keyon",
  "Keyshawn",
  "Khalid",
  "Khalil",
  "Kian",
  "Kiana",
  "Kianna",
  "Kiara",
  "Kiarra",
  "Kiel",
  "Kiera",
  "Kieran",
  "Kiley",
  "Kim",
  "Kimberly",
  "King",
  "Kip",
  "Kira",
  "Kirk",
  "Kirsten",
  "Kirstin",
  "Kitty",
  "Kobe",
  "Koby",
  "Kody",
  "Kolby",
  "Kole",
  "Korbin",
  "Korey",
  "Kory",
  "Kraig",
  "Kris",
  "Krista",
  "Kristian",
  "Kristin",
  "Kristina",
  "Kristofer",
  "Kristoffer",
  "Kristopher",
  "Kristy",
  "Krystal",
  "Krystel",
  "Krystina",
  "Kurt",
  "Kurtis",
  "Kyla",
  "Kyle",
  "Kylee",
  "Kyleigh",
  "Kyler",
  "Kylie",
  "Kyra",
  "Lacey",
  "Lacy",
  "Ladarius",
  "Lafayette",
  "Laila",
  "Laisha",
  "Lamar",
  "Lambert",
  "Lamont",
  "Lance",
  "Landen",
  "Lane",
  "Laney",
  "Larissa",
  "Laron",
  "Larry",
  "Larue",
  "Laura",
  "Laurel",
  "Lauren",
  "Laurence",
  "Lauretta",
  "Lauriane",
  "Laurianne",
  "Laurie",
  "Laurine",
  "Laury",
  "Lauryn",
  "Lavada",
  "Lavern",
  "Laverna",
  "Laverne",
  "Lavina",
  "Lavinia",
  "Lavon",
  "Lavonne",
  "Lawrence",
  "Lawson",
  "Layla",
  "Layne",
  "Lazaro",
  "Lea",
  "Leann",
  "Leanna",
  "Leanne",
  "Leatha",
  "Leda",
  "Lee",
  "Leif",
  "Leila",
  "Leilani",
  "Lela",
  "Lelah",
  "Leland",
  "Lelia",
  "Lempi",
  "Lemuel",
  "Lenna",
  "Lennie",
  "Lenny",
  "Lenora",
  "Lenore",
  "Leo",
  "Leola",
  "Leon",
  "Leonard",
  "Leonardo",
  "Leone",
  "Leonel",
  "Leonie",
  "Leonor",
  "Leonora",
  "Leopold",
  "Leopoldo",
  "Leora",
  "Lera",
  "Lesley",
  "Leslie",
  "Lesly",
  "Lessie",
  "Lester",
  "Leta",
  "Letha",
  "Letitia",
  "Levi",
  "Lew",
  "Lewis",
  "Lexi",
  "Lexie",
  "Lexus",
  "Lia",
  "Liam",
  "Liana",
  "Libbie",
  "Libby",
  "Lila",
  "Lilian",
  "Liliana",
  "Liliane",
  "Lilla",
  "Lillian",
  "Lilliana",
  "Lillie",
  "Lilly",
  "Lily",
  "Lilyan",
  "Lina",
  "Lincoln",
  "Linda",
  "Lindsay",
  "Lindsey",
  "Linnea",
  "Linnie",
  "Linwood",
  "Lionel",
  "Lisa",
  "Lisandro",
  "Lisette",
  "Litzy",
  "Liza",
  "Lizeth",
  "Lizzie",
  "Llewellyn",
  "Lloyd",
  "Logan",
  "Lois",
  "Lola",
  "Lolita",
  "Loma",
  "Lon",
  "London",
  "Lonie",
  "Lonnie",
  "Lonny",
  "Lonzo",
  "Lora",
  "Loraine",
  "Loren",
  "Lorena",
  "Lorenz",
  "Lorenza",
  "Lorenzo",
  "Lori",
  "Lorine",
  "Lorna",
  "Lottie",
  "Lou",
  "Louie",
  "Louisa",
  "Lourdes",
  "Louvenia",
  "Lowell",
  "Loy",
  "Loyal",
  "Loyce",
  "Lucas",
  "Luciano",
  "Lucie",
  "Lucienne",
  "Lucile",
  "Lucinda",
  "Lucio",
  "Lucious",
  "Lucius",
  "Lucy",
  "Ludie",
  "Ludwig",
  "Lue",
  "Luella",
  "Luigi",
  "Luis",
  "Luisa",
  "Lukas",
  "Lula",
  "Lulu",
  "Luna",
  "Lupe",
  "Lura",
  "Lurline",
  "Luther",
  "Luz",
  "Lyda",
  "Lydia",
  "Lyla",
  "Lynn",
  "Lyric",
  "Lysanne",
  "Mabel",
  "Mabelle",
  "Mable",
  "Mac",
  "Macey",
  "Maci",
  "Macie",
  "Mack",
  "Mackenzie",
  "Macy",
  "Madaline",
  "Madalyn",
  "Maddison",
  "Madeline",
  "Madelyn",
  "Madelynn",
  "Madge",
  "Madie",
  "Madilyn",
  "Madisen",
  "Madison",
  "Madisyn",
  "Madonna",
  "Madyson",
  "Mae",
  "Maegan",
  "Maeve",
  "Mafalda",
  "Magali",
  "Magdalen",
  "Magdalena",
  "Maggie",
  "Magnolia",
  "Magnus",
  "Maia",
  "Maida",
  "Maiya",
  "Major",
  "Makayla",
  "Makenna",
  "Makenzie",
  "Malachi",
  "Malcolm",
  "Malika",
  "Malinda",
  "Mallie",
  "Mallory",
  "Malvina",
  "Mandy",
  "Manley",
  "Manuel",
  "Manuela",
  "Mara",
  "Marc",
  "Marcel",
  "Marcelina",
  "Marcelino",
  "Marcella",
  "Marcelle",
  "Marcellus",
  "Marcelo",
  "Marcia",
  "Marco",
  "Marcos",
  "Marcus",
  "Margaret",
  "Margarete",
  "Margarett",
  "Margaretta",
  "Margarette",
  "Margarita",
  "Marge",
  "Margie",
  "Margot",
  "Margret",
  "Marguerite",
  "Maria",
  "Mariah",
  "Mariam",
  "Marian",
  "Mariana",
  "Mariane",
  "Marianna",
  "Marianne",
  "Mariano",
  "Maribel",
  "Marie",
  "Mariela",
  "Marielle",
  "Marietta",
  "Marilie",
  "Marilou",
  "Marilyne",
  "Marina",
  "Mario",
  "Marion",
  "Marisa",
  "Marisol",
  "Maritza",
  "Marjolaine",
  "Marjorie",
  "Marjory",
  "Mark",
  "Markus",
  "Marlee",
  "Marlen",
  "Marlene",
  "Marley",
  "Marlin",
  "Marlon",
  "Marques",
  "Marquis",
  "Marquise",
  "Marshall",
  "Marta",
  "Martin",
  "Martina",
  "Martine",
  "Marty",
  "Marvin",
  "Mary",
  "Maryam",
  "Maryjane",
  "Maryse",
  "Mason",
  "Mateo",
  "Mathew",
  "Mathias",
  "Mathilde",
  "Matilda",
  "Matilde",
  "Matt",
  "Matteo",
  "Mattie",
  "Maud",
  "Maude",
  "Maudie",
  "Maureen",
  "Maurice",
  "Mauricio",
  "Maurine",
  "Maverick",
  "Mavis",
  "Max",
  "Maxie",
  "Maxime",
  "Maximilian",
  "Maximillia",
  "Maximillian",
  "Maximo",
  "Maximus",
  "Maxine",
  "Maxwell",
  "May",
  "Maya",
  "Maybell",
  "Maybelle",
  "Maye",
  "Maymie",
  "Maynard",
  "Mayra",
  "Mazie",
  "Mckayla",
  "Mckenna",
  "Mckenzie",
  "Meagan",
  "Meaghan",
  "Meda",
  "Megane",
  "Meggie",
  "Meghan",
  "Mekhi",
  "Melany",
  "Melba",
  "Melisa",
  "Melissa",
  "Mellie",
  "Melody",
  "Melvin",
  "Melvina",
  "Melyna",
  "Melyssa",
  "Mercedes",
  "Meredith",
  "Merl",
  "Merle",
  "Merlin",
  "Merritt",
  "Mertie",
  "Mervin",
  "Meta",
  "Mia",
  "Micaela",
  "Micah",
  "Michael",
  "Michaela",
  "Michale",
  "Micheal",
  "Michel",
  "Michele",
  "Michelle",
  "Miguel",
  "Mikayla",
  "Mike",
  "Mikel",
  "Milan",
  "Miles",
  "Milford",
  "Miller",
  "Millie",
  "Milo",
  "Milton",
  "Mina",
  "Minerva",
  "Minnie",
  "Miracle",
  "Mireille",
  "Mireya",
  "Misael",
  "Missouri",
  "Misty",
  "Mitchel",
  "Mitchell",
  "Mittie",
  "Modesta",
  "Modesto",
  "Mohamed",
  "Mohammad",
  "Mohammed",
  "Moises",
  "Mollie",
  "Molly",
  "Mona",
  "Monica",
  "Monique",
  "Monroe",
  "Monserrat",
  "Monserrate",
  "Montana",
  "Monte",
  "Monty",
  "Morgan",
  "Moriah",
  "Morris",
  "Mortimer",
  "Morton",
  "Mose",
  "Moses",
  "Moshe",
  "Mossie",
  "Mozell",
  "Mozelle",
  "Muhammad",
  "Muriel",
  "Murl",
  "Murphy",
  "Murray",
  "Mustafa",
  "Mya",
  "Myah",
  "Mylene",
  "Myles",
  "Myra",
  "Myriam",
  "Myrl",
  "Myrna",
  "Myron",
  "Myrtice",
  "Myrtie",
  "Myrtis",
  "Myrtle",
  "Nadia",
  "Nakia",
  "Name",
  "Nannie",
  "Naomi",
  "Naomie",
  "Napoleon",
  "Narciso",
  "Nash",
  "Nasir",
  "Nat",
  "Natalia",
  "Natalie",
  "Natasha",
  "Nathan",
  "Nathanael",
  "Nathanial",
  "Nathaniel",
  "Nathen",
  "Nayeli",
  "Neal",
  "Ned",
  "Nedra",
  "Neha",
  "Neil",
  "Nelda",
  "Nella",
  "Nelle",
  "Nellie",
  "Nels",
  "Nelson",
  "Neoma",
  "Nestor",
  "Nettie",
  "Neva",
  "Newell",
  "Newton",
  "Nia",
  "Nicholas",
  "Nicholaus",
  "Nichole",
  "Nick",
  "Nicklaus",
  "Nickolas",
  "Nico",
  "Nicola",
  "Nicolas",
  "Nicole",
  "Nicolette",
  "Nigel",
  "Nikita",
  "Nikki",
  "Nikko",
  "Niko",
  "Nikolas",
  "Nils",
  "Nina",
  "Noah",
  "Noble",
  "Noe",
  "Noel",
  "Noelia",
  "Noemi",
  "Noemie",
  "Noemy",
  "Nola",
  "Nolan",
  "Nona",
  "Nora",
  "Norbert",
  "Norberto",
  "Norene",
  "Norma",
  "Norris",
  "Norval",
  "Norwood",
  "Nova",
  "Novella",
  "Nya",
  "Nyah",
  "Nyasia",
  "Obie",
  "Oceane",
  "Ocie",
  "Octavia",
  "Oda",
  "Odell",
  "Odessa",
  "Odie",
  "Ofelia",
  "Okey",
  "Ola",
  "Olaf",
  "Ole",
  "Olen",
  "Oleta",
  "Olga",
  "Olin",
  "Oliver",
  "Ollie",
  "Oma",
  "Omari",
  "Omer",
  "Ona",
  "Onie",
  "Opal",
  "Ophelia",
  "Ora",
  "Oral",
  "Oran",
  "Oren",
  "Orie",
  "Orin",
  "Orion",
  "Orland",
  "Orlando",
  "Orlo",
  "Orpha",
  "Orrin",
  "Orval",
  "Orville",
  "Osbaldo",
  "Osborne",
  "Oscar",
  "Osvaldo",
  "Oswald",
  "Oswaldo",
  "Otha",
  "Otho",
  "Otilia",
  "Otis",
  "Ottilie",
  "Ottis",
  "Otto",
  "Ova",
  "Owen",
  "Ozella",
  "Pablo",
  "Paige",
  "Palma",
  "Pamela",
  "Pansy",
  "Paolo",
  "Paris",
  "Parker",
  "Pascale",
  "Pasquale",
  "Pat",
  "Patience",
  "Patricia",
  "Patrick",
  "Patsy",
  "Pattie",
  "Paul",
  "Paula",
  "Pauline",
  "Paxton",
  "Payton",
  "Pearl",
  "Pearlie",
  "Pearline",
  "Pedro",
  "Peggie",
  "Penelope",
  "Percival",
  "Percy",
  "Perry",
  "Pete",
  "Peter",
  "Petra",
  "Peyton",
  "Philip",
  "Phoebe",
  "Phyllis",
  "Pierce",
  "Pierre",
  "Pietro",
  "Pink",
  "Pinkie",
  "Piper",
  "Polly",
  "Porter",
  "Precious",
  "Presley",
  "Preston",
  "Price",
  "Prince",
  "Princess",
  "Priscilla",
  "Providenci",
  "Prudence",
  "Queen",
  "Queenie",
  "Quentin",
  "Quincy",
  "Quinn",
  "Quinten",
  "Quinton",
  "Rachael",
  "Rachel",
  "Rachelle",
  "Rae",
  "Raegan",
  "Rafael",
  "Rafaela",
  "Raheem",
  "Rahsaan",
  "Rahul",
  "Raina",
  "Raleigh",
  "Ralph",
  "Ramiro",
  "Ramon",
  "Ramona",
  "Randal",
  "Randall",
  "Randi",
  "Randy",
  "Ransom",
  "Raoul",
  "Raphael",
  "Raphaelle",
  "Raquel",
  "Rashad",
  "Rashawn",
  "Rasheed",
  "Raul",
  "Raven",
  "Ray",
  "Raymond",
  "Raymundo",
  "Reagan",
  "Reanna",
  "Reba",
  "Rebeca",
  "Rebecca",
  "Rebeka",
  "Rebekah",
  "Reece",
  "Reed",
  "Reese",
  "Regan",
  "Reggie",
  "Reginald",
  "Reid",
  "Reilly",
  "Reina",
  "Reinhold",
  "Remington",
  "Rene",
  "Renee",
  "Ressie",
  "Reta",
  "Retha",
  "Retta",
  "Reuben",
  "Reva",
  "Rex",
  "Rey",
  "Reyes",
  "Reymundo",
  "Reyna",
  "Reynold",
  "Rhea",
  "Rhett",
  "Rhianna",
  "Rhiannon",
  "Rhoda",
  "Ricardo",
  "Richard",
  "Richie",
  "Richmond",
  "Rick",
  "Rickey",
  "Rickie",
  "Ricky",
  "Rico",
  "Rigoberto",
  "Riley",
  "Rita",
  "River",
  "Robb",
  "Robbie",
  "Robert",
  "Roberta",
  "Roberto",
  "Robin",
  "Robyn",
  "Rocio",
  "Rocky",
  "Rod",
  "Roderick",
  "Rodger",
  "Rodolfo",
  "Rodrick",
  "Rodrigo",
  "Roel",
  "Rogelio",
  "Roger",
  "Rogers",
  "Rolando",
  "Rollin",
  "Roma",
  "Romaine",
  "Roman",
  "Ron",
  "Ronaldo",
  "Ronny",
  "Roosevelt",
  "Rory",
  "Rosa",
  "Rosalee",
  "Rosalia",
  "Rosalind",
  "Rosalinda",
  "Rosalyn",
  "Rosamond",
  "Rosanna",
  "Rosario",
  "Roscoe",
  "Rose",
  "Rosella",
  "Roselyn",
  "Rosemarie",
  "Rosemary",
  "Rosendo",
  "Rosetta",
  "Rosie",
  "Rosina",
  "Roslyn",
  "Ross",
  "Rossie",
  "Rowan",
  "Rowena",
  "Rowland",
  "Roxane",
  "Roxanne",
  "Roy",
  "Royal",
  "Royce",
  "Rozella",
  "Ruben",
  "Rubie",
  "Ruby",
  "Rubye",
  "Rudolph",
  "Rudy",
  "Rupert",
  "Russ",
  "Russel",
  "Russell",
  "Rusty",
  "Ruth",
  "Ruthe",
  "Ruthie",
  "Ryan",
  "Ryann",
  "Ryder",
  "Rylan",
  "Rylee",
  "Ryleigh",
  "Ryley",
  "Sabina",
  "Sabrina",
  "Sabryna",
  "Sadie",
  "Sadye",
  "Sage",
  "Saige",
  "Sallie",
  "Sally",
  "Salma",
  "Salvador",
  "Salvatore",
  "Sam",
  "Samanta",
  "Samantha",
  "Samara",
  "Samir",
  "Sammie",
  "Sammy",
  "Samson",
  "Sandra",
  "Sandrine",
  "Sandy",
  "Sanford",
  "Santa",
  "Santiago",
  "Santina",
  "Santino",
  "Santos",
  "Sarah",
  "Sarai",
  "Sarina",
  "Sasha",
  "Saul",
  "Savanah",
  "Savanna",
  "Savannah",
  "Savion",
  "Scarlett",
  "Schuyler",
  "Scot",
  "Scottie",
  "Scotty",
  "Seamus",
  "Sean",
  "Sebastian",
  "Sedrick",
  "Selena",
  "Selina",
  "Selmer",
  "Serena",
  "Serenity",
  "Seth",
  "Shad",
  "Shaina",
  "Shakira",
  "Shana",
  "Shane",
  "Shanel",
  "Shanelle",
  "Shania",
  "Shanie",
  "Shaniya",
  "Shanna",
  "Shannon",
  "Shanny",
  "Shanon",
  "Shany",
  "Sharon",
  "Shaun",
  "Shawn",
  "Shawna",
  "Shaylee",
  "Shayna",
  "Shayne",
  "Shea",
  "Sheila",
  "Sheldon",
  "Shemar",
  "Sheridan",
  "Sherman",
  "Sherwood",
  "Shirley",
  "Shyann",
  "Shyanne",
  "Sibyl",
  "Sid",
  "Sidney",
  "Sienna",
  "Sierra",
  "Sigmund",
  "Sigrid",
  "Sigurd",
  "Silas",
  "Sim",
  "Simeon",
  "Simone",
  "Sincere",
  "Sister",
  "Skye",
  "Skyla",
  "Skylar",
  "Sofia",
  "Soledad",
  "Solon",
  "Sonia",
  "Sonny",
  "Sonya",
  "Sophia",
  "Sophie",
  "Spencer",
  "Stacey",
  "Stacy",
  "Stan",
  "Stanford",
  "Stanley",
  "Stanton",
  "Stefan",
  "Stefanie",
  "Stella",
  "Stephan",
  "Stephania",
  "Stephanie",
  "Stephany",
  "Stephen",
  "Stephon",
  "Sterling",
  "Steve",
  "Stevie",
  "Stewart",
  "Stone",
  "Stuart",
  "Summer",
  "Sunny",
  "Susan",
  "Susana",
  "Susanna",
  "Susie",
  "Suzanne",
  "Sven",
  "Syble",
  "Sydnee",
  "Sydney",
  "Sydni",
  "Sydnie",
  "Sylvan",
  "Sylvester",
  "Sylvia",
  "Tabitha",
  "Tad",
  "Talia",
  "Talon",
  "Tamara",
  "Tamia",
  "Tania",
  "Tanner",
  "Tanya",
  "Tara",
  "Taryn",
  "Tate",
  "Tatum",
  "Tatyana",
  "Taurean",
  "Tavares",
  "Taya",
  "Taylor",
  "Teagan",
  "Ted",
  "Telly",
  "Terence",
  "Teresa",
  "Terrance",
  "Terrell",
  "Terrence",
  "Terrill",
  "Terry",
  "Tess",
  "Tessie",
  "Tevin",
  "Thad",
  "Thaddeus",
  "Thalia",
  "Thea",
  "Thelma",
  "Theo",
  "Theodora",
  "Theodore",
  "Theresa",
  "Therese",
  "Theresia",
  "Theron",
  "Thomas",
  "Thora",
  "Thurman",
  "Tia",
  "Tiana",
  "Tianna",
  "Tiara",
  "Tierra",
  "Tiffany",
  "Tillman",
  "Timmothy",
  "Timmy",
  "Timothy",
  "Tina",
  "Tito",
  "Titus",
  "Tobin",
  "Toby",
  "Tod",
  "Tom",
  "Tomas",
  "Tomasa",
  "Tommie",
  "Toney",
  "Toni",
  "Tony",
  "Torey",
  "Torrance",
  "Torrey",
  "Toy",
  "Trace",
  "Tracey",
  "Tracy",
  "Travis",
  "Travon",
  "Tre",
  "Tremaine",
  "Tremayne",
  "Trent",
  "Trenton",
  "Tressa",
  "Tressie",
  "Treva",
  "Trever",
  "Trevion",
  "Trevor",
  "Trey",
  "Trinity",
  "Trisha",
  "Tristian",
  "Tristin",
  "Triston",
  "Troy",
  "Trudie",
  "Trycia",
  "Trystan",
  "Turner",
  "Twila",
  "Tyler",
  "Tyra",
  "Tyree",
  "Tyreek",
  "Tyrel",
  "Tyrell",
  "Tyrese",
  "Tyrique",
  "Tyshawn",
  "Tyson",
  "Ubaldo",
  "Ulices",
  "Ulises",
  "Una",
  "Unique",
  "Urban",
  "Uriah",
  "Uriel",
  "Ursula",
  "Vada",
  "Valentin",
  "Valentina",
  "Valentine",
  "Valerie",
  "Vallie",
  "Van",
  "Vance",
  "Vanessa",
  "Vaughn",
  "Veda",
  "Velda",
  "Vella",
  "Velma",
  "Velva",
  "Vena",
  "Verda",
  "Verdie",
  "Vergie",
  "Verla",
  "Verlie",
  "Vern",
  "Verna",
  "Verner",
  "Vernice",
  "Vernie",
  "Vernon",
  "Verona",
  "Veronica",
  "Vesta",
  "Vicenta",
  "Vicente",
  "Vickie",
  "Vicky",
  "Victor",
  "Victoria",
  "Vida",
  "Vidal",
  "Vilma",
  "Vince",
  "Vincent",
  "Vincenza",
  "Vincenzo",
  "Vinnie",
  "Viola",
  "Violet",
  "Violette",
  "Virgie",
  "Virgil",
  "Virginia",
  "Virginie",
  "Vita",
  "Vito",
  "Viva",
  "Vivian",
  "Viviane",
  "Vivianne",
  "Vivien",
  "Vivienne",
  "Vladimir",
  "Wade",
  "Waino",
  "Waldo",
  "Walker",
  "Wallace",
  "Walter",
  "Walton",
  "Wanda",
  "Ward",
  "Warren",
  "Watson",
  "Wava",
  "Waylon",
  "Wayne",
  "Webster",
  "Weldon",
  "Wellington",
  "Wendell",
  "Wendy",
  "Werner",
  "Westley",
  "Weston",
  "Whitney",
  "Wilber",
  "Wilbert",
  "Wilburn",
  "Wiley",
  "Wilford",
  "Wilfred",
  "Wilfredo",
  "Wilfrid",
  "Wilhelm",
  "Wilhelmine",
  "Will",
  "Willa",
  "Willard",
  "William",
  "Willie",
  "Willis",
  "Willow",
  "Willy",
  "Wilma",
  "Wilmer",
  "Wilson",
  "Wilton",
  "Winfield",
  "Winifred",
  "Winnifred",
  "Winona",
  "Winston",
  "Woodrow",
  "Wyatt",
  "Wyman",
  "Xander",
  "Xavier",
  "Xzavier",
  "Yadira",
  "Yasmeen",
  "Yasmin",
  "Yasmine",
  "Yazmin",
  "Yesenia",
  "Yessenia",
  "Yolanda",
  "Yoshiko",
  "Yvette",
  "Yvonne",
  "Zachariah",
  "Zachary",
  "Zachery",
  "Zack",
  "Zackary",
  "Zackery",
  "Zakary",
  "Zander",
  "Zane",
  "Zaria",
  "Zechariah",
  "Zelda",
  "Zella",
  "Zelma",
  "Zena",
  "Zetta",
  "Zion",
  "Zita",
  "Zoe",
  "Zoey",
  "Zoie",
  "Zoila",
  "Zola",
  "Zora",
  "Zula"
];

},{}],"node_modules/faker/lib/locales/en/name/last_name.js":[function(require,module,exports) {
module["exports"] = [
  "Abbott",
  "Abernathy",
  "Abshire",
  "Adams",
  "Altenwerth",
  "Anderson",
  "Ankunding",
  "Armstrong",
  "Auer",
  "Aufderhar",
  "Bahringer",
  "Bailey",
  "Balistreri",
  "Barrows",
  "Bartell",
  "Bartoletti",
  "Barton",
  "Bashirian",
  "Batz",
  "Bauch",
  "Baumbach",
  "Bayer",
  "Beahan",
  "Beatty",
  "Bechtelar",
  "Becker",
  "Bednar",
  "Beer",
  "Beier",
  "Berge",
  "Bergnaum",
  "Bergstrom",
  "Bernhard",
  "Bernier",
  "Bins",
  "Blanda",
  "Blick",
  "Block",
  "Bode",
  "Boehm",
  "Bogan",
  "Bogisich",
  "Borer",
  "Bosco",
  "Botsford",
  "Boyer",
  "Boyle",
  "Bradtke",
  "Brakus",
  "Braun",
  "Breitenberg",
  "Brekke",
  "Brown",
  "Bruen",
  "Buckridge",
  "Carroll",
  "Carter",
  "Cartwright",
  "Casper",
  "Cassin",
  "Champlin",
  "Christiansen",
  "Cole",
  "Collier",
  "Collins",
  "Conn",
  "Connelly",
  "Conroy",
  "Considine",
  "Corkery",
  "Cormier",
  "Corwin",
  "Cremin",
  "Crist",
  "Crona",
  "Cronin",
  "Crooks",
  "Cruickshank",
  "Cummerata",
  "Cummings",
  "Dach",
  "D'Amore",
  "Daniel",
  "Dare",
  "Daugherty",
  "Davis",
  "Deckow",
  "Denesik",
  "Dibbert",
  "Dickens",
  "Dicki",
  "Dickinson",
  "Dietrich",
  "Donnelly",
  "Dooley",
  "Douglas",
  "Doyle",
  "DuBuque",
  "Durgan",
  "Ebert",
  "Effertz",
  "Emard",
  "Emmerich",
  "Erdman",
  "Ernser",
  "Fadel",
  "Fahey",
  "Farrell",
  "Fay",
  "Feeney",
  "Feest",
  "Feil",
  "Ferry",
  "Fisher",
  "Flatley",
  "Frami",
  "Franecki",
  "Friesen",
  "Fritsch",
  "Funk",
  "Gaylord",
  "Gerhold",
  "Gerlach",
  "Gibson",
  "Gislason",
  "Gleason",
  "Gleichner",
  "Glover",
  "Goldner",
  "Goodwin",
  "Gorczany",
  "Gottlieb",
  "Goyette",
  "Grady",
  "Graham",
  "Grant",
  "Green",
  "Greenfelder",
  "Greenholt",
  "Grimes",
  "Gulgowski",
  "Gusikowski",
  "Gutkowski",
  "Gutmann",
  "Haag",
  "Hackett",
  "Hagenes",
  "Hahn",
  "Haley",
  "Halvorson",
  "Hamill",
  "Hammes",
  "Hand",
  "Hane",
  "Hansen",
  "Harber",
  "Harris",
  "Hartmann",
  "Harvey",
  "Hauck",
  "Hayes",
  "Heaney",
  "Heathcote",
  "Hegmann",
  "Heidenreich",
  "Heller",
  "Herman",
  "Hermann",
  "Hermiston",
  "Herzog",
  "Hessel",
  "Hettinger",
  "Hickle",
  "Hilll",
  "Hills",
  "Hilpert",
  "Hintz",
  "Hirthe",
  "Hodkiewicz",
  "Hoeger",
  "Homenick",
  "Hoppe",
  "Howe",
  "Howell",
  "Hudson",
  "Huel",
  "Huels",
  "Hyatt",
  "Jacobi",
  "Jacobs",
  "Jacobson",
  "Jakubowski",
  "Jaskolski",
  "Jast",
  "Jenkins",
  "Jerde",
  "Johns",
  "Johnson",
  "Johnston",
  "Jones",
  "Kassulke",
  "Kautzer",
  "Keebler",
  "Keeling",
  "Kemmer",
  "Kerluke",
  "Kertzmann",
  "Kessler",
  "Kiehn",
  "Kihn",
  "Kilback",
  "King",
  "Kirlin",
  "Klein",
  "Kling",
  "Klocko",
  "Koch",
  "Koelpin",
  "Koepp",
  "Kohler",
  "Konopelski",
  "Koss",
  "Kovacek",
  "Kozey",
  "Krajcik",
  "Kreiger",
  "Kris",
  "Kshlerin",
  "Kub",
  "Kuhic",
  "Kuhlman",
  "Kuhn",
  "Kulas",
  "Kunde",
  "Kunze",
  "Kuphal",
  "Kutch",
  "Kuvalis",
  "Labadie",
  "Lakin",
  "Lang",
  "Langosh",
  "Langworth",
  "Larkin",
  "Larson",
  "Leannon",
  "Lebsack",
  "Ledner",
  "Leffler",
  "Legros",
  "Lehner",
  "Lemke",
  "Lesch",
  "Leuschke",
  "Lind",
  "Lindgren",
  "Littel",
  "Little",
  "Lockman",
  "Lowe",
  "Lubowitz",
  "Lueilwitz",
  "Luettgen",
  "Lynch",
  "Macejkovic",
  "MacGyver",
  "Maggio",
  "Mann",
  "Mante",
  "Marks",
  "Marquardt",
  "Marvin",
  "Mayer",
  "Mayert",
  "McClure",
  "McCullough",
  "McDermott",
  "McGlynn",
  "McKenzie",
  "McLaughlin",
  "Medhurst",
  "Mertz",
  "Metz",
  "Miller",
  "Mills",
  "Mitchell",
  "Moen",
  "Mohr",
  "Monahan",
  "Moore",
  "Morar",
  "Morissette",
  "Mosciski",
  "Mraz",
  "Mueller",
  "Muller",
  "Murazik",
  "Murphy",
  "Murray",
  "Nader",
  "Nicolas",
  "Nienow",
  "Nikolaus",
  "Nitzsche",
  "Nolan",
  "Oberbrunner",
  "O'Connell",
  "O'Conner",
  "O'Hara",
  "O'Keefe",
  "O'Kon",
  "Okuneva",
  "Olson",
  "Ondricka",
  "O'Reilly",
  "Orn",
  "Ortiz",
  "Osinski",
  "Pacocha",
  "Padberg",
  "Pagac",
  "Parisian",
  "Parker",
  "Paucek",
  "Pfannerstill",
  "Pfeffer",
  "Pollich",
  "Pouros",
  "Powlowski",
  "Predovic",
  "Price",
  "Prohaska",
  "Prosacco",
  "Purdy",
  "Quigley",
  "Quitzon",
  "Rath",
  "Ratke",
  "Rau",
  "Raynor",
  "Reichel",
  "Reichert",
  "Reilly",
  "Reinger",
  "Rempel",
  "Renner",
  "Reynolds",
  "Rice",
  "Rippin",
  "Ritchie",
  "Robel",
  "Roberts",
  "Rodriguez",
  "Rogahn",
  "Rohan",
  "Rolfson",
  "Romaguera",
  "Roob",
  "Rosenbaum",
  "Rowe",
  "Ruecker",
  "Runolfsdottir",
  "Runolfsson",
  "Runte",
  "Russel",
  "Rutherford",
  "Ryan",
  "Sanford",
  "Satterfield",
  "Sauer",
  "Sawayn",
  "Schaden",
  "Schaefer",
  "Schamberger",
  "Schiller",
  "Schimmel",
  "Schinner",
  "Schmeler",
  "Schmidt",
  "Schmitt",
  "Schneider",
  "Schoen",
  "Schowalter",
  "Schroeder",
  "Schulist",
  "Schultz",
  "Schumm",
  "Schuppe",
  "Schuster",
  "Senger",
  "Shanahan",
  "Shields",
  "Simonis",
  "Sipes",
  "Skiles",
  "Smith",
  "Smitham",
  "Spencer",
  "Spinka",
  "Sporer",
  "Stamm",
  "Stanton",
  "Stark",
  "Stehr",
  "Steuber",
  "Stiedemann",
  "Stokes",
  "Stoltenberg",
  "Stracke",
  "Streich",
  "Stroman",
  "Strosin",
  "Swaniawski",
  "Swift",
  "Terry",
  "Thiel",
  "Thompson",
  "Tillman",
  "Torp",
  "Torphy",
  "Towne",
  "Toy",
  "Trantow",
  "Tremblay",
  "Treutel",
  "Tromp",
  "Turcotte",
  "Turner",
  "Ullrich",
  "Upton",
  "Vandervort",
  "Veum",
  "Volkman",
  "Von",
  "VonRueden",
  "Waelchi",
  "Walker",
  "Walsh",
  "Walter",
  "Ward",
  "Waters",
  "Watsica",
  "Weber",
  "Wehner",
  "Weimann",
  "Weissnat",
  "Welch",
  "West",
  "White",
  "Wiegand",
  "Wilderman",
  "Wilkinson",
  "Will",
  "Williamson",
  "Willms",
  "Windler",
  "Wintheiser",
  "Wisoky",
  "Wisozk",
  "Witting",
  "Wiza",
  "Wolf",
  "Wolff",
  "Wuckert",
  "Wunsch",
  "Wyman",
  "Yost",
  "Yundt",
  "Zboncak",
  "Zemlak",
  "Ziemann",
  "Zieme",
  "Zulauf"
];

},{}],"node_modules/faker/lib/locales/en/name/gender.js":[function(require,module,exports) {
module["exports"] = [
"Asexual",
"Female to male trans man",
"Female to male transgender man",
"Female to male transsexual man",
"F2M",
"Gender neutral",
"Hermaphrodite",
"Intersex man",
"Intersex person",
"Intersex woman",
"Male to female trans woman",
"Male to female transgender woman",
"Male to female transsexual woman",
"Man",
"M2F",
"Polygender",
"T* man",
"T* woman",
"Two* person",
"Two-spirit person",
"Woman",
"Agender",
"Androgyne",
"Androgynes",
"Androgynous",
"Bigender",
"Cis",
"Cis Female",
"Cis Male",
"Cis Man",
"Cis Woman",
"Cisgender",
"Cisgender Female",
"Cisgender Male",
"Cisgender Man",
"Cisgender Woman",
"Female to Male",
"FTM",
"Gender Fluid",
"Gender Nonconforming",
"Gender Questioning",
"Gender Variant",
"Genderqueer",
"Intersex",
"Male to Female",
"MTF",
"Neither",
"Neutrois",
"Non-binary",
"Other",
"Pangender",
"Trans",
"Trans Female",
"Trans Male",
"Trans Man",
"Trans Person",
"Trans*Female",
"Trans*Male",
"Trans*Man",
"Trans*Person",
"Trans*Woman",
"Transexual",
"Transexual Female",
"Transexual Male",
"Transexual Man",
"Transexual Person",
"Transexual Woman",
"Transgender Female",
"Transgender Person",
"Transmasculine",
"Two-spirit"
];

},{}],"node_modules/faker/lib/locales/en/name/prefix.js":[function(require,module,exports) {
module["exports"] = [
  "Mr.",
  "Mrs.",
  "Ms.",
  "Miss",
  "Dr."
];

},{}],"node_modules/faker/lib/locales/en/name/suffix.js":[function(require,module,exports) {
module["exports"] = [
  "Jr.",
  "Sr.",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "MD",
  "DDS",
  "PhD",
  "DVM"
];

},{}],"node_modules/faker/lib/locales/en/name/title.js":[function(require,module,exports) {
module["exports"] = {
  "descriptor": [
    "Lead",
    "Senior",
    "Direct",
    "Corporate",
    "Dynamic",
    "Future",
    "Product",
    "National",
    "Regional",
    "District",
    "Central",
    "Global",
    "Customer",
    "Investor",
    "Dynamic",
    "International",
    "Legacy",
    "Forward",
    "Internal",
    "Human",
    "Chief",
    "Principal"
  ],
  "level": [
    "Solutions",
    "Program",
    "Brand",
    "Security",
    "Research",
    "Marketing",
    "Directives",
    "Implementation",
    "Integration",
    "Functionality",
    "Response",
    "Paradigm",
    "Tactics",
    "Identity",
    "Markets",
    "Group",
    "Division",
    "Applications",
    "Optimization",
    "Operations",
    "Infrastructure",
    "Intranet",
    "Communications",
    "Web",
    "Branding",
    "Quality",
    "Assurance",
    "Mobility",
    "Accounts",
    "Data",
    "Creative",
    "Configuration",
    "Accountability",
    "Interactions",
    "Factors",
    "Usability",
    "Metrics"
  ],
  "job": [
    "Supervisor",
    "Associate",
    "Executive",
    "Liaison",
    "Officer",
    "Manager",
    "Engineer",
    "Specialist",
    "Director",
    "Coordinator",
    "Administrator",
    "Architect",
    "Analyst",
    "Designer",
    "Planner",
    "Orchestrator",
    "Technician",
    "Developer",
    "Producer",
    "Consultant",
    "Assistant",
    "Facilitator",
    "Agent",
    "Representative",
    "Strategist"
  ]
};

},{}],"node_modules/faker/lib/locales/en/name/name.js":[function(require,module,exports) {
module["exports"] = [
  "#{prefix} #{first_name} #{last_name}",
  "#{first_name} #{last_name} #{suffix}",
  "#{first_name} #{last_name}",
  "#{first_name} #{last_name}",
  "#{male_first_name} #{last_name}",
  "#{female_first_name} #{last_name}"
];

},{}],"node_modules/faker/lib/locales/en/name/index.js":[function(require,module,exports) {
var name = {};
module['exports'] = name;
name.male_first_name = require("./male_first_name");
name.female_first_name = require("./female_first_name");
name.first_name = require("./first_name");
name.last_name = require("./last_name");
name.gender = require("./gender");
name.prefix = require("./prefix");
name.suffix = require("./suffix");
name.title = require("./title");
name.name = require("./name");
},{"./male_first_name":"node_modules/faker/lib/locales/en/name/male_first_name.js","./female_first_name":"node_modules/faker/lib/locales/en/name/female_first_name.js","./first_name":"node_modules/faker/lib/locales/en/name/first_name.js","./last_name":"node_modules/faker/lib/locales/en/name/last_name.js","./gender":"node_modules/faker/lib/locales/en/name/gender.js","./prefix":"node_modules/faker/lib/locales/en/name/prefix.js","./suffix":"node_modules/faker/lib/locales/en/name/suffix.js","./title":"node_modules/faker/lib/locales/en/name/title.js","./name":"node_modules/faker/lib/locales/en/name/name.js"}],"node_modules/faker/lib/locales/en/phone_number/formats.js":[function(require,module,exports) {
module["exports"] = [
  "!##-!##-####",
  "(!##) !##-####",
  "1-!##-!##-####",
  "!##.!##.####",
  "!##-!##-####",
  "(!##) !##-####",
  "1-!##-!##-####",
  "!##.!##.####",
  "!##-!##-#### x###",
  "(!##) !##-#### x###",
  "1-!##-!##-#### x###",
  "!##.!##.#### x###",
  "!##-!##-#### x####",
  "(!##) !##-#### x####",
  "1-!##-!##-#### x####",
  "!##.!##.#### x####",
  "!##-!##-#### x#####",
  "(!##) !##-#### x#####",
  "1-!##-!##-#### x#####",
  "!##.!##.#### x#####"
];

},{}],"node_modules/faker/lib/locales/en/phone_number/index.js":[function(require,module,exports) {
var phone_number = {};
module['exports'] = phone_number;
phone_number.formats = require("./formats");

},{"./formats":"node_modules/faker/lib/locales/en/phone_number/formats.js"}],"node_modules/faker/lib/locales/en/cell_phone/formats.js":[function(require,module,exports) {
module["exports"] = [
  "###-###-####",
  "(###) ###-####",
  "1-###-###-####",
  "###.###.####"
];

},{}],"node_modules/faker/lib/locales/en/cell_phone/index.js":[function(require,module,exports) {
var cell_phone = {};
module['exports'] = cell_phone;
cell_phone.formats = require("./formats");

},{"./formats":"node_modules/faker/lib/locales/en/cell_phone/formats.js"}],"node_modules/faker/lib/locales/en/business/credit_card_numbers.js":[function(require,module,exports) {
module["exports"] = [
  "1234-2121-1221-1211",
  "1212-1221-1121-1234",
  "1211-1221-1234-2201",
  "1228-1221-1221-1431"
];

},{}],"node_modules/faker/lib/locales/en/business/credit_card_expiry_dates.js":[function(require,module,exports) {
module["exports"] = [
  "2011-10-12",
  "2012-11-12",
  "2015-11-11",
  "2013-9-12"
];

},{}],"node_modules/faker/lib/locales/en/business/credit_card_types.js":[function(require,module,exports) {
module["exports"] = [
  "visa",
  "mastercard",
  "americanexpress",
  "discover"
];

},{}],"node_modules/faker/lib/locales/en/business/index.js":[function(require,module,exports) {
var business = {};
module['exports'] = business;
business.credit_card_numbers = require("./credit_card_numbers");
business.credit_card_expiry_dates = require("./credit_card_expiry_dates");
business.credit_card_types = require("./credit_card_types");

},{"./credit_card_numbers":"node_modules/faker/lib/locales/en/business/credit_card_numbers.js","./credit_card_expiry_dates":"node_modules/faker/lib/locales/en/business/credit_card_expiry_dates.js","./credit_card_types":"node_modules/faker/lib/locales/en/business/credit_card_types.js"}],"node_modules/faker/lib/locales/en/commerce/color.js":[function(require,module,exports) {
module["exports"] = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "mint green",
  "teal",
  "white",
  "black",
  "orange",
  "pink",
  "grey",
  "maroon",
  "violet",
  "turquoise",
  "tan",
  "sky blue",
  "salmon",
  "plum",
  "orchid",
  "olive",
  "magenta",
  "lime",
  "ivory",
  "indigo",
  "gold",
  "fuchsia",
  "cyan",
  "azure",
  "lavender",
  "silver"
];

},{}],"node_modules/faker/lib/locales/en/commerce/department.js":[function(require,module,exports) {
module["exports"] = [
  "Books",
  "Movies",
  "Music",
  "Games",
  "Electronics",
  "Computers",
  "Home",
  "Garden",
  "Tools",
  "Grocery",
  "Health",
  "Beauty",
  "Toys",
  "Kids",
  "Baby",
  "Clothing",
  "Shoes",
  "Jewelery",
  "Sports",
  "Outdoors",
  "Automotive",
  "Industrial"
];

},{}],"node_modules/faker/lib/locales/en/commerce/product_name.js":[function(require,module,exports) {
module["exports"] = {
  "adjective": [
    "Small",
    "Ergonomic",
    "Rustic",
    "Intelligent",
    "Gorgeous",
    "Incredible",
    "Fantastic",
    "Practical",
    "Sleek",
    "Awesome",
    "Generic",
    "Handcrafted",
    "Handmade",
    "Licensed",
    "Refined",
    "Unbranded",
    "Tasty"
  ],
  "material": [
    "Steel",
    "Wooden",
    "Concrete",
    "Plastic",
    "Cotton",
    "Granite",
    "Rubber",
    "Metal",
    "Soft",
    "Fresh",
    "Frozen"
  ],
  "product": [
    "Chair",
    "Car",
    "Computer",
    "Keyboard",
    "Mouse",
    "Bike",
    "Ball",
    "Gloves",
    "Pants",
    "Shirt",
    "Table",
    "Shoes",
    "Hat",
    "Towels",
    "Soap",
    "Tuna",
    "Chicken",
    "Fish",
    "Cheese",
    "Bacon",
    "Pizza",
    "Salad",
    "Sausages",
    "Chips"
  ]
};

},{}],"node_modules/faker/lib/locales/en/commerce/product_description.js":[function(require,module,exports) {
module["exports"] = [
  "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
  "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
  "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
  "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
  "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
  "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
  "The Football Is Good For Training And Recreational Purposes",
  "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
  "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
  "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
  "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
  "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals"
];
},{}],"node_modules/faker/lib/locales/en/commerce/index.js":[function(require,module,exports) {
var commerce = {};
module['exports'] = commerce;
commerce.color = require("./color");
commerce.department = require("./department");
commerce.product_name = require("./product_name");
commerce.product_description = require("./product_description");

},{"./color":"node_modules/faker/lib/locales/en/commerce/color.js","./department":"node_modules/faker/lib/locales/en/commerce/department.js","./product_name":"node_modules/faker/lib/locales/en/commerce/product_name.js","./product_description":"node_modules/faker/lib/locales/en/commerce/product_description.js"}],"node_modules/faker/lib/locales/en/team/creature.js":[function(require,module,exports) {
module["exports"] = [
  "ants",
  "bats",
  "bears",
  "bees",
  "birds",
  "buffalo",
  "cats",
  "chickens",
  "cattle",
  "dogs",
  "dolphins",
  "ducks",
  "elephants",
  "fishes",
  "foxes",
  "frogs",
  "geese",
  "goats",
  "horses",
  "kangaroos",
  "lions",
  "monkeys",
  "owls",
  "oxen",
  "penguins",
  "people",
  "pigs",
  "rabbits",
  "sheep",
  "tigers",
  "whales",
  "wolves",
  "zebras",
  "banshees",
  "crows",
  "black cats",
  "chimeras",
  "ghosts",
  "conspirators",
  "dragons",
  "dwarves",
  "elves",
  "enchanters",
  "exorcists",
  "sons",
  "foes",
  "giants",
  "gnomes",
  "goblins",
  "gooses",
  "griffins",
  "lycanthropes",
  "nemesis",
  "ogres",
  "oracles",
  "prophets",
  "sorcerors",
  "spiders",
  "spirits",
  "vampires",
  "warlocks",
  "vixens",
  "werewolves",
  "witches",
  "worshipers",
  "zombies",
  "druids"
];

},{}],"node_modules/faker/lib/locales/en/team/name.js":[function(require,module,exports) {
module["exports"] = [
  "#{Address.state} #{creature}"
];

},{}],"node_modules/faker/lib/locales/en/team/index.js":[function(require,module,exports) {
var team = {};
module['exports'] = team;
team.creature = require("./creature");
team.name = require("./name");

},{"./creature":"node_modules/faker/lib/locales/en/team/creature.js","./name":"node_modules/faker/lib/locales/en/team/name.js"}],"node_modules/faker/lib/locales/en/hacker/abbreviation.js":[function(require,module,exports) {
module["exports"] = [
  "TCP",
  "HTTP",
  "SDD",
  "RAM",
  "GB",
  "CSS",
  "SSL",
  "AGP",
  "SQL",
  "FTP",
  "PCI",
  "AI",
  "ADP",
  "RSS",
  "XML",
  "EXE",
  "COM",
  "HDD",
  "THX",
  "SMTP",
  "SMS",
  "USB",
  "PNG",
  "SAS",
  "IB",
  "SCSI",
  "JSON",
  "XSS",
  "JBOD"
];

},{}],"node_modules/faker/lib/locales/en/hacker/adjective.js":[function(require,module,exports) {
module["exports"] = [
  "auxiliary",
  "primary",
  "back-end",
  "digital",
  "open-source",
  "virtual",
  "cross-platform",
  "redundant",
  "online",
  "haptic",
  "multi-byte",
  "bluetooth",
  "wireless",
  "1080p",
  "neural",
  "optical",
  "solid state",
  "mobile"
];

},{}],"node_modules/faker/lib/locales/en/hacker/noun.js":[function(require,module,exports) {
module["exports"] = [
  "driver",
  "protocol",
  "bandwidth",
  "panel",
  "microchip",
  "program",
  "port",
  "card",
  "array",
  "interface",
  "system",
  "sensor",
  "firewall",
  "hard drive",
  "pixel",
  "alarm",
  "feed",
  "monitor",
  "application",
  "transmitter",
  "bus",
  "circuit",
  "capacitor",
  "matrix"
];

},{}],"node_modules/faker/lib/locales/en/hacker/verb.js":[function(require,module,exports) {
module["exports"] = [
  "back up",
  "bypass",
  "hack",
  "override",
  "compress",
  "copy",
  "navigate",
  "index",
  "connect",
  "generate",
  "quantify",
  "calculate",
  "synthesize",
  "input",
  "transmit",
  "program",
  "reboot",
  "parse"
];

},{}],"node_modules/faker/lib/locales/en/hacker/ingverb.js":[function(require,module,exports) {
module["exports"] = [
  "backing up",
  "bypassing",
  "hacking",
  "overriding",
  "compressing",
  "copying",
  "navigating",
  "indexing",
  "connecting",
  "generating",
  "quantifying",
  "calculating",
  "synthesizing",
  "transmitting",
  "programming",
  "parsing"
];

},{}],"node_modules/faker/lib/locales/en/hacker/phrase.js":[function(require,module,exports) {
module["exports"] = [
  "If we {{verb}} the {{noun}}, we can get to the {{abbreviation}} {{noun}} through the {{adjective}} {{abbreviation}} {{noun}}!",
  "We need to {{verb}} the {{adjective}} {{abbreviation}} {{noun}}!",
  "Try to {{verb}} the {{abbreviation}} {{noun}}, maybe it will {{verb}} the {{adjective}} {{noun}}!",
  "You can't {{verb}} the {{noun}} without {{ingverb}} the {{adjective}} {{abbreviation}} {{noun}}!",
  "Use the {{adjective}} {{abbreviation}} {{noun}}, then you can {{verb}} the {{adjective}} {{noun}}!",
  "The {{abbreviation}} {{noun}} is down, {{verb}} the {{adjective}} {{noun}} so we can {{verb}} the {{abbreviation}} {{noun}}!",
  "{{ingverb}} the {{noun}} won't do anything, we need to {{verb}} the {{adjective}} {{abbreviation}} {{noun}}!",
  "I'll {{verb}} the {{adjective}} {{abbreviation}} {{noun}}, that should {{noun}} the {{abbreviation}} {{noun}}!"
];
},{}],"node_modules/faker/lib/locales/en/hacker/index.js":[function(require,module,exports) {
var hacker = {};
module['exports'] = hacker;
hacker.abbreviation = require("./abbreviation");
hacker.adjective = require("./adjective");
hacker.noun = require("./noun");
hacker.verb = require("./verb");
hacker.ingverb = require("./ingverb");
hacker.phrase = require("./phrase");

},{"./abbreviation":"node_modules/faker/lib/locales/en/hacker/abbreviation.js","./adjective":"node_modules/faker/lib/locales/en/hacker/adjective.js","./noun":"node_modules/faker/lib/locales/en/hacker/noun.js","./verb":"node_modules/faker/lib/locales/en/hacker/verb.js","./ingverb":"node_modules/faker/lib/locales/en/hacker/ingverb.js","./phrase":"node_modules/faker/lib/locales/en/hacker/phrase.js"}],"node_modules/faker/lib/locales/en/app/name.js":[function(require,module,exports) {
module["exports"] = [
  "Redhold",
  "Treeflex",
  "Trippledex",
  "Kanlam",
  "Bigtax",
  "Daltfresh",
  "Toughjoyfax",
  "Mat Lam Tam",
  "Otcom",
  "Tres-Zap",
  "Y-Solowarm",
  "Tresom",
  "Voltsillam",
  "Biodex",
  "Greenlam",
  "Viva",
  "Matsoft",
  "Temp",
  "Zoolab",
  "Subin",
  "Rank",
  "Job",
  "Stringtough",
  "Tin",
  "It",
  "Home Ing",
  "Zamit",
  "Sonsing",
  "Konklab",
  "Alpha",
  "Latlux",
  "Voyatouch",
  "Alphazap",
  "Holdlamis",
  "Zaam-Dox",
  "Sub-Ex",
  "Quo Lux",
  "Bamity",
  "Ventosanzap",
  "Lotstring",
  "Hatity",
  "Tempsoft",
  "Overhold",
  "Fixflex",
  "Konklux",
  "Zontrax",
  "Tampflex",
  "Span",
  "Namfix",
  "Transcof",
  "Stim",
  "Fix San",
  "Sonair",
  "Stronghold",
  "Fintone",
  "Y-find",
  "Opela",
  "Lotlux",
  "Ronstring",
  "Zathin",
  "Duobam",
  "Keylex"
];

},{}],"node_modules/faker/lib/locales/en/app/version.js":[function(require,module,exports) {
module["exports"] = [
  "0.#.#",
  "0.##",
  "#.##",
  "#.#",
  "#.#.#"
];

},{}],"node_modules/faker/lib/locales/en/app/author.js":[function(require,module,exports) {
module["exports"] = [
  "#{Name.name}",
  "#{Company.name}"
];

},{}],"node_modules/faker/lib/locales/en/app/index.js":[function(require,module,exports) {
var app = {};
module['exports'] = app;
app.name = require("./name");
app.version = require("./version");
app.author = require("./author");

},{"./name":"node_modules/faker/lib/locales/en/app/name.js","./version":"node_modules/faker/lib/locales/en/app/version.js","./author":"node_modules/faker/lib/locales/en/app/author.js"}],"node_modules/faker/lib/locales/en/finance/account_type.js":[function(require,module,exports) {
module["exports"] = [
  "Checking",
  "Savings",
  "Money Market",
  "Investment",
  "Home Loan",
  "Credit Card",
  "Auto Loan",
  "Personal Loan"
];

},{}],"node_modules/faker/lib/locales/en/finance/transaction_type.js":[function(require,module,exports) {
module["exports"] = [
  "deposit",
  "withdrawal",
  "payment",
  "invoice"
];

},{}],"node_modules/faker/lib/locales/en/finance/currency.js":[function(require,module,exports) {
module["exports"] = {
  "UAE Dirham": {
    "code": "AED",
    "symbol": ""
  },
  "Afghani": {
    "code": "AFN",
    "symbol": "؋"
  },
  "Lek": {
    "code": "ALL",
    "symbol": "Lek"
  },
  "Armenian Dram": {
    "code": "AMD",
    "symbol": ""
  },
  "Netherlands Antillian Guilder": {
    "code": "ANG",
    "symbol": "ƒ"
  },
  "Kwanza": {
    "code": "AOA",
    "symbol": ""
  },
  "Argentine Peso": {
    "code": "ARS",
    "symbol": "$"
  },
  "Australian Dollar": {
    "code": "AUD",
    "symbol": "$"
  },
  "Aruban Guilder": {
    "code": "AWG",
    "symbol": "ƒ"
  },
  "Azerbaijanian Manat": {
    "code": "AZN",
    "symbol": "ман"
  },
  "Convertible Marks": {
    "code": "BAM",
    "symbol": "KM"
  },
  "Barbados Dollar": {
    "code": "BBD",
    "symbol": "$"
  },
  "Taka": {
    "code": "BDT",
    "symbol": ""
  },
  "Bulgarian Lev": {
    "code": "BGN",
    "symbol": "лв"
  },
  "Bahraini Dinar": {
    "code": "BHD",
    "symbol": ""
  },
  "Burundi Franc": {
    "code": "BIF",
    "symbol": ""
  },
  "Bermudian Dollar (customarily known as Bermuda Dollar)": {
    "code": "BMD",
    "symbol": "$"
  },
  "Brunei Dollar": {
    "code": "BND",
    "symbol": "$"
  },
  "Boliviano boliviano": {
    "code": "BOB",
    "symbol": "Bs"
  },
  "Brazilian Real": {
    "code": "BRL",
    "symbol": "R$"
  },
  "Bahamian Dollar": {
    "code": "BSD",
    "symbol": "$"
  },
  "Pula": {
    "code": "BWP",
    "symbol": "P"
  },
  "Belarussian Ruble": {
    "code": "BYR",
    "symbol": "p."
  },
  "Belize Dollar": {
    "code": "BZD",
    "symbol": "BZ$"
  },
  "Canadian Dollar": {
    "code": "CAD",
    "symbol": "$"
  },
  "Congolese Franc": {
    "code": "CDF",
    "symbol": ""
  },
  "Swiss Franc": {
    "code": "CHF",
    "symbol": "CHF"
  },
  "Chilean Peso": {
    "code": "CLP",
    "symbol": "$"
  },
  "Yuan Renminbi": {
    "code": "CNY",
    "symbol": "¥"
  },
  "Colombian Peso": {
    "code": "COP",
    "symbol": "$"
  },
  "Costa Rican Colon": {
    "code": "CRC",
    "symbol": "₡"
  },
  "Cuban Peso": {
    "code": "CUP",
    "symbol": "₱"
  },
  "Cuban Peso Convertible": {
    "code": "CUC",
    "symbol": "$"
  },
  "Cape Verde Escudo": {
    "code": "CVE",
    "symbol": ""
  },
  "Czech Koruna": {
    "code": "CZK",
    "symbol": "Kč"
  },
  "Djibouti Franc": {
    "code": "DJF",
    "symbol": ""
  },
  "Danish Krone": {
    "code": "DKK",
    "symbol": "kr"
  },
  "Dominican Peso": {
    "code": "DOP",
    "symbol": "RD$"
  },
  "Algerian Dinar": {
    "code": "DZD",
    "symbol": ""
  },
  "Kroon": {
    "code": "EEK",
    "symbol": ""
  },
  "Egyptian Pound": {
    "code": "EGP",
    "symbol": "£"
  },
  "Nakfa": {
    "code": "ERN",
    "symbol": ""
  },
  "Ethiopian Birr": {
    "code": "ETB",
    "symbol": ""
  },
  "Euro": {
    "code": "EUR",
    "symbol": "€"
  },
  "Fiji Dollar": {
    "code": "FJD",
    "symbol": "$"
  },
  "Falkland Islands Pound": {
    "code": "FKP",
    "symbol": "£"
  },
  "Pound Sterling": {
    "code": "GBP",
    "symbol": "£"
  },
  "Lari": {
    "code": "GEL",
    "symbol": ""
  },
  "Cedi": {
    "code": "GHS",
    "symbol": ""
  },
  "Gibraltar Pound": {
    "code": "GIP",
    "symbol": "£"
  },
  "Dalasi": {
    "code": "GMD",
    "symbol": ""
  },
  "Guinea Franc": {
    "code": "GNF",
    "symbol": ""
  },
  "Quetzal": {
    "code": "GTQ",
    "symbol": "Q"
  },
  "Guyana Dollar": {
    "code": "GYD",
    "symbol": "$"
  },
  "Hong Kong Dollar": {
    "code": "HKD",
    "symbol": "$"
  },
  "Lempira": {
    "code": "HNL",
    "symbol": "L"
  },
  "Croatian Kuna": {
    "code": "HRK",
    "symbol": "kn"
  },
  "Gourde": {
    "code": "HTG",
    "symbol": ""
  },
  "Forint": {
    "code": "HUF",
    "symbol": "Ft"
  },
  "Rupiah": {
    "code": "IDR",
    "symbol": "Rp"
  },
  "New Israeli Sheqel": {
    "code": "ILS",
    "symbol": "₪"
  },
  "Indian Rupee": {
    "code": "INR",
    "symbol": ""
  },
  "Bhutanese Ngultrum": {
    "code": "BTN",
    "symbol": "Nu"
  },
  "Indian Rupee": {
    "code": "INR",
    "symbol": "₹"
  },
  "Iraqi Dinar": {
    "code": "IQD",
    "symbol": ""
  },
  "Iranian Rial": {
    "code": "IRR",
    "symbol": "﷼"
  },
  "Iceland Krona": {
    "code": "ISK",
    "symbol": "kr"
  },
  "Jamaican Dollar": {
    "code": "JMD",
    "symbol": "J$"
  },
  "Jordanian Dinar": {
    "code": "JOD",
    "symbol": ""
  },
  "Yen": {
    "code": "JPY",
    "symbol": "¥"
  },
  "Kenyan Shilling": {
    "code": "KES",
    "symbol": ""
  },
  "Som": {
    "code": "KGS",
    "symbol": "лв"
  },
  "Riel": {
    "code": "KHR",
    "symbol": "៛"
  },
  "Comoro Franc": {
    "code": "KMF",
    "symbol": ""
  },
  "North Korean Won": {
    "code": "KPW",
    "symbol": "₩"
  },
  "Won": {
    "code": "KRW",
    "symbol": "₩"
  },
  "Kuwaiti Dinar": {
    "code": "KWD",
    "symbol": ""
  },
  "Cayman Islands Dollar": {
    "code": "KYD",
    "symbol": "$"
  },
  "Tenge": {
    "code": "KZT",
    "symbol": "лв"
  },
  "Kip": {
    "code": "LAK",
    "symbol": "₭"
  },
  "Lebanese Pound": {
    "code": "LBP",
    "symbol": "£"
  },
  "Sri Lanka Rupee": {
    "code": "LKR",
    "symbol": "₨"
  },
  "Liberian Dollar": {
    "code": "LRD",
    "symbol": "$"
  },
  "Lithuanian Litas": {
    "code": "LTL",
    "symbol": "Lt"
  },
  "Latvian Lats": {
    "code": "LVL",
    "symbol": "Ls"
  },
  "Libyan Dinar": {
    "code": "LYD",
    "symbol": ""
  },
  "Moroccan Dirham": {
    "code": "MAD",
    "symbol": ""
  },
  "Moldovan Leu": {
    "code": "MDL",
    "symbol": ""
  },
  "Malagasy Ariary": {
    "code": "MGA",
    "symbol": ""
  },
  "Denar": {
    "code": "MKD",
    "symbol": "ден"
  },
  "Kyat": {
    "code": "MMK",
    "symbol": ""
  },
  "Tugrik": {
    "code": "MNT",
    "symbol": "₮"
  },
  "Pataca": {
    "code": "MOP",
    "symbol": ""
  },
  "Ouguiya": {
    "code": "MRO",
    "symbol": ""
  },
  "Mauritius Rupee": {
    "code": "MUR",
    "symbol": "₨"
  },
  "Rufiyaa": {
    "code": "MVR",
    "symbol": ""
  },
  "Kwacha": {
    "code": "MWK",
    "symbol": ""
  },
  "Mexican Peso": {
    "code": "MXN",
    "symbol": "$"
  },
  "Malaysian Ringgit": {
    "code": "MYR",
    "symbol": "RM"
  },
  "Metical": {
    "code": "MZN",
    "symbol": "MT"
  },
  "Naira": {
    "code": "NGN",
    "symbol": "₦"
  },
  "Cordoba Oro": {
    "code": "NIO",
    "symbol": "C$"
  },
  "Norwegian Krone": {
    "code": "NOK",
    "symbol": "kr"
  },
  "Nepalese Rupee": {
    "code": "NPR",
    "symbol": "₨"
  },
  "New Zealand Dollar": {
    "code": "NZD",
    "symbol": "$"
  },
  "Rial Omani": {
    "code": "OMR",
    "symbol": "﷼"
  },
  "Balboa": {
    "code": "PAB",
    "symbol": "B/."
  },
  "Nuevo Sol": {
    "code": "PEN",
    "symbol": "S/."
  },
  "Kina": {
    "code": "PGK",
    "symbol": ""
  },
  "Philippine Peso": {
    "code": "PHP",
    "symbol": "Php"
  },
  "Pakistan Rupee": {
    "code": "PKR",
    "symbol": "₨"
  },
  "Zloty": {
    "code": "PLN",
    "symbol": "zł"
  },
  "Guarani": {
    "code": "PYG",
    "symbol": "Gs"
  },
  "Qatari Rial": {
    "code": "QAR",
    "symbol": "﷼"
  },
  "New Leu": {
    "code": "RON",
    "symbol": "lei"
  },
  "Serbian Dinar": {
    "code": "RSD",
    "symbol": "Дин."
  },
  "Russian Ruble": {
    "code": "RUB",
    "symbol": "руб"
  },
  "Rwanda Franc": {
    "code": "RWF",
    "symbol": ""
  },
  "Saudi Riyal": {
    "code": "SAR",
    "symbol": "﷼"
  },
  "Solomon Islands Dollar": {
    "code": "SBD",
    "symbol": "$"
  },
  "Seychelles Rupee": {
    "code": "SCR",
    "symbol": "₨"
  },
  "Sudanese Pound": {
    "code": "SDG",
    "symbol": ""
  },
  "Swedish Krona": {
    "code": "SEK",
    "symbol": "kr"
  },
  "Singapore Dollar": {
    "code": "SGD",
    "symbol": "$"
  },
  "Saint Helena Pound": {
    "code": "SHP",
    "symbol": "£"
  },
  "Leone": {
    "code": "SLL",
    "symbol": ""
  },
  "Somali Shilling": {
    "code": "SOS",
    "symbol": "S"
  },
  "Surinam Dollar": {
    "code": "SRD",
    "symbol": "$"
  },
  "Dobra": {
    "code": "STN",
    "symbol": "Db"
  },
  "El Salvador Colon": {
    "code": "SVC",
    "symbol": "₡"
  },
  "Syrian Pound": {
    "code": "SYP",
    "symbol": "£"
  },
  "Lilangeni": {
    "code": "SZL",
    "symbol": ""
  },
  "Baht": {
    "code": "THB",
    "symbol": "฿"
  },
  "Somoni": {
    "code": "TJS",
    "symbol": ""
  },
  "Manat": {
    "code": "TMT",
    "symbol": ""
  },
  "Tunisian Dinar": {
    "code": "TND",
    "symbol": ""
  },
  "Pa'anga": {
    "code": "TOP",
    "symbol": ""
  },
  "Turkish Lira": {
    "code": "TRY",
    "symbol": "₺"
  },
  "Trinidad and Tobago Dollar": {
    "code": "TTD",
    "symbol": "TT$"
  },
  "New Taiwan Dollar": {
    "code": "TWD",
    "symbol": "NT$"
  },
  "Tanzanian Shilling": {
    "code": "TZS",
    "symbol": ""
  },
  "Hryvnia": {
    "code": "UAH",
    "symbol": "₴"
  },
  "Uganda Shilling": {
    "code": "UGX",
    "symbol": ""
  },
  "US Dollar": {
    "code": "USD",
    "symbol": "$"
  },
  "Peso Uruguayo": {
    "code": "UYU",
    "symbol": "$U"
  },
  "Uzbekistan Sum": {
    "code": "UZS",
    "symbol": "лв"
  },
  "Bolivar Fuerte": {
    "code": "VEF",
    "symbol": "Bs"
  },
  "Dong": {
    "code": "VND",
    "symbol": "₫"
  },
  "Vatu": {
    "code": "VUV",
    "symbol": ""
  },
  "Tala": {
    "code": "WST",
    "symbol": ""
  },
  "CFA Franc BEAC": {
    "code": "XAF",
    "symbol": ""
  },
  "Silver": {
    "code": "XAG",
    "symbol": ""
  },
  "Gold": {
    "code": "XAU",
    "symbol": ""
  },
  "Bond Markets Units European Composite Unit (EURCO)": {
    "code": "XBA",
    "symbol": ""
  },
  "European Monetary Unit (E.M.U.-6)": {
    "code": "XBB",
    "symbol": ""
  },
  "European Unit of Account 9(E.U.A.-9)": {
    "code": "XBC",
    "symbol": ""
  },
  "European Unit of Account 17(E.U.A.-17)": {
    "code": "XBD",
    "symbol": ""
  },
  "East Caribbean Dollar": {
    "code": "XCD",
    "symbol": "$"
  },
  "SDR": {
    "code": "XDR",
    "symbol": ""
  },
  "UIC-Franc": {
    "code": "XFU",
    "symbol": ""
  },
  "CFA Franc BCEAO": {
    "code": "XOF",
    "symbol": ""
  },
  "Palladium": {
    "code": "XPD",
    "symbol": ""
  },
  "CFP Franc": {
    "code": "XPF",
    "symbol": ""
  },
  "Platinum": {
    "code": "XPT",
    "symbol": ""
  },
  "Codes specifically reserved for testing purposes": {
    "code": "XTS",
    "symbol": ""
  },
  "Yemeni Rial": {
    "code": "YER",
    "symbol": "﷼"
  },
  "Rand": {
    "code": "ZAR",
    "symbol": "R"
  },
  "Lesotho Loti": {
    "code": "LSL",
    "symbol": ""
  },
  "Namibia Dollar": {
    "code": "NAD",
    "symbol": "N$"
  },
  "Zambian Kwacha": {
    "code": "ZMK",
    "symbol": ""
  },
  "Zimbabwe Dollar": {
    "code": "ZWL",
    "symbol": ""
  }
};

},{}],"node_modules/faker/lib/locales/en/finance/credit_card/visa.js":[function(require,module,exports) {
module["exports"] = [
  "4###########L",
  "4###-####-####-###L"
];

},{}],"node_modules/faker/lib/locales/en/finance/credit_card/mastercard.js":[function(require,module,exports) {
module["exports"] = [
  "5[1-5]##-####-####-###L",
  "6771-89##-####-###L"
];

},{}],"node_modules/faker/lib/locales/en/finance/credit_card/discover.js":[function(require,module,exports) {
module["exports"] = [
  "6011-####-####-###L",
  "65##-####-####-###L",
  "64[4-9]#-####-####-###L",
  "6011-62##-####-####-###L",
  "65##-62##-####-####-###L",
  "64[4-9]#-62##-####-####-###L"
];

},{}],"node_modules/faker/lib/locales/en/finance/credit_card/american_express.js":[function(require,module,exports) {
module["exports"] = [
  "34##-######-####L",
  "37##-######-####L"
];

},{}],"node_modules/faker/lib/locales/en/finance/credit_card/diners_club.js":[function(require,module,exports) {
module["exports"] = [
  "30[0-5]#-######-###L",
  "36##-######-###L",
  "54##-####-####-###L"
];

},{}],"node_modules/faker/lib/locales/en/finance/credit_card/jcb.js":[function(require,module,exports) {
module["exports"] = [
  "3528-####-####-###L",
  "3529-####-####-###L",
  "35[3-8]#-####-####-###L"
];

},{}],"node_modules/faker/lib/locales/en/finance/credit_card/switch.js":[function(require,module,exports) {
module["exports"] = [
  "6759-####-####-###L",
  "6759-####-####-####-#L",
  "6759-####-####-####-##L"
];

},{}],"node_modules/faker/lib/locales/en/finance/credit_card/solo.js":[function(require,module,exports) {
module["exports"] = [
  "6767-####-####-###L",
  "6767-####-####-####-#L",
  "6767-####-####-####-##L"
];

},{}],"node_modules/faker/lib/locales/en/finance/credit_card/maestro.js":[function(require,module,exports) {
module["exports"] = [
  "5018-#{4}-#{4}-#{3}L",
  "5020-#{4}-#{4}-#{3}L",
  "5038-#{4}-#{4}-#{3}L",
  "5893-#{4}-#{4}-#{3}L",
  "6304-#{4}-#{4}-#{3}L",
  "6759-#{4}-#{4}-#{3}L",
  "676[1-3]-####-####-###L",
  "5018#{11,15}L",
  "5020#{11,15}L",
  "5038#{11,15}L",
  "5893#{11,15}L",
  "6304#{11,15}L",
  "6759#{11,15}L",
  "676[1-3]#{11,15}L",
];

// 5018 xxxx xxxx xxxx xxL

},{}],"node_modules/faker/lib/locales/en/finance/credit_card/laser.js":[function(require,module,exports) {
module["exports"] = [
  "6304###########L",
  "6706###########L",
  "6771###########L",
  "6709###########L",
  "6304#########{5,6}L",
  "6706#########{5,6}L",
  "6771#########{5,6}L",
  "6709#########{5,6}L"
];

},{}],"node_modules/faker/lib/locales/en/finance/credit_card/instapayment.js":[function(require,module,exports) {
module["exports"] = [
  "63[7-9]#-####-####-###L"
];

},{}],"node_modules/faker/lib/locales/en/finance/credit_card/index.js":[function(require,module,exports) {
var credit_card = {};
module['exports'] = credit_card;
credit_card.visa = require("./visa");
credit_card.mastercard = require("./mastercard");
credit_card.discover = require("./discover");
credit_card.american_express = require("./american_express");
credit_card.diners_club = require("./diners_club");
credit_card.jcb = require("./jcb");
credit_card.switch = require("./switch");
credit_card.solo = require("./solo");
credit_card.maestro = require("./maestro");
credit_card.laser = require("./laser");
credit_card.instapayment = require("./instapayment.js")

},{"./visa":"node_modules/faker/lib/locales/en/finance/credit_card/visa.js","./mastercard":"node_modules/faker/lib/locales/en/finance/credit_card/mastercard.js","./discover":"node_modules/faker/lib/locales/en/finance/credit_card/discover.js","./american_express":"node_modules/faker/lib/locales/en/finance/credit_card/american_express.js","./diners_club":"node_modules/faker/lib/locales/en/finance/credit_card/diners_club.js","./jcb":"node_modules/faker/lib/locales/en/finance/credit_card/jcb.js","./switch":"node_modules/faker/lib/locales/en/finance/credit_card/switch.js","./solo":"node_modules/faker/lib/locales/en/finance/credit_card/solo.js","./maestro":"node_modules/faker/lib/locales/en/finance/credit_card/maestro.js","./laser":"node_modules/faker/lib/locales/en/finance/credit_card/laser.js","./instapayment.js":"node_modules/faker/lib/locales/en/finance/credit_card/instapayment.js"}],"node_modules/faker/lib/locales/en/finance/index.js":[function(require,module,exports) {
var finance = {};
module['exports'] = finance;
finance.account_type = require("./account_type");
finance.transaction_type = require("./transaction_type");
finance.currency = require("./currency");
finance.credit_card = require("./credit_card");

},{"./account_type":"node_modules/faker/lib/locales/en/finance/account_type.js","./transaction_type":"node_modules/faker/lib/locales/en/finance/transaction_type.js","./currency":"node_modules/faker/lib/locales/en/finance/currency.js","./credit_card":"node_modules/faker/lib/locales/en/finance/credit_card/index.js"}],"node_modules/faker/lib/locales/en/date/month.js":[function(require,module,exports) {
// Source: http://unicode.org/cldr/trac/browser/tags/release-27/common/main/en.xml#L1799
module["exports"] = {
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  // Property "wide_context" is optional, if not set then "wide" will be used instead
  // It is used to specify a word in context, which may differ from a stand-alone word
  wide_context: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  abbr: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  // Property "abbr_context" is optional, if not set then "abbr" will be used instead
  // It is used to specify a word in context, which may differ from a stand-alone word
  abbr_context: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
};

},{}],"node_modules/faker/lib/locales/en/date/weekday.js":[function(require,module,exports) {
// Source: http://unicode.org/cldr/trac/browser/tags/release-27/common/main/en.xml#L1847
module["exports"] = {
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  // Property "wide_context" is optional, if not set then "wide" will be used instead
  // It is used to specify a word in context, which may differ from a stand-alone word
  wide_context: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  abbr: [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ],
  // Property "abbr_context" is optional, if not set then "abbr" will be used instead
  // It is used to specify a word in context, which may differ from a stand-alone word
  abbr_context: [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ]
};

},{}],"node_modules/faker/lib/locales/en/date/index.js":[function(require,module,exports) {
var date = {};
module["exports"] = date;
date.month = require("./month");
date.weekday = require("./weekday");

},{"./month":"node_modules/faker/lib/locales/en/date/month.js","./weekday":"node_modules/faker/lib/locales/en/date/weekday.js"}],"node_modules/faker/lib/locales/en/system/directoryPaths.js":[function(require,module,exports) {
module['exports'] = [
    "/Applications",
		"/bin",
    "/boot",
    "/boot/defaults",
    "/dev",
    "/etc",
    "/etc/defaults",
    "/etc/mail",
    "/etc/namedb",
    "/etc/periodic",
    "/etc/ppp",
    "/home",
    "/home/user",
    "/home/user/dir",
    "/lib",
    "/Library",
    "/lost+found",
    "/media",
    "/mnt",
    "/net",
    "/Network",
    "/opt",
    "/opt/bin",
    "/opt/include",
    "/opt/lib",
    "/opt/sbin",
    "/opt/share",
    "/private",
    "/private/tmp",
    "/private/var",
    "/proc",
    "/rescue",
    "/root",
    "/sbin",
    "/selinux",
    "/srv",
    "/sys",
    "/System",
    "/tmp",
    "/Users",
    "/usr",
    "/usr/X11R6",
    "/usr/bin",
    "/usr/include",
    "/usr/lib",
    "/usr/libdata",
    "/usr/libexec",
    "/usr/local/bin",
    "/usr/local/src",
    "/usr/obj",
    "/usr/ports",
    "/usr/sbin",
    "/usr/share",
    "/usr/src",
    "/var",
    "/var/log",
    "/var/mail",
    "/var/spool",
    "/var/tmp",
    "/var/yp"
];

},{}],"node_modules/faker/lib/locales/en/system/mimeTypes.js":[function(require,module,exports) {
/*

The MIT License (MIT)

Copyright (c) 2014 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Definitions from mime-db v1.21.0
For updates check: https://github.com/jshttp/mime-db/blob/master/db.json

*/

module['exports'] = {
  "application/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    "source": "iana"
  },
  "application/3gpp-ims+xml": {
    "source": "iana"
  },
  "application/a2l": {
    "source": "iana"
  },
  "application/activemessage": {
    "source": "iana"
  },
  "application/alto-costmap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-costmapfilter+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-directory+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointcost+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointcostparams+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointprop+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointpropparams+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-error+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-networkmap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-networkmapfilter+json": {
    "source": "iana",
    "compressible": true
  },
  "application/aml": {
    "source": "iana"
  },
  "application/andrew-inset": {
    "source": "iana",
    "extensions": ["ez"]
  },
  "application/applefile": {
    "source": "iana"
  },
  "application/applixware": {
    "source": "apache",
    "extensions": ["aw"]
  },
  "application/atf": {
    "source": "iana"
  },
  "application/atfx": {
    "source": "iana"
  },
  "application/atom+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["atom"]
  },
  "application/atomcat+xml": {
    "source": "iana",
    "extensions": ["atomcat"]
  },
  "application/atomdeleted+xml": {
    "source": "iana"
  },
  "application/atomicmail": {
    "source": "iana"
  },
  "application/atomsvc+xml": {
    "source": "iana",
    "extensions": ["atomsvc"]
  },
  "application/atxml": {
    "source": "iana"
  },
  "application/auth-policy+xml": {
    "source": "iana"
  },
  "application/bacnet-xdd+zip": {
    "source": "iana"
  },
  "application/batch-smtp": {
    "source": "iana"
  },
  "application/bdoc": {
    "compressible": false,
    "extensions": ["bdoc"]
  },
  "application/beep+xml": {
    "source": "iana"
  },
  "application/calendar+json": {
    "source": "iana",
    "compressible": true
  },
  "application/calendar+xml": {
    "source": "iana"
  },
  "application/call-completion": {
    "source": "iana"
  },
  "application/cals-1840": {
    "source": "iana"
  },
  "application/cbor": {
    "source": "iana"
  },
  "application/ccmp+xml": {
    "source": "iana"
  },
  "application/ccxml+xml": {
    "source": "iana",
    "extensions": ["ccxml"]
  },
  "application/cdfx+xml": {
    "source": "iana"
  },
  "application/cdmi-capability": {
    "source": "iana",
    "extensions": ["cdmia"]
  },
  "application/cdmi-container": {
    "source": "iana",
    "extensions": ["cdmic"]
  },
  "application/cdmi-domain": {
    "source": "iana",
    "extensions": ["cdmid"]
  },
  "application/cdmi-object": {
    "source": "iana",
    "extensions": ["cdmio"]
  },
  "application/cdmi-queue": {
    "source": "iana",
    "extensions": ["cdmiq"]
  },
  "application/cdni": {
    "source": "iana"
  },
  "application/cea": {
    "source": "iana"
  },
  "application/cea-2018+xml": {
    "source": "iana"
  },
  "application/cellml+xml": {
    "source": "iana"
  },
  "application/cfw": {
    "source": "iana"
  },
  "application/cms": {
    "source": "iana"
  },
  "application/cnrp+xml": {
    "source": "iana"
  },
  "application/coap-group+json": {
    "source": "iana",
    "compressible": true
  },
  "application/commonground": {
    "source": "iana"
  },
  "application/conference-info+xml": {
    "source": "iana"
  },
  "application/cpl+xml": {
    "source": "iana"
  },
  "application/csrattrs": {
    "source": "iana"
  },
  "application/csta+xml": {
    "source": "iana"
  },
  "application/cstadata+xml": {
    "source": "iana"
  },
  "application/csvm+json": {
    "source": "iana",
    "compressible": true
  },
  "application/cu-seeme": {
    "source": "apache",
    "extensions": ["cu"]
  },
  "application/cybercash": {
    "source": "iana"
  },
  "application/dart": {
    "compressible": true
  },
  "application/dash+xml": {
    "source": "iana",
    "extensions": ["mdp"]
  },
  "application/dashdelta": {
    "source": "iana"
  },
  "application/davmount+xml": {
    "source": "iana",
    "extensions": ["davmount"]
  },
  "application/dca-rft": {
    "source": "iana"
  },
  "application/dcd": {
    "source": "iana"
  },
  "application/dec-dx": {
    "source": "iana"
  },
  "application/dialog-info+xml": {
    "source": "iana"
  },
  "application/dicom": {
    "source": "iana"
  },
  "application/dii": {
    "source": "iana"
  },
  "application/dit": {
    "source": "iana"
  },
  "application/dns": {
    "source": "iana"
  },
  "application/docbook+xml": {
    "source": "apache",
    "extensions": ["dbk"]
  },
  "application/dskpp+xml": {
    "source": "iana"
  },
  "application/dssc+der": {
    "source": "iana",
    "extensions": ["dssc"]
  },
  "application/dssc+xml": {
    "source": "iana",
    "extensions": ["xdssc"]
  },
  "application/dvcs": {
    "source": "iana"
  },
  "application/ecmascript": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ecma"]
  },
  "application/edi-consent": {
    "source": "iana"
  },
  "application/edi-x12": {
    "source": "iana",
    "compressible": false
  },
  "application/edifact": {
    "source": "iana",
    "compressible": false
  },
  "application/emergencycalldata.comment+xml": {
    "source": "iana"
  },
  "application/emergencycalldata.deviceinfo+xml": {
    "source": "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    "source": "iana"
  },
  "application/emergencycalldata.serviceinfo+xml": {
    "source": "iana"
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    "source": "iana"
  },
  "application/emma+xml": {
    "source": "iana",
    "extensions": ["emma"]
  },
  "application/emotionml+xml": {
    "source": "iana"
  },
  "application/encaprtp": {
    "source": "iana"
  },
  "application/epp+xml": {
    "source": "iana"
  },
  "application/epub+zip": {
    "source": "iana",
    "extensions": ["epub"]
  },
  "application/eshop": {
    "source": "iana"
  },
  "application/exi": {
    "source": "iana",
    "extensions": ["exi"]
  },
  "application/fastinfoset": {
    "source": "iana"
  },
  "application/fastsoap": {
    "source": "iana"
  },
  "application/fdt+xml": {
    "source": "iana"
  },
  "application/fits": {
    "source": "iana"
  },
  "application/font-sfnt": {
    "source": "iana"
  },
  "application/font-tdpfr": {
    "source": "iana",
    "extensions": ["pfr"]
  },
  "application/font-woff": {
    "source": "iana",
    "compressible": false,
    "extensions": ["woff"]
  },
  "application/font-woff2": {
    "compressible": false,
    "extensions": ["woff2"]
  },
  "application/framework-attributes+xml": {
    "source": "iana"
  },
  "application/gml+xml": {
    "source": "apache",
    "extensions": ["gml"]
  },
  "application/gpx+xml": {
    "source": "apache",
    "extensions": ["gpx"]
  },
  "application/gxf": {
    "source": "apache",
    "extensions": ["gxf"]
  },
  "application/gzip": {
    "source": "iana",
    "compressible": false
  },
  "application/h224": {
    "source": "iana"
  },
  "application/held+xml": {
    "source": "iana"
  },
  "application/http": {
    "source": "iana"
  },
  "application/hyperstudio": {
    "source": "iana",
    "extensions": ["stk"]
  },
  "application/ibe-key-request+xml": {
    "source": "iana"
  },
  "application/ibe-pkg-reply+xml": {
    "source": "iana"
  },
  "application/ibe-pp-data": {
    "source": "iana"
  },
  "application/iges": {
    "source": "iana"
  },
  "application/im-iscomposing+xml": {
    "source": "iana"
  },
  "application/index": {
    "source": "iana"
  },
  "application/index.cmd": {
    "source": "iana"
  },
  "application/index.obj": {
    "source": "iana"
  },
  "application/index.response": {
    "source": "iana"
  },
  "application/index.vnd": {
    "source": "iana"
  },
  "application/inkml+xml": {
    "source": "iana",
    "extensions": ["ink","inkml"]
  },
  "application/iotp": {
    "source": "iana"
  },
  "application/ipfix": {
    "source": "iana",
    "extensions": ["ipfix"]
  },
  "application/ipp": {
    "source": "iana"
  },
  "application/isup": {
    "source": "iana"
  },
  "application/its+xml": {
    "source": "iana"
  },
  "application/java-archive": {
    "source": "apache",
    "compressible": false,
    "extensions": ["jar","war","ear"]
  },
  "application/java-serialized-object": {
    "source": "apache",
    "compressible": false,
    "extensions": ["ser"]
  },
  "application/java-vm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["class"]
  },
  "application/javascript": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["js"]
  },
  "application/jose": {
    "source": "iana"
  },
  "application/jose+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jrd+json": {
    "source": "iana",
    "compressible": true
  },
  "application/json": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["json","map"]
  },
  "application/json-patch+json": {
    "source": "iana",
    "compressible": true
  },
  "application/json-seq": {
    "source": "iana"
  },
  "application/json5": {
    "extensions": ["json5"]
  },
  "application/jsonml+json": {
    "source": "apache",
    "compressible": true,
    "extensions": ["jsonml"]
  },
  "application/jwk+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jwk-set+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jwt": {
    "source": "iana"
  },
  "application/kpml-request+xml": {
    "source": "iana"
  },
  "application/kpml-response+xml": {
    "source": "iana"
  },
  "application/ld+json": {
    "source": "iana",
    "compressible": true,
    "extensions": ["jsonld"]
  },
  "application/link-format": {
    "source": "iana"
  },
  "application/load-control+xml": {
    "source": "iana"
  },
  "application/lost+xml": {
    "source": "iana",
    "extensions": ["lostxml"]
  },
  "application/lostsync+xml": {
    "source": "iana"
  },
  "application/lxf": {
    "source": "iana"
  },
  "application/mac-binhex40": {
    "source": "iana",
    "extensions": ["hqx"]
  },
  "application/mac-compactpro": {
    "source": "apache",
    "extensions": ["cpt"]
  },
  "application/macwriteii": {
    "source": "iana"
  },
  "application/mads+xml": {
    "source": "iana",
    "extensions": ["mads"]
  },
  "application/manifest+json": {
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["webmanifest"]
  },
  "application/marc": {
    "source": "iana",
    "extensions": ["mrc"]
  },
  "application/marcxml+xml": {
    "source": "iana",
    "extensions": ["mrcx"]
  },
  "application/mathematica": {
    "source": "iana",
    "extensions": ["ma","nb","mb"]
  },
  "application/mathml+xml": {
    "source": "iana",
    "extensions": ["mathml"]
  },
  "application/mathml-content+xml": {
    "source": "iana"
  },
  "application/mathml-presentation+xml": {
    "source": "iana"
  },
  "application/mbms-associated-procedure-description+xml": {
    "source": "iana"
  },
  "application/mbms-deregister+xml": {
    "source": "iana"
  },
  "application/mbms-envelope+xml": {
    "source": "iana"
  },
  "application/mbms-msk+xml": {
    "source": "iana"
  },
  "application/mbms-msk-response+xml": {
    "source": "iana"
  },
  "application/mbms-protection-description+xml": {
    "source": "iana"
  },
  "application/mbms-reception-report+xml": {
    "source": "iana"
  },
  "application/mbms-register+xml": {
    "source": "iana"
  },
  "application/mbms-register-response+xml": {
    "source": "iana"
  },
  "application/mbms-schedule+xml": {
    "source": "iana"
  },
  "application/mbms-user-service-description+xml": {
    "source": "iana"
  },
  "application/mbox": {
    "source": "iana",
    "extensions": ["mbox"]
  },
  "application/media-policy-dataset+xml": {
    "source": "iana"
  },
  "application/media_control+xml": {
    "source": "iana"
  },
  "application/mediaservercontrol+xml": {
    "source": "iana",
    "extensions": ["mscml"]
  },
  "application/merge-patch+json": {
    "source": "iana",
    "compressible": true
  },
  "application/metalink+xml": {
    "source": "apache",
    "extensions": ["metalink"]
  },
  "application/metalink4+xml": {
    "source": "iana",
    "extensions": ["meta4"]
  },
  "application/mets+xml": {
    "source": "iana",
    "extensions": ["mets"]
  },
  "application/mf4": {
    "source": "iana"
  },
  "application/mikey": {
    "source": "iana"
  },
  "application/mods+xml": {
    "source": "iana",
    "extensions": ["mods"]
  },
  "application/moss-keys": {
    "source": "iana"
  },
  "application/moss-signature": {
    "source": "iana"
  },
  "application/mosskey-data": {
    "source": "iana"
  },
  "application/mosskey-request": {
    "source": "iana"
  },
  "application/mp21": {
    "source": "iana",
    "extensions": ["m21","mp21"]
  },
  "application/mp4": {
    "source": "iana",
    "extensions": ["mp4s","m4p"]
  },
  "application/mpeg4-generic": {
    "source": "iana"
  },
  "application/mpeg4-iod": {
    "source": "iana"
  },
  "application/mpeg4-iod-xmt": {
    "source": "iana"
  },
  "application/mrb-consumer+xml": {
    "source": "iana"
  },
  "application/mrb-publish+xml": {
    "source": "iana"
  },
  "application/msc-ivr+xml": {
    "source": "iana"
  },
  "application/msc-mixer+xml": {
    "source": "iana"
  },
  "application/msword": {
    "source": "iana",
    "compressible": false,
    "extensions": ["doc","dot"]
  },
  "application/mxf": {
    "source": "iana",
    "extensions": ["mxf"]
  },
  "application/nasdata": {
    "source": "iana"
  },
  "application/news-checkgroups": {
    "source": "iana"
  },
  "application/news-groupinfo": {
    "source": "iana"
  },
  "application/news-transmission": {
    "source": "iana"
  },
  "application/nlsml+xml": {
    "source": "iana"
  },
  "application/nss": {
    "source": "iana"
  },
  "application/ocsp-request": {
    "source": "iana"
  },
  "application/ocsp-response": {
    "source": "iana"
  },
  "application/octet-stream": {
    "source": "iana",
    "compressible": false,
    "extensions": ["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]
  },
  "application/oda": {
    "source": "iana",
    "extensions": ["oda"]
  },
  "application/odx": {
    "source": "iana"
  },
  "application/oebps-package+xml": {
    "source": "iana",
    "extensions": ["opf"]
  },
  "application/ogg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ogx"]
  },
  "application/omdoc+xml": {
    "source": "apache",
    "extensions": ["omdoc"]
  },
  "application/onenote": {
    "source": "apache",
    "extensions": ["onetoc","onetoc2","onetmp","onepkg"]
  },
  "application/oxps": {
    "source": "iana",
    "extensions": ["oxps"]
  },
  "application/p2p-overlay+xml": {
    "source": "iana"
  },
  "application/parityfec": {
    "source": "iana"
  },
  "application/patch-ops-error+xml": {
    "source": "iana",
    "extensions": ["xer"]
  },
  "application/pdf": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pdf"]
  },
  "application/pdx": {
    "source": "iana"
  },
  "application/pgp-encrypted": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pgp"]
  },
  "application/pgp-keys": {
    "source": "iana"
  },
  "application/pgp-signature": {
    "source": "iana",
    "extensions": ["asc","sig"]
  },
  "application/pics-rules": {
    "source": "apache",
    "extensions": ["prf"]
  },
  "application/pidf+xml": {
    "source": "iana"
  },
  "application/pidf-diff+xml": {
    "source": "iana"
  },
  "application/pkcs10": {
    "source": "iana",
    "extensions": ["p10"]
  },
  "application/pkcs12": {
    "source": "iana"
  },
  "application/pkcs7-mime": {
    "source": "iana",
    "extensions": ["p7m","p7c"]
  },
  "application/pkcs7-signature": {
    "source": "iana",
    "extensions": ["p7s"]
  },
  "application/pkcs8": {
    "source": "iana",
    "extensions": ["p8"]
  },
  "application/pkix-attr-cert": {
    "source": "iana",
    "extensions": ["ac"]
  },
  "application/pkix-cert": {
    "source": "iana",
    "extensions": ["cer"]
  },
  "application/pkix-crl": {
    "source": "iana",
    "extensions": ["crl"]
  },
  "application/pkix-pkipath": {
    "source": "iana",
    "extensions": ["pkipath"]
  },
  "application/pkixcmp": {
    "source": "iana",
    "extensions": ["pki"]
  },
  "application/pls+xml": {
    "source": "iana",
    "extensions": ["pls"]
  },
  "application/poc-settings+xml": {
    "source": "iana"
  },
  "application/postscript": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ai","eps","ps"]
  },
  "application/provenance+xml": {
    "source": "iana"
  },
  "application/prs.alvestrand.titrax-sheet": {
    "source": "iana"
  },
  "application/prs.cww": {
    "source": "iana",
    "extensions": ["cww"]
  },
  "application/prs.hpub+zip": {
    "source": "iana"
  },
  "application/prs.nprend": {
    "source": "iana"
  },
  "application/prs.plucker": {
    "source": "iana"
  },
  "application/prs.rdf-xml-crypt": {
    "source": "iana"
  },
  "application/prs.xsf+xml": {
    "source": "iana"
  },
  "application/pskc+xml": {
    "source": "iana",
    "extensions": ["pskcxml"]
  },
  "application/qsig": {
    "source": "iana"
  },
  "application/raptorfec": {
    "source": "iana"
  },
  "application/rdap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/rdf+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rdf"]
  },
  "application/reginfo+xml": {
    "source": "iana",
    "extensions": ["rif"]
  },
  "application/relax-ng-compact-syntax": {
    "source": "iana",
    "extensions": ["rnc"]
  },
  "application/remote-printing": {
    "source": "iana"
  },
  "application/reputon+json": {
    "source": "iana",
    "compressible": true
  },
  "application/resource-lists+xml": {
    "source": "iana",
    "extensions": ["rl"]
  },
  "application/resource-lists-diff+xml": {
    "source": "iana",
    "extensions": ["rld"]
  },
  "application/rfc+xml": {
    "source": "iana"
  },
  "application/riscos": {
    "source": "iana"
  },
  "application/rlmi+xml": {
    "source": "iana"
  },
  "application/rls-services+xml": {
    "source": "iana",
    "extensions": ["rs"]
  },
  "application/rpki-ghostbusters": {
    "source": "iana",
    "extensions": ["gbr"]
  },
  "application/rpki-manifest": {
    "source": "iana",
    "extensions": ["mft"]
  },
  "application/rpki-roa": {
    "source": "iana",
    "extensions": ["roa"]
  },
  "application/rpki-updown": {
    "source": "iana"
  },
  "application/rsd+xml": {
    "source": "apache",
    "extensions": ["rsd"]
  },
  "application/rss+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["rss"]
  },
  "application/rtf": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtf"]
  },
  "application/rtploopback": {
    "source": "iana"
  },
  "application/rtx": {
    "source": "iana"
  },
  "application/samlassertion+xml": {
    "source": "iana"
  },
  "application/samlmetadata+xml": {
    "source": "iana"
  },
  "application/sbml+xml": {
    "source": "iana",
    "extensions": ["sbml"]
  },
  "application/scaip+xml": {
    "source": "iana"
  },
  "application/scim+json": {
    "source": "iana",
    "compressible": true
  },
  "application/scvp-cv-request": {
    "source": "iana",
    "extensions": ["scq"]
  },
  "application/scvp-cv-response": {
    "source": "iana",
    "extensions": ["scs"]
  },
  "application/scvp-vp-request": {
    "source": "iana",
    "extensions": ["spq"]
  },
  "application/scvp-vp-response": {
    "source": "iana",
    "extensions": ["spp"]
  },
  "application/sdp": {
    "source": "iana",
    "extensions": ["sdp"]
  },
  "application/sep+xml": {
    "source": "iana"
  },
  "application/sep-exi": {
    "source": "iana"
  },
  "application/session-info": {
    "source": "iana"
  },
  "application/set-payment": {
    "source": "iana"
  },
  "application/set-payment-initiation": {
    "source": "iana",
    "extensions": ["setpay"]
  },
  "application/set-registration": {
    "source": "iana"
  },
  "application/set-registration-initiation": {
    "source": "iana",
    "extensions": ["setreg"]
  },
  "application/sgml": {
    "source": "iana"
  },
  "application/sgml-open-catalog": {
    "source": "iana"
  },
  "application/shf+xml": {
    "source": "iana",
    "extensions": ["shf"]
  },
  "application/sieve": {
    "source": "iana"
  },
  "application/simple-filter+xml": {
    "source": "iana"
  },
  "application/simple-message-summary": {
    "source": "iana"
  },
  "application/simplesymbolcontainer": {
    "source": "iana"
  },
  "application/slate": {
    "source": "iana"
  },
  "application/smil": {
    "source": "iana"
  },
  "application/smil+xml": {
    "source": "iana",
    "extensions": ["smi","smil"]
  },
  "application/smpte336m": {
    "source": "iana"
  },
  "application/soap+fastinfoset": {
    "source": "iana"
  },
  "application/soap+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/sparql-query": {
    "source": "iana",
    "extensions": ["rq"]
  },
  "application/sparql-results+xml": {
    "source": "iana",
    "extensions": ["srx"]
  },
  "application/spirits-event+xml": {
    "source": "iana"
  },
  "application/sql": {
    "source": "iana"
  },
  "application/srgs": {
    "source": "iana",
    "extensions": ["gram"]
  },
  "application/srgs+xml": {
    "source": "iana",
    "extensions": ["grxml"]
  },
  "application/sru+xml": {
    "source": "iana",
    "extensions": ["sru"]
  },
  "application/ssdl+xml": {
    "source": "apache",
    "extensions": ["ssdl"]
  },
  "application/ssml+xml": {
    "source": "iana",
    "extensions": ["ssml"]
  },
  "application/tamp-apex-update": {
    "source": "iana"
  },
  "application/tamp-apex-update-confirm": {
    "source": "iana"
  },
  "application/tamp-community-update": {
    "source": "iana"
  },
  "application/tamp-community-update-confirm": {
    "source": "iana"
  },
  "application/tamp-error": {
    "source": "iana"
  },
  "application/tamp-sequence-adjust": {
    "source": "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    "source": "iana"
  },
  "application/tamp-status-query": {
    "source": "iana"
  },
  "application/tamp-status-response": {
    "source": "iana"
  },
  "application/tamp-update": {
    "source": "iana"
  },
  "application/tamp-update-confirm": {
    "source": "iana"
  },
  "application/tar": {
    "compressible": true
  },
  "application/tei+xml": {
    "source": "iana",
    "extensions": ["tei","teicorpus"]
  },
  "application/thraud+xml": {
    "source": "iana",
    "extensions": ["tfi"]
  },
  "application/timestamp-query": {
    "source": "iana"
  },
  "application/timestamp-reply": {
    "source": "iana"
  },
  "application/timestamped-data": {
    "source": "iana",
    "extensions": ["tsd"]
  },
  "application/ttml+xml": {
    "source": "iana"
  },
  "application/tve-trigger": {
    "source": "iana"
  },
  "application/ulpfec": {
    "source": "iana"
  },
  "application/urc-grpsheet+xml": {
    "source": "iana"
  },
  "application/urc-ressheet+xml": {
    "source": "iana"
  },
  "application/urc-targetdesc+xml": {
    "source": "iana"
  },
  "application/urc-uisocketdesc+xml": {
    "source": "iana"
  },
  "application/vcard+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vcard+xml": {
    "source": "iana"
  },
  "application/vemmi": {
    "source": "iana"
  },
  "application/vividence.scriptfile": {
    "source": "apache"
  },
  "application/vnd.3gpp-prose+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.bsf+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.mid-call+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    "source": "iana",
    "extensions": ["plb"]
  },
  "application/vnd.3gpp.pic-bw-small": {
    "source": "iana",
    "extensions": ["psb"]
  },
  "application/vnd.3gpp.pic-bw-var": {
    "source": "iana",
    "extensions": ["pvb"]
  },
  "application/vnd.3gpp.sms": {
    "source": "iana"
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.ussd+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp2.sms": {
    "source": "iana"
  },
  "application/vnd.3gpp2.tcap": {
    "source": "iana",
    "extensions": ["tcap"]
  },
  "application/vnd.3m.post-it-notes": {
    "source": "iana",
    "extensions": ["pwn"]
  },
  "application/vnd.accpac.simply.aso": {
    "source": "iana",
    "extensions": ["aso"]
  },
  "application/vnd.accpac.simply.imp": {
    "source": "iana",
    "extensions": ["imp"]
  },
  "application/vnd.acucobol": {
    "source": "iana",
    "extensions": ["acu"]
  },
  "application/vnd.acucorp": {
    "source": "iana",
    "extensions": ["atc","acutc"]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    "source": "apache",
    "extensions": ["air"]
  },
  "application/vnd.adobe.flash.movie": {
    "source": "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    "source": "iana",
    "extensions": ["fcdt"]
  },
  "application/vnd.adobe.fxp": {
    "source": "iana",
    "extensions": ["fxp","fxpl"]
  },
  "application/vnd.adobe.partial-upload": {
    "source": "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    "source": "iana",
    "extensions": ["xdp"]
  },
  "application/vnd.adobe.xfdf": {
    "source": "iana",
    "extensions": ["xfdf"]
  },
  "application/vnd.aether.imp": {
    "source": "iana"
  },
  "application/vnd.ah-barcode": {
    "source": "iana"
  },
  "application/vnd.ahead.space": {
    "source": "iana",
    "extensions": ["ahead"]
  },
  "application/vnd.airzip.filesecure.azf": {
    "source": "iana",
    "extensions": ["azf"]
  },
  "application/vnd.airzip.filesecure.azs": {
    "source": "iana",
    "extensions": ["azs"]
  },
  "application/vnd.amazon.ebook": {
    "source": "apache",
    "extensions": ["azw"]
  },
  "application/vnd.americandynamics.acc": {
    "source": "iana",
    "extensions": ["acc"]
  },
  "application/vnd.amiga.ami": {
    "source": "iana",
    "extensions": ["ami"]
  },
  "application/vnd.amundsen.maze+xml": {
    "source": "iana"
  },
  "application/vnd.android.package-archive": {
    "source": "apache",
    "compressible": false,
    "extensions": ["apk"]
  },
  "application/vnd.anki": {
    "source": "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    "source": "iana",
    "extensions": ["cii"]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    "source": "apache",
    "extensions": ["fti"]
  },
  "application/vnd.antix.game-component": {
    "source": "iana",
    "extensions": ["atx"]
  },
  "application/vnd.apache.thrift.binary": {
    "source": "iana"
  },
  "application/vnd.apache.thrift.compact": {
    "source": "iana"
  },
  "application/vnd.apache.thrift.json": {
    "source": "iana"
  },
  "application/vnd.api+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.apple.installer+xml": {
    "source": "iana",
    "extensions": ["mpkg"]
  },
  "application/vnd.apple.mpegurl": {
    "source": "iana",
    "extensions": ["m3u8"]
  },
  "application/vnd.apple.pkpass": {
    "compressible": false,
    "extensions": ["pkpass"]
  },
  "application/vnd.arastra.swi": {
    "source": "iana"
  },
  "application/vnd.aristanetworks.swi": {
    "source": "iana",
    "extensions": ["swi"]
  },
  "application/vnd.artsquare": {
    "source": "iana"
  },
  "application/vnd.astraea-software.iota": {
    "source": "iana",
    "extensions": ["iota"]
  },
  "application/vnd.audiograph": {
    "source": "iana",
    "extensions": ["aep"]
  },
  "application/vnd.autopackage": {
    "source": "iana"
  },
  "application/vnd.avistar+xml": {
    "source": "iana"
  },
  "application/vnd.balsamiq.bmml+xml": {
    "source": "iana"
  },
  "application/vnd.balsamiq.bmpr": {
    "source": "iana"
  },
  "application/vnd.bekitzur-stech+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.biopax.rdf+xml": {
    "source": "iana"
  },
  "application/vnd.blueice.multipass": {
    "source": "iana",
    "extensions": ["mpm"]
  },
  "application/vnd.bluetooth.ep.oob": {
    "source": "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    "source": "iana"
  },
  "application/vnd.bmi": {
    "source": "iana",
    "extensions": ["bmi"]
  },
  "application/vnd.businessobjects": {
    "source": "iana",
    "extensions": ["rep"]
  },
  "application/vnd.cab-jscript": {
    "source": "iana"
  },
  "application/vnd.canon-cpdl": {
    "source": "iana"
  },
  "application/vnd.canon-lips": {
    "source": "iana"
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    "source": "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    "source": "iana"
  },
  "application/vnd.chemdraw+xml": {
    "source": "iana",
    "extensions": ["cdxml"]
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    "source": "iana",
    "extensions": ["mmd"]
  },
  "application/vnd.cinderella": {
    "source": "iana",
    "extensions": ["cdy"]
  },
  "application/vnd.cirpack.isdn-ext": {
    "source": "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    "source": "iana"
  },
  "application/vnd.claymore": {
    "source": "iana",
    "extensions": ["cla"]
  },
  "application/vnd.cloanto.rp9": {
    "source": "iana",
    "extensions": ["rp9"]
  },
  "application/vnd.clonk.c4group": {
    "source": "iana",
    "extensions": ["c4g","c4d","c4f","c4p","c4u"]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    "source": "iana",
    "extensions": ["c11amc"]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    "source": "iana",
    "extensions": ["c11amz"]
  },
  "application/vnd.coffeescript": {
    "source": "iana"
  },
  "application/vnd.collection+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.collection.doc+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.collection.next+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.commerce-battelle": {
    "source": "iana"
  },
  "application/vnd.commonspace": {
    "source": "iana",
    "extensions": ["csp"]
  },
  "application/vnd.contact.cmsg": {
    "source": "iana",
    "extensions": ["cdbcmsg"]
  },
  "application/vnd.cosmocaller": {
    "source": "iana",
    "extensions": ["cmc"]
  },
  "application/vnd.crick.clicker": {
    "source": "iana",
    "extensions": ["clkx"]
  },
  "application/vnd.crick.clicker.keyboard": {
    "source": "iana",
    "extensions": ["clkk"]
  },
  "application/vnd.crick.clicker.palette": {
    "source": "iana",
    "extensions": ["clkp"]
  },
  "application/vnd.crick.clicker.template": {
    "source": "iana",
    "extensions": ["clkt"]
  },
  "application/vnd.crick.clicker.wordbank": {
    "source": "iana",
    "extensions": ["clkw"]
  },
  "application/vnd.criticaltools.wbs+xml": {
    "source": "iana",
    "extensions": ["wbs"]
  },
  "application/vnd.ctc-posml": {
    "source": "iana",
    "extensions": ["pml"]
  },
  "application/vnd.ctct.ws+xml": {
    "source": "iana"
  },
  "application/vnd.cups-pdf": {
    "source": "iana"
  },
  "application/vnd.cups-postscript": {
    "source": "iana"
  },
  "application/vnd.cups-ppd": {
    "source": "iana",
    "extensions": ["ppd"]
  },
  "application/vnd.cups-raster": {
    "source": "iana"
  },
  "application/vnd.cups-raw": {
    "source": "iana"
  },
  "application/vnd.curl": {
    "source": "iana"
  },
  "application/vnd.curl.car": {
    "source": "apache",
    "extensions": ["car"]
  },
  "application/vnd.curl.pcurl": {
    "source": "apache",
    "extensions": ["pcurl"]
  },
  "application/vnd.cyan.dean.root+xml": {
    "source": "iana"
  },
  "application/vnd.cybank": {
    "source": "iana"
  },
  "application/vnd.dart": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dart"]
  },
  "application/vnd.data-vision.rdz": {
    "source": "iana",
    "extensions": ["rdz"]
  },
  "application/vnd.debian.binary-package": {
    "source": "iana"
  },
  "application/vnd.dece.data": {
    "source": "iana",
    "extensions": ["uvf","uvvf","uvd","uvvd"]
  },
  "application/vnd.dece.ttml+xml": {
    "source": "iana",
    "extensions": ["uvt","uvvt"]
  },
  "application/vnd.dece.unspecified": {
    "source": "iana",
    "extensions": ["uvx","uvvx"]
  },
  "application/vnd.dece.zip": {
    "source": "iana",
    "extensions": ["uvz","uvvz"]
  },
  "application/vnd.denovo.fcselayout-link": {
    "source": "iana",
    "extensions": ["fe_launch"]
  },
  "application/vnd.desmume-movie": {
    "source": "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    "source": "iana"
  },
  "application/vnd.dm.delegation+xml": {
    "source": "iana"
  },
  "application/vnd.dna": {
    "source": "iana",
    "extensions": ["dna"]
  },
  "application/vnd.document+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dolby.mlp": {
    "source": "apache",
    "extensions": ["mlp"]
  },
  "application/vnd.dolby.mobile.1": {
    "source": "iana"
  },
  "application/vnd.dolby.mobile.2": {
    "source": "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    "source": "iana"
  },
  "application/vnd.dpgraph": {
    "source": "iana",
    "extensions": ["dpg"]
  },
  "application/vnd.dreamfactory": {
    "source": "iana",
    "extensions": ["dfac"]
  },
  "application/vnd.drive+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ds-keypoint": {
    "source": "apache",
    "extensions": ["kpxx"]
  },
  "application/vnd.dtg.local": {
    "source": "iana"
  },
  "application/vnd.dtg.local.flash": {
    "source": "iana"
  },
  "application/vnd.dtg.local.html": {
    "source": "iana"
  },
  "application/vnd.dvb.ait": {
    "source": "iana",
    "extensions": ["ait"]
  },
  "application/vnd.dvb.dvbj": {
    "source": "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    "source": "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    "source": "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-container+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-generic+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-init+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.pfr": {
    "source": "iana"
  },
  "application/vnd.dvb.service": {
    "source": "iana",
    "extensions": ["svc"]
  },
  "application/vnd.dxr": {
    "source": "iana"
  },
  "application/vnd.dynageo": {
    "source": "iana",
    "extensions": ["geo"]
  },
  "application/vnd.dzr": {
    "source": "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    "source": "iana"
  },
  "application/vnd.ecdis-update": {
    "source": "iana"
  },
  "application/vnd.ecowin.chart": {
    "source": "iana",
    "extensions": ["mag"]
  },
  "application/vnd.ecowin.filerequest": {
    "source": "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    "source": "iana"
  },
  "application/vnd.ecowin.series": {
    "source": "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    "source": "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    "source": "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    "source": "iana"
  },
  "application/vnd.enliven": {
    "source": "iana",
    "extensions": ["nml"]
  },
  "application/vnd.enphase.envoy": {
    "source": "iana"
  },
  "application/vnd.eprints.data+xml": {
    "source": "iana"
  },
  "application/vnd.epson.esf": {
    "source": "iana",
    "extensions": ["esf"]
  },
  "application/vnd.epson.msf": {
    "source": "iana",
    "extensions": ["msf"]
  },
  "application/vnd.epson.quickanime": {
    "source": "iana",
    "extensions": ["qam"]
  },
  "application/vnd.epson.salt": {
    "source": "iana",
    "extensions": ["slt"]
  },
  "application/vnd.epson.ssf": {
    "source": "iana",
    "extensions": ["ssf"]
  },
  "application/vnd.ericsson.quickcall": {
    "source": "iana"
  },
  "application/vnd.eszigno3+xml": {
    "source": "iana",
    "extensions": ["es3","et3"]
  },
  "application/vnd.etsi.aoc+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.asic-e+zip": {
    "source": "iana"
  },
  "application/vnd.etsi.asic-s+zip": {
    "source": "iana"
  },
  "application/vnd.etsi.cug+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvcommand+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvprofile+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvservice+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvsync+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.mcid+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.mheg5": {
    "source": "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.pstn+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.sci+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.simservs+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.timestamp-token": {
    "source": "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.tsl.der": {
    "source": "iana"
  },
  "application/vnd.eudora.data": {
    "source": "iana"
  },
  "application/vnd.ezpix-album": {
    "source": "iana",
    "extensions": ["ez2"]
  },
  "application/vnd.ezpix-package": {
    "source": "iana",
    "extensions": ["ez3"]
  },
  "application/vnd.f-secure.mobile": {
    "source": "iana"
  },
  "application/vnd.fastcopy-disk-image": {
    "source": "iana"
  },
  "application/vnd.fdf": {
    "source": "iana",
    "extensions": ["fdf"]
  },
  "application/vnd.fdsn.mseed": {
    "source": "iana",
    "extensions": ["mseed"]
  },
  "application/vnd.fdsn.seed": {
    "source": "iana",
    "extensions": ["seed","dataless"]
  },
  "application/vnd.ffsns": {
    "source": "iana"
  },
  "application/vnd.filmit.zfc": {
    "source": "iana"
  },
  "application/vnd.fints": {
    "source": "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    "source": "iana"
  },
  "application/vnd.flographit": {
    "source": "iana",
    "extensions": ["gph"]
  },
  "application/vnd.fluxtime.clip": {
    "source": "iana",
    "extensions": ["ftc"]
  },
  "application/vnd.font-fontforge-sfd": {
    "source": "iana"
  },
  "application/vnd.framemaker": {
    "source": "iana",
    "extensions": ["fm","frame","maker","book"]
  },
  "application/vnd.frogans.fnc": {
    "source": "iana",
    "extensions": ["fnc"]
  },
  "application/vnd.frogans.ltf": {
    "source": "iana",
    "extensions": ["ltf"]
  },
  "application/vnd.fsc.weblaunch": {
    "source": "iana",
    "extensions": ["fsc"]
  },
  "application/vnd.fujitsu.oasys": {
    "source": "iana",
    "extensions": ["oas"]
  },
  "application/vnd.fujitsu.oasys2": {
    "source": "iana",
    "extensions": ["oa2"]
  },
  "application/vnd.fujitsu.oasys3": {
    "source": "iana",
    "extensions": ["oa3"]
  },
  "application/vnd.fujitsu.oasysgp": {
    "source": "iana",
    "extensions": ["fg5"]
  },
  "application/vnd.fujitsu.oasysprs": {
    "source": "iana",
    "extensions": ["bh2"]
  },
  "application/vnd.fujixerox.art-ex": {
    "source": "iana"
  },
  "application/vnd.fujixerox.art4": {
    "source": "iana"
  },
  "application/vnd.fujixerox.ddd": {
    "source": "iana",
    "extensions": ["ddd"]
  },
  "application/vnd.fujixerox.docuworks": {
    "source": "iana",
    "extensions": ["xdw"]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    "source": "iana",
    "extensions": ["xbd"]
  },
  "application/vnd.fujixerox.docuworks.container": {
    "source": "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    "source": "iana"
  },
  "application/vnd.fut-misnet": {
    "source": "iana"
  },
  "application/vnd.fuzzysheet": {
    "source": "iana",
    "extensions": ["fzs"]
  },
  "application/vnd.genomatix.tuxedo": {
    "source": "iana",
    "extensions": ["txd"]
  },
  "application/vnd.geo+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.geocube+xml": {
    "source": "iana"
  },
  "application/vnd.geogebra.file": {
    "source": "iana",
    "extensions": ["ggb"]
  },
  "application/vnd.geogebra.tool": {
    "source": "iana",
    "extensions": ["ggt"]
  },
  "application/vnd.geometry-explorer": {
    "source": "iana",
    "extensions": ["gex","gre"]
  },
  "application/vnd.geonext": {
    "source": "iana",
    "extensions": ["gxt"]
  },
  "application/vnd.geoplan": {
    "source": "iana",
    "extensions": ["g2w"]
  },
  "application/vnd.geospace": {
    "source": "iana",
    "extensions": ["g3w"]
  },
  "application/vnd.gerber": {
    "source": "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    "source": "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    "source": "iana"
  },
  "application/vnd.gmx": {
    "source": "iana",
    "extensions": ["gmx"]
  },
  "application/vnd.google-apps.document": {
    "compressible": false,
    "extensions": ["gdoc"]
  },
  "application/vnd.google-apps.presentation": {
    "compressible": false,
    "extensions": ["gslides"]
  },
  "application/vnd.google-apps.spreadsheet": {
    "compressible": false,
    "extensions": ["gsheet"]
  },
  "application/vnd.google-earth.kml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["kml"]
  },
  "application/vnd.google-earth.kmz": {
    "source": "iana",
    "compressible": false,
    "extensions": ["kmz"]
  },
  "application/vnd.gov.sk.e-form+xml": {
    "source": "iana"
  },
  "application/vnd.gov.sk.e-form+zip": {
    "source": "iana"
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    "source": "iana"
  },
  "application/vnd.grafeq": {
    "source": "iana",
    "extensions": ["gqf","gqs"]
  },
  "application/vnd.gridmp": {
    "source": "iana"
  },
  "application/vnd.groove-account": {
    "source": "iana",
    "extensions": ["gac"]
  },
  "application/vnd.groove-help": {
    "source": "iana",
    "extensions": ["ghf"]
  },
  "application/vnd.groove-identity-message": {
    "source": "iana",
    "extensions": ["gim"]
  },
  "application/vnd.groove-injector": {
    "source": "iana",
    "extensions": ["grv"]
  },
  "application/vnd.groove-tool-message": {
    "source": "iana",
    "extensions": ["gtm"]
  },
  "application/vnd.groove-tool-template": {
    "source": "iana",
    "extensions": ["tpl"]
  },
  "application/vnd.groove-vcard": {
    "source": "iana",
    "extensions": ["vcg"]
  },
  "application/vnd.hal+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hal+xml": {
    "source": "iana",
    "extensions": ["hal"]
  },
  "application/vnd.handheld-entertainment+xml": {
    "source": "iana",
    "extensions": ["zmm"]
  },
  "application/vnd.hbci": {
    "source": "iana",
    "extensions": ["hbci"]
  },
  "application/vnd.hcl-bireports": {
    "source": "iana"
  },
  "application/vnd.heroku+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hhe.lesson-player": {
    "source": "iana",
    "extensions": ["les"]
  },
  "application/vnd.hp-hpgl": {
    "source": "iana",
    "extensions": ["hpgl"]
  },
  "application/vnd.hp-hpid": {
    "source": "iana",
    "extensions": ["hpid"]
  },
  "application/vnd.hp-hps": {
    "source": "iana",
    "extensions": ["hps"]
  },
  "application/vnd.hp-jlyt": {
    "source": "iana",
    "extensions": ["jlt"]
  },
  "application/vnd.hp-pcl": {
    "source": "iana",
    "extensions": ["pcl"]
  },
  "application/vnd.hp-pclxl": {
    "source": "iana",
    "extensions": ["pclxl"]
  },
  "application/vnd.httphone": {
    "source": "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    "source": "iana",
    "extensions": ["sfd-hdstx"]
  },
  "application/vnd.hyperdrive+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hzn-3d-crossword": {
    "source": "iana"
  },
  "application/vnd.ibm.afplinedata": {
    "source": "iana"
  },
  "application/vnd.ibm.electronic-media": {
    "source": "iana"
  },
  "application/vnd.ibm.minipay": {
    "source": "iana",
    "extensions": ["mpy"]
  },
  "application/vnd.ibm.modcap": {
    "source": "iana",
    "extensions": ["afp","listafp","list3820"]
  },
  "application/vnd.ibm.rights-management": {
    "source": "iana",
    "extensions": ["irm"]
  },
  "application/vnd.ibm.secure-container": {
    "source": "iana",
    "extensions": ["sc"]
  },
  "application/vnd.iccprofile": {
    "source": "iana",
    "extensions": ["icc","icm"]
  },
  "application/vnd.ieee.1905": {
    "source": "iana"
  },
  "application/vnd.igloader": {
    "source": "iana",
    "extensions": ["igl"]
  },
  "application/vnd.immervision-ivp": {
    "source": "iana",
    "extensions": ["ivp"]
  },
  "application/vnd.immervision-ivu": {
    "source": "iana",
    "extensions": ["ivu"]
  },
  "application/vnd.ims.imsccv1p1": {
    "source": "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    "source": "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    "source": "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.informedcontrol.rms+xml": {
    "source": "iana"
  },
  "application/vnd.informix-visionary": {
    "source": "iana"
  },
  "application/vnd.infotech.project": {
    "source": "iana"
  },
  "application/vnd.infotech.project+xml": {
    "source": "iana"
  },
  "application/vnd.innopath.wamp.notification": {
    "source": "iana"
  },
  "application/vnd.insors.igm": {
    "source": "iana",
    "extensions": ["igm"]
  },
  "application/vnd.intercon.formnet": {
    "source": "iana",
    "extensions": ["xpw","xpx"]
  },
  "application/vnd.intergeo": {
    "source": "iana",
    "extensions": ["i2g"]
  },
  "application/vnd.intertrust.digibox": {
    "source": "iana"
  },
  "application/vnd.intertrust.nncp": {
    "source": "iana"
  },
  "application/vnd.intu.qbo": {
    "source": "iana",
    "extensions": ["qbo"]
  },
  "application/vnd.intu.qfx": {
    "source": "iana",
    "extensions": ["qfx"]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    "source": "iana"
  },
  "application/vnd.ipunplugged.rcprofile": {
    "source": "iana",
    "extensions": ["rcprofile"]
  },
  "application/vnd.irepository.package+xml": {
    "source": "iana",
    "extensions": ["irp"]
  },
  "application/vnd.is-xpr": {
    "source": "iana",
    "extensions": ["xpr"]
  },
  "application/vnd.isac.fcs": {
    "source": "iana",
    "extensions": ["fcs"]
  },
  "application/vnd.jam": {
    "source": "iana",
    "extensions": ["jam"]
  },
  "application/vnd.japannet-directory-service": {
    "source": "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-registration": {
    "source": "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-verification": {
    "source": "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    "source": "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    "source": "iana",
    "extensions": ["rms"]
  },
  "application/vnd.jisp": {
    "source": "iana",
    "extensions": ["jisp"]
  },
  "application/vnd.joost.joda-archive": {
    "source": "iana",
    "extensions": ["joda"]
  },
  "application/vnd.jsk.isdn-ngn": {
    "source": "iana"
  },
  "application/vnd.kahootz": {
    "source": "iana",
    "extensions": ["ktz","ktr"]
  },
  "application/vnd.kde.karbon": {
    "source": "iana",
    "extensions": ["karbon"]
  },
  "application/vnd.kde.kchart": {
    "source": "iana",
    "extensions": ["chrt"]
  },
  "application/vnd.kde.kformula": {
    "source": "iana",
    "extensions": ["kfo"]
  },
  "application/vnd.kde.kivio": {
    "source": "iana",
    "extensions": ["flw"]
  },
  "application/vnd.kde.kontour": {
    "source": "iana",
    "extensions": ["kon"]
  },
  "application/vnd.kde.kpresenter": {
    "source": "iana",
    "extensions": ["kpr","kpt"]
  },
  "application/vnd.kde.kspread": {
    "source": "iana",
    "extensions": ["ksp"]
  },
  "application/vnd.kde.kword": {
    "source": "iana",
    "extensions": ["kwd","kwt"]
  },
  "application/vnd.kenameaapp": {
    "source": "iana",
    "extensions": ["htke"]
  },
  "application/vnd.kidspiration": {
    "source": "iana",
    "extensions": ["kia"]
  },
  "application/vnd.kinar": {
    "source": "iana",
    "extensions": ["kne","knp"]
  },
  "application/vnd.koan": {
    "source": "iana",
    "extensions": ["skp","skd","skt","skm"]
  },
  "application/vnd.kodak-descriptor": {
    "source": "iana",
    "extensions": ["sse"]
  },
  "application/vnd.las.las+xml": {
    "source": "iana",
    "extensions": ["lasxml"]
  },
  "application/vnd.liberty-request+xml": {
    "source": "iana"
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    "source": "iana",
    "extensions": ["lbd"]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    "source": "iana",
    "extensions": ["lbe"]
  },
  "application/vnd.lotus-1-2-3": {
    "source": "iana",
    "extensions": ["123"]
  },
  "application/vnd.lotus-approach": {
    "source": "iana",
    "extensions": ["apr"]
  },
  "application/vnd.lotus-freelance": {
    "source": "iana",
    "extensions": ["pre"]
  },
  "application/vnd.lotus-notes": {
    "source": "iana",
    "extensions": ["nsf"]
  },
  "application/vnd.lotus-organizer": {
    "source": "iana",
    "extensions": ["org"]
  },
  "application/vnd.lotus-screencam": {
    "source": "iana",
    "extensions": ["scm"]
  },
  "application/vnd.lotus-wordpro": {
    "source": "iana",
    "extensions": ["lwp"]
  },
  "application/vnd.macports.portpkg": {
    "source": "iana",
    "extensions": ["portpkg"]
  },
  "application/vnd.mapbox-vector-tile": {
    "source": "iana"
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    "source": "iana"
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    "source": "iana"
  },
  "application/vnd.marlin.drm.license+xml": {
    "source": "iana"
  },
  "application/vnd.marlin.drm.mdcf": {
    "source": "iana"
  },
  "application/vnd.mason+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.maxmind.maxmind-db": {
    "source": "iana"
  },
  "application/vnd.mcd": {
    "source": "iana",
    "extensions": ["mcd"]
  },
  "application/vnd.medcalcdata": {
    "source": "iana",
    "extensions": ["mc1"]
  },
  "application/vnd.mediastation.cdkey": {
    "source": "iana",
    "extensions": ["cdkey"]
  },
  "application/vnd.meridian-slingshot": {
    "source": "iana"
  },
  "application/vnd.mfer": {
    "source": "iana",
    "extensions": ["mwf"]
  },
  "application/vnd.mfmp": {
    "source": "iana",
    "extensions": ["mfm"]
  },
  "application/vnd.micro+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.micrografx.flo": {
    "source": "iana",
    "extensions": ["flo"]
  },
  "application/vnd.micrografx.igx": {
    "source": "iana",
    "extensions": ["igx"]
  },
  "application/vnd.microsoft.portable-executable": {
    "source": "iana"
  },
  "application/vnd.miele+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.mif": {
    "source": "iana",
    "extensions": ["mif"]
  },
  "application/vnd.minisoft-hp3000-save": {
    "source": "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    "source": "iana"
  },
  "application/vnd.mobius.daf": {
    "source": "iana",
    "extensions": ["daf"]
  },
  "application/vnd.mobius.dis": {
    "source": "iana",
    "extensions": ["dis"]
  },
  "application/vnd.mobius.mbk": {
    "source": "iana",
    "extensions": ["mbk"]
  },
  "application/vnd.mobius.mqy": {
    "source": "iana",
    "extensions": ["mqy"]
  },
  "application/vnd.mobius.msl": {
    "source": "iana",
    "extensions": ["msl"]
  },
  "application/vnd.mobius.plc": {
    "source": "iana",
    "extensions": ["plc"]
  },
  "application/vnd.mobius.txf": {
    "source": "iana",
    "extensions": ["txf"]
  },
  "application/vnd.mophun.application": {
    "source": "iana",
    "extensions": ["mpn"]
  },
  "application/vnd.mophun.certificate": {
    "source": "iana",
    "extensions": ["mpc"]
  },
  "application/vnd.motorola.flexsuite": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    "source": "iana"
  },
  "application/vnd.motorola.iprm": {
    "source": "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xul"]
  },
  "application/vnd.ms-3mfdocument": {
    "source": "iana"
  },
  "application/vnd.ms-artgalry": {
    "source": "iana",
    "extensions": ["cil"]
  },
  "application/vnd.ms-asf": {
    "source": "iana"
  },
  "application/vnd.ms-cab-compressed": {
    "source": "iana",
    "extensions": ["cab"]
  },
  "application/vnd.ms-color.iccprofile": {
    "source": "apache"
  },
  "application/vnd.ms-excel": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xls","xlm","xla","xlc","xlt","xlw"]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlam"]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlsb"]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlsm"]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["xltm"]
  },
  "application/vnd.ms-fontobject": {
    "source": "iana",
    "compressible": true,
    "extensions": ["eot"]
  },
  "application/vnd.ms-htmlhelp": {
    "source": "iana",
    "extensions": ["chm"]
  },
  "application/vnd.ms-ims": {
    "source": "iana",
    "extensions": ["ims"]
  },
  "application/vnd.ms-lrm": {
    "source": "iana",
    "extensions": ["lrm"]
  },
  "application/vnd.ms-office.activex+xml": {
    "source": "iana"
  },
  "application/vnd.ms-officetheme": {
    "source": "iana",
    "extensions": ["thmx"]
  },
  "application/vnd.ms-opentype": {
    "source": "apache",
    "compressible": true
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    "source": "apache"
  },
  "application/vnd.ms-pki.seccat": {
    "source": "apache",
    "extensions": ["cat"]
  },
  "application/vnd.ms-pki.stl": {
    "source": "apache",
    "extensions": ["stl"]
  },
  "application/vnd.ms-playready.initiator+xml": {
    "source": "iana"
  },
  "application/vnd.ms-powerpoint": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ppt","pps","pot"]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    "source": "iana",
    "extensions": ["ppam"]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    "source": "iana",
    "extensions": ["pptm"]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    "source": "iana",
    "extensions": ["sldm"]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    "source": "iana",
    "extensions": ["ppsm"]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["potm"]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    "source": "iana"
  },
  "application/vnd.ms-printing.printticket+xml": {
    "source": "apache"
  },
  "application/vnd.ms-project": {
    "source": "iana",
    "extensions": ["mpp","mpt"]
  },
  "application/vnd.ms-tnef": {
    "source": "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    "source": "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    "source": "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    "source": "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    "source": "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    "source": "iana",
    "extensions": ["docm"]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["dotm"]
  },
  "application/vnd.ms-works": {
    "source": "iana",
    "extensions": ["wps","wks","wcm","wdb"]
  },
  "application/vnd.ms-wpl": {
    "source": "iana",
    "extensions": ["wpl"]
  },
  "application/vnd.ms-xpsdocument": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xps"]
  },
  "application/vnd.msa-disk-image": {
    "source": "iana"
  },
  "application/vnd.mseq": {
    "source": "iana",
    "extensions": ["mseq"]
  },
  "application/vnd.msign": {
    "source": "iana"
  },
  "application/vnd.multiad.creator": {
    "source": "iana"
  },
  "application/vnd.multiad.creator.cif": {
    "source": "iana"
  },
  "application/vnd.music-niff": {
    "source": "iana"
  },
  "application/vnd.musician": {
    "source": "iana",
    "extensions": ["mus"]
  },
  "application/vnd.muvee.style": {
    "source": "iana",
    "extensions": ["msty"]
  },
  "application/vnd.mynfc": {
    "source": "iana",
    "extensions": ["taglet"]
  },
  "application/vnd.ncd.control": {
    "source": "iana"
  },
  "application/vnd.ncd.reference": {
    "source": "iana"
  },
  "application/vnd.nervana": {
    "source": "iana"
  },
  "application/vnd.netfpx": {
    "source": "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    "source": "iana",
    "extensions": ["nlu"]
  },
  "application/vnd.nintendo.nitro.rom": {
    "source": "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    "source": "iana"
  },
  "application/vnd.nitf": {
    "source": "iana",
    "extensions": ["ntf","nitf"]
  },
  "application/vnd.noblenet-directory": {
    "source": "iana",
    "extensions": ["nnd"]
  },
  "application/vnd.noblenet-sealer": {
    "source": "iana",
    "extensions": ["nns"]
  },
  "application/vnd.noblenet-web": {
    "source": "iana",
    "extensions": ["nnw"]
  },
  "application/vnd.nokia.catalogs": {
    "source": "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    "source": "iana"
  },
  "application/vnd.nokia.conml+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.iptv.config+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.isds-radio-presets": {
    "source": "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    "source": "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.n-gage.data": {
    "source": "iana",
    "extensions": ["ngdat"]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    "source": "iana",
    "extensions": ["n-gage"]
  },
  "application/vnd.nokia.ncd": {
    "source": "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    "source": "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.radio-preset": {
    "source": "iana",
    "extensions": ["rpst"]
  },
  "application/vnd.nokia.radio-presets": {
    "source": "iana",
    "extensions": ["rpss"]
  },
  "application/vnd.novadigm.edm": {
    "source": "iana",
    "extensions": ["edm"]
  },
  "application/vnd.novadigm.edx": {
    "source": "iana",
    "extensions": ["edx"]
  },
  "application/vnd.novadigm.ext": {
    "source": "iana",
    "extensions": ["ext"]
  },
  "application/vnd.ntt-local.content-share": {
    "source": "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    "source": "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    "source": "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    "source": "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    "source": "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    "source": "iana",
    "extensions": ["odc"]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    "source": "iana",
    "extensions": ["otc"]
  },
  "application/vnd.oasis.opendocument.database": {
    "source": "iana",
    "extensions": ["odb"]
  },
  "application/vnd.oasis.opendocument.formula": {
    "source": "iana",
    "extensions": ["odf"]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    "source": "iana",
    "extensions": ["odft"]
  },
  "application/vnd.oasis.opendocument.graphics": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odg"]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    "source": "iana",
    "extensions": ["otg"]
  },
  "application/vnd.oasis.opendocument.image": {
    "source": "iana",
    "extensions": ["odi"]
  },
  "application/vnd.oasis.opendocument.image-template": {
    "source": "iana",
    "extensions": ["oti"]
  },
  "application/vnd.oasis.opendocument.presentation": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odp"]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    "source": "iana",
    "extensions": ["otp"]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ods"]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    "source": "iana",
    "extensions": ["ots"]
  },
  "application/vnd.oasis.opendocument.text": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odt"]
  },
  "application/vnd.oasis.opendocument.text-master": {
    "source": "iana",
    "extensions": ["odm"]
  },
  "application/vnd.oasis.opendocument.text-template": {
    "source": "iana",
    "extensions": ["ott"]
  },
  "application/vnd.oasis.opendocument.text-web": {
    "source": "iana",
    "extensions": ["oth"]
  },
  "application/vnd.obn": {
    "source": "iana"
  },
  "application/vnd.oftn.l10n+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.cspg-hexbinary": {
    "source": "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.pae.gem": {
    "source": "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.spdlist+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.ueprofile+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.userprofile+xml": {
    "source": "iana"
  },
  "application/vnd.olpc-sugar": {
    "source": "iana",
    "extensions": ["xo"]
  },
  "application/vnd.oma-scws-config": {
    "source": "iana"
  },
  "application/vnd.oma-scws-http-request": {
    "source": "iana"
  },
  "application/vnd.oma-scws-http-response": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.imd+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.ltkm": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sgdu": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sprov+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.stkm": {
    "source": "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    "source": "iana"
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    "source": "iana"
  },
  "application/vnd.oma.cab-pcc+xml": {
    "source": "iana"
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    "source": "iana"
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    "source": "iana"
  },
  "application/vnd.oma.dcd": {
    "source": "iana"
  },
  "application/vnd.oma.dcdc": {
    "source": "iana"
  },
  "application/vnd.oma.dd2+xml": {
    "source": "iana",
    "extensions": ["dd2"]
  },
  "application/vnd.oma.drm.risd+xml": {
    "source": "iana"
  },
  "application/vnd.oma.group-usage-list+xml": {
    "source": "iana"
  },
  "application/vnd.oma.pal+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.final-report+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.groups+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    "source": "iana"
  },
  "application/vnd.oma.push": {
    "source": "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    "source": "iana"
  },
  "application/vnd.oma.xcap-directory+xml": {
    "source": "iana"
  },
  "application/vnd.omads-email+xml": {
    "source": "iana"
  },
  "application/vnd.omads-file+xml": {
    "source": "iana"
  },
  "application/vnd.omads-folder+xml": {
    "source": "iana"
  },
  "application/vnd.omaloc-supl-init": {
    "source": "iana"
  },
  "application/vnd.openblox.game+xml": {
    "source": "iana"
  },
  "application/vnd.openblox.game-binary": {
    "source": "iana"
  },
  "application/vnd.openeye.oeb": {
    "source": "iana"
  },
  "application/vnd.openofficeorg.extension": {
    "source": "apache",
    "extensions": ["oxt"]
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml-template": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pptx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    "source": "iana",
    "extensions": ["sldx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    "source": "iana",
    "extensions": ["ppsx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    "source": "apache",
    "extensions": ["potx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml-template": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xlsx"]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    "source": "apache",
    "extensions": ["xltx"]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml-template": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    "source": "iana",
    "compressible": false,
    "extensions": ["docx"]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    "source": "apache",
    "extensions": ["dotx"]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    "source": "iana"
  },
  "application/vnd.oracle.resource+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.orange.indata": {
    "source": "iana"
  },
  "application/vnd.osa.netdeploy": {
    "source": "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    "source": "iana",
    "extensions": ["mgp"]
  },
  "application/vnd.osgi.bundle": {
    "source": "iana"
  },
  "application/vnd.osgi.dp": {
    "source": "iana",
    "extensions": ["dp"]
  },
  "application/vnd.osgi.subsystem": {
    "source": "iana",
    "extensions": ["esa"]
  },
  "application/vnd.otps.ct-kip+xml": {
    "source": "iana"
  },
  "application/vnd.oxli.countgraph": {
    "source": "iana"
  },
  "application/vnd.pagerduty+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.palm": {
    "source": "iana",
    "extensions": ["pdb","pqa","oprc"]
  },
  "application/vnd.panoply": {
    "source": "iana"
  },
  "application/vnd.paos+xml": {
    "source": "iana"
  },
  "application/vnd.paos.xml": {
    "source": "apache"
  },
  "application/vnd.pawaafile": {
    "source": "iana",
    "extensions": ["paw"]
  },
  "application/vnd.pcos": {
    "source": "iana"
  },
  "application/vnd.pg.format": {
    "source": "iana",
    "extensions": ["str"]
  },
  "application/vnd.pg.osasli": {
    "source": "iana",
    "extensions": ["ei6"]
  },
  "application/vnd.piaccess.application-licence": {
    "source": "iana"
  },
  "application/vnd.picsel": {
    "source": "iana",
    "extensions": ["efif"]
  },
  "application/vnd.pmi.widget": {
    "source": "iana",
    "extensions": ["wg"]
  },
  "application/vnd.poc.group-advertisement+xml": {
    "source": "iana"
  },
  "application/vnd.pocketlearn": {
    "source": "iana",
    "extensions": ["plf"]
  },
  "application/vnd.powerbuilder6": {
    "source": "iana",
    "extensions": ["pbd"]
  },
  "application/vnd.powerbuilder6-s": {
    "source": "iana"
  },
  "application/vnd.powerbuilder7": {
    "source": "iana"
  },
  "application/vnd.powerbuilder7-s": {
    "source": "iana"
  },
  "application/vnd.powerbuilder75": {
    "source": "iana"
  },
  "application/vnd.powerbuilder75-s": {
    "source": "iana"
  },
  "application/vnd.preminet": {
    "source": "iana"
  },
  "application/vnd.previewsystems.box": {
    "source": "iana",
    "extensions": ["box"]
  },
  "application/vnd.proteus.magazine": {
    "source": "iana",
    "extensions": ["mgz"]
  },
  "application/vnd.publishare-delta-tree": {
    "source": "iana",
    "extensions": ["qps"]
  },
  "application/vnd.pvi.ptid1": {
    "source": "iana",
    "extensions": ["ptid"]
  },
  "application/vnd.pwg-multiplexed": {
    "source": "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    "source": "iana"
  },
  "application/vnd.qualcomm.brew-app-res": {
    "source": "iana"
  },
  "application/vnd.quark.quarkxpress": {
    "source": "iana",
    "extensions": ["qxd","qxt","qwd","qwt","qxl","qxb"]
  },
  "application/vnd.quobject-quoxdocument": {
    "source": "iana"
  },
  "application/vnd.radisys.moml+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-conf+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    "source": "iana"
  },
  "application/vnd.rainstor.data": {
    "source": "iana"
  },
  "application/vnd.rapid": {
    "source": "iana"
  },
  "application/vnd.realvnc.bed": {
    "source": "iana",
    "extensions": ["bed"]
  },
  "application/vnd.recordare.musicxml": {
    "source": "iana",
    "extensions": ["mxl"]
  },
  "application/vnd.recordare.musicxml+xml": {
    "source": "iana",
    "extensions": ["musicxml"]
  },
  "application/vnd.renlearn.rlprint": {
    "source": "iana"
  },
  "application/vnd.rig.cryptonote": {
    "source": "iana",
    "extensions": ["cryptonote"]
  },
  "application/vnd.rim.cod": {
    "source": "apache",
    "extensions": ["cod"]
  },
  "application/vnd.rn-realmedia": {
    "source": "apache",
    "extensions": ["rm"]
  },
  "application/vnd.rn-realmedia-vbr": {
    "source": "apache",
    "extensions": ["rmvb"]
  },
  "application/vnd.route66.link66+xml": {
    "source": "iana",
    "extensions": ["link66"]
  },
  "application/vnd.rs-274x": {
    "source": "iana"
  },
  "application/vnd.ruckus.download": {
    "source": "iana"
  },
  "application/vnd.s3sms": {
    "source": "iana"
  },
  "application/vnd.sailingtracker.track": {
    "source": "iana",
    "extensions": ["st"]
  },
  "application/vnd.sbm.cid": {
    "source": "iana"
  },
  "application/vnd.sbm.mid2": {
    "source": "iana"
  },
  "application/vnd.scribus": {
    "source": "iana"
  },
  "application/vnd.sealed.3df": {
    "source": "iana"
  },
  "application/vnd.sealed.csf": {
    "source": "iana"
  },
  "application/vnd.sealed.doc": {
    "source": "iana"
  },
  "application/vnd.sealed.eml": {
    "source": "iana"
  },
  "application/vnd.sealed.mht": {
    "source": "iana"
  },
  "application/vnd.sealed.net": {
    "source": "iana"
  },
  "application/vnd.sealed.ppt": {
    "source": "iana"
  },
  "application/vnd.sealed.tiff": {
    "source": "iana"
  },
  "application/vnd.sealed.xls": {
    "source": "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    "source": "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    "source": "iana"
  },
  "application/vnd.seemail": {
    "source": "iana",
    "extensions": ["see"]
  },
  "application/vnd.sema": {
    "source": "iana",
    "extensions": ["sema"]
  },
  "application/vnd.semd": {
    "source": "iana",
    "extensions": ["semd"]
  },
  "application/vnd.semf": {
    "source": "iana",
    "extensions": ["semf"]
  },
  "application/vnd.shana.informed.formdata": {
    "source": "iana",
    "extensions": ["ifm"]
  },
  "application/vnd.shana.informed.formtemplate": {
    "source": "iana",
    "extensions": ["itp"]
  },
  "application/vnd.shana.informed.interchange": {
    "source": "iana",
    "extensions": ["iif"]
  },
  "application/vnd.shana.informed.package": {
    "source": "iana",
    "extensions": ["ipk"]
  },
  "application/vnd.simtech-mindmapper": {
    "source": "iana",
    "extensions": ["twd","twds"]
  },
  "application/vnd.siren+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.smaf": {
    "source": "iana",
    "extensions": ["mmf"]
  },
  "application/vnd.smart.notebook": {
    "source": "iana"
  },
  "application/vnd.smart.teacher": {
    "source": "iana",
    "extensions": ["teacher"]
  },
  "application/vnd.software602.filler.form+xml": {
    "source": "iana"
  },
  "application/vnd.software602.filler.form-xml-zip": {
    "source": "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    "source": "iana",
    "extensions": ["sdkm","sdkd"]
  },
  "application/vnd.spotfire.dxp": {
    "source": "iana",
    "extensions": ["dxp"]
  },
  "application/vnd.spotfire.sfs": {
    "source": "iana",
    "extensions": ["sfs"]
  },
  "application/vnd.sss-cod": {
    "source": "iana"
  },
  "application/vnd.sss-dtf": {
    "source": "iana"
  },
  "application/vnd.sss-ntf": {
    "source": "iana"
  },
  "application/vnd.stardivision.calc": {
    "source": "apache",
    "extensions": ["sdc"]
  },
  "application/vnd.stardivision.draw": {
    "source": "apache",
    "extensions": ["sda"]
  },
  "application/vnd.stardivision.impress": {
    "source": "apache",
    "extensions": ["sdd"]
  },
  "application/vnd.stardivision.math": {
    "source": "apache",
    "extensions": ["smf"]
  },
  "application/vnd.stardivision.writer": {
    "source": "apache",
    "extensions": ["sdw","vor"]
  },
  "application/vnd.stardivision.writer-global": {
    "source": "apache",
    "extensions": ["sgl"]
  },
  "application/vnd.stepmania.package": {
    "source": "iana",
    "extensions": ["smzip"]
  },
  "application/vnd.stepmania.stepchart": {
    "source": "iana",
    "extensions": ["sm"]
  },
  "application/vnd.street-stream": {
    "source": "iana"
  },
  "application/vnd.sun.wadl+xml": {
    "source": "iana"
  },
  "application/vnd.sun.xml.calc": {
    "source": "apache",
    "extensions": ["sxc"]
  },
  "application/vnd.sun.xml.calc.template": {
    "source": "apache",
    "extensions": ["stc"]
  },
  "application/vnd.sun.xml.draw": {
    "source": "apache",
    "extensions": ["sxd"]
  },
  "application/vnd.sun.xml.draw.template": {
    "source": "apache",
    "extensions": ["std"]
  },
  "application/vnd.sun.xml.impress": {
    "source": "apache",
    "extensions": ["sxi"]
  },
  "application/vnd.sun.xml.impress.template": {
    "source": "apache",
    "extensions": ["sti"]
  },
  "application/vnd.sun.xml.math": {
    "source": "apache",
    "extensions": ["sxm"]
  },
  "application/vnd.sun.xml.writer": {
    "source": "apache",
    "extensions": ["sxw"]
  },
  "application/vnd.sun.xml.writer.global": {
    "source": "apache",
    "extensions": ["sxg"]
  },
  "application/vnd.sun.xml.writer.template": {
    "source": "apache",
    "extensions": ["stw"]
  },
  "application/vnd.sus-calendar": {
    "source": "iana",
    "extensions": ["sus","susp"]
  },
  "application/vnd.svd": {
    "source": "iana",
    "extensions": ["svd"]
  },
  "application/vnd.swiftview-ics": {
    "source": "iana"
  },
  "application/vnd.symbian.install": {
    "source": "apache",
    "extensions": ["sis","sisx"]
  },
  "application/vnd.syncml+xml": {
    "source": "iana",
    "extensions": ["xsm"]
  },
  "application/vnd.syncml.dm+wbxml": {
    "source": "iana",
    "extensions": ["bdm"]
  },
  "application/vnd.syncml.dm+xml": {
    "source": "iana",
    "extensions": ["xdm"]
  },
  "application/vnd.syncml.dm.notification": {
    "source": "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    "source": "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    "source": "iana"
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    "source": "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    "source": "iana"
  },
  "application/vnd.syncml.ds.notification": {
    "source": "iana"
  },
  "application/vnd.tao.intent-module-archive": {
    "source": "iana",
    "extensions": ["tao"]
  },
  "application/vnd.tcpdump.pcap": {
    "source": "iana",
    "extensions": ["pcap","cap","dmp"]
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    "source": "iana"
  },
  "application/vnd.tml": {
    "source": "iana"
  },
  "application/vnd.tmobile-livetv": {
    "source": "iana",
    "extensions": ["tmo"]
  },
  "application/vnd.trid.tpt": {
    "source": "iana",
    "extensions": ["tpt"]
  },
  "application/vnd.triscape.mxs": {
    "source": "iana",
    "extensions": ["mxs"]
  },
  "application/vnd.trueapp": {
    "source": "iana",
    "extensions": ["tra"]
  },
  "application/vnd.truedoc": {
    "source": "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    "source": "iana"
  },
  "application/vnd.ufdl": {
    "source": "iana",
    "extensions": ["ufd","ufdl"]
  },
  "application/vnd.uiq.theme": {
    "source": "iana",
    "extensions": ["utz"]
  },
  "application/vnd.umajin": {
    "source": "iana",
    "extensions": ["umj"]
  },
  "application/vnd.unity": {
    "source": "iana",
    "extensions": ["unityweb"]
  },
  "application/vnd.uoml+xml": {
    "source": "iana",
    "extensions": ["uoml"]
  },
  "application/vnd.uplanet.alert": {
    "source": "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    "source": "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.cacheop": {
    "source": "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.channel": {
    "source": "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.list": {
    "source": "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.listcmd": {
    "source": "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.signal": {
    "source": "iana"
  },
  "application/vnd.uri-map": {
    "source": "iana"
  },
  "application/vnd.valve.source.material": {
    "source": "iana"
  },
  "application/vnd.vcx": {
    "source": "iana",
    "extensions": ["vcx"]
  },
  "application/vnd.vd-study": {
    "source": "iana"
  },
  "application/vnd.vectorworks": {
    "source": "iana"
  },
  "application/vnd.verimatrix.vcas": {
    "source": "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    "source": "iana"
  },
  "application/vnd.visio": {
    "source": "iana",
    "extensions": ["vsd","vst","vss","vsw"]
  },
  "application/vnd.visionary": {
    "source": "iana",
    "extensions": ["vis"]
  },
  "application/vnd.vividence.scriptfile": {
    "source": "iana"
  },
  "application/vnd.vsf": {
    "source": "iana",
    "extensions": ["vsf"]
  },
  "application/vnd.wap.sic": {
    "source": "iana"
  },
  "application/vnd.wap.slc": {
    "source": "iana"
  },
  "application/vnd.wap.wbxml": {
    "source": "iana",
    "extensions": ["wbxml"]
  },
  "application/vnd.wap.wmlc": {
    "source": "iana",
    "extensions": ["wmlc"]
  },
  "application/vnd.wap.wmlscriptc": {
    "source": "iana",
    "extensions": ["wmlsc"]
  },
  "application/vnd.webturbo": {
    "source": "iana",
    "extensions": ["wtb"]
  },
  "application/vnd.wfa.p2p": {
    "source": "iana"
  },
  "application/vnd.wfa.wsc": {
    "source": "iana"
  },
  "application/vnd.windows.devicepairing": {
    "source": "iana"
  },
  "application/vnd.wmc": {
    "source": "iana"
  },
  "application/vnd.wmf.bootstrap": {
    "source": "iana"
  },
  "application/vnd.wolfram.mathematica": {
    "source": "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    "source": "iana"
  },
  "application/vnd.wolfram.player": {
    "source": "iana",
    "extensions": ["nbp"]
  },
  "application/vnd.wordperfect": {
    "source": "iana",
    "extensions": ["wpd"]
  },
  "application/vnd.wqd": {
    "source": "iana",
    "extensions": ["wqd"]
  },
  "application/vnd.wrq-hp3000-labelled": {
    "source": "iana"
  },
  "application/vnd.wt.stf": {
    "source": "iana",
    "extensions": ["stf"]
  },
  "application/vnd.wv.csp+wbxml": {
    "source": "iana"
  },
  "application/vnd.wv.csp+xml": {
    "source": "iana"
  },
  "application/vnd.wv.ssp+xml": {
    "source": "iana"
  },
  "application/vnd.xacml+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.xara": {
    "source": "iana",
    "extensions": ["xar"]
  },
  "application/vnd.xfdl": {
    "source": "iana",
    "extensions": ["xfdl"]
  },
  "application/vnd.xfdl.webform": {
    "source": "iana"
  },
  "application/vnd.xmi+xml": {
    "source": "iana"
  },
  "application/vnd.xmpie.cpkg": {
    "source": "iana"
  },
  "application/vnd.xmpie.dpkg": {
    "source": "iana"
  },
  "application/vnd.xmpie.plan": {
    "source": "iana"
  },
  "application/vnd.xmpie.ppkg": {
    "source": "iana"
  },
  "application/vnd.xmpie.xlim": {
    "source": "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    "source": "iana",
    "extensions": ["hvd"]
  },
  "application/vnd.yamaha.hv-script": {
    "source": "iana",
    "extensions": ["hvs"]
  },
  "application/vnd.yamaha.hv-voice": {
    "source": "iana",
    "extensions": ["hvp"]
  },
  "application/vnd.yamaha.openscoreformat": {
    "source": "iana",
    "extensions": ["osf"]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    "source": "iana",
    "extensions": ["osfpvg"]
  },
  "application/vnd.yamaha.remote-setup": {
    "source": "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    "source": "iana",
    "extensions": ["saf"]
  },
  "application/vnd.yamaha.smaf-phrase": {
    "source": "iana",
    "extensions": ["spf"]
  },
  "application/vnd.yamaha.through-ngn": {
    "source": "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    "source": "iana"
  },
  "application/vnd.yaoweme": {
    "source": "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    "source": "iana",
    "extensions": ["cmp"]
  },
  "application/vnd.zul": {
    "source": "iana",
    "extensions": ["zir","zirz"]
  },
  "application/vnd.zzazz.deck+xml": {
    "source": "iana",
    "extensions": ["zaz"]
  },
  "application/voicexml+xml": {
    "source": "iana",
    "extensions": ["vxml"]
  },
  "application/vq-rtcpxr": {
    "source": "iana"
  },
  "application/watcherinfo+xml": {
    "source": "iana"
  },
  "application/whoispp-query": {
    "source": "iana"
  },
  "application/whoispp-response": {
    "source": "iana"
  },
  "application/widget": {
    "source": "iana",
    "extensions": ["wgt"]
  },
  "application/winhlp": {
    "source": "apache",
    "extensions": ["hlp"]
  },
  "application/wita": {
    "source": "iana"
  },
  "application/wordperfect5.1": {
    "source": "iana"
  },
  "application/wsdl+xml": {
    "source": "iana",
    "extensions": ["wsdl"]
  },
  "application/wspolicy+xml": {
    "source": "iana",
    "extensions": ["wspolicy"]
  },
  "application/x-7z-compressed": {
    "source": "apache",
    "compressible": false,
    "extensions": ["7z"]
  },
  "application/x-abiword": {
    "source": "apache",
    "extensions": ["abw"]
  },
  "application/x-ace-compressed": {
    "source": "apache",
    "extensions": ["ace"]
  },
  "application/x-amf": {
    "source": "apache"
  },
  "application/x-apple-diskimage": {
    "source": "apache",
    "extensions": ["dmg"]
  },
  "application/x-authorware-bin": {
    "source": "apache",
    "extensions": ["aab","x32","u32","vox"]
  },
  "application/x-authorware-map": {
    "source": "apache",
    "extensions": ["aam"]
  },
  "application/x-authorware-seg": {
    "source": "apache",
    "extensions": ["aas"]
  },
  "application/x-bcpio": {
    "source": "apache",
    "extensions": ["bcpio"]
  },
  "application/x-bdoc": {
    "compressible": false,
    "extensions": ["bdoc"]
  },
  "application/x-bittorrent": {
    "source": "apache",
    "extensions": ["torrent"]
  },
  "application/x-blorb": {
    "source": "apache",
    "extensions": ["blb","blorb"]
  },
  "application/x-bzip": {
    "source": "apache",
    "compressible": false,
    "extensions": ["bz"]
  },
  "application/x-bzip2": {
    "source": "apache",
    "compressible": false,
    "extensions": ["bz2","boz"]
  },
  "application/x-cbr": {
    "source": "apache",
    "extensions": ["cbr","cba","cbt","cbz","cb7"]
  },
  "application/x-cdlink": {
    "source": "apache",
    "extensions": ["vcd"]
  },
  "application/x-cfs-compressed": {
    "source": "apache",
    "extensions": ["cfs"]
  },
  "application/x-chat": {
    "source": "apache",
    "extensions": ["chat"]
  },
  "application/x-chess-pgn": {
    "source": "apache",
    "extensions": ["pgn"]
  },
  "application/x-chrome-extension": {
    "extensions": ["crx"]
  },
  "application/x-cocoa": {
    "source": "nginx",
    "extensions": ["cco"]
  },
  "application/x-compress": {
    "source": "apache"
  },
  "application/x-conference": {
    "source": "apache",
    "extensions": ["nsc"]
  },
  "application/x-cpio": {
    "source": "apache",
    "extensions": ["cpio"]
  },
  "application/x-csh": {
    "source": "apache",
    "extensions": ["csh"]
  },
  "application/x-deb": {
    "compressible": false
  },
  "application/x-debian-package": {
    "source": "apache",
    "extensions": ["deb","udeb"]
  },
  "application/x-dgc-compressed": {
    "source": "apache",
    "extensions": ["dgc"]
  },
  "application/x-director": {
    "source": "apache",
    "extensions": ["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]
  },
  "application/x-doom": {
    "source": "apache",
    "extensions": ["wad"]
  },
  "application/x-dtbncx+xml": {
    "source": "apache",
    "extensions": ["ncx"]
  },
  "application/x-dtbook+xml": {
    "source": "apache",
    "extensions": ["dtb"]
  },
  "application/x-dtbresource+xml": {
    "source": "apache",
    "extensions": ["res"]
  },
  "application/x-dvi": {
    "source": "apache",
    "compressible": false,
    "extensions": ["dvi"]
  },
  "application/x-envoy": {
    "source": "apache",
    "extensions": ["evy"]
  },
  "application/x-eva": {
    "source": "apache",
    "extensions": ["eva"]
  },
  "application/x-font-bdf": {
    "source": "apache",
    "extensions": ["bdf"]
  },
  "application/x-font-dos": {
    "source": "apache"
  },
  "application/x-font-framemaker": {
    "source": "apache"
  },
  "application/x-font-ghostscript": {
    "source": "apache",
    "extensions": ["gsf"]
  },
  "application/x-font-libgrx": {
    "source": "apache"
  },
  "application/x-font-linux-psf": {
    "source": "apache",
    "extensions": ["psf"]
  },
  "application/x-font-otf": {
    "source": "apache",
    "compressible": true,
    "extensions": ["otf"]
  },
  "application/x-font-pcf": {
    "source": "apache",
    "extensions": ["pcf"]
  },
  "application/x-font-snf": {
    "source": "apache",
    "extensions": ["snf"]
  },
  "application/x-font-speedo": {
    "source": "apache"
  },
  "application/x-font-sunos-news": {
    "source": "apache"
  },
  "application/x-font-ttf": {
    "source": "apache",
    "compressible": true,
    "extensions": ["ttf","ttc"]
  },
  "application/x-font-type1": {
    "source": "apache",
    "extensions": ["pfa","pfb","pfm","afm"]
  },
  "application/x-font-vfont": {
    "source": "apache"
  },
  "application/x-freearc": {
    "source": "apache",
    "extensions": ["arc"]
  },
  "application/x-futuresplash": {
    "source": "apache",
    "extensions": ["spl"]
  },
  "application/x-gca-compressed": {
    "source": "apache",
    "extensions": ["gca"]
  },
  "application/x-glulx": {
    "source": "apache",
    "extensions": ["ulx"]
  },
  "application/x-gnumeric": {
    "source": "apache",
    "extensions": ["gnumeric"]
  },
  "application/x-gramps-xml": {
    "source": "apache",
    "extensions": ["gramps"]
  },
  "application/x-gtar": {
    "source": "apache",
    "extensions": ["gtar"]
  },
  "application/x-gzip": {
    "source": "apache"
  },
  "application/x-hdf": {
    "source": "apache",
    "extensions": ["hdf"]
  },
  "application/x-httpd-php": {
    "compressible": true,
    "extensions": ["php"]
  },
  "application/x-install-instructions": {
    "source": "apache",
    "extensions": ["install"]
  },
  "application/x-iso9660-image": {
    "source": "apache",
    "extensions": ["iso"]
  },
  "application/x-java-archive-diff": {
    "source": "nginx",
    "extensions": ["jardiff"]
  },
  "application/x-java-jnlp-file": {
    "source": "apache",
    "compressible": false,
    "extensions": ["jnlp"]
  },
  "application/x-javascript": {
    "compressible": true
  },
  "application/x-latex": {
    "source": "apache",
    "compressible": false,
    "extensions": ["latex"]
  },
  "application/x-lua-bytecode": {
    "extensions": ["luac"]
  },
  "application/x-lzh-compressed": {
    "source": "apache",
    "extensions": ["lzh","lha"]
  },
  "application/x-makeself": {
    "source": "nginx",
    "extensions": ["run"]
  },
  "application/x-mie": {
    "source": "apache",
    "extensions": ["mie"]
  },
  "application/x-mobipocket-ebook": {
    "source": "apache",
    "extensions": ["prc","mobi"]
  },
  "application/x-mpegurl": {
    "compressible": false
  },
  "application/x-ms-application": {
    "source": "apache",
    "extensions": ["application"]
  },
  "application/x-ms-shortcut": {
    "source": "apache",
    "extensions": ["lnk"]
  },
  "application/x-ms-wmd": {
    "source": "apache",
    "extensions": ["wmd"]
  },
  "application/x-ms-wmz": {
    "source": "apache",
    "extensions": ["wmz"]
  },
  "application/x-ms-xbap": {
    "source": "apache",
    "extensions": ["xbap"]
  },
  "application/x-msaccess": {
    "source": "apache",
    "extensions": ["mdb"]
  },
  "application/x-msbinder": {
    "source": "apache",
    "extensions": ["obd"]
  },
  "application/x-mscardfile": {
    "source": "apache",
    "extensions": ["crd"]
  },
  "application/x-msclip": {
    "source": "apache",
    "extensions": ["clp"]
  },
  "application/x-msdos-program": {
    "extensions": ["exe"]
  },
  "application/x-msdownload": {
    "source": "apache",
    "extensions": ["exe","dll","com","bat","msi"]
  },
  "application/x-msmediaview": {
    "source": "apache",
    "extensions": ["mvb","m13","m14"]
  },
  "application/x-msmetafile": {
    "source": "apache",
    "extensions": ["wmf","wmz","emf","emz"]
  },
  "application/x-msmoney": {
    "source": "apache",
    "extensions": ["mny"]
  },
  "application/x-mspublisher": {
    "source": "apache",
    "extensions": ["pub"]
  },
  "application/x-msschedule": {
    "source": "apache",
    "extensions": ["scd"]
  },
  "application/x-msterminal": {
    "source": "apache",
    "extensions": ["trm"]
  },
  "application/x-mswrite": {
    "source": "apache",
    "extensions": ["wri"]
  },
  "application/x-netcdf": {
    "source": "apache",
    "extensions": ["nc","cdf"]
  },
  "application/x-ns-proxy-autoconfig": {
    "compressible": true,
    "extensions": ["pac"]
  },
  "application/x-nzb": {
    "source": "apache",
    "extensions": ["nzb"]
  },
  "application/x-perl": {
    "source": "nginx",
    "extensions": ["pl","pm"]
  },
  "application/x-pilot": {
    "source": "nginx",
    "extensions": ["prc","pdb"]
  },
  "application/x-pkcs12": {
    "source": "apache",
    "compressible": false,
    "extensions": ["p12","pfx"]
  },
  "application/x-pkcs7-certificates": {
    "source": "apache",
    "extensions": ["p7b","spc"]
  },
  "application/x-pkcs7-certreqresp": {
    "source": "apache",
    "extensions": ["p7r"]
  },
  "application/x-rar-compressed": {
    "source": "apache",
    "compressible": false,
    "extensions": ["rar"]
  },
  "application/x-redhat-package-manager": {
    "source": "nginx",
    "extensions": ["rpm"]
  },
  "application/x-research-info-systems": {
    "source": "apache",
    "extensions": ["ris"]
  },
  "application/x-sea": {
    "source": "nginx",
    "extensions": ["sea"]
  },
  "application/x-sh": {
    "source": "apache",
    "compressible": true,
    "extensions": ["sh"]
  },
  "application/x-shar": {
    "source": "apache",
    "extensions": ["shar"]
  },
  "application/x-shockwave-flash": {
    "source": "apache",
    "compressible": false,
    "extensions": ["swf"]
  },
  "application/x-silverlight-app": {
    "source": "apache",
    "extensions": ["xap"]
  },
  "application/x-sql": {
    "source": "apache",
    "extensions": ["sql"]
  },
  "application/x-stuffit": {
    "source": "apache",
    "compressible": false,
    "extensions": ["sit"]
  },
  "application/x-stuffitx": {
    "source": "apache",
    "extensions": ["sitx"]
  },
  "application/x-subrip": {
    "source": "apache",
    "extensions": ["srt"]
  },
  "application/x-sv4cpio": {
    "source": "apache",
    "extensions": ["sv4cpio"]
  },
  "application/x-sv4crc": {
    "source": "apache",
    "extensions": ["sv4crc"]
  },
  "application/x-t3vm-image": {
    "source": "apache",
    "extensions": ["t3"]
  },
  "application/x-tads": {
    "source": "apache",
    "extensions": ["gam"]
  },
  "application/x-tar": {
    "source": "apache",
    "compressible": true,
    "extensions": ["tar"]
  },
  "application/x-tcl": {
    "source": "apache",
    "extensions": ["tcl","tk"]
  },
  "application/x-tex": {
    "source": "apache",
    "extensions": ["tex"]
  },
  "application/x-tex-tfm": {
    "source": "apache",
    "extensions": ["tfm"]
  },
  "application/x-texinfo": {
    "source": "apache",
    "extensions": ["texinfo","texi"]
  },
  "application/x-tgif": {
    "source": "apache",
    "extensions": ["obj"]
  },
  "application/x-ustar": {
    "source": "apache",
    "extensions": ["ustar"]
  },
  "application/x-wais-source": {
    "source": "apache",
    "extensions": ["src"]
  },
  "application/x-web-app-manifest+json": {
    "compressible": true,
    "extensions": ["webapp"]
  },
  "application/x-www-form-urlencoded": {
    "source": "iana",
    "compressible": true
  },
  "application/x-x509-ca-cert": {
    "source": "apache",
    "extensions": ["der","crt","pem"]
  },
  "application/x-xfig": {
    "source": "apache",
    "extensions": ["fig"]
  },
  "application/x-xliff+xml": {
    "source": "apache",
    "extensions": ["xlf"]
  },
  "application/x-xpinstall": {
    "source": "apache",
    "compressible": false,
    "extensions": ["xpi"]
  },
  "application/x-xz": {
    "source": "apache",
    "extensions": ["xz"]
  },
  "application/x-zmachine": {
    "source": "apache",
    "extensions": ["z1","z2","z3","z4","z5","z6","z7","z8"]
  },
  "application/x400-bp": {
    "source": "iana"
  },
  "application/xacml+xml": {
    "source": "iana"
  },
  "application/xaml+xml": {
    "source": "apache",
    "extensions": ["xaml"]
  },
  "application/xcap-att+xml": {
    "source": "iana"
  },
  "application/xcap-caps+xml": {
    "source": "iana"
  },
  "application/xcap-diff+xml": {
    "source": "iana",
    "extensions": ["xdf"]
  },
  "application/xcap-el+xml": {
    "source": "iana"
  },
  "application/xcap-error+xml": {
    "source": "iana"
  },
  "application/xcap-ns+xml": {
    "source": "iana"
  },
  "application/xcon-conference-info+xml": {
    "source": "iana"
  },
  "application/xcon-conference-info-diff+xml": {
    "source": "iana"
  },
  "application/xenc+xml": {
    "source": "iana",
    "extensions": ["xenc"]
  },
  "application/xhtml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xhtml","xht"]
  },
  "application/xhtml-voice+xml": {
    "source": "apache"
  },
  "application/xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xml","xsl","xsd"]
  },
  "application/xml-dtd": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dtd"]
  },
  "application/xml-external-parsed-entity": {
    "source": "iana"
  },
  "application/xml-patch+xml": {
    "source": "iana"
  },
  "application/xmpp+xml": {
    "source": "iana"
  },
  "application/xop+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xop"]
  },
  "application/xproc+xml": {
    "source": "apache",
    "extensions": ["xpl"]
  },
  "application/xslt+xml": {
    "source": "iana",
    "extensions": ["xslt"]
  },
  "application/xspf+xml": {
    "source": "apache",
    "extensions": ["xspf"]
  },
  "application/xv+xml": {
    "source": "iana",
    "extensions": ["mxml","xhvml","xvml","xvm"]
  },
  "application/yang": {
    "source": "iana",
    "extensions": ["yang"]
  },
  "application/yin+xml": {
    "source": "iana",
    "extensions": ["yin"]
  },
  "application/zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["zip"]
  },
  "application/zlib": {
    "source": "iana"
  },
  "audio/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "audio/32kadpcm": {
    "source": "iana"
  },
  "audio/3gpp": {
    "source": "iana"
  },
  "audio/3gpp2": {
    "source": "iana"
  },
  "audio/ac3": {
    "source": "iana"
  },
  "audio/adpcm": {
    "source": "apache",
    "extensions": ["adp"]
  },
  "audio/amr": {
    "source": "iana"
  },
  "audio/amr-wb": {
    "source": "iana"
  },
  "audio/amr-wb+": {
    "source": "iana"
  },
  "audio/aptx": {
    "source": "iana"
  },
  "audio/asc": {
    "source": "iana"
  },
  "audio/atrac-advanced-lossless": {
    "source": "iana"
  },
  "audio/atrac-x": {
    "source": "iana"
  },
  "audio/atrac3": {
    "source": "iana"
  },
  "audio/basic": {
    "source": "iana",
    "compressible": false,
    "extensions": ["au","snd"]
  },
  "audio/bv16": {
    "source": "iana"
  },
  "audio/bv32": {
    "source": "iana"
  },
  "audio/clearmode": {
    "source": "iana"
  },
  "audio/cn": {
    "source": "iana"
  },
  "audio/dat12": {
    "source": "iana"
  },
  "audio/dls": {
    "source": "iana"
  },
  "audio/dsr-es201108": {
    "source": "iana"
  },
  "audio/dsr-es202050": {
    "source": "iana"
  },
  "audio/dsr-es202211": {
    "source": "iana"
  },
  "audio/dsr-es202212": {
    "source": "iana"
  },
  "audio/dv": {
    "source": "iana"
  },
  "audio/dvi4": {
    "source": "iana"
  },
  "audio/eac3": {
    "source": "iana"
  },
  "audio/encaprtp": {
    "source": "iana"
  },
  "audio/evrc": {
    "source": "iana"
  },
  "audio/evrc-qcp": {
    "source": "iana"
  },
  "audio/evrc0": {
    "source": "iana"
  },
  "audio/evrc1": {
    "source": "iana"
  },
  "audio/evrcb": {
    "source": "iana"
  },
  "audio/evrcb0": {
    "source": "iana"
  },
  "audio/evrcb1": {
    "source": "iana"
  },
  "audio/evrcnw": {
    "source": "iana"
  },
  "audio/evrcnw0": {
    "source": "iana"
  },
  "audio/evrcnw1": {
    "source": "iana"
  },
  "audio/evrcwb": {
    "source": "iana"
  },
  "audio/evrcwb0": {
    "source": "iana"
  },
  "audio/evrcwb1": {
    "source": "iana"
  },
  "audio/evs": {
    "source": "iana"
  },
  "audio/fwdred": {
    "source": "iana"
  },
  "audio/g711-0": {
    "source": "iana"
  },
  "audio/g719": {
    "source": "iana"
  },
  "audio/g722": {
    "source": "iana"
  },
  "audio/g7221": {
    "source": "iana"
  },
  "audio/g723": {
    "source": "iana"
  },
  "audio/g726-16": {
    "source": "iana"
  },
  "audio/g726-24": {
    "source": "iana"
  },
  "audio/g726-32": {
    "source": "iana"
  },
  "audio/g726-40": {
    "source": "iana"
  },
  "audio/g728": {
    "source": "iana"
  },
  "audio/g729": {
    "source": "iana"
  },
  "audio/g7291": {
    "source": "iana"
  },
  "audio/g729d": {
    "source": "iana"
  },
  "audio/g729e": {
    "source": "iana"
  },
  "audio/gsm": {
    "source": "iana"
  },
  "audio/gsm-efr": {
    "source": "iana"
  },
  "audio/gsm-hr-08": {
    "source": "iana"
  },
  "audio/ilbc": {
    "source": "iana"
  },
  "audio/ip-mr_v2.5": {
    "source": "iana"
  },
  "audio/isac": {
    "source": "apache"
  },
  "audio/l16": {
    "source": "iana"
  },
  "audio/l20": {
    "source": "iana"
  },
  "audio/l24": {
    "source": "iana",
    "compressible": false
  },
  "audio/l8": {
    "source": "iana"
  },
  "audio/lpc": {
    "source": "iana"
  },
  "audio/midi": {
    "source": "apache",
    "extensions": ["mid","midi","kar","rmi"]
  },
  "audio/mobile-xmf": {
    "source": "iana"
  },
  "audio/mp4": {
    "source": "iana",
    "compressible": false,
    "extensions": ["mp4a","m4a"]
  },
  "audio/mp4a-latm": {
    "source": "iana"
  },
  "audio/mpa": {
    "source": "iana"
  },
  "audio/mpa-robust": {
    "source": "iana"
  },
  "audio/mpeg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["mpga","mp2","mp2a","mp3","m2a","m3a"]
  },
  "audio/mpeg4-generic": {
    "source": "iana"
  },
  "audio/musepack": {
    "source": "apache"
  },
  "audio/ogg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["oga","ogg","spx"]
  },
  "audio/opus": {
    "source": "iana"
  },
  "audio/parityfec": {
    "source": "iana"
  },
  "audio/pcma": {
    "source": "iana"
  },
  "audio/pcma-wb": {
    "source": "iana"
  },
  "audio/pcmu": {
    "source": "iana"
  },
  "audio/pcmu-wb": {
    "source": "iana"
  },
  "audio/prs.sid": {
    "source": "iana"
  },
  "audio/qcelp": {
    "source": "iana"
  },
  "audio/raptorfec": {
    "source": "iana"
  },
  "audio/red": {
    "source": "iana"
  },
  "audio/rtp-enc-aescm128": {
    "source": "iana"
  },
  "audio/rtp-midi": {
    "source": "iana"
  },
  "audio/rtploopback": {
    "source": "iana"
  },
  "audio/rtx": {
    "source": "iana"
  },
  "audio/s3m": {
    "source": "apache",
    "extensions": ["s3m"]
  },
  "audio/silk": {
    "source": "apache",
    "extensions": ["sil"]
  },
  "audio/smv": {
    "source": "iana"
  },
  "audio/smv-qcp": {
    "source": "iana"
  },
  "audio/smv0": {
    "source": "iana"
  },
  "audio/sp-midi": {
    "source": "iana"
  },
  "audio/speex": {
    "source": "iana"
  },
  "audio/t140c": {
    "source": "iana"
  },
  "audio/t38": {
    "source": "iana"
  },
  "audio/telephone-event": {
    "source": "iana"
  },
  "audio/tone": {
    "source": "iana"
  },
  "audio/uemclip": {
    "source": "iana"
  },
  "audio/ulpfec": {
    "source": "iana"
  },
  "audio/vdvi": {
    "source": "iana"
  },
  "audio/vmr-wb": {
    "source": "iana"
  },
  "audio/vnd.3gpp.iufp": {
    "source": "iana"
  },
  "audio/vnd.4sb": {
    "source": "iana"
  },
  "audio/vnd.audiokoz": {
    "source": "iana"
  },
  "audio/vnd.celp": {
    "source": "iana"
  },
  "audio/vnd.cisco.nse": {
    "source": "iana"
  },
  "audio/vnd.cmles.radio-events": {
    "source": "iana"
  },
  "audio/vnd.cns.anp1": {
    "source": "iana"
  },
  "audio/vnd.cns.inf1": {
    "source": "iana"
  },
  "audio/vnd.dece.audio": {
    "source": "iana",
    "extensions": ["uva","uvva"]
  },
  "audio/vnd.digital-winds": {
    "source": "iana",
    "extensions": ["eol"]
  },
  "audio/vnd.dlna.adts": {
    "source": "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    "source": "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    "source": "iana"
  },
  "audio/vnd.dolby.mlp": {
    "source": "iana"
  },
  "audio/vnd.dolby.mps": {
    "source": "iana"
  },
  "audio/vnd.dolby.pl2": {
    "source": "iana"
  },
  "audio/vnd.dolby.pl2x": {
    "source": "iana"
  },
  "audio/vnd.dolby.pl2z": {
    "source": "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    "source": "iana"
  },
  "audio/vnd.dra": {
    "source": "iana",
    "extensions": ["dra"]
  },
  "audio/vnd.dts": {
    "source": "iana",
    "extensions": ["dts"]
  },
  "audio/vnd.dts.hd": {
    "source": "iana",
    "extensions": ["dtshd"]
  },
  "audio/vnd.dvb.file": {
    "source": "iana"
  },
  "audio/vnd.everad.plj": {
    "source": "iana"
  },
  "audio/vnd.hns.audio": {
    "source": "iana"
  },
  "audio/vnd.lucent.voice": {
    "source": "iana",
    "extensions": ["lvp"]
  },
  "audio/vnd.ms-playready.media.pya": {
    "source": "iana",
    "extensions": ["pya"]
  },
  "audio/vnd.nokia.mobile-xmf": {
    "source": "iana"
  },
  "audio/vnd.nortel.vbk": {
    "source": "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    "source": "iana",
    "extensions": ["ecelp4800"]
  },
  "audio/vnd.nuera.ecelp7470": {
    "source": "iana",
    "extensions": ["ecelp7470"]
  },
  "audio/vnd.nuera.ecelp9600": {
    "source": "iana",
    "extensions": ["ecelp9600"]
  },
  "audio/vnd.octel.sbc": {
    "source": "iana"
  },
  "audio/vnd.qcelp": {
    "source": "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    "source": "iana"
  },
  "audio/vnd.rip": {
    "source": "iana",
    "extensions": ["rip"]
  },
  "audio/vnd.rn-realaudio": {
    "compressible": false
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    "source": "iana"
  },
  "audio/vnd.vmx.cvsd": {
    "source": "iana"
  },
  "audio/vnd.wave": {
    "compressible": false
  },
  "audio/vorbis": {
    "source": "iana",
    "compressible": false
  },
  "audio/vorbis-config": {
    "source": "iana"
  },
  "audio/wav": {
    "compressible": false,
    "extensions": ["wav"]
  },
  "audio/wave": {
    "compressible": false,
    "extensions": ["wav"]
  },
  "audio/webm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["weba"]
  },
  "audio/x-aac": {
    "source": "apache",
    "compressible": false,
    "extensions": ["aac"]
  },
  "audio/x-aiff": {
    "source": "apache",
    "extensions": ["aif","aiff","aifc"]
  },
  "audio/x-caf": {
    "source": "apache",
    "compressible": false,
    "extensions": ["caf"]
  },
  "audio/x-flac": {
    "source": "apache",
    "extensions": ["flac"]
  },
  "audio/x-m4a": {
    "source": "nginx",
    "extensions": ["m4a"]
  },
  "audio/x-matroska": {
    "source": "apache",
    "extensions": ["mka"]
  },
  "audio/x-mpegurl": {
    "source": "apache",
    "extensions": ["m3u"]
  },
  "audio/x-ms-wax": {
    "source": "apache",
    "extensions": ["wax"]
  },
  "audio/x-ms-wma": {
    "source": "apache",
    "extensions": ["wma"]
  },
  "audio/x-pn-realaudio": {
    "source": "apache",
    "extensions": ["ram","ra"]
  },
  "audio/x-pn-realaudio-plugin": {
    "source": "apache",
    "extensions": ["rmp"]
  },
  "audio/x-realaudio": {
    "source": "nginx",
    "extensions": ["ra"]
  },
  "audio/x-tta": {
    "source": "apache"
  },
  "audio/x-wav": {
    "source": "apache",
    "extensions": ["wav"]
  },
  "audio/xm": {
    "source": "apache",
    "extensions": ["xm"]
  },
  "chemical/x-cdx": {
    "source": "apache",
    "extensions": ["cdx"]
  },
  "chemical/x-cif": {
    "source": "apache",
    "extensions": ["cif"]
  },
  "chemical/x-cmdf": {
    "source": "apache",
    "extensions": ["cmdf"]
  },
  "chemical/x-cml": {
    "source": "apache",
    "extensions": ["cml"]
  },
  "chemical/x-csml": {
    "source": "apache",
    "extensions": ["csml"]
  },
  "chemical/x-pdb": {
    "source": "apache"
  },
  "chemical/x-xyz": {
    "source": "apache",
    "extensions": ["xyz"]
  },
  "font/opentype": {
    "compressible": true,
    "extensions": ["otf"]
  },
  "image/bmp": {
    "source": "apache",
    "compressible": true,
    "extensions": ["bmp"]
  },
  "image/cgm": {
    "source": "iana",
    "extensions": ["cgm"]
  },
  "image/fits": {
    "source": "iana"
  },
  "image/g3fax": {
    "source": "iana",
    "extensions": ["g3"]
  },
  "image/gif": {
    "source": "iana",
    "compressible": false,
    "extensions": ["gif"]
  },
  "image/ief": {
    "source": "iana",
    "extensions": ["ief"]
  },
  "image/jp2": {
    "source": "iana"
  },
  "image/jpeg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["jpeg","jpg","jpe"]
  },
  "image/jpm": {
    "source": "iana"
  },
  "image/jpx": {
    "source": "iana"
  },
  "image/ktx": {
    "source": "iana",
    "extensions": ["ktx"]
  },
  "image/naplps": {
    "source": "iana"
  },
  "image/pjpeg": {
    "compressible": false
  },
  "image/png": {
    "source": "iana",
    "compressible": false,
    "extensions": ["png"]
  },
  "image/prs.btif": {
    "source": "iana",
    "extensions": ["btif"]
  },
  "image/prs.pti": {
    "source": "iana"
  },
  "image/pwg-raster": {
    "source": "iana"
  },
  "image/sgi": {
    "source": "apache",
    "extensions": ["sgi"]
  },
  "image/svg+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["svg","svgz"]
  },
  "image/t38": {
    "source": "iana"
  },
  "image/tiff": {
    "source": "iana",
    "compressible": false,
    "extensions": ["tiff","tif"]
  },
  "image/tiff-fx": {
    "source": "iana"
  },
  "image/vnd.adobe.photoshop": {
    "source": "iana",
    "compressible": true,
    "extensions": ["psd"]
  },
  "image/vnd.airzip.accelerator.azv": {
    "source": "iana"
  },
  "image/vnd.cns.inf2": {
    "source": "iana"
  },
  "image/vnd.dece.graphic": {
    "source": "iana",
    "extensions": ["uvi","uvvi","uvg","uvvg"]
  },
  "image/vnd.djvu": {
    "source": "iana",
    "extensions": ["djvu","djv"]
  },
  "image/vnd.dvb.subtitle": {
    "source": "iana",
    "extensions": ["sub"]
  },
  "image/vnd.dwg": {
    "source": "iana",
    "extensions": ["dwg"]
  },
  "image/vnd.dxf": {
    "source": "iana",
    "extensions": ["dxf"]
  },
  "image/vnd.fastbidsheet": {
    "source": "iana",
    "extensions": ["fbs"]
  },
  "image/vnd.fpx": {
    "source": "iana",
    "extensions": ["fpx"]
  },
  "image/vnd.fst": {
    "source": "iana",
    "extensions": ["fst"]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    "source": "iana",
    "extensions": ["mmr"]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    "source": "iana",
    "extensions": ["rlc"]
  },
  "image/vnd.globalgraphics.pgb": {
    "source": "iana"
  },
  "image/vnd.microsoft.icon": {
    "source": "iana"
  },
  "image/vnd.mix": {
    "source": "iana"
  },
  "image/vnd.mozilla.apng": {
    "source": "iana"
  },
  "image/vnd.ms-modi": {
    "source": "iana",
    "extensions": ["mdi"]
  },
  "image/vnd.ms-photo": {
    "source": "apache",
    "extensions": ["wdp"]
  },
  "image/vnd.net-fpx": {
    "source": "iana",
    "extensions": ["npx"]
  },
  "image/vnd.radiance": {
    "source": "iana"
  },
  "image/vnd.sealed.png": {
    "source": "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    "source": "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    "source": "iana"
  },
  "image/vnd.svf": {
    "source": "iana"
  },
  "image/vnd.tencent.tap": {
    "source": "iana"
  },
  "image/vnd.valve.source.texture": {
    "source": "iana"
  },
  "image/vnd.wap.wbmp": {
    "source": "iana",
    "extensions": ["wbmp"]
  },
  "image/vnd.xiff": {
    "source": "iana",
    "extensions": ["xif"]
  },
  "image/vnd.zbrush.pcx": {
    "source": "iana"
  },
  "image/webp": {
    "source": "apache",
    "extensions": ["webp"]
  },
  "image/x-3ds": {
    "source": "apache",
    "extensions": ["3ds"]
  },
  "image/x-cmu-raster": {
    "source": "apache",
    "extensions": ["ras"]
  },
  "image/x-cmx": {
    "source": "apache",
    "extensions": ["cmx"]
  },
  "image/x-freehand": {
    "source": "apache",
    "extensions": ["fh","fhc","fh4","fh5","fh7"]
  },
  "image/x-icon": {
    "source": "apache",
    "compressible": true,
    "extensions": ["ico"]
  },
  "image/x-jng": {
    "source": "nginx",
    "extensions": ["jng"]
  },
  "image/x-mrsid-image": {
    "source": "apache",
    "extensions": ["sid"]
  },
  "image/x-ms-bmp": {
    "source": "nginx",
    "compressible": true,
    "extensions": ["bmp"]
  },
  "image/x-pcx": {
    "source": "apache",
    "extensions": ["pcx"]
  },
  "image/x-pict": {
    "source": "apache",
    "extensions": ["pic","pct"]
  },
  "image/x-portable-anymap": {
    "source": "apache",
    "extensions": ["pnm"]
  },
  "image/x-portable-bitmap": {
    "source": "apache",
    "extensions": ["pbm"]
  },
  "image/x-portable-graymap": {
    "source": "apache",
    "extensions": ["pgm"]
  },
  "image/x-portable-pixmap": {
    "source": "apache",
    "extensions": ["ppm"]
  },
  "image/x-rgb": {
    "source": "apache",
    "extensions": ["rgb"]
  },
  "image/x-tga": {
    "source": "apache",
    "extensions": ["tga"]
  },
  "image/x-xbitmap": {
    "source": "apache",
    "extensions": ["xbm"]
  },
  "image/x-xcf": {
    "compressible": false
  },
  "image/x-xpixmap": {
    "source": "apache",
    "extensions": ["xpm"]
  },
  "image/x-xwindowdump": {
    "source": "apache",
    "extensions": ["xwd"]
  },
  "message/cpim": {
    "source": "iana"
  },
  "message/delivery-status": {
    "source": "iana"
  },
  "message/disposition-notification": {
    "source": "iana"
  },
  "message/external-body": {
    "source": "iana"
  },
  "message/feedback-report": {
    "source": "iana"
  },
  "message/global": {
    "source": "iana"
  },
  "message/global-delivery-status": {
    "source": "iana"
  },
  "message/global-disposition-notification": {
    "source": "iana"
  },
  "message/global-headers": {
    "source": "iana"
  },
  "message/http": {
    "source": "iana",
    "compressible": false
  },
  "message/imdn+xml": {
    "source": "iana",
    "compressible": true
  },
  "message/news": {
    "source": "iana"
  },
  "message/partial": {
    "source": "iana",
    "compressible": false
  },
  "message/rfc822": {
    "source": "iana",
    "compressible": true,
    "extensions": ["eml","mime"]
  },
  "message/s-http": {
    "source": "iana"
  },
  "message/sip": {
    "source": "iana"
  },
  "message/sipfrag": {
    "source": "iana"
  },
  "message/tracking-status": {
    "source": "iana"
  },
  "message/vnd.si.simp": {
    "source": "iana"
  },
  "message/vnd.wfa.wsc": {
    "source": "iana"
  },
  "model/iges": {
    "source": "iana",
    "compressible": false,
    "extensions": ["igs","iges"]
  },
  "model/mesh": {
    "source": "iana",
    "compressible": false,
    "extensions": ["msh","mesh","silo"]
  },
  "model/vnd.collada+xml": {
    "source": "iana",
    "extensions": ["dae"]
  },
  "model/vnd.dwf": {
    "source": "iana",
    "extensions": ["dwf"]
  },
  "model/vnd.flatland.3dml": {
    "source": "iana"
  },
  "model/vnd.gdl": {
    "source": "iana",
    "extensions": ["gdl"]
  },
  "model/vnd.gs-gdl": {
    "source": "apache"
  },
  "model/vnd.gs.gdl": {
    "source": "iana"
  },
  "model/vnd.gtw": {
    "source": "iana",
    "extensions": ["gtw"]
  },
  "model/vnd.moml+xml": {
    "source": "iana"
  },
  "model/vnd.mts": {
    "source": "iana",
    "extensions": ["mts"]
  },
  "model/vnd.opengex": {
    "source": "iana"
  },
  "model/vnd.parasolid.transmit.binary": {
    "source": "iana"
  },
  "model/vnd.parasolid.transmit.text": {
    "source": "iana"
  },
  "model/vnd.valve.source.compiled-map": {
    "source": "iana"
  },
  "model/vnd.vtu": {
    "source": "iana",
    "extensions": ["vtu"]
  },
  "model/vrml": {
    "source": "iana",
    "compressible": false,
    "extensions": ["wrl","vrml"]
  },
  "model/x3d+binary": {
    "source": "apache",
    "compressible": false,
    "extensions": ["x3db","x3dbz"]
  },
  "model/x3d+fastinfoset": {
    "source": "iana"
  },
  "model/x3d+vrml": {
    "source": "apache",
    "compressible": false,
    "extensions": ["x3dv","x3dvz"]
  },
  "model/x3d+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["x3d","x3dz"]
  },
  "model/x3d-vrml": {
    "source": "iana"
  },
  "multipart/alternative": {
    "source": "iana",
    "compressible": false
  },
  "multipart/appledouble": {
    "source": "iana"
  },
  "multipart/byteranges": {
    "source": "iana"
  },
  "multipart/digest": {
    "source": "iana"
  },
  "multipart/encrypted": {
    "source": "iana",
    "compressible": false
  },
  "multipart/form-data": {
    "source": "iana",
    "compressible": false
  },
  "multipart/header-set": {
    "source": "iana"
  },
  "multipart/mixed": {
    "source": "iana",
    "compressible": false
  },
  "multipart/parallel": {
    "source": "iana"
  },
  "multipart/related": {
    "source": "iana",
    "compressible": false
  },
  "multipart/report": {
    "source": "iana"
  },
  "multipart/signed": {
    "source": "iana",
    "compressible": false
  },
  "multipart/voice-message": {
    "source": "iana"
  },
  "multipart/x-mixed-replace": {
    "source": "iana"
  },
  "text/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "text/cache-manifest": {
    "source": "iana",
    "compressible": true,
    "extensions": ["appcache","manifest"]
  },
  "text/calendar": {
    "source": "iana",
    "extensions": ["ics","ifb"]
  },
  "text/calender": {
    "compressible": true
  },
  "text/cmd": {
    "compressible": true
  },
  "text/coffeescript": {
    "extensions": ["coffee","litcoffee"]
  },
  "text/css": {
    "source": "iana",
    "compressible": true,
    "extensions": ["css"]
  },
  "text/csv": {
    "source": "iana",
    "compressible": true,
    "extensions": ["csv"]
  },
  "text/csv-schema": {
    "source": "iana"
  },
  "text/directory": {
    "source": "iana"
  },
  "text/dns": {
    "source": "iana"
  },
  "text/ecmascript": {
    "source": "iana"
  },
  "text/encaprtp": {
    "source": "iana"
  },
  "text/enriched": {
    "source": "iana"
  },
  "text/fwdred": {
    "source": "iana"
  },
  "text/grammar-ref-list": {
    "source": "iana"
  },
  "text/hjson": {
    "extensions": ["hjson"]
  },
  "text/html": {
    "source": "iana",
    "compressible": true,
    "extensions": ["html","htm","shtml"]
  },
  "text/jade": {
    "extensions": ["jade"]
  },
  "text/javascript": {
    "source": "iana",
    "compressible": true
  },
  "text/jcr-cnd": {
    "source": "iana"
  },
  "text/jsx": {
    "compressible": true,
    "extensions": ["jsx"]
  },
  "text/less": {
    "extensions": ["less"]
  },
  "text/markdown": {
    "source": "iana"
  },
  "text/mathml": {
    "source": "nginx",
    "extensions": ["mml"]
  },
  "text/mizar": {
    "source": "iana"
  },
  "text/n3": {
    "source": "iana",
    "compressible": true,
    "extensions": ["n3"]
  },
  "text/parameters": {
    "source": "iana"
  },
  "text/parityfec": {
    "source": "iana"
  },
  "text/plain": {
    "source": "iana",
    "compressible": true,
    "extensions": ["txt","text","conf","def","list","log","in","ini"]
  },
  "text/provenance-notation": {
    "source": "iana"
  },
  "text/prs.fallenstein.rst": {
    "source": "iana"
  },
  "text/prs.lines.tag": {
    "source": "iana",
    "extensions": ["dsc"]
  },
  "text/raptorfec": {
    "source": "iana"
  },
  "text/red": {
    "source": "iana"
  },
  "text/rfc822-headers": {
    "source": "iana"
  },
  "text/richtext": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtx"]
  },
  "text/rtf": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtf"]
  },
  "text/rtp-enc-aescm128": {
    "source": "iana"
  },
  "text/rtploopback": {
    "source": "iana"
  },
  "text/rtx": {
    "source": "iana"
  },
  "text/sgml": {
    "source": "iana",
    "extensions": ["sgml","sgm"]
  },
  "text/stylus": {
    "extensions": ["stylus","styl"]
  },
  "text/t140": {
    "source": "iana"
  },
  "text/tab-separated-values": {
    "source": "iana",
    "compressible": true,
    "extensions": ["tsv"]
  },
  "text/troff": {
    "source": "iana",
    "extensions": ["t","tr","roff","man","me","ms"]
  },
  "text/turtle": {
    "source": "iana",
    "extensions": ["ttl"]
  },
  "text/ulpfec": {
    "source": "iana"
  },
  "text/uri-list": {
    "source": "iana",
    "compressible": true,
    "extensions": ["uri","uris","urls"]
  },
  "text/vcard": {
    "source": "iana",
    "compressible": true,
    "extensions": ["vcard"]
  },
  "text/vnd.a": {
    "source": "iana"
  },
  "text/vnd.abc": {
    "source": "iana"
  },
  "text/vnd.curl": {
    "source": "iana",
    "extensions": ["curl"]
  },
  "text/vnd.curl.dcurl": {
    "source": "apache",
    "extensions": ["dcurl"]
  },
  "text/vnd.curl.mcurl": {
    "source": "apache",
    "extensions": ["mcurl"]
  },
  "text/vnd.curl.scurl": {
    "source": "apache",
    "extensions": ["scurl"]
  },
  "text/vnd.debian.copyright": {
    "source": "iana"
  },
  "text/vnd.dmclientscript": {
    "source": "iana"
  },
  "text/vnd.dvb.subtitle": {
    "source": "iana",
    "extensions": ["sub"]
  },
  "text/vnd.esmertec.theme-descriptor": {
    "source": "iana"
  },
  "text/vnd.fly": {
    "source": "iana",
    "extensions": ["fly"]
  },
  "text/vnd.fmi.flexstor": {
    "source": "iana",
    "extensions": ["flx"]
  },
  "text/vnd.graphviz": {
    "source": "iana",
    "extensions": ["gv"]
  },
  "text/vnd.in3d.3dml": {
    "source": "iana",
    "extensions": ["3dml"]
  },
  "text/vnd.in3d.spot": {
    "source": "iana",
    "extensions": ["spot"]
  },
  "text/vnd.iptc.newsml": {
    "source": "iana"
  },
  "text/vnd.iptc.nitf": {
    "source": "iana"
  },
  "text/vnd.latex-z": {
    "source": "iana"
  },
  "text/vnd.motorola.reflex": {
    "source": "iana"
  },
  "text/vnd.ms-mediapackage": {
    "source": "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    "source": "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    "source": "iana"
  },
  "text/vnd.si.uricatalogue": {
    "source": "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    "source": "iana",
    "extensions": ["jad"]
  },
  "text/vnd.trolltech.linguist": {
    "source": "iana"
  },
  "text/vnd.wap.si": {
    "source": "iana"
  },
  "text/vnd.wap.sl": {
    "source": "iana"
  },
  "text/vnd.wap.wml": {
    "source": "iana",
    "extensions": ["wml"]
  },
  "text/vnd.wap.wmlscript": {
    "source": "iana",
    "extensions": ["wmls"]
  },
  "text/vtt": {
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["vtt"]
  },
  "text/x-asm": {
    "source": "apache",
    "extensions": ["s","asm"]
  },
  "text/x-c": {
    "source": "apache",
    "extensions": ["c","cc","cxx","cpp","h","hh","dic"]
  },
  "text/x-component": {
    "source": "nginx",
    "extensions": ["htc"]
  },
  "text/x-fortran": {
    "source": "apache",
    "extensions": ["f","for","f77","f90"]
  },
  "text/x-gwt-rpc": {
    "compressible": true
  },
  "text/x-handlebars-template": {
    "extensions": ["hbs"]
  },
  "text/x-java-source": {
    "source": "apache",
    "extensions": ["java"]
  },
  "text/x-jquery-tmpl": {
    "compressible": true
  },
  "text/x-lua": {
    "extensions": ["lua"]
  },
  "text/x-markdown": {
    "compressible": true,
    "extensions": ["markdown","md","mkd"]
  },
  "text/x-nfo": {
    "source": "apache",
    "extensions": ["nfo"]
  },
  "text/x-opml": {
    "source": "apache",
    "extensions": ["opml"]
  },
  "text/x-pascal": {
    "source": "apache",
    "extensions": ["p","pas"]
  },
  "text/x-processing": {
    "compressible": true,
    "extensions": ["pde"]
  },
  "text/x-sass": {
    "extensions": ["sass"]
  },
  "text/x-scss": {
    "extensions": ["scss"]
  },
  "text/x-setext": {
    "source": "apache",
    "extensions": ["etx"]
  },
  "text/x-sfv": {
    "source": "apache",
    "extensions": ["sfv"]
  },
  "text/x-suse-ymp": {
    "compressible": true,
    "extensions": ["ymp"]
  },
  "text/x-uuencode": {
    "source": "apache",
    "extensions": ["uu"]
  },
  "text/x-vcalendar": {
    "source": "apache",
    "extensions": ["vcs"]
  },
  "text/x-vcard": {
    "source": "apache",
    "extensions": ["vcf"]
  },
  "text/xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xml"]
  },
  "text/xml-external-parsed-entity": {
    "source": "iana"
  },
  "text/yaml": {
    "extensions": ["yaml","yml"]
  },
  "video/1d-interleaved-parityfec": {
    "source": "apache"
  },
  "video/3gpp": {
    "source": "apache",
    "extensions": ["3gp","3gpp"]
  },
  "video/3gpp-tt": {
    "source": "apache"
  },
  "video/3gpp2": {
    "source": "apache",
    "extensions": ["3g2"]
  },
  "video/bmpeg": {
    "source": "apache"
  },
  "video/bt656": {
    "source": "apache"
  },
  "video/celb": {
    "source": "apache"
  },
  "video/dv": {
    "source": "apache"
  },
  "video/h261": {
    "source": "apache",
    "extensions": ["h261"]
  },
  "video/h263": {
    "source": "apache",
    "extensions": ["h263"]
  },
  "video/h263-1998": {
    "source": "apache"
  },
  "video/h263-2000": {
    "source": "apache"
  },
  "video/h264": {
    "source": "apache",
    "extensions": ["h264"]
  },
  "video/h264-rcdo": {
    "source": "apache"
  },
  "video/h264-svc": {
    "source": "apache"
  },
  "video/jpeg": {
    "source": "apache",
    "extensions": ["jpgv"]
  },
  "video/jpeg2000": {
    "source": "apache"
  },
  "video/jpm": {
    "source": "apache",
    "extensions": ["jpm","jpgm"]
  },
  "video/mj2": {
    "source": "apache",
    "extensions": ["mj2","mjp2"]
  },
  "video/mp1s": {
    "source": "apache"
  },
  "video/mp2p": {
    "source": "apache"
  },
  "video/mp2t": {
    "source": "apache",
    "extensions": ["ts"]
  },
  "video/mp4": {
    "source": "apache",
    "compressible": false,
    "extensions": ["mp4","mp4v","mpg4"]
  },
  "video/mp4v-es": {
    "source": "apache"
  },
  "video/mpeg": {
    "source": "apache",
    "compressible": false,
    "extensions": ["mpeg","mpg","mpe","m1v","m2v"]
  },
  "video/mpeg4-generic": {
    "source": "apache"
  },
  "video/mpv": {
    "source": "apache"
  },
  "video/nv": {
    "source": "apache"
  },
  "video/ogg": {
    "source": "apache",
    "compressible": false,
    "extensions": ["ogv"]
  },
  "video/parityfec": {
    "source": "apache"
  },
  "video/pointer": {
    "source": "apache"
  },
  "video/quicktime": {
    "source": "apache",
    "compressible": false,
    "extensions": ["qt","mov"]
  },
  "video/raw": {
    "source": "apache"
  },
  "video/rtp-enc-aescm128": {
    "source": "apache"
  },
  "video/rtx": {
    "source": "apache"
  },
  "video/smpte292m": {
    "source": "apache"
  },
  "video/ulpfec": {
    "source": "apache"
  },
  "video/vc1": {
    "source": "apache"
  },
  "video/vnd.cctv": {
    "source": "apache"
  },
  "video/vnd.dece.hd": {
    "source": "apache",
    "extensions": ["uvh","uvvh"]
  },
  "video/vnd.dece.mobile": {
    "source": "apache",
    "extensions": ["uvm","uvvm"]
  },
  "video/vnd.dece.mp4": {
    "source": "apache"
  },
  "video/vnd.dece.pd": {
    "source": "apache",
    "extensions": ["uvp","uvvp"]
  },
  "video/vnd.dece.sd": {
    "source": "apache",
    "extensions": ["uvs","uvvs"]
  },
  "video/vnd.dece.video": {
    "source": "apache",
    "extensions": ["uvv","uvvv"]
  },
  "video/vnd.directv.mpeg": {
    "source": "apache"
  },
  "video/vnd.directv.mpeg-tts": {
    "source": "apache"
  },
  "video/vnd.dlna.mpeg-tts": {
    "source": "apache"
  },
  "video/vnd.dvb.file": {
    "source": "apache",
    "extensions": ["dvb"]
  },
  "video/vnd.fvt": {
    "source": "apache",
    "extensions": ["fvt"]
  },
  "video/vnd.hns.video": {
    "source": "apache"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    "source": "apache"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    "source": "apache"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    "source": "apache"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    "source": "apache"
  },
  "video/vnd.iptvforum.ttsavc": {
    "source": "apache"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    "source": "apache"
  },
  "video/vnd.motorola.video": {
    "source": "apache"
  },
  "video/vnd.motorola.videop": {
    "source": "apache"
  },
  "video/vnd.mpegurl": {
    "source": "apache",
    "extensions": ["mxu","m4u"]
  },
  "video/vnd.ms-playready.media.pyv": {
    "source": "apache",
    "extensions": ["pyv"]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    "source": "apache"
  },
  "video/vnd.nokia.videovoip": {
    "source": "apache"
  },
  "video/vnd.objectvideo": {
    "source": "apache"
  },
  "video/vnd.sealed.mpeg1": {
    "source": "apache"
  },
  "video/vnd.sealed.mpeg4": {
    "source": "apache"
  },
  "video/vnd.sealed.swf": {
    "source": "apache"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    "source": "apache"
  },
  "video/vnd.uvvu.mp4": {
    "source": "apache",
    "extensions": ["uvu","uvvu"]
  },
  "video/vnd.vivo": {
    "source": "apache",
    "extensions": ["viv"]
  },
  "video/webm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["webm"]
  },
  "video/x-f4v": {
    "source": "apache",
    "extensions": ["f4v"]
  },
  "video/x-fli": {
    "source": "apache",
    "extensions": ["fli"]
  },
  "video/x-flv": {
    "source": "apache",
    "compressible": false,
    "extensions": ["flv"]
  },
  "video/x-m4v": {
    "source": "apache",
    "extensions": ["m4v"]
  },
  "video/x-matroska": {
    "source": "apache",
    "compressible": false,
    "extensions": ["mkv","mk3d","mks"]
  },
  "video/x-mng": {
    "source": "apache",
    "extensions": ["mng"]
  },
  "video/x-ms-asf": {
    "source": "apache",
    "extensions": ["asf","asx"]
  },
  "video/x-ms-vob": {
    "source": "apache",
    "extensions": ["vob"]
  },
  "video/x-ms-wm": {
    "source": "apache",
    "extensions": ["wm"]
  },
  "video/x-ms-wmv": {
    "source": "apache",
    "compressible": false,
    "extensions": ["wmv"]
  },
  "video/x-ms-wmx": {
    "source": "apache",
    "extensions": ["wmx"]
  },
  "video/x-ms-wvx": {
    "source": "apache",
    "extensions": ["wvx"]
  },
  "video/x-msvideo": {
    "source": "apache",
    "extensions": ["avi"]
  },
  "video/x-sgi-movie": {
    "source": "apache",
    "extensions": ["movie"]
  },
  "video/x-smv": {
    "source": "apache",
    "extensions": ["smv"]
  },
  "x-conference/x-cooltalk": {
    "source": "apache",
    "extensions": ["ice"]
  },
  "x-shader/x-fragment": {
    "compressible": true
  },
  "x-shader/x-vertex": {
    "compressible": true
  }
}
},{}],"node_modules/faker/lib/locales/en/system/index.js":[function(require,module,exports) {
var system = {};
module['exports'] = system;
system.directoryPaths = require("./directoryPaths");
system.mimeTypes = require("./mimeTypes");

},{"./directoryPaths":"node_modules/faker/lib/locales/en/system/directoryPaths.js","./mimeTypes":"node_modules/faker/lib/locales/en/system/mimeTypes.js"}],"node_modules/faker/lib/locales/en/vehicle/manufacturer.js":[function(require,module,exports) {
module["exports"] = [
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Maserati",
  "Mazda",
  "Mercedes Benz",
  "Mini",
  "Nissan",
  "Polestar",
  "Porsche",
  "Rolls Royce",
  "Smart",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo"
];

},{}],"node_modules/faker/lib/locales/en/vehicle/model.js":[function(require,module,exports) {
module["exports"] = [
  "Fiesta",
  "Focus",
  "Taurus",
  "Mustang",
  "Explorer",
  "Expedition",
  "F-150",
  "Model T",
  "Ranchero",
  "Volt",
  "Cruze",
  "Malibu",
  "Impala",
  "Camaro",
  "Corvette",
  "Colorado",
  "Silverado",
  "El Camino",
  "CTS",
  "XTS",
  "ATS",
  "Escalade",
  "Alpine",
  "Charger",
  "LeBaron",
  "PT Cruiser",
  "Challenger",
  "Durango",
  "Grand Caravan",
  "Wrangler",
  "Grand Cherokee",
  "Roadster",
  "Model S",
  "Model 3",
  "Camry",
  "Prius",
  "Land Cruiser",
  "Accord",
  "Civic",
  "Element",
  "Sentra",
  "Altima",
  "A8",
  "A4",
  "Beetle",
  "Jetta",
  "Golf",
  "911",
  "Spyder",
  "Countach",
  "Mercielago",
  "Aventador",
  "1",
  "2",
  "Fortwo",
  "V90",
  "XC90",
  "CX-9",
];

},{}],"node_modules/faker/lib/locales/en/vehicle/vehicle_type.js":[function(require,module,exports) {
module["exports"] = [
  "Cargo Van",
  "Convertible",
  "Coupe",
  "Crew Cab Pickup",
  "Extended Cab Pickup",
  "Hatchback",
  "Minivan",
  "Passenger Van",
  "SUV",
  "Sedan",
  "Wagon"
];

},{}],"node_modules/faker/lib/locales/en/vehicle/fuel.js":[function(require,module,exports) {
module["exports"] = [
  "Diesel",
  "Electric",
  "Gasoline",
  "Hybrid"
];

},{}],"node_modules/faker/lib/locales/en/vehicle/index.js":[function(require,module,exports) {
var vehicle = {};
module["exports"] = vehicle;
vehicle.manufacturer = require("./manufacturer");
vehicle.model = require("./model");
vehicle.type = require("./vehicle_type");
vehicle.fuel = require("./fuel");

},{"./manufacturer":"node_modules/faker/lib/locales/en/vehicle/manufacturer.js","./model":"node_modules/faker/lib/locales/en/vehicle/model.js","./vehicle_type":"node_modules/faker/lib/locales/en/vehicle/vehicle_type.js","./fuel":"node_modules/faker/lib/locales/en/vehicle/fuel.js"}],"node_modules/faker/lib/locales/en/music/genre.js":[function(require,module,exports) {
module["exports"] = [
    "Rock",
    "Metal",
    "Pop",
    "Electronic",
    "Folk",
    "World",
    "Country",
    "Jazz",
    "Funk",
    "Soul",
    "Hip Hop",
    "Classical",
    "Latin",
    "Reggae",
    "Stage And Screen",
    "Blues",
    "Non Music",
    "Rap"
];

},{}],"node_modules/faker/lib/locales/en/music/index.js":[function(require,module,exports) {
var music = {};
module['exports'] = music;
music.genre = require("./genre");

},{"./genre":"node_modules/faker/lib/locales/en/music/genre.js"}],"node_modules/faker/lib/locales/en/index.js":[function(require,module,exports) {
var en = {};
module['exports'] = en;
en.title = "English";
en.separator = " & ";
en.address = require("./address");
en.company = require("./company");
en.internet = require("./internet");
en.database = require("./database");
en.lorem = require("./lorem");
en.name = require("./name");
en.phone_number = require("./phone_number");
en.cell_phone = require("./cell_phone");
en.business = require("./business");
en.commerce = require("./commerce");
en.team = require("./team");
en.hacker = require("./hacker");
en.app = require("./app");
en.finance = require("./finance");
en.date = require("./date");
en.system = require("./system");
en.vehicle = require("./vehicle");
en.music = require("./music");

},{"./address":"node_modules/faker/lib/locales/en/address/index.js","./company":"node_modules/faker/lib/locales/en/company/index.js","./internet":"node_modules/faker/lib/locales/en/internet/index.js","./database":"node_modules/faker/lib/locales/en/database/index.js","./lorem":"node_modules/faker/lib/locales/en/lorem/index.js","./name":"node_modules/faker/lib/locales/en/name/index.js","./phone_number":"node_modules/faker/lib/locales/en/phone_number/index.js","./cell_phone":"node_modules/faker/lib/locales/en/cell_phone/index.js","./business":"node_modules/faker/lib/locales/en/business/index.js","./commerce":"node_modules/faker/lib/locales/en/commerce/index.js","./team":"node_modules/faker/lib/locales/en/team/index.js","./hacker":"node_modules/faker/lib/locales/en/hacker/index.js","./app":"node_modules/faker/lib/locales/en/app/index.js","./finance":"node_modules/faker/lib/locales/en/finance/index.js","./date":"node_modules/faker/lib/locales/en/date/index.js","./system":"node_modules/faker/lib/locales/en/system/index.js","./vehicle":"node_modules/faker/lib/locales/en/vehicle/index.js","./music":"node_modules/faker/lib/locales/en/music/index.js"}],"node_modules/faker/locale/pt_BR.js":[function(require,module,exports) {
var Faker = require('../lib');
var faker = new Faker({ locale: 'pt_BR', localeFallback: 'en' });
faker.locales['pt_BR'] = require('../lib/locales/pt_BR');
faker.locales['en'] = require('../lib/locales/en');
module['exports'] = faker;

},{"../lib":"node_modules/faker/lib/index.js","../lib/locales/pt_BR":"node_modules/faker/lib/locales/pt_BR/index.js","../lib/locales/en":"node_modules/faker/lib/locales/en/index.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

var _brazilianUtils = require("@brazilian-utils/brazilian-utils");

var _pt_BR = require("faker/locale/pt_BR");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fullName = "".concat(_pt_BR.name.firstName(), " ").concat(_pt_BR.name.lastName());

var email = _pt_BR.internet.email();

var mobilePhone = _pt_BR.phone.phoneNumber('11 #####-####');

var cpf = (0, _brazilianUtils.formatCPF)((0, _brazilianUtils.generateCPF)());
var cnpj = (0, _brazilianUtils.formatCNPJ)((0, _brazilianUtils.generateCNPJ)());

var bankAccount = _pt_BR.finance.account();

var bankAgency = _pt_BR.finance.mask();

var licensePlate = _pt_BR.vehicle.vrm('###-0000');

var inputs = {
  name: fullName,
  email: email,
  phone: mobilePhone,
  cpf: cpf,
  cnpj: cnpj,
  account: bankAccount,
  agency: bankAgency,
  license: licensePlate
};

var fillInputs = function fillInputs(inputs) {
  return Object.entries(inputs).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        id = _ref2[0],
        value = _ref2[1];

    var el = document.getElementById(id);
    el.value = value;
  });
};

fillInputs(inputs);
},{"@brazilian-utils/brazilian-utils":"node_modules/@brazilian-utils/brazilian-utils/dist/brazilian-utils.esm.js","faker/locale/pt_BR":"node_modules/faker/locale/pt_BR.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45645" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map