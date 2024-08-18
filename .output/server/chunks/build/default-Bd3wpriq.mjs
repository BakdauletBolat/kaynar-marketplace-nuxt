import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { defineComponent, h, inject, computed, ref, toRef, getCurrentInstance, watchEffect, watch, provide, Fragment, withDirectives, Transition, vShow, useSSRContext, unref, isRef, withCtx, createTextVNode, createVNode, nextTick, normalizeStyle, mergeProps, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { i as isOpenCart, C as CardStorage } from './storage-DSfldfNp.mjs';
import { _ as _sfc_main$3 } from './user-card-FifElaHX.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DbMKAke2.mjs';
import { useRouter, useRoute } from 'vue-router';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import { Search, PersonOutline, HeartOutline, BagOutline } from '@vicons/ionicons5';
import { Y as replaceable, Z as resolveSlotWithProps, c as cB, d as cE, a as c, b as cM, p as cNotM, u as useTheme, H as useLocale, m as useFormItem, h as useRtl, j as createKey, e as useThemeClass, k as resolveWrappedSlot, T as Scrollbar, r as resolveSlot, y as popoverBaseProps, A as NPopover, _ as fadeInTransition, x as fadeInScaleUpTransition, D as NBaseIcon, I as Button, z as call, $ as NBaseClear, V as NBaseSuffix, K as createTheme, J as derived, L as popoverLight } from './Button-DJbEEsUs.mjs';
import { u as useConfig, c as createInjectionKey } from './server.mjs';
import { getPadding, createId, beforeNextFrameOnce, changeColor, composite } from 'seemly';
import { zindexable } from 'vdirs';
import { useMergedState, useMemo, useIsMounted } from 'vooks';
import { VResizeObserver, LazyTeleport } from 'vueuc';
import { on, off } from 'evtd';
import { kebabCase } from 'lodash-es';
import { a as NDrawer, b as NDrawerContent, N as NIcon } from './DrawerContent-GVhmRteA.mjs';
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
import 'node:crypto';
import 'css-render';
import '@css-render/vue3-ssr';
import '@css-render/plugin-bem';

function download(url, name) {
  if (!url)
    return;
  const a = (void 0).createElement("a");
  a.href = url;
  (void 0).body.appendChild(a);
  a.click();
  (void 0).body.removeChild(a);
}
const EyeIcon = defineComponent({
  name: "Eye",
  render() {
    return h("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, h("path", {
      d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "32"
    }), h("circle", {
      cx: "256",
      cy: "256",
      r: "80",
      fill: "none",
      stroke: "currentColor",
      "stroke-miterlimit": "10",
      "stroke-width": "32"
    }));
  }
});
const EyeOffIcon = defineComponent({
  name: "EyeOff",
  render() {
    return h("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, h("path", {
      d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z",
      fill: "currentColor"
    }), h("path", {
      d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z",
      fill: "currentColor"
    }), h("path", {
      d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z",
      fill: "currentColor"
    }), h("path", {
      d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z",
      fill: "currentColor"
    }), h("path", {
      d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z",
      fill: "currentColor"
    }));
  }
});
const DownloadIcon = replaceable("download", h("svg", {
  viewBox: "0 0 16 16",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, h("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, h("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, h("path", {
  d: "M3.5,13 L12.5,13 C12.7761424,13 13,13.2238576 13,13.5 C13,13.7454599 12.8231248,13.9496084 12.5898756,13.9919443 L12.5,14 L3.5,14 C3.22385763,14 3,13.7761424 3,13.5 C3,13.2545401 3.17687516,13.0503916 3.41012437,13.0080557 L3.5,13 L12.5,13 L3.5,13 Z M7.91012437,1.00805567 L8,1 C8.24545989,1 8.44960837,1.17687516 8.49194433,1.41012437 L8.5,1.5 L8.5,10.292 L11.1819805,7.6109127 C11.3555469,7.43734635 11.6249713,7.4180612 11.8198394,7.55305725 L11.8890873,7.6109127 C12.0626536,7.78447906 12.0819388,8.05390346 11.9469427,8.2487716 L11.8890873,8.31801948 L8.35355339,11.8535534 C8.17998704,12.0271197 7.91056264,12.0464049 7.7156945,11.9114088 L7.64644661,11.8535534 L4.1109127,8.31801948 C3.91565056,8.12275734 3.91565056,7.80617485 4.1109127,7.6109127 C4.28447906,7.43734635 4.55390346,7.4180612 4.7487716,7.55305725 L4.81801948,7.6109127 L7.5,10.292 L7.5,1.5 C7.5,1.25454011 7.67687516,1.05039163 7.91012437,1.00805567 L8,1 L7.91012437,1.00805567 Z"
})))));
const RotateClockwiseIcon = replaceable("rotateClockwise", h("svg", {
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, h("path", {
  d: "M3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 12.7916 15.3658 15.2026 13 16.3265V14.5C13 14.2239 12.7761 14 12.5 14C12.2239 14 12 14.2239 12 14.5V17.5C12 17.7761 12.2239 18 12.5 18H15.5C15.7761 18 16 17.7761 16 17.5C16 17.2239 15.7761 17 15.5 17H13.8758C16.3346 15.6357 18 13.0128 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 10.2761 2.22386 10.5 2.5 10.5C2.77614 10.5 3 10.2761 3 10Z",
  fill: "currentColor"
}), h("path", {
  d: "M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12ZM10 11C9.44772 11 9 10.5523 9 10C9 9.44772 9.44772 9 10 9C10.5523 9 11 9.44772 11 10C11 10.5523 10.5523 11 10 11Z",
  fill: "currentColor"
})));
const RotateCounterclockwiseIcon = replaceable("rotateClockwise", h("svg", {
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, h("path", {
  d: "M17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 12.7916 4.63419 15.2026 7 16.3265V14.5C7 14.2239 7.22386 14 7.5 14C7.77614 14 8 14.2239 8 14.5V17.5C8 17.7761 7.77614 18 7.5 18H4.5C4.22386 18 4 17.7761 4 17.5C4 17.2239 4.22386 17 4.5 17H6.12422C3.66539 15.6357 2 13.0128 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 10.2761 17.7761 10.5 17.5 10.5C17.2239 10.5 17 10.2761 17 10Z",
  fill: "currentColor"
}), h("path", {
  d: "M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11Z",
  fill: "currentColor"
})));
const ZoomInIcon = replaceable("zoomIn", h("svg", {
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, h("path", {
  d: "M11.5 8.5C11.5 8.22386 11.2761 8 11 8H9V6C9 5.72386 8.77614 5.5 8.5 5.5C8.22386 5.5 8 5.72386 8 6V8H6C5.72386 8 5.5 8.22386 5.5 8.5C5.5 8.77614 5.72386 9 6 9H8V11C8 11.2761 8.22386 11.5 8.5 11.5C8.77614 11.5 9 11.2761 9 11V9H11C11.2761 9 11.5 8.77614 11.5 8.5Z",
  fill: "currentColor"
}), h("path", {
  d: "M8.5 3C11.5376 3 14 5.46243 14 8.5C14 9.83879 13.5217 11.0659 12.7266 12.0196L16.8536 16.1464C17.0488 16.3417 17.0488 16.6583 16.8536 16.8536C16.68 17.0271 16.4106 17.0464 16.2157 16.9114L16.1464 16.8536L12.0196 12.7266C11.0659 13.5217 9.83879 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.46243 5.46243 3 8.5 3ZM8.5 4C6.01472 4 4 6.01472 4 8.5C4 10.9853 6.01472 13 8.5 13C10.9853 13 13 10.9853 13 8.5C13 6.01472 10.9853 4 8.5 4Z",
  fill: "currentColor"
})));
const ZoomOutIcon = replaceable("zoomOut", h("svg", {
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, h("path", {
  d: "M11 8C11.2761 8 11.5 8.22386 11.5 8.5C11.5 8.77614 11.2761 9 11 9H6C5.72386 9 5.5 8.77614 5.5 8.5C5.5 8.22386 5.72386 8 6 8H11Z",
  fill: "currentColor"
}), h("path", {
  d: "M14 8.5C14 5.46243 11.5376 3 8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C9.83879 14 11.0659 13.5217 12.0196 12.7266L16.1464 16.8536L16.2157 16.9114C16.4106 17.0464 16.68 17.0271 16.8536 16.8536C17.0488 16.6583 17.0488 16.3417 16.8536 16.1464L12.7266 12.0196C13.5217 11.0659 14 9.83879 14 8.5ZM4 8.5C4 6.01472 6.01472 4 8.5 4C10.9853 4 13 6.01472 13 8.5C13 10.9853 10.9853 13 8.5 13C6.01472 13 4 10.9853 4 8.5Z",
  fill: "currentColor"
})));
const ResizeSmallIcon = defineComponent({
  name: "ResizeSmall",
  render() {
    return h("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }, h("g", {
      fill: "none"
    }, h("path", {
      d: "M5.5 4A1.5 1.5 0 0 0 4 5.5v1a.5.5 0 0 1-1 0v-1A2.5 2.5 0 0 1 5.5 3h1a.5.5 0 0 1 0 1h-1zM16 5.5A1.5 1.5 0 0 0 14.5 4h-1a.5.5 0 0 1 0-1h1A2.5 2.5 0 0 1 17 5.5v1a.5.5 0 0 1-1 0v-1zm0 9a1.5 1.5 0 0 1-1.5 1.5h-1a.5.5 0 0 0 0 1h1a2.5 2.5 0 0 0 2.5-2.5v-1a.5.5 0 0 0-1 0v1zm-12 0A1.5 1.5 0 0 0 5.5 16h1.25a.5.5 0 0 1 0 1H5.5A2.5 2.5 0 0 1 3 14.5v-1.25a.5.5 0 0 1 1 0v1.25zM8.5 7A1.5 1.5 0 0 0 7 8.5v3A1.5 1.5 0 0 0 8.5 13h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 11.5 7h-3zM8 8.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3z",
      fill: "currentColor"
    })));
  }
});
const commonVariables = {
  paddingTiny: "0 8px",
  paddingSmall: "0 10px",
  paddingMedium: "0 12px",
  paddingLarge: "0 14px",
  clearSize: "16px"
};
function self$2(vars) {
  const {
    textColor2,
    textColor3,
    textColorDisabled,
    primaryColor,
    primaryColorHover,
    inputColor,
    inputColorDisabled,
    borderColor,
    warningColor,
    warningColorHover,
    errorColor,
    errorColorHover,
    borderRadius,
    lineHeight,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    actionColor,
    clearColor,
    clearColorHover,
    clearColorPressed,
    placeholderColor,
    placeholderColorDisabled,
    iconColor,
    iconColorDisabled,
    iconColorHover,
    iconColorPressed
  } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    countTextColorDisabled: textColorDisabled,
    countTextColor: textColor3,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    lineHeight,
    lineHeightTextarea: lineHeight,
    borderRadius,
    iconSize: "16px",
    groupLabelColor: actionColor,
    groupLabelTextColor: textColor2,
    textColor: textColor2,
    textColorDisabled,
    textDecorationColor: textColor2,
    caretColor: primaryColor,
    placeholderColor,
    placeholderColorDisabled,
    color: inputColor,
    colorDisabled: inputColorDisabled,
    colorFocus: inputColor,
    groupLabelBorder: `1px solid ${borderColor}`,
    border: `1px solid ${borderColor}`,
    borderHover: `1px solid ${primaryColorHover}`,
    borderDisabled: `1px solid ${borderColor}`,
    borderFocus: `1px solid ${primaryColorHover}`,
    boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, {
      alpha: 0.2
    })}`,
    loadingColor: primaryColor,
    // warning
    loadingColorWarning: warningColor,
    borderWarning: `1px solid ${warningColor}`,
    borderHoverWarning: `1px solid ${warningColorHover}`,
    colorFocusWarning: inputColor,
    borderFocusWarning: `1px solid ${warningColorHover}`,
    boxShadowFocusWarning: `0 0 0 2px ${changeColor(warningColor, {
      alpha: 0.2
    })}`,
    caretColorWarning: warningColor,
    // error
    loadingColorError: errorColor,
    borderError: `1px solid ${errorColor}`,
    borderHoverError: `1px solid ${errorColorHover}`,
    colorFocusError: inputColor,
    borderFocusError: `1px solid ${errorColorHover}`,
    boxShadowFocusError: `0 0 0 2px ${changeColor(errorColor, {
      alpha: 0.2
    })}`,
    caretColorError: errorColor,
    clearColor,
    clearColorHover,
    clearColorPressed,
    iconColor,
    iconColorDisabled,
    iconColorHover,
    iconColorPressed,
    suffixTextColor: textColor2
  });
}
const inputLight = {
  name: "Input",
  common: derived,
  self: self$2
};
const inputInjectionKey = createInjectionKey("n-input");
function len(s) {
  let count = 0;
  for (const _ of s) {
    count++;
  }
  return count;
}
function isEmptyInputValue(value) {
  return value === "" || value == null;
}
function useCursor(inputElRef) {
  const selectionRef = ref(null);
  function recordCursor() {
    const {
      value: input
    } = inputElRef;
    if (!(input === null || input === void 0 ? void 0 : input.focus)) {
      reset();
      return;
    }
    const {
      selectionStart,
      selectionEnd,
      value
    } = input;
    if (selectionStart == null || selectionEnd == null) {
      reset();
      return;
    }
    selectionRef.value = {
      start: selectionStart,
      end: selectionEnd,
      beforeText: value.slice(0, selectionStart),
      afterText: value.slice(selectionEnd)
    };
  }
  function restoreCursor() {
    var _a;
    const {
      value: selection
    } = selectionRef;
    const {
      value: inputEl
    } = inputElRef;
    if (!selection || !inputEl) {
      return;
    }
    const {
      value
    } = inputEl;
    const {
      start,
      beforeText,
      afterText
    } = selection;
    let startPos = value.length;
    if (value.endsWith(afterText)) {
      startPos = value.length - afterText.length;
    } else if (value.startsWith(beforeText)) {
      startPos = beforeText.length;
    } else {
      const beforeLastChar = beforeText[start - 1];
      const newIndex = value.indexOf(beforeLastChar, start - 1);
      if (newIndex !== -1) {
        startPos = newIndex + 1;
      }
    }
    (_a = inputEl.setSelectionRange) === null || _a === void 0 ? void 0 : _a.call(inputEl, startPos, startPos);
  }
  function reset() {
    selectionRef.value = null;
  }
  watch(inputElRef, reset);
  return {
    recordCursor,
    restoreCursor
  };
}
const WordCount = defineComponent({
  name: "InputWordCount",
  setup(_, {
    slots
  }) {
    const {
      mergedValueRef,
      maxlengthRef,
      mergedClsPrefixRef,
      countGraphemesRef
    } = inject(inputInjectionKey);
    const wordCountRef = computed(() => {
      const {
        value: mergedValue
      } = mergedValueRef;
      if (mergedValue === null || Array.isArray(mergedValue))
        return 0;
      return (countGraphemesRef.value || len)(mergedValue);
    });
    return () => {
      const {
        value: maxlength
      } = maxlengthRef;
      const {
        value: mergedValue
      } = mergedValueRef;
      return h("span", {
        class: `${mergedClsPrefixRef.value}-input-word-count`
      }, resolveSlotWithProps(slots.default, {
        value: mergedValue === null || Array.isArray(mergedValue) ? "" : mergedValue
      }, () => [maxlength === void 0 ? wordCountRef.value : `${wordCountRef.value} / ${maxlength}`]));
    };
  }
});
const style$1 = cB("input", `
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`, [
  // common
  cE("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),
  cE("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `),
  cE("input-el, textarea-el", `
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `, [c("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), c("&::placeholder", `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), c("&:-webkit-autofill ~", [cE("placeholder", "display: none;")])]),
  cM("round", [cNotM("textarea", "border-radius: calc(var(--n-height) / 2);")]),
  cE("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [c("span", `
 width: 100%;
 display: inline-block;
 `)]),
  cM("textarea", [cE("placeholder", "overflow: visible;")]),
  cNotM("autosize", "width: 100%;"),
  cM("autosize", [cE("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
  // input
  cB("input-wrapper", `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),
  cE("input-mirror", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),
  cE("input-el", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [c("&[type=password]::-ms-reveal", "display: none;"), c("+", [cE("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
  cNotM("textarea", [cE("placeholder", "white-space: nowrap;")]),
  cE("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),
  // textarea
  cM("textarea", "width: 100%;", [cB("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), cM("resizable", [cB("input-wrapper", `
 resize: vertical;
 min-height: var(--n-height);
 `)]), cE("textarea-el, textarea-mirror, placeholder", `
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 scroll-padding-block-end: var(--n-padding-vertical);
 `), cE("textarea-mirror", `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),
  // pair
  cM("pair", [cE("input-el, placeholder", "text-align: center;"), cE("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [cB("icon", `
 color: var(--n-icon-color);
 `), cB("base-icon", `
 color: var(--n-icon-color);
 `)])]),
  cM("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [cE("border", "border: var(--n-border-disabled);"), cE("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), cE("placeholder", "color: var(--n-placeholder-color-disabled);"), cE("separator", "color: var(--n-text-color-disabled);", [cB("icon", `
 color: var(--n-icon-color-disabled);
 `), cB("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), cB("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), cE("suffix, prefix", "color: var(--n-text-color-disabled);", [cB("icon", `
 color: var(--n-icon-color-disabled);
 `), cB("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]),
  cNotM("disabled", [cE("eye", `
 color: var(--n-icon-color);
 cursor: pointer;
 `, [c("&:hover", `
 color: var(--n-icon-color-hover);
 `), c("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), c("&:hover", [cE("state-border", "border: var(--n-border-hover);")]), cM("focus", "background-color: var(--n-color-focus);", [cE("state-border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),
  cE("border, state-border", `
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),
  cE("state-border", `
 border-color: #0000;
 z-index: 1;
 `),
  cE("prefix", "margin-right: 4px;"),
  cE("suffix", `
 margin-left: 4px;
 `),
  cE("suffix, prefix", `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `, [cB("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), cB("base-clear", `
 font-size: var(--n-icon-size);
 `, [cE("placeholder", [cB("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), c(">", [cB("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), cB("base-icon", `
 font-size: var(--n-icon-size);
 `)]),
  cB("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),
  ["warning", "error"].map((status) => cM(`${status}-status`, [cNotM("disabled", [cB("base-loading", `
 color: var(--n-loading-color-${status})
 `), cE("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${status});
 `), cE("state-border", `
 border: var(--n-border-${status});
 `), c("&:hover", [cE("state-border", `
 border: var(--n-border-hover-${status});
 `)]), c("&:focus", `
 background-color: var(--n-color-focus-${status});
 `, [cE("state-border", `
 box-shadow: var(--n-box-shadow-focus-${status});
 border: var(--n-border-focus-${status});
 `)]), cM("focus", `
 background-color: var(--n-color-focus-${status});
 `, [cE("state-border", `
 box-shadow: var(--n-box-shadow-focus-${status});
 border: var(--n-border-focus-${status});
 `)])])]))
]);
cB("input", [cM("disabled", [cE("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]);
const inputProps = Object.assign(Object.assign({}, useTheme.props), {
  bordered: {
    type: Boolean,
    default: void 0
  },
  type: {
    type: String,
    default: "text"
  },
  placeholder: [Array, String],
  defaultValue: {
    type: [String, Array],
    default: null
  },
  value: [String, Array],
  disabled: {
    type: Boolean,
    default: void 0
  },
  size: String,
  rows: {
    type: [Number, String],
    default: 3
  },
  round: Boolean,
  minlength: [String, Number],
  maxlength: [String, Number],
  clearable: Boolean,
  autosize: {
    type: [Boolean, Object],
    default: false
  },
  pair: Boolean,
  separator: String,
  readonly: {
    type: [String, Boolean],
    default: false
  },
  passivelyActivated: Boolean,
  showPasswordOn: String,
  stateful: {
    type: Boolean,
    default: true
  },
  autofocus: Boolean,
  inputProps: Object,
  resizable: {
    type: Boolean,
    default: true
  },
  showCount: Boolean,
  loading: {
    type: Boolean,
    default: void 0
  },
  allowInput: Function,
  renderCount: Function,
  onMousedown: Function,
  onKeydown: Function,
  onKeyup: [Function, Array],
  onInput: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
  onClick: [Function, Array],
  onChange: [Function, Array],
  onClear: [Function, Array],
  countGraphemes: Function,
  status: String,
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  /** private */
  textDecoration: [String, Array],
  attrSize: {
    type: Number,
    default: 20
  },
  onInputBlur: [Function, Array],
  onInputFocus: [Function, Array],
  onDeactivate: [Function, Array],
  onActivate: [Function, Array],
  onWrapperFocus: [Function, Array],
  onWrapperBlur: [Function, Array],
  internalDeactivateOnEnter: Boolean,
  internalForceFocus: Boolean,
  internalLoadingBeforeSuffix: {
    type: Boolean,
    default: true
  },
  /** deprecated */
  showPasswordToggle: Boolean
});
const NInput = defineComponent({
  name: "Input",
  props: inputProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedBorderedRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const themeRef = useTheme("Input", "-input", style$1, inputLight, props, mergedClsPrefixRef);
    const wrapperElRef = ref(null);
    const textareaElRef = ref(null);
    const textareaMirrorElRef = ref(null);
    const inputMirrorElRef = ref(null);
    const inputElRef = ref(null);
    const inputEl2Ref = ref(null);
    const currentFocusedInputRef = ref(null);
    const focusedInputCursorControl = useCursor(currentFocusedInputRef);
    const textareaScrollbarInstRef = ref(null);
    const {
      localeRef
    } = useLocale("Input");
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, "value");
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const formItem = useFormItem(props);
    const {
      mergedSizeRef,
      mergedDisabledRef,
      mergedStatusRef
    } = formItem;
    const focusedRef = ref(false);
    const hoverRef = ref(false);
    const isComposingRef = ref(false);
    const activatedRef = ref(false);
    let syncSource = null;
    const mergedPlaceholderRef = computed(() => {
      const {
        placeholder,
        pair
      } = props;
      if (pair) {
        if (Array.isArray(placeholder)) {
          return placeholder;
        } else if (placeholder === void 0) {
          return ["", ""];
        }
        return [placeholder, placeholder];
      } else if (placeholder === void 0) {
        return [localeRef.value.placeholder];
      } else {
        return [placeholder];
      }
    });
    const showPlaceholder1Ref = computed(() => {
      const {
        value: isComposing
      } = isComposingRef;
      const {
        value: mergedValue
      } = mergedValueRef;
      const {
        value: mergedPlaceholder
      } = mergedPlaceholderRef;
      return !isComposing && (isEmptyInputValue(mergedValue) || Array.isArray(mergedValue) && isEmptyInputValue(mergedValue[0])) && mergedPlaceholder[0];
    });
    const showPlaceholder2Ref = computed(() => {
      const {
        value: isComposing
      } = isComposingRef;
      const {
        value: mergedValue
      } = mergedValueRef;
      const {
        value: mergedPlaceholder
      } = mergedPlaceholderRef;
      return !isComposing && mergedPlaceholder[1] && (isEmptyInputValue(mergedValue) || Array.isArray(mergedValue) && isEmptyInputValue(mergedValue[1]));
    });
    const mergedFocusRef = useMemo(() => {
      return props.internalForceFocus || focusedRef.value;
    });
    const showClearButton = useMemo(() => {
      if (mergedDisabledRef.value || props.readonly || !props.clearable || !mergedFocusRef.value && !hoverRef.value) {
        return false;
      }
      const {
        value: mergedValue
      } = mergedValueRef;
      const {
        value: mergedFocus
      } = mergedFocusRef;
      if (props.pair) {
        return !!(Array.isArray(mergedValue) && (mergedValue[0] || mergedValue[1])) && (hoverRef.value || mergedFocus);
      } else {
        return !!mergedValue && (hoverRef.value || mergedFocus);
      }
    });
    const mergedShowPasswordOnRef = computed(() => {
      const {
        showPasswordOn
      } = props;
      if (showPasswordOn) {
        return showPasswordOn;
      }
      if (props.showPasswordToggle)
        return "click";
      return void 0;
    });
    const passwordVisibleRef = ref(false);
    const textDecorationStyleRef = computed(() => {
      const {
        textDecoration
      } = props;
      if (!textDecoration)
        return ["", ""];
      if (Array.isArray(textDecoration)) {
        return textDecoration.map((v) => ({
          textDecoration: v
        }));
      }
      return [{
        textDecoration
      }];
    });
    const textAreaScrollContainerWidthRef = ref(void 0);
    const updateTextAreaStyle = () => {
      var _a, _b;
      if (props.type === "textarea") {
        const {
          autosize
        } = props;
        if (autosize) {
          textAreaScrollContainerWidthRef.value = (_b = (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.$el) === null || _b === void 0 ? void 0 : _b.offsetWidth;
        }
        if (!textareaElRef.value)
          return;
        if (typeof autosize === "boolean")
          return;
        const {
          paddingTop: stylePaddingTop,
          paddingBottom: stylePaddingBottom,
          lineHeight: styleLineHeight
        } = (void 0).getComputedStyle(textareaElRef.value);
        const paddingTop = Number(stylePaddingTop.slice(0, -2));
        const paddingBottom = Number(stylePaddingBottom.slice(0, -2));
        const lineHeight = Number(styleLineHeight.slice(0, -2));
        const {
          value: textareaMirrorEl
        } = textareaMirrorElRef;
        if (!textareaMirrorEl)
          return;
        if (autosize.minRows) {
          const minRows = Math.max(autosize.minRows, 1);
          const styleMinHeight = `${paddingTop + paddingBottom + lineHeight * minRows}px`;
          textareaMirrorEl.style.minHeight = styleMinHeight;
        }
        if (autosize.maxRows) {
          const styleMaxHeight = `${paddingTop + paddingBottom + lineHeight * autosize.maxRows}px`;
          textareaMirrorEl.style.maxHeight = styleMaxHeight;
        }
      }
    };
    const maxlengthRef = computed(() => {
      const {
        maxlength
      } = props;
      return maxlength === void 0 ? void 0 : Number(maxlength);
    });
    const vm = getCurrentInstance().proxy;
    function doUpdateValue(value, meta) {
      const {
        onUpdateValue,
        "onUpdate:value": _onUpdateValue,
        onInput
      } = props;
      const {
        nTriggerFormInput
      } = formItem;
      if (onUpdateValue)
        call(onUpdateValue, value, meta);
      if (_onUpdateValue)
        call(_onUpdateValue, value, meta);
      if (onInput)
        call(onInput, value, meta);
      uncontrolledValueRef.value = value;
      nTriggerFormInput();
    }
    function doChange(value, meta) {
      const {
        onChange
      } = props;
      const {
        nTriggerFormChange
      } = formItem;
      if (onChange)
        call(onChange, value, meta);
      uncontrolledValueRef.value = value;
      nTriggerFormChange();
    }
    function doBlur(e) {
      const {
        onBlur
      } = props;
      const {
        nTriggerFormBlur
      } = formItem;
      if (onBlur)
        call(onBlur, e);
      nTriggerFormBlur();
    }
    function doFocus(e) {
      const {
        onFocus
      } = props;
      const {
        nTriggerFormFocus
      } = formItem;
      if (onFocus)
        call(onFocus, e);
      nTriggerFormFocus();
    }
    function doClear(e) {
      const {
        onClear
      } = props;
      if (onClear)
        call(onClear, e);
    }
    function doUpdateValueBlur(e) {
      const {
        onInputBlur
      } = props;
      if (onInputBlur)
        call(onInputBlur, e);
    }
    function doUpdateValueFocus(e) {
      const {
        onInputFocus
      } = props;
      if (onInputFocus)
        call(onInputFocus, e);
    }
    function doDeactivate() {
      const {
        onDeactivate
      } = props;
      if (onDeactivate)
        call(onDeactivate);
    }
    function doActivate() {
      const {
        onActivate
      } = props;
      if (onActivate)
        call(onActivate);
    }
    function doClick(e) {
      const {
        onClick
      } = props;
      if (onClick)
        call(onClick, e);
    }
    function doWrapperFocus(e) {
      const {
        onWrapperFocus
      } = props;
      if (onWrapperFocus)
        call(onWrapperFocus, e);
    }
    function doWrapperBlur(e) {
      const {
        onWrapperBlur
      } = props;
      if (onWrapperBlur)
        call(onWrapperBlur, e);
    }
    function handleCompositionStart() {
      isComposingRef.value = true;
    }
    function handleCompositionEnd(e) {
      isComposingRef.value = false;
      if (e.target === inputEl2Ref.value) {
        handleInput(e, 1);
      } else {
        handleInput(e, 0);
      }
    }
    function handleInput(e, index = 0, event = "input") {
      const targetValue = e.target.value;
      syncMirror(targetValue);
      if (e instanceof InputEvent && !e.isComposing) {
        isComposingRef.value = false;
      }
      if (props.type === "textarea") {
        const {
          value: textareaScrollbarInst
        } = textareaScrollbarInstRef;
        if (textareaScrollbarInst) {
          textareaScrollbarInst.syncUnifiedContainer();
        }
      }
      syncSource = targetValue;
      if (isComposingRef.value)
        return;
      focusedInputCursorControl.recordCursor();
      const isIncomingValueValid = allowInput(targetValue);
      if (isIncomingValueValid) {
        if (!props.pair) {
          if (event === "input") {
            doUpdateValue(targetValue, {
              source: index
            });
          } else {
            doChange(targetValue, {
              source: index
            });
          }
        } else {
          let {
            value
          } = mergedValueRef;
          if (!Array.isArray(value)) {
            value = ["", ""];
          } else {
            value = [value[0], value[1]];
          }
          value[index] = targetValue;
          if (event === "input") {
            doUpdateValue(value, {
              source: index
            });
          } else {
            doChange(value, {
              source: index
            });
          }
        }
      }
      vm.$forceUpdate();
      if (!isIncomingValueValid) {
        void nextTick(focusedInputCursorControl.restoreCursor);
      }
    }
    function allowInput(value) {
      const {
        countGraphemes,
        maxlength,
        minlength
      } = props;
      if (countGraphemes) {
        let graphemesCount;
        if (maxlength !== void 0) {
          if (graphemesCount === void 0) {
            graphemesCount = countGraphemes(value);
          }
          if (graphemesCount > Number(maxlength))
            return false;
        }
        if (minlength !== void 0) {
          if (graphemesCount === void 0) {
            graphemesCount = countGraphemes(value);
          }
          if (graphemesCount < Number(maxlength))
            return false;
        }
      }
      const {
        allowInput: allowInput2
      } = props;
      if (typeof allowInput2 === "function") {
        return allowInput2(value);
      }
      return true;
    }
    function handleInputBlur(e) {
      doUpdateValueBlur(e);
      if (e.relatedTarget === wrapperElRef.value) {
        doDeactivate();
      }
      if (!(e.relatedTarget !== null && (e.relatedTarget === inputElRef.value || e.relatedTarget === inputEl2Ref.value || e.relatedTarget === textareaElRef.value))) {
        activatedRef.value = false;
      }
      dealWithEvent(e, "blur");
      currentFocusedInputRef.value = null;
    }
    function handleInputFocus(e, index) {
      doUpdateValueFocus(e);
      focusedRef.value = true;
      activatedRef.value = true;
      doActivate();
      dealWithEvent(e, "focus");
      if (index === 0) {
        currentFocusedInputRef.value = inputElRef.value;
      } else if (index === 1) {
        currentFocusedInputRef.value = inputEl2Ref.value;
      } else if (index === 2) {
        currentFocusedInputRef.value = textareaElRef.value;
      }
    }
    function handleWrapperBlur(e) {
      if (props.passivelyActivated) {
        doWrapperBlur(e);
        dealWithEvent(e, "blur");
      }
    }
    function handleWrapperFocus(e) {
      if (props.passivelyActivated) {
        focusedRef.value = true;
        doWrapperFocus(e);
        dealWithEvent(e, "focus");
      }
    }
    function dealWithEvent(e, type) {
      if (e.relatedTarget !== null && (e.relatedTarget === inputElRef.value || e.relatedTarget === inputEl2Ref.value || e.relatedTarget === textareaElRef.value || e.relatedTarget === wrapperElRef.value))
        ;
      else {
        if (type === "focus") {
          doFocus(e);
          focusedRef.value = true;
        } else if (type === "blur") {
          doBlur(e);
          focusedRef.value = false;
        }
      }
    }
    function handleChange(e, index) {
      handleInput(e, index, "change");
    }
    function handleClick(e) {
      doClick(e);
    }
    function handleClear(e) {
      doClear(e);
      clearValue();
    }
    function clearValue() {
      if (props.pair) {
        doUpdateValue(["", ""], {
          source: "clear"
        });
        doChange(["", ""], {
          source: "clear"
        });
      } else {
        doUpdateValue("", {
          source: "clear"
        });
        doChange("", {
          source: "clear"
        });
      }
    }
    function handleMouseDown(e) {
      const {
        onMousedown
      } = props;
      if (onMousedown)
        onMousedown(e);
      const {
        tagName
      } = e.target;
      if (tagName !== "INPUT" && tagName !== "TEXTAREA") {
        if (props.resizable) {
          const {
            value: wrapperEl
          } = wrapperElRef;
          if (wrapperEl) {
            const {
              left,
              top,
              width,
              height
            } = wrapperEl.getBoundingClientRect();
            const resizeHandleSize = 14;
            if (left + width - resizeHandleSize < e.clientX && e.clientX < left + width && top + height - resizeHandleSize < e.clientY && e.clientY < top + height) {
              return;
            }
          }
        }
        e.preventDefault();
        if (!focusedRef.value) {
          focus();
        }
      }
    }
    function handleMouseEnter() {
      var _a;
      hoverRef.value = true;
      if (props.type === "textarea") {
        (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.handleMouseEnterWrapper();
      }
    }
    function handleMouseLeave() {
      var _a;
      hoverRef.value = false;
      if (props.type === "textarea") {
        (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.handleMouseLeaveWrapper();
      }
    }
    function handlePasswordToggleClick() {
      if (mergedDisabledRef.value)
        return;
      if (mergedShowPasswordOnRef.value !== "click")
        return;
      passwordVisibleRef.value = !passwordVisibleRef.value;
    }
    function handlePasswordToggleMousedown(e) {
      if (mergedDisabledRef.value)
        return;
      e.preventDefault();
      const preventDefaultOnce = (e2) => {
        e2.preventDefault();
        off("mouseup", void 0, preventDefaultOnce);
      };
      on("mouseup", void 0, preventDefaultOnce);
      if (mergedShowPasswordOnRef.value !== "mousedown")
        return;
      passwordVisibleRef.value = true;
      const hidePassword = () => {
        passwordVisibleRef.value = false;
        off("mouseup", void 0, hidePassword);
      };
      on("mouseup", void 0, hidePassword);
    }
    function handleWrapperKeyup(e) {
      if (props.onKeyup)
        call(props.onKeyup, e);
    }
    function handleWrapperKeydown(e) {
      if (props.onKeydown)
        call(props.onKeydown, e);
      switch (e.key) {
        case "Escape":
          handleWrapperKeydownEsc();
          break;
        case "Enter":
          handleWrapperKeydownEnter(e);
          break;
      }
    }
    function handleWrapperKeydownEnter(e) {
      var _a, _b;
      if (props.passivelyActivated) {
        const {
          value: focused
        } = activatedRef;
        if (focused) {
          if (props.internalDeactivateOnEnter) {
            handleWrapperKeydownEsc();
          }
          return;
        }
        e.preventDefault();
        if (props.type === "textarea") {
          (_a = textareaElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
        } else {
          (_b = inputElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
        }
      }
    }
    function handleWrapperKeydownEsc() {
      if (props.passivelyActivated) {
        activatedRef.value = false;
        void nextTick(() => {
          var _a;
          (_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
        });
      }
    }
    function focus() {
      var _a, _b, _c;
      if (mergedDisabledRef.value)
        return;
      if (props.passivelyActivated) {
        (_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      } else {
        (_b = textareaElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
        (_c = inputElRef.value) === null || _c === void 0 ? void 0 : _c.focus();
      }
    }
    function blur() {
      var _a;
      if ((_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.contains((void 0).activeElement)) {
        (void 0).activeElement.blur();
      }
    }
    function select() {
      var _a, _b;
      (_a = textareaElRef.value) === null || _a === void 0 ? void 0 : _a.select();
      (_b = inputElRef.value) === null || _b === void 0 ? void 0 : _b.select();
    }
    function activate() {
      if (mergedDisabledRef.value)
        return;
      if (textareaElRef.value)
        textareaElRef.value.focus();
      else if (inputElRef.value)
        inputElRef.value.focus();
    }
    function deactivate() {
      const {
        value: wrapperEl
      } = wrapperElRef;
      if ((wrapperEl === null || wrapperEl === void 0 ? void 0 : wrapperEl.contains((void 0).activeElement)) && wrapperEl !== (void 0).activeElement) {
        handleWrapperKeydownEsc();
      }
    }
    function scrollTo(options) {
      if (props.type === "textarea") {
        const {
          value: textareaEl
        } = textareaElRef;
        textareaEl === null || textareaEl === void 0 ? void 0 : textareaEl.scrollTo(options);
      } else {
        const {
          value: inputEl
        } = inputElRef;
        inputEl === null || inputEl === void 0 ? void 0 : inputEl.scrollTo(options);
      }
    }
    function syncMirror(value) {
      const {
        type,
        pair,
        autosize
      } = props;
      if (!pair && autosize) {
        if (type === "textarea") {
          const {
            value: textareaMirrorEl
          } = textareaMirrorElRef;
          if (textareaMirrorEl) {
            textareaMirrorEl.textContent = `${value !== null && value !== void 0 ? value : ""}\r
`;
          }
        } else {
          const {
            value: inputMirrorEl
          } = inputMirrorElRef;
          if (inputMirrorEl) {
            if (value) {
              inputMirrorEl.textContent = value;
            } else {
              inputMirrorEl.innerHTML = "&nbsp;";
            }
          }
        }
      }
    }
    function handleTextAreaMirrorResize() {
      updateTextAreaStyle();
    }
    const placeholderStyleRef = ref({
      top: "0"
    });
    function handleTextAreaScroll(e) {
      var _a;
      const {
        scrollTop
      } = e.target;
      placeholderStyleRef.value.top = `${-scrollTop}px`;
      (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.syncUnifiedContainer();
    }
    let stopWatchMergedValue1 = null;
    watchEffect(() => {
      const {
        autosize,
        type
      } = props;
      if (autosize && type === "textarea") {
        stopWatchMergedValue1 = watch(mergedValueRef, (value) => {
          if (!Array.isArray(value) && value !== syncSource) {
            syncMirror(value);
          }
        });
      } else {
        stopWatchMergedValue1 === null || stopWatchMergedValue1 === void 0 ? void 0 : stopWatchMergedValue1();
      }
    });
    let stopWatchMergedValue2 = null;
    watchEffect(() => {
      if (props.type === "textarea") {
        stopWatchMergedValue2 = watch(mergedValueRef, (value) => {
          var _a;
          if (!Array.isArray(value) && value !== syncSource) {
            (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.syncUnifiedContainer();
          }
        });
      } else {
        stopWatchMergedValue2 === null || stopWatchMergedValue2 === void 0 ? void 0 : stopWatchMergedValue2();
      }
    });
    provide(inputInjectionKey, {
      mergedValueRef,
      maxlengthRef,
      mergedClsPrefixRef,
      countGraphemesRef: toRef(props, "countGraphemes")
    });
    const exposedProps = {
      wrapperElRef,
      inputElRef,
      textareaElRef,
      isCompositing: isComposingRef,
      clear: clearValue,
      focus,
      blur,
      select,
      deactivate,
      activate,
      scrollTo
    };
    const rtlEnabledRef = useRtl("Input", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        value: size
      } = mergedSizeRef;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          color,
          borderRadius,
          textColor,
          caretColor,
          caretColorError,
          caretColorWarning,
          textDecorationColor,
          border,
          borderDisabled,
          borderHover,
          borderFocus,
          placeholderColor,
          placeholderColorDisabled,
          lineHeightTextarea,
          colorDisabled,
          colorFocus,
          textColorDisabled,
          boxShadowFocus,
          iconSize,
          colorFocusWarning,
          boxShadowFocusWarning,
          borderWarning,
          borderFocusWarning,
          borderHoverWarning,
          colorFocusError,
          boxShadowFocusError,
          borderError,
          borderFocusError,
          borderHoverError,
          clearSize,
          clearColor,
          clearColorHover,
          clearColorPressed,
          iconColor,
          iconColorDisabled,
          suffixTextColor,
          countTextColor,
          countTextColorDisabled,
          iconColorHover,
          iconColorPressed,
          loadingColor,
          loadingColorError,
          loadingColorWarning,
          [createKey("padding", size)]: padding,
          [createKey("fontSize", size)]: fontSize,
          [createKey("height", size)]: height
        }
      } = themeRef.value;
      const {
        left: paddingLeft,
        right: paddingRight
      } = getPadding(padding);
      return {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-count-text-color": countTextColor,
        "--n-count-text-color-disabled": countTextColorDisabled,
        "--n-color": color,
        "--n-font-size": fontSize,
        "--n-border-radius": borderRadius,
        "--n-height": height,
        "--n-padding-left": paddingLeft,
        "--n-padding-right": paddingRight,
        "--n-text-color": textColor,
        "--n-caret-color": caretColor,
        "--n-text-decoration-color": textDecorationColor,
        "--n-border": border,
        "--n-border-disabled": borderDisabled,
        "--n-border-hover": borderHover,
        "--n-border-focus": borderFocus,
        "--n-placeholder-color": placeholderColor,
        "--n-placeholder-color-disabled": placeholderColorDisabled,
        "--n-icon-size": iconSize,
        "--n-line-height-textarea": lineHeightTextarea,
        "--n-color-disabled": colorDisabled,
        "--n-color-focus": colorFocus,
        "--n-text-color-disabled": textColorDisabled,
        "--n-box-shadow-focus": boxShadowFocus,
        "--n-loading-color": loadingColor,
        // form warning
        "--n-caret-color-warning": caretColorWarning,
        "--n-color-focus-warning": colorFocusWarning,
        "--n-box-shadow-focus-warning": boxShadowFocusWarning,
        "--n-border-warning": borderWarning,
        "--n-border-focus-warning": borderFocusWarning,
        "--n-border-hover-warning": borderHoverWarning,
        "--n-loading-color-warning": loadingColorWarning,
        // form error
        "--n-caret-color-error": caretColorError,
        "--n-color-focus-error": colorFocusError,
        "--n-box-shadow-focus-error": boxShadowFocusError,
        "--n-border-error": borderError,
        "--n-border-focus-error": borderFocusError,
        "--n-border-hover-error": borderHoverError,
        "--n-loading-color-error": loadingColorError,
        // clear-button
        "--n-clear-color": clearColor,
        "--n-clear-size": clearSize,
        "--n-clear-color-hover": clearColorHover,
        "--n-clear-color-pressed": clearColorPressed,
        "--n-icon-color": iconColor,
        "--n-icon-color-hover": iconColorHover,
        "--n-icon-color-pressed": iconColorPressed,
        "--n-icon-color-disabled": iconColorDisabled,
        "--n-suffix-text-color": suffixTextColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("input", computed(() => {
      const {
        value: size
      } = mergedSizeRef;
      return size[0];
    }), cssVarsRef, props) : void 0;
    return Object.assign(Object.assign({}, exposedProps), {
      // DOM ref
      wrapperElRef,
      inputElRef,
      inputMirrorElRef,
      inputEl2Ref,
      textareaElRef,
      textareaMirrorElRef,
      textareaScrollbarInstRef,
      // value
      rtlEnabled: rtlEnabledRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      passwordVisible: passwordVisibleRef,
      mergedPlaceholder: mergedPlaceholderRef,
      showPlaceholder1: showPlaceholder1Ref,
      showPlaceholder2: showPlaceholder2Ref,
      mergedFocus: mergedFocusRef,
      isComposing: isComposingRef,
      activated: activatedRef,
      showClearButton,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      textDecorationStyle: textDecorationStyleRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      mergedShowPasswordOn: mergedShowPasswordOnRef,
      placeholderStyle: placeholderStyleRef,
      mergedStatus: mergedStatusRef,
      textAreaScrollContainerWidth: textAreaScrollContainerWidthRef,
      // methods
      handleTextAreaScroll,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
      handleInputBlur,
      handleInputFocus,
      handleWrapperBlur,
      handleWrapperFocus,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseDown,
      handleChange,
      handleClick,
      handleClear,
      handlePasswordToggleClick,
      handlePasswordToggleMousedown,
      handleWrapperKeydown,
      handleWrapperKeyup,
      handleTextAreaMirrorResize,
      getTextareaScrollContainer: () => {
        return textareaElRef.value;
      },
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a, _b;
    const {
      mergedClsPrefix,
      mergedStatus,
      themeClass,
      type,
      countGraphemes,
      onRender
    } = this;
    const $slots = this.$slots;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("div", {
      ref: "wrapperElRef",
      class: [`${mergedClsPrefix}-input`, themeClass, mergedStatus && `${mergedClsPrefix}-input--${mergedStatus}-status`, {
        [`${mergedClsPrefix}-input--rtl`]: this.rtlEnabled,
        [`${mergedClsPrefix}-input--disabled`]: this.mergedDisabled,
        [`${mergedClsPrefix}-input--textarea`]: type === "textarea",
        [`${mergedClsPrefix}-input--resizable`]: this.resizable && !this.autosize,
        [`${mergedClsPrefix}-input--autosize`]: this.autosize,
        [`${mergedClsPrefix}-input--round`]: this.round && !(type === "textarea"),
        [`${mergedClsPrefix}-input--pair`]: this.pair,
        [`${mergedClsPrefix}-input--focus`]: this.mergedFocus,
        [`${mergedClsPrefix}-input--stateful`]: this.stateful
      }],
      style: this.cssVars,
      tabindex: !this.mergedDisabled && this.passivelyActivated && !this.activated ? 0 : void 0,
      onFocus: this.handleWrapperFocus,
      onBlur: this.handleWrapperBlur,
      onClick: this.handleClick,
      onMousedown: this.handleMouseDown,
      onMouseenter: this.handleMouseEnter,
      onMouseleave: this.handleMouseLeave,
      onCompositionstart: this.handleCompositionStart,
      onCompositionend: this.handleCompositionEnd,
      onKeyup: this.handleWrapperKeyup,
      onKeydown: this.handleWrapperKeydown
    }, h("div", {
      class: `${mergedClsPrefix}-input-wrapper`
    }, resolveWrappedSlot($slots.prefix, (children) => children && h("div", {
      class: `${mergedClsPrefix}-input__prefix`
    }, children)), type === "textarea" ? h(Scrollbar, {
      ref: "textareaScrollbarInstRef",
      class: `${mergedClsPrefix}-input__textarea`,
      container: this.getTextareaScrollContainer,
      triggerDisplayManually: true,
      useUnifiedContainer: true,
      internalHoistYRail: true
    }, {
      default: () => {
        var _a2, _b2;
        const {
          textAreaScrollContainerWidth
        } = this;
        const scrollContainerWidthStyle = {
          width: this.autosize && textAreaScrollContainerWidth && `${textAreaScrollContainerWidth}px`
        };
        return h(Fragment, null, h("textarea", Object.assign({}, this.inputProps, {
          ref: "textareaElRef",
          class: [`${mergedClsPrefix}-input__textarea-el`, (_a2 = this.inputProps) === null || _a2 === void 0 ? void 0 : _a2.class],
          autofocus: this.autofocus,
          rows: Number(this.rows),
          placeholder: this.placeholder,
          value: this.mergedValue,
          disabled: this.mergedDisabled,
          maxlength: countGraphemes ? void 0 : this.maxlength,
          minlength: countGraphemes ? void 0 : this.minlength,
          readonly: this.readonly,
          tabindex: this.passivelyActivated && !this.activated ? -1 : void 0,
          style: [this.textDecorationStyle[0], (_b2 = this.inputProps) === null || _b2 === void 0 ? void 0 : _b2.style, scrollContainerWidthStyle],
          onBlur: this.handleInputBlur,
          onFocus: (e) => {
            this.handleInputFocus(e, 2);
          },
          onInput: this.handleInput,
          onChange: this.handleChange,
          onScroll: this.handleTextAreaScroll
        })), this.showPlaceholder1 ? h("div", {
          class: `${mergedClsPrefix}-input__placeholder`,
          style: [this.placeholderStyle, scrollContainerWidthStyle],
          key: "placeholder"
        }, this.mergedPlaceholder[0]) : null, this.autosize ? h(VResizeObserver, {
          onResize: this.handleTextAreaMirrorResize
        }, {
          default: () => h("div", {
            ref: "textareaMirrorElRef",
            class: `${mergedClsPrefix}-input__textarea-mirror`,
            key: "mirror"
          })
        }) : null);
      }
    }) : h("div", {
      class: `${mergedClsPrefix}-input__input`
    }, h("input", Object.assign({
      type: type === "password" && this.mergedShowPasswordOn && this.passwordVisible ? "text" : type
    }, this.inputProps, {
      ref: "inputElRef",
      class: [`${mergedClsPrefix}-input__input-el`, (_a = this.inputProps) === null || _a === void 0 ? void 0 : _a.class],
      style: [this.textDecorationStyle[0], (_b = this.inputProps) === null || _b === void 0 ? void 0 : _b.style],
      tabindex: this.passivelyActivated && !this.activated ? -1 : void 0,
      placeholder: this.mergedPlaceholder[0],
      disabled: this.mergedDisabled,
      maxlength: countGraphemes ? void 0 : this.maxlength,
      minlength: countGraphemes ? void 0 : this.minlength,
      value: Array.isArray(this.mergedValue) ? this.mergedValue[0] : this.mergedValue,
      readonly: this.readonly,
      autofocus: this.autofocus,
      size: this.attrSize,
      onBlur: this.handleInputBlur,
      onFocus: (e) => {
        this.handleInputFocus(e, 0);
      },
      onInput: (e) => {
        this.handleInput(e, 0);
      },
      onChange: (e) => {
        this.handleChange(e, 0);
      }
    })), this.showPlaceholder1 ? h("div", {
      class: `${mergedClsPrefix}-input__placeholder`
    }, h("span", null, this.mergedPlaceholder[0])) : null, this.autosize ? h("div", {
      class: `${mergedClsPrefix}-input__input-mirror`,
      key: "mirror",
      ref: "inputMirrorElRef"
    }, "\xA0") : null), !this.pair && resolveWrappedSlot($slots.suffix, (children) => {
      return children || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? h("div", {
        class: `${mergedClsPrefix}-input__suffix`
      }, [resolveWrappedSlot($slots["clear-icon-placeholder"], (children2) => {
        return (this.clearable || children2) && h(NBaseClear, {
          clsPrefix: mergedClsPrefix,
          show: this.showClearButton,
          onClear: this.handleClear
        }, {
          placeholder: () => children2,
          icon: () => {
            var _a2, _b2;
            return (_b2 = (_a2 = this.$slots)["clear-icon"]) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
          }
        });
      }), !this.internalLoadingBeforeSuffix ? children : null, this.loading !== void 0 ? h(NBaseSuffix, {
        clsPrefix: mergedClsPrefix,
        loading: this.loading,
        showArrow: false,
        showClear: false,
        style: this.cssVars
      }) : null, this.internalLoadingBeforeSuffix ? children : null, this.showCount && this.type !== "textarea" ? h(WordCount, null, {
        default: (props) => {
          var _a2;
          return (_a2 = $slots.count) === null || _a2 === void 0 ? void 0 : _a2.call($slots, props);
        }
      }) : null, this.mergedShowPasswordOn && this.type === "password" ? h("div", {
        class: `${mergedClsPrefix}-input__eye`,
        onMousedown: this.handlePasswordToggleMousedown,
        onClick: this.handlePasswordToggleClick
      }, this.passwordVisible ? resolveSlot($slots["password-visible-icon"], () => [h(NBaseIcon, {
        clsPrefix: mergedClsPrefix
      }, {
        default: () => h(EyeIcon, null)
      })]) : resolveSlot($slots["password-invisible-icon"], () => [h(NBaseIcon, {
        clsPrefix: mergedClsPrefix
      }, {
        default: () => h(EyeOffIcon, null)
      })])) : null]) : null;
    })), this.pair ? h("span", {
      class: `${mergedClsPrefix}-input__separator`
    }, resolveSlot($slots.separator, () => [this.separator])) : null, this.pair ? h("div", {
      class: `${mergedClsPrefix}-input-wrapper`
    }, h("div", {
      class: `${mergedClsPrefix}-input__input`
    }, h("input", {
      ref: "inputEl2Ref",
      type: this.type,
      class: `${mergedClsPrefix}-input__input-el`,
      tabindex: this.passivelyActivated && !this.activated ? -1 : void 0,
      placeholder: this.mergedPlaceholder[1],
      disabled: this.mergedDisabled,
      maxlength: countGraphemes ? void 0 : this.maxlength,
      minlength: countGraphemes ? void 0 : this.minlength,
      value: Array.isArray(this.mergedValue) ? this.mergedValue[1] : void 0,
      readonly: this.readonly,
      style: this.textDecorationStyle[1],
      onBlur: this.handleInputBlur,
      onFocus: (e) => {
        this.handleInputFocus(e, 1);
      },
      onInput: (e) => {
        this.handleInput(e, 1);
      },
      onChange: (e) => {
        this.handleChange(e, 1);
      }
    }), this.showPlaceholder2 ? h("div", {
      class: `${mergedClsPrefix}-input__placeholder`
    }, h("span", null, this.mergedPlaceholder[1])) : null), resolveWrappedSlot($slots.suffix, (children) => {
      return (this.clearable || children) && h("div", {
        class: `${mergedClsPrefix}-input__suffix`
      }, [this.clearable && h(NBaseClear, {
        clsPrefix: mergedClsPrefix,
        show: this.showClearButton,
        onClear: this.handleClear
      }, {
        icon: () => {
          var _a2;
          return (_a2 = $slots["clear-icon"]) === null || _a2 === void 0 ? void 0 : _a2.call($slots);
        },
        placeholder: () => {
          var _a2;
          return (_a2 = $slots["clear-icon-placeholder"]) === null || _a2 === void 0 ? void 0 : _a2.call($slots);
        }
      }), children]);
    })) : null, this.mergedBordered ? h("div", {
      class: `${mergedClsPrefix}-input__border`
    }) : null, this.mergedBordered ? h("div", {
      class: `${mergedClsPrefix}-input__state-border`
    }) : null, this.showCount && type === "textarea" ? h(WordCount, null, {
      default: (props) => {
        var _a2;
        const {
          renderCount
        } = this;
        if (renderCount) {
          return renderCount(props);
        }
        return (_a2 = $slots.count) === null || _a2 === void 0 ? void 0 : _a2.call($slots, props);
      }
    }) : null);
  }
});
const commonVars = {
  padding: "8px 14px"
};
function self$1(vars) {
  const {
    borderRadius,
    boxShadow2,
    baseColor
  } = vars;
  return Object.assign(Object.assign({}, commonVars), {
    borderRadius,
    boxShadow: boxShadow2,
    color: composite(baseColor, "rgba(0, 0, 0, .85)"),
    textColor: baseColor
  });
}
const tooltipLight = createTheme({
  name: "Tooltip",
  common: derived,
  peers: {
    Popover: popoverLight
  },
  self: self$1
});
const tooltipProps = Object.assign(Object.assign({}, popoverBaseProps), useTheme.props);
const NTooltip = defineComponent({
  name: "Tooltip",
  props: tooltipProps,
  __popover__: true,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const themeRef = useTheme("Tooltip", "-tooltip", void 0, tooltipLight, props, mergedClsPrefixRef);
    const popoverRef = ref(null);
    const tooltipExposedMethod = {
      syncPosition() {
        popoverRef.value.syncPosition();
      },
      setShow(show) {
        popoverRef.value.setShow(show);
      }
    };
    return Object.assign(Object.assign({}, tooltipExposedMethod), {
      popoverRef,
      mergedTheme: themeRef,
      popoverThemeOverrides: computed(() => {
        return themeRef.value.self;
      })
    });
  },
  render() {
    const {
      mergedTheme,
      internalExtraClass
    } = this;
    return h(NPopover, Object.assign(Object.assign({}, this.$props), {
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      builtinThemeOverrides: this.popoverThemeOverrides,
      internalExtraClass: internalExtraClass.concat("tooltip"),
      ref: "popoverRef"
    }), this.$slots);
  }
});
const imagePreviewSharedProps = Object.assign(Object.assign({}, useTheme.props), {
  onPreviewPrev: Function,
  onPreviewNext: Function,
  showToolbar: {
    type: Boolean,
    default: true
  },
  showToolbarTooltip: Boolean,
  renderToolbar: Function
});
const imageContextKey = createInjectionKey("n-image");
function self() {
  return {
    toolbarIconColor: "rgba(255, 255, 255, .9)",
    toolbarColor: "rgba(0, 0, 0, .35)",
    toolbarBoxShadow: "none",
    toolbarBorderRadius: "24px"
  };
}
const imageLight = createTheme({
  name: "Image",
  common: derived,
  peers: {
    Tooltip: tooltipLight
  },
  self
});
const prevIcon = h("svg", {
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, h("path", {
  d: "M6 5C5.75454 5 5.55039 5.17688 5.50806 5.41012L5.5 5.5V14.5C5.5 14.7761 5.72386 15 6 15C6.24546 15 6.44961 14.8231 6.49194 14.5899L6.5 14.5V5.5C6.5 5.22386 6.27614 5 6 5ZM13.8536 5.14645C13.68 4.97288 13.4106 4.9536 13.2157 5.08859L13.1464 5.14645L8.64645 9.64645C8.47288 9.82001 8.4536 10.0894 8.58859 10.2843L8.64645 10.3536L13.1464 14.8536C13.3417 15.0488 13.6583 15.0488 13.8536 14.8536C14.0271 14.68 14.0464 14.4106 13.9114 14.2157L13.8536 14.1464L9.70711 10L13.8536 5.85355C14.0488 5.65829 14.0488 5.34171 13.8536 5.14645Z",
  fill: "currentColor"
}));
const nextIcon = h("svg", {
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, h("path", {
  d: "M13.5 5C13.7455 5 13.9496 5.17688 13.9919 5.41012L14 5.5V14.5C14 14.7761 13.7761 15 13.5 15C13.2545 15 13.0504 14.8231 13.0081 14.5899L13 14.5V5.5C13 5.22386 13.2239 5 13.5 5ZM5.64645 5.14645C5.82001 4.97288 6.08944 4.9536 6.28431 5.08859L6.35355 5.14645L10.8536 9.64645C11.0271 9.82001 11.0464 10.0894 10.9114 10.2843L10.8536 10.3536L6.35355 14.8536C6.15829 15.0488 5.84171 15.0488 5.64645 14.8536C5.47288 14.68 5.4536 14.4106 5.58859 14.2157L5.64645 14.1464L9.79289 10L5.64645 5.85355C5.45118 5.65829 5.45118 5.34171 5.64645 5.14645Z",
  fill: "currentColor"
}));
const closeIcon = h("svg", {
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, h("path", {
  d: "M4.089 4.216l.057-.07a.5.5 0 0 1 .638-.057l.07.057L10 9.293l5.146-5.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L10.707 10l5.147 5.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L10 10.707l-5.146 5.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L9.293 10L4.146 4.854a.5.5 0 0 1-.057-.638l.057-.07l-.057.07z",
  fill: "currentColor"
}));
const style = c([c("body >", [cB("image-container", "position: fixed;")]), cB("image-preview-container", `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 `), cB("image-preview-overlay", `
 z-index: -1;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background: rgba(0, 0, 0, .3);
 `, [fadeInTransition()]), cB("image-preview-toolbar", `
 z-index: 1;
 position: absolute;
 left: 50%;
 transform: translateX(-50%);
 border-radius: var(--n-toolbar-border-radius);
 height: 48px;
 bottom: 40px;
 padding: 0 12px;
 background: var(--n-toolbar-color);
 box-shadow: var(--n-toolbar-box-shadow);
 color: var(--n-toolbar-icon-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `, [cB("base-icon", `
 padding: 0 8px;
 font-size: 28px;
 cursor: pointer;
 `), fadeInTransition()]), cB("image-preview-wrapper", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 pointer-events: none;
 `, [fadeInScaleUpTransition()]), cB("image-preview", `
 user-select: none;
 -webkit-user-select: none;
 pointer-events: all;
 margin: auto;
 max-height: calc(100vh - 32px);
 max-width: calc(100vw - 32px);
 transition: transform .3s var(--n-bezier);
 `), cB("image", `
 display: inline-flex;
 max-height: 100%;
 max-width: 100%;
 `, [cNotM("preview-disabled", `
 cursor: pointer;
 `), c("img", `
 border-radius: inherit;
 `)])]);
const BLEEDING = 32;
const NImagePreview = defineComponent({
  name: "ImagePreview",
  props: Object.assign(Object.assign({}, imagePreviewSharedProps), {
    onNext: Function,
    onPrev: Function,
    clsPrefix: {
      type: String,
      required: true
    }
  }),
  setup(props) {
    const themeRef = useTheme("Image", "-image", style, imageLight, props, toRef(props, "clsPrefix"));
    let thumbnailEl = null;
    const previewRef = ref(null);
    const previewWrapperRef = ref(null);
    const previewSrcRef = ref(void 0);
    const showRef = ref(false);
    const displayedRef = ref(false);
    const {
      localeRef
    } = useLocale("Image");
    function syncTransformOrigin() {
      const {
        value: previewWrapper
      } = previewWrapperRef;
      if (!thumbnailEl || !previewWrapper)
        return;
      const {
        style: style2
      } = previewWrapper;
      const tbox = thumbnailEl.getBoundingClientRect();
      const tx = tbox.left + tbox.width / 2;
      const ty = tbox.top + tbox.height / 2;
      style2.transformOrigin = `${tx}px ${ty}px`;
    }
    function handleKeydown(e) {
      var _a, _b;
      switch (e.key) {
        case " ":
          e.preventDefault();
          break;
        case "ArrowLeft":
          (_a = props.onPrev) === null || _a === void 0 ? void 0 : _a.call(props);
          break;
        case "ArrowRight":
          (_b = props.onNext) === null || _b === void 0 ? void 0 : _b.call(props);
          break;
        case "Escape":
          toggleShow();
          break;
      }
    }
    watch(showRef, (value) => {
      if (value) {
        on("keydown", void 0, handleKeydown);
      } else {
        off("keydown", void 0, handleKeydown);
      }
    });
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let startOffsetX = 0;
    let startOffsetY = 0;
    let mouseDownClientX = 0;
    let mouseDownClientY = 0;
    let dragging = false;
    function handleMouseMove(e) {
      const {
        clientX,
        clientY
      } = e;
      offsetX = clientX - startX;
      offsetY = clientY - startY;
      beforeNextFrameOnce(derivePreviewStyle);
    }
    function getMoveStrategy(opts) {
      const {
        mouseUpClientX,
        mouseUpClientY,
        mouseDownClientX: mouseDownClientX2,
        mouseDownClientY: mouseDownClientY2
      } = opts;
      const deltaHorizontal = mouseDownClientX2 - mouseUpClientX;
      const deltaVertical = mouseDownClientY2 - mouseUpClientY;
      const moveVerticalDirection = `vertical${deltaVertical > 0 ? "Top" : "Bottom"}`;
      const moveHorizontalDirection = `horizontal${deltaHorizontal > 0 ? "Left" : "Right"}`;
      return {
        moveVerticalDirection,
        moveHorizontalDirection,
        deltaHorizontal,
        deltaVertical
      };
    }
    function getDerivedOffset(moveStrategy) {
      const {
        value: preview
      } = previewRef;
      if (!preview)
        return {
          offsetX: 0,
          offsetY: 0
        };
      const pbox = preview.getBoundingClientRect();
      const {
        moveVerticalDirection,
        moveHorizontalDirection,
        deltaHorizontal,
        deltaVertical
      } = moveStrategy || {};
      let nextOffsetX = 0;
      let nextOffsetY = 0;
      if (pbox.width <= (void 0).innerWidth) {
        nextOffsetX = 0;
      } else if (pbox.left > 0) {
        nextOffsetX = (pbox.width - (void 0).innerWidth) / 2;
      } else if (pbox.right < (void 0).innerWidth) {
        nextOffsetX = -(pbox.width - (void 0).innerWidth) / 2;
      } else if (moveHorizontalDirection === "horizontalRight") {
        nextOffsetX = Math.min((pbox.width - (void 0).innerWidth) / 2, startOffsetX - (deltaHorizontal !== null && deltaHorizontal !== void 0 ? deltaHorizontal : 0));
      } else {
        nextOffsetX = Math.max(-((pbox.width - (void 0).innerWidth) / 2), startOffsetX - (deltaHorizontal !== null && deltaHorizontal !== void 0 ? deltaHorizontal : 0));
      }
      if (pbox.height <= (void 0).innerHeight) {
        nextOffsetY = 0;
      } else if (pbox.top > 0) {
        nextOffsetY = (pbox.height - (void 0).innerHeight) / 2;
      } else if (pbox.bottom < (void 0).innerHeight) {
        nextOffsetY = -(pbox.height - (void 0).innerHeight) / 2;
      } else if (moveVerticalDirection === "verticalBottom") {
        nextOffsetY = Math.min((pbox.height - (void 0).innerHeight) / 2, startOffsetY - (deltaVertical !== null && deltaVertical !== void 0 ? deltaVertical : 0));
      } else {
        nextOffsetY = Math.max(-((pbox.height - (void 0).innerHeight) / 2), startOffsetY - (deltaVertical !== null && deltaVertical !== void 0 ? deltaVertical : 0));
      }
      return {
        offsetX: nextOffsetX,
        offsetY: nextOffsetY
      };
    }
    function handleMouseUp(e) {
      off("mousemove", void 0, handleMouseMove);
      off("mouseup", void 0, handleMouseUp);
      const {
        clientX: mouseUpClientX,
        clientY: mouseUpClientY
      } = e;
      dragging = false;
      const moveStrategy = getMoveStrategy({
        mouseUpClientX,
        mouseUpClientY,
        mouseDownClientX,
        mouseDownClientY
      });
      const offset = getDerivedOffset(moveStrategy);
      offsetX = offset.offsetX;
      offsetY = offset.offsetY;
      derivePreviewStyle();
    }
    const imageContext = inject(imageContextKey, null);
    function handlePreviewMousedown(e) {
      var _a, _b;
      (_b = (_a = imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef.value) === null || _a === void 0 ? void 0 : _a.onMousedown) === null || _b === void 0 ? void 0 : _b.call(_a, e);
      if (e.button !== 0)
        return;
      const {
        clientX,
        clientY
      } = e;
      dragging = true;
      startX = clientX - offsetX;
      startY = clientY - offsetY;
      startOffsetX = offsetX;
      startOffsetY = offsetY;
      mouseDownClientX = clientX;
      mouseDownClientY = clientY;
      derivePreviewStyle();
      on("mousemove", void 0, handleMouseMove);
      on("mouseup", void 0, handleMouseUp);
    }
    const scaleRadix = 1.5;
    let scaleExp = 0;
    let scale = 1;
    let rotate = 0;
    function handlePreviewDblclick(e) {
      var _a, _b;
      (_b = (_a = imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef.value) === null || _a === void 0 ? void 0 : _a.onDblclick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
      const originalImageSizeScale = getOrignalImageSizeScale();
      scale = scale === originalImageSizeScale ? 1 : originalImageSizeScale;
      derivePreviewStyle();
    }
    function resetScale() {
      scale = 1;
      scaleExp = 0;
    }
    function handleSwitchPrev() {
      var _a;
      resetScale();
      rotate = 0;
      (_a = props.onPrev) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    function handleSwitchNext() {
      var _a;
      resetScale();
      rotate = 0;
      (_a = props.onNext) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    function rotateCounterclockwise() {
      rotate -= 90;
      derivePreviewStyle();
    }
    function rotateClockwise() {
      rotate += 90;
      derivePreviewStyle();
    }
    function getMaxScale() {
      const {
        value: preview
      } = previewRef;
      if (!preview)
        return 1;
      const {
        innerWidth,
        innerHeight
      } = void 0;
      const heightMaxScale = Math.max(1, preview.naturalHeight / (innerHeight - BLEEDING));
      const widthMaxScale = Math.max(1, preview.naturalWidth / (innerWidth - BLEEDING));
      return Math.max(3, heightMaxScale * 2, widthMaxScale * 2);
    }
    function getOrignalImageSizeScale() {
      const {
        value: preview
      } = previewRef;
      if (!preview)
        return 1;
      const {
        innerWidth,
        innerHeight
      } = void 0;
      const heightScale = preview.naturalHeight / (innerHeight - BLEEDING);
      const widthScale = preview.naturalWidth / (innerWidth - BLEEDING);
      if (heightScale < 1 && widthScale < 1) {
        return 1;
      }
      return Math.max(heightScale, widthScale);
    }
    function zoomIn() {
      const maxScale = getMaxScale();
      if (scale < maxScale) {
        scaleExp += 1;
        scale = Math.min(maxScale, Math.pow(scaleRadix, scaleExp));
        derivePreviewStyle();
      }
    }
    function zoomOut() {
      if (scale > 0.5) {
        const originalScale = scale;
        scaleExp -= 1;
        scale = Math.max(0.5, Math.pow(scaleRadix, scaleExp));
        const diff = originalScale - scale;
        derivePreviewStyle(false);
        const offset = getDerivedOffset();
        scale += diff;
        derivePreviewStyle(false);
        scale -= diff;
        offsetX = offset.offsetX;
        offsetY = offset.offsetY;
        derivePreviewStyle();
      }
    }
    function handleDownloadClick() {
      const src = previewSrcRef.value;
      if (src) {
        download(src);
      }
    }
    function derivePreviewStyle(transition = true) {
      var _a;
      const {
        value: preview
      } = previewRef;
      if (!preview)
        return;
      const {
        style: style2
      } = preview;
      const controlledStyle = normalizeStyle((_a = imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef.value) === null || _a === void 0 ? void 0 : _a.style);
      let controlledStyleString = "";
      if (typeof controlledStyle === "string") {
        controlledStyleString = `${controlledStyle};`;
      } else {
        for (const key in controlledStyle) {
          controlledStyleString += `${kebabCase(key)}: ${controlledStyle[key]};`;
        }
      }
      const transformStyle = `transform-origin: center; transform: translateX(${offsetX}px) translateY(${offsetY}px) rotate(${rotate}deg) scale(${scale});`;
      if (dragging) {
        style2.cssText = `${controlledStyleString}cursor: grabbing; transition: none;${transformStyle}`;
      } else {
        style2.cssText = `${controlledStyleString}cursor: grab;${transformStyle}${transition ? "" : "transition: none;"}`;
      }
      if (!transition) {
        void preview.offsetHeight;
      }
    }
    function toggleShow() {
      showRef.value = !showRef.value;
      displayedRef.value = true;
    }
    function resizeToOrignalImageSize() {
      scale = getOrignalImageSizeScale();
      scaleExp = Math.ceil(Math.log(scale) / Math.log(scaleRadix));
      offsetX = 0;
      offsetY = 0;
      derivePreviewStyle();
    }
    const exposedMethods = {
      setPreviewSrc: (src) => {
        previewSrcRef.value = src;
      },
      setThumbnailEl: (el) => {
        thumbnailEl = el;
      },
      toggleShow
    };
    function withTooltip(node, tooltipKey) {
      if (props.showToolbarTooltip) {
        const {
          value: theme
        } = themeRef;
        return h(NTooltip, {
          to: false,
          theme: theme.peers.Tooltip,
          themeOverrides: theme.peerOverrides.Tooltip,
          keepAliveOnHover: false
        }, {
          default: () => {
            return localeRef.value[tooltipKey];
          },
          trigger: () => node
        });
      } else {
        return node;
      }
    }
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          toolbarIconColor,
          toolbarBorderRadius,
          toolbarBoxShadow,
          toolbarColor
        }
      } = themeRef.value;
      return {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-toolbar-icon-color": toolbarIconColor,
        "--n-toolbar-color": toolbarColor,
        "--n-toolbar-border-radius": toolbarBorderRadius,
        "--n-toolbar-box-shadow": toolbarBoxShadow
      };
    });
    const {
      inlineThemeDisabled
    } = useConfig();
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("image-preview", void 0, cssVarsRef, props) : void 0;
    return Object.assign({
      previewRef,
      previewWrapperRef,
      previewSrc: previewSrcRef,
      show: showRef,
      appear: useIsMounted(),
      displayed: displayedRef,
      previewedImgProps: imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef,
      handleWheel(e) {
        e.preventDefault();
      },
      handlePreviewMousedown,
      handlePreviewDblclick,
      syncTransformOrigin,
      handleAfterLeave: () => {
        resetScale();
        rotate = 0;
        displayedRef.value = false;
      },
      handleDragStart: (e) => {
        var _a, _b;
        (_b = (_a = imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef.value) === null || _a === void 0 ? void 0 : _a.onDragstart) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        e.preventDefault();
      },
      zoomIn,
      zoomOut,
      handleDownloadClick,
      rotateCounterclockwise,
      rotateClockwise,
      handleSwitchPrev,
      handleSwitchNext,
      withTooltip,
      resizeToOrignalImageSize,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    }, exposedMethods);
  },
  render() {
    var _a, _b;
    const {
      clsPrefix,
      renderToolbar,
      withTooltip
    } = this;
    const prevNode = withTooltip(h(NBaseIcon, {
      clsPrefix,
      onClick: this.handleSwitchPrev
    }, {
      default: () => prevIcon
    }), "tipPrevious");
    const nextNode = withTooltip(h(NBaseIcon, {
      clsPrefix,
      onClick: this.handleSwitchNext
    }, {
      default: () => nextIcon
    }), "tipNext");
    const rotateCounterclockwiseNode = withTooltip(h(NBaseIcon, {
      clsPrefix,
      onClick: this.rotateCounterclockwise
    }, {
      default: () => h(RotateCounterclockwiseIcon, null)
    }), "tipCounterclockwise");
    const rotateClockwiseNode = withTooltip(h(NBaseIcon, {
      clsPrefix,
      onClick: this.rotateClockwise
    }, {
      default: () => h(RotateClockwiseIcon, null)
    }), "tipClockwise");
    const originalSizeNode = withTooltip(h(NBaseIcon, {
      clsPrefix,
      onClick: this.resizeToOrignalImageSize
    }, {
      default: () => {
        return h(ResizeSmallIcon, null);
      }
    }), "tipOriginalSize");
    const zoomOutNode = withTooltip(h(NBaseIcon, {
      clsPrefix,
      onClick: this.zoomOut
    }, {
      default: () => h(ZoomOutIcon, null)
    }), "tipZoomOut");
    const downloadNode = withTooltip(h(NBaseIcon, {
      clsPrefix,
      onClick: this.handleDownloadClick
    }, {
      default: () => h(DownloadIcon, null)
    }), "tipDownload");
    const closeNode = withTooltip(h(NBaseIcon, {
      clsPrefix,
      onClick: this.toggleShow
    }, {
      default: () => closeIcon
    }), "tipClose");
    const zoomInNode = withTooltip(h(NBaseIcon, {
      clsPrefix,
      onClick: this.zoomIn
    }, {
      default: () => h(ZoomInIcon, null)
    }), "tipZoomIn");
    return h(Fragment, null, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a), h(LazyTeleport, {
      show: this.show
    }, {
      default: () => {
        var _a2;
        if (!(this.show || this.displayed)) {
          return null;
        }
        (_a2 = this.onRender) === null || _a2 === void 0 ? void 0 : _a2.call(this);
        return withDirectives(h("div", {
          class: [`${clsPrefix}-image-preview-container`, this.themeClass],
          style: this.cssVars,
          onWheel: this.handleWheel
        }, h(Transition, {
          name: "fade-in-transition",
          appear: this.appear
        }, {
          default: () => this.show ? h("div", {
            class: `${clsPrefix}-image-preview-overlay`,
            onClick: this.toggleShow
          }) : null
        }), this.showToolbar ? h(Transition, {
          name: "fade-in-transition",
          appear: this.appear
        }, {
          default: () => {
            if (!this.show)
              return null;
            return h("div", {
              class: `${clsPrefix}-image-preview-toolbar`
            }, renderToolbar ? renderToolbar({
              nodes: {
                prev: prevNode,
                next: nextNode,
                rotateCounterclockwise: rotateCounterclockwiseNode,
                rotateClockwise: rotateClockwiseNode,
                resizeToOriginalSize: originalSizeNode,
                zoomOut: zoomOutNode,
                zoomIn: zoomInNode,
                download: downloadNode,
                close: closeNode
              }
            }) : h(Fragment, null, this.onPrev ? h(Fragment, null, prevNode, nextNode) : null, rotateCounterclockwiseNode, rotateClockwiseNode, originalSizeNode, zoomOutNode, zoomInNode, downloadNode, closeNode));
          }
        }) : null, h(Transition, {
          name: "fade-in-scale-up-transition",
          onAfterLeave: this.handleAfterLeave,
          appear: this.appear,
          // BUG:
          // onEnter will be called twice, I don't know why
          // Maybe it is a bug of vue
          onEnter: this.syncTransformOrigin,
          onBeforeLeave: this.syncTransformOrigin
        }, {
          default: () => {
            const {
              previewedImgProps = {}
            } = this;
            return withDirectives(h("div", {
              class: `${clsPrefix}-image-preview-wrapper`,
              ref: "previewWrapperRef"
            }, h("img", Object.assign({}, previewedImgProps, {
              draggable: false,
              onMousedown: this.handlePreviewMousedown,
              onDblclick: this.handlePreviewDblclick,
              class: [`${clsPrefix}-image-preview`, previewedImgProps.class],
              key: this.previewSrc,
              src: this.previewSrc,
              ref: "previewRef",
              onDragstart: this.handleDragStart
            }))), [[vShow, this.show]]);
          }
        })), [[zindexable, {
          enabled: this.show
        }]]);
      }
    }));
  }
});
const imageGroupInjectionKey = createInjectionKey("n-image-group");
const imageGroupProps = imagePreviewSharedProps;
defineComponent({
  name: "ImageGroup",
  props: imageGroupProps,
  setup(props) {
    let currentSrc;
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const groupId = `c${createId()}`;
    const vm = getCurrentInstance();
    const previewInstRef = ref(null);
    const setPreviewSrc = (src) => {
      var _a;
      currentSrc = src;
      (_a = previewInstRef.value) === null || _a === void 0 ? void 0 : _a.setPreviewSrc(src);
    };
    function go(step) {
      var _a, _b;
      if (!(vm === null || vm === void 0 ? void 0 : vm.proxy))
        return;
      const container = vm.proxy.$el.parentElement;
      const imgs = container.querySelectorAll(`[data-group-id=${groupId}]:not([data-error=true])`);
      if (!imgs.length)
        return;
      const index = Array.from(imgs).findIndex((img) => img.dataset.previewSrc === currentSrc);
      if (~index) {
        setPreviewSrc(imgs[(index + step + imgs.length) % imgs.length].dataset.previewSrc);
      } else {
        setPreviewSrc(imgs[0].dataset.previewSrc);
      }
      if (step === 1) {
        (_a = props.onPreviewNext) === null || _a === void 0 ? void 0 : _a.call(props);
      } else {
        (_b = props.onPreviewPrev) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    }
    provide(imageGroupInjectionKey, {
      mergedClsPrefixRef,
      setPreviewSrc,
      setThumbnailEl: (el) => {
        var _a;
        (_a = previewInstRef.value) === null || _a === void 0 ? void 0 : _a.setThumbnailEl(el);
      },
      toggleShow: () => {
        var _a;
        (_a = previewInstRef.value) === null || _a === void 0 ? void 0 : _a.toggleShow();
      },
      groupId,
      renderToolbarRef: toRef(props, "renderToolbar")
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      previewInstRef,
      next: () => {
        go(1);
      },
      prev: () => {
        go(-1);
      }
    };
  },
  render() {
    return h(NImagePreview, {
      theme: this.theme,
      themeOverrides: this.themeOverrides,
      clsPrefix: this.mergedClsPrefix,
      ref: "previewInstRef",
      onPrev: this.prev,
      onNext: this.next,
      showToolbar: this.showToolbar,
      showToolbarTooltip: this.showToolbarTooltip,
      renderToolbar: this.renderToolbar
    }, this.$slots);
  }
});
const imageProps = Object.assign({
  alt: String,
  height: [String, Number],
  imgProps: Object,
  previewedImgProps: Object,
  lazy: Boolean,
  intersectionObserverOptions: Object,
  objectFit: {
    type: String,
    default: "fill"
  },
  previewSrc: String,
  fallbackSrc: String,
  width: [String, Number],
  src: String,
  previewDisabled: Boolean,
  loadDescription: String,
  onError: Function,
  onLoad: Function
}, imagePreviewSharedProps);
const NImage = defineComponent({
  name: "Image",
  props: imageProps,
  inheritAttrs: false,
  setup(props) {
    const imageRef = ref(null);
    const showErrorRef = ref(false);
    const previewInstRef = ref(null);
    const imageGroupHandle = inject(imageGroupInjectionKey, null);
    const {
      mergedClsPrefixRef
    } = imageGroupHandle || useConfig(props);
    const exposedMethods = {
      click: () => {
        if (props.previewDisabled || showErrorRef.value)
          return;
        const mergedPreviewSrc = props.previewSrc || props.src;
        if (imageGroupHandle) {
          imageGroupHandle.setPreviewSrc(mergedPreviewSrc);
          imageGroupHandle.setThumbnailEl(imageRef.value);
          imageGroupHandle.toggleShow();
          return;
        }
        const {
          value: previewInst
        } = previewInstRef;
        if (!previewInst)
          return;
        previewInst.setPreviewSrc(mergedPreviewSrc);
        previewInst.setThumbnailEl(imageRef.value);
        previewInst.toggleShow();
      }
    };
    const shouldStartLoadingRef = ref(!props.lazy);
    watchEffect(() => {
      var _a;
      void (props.src || ((_a = props.imgProps) === null || _a === void 0 ? void 0 : _a.src));
      showErrorRef.value = false;
    });
    const loadedRef = ref(false);
    provide(imageContextKey, {
      previewedImgPropsRef: toRef(props, "previewedImgProps")
    });
    return Object.assign({
      mergedClsPrefix: mergedClsPrefixRef,
      groupId: imageGroupHandle === null || imageGroupHandle === void 0 ? void 0 : imageGroupHandle.groupId,
      previewInstRef,
      imageRef,
      showError: showErrorRef,
      shouldStartLoading: shouldStartLoadingRef,
      loaded: loadedRef,
      mergedOnClick: (e) => {
        var _a, _b;
        exposedMethods.click();
        (_b = (_a = props.imgProps) === null || _a === void 0 ? void 0 : _a.onClick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
      },
      mergedOnError: (e) => {
        if (!shouldStartLoadingRef.value)
          return;
        showErrorRef.value = true;
        const {
          onError,
          imgProps: {
            onError: imgPropsOnError
          } = {}
        } = props;
        onError === null || onError === void 0 ? void 0 : onError(e);
        imgPropsOnError === null || imgPropsOnError === void 0 ? void 0 : imgPropsOnError(e);
      },
      mergedOnLoad: (e) => {
        const {
          onLoad,
          imgProps: {
            onLoad: imgPropsOnLoad
          } = {}
        } = props;
        onLoad === null || onLoad === void 0 ? void 0 : onLoad(e);
        imgPropsOnLoad === null || imgPropsOnLoad === void 0 ? void 0 : imgPropsOnLoad(e);
        loadedRef.value = true;
      }
    }, exposedMethods);
  },
  render() {
    var _a, _b;
    const {
      mergedClsPrefix,
      imgProps = {},
      loaded,
      $attrs,
      lazy
    } = this;
    const placeholderNode = (_b = (_a = this.$slots).placeholder) === null || _b === void 0 ? void 0 : _b.call(_a);
    const loadSrc = this.src || imgProps.src;
    const imgNode = h("img", Object.assign(Object.assign({}, imgProps), {
      ref: "imageRef",
      width: this.width || imgProps.width,
      height: this.height || imgProps.height,
      src: this.showError ? this.fallbackSrc : lazy && this.intersectionObserverOptions ? this.shouldStartLoading ? loadSrc : void 0 : loadSrc,
      alt: this.alt || imgProps.alt,
      "aria-label": this.alt || imgProps.alt,
      onClick: this.mergedOnClick,
      onError: this.mergedOnError,
      onLoad: this.mergedOnLoad,
      // If interseciton observer options is set, do not use native lazy
      loading: "eager",
      style: [imgProps.style || "", placeholderNode && !loaded ? {
        height: "0",
        width: "0",
        visibility: "hidden"
      } : "", {
        objectFit: this.objectFit
      }],
      "data-error": this.showError,
      "data-preview-src": this.previewSrc || this.src
    }));
    return h("div", Object.assign({}, $attrs, {
      role: "none",
      class: [$attrs.class, `${mergedClsPrefix}-image`, (this.previewDisabled || this.showError) && `${mergedClsPrefix}-image--preview-disabled`]
    }), this.groupId ? imgNode : h(NImagePreview, {
      theme: this.theme,
      themeOverrides: this.themeOverrides,
      clsPrefix: mergedClsPrefix,
      ref: "previewInstRef",
      showToolbar: this.showToolbar,
      showToolbarTooltip: this.showToolbarTooltip,
      renderToolbar: this.renderToolbar
    }, {
      default: () => imgNode,
      toolbar: () => {
        var _a2, _b2;
        return (_b2 = (_a2 = this.$slots).toolbar) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
      }
    }), !loaded && placeholderNode);
  }
});
const LogoKaynar = "" + buildAssetsURL("logo.CHX3xMqK.png");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    CardStorage.getInstance();
    useRouter();
    const navigation = [
      { name: "\u0410\u0432\u0442\u043E\u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438", to: "index" },
      { name: "\u041A\u043E\u043B\u0435\u0441\u0430 \u0438 \u0448\u0438\u043D\u044B", to: "services" },
      { name: "\u0417\u0430\u043F\u0440\u043E\u0441 \u0434\u0435\u0442\u0430\u043B\u0438", to: "services" },
      { name: "\u041A\u0443\u043F\u0438\u0442\u044C \u043E\u043D\u043B\u0430\u0439\u043D", to: "services" }
    ];
    const route = useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full z-[9999]" }, _attrs))}><div class="w-full bg-black z-[9999] lg:border-b border-b-slate-100"><div class="mx-auto justify-between bg-black items-center text-white flex container px-4 p-2"><div class="flex items-center gap-5">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: "flex gap-5",
        to: {
          name: "index"
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(NImage), {
              "preview-disabled": "",
              class: "w-12 h-12",
              alt: "\u041B\u043E\u0433\u043E",
              src: unref(LogoKaynar)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(unref(NImage), {
                  "preview-disabled": "",
                  class: "w-12 h-12",
                  alt: "\u041B\u043E\u0433\u043E",
                  src: unref(LogoKaynar)
                }, null, 8, ["src"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(NInput), {
        round: "",
        type: "text",
        size: "large",
        placeholder: "\u0418\u0441\u043A\u0430\u0442\u044C"
      }, {
        prefix: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(NIcon), { component: unref(Search) }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(NIcon), { component: unref(Search) }, null, 8, ["component"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex gap-3"><div class="cursor-pointer hidden lg:block">`);
      _push(ssrRenderComponent(unref(PersonOutline), { class: "w-6 h-6" }, null, _parent));
      _push(`</div><div class="cursor-pointer hidden lg:block">`);
      _push(ssrRenderComponent(unref(HeartOutline), { class: "w-6 h-6" }, null, _parent));
      _push(`</div><div class="cursor-pointer hidden lg:block">`);
      _push(ssrRenderComponent(unref(BagOutline), { class: "w-6 h-6" }, null, _parent));
      _push(`</div><div class="cursor-pointer">`);
      _push(ssrRenderComponent(unref(Bars3Icon), { class: "w-6 h-6" }, null, _parent));
      _push(`</div></div></div></div><div class="bg-white hidden lg:block w-full"><div class="mx-auto container px-4"><div class="flex p-2 items-center justify-between"><div class="flex items-baseline"><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(ssrRenderComponent(_component_nuxt_link, {
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
      _push(`<!--]--></div><ul class="flex gap-2 text-xs cursor-pointer"><li class="hover:underline">\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430</li><li class="hover:underline">\u0412\u043E\u0437\u0432\u0440\u0430\u0442</li><li class="hover:underline">\u041E\u043F\u043B\u0430\u0442\u0430</li><li class="hover:underline">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</li><li class="hover:underline">\u041F\u0440\u043E\u0434\u0430\u0432\u0430\u0439\u0442\u0435</li></ul></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "footer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 pt-16 mx-auto container md:px-24 lg:px-8" }, _attrs))}><div class="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4"><div class="sm:col-span-2"><div aria-label="\u0414\u043E\u043C\u043E\u0439" title="Company" class="inline-flex items-center">`);
      _push(ssrRenderComponent(unref(NImage), {
        class: "w-12 h-12 rounded-lg",
        src: unref(LogoKaynar)
      }, null, _parent));
      _push(`<span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">Kaynar Avto</span></div><div class="mt-6 lg:max-w-sm"><p class="text-sm text-gray-800"> \u041C\u044B \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u043C \u0448\u0438\u0440\u043E\u043A\u0438\u0439 \u0430\u0441\u0441\u043E\u0440\u0442\u0438\u043C\u0435\u043D\u0442 \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0435\u0439 \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0445 \u043C\u0430\u0440\u043E\u043A \u0438 \u043C\u043E\u0434\u0435\u043B\u0435\u0439. </p><p class="mt-4 text-sm text-gray-800"> \u041D\u0430\u0448\u0430 \u0446\u0435\u043B\u044C \u2014 \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0442\u044C \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0434\u0435\u0442\u0430\u043B\u0438 \u043F\u043E \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u043C \u0446\u0435\u043D\u0430\u043C \u0438 \u043D\u0430\u0434\u0435\u0436\u043D\u043E\u0435 \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435. </p></div></div><div class="space-y-2 text-sm"><p class="text-base font-bold tracking-wide text-gray-900">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</p><div class="flex"><p class="mr-1 text-gray-800">\u0422\u0435\u043B\u0435\u0444\u043E\u043D:</p><a href="tel:850-123-5021" aria-label="Our phone" title="Our phone" class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">850-123-5021</a></div><div class="flex"><p class="mr-1 text-gray-800">\u041F\u043E\u0447\u0442\u0430:</p><a href="mailto:info@lorem.mail" aria-label="Our email" title="Our email" class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">info@lorem.mail</a></div><div class="flex"><p class="mr-1 text-gray-800">\u0410\u0434\u0440\u0435\u0441:</p><a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address" title="Our address" class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"> 312 Lovely Street, NY </a></div></div><div><span class="text-base font-bold tracking-wide text-gray-900">\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438</span><div class="flex items-center mt-1 space-x-3"><a href="/" class="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"><svg viewBox="0 0 24 24" fill="currentColor" class="h-5"><path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z"></path></svg></a><a href="/" class="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"><svg viewBox="0 0 30 30" fill="currentColor" class="h-6"><circle cx="15" cy="15" r="4"></circle><path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path></svg></a><a href="/" class="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"><svg viewBox="0 0 24 24" fill="currentColor" class="h-5"><path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z"></path></svg></a></div><p class="mt-4 text-sm text-gray-500"> \u041F\u043E\u0434\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \u043D\u0430\u0448\u0443 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443 \u0438 \u0431\u0443\u0434\u044C\u0442\u0435 \u0432 \u043A\u0443\u0440\u0441\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0445 \u043D\u043E\u0432\u0438\u043D\u043E\u043A, \u0430\u043A\u0446\u0438\u0439 \u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439 </p></div></div><div class="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row"><p class="text-sm text-gray-600"> \xA9 Copyright 2024 Kaynar Avto. \u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B. </p><ul class="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row"><li><a href="/" class="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">\u0427\u0430\u0441\u0442\u043E \u0437\u0430\u0434\u0430\u0432\u0430\u0435\u043C\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B (FAQ)</a></li><li><a href="/" class="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C</a></li><li><a href="/" class="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">\u041F\u043E\u0438\u0441\u043A \u043F\u043E VIN \u043A\u043E\u0434\u0443</a></li><li><a href="/" class="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u043F\u043E \u0443\u0445\u043E\u0434\u0443</a></li></ul></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(NDrawer), {
        show: unref(isOpenCart),
        "onUpdate:show": ($event) => isRef(isOpenCart) ? isOpenCart.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(NDrawerContent), {
              title: "\u0412\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430",
              closable: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Button), {
                    class: "w-full",
                    type: "primary"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437`);
                      } else {
                        return [
                          createTextVNode("\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3),
                    createVNode(unref(Button), {
                      class: "w-full",
                      type: "primary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(NDrawerContent), {
                title: "\u0412\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430",
                closable: ""
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3),
                  createVNode(unref(Button), {
                    class: "w-full",
                    type: "primary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437")
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
      _push(`<div class="relative min-h-full bg-slate-100">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<div class="bg-slate-100">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-Bd3wpriq.mjs.map
