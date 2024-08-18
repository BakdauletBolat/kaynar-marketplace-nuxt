import { _ as __nuxt_component_0 } from './nuxt-link-Bm57nO93.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useDateFormat } from '@vueuse/core';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: ["item"],
  setup(__props) {
    const props = __props;
    const formatted = useDateFormat(props.item.created_at, "MMMM DD");
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex bg-white rounded-lg lg:flex-row flex-col p-2 lg:p-5 gap-3 hover:border-slate-400" }, _attrs))}><div><img class="rounded border lg:h-[120px] h-[200px] object-cover w-full lg:w-[160px]"${ssrRenderAttr("src", __props.item.pictures.length != 0 ? __props.item.pictures[0].image : "https://demofree.sirv.com/nope-not-here.jpg")} alt=""></div><div class="w-full"><div class="flex justify-between flex-col md:flex-row w-full"><h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "text-lg font-medium text-blue-500 hover:underline-offset-1 hover:underline",
        to: {
          name: "product-id",
          params: {
            id: __props.item.id
          }
        }
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
      _push(`</h2><span>${ssrInterpolate(__props.item.price)} \u20B8</span></div><p class="text-sm mt-3">\u0431/\u0443 ${ssrInterpolate(__props.item.modification.modelCar.name)}</p><p class="text-sm text-slate-500 font-light max-w-[400px]">\u041F\u0440\u043E\u0434\u0430\u044E \u0440\u0430\u043C\u0443 \u043D\u0430 \u041F\u0440\u0430\u0434\u043E 78.5 \u0434\u0432\u0435\u0440\u043D\u044B\u0439. \u0412 \u043E\u0442\u043B\u0438\u0447\u043D\u043E\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438 \u0441 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438</p><ul class="flex flex-col md:gap-3 md:flex-row mt-3"><li class="text-sm text-slate-400 font-light">${ssrInterpolate((_a = __props.item.warehouse) != null ? _a : "\u0428\u044B\u043C\u043A\u0435\u043D\u0442")}</li><li class="text-sm text-slate-400 font-light">${ssrInterpolate(unref(formatted))}</li></ul></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Card-DehtzjUi.mjs.map
