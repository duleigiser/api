
/**
 * Version: 1.0 Alpha-1 
 * Build Date: 13-Nov-2007
 * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
 */
Date.CultureInfo = {
  name: "en-US",
  englishName: "English (United States)",
  nativeName: "English (United States)",
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
  monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  amDesignator: "AM",
  pmDesignator: "PM",
  firstDayOfWeek: 0,
  twoDigitYearMax: 2029,
  dateElementOrder: "mdy",
  formatPatterns: {
    shortDate: "M/d/yyyy",
    longDate: "dddd, MMMM dd, yyyy",
    shortTime: "h:mm tt",
    longTime: "h:mm:ss tt",
    fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
    sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
    universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
    rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
    monthDay: "MMMM dd",
    yearMonth: "MMMM, yyyy"
  },
  regexPatterns: {
    jan: /^jan(uary)?/i,
    feb: /^feb(ruary)?/i,
    mar: /^mar(ch)?/i,
    apr: /^apr(il)?/i,
    may: /^may/i,
    jun: /^jun(e)?/i,
    jul: /^jul(y)?/i,
    aug: /^aug(ust)?/i,
    sep: /^sep(t(ember)?)?/i,
    oct: /^oct(ober)?/i,
    nov: /^nov(ember)?/i,
    dec: /^dec(ember)?/i,
    sun: /^su(n(day)?)?/i,
    mon: /^mo(n(day)?)?/i,
    tue: /^tu(e(s(day)?)?)?/i,
    wed: /^we(d(nesday)?)?/i,
    thu: /^th(u(r(s(day)?)?)?)?/i,
    fri: /^fr(i(day)?)?/i,
    sat: /^sa(t(urday)?)?/i,
    future: /^next/i,
    past: /^last|past|prev(ious)?/i,
    add: /^(\+|after|from)/i,
    subtract: /^(\-|before|ago)/i,
    yesterday: /^yesterday/i,
    today: /^t(oday)?/i,
    tomorrow: /^tomorrow/i,
    now: /^n(ow)?/i,
    millisecond: /^ms|milli(second)?s?/i,
    second: /^sec(ond)?s?/i,
    minute: /^min(ute)?s?/i,
    hour: /^h(ou)?rs?/i,
    week: /^w(ee)?k/i,
    month: /^m(o(nth)?s?)?/i,
    day: /^d(ays?)?/i,
    year: /^y((ea)?rs?)?/i,
    shortMeridian: /^(a|p)/i,
    longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
    timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,
    ordinalSuffix: /^\s*(st|nd|rd|th)/i,
    timeContext: /^\s*(\:|a|p)/i
  },
  abbreviatedTimeZoneStandard: {
    GMT: "-000",
    EST: "-0400",
    CST: "-0500",
    MST: "-0600",
    PST: "-0700"
  },
  abbreviatedTimeZoneDST: {
    GMT: "-000",
    EDT: "-0500",
    CDT: "-0600",
    MDT: "-0700",
    PDT: "-0800"
  }
};
Date.getMonthNumberFromName = function(name) {
  var n = Date.CultureInfo.monthNames,
    m = Date.CultureInfo.abbreviatedMonthNames,
    s = name.toLowerCase();
  for (var i = 0; i < n.length; i++) {
    if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
      return i;
    }
  }
  return -1;
};
Date.getDayNumberFromName = function(name) {
  var n = Date.CultureInfo.dayNames,
    m = Date.CultureInfo.abbreviatedDayNames,
    o = Date.CultureInfo.shortestDayNames,
    s = name.toLowerCase();
  for (var i = 0; i < n.length; i++) {
    if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
      return i;
    }
  }
  return -1;
};
Date.isLeapYear = function(year) {
  return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};
Date.getDaysInMonth = function(year, month) {
  return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};
Date.getTimezoneOffset = function(s, dst) {
  return (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()] : Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];
};
Date.getTimezoneAbbreviation = function(offset, dst) {
  var n = (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST : Date.CultureInfo.abbreviatedTimeZoneStandard,
    p;
  for (p in n) {
    if (n[p] === offset) {
      return p;
    }
  }
  return null;
};
Date.prototype.clone = function() {
  return new Date(this.getTime());
};
Date.prototype.compareTo = function(date) {
  if (isNaN(this)) {
    throw new Error(this);
  }
  if (date instanceof Date && !isNaN(date)) {
    return (this > date) ? 1 : (this < date) ? -1 : 0;
  } else {
    throw new TypeError(date);
  }
};
Date.prototype.equals = function(date) {
  return (this.compareTo(date) === 0);
};
Date.prototype.between = function(start, end) {
  var t = this.getTime();
  return t >= start.getTime() && t <= end.getTime();
};
Date.prototype.addMilliseconds = function(value) {
  this.setMilliseconds(this.getMilliseconds() + value);
  return this;
};
Date.prototype.addSeconds = function(value) {
  return this.addMilliseconds(value * 1000);
};
Date.prototype.addMinutes = function(value) {
  return this.addMilliseconds(value * 60000);
};
Date.prototype.addHours = function(value) {
  return this.addMilliseconds(value * 3600000);
};
Date.prototype.addDays = function(value) {
  return this.addMilliseconds(value * 86400000);
};
Date.prototype.addWeeks = function(value) {
  return this.addMilliseconds(value * 604800000);
};
Date.prototype.addMonths = function(value) {
  var n = this.getDate();
  this.setDate(1);
  this.setMonth(this.getMonth() + value);
  this.setDate(Math.min(n, this.getDaysInMonth()));
  return this;
};
Date.prototype.addYears = function(value) {
  return this.addMonths(value * 12);
};
Date.prototype.add = function(config) {
  if (typeof config == "number") {
    this._orient = config;
    return this;
  }
  var x = config;
  if (x.millisecond || x.milliseconds) {
    this.addMilliseconds(x.millisecond || x.milliseconds);
  }
  if (x.second || x.seconds) {
    this.addSeconds(x.second || x.seconds);
  }
  if (x.minute || x.minutes) {
    this.addMinutes(x.minute || x.minutes);
  }
  if (x.hour || x.hours) {
    this.addHours(x.hour || x.hours);
  }
  if (x.month || x.months) {
    this.addMonths(x.month || x.months);
  }
  if (x.year || x.years) {
    this.addYears(x.year || x.years);
  }
  if (x.day || x.days) {
    this.addDays(x.day || x.days);
  }
  return this;
};
Date._validate = function(value, min, max, name) {
  if (typeof value != "number") {
    throw new TypeError(value + " is not a Number.");
  } else if (value < min || value > max) {
    throw new RangeError(value + " is not a valid value for " + name + ".");
  }
  return true;
};
Date.validateMillisecond = function(n) {
  return Date._validate(n, 0, 999, "milliseconds");
};
Date.validateSecond = function(n) {
  return Date._validate(n, 0, 59, "seconds");
};
Date.validateMinute = function(n) {
  return Date._validate(n, 0, 59, "minutes");
};
Date.validateHour = function(n) {
  return Date._validate(n, 0, 23, "hours");
};
Date.validateDay = function(n, year, month) {
  return Date._validate(n, 1, Date.getDaysInMonth(year, month), "days");
};
Date.validateMonth = function(n) {
  return Date._validate(n, 0, 11, "months");
};
Date.validateYear = function(n) {
  return Date._validate(n, 1, 9999, "seconds");
};
Date.prototype.set = function(config) {
  var x = config;
  if (!x.millisecond && x.millisecond !== 0) {
    x.millisecond = -1;
  }
  if (!x.second && x.second !== 0) {
    x.second = -1;
  }
  if (!x.minute && x.minute !== 0) {
    x.minute = -1;
  }
  if (!x.hour && x.hour !== 0) {
    x.hour = -1;
  }
  if (!x.day && x.day !== 0) {
    x.day = -1;
  }
  if (!x.month && x.month !== 0) {
    x.month = -1;
  }
  if (!x.year && x.year !== 0) {
    x.year = -1;
  }
  if (x.millisecond != -1 && Date.validateMillisecond(x.millisecond)) {
    this.addMilliseconds(x.millisecond - this.getMilliseconds());
  }
  if (x.second != -1 && Date.validateSecond(x.second)) {
    this.addSeconds(x.second - this.getSeconds());
  }
  if (x.minute != -1 && Date.validateMinute(x.minute)) {
    this.addMinutes(x.minute - this.getMinutes());
  }
  if (x.hour != -1 && Date.validateHour(x.hour)) {
    this.addHours(x.hour - this.getHours());
  }
  if (x.month !== -1 && Date.validateMonth(x.month)) {
    this.addMonths(x.month - this.getMonth());
  }
  if (x.year != -1 && Date.validateYear(x.year)) {
    this.addYears(x.year - this.getFullYear());
  }
  if (x.day != -1 && Date.validateDay(x.day, this.getFullYear(), this.getMonth())) {
    this.addDays(x.day - this.getDate());
  }
  if (x.timezone) {
    this.setTimezone(x.timezone);
  }
  if (x.timezoneOffset) {
    this.setTimezoneOffset(x.timezoneOffset);
  }
  return this;
};
Date.prototype.clearTime = function() {
  this.setHours(0);
  this.setMinutes(0);
  this.setSeconds(0);
  this.setMilliseconds(0);
  return this;
};
Date.prototype.isLeapYear = function() {
  var y = this.getFullYear();
  return (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0));
};
Date.prototype.isWeekday = function() {
  return !(this.is().sat() || this.is().sun());
};
Date.prototype.getDaysInMonth = function() {
  return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};
Date.prototype.moveToFirstDayOfMonth = function() {
  return this.set({
    day: 1
  });
};
Date.prototype.moveToLastDayOfMonth = function() {
  return this.set({
    day: this.getDaysInMonth()
  });
};
Date.prototype.moveToDayOfWeek = function(day, orient) {
  var diff = (day - this.getDay() + 7 * (orient || +1)) % 7;
  return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff);
};
Date.prototype.moveToMonth = function(month, orient) {
  var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
  return this.addMonths((diff === 0) ? diff += 12 * (orient || +1) : diff);
};
Date.prototype.getDayOfYear = function() {
  return Math.floor((this - new Date(this.getFullYear(), 0, 1)) / 86400000);
};
Date.prototype.getWeekOfYear = function(firstDayOfWeek) {
  var y = this.getFullYear(),
    m = this.getMonth(),
    d = this.getDate();
  var dow = firstDayOfWeek || Date.CultureInfo.firstDayOfWeek;
  var offset = 7 + 1 - new Date(y, 0, 1).getDay();
  if (offset == 8) {
    offset = 1;
  }
  var daynum = ((Date.UTC(y, m, d, 0, 0, 0) - Date.UTC(y, 0, 1, 0, 0, 0)) / 86400000) + 1;
  var w = Math.floor((daynum - offset + 7) / 7);
  if (w === dow) {
    y--;
    var prevOffset = 7 + 1 - new Date(y, 0, 1).getDay();
    if (prevOffset == 2 || prevOffset == 8) {
      w = 53;
    } else {
      w = 52;
    }
  }
  return w;
};
Date.prototype.isDST = function() {
  console.log('isDST');
  return this.toString().match(/(E|C|M|P)(S|D)T/)[2] == "D";
};
Date.prototype.getTimezone = function() {
  return Date.getTimezoneAbbreviation(this.getUTCOffset, this.isDST());
};
Date.prototype.setTimezoneOffset = function(s) {
  var here = this.getTimezoneOffset(),
    there = Number(s) * -6 / 10;
  this.addMinutes(there - here);
  return this;
};
Date.prototype.setTimezone = function(s) {
  return this.setTimezoneOffset(Date.getTimezoneOffset(s));
};
Date.prototype.getUTCOffset = function() {
  var n = this.getTimezoneOffset() * -10 / 6,
    r;
  if (n < 0) {
    r = (n - 10000).toString();
    return r[0] + r.substr(2);
  } else {
    r = (n + 10000).toString();
    return "+" + r.substr(1);
  }
};
Date.prototype.getDayName = function(abbrev) {
  return abbrev ? Date.CultureInfo.abbreviatedDayNames[this.getDay()] : Date.CultureInfo.dayNames[this.getDay()];
};
Date.prototype.getMonthName = function(abbrev) {
  return abbrev ? Date.CultureInfo.abbreviatedMonthNames[this.getMonth()] : Date.CultureInfo.monthNames[this.getMonth()];
};
Date.prototype._toString = Date.prototype.toString;
Date.prototype.toString = function(format) {
  var self = this;
  var p = function p(s) {
    return (s.toString().length == 1) ? "0" + s : s;
  };
  return format ? format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g, function(format) {
    switch (format) {
      case "hh":
        return p(self.getHours() < 13 ? self.getHours() : (self.getHours() - 12));
      case "h":
        return self.getHours() < 13 ? self.getHours() : (self.getHours() - 12);
      case "HH":
        return p(self.getHours());
      case "H":
        return self.getHours();
      case "mm":
        return p(self.getMinutes());
      case "m":
        return self.getMinutes();
      case "ss":
        return p(self.getSeconds());
      case "s":
        return self.getSeconds();
      case "yyyy":
        return self.getFullYear();
      case "yy":
        return self.getFullYear().toString().substring(2, 4);
      case "dddd":
        return self.getDayName();
      case "ddd":
        return self.getDayName(true);
      case "dd":
        return p(self.getDate());
      case "d":
        return self.getDate().toString();
      case "MMMM":
        return self.getMonthName();
      case "MMM":
        return self.getMonthName(true);
      case "MM":
        return p((self.getMonth() + 1));
      case "M":
        return self.getMonth() + 1;
      case "t":
        return self.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
      case "tt":
        return self.getHours() < 12 ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
      case "zzz":
      case "zz":
      case "z":
        return "";
    }
  }) : this._toString();
};
Date.now = function() {
  return new Date();
};
Date.today = function() {
  return Date.now().clearTime();
};
Date.prototype._orient = +1;
Date.prototype.next = function() {
  this._orient = +1;
  return this;
};
Date.prototype.last = Date.prototype.prev = Date.prototype.previous = function() {
  this._orient = -1;
  return this;
};
Date.prototype._is = false;
Date.prototype.is = function() {
  this._is = true;
  return this;
};
Number.prototype._dateElement = "day";
Number.prototype.fromNow = function() {
  var c = {};
  c[this._dateElement] = this;
  return Date.now().add(c);
};
Number.prototype.ago = function() {
  var c = {};
  c[this._dateElement] = this * -1;
  return Date.now().add(c);
};
(function() {
  var $D = Date.prototype,
    $N = Number.prototype;
  var dx = ("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),
    mx = ("january february march april may june july august september october november december").split(/\s/),
    px = ("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),
    de;
  var df = function(n) {
    return function() {
      if (this._is) {
        this._is = false;
        return this.getDay() == n;
      }
      return this.moveToDayOfWeek(n, this._orient);
    };
  };
  for (var i = 0; i < dx.length; i++) {
    $D[dx[i]] = $D[dx[i].substring(0, 3)] = df(i);
  }
  var mf = function(n) {
    return function() {
      if (this._is) {
        this._is = false;
        return this.getMonth() === n;
      }
      return this.moveToMonth(n, this._orient);
    };
  };
  for (var j = 0; j < mx.length; j++) {
    $D[mx[j]] = $D[mx[j].substring(0, 3)] = mf(j);
  }
  var ef = function(j) {
    return function() {
      if (j.substring(j.length - 1) != "s") {
        j += "s";
      }
      return this["add" + j](this._orient);
    };
  };
  var nf = function(n) {
    return function() {
      this._dateElement = n;
      return this;
    };
  };
  for (var k = 0; k < px.length; k++) {
    de = px[k].toLowerCase();
    $D[de] = $D[de + "s"] = ef(px[k]);
    $N[de] = $N[de + "s"] = nf(de);
  }
}());
Date.prototype.toJSONString = function() {
  return this.toString("yyyy-MM-ddThh:mm:ssZ");
};
Date.prototype.toShortDateString = function() {
  return this.toString(Date.CultureInfo.formatPatterns.shortDatePattern);
};
Date.prototype.toLongDateString = function() {
  return this.toString(Date.CultureInfo.formatPatterns.longDatePattern);
};
Date.prototype.toShortTimeString = function() {
  return this.toString(Date.CultureInfo.formatPatterns.shortTimePattern);
};
Date.prototype.toLongTimeString = function() {
  return this.toString(Date.CultureInfo.formatPatterns.longTimePattern);
};
Date.prototype.getOrdinal = function() {
  switch (this.getDate()) {
    case 1:
    case 21:
    case 31:
      return "st";
    case 2:
    case 22:
      return "nd";
    case 3:
    case 23:
      return "rd";
    default:
      return "th";
  }
};
(function() {
  Date.Parsing = {
    Exception: function(s) {
      this.message = "Parse error at '" + s.substring(0, 10) + " ...'";
    }
  };
  var $P = Date.Parsing;
  var _ = $P.Operators = {
    rtoken: function(r) {
      return function(s) {
        var mx = s.match(r);
        if (mx) {
          return ([mx[0], s.substring(mx[0].length)]);
        } else {
          throw new $P.Exception(s);
        }
      };
    },
    token: function(s) {
      return function(s) {
        return _.rtoken(new RegExp("^\s*" + s + "\s*"))(s);
      };
    },
    stoken: function(s) {
      return _.rtoken(new RegExp("^" + s));
    },
    until: function(p) {
      return function(s) {
        var qx = [],
          rx = null;
        while (s.length) {
          try {
            rx = p.call(this, s);
          } catch (e) {
            qx.push(rx[0]);
            s = rx[1];
            continue;
          }
          break;
        }
        return [qx, s];
      };
    },
    many: function(p) {
      return function(s) {
        var rx = [],
          r = null;
        while (s.length) {
          try {
            r = p.call(this, s);
          } catch (e) {
            return [rx, s];
          }
          rx.push(r[0]);
          s = r[1];
        }
        return [rx, s];
      };
    },
    optional: function(p) {
      return function(s) {
        var r = null;
        try {
          r = p.call(this, s);
        } catch (e) {
          return [null, s];
        }
        return [r[0], r[1]];
      };
    },
    not: function(p) {
      return function(s) {
        try {
          p.call(this, s);
        } catch (e) {
          return [null, s];
        }
        throw new $P.Exception(s);
      };
    },
    ignore: function(p) {
      return p ? function(s) {
        var r = null;
        r = p.call(this, s);
        return [null, r[1]];
      } : null;
    },
    product: function() {
      var px = arguments[0],
        qx = Array.prototype.slice.call(arguments, 1),
        rx = [];
      for (var i = 0; i < px.length; i++) {
        rx.push(_.each(px[i], qx));
      }
      return rx;
    },
    cache: function(rule) {
      var cache = {},
        r = null;
      return function(s) {
        try {
          r = cache[s] = (cache[s] || rule.call(this, s));
        } catch (e) {
          r = cache[s] = e;
        }
        if (r instanceof $P.Exception) {
          throw r;
        } else {
          return r;
        }
      };
    },
    any: function() {
      var px = arguments;
      return function(s) {
        var r = null;
        for (var i = 0; i < px.length; i++) {
          if (px[i] == null) {
            continue;
          }
          try {
            r = (px[i].call(this, s));
          } catch (e) {
            r = null;
          }
          if (r) {
            return r;
          }
        }
        throw new $P.Exception(s);
      };
    },
    each: function() {
      var px = arguments;
      return function(s) {
        var rx = [],
          r = null;
        for (var i = 0; i < px.length; i++) {
          if (px[i] == null) {
            continue;
          }
          try {
            r = (px[i].call(this, s));
          } catch (e) {
            throw new $P.Exception(s);
          }
          rx.push(r[0]);
          s = r[1];
        }
        return [rx, s];
      };
    },
    all: function() {
      var px = arguments,
        _ = _;
      return _.each(_.optional(px));
    },
    sequence: function(px, d, c) {
      d = d || _.rtoken(/^\s*/);
      c = c || null;
      if (px.length == 1) {
        return px[0];
      }
      return function(s) {
        var r = null,
          q = null;
        var rx = [];
        for (var i = 0; i < px.length; i++) {
          try {
            r = px[i].call(this, s);
          } catch (e) {
            break;
          }
          rx.push(r[0]);
          try {
            q = d.call(this, r[1]);
          } catch (ex) {
            q = null;
            break;
          }
          s = q[1];
        }
        if (!r) {
          throw new $P.Exception(s);
        }
        if (q) {
          throw new $P.Exception(q[1]);
        }
        if (c) {
          try {
            r = c.call(this, r[1]);
          } catch (ey) {
            throw new $P.Exception(r[1]);
          }
        }
        return [rx, (r ? r[1] : s)];
      };
    },
    between: function(d1, p, d2) {
      d2 = d2 || d1;
      var _fn = _.each(_.ignore(d1), p, _.ignore(d2));
      return function(s) {
        var rx = _fn.call(this, s);
        return [
          [rx[0][0], r[0][2]], rx[1]
        ];
      };
    },
    list: function(p, d, c) {
      d = d || _.rtoken(/^\s*/);
      c = c || null;
      return (p instanceof Array ? _.each(_.product(p.slice(0, -1), _.ignore(d)), p.slice(-1), _.ignore(c)) : _.each(_.many(_.each(p, _.ignore(d))), px, _.ignore(c)));
    },
    set: function(px, d, c) {
      d = d || _.rtoken(/^\s*/);
      c = c || null;
      return function(s) {
        var r = null,
          p = null,
          q = null,
          rx = null,
          best = [
            [], s
          ],
          last = false;
        for (var i = 0; i < px.length; i++) {
          q = null;
          p = null;
          r = null;
          last = (px.length == 1);
          try {
            r = px[i].call(this, s);
          } catch (e) {
            continue;
          }
          rx = [
            [r[0]], r[1]
          ];
          if (r[1].length > 0 && !last) {
            try {
              q = d.call(this, r[1]);
            } catch (ex) {
              last = true;
            }
          } else {
            last = true;
          }
          if (!last && q[1].length === 0) {
            last = true;
          }
          if (!last) {
            var qx = [];
            for (var j = 0; j < px.length; j++) {
              if (i != j) {
                qx.push(px[j]);
              }
            }
            p = _.set(qx, d).call(this, q[1]);
            if (p[0].length > 0) {
              rx[0] = rx[0].concat(p[0]);
              rx[1] = p[1];
            }
          }
          if (rx[1].length < best[1].length) {
            best = rx;
          }
          if (best[1].length === 0) {
            break;
          }
        }
        if (best[0].length === 0) {
          return best;
        }
        if (c) {
          try {
            q = c.call(this, best[1]);
          } catch (ey) {
            throw new $P.Exception(best[1]);
          }
          best[1] = q[1];
        }
        return best;
      };
    },
    forward: function(gr, fname) {
      return function(s) {
        return gr[fname].call(this, s);
      };
    },
    replace: function(rule, repl) {
      return function(s) {
        var r = rule.call(this, s);
        return [repl, r[1]];
      };
    },
    process: function(rule, fn) {
      return function(s) {
        var r = rule.call(this, s);
        return [fn.call(this, r[0]), r[1]];
      };
    },
    min: function(min, rule) {
      return function(s) {
        var rx = rule.call(this, s);
        if (rx[0].length < min) {
          throw new $P.Exception(s);
        }
        return rx;
      };
    }
  };
  var _generator = function(op) {
    return function() {
      var args = null,
        rx = [];
      if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments);
      } else if (arguments[0] instanceof Array) {
        args = arguments[0];
      }
      if (args) {
        for (var i = 0, px = args.shift(); i < px.length; i++) {
          args.unshift(px[i]);
          rx.push(op.apply(null, args));
          args.shift();
          return rx;
        }
      } else {
        return op.apply(null, arguments);
      }
    };
  };
  var gx = "optional not ignore cache".split(/\s/);
  for (var i = 0; i < gx.length; i++) {
    _[gx[i]] = _generator(_[gx[i]]);
  }
  var _vector = function(op) {
    return function() {
      if (arguments[0] instanceof Array) {
        return op.apply(null, arguments[0]);
      } else {
        return op.apply(null, arguments);
      }
    };
  };
  var vx = "each any all".split(/\s/);
  for (var j = 0; j < vx.length; j++) {
    _[vx[j]] = _vector(_[vx[j]]);
  }
}());
(function() {
  var flattenAndCompact = function(ax) {
    var rx = [];
    for (var i = 0; i < ax.length; i++) {
      if (ax[i] instanceof Array) {
        rx = rx.concat(flattenAndCompact(ax[i]));
      } else {
        if (ax[i]) {
          rx.push(ax[i]);
        }
      }
    }
    return rx;
  };
  Date.Grammar = {};
  Date.Translator = {
    hour: function(s) {
      return function() {
        this.hour = Number(s);
      };
    },
    minute: function(s) {
      return function() {
        this.minute = Number(s);
      };
    },
    second: function(s) {
      return function() {
        this.second = Number(s);
      };
    },
    meridian: function(s) {
      return function() {
        this.meridian = s.slice(0, 1).toLowerCase();
      };
    },
    timezone: function(s) {
      return function() {
        var n = s.replace(/[^\d\+\-]/g, "");
        if (n.length) {
          this.timezoneOffset = Number(n);
        } else {
          this.timezone = s.toLowerCase();
        }
      };
    },
    day: function(x) {
      var s = x[0];
      return function() {
        this.day = Number(s.match(/\d+/)[0]);
      };
    },
    month: function(s) {
      return function() {
        this.month = ((s.length == 3) ? Date.getMonthNumberFromName(s) : (Number(s) - 1));
      };
    },
    year: function(s) {
      return function() {
        var n = Number(s);
        this.year = ((s.length > 2) ? n : (n + (((n + 2000) < Date.CultureInfo.twoDigitYearMax) ? 2000 : 1900)));
      };
    },
    rday: function(s) {
      return function() {
        switch (s) {
          case "yesterday":
            this.days = -1;
            break;
          case "tomorrow":
            this.days = 1;
            break;
          case "today":
            this.days = 0;
            break;
          case "now":
            this.days = 0;
            this.now = true;
            break;
        }
      };
    },
    finishExact: function(x) {
      x = (x instanceof Array) ? x : [x];
      var now = new Date();
      this.year = now.getFullYear();
      this.month = now.getMonth();
      this.day = 1;
      this.hour = 0;
      this.minute = 0;
      this.second = 0;
      for (var i = 0; i < x.length; i++) {
        if (x[i]) {
          x[i].call(this);
        }
      }
      this.hour = (this.meridian == "p" && this.hour < 13) ? this.hour + 12 : this.hour;
      if (this.day > Date.getDaysInMonth(this.year, this.month)) {
        throw new RangeError(this.day + " is not a valid value for days.");
      }
      var r = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
      if (this.timezone) {
        r.set({
          timezone: this.timezone
        });
      } else if (this.timezoneOffset) {
        r.set({
          timezoneOffset: this.timezoneOffset
        });
      }
      return r;
    },
    finish: function(x) {
      x = (x instanceof Array) ? flattenAndCompact(x) : [x];
      if (x.length === 0) {
        return null;
      }
      for (var i = 0; i < x.length; i++) {
        if (typeof x[i] == "function") {
          x[i].call(this);
        }
      }
      if (this.now) {
        return new Date();
      }
      var today = Date.today();
      var method = null;
      var expression = !!(this.days != null || this.orient || this.operator);
      if (expression) {
        var gap, mod, orient;
        orient = ((this.orient == "past" || this.operator == "subtract") ? -1 : 1);
        if (this.weekday) {
          this.unit = "day";
          gap = (Date.getDayNumberFromName(this.weekday) - today.getDay());
          mod = 7;
          this.days = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
        }
        if (this.month) {
          this.unit = "month";
          gap = (this.month - today.getMonth());
          mod = 12;
          this.months = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
          this.month = null;
        }
        if (!this.unit) {
          this.unit = "day";
        }
        if (this[this.unit + "s"] == null || this.operator != null) {
          if (!this.value) {
            this.value = 1;
          }
          if (this.unit == "week") {
            this.unit = "day";
            this.value = this.value * 7;
          }
          this[this.unit + "s"] = this.value * orient;
        }
        return today.add(this);
      } else {
        if (this.meridian && this.hour) {
          this.hour = (this.hour < 13 && this.meridian == "p") ? this.hour + 12 : this.hour;
        }
        if (this.weekday && !this.day) {
          this.day = (today.addDays((Date.getDayNumberFromName(this.weekday) - today.getDay()))).getDate();
        }
        if (this.month && !this.day) {
          this.day = 1;
        }
        return today.set(this);
      }
    }
  };
  var _ = Date.Parsing.Operators,
    g = Date.Grammar,
    t = Date.Translator,
    _fn;
  g.datePartDelimiter = _.rtoken(/^([\s\-\.\,\/\x27]+)/);
  g.timePartDelimiter = _.stoken(":");
  g.whiteSpace = _.rtoken(/^\s*/);
  g.generalDelimiter = _.rtoken(/^(([\s\,]|at|on)+)/);
  var _C = {};
  g.ctoken = function(keys) {
    var fn = _C[keys];
    if (!fn) {
      var c = Date.CultureInfo.regexPatterns;
      var kx = keys.split(/\s+/),
        px = [];
      for (var i = 0; i < kx.length; i++) {
        px.push(_.replace(_.rtoken(c[kx[i]]), kx[i]));
      }
      fn = _C[keys] = _.any.apply(null, px);
    }
    return fn;
  };
  g.ctoken2 = function(key) {
    return _.rtoken(Date.CultureInfo.regexPatterns[key]);
  };
  g.h = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), t.hour));
  g.hh = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/), t.hour));
  g.H = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), t.hour));
  g.HH = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/), t.hour));
  g.m = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.minute));
  g.mm = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.minute));
  g.s = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.second));
  g.ss = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.second));
  g.hms = _.cache(_.sequence([g.H, g.mm, g.ss], g.timePartDelimiter));
  g.t = _.cache(_.process(g.ctoken2("shortMeridian"), t.meridian));
  g.tt = _.cache(_.process(g.ctoken2("longMeridian"), t.meridian));
  g.z = _.cache(_.process(_.rtoken(/^(\+|\-)?\s*\d\d\d\d?/), t.timezone));
  g.zz = _.cache(_.process(_.rtoken(/^(\+|\-)\s*\d\d\d\d/), t.timezone));
  g.zzz = _.cache(_.process(g.ctoken2("timezone"), t.timezone));
  g.timeSuffix = _.each(_.ignore(g.whiteSpace), _.set([g.tt, g.zzz]));
  g.time = _.each(_.optional(_.ignore(_.stoken("T"))), g.hms, g.timeSuffix);
  g.d = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
  g.dd = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
  g.ddd = g.dddd = _.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"), function(s) {
    return function() {
      this.weekday = s;
    };
  }));
  g.M = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/), t.month));
  g.MM = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/), t.month));
  g.MMM = g.MMMM = _.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), t.month));
  g.y = _.cache(_.process(_.rtoken(/^(\d\d?)/), t.year));
  g.yy = _.cache(_.process(_.rtoken(/^(\d\d)/), t.year));
  g.yyy = _.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/), t.year));
  g.yyyy = _.cache(_.process(_.rtoken(/^(\d\d\d\d)/), t.year));
  _fn = function() {
    return _.each(_.any.apply(null, arguments), _.not(g.ctoken2("timeContext")));
  };
  g.day = _fn(g.d, g.dd);
  g.month = _fn(g.M, g.MMM);
  g.year = _fn(g.yyyy, g.yy);
  g.orientation = _.process(g.ctoken("past future"), function(s) {
    return function() {
      this.orient = s;
    };
  });
  g.operator = _.process(g.ctoken("add subtract"), function(s) {
    return function() {
      this.operator = s;
    };
  });
  g.rday = _.process(g.ctoken("yesterday tomorrow today now"), t.rday);
  g.unit = _.process(g.ctoken("minute hour day week month year"), function(s) {
    return function() {
      this.unit = s;
    };
  });
  g.value = _.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/), function(s) {
    return function() {
      this.value = s.replace(/\D/g, "");
    };
  });
  g.expression = _.set([g.rday, g.operator, g.value, g.unit, g.orientation, g.ddd, g.MMM]);
  _fn = function() {
    return _.set(arguments, g.datePartDelimiter);
  };
  g.mdy = _fn(g.ddd, g.month, g.day, g.year);
  g.ymd = _fn(g.ddd, g.year, g.month, g.day);
  g.dmy = _fn(g.ddd, g.day, g.month, g.year);
  g.date = function(s) {
    return ((g[Date.CultureInfo.dateElementOrder] || g.mdy).call(this, s));
  };
  g.format = _.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function(fmt) {
    if (g[fmt]) {
      return g[fmt];
    } else {
      throw Date.Parsing.Exception(fmt);
    }
  }), _.process(_.rtoken(/^[^dMyhHmstz]+/), function(s) {
    return _.ignore(_.stoken(s));
  }))), function(rules) {
    return _.process(_.each.apply(null, rules), t.finishExact);
  });
  var _F = {};
  var _get = function(f) {
    return _F[f] = (_F[f] || g.format(f)[0]);
  };
  g.formats = function(fx) {
    if (fx instanceof Array) {
      var rx = [];
      for (var i = 0; i < fx.length; i++) {
        rx.push(_get(fx[i]));
      }
      return _.any.apply(null, rx);
    } else {
      return _get(fx);
    }
  };
  g._formats = g.formats(["yyyy-MM-ddTHH:mm:ss", "ddd, MMM dd, yyyy H:mm:ss tt", "ddd MMM d yyyy HH:mm:ss zzz", "d"]);
  g._start = _.process(_.set([g.date, g.time, g.expression], g.generalDelimiter, g.whiteSpace), t.finish);
  g.start = function(s) {
    try {
      var r = g._formats.call({}, s);
      if (r[1].length === 0) {
        return r;
      }
    } catch (e) {}
    return g._start.call({}, s);
  };
}());
Date._parse = Date.parse;
Date.parse = function(s) {
  var r = null;
  if (!s) {
    return null;
  }
  try {
    r = Date.Grammar.start.call({}, s);
  } catch (e) {
    return null;
  }
  return ((r[1].length === 0) ? r[0] : null);
};
Date.getParseFunction = function(fx) {
  var fn = Date.Grammar.formats(fx);
  return function(s) {
    var r = null;
    try {
      r = fn.call({}, s);
    } catch (e) {
      return null;
    }
    return ((r[1].length === 0) ? r[0] : null);
  };
};
Date.parseExact = function(s, fx) {
  return Date.getParseFunction(fx)(s);
};

/*! jQuery v2.0.3 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-2.0.3.min.map
*/
(function(e, undefined) {
  var t, n, r = typeof undefined,
    i = e.location,
    o = e.document,
    s = o.documentElement,
    a = e.jQuery,
    u = e.$,
    l = {},
    c = [],
    p = "2.0.3",
    f = c.concat,
    h = c.push,
    d = c.slice,
    g = c.indexOf,
    m = l.toString,
    y = l.hasOwnProperty,
    v = p.trim,
    x = function(e, n) {
      return new x.fn.init(e, n, t)
    },
    b = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    w = /\S+/g,
    T = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    k = /^-ms-/,
    N = /-([\da-z])/gi,
    E = function(e, t) {
      return t.toUpperCase()
    },
    S = function() {
      o.removeEventListener("DOMContentLoaded", S, !1), e.removeEventListener("load", S, !1), x.ready()
    };
  x.fn = x.prototype = {
    jquery: p,
    constructor: x,
    init: function(e, t, n) {
      var r, i;
      if (!e) return this;
      if ("string" == typeof e) {
        if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : T.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
        if (r[1]) {
          if (t = t instanceof x ? t[0] : t, x.merge(this, x.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : o, !0)), C.test(r[1]) && x.isPlainObject(t))
            for (r in t) x.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
          return this
        }
        return i = o.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = o, this.selector = e, this
      }
      return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? n.ready(e) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), x.makeArray(e, this))
    },
    selector: "",
    length: 0,
    toArray: function() {
      return d.call(this)
    },
    get: function(e) {
      return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
    },
    pushStack: function(e) {
      var t = x.merge(this.constructor(), e);
      return t.prevObject = this, t.context = this.context, t
    },
    each: function(e, t) {
      return x.each(this, e, t)
    },
    ready: function(e) {
      return x.ready.promise().done(e), this
    },
    slice: function() {
      return this.pushStack(d.apply(this, arguments))
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq(-1)
    },
    eq: function(e) {
      var t = this.length,
        n = +e + (0 > e ? t : 0);
      return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
    },
    map: function(e) {
      return this.pushStack(x.map(this, function(t, n) {
        return e.call(t, n, t)
      }))
    },
    end: function() {
      return this.prevObject || this.constructor(null)
    },
    push: h,
    sort: [].sort,
    splice: [].splice
  }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function() {
    var e, t, n, r, i, o, s = arguments[0] || {},
      a = 1,
      u = arguments.length,
      l = !1;
    for ("boolean" == typeof s && (l = s, s = arguments[1] || {}, a = 2), "object" == typeof s || x.isFunction(s) || (s = {}), u === a && (s = this, --a); u > a; a++)
      if (null != (e = arguments[a]))
        for (t in e) n = s[t], r = e[t], s !== r && (l && r && (x.isPlainObject(r) || (i = x.isArray(r))) ? (i ? (i = !1, o = n && x.isArray(n) ? n : []) : o = n && x.isPlainObject(n) ? n : {}, s[t] = x.extend(l, o, r)) : r !== undefined && (s[t] = r));
    return s
  }, x.extend({
    expando: "jQuery" + (p + Math.random()).replace(/\D/g, ""),
    noConflict: function(t) {
      return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = a), x
    },
    isReady: !1,
    readyWait: 1,
    holdReady: function(e) {
      e ? x.readyWait++ : x.ready(!0)
    },
    ready: function(e) {
      (e === !0 ? --x.readyWait : x.isReady) || (x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(o, [x]), x.fn.trigger && x(o).trigger("ready").off("ready")))
    },
    isFunction: function(e) {
      return "function" === x.type(e)
    },
    isArray: Array.isArray,
    isWindow: function(e) {
      return null != e && e === e.window
    },
    isNumeric: function(e) {
      return !isNaN(parseFloat(e)) && isFinite(e)
    },
    type: function(e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[m.call(e)] || "object" : typeof e
    },
    isPlainObject: function(e) {
      if ("object" !== x.type(e) || e.nodeType || x.isWindow(e)) return !1;
      try {
        if (e.constructor && !y.call(e.constructor.prototype, "isPrototypeOf")) return !1
      } catch (t) {
        return !1
      }
      return !0
    },
    isEmptyObject: function(e) {
      var t;
      for (t in e) return !1;
      return !0
    },
    error: function(e) {
      throw Error(e)
    },
    parseHTML: function(e, t, n) {
      if (!e || "string" != typeof e) return null;
      "boolean" == typeof t && (n = t, t = !1), t = t || o;
      var r = C.exec(e),
        i = !n && [];
      return r ? [t.createElement(r[1])] : (r = x.buildFragment([e], t, i), i && x(i).remove(), x.merge([], r.childNodes))
    },
    parseJSON: JSON.parse,
    parseXML: function(e) {
      var t, n;
      if (!e || "string" != typeof e) return null;
      try {
        n = new DOMParser, t = n.parseFromString(e, "text/xml")
      } catch (r) {
        t = undefined
      }
      return (!t || t.getElementsByTagName("parsererror").length) && x.error("Invalid XML: " + e), t
    },
    noop: function() {},
    globalEval: function(e) {
      var t, n = eval;
      e = x.trim(e), e && (1 === e.indexOf("use strict") ? (t = o.createElement("script"), t.text = e, o.head.appendChild(t).parentNode.removeChild(t)) : n(e))
    },
    camelCase: function(e) {
      return e.replace(k, "ms-").replace(N, E)
    },
    nodeName: function(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    },
    each: function(e, t, n) {
      var r, i = 0,
        o = e.length,
        s = j(e);
      if (n) {
        if (s) {
          for (; o > i; i++)
            if (r = t.apply(e[i], n), r === !1) break
        } else
          for (i in e)
            if (r = t.apply(e[i], n), r === !1) break
      } else if (s) {
        for (; o > i; i++)
          if (r = t.call(e[i], i, e[i]), r === !1) break
      } else
        for (i in e)
          if (r = t.call(e[i], i, e[i]), r === !1) break;
      return e
    },
    trim: function(e) {
      return null == e ? "" : v.call(e)
    },
    makeArray: function(e, t) {
      var n = t || [];
      return null != e && (j(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : h.call(n, e)), n
    },
    inArray: function(e, t, n) {
      return null == t ? -1 : g.call(t, e, n)
    },
    merge: function(e, t) {
      var n = t.length,
        r = e.length,
        i = 0;
      if ("number" == typeof n)
        for (; n > i; i++) e[r++] = t[i];
      else
        while (t[i] !== undefined) e[r++] = t[i++];
      return e.length = r, e
    },
    grep: function(e, t, n) {
      var r, i = [],
        o = 0,
        s = e.length;
      for (n = !!n; s > o; o++) r = !!t(e[o], o), n !== r && i.push(e[o]);
      return i
    },
    map: function(e, t, n) {
      var r, i = 0,
        o = e.length,
        s = j(e),
        a = [];
      if (s)
        for (; o > i; i++) r = t(e[i], i, n), null != r && (a[a.length] = r);
      else
        for (i in e) r = t(e[i], i, n), null != r && (a[a.length] = r);
      return f.apply([], a)
    },
    guid: 1,
    proxy: function(e, t) {
      var n, r, i;
      return "string" == typeof t && (n = e[t], t = e, e = n), x.isFunction(e) ? (r = d.call(arguments, 2), i = function() {
        return e.apply(t || this, r.concat(d.call(arguments)))
      }, i.guid = e.guid = e.guid || x.guid++, i) : undefined
    },
    access: function(e, t, n, r, i, o, s) {
      var a = 0,
        u = e.length,
        l = null == n;
      if ("object" === x.type(n)) {
        i = !0;
        for (a in n) x.access(e, t, a, n[a], !0, o, s)
      } else if (r !== undefined && (i = !0, x.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
          return l.call(x(e), n)
        })), t))
        for (; u > a; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
      return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
    },
    now: Date.now,
    swap: function(e, t, n, r) {
      var i, o, s = {};
      for (o in t) s[o] = e.style[o], e.style[o] = t[o];
      i = n.apply(e, r || []);
      for (o in t) e.style[o] = s[o];
      return i
    }
  }), x.ready.promise = function(t) {
    return n || (n = x.Deferred(), "complete" === o.readyState ? setTimeout(x.ready) : (o.addEventListener("DOMContentLoaded", S, !1), e.addEventListener("load", S, !1))), n.promise(t)
  }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
    l["[object " + t + "]"] = t.toLowerCase()
  });

  function j(e) {
    var t = e.length,
      n = x.type(e);
    return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
  }
  t = x(o),
    function(e, undefined) {
      var t, n, r, i, o, s, a, u, l, c, p, f, h, d, g, m, y, v = "sizzle" + -new Date,
        b = e.document,
        w = 0,
        T = 0,
        C = st(),
        k = st(),
        N = st(),
        E = !1,
        S = function(e, t) {
          return e === t ? (E = !0, 0) : 0
        },
        j = typeof undefined,
        D = 1 << 31,
        A = {}.hasOwnProperty,
        L = [],
        q = L.pop,
        H = L.push,
        O = L.push,
        F = L.slice,
        P = L.indexOf || function(e) {
          var t = 0,
            n = this.length;
          for (; n > t; t++)
            if (this[t] === e) return t;
          return -1
        },
        R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        M = "[\\x20\\t\\r\\n\\f]",
        W = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        $ = W.replace("w", "w#"),
        B = "\\[" + M + "*(" + W + ")" + M + "*(?:([*^$|!~]?=)" + M + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + $ + ")|)|)" + M + "*\\]",
        I = ":(" + W + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + B.replace(3, 8) + ")*)|.*)\\)|)",
        z = RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
        _ = RegExp("^" + M + "*," + M + "*"),
        X = RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
        U = RegExp(M + "*[+~]"),
        Y = RegExp("=" + M + "*([^\\]'\"]*)" + M + "*\\]", "g"),
        V = RegExp(I),
        G = RegExp("^" + $ + "$"),
        J = {
          ID: RegExp("^#(" + W + ")"),
          CLASS: RegExp("^\\.(" + W + ")"),
          TAG: RegExp("^(" + W.replace("w", "w*") + ")"),
          ATTR: RegExp("^" + B),
          PSEUDO: RegExp("^" + I),
          CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
          bool: RegExp("^(?:" + R + ")$", "i"),
          needsContext: RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
        },
        Q = /^[^{]+\{\s*\[native \w/,
        K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        Z = /^(?:input|select|textarea|button)$/i,
        et = /^h\d$/i,
        tt = /'|\\/g,
        nt = RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
        rt = function(e, t, n) {
          var r = "0x" + t - 65536;
          return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)
        };
      try {
        O.apply(L = F.call(b.childNodes), b.childNodes), L[b.childNodes.length].nodeType
      } catch (it) {
        O = {
          apply: L.length ? function(e, t) {
            H.apply(e, F.call(t))
          } : function(e, t) {
            var n = e.length,
              r = 0;
            while (e[n++] = t[r++]);
            e.length = n - 1
          }
        }
      }

      function ot(e, t, r, i) {
        var o, s, a, u, l, f, g, m, x, w;
        if ((t ? t.ownerDocument || t : b) !== p && c(t), t = t || p, r = r || [], !e || "string" != typeof e) return r;
        if (1 !== (u = t.nodeType) && 9 !== u) return [];
        if (h && !i) {
          if (o = K.exec(e))
            if (a = o[1]) {
              if (9 === u) {
                if (s = t.getElementById(a), !s || !s.parentNode) return r;
                if (s.id === a) return r.push(s), r
              } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(a)) && y(t, s) && s.id === a) return r.push(s), r
            } else {
              if (o[2]) return O.apply(r, t.getElementsByTagName(e)), r;
              if ((a = o[3]) && n.getElementsByClassName && t.getElementsByClassName) return O.apply(r, t.getElementsByClassName(a)), r
            }
          if (n.qsa && (!d || !d.test(e))) {
            if (m = g = v, x = t, w = 9 === u && e, 1 === u && "object" !== t.nodeName.toLowerCase()) {
              f = gt(e), (g = t.getAttribute("id")) ? m = g.replace(tt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", l = f.length;
              while (l--) f[l] = m + mt(f[l]);
              x = U.test(e) && t.parentNode || t, w = f.join(",")
            }
            if (w) try {
              return O.apply(r, x.querySelectorAll(w)), r
            } catch (T) {} finally {
              g || t.removeAttribute("id")
            }
          }
        }
        return kt(e.replace(z, "$1"), t, r, i)
      }

      function st() {
        var e = [];

        function t(n, r) {
          return e.push(n += " ") > i.cacheLength && delete t[e.shift()], t[n] = r
        }
        return t
      }

      function at(e) {
        return e[v] = !0, e
      }

      function ut(e) {
        var t = p.createElement("div");
        try {
          return !!e(t)
        } catch (n) {
          return !1
        } finally {
          t.parentNode && t.parentNode.removeChild(t), t = null
        }
      }

      function lt(e, t) {
        var n = e.split("|"),
          r = e.length;
        while (r--) i.attrHandle[n[r]] = t
      }

      function ct(e, t) {
        var n = t && e,
          r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || D) - (~e.sourceIndex || D);
        if (r) return r;
        if (n)
          while (n = n.nextSibling)
            if (n === t) return -1;
        return e ? 1 : -1
      }

      function pt(e) {
        return function(t) {
          var n = t.nodeName.toLowerCase();
          return "input" === n && t.type === e
        }
      }

      function ft(e) {
        return function(t) {
          var n = t.nodeName.toLowerCase();
          return ("input" === n || "button" === n) && t.type === e
        }
      }

      function ht(e) {
        return at(function(t) {
          return t = +t, at(function(n, r) {
            var i, o = e([], n.length, t),
              s = o.length;
            while (s--) n[i = o[s]] && (n[i] = !(r[i] = n[i]))
          })
        })
      }
      s = ot.isXML = function(e) {
        var t = e && (e.ownerDocument || e).documentElement;
        return t ? "HTML" !== t.nodeName : !1
      }, n = ot.support = {}, c = ot.setDocument = function(e) {
        var t = e ? e.ownerDocument || e : b,
          r = t.defaultView;
        return t !== p && 9 === t.nodeType && t.documentElement ? (p = t, f = t.documentElement, h = !s(t), r && r.attachEvent && r !== r.top && r.attachEvent("onbeforeunload", function() {
          c()
        }), n.attributes = ut(function(e) {
          return e.className = "i", !e.getAttribute("className")
        }), n.getElementsByTagName = ut(function(e) {
          return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
        }), n.getElementsByClassName = ut(function(e) {
          return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
        }), n.getById = ut(function(e) {
          return f.appendChild(e).id = v, !t.getElementsByName || !t.getElementsByName(v).length
        }), n.getById ? (i.find.ID = function(e, t) {
          if (typeof t.getElementById !== j && h) {
            var n = t.getElementById(e);
            return n && n.parentNode ? [n] : []
          }
        }, i.filter.ID = function(e) {
          var t = e.replace(nt, rt);
          return function(e) {
            return e.getAttribute("id") === t
          }
        }) : (delete i.find.ID, i.filter.ID = function(e) {
          var t = e.replace(nt, rt);
          return function(e) {
            var n = typeof e.getAttributeNode !== j && e.getAttributeNode("id");
            return n && n.value === t
          }
        }), i.find.TAG = n.getElementsByTagName ? function(e, t) {
          return typeof t.getElementsByTagName !== j ? t.getElementsByTagName(e) : undefined
        } : function(e, t) {
          var n, r = [],
            i = 0,
            o = t.getElementsByTagName(e);
          if ("*" === e) {
            while (n = o[i++]) 1 === n.nodeType && r.push(n);
            return r
          }
          return o
        }, i.find.CLASS = n.getElementsByClassName && function(e, t) {
          return typeof t.getElementsByClassName !== j && h ? t.getElementsByClassName(e) : undefined
        }, g = [], d = [], (n.qsa = Q.test(t.querySelectorAll)) && (ut(function(e) {
          e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || d.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll(":checked").length || d.push(":checked")
        }), ut(function(e) {
          var n = t.createElement("input");
          n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && d.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || d.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), d.push(",.*:")
        })), (n.matchesSelector = Q.test(m = f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && ut(function(e) {
          n.disconnectedMatch = m.call(e, "div"), m.call(e, "[s!='']:x"), g.push("!=", I)
        }), d = d.length && RegExp(d.join("|")), g = g.length && RegExp(g.join("|")), y = Q.test(f.contains) || f.compareDocumentPosition ? function(e, t) {
          var n = 9 === e.nodeType ? e.documentElement : e,
            r = t && t.parentNode;
          return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
        } : function(e, t) {
          if (t)
            while (t = t.parentNode)
              if (t === e) return !0;
          return !1
        }, S = f.compareDocumentPosition ? function(e, r) {
          if (e === r) return E = !0, 0;
          var i = r.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(r);
          return i ? 1 & i || !n.sortDetached && r.compareDocumentPosition(e) === i ? e === t || y(b, e) ? -1 : r === t || y(b, r) ? 1 : l ? P.call(l, e) - P.call(l, r) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
        } : function(e, n) {
          var r, i = 0,
            o = e.parentNode,
            s = n.parentNode,
            a = [e],
            u = [n];
          if (e === n) return E = !0, 0;
          if (!o || !s) return e === t ? -1 : n === t ? 1 : o ? -1 : s ? 1 : l ? P.call(l, e) - P.call(l, n) : 0;
          if (o === s) return ct(e, n);
          r = e;
          while (r = r.parentNode) a.unshift(r);
          r = n;
          while (r = r.parentNode) u.unshift(r);
          while (a[i] === u[i]) i++;
          return i ? ct(a[i], u[i]) : a[i] === b ? -1 : u[i] === b ? 1 : 0
        }, t) : p
      }, ot.matches = function(e, t) {
        return ot(e, null, null, t)
      }, ot.matchesSelector = function(e, t) {
        if ((e.ownerDocument || e) !== p && c(e), t = t.replace(Y, "='$1']"), !(!n.matchesSelector || !h || g && g.test(t) || d && d.test(t))) try {
          var r = m.call(e, t);
          if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
        } catch (i) {}
        return ot(t, p, null, [e]).length > 0
      }, ot.contains = function(e, t) {
        return (e.ownerDocument || e) !== p && c(e), y(e, t)
      }, ot.attr = function(e, t) {
        (e.ownerDocument || e) !== p && c(e);
        var r = i.attrHandle[t.toLowerCase()],
          o = r && A.call(i.attrHandle, t.toLowerCase()) ? r(e, t, !h) : undefined;
        return o === undefined ? n.attributes || !h ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null : o
      }, ot.error = function(e) {
        throw Error("Syntax error, unrecognized expression: " + e)
      }, ot.uniqueSort = function(e) {
        var t, r = [],
          i = 0,
          o = 0;
        if (E = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(S), E) {
          while (t = e[o++]) t === e[o] && (i = r.push(o));
          while (i--) e.splice(r[i], 1)
        }
        return e
      }, o = ot.getText = function(e) {
        var t, n = "",
          r = 0,
          i = e.nodeType;
        if (i) {
          if (1 === i || 9 === i || 11 === i) {
            if ("string" == typeof e.textContent) return e.textContent;
            for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
          } else if (3 === i || 4 === i) return e.nodeValue
        } else
          for (; t = e[r]; r++) n += o(t);
        return n
      }, i = ot.selectors = {
        cacheLength: 50,
        createPseudo: at,
        match: J,
        attrHandle: {},
        find: {},
        relative: {
          ">": {
            dir: "parentNode",
            first: !0
          },
          " ": {
            dir: "parentNode"
          },
          "+": {
            dir: "previousSibling",
            first: !0
          },
          "~": {
            dir: "previousSibling"
          }
        },
        preFilter: {
          ATTR: function(e) {
            return e[1] = e[1].replace(nt, rt), e[3] = (e[4] || e[5] || "").replace(nt, rt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
          },
          CHILD: function(e) {
            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ot.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ot.error(e[0]), e
          },
          PSEUDO: function(e) {
            var t, n = !e[5] && e[2];
            return J.CHILD.test(e[0]) ? null : (e[3] && e[4] !== undefined ? e[2] = e[4] : n && V.test(n) && (t = gt(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
          }
        },
        filter: {
          TAG: function(e) {
            var t = e.replace(nt, rt).toLowerCase();
            return "*" === e ? function() {
              return !0
            } : function(e) {
              return e.nodeName && e.nodeName.toLowerCase() === t
            }
          },
          CLASS: function(e) {
            var t = C[e + " "];
            return t || (t = RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && C(e, function(e) {
              return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "")
            })
          },
          ATTR: function(e, t, n) {
            return function(r) {
              var i = ot.attr(r, e);
              return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
            }
          },
          CHILD: function(e, t, n, r, i) {
            var o = "nth" !== e.slice(0, 3),
              s = "last" !== e.slice(-4),
              a = "of-type" === t;
            return 1 === r && 0 === i ? function(e) {
              return !!e.parentNode
            } : function(t, n, u) {
              var l, c, p, f, h, d, g = o !== s ? "nextSibling" : "previousSibling",
                m = t.parentNode,
                y = a && t.nodeName.toLowerCase(),
                x = !u && !a;
              if (m) {
                if (o) {
                  while (g) {
                    p = t;
                    while (p = p[g])
                      if (a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                    d = g = "only" === e && !d && "nextSibling"
                  }
                  return !0
                }
                if (d = [s ? m.firstChild : m.lastChild], s && x) {
                  c = m[v] || (m[v] = {}), l = c[e] || [], h = l[0] === w && l[1], f = l[0] === w && l[2], p = h && m.childNodes[h];
                  while (p = ++h && p && p[g] || (f = h = 0) || d.pop())
                    if (1 === p.nodeType && ++f && p === t) {
                      c[e] = [w, h, f];
                      break
                    }
                } else if (x && (l = (t[v] || (t[v] = {}))[e]) && l[0] === w) f = l[1];
                else
                  while (p = ++h && p && p[g] || (f = h = 0) || d.pop())
                    if ((a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (x && ((p[v] || (p[v] = {}))[e] = [w, f]), p === t)) break;
                return f -= i, f === r || 0 === f % r && f / r >= 0
              }
            }
          },
          PSEUDO: function(e, t) {
            var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || ot.error("unsupported pseudo: " + e);
            return r[v] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? at(function(e, n) {
              var i, o = r(e, t),
                s = o.length;
              while (s--) i = P.call(e, o[s]), e[i] = !(n[i] = o[s])
            }) : function(e) {
              return r(e, 0, n)
            }) : r
          }
        },
        pseudos: {
          not: at(function(e) {
            var t = [],
              n = [],
              r = a(e.replace(z, "$1"));
            return r[v] ? at(function(e, t, n, i) {
              var o, s = r(e, null, i, []),
                a = e.length;
              while (a--)(o = s[a]) && (e[a] = !(t[a] = o))
            }) : function(e, i, o) {
              return t[0] = e, r(t, null, o, n), !n.pop()
            }
          }),
          has: at(function(e) {
            return function(t) {
              return ot(e, t).length > 0
            }
          }),
          contains: at(function(e) {
            return function(t) {
              return (t.textContent || t.innerText || o(t)).indexOf(e) > -1
            }
          }),
          lang: at(function(e) {
            return G.test(e || "") || ot.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(),
              function(t) {
                var n;
                do
                  if (n = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                return !1
              }
          }),
          target: function(t) {
            var n = e.location && e.location.hash;
            return n && n.slice(1) === t.id
          },
          root: function(e) {
            return e === f
          },
          focus: function(e) {
            return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
          },
          enabled: function(e) {
            return e.disabled === !1
          },
          disabled: function(e) {
            return e.disabled === !0
          },
          checked: function(e) {
            var t = e.nodeName.toLowerCase();
            return "input" === t && !!e.checked || "option" === t && !!e.selected
          },
          selected: function(e) {
            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
          },
          empty: function(e) {
            for (e = e.firstChild; e; e = e.nextSibling)
              if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
            return !0
          },
          parent: function(e) {
            return !i.pseudos.empty(e)
          },
          header: function(e) {
            return et.test(e.nodeName)
          },
          input: function(e) {
            return Z.test(e.nodeName)
          },
          button: function(e) {
            var t = e.nodeName.toLowerCase();
            return "input" === t && "button" === e.type || "button" === t
          },
          text: function(e) {
            var t;
            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
          },
          first: ht(function() {
            return [0]
          }),
          last: ht(function(e, t) {
            return [t - 1]
          }),
          eq: ht(function(e, t, n) {
            return [0 > n ? n + t : n]
          }),
          even: ht(function(e, t) {
            var n = 0;
            for (; t > n; n += 2) e.push(n);
            return e
          }),
          odd: ht(function(e, t) {
            var n = 1;
            for (; t > n; n += 2) e.push(n);
            return e
          }),
          lt: ht(function(e, t, n) {
            var r = 0 > n ? n + t : n;
            for (; --r >= 0;) e.push(r);
            return e
          }),
          gt: ht(function(e, t, n) {
            var r = 0 > n ? n + t : n;
            for (; t > ++r;) e.push(r);
            return e
          })
        }
      }, i.pseudos.nth = i.pseudos.eq;
      for (t in {
          radio: !0,
          checkbox: !0,
          file: !0,
          password: !0,
          image: !0
        }) i.pseudos[t] = pt(t);
      for (t in {
          submit: !0,
          reset: !0
        }) i.pseudos[t] = ft(t);

      function dt() {}
      dt.prototype = i.filters = i.pseudos, i.setFilters = new dt;

      function gt(e, t) {
        var n, r, o, s, a, u, l, c = k[e + " "];
        if (c) return t ? 0 : c.slice(0);
        a = e, u = [], l = i.preFilter;
        while (a) {
          (!n || (r = _.exec(a))) && (r && (a = a.slice(r[0].length) || a), u.push(o = [])), n = !1, (r = X.exec(a)) && (n = r.shift(), o.push({
            value: n,
            type: r[0].replace(z, " ")
          }), a = a.slice(n.length));
          for (s in i.filter) !(r = J[s].exec(a)) || l[s] && !(r = l[s](r)) || (n = r.shift(), o.push({
            value: n,
            type: s,
            matches: r
          }), a = a.slice(n.length));
          if (!n) break
        }
        return t ? a.length : a ? ot.error(e) : k(e, u).slice(0)
      }

      function mt(e) {
        var t = 0,
          n = e.length,
          r = "";
        for (; n > t; t++) r += e[t].value;
        return r
      }

      function yt(e, t, n) {
        var i = t.dir,
          o = n && "parentNode" === i,
          s = T++;
        return t.first ? function(t, n, r) {
          while (t = t[i])
            if (1 === t.nodeType || o) return e(t, n, r)
        } : function(t, n, a) {
          var u, l, c, p = w + " " + s;
          if (a) {
            while (t = t[i])
              if ((1 === t.nodeType || o) && e(t, n, a)) return !0
          } else
            while (t = t[i])
              if (1 === t.nodeType || o)
                if (c = t[v] || (t[v] = {}), (l = c[i]) && l[0] === p) {
                  if ((u = l[1]) === !0 || u === r) return u === !0
                } else if (l = c[i] = [p], l[1] = e(t, n, a) || r, l[1] === !0) return !0
        }
      }

      function vt(e) {
        return e.length > 1 ? function(t, n, r) {
          var i = e.length;
          while (i--)
            if (!e[i](t, n, r)) return !1;
          return !0
        } : e[0]
      }

      function xt(e, t, n, r, i) {
        var o, s = [],
          a = 0,
          u = e.length,
          l = null != t;
        for (; u > a; a++)(o = e[a]) && (!n || n(o, r, i)) && (s.push(o), l && t.push(a));
        return s
      }

      function bt(e, t, n, r, i, o) {
        return r && !r[v] && (r = bt(r)), i && !i[v] && (i = bt(i, o)), at(function(o, s, a, u) {
          var l, c, p, f = [],
            h = [],
            d = s.length,
            g = o || Ct(t || "*", a.nodeType ? [a] : a, []),
            m = !e || !o && t ? g : xt(g, f, e, a, u),
            y = n ? i || (o ? e : d || r) ? [] : s : m;
          if (n && n(m, y, a, u), r) {
            l = xt(y, h), r(l, [], a, u), c = l.length;
            while (c--)(p = l[c]) && (y[h[c]] = !(m[h[c]] = p))
          }
          if (o) {
            if (i || e) {
              if (i) {
                l = [], c = y.length;
                while (c--)(p = y[c]) && l.push(m[c] = p);
                i(null, y = [], l, u)
              }
              c = y.length;
              while (c--)(p = y[c]) && (l = i ? P.call(o, p) : f[c]) > -1 && (o[l] = !(s[l] = p))
            }
          } else y = xt(y === s ? y.splice(d, y.length) : y), i ? i(null, s, y, u) : O.apply(s, y)
        })
      }

      function wt(e) {
        var t, n, r, o = e.length,
          s = i.relative[e[0].type],
          a = s || i.relative[" "],
          l = s ? 1 : 0,
          c = yt(function(e) {
            return e === t
          }, a, !0),
          p = yt(function(e) {
            return P.call(t, e) > -1
          }, a, !0),
          f = [function(e, n, r) {
            return !s && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r))
          }];
        for (; o > l; l++)
          if (n = i.relative[e[l].type]) f = [yt(vt(f), n)];
          else {
            if (n = i.filter[e[l].type].apply(null, e[l].matches), n[v]) {
              for (r = ++l; o > r; r++)
                if (i.relative[e[r].type]) break;
              return bt(l > 1 && vt(f), l > 1 && mt(e.slice(0, l - 1).concat({
                value: " " === e[l - 2].type ? "*" : ""
              })).replace(z, "$1"), n, r > l && wt(e.slice(l, r)), o > r && wt(e = e.slice(r)), o > r && mt(e))
            }
            f.push(n)
          }
        return vt(f)
      }

      function Tt(e, t) {
        var n = 0,
          o = t.length > 0,
          s = e.length > 0,
          a = function(a, l, c, f, h) {
            var d, g, m, y = [],
              v = 0,
              x = "0",
              b = a && [],
              T = null != h,
              C = u,
              k = a || s && i.find.TAG("*", h && l.parentNode || l),
              N = w += null == C ? 1 : Math.random() || .1;
            for (T && (u = l !== p && l, r = n); null != (d = k[x]); x++) {
              if (s && d) {
                g = 0;
                while (m = e[g++])
                  if (m(d, l, c)) {
                    f.push(d);
                    break
                  }
                T && (w = N, r = ++n)
              }
              o && ((d = !m && d) && v--, a && b.push(d))
            }
            if (v += x, o && x !== v) {
              g = 0;
              while (m = t[g++]) m(b, y, l, c);
              if (a) {
                if (v > 0)
                  while (x--) b[x] || y[x] || (y[x] = q.call(f));
                y = xt(y)
              }
              O.apply(f, y), T && !a && y.length > 0 && v + t.length > 1 && ot.uniqueSort(f)
            }
            return T && (w = N, u = C), b
          };
        return o ? at(a) : a
      }
      a = ot.compile = function(e, t) {
        var n, r = [],
          i = [],
          o = N[e + " "];
        if (!o) {
          t || (t = gt(e)), n = t.length;
          while (n--) o = wt(t[n]), o[v] ? r.push(o) : i.push(o);
          o = N(e, Tt(i, r))
        }
        return o
      };

      function Ct(e, t, n) {
        var r = 0,
          i = t.length;
        for (; i > r; r++) ot(e, t[r], n);
        return n
      }

      function kt(e, t, r, o) {
        var s, u, l, c, p, f = gt(e);
        if (!o && 1 === f.length) {
          if (u = f[0] = f[0].slice(0), u.length > 2 && "ID" === (l = u[0]).type && n.getById && 9 === t.nodeType && h && i.relative[u[1].type]) {
            if (t = (i.find.ID(l.matches[0].replace(nt, rt), t) || [])[0], !t) return r;
            e = e.slice(u.shift().value.length)
          }
          s = J.needsContext.test(e) ? 0 : u.length;
          while (s--) {
            if (l = u[s], i.relative[c = l.type]) break;
            if ((p = i.find[c]) && (o = p(l.matches[0].replace(nt, rt), U.test(u[0].type) && t.parentNode || t))) {
              if (u.splice(s, 1), e = o.length && mt(u), !e) return O.apply(r, o), r;
              break
            }
          }
        }
        return a(e, f)(o, t, !h, r, U.test(e)), r
      }
      n.sortStable = v.split("").sort(S).join("") === v, n.detectDuplicates = E, c(), n.sortDetached = ut(function(e) {
        return 1 & e.compareDocumentPosition(p.createElement("div"))
      }), ut(function(e) {
        return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
      }) || lt("type|href|height|width", function(e, t, n) {
        return n ? undefined : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
      }), n.attributes && ut(function(e) {
        return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
      }) || lt("value", function(e, t, n) {
        return n || "input" !== e.nodeName.toLowerCase() ? undefined : e.defaultValue
      }), ut(function(e) {
        return null == e.getAttribute("disabled")
      }) || lt(R, function(e, t, n) {
        var r;
        return n ? undefined : (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null
      }), x.find = ot, x.expr = ot.selectors, x.expr[":"] = x.expr.pseudos, x.unique = ot.uniqueSort, x.text = ot.getText, x.isXMLDoc = ot.isXML, x.contains = ot.contains
    }(e);
  var D = {};

  function A(e) {
    var t = D[e] = {};
    return x.each(e.match(w) || [], function(e, n) {
      t[n] = !0
    }), t
  }
  x.Callbacks = function(e) {
    e = "string" == typeof e ? D[e] || A(e) : x.extend({}, e);
    var t, n, r, i, o, s, a = [],
      u = !e.once && [],
      l = function(p) {
        for (t = e.memory && p, n = !0, s = i || 0, i = 0, o = a.length, r = !0; a && o > s; s++)
          if (a[s].apply(p[0], p[1]) === !1 && e.stopOnFalse) {
            t = !1;
            break
          }
        r = !1, a && (u ? u.length && l(u.shift()) : t ? a = [] : c.disable())
      },
      c = {
        add: function() {
          if (a) {
            var n = a.length;
            (function s(t) {
              x.each(t, function(t, n) {
                var r = x.type(n);
                "function" === r ? e.unique && c.has(n) || a.push(n) : n && n.length && "string" !== r && s(n)
              })
            })(arguments), r ? o = a.length : t && (i = n, l(t))
          }
          return this
        },
        remove: function() {
          return a && x.each(arguments, function(e, t) {
            var n;
            while ((n = x.inArray(t, a, n)) > -1) a.splice(n, 1), r && (o >= n && o--, s >= n && s--)
          }), this
        },
        has: function(e) {
          return e ? x.inArray(e, a) > -1 : !(!a || !a.length)
        },
        empty: function() {
          return a = [], o = 0, this
        },
        disable: function() {
          return a = u = t = undefined, this
        },
        disabled: function() {
          return !a
        },
        lock: function() {
          return u = undefined, t || c.disable(), this
        },
        locked: function() {
          return !u
        },
        fireWith: function(e, t) {
          return !a || n && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? u.push(t) : l(t)), this
        },
        fire: function() {
          return c.fireWith(this, arguments), this
        },
        fired: function() {
          return !!n
        }
      };
    return c
  }, x.extend({
    Deferred: function(e) {
      var t = [
          ["resolve", "done", x.Callbacks("once memory"), "resolved"],
          ["reject", "fail", x.Callbacks("once memory"), "rejected"],
          ["notify", "progress", x.Callbacks("memory")]
        ],
        n = "pending",
        r = {
          state: function() {
            return n
          },
          always: function() {
            return i.done(arguments).fail(arguments), this
          },
          then: function() {
            var e = arguments;
            return x.Deferred(function(n) {
              x.each(t, function(t, o) {
                var s = o[0],
                  a = x.isFunction(e[t]) && e[t];
                i[o[1]](function() {
                  var e = a && a.apply(this, arguments);
                  e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                })
              }), e = null
            }).promise()
          },
          promise: function(e) {
            return null != e ? x.extend(e, r) : r
          }
        },
        i = {};
      return r.pipe = r.then, x.each(t, function(e, o) {
        var s = o[2],
          a = o[3];
        r[o[1]] = s.add, a && s.add(function() {
          n = a
        }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
          return i[o[0] + "With"](this === i ? r : this, arguments), this
        }, i[o[0] + "With"] = s.fireWith
      }), r.promise(i), e && e.call(i, i), i
    },
    when: function(e) {
      var t = 0,
        n = d.call(arguments),
        r = n.length,
        i = 1 !== r || e && x.isFunction(e.promise) ? r : 0,
        o = 1 === i ? e : x.Deferred(),
        s = function(e, t, n) {
          return function(r) {
            t[e] = this, n[e] = arguments.length > 1 ? d.call(arguments) : r, n === a ? o.notifyWith(t, n) : --i || o.resolveWith(t, n)
          }
        },
        a, u, l;
      if (r > 1)
        for (a = Array(r), u = Array(r), l = Array(r); r > t; t++) n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(s(t, l, n)).fail(o.reject).progress(s(t, u, a)) : --i;
      return i || o.resolveWith(l, n), o.promise()
    }
  }), x.support = function(t) {
    var n = o.createElement("input"),
      r = o.createDocumentFragment(),
      i = o.createElement("div"),
      s = o.createElement("select"),
      a = s.appendChild(o.createElement("option"));
    return n.type ? (n.type = "checkbox", t.checkOn = "" !== n.value, t.optSelected = a.selected, t.reliableMarginRight = !0, t.boxSizingReliable = !0, t.pixelPosition = !1, n.checked = !0, t.noCloneChecked = n.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !a.disabled, n = o.createElement("input"), n.value = "t", n.type = "radio", t.radioValue = "t" === n.value, n.setAttribute("checked", "t"), n.setAttribute("name", "t"), r.appendChild(n), t.checkClone = r.cloneNode(!0).cloneNode(!0).lastChild.checked, t.focusinBubbles = "onfocusin" in e, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === i.style.backgroundClip, x(function() {
      var n, r, s = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
        a = o.getElementsByTagName("body")[0];
      a && (n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(i), i.innerHTML = "", i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", x.swap(a, null != a.style.zoom ? {
        zoom: 1
      } : {}, function() {
        t.boxSizing = 4 === i.offsetWidth
      }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {
        width: "4px"
      }).width, r = i.appendChild(o.createElement("div")), r.style.cssText = i.style.cssText = s, r.style.marginRight = r.style.width = "0", i.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), a.removeChild(n))
    }), t) : t
  }({});
  var L, q, H = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    O = /([A-Z])/g;

  function F() {
    Object.defineProperty(this.cache = {}, 0, {
      get: function() {
        return {}
      }
    }), this.expando = x.expando + Math.random()
  }
  F.uid = 1, F.accepts = function(e) {
    return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0
  }, F.prototype = {
    key: function(e) {
      if (!F.accepts(e)) return 0;
      var t = {},
        n = e[this.expando];
      if (!n) {
        n = F.uid++;
        try {
          t[this.expando] = {
            value: n
          }, Object.defineProperties(e, t)
        } catch (r) {
          t[this.expando] = n, x.extend(e, t)
        }
      }
      return this.cache[n] || (this.cache[n] = {}), n
    },
    set: function(e, t, n) {
      var r, i = this.key(e),
        o = this.cache[i];
      if ("string" == typeof t) o[t] = n;
      else if (x.isEmptyObject(o)) x.extend(this.cache[i], t);
      else
        for (r in t) o[r] = t[r];
      return o
    },
    get: function(e, t) {
      var n = this.cache[this.key(e)];
      return t === undefined ? n : n[t]
    },
    access: function(e, t, n) {
      var r;
      return t === undefined || t && "string" == typeof t && n === undefined ? (r = this.get(e, t), r !== undefined ? r : this.get(e, x.camelCase(t))) : (this.set(e, t, n), n !== undefined ? n : t)
    },
    remove: function(e, t) {
      var n, r, i, o = this.key(e),
        s = this.cache[o];
      if (t === undefined) this.cache[o] = {};
      else {
        x.isArray(t) ? r = t.concat(t.map(x.camelCase)) : (i = x.camelCase(t), t in s ? r = [t, i] : (r = i, r = r in s ? [r] : r.match(w) || [])), n = r.length;
        while (n--) delete s[r[n]]
      }
    },
    hasData: function(e) {
      return !x.isEmptyObject(this.cache[e[this.expando]] || {})
    },
    discard: function(e) {
      e[this.expando] && delete this.cache[e[this.expando]]
    }
  }, L = new F, q = new F, x.extend({
    acceptData: F.accepts,
    hasData: function(e) {
      return L.hasData(e) || q.hasData(e)
    },
    data: function(e, t, n) {
      return L.access(e, t, n)
    },
    removeData: function(e, t) {
      L.remove(e, t)
    },
    _data: function(e, t, n) {
      return q.access(e, t, n)
    },
    _removeData: function(e, t) {
      q.remove(e, t)
    }
  }), x.fn.extend({
    data: function(e, t) {
      var n, r, i = this[0],
        o = 0,
        s = null;
      if (e === undefined) {
        if (this.length && (s = L.get(i), 1 === i.nodeType && !q.get(i, "hasDataAttrs"))) {
          for (n = i.attributes; n.length > o; o++) r = n[o].name, 0 === r.indexOf("data-") && (r = x.camelCase(r.slice(5)), P(i, r, s[r]));
          q.set(i, "hasDataAttrs", !0)
        }
        return s
      }
      return "object" == typeof e ? this.each(function() {
        L.set(this, e)
      }) : x.access(this, function(t) {
        var n, r = x.camelCase(e);
        if (i && t === undefined) {
          if (n = L.get(i, e), n !== undefined) return n;
          if (n = L.get(i, r), n !== undefined) return n;
          if (n = P(i, r, undefined), n !== undefined) return n
        } else this.each(function() {
          var n = L.get(this, r);
          L.set(this, r, t), -1 !== e.indexOf("-") && n !== undefined && L.set(this, e, t)
        })
      }, null, t, arguments.length > 1, null, !0)
    },
    removeData: function(e) {
      return this.each(function() {
        L.remove(this, e)
      })
    }
  });

  function P(e, t, n) {
    var r;
    if (n === undefined && 1 === e.nodeType)
      if (r = "data-" + t.replace(O, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
        try {
          n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : H.test(n) ? JSON.parse(n) : n
        } catch (i) {}
        L.set(e, t, n)
      } else n = undefined;
    return n
  }
  x.extend({
    queue: function(e, t, n) {
      var r;
      return e ? (t = (t || "fx") + "queue", r = q.get(e, t), n && (!r || x.isArray(n) ? r = q.access(e, t, x.makeArray(n)) : r.push(n)), r || []) : undefined
    },
    dequeue: function(e, t) {
      t = t || "fx";
      var n = x.queue(e, t),
        r = n.length,
        i = n.shift(),
        o = x._queueHooks(e, t),
        s = function() {
          x.dequeue(e, t)
        };
      "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire()
    },
    _queueHooks: function(e, t) {
      var n = t + "queueHooks";
      return q.get(e, n) || q.access(e, n, {
        empty: x.Callbacks("once memory").add(function() {
          q.remove(e, [t + "queue", n])
        })
      })
    }
  }), x.fn.extend({
    queue: function(e, t) {
      var n = 2;
      return "string" != typeof e && (t = e, e = "fx", n--), n > arguments.length ? x.queue(this[0], e) : t === undefined ? this : this.each(function() {
        var n = x.queue(this, e, t);
        x._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && x.dequeue(this, e)
      })
    },
    dequeue: function(e) {
      return this.each(function() {
        x.dequeue(this, e)
      })
    },
    delay: function(e, t) {
      return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
        var r = setTimeout(t, e);
        n.stop = function() {
          clearTimeout(r)
        }
      })
    },
    clearQueue: function(e) {
      return this.queue(e || "fx", [])
    },
    promise: function(e, t) {
      var n, r = 1,
        i = x.Deferred(),
        o = this,
        s = this.length,
        a = function() {
          --r || i.resolveWith(o, [o])
        };
      "string" != typeof e && (t = e, e = undefined), e = e || "fx";
      while (s--) n = q.get(o[s], e + "queueHooks"), n && n.empty && (r++, n.empty.add(a));
      return a(), i.promise(t)
    }
  });
  var R, M, W = /[\t\r\n\f]/g,
    $ = /\r/g,
    B = /^(?:input|select|textarea|button)$/i;
  x.fn.extend({
    attr: function(e, t) {
      return x.access(this, x.attr, e, t, arguments.length > 1)
    },
    removeAttr: function(e) {
      return this.each(function() {
        x.removeAttr(this, e)
      })
    },
    prop: function(e, t) {
      return x.access(this, x.prop, e, t, arguments.length > 1)
    },
    removeProp: function(e) {
      return this.each(function() {
        delete this[x.propFix[e] || e]
      })
    },
    addClass: function(e) {
      var t, n, r, i, o, s = 0,
        a = this.length,
        u = "string" == typeof e && e;
      if (x.isFunction(e)) return this.each(function(t) {
        x(this).addClass(e.call(this, t, this.className))
      });
      if (u)
        for (t = (e || "").match(w) || []; a > s; s++)
          if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : " ")) {
            o = 0;
            while (i = t[o++]) 0 > r.indexOf(" " + i + " ") && (r += i + " ");
            n.className = x.trim(r)
          }
      return this
    },
    removeClass: function(e) {
      var t, n, r, i, o, s = 0,
        a = this.length,
        u = 0 === arguments.length || "string" == typeof e && e;
      if (x.isFunction(e)) return this.each(function(t) {
        x(this).removeClass(e.call(this, t, this.className))
      });
      if (u)
        for (t = (e || "").match(w) || []; a > s; s++)
          if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : "")) {
            o = 0;
            while (i = t[o++])
              while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
            n.className = e ? x.trim(r) : ""
          }
      return this
    },
    toggleClass: function(e, t) {
      var n = typeof e;
      return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : x.isFunction(e) ? this.each(function(n) {
        x(this).toggleClass(e.call(this, n, this.className, t), t)
      }) : this.each(function() {
        if ("string" === n) {
          var t, i = 0,
            o = x(this),
            s = e.match(w) || [];
          while (t = s[i++]) o.hasClass(t) ? o.removeClass(t) : o.addClass(t)
        } else(n === r || "boolean" === n) && (this.className && q.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : q.get(this, "__className__") || "")
      })
    },
    hasClass: function(e) {
      var t = " " + e + " ",
        n = 0,
        r = this.length;
      for (; r > n; n++)
        if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(W, " ").indexOf(t) >= 0) return !0;
      return !1
    },
    val: function(e) {
      var t, n, r, i = this[0]; {
        if (arguments.length) return r = x.isFunction(e), this.each(function(n) {
          var i;
          1 === this.nodeType && (i = r ? e.call(this, n, x(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : x.isArray(i) && (i = x.map(i, function(e) {
            return null == e ? "" : e + ""
          })), t = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], t && "set" in t && t.set(this, i, "value") !== undefined || (this.value = i))
        });
        if (i) return t = x.valHooks[i.type] || x.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, "string" == typeof n ? n.replace($, "") : null == n ? "" : n)
      }
    }
  }), x.extend({
    valHooks: {
      option: {
        get: function(e) {
          var t = e.attributes.value;
          return !t || t.specified ? e.value : e.text
        }
      },
      select: {
        get: function(e) {
          var t, n, r = e.options,
            i = e.selectedIndex,
            o = "select-one" === e.type || 0 > i,
            s = o ? null : [],
            a = o ? i + 1 : r.length,
            u = 0 > i ? a : o ? i : 0;
          for (; a > u; u++)
            if (n = r[u], !(!n.selected && u !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) {
              if (t = x(n).val(), o) return t;
              s.push(t)
            }
          return s
        },
        set: function(e, t) {
          var n, r, i = e.options,
            o = x.makeArray(t),
            s = i.length;
          while (s--) r = i[s], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0);
          return n || (e.selectedIndex = -1), o
        }
      }
    },
    attr: function(e, t, n) {
      var i, o, s = e.nodeType;
      if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === r ? x.prop(e, t, n) : (1 === s && x.isXMLDoc(e) || (t = t.toLowerCase(), i = x.attrHooks[t] || (x.expr.match.bool.test(t) ? M : R)), n === undefined ? i && "get" in i && null !== (o = i.get(e, t)) ? o : (o = x.find.attr(e, t), null == o ? undefined : o) : null !== n ? i && "set" in i && (o = i.set(e, n, t)) !== undefined ? o : (e.setAttribute(t, n + ""), n) : (x.removeAttr(e, t), undefined))
    },
    removeAttr: function(e, t) {
      var n, r, i = 0,
        o = t && t.match(w);
      if (o && 1 === e.nodeType)
        while (n = o[i++]) r = x.propFix[n] || n, x.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
    },
    attrHooks: {
      type: {
        set: function(e, t) {
          if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
          }
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    },
    prop: function(e, t, n) {
      var r, i, o, s = e.nodeType;
      if (e && 3 !== s && 8 !== s && 2 !== s) return o = 1 !== s || !x.isXMLDoc(e), o && (t = x.propFix[t] || t, i = x.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
    },
    propHooks: {
      tabIndex: {
        get: function(e) {
          return e.hasAttribute("tabindex") || B.test(e.nodeName) || e.href ? e.tabIndex : -1
        }
      }
    }
  }), M = {
    set: function(e, t, n) {
      return t === !1 ? x.removeAttr(e, n) : e.setAttribute(n, n), n
    }
  }, x.each(x.expr.match.bool.source.match(/\w+/g), function(e, t) {
    var n = x.expr.attrHandle[t] || x.find.attr;
    x.expr.attrHandle[t] = function(e, t, r) {
      var i = x.expr.attrHandle[t],
        o = r ? undefined : (x.expr.attrHandle[t] = undefined) != n(e, t, r) ? t.toLowerCase() : null;
      return x.expr.attrHandle[t] = i, o
    }
  }), x.support.optSelected || (x.propHooks.selected = {
    get: function(e) {
      var t = e.parentNode;
      return t && t.parentNode && t.parentNode.selectedIndex, null
    }
  }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    x.propFix[this.toLowerCase()] = this
  }), x.each(["radio", "checkbox"], function() {
    x.valHooks[this] = {
      set: function(e, t) {
        return x.isArray(t) ? e.checked = x.inArray(x(e).val(), t) >= 0 : undefined
      }
    }, x.support.checkOn || (x.valHooks[this].get = function(e) {
      return null === e.getAttribute("value") ? "on" : e.value
    })
  });
  var I = /^key/,
    z = /^(?:mouse|contextmenu)|click/,
    _ = /^(?:focusinfocus|focusoutblur)$/,
    X = /^([^.]*)(?:\.(.+)|)$/;

  function U() {
    return !0
  }

  function Y() {
    return !1
  }

  function V() {
    try {
      return o.activeElement
    } catch (e) {}
  }
  x.event = {
    global: {},
    add: function(e, t, n, i, o) {
      var s, a, u, l, c, p, f, h, d, g, m, y = q.get(e);
      if (y) {
        n.handler && (s = n, n = s.handler, o = s.selector), n.guid || (n.guid = x.guid++), (l = y.events) || (l = y.events = {}), (a = y.handle) || (a = y.handle = function(e) {
          return typeof x === r || e && x.event.triggered === e.type ? undefined : x.event.dispatch.apply(a.elem, arguments)
        }, a.elem = e), t = (t || "").match(w) || [""], c = t.length;
        while (c--) u = X.exec(t[c]) || [], d = m = u[1], g = (u[2] || "").split(".").sort(), d && (f = x.event.special[d] || {}, d = (o ? f.delegateType : f.bindType) || d, f = x.event.special[d] || {}, p = x.extend({
          type: d,
          origType: m,
          data: i,
          handler: n,
          guid: n.guid,
          selector: o,
          needsContext: o && x.expr.match.needsContext.test(o),
          namespace: g.join(".")
        }, s), (h = l[d]) || (h = l[d] = [], h.delegateCount = 0, f.setup && f.setup.call(e, i, g, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), f.add && (f.add.call(e, p), p.handler.guid || (p.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, p) : h.push(p), x.event.global[d] = !0);
        e = null
      }
    },
    remove: function(e, t, n, r, i) {
      var o, s, a, u, l, c, p, f, h, d, g, m = q.hasData(e) && q.get(e);
      if (m && (u = m.events)) {
        t = (t || "").match(w) || [""], l = t.length;
        while (l--)
          if (a = X.exec(t[l]) || [], h = g = a[1], d = (a[2] || "").split(".").sort(), h) {
            p = x.event.special[h] || {}, h = (r ? p.delegateType : p.bindType) || h, f = u[h] || [], a = a[2] && RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = f.length;
            while (o--) c = f[o], !i && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (f.splice(o, 1), c.selector && f.delegateCount--, p.remove && p.remove.call(e, c));
            s && !f.length && (p.teardown && p.teardown.call(e, d, m.handle) !== !1 || x.removeEvent(e, h, m.handle), delete u[h])
          } else
            for (h in u) x.event.remove(e, h + t[l], n, r, !0);
        x.isEmptyObject(u) && (delete m.handle, q.remove(e, "events"))
      }
    },
    trigger: function(t, n, r, i) {
      var s, a, u, l, c, p, f, h = [r || o],
        d = y.call(t, "type") ? t.type : t,
        g = y.call(t, "namespace") ? t.namespace.split(".") : [];
      if (a = u = r = r || o, 3 !== r.nodeType && 8 !== r.nodeType && !_.test(d + x.event.triggered) && (d.indexOf(".") >= 0 && (g = d.split("."), d = g.shift(), g.sort()), c = 0 > d.indexOf(":") && "on" + d, t = t[x.expando] ? t : new x.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = g.join("."), t.namespace_re = t.namespace ? RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = undefined, t.target || (t.target = r), n = null == n ? [t] : x.makeArray(n, [t]), f = x.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
        if (!i && !f.noBubble && !x.isWindow(r)) {
          for (l = f.delegateType || d, _.test(l + d) || (a = a.parentNode); a; a = a.parentNode) h.push(a), u = a;
          u === (r.ownerDocument || o) && h.push(u.defaultView || u.parentWindow || e)
        }
        s = 0;
        while ((a = h[s++]) && !t.isPropagationStopped()) t.type = s > 1 ? l : f.bindType || d, p = (q.get(a, "events") || {})[t.type] && q.get(a, "handle"), p && p.apply(a, n), p = c && a[c], p && x.acceptData(a) && p.apply && p.apply(a, n) === !1 && t.preventDefault();
        return t.type = d, i || t.isDefaultPrevented() || f._default && f._default.apply(h.pop(), n) !== !1 || !x.acceptData(r) || c && x.isFunction(r[d]) && !x.isWindow(r) && (u = r[c], u && (r[c] = null), x.event.triggered = d, r[d](), x.event.triggered = undefined, u && (r[c] = u)), t.result
      }
    },
    dispatch: function(e) {
      e = x.event.fix(e);
      var t, n, r, i, o, s = [],
        a = d.call(arguments),
        u = (q.get(this, "events") || {})[e.type] || [],
        l = x.event.special[e.type] || {};
      if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
        s = x.event.handlers.call(this, e, u), t = 0;
        while ((i = s[t++]) && !e.isPropagationStopped()) {
          e.currentTarget = i.elem, n = 0;
          while ((o = i.handlers[n++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((x.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()))
        }
        return l.postDispatch && l.postDispatch.call(this, e), e.result
      }
    },
    handlers: function(e, t) {
      var n, r, i, o, s = [],
        a = t.delegateCount,
        u = e.target;
      if (a && u.nodeType && (!e.button || "click" !== e.type))
        for (; u !== this; u = u.parentNode || this)
          if (u.disabled !== !0 || "click" !== e.type) {
            for (r = [], n = 0; a > n; n++) o = t[n], i = o.selector + " ", r[i] === undefined && (r[i] = o.needsContext ? x(i, this).index(u) >= 0 : x.find(i, this, null, [u]).length), r[i] && r.push(o);
            r.length && s.push({
              elem: u,
              handlers: r
            })
          }
      return t.length > a && s.push({
        elem: this,
        handlers: t.slice(a)
      }), s
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(e, t) {
        var n, r, i, s = t.button;
        return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || o, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || s === undefined || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
      }
    },
    fix: function(e) {
      if (e[x.expando]) return e;
      var t, n, r, i = e.type,
        s = e,
        a = this.fixHooks[i];
      a || (this.fixHooks[i] = a = z.test(i) ? this.mouseHooks : I.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new x.Event(s), t = r.length;
      while (t--) n = r[t], e[n] = s[n];
      return e.target || (e.target = o), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, s) : e
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function() {
          return this !== V() && this.focus ? (this.focus(), !1) : undefined
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          return this === V() && this.blur ? (this.blur(), !1) : undefined
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          return "checkbox" === this.type && this.click && x.nodeName(this, "input") ? (this.click(), !1) : undefined
        },
        _default: function(e) {
          return x.nodeName(e.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function(e) {
          e.result !== undefined && (e.originalEvent.returnValue = e.result)
        }
      }
    },
    simulate: function(e, t, n, r) {
      var i = x.extend(new x.Event, n, {
        type: e,
        isSimulated: !0,
        originalEvent: {}
      });
      r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
    }
  }, x.removeEvent = function(e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n, !1)
  }, x.Event = function(e, t) {
    return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? U : Y) : this.type = e, t && x.extend(this, t), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, undefined) : new x.Event(e, t)
  }, x.Event.prototype = {
    isDefaultPrevented: Y,
    isPropagationStopped: Y,
    isImmediatePropagationStopped: Y,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = U, e && e.preventDefault && e.preventDefault()
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = U, e && e.stopPropagation && e.stopPropagation()
    },
    stopImmediatePropagation: function() {
      this.isImmediatePropagationStopped = U, this.stopPropagation()
    }
  }, x.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }, function(e, t) {
    x.event.special[e] = {
      delegateType: t,
      bindType: t,
      handle: function(e) {
        var n, r = this,
          i = e.relatedTarget,
          o = e.handleObj;
        return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
      }
    }
  }), x.support.focusinBubbles || x.each({
    focus: "focusin",
    blur: "focusout"
  }, function(e, t) {
    var n = 0,
      r = function(e) {
        x.event.simulate(t, e.target, x.event.fix(e), !0)
      };
    x.event.special[t] = {
      setup: function() {
        0 === n++ && o.addEventListener(e, r, !0)
      },
      teardown: function() {
        0 === --n && o.removeEventListener(e, r, !0)
      }
    }
  }), x.fn.extend({
    on: function(e, t, n, r, i) {
      var o, s;
      if ("object" == typeof e) {
        "string" != typeof t && (n = n || t, t = undefined);
        for (s in e) this.on(s, t, n, e[s], i);
        return this
      }
      if (null == n && null == r ? (r = t, n = t = undefined) : null == r && ("string" == typeof t ? (r = n, n = undefined) : (r = n, n = t, t = undefined)), r === !1) r = Y;
      else if (!r) return this;
      return 1 === i && (o = r, r = function(e) {
        return x().off(e), o.apply(this, arguments)
      }, r.guid = o.guid || (o.guid = x.guid++)), this.each(function() {
        x.event.add(this, e, r, n, t)
      })
    },
    one: function(e, t, n, r) {
      return this.on(e, t, n, r, 1)
    },
    off: function(e, t, n) {
      var r, i;
      if (e && e.preventDefault && e.handleObj) return r = e.handleObj, x(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
      if ("object" == typeof e) {
        for (i in e) this.off(i, t, e[i]);
        return this
      }
      return (t === !1 || "function" == typeof t) && (n = t, t = undefined), n === !1 && (n = Y), this.each(function() {
        x.event.remove(this, e, n, t)
      })
    },
    trigger: function(e, t) {
      return this.each(function() {
        x.event.trigger(e, t, this)
      })
    },
    triggerHandler: function(e, t) {
      var n = this[0];
      return n ? x.event.trigger(e, t, n, !0) : undefined
    }
  });
  var G = /^.[^:#\[\.,]*$/,
    J = /^(?:parents|prev(?:Until|All))/,
    Q = x.expr.match.needsContext,
    K = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  x.fn.extend({
    find: function(e) {
      var t, n = [],
        r = this,
        i = r.length;
      if ("string" != typeof e) return this.pushStack(x(e).filter(function() {
        for (t = 0; i > t; t++)
          if (x.contains(r[t], this)) return !0
      }));
      for (t = 0; i > t; t++) x.find(e, r[t], n);
      return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
    },
    has: function(e) {
      var t = x(e, this),
        n = t.length;
      return this.filter(function() {
        var e = 0;
        for (; n > e; e++)
          if (x.contains(this, t[e])) return !0
      })
    },
    not: function(e) {
      return this.pushStack(et(this, e || [], !0))
    },
    filter: function(e) {
      return this.pushStack(et(this, e || [], !1))
    },
    is: function(e) {
      return !!et(this, "string" == typeof e && Q.test(e) ? x(e) : e || [], !1).length
    },
    closest: function(e, t) {
      var n, r = 0,
        i = this.length,
        o = [],
        s = Q.test(e) || "string" != typeof e ? x(e, t || this.context) : 0;
      for (; i > r; r++)
        for (n = this[r]; n && n !== t; n = n.parentNode)
          if (11 > n.nodeType && (s ? s.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
            n = o.push(n);
            break
          }
      return this.pushStack(o.length > 1 ? x.unique(o) : o)
    },
    index: function(e) {
      return e ? "string" == typeof e ? g.call(x(e), this[0]) : g.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(e, t) {
      var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [e] : e),
        r = x.merge(this.get(), n);
      return this.pushStack(x.unique(r))
    },
    addBack: function(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
  });

  function Z(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType);
    return e
  }
  x.each({
    parent: function(e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null
    },
    parents: function(e) {
      return x.dir(e, "parentNode")
    },
    parentsUntil: function(e, t, n) {
      return x.dir(e, "parentNode", n)
    },
    next: function(e) {
      return Z(e, "nextSibling")
    },
    prev: function(e) {
      return Z(e, "previousSibling")
    },
    nextAll: function(e) {
      return x.dir(e, "nextSibling")
    },
    prevAll: function(e) {
      return x.dir(e, "previousSibling")
    },
    nextUntil: function(e, t, n) {
      return x.dir(e, "nextSibling", n)
    },
    prevUntil: function(e, t, n) {
      return x.dir(e, "previousSibling", n)
    },
    siblings: function(e) {
      return x.sibling((e.parentNode || {}).firstChild, e)
    },
    children: function(e) {
      return x.sibling(e.firstChild)
    },
    contents: function(e) {
      return e.contentDocument || x.merge([], e.childNodes)
    }
  }, function(e, t) {
    x.fn[e] = function(n, r) {
      var i = x.map(this, t, n);
      return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (K[e] || x.unique(i), J.test(e) && i.reverse()), this.pushStack(i)
    }
  }), x.extend({
    filter: function(e, t, n) {
      var r = t[0];
      return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function(e) {
        return 1 === e.nodeType
      }))
    },
    dir: function(e, t, n) {
      var r = [],
        i = n !== undefined;
      while ((e = e[t]) && 9 !== e.nodeType)
        if (1 === e.nodeType) {
          if (i && x(e).is(n)) break;
          r.push(e)
        }
      return r
    },
    sibling: function(e, t) {
      var n = [];
      for (; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
      return n
    }
  });

  function et(e, t, n) {
    if (x.isFunction(t)) return x.grep(e, function(e, r) {
      return !!t.call(e, r, e) !== n
    });
    if (t.nodeType) return x.grep(e, function(e) {
      return e === t !== n
    });
    if ("string" == typeof t) {
      if (G.test(t)) return x.filter(t, e, n);
      t = x.filter(t, e)
    }
    return x.grep(e, function(e) {
      return g.call(t, e) >= 0 !== n
    })
  }
  var tt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    nt = /<([\w:]+)/,
    rt = /<|&#?\w+;/,
    it = /<(?:script|style|link)/i,
    ot = /^(?:checkbox|radio)$/i,
    st = /checked\s*(?:[^=]|=\s*.checked.)/i,
    at = /^$|\/(?:java|ecma)script/i,
    ut = /^true\/(.*)/,
    lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    ct = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""]
    };
  ct.optgroup = ct.option, ct.tbody = ct.tfoot = ct.colgroup = ct.caption = ct.thead, ct.th = ct.td, x.fn.extend({
    text: function(e) {
      return x.access(this, function(e) {
        return e === undefined ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e))
      }, null, e, arguments.length)
    },
    append: function() {
      return this.domManip(arguments, function(e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = pt(this, e);
          t.appendChild(e)
        }
      })
    },
    prepend: function() {
      return this.domManip(arguments, function(e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = pt(this, e);
          t.insertBefore(e, t.firstChild)
        }
      })
    },
    before: function() {
      return this.domManip(arguments, function(e) {
        this.parentNode && this.parentNode.insertBefore(e, this)
      })
    },
    after: function() {
      return this.domManip(arguments, function(e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
      })
    },
    remove: function(e, t) {
      var n, r = e ? x.filter(e, this) : this,
        i = 0;
      for (; null != (n = r[i]); i++) t || 1 !== n.nodeType || x.cleanData(mt(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && dt(mt(n, "script")), n.parentNode.removeChild(n));
      return this
    },
    empty: function() {
      var e, t = 0;
      for (; null != (e = this[t]); t++) 1 === e.nodeType && (x.cleanData(mt(e, !1)), e.textContent = "");
      return this
    },
    clone: function(e, t) {
      return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
        return x.clone(this, e, t)
      })
    },
    html: function(e) {
      return x.access(this, function(e) {
        var t = this[0] || {},
          n = 0,
          r = this.length;
        if (e === undefined && 1 === t.nodeType) return t.innerHTML;
        if ("string" == typeof e && !it.test(e) && !ct[(nt.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = e.replace(tt, "<$1></$2>");
          try {
            for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (x.cleanData(mt(t, !1)), t.innerHTML = e);
            t = 0
          } catch (i) {}
        }
        t && this.empty().append(e)
      }, null, e, arguments.length)
    },
    replaceWith: function() {
      var e = x.map(this, function(e) {
          return [e.nextSibling, e.parentNode]
        }),
        t = 0;
      return this.domManip(arguments, function(n) {
        var r = e[t++],
          i = e[t++];
        i && (r && r.parentNode !== i && (r = this.nextSibling), x(this).remove(), i.insertBefore(n, r))
      }, !0), t ? this : this.remove()
    },
    detach: function(e) {
      return this.remove(e, !0)
    },
    domManip: function(e, t, n) {
      e = f.apply([], e);
      var r, i, o, s, a, u, l = 0,
        c = this.length,
        p = this,
        h = c - 1,
        d = e[0],
        g = x.isFunction(d);
      if (g || !(1 >= c || "string" != typeof d || x.support.checkClone) && st.test(d)) return this.each(function(r) {
        var i = p.eq(r);
        g && (e[0] = d.call(this, r, i.html())), i.domManip(e, t, n)
      });
      if (c && (r = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = r.firstChild, 1 === r.childNodes.length && (r = i), i)) {
        for (o = x.map(mt(r, "script"), ft), s = o.length; c > l; l++) a = r, l !== h && (a = x.clone(a, !0, !0), s && x.merge(o, mt(a, "script"))), t.call(this[l], a, l);
        if (s)
          for (u = o[o.length - 1].ownerDocument, x.map(o, ht), l = 0; s > l; l++) a = o[l], at.test(a.type || "") && !q.access(a, "globalEval") && x.contains(u, a) && (a.src ? x._evalUrl(a.src) : x.globalEval(a.textContent.replace(lt, "")))
      }
      return this
    }
  }), x.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(e, t) {
    x.fn[e] = function(e) {
      var n, r = [],
        i = x(e),
        o = i.length - 1,
        s = 0;
      for (; o >= s; s++) n = s === o ? this : this.clone(!0), x(i[s])[t](n), h.apply(r, n.get());
      return this.pushStack(r)
    }
  }), x.extend({
    clone: function(e, t, n) {
      var r, i, o, s, a = e.cloneNode(!0),
        u = x.contains(e.ownerDocument, e);
      if (!(x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e)))
        for (s = mt(a), o = mt(e), r = 0, i = o.length; i > r; r++) yt(o[r], s[r]);
      if (t)
        if (n)
          for (o = o || mt(e), s = s || mt(a), r = 0, i = o.length; i > r; r++) gt(o[r], s[r]);
        else gt(e, a);
      return s = mt(a, "script"), s.length > 0 && dt(s, !u && mt(e, "script")), a
    },
    buildFragment: function(e, t, n, r) {
      var i, o, s, a, u, l, c = 0,
        p = e.length,
        f = t.createDocumentFragment(),
        h = [];
      for (; p > c; c++)
        if (i = e[c], i || 0 === i)
          if ("object" === x.type(i)) x.merge(h, i.nodeType ? [i] : i);
          else if (rt.test(i)) {
        o = o || f.appendChild(t.createElement("div")), s = (nt.exec(i) || ["", ""])[1].toLowerCase(), a = ct[s] || ct._default, o.innerHTML = a[1] + i.replace(tt, "<$1></$2>") + a[2], l = a[0];
        while (l--) o = o.lastChild;
        x.merge(h, o.childNodes), o = f.firstChild, o.textContent = ""
      } else h.push(t.createTextNode(i));
      f.textContent = "", c = 0;
      while (i = h[c++])
        if ((!r || -1 === x.inArray(i, r)) && (u = x.contains(i.ownerDocument, i), o = mt(f.appendChild(i), "script"), u && dt(o), n)) {
          l = 0;
          while (i = o[l++]) at.test(i.type || "") && n.push(i)
        }
      return f
    },
    cleanData: function(e) {
      var t, n, r, i, o, s, a = x.event.special,
        u = 0;
      for (;
        (n = e[u]) !== undefined; u++) {
        if (F.accepts(n) && (o = n[q.expando], o && (t = q.cache[o]))) {
          if (r = Object.keys(t.events || {}), r.length)
            for (s = 0;
              (i = r[s]) !== undefined; s++) a[i] ? x.event.remove(n, i) : x.removeEvent(n, i, t.handle);
          q.cache[o] && delete q.cache[o]
        }
        delete L.cache[n[L.expando]]
      }
    },
    _evalUrl: function(e) {
      return x.ajax({
        url: e,
        type: "GET",
        dataType: "script",
        async: !1,
        global: !1,
        "throws": !0
      })
    }
  });

  function pt(e, t) {
    return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
  }

  function ft(e) {
    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
  }

  function ht(e) {
    var t = ut.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute("type"), e
  }

  function dt(e, t) {
    var n = e.length,
      r = 0;
    for (; n > r; r++) q.set(e[r], "globalEval", !t || q.get(t[r], "globalEval"))
  }

  function gt(e, t) {
    var n, r, i, o, s, a, u, l;
    if (1 === t.nodeType) {
      if (q.hasData(e) && (o = q.access(e), s = q.set(t, o), l = o.events)) {
        delete s.handle, s.events = {};
        for (i in l)
          for (n = 0, r = l[i].length; r > n; n++) x.event.add(t, i, l[i][n])
      }
      L.hasData(e) && (a = L.access(e), u = x.extend({}, a), L.set(t, u))
    }
  }

  function mt(e, t) {
    var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
    return t === undefined || t && x.nodeName(e, t) ? x.merge([e], n) : n
  }

  function yt(e, t) {
    var n = t.nodeName.toLowerCase();
    "input" === n && ot.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
  }
  x.fn.extend({
    wrapAll: function(e) {
      var t;
      return x.isFunction(e) ? this.each(function(t) {
        x(this).wrapAll(e.call(this, t))
      }) : (this[0] && (t = x(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
        var e = this;
        while (e.firstElementChild) e = e.firstElementChild;
        return e
      }).append(this)), this)
    },
    wrapInner: function(e) {
      return x.isFunction(e) ? this.each(function(t) {
        x(this).wrapInner(e.call(this, t))
      }) : this.each(function() {
        var t = x(this),
          n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e)
      })
    },
    wrap: function(e) {
      var t = x.isFunction(e);
      return this.each(function(n) {
        x(this).wrapAll(t ? e.call(this, n) : e)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        x.nodeName(this, "body") || x(this).replaceWith(this.childNodes)
      }).end()
    }
  });
  var vt, xt, bt = /^(none|table(?!-c[ea]).+)/,
    wt = /^margin/,
    Tt = RegExp("^(" + b + ")(.*)$", "i"),
    Ct = RegExp("^(" + b + ")(?!px)[a-z%]+$", "i"),
    kt = RegExp("^([+-])=(" + b + ")", "i"),
    Nt = {
      BODY: "block"
    },
    Et = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    St = {
      letterSpacing: 0,
      fontWeight: 400
    },
    jt = ["Top", "Right", "Bottom", "Left"],
    Dt = ["Webkit", "O", "Moz", "ms"];

  function At(e, t) {
    if (t in e) return t;
    var n = t.charAt(0).toUpperCase() + t.slice(1),
      r = t,
      i = Dt.length;
    while (i--)
      if (t = Dt[i] + n, t in e) return t;
    return r
  }

  function Lt(e, t) {
    return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e)
  }

  function qt(t) {
    return e.getComputedStyle(t, null)
  }

  function Ht(e, t) {
    var n, r, i, o = [],
      s = 0,
      a = e.length;
    for (; a > s; s++) r = e[s], r.style && (o[s] = q.get(r, "olddisplay"), n = r.style.display, t ? (o[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && Lt(r) && (o[s] = q.access(r, "olddisplay", Rt(r.nodeName)))) : o[s] || (i = Lt(r), (n && "none" !== n || !i) && q.set(r, "olddisplay", i ? n : x.css(r, "display"))));
    for (s = 0; a > s; s++) r = e[s], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[s] || "" : "none"));
    return e
  }
  x.fn.extend({
    css: function(e, t) {
      return x.access(this, function(e, t, n) {
        var r, i, o = {},
          s = 0;
        if (x.isArray(t)) {
          for (r = qt(e), i = t.length; i > s; s++) o[t[s]] = x.css(e, t[s], !1, r);
          return o
        }
        return n !== undefined ? x.style(e, t, n) : x.css(e, t)
      }, e, t, arguments.length > 1)
    },
    show: function() {
      return Ht(this, !0)
    },
    hide: function() {
      return Ht(this)
    },
    toggle: function(e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
        Lt(this) ? x(this).show() : x(this).hide()
      })
    }
  }), x.extend({
    cssHooks: {
      opacity: {
        get: function(e, t) {
          if (t) {
            var n = vt(e, "opacity");
            return "" === n ? "1" : n
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": "cssFloat"
    },
    style: function(e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i, o, s, a = x.camelCase(t),
          u = e.style;
        return t = x.cssProps[a] || (x.cssProps[a] = At(u, a)), s = x.cssHooks[t] || x.cssHooks[a], n === undefined ? s && "get" in s && (i = s.get(e, !1, r)) !== undefined ? i : u[t] : (o = typeof n, "string" === o && (i = kt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(x.css(e, t)), o = "number"), null == n || "number" === o && isNaN(n) || ("number" !== o || x.cssNumber[a] || (n += "px"), x.support.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && (n = s.set(e, n, r)) === undefined || (u[t] = n)), undefined)
      }
    },
    css: function(e, t, n, r) {
      var i, o, s, a = x.camelCase(t);
      return t = x.cssProps[a] || (x.cssProps[a] = At(e.style, a)), s = x.cssHooks[t] || x.cssHooks[a], s && "get" in s && (i = s.get(e, !0, n)), i === undefined && (i = vt(e, t, r)), "normal" === i && t in St && (i = St[t]), "" === n || n ? (o = parseFloat(i), n === !0 || x.isNumeric(o) ? o || 0 : i) : i
    }
  }), vt = function(e, t, n) {
    var r, i, o, s = n || qt(e),
      a = s ? s.getPropertyValue(t) || s[t] : undefined,
      u = e.style;
    return s && ("" !== a || x.contains(e.ownerDocument, e) || (a = x.style(e, t)), Ct.test(a) && wt.test(t) && (r = u.width, i = u.minWidth, o = u.maxWidth, u.minWidth = u.maxWidth = u.width = a, a = s.width, u.width = r, u.minWidth = i, u.maxWidth = o)), a
  };

  function Ot(e, t, n) {
    var r = Tt.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
  }

  function Ft(e, t, n, r, i) {
    var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
      s = 0;
    for (; 4 > o; o += 2) "margin" === n && (s += x.css(e, n + jt[o], !0, i)), r ? ("content" === n && (s -= x.css(e, "padding" + jt[o], !0, i)), "margin" !== n && (s -= x.css(e, "border" + jt[o] + "Width", !0, i))) : (s += x.css(e, "padding" + jt[o], !0, i), "padding" !== n && (s += x.css(e, "border" + jt[o] + "Width", !0, i)));
    return s
  }

  function Pt(e, t, n) {
    var r = !0,
      i = "width" === t ? e.offsetWidth : e.offsetHeight,
      o = qt(e),
      s = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o);
    if (0 >= i || null == i) {
      if (i = vt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Ct.test(i)) return i;
      r = s && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
    }
    return i + Ft(e, t, n || (s ? "border" : "content"), r, o) + "px"
  }

  function Rt(e) {
    var t = o,
      n = Nt[e];
    return n || (n = Mt(e, t), "none" !== n && n || (xt = (xt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (xt[0].contentWindow || xt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = Mt(e, t), xt.detach()), Nt[e] = n), n
  }

  function Mt(e, t) {
    var n = x(t.createElement(e)).appendTo(t.body),
      r = x.css(n[0], "display");
    return n.remove(), r
  }
  x.each(["height", "width"], function(e, t) {
    x.cssHooks[t] = {
      get: function(e, n, r) {
        return n ? 0 === e.offsetWidth && bt.test(x.css(e, "display")) ? x.swap(e, Et, function() {
          return Pt(e, t, r)
        }) : Pt(e, t, r) : undefined
      },
      set: function(e, n, r) {
        var i = r && qt(e);
        return Ot(e, n, r ? Ft(e, t, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0)
      }
    }
  }), x(function() {
    x.support.reliableMarginRight || (x.cssHooks.marginRight = {
      get: function(e, t) {
        return t ? x.swap(e, {
          display: "inline-block"
        }, vt, [e, "marginRight"]) : undefined
      }
    }), !x.support.pixelPosition && x.fn.position && x.each(["top", "left"], function(e, t) {
      x.cssHooks[t] = {
        get: function(e, n) {
          return n ? (n = vt(e, t), Ct.test(n) ? x(e).position()[t] + "px" : n) : undefined
        }
      }
    })
  }), x.expr && x.expr.filters && (x.expr.filters.hidden = function(e) {
    return 0 >= e.offsetWidth && 0 >= e.offsetHeight
  }, x.expr.filters.visible = function(e) {
    return !x.expr.filters.hidden(e)
  }), x.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(e, t) {
    x.cssHooks[e + t] = {
      expand: function(n) {
        var r = 0,
          i = {},
          o = "string" == typeof n ? n.split(" ") : [n];
        for (; 4 > r; r++) i[e + jt[r] + t] = o[r] || o[r - 2] || o[0];
        return i
      }
    }, wt.test(e) || (x.cssHooks[e + t].set = Ot)
  });
  var Wt = /%20/g,
    $t = /\[\]$/,
    Bt = /\r?\n/g,
    It = /^(?:submit|button|image|reset|file)$/i,
    zt = /^(?:input|select|textarea|keygen)/i;
  x.fn.extend({
    serialize: function() {
      return x.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var e = x.prop(this, "elements");
        return e ? x.makeArray(e) : this
      }).filter(function() {
        var e = this.type;
        return this.name && !x(this).is(":disabled") && zt.test(this.nodeName) && !It.test(e) && (this.checked || !ot.test(e))
      }).map(function(e, t) {
        var n = x(this).val();
        return null == n ? null : x.isArray(n) ? x.map(n, function(e) {
          return {
            name: t.name,
            value: e.replace(Bt, "\r\n")
          }
        }) : {
          name: t.name,
          value: n.replace(Bt, "\r\n")
        }
      }).get()
    }
  }), x.param = function(e, t) {
    var n, r = [],
      i = function(e, t) {
        t = x.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
      };
    if (t === undefined && (t = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function() {
      i(this.name, this.value)
    });
    else
      for (n in e) _t(n, e[n], t, i);
    return r.join("&").replace(Wt, "+")
  };

  function _t(e, t, n, r) {
    var i;
    if (x.isArray(t)) x.each(t, function(t, i) {
      n || $t.test(e) ? r(e, i) : _t(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
    });
    else if (n || "object" !== x.type(t)) r(e, t);
    else
      for (i in t) _t(e + "[" + i + "]", t[i], n, r)
  }
  x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
    x.fn[t] = function(e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
    }
  }), x.fn.extend({
    hover: function(e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    },
    bind: function(e, t, n) {
      return this.on(e, null, t, n)
    },
    unbind: function(e, t) {
      return this.off(e, null, t)
    },
    delegate: function(e, t, n, r) {
      return this.on(t, e, n, r)
    },
    undelegate: function(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }
  });
  var Xt, Ut, Yt = x.now(),
    Vt = /\?/,
    Gt = /#.*$/,
    Jt = /([?&])_=[^&]*/,
    Qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Kt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Zt = /^(?:GET|HEAD)$/,
    en = /^\/\//,
    tn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    nn = x.fn.load,
    rn = {},
    on = {},
    sn = "*/".concat("*");
  try {
    Ut = i.href
  } catch (an) {
    Ut = o.createElement("a"), Ut.href = "", Ut = Ut.href
  }
  Xt = tn.exec(Ut.toLowerCase()) || [];

  function un(e) {
    return function(t, n) {
      "string" != typeof t && (n = t, t = "*");
      var r, i = 0,
        o = t.toLowerCase().match(w) || [];
      if (x.isFunction(n))
        while (r = o[i++]) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
    }
  }

  function ln(e, t, n, r) {
    var i = {},
      o = e === on;

    function s(a) {
      var u;
      return i[a] = !0, x.each(e[a] || [], function(e, a) {
        var l = a(t, n, r);
        return "string" != typeof l || o || i[l] ? o ? !(u = l) : undefined : (t.dataTypes.unshift(l), s(l), !1)
      }), u
    }
    return s(t.dataTypes[0]) || !i["*"] && s("*")
  }

  function cn(e, t) {
    var n, r, i = x.ajaxSettings.flatOptions || {};
    for (n in t) t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    return r && x.extend(!0, e, r), e
  }
  x.fn.load = function(e, t, n) {
    if ("string" != typeof e && nn) return nn.apply(this, arguments);
    var r, i, o, s = this,
      a = e.indexOf(" ");
    return a >= 0 && (r = e.slice(a), e = e.slice(0, a)), x.isFunction(t) ? (n = t, t = undefined) : t && "object" == typeof t && (i = "POST"), s.length > 0 && x.ajax({
      url: e,
      type: i,
      dataType: "html",
      data: t
    }).done(function(e) {
      o = arguments, s.html(r ? x("<div>").append(x.parseHTML(e)).find(r) : e)
    }).complete(n && function(e, t) {
      s.each(n, o || [e.responseText, t, e])
    }), this
  }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
    x.fn[t] = function(e) {
      return this.on(t, e)
    }
  }), x.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Ut,
      type: "GET",
      isLocal: Kt.test(Xt[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": sn,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": x.parseJSON,
        "text xml": x.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function(e, t) {
      return t ? cn(cn(e, x.ajaxSettings), t) : cn(x.ajaxSettings, e)
    },
    ajaxPrefilter: un(rn),
    ajaxTransport: un(on),
    ajax: function(e, t) {
      "object" == typeof e && (t = e, e = undefined), t = t || {};
      var n, r, i, o, s, a, u, l, c = x.ajaxSetup({}, t),
        p = c.context || c,
        f = c.context && (p.nodeType || p.jquery) ? x(p) : x.event,
        h = x.Deferred(),
        d = x.Callbacks("once memory"),
        g = c.statusCode || {},
        m = {},
        y = {},
        v = 0,
        b = "canceled",
        T = {
          readyState: 0,
          getResponseHeader: function(e) {
            var t;
            if (2 === v) {
              if (!o) {
                o = {};
                while (t = Qt.exec(i)) o[t[1].toLowerCase()] = t[2]
              }
              t = o[e.toLowerCase()]
            }
            return null == t ? null : t
          },
          getAllResponseHeaders: function() {
            return 2 === v ? i : null
          },
          setRequestHeader: function(e, t) {
            var n = e.toLowerCase();
            return v || (e = y[n] = y[n] || e, m[e] = t), this
          },
          overrideMimeType: function(e) {
            return v || (c.mimeType = e), this
          },
          statusCode: function(e) {
            var t;
            if (e)
              if (2 > v)
                for (t in e) g[t] = [g[t], e[t]];
              else T.always(e[T.status]);
            return this
          },
          abort: function(e) {
            var t = e || b;
            return n && n.abort(t), k(0, t), this
          }
        };
      if (h.promise(T).complete = d.add, T.success = T.done, T.error = T.fail, c.url = ((e || c.url || Ut) + "").replace(Gt, "").replace(en, Xt[1] + "//"), c.type = t.method || t.type || c.method || c.type, c.dataTypes = x.trim(c.dataType || "*").toLowerCase().match(w) || [""], null == c.crossDomain && (a = tn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === Xt[1] && a[2] === Xt[2] && (a[3] || ("http:" === a[1] ? "80" : "443")) === (Xt[3] || ("http:" === Xt[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = x.param(c.data, c.traditional)), ln(rn, c, t, T), 2 === v) return T;
      u = c.global, u && 0 === x.active++ && x.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !Zt.test(c.type), r = c.url, c.hasContent || (c.data && (r = c.url += (Vt.test(r) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = Jt.test(r) ? r.replace(Jt, "$1_=" + Yt++) : r + (Vt.test(r) ? "&" : "?") + "_=" + Yt++)), c.ifModified && (x.lastModified[r] && T.setRequestHeader("If-Modified-Since", x.lastModified[r]), x.etag[r] && T.setRequestHeader("If-None-Match", x.etag[r])), (c.data && c.hasContent && c.contentType !== !1 || t.contentType) && T.setRequestHeader("Content-Type", c.contentType), T.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + sn + "; q=0.01" : "") : c.accepts["*"]);
      for (l in c.headers) T.setRequestHeader(l, c.headers[l]);
      if (c.beforeSend && (c.beforeSend.call(p, T, c) === !1 || 2 === v)) return T.abort();
      b = "abort";
      for (l in {
          success: 1,
          error: 1,
          complete: 1
        }) T[l](c[l]);
      if (n = ln(on, c, t, T)) {
        T.readyState = 1, u && f.trigger("ajaxSend", [T, c]), c.async && c.timeout > 0 && (s = setTimeout(function() {
          T.abort("timeout")
        }, c.timeout));
        try {
          v = 1, n.send(m, k)
        } catch (C) {
          if (!(2 > v)) throw C;
          k(-1, C)
        }
      } else k(-1, "No Transport");

      function k(e, t, o, a) {
        var l, m, y, b, w, C = t;
        2 !== v && (v = 2, s && clearTimeout(s), n = undefined, i = a || "", T.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, o && (b = pn(c, T, o)), b = fn(c, b, T, l), l ? (c.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (x.lastModified[r] = w), w = T.getResponseHeader("etag"), w && (x.etag[r] = w)), 204 === e || "HEAD" === c.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = b.state, m = b.data, y = b.error, l = !y)) : (y = C, (e || !C) && (C = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (t || C) + "", l ? h.resolveWith(p, [m, C, T]) : h.rejectWith(p, [T, C, y]), T.statusCode(g), g = undefined, u && f.trigger(l ? "ajaxSuccess" : "ajaxError", [T, c, l ? m : y]), d.fireWith(p, [T, C]), u && (f.trigger("ajaxComplete", [T, c]), --x.active || x.event.trigger("ajaxStop")))
      }
      return T
    },
    getJSON: function(e, t, n) {
      return x.get(e, t, n, "json")
    },
    getScript: function(e, t) {
      return x.get(e, undefined, t, "script")
    }
  }), x.each(["get", "post"], function(e, t) {
    x[t] = function(e, n, r, i) {
      return x.isFunction(n) && (i = i || r, r = n, n = undefined), x.ajax({
        url: e,
        type: t,
        dataType: i,
        data: n,
        success: r
      })
    }
  });

  function pn(e, t, n) {
    var r, i, o, s, a = e.contents,
      u = e.dataTypes;
    while ("*" === u[0]) u.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
    if (r)
      for (i in a)
        if (a[i] && a[i].test(r)) {
          u.unshift(i);
          break
        }
    if (u[0] in n) o = u[0];
    else {
      for (i in n) {
        if (!u[0] || e.converters[i + " " + u[0]]) {
          o = i;
          break
        }
        s || (s = i)
      }
      o = o || s
    }
    return o ? (o !== u[0] && u.unshift(o), n[o]) : undefined
  }

  function fn(e, t, n, r) {
    var i, o, s, a, u, l = {},
      c = e.dataTypes.slice();
    if (c[1])
      for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
    o = c.shift();
    while (o)
      if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
        if ("*" === o) o = u;
        else if ("*" !== u && u !== o) {
      if (s = l[u + " " + o] || l["* " + o], !s)
        for (i in l)
          if (a = i.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
            s === !0 ? s = l[i] : l[i] !== !0 && (o = a[0], c.unshift(a[1]));
            break
          }
      if (s !== !0)
        if (s && e["throws"]) t = s(t);
        else try {
          t = s(t)
        } catch (p) {
          return {
            state: "parsererror",
            error: s ? p : "No conversion from " + u + " to " + o
          }
        }
    }
    return {
      state: "success",
      data: t
    }
  }
  x.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function(e) {
        return x.globalEval(e), e
      }
    }
  }), x.ajaxPrefilter("script", function(e) {
    e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
  }), x.ajaxTransport("script", function(e) {
    if (e.crossDomain) {
      var t, n;
      return {
        send: function(r, i) {
          t = x("<script>").prop({
            async: !0,
            charset: e.scriptCharset,
            src: e.url
          }).on("load error", n = function(e) {
            t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
          }), o.head.appendChild(t[0])
        },
        abort: function() {
          n && n()
        }
      }
    }
  });
  var hn = [],
    dn = /(=)\?(?=&|$)|\?\?/;
  x.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var e = hn.pop() || x.expando + "_" + Yt++;
      return this[e] = !0, e
    }
  }), x.ajaxPrefilter("json jsonp", function(t, n, r) {
    var i, o, s, a = t.jsonp !== !1 && (dn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && dn.test(t.data) && "data");
    return a || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = x.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(dn, "$1" + i) : t.jsonp !== !1 && (t.url += (Vt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
      return s || x.error(i + " was not called"), s[0]
    }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
      s = arguments
    }, r.always(function() {
      e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, hn.push(i)), s && x.isFunction(o) && o(s[0]), s = o = undefined
    }), "script") : undefined
  }), x.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest
    } catch (e) {}
  };
  var gn = x.ajaxSettings.xhr(),
    mn = {
      0: 200,
      1223: 204
    },
    yn = 0,
    vn = {};
  e.ActiveXObject && x(e).on("unload", function() {
    for (var e in vn) vn[e]();
    vn = undefined
  }), x.support.cors = !!gn && "withCredentials" in gn, x.support.ajax = gn = !!gn, x.ajaxTransport(function(e) {
    var t;
    return x.support.cors || gn && !e.crossDomain ? {
      send: function(n, r) {
        var i, o, s = e.xhr();
        if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
          for (i in e.xhrFields) s[i] = e.xhrFields[i];
        e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
        for (i in n) s.setRequestHeader(i, n[i]);
        t = function(e) {
          return function() {
            t && (delete vn[o], t = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? r(s.status || 404, s.statusText) : r(mn[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
              text: s.responseText
            } : undefined, s.getAllResponseHeaders()))
          }
        }, s.onload = t(), s.onerror = t("error"), t = vn[o = yn++] = t("abort"), s.send(e.hasContent && e.data || null)
      },
      abort: function() {
        t && t()
      }
    } : undefined
  });
  var xn, bn, wn = /^(?:toggle|show|hide)$/,
    Tn = RegExp("^(?:([+-])=|)(" + b + ")([a-z%]*)$", "i"),
    Cn = /queueHooks$/,
    kn = [An],
    Nn = {
      "*": [function(e, t) {
        var n = this.createTween(e, t),
          r = n.cur(),
          i = Tn.exec(t),
          o = i && i[3] || (x.cssNumber[e] ? "" : "px"),
          s = (x.cssNumber[e] || "px" !== o && +r) && Tn.exec(x.css(n.elem, e)),
          a = 1,
          u = 20;
        if (s && s[3] !== o) {
          o = o || s[3], i = i || [], s = +r || 1;
          do a = a || ".5", s /= a, x.style(n.elem, e, s + o); while (a !== (a = n.cur() / r) && 1 !== a && --u)
        }
        return i && (s = n.start = +s || +r || 0, n.unit = o, n.end = i[1] ? s + (i[1] + 1) * i[2] : +i[2]), n
      }]
    };

  function En() {
    return setTimeout(function() {
      xn = undefined
    }), xn = x.now()
  }

  function Sn(e, t, n) {
    var r, i = (Nn[t] || []).concat(Nn["*"]),
      o = 0,
      s = i.length;
    for (; s > o; o++)
      if (r = i[o].call(n, t, e)) return r
  }

  function jn(e, t, n) {
    var r, i, o = 0,
      s = kn.length,
      a = x.Deferred().always(function() {
        delete u.elem
      }),
      u = function() {
        if (i) return !1;
        var t = xn || En(),
          n = Math.max(0, l.startTime + l.duration - t),
          r = n / l.duration || 0,
          o = 1 - r,
          s = 0,
          u = l.tweens.length;
        for (; u > s; s++) l.tweens[s].run(o);
        return a.notifyWith(e, [l, o, n]), 1 > o && u ? n : (a.resolveWith(e, [l]), !1)
      },
      l = a.promise({
        elem: e,
        props: x.extend({}, t),
        opts: x.extend(!0, {
          specialEasing: {}
        }, n),
        originalProperties: t,
        originalOptions: n,
        startTime: xn || En(),
        duration: n.duration,
        tweens: [],
        createTween: function(t, n) {
          var r = x.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
          return l.tweens.push(r), r
        },
        stop: function(t) {
          var n = 0,
            r = t ? l.tweens.length : 0;
          if (i) return this;
          for (i = !0; r > n; n++) l.tweens[n].run(1);
          return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this
        }
      }),
      c = l.props;
    for (Dn(c, l.opts.specialEasing); s > o; o++)
      if (r = kn[o].call(l, e, c, l.opts)) return r;
    return x.map(c, Sn, l), x.isFunction(l.opts.start) && l.opts.start.call(e, l), x.fx.timer(x.extend(u, {
      elem: e,
      anim: l,
      queue: l.opts.queue
    })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
  }

  function Dn(e, t) {
    var n, r, i, o, s;
    for (n in e)
      if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), s = x.cssHooks[r], s && "expand" in s) {
        o = s.expand(o), delete e[r];
        for (n in o) n in e || (e[n] = o[n], t[n] = i)
      } else t[r] = i
  }
  x.Animation = x.extend(jn, {
    tweener: function(e, t) {
      x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
      var n, r = 0,
        i = e.length;
      for (; i > r; r++) n = e[r], Nn[n] = Nn[n] || [], Nn[n].unshift(t)
    },
    prefilter: function(e, t) {
      t ? kn.unshift(e) : kn.push(e)
    }
  });

  function An(e, t, n) {
    var r, i, o, s, a, u, l = this,
      c = {},
      p = e.style,
      f = e.nodeType && Lt(e),
      h = q.get(e, "fxshow");
    n.queue || (a = x._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, u = a.empty.fire, a.empty.fire = function() {
      a.unqueued || u()
    }), a.unqueued++, l.always(function() {
      l.always(function() {
        a.unqueued--, x.queue(e, "fx").length || a.empty.fire()
      })
    })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", l.always(function() {
      p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
    }));
    for (r in t)
      if (i = t[r], wn.exec(i)) {
        if (delete t[r], o = o || "toggle" === i, i === (f ? "hide" : "show")) {
          if ("show" !== i || !h || h[r] === undefined) continue;
          f = !0
        }
        c[r] = h && h[r] || x.style(e, r)
      }
    if (!x.isEmptyObject(c)) {
      h ? "hidden" in h && (f = h.hidden) : h = q.access(e, "fxshow", {}), o && (h.hidden = !f), f ? x(e).show() : l.done(function() {
        x(e).hide()
      }), l.done(function() {
        var t;
        q.remove(e, "fxshow");
        for (t in c) x.style(e, t, c[t])
      });
      for (r in c) s = Sn(f ? h[r] : 0, r, l), r in h || (h[r] = s.start, f && (s.end = s.start, s.start = "width" === r || "height" === r ? 1 : 0))
    }
  }

  function Ln(e, t, n, r, i) {
    return new Ln.prototype.init(e, t, n, r, i)
  }
  x.Tween = Ln, Ln.prototype = {
    constructor: Ln,
    init: function(e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px")
    },
    cur: function() {
      var e = Ln.propHooks[this.prop];
      return e && e.get ? e.get(this) : Ln.propHooks._default.get(this)
    },
    run: function(e) {
      var t, n = Ln.propHooks[this.prop];
      return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ln.propHooks._default.set(this), this
    }
  }, Ln.prototype.init.prototype = Ln.prototype, Ln.propHooks = {
    _default: {
      get: function(e) {
        var t;
        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
      },
      set: function(e) {
        x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
      }
    }
  }, Ln.propHooks.scrollTop = Ln.propHooks.scrollLeft = {
    set: function(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }
  }, x.each(["toggle", "show", "hide"], function(e, t) {
    var n = x.fn[t];
    x.fn[t] = function(e, r, i) {
      return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(qn(t, !0), e, r, i)
    }
  }), x.fn.extend({
    fadeTo: function(e, t, n, r) {
      return this.filter(Lt).css("opacity", 0).show().end().animate({
        opacity: t
      }, e, n, r)
    },
    animate: function(e, t, n, r) {
      var i = x.isEmptyObject(e),
        o = x.speed(t, n, r),
        s = function() {
          var t = jn(this, x.extend({}, e), o);
          (i || q.get(this, "finish")) && t.stop(!0)
        };
      return s.finish = s, i || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
    },
    stop: function(e, t, n) {
      var r = function(e) {
        var t = e.stop;
        delete e.stop, t(n)
      };
      return "string" != typeof e && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
        var t = !0,
          i = null != e && e + "queueHooks",
          o = x.timers,
          s = q.get(this);
        if (i) s[i] && s[i].stop && r(s[i]);
        else
          for (i in s) s[i] && s[i].stop && Cn.test(i) && r(s[i]);
        for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
        (t || !n) && x.dequeue(this, e)
      })
    },
    finish: function(e) {
      return e !== !1 && (e = e || "fx"), this.each(function() {
        var t, n = q.get(this),
          r = n[e + "queue"],
          i = n[e + "queueHooks"],
          o = x.timers,
          s = r ? r.length : 0;
        for (n.finish = !0, x.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
        for (t = 0; s > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
        delete n.finish
      })
    }
  });

  function qn(e, t) {
    var n, r = {
        height: e
      },
      i = 0;
    for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = jt[i], r["margin" + n] = r["padding" + n] = e;
    return t && (r.opacity = r.width = e), r
  }
  x.each({
    slideDown: qn("show"),
    slideUp: qn("hide"),
    slideToggle: qn("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function(e, t) {
    x.fn[e] = function(e, n, r) {
      return this.animate(t, e, n, r)
    }
  }), x.speed = function(e, t, n) {
    var r = e && "object" == typeof e ? x.extend({}, e) : {
      complete: n || !n && t || x.isFunction(e) && e,
      duration: e,
      easing: n && t || t && !x.isFunction(t) && t
    };
    return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
      x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue)
    }, r
  }, x.easing = {
    linear: function(e) {
      return e
    },
    swing: function(e) {
      return .5 - Math.cos(e * Math.PI) / 2
    }
  }, x.timers = [], x.fx = Ln.prototype.init, x.fx.tick = function() {
    var e, t = x.timers,
      n = 0;
    for (xn = x.now(); t.length > n; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
    t.length || x.fx.stop(), xn = undefined
  }, x.fx.timer = function(e) {
    e() && x.timers.push(e) && x.fx.start()
  }, x.fx.interval = 13, x.fx.start = function() {
    bn || (bn = setInterval(x.fx.tick, x.fx.interval))
  }, x.fx.stop = function() {
    clearInterval(bn), bn = null
  }, x.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function(e) {
    return x.grep(x.timers, function(t) {
      return e === t.elem
    }).length
  }), x.fn.offset = function(e) {
    if (arguments.length) return e === undefined ? this : this.each(function(t) {
      x.offset.setOffset(this, e, t)
    });
    var t, n, i = this[0],
      o = {
        top: 0,
        left: 0
      },
      s = i && i.ownerDocument;
    if (s) return t = s.documentElement, x.contains(t, i) ? (typeof i.getBoundingClientRect !== r && (o = i.getBoundingClientRect()), n = Hn(s), {
      top: o.top + n.pageYOffset - t.clientTop,
      left: o.left + n.pageXOffset - t.clientLeft
    }) : o
  }, x.offset = {
    setOffset: function(e, t, n) {
      var r, i, o, s, a, u, l, c = x.css(e, "position"),
        p = x(e),
        f = {};
      "static" === c && (e.style.position = "relative"), a = p.offset(), o = x.css(e, "top"), u = x.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = p.position(), s = r.top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), x.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (f.top = t.top - a.top + s), null != t.left && (f.left = t.left - a.left + i), "using" in t ? t.using.call(e, f) : p.css(f)
    }
  }, x.fn.extend({
    position: function() {
      if (this[0]) {
        var e, t, n = this[0],
          r = {
            top: 0,
            left: 0
          };
        return "fixed" === x.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0], "html") || (r = e.offset()), r.top += x.css(e[0], "borderTopWidth", !0), r.left += x.css(e[0], "borderLeftWidth", !0)), {
          top: t.top - r.top - x.css(n, "marginTop", !0),
          left: t.left - r.left - x.css(n, "marginLeft", !0)
        }
      }
    },
    offsetParent: function() {
      return this.map(function() {
        var e = this.offsetParent || s;
        while (e && !x.nodeName(e, "html") && "static" === x.css(e, "position")) e = e.offsetParent;
        return e || s
      })
    }
  }), x.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(t, n) {
    var r = "pageYOffset" === n;
    x.fn[t] = function(i) {
      return x.access(this, function(t, i, o) {
        var s = Hn(t);
        return o === undefined ? s ? s[n] : t[i] : (s ? s.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o, undefined)
      }, t, i, arguments.length, null)
    }
  });

  function Hn(e) {
    return x.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
  }
  x.each({
    Height: "height",
    Width: "width"
  }, function(e, t) {
    x.each({
      padding: "inner" + e,
      content: t,
      "": "outer" + e
    }, function(n, r) {
      x.fn[r] = function(r, i) {
        var o = arguments.length && (n || "boolean" != typeof r),
          s = n || (r === !0 || i === !0 ? "margin" : "border");
        return x.access(this, function(t, n, r) {
          var i;
          return x.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? x.css(t, n, s) : x.style(t, n, r, s)
        }, t, o ? r : undefined, o, null)
      }
    })
  }), x.fn.size = function() {
    return this.length
  }, x.fn.andSelf = x.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = x : "function" == typeof define && define.amd && define("jquery", [], function() {
    return x
  }), "object" == typeof e && "object" == typeof e.document && (e.jQuery = e.$ = x)
})(window);

/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
  "use strict";
  var b = a.fn.jquery.split(" ")[0].split(".");
  if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")
}(jQuery), + function(a) {
  "use strict";

  function b() {
    var a = document.createElement("bootstrap"),
      b = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend"
      };
    for (var c in b)
      if (void 0 !== a.style[c]) return {
        end: b[c]
      };
    return !1
  }
  a.fn.emulateTransitionEnd = function(b) {
    var c = !1,
      d = this;
    a(this).one("bsTransitionEnd", function() {
      c = !0
    });
    var e = function() {
      c || a(d).trigger(a.support.transition.end)
    };
    return setTimeout(e, b), this
  }, a(function() {
    a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
      bindType: a.support.transition.end,
      delegateType: a.support.transition.end,
      handle: function(b) {
        return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
      }
    })
  })
}(jQuery), + function(a) {
  "use strict";

  function b(b) {
    return this.each(function() {
      var c = a(this),
        e = c.data("bs.alert");
      e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
    })
  }
  var c = '[data-dismiss="alert"]',
    d = function(b) {
      a(b).on("click", c, this.close)
    };
  d.VERSION = "3.3.6", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
    function c() {
      g.detach().trigger("closed.bs.alert").remove()
    }
    var e = a(this),
      f = e.attr("data-target");
    f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
    var g = a(f);
    b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
  };
  var e = a.fn.alert;
  a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
    return a.fn.alert = e, this
  }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
  "use strict";

  function b(b) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.button"),
        f = "object" == typeof b && b;
      e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
    })
  }
  var c = function(b, d) {
    this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
  };
  c.VERSION = "3.3.6", c.DEFAULTS = {
    loadingText: "loading..."
  }, c.prototype.setState = function(b) {
    var c = "disabled",
      d = this.$element,
      e = d.is("input") ? "val" : "html",
      f = d.data();
    b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
      d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
    }, this), 0)
  }, c.prototype.toggle = function() {
    var a = !0,
      b = this.$element.closest('[data-toggle="buttons"]');
    if (b.length) {
      var c = this.$element.find("input");
      "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
    } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
  };
  var d = a.fn.button;
  a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
    return a.fn.button = d, this
  }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
    var d = a(c.target);
    d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault()
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
    a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
  })
}(jQuery), + function(a) {
  "use strict";

  function b(b) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.carousel"),
        f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
        g = "string" == typeof b ? b : f.slide;
      e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
    })
  }
  var c = function(b, c) {
    this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
  };
  c.VERSION = "3.3.6", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: !0,
    keyboard: !0
  }, c.prototype.keydown = function(a) {
    if (!/input|textarea/i.test(a.target.tagName)) {
      switch (a.which) {
        case 37:
          this.prev();
          break;
        case 39:
          this.next();
          break;
        default:
          return
      }
      a.preventDefault()
    }
  }, c.prototype.cycle = function(b) {
    return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
  }, c.prototype.getItemIndex = function(a) {
    return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
  }, c.prototype.getItemForDirection = function(a, b) {
    var c = this.getItemIndex(b),
      d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
    if (d && !this.options.wrap) return b;
    var e = "prev" == a ? -1 : 1,
      f = (c + e) % this.$items.length;
    return this.$items.eq(f)
  }, c.prototype.to = function(a) {
    var b = this,
      c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
      b.to(a)
    }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
  }, c.prototype.pause = function(b) {
    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
  }, c.prototype.next = function() {
    return this.sliding ? void 0 : this.slide("next")
  }, c.prototype.prev = function() {
    return this.sliding ? void 0 : this.slide("prev")
  }, c.prototype.slide = function(b, d) {
    var e = this.$element.find(".item.active"),
      f = d || this.getItemForDirection(b, e),
      g = this.interval,
      h = "next" == b ? "left" : "right",
      i = this;
    if (f.hasClass("active")) return this.sliding = !1;
    var j = f[0],
      k = a.Event("slide.bs.carousel", {
        relatedTarget: j,
        direction: h
      });
    if (this.$element.trigger(k), !k.isDefaultPrevented()) {
      if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
        this.$indicators.find(".active").removeClass("active");
        var l = a(this.$indicators.children()[this.getItemIndex(f)]);
        l && l.addClass("active")
      }
      var m = a.Event("slid.bs.carousel", {
        relatedTarget: j,
        direction: h
      });
      return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
        f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
          i.$element.trigger(m)
        }, 0)
      }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
    }
  };
  var d = a.fn.carousel;
  a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
    return a.fn.carousel = d, this
  };
  var e = function(c) {
    var d, e = a(this),
      f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
    if (f.hasClass("carousel")) {
      var g = a.extend({}, f.data(), e.data()),
        h = e.attr("data-slide-to");
      h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
    }
  };
  a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
    a('[data-ride="carousel"]').each(function() {
      var c = a(this);
      b.call(c, c.data())
    })
  })
}(jQuery), + function(a) {
  "use strict";

  function b(b) {
    var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
    return a(d)
  }

  function c(b) {
    return this.each(function() {
      var c = a(this),
        e = c.data("bs.collapse"),
        f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
      !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
    })
  }
  var d = function(b, c) {
    this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
  };
  d.VERSION = "3.3.6", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
    toggle: !0
  }, d.prototype.dimension = function() {
    var a = this.$element.hasClass("width");
    return a ? "width" : "height"
  }, d.prototype.show = function() {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
      if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
        var f = a.Event("show.bs.collapse");
        if (this.$element.trigger(f), !f.isDefaultPrevented()) {
          e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
          var g = this.dimension();
          this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
          var h = function() {
            this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
          };
          if (!a.support.transition) return h.call(this);
          var i = a.camelCase(["scroll", g].join("-"));
          this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
        }
      }
    }
  }, d.prototype.hide = function() {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var b = a.Event("hide.bs.collapse");
      if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.dimension();
        this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
        var e = function() {
          this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
        };
        return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
      }
    }
  }, d.prototype.toggle = function() {
    this[this.$element.hasClass("in") ? "hide" : "show"]()
  }, d.prototype.getParent = function() {
    return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
      var e = a(d);
      this.addAriaAndCollapsedClass(b(e), e)
    }, this)).end()
  }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
    var c = a.hasClass("in");
    a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
  };
  var e = a.fn.collapse;
  a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
    return a.fn.collapse = e, this
  }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
    var e = a(this);
    e.attr("data-target") || d.preventDefault();
    var f = b(e),
      g = f.data("bs.collapse"),
      h = g ? "toggle" : e.data();
    c.call(f, h)
  })
}(jQuery), + function(a) {
  "use strict";

  function b(b) {
    var c = b.attr("data-target");
    c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
    var d = c && a(c);
    return d && d.length ? d : b.parent()
  }

  function c(c) {
    c && 3 === c.which || (a(e).remove(), a(f).each(function() {
      var d = a(this),
        e = b(d),
        f = {
          relatedTarget: this
        };
      e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
    }))
  }

  function d(b) {
    return this.each(function() {
      var c = a(this),
        d = c.data("bs.dropdown");
      d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
    })
  }
  var e = ".dropdown-backdrop",
    f = '[data-toggle="dropdown"]',
    g = function(b) {
      a(b).on("click.bs.dropdown", this.toggle)
    };
  g.VERSION = "3.3.6", g.prototype.toggle = function(d) {
    var e = a(this);
    if (!e.is(".disabled, :disabled")) {
      var f = b(e),
        g = f.hasClass("open");
      if (c(), !g) {
        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
        var h = {
          relatedTarget: this
        };
        if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
        e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
      }
      return !1
    }
  }, g.prototype.keydown = function(c) {
    if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
      var d = a(this);
      if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
        var e = b(d),
          g = e.hasClass("open");
        if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
        var h = " li:not(.disabled):visible a",
          i = e.find(".dropdown-menu" + h);
        if (i.length) {
          var j = i.index(c.target);
          38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
        }
      }
    }
  };
  var h = a.fn.dropdown;
  a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
    return a.fn.dropdown = h, this
  }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
    a.stopPropagation()
  }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function(a) {
  "use strict";

  function b(b, d) {
    return this.each(function() {
      var e = a(this),
        f = e.data("bs.modal"),
        g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
      f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
    })
  }
  var c = function(b, c) {
    this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
      this.$element.trigger("loaded.bs.modal")
    }, this))
  };
  c.VERSION = "3.3.6", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
  }, c.prototype.toggle = function(a) {
    return this.isShown ? this.hide() : this.show(a)
  }, c.prototype.show = function(b) {
    var d = this,
      e = a.Event("show.bs.modal", {
        relatedTarget: b
      });
    this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
      d.$element.one("mouseup.dismiss.bs.modal", function(b) {
        a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
      })
    }), this.backdrop(function() {
      var e = a.support.transition && d.$element.hasClass("fade");
      d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
      var f = a.Event("shown.bs.modal", {
        relatedTarget: b
      });
      e ? d.$dialog.one("bsTransitionEnd", function() {
        d.$element.trigger("focus").trigger(f)
      }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
    }))
  }, c.prototype.hide = function(b) {
    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
  }, c.prototype.enforceFocus = function() {
    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
      this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
    }, this))
  }, c.prototype.escape = function() {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
      27 == a.which && this.hide()
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
  }, c.prototype.resize = function() {
    this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
  }, c.prototype.hideModal = function() {
    var a = this;
    this.$element.hide(), this.backdrop(function() {
      a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
    })
  }, c.prototype.removeBackdrop = function() {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
  }, c.prototype.backdrop = function(b) {
    var d = this,
      e = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var f = a.support.transition && e;
      if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
          return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
        }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
      f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");
      var g = function() {
        d.removeBackdrop(), b && b()
      };
      a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
    } else b && b()
  }, c.prototype.handleUpdate = function() {
    this.adjustDialog()
  }, c.prototype.adjustDialog = function() {
    var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
      paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
    })
  }, c.prototype.resetAdjustments = function() {
    this.$element.css({
      paddingLeft: "",
      paddingRight: ""
    })
  }, c.prototype.checkScrollbar = function() {
    var a = window.innerWidth;
    if (!a) {
      var b = document.documentElement.getBoundingClientRect();
      a = b.right - Math.abs(b.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
  }, c.prototype.setScrollbar = function() {
    var a = parseInt(this.$body.css("padding-right") || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
  }, c.prototype.resetScrollbar = function() {
    this.$body.css("padding-right", this.originalBodyPad)
  }, c.prototype.measureScrollbar = function() {
    var a = document.createElement("div");
    a.className = "modal-scrollbar-measure", this.$body.append(a);
    var b = a.offsetWidth - a.clientWidth;
    return this.$body[0].removeChild(a), b
  };
  var d = a.fn.modal;
  a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
    return a.fn.modal = d, this
  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
    var d = a(this),
      e = d.attr("href"),
      f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
      g = f.data("bs.modal") ? "toggle" : a.extend({
        remote: !/#/.test(e) && e
      }, f.data(), d.data());
    d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
      a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
        d.is(":visible") && d.trigger("focus")
      })
    }), b.call(f, g, this)
  })
}(jQuery), + function(a) {
  "use strict";

  function b(b) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.tooltip"),
        f = "object" == typeof b && b;
      (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
    })
  }
  var c = function(a, b) {
    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
  };
  c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1,
    viewport: {
      selector: "body",
      padding: 0
    }
  }, c.prototype.init = function(b, c, d) {
    if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
        click: !1,
        hover: !1,
        focus: !1
      }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
    for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
      var g = e[f];
      if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
      else if ("manual" != g) {
        var h = "hover" == g ? "mouseenter" : "focusin",
          i = "hover" == g ? "mouseleave" : "focusout";
        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
      }
    }
    this.options.selector ? this._options = a.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle()
  }, c.prototype.getDefaults = function() {
    return c.DEFAULTS
  }, c.prototype.getOptions = function(b) {
    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
      show: b.delay,
      hide: b.delay
    }), b
  }, c.prototype.getDelegateOptions = function() {
    var b = {},
      c = this.getDefaults();
    return this._options && a.each(this._options, function(a, d) {
      c[a] != d && (b[a] = d)
    }), b
  }, c.prototype.enter = function(b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
      "in" == c.hoverState && c.show()
    }, c.options.delay.show)) : c.show())
  }, c.prototype.isInStateTrue = function() {
    for (var a in this.inState)
      if (this.inState[a]) return !0;
    return !1
  }, c.prototype.leave = function(b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
      "out" == c.hoverState && c.hide()
    }, c.options.delay.hide)) : c.hide())
  }, c.prototype.show = function() {
    var b = a.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(b);
      var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (b.isDefaultPrevented() || !d) return;
      var e = this,
        f = this.tip(),
        g = this.getUID(this.type);
      this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
      var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
        i = /\s?auto?\s?/i,
        j = i.test(h);
      j && (h = h.replace(i, "") || "top"), f.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
      var k = this.getPosition(),
        l = f[0].offsetWidth,
        m = f[0].offsetHeight;
      if (j) {
        var n = h,
          o = this.getPosition(this.$viewport);
        h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
      }
      var p = this.getCalculatedOffset(h, k, l, m);
      this.applyPlacement(p, h);
      var q = function() {
        var a = e.hoverState;
        e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
      };
      a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
    }
  }, c.prototype.applyPlacement = function(b, c) {
    var d = this.tip(),
      e = d[0].offsetWidth,
      f = d[0].offsetHeight,
      g = parseInt(d.css("margin-top"), 10),
      h = parseInt(d.css("margin-left"), 10);
    isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
      using: function(a) {
        d.css({
          top: Math.round(a.top),
          left: Math.round(a.left)
        })
      }
    }, b), 0), d.addClass("in");
    var i = d[0].offsetWidth,
      j = d[0].offsetHeight;
    "top" == c && j != f && (b.top = b.top + f - j);
    var k = this.getViewportAdjustedDelta(c, b, i, j);
    k.left ? b.left += k.left : b.top += k.top;
    var l = /top|bottom/.test(c),
      m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
      n = l ? "offsetWidth" : "offsetHeight";
    d.offset(b), this.replaceArrow(m, d[0][n], l)
  }, c.prototype.replaceArrow = function(a, b, c) {
    this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
  }, c.prototype.setContent = function() {
    var a = this.tip(),
      b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
  }, c.prototype.hide = function(b) {
    function d() {
      "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
    }
    var e = this,
      f = a(this.$tip),
      g = a.Event("hide.bs." + this.type);
    return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
  }, c.prototype.fixTitle = function() {
    var a = this.$element;
    (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
  }, c.prototype.hasContent = function() {
    return this.getTitle()
  }, c.prototype.getPosition = function(b) {
    b = b || this.$element;
    var c = b[0],
      d = "BODY" == c.tagName,
      e = c.getBoundingClientRect();
    null == e.width && (e = a.extend({}, e, {
      width: e.right - e.left,
      height: e.bottom - e.top
    }));
    var f = d ? {
        top: 0,
        left: 0
      } : b.offset(),
      g = {
        scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
      },
      h = d ? {
        width: a(window).width(),
        height: a(window).height()
      } : null;
    return a.extend({}, e, g, h, f)
  }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
    return "bottom" == a ? {
      top: b.top + b.height,
      left: b.left + b.width / 2 - c / 2
    } : "top" == a ? {
      top: b.top - d,
      left: b.left + b.width / 2 - c / 2
    } : "left" == a ? {
      top: b.top + b.height / 2 - d / 2,
      left: b.left - c
    } : {
      top: b.top + b.height / 2 - d / 2,
      left: b.left + b.width
    }
  }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
    var e = {
      top: 0,
      left: 0
    };
    if (!this.$viewport) return e;
    var f = this.options.viewport && this.options.viewport.padding || 0,
      g = this.getPosition(this.$viewport);
    if (/right|left/.test(a)) {
      var h = b.top - f - g.scroll,
        i = b.top + f - g.scroll + d;
      h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
    } else {
      var j = b.left - f,
        k = b.left + f + c;
      j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
    }
    return e
  }, c.prototype.getTitle = function() {
    var a, b = this.$element,
      c = this.options;
    return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
  }, c.prototype.getUID = function(a) {
    do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
    return a
  }, c.prototype.tip = function() {
    if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
    return this.$tip
  }, c.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
  }, c.prototype.enable = function() {
    this.enabled = !0
  }, c.prototype.disable = function() {
    this.enabled = !1
  }, c.prototype.toggleEnabled = function() {
    this.enabled = !this.enabled
  }, c.prototype.toggle = function(b) {
    var c = this;
    b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
  }, c.prototype.destroy = function() {
    var a = this;
    clearTimeout(this.timeout), this.hide(function() {
      a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null
    })
  };
  var d = a.fn.tooltip;
  a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
    return a.fn.tooltip = d, this
  }
}(jQuery), + function(a) {
  "use strict";

  function b(b) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.popover"),
        f = "object" == typeof b && b;
      (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
    })
  }
  var c = function(a, b) {
    this.init("popover", a, b)
  };
  if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
  c.VERSION = "3.3.6", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
    return c.DEFAULTS
  }, c.prototype.setContent = function() {
    var a = this.tip(),
      b = this.getTitle(),
      c = this.getContent();
    a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
  }, c.prototype.hasContent = function() {
    return this.getTitle() || this.getContent()
  }, c.prototype.getContent = function() {
    var a = this.$element,
      b = this.options;
    return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
  }, c.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".arrow")
  };
  var d = a.fn.popover;
  a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
    return a.fn.popover = d, this
  }
}(jQuery), + function(a) {
  "use strict";

  function b(c, d) {
    this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
  }

  function c(c) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.scrollspy"),
        f = "object" == typeof c && c;
      e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }
  b.VERSION = "3.3.6", b.DEFAULTS = {
    offset: 10
  }, b.prototype.getScrollHeight = function() {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }, b.prototype.refresh = function() {
    var b = this,
      c = "offset",
      d = 0;
    this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
      var b = a(this),
        e = b.data("target") || b.attr("href"),
        f = /^#./.test(e) && a(e);
      return f && f.length && f.is(":visible") && [
        [f[c]().top + d, e]
      ] || null
    }).sort(function(a, b) {
      return a[0] - b[0]
    }).each(function() {
      b.offsets.push(this[0]), b.targets.push(this[1])
    })
  }, b.prototype.process = function() {
    var a, b = this.$scrollElement.scrollTop() + this.options.offset,
      c = this.getScrollHeight(),
      d = this.options.offset + c - this.$scrollElement.height(),
      e = this.offsets,
      f = this.targets,
      g = this.activeTarget;
    if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
    if (g && b < e[0]) return this.activeTarget = null, this.clear();
    for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
  }, b.prototype.activate = function(b) {
    this.activeTarget = b, this.clear();
    var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
      d = a(c).parents("li").addClass("active");
    d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
  }, b.prototype.clear = function() {
    a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
  };
  var d = a.fn.scrollspy;
  a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
    return a.fn.scrollspy = d, this
  }, a(window).on("load.bs.scrollspy.data-api", function() {
    a('[data-spy="scroll"]').each(function() {
      var b = a(this);
      c.call(b, b.data())
    })
  })
}(jQuery), + function(a) {
  "use strict";

  function b(b) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.tab");
      e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
    })
  }
  var c = function(b) {
    this.element = a(b)
  };
  c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
    var b = this.element,
      c = b.closest("ul:not(.dropdown-menu)"),
      d = b.data("target");
    if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
      var e = c.find(".active:last a"),
        f = a.Event("hide.bs.tab", {
          relatedTarget: b[0]
        }),
        g = a.Event("show.bs.tab", {
          relatedTarget: e[0]
        });
      if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
        var h = a(d);
        this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
          e.trigger({
            type: "hidden.bs.tab",
            relatedTarget: b[0]
          }), b.trigger({
            type: "shown.bs.tab",
            relatedTarget: e[0]
          })
        })
      }
    }
  }, c.prototype.activate = function(b, d, e) {
    function f() {
      g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
    }
    var g = d.find("> .active"),
      h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
    g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
  };
  var d = a.fn.tab;
  a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
    return a.fn.tab = d, this
  };
  var e = function(c) {
    c.preventDefault(), b.call(a(this), "show")
  };
  a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
  "use strict";

  function b(b) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.affix"),
        f = "object" == typeof b && b;
      e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
    })
  }
  var c = function(b, d) {
    this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
  };
  c.VERSION = "3.3.6", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
    offset: 0,
    target: window
  }, c.prototype.getState = function(a, b, c, d) {
    var e = this.$target.scrollTop(),
      f = this.$element.offset(),
      g = this.$target.height();
    if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
    if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
    var h = null == this.affixed,
      i = h ? e : f.top,
      j = h ? g : b;
    return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
  }, c.prototype.getPinnedOffset = function() {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(c.RESET).addClass("affix");
    var a = this.$target.scrollTop(),
      b = this.$element.offset();
    return this.pinnedOffset = b.top - a
  }, c.prototype.checkPositionWithEventLoop = function() {
    setTimeout(a.proxy(this.checkPosition, this), 1)
  }, c.prototype.checkPosition = function() {
    if (this.$element.is(":visible")) {
      var b = this.$element.height(),
        d = this.options.offset,
        e = d.top,
        f = d.bottom,
        g = Math.max(a(document).height(), a(document.body).height());
      "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
      var h = this.getState(g, b, e, f);
      if (this.affixed != h) {
        null != this.unpin && this.$element.css("top", "");
        var i = "affix" + (h ? "-" + h : ""),
          j = a.Event(i + ".bs.affix");
        if (this.$element.trigger(j), j.isDefaultPrevented()) return;
        this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
      }
      "bottom" == h && this.$element.offset({
        top: g - b - f
      })
    }
  };
  var d = a.fn.affix;
  a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
    return a.fn.affix = d, this
  }, a(window).on("load", function() {
    a('[data-spy="affix"]').each(function() {
      var c = a(this),
        d = c.data();
      d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
    })
  })
}(jQuery);
/****************************************************************
 * support for ES5 
/***************************************************************/

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    var O = Object(this);

    var len = O.length >>> 0;

    if ({}.toString.call(callback) != "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }

    if (thisArg) {
      T = thisArg;
    }

    k = 0;

    while (k < len) {

      var kValue;

      if (k in O) {

        kValue = O[k];

        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}

if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun /*, thisp */ ) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisp, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
}

if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    var O = Object(this);

    var len = O.length >>> 0;

    if ({}.toString.call(callback) != "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }

    if (thisArg) {
      T = thisArg;
    }

    A = new Array(len);

    k = 0;

    while (k < len) {

      var kValue, mappedValue;

      if (k in O) {

        kValue = O[k];

        mappedValue = callback.call(T, kValue, k, O);

        A[k] = mappedValue;
      }
      k++;
    }

    return A;
  };
}

if (!Array.prototype.some) {
  Array.prototype.some = function(fun /*, thisp */ ) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisp, t[i], i, t))
        return true;
    }

    return false;
  };
}

(function() {

  var TN = {};

  (function() {
    var NS = TN;
    var __host = function() {
      return this;
    }.call(null);
    var nameRoot = __host;
    var isCommonJS = typeof exports === 'object';
    var __toString = Object.prototype.toString;
    var __slice = Array.prototype.slice;

    __host.__tnns__ = '';
    NS.__tnns__ = '.TN';

    if (!nameRoot.console) {
      var _console = {};
      _console['log'] = _console['warn'] = _console['error'] = function() {};
      nameRoot.console = _console;
    }

    var log = function(msg) {
      nameRoot.console &&
        console.log &&
        console.log(msg);
    };

    var warn = function(msg) {
      nameRoot.console &&
        console.warn &&
        console.warn(msg);
    };

    var error = function(msg) {
      nameRoot.console &&
        console.error &&
        console.error(msg);
    };

    var extend = function() {
      var target = arguments[0];
      var src, name;
      for (var i = 1; i < arguments.length; i++) {
        src = arguments[i];
        for (name in src) {
          if (target === src[name]) continue;
          target[name] = src[name];
        }
      }
      return target;
    };

    var each = function(a, cb, obj) {
      if (__toString.call(a) === '[object Array]') {
        for (var i = 0, j = a.length; i < j; i++) {
          if (cb.call(obj || null, i, a[i]) === false)
            break;
        }
      } else {
        for (var k in a) {
          if (cb.call(obj || null, k, a[k]) === false)
            break;
        }
      }
    };

    var namespace = function(root, name) {
      var paths;

      if (typeof root === 'string') {
        name = root;
        paths = name.split('.');
        root = /^[A-Z]{2,}$/.test(paths[0]) ? nameRoot : NS;
      } else {
        paths = name.split('.');
      }

      if (typeof root.__tnns__ === 'undefined' || root.__tnns__ === null) {
        throw new Error('invalid ns root!');
      }

      var path = root.__tnns__;
      each(paths, function(i, pathName) {
        root[pathName] = root[pathName] || {};
        path += '.' + pathName;
        root[pathName].__tnns__ = path;
        root = root[pathName];
      });

      return root;
    };

    var _uniqId = 0;
    var getUniqId = function() {
      return _uniqId++;
    };

    NS.log = log;
    NS.warn = warn;
    NS.error = error;
    NS.extend = extend;
    NS.namespace = namespace;
    NS.each = each;
    NS.getUniqId = getUniqId;
    NS.__host = __host;
    NS.isCommonJS = isCommonJS;
  })();

  TN.__host['TN'] = TN;
  if (TN.isCommonJS) {
    exports.TN = TN;
  }

  (function() {

    var NS = TN.namespace('Class');
    var extend = TN.extend;
    var namespace = TN.namespace;
    var nameRoot = TN.__host;
    var getUniqId = TN.getUniqId;
    var getElementById = typeof jQuery !== 'undefined' ?
      function(id) {
        return jQuery('#' + id);
      } :
      function(id) {
        return document.getElementById(id);
      };

    var __slice = Array.prototype.slice;

    var wrap = function(obj, method, wrapper) {
      var orig = obj[method];
      if (typeof orig !== 'function')
        throw new Error('cant find method ' + method);
      obj[method] = wrapper(method, orig);
    }

    var wrapAll = function(obj, wrapper) {
      for (var n in obj) {
        if (typeof obj[n] === 'function') {
          wrap(obj, n, wrapper);
        }
      }
    }

    var createObject = function() {
      var obj = new this();
      obj.init.apply(obj, arguments);
      return obj;
    }

    var fromJSON = function() {
      var obj = new this();
      obj.fromJSON.apply(obj, arguments);
      return obj;
    }

    /**
     * ��������ֶ�
     */

    var checkParams = function() {
      var keys = __slice.call(arguments, 0);
      var dict = keys.shift(),
        key;
      for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        if (typeof dict[key] == 'undefined') {
          throw new Error(key + ' is required');
        }
      }
    };

    var impl = function() {
      var Class = this;
      __slice.call(arguments, 0).forEach(function(proto, i) {
        wrapAll(proto, function(name, func) {
          return function() {
            var superProto = Class.superClass.prototype;
            this.superProto = superProto;
            func.superMethod = superProto[name];
            this.superMethod = function() {
              return superProto[name].apply(this, arguments);
            };

            return func.apply(this, arguments);
          };
        });
        extend(Class.prototype, proto);
      });
    };

    var defineClass = function(name, superClass, prototype, staticMethods) {
      var className, classNamespace, tmp, host, classHost;

      var args = __slice.call(arguments, 0);
      if (typeof args[0] === 'object') {
        classHost = args.shift();
        name = args[0];
        superClass = args[1];
        prototype = args[2];
        staticMethods = args[3];
      }

      function Class() {};

      if (name) {
        tmp = name.split('.');

        if (tmp.length === 1) {
          className = name;
        } else {
          className = tmp.pop();
          classNamespace = tmp.join('.');
        }

        if (classNamespace) {
          if (classHost) {
            host = namespace(classHost, classNamespace);
          } else {
            host = namespace(classNamespace);
          }
        } else {
          if (classHost) {
            host = classHost;
          } else {
            host = nameRoot;
          }
        }

        host[className] = Class;
      }

      extend(Class, staticMethods);

      Class.prototype = new superClass();

      Class.create = createObject;
      Class.superClass = superClass;
      Class.fromJSON = fromJSON;

      Class.impl = impl;
      Class.impl(prototype);

      Class.wrap = function(methodName, wrapper) {
        wrap(Class.prototype, methodName, wrapper);
      };

      Class.wrapAll = function(wrapper) {
        wrapAll(Class.prototype, wrapper);
      };

      Class.prototype.constructor = Class;
      Class.prototype.__name__ = name || null;

      return Class;
    };

    //����
    defineClass(NS, 'TNObject', Object, {

      init: function() {
        this._propertys = {};
        this._eventListeners = {};
        this.uniqId = this.__name__ + '.' + getUniqId();
      },

      elementId: function(name) {
        return (this.uniqId + '_' + name).replace(/[\.\%]/g, '_');
      },

      getElement: function(name) {
        return getElementById(this.elementId(name));
      },

      ownHtml: function() {
        var T = this;
        var html;

        if (arguments.length > 1)
          html = __slice.call(arguments, 0).join('');
        else
          html = arguments[0];

        return html.replace(/(for|id)="([a-zA-Z0-9\-_]+)"/g, function() {
          return arguments[1] + '="' + T.elementId(arguments[2]) + '"';
        });
      },

      destroy: function() {},

      addListener: function(type, func) {
        var listeners = this._eventListeners;
        listeners[type] ? listeners[type].push(func) : listeners[type] = [func];
        return this;
      },

      on: function(type, func) {
        return this.addListener(type, func);
      },

      removeListener: function(type, func) {
        var listeners = this._eventListeners;
        if (!listeners[type]) return;
        listeners[type] = listeners[type].filter(function(value, index) {
          return func !== value;
        });
        return this;
      },

      removeAllListeners: function(type) {
        if (!type) {
          this._eventListeners = {};
          return this;
        }
        this._eventListeners[type] = {};
        return this;
      },

      emit: function(type) {
        var listeners = this._eventListeners;
        if (!listeners[type]) return;

        var args = [];
        for (var i = 1; i < arguments.length; i++) {
          args.push(arguments[i]);
        }

        //��ֹ�ص��е���removeListener
        var T = this;
        listeners[type].concat([]).forEach(function(func, index) {
          func.apply(T, args);
        })

        return this;
      },

      set: function(name, value, defalutValue) {
        var setMethod = 'set' + name.charAt(0).toUpperCase() + name.substr(1, name.length);

        this.emit('propertyWillChange', name, this.get(name), value);

        this._propertys[name] = (typeof value == 'undefined' ? defalutValue : value);

        if (this[setMethod]) {
          this[setMethod](value, defalutValue);
        }

        this.emit('propertyDidChange', name, this.get(name));

        return this;
      },

      get: function(name) {
        var getMethod = 'get' + name.charAt(0).toUpperCase() + name.substr(1, name.length);

        if (this[getMethod]) {
          return this[getMethod]();
        } else {
          return this._propertys[name];
        }
      },

      getCfg: function() {
        var args = __slice.call(arguments, 0);
        var name = args.shift();
        TN.log(name);
        var rt = this.get(name);
        if (typeof rt === 'function') {
          return rt.apply(this, args || []);
        }
        return rt;
      },

      isKindOf: function(Class) {
        return (this instanceof Class);
      },

      toJSON: function() {
        var json = {};
        json['_propertys'] = this._propertys;
        return json;
      },

      fromJSON: function(json) {
        this._propertys = json['_propertys'] || {};
      }
    });

    NS.wrap = wrap
    NS.wrapAll = wrapAll;
    NS.def = defineClass;
    NS.checkParams = checkParams;
    NS.EventCenter = NS.TNObject.create();
  })();

})();

(function() {

  //MVC的模型定义
  TN.Class.def('TN.Mvc.Model', TN.Class.TNObject, {
    init: function(params) {
      this.superMethod(params);
      //所有字段
      this.fields = {};

      //请求的action定义
      this.actions = {
        'query': '',
        'create': '',
        'update': '',
        'delete': ''
      };

      //创建该模型时需要传的字段
      this.createFields = null;
      //更新模型时需要传的字段
      this.updateFields = null;
      //该模型的英文命名,将会用于一些逻辑处理
      this.set('name', 'TN.Mvc.Model');
      //该模型的中文命名，将会用于ui的显示
      this.set('desc', 'TN.Mvc.Model');
    },
    query: function(data) {
      return TN.ModelRequest({
        url: this.actions.query,
        data: data
      });
    },
    add: function(data) {
      return TN.ModelRequest({
        url: this.actions.create,
        data: data
      });
    },
    update: function(data) {
      return TN.ModelRequest({
        url: this.actions.update,
        data: data
      });
    },
    del: function(data) {
      return TN.ModelRequest({
        url: this.actions['delete'],
        data: data
      });
    },
    //根据接口定义名称获取对应的字段
    getFieldByRawName: function(rawName) {

      if (!this._rawMap) {
        var map = this._rawMap = {};
        jQuery.each(this.fields, function(k, field) {
          map[field.get('name')] = field;
        });
      }

      return this._rawMap[rawName];
    },

    /**
     * 该方法用户格式化接口返回的数据，用于ui的显示,
     * 比如对于日期时间字段会做一下格式转化
     */

    formatDataForDisplay: function(data) {
      var self = this;
      var rt = {};
      jQuery.each(data, function(k, v) {
        var field = self.getFieldByRawName(k);
        var data = {};
        data.data = field ? field.formatDisplay(v) : v;
        self.emit('formatDataForDisplay', data, k, v, field);
        rt[k] = data.data;
      });
      return rt;
    },

    /**
     * 获取所有字段的js定义名称
     */

    fieldNames: function() {
      var rt = [];
      jQuery.each(this.fields, function(k, v) {
        rt.push(k);
      });
      return rt;
    },

    /**
     * 获取唯一主键
     */

    primaryKey: function() {
      var rt = null;
      jQuery.each(this.fields, function(key, field) {
        if (field.get('pk') === true) {
          rt = field;
          return false;
        }
      });

      if (rt === null) {
        throw new Error('cant find primary key of model');
      }

      return rt;
    },

    /**
     * 获取所有需要添加搜索功能的字段
     */

    getSearchAbleFields: function() {
      var rt = [];
      jQuery.each(this.fields, function(k, field) {
        if (field.get('searchable'))
          rt.push(field);
      });
      return rt;
    },

    /**
     * 获取第一个需要排序的字段
     */

    findFirstSortableField: function() {
      var rt = null;
      jQuery.each(this.fields, function(k, field) {
        if (field.get('sortable')) {
          rt = field;
          return false;
        }
      });
      return rt;
    }
  });

  TN.Class.def('TN.Mvc.Model.Field', TN.Class.TNObject, {
    init: function(params) {
      this.superMethod(params);

      TN.Class.checkParams(params, 'name', 'desc');

      //字段名
      this.set('name', params['name']);
      //字段描述
      this.set('desc', params['desc']);
      //单位
      this.set('unit', params['unit'], null);
      this.set('renderWidth', params['renderWidth'], 100);
    }
  });

  TN.Class.def('TN.Mvc.Controller', TN.Class.TNObject, {});

  TN.Mvc.Model.Field.wrap('init', function(methodName, method) {
    return function(params) {
      var self = this;

      method.apply(this, arguments);

      /* 表单验证配置 */

      //是否为必须字段
      this.set('required', params['required'], false);
      this.set('hidden', params['hidden'], false);
      this.set('pk', params['pk'], false);
      //为空时的提示
      this.set('emptyError', params['emptyError'], null);
      //默认值
      this.set('default', params['default'], '');
      //是否只读
      this.set('readonly', params['readonly'], false);
      //自定义验证
      this.set('customValidator', params['customValidator'], null);
      this.set('rowClass', params['rowClass'], null);
      this.set('cellClass', params['cellClass'], null);
    };
  });

  //文本类型
  TN.Class.def('TN.Mvc.Model.TextField', TN.Mvc.Model.Field, {
    init: function(params) {
      var self = this;
      this.superMethod(params);
      this.set('maxLength', params['maxLength'], null);
      this.set('minLength', params['minLength'], null);

    },
    formatDisplay: function(v) {
      if (v === null) return '&nbsp;';
      if (v === undefined) return '&nbsp;';
      if (typeof v != 'string') return v;
      return v;
    },
    validate: function(v) {
      var superRt = this.superMethod(v);
      if (!this.get('required') && jQuery.trim(v) === '')
        return superRt;

      var T = this;
      var defer = jQuery.Deferred();

      superRt.done(function() {
        var max = T.get('maxLength');
        var min = T.get('minLength');

        if (max !== null && v.length > max) {
          T._errors.push(T.get('desc') + '不能多于' + max + '个字符');
          return defer.reject(T._errors);
        }

        if (min !== null && v.length < min) {
          T._errors.push(T.get('desc') + '不能少于' + min + '个字符');
          return defer.reject(T._errors);
        }

        return defer.resolve();

      }).fail(function() {
        defer.reject(T._errors);
      });

      return defer.promise();
    },
    buildFormElement: function() {
      var T = this;
      return jQuery('<input type="text" id="' + this.elementId('input') + '" name="' + this.get('name') + '" />')
        .blur(function() {
          T.validateFormElement();
        }).focus(function() {
          T.validateFormElement();
        });
    },
    buildSearchElement: function() {
      return jQuery('<input id="' + this.elementId('search-input') + '" name="' + this.get('name') + '" />');
    }
  });

  //枚举类型
  TN.Class.def('TN.Mvc.Model.EnumField', TN.Mvc.Model.Field, {
    init: function(params) {
      this.superMethod(params);
      TN.Class.checkParams(params, 'validValues');
      this.set('validValues', params['validValues']);
      this.set('selectTip', params['selectTip'], null);
      this.set('emptyTip', params['emptyTip'], null);
    },
    loadValuesFromUrl: function(url) {
      var T = this;
      return TN.ModelRequest({
        url: url
      }).done(function(data) {
        T.set('validValues', data);
        T.emit('loadValuesFromUrlSuccess');
      });
    },
    autosaveRestore: function(v) {
      this.superMethod(v);
      this.emit('change');
    },
    getFormElement: function() {
      return this.getElement('con');
    },
    setFormValue: function(v) {
      this.superMethod(v);
      this._formValue = v;
    },
    setValidValues: function(v) {
      this._propertys['validValues'] = v;
      this._refreshData();
      return this;
    },
    _refreshData: function() {
      if (!this.getElement('input') && !this.getElement('search-input')) return;
      var html = [];

      var selectTipIndex = null;
      if (this.get('selectTip')) {
        selectTipIndex = html.length;
        html.push('<option value="">' + this.get('selectTip') + '</option>');
      }

      var validValues = this.get('validValues');

      var count = 0;
      jQuery.each(validValues, function(key, value) {
        count++;
        html.push('<option value="' + key + '">' + SafeHtml(value) + '</option>');
      });

      if (count === 0 && this.get('emptyTip')) {
        if (selectTipIndex !== null) {
          html[selectTipIndex] = '';
        }
        html.push('<option value="">' + this.get('emptyTip') + '</option>');
      }
      if (this.getElement('input')) {
        this.getElement('input').html(html.join(''));
        this.getElement('input').val(this._formValue);
      }

      if (this.getElement('search-input')) {
        this.getElement('search-input').html(html.join(''));
      }
    },
    buildFormElement: function() {
      var T = this;
      var html = ['<span id="' + this.elementId('con') + '" class="select"><select id="' + this.elementId('input') + '" name="' + this.get('name') + '" >'];

      var selectTipIndex = null;
      if (this.get('selectTip')) {
        selectTipIndex = html.length;
        html.push('<option value="">' + this.get('selectTip') + '</option>');
      }

      var validValues = this.get('validValues');

      var count = 0;
      jQuery.each(validValues, function(key, value) {
        count++;
        html.push('<option value="' + key + '">' + SafeHtml(value) + '</option>');
      });

      if (count === 0 && this.get('emptyTip')) {
        if (selectTipIndex !== null) {
          html[selectTipIndex] = '';
        }
        html.push('<option value="">' + this.get('emptyTip') + '</option>');
      }

      html.push('</select></span>');
      var el = jQuery(html.join(''));
      el.find('select').blur(function() {
        T.validateFormElement();
      }).focus(function() {
        T.validateFormElement();
      }).change(function() {
        T.emit('change');
      });
      return el;
    },
    formatDisplay: function(inputValue) {
      var validValues = this.get('validValues');
      var v = validValues[inputValue];
      if (typeof v === 'undefined') {
        return '&nbsp;';
      } else {
        return v;
      }
    },
    buildSearchElement: function() {
      var T = this;
      var html = ['<span class="select"><select id="' + this.elementId('search-input') + '" name="' + this.get('name') + '" >'];

      if (this.get('selectTip')) {
        html.push('<option value="">' + this.get('selectTip') + '</option>');
      }

      var validValues = this.get('validValues');

      if (jQuery.type(validValues) == 'array') {
        jQuery.each(validValues, function(i, v) {
          html.push('<option value="' + v + '">' + SafeHtml(v) + '</option>');
        });
      } else {
        jQuery.each(validValues, function(key, value) {
          html.push('<option value="' + key + '">' + SafeHtml(value) + '</option>');
        });
      }

      html.push('</select></span>');
      return jQuery(html.join(''));
    },
    buildSearchConfig: function() {
      var T = this;
      var rt = {};
      var validValues = this.get('validValues');

      if (jQuery.type(validValues) == 'array') {
        jQuery.each(validValues, function(i, v) {
          rt[v] = function() {
            var p = {};
            p[T.get('name')] = v;
            return p;
          }
        });
      } else {
        jQuery.each(validValues, function(k, v) {
          rt[v] = function() {
            var p = {};
            p[T.get('name')] = k;
            return p;
          }
        });
      }

      rt['所有'] = function() {
        return {}
      };
      return rt;
    }
  });

  TN.Class.def('TN.Table', TN.Class.TNObject, {
    init: function(params) {
      var self = this;
      this.superMethod(params);
      this.config = params || {};
      self.set('requestData', {});
      this.reset();
    },
    reset: function() {
      var self = this;
      self._propertys['currentPage'] = 1;
    },
    primaryKey: function() {
      var self = this;
      var rt = null;
      $.each(self.get('model').fields, function(_, field) {
        if (field.get('pk')) {
          rt = field;
          return false;
        }
      });
      return rt;
    },
    selectedPrimayKeys: function() {
      var self = this;
      var pk = self.primaryKey();
      var pkName = pk.get('name');

      var rt = [];
      var els = self.getElement('form').find('input[name=' + self.selectCheckboxName + ']');
      els.each(function() {
        if (this.checked) {
          var i = this.value;
          rt.push(self.dataPool[i][pkName]);
        }
      });

      return rt;
    },
    load: function() {
      var self = this;
      var model = self.get('model');
      var data = {};

      data['rows'] = self.get('rows') || 20;
      data['page'] = self.get('currentPage') || 1;
      jQuery.extend(data, self.get('requestData'));

      self.emit('beforeRequest', data);

      var loading = self.getElement('loading');
      loading.show().css({
        'left': (self.container.width() - loading.width()) / 2 + 'px',
        'top': Math.max(50, (self.container.height() - loading.height()) / 2 - 20) + 'px'
      });

      //LoadingStart('加载中...');

      TN.ModelRequest({
        url: model.actions.query,
        data: data
      }).done(function(rt) {
        self.emit('dataLoaded', rt);
        self.dataCount = rt.total_records;
        self.pageCount = rt.total_pages;
        self.dataPool = rt.rows;
        loading.hide();
        //LoadingStop();
        self.updateTable();
        self.updatePager();
        self.emit('loaded');
      }).fail(function(code, rt) {
        loading.hide();
        //LoadingStop();
        alert(rt);
      }).always(function() {});
    },
    updateTable: function() {
      var self = this;
      var model = self.get('model');
      self.getElement('table').find('tr:gt(0)').remove();

      if (!self.dataPool || !self.dataPool.length) {
        self.getElement('table').append(self.get('emtpyInfo') || '');
        return;
      }

      var html = '';

      self.selectCheckboxName = 'select' + self.uniqId.replace(/\./g, '_').toLowerCase();
      TN.log(self.selectCheckboxName);

      var pk = self.primaryKey();

      jQuery.each(self.dataPool, function(i, d) {
        var className = {
          className: ''
        };
        self.emit('customTrClassName', className, d);
        html += '<tr class="' + className.className + '">';

        if (self.get('showCheckbox')) {
          html += '<td>';
          html += '<input type="checkbox" value="' + i + '" name="' + self.selectCheckboxName + '" />';
          html += '</td>';
        }

        jQuery.each(model.fields, function(_, field) {
          if (field.get('hidden')) return;
          var key = field.get('name');
          if (typeof d[key] === 'undefined') return;
          if (field.get('cellClass')) {
            html += '<td class="' + field.get('cellClass') + '">';
          } else {
            html += '<td>';
          }
          var v = field.formatDisplay(d[key], d);
          html += v;
          html += '</td>';
        });

        if (self.get('actions') && pk) {
          html += '<td class="tn-tb-ac">';
          var dataIndex = d[pk.get('name')];
          $.each(self.getCfg('actions', d), function(name, ac) {
            html += '<a href="#nogo" data-index="' + dataIndex + '" data-ac="' + encodeURIComponent(name) + '">' + SafeHtml(name) + '</a>';
            html += '&nbsp;&nbsp;&nbsp;&nbsp;';
          });
          html += '</td>';
        }

        html += '</tr>';

        if (self.get('extraInfoFormater')) {
          var colSpan = self.fieldsCount;
          if (self.get('showCheckbox')) colSpan--;
          if (self.get('actions')) colSpan--;
          var extraHtml = self.get('extraInfoFormater')(d);
          if (extraHtml) {
            html += '<tr>';
            if (self.get('showCheckbox')) {
              html += '<td></td>';
            }
            html += '<td colspan="' + colSpan + '">';
            html += extraHtml;
            html += '</td>';
            if (self.get('actions')) {
              html += '<td></td>';
            }
            html += '</tr>';
          }
        }
      });
      self.getElement('table').append(html);
    },
    render: function(container) {
      var self = this;
      self.container = jQuery(container);
      self.container.css('position', 'relative');
      self.container.css('min-height', '100px');

      var model = this.get('model');

      var html = '';

      html += '<form id="form">';
      html += '<table id="table" class="' + (self.get('tableClass') || '') + '">';
      html += '<tr>';

      var totalWidth = 0;
      self.fieldsCount = 0;

      jQuery.each(model.fields, function(i, field) {
        if (field.get('hidden')) return;
        totalWidth += field.get('renderWidth') || 100;
        self.fieldsCount += 1;
      });

      if (self.get('actions')) {
        self.fieldsCount += 1;
        totalWidth += self.get('actionRenderWidth') || 100;
      }

      if (self.get('showCheckbox')) {
        self.fieldsCount += 1;
        totalWidth += 30;
        html += '<th width="' + 30 / totalWidth * 100 + '%">';
        html += '<input type="checkbox" value="1" id="check-all" />';
        html += '</th>';
      }

      jQuery.each(model.fields, function(i, field) {
        if (field.get('hidden')) return;
        var width = (field.get('renderWidth') || 100) / totalWidth * 100 + '%';
        html += '<th width="' + width + '" >' + field.get('desc') + '</th>';
      });

      if (self.get('actions')) {
        var width = (self.get('actionRenderWidth') || 100) / totalWidth * 100 + '%';
        html += '<th width="' + width + '" style="text-align:center;">操作</th>';
      }

      html += '</tr>';
      html += '</table>';
      html += '</form>';
      html += '<div id="pager"></div>';
      html += '<span id="loading" class="label label-primary table-loading" style="display:none;position:absolute;font-size:18px;line-height:28px;">加载中...</span>';

      html = self.ownHtml(html);
      self.container.html(html);

      self.getElement('pager').delegate('a', 'click', function(e) {
        self._parsePageEvent(e);
      });

      self.getElement('check-all').click(function() {
        var checkAll = this;
        setTimeout(function() {
          var els = self.getElement('form').find('input[name=' + self.selectCheckboxName + ']');
          els.each(function() {
            this.checked = checkAll.checked;
          });
        }, 0);
      });

      self.container.delegate('a[data-ac]', 'click', function(e) {
        e.preventDefault();
        var index = this.getAttribute('data-index');
        var ac = this.getAttribute('data-ac');
        ac = decodeURIComponent(ac);

        var pk = self.primaryKey();
        if (!pk) return;
        var pkName = pk.get('name');

        var data = null;
        $.each(self.dataPool, function(i, d) {
          if (d[pkName] == index) {
            data = d;
            return false;
          }
        });
        if (!data) return;

        var fuc = self.getCfg('actions', data)[ac];
        if (!fuc) return;

        if (data) {
          fuc(data);
        }
      });
    },

    _parsePageEvent: function(e) {
      var el = jQuery(e.target);
      var ac;

      TN.log(el);
      e.stopPropagation();
      e.preventDefault();

      if (el.attr('data-page')) {
        this.set('currentPage', parseInt(el.attr('data-page'), 10));
      } else if (ac = el.attr('data-action')) {
        if (this[ac + 'Page']) this[ac + 'Page']();
      }
    },

    setCurrentPage: function(num) {
      this.updatePager();
      this.load();
    },

    updatePager: function() {
      var self = this;
      //if ( this.pageCount < 2 ) {
      //    self.getElement('pager').html('');
      //    return;
      //}

      var currentPage = self.get('currentPage') || 1;
      var className = this.get('classOfCurrentPage') || 'active';
      var html = ['<ul class="pagination">'];

      html.push('<li><span class="data-count">共<b>' + self.dataCount + '</b>条</span></li>');

      if (currentPage != 1) {
        html.push('<li><a data-action="first" href="javascript:void(0);" >首页</a></li>');
        html.push('<li><a data-action="previous" href="javascript:void(0);">上一页</a></li>');
      }

      var i, j;

      var showPageCount = self.get('showPageCount') || 5;

      if (showPageCount) {
        var step = Math.floor(showPageCount / 2);
        i = Math.max(currentPage - step, 1);
        j = Math.min(self.pageCount, i + showPageCount - 1);
      } else {
        i = 1;
        j = self.pageCount;
      }

      if (!(i == 1 && j == 1)) {
        while (i <= j) {
          html.push('<li ');
          if (i == currentPage)
            html.push(' class="' + className + '" ');
          html.push(' ><a data-page="' + i + '" href="javascript:void(0);"');
          html.push('>' + i + '</a></li>');
          i++;
        }
      }

      if (currentPage != self.pageCount && self.pageCount) {
        html.push('<li><a data-action="next" href="javascript:void(0);">下一页</a></li>');
        html.push('<li><a data-action="last" href="javascript:void(0);">尾页</a></li>');
      }

      html.push('</ul>');

      self.getElement('pager').html(html.join(''));
    },

    firstPage: function() {
      if (this.pageCount < 1) return this;
      this.set('currentPage', 1);
      return this;
    },

    lastPage: function() {
      if (this.pageCount < 1) return this;
      this.set('currentPage', this.pageCount);
      return this;
    },

    nextPage: function() {
      var to = (this.get('currentPage') || 1) + 1;
      if (to > this.pageCount) return this;
      this.set('currentPage', to);
      return this;
    },

    previousPage: function() {
      var to = (this.get('currentPage') || 1) - 1;
      if (to < 1) return this;
      this.set('currentPage', to);
      return this;
    }

  });
})();

TN.Class.def('TN.Mvc.ModelCreater', TN.Class.TNObject, {
  init: function(model) {
    var self = this;
    self.superMethod();
    self.model = model;
  },
  render: function() {
    var self = this;
    var model = self.model;
    var html = '<div id="dialog" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
    html += '<div class="modal-header">';
    html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
    html += '<h3 id="myModalLabel">增加' + self.model.get('desc') + '</h3>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += '<form class="form-horizontal">';

    $.each(self.model.createFields, function(_, name) {
      var field = self.model.fields[name];
      html += '<div class="form-group" style="margin-top:10px;">';
      html += '<label class="control-label">' + field.get('desc') + '</label>';
      html += '<div class="controls">';
      html += '{' + name + '.element}';
      html += '</div>';
      html += '</div>';
    });

    html += '</form>';
    html += '<div class="alert alert-error" id="domain-error" style="display:none;"></div>';
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>';
    html += '<button id="ok" class="btn btn-primary">新增</button>';
    html += '</div>';
    html += '</div>';
    self.dialog = $(self.ownHtml(html));
    self.formController = TN.Mvc.TemplateFormController.create({
      model: self.model
    });
    self.formController.render(self.dialog);
    self.dialog.modal('show');
    self.dialog.on('shown', function() {
      self.getElement('ok').click(function() {
        self.formController.validateForm().done(function() {
          var data = self.formController.serializeForm();
          TN.log(data);
          LoadingStart();
          TN.ModelRequest({
            url: self.model.actions.create,
            data: data
          }).always(function() {
            LoadingStop();
          }).done(function() {
            self.emit('done');
            self.dialog.modal('hide');
          }).fail(function(code, err) {
            alert(err);
          });
        }).fail(function(errors) {
          alert(errors[0]);
        });
      });
    });
    self.dialog.on('hidden', function() {
      self.dialog.remove();
    });

  }
});

TN.Class.def('TN.Mvc.ModelUpdater', TN.Class.TNObject, {
  init: function(model) {
    var self = this;
    self.superMethod();
    self.model = model;
  },
  render: function(rawData) {
    var self = this;
    var model = self.model;
    var html = '<div id="dialog" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
    html += '<div class="modal-header">';
    html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
    html += '<h3 id="myModalLabel">更新' + self.model.get('desc') + '</h3>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += '<form class="form-horizontal">';

    $.each(self.model.updateFields, function(_, name) {
      var field = self.model.fields[name];
      html += '<div class="form-group" style="margin-top:10px;">';
      html += '<label class="control-label">' + field.get('desc') + '</label>';
      html += '<div class="controls">';
      html += '{' + name + '.element}';
      html += '</div>';
      html += '</div>';
    });

    html += '</form>';
    html += '<div class="alert alert-error" id="domain-error" style="display:none;"></div>';
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>';
    html += '<button id="ok" class="btn btn-primary">更新</button>';
    html += '</div>';
    html += '</div>';
    self.dialog = $(self.ownHtml(html));
    self.formController = TN.Mvc.TemplateFormController.create({
      model: self.model
    });
    self.dialog.modal('show');
    self.dialog.on('shown', function() {
      self.formController.render(self.dialog, rawData);
      self.getElement('ok').click(function() {
        self.formController.validateForm().done(function() {
          var pk = self.model.primaryKey().get('name');
          var data = self.formController.serializeForm();
          data[pk] = rawData[pk];
          TN.log(data);
          LoadingStart();
          TN.ModelRequest({
            url: self.model.actions.update,
            data: data
          }).always(function() {
            LoadingStop();
          }).done(function() {
            self.emit('done');
            self.dialog.modal('hide');
          }).fail(function(code, err) {
            alert(err);
          });
        }).fail(function(errors) {
          alert(errors[0]);
        });
      });
    });
    self.dialog.on('hidden', function() {
      self.dialog.remove();
    });
  }
});

ERROR_CODE_REQUIRE_LOGIN = 5;

TN.ModelRequestConfig = {
  //用于请求url的前缀
  Prefix: '',
  //用户判断请求是否成功的字段
  CodeField: 'code',
  //CodeField的成功赋值
  SuccessCode: 0,
  //返回数据的字段
  DataField: 'data',
  //返回错误信息的字段
  ErrorField: 'data'
};

TN.ModelRequest = function(params) {

  var defaultConfig = {
    'type': 'POST',
    dataType: 'text'
  };

  params = jQuery.extend(defaultConfig, params);

  params['url'] = TN.ModelRequestConfig.Prefix + params['url'];

  var defer = jQuery.Deferred();

  var cacheKey = params['url'];

  /*if (params['data']) {
      cacheKey += jQuery.toJSON(params['data']);
  }*/

  params['data'] = params['data'] || {};
  if (window.CSRF_TOKEN) {
    if (typeof params['data'] == 'string') {
      params['data'] += '&_csrf=' + CSRF_TOKEN;
    } else {
      params['data']['_csrf'] = CSRF_TOKEN;
    }
  }
  console.log('ajax data', params['data']);

  var cachePool = arguments.callee.Cache;

  if (params['useCache'] && cachePool[cacheKey]) {
    setTimeout(function() {
      defer.resolveWith(null, [cachePool[cacheKey]]);
    }, 10);
  } else {
    var ajax = jQuery.ajax(params).done(function(json) {
      try {
        json = jQuery.parseJSON(json);
      } catch (e) {
        defer.rejectWith(ajax, [1, '异常数据']);
      }
      var code = json[TN.ModelRequestConfig.CodeField];
      if (code === TN.ModelRequestConfig.SuccessCode) {
        defer.resolveWith(ajax, [json[TN.ModelRequestConfig.DataField]]);

        if (params['useCache']) {
          cachePool[cacheKey] = json[TN.ModelRequestConfig.DataField];
        }

      } else {
        if (code == ERROR_CODE_REQUIRE_LOGIN) {
          window.location.href = '/signin';
        } else {
          defer.rejectWith(ajax, [json[TN.ModelRequestConfig.CodeField], json[TN.ModelRequestConfig.ErrorField]]);
        }
      }
    }).fail(function(xhr, textStatus) {
      //if (textStatus !== 'abort') {
      //    defer.rejectWith(ajax, [xhr.status, xhr.statusText]);
      //}
    });
  }

  var rt = defer.promise();
  rt.ajax = ajax;
  return rt;
};

TN.ModelRequest.Cache = {};

function ShowFormError(el, msg) {
  var group = el,
    controls = el;
  while (group.length && !group.hasClass('control-group')) group = group.parent();
  while (controls.length && !controls.hasClass('controls')) controls = controls.parent();
  group.removeClass('has-success').addClass('has-error');
  controls.find('.help-inline').remove();
  controls.append('<span class="help-inline">' + msg + '</span>');
}

function ShowFormOK(el) {
  var group = el,
    controls = el;
  while (group.length && !group.hasClass('control-group')) group = group.parent();
  while (controls.length && !controls.hasClass('controls')) controls = controls.parent();
  group.addClass('has-success').removeClass('has-error');
  controls.find('.help-inline').remove();
}

function ErrorAlert(msg) {
  alert(msg);
}

function SafeHtml(s) {
  return s.replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;');
}

function PacificOceanDialog(options) {
  var self = this;
  self.options = options;
}

PacificOceanDialog.prototype.destroy = function() {
  var self = this;
  if (!self._dialog) return;
  self._dialog.bind('hidden.bs.modal', function() {
    self._dialog.remove();
    self._dialog = null;
  });
  self._dialog.modal('hide');
}

PacificOceanDialog.prototype.hide = function() {
  var self = this;
  self.dialog().modal('hide');
};

PacificOceanDialog.prototype.show = function() {
  var self = this;
  self.dialog().modal('show');
};

PacificOceanDialog.prototype.showError = function(msg) {
  var self = this;
  self.hideError();
  self.dialog()
    .find('.modal-body')
    .prepend('<div class="po-dialog-error alert alert-danger">' + msg + '</div>');
};

PacificOceanDialog.prototype.hideError = function() {
  var self = this;
  self.dialog()
    .find('.po-dialog-error').remove();
};

PacificOceanDialog.prototype.startLoading = function(msg) {
  var self = this;
  self.stopLoading();
  self.dialog()
    .find('.modal-body')
    .prepend('<div class="po-dialog-loading alert alert-info">' + msg + '</div>');
  self.dialog()
    .find('.modal-footer')
    .find('button')
    .attr('disabled', 'disabled');
};

PacificOceanDialog.prototype.stopLoading = function() {
  var self = this;
  self.dialog()
    .find('.po-dialog-loading').remove();
  self.dialog()
    .find('.modal-footer')
    .find('button')
    .removeAttr('disabled');
};

PacificOceanDialog.prototype.setButtons = function(buttons) {
  var self = this;
  var buttonContainer = self.dialog().find('.modal-footer');
  jQuery.each(buttons, function(i, button) {
    jQuery('<button type="button" class="btn btn-' +
        (button.className || 'default') + '">' + button.name + '</button>')
      .click(function() {
        button.click.call(self);
      }).appendTo(buttonContainer);
  });
};

PacificOceanDialog.prototype.body = function() {
  var self = this;
  return self.dialog().find('.modal-body');
};

PacificOceanDialog.prototype.dialog = function() {
  var self = this;
  if (!self._dialog) {
    jQuery.each(['title', 'content', 'buttons'], function(i, v) {
      if (typeof self.options[v] === 'undefined') throw new Error('require ' + v);
    });

    var html = '';
    html += '<div class="modal fade" role="dialog">';
    html += '<div class="modal-dialog ';
    if (self.options.size) {
      html += 'modal-' + self.options.size;
    }
    html += '">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<button type="button" class="close" aria-hidden="true">&times;</button>';
    html += '<h4 class="modal-title">' + self.options.title + '</h4>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += self.options.content;
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    self._dialog = jQuery(html);
    self._dialog.appendTo(document.body);
    self._dialog.find('button.close').click(function() {
      self._dialog.trigger('dialog.cancel');
    });
    self.setButtons(self.options.buttons);
    var keyboard = typeof self.options.keyboard === 'undefined' ? true : self.options.keyboard;
    self._dialog.modal({
      backdrop: 'static',
      keyboard: keyboard
    });
  }
  return self._dialog;
}

function po_alert(options) {
  options = options || {};
  var dialog;

  options.title = options.title || '确认';

  options.buttons = [];
  options.buttons.push({
    name: options.yes || '是',
    className: 'primary',
    click: function() {
      options.callback && options.callback(dialog, true);
    }
  });

  dialog = new PacificOceanDialog(options);

  dialog.dialog().bind('dialog.cancel', function() {
    options.callback && options.callback(dialog, false);
  });

  dialog.show();

  return dialog;
}

function po_confirm(options) {
  options = options || {};
  var dialog;

  options.title = options.title || '确认';

  options.buttons = [];
  options.buttons.push({
    name: options.no || '否',
    click: function() {
      options.callback && options.callback(dialog, false);
    }
  });

  options.buttons.push({
    name: options.yes || '是',
    className: 'primary',
    click: function() {
      options.callback && options.callback(dialog, true);
    }
  });

  dialog = new PacificOceanDialog(options);

  dialog.dialog().bind('dialog.cancel', function() {
    options.callback && options.callback(dialog, false);
  });

  dialog.show();

  return dialog;
}
