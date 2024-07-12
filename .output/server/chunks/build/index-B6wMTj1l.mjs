import { u as useAsyncData } from './asyncData-eeSZU22Z.mjs';
import { useSSRContext, defineComponent, withAsyncContext, unref, mergeModels, useModel, computed, ref, mergeProps, watch, isRef } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './single-BHvh5GLT.mjs';
import { XMarkIcon, ChevronUpDownIcon, CheckIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { onClickOutside } from '@vueuse/core';
import { C as CatalogStorage, c as customFetch, a as axiosInstance$1, g as getProducts } from './storage-BKhyjSh-.mjs';
import { useRouter } from 'vue-router';
import { _ as _sfc_main$3 } from './Card-DehtzjUi.mjs';
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
import 'axios';
import 'node:crypto';
import './nuxt-link-Bm57nO93.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    options: {},
    disabled: { type: Boolean },
    placeholder: {}
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const model = useModel(__props, "modelValue");
    function update(item) {
      var _a, _b, _c;
      const index = (_a = model.value) == null ? void 0 : _a.findIndex((itemIn) => itemIn.id == item.id);
      if (index != -1) {
        (_b = model.value) == null ? void 0 : _b.splice(index, 1);
      } else {
        (_c = model.value) == null ? void 0 : _c.push(item);
      }
      query.value = "";
      closeDropDown();
    }
    function contains(item) {
      var _a;
      const index = (_a = model.value) == null ? void 0 : _a.findIndex((itemIn) => itemIn.id == item.id);
      if (index != -1) {
        return true;
      }
      return false;
    }
    const filteredOptions = computed(() => {
      if (query.value === "") {
        return props.options;
      }
      return props.options.filter((item) => {
        const name = item.name.toLowerCase();
        return name.startsWith(query.value.toLowerCase());
      });
    });
    const query = ref("");
    const target = ref(null);
    const closeDropDown = () => {
      open.value = false;
    };
    onClickOutside(target, closeDropDown);
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "target",
        ref: target,
        class: "relative flex justify-between items-center p-2 rounded-lg border"
      }, _attrs))}><div class="flex flex-wrap w-full items-center gap-1">`);
      if (open.value || model.value.length <= 1) {
        _push(`<!--[-->`);
        ssrRenderList(model.value, (option) => {
          _push(`<div class="p-1 rounded-lg flex gap-1 items-center justify-center"><span class="text-sm text-slate-500">${ssrInterpolate(option.name)}</span>`);
          _push(ssrRenderComponent(unref(XMarkIcon), {
            onClick: ($event) => update(option),
            class: "w-5 h-5 cursor-pointer"
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (!open.value && model.value.length > 1) {
        _push(`<div class="py-1 px-2 cursor-pointer hover:border-slate-700 border text-sm text-slate-500 rounded-sm flex gap-1 items-center justify-center">${ssrInterpolate(model.value[0].name)} \u0438 \u0435\u0449\u0435 ${ssrInterpolate(model.value.length - 1)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (open.value || model.value.length <= 1) {
        _push(`<input${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${ssrRenderAttr("value", query.value)} class="${ssrRenderClass([{
          "w-full": model.value.length <= 0
        }, "max-w-full text-sm focus:outline-none p-2"])}"${ssrRenderAttr("placeholder", _ctx.placeholder)}>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div>`);
      _push(ssrRenderComponent(unref(ChevronUpDownIcon), {
        onClick: ($event) => open.value = !open.value,
        class: "w-6 h-6 cursor-pointer"
      }, null, _parent));
      _push(`</div>`);
      if (open.value) {
        _push(`<div class="h-[250px] top-full left-0 rounded-lg w-full shadow-md bg-white z-10 absolute overflow-scroll flex flex-col"><!--[-->`);
        ssrRenderList(filteredOptions.value, (option) => {
          _push(`<div class="p-2 border-b border-b-slate-100 flex items-center gap-2 cursor-pointer hover:bg-slate-100">`);
          if (contains(option)) {
            _push(ssrRenderComponent(unref(CheckIcon), { class: "h-5 w-5 text-sky-700" }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(` <div>${ssrInterpolate(option.name)}</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Select/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SearchBlock",
  __ssrInlineRender: true,
  setup(__props) {
    let selectedManufacturer = ref();
    let selectedModel = ref([]);
    let selectedModification = ref([]);
    const catalogStorage = CatalogStorage.getInstance();
    const { data: manufacturers } = useAsyncData("manufacturers", () => getManufacturers());
    const car_models = ref([]);
    useRouter();
    function getManufacturers() {
      return customFetch("/api/car/manufacturers/");
    }
    watch(selectedManufacturer, (value) => {
      selectedModel.value = [];
      getCarModels(value.id);
    });
    function getCarModels(value) {
      axiosInstance$1.get(`/api/car/models/?manufacturer=${value}`).then((res) => {
        car_models.value = res.data.results;
      }).catch((e) => {
        console.log(e);
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><div class="grid py-[100px] lg:grid-cols-[3fr_2fr] gap-4 items-start justify-center"><div class="flex justify-center text-white w-full h-full flex-col"><h1 class="text-2xl"><strong class="text-primary">\u0411/\u0443 \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438 </strong>\u043E\u043D\u043B\u0430\u0439\u043D \u043E\u0442 3 605 \u0435\u0432\u0440\u043E\u043F\u0435\u0439\u0441\u043A\u0438\u0445 \u043F\u0440\u043E\u0434\u0430\u0432\u0446\u043E\u0432 </h1><p class="mt-2">\u0412\u044B\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u0438\u0437 18 575 764 \u0431/\u0443 \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0435\u0439 \u043F\u043E \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u043C \u0446\u0435\u043D\u0430\u043C \u0432 \u043E\u0434\u043D\u043E\u043C \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0435</p></div><div class="w-full justify-center flex h-full items-center"><div class="flex w-full gap-2 flex-col bg-white p-4 rounded-lg"><h2 class="text-xl font-bold mb-3">\u0417\u0430\u043F\u0447\u0430\u0441\u0442\u0438 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F</h2>`);
      if (unref(manufacturers)) {
        _push(ssrRenderComponent(_sfc_main$4, {
          placeholder: "\u041C\u0430\u0440\u043A\u0430",
          modelValue: unref(selectedManufacturer),
          "onUpdate:modelValue": ($event) => isRef(selectedManufacturer) ? selectedManufacturer.value = $event : selectedManufacturer = $event,
          options: unref(manufacturers).results
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (car_models.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          disabled: !unref(selectedManufacturer),
          placeholder: "\u041C\u043E\u0434\u0435\u043B\u044C",
          name: "model",
          modelValue: unref(selectedModel),
          "onUpdate:modelValue": ($event) => isRef(selectedModel) ? selectedModel.value = $event : selectedModel = $event,
          options: car_models.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(catalogStorage).categories.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          disabled: !unref(selectedModel),
          placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0434\u0435\u0442\u0430\u043B\u0438",
          name: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u044F",
          modelValue: unref(selectedModification),
          "onUpdate:modelValue": ($event) => isRef(selectedModification) ? selectedModification.value = $event : selectedModification = $event,
          options: unref(catalogStorage).categories.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="flex gap-1 cursor-pointer rounded-lg hover:bg-primary-hover mt-3 p-3 bg-primary items-center justify-center">`);
      _push(ssrRenderComponent(unref(MagnifyingGlassIcon), { class: "h-5 w-5" }, null, _parent));
      _push(`<div>\u0418\u0441\u043A\u0430\u0442\u044C</div></button></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SearchBlock.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data, error } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("products", () => getProducts({}))), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<main${ssrRenderAttrs(_attrs)}><section style="${ssrRenderStyle({
        backgroundSize: "cover",
        background: `url('https://kartinki.pics/uploads/posts/2021-07/1626725529_6-kartinkin-com-p-zapchasti-fon-krasivo-7.jpg') no-repeat center`
      })}"><div class="mx-auto max-w-7xl px-4 lg:px-6">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></section><section class="mx-auto max-w-7xl px-4 lg:px-6"><h3 class="mt-9 px-3 md:px-0 text-lg font-bold">\u041B\u0443\u0447\u0448\u0438\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435</h3>`);
      if ((_a = unref(data)) == null ? void 0 : _a.results) {
        _push(`<div class="grid gap-1 md:px-0 md:grid-cols-2 md:gap-3 mt-3"><!--[-->`);
        ssrRenderList(unref(data).results, (item) => {
          _push(ssrRenderComponent(_sfc_main$3, { item }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div>${ssrInterpolate(unref(error))}</div>`);
      }
      _push(`</section></main>`);
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
//# sourceMappingURL=index-B6wMTj1l.mjs.map
