import { defineComponent, mergeModels, useModel, unref, mergeProps, withCtx, createVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { TransitionRoot, Dialog, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    title: {}
  }, {
    "modelValue": { type: Boolean },
    "modelModifiers": {}
  }),
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
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full h-full items-end md:items-center justify-end text-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "translate-y-[500px] md:translate-y-0 md:translate-x-[500px]",
                    "enter-to": "translate-y-0 md:translate-x-0",
                    leave: "duration-200 ease-in",
                    "leave-from": "translate-y-0 md:translate-x-0",
                    "leave-to": "translate-y-[500px] md:translate-y-0 md:translate-x-[500px]"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "w-[500px] transform overflow-scroll rounded-md md:rounded-none bg-white max-h-[80vh] md:max-h-full md:h-full p-6 text-left shadow-xl transition-all" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(DialogTitle), { as: "template" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="flex items-center justify-between"${_scopeId5}><h2 class="text-lg font-medium text-gray-900"${_scopeId5}>\u0424\u0438\u043B\u044C\u0442\u0440</h2><button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"${_scopeId5}><span class="sr-only"${_scopeId5}>Close menu</span>`);
                                    _push6(ssrRenderComponent(unref(XMarkIcon), {
                                      class: "h-6 w-6",
                                      "aria-hidden": "true"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</button></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex items-center justify-between" }, [
                                        createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "\u0424\u0438\u043B\u044C\u0442\u0440"),
                                        createVNode("button", {
                                          type: "button",
                                          class: "-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400",
                                          onClick: ($event) => model.value = false
                                        }, [
                                          createVNode("span", { class: "sr-only" }, "Close menu"),
                                          createVNode(unref(XMarkIcon), {
                                            class: "h-6 w-6",
                                            "aria-hidden": "true"
                                          })
                                        ], 8, ["onClick"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="mt-2"${_scopeId4}>`);
                              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push5, _parent5, _scopeId4);
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode(unref(DialogTitle), { as: "template" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center justify-between" }, [
                                      createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "\u0424\u0438\u043B\u044C\u0442\u0440"),
                                      createVNode("button", {
                                        type: "button",
                                        class: "-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400",
                                        onClick: ($event) => model.value = false
                                      }, [
                                        createVNode("span", { class: "sr-only" }, "Close menu"),
                                        createVNode(unref(XMarkIcon), {
                                          class: "h-6 w-6",
                                          "aria-hidden": "true"
                                        })
                                      ], 8, ["onClick"])
                                    ])
                                  ]),
                                  _: 1
                                }),
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
                          createVNode(unref(DialogPanel), { class: "w-[500px] transform overflow-scroll rounded-md md:rounded-none bg-white max-h-[80vh] md:max-h-full md:h-full p-6 text-left shadow-xl transition-all" }, {
                            default: withCtx(() => [
                              createVNode(unref(DialogTitle), { as: "template" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center justify-between" }, [
                                    createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "\u0424\u0438\u043B\u044C\u0442\u0440"),
                                    createVNode("button", {
                                      type: "button",
                                      class: "-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400",
                                      onClick: ($event) => model.value = false
                                    }, [
                                      createVNode("span", { class: "sr-only" }, "Close menu"),
                                      createVNode(unref(XMarkIcon), {
                                        class: "h-6 w-6",
                                        "aria-hidden": "true"
                                      })
                                    ], 8, ["onClick"])
                                  ])
                                ]),
                                _: 1
                              }),
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
                      createVNode("div", { class: "flex min-h-full h-full items-end md:items-center justify-end text-center" }, [
                        createVNode(unref(TransitionChild), {
                          as: "template",
                          enter: "duration-300 ease-out",
                          "enter-from": "translate-y-[500px] md:translate-y-0 md:translate-x-[500px]",
                          "enter-to": "translate-y-0 md:translate-x-0",
                          leave: "duration-200 ease-in",
                          "leave-from": "translate-y-0 md:translate-x-0",
                          "leave-to": "translate-y-[500px] md:translate-y-0 md:translate-x-[500px]"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DialogPanel), { class: "w-[500px] transform overflow-scroll rounded-md md:rounded-none bg-white max-h-[80vh] md:max-h-full md:h-full p-6 text-left shadow-xl transition-all" }, {
                              default: withCtx(() => [
                                createVNode(unref(DialogTitle), { as: "template" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center justify-between" }, [
                                      createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "\u0424\u0438\u043B\u044C\u0442\u0440"),
                                      createVNode("button", {
                                        type: "button",
                                        class: "-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400",
                                        onClick: ($event) => model.value = false
                                      }, [
                                        createVNode("span", { class: "sr-only" }, "Close menu"),
                                        createVNode(unref(XMarkIcon), {
                                          class: "h-6 w-6",
                                          "aria-hidden": "true"
                                        })
                                      ], 8, ["onClick"])
                                    ])
                                  ]),
                                  _: 1
                                }),
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
                    createVNode("div", { class: "flex min-h-full h-full items-end md:items-center justify-end text-center" }, [
                      createVNode(unref(TransitionChild), {
                        as: "template",
                        enter: "duration-300 ease-out",
                        "enter-from": "translate-y-[500px] md:translate-y-0 md:translate-x-[500px]",
                        "enter-to": "translate-y-0 md:translate-x-0",
                        leave: "duration-200 ease-in",
                        "leave-from": "translate-y-0 md:translate-x-0",
                        "leave-to": "translate-y-[500px] md:translate-y-0 md:translate-x-[500px]"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DialogPanel), { class: "w-[500px] transform overflow-scroll rounded-md md:rounded-none bg-white max-h-[80vh] md:max-h-full md:h-full p-6 text-left shadow-xl transition-all" }, {
                            default: withCtx(() => [
                              createVNode(unref(DialogTitle), { as: "template" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center justify-between" }, [
                                    createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "\u0424\u0438\u043B\u044C\u0442\u0440"),
                                    createVNode("button", {
                                      type: "button",
                                      class: "-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400",
                                      onClick: ($event) => model.value = false
                                    }, [
                                      createVNode("span", { class: "sr-only" }, "Close menu"),
                                      createVNode(unref(XMarkIcon), {
                                        class: "h-6 w-6",
                                        "aria-hidden": "true"
                                      })
                                    ], 8, ["onClick"])
                                  ])
                                ]),
                                _: 1
                              }),
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dialog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=index-Bji3BtXT.mjs.map
