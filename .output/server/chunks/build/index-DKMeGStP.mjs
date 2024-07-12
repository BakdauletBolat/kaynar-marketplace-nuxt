import { u as useAsyncData } from './asyncData-eeSZU22Z.mjs';
import { useSSRContext, defineComponent, watch, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, Transition, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './index-Bji3BtXT.mjs';
import { Menu, MenuButton, MenuItems, MenuItem, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon, Squares2X2Icon, FunnelIcon, ChevronUpIcon } from '@heroicons/vue/20/solid';
import { C as CatalogStorage, g as getProducts } from './storage-BKhyjSh-.mjs';
import { _ as _sfc_main$3 } from './Card-DehtzjUi.mjs';
import { useRoute } from 'vue-router';
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
import '@heroicons/vue/24/outline';
import 'axios';
import 'node:crypto';
import './nuxt-link-Bm57nO93.mjs';
import '@vueuse/core';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "filter-form",
  __ssrInlineRender: true,
  setup(__props) {
    const catalogStorage = CatalogStorage.getInstance();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({
        class: [{
          "pointer-events-none opacity-50": unref(catalogStorage).isProductLoading.value
        }, "lg:px-5 lg:py-2 rounded-sm lg:max-h-[100vh] lg:overflow-scroll"]
      }, _attrs))}><h3 class="sr-only">Categories</h3><!--[-->`);
      ssrRenderList(unref(catalogStorage).filters, (section) => {
        _push(ssrRenderComponent(unref(Disclosure), {
          defaultOpen: section.isOpen,
          as: "div",
          key: section.id,
          class: "py-3"
        }, {
          default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="-my-3 flow-root"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(section.name)}</span><span class="ml-6 flex items-center"${_scopeId2}>`);
                    if (!open) {
                      _push3(ssrRenderComponent(unref(ChevronDownIcon), {
                        class: "h-5 w-5",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(ChevronUpIcon), {
                        class: "h-5 w-5",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                    }
                    _push3(`</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(section.name), 1),
                      createVNode("span", { class: "ml-6 flex items-center" }, [
                        !open ? (openBlock(), createBlock(unref(ChevronDownIcon), {
                          key: 0,
                          class: "h-5 w-5",
                          "aria-hidden": "true"
                        })) : (openBlock(), createBlock(unref(ChevronUpIcon), {
                          key: 1,
                          class: "h-5 w-5",
                          "aria-hidden": "true"
                        }))
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</h3>`);
              _push2(ssrRenderComponent(unref(DisclosurePanel), { class: "mt-5" }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (section.type == "range") {
                      _push3(`<div class="grid gap-1 grid-cols-2 w-full"${_scopeId2}><input class="border text-sm rounded-sm p-2"${ssrRenderAttr("placeholder", section.range.labelFrom)}${_scopeId2}><input class="border text-sm rounded-sm p-2"${ssrRenderAttr("placeholder", section.range.labelTo)}${_scopeId2}></div>`);
                    } else if (section.type == "array") {
                      _push3(`<div class="grid grid-cols-3 gap-4"${_scopeId2}><!--[-->`);
                      ssrRenderList(section.options, (option, optionIdx) => {
                        _push3(`<div class="flex items-center"${_scopeId2}><input${ssrRenderAttr("id", `filter-${section.id}-${optionIdx}`)}${ssrRenderAttr("name", `${section.id}[]`)}${ssrRenderAttr("value", option)} type="checkbox"${ssrIncludeBooleanAttr(option.checked) ? " checked" : ""} class="h-5 w-5 rounded border-gray-300 bg-primary checked:bg-primary focus:ring-bg-primary"${_scopeId2}><label${ssrRenderAttr("for", `filter-${section.id}-${optionIdx}`)} class="ml-3 text-sm text-gray-600"${_scopeId2}>${ssrInterpolate(option)}</label></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<div class="space-y-4"${_scopeId2}><!--[-->`);
                      ssrRenderList(section.options, (option, optionIdx) => {
                        _push3(`<div class="flex items-center"${_scopeId2}><input${ssrRenderAttr("id", `filter-${section.id}-${optionIdx}`)}${ssrRenderAttr("name", `${section.id}[]`)}${ssrRenderAttr("value", option.value)} type="checkbox"${ssrIncludeBooleanAttr(option.checked) ? " checked" : ""} class="h-5 w-5 rounded border-gray-300 bg-primary checked:bg-primary focus:ring-bg-primary"${_scopeId2}><label${ssrRenderAttr("for", `filter-${section.id}-${optionIdx}`)} class="ml-3 text-sm text-gray-600"${_scopeId2}>${ssrInterpolate(option.label)}</label></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    }
                  } else {
                    return [
                      section.type == "range" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid gap-1 grid-cols-2 w-full"
                      }, [
                        createVNode("input", {
                          class: "border text-sm rounded-sm p-2",
                          placeholder: section.range.labelFrom
                        }, null, 8, ["placeholder"]),
                        createVNode("input", {
                          class: "border text-sm rounded-sm p-2",
                          placeholder: section.range.labelTo
                        }, null, 8, ["placeholder"])
                      ])) : section.type == "array" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "grid grid-cols-3 gap-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(section.options, (option, optionIdx) => {
                          return openBlock(), createBlock("div", {
                            key: option.value,
                            class: "flex items-center"
                          }, [
                            createVNode("input", {
                              id: `filter-${section.id}-${optionIdx}`,
                              name: `${section.id}[]`,
                              onClick: ($event) => unref(catalogStorage).updateSelectedValues(section.id, option),
                              value: option,
                              type: "checkbox",
                              checked: option.checked,
                              class: "h-5 w-5 rounded border-gray-300 bg-primary checked:bg-primary focus:ring-bg-primary"
                            }, null, 8, ["id", "name", "onClick", "value", "checked"]),
                            createVNode("label", {
                              for: `filter-${section.id}-${optionIdx}`,
                              class: "ml-3 text-sm text-gray-600"
                            }, toDisplayString(option), 9, ["for"])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 2,
                        class: "space-y-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(section.options, (option, optionIdx) => {
                          return openBlock(), createBlock("div", {
                            key: option.value,
                            class: "flex items-center"
                          }, [
                            createVNode("input", {
                              id: `filter-${section.id}-${optionIdx}`,
                              name: `${section.id}[]`,
                              onClick: ($event) => unref(catalogStorage).updateSelectedValues(section.id, option.value),
                              value: option.value,
                              type: "checkbox",
                              checked: option.checked,
                              class: "h-5 w-5 rounded border-gray-300 bg-primary checked:bg-primary focus:ring-bg-primary"
                            }, null, 8, ["id", "name", "onClick", "value", "checked"]),
                            createVNode("label", {
                              for: `filter-${section.id}-${optionIdx}`,
                              class: "ml-3 text-sm text-gray-600"
                            }, toDisplayString(option.label), 9, ["for"])
                          ]);
                        }), 128))
                      ]))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode("h3", { class: "-my-3 flow-root" }, [
                  createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(section.name), 1),
                      createVNode("span", { class: "ml-6 flex items-center" }, [
                        !open ? (openBlock(), createBlock(unref(ChevronDownIcon), {
                          key: 0,
                          class: "h-5 w-5",
                          "aria-hidden": "true"
                        })) : (openBlock(), createBlock(unref(ChevronUpIcon), {
                          key: 1,
                          class: "h-5 w-5",
                          "aria-hidden": "true"
                        }))
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                createVNode(unref(DisclosurePanel), { class: "mt-5" }, {
                  default: withCtx(() => [
                    section.type == "range" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid gap-1 grid-cols-2 w-full"
                    }, [
                      createVNode("input", {
                        class: "border text-sm rounded-sm p-2",
                        placeholder: section.range.labelFrom
                      }, null, 8, ["placeholder"]),
                      createVNode("input", {
                        class: "border text-sm rounded-sm p-2",
                        placeholder: section.range.labelTo
                      }, null, 8, ["placeholder"])
                    ])) : section.type == "array" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "grid grid-cols-3 gap-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(section.options, (option, optionIdx) => {
                        return openBlock(), createBlock("div", {
                          key: option.value,
                          class: "flex items-center"
                        }, [
                          createVNode("input", {
                            id: `filter-${section.id}-${optionIdx}`,
                            name: `${section.id}[]`,
                            onClick: ($event) => unref(catalogStorage).updateSelectedValues(section.id, option),
                            value: option,
                            type: "checkbox",
                            checked: option.checked,
                            class: "h-5 w-5 rounded border-gray-300 bg-primary checked:bg-primary focus:ring-bg-primary"
                          }, null, 8, ["id", "name", "onClick", "value", "checked"]),
                          createVNode("label", {
                            for: `filter-${section.id}-${optionIdx}`,
                            class: "ml-3 text-sm text-gray-600"
                          }, toDisplayString(option), 9, ["for"])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(section.options, (option, optionIdx) => {
                        return openBlock(), createBlock("div", {
                          key: option.value,
                          class: "flex items-center"
                        }, [
                          createVNode("input", {
                            id: `filter-${section.id}-${optionIdx}`,
                            name: `${section.id}[]`,
                            onClick: ($event) => unref(catalogStorage).updateSelectedValues(section.id, option.value),
                            value: option.value,
                            type: "checkbox",
                            checked: option.checked,
                            class: "h-5 w-5 rounded border-gray-300 bg-primary checked:bg-primary focus:ring-bg-primary"
                          }, null, 8, ["id", "name", "onClick", "value", "checked"]),
                          createVNode("label", {
                            for: `filter-${section.id}-${optionIdx}`,
                            class: "ml-3 text-sm text-gray-600"
                          }, toDisplayString(option.label), 9, ["for"])
                        ]);
                      }), 128))
                    ]))
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/filter-form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b;
    const catalogStorage = CatalogStorage.getInstance();
    const route = useRoute();
    if (route.query.category != null) {
      catalogStorage.selectedValues.value.category = (_a = route.query.category) == null ? void 0 : _a.toString().split(",").map(Number);
    }
    if (route.query.modification != null) {
      catalogStorage.selectedValues.value.modification = (_b = route.query.modification) == null ? void 0 : _b.toString().split(",").map(Number);
    }
    if (route.params.manufactor_id != null) {
      catalogStorage.selectedValues.value.manufactor_id = route.params.manufactor_id.toString();
    }
    const { data, status, refresh } = useAsyncData("catalog-products", () => getProducts(catalogStorage.selectedValues.value));
    watch(catalogStorage.selectedValues.value, (value) => {
      refresh();
    });
    const sortOptions = [
      { name: "\u0421\u0430\u043C\u044B\u0435 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435", href: "#", current: true },
      { name: "\u041B\u0443\u0447\u0448\u0438\u0439 \u0440\u0435\u0439\u0442\u0438\u043D\u0433", href: "#", current: false },
      { name: "\u041D\u043E\u0432\u0438\u043D\u043A\u0438", href: "#", current: false },
      { name: "\u0426\u0435\u043D\u0430: \u043F\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430\u043D\u0438\u044E", href: "#", current: false },
      { name: "\u0426\u0435\u043D\u0430: \u043F\u043E \u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E", href: "#", current: false }
    ];
    const mobileFiltersOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        title: "\u0424\u0438\u043B\u044C\u0442\u0440",
        modelValue: mobileFiltersOpen.value,
        "onUpdate:modelValue": ($event) => mobileFiltersOpen.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<main class="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8"><div class="flex p-4 items-baseline justify-between"><h1 class="text-xl font-bold tracking-tight text-gray-900">\u041A\u0430\u0442\u0430\u043B\u043E\u0433</h1><div class="flex items-center">`);
      _push(ssrRenderComponent(unref(Menu), {
        as: "div",
        class: "relative inline-block text-left"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MenuButton), { class: "group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` \u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430 `);
                  _push3(ssrRenderComponent(unref(ChevronDownIcon), {
                    class: "-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" \u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430 "),
                    createVNode(unref(ChevronDownIcon), {
                      class: "-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
                      "aria-hidden": "true"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(MenuItems), { class: "absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-1"${_scopeId2}><!--[-->`);
                  ssrRenderList(sortOptions, (option) => {
                    _push3(ssrRenderComponent(unref(MenuItem), {
                      key: option.name
                    }, {
                      default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<a${ssrRenderAttr("href", option.href)} class="${ssrRenderClass([option.current ? "font-medium text-gray-900" : "text-gray-500", active ? "bg-gray-100" : "", "block px-4 py-2 text-sm"])}"${_scopeId3}>${ssrInterpolate(option.name)}</a>`);
                        } else {
                          return [
                            createVNode("a", {
                              href: option.href,
                              class: [option.current ? "font-medium text-gray-900" : "text-gray-500", active ? "bg-gray-100" : "", "block px-4 py-2 text-sm"]
                            }, toDisplayString(option.name), 11, ["href"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "py-1" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(sortOptions, (option) => {
                        return createVNode(unref(MenuItem), {
                          key: option.name
                        }, {
                          default: withCtx(({ active }) => [
                            createVNode("a", {
                              href: option.href,
                              class: [option.current ? "font-medium text-gray-900" : "text-gray-500", active ? "bg-gray-100" : "", "block px-4 py-2 text-sm"]
                            }, toDisplayString(option.name), 11, ["href"])
                          ]),
                          _: 2
                        }, 1024);
                      }), 64))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", null, [
                createVNode(unref(MenuButton), { class: "group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" }, {
                  default: withCtx(() => [
                    createTextVNode(" \u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430 "),
                    createVNode(unref(ChevronDownIcon), {
                      class: "-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
                      "aria-hidden": "true"
                    })
                  ]),
                  _: 1
                })
              ]),
              createVNode(Transition, {
                "enter-active-class": "transition ease-out duration-100",
                "enter-from-class": "transform opacity-0 scale-95",
                "enter-to-class": "transform opacity-100 scale-100",
                "leave-active-class": "transition ease-in duration-75",
                "leave-from-class": "transform opacity-100 scale-100",
                "leave-to-class": "transform opacity-0 scale-95"
              }, {
                default: withCtx(() => [
                  createVNode(unref(MenuItems), { class: "absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "py-1" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(sortOptions, (option) => {
                          return createVNode(unref(MenuItem), {
                            key: option.name
                          }, {
                            default: withCtx(({ active }) => [
                              createVNode("a", {
                                href: option.href,
                                class: [option.current ? "font-medium text-gray-900" : "text-gray-500", active ? "bg-gray-100" : "", "block px-4 py-2 text-sm"]
                              }, toDisplayString(option.name), 11, ["href"])
                            ]),
                            _: 2
                          }, 1024);
                        }), 64))
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="button" class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"><span class="sr-only">View grid</span>`);
      _push(ssrRenderComponent(unref(Squares2X2Icon), {
        class: "h-5 w-5",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</button><button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"><span class="sr-only">Filters</span>`);
      _push(ssrRenderComponent(unref(FunnelIcon), {
        class: "h-5 w-5",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</button></div></div><section aria-labelledby="products-heading" class="pb-24"><div class="grid grid-cols-1 relative gap-3 lg:mt-3 items-start lg:grid-cols-[350px_1fr]"><div class="">`);
      _push(ssrRenderComponent(_sfc_main$1, { class: "sticky top-20 hidden bg-white rounded-lg lg:block" }, null, _parent));
      _push(`</div>`);
      if (unref(data) != null) {
        _push(`<div class="${ssrRenderClass([{
          "opacity-40": unref(status) == "pending"
        }, "relative grid md:px-0 grid-cols-2 gap-1 md:gap-3"])}"><!--[-->`);
        ssrRenderList(unref(data).results, (item) => {
          _push(ssrRenderComponent(_sfc_main$3, { item }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div> \u0417\u0430\u043F\u0447\u0430\u0441\u0442\u0435\u0439 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E </div>`);
      }
      _push(`</div></section></main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DKMeGStP.mjs.map
