import { _ as __nuxt_component_0 } from './nuxt-link-Bm57nO93.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, watchEffect, openBlock, createBlock, Fragment, renderList, createVNode, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { ShoppingCartIcon, TruckIcon, CheckBadgeIcon, StarIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { u as useAsyncData } from './asyncData-eeSZU22Z.mjs';
import { _ as _sfc_main$4 } from './single-BHvh5GLT.mjs';
import Flicking from '@egjs/vue3-flicking';
import { useRoute } from 'vue-router';
import { b as CardStorage, c as customFetch } from './storage-BKhyjSh-.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '@vueuse/core';
import 'axios';
import 'node:crypto';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BreadCrumb",
  __ssrInlineRender: true,
  props: ["options"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "flex gap-2 text-slate-700 flex-wrap text-xs" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.options, (option, index) => {
        _push(`<li class="flex items-center gap-2">`);
        if (option.link) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: option.link
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(option.text)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(option.text), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div>${ssrInterpolate(option.text)}</div>`);
        if (index < __props.options.length - 1) {
          _push(`<span class="dot">`);
          _push(ssrRenderComponent(unref(ArrowRightIcon), { class: "w-2 h-2" }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BreadCrumb.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "product-slider",
  __ssrInlineRender: true,
  props: {
    pictures: {}
  },
  setup(__props) {
    const currentValue = ref(0);
    function onChange(changed) {
      currentValue.value = changed.index;
    }
    const flicking = ref(null);
    const flicking2 = ref(null);
    watchEffect(() => {
      if (flicking.value != null && flicking2.value != null) {
        try {
          flicking.value.moveTo(currentValue.value);
          flicking2.value.moveTo(currentValue.value);
        } catch (e) {
        }
      }
    });
    const props = __props;
    function next() {
      if (currentValue.value >= props.pictures.length - 1) {
        return;
      }
      currentValue.value += 1;
    }
    function prev() {
      console.log(currentValue.value, props.pictures.length);
      if (currentValue.value <= 0) {
        return;
      }
      currentValue.value -= 1;
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.pictures.length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex flex-col gap-3" }, _attrs))}><div class="w-full relative">`);
        _push(ssrRenderComponent(unref(Flicking), {
          onChanged: onChange,
          class: "rounded-sm",
          ref_key: "flicking",
          ref: flicking,
          options: {
            preventClickOnDrag: true,
            duration: 100
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(_ctx.pictures, (picture) => {
                _push2(`<div class="panel border-b cursor-pointer w-full h-[300px]"${_scopeId}><img alt="s" loading="lazy" class="w-full pointer-events-none h-full object-cover"${ssrRenderAttr("src", picture.image)}${_scopeId}></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.pictures, (picture) => {
                  return openBlock(), createBlock("div", {
                    key: picture.id,
                    class: "panel border-b cursor-pointer w-full h-[300px]"
                  }, [
                    createVNode("img", {
                      alt: "s",
                      loading: "lazy",
                      class: "w-full pointer-events-none h-full object-cover",
                      src: picture.image
                    }, null, 8, ["src"])
                  ]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div>`);
        _push(ssrRenderComponent(unref(ChevronLeftIcon), {
          onClick: prev,
          class: "absolute z-10 top-1/2 cursor-pointer w-7 h-7"
        }, null, _parent));
        _push(ssrRenderComponent(unref(ChevronRightIcon), {
          onClick: next,
          class: "absolute z-10 top-1/2 right-0 w-7 h-7 cursor-pointer"
        }, null, _parent));
        _push(`</div></div><div class="w-full">`);
        _push(ssrRenderComponent(unref(Flicking), {
          ref_key: "flicking2",
          ref: flicking2,
          options: {
            preventClickOnDrag: true,
            panelsPerView: 5,
            duration: 100,
            bound: true,
            align: "center"
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(_ctx.pictures, (product, index) => {
                _push2(`<div class="mx-1 rounded-sm border-b overflow-hidden cursor-pointer"${_scopeId}><div class="w-full h-[80px] relative"${_scopeId}><img loading="lazy" class="w-full absolute top-0 left-0 pointer-events-none h-full object-cover"${ssrRenderAttr("src", product.image)}${_scopeId}>`);
                if (currentValue.value == index) {
                  _push2(`<div class="w-full h-full bg-black opacity-10 absolute top-0"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.pictures, (product, index) => {
                  return openBlock(), createBlock("div", {
                    onClick: ($event) => currentValue.value = index,
                    key: product.id,
                    class: "mx-1 rounded-sm border-b overflow-hidden cursor-pointer"
                  }, [
                    createVNode("div", { class: "w-full h-[80px] relative" }, [
                      createVNode("img", {
                        loading: "lazy",
                        class: "w-full absolute top-0 left-0 pointer-events-none h-full object-cover",
                        src: product.image
                      }, null, 8, ["src"]),
                      currentValue.value == index ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "w-full h-full bg-black opacity-10 absolute top-0"
                      })) : createCommentVNode("", true)
                    ])
                  ], 8, ["onClick"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}> \u041D\u0435\u0442\u0443 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439 </div>`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product-slider.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "product-mobile.slider",
  __ssrInlineRender: true,
  props: {
    pictures: {}
  },
  setup(__props) {
    const currentValue = ref(0);
    function onChange(changed) {
      currentValue.value = changed.index;
    }
    const flicking = ref(null);
    watchEffect(() => {
      if (flicking.value != null) {
        try {
          flicking.value.moveTo(currentValue.value);
        } catch (e) {
        }
      }
    });
    const props = __props;
    function next() {
      if (currentValue.value >= props.pictures.length - 1) {
        return;
      }
      currentValue.value += 1;
    }
    function prev() {
      console.log(currentValue.value, props.pictures.length);
      if (currentValue.value <= 0) {
        return;
      }
      currentValue.value -= 1;
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.pictures.length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex flex-col gap-3" }, _attrs))}><div class="w-full relative">`);
        _push(ssrRenderComponent(unref(Flicking), {
          onChanged: onChange,
          class: "rounded-sm",
          ref_key: "flicking",
          ref: flicking,
          options: {
            preventClickOnDrag: true,
            duration: 100
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(_ctx.pictures, (picture) => {
                _push2(`<div class="panel cursor-pointer w-full h-[300px]"${_scopeId}><img loading="lazy" class="w-full pointer-events-none h-full object-cover"${ssrRenderAttr("src", picture.image)}${_scopeId}></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.pictures, (picture) => {
                  return openBlock(), createBlock("div", {
                    key: picture.id,
                    class: "panel cursor-pointer w-full h-[300px]"
                  }, [
                    createVNode("img", {
                      loading: "lazy",
                      class: "w-full pointer-events-none h-full object-cover",
                      src: picture.image
                    }, null, 8, ["src"])
                  ]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div>`);
        _push(ssrRenderComponent(unref(ChevronLeftIcon), {
          onClick: prev,
          class: "absolute z-10 top-1/2 cursor-pointer w-7 h-7"
        }, null, _parent));
        _push(ssrRenderComponent(unref(ChevronRightIcon), {
          onClick: next,
          class: "absolute z-10 top-1/2 right-0 w-7 h-7 cursor-pointer"
        }, null, _parent));
        _push(`</div><div class="flex justify-center py-3 gap-1"><!--[-->`);
        ssrRenderList(_ctx.pictures.length, (_, index) => {
          _push(`<div class="${ssrRenderClass([{
            "!bg-primary-hover": index == currentValue.value
          }, "w-3 h-3 rounded-full bg-gray-300"])}"></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}> \u041D\u0435\u0442\u0443 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439 </div>`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product-mobile.slider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const cardStorage = CardStorage.getInstance();
    const breadcrumbs = [
      {
        "text": "\u0413\u043B\u0430\u0432\u043D\u0430\u044F",
        "link": null
      },
      {
        "text": "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439",
        "link": null
      },
      {
        "text": "Audi",
        "link": null
      },
      {
        "text": "Audi 100 200 5000 C2 (100)",
        "link": null
      },
      {
        "text": "\u0414\u0432\u0435\u0440\u044C",
        "link": null
      },
      {
        "text": "\u0411\u043E\u043A\u043E\u0432\u0430\u044F \u0440\u0430\u0437\u0434\u0432\u0438\u0436\u043D\u0430\u044F \u0434\u0432\u0435\u0440\u044C",
        "link": null
      },
      {
        "text": "\u0412\u043D\u0435\u0448\u043D\u044F\u044F \u0440\u0443\u0447\u043A\u0430",
        "link": null
      }
    ];
    const route = useRoute();
    function getProduct(id) {
      return customFetch(`/api/product/${id}/`);
    }
    const { data: product } = useAsyncData("product", () => getProduct(parseInt(route.params.id.toString())));
    const countryId = ref(void 0);
    const countryOptions = [
      {
        id: 1,
        name: "\u041A\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043D"
      },
      {
        id: 2,
        name: "\u0420\u043E\u0441\u0441\u0438\u044F"
      },
      {
        id: 3,
        name: "\u0413\u0440\u0443\u0437\u0438\u044F"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_BreadCrumb = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto relative max-w-7xl px-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_BreadCrumb, {
        class: "mt-6",
        options: breadcrumbs
      }, null, _parent));
      if (unref(product)) {
        _push(`<div class="mt-4 grid relative w-full grid-cols-1 lg:grid-cols-[500px_1fr] gap-5"><div class="order-2 lg:order-1"><div class="p-5 w-full bg-white rounded-lg hidden lg:block">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          pictures: (_a = unref(product)) == null ? void 0 : _a.pictures
        }, null, _parent));
        _push(`</div><div class="p-5 w-full lg:mt-5 bg-white rounded-lg"><h2 class="font-bold text-lg">\u041C\u0430\u0448\u0438\u043D\u0430</h2><div><ul><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u041C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F </div><p class="font-light"> 420 d (2015, 140kw, 2.00l) </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u0413\u043E\u0434 </div><p class="font-light"> 2015 </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u041A\u043E\u0434 \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044F </div><p class="font-light"> B47 D20 A </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u0422\u0438\u043F \u0442\u043E\u043F\u043B\u0438\u0432\u0430 </div><p class="font-light"> \u0414\u0438\u0437\u0435\u043B\u044C </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u041E\u0431\u044A\u0435\u043C \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044F </div><p class="font-light"> 2.0 l </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u0422\u0438\u043F \u043A\u043E\u0440\u043E\u0431\u043A\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0447 </div><p class="font-light"> \u0420\u0443\u0447\u043D\u0430\u044F </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u0412\u0435\u0434\u0443\u0449\u0438\u0435 \u043A\u043E\u043B\u0435\u0441\u0430 </div><p class="font-light"> \u0417\u0430\u0434\u043D\u0438\u0439 </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u0426\u0432\u0435\u0442 </div><p class="font-light"> \u0421\u0438\u043D\u0438\u0439 </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u0422\u0438\u043F \u043A\u0443\u0437\u043E\u0432\u0430 </div><p class="font-light"> \u041A\u0443\u043F\u0435 </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u041F\u0440\u043E\u0431\u0435\u0433 </div><p class="font-light"> 99459 </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u041F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0440\u0443\u043B\u0435\u0432\u043E\u0433\u043E \u043A\u043E\u043B\u0435\u0441\u0430 </div><p class="font-light"> \u041F\u0440\u0430\u0432\u043E\u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0439 \u0440\u0443\u043B\u044C </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> OEM-\u043A\u043E\u0434\u044B </div><p class="font-light"> 6792112 </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 </div><p class="font-light"> \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043D\u0430\u044F/-\u044B\u0439 </p></li><li class="flex py-3 justify-between -b"><div class="font-light text-slate-500"> \u041C\u043E\u0449\u043D\u043E\u0441\u0442\u044C \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044F </div><p class="font-light"> 140 kW </p></li></ul></div></div></div><div class="order-1 lg:order-2"><div class="lg:sticky lg:top-20 z-10"><div class="bg-white rounded-lg p-5">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          pictures: (_b = unref(product)) == null ? void 0 : _b.pictures,
          class: "lg:hidden"
        }, null, _parent));
        _push(`<h1 class="text-lg lg:text-2xl font-bold mt-3">${ssrInterpolate(unref(product).modification.modelCar.name)} ( ${ssrInterpolate(unref(product).modification.modelCar.startDate)} - ${ssrInterpolate(unref(product).modification.modelCar.endDate)} ) ${ssrInterpolate(unref(product).name)}</h1><div class="flex justify-between flex-col lg:flex-row gap-2 lg:gap-0 lg:items-center mt-3"><div class="text-xl lg:text-2xl font-bold">${ssrInterpolate(unref(product).price)} \u20B8</div>`);
        if (unref(cardStorage).checkInGoods(unref(product).id)) {
          _push(`<button class="rounded-lg flex p-3 gap-1 justify-center">`);
          _push(ssrRenderComponent(unref(ShoppingCartIcon), { class: "h-6 w-6" }, null, _parent));
          _push(` \u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443 </button>`);
        } else {
          _push(`<button class="p-3 bg-primary rounded-lg flex gap-1 justify-center">`);
          _push(ssrRenderComponent(unref(ShoppingCartIcon), { class: "h-6 w-6" }, null, _parent));
          _push(` \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443 </button>`);
        }
        _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-3 rounded-lg bg-white lg:gap-2 py-5 px-5 justify-between my-4 gap-5"><div class="flex gap-2 flex-col items-center">`);
        _push(ssrRenderComponent(unref(TruckIcon), { class: "w-12 h-12 text-sky-500" }, null, _parent));
        _push(`<div class="flex flex-col justify-center items-center"><h3>1-2 \u0434.</h3><p class="text-sm text-gray-500">\u0420\u0430\u0441\u0447\u0435\u0442\u043D\u0430\u044F \u0434\u0430\u0442\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438*</p></div></div><div class="flex gap-2 flex-col items-center">`);
        _push(ssrRenderComponent(unref(CheckBadgeIcon), { class: "w-12 h-12 text-sky-500" }, null, _parent));
        _push(`<div class="flex flex-col justify-center items-center"><h3>14 \u0434.</h3><p class="text-sm text-gray-500">\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u044F \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430</p></div></div><div class="flex gap-2 flex-col items-center">`);
        _push(ssrRenderComponent(unref(StarIcon), { class: "w-12 h-12 text-sky-500" }, null, _parent));
        _push(`<div class="flex flex-col justify-center items-center"><h3>4.6/5</h3><p class="text-sm text-gray-500">\u041E\u0446\u0435\u043D\u043A\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0430</p></div></div></div><div class="pt-5 bg-white rounded-lg p-3"><h2 class="text-xl font-bold">\u0420\u0430\u0441\u0447\u0435\u0442\u043D\u0430\u044F \u0432\u0440\u0435\u043C\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438*</h2>`);
        _push(ssrRenderComponent(_sfc_main$4, {
          class: "mt-5",
          modelValue: countryId.value,
          "onUpdate:modelValue": ($event) => countryId.value = $event,
          options: countryOptions,
          placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0443"
        }, null, _parent));
        _push(`<table class="table-auto mt-5 w-full"><thead><tr class="text-left -b text-gray-500 font-light"><th class="font-light py-2">\u041A\u0443\u0440\u044C\u0435\u0440</th><th class="font-light py-2">\u0426\u0435\u043D\u0430 \u043E\u0442</th><th class="font-light py-2">\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430</th></tr></thead><tbody class="font-light"><tr><td class="py-2">FedEx Plus</td><td class="py-2">1290 \u20B8</td><td class="py-2">26 \u0424\u0435\u0432\u0440\u0430\u043B\u044F</td></tr><tr><td class="py-2">FedEx Priority</td><td class="py-2">1400 \u20B8</td><td class="py-2">2 \u041C\u0430\u0440\u0442\u0430</td></tr></tbody></table></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CnPqd0Nr.mjs.map
