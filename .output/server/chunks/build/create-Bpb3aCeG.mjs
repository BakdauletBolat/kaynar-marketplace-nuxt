import { defineComponent, ref, resolveComponent, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { TabGroup, TabList, Tab, TabPanels, TabPanel, RadioGroup, RadioGroupOption } from '@headlessui/vue';
import { MapIcon, TruckIcon, BanknotesIcon, CheckBadgeIcon, CreditCardIcon } from '@heroicons/vue/24/outline';
import { useForm } from 'vee-validate';
import { _ as _sfc_main$1 } from './user-card-FifElaHX.mjs';
import { C as CardStorage } from './storage-DSfldfNp.mjs';
import * as yup from 'yup';
import { a as axiosInstance } from './index-C5IDfPQf.mjs';
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
import 'vue-router';
import '@css-render/vue3-ssr';
import 'vooks';
import 'lodash-es';
import 'css-render';
import 'node:crypto';
import 'axios';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const order = ref(null);
    const plan = ref("2");
    const pay = ref("1");
    const cardStorage = CardStorage.getInstance();
    const selectedIndex = ref(0);
    const orderCreateLoading = ref(false);
    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        name: yup.string().required("\u0418\u043C\u044F \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E"),
        surname: yup.string().required("\u0424\u0430\u043C\u0438\u043B\u0438\u044F \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E"),
        address: yup.string().required("\u0410\u0434\u0440\u0435\u0441 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E"),
        house: yup.string(),
        flat: yup.string(),
        mail_index: yup.string().required("\u041F\u043E\u0447\u0442\u043E\u0432\u043E\u0439 \u0438\u043D\u0434\u0435\u043A\u0441 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E"),
        country: yup.string(),
        city: yup.string().required("\u0413\u043E\u0440\u043E\u0434 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E"),
        email: yup.string().required("\u041F\u043E\u0447\u0442\u0430 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E").email("\u041F\u043E\u0447\u0442\u0430 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439"),
        phone: yup.string().required("\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E")
      })
    });
    function changeTab(index) {
      (void 0).scrollTo({
        top: 0
      });
      selectedIndex.value = index;
    }
    function createOrder() {
      const body = {
        "warehouse_id": 2,
        "payment_type_id": pay.value,
        "delivery_type_id": plan.value,
        "comment": null,
        "client": "\u0413\u043E\u0441\u0442\u044C",
        "goods": cardStorage.goods.value.map((item) => {
          return {
            "product_id": item.id,
            "quantity": item.quantity,
            "quality_id": 1
          };
        })
      };
      orderCreateLoading.value = true;
      axiosInstance.post("/api/orders/", body).then((res) => {
        selectedIndex.value = 3;
        order.value = res.data;
        cardStorage.resetCard();
      }).catch((e) => {
        console.log(e);
      }).finally(() => {
        orderCreateLoading.value = false;
      });
    }
    const onSubmit = handleSubmit((values) => {
      console.log(values);
      changeTab(1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = resolveComponent("Input");
      const _component_Button = resolveComponent("Button");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container px-4 mx-auto p-3" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(TabGroup), {
        "selected-index": selectedIndex.value,
        onChange: changeTab
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabList), { class: "grid grid-cols-4 p-3 justify-center gap-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Tab), {
                    disabled: order.value,
                    as: "template"
                  }, {
                    default: withCtx(({ selected }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<button class="${ssrRenderClass([{ "!bg-gray-400 opacity-50": order.value, "focus:outline-none !bg-primary -translate-y-1": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(MapIcon), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}>\u0410\u0434\u0440\u0435\u0441</div></button>`);
                      } else {
                        return [
                          createVNode("button", {
                            class: [{ "!bg-gray-400 opacity-50": order.value, "focus:outline-none !bg-primary -translate-y-1": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"]
                          }, [
                            createVNode(unref(MapIcon), { class: "h-5 w-5" }),
                            createVNode("div", null, "\u0410\u0434\u0440\u0435\u0441")
                          ], 2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Tab), {
                    disabled: order.value,
                    as: "template"
                  }, {
                    default: withCtx(({ selected }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<button class="${ssrRenderClass([{ "!bg-gray-400 opacity-50": order.value, "focus:outline-none -translate-y-1 !bg-primary": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(TruckIcon), { class: "w-5 h-5" }, null, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}>\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430</div></button>`);
                      } else {
                        return [
                          createVNode("button", {
                            class: [{ "!bg-gray-400 opacity-50": order.value, "focus:outline-none -translate-y-1 !bg-primary": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"]
                          }, [
                            createVNode(unref(TruckIcon), { class: "w-5 h-5" }),
                            createVNode("div", null, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430")
                          ], 2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Tab), {
                    disabled: order.value,
                    as: "template"
                  }, {
                    default: withCtx(({ selected }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<button class="${ssrRenderClass([{ "!bg-gray-400 opacity-50": order.value, "focus:outline-none -translate-y-1 !bg-primary": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(BanknotesIcon), { class: "w-5 h-5" }, null, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}>\u041E\u043F\u043B\u0430\u0442\u0430</div></button>`);
                      } else {
                        return [
                          createVNode("button", {
                            class: [{ "!bg-gray-400 opacity-50": order.value, "focus:outline-none -translate-y-1 !bg-primary": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"]
                          }, [
                            createVNode(unref(BanknotesIcon), { class: "w-5 h-5" }),
                            createVNode("div", null, "\u041E\u043F\u043B\u0430\u0442\u0430")
                          ], 2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Tab), {
                    disabled: order.value,
                    as: "template"
                  }, {
                    default: withCtx(({ selected }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<button class="${ssrRenderClass([{ "focus:outline-none -translate-y-1 !bg-primary": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(CheckBadgeIcon), { class: "w-5 h-5" }, null, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}>\u0421\u043F\u0430\u0441\u0438\u0431\u043E!</div></button>`);
                      } else {
                        return [
                          createVNode("button", {
                            class: [{ "focus:outline-none -translate-y-1 !bg-primary": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"]
                          }, [
                            createVNode(unref(CheckBadgeIcon), { class: "w-5 h-5" }),
                            createVNode("div", null, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E!")
                          ], 2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Tab), {
                      disabled: order.value,
                      as: "template"
                    }, {
                      default: withCtx(({ selected }) => [
                        createVNode("button", {
                          class: [{ "!bg-gray-400 opacity-50": order.value, "focus:outline-none !bg-primary -translate-y-1": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"]
                        }, [
                          createVNode(unref(MapIcon), { class: "h-5 w-5" }),
                          createVNode("div", null, "\u0410\u0434\u0440\u0435\u0441")
                        ], 2)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(Tab), {
                      disabled: order.value,
                      as: "template"
                    }, {
                      default: withCtx(({ selected }) => [
                        createVNode("button", {
                          class: [{ "!bg-gray-400 opacity-50": order.value, "focus:outline-none -translate-y-1 !bg-primary": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"]
                        }, [
                          createVNode(unref(TruckIcon), { class: "w-5 h-5" }),
                          createVNode("div", null, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430")
                        ], 2)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(Tab), {
                      disabled: order.value,
                      as: "template"
                    }, {
                      default: withCtx(({ selected }) => [
                        createVNode("button", {
                          class: [{ "!bg-gray-400 opacity-50": order.value, "focus:outline-none -translate-y-1 !bg-primary": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"]
                        }, [
                          createVNode(unref(BanknotesIcon), { class: "w-5 h-5" }),
                          createVNode("div", null, "\u041E\u043F\u043B\u0430\u0442\u0430")
                        ], 2)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(Tab), {
                      disabled: order.value,
                      as: "template"
                    }, {
                      default: withCtx(({ selected }) => [
                        createVNode("button", {
                          class: [{ "focus:outline-none -translate-y-1 !bg-primary": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"]
                        }, [
                          createVNode(unref(CheckBadgeIcon), { class: "w-5 h-5" }),
                          createVNode("div", null, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E!")
                        ], 2)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="grid lg:grid-cols-[1fr_400px] gap-5"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(TabPanels), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TabPanel), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<form class="flex rounded-lg p-4 bg-white flex-col gap-3"${_scopeId3}><div class="text-2xl font-bold"${_scopeId3}>\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438</div><div class="flex flex-col lg:flex-row gap-3"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Input, {
                          name: "name",
                          placeholder: "\u0418\u043C\u044F"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Input, {
                          name: "surname",
                          placeholder: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="flex flex-col lg:flex-row gap-3"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Input, {
                          name: "address",
                          placeholder: "\u0410\u0434\u0440\u0435\u0441"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="flex gap-3"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Input, {
                          name: "house",
                          placeholder: "\u0414\u043E\u043C"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Input, {
                          name: "flat",
                          placeholder: "\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div><div class="flex flex-col lg:flex-row gap-3"${_scopeId3}><div class="flex gap-3"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Input, {
                          name: "mail_index",
                          placeholder: "\u041F\u043E\u0447\u0442\u043E\u0432\u044B\u0439 \u0438\u043D\u0434\u0435\u043A\u0441"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Input, {
                          name: "country",
                          placeholder: "\u0421\u0442\u0440\u0430\u043D\u0430"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(_component_Input, {
                          name: "city",
                          placeholder: "\u0413\u043E\u0440\u043E\u0434"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="flex flex-col lg:flex-row gap-3"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Input, {
                          name: "email",
                          placeholder: "Email"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Input, {
                          name: "phone",
                          placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><button class="mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg"${_scopeId3}>\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C</button></form>`);
                      } else {
                        return [
                          createVNode("form", {
                            onSubmit: unref(onSubmit),
                            class: "flex rounded-lg p-4 bg-white flex-col gap-3"
                          }, [
                            createVNode("div", { class: "text-2xl font-bold" }, "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"),
                            createVNode("div", { class: "flex flex-col lg:flex-row gap-3" }, [
                              createVNode(_component_Input, {
                                name: "name",
                                placeholder: "\u0418\u043C\u044F"
                              }),
                              createVNode(_component_Input, {
                                name: "surname",
                                placeholder: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F"
                              })
                            ]),
                            createVNode("div", { class: "flex flex-col lg:flex-row gap-3" }, [
                              createVNode(_component_Input, {
                                name: "address",
                                placeholder: "\u0410\u0434\u0440\u0435\u0441"
                              }),
                              createVNode("div", { class: "flex gap-3" }, [
                                createVNode(_component_Input, {
                                  name: "house",
                                  placeholder: "\u0414\u043E\u043C"
                                }),
                                createVNode(_component_Input, {
                                  name: "flat",
                                  placeholder: "\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430"
                                })
                              ])
                            ]),
                            createVNode("div", { class: "flex flex-col lg:flex-row gap-3" }, [
                              createVNode("div", { class: "flex gap-3" }, [
                                createVNode(_component_Input, {
                                  name: "mail_index",
                                  placeholder: "\u041F\u043E\u0447\u0442\u043E\u0432\u044B\u0439 \u0438\u043D\u0434\u0435\u043A\u0441"
                                }),
                                createVNode(_component_Input, {
                                  name: "country",
                                  placeholder: "\u0421\u0442\u0440\u0430\u043D\u0430"
                                })
                              ]),
                              createVNode(_component_Input, {
                                name: "city",
                                placeholder: "\u0413\u043E\u0440\u043E\u0434"
                              })
                            ]),
                            createVNode("div", { class: "flex flex-col lg:flex-row gap-3" }, [
                              createVNode(_component_Input, {
                                name: "email",
                                placeholder: "Email"
                              }),
                              createVNode(_component_Input, {
                                name: "phone",
                                placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"
                              })
                            ]),
                            createVNode("button", { class: "mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg" }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C")
                          ], 40, ["onSubmit"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabPanel), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex p-4 rounded-lg bg-white flex-col gap-3"${_scopeId3}><div class="text-2xl font-bold"${_scopeId3}>\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430</div>`);
                        _push4(ssrRenderComponent(unref(RadioGroup), {
                          modelValue: plan.value,
                          "onUpdate:modelValue": ($event) => plan.value = $event,
                          class: "flex flex-col gap-3"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(RadioGroupOption), { value: "1" }, {
                                default: withCtx(({ checked }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="${ssrRenderClass([{
                                      "bg-slate-100": checked
                                    }, "flex justify-between cursor-pointer p-3"])}"${_scopeId5}><div class="flex flex-col"${_scopeId5}><h3 class="font-bold text-lg"${_scopeId5}>LP express</h3><p class="text-gray-500 font-light"${_scopeId5}>\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043C\u0435\u0441\u044F\u0446\u0435, 2024 03 04</p></div><div${_scopeId5}><div${_scopeId5}>42,40 \u20AC</div></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", {
                                        class: ["flex justify-between cursor-pointer p-3", {
                                          "bg-slate-100": checked
                                        }]
                                      }, [
                                        createVNode("div", { class: "flex flex-col" }, [
                                          createVNode("h3", { class: "font-bold text-lg" }, "LP express"),
                                          createVNode("p", { class: "text-gray-500 font-light" }, "\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043C\u0435\u0441\u044F\u0446\u0435, 2024 03 04")
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("div", null, "42,40 \u20AC")
                                        ])
                                      ], 2)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(RadioGroupOption), { value: "2" }, {
                                default: withCtx(({ checked }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="${ssrRenderClass([{
                                      "bg-slate-100": checked
                                    }, "flex justify-between cursor-pointer p-3"])}"${_scopeId5}><div class="flex flex-col"${_scopeId5}><h3 class="font-bold text-lg"${_scopeId5}>\u0417\u0430\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0430\u043C</h3><p class="text-gray-500 font-light"${_scopeId5}></p></div><div${_scopeId5}><div${_scopeId5}>42,40 \u20AC</div></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", {
                                        class: ["flex justify-between cursor-pointer p-3", {
                                          "bg-slate-100": checked
                                        }]
                                      }, [
                                        createVNode("div", { class: "flex flex-col" }, [
                                          createVNode("h3", { class: "font-bold text-lg" }, "\u0417\u0430\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0430\u043C"),
                                          createVNode("p", { class: "text-gray-500 font-light" })
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("div", null, "42,40 \u20AC")
                                        ])
                                      ], 2)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(RadioGroupOption), { value: "3" }, {
                                default: withCtx(({ checked }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="${ssrRenderClass([{
                                      "bg-slate-100": checked
                                    }, "flex justify-between cursor-pointer p-3"])}"${_scopeId5}><div class="flex flex-col"${_scopeId5}><h3 class="font-bold text-lg"${_scopeId5}>FedEx Plus</h3><p class="text-gray-500 font-light"${_scopeId5}>\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 2024 03 04</p></div><div${_scopeId5}><div${_scopeId5}>42,40 \u20AC</div></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", {
                                        class: ["flex justify-between cursor-pointer p-3", {
                                          "bg-slate-100": checked
                                        }]
                                      }, [
                                        createVNode("div", { class: "flex flex-col" }, [
                                          createVNode("h3", { class: "font-bold text-lg" }, "FedEx Plus"),
                                          createVNode("p", { class: "text-gray-500 font-light" }, "\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 2024 03 04")
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("div", null, "42,40 \u20AC")
                                        ])
                                      ], 2)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(RadioGroupOption), { value: "1" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "font-bold text-lg" }, "LP express"),
                                        createVNode("p", { class: "text-gray-500 font-light" }, "\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043C\u0435\u0441\u044F\u0446\u0435, 2024 03 04")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, "42,40 \u20AC")
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(RadioGroupOption), { value: "2" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "font-bold text-lg" }, "\u0417\u0430\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0430\u043C"),
                                        createVNode("p", { class: "text-gray-500 font-light" })
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, "42,40 \u20AC")
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(RadioGroupOption), { value: "3" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "font-bold text-lg" }, "FedEx Plus"),
                                        createVNode("p", { class: "text-gray-500 font-light" }, "\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 2024 03 04")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, "42,40 \u20AC")
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<button class="mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg"${_scopeId3}>\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C</button></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex p-4 rounded-lg bg-white flex-col gap-3" }, [
                            createVNode("div", { class: "text-2xl font-bold" }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430"),
                            createVNode(unref(RadioGroup), {
                              modelValue: plan.value,
                              "onUpdate:modelValue": ($event) => plan.value = $event,
                              class: "flex flex-col gap-3"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(RadioGroupOption), { value: "1" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "font-bold text-lg" }, "LP express"),
                                        createVNode("p", { class: "text-gray-500 font-light" }, "\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043C\u0435\u0441\u044F\u0446\u0435, 2024 03 04")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, "42,40 \u20AC")
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(RadioGroupOption), { value: "2" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "font-bold text-lg" }, "\u0417\u0430\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0430\u043C"),
                                        createVNode("p", { class: "text-gray-500 font-light" })
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, "42,40 \u20AC")
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(RadioGroupOption), { value: "3" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "font-bold text-lg" }, "FedEx Plus"),
                                        createVNode("p", { class: "text-gray-500 font-light" }, "\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 2024 03 04")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, "42,40 \u20AC")
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("button", {
                              onClick: ($event) => changeTab(2),
                              class: "mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg"
                            }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C", 8, ["onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabPanel), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex rounded-lg p-4 bg-white flex-col gap-3"${_scopeId3}><div class="text-2xl font-bold"${_scopeId3}>\u041E\u043F\u043B\u0430\u0442\u0430</div>`);
                        _push4(ssrRenderComponent(unref(RadioGroup), {
                          modelValue: pay.value,
                          "onUpdate:modelValue": ($event) => pay.value = $event,
                          class: "flex flex-col gap-3"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(RadioGroupOption), { value: "1" }, {
                                default: withCtx(({ checked }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="${ssrRenderClass([{
                                      "bg-slate-100": checked
                                    }, "flex justify-between cursor-pointer p-3"])}"${_scopeId5}><div class="flex flex-col"${_scopeId5}><h3 class="text-lg"${_scopeId5}>\u0411\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0430\u044F \u043A\u0430\u0440\u0442\u0430</h3></div><div${_scopeId5}><div${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(CreditCardIcon), { class: "w-5 h-5" }, null, _parent6, _scopeId5));
                                    _push6(`</div></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", {
                                        class: ["flex justify-between cursor-pointer p-3", {
                                          "bg-slate-100": checked
                                        }]
                                      }, [
                                        createVNode("div", { class: "flex flex-col" }, [
                                          createVNode("h3", { class: "text-lg" }, "\u0411\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0430\u044F \u043A\u0430\u0440\u0442\u0430")
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("div", null, [
                                            createVNode(unref(CreditCardIcon), { class: "w-5 h-5" })
                                          ])
                                        ])
                                      ], 2)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(RadioGroupOption), { value: "2" }, {
                                default: withCtx(({ checked }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="${ssrRenderClass([{
                                      "bg-slate-100": checked
                                    }, "flex justify-between cursor-pointer p-3"])}"${_scopeId5}><div class="flex flex-col"${_scopeId5}><h3 class="text-lg"${_scopeId5}>\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435</h3></div><div${_scopeId5}><div${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(BanknotesIcon), { class: "w-5 h-5" }, null, _parent6, _scopeId5));
                                    _push6(`</div></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", {
                                        class: ["flex justify-between cursor-pointer p-3", {
                                          "bg-slate-100": checked
                                        }]
                                      }, [
                                        createVNode("div", { class: "flex flex-col" }, [
                                          createVNode("h3", { class: "text-lg" }, "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435")
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("div", null, [
                                            createVNode(unref(BanknotesIcon), { class: "w-5 h-5" })
                                          ])
                                        ])
                                      ], 2)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(RadioGroupOption), { value: "1" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "text-lg" }, "\u0411\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0430\u044F \u043A\u0430\u0440\u0442\u0430")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, [
                                          createVNode(unref(CreditCardIcon), { class: "w-5 h-5" })
                                        ])
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(RadioGroupOption), { value: "2" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "text-lg" }, "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, [
                                          createVNode(unref(BanknotesIcon), { class: "w-5 h-5" })
                                        ])
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Button, {
                          isLoading: orderCreateLoading.value,
                          onClick: createOrder,
                          name: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex rounded-lg p-4 bg-white flex-col gap-3" }, [
                            createVNode("div", { class: "text-2xl font-bold" }, "\u041E\u043F\u043B\u0430\u0442\u0430"),
                            createVNode(unref(RadioGroup), {
                              modelValue: pay.value,
                              "onUpdate:modelValue": ($event) => pay.value = $event,
                              class: "flex flex-col gap-3"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(RadioGroupOption), { value: "1" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "text-lg" }, "\u0411\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0430\u044F \u043A\u0430\u0440\u0442\u0430")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, [
                                          createVNode(unref(CreditCardIcon), { class: "w-5 h-5" })
                                        ])
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(RadioGroupOption), { value: "2" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "text-lg" }, "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, [
                                          createVNode(unref(BanknotesIcon), { class: "w-5 h-5" })
                                        ])
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_Button, {
                              isLoading: orderCreateLoading.value,
                              onClick: createOrder,
                              name: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
                            }, null, 8, ["isLoading"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabPanel), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (order.value) {
                          _push4(`<div class="flex p-4 bg-white rounded-lg flex-col gap-3"${_scopeId3}><h2${_scopeId3}>\u0421\u043F\u0430\u0441\u0438\u0431\u043E #${ssrInterpolate(order.value.id)} \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437 \u0441\u043E\u0437\u0434\u0430\u043D !</h2><p${_scopeId3}>\u0412 \u0441\u043A\u043E\u0440\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0432\u0430\u043C \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442 \u043D\u0430\u0448 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440</p><p${_scopeId3}>\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437! \u041D\u0430\u0448 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0441\u043A\u043E\u0440\u043E \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438.</p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          order.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex p-4 bg-white rounded-lg flex-col gap-3"
                          }, [
                            createVNode("h2", null, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E #" + toDisplayString(order.value.id) + " \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437 \u0441\u043E\u0437\u0434\u0430\u043D !", 1),
                            createVNode("p", null, "\u0412 \u0441\u043A\u043E\u0440\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0432\u0430\u043C \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442 \u043D\u0430\u0448 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440"),
                            createVNode("p", null, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437! \u041D\u0430\u0448 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0441\u043A\u043E\u0440\u043E \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438.")
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TabPanel), null, {
                      default: withCtx(() => [
                        createVNode("form", {
                          onSubmit: unref(onSubmit),
                          class: "flex rounded-lg p-4 bg-white flex-col gap-3"
                        }, [
                          createVNode("div", { class: "text-2xl font-bold" }, "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"),
                          createVNode("div", { class: "flex flex-col lg:flex-row gap-3" }, [
                            createVNode(_component_Input, {
                              name: "name",
                              placeholder: "\u0418\u043C\u044F"
                            }),
                            createVNode(_component_Input, {
                              name: "surname",
                              placeholder: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F"
                            })
                          ]),
                          createVNode("div", { class: "flex flex-col lg:flex-row gap-3" }, [
                            createVNode(_component_Input, {
                              name: "address",
                              placeholder: "\u0410\u0434\u0440\u0435\u0441"
                            }),
                            createVNode("div", { class: "flex gap-3" }, [
                              createVNode(_component_Input, {
                                name: "house",
                                placeholder: "\u0414\u043E\u043C"
                              }),
                              createVNode(_component_Input, {
                                name: "flat",
                                placeholder: "\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430"
                              })
                            ])
                          ]),
                          createVNode("div", { class: "flex flex-col lg:flex-row gap-3" }, [
                            createVNode("div", { class: "flex gap-3" }, [
                              createVNode(_component_Input, {
                                name: "mail_index",
                                placeholder: "\u041F\u043E\u0447\u0442\u043E\u0432\u044B\u0439 \u0438\u043D\u0434\u0435\u043A\u0441"
                              }),
                              createVNode(_component_Input, {
                                name: "country",
                                placeholder: "\u0421\u0442\u0440\u0430\u043D\u0430"
                              })
                            ]),
                            createVNode(_component_Input, {
                              name: "city",
                              placeholder: "\u0413\u043E\u0440\u043E\u0434"
                            })
                          ]),
                          createVNode("div", { class: "flex flex-col lg:flex-row gap-3" }, [
                            createVNode(_component_Input, {
                              name: "email",
                              placeholder: "Email"
                            }),
                            createVNode(_component_Input, {
                              name: "phone",
                              placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"
                            })
                          ]),
                          createVNode("button", { class: "mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg" }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C")
                        ], 40, ["onSubmit"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabPanel), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex p-4 rounded-lg bg-white flex-col gap-3" }, [
                          createVNode("div", { class: "text-2xl font-bold" }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430"),
                          createVNode(unref(RadioGroup), {
                            modelValue: plan.value,
                            "onUpdate:modelValue": ($event) => plan.value = $event,
                            class: "flex flex-col gap-3"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(RadioGroupOption), { value: "1" }, {
                                default: withCtx(({ checked }) => [
                                  createVNode("div", {
                                    class: ["flex justify-between cursor-pointer p-3", {
                                      "bg-slate-100": checked
                                    }]
                                  }, [
                                    createVNode("div", { class: "flex flex-col" }, [
                                      createVNode("h3", { class: "font-bold text-lg" }, "LP express"),
                                      createVNode("p", { class: "text-gray-500 font-light" }, "\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043C\u0435\u0441\u044F\u0446\u0435, 2024 03 04")
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("div", null, "42,40 \u20AC")
                                    ])
                                  ], 2)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(RadioGroupOption), { value: "2" }, {
                                default: withCtx(({ checked }) => [
                                  createVNode("div", {
                                    class: ["flex justify-between cursor-pointer p-3", {
                                      "bg-slate-100": checked
                                    }]
                                  }, [
                                    createVNode("div", { class: "flex flex-col" }, [
                                      createVNode("h3", { class: "font-bold text-lg" }, "\u0417\u0430\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0430\u043C"),
                                      createVNode("p", { class: "text-gray-500 font-light" })
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("div", null, "42,40 \u20AC")
                                    ])
                                  ], 2)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(RadioGroupOption), { value: "3" }, {
                                default: withCtx(({ checked }) => [
                                  createVNode("div", {
                                    class: ["flex justify-between cursor-pointer p-3", {
                                      "bg-slate-100": checked
                                    }]
                                  }, [
                                    createVNode("div", { class: "flex flex-col" }, [
                                      createVNode("h3", { class: "font-bold text-lg" }, "FedEx Plus"),
                                      createVNode("p", { class: "text-gray-500 font-light" }, "\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 2024 03 04")
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("div", null, "42,40 \u20AC")
                                    ])
                                  ], 2)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("button", {
                            onClick: ($event) => changeTab(2),
                            class: "mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg"
                          }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C", 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabPanel), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex rounded-lg p-4 bg-white flex-col gap-3" }, [
                          createVNode("div", { class: "text-2xl font-bold" }, "\u041E\u043F\u043B\u0430\u0442\u0430"),
                          createVNode(unref(RadioGroup), {
                            modelValue: pay.value,
                            "onUpdate:modelValue": ($event) => pay.value = $event,
                            class: "flex flex-col gap-3"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(RadioGroupOption), { value: "1" }, {
                                default: withCtx(({ checked }) => [
                                  createVNode("div", {
                                    class: ["flex justify-between cursor-pointer p-3", {
                                      "bg-slate-100": checked
                                    }]
                                  }, [
                                    createVNode("div", { class: "flex flex-col" }, [
                                      createVNode("h3", { class: "text-lg" }, "\u0411\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0430\u044F \u043A\u0430\u0440\u0442\u0430")
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("div", null, [
                                        createVNode(unref(CreditCardIcon), { class: "w-5 h-5" })
                                      ])
                                    ])
                                  ], 2)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(RadioGroupOption), { value: "2" }, {
                                default: withCtx(({ checked }) => [
                                  createVNode("div", {
                                    class: ["flex justify-between cursor-pointer p-3", {
                                      "bg-slate-100": checked
                                    }]
                                  }, [
                                    createVNode("div", { class: "flex flex-col" }, [
                                      createVNode("h3", { class: "text-lg" }, "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435")
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("div", null, [
                                        createVNode(unref(BanknotesIcon), { class: "w-5 h-5" })
                                      ])
                                    ])
                                  ], 2)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_Button, {
                            isLoading: orderCreateLoading.value,
                            onClick: createOrder,
                            name: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
                          }, null, 8, ["isLoading"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabPanel), null, {
                      default: withCtx(() => [
                        order.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex p-4 bg-white rounded-lg flex-col gap-3"
                        }, [
                          createVNode("h2", null, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E #" + toDisplayString(order.value.id) + " \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437 \u0441\u043E\u0437\u0434\u0430\u043D !", 1),
                          createVNode("p", null, "\u0412 \u0441\u043A\u043E\u0440\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0432\u0430\u043C \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442 \u043D\u0430\u0448 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440"),
                          createVNode("p", null, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437! \u041D\u0430\u0448 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0441\u043A\u043E\u0440\u043E \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438.")
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-white rounded-lg p-4"${_scopeId}><h2 class="text-xl font-bold"${_scopeId}>\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0437\u0430\u043A\u0430\u0437\u0435</h2>`);
            _push2(ssrRenderComponent(_sfc_main$1, { class: "mt-3" }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(TabList), { class: "grid grid-cols-4 p-3 justify-center gap-2" }, {
                default: withCtx(() => [
                  createVNode(unref(Tab), {
                    disabled: order.value,
                    as: "template"
                  }, {
                    default: withCtx(({ selected }) => [
                      createVNode("button", {
                        class: [{ "!bg-gray-400 opacity-50": order.value, "focus:outline-none !bg-primary -translate-y-1": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"]
                      }, [
                        createVNode(unref(MapIcon), { class: "h-5 w-5" }),
                        createVNode("div", null, "\u0410\u0434\u0440\u0435\u0441")
                      ], 2)
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(unref(Tab), {
                    disabled: order.value,
                    as: "template"
                  }, {
                    default: withCtx(({ selected }) => [
                      createVNode("button", {
                        class: [{ "!bg-gray-400 opacity-50": order.value, "focus:outline-none -translate-y-1 !bg-primary": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"]
                      }, [
                        createVNode(unref(TruckIcon), { class: "w-5 h-5" }),
                        createVNode("div", null, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430")
                      ], 2)
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(unref(Tab), {
                    disabled: order.value,
                    as: "template"
                  }, {
                    default: withCtx(({ selected }) => [
                      createVNode("button", {
                        class: [{ "!bg-gray-400 opacity-50": order.value, "focus:outline-none -translate-y-1 !bg-primary": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"]
                      }, [
                        createVNode(unref(BanknotesIcon), { class: "w-5 h-5" }),
                        createVNode("div", null, "\u041E\u043F\u043B\u0430\u0442\u0430")
                      ], 2)
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(unref(Tab), {
                    disabled: order.value,
                    as: "template"
                  }, {
                    default: withCtx(({ selected }) => [
                      createVNode("button", {
                        class: [{ "focus:outline-none -translate-y-1 !bg-primary": selected }, "bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg"]
                      }, [
                        createVNode(unref(CheckBadgeIcon), { class: "w-5 h-5" }),
                        createVNode("div", null, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E!")
                      ], 2)
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }),
              createVNode("div", { class: "grid lg:grid-cols-[1fr_400px] gap-5" }, [
                createVNode("div", null, [
                  createVNode(unref(TabPanels), null, {
                    default: withCtx(() => [
                      createVNode(unref(TabPanel), null, {
                        default: withCtx(() => [
                          createVNode("form", {
                            onSubmit: unref(onSubmit),
                            class: "flex rounded-lg p-4 bg-white flex-col gap-3"
                          }, [
                            createVNode("div", { class: "text-2xl font-bold" }, "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"),
                            createVNode("div", { class: "flex flex-col lg:flex-row gap-3" }, [
                              createVNode(_component_Input, {
                                name: "name",
                                placeholder: "\u0418\u043C\u044F"
                              }),
                              createVNode(_component_Input, {
                                name: "surname",
                                placeholder: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F"
                              })
                            ]),
                            createVNode("div", { class: "flex flex-col lg:flex-row gap-3" }, [
                              createVNode(_component_Input, {
                                name: "address",
                                placeholder: "\u0410\u0434\u0440\u0435\u0441"
                              }),
                              createVNode("div", { class: "flex gap-3" }, [
                                createVNode(_component_Input, {
                                  name: "house",
                                  placeholder: "\u0414\u043E\u043C"
                                }),
                                createVNode(_component_Input, {
                                  name: "flat",
                                  placeholder: "\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430"
                                })
                              ])
                            ]),
                            createVNode("div", { class: "flex flex-col lg:flex-row gap-3" }, [
                              createVNode("div", { class: "flex gap-3" }, [
                                createVNode(_component_Input, {
                                  name: "mail_index",
                                  placeholder: "\u041F\u043E\u0447\u0442\u043E\u0432\u044B\u0439 \u0438\u043D\u0434\u0435\u043A\u0441"
                                }),
                                createVNode(_component_Input, {
                                  name: "country",
                                  placeholder: "\u0421\u0442\u0440\u0430\u043D\u0430"
                                })
                              ]),
                              createVNode(_component_Input, {
                                name: "city",
                                placeholder: "\u0413\u043E\u0440\u043E\u0434"
                              })
                            ]),
                            createVNode("div", { class: "flex flex-col lg:flex-row gap-3" }, [
                              createVNode(_component_Input, {
                                name: "email",
                                placeholder: "Email"
                              }),
                              createVNode(_component_Input, {
                                name: "phone",
                                placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"
                              })
                            ]),
                            createVNode("button", { class: "mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg" }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C")
                          ], 40, ["onSubmit"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(TabPanel), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex p-4 rounded-lg bg-white flex-col gap-3" }, [
                            createVNode("div", { class: "text-2xl font-bold" }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430"),
                            createVNode(unref(RadioGroup), {
                              modelValue: plan.value,
                              "onUpdate:modelValue": ($event) => plan.value = $event,
                              class: "flex flex-col gap-3"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(RadioGroupOption), { value: "1" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "font-bold text-lg" }, "LP express"),
                                        createVNode("p", { class: "text-gray-500 font-light" }, "\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043C\u0435\u0441\u044F\u0446\u0435, 2024 03 04")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, "42,40 \u20AC")
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(RadioGroupOption), { value: "2" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "font-bold text-lg" }, "\u0417\u0430\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0430\u043C"),
                                        createVNode("p", { class: "text-gray-500 font-light" })
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, "42,40 \u20AC")
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(RadioGroupOption), { value: "3" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "font-bold text-lg" }, "FedEx Plus"),
                                        createVNode("p", { class: "text-gray-500 font-light" }, "\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 2024 03 04")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, "42,40 \u20AC")
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("button", {
                              onClick: ($event) => changeTab(2),
                              class: "mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg"
                            }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C", 8, ["onClick"])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(TabPanel), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex rounded-lg p-4 bg-white flex-col gap-3" }, [
                            createVNode("div", { class: "text-2xl font-bold" }, "\u041E\u043F\u043B\u0430\u0442\u0430"),
                            createVNode(unref(RadioGroup), {
                              modelValue: pay.value,
                              "onUpdate:modelValue": ($event) => pay.value = $event,
                              class: "flex flex-col gap-3"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(RadioGroupOption), { value: "1" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "text-lg" }, "\u0411\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0430\u044F \u043A\u0430\u0440\u0442\u0430")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, [
                                          createVNode(unref(CreditCardIcon), { class: "w-5 h-5" })
                                        ])
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(RadioGroupOption), { value: "2" }, {
                                  default: withCtx(({ checked }) => [
                                    createVNode("div", {
                                      class: ["flex justify-between cursor-pointer p-3", {
                                        "bg-slate-100": checked
                                      }]
                                    }, [
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode("h3", { class: "text-lg" }, "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", null, [
                                          createVNode(unref(BanknotesIcon), { class: "w-5 h-5" })
                                        ])
                                      ])
                                    ], 2)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_Button, {
                              isLoading: orderCreateLoading.value,
                              onClick: createOrder,
                              name: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
                            }, null, 8, ["isLoading"])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(TabPanel), null, {
                        default: withCtx(() => [
                          order.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex p-4 bg-white rounded-lg flex-col gap-3"
                          }, [
                            createVNode("h2", null, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E #" + toDisplayString(order.value.id) + " \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437 \u0441\u043E\u0437\u0434\u0430\u043D !", 1),
                            createVNode("p", null, "\u0412 \u0441\u043A\u043E\u0440\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0432\u0430\u043C \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442 \u043D\u0430\u0448 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440"),
                            createVNode("p", null, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437! \u041D\u0430\u0448 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0441\u043A\u043E\u0440\u043E \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438.")
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "bg-white rounded-lg p-4" }, [
                  createVNode("h2", { class: "text-xl font-bold" }, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0437\u0430\u043A\u0430\u0437\u0435"),
                  createVNode(_sfc_main$1, { class: "mt-3" })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/order/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-Bpb3aCeG.mjs.map
