import { defineComponent, mergeModels, useModel, computed, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { ChevronUpDownIcon } from '@heroicons/vue/24/outline';
import { onClickOutside } from '@vueuse/core';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "single",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    options: {},
    placeholder: {}
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const model = useModel(__props, "modelValue");
    function contains(item) {
      var _a;
      return ((_a = model.value) == null ? void 0 : _a.id) == item.id;
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
        class: "relative rounded-lg border flex justify-between items-center p-2"
      }, _attrs))}><div class="flex flex-wrap w-full items-center gap-1"><input${ssrRenderAttr("value", query.value)} class="w-full text-sm focus:outline-none p-2"${ssrRenderAttr("placeholder", _ctx.placeholder)}></div><div>`);
      _push(ssrRenderComponent(unref(ChevronUpDownIcon), {
        onClick: ($event) => open.value = !open.value,
        class: "w-6 h-6 cursor-pointer"
      }, null, _parent));
      _push(`</div>`);
      if (open.value) {
        _push(`<div class="max-h-[250px] top-full left-0 w-full border rounded-lg shadow-md bg-white z-10 absolute overflow-scroll flex flex-col"><!--[-->`);
        ssrRenderList(filteredOptions.value, (option) => {
          _push(`<div class="${ssrRenderClass([{
            "bg-slate-100": contains(option)
          }, "p-3 border-b border-b-slate-200 cursor-pointer hover:bg-slate-100"])}">${ssrInterpolate(option.name)}</div>`);
        });
        _push(`<!--]--></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Select/single.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=single-BHvh5GLT.mjs.map
