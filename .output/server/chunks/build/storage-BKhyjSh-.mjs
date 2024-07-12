import { ref } from 'vue';
import { v as klona, x as parse, y as getRequestHeader, z as destr, A as isEqual, B as setCookie, C as getCookie, D as deleteCookie } from '../runtime.mjs';
import { u as useNuxtApp } from './server.mjs';
import axios from 'axios';
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
const axiosInstance = axios.create({
  baseURL: "http://94.198.219.2:8000",
  timeout: 1e4
});
function customFetch(url, options = {}) {
  const baseURL = "http://94.198.219.2:8000";
  return $fetch(baseURL + url, {
    headers: {},
    ...options
  });
}
const axiosInstance$1 = axiosInstance;
function generateQuery(queries) {
  let query = "?";
  Object.keys(queries).forEach(function(key, _) {
    const ne = queries[key];
    query += `${key}=${ne}&`;
  });
  return query;
}
async function getProducts(options = {}) {
  const query = generateQuery(options);
  return await customFetch(`/api/product/${query}`);
}
const isOpenSidebar = ref(false);
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
class NetworkCatalogStorage {
  constructor() {
    __publicField(this, "categories", ref([
      { id: 1, name: "\u0410\u0432\u0442\u043E\u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438" },
      { id: 2, name: "\u0417\u0430\u043F\u0447\u0430\u0441\u0442\u0438 \u043D\u0430 \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0435" },
      { id: 3, name: "\u041C\u043E\u0442\u043E\u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438" },
      { id: 4, name: "\u0428\u0438\u043D\u044B" },
      { id: 5, name: "\u0414\u0438\u0441\u043A\u0438" },
      { id: 6, name: "\u0410\u043A\u0441\u0435\u0441\u0441\u0443\u0430\u0440\u044B \u0438 \u043C\u0443\u043B\u044C\u0442\u0438\u043C\u0435\u0434\u0438\u0430" },
      { id: 7, name: "\u041C\u0430\u0441\u043B\u0430 \u0438 \u0430\u0432\u0442\u043E\u0445\u0438\u043C\u0438\u044F" },
      { id: 8, name: "\u0410\u0432\u0442\u043E \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0440" },
      { id: 9, name: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B \u0448\u0438\u043D \u0438 \u0434\u0438\u0441\u043A\u043E\u0432" },
      { id: 10, name: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0435\u0439 \u0438 \u0430\u0432\u0442\u043E\u0440\u0430\u0437\u0431\u043E\u0440\u044B" }
    ]));
    __publicField(this, "products", ref([]));
    __publicField(this, "categoryLoadError", false);
    __publicField(this, "selectedValues", ref({
      manufactor_id: "",
      category: [],
      modification: [],
      capacity: [],
      body_type: [],
      fuel_type: [],
      drive_type: [],
      gear_type: [],
      color: [],
      powers: []
    }));
    __publicField(this, "loadedFilters", ref(null));
    __publicField(this, "isProductLoading", ref(false));
  }
  loadFilters() {
    axiosInstance$1.get("/api/car/filters/").then((res) => {
      this.loadedFilters.value = res.data;
    });
  }
  updateSelectedValues(key, value) {
    console.log(key, value);
    const index = this.selectedValues.value[key].findIndex((item) => item == value);
    if (index != -1) {
      this.selectedValues.value[key].splice(index, 1);
      return;
    }
    this.selectedValues.value[key].push(value);
  }
  get filters() {
    var _a, _b, _c, _d, _e, _f, _g;
    return [
      // {
      //   id: 'capacities',
      //   name: 'Mощность',
      //   type: 'range',
      //   range: {
      //     labelFrom: 'От',
      //     labelTo: 'До'
      //   }
      // },
      {
        id: "body_type",
        name: "\u0422\u0438\u043F \u043A\u0443\u0437\u043E\u0432\u0430",
        isOpen: true,
        options: (_a = this.loadedFilters.value) == null ? void 0 : _a.body_types.map((item) => {
          return {
            value: item.id,
            label: item.name,
            checked: this.selectedValues.value.body_type.filter((id) => id == item.id).length > 0 ? true : false
          };
        })
      },
      {
        id: "fuel_type",
        name: "\u0422\u0438\u043F \u0437\u0430\u043F\u0440\u0430\u0432\u043A\u0438",
        isOpen: true,
        options: (_b = this.loadedFilters.value) == null ? void 0 : _b.fuel_types.map((item) => {
          return {
            value: item.id,
            label: item.name,
            checked: this.selectedValues.value.fuel_type.filter((id) => id == item.id).length > 0 ? true : false
          };
        })
      },
      {
        id: "drive_type",
        name: "\u0422\u0438\u043F \u043F\u0440\u0438\u0432\u043E\u0434\u0430",
        isOpen: false,
        options: (_c = this.loadedFilters.value) == null ? void 0 : _c.drive_types.map((item) => {
          return {
            value: item.id,
            label: item.name,
            checked: this.selectedValues.value.drive_type.filter((id) => id == item.id).length > 0 ? true : false
          };
        })
      },
      {
        id: "gear_type",
        name: "\u0422\u0438\u043F",
        isOpen: false,
        options: (_d = this.loadedFilters.value) == null ? void 0 : _d.gear_types.map((item) => {
          return {
            value: item.id,
            label: item.name,
            checked: this.selectedValues.value.gear_type.filter((id) => id == item.id).length > 0 ? true : false
          };
        })
      },
      {
        id: "color",
        name: "\u0426\u0432\u0435\u0442",
        isOpen: false,
        options: (_e = this.loadedFilters.value) == null ? void 0 : _e.colors.map((item) => {
          return {
            value: item.id,
            label: item.name,
            checked: this.selectedValues.value.color.filter((id) => id == item.id).length > 0 ? true : false
          };
        })
      },
      {
        id: "powers",
        name: "Power",
        type: "array",
        isOpen: false,
        options: (_f = this.loadedFilters.value) == null ? void 0 : _f.powers
      },
      {
        id: "capacity",
        name: "M\u043E\u0449\u043D\u043E\u0441\u0442\u044C",
        type: "array",
        isOpen: false,
        options: (_g = this.loadedFilters.value) == null ? void 0 : _g.capacities
      }
    ];
  }
  async loadProducts(value) {
    let string = "?";
    const selectedValues = value;
    Object.keys(selectedValues).forEach(function(key, _) {
      const ne = selectedValues[key];
      string += `${key}=${ne}&`;
    });
    this.isProductLoading.value = true;
    getProducts(string).then((res) => {
      this.products.value = res.results;
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.isProductLoading.value = false;
    });
  }
  async loadCategories() {
    await fetch("");
  }
}
const CatalogStorage = /* @__PURE__ */ function() {
  let instance;
  function createInstance() {
    return new NetworkCatalogStorage();
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

export { CatalogStorage as C, axiosInstance$1 as a, CardStorage as b, customFetch as c, getProducts as g, isOpenSidebar as i };
//# sourceMappingURL=storage-BKhyjSh-.mjs.map
