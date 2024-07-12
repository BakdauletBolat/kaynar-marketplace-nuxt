import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { useSSRContext, defineComponent, useModel, unref, mergeProps, withCtx, createVNode, renderSlot, isRef, resolveComponent, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { i as isOpenSidebar, b as CardStorage } from './storage-BKhyjSh-.mjs';
import { TransitionRoot, Dialog, TransitionChild, DialogPanel } from '@headlessui/vue';
import { _ as __nuxt_component_0 } from './nuxt-link-Bm57nO93.mjs';
import { MagnifyingGlassIcon, UserIcon, HeartIcon, Bars3Icon } from '@heroicons/vue/24/outline';
import { _ as _export_sfc, u as useNuxtApp } from './server.mjs';
import { useRouter, useRoute } from 'vue-router';
import { _ as _sfc_main$5 } from './index-Bji3BtXT.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$6 } from './index-DGzW2OUa.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'axios';
import 'node:crypto';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    "modelValue": { type: Boolean },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    function closeModal() {
      model.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TransitionRoot), mergeProps({
        appear: "",
        show: model.value,
        as: "template"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              onClose: closeModal,
              class: "relative w-full z-[10000]"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black/25"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-black/25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full h-full items-center justify-end text-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "translate-y-0 translate-x-[500px]",
                    "enter-to": "translate-y-0 translate-x-0",
                    leave: "duration-200 ease-in",
                    "leave-from": "translate-y-0 translate-x-0",
                    "leave-to": "translate-y-0 translate-x-[500px]"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "w-[500px] transform overflow-scroll rounded-none bg-white max-h-full h-full p-6 text-left shadow-xl transition-all" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="mt-2"${_scopeId4}>`);
                              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push5, _parent5, _scopeId4);
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "mt-2" }, [
                                  renderSlot(_ctx.$slots, "default")
                                ])
                              ];
                            }
                          }),
                          _: 3
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), { class: "w-[500px] transform overflow-scroll rounded-none bg-white max-h-full h-full p-6 text-left shadow-xl transition-all" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "mt-2" }, [
                                renderSlot(_ctx.$slots, "default")
                              ])
                            ]),
                            _: 3
                          })
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "duration-300 ease-out",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "duration-200 ease-in",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fixed inset-0 bg-black/25" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                      createVNode("div", { class: "flex min-h-full h-full items-center justify-end text-center" }, [
                        createVNode(unref(TransitionChild), {
                          as: "template",
                          enter: "duration-300 ease-out",
                          "enter-from": "translate-y-0 translate-x-[500px]",
                          "enter-to": "translate-y-0 translate-x-0",
                          leave: "duration-200 ease-in",
                          "leave-from": "translate-y-0 translate-x-0",
                          "leave-to": "translate-y-0 translate-x-[500px]"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DialogPanel), { class: "w-[500px] transform overflow-scroll rounded-none bg-white max-h-full h-full p-6 text-left shadow-xl transition-all" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "mt-2" }, [
                                  renderSlot(_ctx.$slots, "default")
                                ])
                              ]),
                              _: 3
                            })
                          ]),
                          _: 3
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                as: "div",
                onClose: closeModal,
                class: "relative w-full z-[10000]"
              }, {
                default: withCtx(() => [
                  createVNode(unref(TransitionChild), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed inset-0 bg-black/25" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                    createVNode("div", { class: "flex min-h-full h-full items-center justify-end text-center" }, [
                      createVNode(unref(TransitionChild), {
                        as: "template",
                        enter: "duration-300 ease-out",
                        "enter-from": "translate-y-0 translate-x-[500px]",
                        "enter-to": "translate-y-0 translate-x-0",
                        leave: "duration-200 ease-in",
                        "leave-from": "translate-y-0 translate-x-0",
                        "leave-to": "translate-y-0 translate-x-[500px]"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DialogPanel), { class: "w-[500px] transform overflow-scroll rounded-none bg-white max-h-full h-full p-6 text-left shadow-xl transition-all" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "mt-2" }, [
                                renderSlot(_ctx.$slots, "default")
                              ])
                            ]),
                            _: 3
                          })
                        ]),
                        _: 3
                      })
                    ])
                  ])
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/index.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SidebarModal",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$4), mergeProps({
        modelValue: unref(isOpenSidebar),
        "onUpdate:modelValue": ($event) => isRef(isOpenSidebar) ? isOpenSidebar.value = $event : null
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="hello"${_scopeId}> Test </div>`);
          } else {
            return [
              createVNode("div", { class: "hello" }, " Test ")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SidebarModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SearchInput",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(MagnifyingGlassIcon), { class: "w-6 h-6 absolute right-3 text-black top-1/2 -translate-y-1/2" }, null, _parent));
      _push(`<input class="rounded-lg lg:min-w-[250px] p-3 border border-slate-400 text-black text-sm" placeholder="ID, \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438"></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SearchInput.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Logo = "" + buildAssetsURL("logo.CHX3xMqK.png");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    useNuxtApp();
    const cardStorage = CardStorage.getInstance();
    const router = useRouter();
    const navigation = [
      { name: "\u0410\u0432\u0442\u043E\u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438", to: "index" },
      { name: "\u041A\u043E\u043B\u0435\u0441\u0430 \u0438 \u0448\u0438\u043D\u044B", to: "services" },
      { name: "\u0417\u0430\u043F\u0440\u043E\u0441 \u0434\u0435\u0442\u0430\u043B\u0438", to: "services" },
      { name: "\u041A\u0443\u043F\u0438\u0442\u044C \u043E\u043D\u043B\u0430\u0439\u043D", to: "services" }
    ];
    function navigateToOrder() {
      cardStorage.isActive.value = false;
      router.push({
        name: "order-create"
      });
    }
    const route = useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_SearchInput = _sfc_main$2;
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<!--[--><div>`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        title: "\u0412\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430",
        modelValue: unref(cardStorage).isActive.value,
        "onUpdate:modelValue": ($event) => unref(cardStorage).isActive.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1$1, null, null, _parent2, _scopeId));
            _push2(`<button class="mt-3 bg-primary w-full block p-3 text-center rounded-sm"${_scopeId}>\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437</button>`);
          } else {
            return [
              createVNode(_sfc_main$1$1),
              createVNode("button", {
                onClick: navigateToOrder,
                class: "mt-3 bg-primary w-full block p-3 text-center rounded-sm"
              }, "\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="fixed top-0 w-full z-[9999]"><div class="w-full bg-black z-[9999] lg:border-b border-b-slate-100"><div class="mx-auto justify-between bg-black items-center text-white flex max-w-7xl px-6 py-4"><div class="flex items-center gap-5">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "flex gap-5",
        to: {
          name: "index"
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><img class="w-[60px] h-[60px]" alt="\u041B\u043E\u0433\u043E"${ssrRenderAttr("src", unref(Logo))}${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("img", {
                  class: "w-[60px] h-[60px]",
                  alt: "\u041B\u043E\u0433\u043E",
                  src: unref(Logo)
                }, null, 8, ["src"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_SearchInput, null, null, _parent));
      _push(`</div><div class="flex gap-2"><div class="p-2 cursor-pointer hidden lg:block">`);
      _push(ssrRenderComponent(unref(UserIcon), { class: "w-6 h-6" }, null, _parent));
      _push(`</div><div class="p-2 cursor-pointer hidden lg:block">`);
      _push(ssrRenderComponent(unref(HeartIcon), { class: "w-6 h-6" }, null, _parent));
      _push(`</div><div class="p-2"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div class="cursor-pointer p-2">`);
      _push(ssrRenderComponent(unref(Bars3Icon), { class: "w-6 h-6" }, null, _parent));
      _push(`</div></div></div></div><div class="bg-white hidden lg:block w-full"><div class="mx-auto max-w-7xl"><div class="flex p-2 items-center justify-between"><div class="flex items-baseline"><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(ssrRenderComponent(_component_RouterLink, {
          key: item.name,
          to: { name: item.to },
          class: [item.to == unref(route).name ? "underline underline-offset-2" : "hover:black", "rounded-sm px-3 py-2 text-sm"],
          "aria-current": item.to == unref(route).name ? "page" : void 0
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><ul class="flex gap-2 text-xs cursor-pointer"><li class="hover:underline">\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430</li><li class="hover:underline">\u0412\u043E\u0437\u0432\u0440\u0430\u0442</li><li class="hover:underline">\u041E\u043F\u043B\u0430\u0442\u0430</li><li class="hover:underline">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</li><li class="hover:underline">\u041F\u0440\u043E\u0434\u0430\u0432\u0430\u0439\u0442\u0435</li></ul></div></div></div></div><div class="h-[76px] lg:h-[131px]"></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_SidebarModal = _sfc_main$3;
  const _component_Header = _sfc_main$1;
  const _component_Errors = _sfc_main$6;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_SidebarModal, null, null, _parent));
  _push(`<div class="relative min-h-full bg-slate-100">`);
  _push(ssrRenderComponent(_component_Header, null, null, _parent));
  _push(`<div class="bg-slate-100">`);
  _push(ssrRenderComponent(_component_Errors, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div><div class="flex flex-col items-center lg:flex-row p-3bg-slate-100 max-w-7xl mx-auto mt-[200px] gap-3 justify-end"><div>\u041E \u043D\u0430\u0441</div><div>\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F</div><div>\u041F\u043E\u043A\u0443\u043F\u043A\u0430</div><div>\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438</div><div>\u0427\u0417\u0412</div><div>\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</div></div><div class="mx-auto items-center flex justify-center max-w-7xl py-5"> 2024 \u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B </div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-DyjF_xBh.mjs.map
