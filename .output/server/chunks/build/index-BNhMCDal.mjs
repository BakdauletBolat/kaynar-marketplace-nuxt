import { useSSRContext, defineComponent, unref, ref, computed, mergeProps, isRef, withCtx, createVNode, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-BAhmMc19.mjs';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { c as customFetch, a as axiosInstance } from './index-C5IDfPQf.mjs';
import { useRouter } from 'vue-router';
import { u as useProductStore, _ as _sfc_main$3, a as useCategoryStore, b as useManufacturerStore } from './product-store-C1z4bZAH.mjs';
import { I as Button } from './Button-DJbEEsUs.mjs';
import { b as NSelect } from './Select-B5PHYIHa.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DbMKAke2.mjs';
import './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '@css-render/vue3-ssr';
import 'vooks';
import 'lodash-es';
import 'css-render';
import 'axios';
import '@vueuse/core';
import 'vueuc';
import 'vdirs';
import 'seemly';
import 'evtd';
import '@css-render/plugin-bem';
import 'treemate';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "search-block",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    let selectedManufacturer = ref();
    let selectedModel = ref();
    let selectedCategory = ref();
    const categoryStore = useCategoryStore();
    const { data: manufacturers } = useAsyncData("manufacturers", () => getManufacturers());
    const manufacturersOptions = computed(() => {
      if (manufacturers.value != null) {
        return manufacturers.value.results.map((item) => {
          return {
            label: item.name,
            value: item.id
          };
        });
      }
      return [];
    });
    const carModelsOptions = ref([]);
    function onChangeManufacturer(value) {
      selectedModel.value = void 0;
      getCarModels(value);
    }
    function search() {
      var _a, _b;
      router.push({
        name: selectedManufacturer.value != null ? "catalog-manufacturerId" : "catalog",
        query: {
          category: (_a = selectedCategory.value) == null ? void 0 : _a.toString(),
          modification: (_b = selectedModel.value) == null ? void 0 : _b.toString()
        },
        params: {
          manufacturerId: selectedManufacturer.value != void 0 ? selectedManufacturer == null ? void 0 : selectedManufacturer.value : null
        }
      });
    }
    function getManufacturers() {
      return customFetch("/api/car/manufacturers/");
    }
    function getCarModels(value) {
      axiosInstance.get(`/api/car/models/?manufacturer=${value}`).then((res) => {
        carModelsOptions.value = res.data.results.map((item) => {
          return {
            label: item.name,
            value: item.id
          };
        });
      }).catch((e) => {
        console.log(e);
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><div class="grid py-[100px] lg:grid-cols-[3fr_2fr] gap-4 items-start justify-center"><div class="flex justify-center text-white w-full h-full flex-col"><h1 class="text-2xl"><strong class="text-primary">\u0411/\u0443 \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438 </strong>\u043E\u043D\u043B\u0430\u0439\u043D \u043E\u0442 13 \u0435\u0432\u0440\u043E\u043F\u0435\u0439\u0441\u043A\u0438\u0445 \u043F\u0440\u043E\u0434\u0430\u0432\u0446\u043E\u0432 </h1><p class="mt-2">\u0412\u044B\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u0438\u0437 70 000 \u0431/\u0443 \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0435\u0439 \u043F\u043E \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u043C \u0446\u0435\u043D\u0430\u043C \u0432 \u043E\u0434\u043D\u043E\u043C \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0435</p></div><div class="w-full justify-center flex h-full items-center"><div class="flex w-full gap-2 flex-col bg-white p-4 rounded-lg"><h2 class="text-xl font-bold mb-3">\u0417\u0430\u043F\u0447\u0430\u0441\u0442\u0438 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F</h2>`);
      _push(ssrRenderComponent(unref(NSelect), {
        value: unref(selectedManufacturer),
        "onUpdate:value": ($event) => isRef(selectedManufacturer) ? selectedManufacturer.value = $event : selectedManufacturer = $event,
        filterable: "",
        clearable: "",
        placeholder: "\u041C\u0430\u0440\u043A\u0430",
        "on-change": onChangeManufacturer,
        options: manufacturersOptions.value
      }, null, _parent));
      _push(ssrRenderComponent(unref(NSelect), {
        filterable: "",
        clearable: "",
        value: unref(selectedModel),
        "onUpdate:value": ($event) => isRef(selectedModel) ? selectedModel.value = $event : selectedModel = $event,
        disabled: !unref(selectedManufacturer),
        placeholder: "\u041C\u043E\u0434\u0435\u043B\u044C",
        options: carModelsOptions.value
      }, null, _parent));
      _push(ssrRenderComponent(unref(NSelect), {
        filterable: "",
        clearable: "",
        value: unref(selectedCategory),
        "onUpdate:value": ($event) => isRef(selectedCategory) ? selectedCategory.value = $event : selectedCategory = $event,
        placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0434\u0435\u0442\u0430\u043B\u0438",
        options: unref(categoryStore).categoriesOptions
      }, null, _parent));
      _push(ssrRenderComponent(unref(Button), {
        type: "primary",
        onClick: search
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(MagnifyingGlassIcon), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(MagnifyingGlassIcon))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u0418\u0441\u043A\u0430\u0442\u044C `);
          } else {
            return [
              createTextVNode(" \u0418\u0441\u043A\u0430\u0442\u044C ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/search-block.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "manufacturers-list",
  __ssrInlineRender: true,
  setup(__props) {
    const manufacturerStore = useManufacturerStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid lg:grid-rows-3 md:grid-rows-6 grid-rows-12 gap-4 grid-flow-col items-start" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(manufacturerStore).manufacturersByLetterGrouping, (manufacturers, key) => {
        _push(`<div><h2 class="text-lg font-bold">${ssrInterpolate(key)}</h2><div class="flex flex-col gap-1 mt-2"><!--[-->`);
        ssrRenderList(manufacturers, (manufacturer) => {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: {
              name: "index"
            },
            class: "text-sm hover:text-blue-400 hover:font-medium hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(manufacturer.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(manufacturer.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/manufacturers-list.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const productStore = useProductStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(_attrs)}><section style="${ssrRenderStyle({
        backgroundSize: "cover",
        background: `url('https://kartinki.pics/uploads/posts/2021-07/1626725529_6-kartinkin-com-p-zapchasti-fon-krasivo-7.jpg') no-repeat center`
      })}"><div class="mx-auto container px-4">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div></section><section class="mx-auto container px-4"><h3 class="mt-9 px-3 md:px-0 text-2xl font-bold">\u041B\u0443\u0447\u0448\u0438\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435</h3>`);
      if (unref(productStore).popularProducts) {
        _push(`<div class="grid gap-2 md:grid-cols-2 md:gap-3 mt-3"><!--[-->`);
        ssrRenderList(unref(productStore).popularProducts, (item) => {
          _push(ssrRenderComponent(_sfc_main$3, { item }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div></div>`);
      }
      _push(`</section><section class="mx-auto container px-4"><h3 class="mt-9 px-3 md:px-0 text-2xl font-bold">\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043C\u0430\u0440\u043A\u0435</h3><div class="mt-4">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></section><section class="mx-auto container px-4"><h3 class="mt-9 px-3 md:px-0 text-2xl font-bold">\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438</h3><div class="mt-4"></div></section></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BNhMCDal.mjs.map
