import { ref } from 'vue';
import { v as klona, x as parse, y as getRequestHeader, z as destr, A as isEqual, B as setCookie, C as getCookie, D as deleteCookie } from '../runtime.mjs';
import { e as useNuxtApp } from './server.mjs';
import crypto from 'node:crypto';

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  //
  // Note to future-self: No, you can't remove the `toLowerCase()` call.
  // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

const native = {
  randomUUID: crypto.randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;
  return unsafeStringify(rnds);
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a2;
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : (_a2 = cookies[name]) != null ? _a2 : (_a = opts.default) == null ? void 0 : _a.call(opts));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
ref(false);
const isOpenCart = ref(false);
class AbstractCardStorage {
  constructor() {
    __publicField(this, "goods", ref([]));
    __publicField(this, "uuid", ref(""));
    __publicField(this, "isActive", ref(false));
    __publicField(this, "storage", useCookie("card"));
    const id = v4();
    this.uuid.value = id;
    if (this.storage.value != null) {
      const card = this.storage.value;
      this.goods.value = card.goods;
      this.uuid.value = card.uuid;
    }
  }
}
class LocalCardStorage extends AbstractCardStorage {
  constructor() {
    super();
  }
  get totalCost() {
    let total = 0;
    this.goods.value.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
  checkInGoods(id) {
    return this.goods.value.filter((item) => item.id == id).length > 0;
  }
  addGood(good) {
    const exists = this.goods.value.filter((item) => item.id == good.id);
    if (exists.length == 0) {
      this.goods.value.push(good);
    } else {
      exists[0].quantity += 1;
    }
    this.save();
  }
  increaseGood(id) {
    const exists = this.goods.value.filter((item) => item.id == id);
    if (exists.length) {
      exists[0].quantity += 1;
      this.save();
    }
  }
  resetCard() {
    const id = v4();
    this.uuid.value = id;
    this.goods.value = [];
    this.save();
  }
  decreaseGood(id) {
    const exists = this.goods.value.filter((item) => item.id == id);
    if (exists.length) {
      if (exists[0].quantity <= 1) {
        this.removeGood(id);
        return;
      }
      exists[0].quantity -= 1;
      this.save();
      return;
    }
  }
  removeGood(id) {
    const exists = this.goods.value.findIndex((item) => item.id == id);
    if (exists != -1) {
      this.goods.value.splice(exists, 1);
      this.save();
    }
  }
  save() {
    this.storage.value = JSON.stringify({
      uuid: this.uuid.value,
      goods: this.goods.value
    });
  }
}
const CardStorage = /* @__PURE__ */ function() {
  let instance;
  function createInstance() {
    return new LocalCardStorage();
  }
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
}();

export { CardStorage as C, isOpenCart as i };
//# sourceMappingURL=storage-DSfldfNp.mjs.map
