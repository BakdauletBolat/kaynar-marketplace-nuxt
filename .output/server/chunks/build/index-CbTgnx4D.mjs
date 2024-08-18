import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './catalog-CaQexDFS.mjs';
import 'seemly';
import './Button-DJbEEsUs.mjs';
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
import 'vue-router';
import '@css-render/vue3-ssr';
import 'vooks';
import 'lodash-es';
import 'css-render';
import 'vueuc';
import 'vdirs';
import 'evtd';
import '@css-render/plugin-bem';
import '@heroicons/vue/20/solid';
import './index-C5IDfPQf.mjs';
import 'axios';
import './product-store-C1z4bZAH.mjs';
import './nuxt-link-DbMKAke2.mjs';
import '@vueuse/core';
import 'async-validator';
import './Select-B5PHYIHa.mjs';
import 'treemate';
import './DrawerContent-GVhmRteA.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, null, _parent));
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
//# sourceMappingURL=index-CbTgnx4D.mjs.map
