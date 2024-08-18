import { d as defineStore } from './server.mjs';
import { a as axiosInstance, c as customFetch } from './index-C5IDfPQf.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DbMKAke2.mjs';
import { defineComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useDateFormat } from '@vueuse/core';

function recursiveCategory(children, options) {
  for (let i = 0; i < children.length; i++) {
    const category = children[i];
    let option = {
      label: category.name,
      key: category.id
    };
    if (category.children.length > 0) {
      const subChildren = [];
      recursiveCategory(category.children, subChildren);
      option["children"] = subChildren;
    }
    options.push(option);
  }
}
const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      categories: [],
      categoriesTree: [],
      category: null
    };
  },
  getters: {
    categoriesOptions: (state) => {
      return state.categories.map((item) => {
        return { label: item.name, value: item.id };
      });
    },
    categoriesTreeOptions: (state) => {
      const options = [];
      recursiveCategory(state.categoriesTree, options);
      return options;
    }
  },
  actions: {
    loadCategoryById(id) {
      axiosInstance.get(`/api/category/${id}`).then(
        (res) => {
          this.category = res.data;
        }
      );
    },
    loadCategories() {
      axiosInstance.get(`/api/category?page_size=2000`).then(
        (res) => {
          this.categories = res.data.results;
        }
      ).catch((e) => console.log(e));
    },
    loadCategoriesTree() {
      axiosInstance.get(`/api/category/tree`).then(
        (res) => {
          this.categoriesTree = res.data;
        }
      ).catch((e) => console.log(e));
    }
  }
});
const useManufacturerStore = defineStore("manufacturer-store", {
  state: () => {
    return {
      manufacturers: [],
      manufacturer: null
    };
  },
  getters: {
    manufacturersByLetterGrouping: (state) => {
      return state.manufacturers.reduce((accumulator, currentItem) => {
        const firstLetter = currentItem.name[0].toUpperCase();
        if (!accumulator[firstLetter]) {
          accumulator[firstLetter] = [];
        }
        accumulator[firstLetter].push(currentItem);
        return accumulator;
      }, {});
    },
    manufacturerOptions: (state) => {
      return state.manufacturers.map((option) => {
        return {
          label: option.name,
          value: option.id
        };
      });
    }
  },
  actions: {
    loadManufacturers() {
      axiosInstance.get("/api/car/manufacturers/").then((res) => {
        this.manufacturers = res.data.results;
      });
    },
    loadManufacturerById(id) {
      axiosInstance.get(`/api/car/manufacturers/${id}`).then((res) => {
        this.manufacturer = res.data;
      });
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "card",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const formatted = useDateFormat(props.item.created_at, "MMMM DD", { locales: "ru-RU" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: {
          name: "product-id",
          params: {
            id: _ctx.item.id
          }
        },
        class: "flex bg-white rounded-lg lg:flex-row border border-white hover:shadow transition cursor-pointer flex-col p-3 lg:p-5 gap-3 hover:border-slate-200"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div${_scopeId}><img class="rounded border lg:h-[120px] h-[200px] object-cover w-full lg:w-[160px]"${ssrRenderAttr("src", _ctx.item.pictures.length != 0 ? _ctx.item.pictures[0].image : "https://demofree.sirv.com/nope-not-here.jpg")} alt=""${_scopeId}></div><div class="w-full"${_scopeId}><div class="flex justify-between flex-col w-full"${_scopeId}><h2${_scopeId}>${ssrInterpolate(_ctx.item.name)}</h2><span class="text-2xl"${_scopeId}>${ssrInterpolate(_ctx.item.price)} \u20B8</span></div><p class="text-sm mt-2"${_scopeId}>\u0431/\u0443 ${ssrInterpolate(_ctx.item.modification.modelCar.name)}</p><p class="text-sm text-blue-600 font-light mt-2 hover:underline-offset-1 hover:underline"${_scopeId}>${ssrInterpolate(_ctx.item.category)}</p><ul class="flex flex-col md:gap-3 md:flex-row"${_scopeId}><li class="text-sm text-slate-500 font-light"${_scopeId}>${ssrInterpolate((_a2 = (_b = (_a = _ctx.item.warehouse) == null ? void 0 : _a.city) == null ? void 0 : _b.name) != null ? _a2 : "\u0428\u044B\u043C\u043A\u0435\u043D\u0442")}</li><li class="text-sm text-slate-500 font-light"${_scopeId}>${ssrInterpolate(unref(formatted))}</li></ul></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("img", {
                  class: "rounded border lg:h-[120px] h-[200px] object-cover w-full lg:w-[160px]",
                  src: _ctx.item.pictures.length != 0 ? _ctx.item.pictures[0].image : "https://demofree.sirv.com/nope-not-here.jpg",
                  alt: ""
                }, null, 8, ["src"])
              ]),
              createVNode("div", { class: "w-full" }, [
                createVNode("div", { class: "flex justify-between flex-col w-full" }, [
                  createVNode("h2", null, toDisplayString(_ctx.item.name), 1),
                  createVNode("span", { class: "text-2xl" }, toDisplayString(_ctx.item.price) + " \u20B8", 1)
                ]),
                createVNode("p", { class: "text-sm mt-2" }, "\u0431/\u0443 " + toDisplayString(_ctx.item.modification.modelCar.name), 1),
                createVNode("p", { class: "text-sm text-blue-600 font-light mt-2 hover:underline-offset-1 hover:underline" }, toDisplayString(_ctx.item.category), 1),
                createVNode("ul", { class: "flex flex-col md:gap-3 md:flex-row" }, [
                  createVNode("li", { class: "text-sm text-slate-500 font-light" }, toDisplayString((_b2 = (_d = (_c = _ctx.item.warehouse) == null ? void 0 : _c.city) == null ? void 0 : _d.name) != null ? _b2 : "\u0428\u044B\u043C\u043A\u0435\u043D\u0442"), 1),
                  createVNode("li", { class: "text-sm text-slate-500 font-light" }, toDisplayString(unref(formatted)), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function generateQuery(queries) {
  let query = "?";
  Object.keys(queries).forEach(function(key, _) {
    const ne = queries[key];
    if (ne != null) {
      query += `${key}=${ne}&`;
    }
  });
  return query;
}
async function getProducts(options = {}) {
  const query = generateQuery(options);
  return await customFetch(`/api/product/${query}`);
}
const useProductStore = defineStore("product-store", {
  state: () => {
    return {
      products: [],
      isLoadingProducts: false,
      popularProducts: []
    };
  },
  actions: {
    async loadProducts(options) {
      this.isLoadingProducts = true;
      getProducts(options).then((res) => {
        this.products = res.results;
      }).finally(() => {
        this.isLoadingProducts = false;
      });
    },
    loadPopularProducts(options) {
      const popularOptions = { page_size: 4, ...options };
      getProducts(popularOptions).then((res) => {
        this.popularProducts = res.results;
      });
    }
  }
});

export { _sfc_main as _, useCategoryStore as a, useManufacturerStore as b, useProductStore as u };
//# sourceMappingURL=product-store-C1z4bZAH.mjs.map
