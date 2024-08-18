import { useSSRContext, defineComponent, mergeProps, unref, resolveComponent, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { C as CardStorage } from './storage-DSfldfNp.mjs';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '@heroicons/vue/24/outline';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "basket-card",
  __ssrInlineRender: true,
  props: ["item"],
  setup(__props) {
    const cardStorage = CardStorage.getInstance();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-[100px_1fr] gap-3 rounded-sm" }, _attrs))}><div class="h-[100px] block"><img class="rounded w-full h-full object-cover"${ssrRenderAttr("src", (_a = __props.item.picture_url) != null ? _a : "https://demofree.sirv.com/nope-not-here.jpg")} alt=""></div><div class=""><div class="flex flex-col justify-between w-full">`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: {
          name: "product-id",
          params: {
            id: __props.item.id
          }
        },
        class: "text-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.item.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.item.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="">${ssrInterpolate(__props.item.price)} \u20B8</span><div class="flex items-center mt-3 gap-2"><div>`);
      _push(ssrRenderComponent(unref(PlusCircleIcon), {
        onClick: ($event) => unref(cardStorage).increaseGood(__props.item.id),
        class: "w-[24px] text-slate-600 cursor-pointer"
      }, null, _parent));
      _push(`</div><div>${ssrInterpolate(__props.item.quantity)}</div><div>`);
      _push(ssrRenderComponent(unref(MinusCircleIcon), {
        onClick: ($event) => unref(cardStorage).decreaseGood(__props.item.id),
        class: "w-[24px] text-slate-600 cursor-pointer"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(unref(TrashIcon), {
        onClick: ($event) => unref(cardStorage).removeGood(__props.item.id),
        class: "w-[24px] text-red-500 cursor-pointer"
      }, null, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/basket-card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "user-card",
  __ssrInlineRender: true,
  setup(__props) {
    const cardStorage = CardStorage.getInstance();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}>`);
      if (unref(cardStorage).goods.value.length > 0) {
        _push(`<div class="grid grid-cols-1 gap-5"><!--[-->`);
        ssrRenderList(unref(cardStorage).goods.value, (item) => {
          _push(ssrRenderComponent(_sfc_main$1, {
            key: item.name,
            item
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center p-2">\u041F\u043E\u043A\u0430 \u0447\u0442\u043E \u043F\u0443\u0441\u0442\u043E</div>`);
      }
      _push(`<div class="border-t bg-white w-full py-5 mt-5 text-lg font-medium"><div class="flex w-full justify-between"><div>\u041E\u0431\u0449\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C</div><div>${ssrInterpolate(unref(cardStorage).totalCost)} \u20B8</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user-card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=user-card-FifElaHX.mjs.map
