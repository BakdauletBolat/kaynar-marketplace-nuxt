import { defineComponent, h, provide, toRef, computed, inject, ref, mergeProps, Transition, Fragment, watch, watchEffect, nextTick, withDirectives, useSSRContext, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, renderList, getCurrentInstance, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { getPadding, createId, pxfy, repeat, depx, happensIn, getPreciseEventTarget, changeColor } from 'seemly';
import { c as cB, a as c, b as cM, d as cE, u as useTheme, e as useThemeClass, r as resolveSlot, f as asModal, i as insideModal, g as insidePopover, h as useRtl, j as createKey, k as resolveWrappedSlot, l as ensureValidVNode, N as NBaseClose, m as useFormItem, n as iconSwitchTransition, o as NIconSwitchTransition, p as cNotM, q as flatten, s as popoverBodyInjectionKey, t as modalBodyInjectionKey, v as drawerBodyInjectionKey, X as XScrollbar, w as renderArrow, x as fadeInScaleUpTransition, y as popoverBaseProps, z as call, A as NPopover, B as keep, C as formItemInjectionKey, D as NBaseIcon, E as NBaseLoading, F as NFadeInExpandTransition, G as useAdjustedTo, H as useLocale, I as Button, J as derived, K as createTheme, L as popoverLight, M as formatLength, O as scrollbarLight, P as markEventEffectPerformed, Q as commonVariables$2$1 } from './Button-DJbEEsUs.mjs';
import { u as useConfig, w as warn, d as defineStore, b as useRouter, c as createInjectionKey } from './server.mjs';
import { FunnelIcon } from '@heroicons/vue/20/solid';
import { useRoute } from 'vue-router';
import { a as axiosInstance } from './index-C5IDfPQf.mjs';
import { u as useProductStore, _ as _sfc_main$3, a as useCategoryStore, b as useManufacturerStore } from './product-store-C1z4bZAH.mjs';
import Schema from 'async-validator';
import { get } from 'lodash-es';
import { r as render, N as NEmpty, a as NInternalSelection, F as FocusDetector, e as emptyLight, i as internalSelectionLight, b as NSelect } from './Select-B5PHYIHa.mjs';
import { VBinder, VTarget, VFollower, VVirtualList } from 'vueuc';
import { useMergedState, useMemo, useKeyboard as useKeyboard$1, useIsMounted } from 'vooks';
import { clickoutside } from 'vdirs';
import { createTreeMate, flatten as flatten$1, createIndexGetter } from 'treemate';
import { on } from 'evtd';
import { N as NIcon, a as NDrawer, b as NDrawerContent } from './DrawerContent-GVhmRteA.mjs';

function getSlot(instance, slotName = "default", fallback = []) {
  const slots = instance.$slots;
  const slot = slots[slotName];
  if (slot === void 0)
    return fallback;
  return slot();
}
function keysOf(obj) {
  return Object.keys(obj);
}
function createDataKey(key) {
  return typeof key === "string" ? `s-${key}` : `n-${key}`;
}
function createRefSetter(ref2) {
  return (inst) => {
    if (inst) {
      ref2.value = inst.$el;
    } else {
      ref2.value = null;
    }
  };
}
function useInjectionInstanceCollection(injectionName, collectionKey, registerKeyRef) {
  var _a;
  const injection = inject(injectionName, null);
  if (injection === null)
    return;
  const vm = (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy;
  watch(registerKeyRef, registerInstance);
  registerInstance(registerKeyRef.value);
  function registerInstance(key, oldKey) {
    if (!injection)
      return;
    const collection = injection[collectionKey];
    if (oldKey !== void 0)
      removeInstance(collection, oldKey);
    if (key !== void 0)
      addInstance(collection, key);
  }
  function removeInstance(collection, key) {
    if (!collection[key])
      collection[key] = [];
    collection[key].splice(collection[key].findIndex((instance) => instance === vm), 1);
  }
  function addInstance(collection, key) {
    if (!collection[key])
      collection[key] = [];
    if (!~collection[key].findIndex((instance) => instance === vm)) {
      collection[key].push(vm);
    }
  }
}
function useDeferredTrue(valueRef, delay, shouldDelayRef) {
  const delayedRef = ref(valueRef.value);
  let timerId = null;
  watch(valueRef, (value) => {
    if (timerId !== null)
      (void 0).clearTimeout(timerId);
    if (value === true) {
      if (shouldDelayRef && !shouldDelayRef.value) {
        delayedRef.value = true;
      } else {
        timerId = (void 0).setTimeout(() => {
          delayedRef.value = true;
        }, delay);
      }
    } else {
      delayedRef.value = false;
    }
  });
  return delayedRef;
}
const ChevronRightIcon = defineComponent({
  name: "ChevronRight",
  render() {
    return h("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, h("path", {
      d: "M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",
      fill: "currentColor"
    }));
  }
});
const SwitcherIcon = defineComponent({
  name: "Switcher",
  render() {
    return h("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32"
    }, h("path", {
      d: "M12 8l10 8l-10 8z"
    }));
  }
});
const ArrowBackIcon = defineComponent({
  name: "ArrowBack",
  render() {
    return h("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24"
    }, h("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), h("path", {
      d: "M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"
    }));
  }
});
const {
  cubicBezierEaseInOut: cubicBezierEaseInOut$1,
  cubicBezierEaseOut,
  cubicBezierEaseIn
} = commonVariables$2$1;
function fadeInHeightExpandTransition({
  overflow = "hidden",
  duration = ".3s",
  originalTransition = "",
  leavingDelay = "0s",
  foldPadding = false,
  enterToProps = void 0,
  leaveToProps = void 0,
  reverse = false
} = {}) {
  const enterClass = reverse ? "leave" : "enter";
  const leaveClass = reverse ? "enter" : "leave";
  return [c(`&.fade-in-height-expand-transition-${leaveClass}-from,
 &.fade-in-height-expand-transition-${enterClass}-to`, Object.assign(Object.assign({}, enterToProps), {
    opacity: 1
  })), c(`&.fade-in-height-expand-transition-${leaveClass}-to,
 &.fade-in-height-expand-transition-${enterClass}-from`, Object.assign(Object.assign({}, leaveToProps), {
    opacity: 0,
    marginTop: "0 !important",
    marginBottom: "0 !important",
    paddingTop: foldPadding ? "0 !important" : void 0,
    paddingBottom: foldPadding ? "0 !important" : void 0
  })), c(`&.fade-in-height-expand-transition-${leaveClass}-active`, `
 overflow: ${overflow};
 transition:
 max-height ${duration} ${cubicBezierEaseInOut$1} ${leavingDelay},
 opacity ${duration} ${cubicBezierEaseOut} ${leavingDelay},
 margin-top ${duration} ${cubicBezierEaseInOut$1} ${leavingDelay},
 margin-bottom ${duration} ${cubicBezierEaseInOut$1} ${leavingDelay},
 padding-top ${duration} ${cubicBezierEaseInOut$1} ${leavingDelay},
 padding-bottom ${duration} ${cubicBezierEaseInOut$1} ${leavingDelay}
 ${originalTransition ? `,${originalTransition}` : ""}
 `), c(`&.fade-in-height-expand-transition-${enterClass}-active`, `
 overflow: ${overflow};
 transition:
 max-height ${duration} ${cubicBezierEaseInOut$1},
 opacity ${duration} ${cubicBezierEaseIn},
 margin-top ${duration} ${cubicBezierEaseInOut$1},
 margin-bottom ${duration} ${cubicBezierEaseInOut$1},
 padding-top ${duration} ${cubicBezierEaseInOut$1},
 padding-bottom ${duration} ${cubicBezierEaseInOut$1}
 ${originalTransition ? `,${originalTransition}` : ""}
 `)];
}
const commonVariables$5 = {
  fontWeightActive: "400"
};
function self$9(vars) {
  const {
    fontSize,
    textColor3,
    textColor2,
    borderRadius,
    buttonColor2Hover,
    buttonColor2Pressed
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$5), {
    fontSize,
    itemLineHeight: "1.25",
    itemTextColor: textColor3,
    itemTextColorHover: textColor2,
    itemTextColorPressed: textColor2,
    itemTextColorActive: textColor2,
    itemBorderRadius: borderRadius,
    itemColorHover: buttonColor2Hover,
    itemColorPressed: buttonColor2Pressed,
    separatorColor: textColor3
  });
}
const breadcrumbLight = {
  name: "Breadcrumb",
  common: derived,
  self: self$9
};
const style$b = cB("breadcrumb", `
 white-space: nowrap;
 cursor: default;
 line-height: var(--n-item-line-height);
`, [c("ul", `
 list-style: none;
 padding: 0;
 margin: 0;
 `), c("a", `
 color: inherit;
 text-decoration: inherit;
 `), cB("breadcrumb-item", `
 font-size: var(--n-font-size);
 transition: color .3s var(--n-bezier);
 display: inline-flex;
 align-items: center;
 `, [cB("icon", `
 font-size: 18px;
 vertical-align: -.2em;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `), c("&:not(:last-child)", [cM("clickable", [cE("link", `
 cursor: pointer;
 `, [c("&:hover", `
 background-color: var(--n-item-color-hover);
 `), c("&:active", `
 background-color: var(--n-item-color-pressed); 
 `)])])]), cE("link", `
 padding: 4px;
 border-radius: var(--n-item-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 position: relative;
 `, [c("&:hover", `
 color: var(--n-item-text-color-hover);
 `, [cB("icon", `
 color: var(--n-item-text-color-hover);
 `)]), c("&:active", `
 color: var(--n-item-text-color-pressed);
 `, [cB("icon", `
 color: var(--n-item-text-color-pressed);
 `)])]), cE("separator", `
 margin: 0 8px;
 color: var(--n-separator-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 `), c("&:last-child", [cE("link", `
 font-weight: var(--n-font-weight-active);
 cursor: unset;
 color: var(--n-item-text-color-active);
 `, [cB("icon", `
 color: var(--n-item-text-color-active);
 `)]), cE("separator", `
 display: none;
 `)])])]);
const breadcrumbInjectionKey = createInjectionKey("n-breadcrumb");
const breadcrumbProps = Object.assign(Object.assign({}, useTheme.props), {
  separator: {
    type: String,
    default: "/"
  }
});
const NBreadcrumb = defineComponent({
  name: "Breadcrumb",
  props: breadcrumbProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme("Breadcrumb", "-breadcrumb", style$b, breadcrumbLight, props, mergedClsPrefixRef);
    provide(breadcrumbInjectionKey, {
      separatorRef: toRef(props, "separator"),
      mergedClsPrefixRef
    });
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: {
          separatorColor,
          itemTextColor,
          itemTextColorHover,
          itemTextColorPressed,
          itemTextColorActive,
          fontSize,
          fontWeightActive,
          itemBorderRadius,
          itemColorHover,
          itemColorPressed,
          itemLineHeight
        }
      } = themeRef.value;
      return {
        "--n-font-size": fontSize,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-item-text-color": itemTextColor,
        "--n-item-text-color-hover": itemTextColorHover,
        "--n-item-text-color-pressed": itemTextColorPressed,
        "--n-item-text-color-active": itemTextColorActive,
        "--n-separator-color": separatorColor,
        "--n-item-color-hover": itemColorHover,
        "--n-item-color-pressed": itemColorPressed,
        "--n-item-border-radius": itemBorderRadius,
        "--n-font-weight-active": fontWeightActive,
        "--n-item-line-height": itemLineHeight
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("breadcrumb", void 0, cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("nav", {
      class: [`${this.mergedClsPrefix}-breadcrumb`, this.themeClass],
      style: this.cssVars,
      "aria-label": "Breadcrumb"
    }, h("ul", null, this.$slots));
  }
});
function useBrowserLocation(customWindow = null) {
  const getWindowLocation = () => {
    const {
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    } = (customWindow === null || customWindow === void 0 ? void 0 : customWindow.location) || {};
    return {
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    };
  };
  const locationState = ref(getWindowLocation());
  return locationState;
}
const breadcrumbItemProps = {
  separator: String,
  href: String,
  clickable: {
    type: Boolean,
    default: true
  },
  onClick: Function
};
const NBreadcrumbItem = defineComponent({
  name: "BreadcrumbItem",
  props: breadcrumbItemProps,
  setup(props, {
    slots
  }) {
    const NBreadcrumb2 = inject(breadcrumbInjectionKey, null);
    if (!NBreadcrumb2) {
      return () => null;
    }
    const {
      separatorRef,
      mergedClsPrefixRef
    } = NBreadcrumb2;
    const browserLocationRef = useBrowserLocation();
    const htmlTagRef = computed(() => props.href ? "a" : "span");
    const ariaCurrentRef = computed(() => browserLocationRef.value.href === props.href ? "location" : null);
    return () => {
      const {
        value: mergedClsPrefix
      } = mergedClsPrefixRef;
      return h("li", {
        class: [`${mergedClsPrefix}-breadcrumb-item`, props.clickable && `${mergedClsPrefix}-breadcrumb-item--clickable`]
      }, h(htmlTagRef.value, {
        class: `${mergedClsPrefix}-breadcrumb-item__link`,
        "aria-current": ariaCurrentRef.value,
        href: props.href,
        onClick: props.onClick
      }, slots), h("span", {
        class: `${mergedClsPrefix}-breadcrumb-item__separator`,
        "aria-hidden": "true"
      }, resolveSlot(slots.separator, () => {
        var _a;
        return [(_a = props.separator) !== null && _a !== void 0 ? _a : separatorRef.value];
      })));
    };
  }
});
const commonVariables$4 = {
  paddingSmall: "12px 16px 12px",
  paddingMedium: "19px 24px 20px",
  paddingLarge: "23px 32px 24px",
  paddingHuge: "27px 40px 28px",
  titleFontSizeSmall: "16px",
  titleFontSizeMedium: "18px",
  titleFontSizeLarge: "18px",
  titleFontSizeHuge: "18px",
  closeIconSize: "18px",
  closeSize: "22px"
};
function self$8(vars) {
  const {
    primaryColor,
    borderRadius,
    lineHeight,
    fontSize,
    cardColor,
    textColor2,
    textColor1,
    dividerColor,
    fontWeightStrong,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    modalColor,
    boxShadow1,
    popoverColor,
    actionColor
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$4), {
    lineHeight,
    color: cardColor,
    colorModal: modalColor,
    colorPopover: popoverColor,
    colorTarget: primaryColor,
    colorEmbedded: actionColor,
    colorEmbeddedModal: actionColor,
    colorEmbeddedPopover: actionColor,
    textColor: textColor2,
    titleTextColor: textColor1,
    borderColor: dividerColor,
    actionColor,
    titleFontWeight: fontWeightStrong,
    closeColorHover,
    closeColorPressed,
    closeBorderRadius: borderRadius,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    fontSizeSmall: fontSize,
    fontSizeMedium: fontSize,
    fontSizeLarge: fontSize,
    fontSizeHuge: fontSize,
    boxShadow: boxShadow1,
    borderRadius
  });
}
const cardLight = {
  name: "Card",
  common: derived,
  self: self$8
};
const style$a = c([cB("card", `
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [asModal({
  background: "var(--n-color-modal)"
}), cM("hoverable", [c("&:hover", "box-shadow: var(--n-box-shadow);")]), cM("content-segmented", [c(">", [cE("content", {
  paddingTop: "var(--n-padding-bottom)"
})])]), cM("content-soft-segmented", [c(">", [cE("content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])]), cM("footer-segmented", [c(">", [cE("footer", {
  paddingTop: "var(--n-padding-bottom)"
})])]), cM("footer-soft-segmented", [c(">", [cE("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]), c(">", [cB("card-header", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `, [cE("main", `
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `), cE("extra", `
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), cE("close", `
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), cE("action", `
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `), cE("content", "flex: 1; min-width: 0;"), cE("content, footer", `
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `, [c("&:first-child", {
  paddingTop: "var(--n-padding-bottom)"
})]), cE("action", `
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]), cB("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `, [c("img", `
 display: block;
 width: 100%;
 `)]), cM("bordered", `
 border: 1px solid var(--n-border-color);
 `, [c("&:target", "border-color: var(--n-color-target);")]), cM("action-segmented", [c(">", [cE("action", [c("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), cM("content-segmented, content-soft-segmented", [c(">", [cE("content", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [c("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), cM("footer-segmented, footer-soft-segmented", [c(">", [cE("footer", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [c("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), cM("embedded", `
 background-color: var(--n-color-embedded);
 `)]), insideModal(cB("card", `
 background: var(--n-color-modal);
 `, [cM("embedded", `
 background-color: var(--n-color-embedded-modal);
 `)])), insidePopover(cB("card", `
 background: var(--n-color-popover);
 `, [cM("embedded", `
 background-color: var(--n-color-embedded-popover);
 `)]))]);
const cardBaseProps = {
  title: [String, Function],
  contentClass: String,
  contentStyle: [Object, String],
  headerClass: String,
  headerStyle: [Object, String],
  headerExtraClass: String,
  headerExtraStyle: [Object, String],
  footerClass: String,
  footerStyle: [Object, String],
  embedded: Boolean,
  segmented: {
    type: [Boolean, Object],
    default: false
  },
  size: {
    type: String,
    default: "medium"
  },
  bordered: {
    type: Boolean,
    default: true
  },
  closable: Boolean,
  hoverable: Boolean,
  role: String,
  onClose: [Function, Array],
  tag: {
    type: String,
    default: "div"
  },
  cover: Function,
  content: [String, Function],
  footer: Function,
  action: Function,
  headerExtra: Function
};
const cardProps = Object.assign(Object.assign({}, useTheme.props), cardBaseProps);
const NCard = defineComponent({
  name: "Card",
  props: cardProps,
  setup(props) {
    const handleCloseClick = () => {
      const {
        onClose
      } = props;
      if (onClose)
        call(onClose);
    };
    const {
      inlineThemeDisabled,
      mergedClsPrefixRef,
      mergedRtlRef
    } = useConfig(props);
    const themeRef = useTheme("Card", "-card", style$a, cardLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl("Card", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        size
      } = props;
      const {
        self: {
          color,
          colorModal,
          colorTarget,
          textColor,
          titleTextColor,
          titleFontWeight,
          borderColor,
          actionColor,
          borderRadius,
          lineHeight,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHover,
          closeColorPressed,
          closeBorderRadius,
          closeIconSize,
          closeSize,
          boxShadow,
          colorPopover,
          colorEmbedded,
          colorEmbeddedModal,
          colorEmbeddedPopover,
          [createKey("padding", size)]: padding,
          [createKey("fontSize", size)]: fontSize,
          [createKey("titleFontSize", size)]: titleFontSize
        },
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        }
      } = themeRef.value;
      const {
        top: paddingTop,
        left: paddingLeft,
        bottom: paddingBottom
      } = getPadding(padding);
      return {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-border-radius": borderRadius,
        "--n-color": color,
        "--n-color-modal": colorModal,
        "--n-color-popover": colorPopover,
        "--n-color-embedded": colorEmbedded,
        "--n-color-embedded-modal": colorEmbeddedModal,
        "--n-color-embedded-popover": colorEmbeddedPopover,
        "--n-color-target": colorTarget,
        "--n-text-color": textColor,
        "--n-line-height": lineHeight,
        "--n-action-color": actionColor,
        "--n-title-text-color": titleTextColor,
        "--n-title-font-weight": titleFontWeight,
        "--n-close-icon-color": closeIconColor,
        "--n-close-icon-color-hover": closeIconColorHover,
        "--n-close-icon-color-pressed": closeIconColorPressed,
        "--n-close-color-hover": closeColorHover,
        "--n-close-color-pressed": closeColorPressed,
        "--n-border-color": borderColor,
        "--n-box-shadow": boxShadow,
        // size
        "--n-padding-top": paddingTop,
        "--n-padding-bottom": paddingBottom,
        "--n-padding-left": paddingLeft,
        "--n-font-size": fontSize,
        "--n-title-font-size": titleFontSize,
        "--n-close-size": closeSize,
        "--n-close-icon-size": closeIconSize,
        "--n-close-border-radius": closeBorderRadius
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("card", computed(() => {
      return props.size[0];
    }), cssVarsRef, props) : void 0;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      segmented,
      bordered,
      hoverable,
      mergedClsPrefix,
      rtlEnabled,
      onRender,
      embedded,
      tag: Component,
      $slots
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h(Component, {
      class: [`${mergedClsPrefix}-card`, this.themeClass, embedded && `${mergedClsPrefix}-card--embedded`, {
        [`${mergedClsPrefix}-card--rtl`]: rtlEnabled,
        [`${mergedClsPrefix}-card--content${typeof segmented !== "boolean" && segmented.content === "soft" ? "-soft" : ""}-segmented`]: segmented === true || segmented !== false && segmented.content,
        [`${mergedClsPrefix}-card--footer${typeof segmented !== "boolean" && segmented.footer === "soft" ? "-soft" : ""}-segmented`]: segmented === true || segmented !== false && segmented.footer,
        [`${mergedClsPrefix}-card--action-segmented`]: segmented === true || segmented !== false && segmented.action,
        [`${mergedClsPrefix}-card--bordered`]: bordered,
        [`${mergedClsPrefix}-card--hoverable`]: hoverable
      }],
      style: this.cssVars,
      role: this.role
    }, resolveWrappedSlot($slots.cover, (children) => {
      const mergedChildren = this.cover ? ensureValidVNode([this.cover()]) : children;
      return mergedChildren && h("div", {
        class: `${mergedClsPrefix}-card-cover`,
        role: "none"
      }, mergedChildren);
    }), resolveWrappedSlot($slots.header, (children) => {
      const {
        title
      } = this;
      const mergedChildren = title ? ensureValidVNode(typeof title === "function" ? [title()] : [title]) : children;
      return mergedChildren || this.closable ? h("div", {
        class: [`${mergedClsPrefix}-card-header`, this.headerClass],
        style: this.headerStyle,
        role: "heading"
      }, h("div", {
        class: `${mergedClsPrefix}-card-header__main`,
        role: "heading"
      }, mergedChildren), resolveWrappedSlot($slots["header-extra"], (children2) => {
        const mergedChildren2 = this.headerExtra ? ensureValidVNode([this.headerExtra()]) : children2;
        return mergedChildren2 && h("div", {
          class: [`${mergedClsPrefix}-card-header__extra`, this.headerExtraClass],
          style: this.headerExtraStyle
        }, mergedChildren2);
      }), this.closable && h(NBaseClose, {
        clsPrefix: mergedClsPrefix,
        class: `${mergedClsPrefix}-card-header__close`,
        onClick: this.handleCloseClick,
        absolute: true
      })) : null;
    }), resolveWrappedSlot($slots.default, (children) => {
      const {
        content
      } = this;
      const mergedChildren = content ? ensureValidVNode(typeof content === "function" ? [content()] : [content]) : children;
      return mergedChildren && h("div", {
        class: [`${mergedClsPrefix}-card__content`, this.contentClass],
        style: this.contentStyle,
        role: "none"
      }, mergedChildren);
    }), resolveWrappedSlot($slots.footer, (children) => {
      const mergedChildren = this.footer ? ensureValidVNode([this.footer()]) : children;
      return mergedChildren && h("div", {
        class: [`${mergedClsPrefix}-card__footer`, this.footerClass],
        style: this.footerStyle,
        role: "none"
      }, mergedChildren);
    }), resolveWrappedSlot($slots.action, (children) => {
      const mergedChildren = this.action ? ensureValidVNode([this.action()]) : children;
      return mergedChildren && h("div", {
        class: `${mergedClsPrefix}-card__action`,
        role: "none"
      }, mergedChildren);
    }));
  }
});
const commonVariables$3 = {
  sizeSmall: "14px",
  sizeMedium: "16px",
  sizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function self$7(vars) {
  const {
    baseColor,
    inputColorDisabled,
    cardColor,
    modalColor,
    popoverColor,
    textColorDisabled,
    borderColor,
    primaryColor,
    textColor2,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadiusSmall,
    lineHeight
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$3), {
    labelLineHeight: lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadius: borderRadiusSmall,
    color: baseColor,
    colorChecked: primaryColor,
    colorDisabled: inputColorDisabled,
    colorDisabledChecked: inputColorDisabled,
    colorTableHeader: cardColor,
    colorTableHeaderModal: modalColor,
    colorTableHeaderPopover: popoverColor,
    checkMarkColor: baseColor,
    checkMarkColorDisabled: textColorDisabled,
    checkMarkColorDisabledChecked: textColorDisabled,
    border: `1px solid ${borderColor}`,
    borderDisabled: `1px solid ${borderColor}`,
    borderDisabledChecked: `1px solid ${borderColor}`,
    borderChecked: `1px solid ${primaryColor}`,
    borderFocus: `1px solid ${primaryColor}`,
    boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, {
      alpha: 0.3
    })}`,
    textColor: textColor2,
    textColorDisabled
  });
}
const checkboxLight = {
  name: "Checkbox",
  common: derived,
  self: self$7
};
const CheckMark = h("svg", {
  viewBox: "0 0 64 64",
  class: "check-icon"
}, h("path", {
  d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"
}));
const LineMark = h("svg", {
  viewBox: "0 0 100 100",
  class: "line-icon"
}, h("path", {
  d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"
}));
const checkboxGroupInjectionKey = createInjectionKey("n-checkbox-group");
const checkboxGroupProps = {
  min: Number,
  max: Number,
  size: String,
  value: Array,
  defaultValue: {
    type: Array,
    default: null
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  // deprecated
  onChange: [Function, Array]
};
defineComponent({
  name: "CheckboxGroup",
  props: checkboxGroupProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const formItem = useFormItem(props);
    const {
      mergedSizeRef,
      mergedDisabledRef
    } = formItem;
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = computed(() => props.value);
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const checkedCount = computed(() => {
      var _a;
      return ((_a = mergedValueRef.value) === null || _a === void 0 ? void 0 : _a.length) || 0;
    });
    const valueSetRef = computed(() => {
      if (Array.isArray(mergedValueRef.value)) {
        return new Set(mergedValueRef.value);
      }
      return /* @__PURE__ */ new Set();
    });
    function toggleCheckbox(checked, checkboxValue) {
      const {
        nTriggerFormInput,
        nTriggerFormChange
      } = formItem;
      const {
        onChange,
        "onUpdate:value": _onUpdateValue,
        onUpdateValue
      } = props;
      if (Array.isArray(mergedValueRef.value)) {
        const groupValue = Array.from(mergedValueRef.value);
        const index = groupValue.findIndex((value) => value === checkboxValue);
        if (checked) {
          if (!~index) {
            groupValue.push(checkboxValue);
            if (onUpdateValue) {
              call(onUpdateValue, groupValue, {
                actionType: "check",
                value: checkboxValue
              });
            }
            if (_onUpdateValue) {
              call(_onUpdateValue, groupValue, {
                actionType: "check",
                value: checkboxValue
              });
            }
            nTriggerFormInput();
            nTriggerFormChange();
            uncontrolledValueRef.value = groupValue;
            if (onChange)
              call(onChange, groupValue);
          }
        } else {
          if (~index) {
            groupValue.splice(index, 1);
            if (onUpdateValue) {
              call(onUpdateValue, groupValue, {
                actionType: "uncheck",
                value: checkboxValue
              });
            }
            if (_onUpdateValue) {
              call(_onUpdateValue, groupValue, {
                actionType: "uncheck",
                value: checkboxValue
              });
            }
            if (onChange)
              call(onChange, groupValue);
            uncontrolledValueRef.value = groupValue;
            nTriggerFormInput();
            nTriggerFormChange();
          }
        }
      } else {
        if (checked) {
          if (onUpdateValue) {
            call(onUpdateValue, [checkboxValue], {
              actionType: "check",
              value: checkboxValue
            });
          }
          if (_onUpdateValue) {
            call(_onUpdateValue, [checkboxValue], {
              actionType: "check",
              value: checkboxValue
            });
          }
          if (onChange)
            call(onChange, [checkboxValue]);
          uncontrolledValueRef.value = [checkboxValue];
          nTriggerFormInput();
          nTriggerFormChange();
        } else {
          if (onUpdateValue) {
            call(onUpdateValue, [], {
              actionType: "uncheck",
              value: checkboxValue
            });
          }
          if (_onUpdateValue) {
            call(_onUpdateValue, [], {
              actionType: "uncheck",
              value: checkboxValue
            });
          }
          if (onChange)
            call(onChange, []);
          uncontrolledValueRef.value = [];
          nTriggerFormInput();
          nTriggerFormChange();
        }
      }
    }
    provide(checkboxGroupInjectionKey, {
      checkedCountRef: checkedCount,
      maxRef: toRef(props, "max"),
      minRef: toRef(props, "min"),
      valueSetRef,
      disabledRef: mergedDisabledRef,
      mergedSizeRef,
      toggleCheckbox
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef
    };
  },
  render() {
    return h("div", {
      class: `${this.mergedClsPrefix}-checkbox-group`,
      role: "group"
    }, this.$slots);
  }
});
const style$9 = c([
  cB("checkbox", `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [cM("show-label", "line-height: var(--n-label-line-height);"), c("&:hover", [cB("checkbox-box", [cE("border", "border: var(--n-border-checked);")])]), c("&:focus:not(:active)", [cB("checkbox-box", [cE("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), cM("inside-table", [cB("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), cM("checked", [cB("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [cB("checkbox-icon", [
    // if not set width to 100%, safari & old chrome won't display the icon
    c(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
  ])])]), cM("indeterminate", [cB("checkbox-box", [cB("checkbox-icon", [c(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), c(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), cM("checked, indeterminate", [c("&:focus:not(:active)", [cB("checkbox-box", [cE("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), cB("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [cE("border", {
    border: "var(--n-border-checked)"
  })])]), cM("disabled", {
    cursor: "not-allowed"
  }, [cM("checked", [cB("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [cE("border", {
    border: "var(--n-border-disabled-checked)"
  }), cB("checkbox-icon", [c(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled-checked)"
  })])])]), cB("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [cE("border", `
 border: var(--n-border-disabled);
 `), cB("checkbox-icon", [c(".check-icon, .line-icon", `
 fill: var(--n-check-mark-color-disabled);
 `)])]), cE("label", `
 color: var(--n-text-color-disabled);
 `)]), cB("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), cB("checkbox-box", `
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `, [cE("border", `
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `), cB("checkbox-icon", `
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `, [c(".check-icon, .line-icon", `
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `), iconSwitchTransition({
    left: "1px",
    top: "1px"
  })])]), cE("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [c("&:empty", {
    display: "none"
  })])]),
  // modal table header checkbox
  insideModal(cB("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
  // popover table header checkbox
  insidePopover(cB("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
]);
const checkboxProps = Object.assign(Object.assign({}, useTheme.props), {
  size: String,
  checked: {
    type: [Boolean, String, Number],
    default: void 0
  },
  defaultChecked: {
    type: [Boolean, String, Number],
    default: false
  },
  value: [String, Number],
  disabled: {
    type: Boolean,
    default: void 0
  },
  indeterminate: Boolean,
  label: String,
  focusable: {
    type: Boolean,
    default: true
  },
  checkedValue: {
    type: [Boolean, String, Number],
    default: true
  },
  uncheckedValue: {
    type: [Boolean, String, Number],
    default: false
  },
  "onUpdate:checked": [Function, Array],
  onUpdateChecked: [Function, Array],
  // private
  privateInsideTable: Boolean,
  // deprecated
  onChange: [Function, Array]
});
const NCheckbox = defineComponent({
  name: "Checkbox",
  props: checkboxProps,
  setup(props) {
    const NCheckboxGroup = inject(checkboxGroupInjectionKey, null);
    const selfRef = ref(null);
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const uncontrolledCheckedRef = ref(props.defaultChecked);
    const controlledCheckedRef = toRef(props, "checked");
    const mergedCheckedRef = useMergedState(controlledCheckedRef, uncontrolledCheckedRef);
    const renderedCheckedRef = useMemo(() => {
      if (NCheckboxGroup) {
        const groupValueSet = NCheckboxGroup.valueSetRef.value;
        if (groupValueSet && props.value !== void 0) {
          return groupValueSet.has(props.value);
        }
        return false;
      } else {
        return mergedCheckedRef.value === props.checkedValue;
      }
    });
    const formItem = useFormItem(props, {
      mergedSize(NFormItem2) {
        const {
          size
        } = props;
        if (size !== void 0)
          return size;
        if (NCheckboxGroup) {
          const {
            value: mergedSize
          } = NCheckboxGroup.mergedSizeRef;
          if (mergedSize !== void 0) {
            return mergedSize;
          }
        }
        if (NFormItem2) {
          const {
            mergedSize
          } = NFormItem2;
          if (mergedSize !== void 0)
            return mergedSize.value;
        }
        return "medium";
      },
      mergedDisabled(NFormItem2) {
        const {
          disabled
        } = props;
        if (disabled !== void 0)
          return disabled;
        if (NCheckboxGroup) {
          if (NCheckboxGroup.disabledRef.value)
            return true;
          const {
            maxRef: {
              value: max
            },
            checkedCountRef
          } = NCheckboxGroup;
          if (max !== void 0 && checkedCountRef.value >= max && !renderedCheckedRef.value) {
            return true;
          }
          const {
            minRef: {
              value: min
            }
          } = NCheckboxGroup;
          if (min !== void 0 && checkedCountRef.value <= min && renderedCheckedRef.value) {
            return true;
          }
        }
        if (NFormItem2) {
          return NFormItem2.disabled.value;
        }
        return false;
      }
    });
    const {
      mergedDisabledRef,
      mergedSizeRef
    } = formItem;
    const themeRef = useTheme("Checkbox", "-checkbox", style$9, checkboxLight, props, mergedClsPrefixRef);
    function toggle(e) {
      if (NCheckboxGroup && props.value !== void 0) {
        NCheckboxGroup.toggleCheckbox(!renderedCheckedRef.value, props.value);
      } else {
        const {
          onChange,
          "onUpdate:checked": _onUpdateCheck,
          onUpdateChecked
        } = props;
        const {
          nTriggerFormInput,
          nTriggerFormChange
        } = formItem;
        const nextChecked = renderedCheckedRef.value ? props.uncheckedValue : props.checkedValue;
        if (_onUpdateCheck) {
          call(_onUpdateCheck, nextChecked, e);
        }
        if (onUpdateChecked) {
          call(onUpdateChecked, nextChecked, e);
        }
        if (onChange)
          call(onChange, nextChecked, e);
        nTriggerFormInput();
        nTriggerFormChange();
        uncontrolledCheckedRef.value = nextChecked;
      }
    }
    function handleClick(e) {
      if (!mergedDisabledRef.value) {
        toggle(e);
      }
    }
    function handleKeyUp(e) {
      if (mergedDisabledRef.value)
        return;
      switch (e.key) {
        case " ":
        case "Enter":
          toggle(e);
      }
    }
    function handleKeyDown(e) {
      switch (e.key) {
        case " ":
          e.preventDefault();
      }
    }
    const exposedMethods = {
      focus: () => {
        var _a;
        (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.blur();
      }
    };
    const rtlEnabledRef = useRtl("Checkbox", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        value: mergedSize
      } = mergedSizeRef;
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: {
          borderRadius,
          color,
          colorChecked,
          colorDisabled,
          colorTableHeader,
          colorTableHeaderModal,
          colorTableHeaderPopover,
          checkMarkColor,
          checkMarkColorDisabled,
          border,
          borderFocus,
          borderDisabled,
          borderChecked,
          boxShadowFocus,
          textColor,
          textColorDisabled,
          checkMarkColorDisabledChecked,
          colorDisabledChecked,
          borderDisabledChecked,
          labelPadding,
          labelLineHeight,
          labelFontWeight,
          [createKey("fontSize", mergedSize)]: fontSize,
          [createKey("size", mergedSize)]: size
        }
      } = themeRef.value;
      return {
        "--n-label-line-height": labelLineHeight,
        "--n-label-font-weight": labelFontWeight,
        "--n-size": size,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-border-radius": borderRadius,
        "--n-border": border,
        "--n-border-checked": borderChecked,
        "--n-border-focus": borderFocus,
        "--n-border-disabled": borderDisabled,
        "--n-border-disabled-checked": borderDisabledChecked,
        "--n-box-shadow-focus": boxShadowFocus,
        "--n-color": color,
        "--n-color-checked": colorChecked,
        "--n-color-table": colorTableHeader,
        "--n-color-table-modal": colorTableHeaderModal,
        "--n-color-table-popover": colorTableHeaderPopover,
        "--n-color-disabled": colorDisabled,
        "--n-color-disabled-checked": colorDisabledChecked,
        "--n-text-color": textColor,
        "--n-text-color-disabled": textColorDisabled,
        "--n-check-mark-color": checkMarkColor,
        "--n-check-mark-color-disabled": checkMarkColorDisabled,
        "--n-check-mark-color-disabled-checked": checkMarkColorDisabledChecked,
        "--n-font-size": fontSize,
        "--n-label-padding": labelPadding
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("checkbox", computed(() => mergedSizeRef.value[0]), cssVarsRef, props) : void 0;
    return Object.assign(formItem, exposedMethods, {
      rtlEnabled: rtlEnabledRef,
      selfRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedDisabled: mergedDisabledRef,
      renderedChecked: renderedCheckedRef,
      mergedTheme: themeRef,
      labelId: createId(),
      handleClick,
      handleKeyUp,
      handleKeyDown,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a;
    const {
      $slots,
      renderedChecked,
      mergedDisabled,
      indeterminate,
      privateInsideTable,
      cssVars,
      labelId,
      label,
      mergedClsPrefix,
      focusable,
      handleKeyUp,
      handleKeyDown,
      handleClick
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    const labelNode = resolveWrappedSlot($slots.default, (children) => {
      if (label || children) {
        return h("span", {
          class: `${mergedClsPrefix}-checkbox__label`,
          id: labelId
        }, label || children);
      }
      return null;
    });
    return h("div", {
      ref: "selfRef",
      class: [`${mergedClsPrefix}-checkbox`, this.themeClass, this.rtlEnabled && `${mergedClsPrefix}-checkbox--rtl`, renderedChecked && `${mergedClsPrefix}-checkbox--checked`, mergedDisabled && `${mergedClsPrefix}-checkbox--disabled`, indeterminate && `${mergedClsPrefix}-checkbox--indeterminate`, privateInsideTable && `${mergedClsPrefix}-checkbox--inside-table`, labelNode && `${mergedClsPrefix}-checkbox--show-label`],
      tabindex: mergedDisabled || !focusable ? void 0 : 0,
      role: "checkbox",
      "aria-checked": indeterminate ? "mixed" : renderedChecked,
      "aria-labelledby": labelId,
      style: cssVars,
      onKeyup: handleKeyUp,
      onKeydown: handleKeyDown,
      onClick: handleClick,
      onMousedown: () => {
        on("selectstart", void 0, (e) => {
          e.preventDefault();
        }, {
          once: true
        });
      }
    }, h("div", {
      class: `${mergedClsPrefix}-checkbox-box-wrapper`
    }, "\xA0", h("div", {
      class: `${mergedClsPrefix}-checkbox-box`
    }, h(NIconSwitchTransition, null, {
      default: () => this.indeterminate ? h("div", {
        key: "indeterminate",
        class: `${mergedClsPrefix}-checkbox-icon`
      }, LineMark) : h("div", {
        key: "check",
        class: `${mergedClsPrefix}-checkbox-icon`
      }, CheckMark)
    }), h("div", {
      class: `${mergedClsPrefix}-checkbox-box__border`
    }))), labelNode);
  }
});
const commonVariables$2 = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function self$6(vars) {
  const {
    borderColor,
    primaryColor,
    baseColor,
    textColorDisabled,
    inputColorDisabled,
    textColor2,
    opacityDisabled,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    heightSmall,
    heightMedium,
    heightLarge,
    lineHeight
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$2), {
    labelLineHeight: lineHeight,
    buttonHeightSmall: heightSmall,
    buttonHeightMedium: heightMedium,
    buttonHeightLarge: heightLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    boxShadow: `inset 0 0 0 1px ${borderColor}`,
    boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
    boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, {
      alpha: 0.2
    })}`,
    boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
    boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
    color: baseColor,
    colorDisabled: inputColorDisabled,
    colorActive: "#0000",
    textColor: textColor2,
    textColorDisabled,
    dotColorActive: primaryColor,
    dotColorDisabled: borderColor,
    buttonBorderColor: borderColor,
    buttonBorderColorActive: primaryColor,
    buttonBorderColorHover: borderColor,
    buttonColor: baseColor,
    buttonColorActive: baseColor,
    buttonTextColor: textColor2,
    buttonTextColorActive: primaryColor,
    buttonTextColorHover: primaryColor,
    opacityDisabled,
    buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, {
      alpha: 0.3
    })}`,
    buttonBoxShadowHover: "inset 0 0 0 1px #0000",
    buttonBoxShadow: "inset 0 0 0 1px #0000",
    buttonBorderRadius: borderRadius
  });
}
const radioLight = {
  name: "Radio",
  common: derived,
  self: self$6
};
const commonVariables$1 = {
  padding: "4px 0",
  optionIconSizeSmall: "14px",
  optionIconSizeMedium: "16px",
  optionIconSizeLarge: "16px",
  optionIconSizeHuge: "18px",
  optionSuffixWidthSmall: "14px",
  optionSuffixWidthMedium: "14px",
  optionSuffixWidthLarge: "16px",
  optionSuffixWidthHuge: "16px",
  optionIconSuffixWidthSmall: "32px",
  optionIconSuffixWidthMedium: "32px",
  optionIconSuffixWidthLarge: "36px",
  optionIconSuffixWidthHuge: "36px",
  optionPrefixWidthSmall: "14px",
  optionPrefixWidthMedium: "14px",
  optionPrefixWidthLarge: "16px",
  optionPrefixWidthHuge: "16px",
  optionIconPrefixWidthSmall: "36px",
  optionIconPrefixWidthMedium: "36px",
  optionIconPrefixWidthLarge: "40px",
  optionIconPrefixWidthHuge: "40px"
};
function self$5(vars) {
  const {
    primaryColor,
    textColor2,
    dividerColor,
    hoverColor,
    popoverColor,
    invertedColor,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    textColor3,
    opacityDisabled
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$1), {
    optionHeightSmall: heightSmall,
    optionHeightMedium: heightMedium,
    optionHeightLarge: heightLarge,
    optionHeightHuge: heightHuge,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    // non-inverted
    optionTextColor: textColor2,
    optionTextColorHover: textColor2,
    optionTextColorActive: primaryColor,
    optionTextColorChildActive: primaryColor,
    color: popoverColor,
    dividerColor,
    suffixColor: textColor2,
    prefixColor: textColor2,
    optionColorHover: hoverColor,
    optionColorActive: changeColor(primaryColor, {
      alpha: 0.1
    }),
    groupHeaderTextColor: textColor3,
    // inverted
    optionTextColorInverted: "#BBB",
    optionTextColorHoverInverted: "#FFF",
    optionTextColorActiveInverted: "#FFF",
    optionTextColorChildActiveInverted: "#FFF",
    colorInverted: invertedColor,
    dividerColorInverted: "#BBB",
    suffixColorInverted: "#BBB",
    prefixColorInverted: "#BBB",
    optionColorHoverInverted: primaryColor,
    optionColorActiveInverted: primaryColor,
    groupHeaderTextColorInverted: "#AAA",
    optionOpacityDisabled: opacityDisabled
  });
}
const dropdownLight = createTheme({
  name: "Dropdown",
  common: derived,
  peers: {
    Popover: popoverLight
  },
  self: self$5
});
const radioBaseProps = {
  name: String,
  value: {
    type: [String, Number, Boolean],
    default: "on"
  },
  checked: {
    type: Boolean,
    default: void 0
  },
  defaultChecked: Boolean,
  disabled: {
    type: Boolean,
    default: void 0
  },
  label: String,
  size: String,
  onUpdateChecked: [Function, Array],
  "onUpdate:checked": [Function, Array],
  // deprecated
  checkedValue: {
    type: Boolean,
    default: void 0
  }
};
const radioGroupInjectionKey = createInjectionKey("n-radio-group");
function setup(props) {
  const NRadioGroup2 = inject(radioGroupInjectionKey, null);
  const formItem = useFormItem(props, {
    mergedSize(NFormItem2) {
      const {
        size
      } = props;
      if (size !== void 0)
        return size;
      if (NRadioGroup2) {
        const {
          mergedSizeRef: {
            value: mergedSize
          }
        } = NRadioGroup2;
        if (mergedSize !== void 0) {
          return mergedSize;
        }
      }
      if (NFormItem2) {
        return NFormItem2.mergedSize.value;
      }
      return "medium";
    },
    mergedDisabled(NFormItem2) {
      if (props.disabled)
        return true;
      if (NRadioGroup2 === null || NRadioGroup2 === void 0 ? void 0 : NRadioGroup2.disabledRef.value)
        return true;
      if (NFormItem2 === null || NFormItem2 === void 0 ? void 0 : NFormItem2.disabled.value)
        return true;
      return false;
    }
  });
  const {
    mergedSizeRef,
    mergedDisabledRef
  } = formItem;
  const inputRef = ref(null);
  const labelRef = ref(null);
  const uncontrolledCheckedRef = ref(props.defaultChecked);
  const controlledCheckedRef = toRef(props, "checked");
  const mergedCheckedRef = useMergedState(controlledCheckedRef, uncontrolledCheckedRef);
  const renderSafeCheckedRef = useMemo(() => {
    if (NRadioGroup2)
      return NRadioGroup2.valueRef.value === props.value;
    return mergedCheckedRef.value;
  });
  const mergedNameRef = useMemo(() => {
    const {
      name
    } = props;
    if (name !== void 0)
      return name;
    if (NRadioGroup2)
      return NRadioGroup2.nameRef.value;
  });
  const focusRef = ref(false);
  function doUpdateChecked() {
    if (NRadioGroup2) {
      const {
        doUpdateValue
      } = NRadioGroup2;
      const {
        value
      } = props;
      call(doUpdateValue, value);
    } else {
      const {
        onUpdateChecked,
        "onUpdate:checked": _onUpdateChecked
      } = props;
      const {
        nTriggerFormInput,
        nTriggerFormChange
      } = formItem;
      if (onUpdateChecked)
        call(onUpdateChecked, true);
      if (_onUpdateChecked)
        call(_onUpdateChecked, true);
      nTriggerFormInput();
      nTriggerFormChange();
      uncontrolledCheckedRef.value = true;
    }
  }
  function toggle() {
    if (mergedDisabledRef.value)
      return;
    if (!renderSafeCheckedRef.value) {
      doUpdateChecked();
    }
  }
  function handleRadioInputChange() {
    toggle();
    if (inputRef.value) {
      inputRef.value.checked = renderSafeCheckedRef.value;
    }
  }
  function handleRadioInputBlur() {
    focusRef.value = false;
  }
  function handleRadioInputFocus() {
    focusRef.value = true;
  }
  return {
    mergedClsPrefix: NRadioGroup2 ? NRadioGroup2.mergedClsPrefixRef : useConfig(props).mergedClsPrefixRef,
    inputRef,
    labelRef,
    mergedName: mergedNameRef,
    mergedDisabled: mergedDisabledRef,
    renderSafeChecked: renderSafeCheckedRef,
    focus: focusRef,
    mergedSize: mergedSizeRef,
    handleRadioInputChange,
    handleRadioInputBlur,
    handleRadioInputFocus
  };
}
const style$8 = cB("radio", `
 line-height: var(--n-label-line-height);
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 align-items: flex-start;
 flex-wrap: nowrap;
 font-size: var(--n-font-size);
 word-break: break-word;
`, [cM("checked", [cE("dot", `
 background-color: var(--n-color-active);
 `)]), cE("dot-wrapper", `
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `), cB("radio-input", `
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 cursor: pointer;
 `), cE("dot", `
 position: absolute;
 top: 50%;
 left: 0;
 transform: translateY(-50%);
 height: var(--n-radio-size);
 width: var(--n-radio-size);
 background: var(--n-color);
 box-shadow: var(--n-box-shadow);
 border-radius: 50%;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `, [c("&::before", `
 content: "";
 opacity: 0;
 position: absolute;
 left: 4px;
 top: 4px;
 height: calc(100% - 8px);
 width: calc(100% - 8px);
 border-radius: 50%;
 transform: scale(.8);
 background: var(--n-dot-color-active);
 transition: 
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `), cM("checked", {
  boxShadow: "var(--n-box-shadow-active)"
}, [c("&::before", `
 opacity: 1;
 transform: scale(1);
 `)])]), cE("label", `
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `), cNotM("disabled", `
 cursor: pointer;
 `, [c("&:hover", [cE("dot", {
  boxShadow: "var(--n-box-shadow-hover)"
})]), cM("focus", [c("&:not(:active)", [cE("dot", {
  boxShadow: "var(--n-box-shadow-focus)"
})])])]), cM("disabled", `
 cursor: not-allowed;
 `, [cE("dot", {
  boxShadow: "var(--n-box-shadow-disabled)",
  backgroundColor: "var(--n-color-disabled)"
}, [c("&::before", {
  backgroundColor: "var(--n-dot-color-disabled)"
}), cM("checked", `
 opacity: 1;
 `)]), cE("label", {
  color: "var(--n-text-color-disabled)"
}), cB("radio-input", `
 cursor: not-allowed;
 `)])]);
const radioProps = Object.assign(Object.assign({}, useTheme.props), radioBaseProps);
const NRadio = defineComponent({
  name: "Radio",
  props: radioProps,
  setup(props) {
    const radio = setup(props);
    const themeRef = useTheme("Radio", "-radio", style$8, radioLight, props, radio.mergedClsPrefix);
    const cssVarsRef = computed(() => {
      const {
        mergedSize: {
          value: size
        }
      } = radio;
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: {
          boxShadow,
          boxShadowActive,
          boxShadowDisabled,
          boxShadowFocus,
          boxShadowHover,
          color,
          colorDisabled,
          colorActive,
          textColor,
          textColorDisabled,
          dotColorActive,
          dotColorDisabled,
          labelPadding,
          labelLineHeight,
          labelFontWeight,
          [createKey("fontSize", size)]: fontSize,
          [createKey("radioSize", size)]: radioSize
        }
      } = themeRef.value;
      return {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-label-line-height": labelLineHeight,
        "--n-label-font-weight": labelFontWeight,
        "--n-box-shadow": boxShadow,
        "--n-box-shadow-active": boxShadowActive,
        "--n-box-shadow-disabled": boxShadowDisabled,
        "--n-box-shadow-focus": boxShadowFocus,
        "--n-box-shadow-hover": boxShadowHover,
        "--n-color": color,
        "--n-color-active": colorActive,
        "--n-color-disabled": colorDisabled,
        "--n-dot-color-active": dotColorActive,
        "--n-dot-color-disabled": dotColorDisabled,
        "--n-font-size": fontSize,
        "--n-radio-size": radioSize,
        "--n-text-color": textColor,
        "--n-text-color-disabled": textColorDisabled,
        "--n-label-padding": labelPadding
      };
    });
    const {
      inlineThemeDisabled,
      mergedClsPrefixRef,
      mergedRtlRef
    } = useConfig(props);
    const rtlEnabledRef = useRtl("Radio", mergedRtlRef, mergedClsPrefixRef);
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("radio", computed(() => radio.mergedSize.value[0]), cssVarsRef, props) : void 0;
    return Object.assign(radio, {
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    const {
      $slots,
      mergedClsPrefix,
      onRender,
      label
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("label", {
      class: [`${mergedClsPrefix}-radio`, this.themeClass, this.rtlEnabled && `${mergedClsPrefix}-radio--rtl`, this.mergedDisabled && `${mergedClsPrefix}-radio--disabled`, this.renderSafeChecked && `${mergedClsPrefix}-radio--checked`, this.focus && `${mergedClsPrefix}-radio--focus`],
      style: this.cssVars
    }, h("input", {
      ref: "inputRef",
      type: "radio",
      class: `${mergedClsPrefix}-radio-input`,
      value: this.value,
      name: this.mergedName,
      checked: this.renderSafeChecked,
      disabled: this.mergedDisabled,
      onChange: this.handleRadioInputChange,
      onFocus: this.handleRadioInputFocus,
      onBlur: this.handleRadioInputBlur
    }), h("div", {
      class: `${mergedClsPrefix}-radio__dot-wrapper`
    }, "\xA0", h("div", {
      class: [`${mergedClsPrefix}-radio__dot`, this.renderSafeChecked && `${mergedClsPrefix}-radio__dot--checked`]
    })), resolveWrappedSlot($slots.default, (children) => {
      if (!children && !label)
        return null;
      return h("div", {
        ref: "labelRef",
        class: `${mergedClsPrefix}-radio__label`
      }, children || label);
    }));
  }
});
const style$7 = cB("radio-group", `
 display: inline-block;
 font-size: var(--n-font-size);
`, [cE("splitor", `
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `, [cM("checked", {
  backgroundColor: "var(--n-button-border-color-active)"
}), cM("disabled", {
  opacity: "var(--n-opacity-disabled)"
})]), cM("button-group", `
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [cB("radio-button", {
  height: "var(--n-height)",
  lineHeight: "var(--n-height)"
}), cE("splitor", {
  height: "var(--n-height)"
})]), cB("radio-button", `
 vertical-align: bottom;
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-block;
 box-sizing: border-box;
 padding-left: 14px;
 padding-right: 14px;
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background: var(--n-button-color);
 color: var(--n-button-text-color);
 border-top: 1px solid var(--n-button-border-color);
 border-bottom: 1px solid var(--n-button-border-color);
 `, [cB("radio-input", `
 pointer-events: none;
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 `), cE("state-border", `
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `), c("&:first-child", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `, [cE("state-border", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]), c("&:last-child", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `, [cE("state-border", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]), cNotM("disabled", `
 cursor: pointer;
 `, [c("&:hover", [cE("state-border", `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `), cNotM("checked", {
  color: "var(--n-button-text-color-hover)"
})]), cM("focus", [c("&:not(:active)", [cE("state-border", {
  boxShadow: "var(--n-button-box-shadow-focus)"
})])])]), cM("checked", `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `), cM("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);
function mapSlot(defaultSlot, value, clsPrefix) {
  var _a;
  const children = [];
  let isButtonGroup = false;
  for (let i = 0; i < defaultSlot.length; ++i) {
    const wrappedInstance = defaultSlot[i];
    const name = (_a = wrappedInstance.type) === null || _a === void 0 ? void 0 : _a.name;
    if (name === "RadioButton") {
      isButtonGroup = true;
    }
    const instanceProps = wrappedInstance.props;
    if (name !== "RadioButton") {
      children.push(wrappedInstance);
      continue;
    }
    if (i === 0) {
      children.push(wrappedInstance);
    } else {
      const lastInstanceProps = children[children.length - 1].props;
      const lastInstanceChecked = value === lastInstanceProps.value;
      const lastInstanceDisabled = lastInstanceProps.disabled;
      const currentInstanceChecked = value === instanceProps.value;
      const currentInstanceDisabled = instanceProps.disabled;
      const lastInstancePriority = (lastInstanceChecked ? 2 : 0) + (!lastInstanceDisabled ? 1 : 0);
      const currentInstancePriority = (currentInstanceChecked ? 2 : 0) + (!currentInstanceDisabled ? 1 : 0);
      const lastInstanceClass = {
        [`${clsPrefix}-radio-group__splitor--disabled`]: lastInstanceDisabled,
        [`${clsPrefix}-radio-group__splitor--checked`]: lastInstanceChecked
      };
      const currentInstanceClass = {
        [`${clsPrefix}-radio-group__splitor--disabled`]: currentInstanceDisabled,
        [`${clsPrefix}-radio-group__splitor--checked`]: currentInstanceChecked
      };
      const splitorClass = lastInstancePriority < currentInstancePriority ? currentInstanceClass : lastInstanceClass;
      children.push(h("div", {
        class: [`${clsPrefix}-radio-group__splitor`, splitorClass]
      }), wrappedInstance);
    }
  }
  return {
    children,
    isButtonGroup
  };
}
const radioGroupProps = Object.assign(Object.assign({}, useTheme.props), {
  name: String,
  value: [String, Number, Boolean],
  defaultValue: {
    type: [String, Number, Boolean],
    default: null
  },
  size: String,
  disabled: {
    type: Boolean,
    default: void 0
  },
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array]
});
const NRadioGroup = defineComponent({
  name: "RadioGroup",
  props: radioGroupProps,
  setup(props) {
    const selfElRef = ref(null);
    const {
      mergedSizeRef,
      mergedDisabledRef,
      nTriggerFormChange,
      nTriggerFormInput,
      nTriggerFormBlur,
      nTriggerFormFocus
    } = useFormItem(props);
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const themeRef = useTheme("Radio", "-radio-group", style$7, radioLight, props, mergedClsPrefixRef);
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, "value");
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    function doUpdateValue(value) {
      const {
        onUpdateValue,
        "onUpdate:value": _onUpdateValue
      } = props;
      if (onUpdateValue) {
        call(onUpdateValue, value);
      }
      if (_onUpdateValue) {
        call(_onUpdateValue, value);
      }
      uncontrolledValueRef.value = value;
      nTriggerFormChange();
      nTriggerFormInput();
    }
    function handleFocusin(e) {
      const {
        value: selfEl
      } = selfElRef;
      if (!selfEl)
        return;
      if (selfEl.contains(e.relatedTarget))
        return;
      nTriggerFormFocus();
    }
    function handleFocusout(e) {
      const {
        value: selfEl
      } = selfElRef;
      if (!selfEl)
        return;
      if (selfEl.contains(e.relatedTarget))
        return;
      nTriggerFormBlur();
    }
    provide(radioGroupInjectionKey, {
      mergedClsPrefixRef,
      nameRef: toRef(props, "name"),
      valueRef: mergedValueRef,
      disabledRef: mergedDisabledRef,
      mergedSizeRef,
      doUpdateValue
    });
    const rtlEnabledRef = useRtl("Radio", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        value: size
      } = mergedSizeRef;
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: {
          buttonBorderColor,
          buttonBorderColorActive,
          buttonBorderRadius,
          buttonBoxShadow,
          buttonBoxShadowFocus,
          buttonBoxShadowHover,
          buttonColor,
          buttonColorActive,
          buttonTextColor,
          buttonTextColorActive,
          buttonTextColorHover,
          opacityDisabled,
          [createKey("buttonHeight", size)]: height,
          [createKey("fontSize", size)]: fontSize
        }
      } = themeRef.value;
      return {
        "--n-font-size": fontSize,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-button-border-color": buttonBorderColor,
        "--n-button-border-color-active": buttonBorderColorActive,
        "--n-button-border-radius": buttonBorderRadius,
        "--n-button-box-shadow": buttonBoxShadow,
        "--n-button-box-shadow-focus": buttonBoxShadowFocus,
        "--n-button-box-shadow-hover": buttonBoxShadowHover,
        "--n-button-color": buttonColor,
        "--n-button-color-active": buttonColorActive,
        "--n-button-text-color": buttonTextColor,
        "--n-button-text-color-hover": buttonTextColorHover,
        "--n-button-text-color-active": buttonTextColorActive,
        "--n-height": height,
        "--n-opacity-disabled": opacityDisabled
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("radio-group", computed(() => mergedSizeRef.value[0]), cssVarsRef, props) : void 0;
    return {
      selfElRef,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      handleFocusout,
      handleFocusin,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const {
      mergedValue,
      mergedClsPrefix,
      handleFocusin,
      handleFocusout
    } = this;
    const {
      children,
      isButtonGroup
    } = mapSlot(flatten(getSlot(this)), mergedValue, mergedClsPrefix);
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", {
      onFocusin: handleFocusin,
      onFocusout: handleFocusout,
      ref: "selfElRef",
      class: [`${mergedClsPrefix}-radio-group`, this.rtlEnabled && `${mergedClsPrefix}-radio-group--rtl`, this.themeClass, isButtonGroup && `${mergedClsPrefix}-radio-group--button-group`],
      style: this.cssVars
    }, children);
  }
});
const NDropdownDivider = defineComponent({
  name: "DropdownDivider",
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  render() {
    return h("div", {
      class: `${this.clsPrefix}-dropdown-divider`
    });
  }
});
const dropdownMenuInjectionKey = createInjectionKey("n-dropdown-menu");
const dropdownInjectionKey = createInjectionKey("n-dropdown");
const dropdownOptionInjectionKey = createInjectionKey("n-dropdown-option");
function isSubmenuNode(rawNode, childrenField) {
  return rawNode.type === "submenu" || rawNode.type === void 0 && rawNode[childrenField] !== void 0;
}
function isGroupNode(rawNode) {
  return rawNode.type === "group";
}
function isDividerNode(rawNode) {
  return rawNode.type === "divider";
}
function isRenderNode(rawNode) {
  return rawNode.type === "render";
}
const NDropdownOption = defineComponent({
  name: "DropdownOption",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object,
      required: true
    },
    parentKey: {
      type: [String, Number],
      default: null
    },
    placement: {
      type: String,
      default: "right-start"
    },
    props: Object,
    scrollable: Boolean
  },
  setup(props) {
    const NDropdown2 = inject(dropdownInjectionKey);
    const {
      hoverKeyRef,
      keyboardKeyRef,
      lastToggledSubmenuKeyRef,
      pendingKeyPathRef,
      activeKeyPathRef,
      animatedRef,
      mergedShowRef,
      renderLabelRef,
      renderIconRef,
      labelFieldRef,
      childrenFieldRef,
      renderOptionRef,
      nodePropsRef,
      menuPropsRef
    } = NDropdown2;
    const NDropdownOption2 = inject(dropdownOptionInjectionKey, null);
    const NDropdownMenu2 = inject(dropdownMenuInjectionKey);
    const NPopoverBody = inject(popoverBodyInjectionKey);
    const rawNodeRef = computed(() => props.tmNode.rawNode);
    const hasSubmenuRef = computed(() => {
      const {
        value: childrenField
      } = childrenFieldRef;
      return isSubmenuNode(props.tmNode.rawNode, childrenField);
    });
    const mergedDisabledRef = computed(() => {
      const {
        disabled
      } = props.tmNode;
      return disabled;
    });
    const showSubmenuRef = computed(() => {
      if (!hasSubmenuRef.value)
        return false;
      const {
        key,
        disabled
      } = props.tmNode;
      if (disabled)
        return false;
      const {
        value: hoverKey
      } = hoverKeyRef;
      const {
        value: keyboardKey
      } = keyboardKeyRef;
      const {
        value: lastToggledSubmenuKey
      } = lastToggledSubmenuKeyRef;
      const {
        value: pendingKeyPath
      } = pendingKeyPathRef;
      if (hoverKey !== null)
        return pendingKeyPath.includes(key);
      if (keyboardKey !== null) {
        return pendingKeyPath.includes(key) && pendingKeyPath[pendingKeyPath.length - 1] !== key;
      }
      if (lastToggledSubmenuKey !== null)
        return pendingKeyPath.includes(key);
      return false;
    });
    const shouldDelayRef = computed(() => {
      return keyboardKeyRef.value === null && !animatedRef.value;
    });
    const deferredShowSubmenuRef = useDeferredTrue(showSubmenuRef, 300, shouldDelayRef);
    const parentEnteringSubmenuRef = computed(() => {
      return !!(NDropdownOption2 === null || NDropdownOption2 === void 0 ? void 0 : NDropdownOption2.enteringSubmenuRef.value);
    });
    const enteringSubmenuRef = ref(false);
    provide(dropdownOptionInjectionKey, {
      enteringSubmenuRef
    });
    function handleSubmenuBeforeEnter() {
      enteringSubmenuRef.value = true;
    }
    function handleSubmenuAfterEnter() {
      enteringSubmenuRef.value = false;
    }
    function handleMouseEnter() {
      const {
        parentKey,
        tmNode
      } = props;
      if (tmNode.disabled)
        return;
      if (!mergedShowRef.value)
        return;
      lastToggledSubmenuKeyRef.value = parentKey;
      keyboardKeyRef.value = null;
      hoverKeyRef.value = tmNode.key;
    }
    function handleMouseMove() {
      const {
        tmNode
      } = props;
      if (tmNode.disabled)
        return;
      if (!mergedShowRef.value)
        return;
      if (hoverKeyRef.value === tmNode.key)
        return;
      handleMouseEnter();
    }
    function handleMouseLeave(e) {
      if (props.tmNode.disabled)
        return;
      if (!mergedShowRef.value)
        return;
      const {
        relatedTarget
      } = e;
      if (relatedTarget && !happensIn({
        target: relatedTarget
      }, "dropdownOption") && !happensIn({
        target: relatedTarget
      }, "scrollbarRail")) {
        hoverKeyRef.value = null;
      }
    }
    function handleClick() {
      const {
        value: hasSubmenu
      } = hasSubmenuRef;
      const {
        tmNode
      } = props;
      if (!mergedShowRef.value)
        return;
      if (!hasSubmenu && !tmNode.disabled) {
        NDropdown2.doSelect(tmNode.key, tmNode.rawNode);
        NDropdown2.doUpdateShow(false);
      }
    }
    return {
      labelField: labelFieldRef,
      renderLabel: renderLabelRef,
      renderIcon: renderIconRef,
      siblingHasIcon: NDropdownMenu2.showIconRef,
      siblingHasSubmenu: NDropdownMenu2.hasSubmenuRef,
      menuProps: menuPropsRef,
      popoverBody: NPopoverBody,
      animated: animatedRef,
      mergedShowSubmenu: computed(() => {
        return deferredShowSubmenuRef.value && !parentEnteringSubmenuRef.value;
      }),
      rawNode: rawNodeRef,
      hasSubmenu: hasSubmenuRef,
      pending: useMemo(() => {
        const {
          value: pendingKeyPath
        } = pendingKeyPathRef;
        const {
          key
        } = props.tmNode;
        return pendingKeyPath.includes(key);
      }),
      childActive: useMemo(() => {
        const {
          value: activeKeyPath
        } = activeKeyPathRef;
        const {
          key
        } = props.tmNode;
        const index = activeKeyPath.findIndex((k) => key === k);
        if (index === -1)
          return false;
        return index < activeKeyPath.length - 1;
      }),
      active: useMemo(() => {
        const {
          value: activeKeyPath
        } = activeKeyPathRef;
        const {
          key
        } = props.tmNode;
        const index = activeKeyPath.findIndex((k) => key === k);
        if (index === -1)
          return false;
        return index === activeKeyPath.length - 1;
      }),
      mergedDisabled: mergedDisabledRef,
      renderOption: renderOptionRef,
      nodeProps: nodePropsRef,
      handleClick,
      handleMouseMove,
      handleMouseEnter,
      handleMouseLeave,
      handleSubmenuBeforeEnter,
      handleSubmenuAfterEnter
    };
  },
  render() {
    var _a, _b;
    const {
      animated,
      rawNode,
      mergedShowSubmenu,
      clsPrefix,
      siblingHasIcon,
      siblingHasSubmenu,
      renderLabel,
      renderIcon,
      renderOption,
      nodeProps,
      props,
      scrollable
    } = this;
    let submenuVNode = null;
    if (mergedShowSubmenu) {
      const submenuNodeProps = (_a = this.menuProps) === null || _a === void 0 ? void 0 : _a.call(this, rawNode, rawNode.children);
      submenuVNode = h(NDropdownMenu, Object.assign({}, submenuNodeProps, {
        clsPrefix,
        scrollable: this.scrollable,
        tmNodes: this.tmNode.children,
        parentKey: this.tmNode.key
      }));
    }
    const builtinProps = {
      class: [`${clsPrefix}-dropdown-option-body`, this.pending && `${clsPrefix}-dropdown-option-body--pending`, this.active && `${clsPrefix}-dropdown-option-body--active`, this.childActive && `${clsPrefix}-dropdown-option-body--child-active`, this.mergedDisabled && `${clsPrefix}-dropdown-option-body--disabled`],
      onMousemove: this.handleMouseMove,
      onMouseenter: this.handleMouseEnter,
      onMouseleave: this.handleMouseLeave,
      onClick: this.handleClick
    };
    const optionNodeProps = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(rawNode);
    const node = h("div", Object.assign({
      class: [`${clsPrefix}-dropdown-option`, optionNodeProps === null || optionNodeProps === void 0 ? void 0 : optionNodeProps.class],
      "data-dropdown-option": true
    }, optionNodeProps), h("div", mergeProps(builtinProps, props), [h("div", {
      class: [`${clsPrefix}-dropdown-option-body__prefix`, siblingHasIcon && `${clsPrefix}-dropdown-option-body__prefix--show-icon`]
    }, [renderIcon ? renderIcon(rawNode) : render(rawNode.icon)]), h("div", {
      "data-dropdown-option": true,
      class: `${clsPrefix}-dropdown-option-body__label`
    }, renderLabel ? renderLabel(rawNode) : render((_b = rawNode[this.labelField]) !== null && _b !== void 0 ? _b : rawNode.title)), h("div", {
      "data-dropdown-option": true,
      class: [`${clsPrefix}-dropdown-option-body__suffix`, siblingHasSubmenu && `${clsPrefix}-dropdown-option-body__suffix--has-submenu`]
    }, this.hasSubmenu ? h(NIcon, null, {
      default: () => h(ChevronRightIcon, null)
    }) : null)]), this.hasSubmenu ? h(VBinder, null, {
      default: () => [h(VTarget, null, {
        default: () => h("div", {
          class: `${clsPrefix}-dropdown-offset-container`
        }, h(VFollower, {
          show: this.mergedShowSubmenu,
          placement: this.placement,
          to: scrollable ? this.popoverBody || void 0 : void 0,
          teleportDisabled: !scrollable
        }, {
          default: () => {
            return h("div", {
              class: `${clsPrefix}-dropdown-menu-wrapper`
            }, animated ? h(Transition, {
              onBeforeEnter: this.handleSubmenuBeforeEnter,
              onAfterEnter: this.handleSubmenuAfterEnter,
              name: "fade-in-scale-up-transition",
              appear: true
            }, {
              default: () => submenuVNode
            }) : submenuVNode);
          }
        }))
      })]
    }) : null);
    if (renderOption) {
      return renderOption({
        node,
        option: rawNode
      });
    }
    return node;
  }
});
const NDropdownGroupHeader = defineComponent({
  name: "DropdownGroupHeader",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup() {
    const {
      showIconRef,
      hasSubmenuRef
    } = inject(dropdownMenuInjectionKey);
    const {
      renderLabelRef,
      labelFieldRef,
      nodePropsRef,
      renderOptionRef
    } = inject(dropdownInjectionKey);
    return {
      labelField: labelFieldRef,
      showIcon: showIconRef,
      hasSubmenu: hasSubmenuRef,
      renderLabel: renderLabelRef,
      nodeProps: nodePropsRef,
      renderOption: renderOptionRef
    };
  },
  render() {
    var _a;
    const {
      clsPrefix,
      hasSubmenu,
      showIcon,
      nodeProps,
      renderLabel,
      renderOption
    } = this;
    const {
      rawNode
    } = this.tmNode;
    const node = h("div", Object.assign({
      class: `${clsPrefix}-dropdown-option`
    }, nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(rawNode)), h("div", {
      class: `${clsPrefix}-dropdown-option-body ${clsPrefix}-dropdown-option-body--group`
    }, h("div", {
      "data-dropdown-option": true,
      class: [`${clsPrefix}-dropdown-option-body__prefix`, showIcon && `${clsPrefix}-dropdown-option-body__prefix--show-icon`]
    }, render(rawNode.icon)), h("div", {
      class: `${clsPrefix}-dropdown-option-body__label`,
      "data-dropdown-option": true
    }, renderLabel ? renderLabel(rawNode) : render((_a = rawNode.title) !== null && _a !== void 0 ? _a : rawNode[this.labelField])), h("div", {
      class: [`${clsPrefix}-dropdown-option-body__suffix`, hasSubmenu && `${clsPrefix}-dropdown-option-body__suffix--has-submenu`],
      "data-dropdown-option": true
    })));
    if (renderOption) {
      return renderOption({
        node,
        option: rawNode
      });
    }
    return node;
  }
});
const NDropdownGroup = defineComponent({
  name: "NDropdownGroup",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object,
      required: true
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  render() {
    const {
      tmNode,
      parentKey,
      clsPrefix
    } = this;
    const {
      children
    } = tmNode;
    return h(Fragment, null, h(NDropdownGroupHeader, {
      clsPrefix,
      tmNode,
      key: tmNode.key
    }), children === null || children === void 0 ? void 0 : children.map((child) => {
      const {
        rawNode
      } = child;
      if (rawNode.show === false)
        return null;
      if (isDividerNode(rawNode)) {
        return h(NDropdownDivider, {
          clsPrefix,
          key: child.key
        });
      }
      if (child.isGroup) {
        warn("dropdown", "`group` node is not allowed to be put in `group` node.");
        return null;
      }
      return h(NDropdownOption, {
        clsPrefix,
        tmNode: child,
        parentKey,
        key: child.key
      });
    }));
  }
});
const NDropdownRenderOption = defineComponent({
  name: "DropdownRenderOption",
  props: {
    tmNode: {
      type: Object,
      required: true
    }
  },
  render() {
    const {
      rawNode: {
        render: render2,
        props
      }
    } = this.tmNode;
    return h("div", props, [render2 === null || render2 === void 0 ? void 0 : render2()]);
  }
});
const NDropdownMenu = defineComponent({
  name: "DropdownMenu",
  props: {
    scrollable: Boolean,
    showArrow: Boolean,
    arrowStyle: [String, Object],
    clsPrefix: {
      type: String,
      required: true
    },
    tmNodes: {
      type: Array,
      default: () => []
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  setup(props) {
    const {
      renderIconRef,
      childrenFieldRef
    } = inject(dropdownInjectionKey);
    provide(dropdownMenuInjectionKey, {
      showIconRef: computed(() => {
        const renderIcon = renderIconRef.value;
        return props.tmNodes.some((tmNode) => {
          var _a;
          if (tmNode.isGroup) {
            return (_a = tmNode.children) === null || _a === void 0 ? void 0 : _a.some(({
              rawNode: rawChild
            }) => renderIcon ? renderIcon(rawChild) : rawChild.icon);
          }
          const {
            rawNode
          } = tmNode;
          return renderIcon ? renderIcon(rawNode) : rawNode.icon;
        });
      }),
      hasSubmenuRef: computed(() => {
        const {
          value: childrenField
        } = childrenFieldRef;
        return props.tmNodes.some((tmNode) => {
          var _a;
          if (tmNode.isGroup) {
            return (_a = tmNode.children) === null || _a === void 0 ? void 0 : _a.some(({
              rawNode: rawChild
            }) => isSubmenuNode(rawChild, childrenField));
          }
          const {
            rawNode
          } = tmNode;
          return isSubmenuNode(rawNode, childrenField);
        });
      })
    });
    const bodyRef = ref(null);
    provide(modalBodyInjectionKey, null);
    provide(drawerBodyInjectionKey, null);
    provide(popoverBodyInjectionKey, bodyRef);
    return {
      bodyRef
    };
  },
  render() {
    const {
      parentKey,
      clsPrefix,
      scrollable
    } = this;
    const menuOptionsNode = this.tmNodes.map((tmNode) => {
      const {
        rawNode
      } = tmNode;
      if (rawNode.show === false)
        return null;
      if (isRenderNode(rawNode)) {
        return h(NDropdownRenderOption, {
          tmNode,
          key: tmNode.key
        });
      }
      if (isDividerNode(rawNode)) {
        return h(NDropdownDivider, {
          clsPrefix,
          key: tmNode.key
        });
      }
      if (isGroupNode(rawNode)) {
        return h(NDropdownGroup, {
          clsPrefix,
          tmNode,
          parentKey,
          key: tmNode.key
        });
      }
      return h(NDropdownOption, {
        clsPrefix,
        tmNode,
        parentKey,
        key: tmNode.key,
        props: rawNode.props,
        scrollable
      });
    });
    return h("div", {
      class: [`${clsPrefix}-dropdown-menu`, scrollable && `${clsPrefix}-dropdown-menu--scrollable`],
      ref: "bodyRef"
    }, scrollable ? h(XScrollbar, {
      contentClass: `${clsPrefix}-dropdown-menu__content`
    }, {
      default: () => menuOptionsNode
    }) : menuOptionsNode, this.showArrow ? renderArrow({
      clsPrefix,
      arrowStyle: this.arrowStyle,
      arrowClass: void 0,
      arrowWrapperClass: void 0,
      arrowWrapperStyle: void 0
    }) : null);
  }
});
const style$6 = cB("dropdown-menu", `
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`, [fadeInScaleUpTransition(), cB("dropdown-option", `
 position: relative;
 `, [c("a", `
 text-decoration: none;
 color: inherit;
 outline: none;
 `, [c("&::before", `
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]), cB("dropdown-option-body", `
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `, [c("&::before", `
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `), cNotM("disabled", [cM("pending", `
 color: var(--n-option-text-color-hover);
 `, [cE("prefix, suffix", `
 color: var(--n-option-text-color-hover);
 `), c("&::before", "background-color: var(--n-option-color-hover);")]), cM("active", `
 color: var(--n-option-text-color-active);
 `, [cE("prefix, suffix", `
 color: var(--n-option-text-color-active);
 `), c("&::before", "background-color: var(--n-option-color-active);")]), cM("child-active", `
 color: var(--n-option-text-color-child-active);
 `, [cE("prefix, suffix", `
 color: var(--n-option-text-color-child-active);
 `)])]), cM("disabled", `
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `), cM("group", `
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `, [cE("prefix", `
 width: calc(var(--n-option-prefix-width) / 2);
 `, [cM("show-icon", `
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]), cE("prefix", `
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `, [cM("show-icon", `
 width: var(--n-option-icon-prefix-width);
 `), cB("icon", `
 font-size: var(--n-option-icon-size);
 `)]), cE("label", `
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `), cE("suffix", `
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `, [cM("has-submenu", `
 width: var(--n-option-icon-suffix-width);
 `), cB("icon", `
 font-size: var(--n-option-icon-size);
 `)]), cB("dropdown-menu", "pointer-events: all;")]), cB("dropdown-offset-container", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]), cB("dropdown-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `), cB("dropdown-menu-wrapper", `
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `), c(">", [cB("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), cNotM("scrollable", `
 padding: var(--n-padding);
 `), cM("scrollable", [cE("content", `
 padding: var(--n-padding);
 `)])]);
const dropdownBaseProps = {
  animated: {
    type: Boolean,
    default: true
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: "medium"
  },
  inverted: Boolean,
  placement: {
    type: String,
    default: "bottom"
  },
  onSelect: [Function, Array],
  options: {
    type: Array,
    default: () => []
  },
  menuProps: Function,
  showArrow: Boolean,
  renderLabel: Function,
  renderIcon: Function,
  renderOption: Function,
  nodeProps: Function,
  labelField: {
    type: String,
    default: "label"
  },
  keyField: {
    type: String,
    default: "key"
  },
  childrenField: {
    type: String,
    default: "children"
  },
  // for menu, not documented
  value: [String, Number]
};
const popoverPropKeys = Object.keys(popoverBaseProps);
const dropdownProps = Object.assign(Object.assign(Object.assign({}, popoverBaseProps), dropdownBaseProps), useTheme.props);
const NDropdown = defineComponent({
  name: "Dropdown",
  inheritAttrs: false,
  props: dropdownProps,
  setup(props) {
    const uncontrolledShowRef = ref(false);
    const mergedShowRef = useMergedState(toRef(props, "show"), uncontrolledShowRef);
    const treemateRef = computed(() => {
      const {
        keyField,
        childrenField
      } = props;
      return createTreeMate(props.options, {
        getKey(node) {
          return node[keyField];
        },
        getDisabled(node) {
          return node.disabled === true;
        },
        getIgnored(node) {
          return node.type === "divider" || node.type === "render";
        },
        getChildren(node) {
          return node[childrenField];
        }
      });
    });
    const tmNodesRef = computed(() => {
      return treemateRef.value.treeNodes;
    });
    const hoverKeyRef = ref(null);
    const keyboardKeyRef = ref(null);
    const lastToggledSubmenuKeyRef = ref(null);
    const pendingKeyRef = computed(() => {
      var _a, _b, _c;
      return (_c = (_b = (_a = hoverKeyRef.value) !== null && _a !== void 0 ? _a : keyboardKeyRef.value) !== null && _b !== void 0 ? _b : lastToggledSubmenuKeyRef.value) !== null && _c !== void 0 ? _c : null;
    });
    const pendingKeyPathRef = computed(() => treemateRef.value.getPath(pendingKeyRef.value).keyPath);
    const activeKeyPathRef = computed(() => treemateRef.value.getPath(props.value).keyPath);
    const keyboardEnabledRef = useMemo(() => {
      return props.keyboard && mergedShowRef.value;
    });
    useKeyboard$1({
      keydown: {
        ArrowUp: {
          prevent: true,
          handler: handleKeydownUp
        },
        ArrowRight: {
          prevent: true,
          handler: handleKeydownRight
        },
        ArrowDown: {
          prevent: true,
          handler: handleKeydownDown
        },
        ArrowLeft: {
          prevent: true,
          handler: handleKeydownLeft
        },
        Enter: {
          prevent: true,
          handler: handleKeydownEnter
        },
        Escape: handleKeydownEsc
      }
    }, keyboardEnabledRef);
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme("Dropdown", "-dropdown", style$6, dropdownLight, props, mergedClsPrefixRef);
    provide(dropdownInjectionKey, {
      labelFieldRef: toRef(props, "labelField"),
      childrenFieldRef: toRef(props, "childrenField"),
      renderLabelRef: toRef(props, "renderLabel"),
      renderIconRef: toRef(props, "renderIcon"),
      hoverKeyRef,
      keyboardKeyRef,
      lastToggledSubmenuKeyRef,
      pendingKeyPathRef,
      activeKeyPathRef,
      animatedRef: toRef(props, "animated"),
      mergedShowRef,
      nodePropsRef: toRef(props, "nodeProps"),
      renderOptionRef: toRef(props, "renderOption"),
      menuPropsRef: toRef(props, "menuProps"),
      doSelect,
      doUpdateShow
    });
    watch(mergedShowRef, (value) => {
      if (!props.animated && !value) {
        clearPendingState();
      }
    });
    function doSelect(key, node) {
      const {
        onSelect
      } = props;
      if (onSelect)
        call(onSelect, key, node);
    }
    function doUpdateShow(value) {
      const {
        "onUpdate:show": _onUpdateShow,
        onUpdateShow
      } = props;
      if (_onUpdateShow)
        call(_onUpdateShow, value);
      if (onUpdateShow)
        call(onUpdateShow, value);
      uncontrolledShowRef.value = value;
    }
    function clearPendingState() {
      hoverKeyRef.value = null;
      keyboardKeyRef.value = null;
      lastToggledSubmenuKeyRef.value = null;
    }
    function handleKeydownEsc() {
      doUpdateShow(false);
    }
    function handleKeydownLeft() {
      handleKeydown("left");
    }
    function handleKeydownRight() {
      handleKeydown("right");
    }
    function handleKeydownUp() {
      handleKeydown("up");
    }
    function handleKeydownDown() {
      handleKeydown("down");
    }
    function handleKeydownEnter() {
      const pendingNode = getPendingNode();
      if ((pendingNode === null || pendingNode === void 0 ? void 0 : pendingNode.isLeaf) && mergedShowRef.value) {
        doSelect(pendingNode.key, pendingNode.rawNode);
        doUpdateShow(false);
      }
    }
    function getPendingNode() {
      var _a;
      const {
        value: treeMate
      } = treemateRef;
      const {
        value: pendingKey
      } = pendingKeyRef;
      if (!treeMate || pendingKey === null)
        return null;
      return (_a = treeMate.getNode(pendingKey)) !== null && _a !== void 0 ? _a : null;
    }
    function handleKeydown(direction) {
      const {
        value: pendingKey
      } = pendingKeyRef;
      const {
        value: {
          getFirstAvailableNode
        }
      } = treemateRef;
      let nextKeyboardKey = null;
      if (pendingKey === null) {
        const firstNode = getFirstAvailableNode();
        if (firstNode !== null) {
          nextKeyboardKey = firstNode.key;
        }
      } else {
        const currentNode = getPendingNode();
        if (currentNode) {
          let nextNode;
          switch (direction) {
            case "down":
              nextNode = currentNode.getNext();
              break;
            case "up":
              nextNode = currentNode.getPrev();
              break;
            case "right":
              nextNode = currentNode.getChild();
              break;
            case "left":
              nextNode = currentNode.getParent();
              break;
          }
          if (nextNode)
            nextKeyboardKey = nextNode.key;
        }
      }
      if (nextKeyboardKey !== null) {
        hoverKeyRef.value = null;
        keyboardKeyRef.value = nextKeyboardKey;
      }
    }
    const cssVarsRef = computed(() => {
      const {
        size,
        inverted
      } = props;
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: self2
      } = themeRef.value;
      const {
        padding,
        dividerColor,
        borderRadius,
        optionOpacityDisabled,
        [createKey("optionIconSuffixWidth", size)]: optionIconSuffixWidth,
        [createKey("optionSuffixWidth", size)]: optionSuffixWidth,
        [createKey("optionIconPrefixWidth", size)]: optionIconPrefixWidth,
        [createKey("optionPrefixWidth", size)]: optionPrefixWidth,
        [createKey("fontSize", size)]: fontSize,
        [createKey("optionHeight", size)]: optionHeight,
        [createKey("optionIconSize", size)]: optionIconSize
      } = self2;
      const vars = {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-font-size": fontSize,
        "--n-padding": padding,
        "--n-border-radius": borderRadius,
        "--n-option-height": optionHeight,
        "--n-option-prefix-width": optionPrefixWidth,
        "--n-option-icon-prefix-width": optionIconPrefixWidth,
        "--n-option-suffix-width": optionSuffixWidth,
        "--n-option-icon-suffix-width": optionIconSuffixWidth,
        "--n-option-icon-size": optionIconSize,
        "--n-divider-color": dividerColor,
        "--n-option-opacity-disabled": optionOpacityDisabled
      };
      if (inverted) {
        vars["--n-color"] = self2.colorInverted;
        vars["--n-option-color-hover"] = self2.optionColorHoverInverted;
        vars["--n-option-color-active"] = self2.optionColorActiveInverted;
        vars["--n-option-text-color"] = self2.optionTextColorInverted;
        vars["--n-option-text-color-hover"] = self2.optionTextColorHoverInverted;
        vars["--n-option-text-color-active"] = self2.optionTextColorActiveInverted;
        vars["--n-option-text-color-child-active"] = self2.optionTextColorChildActiveInverted;
        vars["--n-prefix-color"] = self2.prefixColorInverted;
        vars["--n-suffix-color"] = self2.suffixColorInverted;
        vars["--n-group-header-text-color"] = self2.groupHeaderTextColorInverted;
      } else {
        vars["--n-color"] = self2.color;
        vars["--n-option-color-hover"] = self2.optionColorHover;
        vars["--n-option-color-active"] = self2.optionColorActive;
        vars["--n-option-text-color"] = self2.optionTextColor;
        vars["--n-option-text-color-hover"] = self2.optionTextColorHover;
        vars["--n-option-text-color-active"] = self2.optionTextColorActive;
        vars["--n-option-text-color-child-active"] = self2.optionTextColorChildActive;
        vars["--n-prefix-color"] = self2.prefixColor;
        vars["--n-suffix-color"] = self2.suffixColor;
        vars["--n-group-header-text-color"] = self2.groupHeaderTextColor;
      }
      return vars;
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("dropdown", computed(() => `${props.size[0]}${props.inverted ? "i" : ""}`), cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      // data
      tmNodes: tmNodesRef,
      // show
      mergedShow: mergedShowRef,
      // methods
      handleAfterLeave: () => {
        if (!props.animated)
          return;
        clearPendingState();
      },
      doUpdateShow,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const renderPopoverBody = (className, ref2, style2, onMouseenter, onMouseleave) => {
      var _a;
      const {
        mergedClsPrefix,
        menuProps
      } = this;
      (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
      const menuNodeProps = (menuProps === null || menuProps === void 0 ? void 0 : menuProps(void 0, this.tmNodes.map((v) => v.rawNode))) || {};
      const dropdownProps2 = {
        ref: createRefSetter(ref2),
        class: [className, `${mergedClsPrefix}-dropdown`, this.themeClass],
        clsPrefix: mergedClsPrefix,
        tmNodes: this.tmNodes,
        style: [...style2, this.cssVars],
        showArrow: this.showArrow,
        arrowStyle: this.arrowStyle,
        scrollable: this.scrollable,
        onMouseenter,
        onMouseleave
      };
      return h(NDropdownMenu, mergeProps(this.$attrs, dropdownProps2, menuNodeProps));
    };
    const {
      mergedTheme
    } = this;
    const popoverProps = {
      show: this.mergedShow,
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      internalOnAfterLeave: this.handleAfterLeave,
      internalRenderBody: renderPopoverBody,
      onUpdateShow: this.doUpdateShow,
      "onUpdate:show": void 0
    };
    return h(NPopover, Object.assign({}, keep(this.$props, popoverPropKeys), popoverProps), {
      trigger: () => {
        var _a, _b;
        return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    });
  }
});
const commonVariables = {
  feedbackPadding: "4px 0 0 2px",
  feedbackHeightSmall: "24px",
  feedbackHeightMedium: "24px",
  feedbackHeightLarge: "26px",
  feedbackFontSizeSmall: "13px",
  feedbackFontSizeMedium: "14px",
  feedbackFontSizeLarge: "14px",
  labelFontSizeLeftSmall: "14px",
  labelFontSizeLeftMedium: "14px",
  labelFontSizeLeftLarge: "15px",
  labelFontSizeTopSmall: "13px",
  labelFontSizeTopMedium: "14px",
  labelFontSizeTopLarge: "14px",
  labelHeightSmall: "24px",
  labelHeightMedium: "26px",
  labelHeightLarge: "28px",
  labelPaddingVertical: "0 0 6px 2px",
  labelPaddingHorizontal: "0 12px 0 0",
  labelTextAlignVertical: "left",
  labelTextAlignHorizontal: "right",
  labelFontWeight: "400"
};
function self$4(vars) {
  const {
    heightSmall,
    heightMedium,
    heightLarge,
    textColor1,
    errorColor,
    warningColor,
    lineHeight,
    textColor3
  } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    blankHeightSmall: heightSmall,
    blankHeightMedium: heightMedium,
    blankHeightLarge: heightLarge,
    lineHeight,
    labelTextColor: textColor1,
    asteriskColor: errorColor,
    feedbackTextColorError: errorColor,
    feedbackTextColorWarning: warningColor,
    feedbackTextColor: textColor3
  });
}
const formLight = {
  name: "Form",
  common: derived,
  self: self$4
};
const style$5 = cB("form", [cM("inline", `
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `, [cB("form-item", {
  width: "auto",
  marginRight: "18px"
}, [c("&:last-child", {
  marginRight: 0
})])])]);
const formInjectionKey = createInjectionKey("n-form");
const formItemInstsInjectionKey = createInjectionKey("n-form-item-insts");
var __awaiter$2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const formProps = Object.assign(Object.assign({}, useTheme.props), {
  inline: Boolean,
  labelWidth: [Number, String],
  labelAlign: String,
  labelPlacement: {
    type: String,
    default: "top"
  },
  model: {
    type: Object,
    default: () => {
    }
  },
  rules: Object,
  disabled: Boolean,
  size: String,
  showRequireMark: {
    type: Boolean,
    default: void 0
  },
  requireMarkPlacement: String,
  showFeedback: {
    type: Boolean,
    default: true
  },
  onSubmit: {
    type: Function,
    default: (e) => {
      e.preventDefault();
    }
  },
  showLabel: {
    type: Boolean,
    default: void 0
  },
  validateMessages: Object
});
const NForm = defineComponent({
  name: "Form",
  props: formProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    useTheme("Form", "-form", style$5, formLight, props, mergedClsPrefixRef);
    const formItems = {};
    const maxChildLabelWidthRef = ref(void 0);
    const deriveMaxChildLabelWidth = (currentWidth) => {
      const currentMaxChildLabelWidth = maxChildLabelWidthRef.value;
      if (currentMaxChildLabelWidth === void 0 || currentWidth >= currentMaxChildLabelWidth) {
        maxChildLabelWidthRef.value = currentWidth;
      }
    };
    function validate(validateCallback_1) {
      return __awaiter$2(this, arguments, void 0, function* (validateCallback, shouldRuleBeApplied = () => true) {
        return yield new Promise((resolve, reject) => {
          const formItemValidationPromises = [];
          for (const key of keysOf(formItems)) {
            const formItemInstances = formItems[key];
            for (const formItemInstance of formItemInstances) {
              if (formItemInstance.path) {
                formItemValidationPromises.push(formItemInstance.internalValidate(null, shouldRuleBeApplied));
              }
            }
          }
          void Promise.all(formItemValidationPromises).then((results) => {
            const formInvalid = results.some((result) => !result.valid);
            const errors = [];
            const warnings = [];
            results.forEach((result) => {
              var _a, _b;
              if ((_a = result.errors) === null || _a === void 0 ? void 0 : _a.length) {
                errors.push(result.errors);
              }
              if ((_b = result.warnings) === null || _b === void 0 ? void 0 : _b.length) {
                warnings.push(result.warnings);
              }
            });
            if (validateCallback) {
              validateCallback(errors.length ? errors : void 0, {
                warnings: warnings.length ? warnings : void 0
              });
            }
            if (formInvalid) {
              reject(errors.length ? errors : void 0);
            } else {
              resolve({
                warnings: warnings.length ? warnings : void 0
              });
            }
          });
        });
      });
    }
    function restoreValidation() {
      for (const key of keysOf(formItems)) {
        const formItemInstances = formItems[key];
        for (const formItemInstance of formItemInstances) {
          formItemInstance.restoreValidation();
        }
      }
    }
    provide(formInjectionKey, {
      props,
      maxChildLabelWidthRef,
      deriveMaxChildLabelWidth
    });
    provide(formItemInstsInjectionKey, {
      formItems
    });
    const formExposedMethod = {
      validate,
      restoreValidation
    };
    return Object.assign(formExposedMethod, {
      mergedClsPrefix: mergedClsPrefixRef
    });
  },
  render() {
    const {
      mergedClsPrefix
    } = this;
    return h("form", {
      class: [`${mergedClsPrefix}-form`, this.inline && `${mergedClsPrefix}-form--inline`],
      onSubmit: this.onSubmit
    }, this.$slots);
  }
});
function formItemSize(props) {
  const NForm2 = inject(formInjectionKey, null);
  return {
    mergedSize: computed(() => {
      if (props.size !== void 0)
        return props.size;
      if ((NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.size) !== void 0)
        return NForm2.props.size;
      return "medium";
    })
  };
}
function formItemMisc(props) {
  const NForm2 = inject(formInjectionKey, null);
  const mergedLabelPlacementRef = computed(() => {
    const {
      labelPlacement
    } = props;
    if (labelPlacement !== void 0)
      return labelPlacement;
    if (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.labelPlacement)
      return NForm2.props.labelPlacement;
    return "top";
  });
  const isAutoLabelWidthRef = computed(() => {
    return mergedLabelPlacementRef.value === "left" && (props.labelWidth === "auto" || (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.labelWidth) === "auto");
  });
  const mergedLabelWidthRef = computed(() => {
    if (mergedLabelPlacementRef.value === "top")
      return;
    const {
      labelWidth
    } = props;
    if (labelWidth !== void 0 && labelWidth !== "auto") {
      return formatLength(labelWidth);
    }
    if (isAutoLabelWidthRef.value) {
      const autoComputedWidth = NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.maxChildLabelWidthRef.value;
      if (autoComputedWidth !== void 0) {
        return formatLength(autoComputedWidth);
      } else {
        return void 0;
      }
    }
    if ((NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.labelWidth) !== void 0) {
      return formatLength(NForm2.props.labelWidth);
    }
    return void 0;
  });
  const mergedLabelAlignRef = computed(() => {
    const {
      labelAlign
    } = props;
    if (labelAlign)
      return labelAlign;
    if (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.labelAlign)
      return NForm2.props.labelAlign;
    return void 0;
  });
  const mergedLabelStyleRef = computed(() => {
    var _a;
    return [(_a = props.labelProps) === null || _a === void 0 ? void 0 : _a.style, props.labelStyle, {
      width: mergedLabelWidthRef.value
    }];
  });
  const mergedShowRequireMarkRef = computed(() => {
    const {
      showRequireMark
    } = props;
    if (showRequireMark !== void 0)
      return showRequireMark;
    return NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.showRequireMark;
  });
  const mergedRequireMarkPlacementRef = computed(() => {
    const {
      requireMarkPlacement
    } = props;
    if (requireMarkPlacement !== void 0)
      return requireMarkPlacement;
    return (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.requireMarkPlacement) || "right";
  });
  const validationErroredRef = ref(false);
  const validationWarnedRef = ref(false);
  const mergedValidationStatusRef = computed(() => {
    const {
      validationStatus
    } = props;
    if (validationStatus !== void 0)
      return validationStatus;
    if (validationErroredRef.value)
      return "error";
    if (validationWarnedRef.value)
      return "warning";
    return void 0;
  });
  const mergedShowFeedbackRef = computed(() => {
    const {
      showFeedback
    } = props;
    if (showFeedback !== void 0)
      return showFeedback;
    if ((NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.showFeedback) !== void 0)
      return NForm2.props.showFeedback;
    return true;
  });
  const mergedShowLabelRef = computed(() => {
    const {
      showLabel
    } = props;
    if (showLabel !== void 0)
      return showLabel;
    if ((NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.showLabel) !== void 0)
      return NForm2.props.showLabel;
    return true;
  });
  return {
    validationErrored: validationErroredRef,
    validationWarned: validationWarnedRef,
    mergedLabelStyle: mergedLabelStyleRef,
    mergedLabelPlacement: mergedLabelPlacementRef,
    mergedLabelAlign: mergedLabelAlignRef,
    mergedShowRequireMark: mergedShowRequireMarkRef,
    mergedRequireMarkPlacement: mergedRequireMarkPlacementRef,
    mergedValidationStatus: mergedValidationStatusRef,
    mergedShowFeedback: mergedShowFeedbackRef,
    mergedShowLabel: mergedShowLabelRef,
    isAutoLabelWidth: isAutoLabelWidthRef
  };
}
function formItemRule(props) {
  const NForm2 = inject(formInjectionKey, null);
  const compatibleRulePathRef = computed(() => {
    const {
      rulePath
    } = props;
    if (rulePath !== void 0)
      return rulePath;
    const {
      path
    } = props;
    if (path !== void 0)
      return path;
    return void 0;
  });
  const mergedRulesRef = computed(() => {
    const rules = [];
    const {
      rule
    } = props;
    if (rule !== void 0) {
      if (Array.isArray(rule))
        rules.push(...rule);
      else
        rules.push(rule);
    }
    if (NForm2) {
      const {
        rules: formRules
      } = NForm2.props;
      const {
        value: rulePath
      } = compatibleRulePathRef;
      if (formRules !== void 0 && rulePath !== void 0) {
        const formRule = get(formRules, rulePath);
        if (formRule !== void 0) {
          if (Array.isArray(formRule)) {
            rules.push(...formRule);
          } else {
            rules.push(formRule);
          }
        }
      }
    }
    return rules;
  });
  const hasRequiredRuleRef = computed(() => {
    return mergedRulesRef.value.some((rule) => rule.required);
  });
  const mergedRequiredRef = computed(() => {
    return hasRequiredRuleRef.value || props.required;
  });
  return {
    mergedRules: mergedRulesRef,
    mergedRequired: mergedRequiredRef
  };
}
const {
  cubicBezierEaseInOut
} = commonVariables$2$1;
function fadeDownTransition({
  name = "fade-down",
  fromOffset = "-4px",
  enterDuration = ".3s",
  leaveDuration = ".3s",
  enterCubicBezier = cubicBezierEaseInOut,
  leaveCubicBezier = cubicBezierEaseInOut
} = {}) {
  return [c(`&.${name}-transition-enter-from, &.${name}-transition-leave-to`, {
    opacity: 0,
    transform: `translateY(${fromOffset})`
  }), c(`&.${name}-transition-enter-to, &.${name}-transition-leave-from`, {
    opacity: 1,
    transform: "translateY(0)"
  }), c(`&.${name}-transition-leave-active`, {
    transition: `opacity ${leaveDuration} ${leaveCubicBezier}, transform ${leaveDuration} ${leaveCubicBezier}`
  }), c(`&.${name}-transition-enter-active`, {
    transition: `opacity ${enterDuration} ${enterCubicBezier}, transform ${enterDuration} ${enterCubicBezier}`
  })];
}
const style$4 = cB("form-item", `
 display: grid;
 line-height: var(--n-line-height);
`, [cB("form-item-label", `
 grid-area: label;
 align-items: center;
 line-height: 1.25;
 text-align: var(--n-label-text-align);
 font-size: var(--n-label-font-size);
 min-height: var(--n-label-height);
 padding: var(--n-label-padding);
 color: var(--n-label-text-color);
 transition: color .3s var(--n-bezier);
 box-sizing: border-box;
 font-weight: var(--n-label-font-weight);
 `, [cE("asterisk", `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `), cE("asterisk-placeholder", `
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]), cB("form-item-blank", `
 grid-area: blank;
 min-height: var(--n-blank-height);
 `), cM("auto-label-width", [cB("form-item-label", "white-space: nowrap;")]), cM("left-labelled", `
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: flex-start;
 `, [cB("form-item-label", `
 display: grid;
 grid-template-columns: 1fr auto;
 min-height: var(--n-blank-height);
 height: auto;
 box-sizing: border-box;
 flex-shrink: 0;
 flex-grow: 0;
 `, [cM("reverse-columns-space", `
 grid-template-columns: auto 1fr;
 `), cM("left-mark", `
 grid-template-areas:
 "mark text"
 ". text";
 `), cM("right-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), cM("right-hanging-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), cE("text", `
 grid-area: text; 
 `), cE("asterisk", `
 grid-area: mark; 
 align-self: end;
 `)])]), cM("top-labelled", `
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `, [cM("no-label", `
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `), cB("form-item-label", `
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]), cB("form-item-blank", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `), cB("form-item-feedback-wrapper", `
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `, [c("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), cB("form-item-feedback", {
  transition: "color .3s var(--n-bezier)",
  color: "var(--n-feedback-text-color)"
}, [cM("warning", {
  color: "var(--n-feedback-text-color-warning)"
}), cM("error", {
  color: "var(--n-feedback-text-color-error)"
}), fadeDownTransition({
  fromOffset: "-3px",
  enterDuration: ".3s",
  leaveDuration: ".2s"
})])])]);
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const formItemProps = Object.assign(Object.assign({}, useTheme.props), {
  label: String,
  labelWidth: [Number, String],
  labelStyle: [String, Object],
  labelAlign: String,
  labelPlacement: String,
  path: String,
  first: Boolean,
  rulePath: String,
  required: Boolean,
  showRequireMark: {
    type: Boolean,
    default: void 0
  },
  requireMarkPlacement: String,
  showFeedback: {
    type: Boolean,
    default: void 0
  },
  rule: [Object, Array],
  size: String,
  ignorePathChange: Boolean,
  validationStatus: String,
  feedback: String,
  feedbackClass: String,
  feedbackStyle: [String, Object],
  showLabel: {
    type: Boolean,
    default: void 0
  },
  labelProps: Object
});
function wrapValidator(validator, async) {
  return (...args) => {
    try {
      const validateResult = validator(...args);
      if (!async && (typeof validateResult === "boolean" || validateResult instanceof Error || Array.isArray(validateResult)) || (validateResult === null || validateResult === void 0 ? void 0 : validateResult.then)) {
        return validateResult;
      } else if (validateResult === void 0) {
        return true;
      } else {
        warn("form-item/validate", `You return a ${typeof validateResult} typed value in the validator method, which is not recommended. Please use ${async ? "`Promise`" : "`boolean`, `Error` or `Promise`"} typed value instead.`);
        return true;
      }
    } catch (err) {
      warn("form-item/validate", "An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation.");
      console.error(err);
      return void 0;
    }
  };
}
const NFormItem = defineComponent({
  name: "FormItem",
  props: formItemProps,
  setup(props) {
    useInjectionInstanceCollection(formItemInstsInjectionKey, "formItems", toRef(props, "path"));
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const NForm2 = inject(formInjectionKey, null);
    const formItemSizeRefs = formItemSize(props);
    const formItemMiscRefs = formItemMisc(props);
    const {
      validationErrored: validationErroredRef,
      validationWarned: validationWarnedRef
    } = formItemMiscRefs;
    const {
      mergedRequired: mergedRequiredRef,
      mergedRules: mergedRulesRef
    } = formItemRule(props);
    const {
      mergedSize: mergedSizeRef
    } = formItemSizeRefs;
    const {
      mergedLabelPlacement: labelPlacementRef,
      mergedLabelAlign: labelTextAlignRef,
      mergedRequireMarkPlacement: mergedRequireMarkPlacementRef
    } = formItemMiscRefs;
    const renderExplainsRef = ref([]);
    const feedbackIdRef = ref(createId());
    const mergedDisabledRef = NForm2 ? toRef(NForm2.props, "disabled") : ref(false);
    const themeRef = useTheme("Form", "-form-item", style$4, formLight, props, mergedClsPrefixRef);
    watch(toRef(props, "path"), () => {
      if (props.ignorePathChange)
        return;
      restoreValidation();
    });
    function restoreValidation() {
      renderExplainsRef.value = [];
      validationErroredRef.value = false;
      validationWarnedRef.value = false;
      if (props.feedback) {
        feedbackIdRef.value = createId();
      }
    }
    const internalValidate = (...args_1) => __awaiter$1(this, [...args_1], void 0, function* (trigger = null, shouldRuleBeApplied = () => true, options = {
      suppressWarning: true
    }) {
      const {
        path
      } = props;
      if (!options) {
        options = {};
      } else {
        if (!options.first)
          options.first = props.first;
      }
      const {
        value: rules
      } = mergedRulesRef;
      const value = NForm2 ? get(NForm2.props.model, path || "") : void 0;
      const messageRenderers = {};
      const originalMessageRendersMessage = {};
      const activeRules = (!trigger ? rules : rules.filter((rule) => {
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.includes(trigger);
        } else {
          return rule.trigger === trigger;
        }
      })).filter(shouldRuleBeApplied).map((rule, i) => {
        const shallowClonedRule = Object.assign({}, rule);
        if (shallowClonedRule.validator) {
          shallowClonedRule.validator = wrapValidator(shallowClonedRule.validator, false);
        }
        if (shallowClonedRule.asyncValidator) {
          shallowClonedRule.asyncValidator = wrapValidator(shallowClonedRule.asyncValidator, true);
        }
        if (shallowClonedRule.renderMessage) {
          const rendererKey = `__renderMessage__${i}`;
          originalMessageRendersMessage[rendererKey] = shallowClonedRule.message;
          shallowClonedRule.message = rendererKey;
          messageRenderers[rendererKey] = shallowClonedRule.renderMessage;
        }
        return shallowClonedRule;
      });
      const activeErrorRules = activeRules.filter((r) => r.level !== "warning");
      const activeWarningRules = activeRules.filter((r) => r.level === "warning");
      const validationResult = {
        valid: true,
        errors: void 0,
        warnings: void 0
      };
      if (!activeRules.length)
        return validationResult;
      const mergedPath = path !== null && path !== void 0 ? path : "__n_no_path__";
      const validator = new Schema({
        [mergedPath]: activeErrorRules
      });
      const warningValidator = new Schema({
        [mergedPath]: activeWarningRules
      });
      const {
        validateMessages
      } = (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props) || {};
      if (validateMessages) {
        validator.messages(validateMessages);
        warningValidator.messages(validateMessages);
      }
      const renderMessages = (errors) => {
        renderExplainsRef.value = errors.map((error) => {
          const transformedMessage = (error === null || error === void 0 ? void 0 : error.message) || "";
          return {
            key: transformedMessage,
            render: () => {
              if (transformedMessage.startsWith("__renderMessage__")) {
                return messageRenderers[transformedMessage]();
              }
              return transformedMessage;
            }
          };
        });
        errors.forEach((error) => {
          var _a;
          if ((_a = error.message) === null || _a === void 0 ? void 0 : _a.startsWith("__renderMessage__")) {
            error.message = originalMessageRendersMessage[error.message];
          }
        });
      };
      if (activeErrorRules.length) {
        const errors = yield new Promise((resolve) => {
          void validator.validate({
            [mergedPath]: value
          }, options, resolve);
        });
        if (errors === null || errors === void 0 ? void 0 : errors.length) {
          validationResult.valid = false;
          validationResult.errors = errors;
          renderMessages(errors);
        }
      }
      if (activeWarningRules.length && !validationResult.errors) {
        const warnings = yield new Promise((resolve) => {
          void warningValidator.validate({
            [mergedPath]: value
          }, options, resolve);
        });
        if (warnings === null || warnings === void 0 ? void 0 : warnings.length) {
          renderMessages(warnings);
          validationResult.warnings = warnings;
        }
      }
      if (!validationResult.errors && !validationResult.warnings) {
        restoreValidation();
      } else {
        validationErroredRef.value = !!validationResult.errors;
        validationWarnedRef.value = !!validationResult.warnings;
      }
      return validationResult;
    });
    function handleContentBlur() {
      void internalValidate("blur");
    }
    function handleContentChange() {
      void internalValidate("change");
    }
    function handleContentFocus() {
      void internalValidate("focus");
    }
    function handleContentInput() {
      void internalValidate("input");
    }
    function validate(options, callback) {
      return __awaiter$1(this, void 0, void 0, function* () {
        let trigger;
        let validateCallback;
        let shouldRuleBeApplied;
        let asyncValidatorOptions;
        if (typeof options === "string") {
          trigger = options;
          validateCallback = callback;
        } else if (options !== null && typeof options === "object") {
          trigger = options.trigger;
          validateCallback = options.callback;
          shouldRuleBeApplied = options.shouldRuleBeApplied;
          asyncValidatorOptions = options.options;
        }
        return yield new Promise((resolve, reject) => {
          void internalValidate(trigger, shouldRuleBeApplied, asyncValidatorOptions).then(({
            valid,
            errors,
            warnings
          }) => {
            if (valid) {
              if (validateCallback) {
                validateCallback(void 0, {
                  warnings
                });
              }
              resolve({
                warnings
              });
            } else {
              if (validateCallback) {
                validateCallback(errors, {
                  warnings
                });
              }
              reject(errors);
            }
          });
        });
      });
    }
    provide(formItemInjectionKey, {
      path: toRef(props, "path"),
      disabled: mergedDisabledRef,
      mergedSize: formItemSizeRefs.mergedSize,
      mergedValidationStatus: formItemMiscRefs.mergedValidationStatus,
      restoreValidation,
      handleContentBlur,
      handleContentChange,
      handleContentFocus,
      handleContentInput
    });
    const exposedRef = {
      validate,
      restoreValidation,
      internalValidate
    };
    const labelElementRef = ref(null);
    const cssVarsRef = computed(() => {
      var _a;
      const {
        value: size
      } = mergedSizeRef;
      const {
        value: labelPlacement
      } = labelPlacementRef;
      const direction = labelPlacement === "top" ? "vertical" : "horizontal";
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: {
          labelTextColor,
          asteriskColor,
          lineHeight,
          feedbackTextColor,
          feedbackTextColorWarning,
          feedbackTextColorError,
          feedbackPadding,
          labelFontWeight,
          [createKey("labelHeight", size)]: labelHeight,
          [createKey("blankHeight", size)]: blankHeight,
          [createKey("feedbackFontSize", size)]: feedbackFontSize,
          [createKey("feedbackHeight", size)]: feedbackHeight,
          [createKey("labelPadding", direction)]: labelPadding,
          [createKey("labelTextAlign", direction)]: labelTextAlign,
          [createKey(createKey("labelFontSize", labelPlacement), size)]: labelFontSize
        }
      } = themeRef.value;
      let mergedLabelTextAlign = (_a = labelTextAlignRef.value) !== null && _a !== void 0 ? _a : labelTextAlign;
      if (labelPlacement === "top") {
        mergedLabelTextAlign = mergedLabelTextAlign === "right" ? "flex-end" : "flex-start";
      }
      const cssVars = {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-line-height": lineHeight,
        "--n-blank-height": blankHeight,
        "--n-label-font-size": labelFontSize,
        "--n-label-text-align": mergedLabelTextAlign,
        "--n-label-height": labelHeight,
        "--n-label-padding": labelPadding,
        "--n-label-font-weight": labelFontWeight,
        "--n-asterisk-color": asteriskColor,
        "--n-label-text-color": labelTextColor,
        "--n-feedback-padding": feedbackPadding,
        "--n-feedback-font-size": feedbackFontSize,
        "--n-feedback-height": feedbackHeight,
        "--n-feedback-text-color": feedbackTextColor,
        "--n-feedback-text-color-warning": feedbackTextColorWarning,
        "--n-feedback-text-color-error": feedbackTextColorError
      };
      return cssVars;
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("form-item", computed(() => {
      var _a;
      return `${mergedSizeRef.value[0]}${labelPlacementRef.value[0]}${((_a = labelTextAlignRef.value) === null || _a === void 0 ? void 0 : _a[0]) || ""}`;
    }), cssVarsRef, props) : void 0;
    const reverseColSpaceRef = computed(() => {
      return labelPlacementRef.value === "left" && mergedRequireMarkPlacementRef.value === "left" && labelTextAlignRef.value === "left";
    });
    return Object.assign(Object.assign(Object.assign(Object.assign({
      labelElementRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedRequired: mergedRequiredRef,
      feedbackId: feedbackIdRef,
      renderExplains: renderExplainsRef,
      reverseColSpace: reverseColSpaceRef
    }, formItemMiscRefs), formItemSizeRefs), exposedRef), {
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    const {
      $slots,
      mergedClsPrefix,
      mergedShowLabel,
      mergedShowRequireMark,
      mergedRequireMarkPlacement,
      onRender
    } = this;
    const renderedShowRequireMark = mergedShowRequireMark !== void 0 ? mergedShowRequireMark : this.mergedRequired;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const renderLabel = () => {
      const labelText = this.$slots.label ? this.$slots.label() : this.label;
      if (!labelText)
        return null;
      const textNode = h("span", {
        class: `${mergedClsPrefix}-form-item-label__text`
      }, labelText);
      const markNode = renderedShowRequireMark ? h("span", {
        class: `${mergedClsPrefix}-form-item-label__asterisk`
      }, mergedRequireMarkPlacement !== "left" ? "\xA0*" : "*\xA0") : mergedRequireMarkPlacement === "right-hanging" && h("span", {
        class: `${mergedClsPrefix}-form-item-label__asterisk-placeholder`
      }, "\xA0*");
      const {
        labelProps
      } = this;
      return h("label", Object.assign({}, labelProps, {
        class: [labelProps === null || labelProps === void 0 ? void 0 : labelProps.class, `${mergedClsPrefix}-form-item-label`, `${mergedClsPrefix}-form-item-label--${mergedRequireMarkPlacement}-mark`, this.reverseColSpace && `${mergedClsPrefix}-form-item-label--reverse-columns-space`],
        style: this.mergedLabelStyle,
        ref: "labelElementRef"
      }), mergedRequireMarkPlacement === "left" ? [markNode, textNode] : [textNode, markNode]);
    };
    return h("div", {
      class: [`${mergedClsPrefix}-form-item`, this.themeClass, `${mergedClsPrefix}-form-item--${this.mergedSize}-size`, `${mergedClsPrefix}-form-item--${this.mergedLabelPlacement}-labelled`, this.isAutoLabelWidth && `${mergedClsPrefix}-form-item--auto-label-width`, !mergedShowLabel && `${mergedClsPrefix}-form-item--no-label`],
      style: this.cssVars
    }, mergedShowLabel && renderLabel(), h("div", {
      class: [`${mergedClsPrefix}-form-item-blank`, this.mergedValidationStatus && `${mergedClsPrefix}-form-item-blank--${this.mergedValidationStatus}`]
    }, $slots), this.mergedShowFeedback ? h("div", {
      key: this.feedbackId,
      style: this.feedbackStyle,
      class: [`${mergedClsPrefix}-form-item-feedback-wrapper`, this.feedbackClass]
    }, h(Transition, {
      name: "fade-down-transition",
      mode: "out-in"
    }, {
      default: () => {
        const {
          mergedValidationStatus
        } = this;
        return resolveWrappedSlot($slots.feedback, (children) => {
          var _a;
          const {
            feedback
          } = this;
          const feedbackNodes = children || feedback ? h("div", {
            key: "__feedback__",
            class: `${mergedClsPrefix}-form-item-feedback__line`
          }, children || feedback) : this.renderExplains.length ? (_a = this.renderExplains) === null || _a === void 0 ? void 0 : _a.map(({
            key,
            render: render2
          }) => h("div", {
            key,
            class: `${mergedClsPrefix}-form-item-feedback__line`
          }, render2())) : null;
          return feedbackNodes ? mergedValidationStatus === "warning" ? h("div", {
            key: "controlled-warning",
            class: `${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--warning`
          }, feedbackNodes) : mergedValidationStatus === "error" ? h("div", {
            key: "controlled-error",
            class: `${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--error`
          }, feedbackNodes) : mergedValidationStatus === "success" ? h("div", {
            key: "controlled-success",
            class: `${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--success`
          }, feedbackNodes) : h("div", {
            key: "controlled-default",
            class: `${mergedClsPrefix}-form-item-feedback`
          }, feedbackNodes) : null;
        });
      }
    })) : null);
  }
});
const common = {
  titleFontSize: "18px",
  backSize: "22px"
};
function self$3(vars) {
  const {
    textColor1,
    textColor2,
    textColor3,
    fontSize,
    fontWeightStrong,
    primaryColorHover,
    primaryColorPressed
  } = vars;
  return Object.assign(Object.assign({}, common), {
    titleFontWeight: fontWeightStrong,
    fontSize,
    titleTextColor: textColor1,
    backColor: textColor2,
    backColorHover: primaryColorHover,
    backColorPressed: primaryColorPressed,
    subtitleTextColor: textColor3
  });
}
const pageHeaderLight = createTheme({
  name: "PageHeader",
  common: derived,
  self: self$3
});
function self$2(vars) {
  const {
    borderRadiusSmall,
    dividerColor,
    hoverColor,
    pressedColor,
    primaryColor,
    textColor3,
    textColor2,
    textColorDisabled,
    fontSize
  } = vars;
  return {
    fontSize,
    lineHeight: "1.5",
    nodeHeight: "30px",
    nodeWrapperPadding: "3px 0",
    nodeBorderRadius: borderRadiusSmall,
    nodeColorHover: hoverColor,
    nodeColorPressed: pressedColor,
    nodeColorActive: changeColor(primaryColor, {
      alpha: 0.1
    }),
    arrowColor: textColor3,
    nodeTextColor: textColor2,
    nodeTextColorDisabled: textColorDisabled,
    loadingColor: primaryColor,
    dropMarkColor: primaryColor,
    lineColor: dividerColor
  };
}
const treeLight = createTheme({
  name: "Tree",
  common: derived,
  peers: {
    Checkbox: checkboxLight,
    Scrollbar: scrollbarLight,
    Empty: emptyLight
  },
  self: self$2
});
function self$1(vars) {
  const {
    popoverColor,
    boxShadow2,
    borderRadius,
    heightMedium,
    dividerColor,
    textColor2
  } = vars;
  return {
    menuPadding: "4px",
    menuColor: popoverColor,
    menuBoxShadow: boxShadow2,
    menuBorderRadius: borderRadius,
    menuHeight: `calc(${heightMedium} * 7.6)`,
    actionDividerColor: dividerColor,
    actionTextColor: textColor2,
    actionPadding: "8px 12px"
  };
}
const treeSelectLight = createTheme({
  name: "TreeSelect",
  common: derived,
  peers: {
    Tree: treeLight,
    Empty: emptyLight,
    InternalSelection: internalSelectionLight
  },
  self: self$1
});
const style$3 = c([cB("page-header-header", `
 margin-bottom: 20px;
 `), cB("page-header", `
 display: flex;
 align-items: center;
 justify-content: space-between;
 line-height: 1.5;
 font-size: var(--n-font-size);
 `, [cE("main", `
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 `), cE("back", `
 display: flex;
 margin-right: 16px;
 font-size: var(--n-back-size);
 cursor: pointer;
 color: var(--n-back-color);
 transition: color .3s var(--n-bezier);
 `, [c("&:hover", "color: var(--n-back-color-hover);"), c("&:active", "color: var(--n-back-color-pressed);")]), cE("avatar", `
 display: flex;
 margin-right: 12px
 `), cE("title", `
 margin-right: 16px;
 transition: color .3s var(--n-bezier);
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `), cE("subtitle", `
 font-size: 14px;
 transition: color .3s var(--n-bezier);
 color: var(--n-subtitle-text-color);
 `)]), cB("page-header-content", `
 font-size: var(--n-font-size);
 `, [c("&:not(:first-child)", "margin-top: 20px;")]), cB("page-header-footer", `
 font-size: var(--n-font-size);
 `, [c("&:not(:first-child)", "margin-top: 20px;")])]);
const pageHeaderProps = Object.assign(Object.assign({}, useTheme.props), {
  title: String,
  subtitle: String,
  extra: String,
  onBack: Function
});
const NPageHeader = defineComponent({
  name: "PageHeader",
  props: pageHeaderProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedRtlRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme("PageHeader", "-page-header", style$3, pageHeaderLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl("PageHeader", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        self: {
          titleTextColor,
          subtitleTextColor,
          backColor,
          fontSize,
          titleFontSize,
          backSize,
          titleFontWeight,
          backColorHover,
          backColorPressed
        },
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        }
      } = themeRef.value;
      return {
        "--n-title-text-color": titleTextColor,
        "--n-title-font-size": titleFontSize,
        "--n-title-font-weight": titleFontWeight,
        "--n-font-size": fontSize,
        "--n-back-size": backSize,
        "--n-subtitle-text-color": subtitleTextColor,
        "--n-back-color": backColor,
        "--n-back-color-hover": backColorHover,
        "--n-back-color-pressed": backColorPressed,
        "--n-bezier": cubicBezierEaseInOut2
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("page-header", void 0, cssVarsRef, props) : void 0;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const {
      onBack,
      title,
      subtitle,
      extra,
      mergedClsPrefix,
      cssVars,
      $slots
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    const {
      title: titleSlot,
      subtitle: subtitleSlot,
      extra: extraSlot,
      default: defaultSlot,
      header: headerSlot,
      avatar: avatarSlot,
      footer: footerSlot,
      back: backSlot
    } = $slots;
    const showBack = onBack;
    const showTitle = title || titleSlot;
    const showSubtitle = subtitle || subtitleSlot;
    const showExtra = extra || extraSlot;
    return h("div", {
      style: cssVars,
      class: [`${mergedClsPrefix}-page-header-wrapper`, this.themeClass, this.rtlEnabled && `${mergedClsPrefix}-page-header-wrapper--rtl`]
    }, headerSlot ? h("div", {
      class: `${mergedClsPrefix}-page-header-header`,
      key: "breadcrumb"
    }, headerSlot()) : null, (showBack || avatarSlot || showTitle || showSubtitle || showExtra) && h("div", {
      class: `${mergedClsPrefix}-page-header`,
      key: "header"
    }, h("div", {
      class: `${mergedClsPrefix}-page-header__main`,
      key: "back"
    }, showBack ? h("div", {
      class: `${mergedClsPrefix}-page-header__back`,
      onClick: onBack
    }, backSlot ? backSlot() : h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: () => h(ArrowBackIcon, null)
    })) : null, avatarSlot ? h("div", {
      class: `${mergedClsPrefix}-page-header__avatar`
    }, avatarSlot()) : null, showTitle ? h("div", {
      class: `${mergedClsPrefix}-page-header__title`,
      key: "title"
    }, title || titleSlot()) : null, showSubtitle ? h("div", {
      class: `${mergedClsPrefix}-page-header__subtitle`,
      key: "subtitle"
    }, subtitle || subtitleSlot()) : null), showExtra ? h("div", {
      class: `${mergedClsPrefix}-page-header__extra`
    }, extra || extraSlot()) : null), defaultSlot ? h("div", {
      class: `${mergedClsPrefix}-page-header-content`,
      key: "content"
    }, defaultSlot()) : null, footerSlot ? h("div", {
      class: `${mergedClsPrefix}-page-header-footer`,
      key: "footer"
    }, footerSlot()) : null);
  }
});
function self(vars) {
  const {
    heightSmall,
    heightMedium,
    heightLarge,
    borderRadius
  } = vars;
  return {
    color: "#eee",
    colorEnd: "#ddd",
    borderRadius,
    heightSmall,
    heightMedium,
    heightLarge
  };
}
const skeletonLight = {
  name: "Skeleton",
  common: derived,
  self
};
const style$2 = c([cB("skeleton", `
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `), c("@keyframes skeleton-loading", `
 0% {
 background: var(--n-color-start);
 }
 40% {
 background: var(--n-color-end);
 }
 80% {
 background: var(--n-color-start);
 }
 100% {
 background: var(--n-color-start);
 }
 `)]);
const skeletonProps = Object.assign(Object.assign({}, useTheme.props), {
  text: Boolean,
  round: Boolean,
  circle: Boolean,
  height: [String, Number],
  width: [String, Number],
  size: String,
  repeat: {
    type: Number,
    default: 1
  },
  animated: {
    type: Boolean,
    default: true
  },
  sharp: {
    type: Boolean,
    default: true
  }
});
const NSkeleton = defineComponent({
  name: "Skeleton",
  inheritAttrs: false,
  props: skeletonProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const themeRef = useTheme("Skeleton", "-skeleton", style$2, skeletonLight, props, mergedClsPrefixRef);
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      style: computed(() => {
        var _a, _b;
        const theme = themeRef.value;
        const {
          common: {
            cubicBezierEaseInOut: cubicBezierEaseInOut2
          }
        } = theme;
        const selfThemeVars = theme.self;
        const {
          color,
          colorEnd,
          borderRadius
        } = selfThemeVars;
        let sizeHeight;
        const {
          circle,
          sharp,
          round,
          width,
          height,
          size,
          text,
          animated
        } = props;
        if (size !== void 0) {
          sizeHeight = selfThemeVars[createKey("height", size)];
        }
        const mergedWidth = circle ? (_a = width !== null && width !== void 0 ? width : height) !== null && _a !== void 0 ? _a : sizeHeight : width;
        const mergedHeight = (_b = circle ? width !== null && width !== void 0 ? width : height : height) !== null && _b !== void 0 ? _b : sizeHeight;
        return {
          display: text ? "inline-block" : "",
          verticalAlign: text ? "-0.125em" : "",
          borderRadius: circle ? "50%" : round ? "4096px" : sharp ? "" : borderRadius,
          width: typeof mergedWidth === "number" ? pxfy(mergedWidth) : mergedWidth,
          height: typeof mergedHeight === "number" ? pxfy(mergedHeight) : mergedHeight,
          animation: !animated ? "none" : "",
          "--n-bezier": cubicBezierEaseInOut2,
          "--n-color-start": color,
          "--n-color-end": colorEnd
        };
      })
    };
  },
  render() {
    const {
      repeat: repeatProp,
      style: style2,
      mergedClsPrefix,
      $attrs
    } = this;
    const child = h("div", mergeProps({
      class: `${mergedClsPrefix}-skeleton`,
      style: style2
    }, $attrs));
    if (repeatProp > 1) {
      return h(Fragment, null, repeat(repeatProp, null).map((_) => [child, "\n"]));
    }
    return child;
  }
});
const treeSelectInjectionKey = createInjectionKey("n-tree-select");
const treeInjectionKey = createInjectionKey("n-tree");
const NTreeNodeSwitcher = defineComponent({
  name: "NTreeSwitcher",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    indent: {
      type: Number,
      required: true
    },
    expanded: Boolean,
    selected: Boolean,
    hide: Boolean,
    loading: Boolean,
    onClick: Function,
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const {
      renderSwitcherIconRef
    } = inject(treeInjectionKey, null);
    return () => {
      const {
        clsPrefix,
        expanded,
        hide,
        indent,
        onClick
      } = props;
      return h("span", {
        "data-switcher": true,
        class: [`${clsPrefix}-tree-node-switcher`, expanded && `${clsPrefix}-tree-node-switcher--expanded`, hide && `${clsPrefix}-tree-node-switcher--hide`],
        style: {
          width: `${indent}px`
        },
        onClick
      }, h("div", {
        class: `${clsPrefix}-tree-node-switcher__icon`
      }, h(NIconSwitchTransition, null, {
        default: () => {
          if (props.loading) {
            return h(NBaseLoading, {
              clsPrefix,
              key: "loading",
              radius: 85,
              strokeWidth: 20
            });
          }
          const {
            value: renderSwitcherIcon
          } = renderSwitcherIconRef;
          return renderSwitcherIcon ? renderSwitcherIcon({
            expanded: props.expanded,
            selected: props.selected,
            option: props.tmNode.rawNode
          }) : h(NBaseIcon, {
            clsPrefix,
            key: "switcher"
          }, {
            default: () => h(SwitcherIcon, null)
          });
        }
      })));
    };
  }
});
const NTreeNodeCheckbox = defineComponent({
  name: "NTreeNodeCheckbox",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    indent: {
      type: Number,
      required: true
    },
    right: Boolean,
    focusable: Boolean,
    disabled: Boolean,
    checked: Boolean,
    indeterminate: Boolean,
    onCheck: Function
  },
  setup(props) {
    const NTree2 = inject(treeInjectionKey);
    function doCheck(value) {
      const {
        onCheck
      } = props;
      if (onCheck) {
        onCheck(value);
      }
    }
    function handleUpdateValue(value) {
      doCheck(value);
    }
    return {
      handleUpdateValue,
      mergedTheme: NTree2.mergedThemeRef
    };
  },
  render() {
    const {
      clsPrefix,
      mergedTheme,
      checked,
      indeterminate,
      disabled,
      focusable,
      indent,
      handleUpdateValue
    } = this;
    return h("span", {
      class: [`${clsPrefix}-tree-node-checkbox`, this.right && `${clsPrefix}-tree-node-checkbox--right`],
      style: {
        width: `${indent}px`
      },
      "data-checkbox": true
    }, h(NCheckbox, {
      focusable,
      disabled,
      theme: mergedTheme.peers.Checkbox,
      themeOverrides: mergedTheme.peerOverrides.Checkbox,
      checked,
      indeterminate,
      onUpdateChecked: handleUpdateValue
    }));
  }
});
const NTreeNodeContent = defineComponent({
  name: "TreeNodeContent",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    disabled: Boolean,
    checked: Boolean,
    selected: Boolean,
    onClick: Function,
    onDragstart: Function,
    tmNode: {
      type: Object,
      required: true
    },
    nodeProps: Object
  },
  setup(props) {
    const {
      renderLabelRef,
      renderPrefixRef,
      renderSuffixRef,
      labelFieldRef
    } = inject(treeInjectionKey);
    const selfRef = ref(null);
    function doClick(e) {
      const {
        onClick
      } = props;
      if (onClick)
        onClick(e);
    }
    function handleClick(e) {
      doClick(e);
    }
    return {
      selfRef,
      renderLabel: renderLabelRef,
      renderPrefix: renderPrefixRef,
      renderSuffix: renderSuffixRef,
      labelField: labelFieldRef,
      handleClick
    };
  },
  render() {
    const {
      clsPrefix,
      labelField,
      nodeProps,
      checked = false,
      selected = false,
      renderLabel,
      renderPrefix,
      renderSuffix,
      handleClick,
      onDragstart,
      tmNode: {
        rawNode,
        rawNode: {
          prefix,
          suffix,
          [labelField]: label
        }
      }
    } = this;
    return h("span", Object.assign({}, nodeProps, {
      ref: "selfRef",
      class: [`${clsPrefix}-tree-node-content`, nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps.class],
      onClick: handleClick,
      draggable: onDragstart === void 0 ? void 0 : true,
      onDragstart
    }), renderPrefix || prefix ? h("div", {
      class: `${clsPrefix}-tree-node-content__prefix`
    }, renderPrefix ? renderPrefix({
      option: rawNode,
      selected,
      checked
    }) : render(prefix)) : null, h("div", {
      class: `${clsPrefix}-tree-node-content__text`
    }, renderLabel ? renderLabel({
      option: rawNode,
      selected,
      checked
    }) : render(label)), renderSuffix || suffix ? h("div", {
      class: `${clsPrefix}-tree-node-content__suffix`
    }, renderSuffix ? renderSuffix({
      option: rawNode,
      selected,
      checked
    }) : render(suffix)) : null);
  }
});
function renderDropMark({
  position,
  offsetLevel,
  indent,
  el
}) {
  const style2 = {
    position: "absolute",
    boxSizing: "border-box",
    right: 0
  };
  if (position === "inside") {
    style2.left = 0;
    style2.top = 0;
    style2.bottom = 0;
    style2.borderRadius = "inherit";
    style2.boxShadow = "inset 0 0 0 2px var(--n-drop-mark-color)";
  } else {
    const cssPosition = position === "before" ? "top" : "bottom";
    style2[cssPosition] = 0;
    style2.left = `${el.offsetLeft + 6 - offsetLevel * indent}px`;
    style2.height = "2px";
    style2.backgroundColor = "var(--n-drop-mark-color)";
    style2.transformOrigin = cssPosition;
    style2.borderRadius = "1px";
    style2.transform = position === "before" ? "translateY(-4px)" : "translateY(4px)";
  }
  return h("div", {
    style: style2
  });
}
function defaultAllowDrop({
  dropPosition,
  node
}) {
  if (node.isLeaf === false)
    return true;
  if (node.children) {
    return true;
  }
  return dropPosition !== "inside";
}
function useMergedCheckStrategy(props) {
  return computed(() => props.leafOnly ? "child" : props.checkStrategy);
}
function isNodeDisabled(node, disabledField) {
  return !!node.rawNode[disabledField];
}
function traverse(nodes, childrenField, callback, callbackAfter) {
  nodes === null || nodes === void 0 ? void 0 : nodes.forEach((node) => {
    callback(node);
    traverse(node[childrenField], childrenField, callback, callbackAfter);
    callbackAfter(node);
  });
}
function keysWithFilter(nodes, pattern, keyField, childrenField, filter) {
  const keys = /* @__PURE__ */ new Set();
  const highlightKeySet = /* @__PURE__ */ new Set();
  const path = [];
  traverse(nodes, childrenField, (node) => {
    path.push(node);
    if (filter(pattern, node)) {
      highlightKeySet.add(node[keyField]);
      for (let i = path.length - 2; i >= 0; --i) {
        if (!keys.has(path[i][keyField])) {
          keys.add(path[i][keyField]);
        } else {
          return;
        }
      }
    }
  }, () => {
    path.pop();
  });
  return {
    expandedKeys: Array.from(keys),
    highlightKeySet
  };
}
function filterTree(tree, filter, pattern, keyField, childrenField) {
  const visitedTailKeys = /* @__PURE__ */ new Set();
  const visitedNonTailKeys = /* @__PURE__ */ new Set();
  const highlightKeySet = /* @__PURE__ */ new Set();
  const expandedKeys = [];
  const filteredTree = [];
  const path = [];
  function visit(t) {
    t.forEach((n) => {
      path.push(n);
      if (filter(pattern, n)) {
        visitedTailKeys.add(n[keyField]);
        highlightKeySet.add(n[keyField]);
        for (let i = path.length - 2; i >= 0; --i) {
          const key = path[i][keyField];
          if (!visitedNonTailKeys.has(key)) {
            visitedNonTailKeys.add(key);
            if (visitedTailKeys.has(key)) {
              visitedTailKeys.delete(key);
            }
          } else {
            break;
          }
        }
      }
      const children = n[childrenField];
      if (children) {
        visit(children);
      }
      path.pop();
    });
  }
  visit(tree);
  function build(t, sibs) {
    t.forEach((n) => {
      const key = n[keyField];
      const isVisitedTail = visitedTailKeys.has(key);
      const isVisitedNonTail = visitedNonTailKeys.has(key);
      if (!isVisitedTail && !isVisitedNonTail)
        return;
      const children = n[childrenField];
      if (children) {
        if (isVisitedTail) {
          sibs.push(n);
        } else {
          expandedKeys.push(key);
          const clonedNode = Object.assign(Object.assign({}, n), {
            [childrenField]: []
          });
          sibs.push(clonedNode);
          build(children, clonedNode[childrenField]);
        }
      } else {
        sibs.push(n);
      }
    });
  }
  build(tree, filteredTree);
  return {
    filteredTree,
    highlightKeySet,
    expandedKeys
  };
}
const TreeNode = defineComponent({
  name: "TreeNode",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const NTree2 = inject(treeInjectionKey);
    const {
      droppingNodeParentRef,
      droppingMouseNodeRef,
      draggingNodeRef,
      droppingPositionRef,
      droppingOffsetLevelRef,
      nodePropsRef,
      indentRef,
      blockLineRef,
      checkboxPlacementRef,
      checkOnClickRef,
      disabledFieldRef,
      showLineRef,
      renderSwitcherIconRef,
      overrideDefaultNodeClickBehaviorRef
    } = NTree2;
    const checkboxDisabledRef = useMemo(() => !!props.tmNode.rawNode.checkboxDisabled);
    const nodeIsDisabledRef = useMemo(() => {
      return isNodeDisabled(props.tmNode, disabledFieldRef.value);
    });
    const disabledRef = useMemo(() => NTree2.disabledRef.value || nodeIsDisabledRef.value);
    const resolvedNodePropsRef = computed(() => {
      const {
        value: nodeProps
      } = nodePropsRef;
      if (!nodeProps)
        return void 0;
      return nodeProps({
        option: props.tmNode.rawNode
      });
    });
    const contentInstRef = ref(null);
    const contentElRef = {
      value: null
    };
    function handleSwitcherClick() {
      const callback = () => {
        const {
          tmNode
        } = props;
        if (!tmNode.isLeaf && !tmNode.shallowLoaded) {
          if (!NTree2.loadingKeysRef.value.has(tmNode.key)) {
            NTree2.loadingKeysRef.value.add(tmNode.key);
          } else {
            return;
          }
          const {
            onLoadRef: {
              value: onLoad
            }
          } = NTree2;
          if (onLoad) {
            void onLoad(tmNode.rawNode).then((value) => {
              if (value !== false) {
                NTree2.handleSwitcherClick(tmNode);
              }
            }).finally(() => {
              NTree2.loadingKeysRef.value.delete(tmNode.key);
            });
          }
        } else {
          NTree2.handleSwitcherClick(tmNode);
        }
      };
      if (renderSwitcherIconRef.value) {
        setTimeout(callback, 0);
      } else {
        callback();
      }
    }
    const selectableRef = useMemo(() => !nodeIsDisabledRef.value && NTree2.selectableRef.value && (NTree2.internalTreeSelect ? NTree2.mergedCheckStrategyRef.value !== "child" || NTree2.multipleRef.value && NTree2.cascadeRef.value || props.tmNode.isLeaf : true));
    const checkableRef = useMemo(() => NTree2.checkableRef.value && (NTree2.cascadeRef.value || NTree2.mergedCheckStrategyRef.value !== "child" || props.tmNode.isLeaf));
    const checkedRef = useMemo(() => NTree2.displayedCheckedKeysRef.value.includes(props.tmNode.key));
    const mergedCheckOnClickRef = useMemo(() => {
      const {
        value: checkable
      } = checkableRef;
      if (!checkable)
        return false;
      const {
        value: checkOnClick
      } = checkOnClickRef;
      const {
        tmNode
      } = props;
      if (typeof checkOnClick === "boolean") {
        return !tmNode.disabled && checkOnClick;
      }
      return checkOnClick(props.tmNode.rawNode);
    });
    function _handleClick(e) {
      const {
        value: expandOnClick
      } = NTree2.expandOnClickRef;
      const {
        value: selectable
      } = selectableRef;
      const {
        value: mergedCheckOnClick
      } = mergedCheckOnClickRef;
      if (!selectable && !expandOnClick && !mergedCheckOnClick)
        return;
      if (happensIn(e, "checkbox") || happensIn(e, "switcher"))
        return;
      const {
        tmNode
      } = props;
      if (selectable) {
        NTree2.handleSelect(tmNode);
      }
      if (expandOnClick && !tmNode.isLeaf) {
        handleSwitcherClick();
      }
      if (mergedCheckOnClick) {
        handleCheck(!checkedRef.value);
      }
    }
    function handleNodeClick(e) {
      var _a, _b;
      if (happensIn(e, "checkbox") || happensIn(e, "switcher"))
        return;
      if (!disabledRef.value) {
        const overrideDefaultNodeClickBehavior = overrideDefaultNodeClickBehaviorRef.value;
        let shouldOverride = false;
        if (overrideDefaultNodeClickBehavior) {
          switch (overrideDefaultNodeClickBehavior({
            option: props.tmNode.rawNode
          })) {
            case "toggleCheck":
              shouldOverride = true;
              handleCheck(!checkedRef.value);
              break;
            case "toggleSelect":
              shouldOverride = true;
              NTree2.handleSelect(props.tmNode);
              break;
            case "toggleExpand":
              shouldOverride = true;
              handleSwitcherClick();
              shouldOverride = true;
              break;
            case "none":
              shouldOverride = true;
              shouldOverride = true;
              return;
          }
        }
        if (!shouldOverride) {
          _handleClick(e);
        }
      }
      (_b = (_a = resolvedNodePropsRef.value) === null || _a === void 0 ? void 0 : _a.onClick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
    }
    function handleContentClick(e) {
      if (blockLineRef.value)
        return;
      handleNodeClick(e);
    }
    function handleLineClick(e) {
      if (!blockLineRef.value)
        return;
      handleNodeClick(e);
    }
    function handleCheck(checked) {
      NTree2.handleCheck(props.tmNode, checked);
    }
    function handleDragStart(e) {
      NTree2.handleDragStart({
        event: e,
        node: props.tmNode
      });
    }
    function handleDragEnter(e) {
      if (e.currentTarget !== e.target) {
        return;
      }
      NTree2.handleDragEnter({
        event: e,
        node: props.tmNode
      });
    }
    function handleDragOver(e) {
      e.preventDefault();
      NTree2.handleDragOver({
        event: e,
        node: props.tmNode
      });
    }
    function handleDragEnd(e) {
      NTree2.handleDragEnd({
        event: e,
        node: props.tmNode
      });
    }
    function handleDragLeave(e) {
      if (e.currentTarget !== e.target) {
        return;
      }
      NTree2.handleDragLeave({
        event: e,
        node: props.tmNode
      });
    }
    function handleDrop(e) {
      e.preventDefault();
      if (droppingPositionRef.value !== null) {
        NTree2.handleDrop({
          event: e,
          node: props.tmNode,
          dropPosition: droppingPositionRef.value
        });
      }
    }
    const indentNodes = computed(() => {
      const {
        clsPrefix
      } = props;
      const {
        value: indent
      } = indentRef;
      if (showLineRef.value) {
        const indentNodes2 = [];
        let cursor = props.tmNode.parent;
        while (cursor) {
          if (cursor.isLastChild) {
            indentNodes2.push(h("div", {
              class: `${clsPrefix}-tree-node-indent`
            }, h("div", {
              style: {
                width: `${indent}px`
              }
            })));
          } else {
            indentNodes2.push(h("div", {
              class: [`${clsPrefix}-tree-node-indent`, `${clsPrefix}-tree-node-indent--show-line`]
            }, h("div", {
              style: {
                width: `${indent}px`
              }
            })));
          }
          cursor = cursor.parent;
        }
        return indentNodes2.reverse();
      } else {
        return repeat(props.tmNode.level, h("div", {
          class: `${props.clsPrefix}-tree-node-indent`
        }, h("div", {
          style: {
            width: `${indent}px`
          }
        })));
      }
    });
    return {
      showDropMark: useMemo(() => {
        const {
          value: draggingNode
        } = draggingNodeRef;
        if (!draggingNode)
          return;
        const {
          value: droppingPosition
        } = droppingPositionRef;
        if (!droppingPosition)
          return;
        const {
          value: droppingMouseNode
        } = droppingMouseNodeRef;
        if (!droppingMouseNode) {
          return;
        }
        const {
          tmNode
        } = props;
        if (tmNode.key === droppingMouseNode.key)
          return true;
        return false;
      }),
      showDropMarkAsParent: useMemo(() => {
        const {
          value: droppingNodeParent
        } = droppingNodeParentRef;
        if (!droppingNodeParent)
          return false;
        const {
          tmNode
        } = props;
        const {
          value: droppingPosition
        } = droppingPositionRef;
        if (droppingPosition === "before" || droppingPosition === "after") {
          return droppingNodeParent.key === tmNode.key;
        }
        return false;
      }),
      pending: useMemo(() => NTree2.pendingNodeKeyRef.value === props.tmNode.key),
      loading: useMemo(() => NTree2.loadingKeysRef.value.has(props.tmNode.key)),
      highlight: useMemo(() => {
        var _a;
        return (_a = NTree2.highlightKeySetRef.value) === null || _a === void 0 ? void 0 : _a.has(props.tmNode.key);
      }),
      checked: checkedRef,
      indeterminate: useMemo(() => NTree2.displayedIndeterminateKeysRef.value.includes(props.tmNode.key)),
      selected: useMemo(() => NTree2.mergedSelectedKeysRef.value.includes(props.tmNode.key)),
      expanded: useMemo(() => NTree2.mergedExpandedKeysRef.value.includes(props.tmNode.key)),
      disabled: disabledRef,
      checkable: checkableRef,
      mergedCheckOnClick: mergedCheckOnClickRef,
      checkboxDisabled: checkboxDisabledRef,
      selectable: selectableRef,
      expandOnClick: NTree2.expandOnClickRef,
      internalScrollable: NTree2.internalScrollableRef,
      draggable: NTree2.draggableRef,
      blockLine: blockLineRef,
      nodeProps: resolvedNodePropsRef,
      checkboxFocusable: NTree2.internalCheckboxFocusableRef,
      droppingPosition: droppingPositionRef,
      droppingOffsetLevel: droppingOffsetLevelRef,
      indent: indentRef,
      checkboxPlacement: checkboxPlacementRef,
      showLine: showLineRef,
      contentInstRef,
      contentElRef,
      indentNodes,
      handleCheck,
      handleDrop,
      handleDragStart,
      handleDragEnter,
      handleDragOver,
      handleDragEnd,
      handleDragLeave,
      handleLineClick,
      handleContentClick,
      handleSwitcherClick
    };
  },
  render() {
    const {
      tmNode,
      clsPrefix,
      checkable,
      expandOnClick,
      selectable,
      selected,
      checked,
      highlight,
      draggable,
      blockLine,
      indent,
      indentNodes,
      disabled,
      pending,
      internalScrollable,
      nodeProps,
      checkboxPlacement
    } = this;
    const dragEventHandlers = draggable && !disabled ? {
      onDragenter: this.handleDragEnter,
      onDragleave: this.handleDragLeave,
      onDragend: this.handleDragEnd,
      onDrop: this.handleDrop,
      onDragover: this.handleDragOver
    } : void 0;
    const dataKey = internalScrollable ? createDataKey(tmNode.key) : void 0;
    const checkboxOnRight = checkboxPlacement === "right";
    const checkboxNode = checkable ? h(NTreeNodeCheckbox, {
      indent,
      right: checkboxOnRight,
      focusable: this.checkboxFocusable,
      disabled: disabled || this.checkboxDisabled,
      clsPrefix,
      checked: this.checked,
      indeterminate: this.indeterminate,
      onCheck: this.handleCheck
    }) : null;
    return h("div", Object.assign({
      class: `${clsPrefix}-tree-node-wrapper`
    }, dragEventHandlers), h("div", Object.assign({}, blockLine ? nodeProps : void 0, {
      class: [`${clsPrefix}-tree-node`, {
        [`${clsPrefix}-tree-node--selected`]: selected,
        [`${clsPrefix}-tree-node--checkable`]: checkable,
        [`${clsPrefix}-tree-node--highlight`]: highlight,
        [`${clsPrefix}-tree-node--pending`]: pending,
        [`${clsPrefix}-tree-node--disabled`]: disabled,
        [`${clsPrefix}-tree-node--selectable`]: selectable,
        [`${clsPrefix}-tree-node--clickable`]: selectable || expandOnClick || this.mergedCheckOnClick
      }, nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps.class],
      "data-key": dataKey,
      draggable: draggable && blockLine,
      onClick: this.handleLineClick,
      onDragstart: draggable && blockLine && !disabled ? this.handleDragStart : void 0
    }), indentNodes, tmNode.isLeaf && this.showLine ? h("div", {
      class: [`${clsPrefix}-tree-node-indent`, `${clsPrefix}-tree-node-indent--show-line`, tmNode.isLeaf && `${clsPrefix}-tree-node-indent--is-leaf`, tmNode.isLastChild && `${clsPrefix}-tree-node-indent--last-child`]
    }, h("div", {
      style: {
        width: `${indent}px`
      }
    })) : h(NTreeNodeSwitcher, {
      clsPrefix,
      expanded: this.expanded,
      selected,
      loading: this.loading,
      hide: tmNode.isLeaf,
      tmNode: this.tmNode,
      indent,
      onClick: this.handleSwitcherClick
    }), !checkboxOnRight ? checkboxNode : null, h(NTreeNodeContent, {
      ref: "contentInstRef",
      clsPrefix,
      checked,
      selected,
      onClick: this.handleContentClick,
      nodeProps: blockLine ? void 0 : nodeProps,
      onDragstart: draggable && !blockLine && !disabled ? this.handleDragStart : void 0,
      tmNode
    }), draggable ? this.showDropMark ? renderDropMark({
      el: this.contentElRef.value,
      position: this.droppingPosition,
      offsetLevel: this.droppingOffsetLevel,
      indent
    }) : this.showDropMarkAsParent ? renderDropMark({
      el: this.contentElRef.value,
      position: "inside",
      offsetLevel: this.droppingOffsetLevel,
      indent
    }) : null : null, checkboxOnRight ? checkboxNode : null));
  }
});
function useKeyboard({
  props,
  fNodesRef,
  mergedExpandedKeysRef,
  mergedSelectedKeysRef,
  mergedCheckedKeysRef,
  handleCheck,
  handleSelect,
  handleSwitcherClick
}) {
  const {
    value: mergedSelectedKeys
  } = mergedSelectedKeysRef;
  const treeSelectInjection = inject(treeSelectInjectionKey, null);
  const pendingNodeKeyRef = treeSelectInjection ? treeSelectInjection.pendingNodeKeyRef : ref(mergedSelectedKeys.length ? mergedSelectedKeys[mergedSelectedKeys.length - 1] : null);
  function handleKeydown(e) {
    var _a;
    if (!props.keyboard)
      return {
        enterBehavior: null
      };
    const {
      value: pendingNodeKey
    } = pendingNodeKeyRef;
    let enterBehavior = null;
    if (pendingNodeKey === null) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
      }
      if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        if (pendingNodeKey === null) {
          const {
            value: fNodes
          } = fNodesRef;
          let fIndex = 0;
          while (fIndex < fNodes.length) {
            if (!fNodes[fIndex].disabled) {
              pendingNodeKeyRef.value = fNodes[fIndex].key;
              break;
            }
            fIndex += 1;
          }
        }
      }
    } else {
      const {
        value: fNodes
      } = fNodesRef;
      let fIndex = fNodes.findIndex((tmNode) => tmNode.key === pendingNodeKey);
      if (!~fIndex)
        return {
          enterBehavior: null
        };
      if (e.key === "Enter") {
        const tmNode = fNodes[fIndex];
        enterBehavior = ((_a = props.overrideDefaultNodeClickBehavior) === null || _a === void 0 ? void 0 : _a.call(props, {
          option: tmNode.rawNode
        })) || null;
        switch (enterBehavior) {
          case "toggleCheck":
            handleCheck(tmNode, !mergedCheckedKeysRef.value.includes(tmNode.key));
            break;
          case "toggleSelect":
            handleSelect(tmNode);
            break;
          case "toggleExpand":
            handleSwitcherClick(tmNode);
            break;
          case "none":
            break;
          case "default":
          default:
            enterBehavior = "default";
            handleSelect(tmNode);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        fIndex += 1;
        while (fIndex < fNodes.length) {
          if (!fNodes[fIndex].disabled) {
            pendingNodeKeyRef.value = fNodes[fIndex].key;
            break;
          }
          fIndex += 1;
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        fIndex -= 1;
        while (fIndex >= 0) {
          if (!fNodes[fIndex].disabled) {
            pendingNodeKeyRef.value = fNodes[fIndex].key;
            break;
          }
          fIndex -= 1;
        }
      } else if (e.key === "ArrowLeft") {
        const pendingNode = fNodes[fIndex];
        if (pendingNode.isLeaf || !mergedExpandedKeysRef.value.includes(pendingNodeKey)) {
          const parentTmNode = pendingNode.getParent();
          if (parentTmNode) {
            pendingNodeKeyRef.value = parentTmNode.key;
          }
        } else {
          handleSwitcherClick(pendingNode);
        }
      } else if (e.key === "ArrowRight") {
        const pendingNode = fNodes[fIndex];
        if (pendingNode.isLeaf)
          return {
            enterBehavior: null
          };
        if (!mergedExpandedKeysRef.value.includes(pendingNodeKey)) {
          handleSwitcherClick(pendingNode);
        } else {
          fIndex += 1;
          while (fIndex < fNodes.length) {
            if (!fNodes[fIndex].disabled) {
              pendingNodeKeyRef.value = fNodes[fIndex].key;
              break;
            }
            fIndex += 1;
          }
        }
      }
    }
    return {
      enterBehavior
    };
  }
  return {
    pendingNodeKeyRef,
    handleKeydown
  };
}
const MotionWrapper = defineComponent({
  name: "TreeMotionWrapper",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    height: Number,
    nodes: {
      type: Array,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    onAfterEnter: {
      type: Function,
      required: true
    }
  },
  render() {
    const {
      clsPrefix
    } = this;
    return h(NFadeInExpandTransition, {
      onAfterEnter: this.onAfterEnter,
      appear: true,
      reverse: this.mode === "collapse"
    }, {
      default: () => h("div", {
        class: [`${clsPrefix}-tree-motion-wrapper`, `${clsPrefix}-tree-motion-wrapper--${this.mode}`],
        style: {
          height: pxfy(this.height)
        }
      }, this.nodes.map((node) => h(TreeNode, {
        clsPrefix,
        tmNode: node
      })))
    });
  }
});
const iconSwitchTransitionNode = iconSwitchTransition();
const style$1 = cB("tree", `
 font-size: var(--n-font-size);
 outline: none;
`, [c("ul, li", `
 margin: 0;
 padding: 0;
 list-style: none;
 `), c(">", [cB("tree-node", [c("&:first-child", "margin-top: 0;")])]), cB("tree-motion-wrapper", [cM("expand", [fadeInHeightExpandTransition({
  duration: "0.2s"
})]), cM("collapse", [fadeInHeightExpandTransition({
  duration: "0.2s",
  reverse: true
})])]), cB("tree-node-wrapper", `
 box-sizing: border-box;
 padding: var(--n-node-wrapper-padding);
 `), cB("tree-node", `
 transform: translate3d(0,0,0);
 position: relative;
 display: flex;
 border-radius: var(--n-node-border-radius);
 transition: background-color .3s var(--n-bezier);
 `, [cM("highlight", [cB("tree-node-content", [cE("text", "border-bottom-color: var(--n-node-text-color-disabled);")])]), cM("disabled", [cB("tree-node-content", `
 color: var(--n-node-text-color-disabled);
 cursor: not-allowed;
 `)]), cNotM("disabled", [cM("clickable", [cB("tree-node-content", `
 cursor: pointer;
 `)])])]), cM("block-node", [cB("tree-node-content", `
 flex: 1;
 min-width: 0;
 `)]), cNotM("block-line", [cB("tree-node", [cNotM("disabled", [cB("tree-node-content", [c("&:hover", "background: var(--n-node-color-hover);")]), cM("selectable", [cB("tree-node-content", [c("&:active", "background: var(--n-node-color-pressed);")])]), cM("pending", [cB("tree-node-content", `
 background: var(--n-node-color-hover);
 `)]), cM("selected", [cB("tree-node-content", "background: var(--n-node-color-active);")])]), cM("selected", [cB("tree-node-content", "background: var(--n-node-color-active);")])])]), cM("block-line", [cB("tree-node", [cNotM("disabled", [c("&:hover", "background: var(--n-node-color-hover);"), cM("pending", `
 background: var(--n-node-color-hover);
 `), cM("selectable", [cNotM("selected", [c("&:active", "background: var(--n-node-color-pressed);")])]), cM("selected", "background: var(--n-node-color-active);")]), cM("selected", "background: var(--n-node-color-active);"), cM("disabled", `
 cursor: not-allowed;
 `)])]), cB("tree-node-indent", `
 flex-grow: 0;
 flex-shrink: 0;
 `, [cM("show-line", "position: relative", [c("&::before", `
 position: absolute;
 left: 50%;
 border-left: 1px solid var(--n-line-color);
 transition: border-color .3s var(--n-bezier);
 transform: translate(-50%);
 content: "";
 top: var(--n-line-offset-top);
 bottom: var(--n-line-offset-bottom);
 `), cM("last-child", [c("&::before", `
 bottom: 50%;
 `)]), cM("is-leaf", [c("&::after", `
 position: absolute;
 content: "";
 left: calc(50% + 0.5px);
 right: 0;
 bottom: 50%;
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-line-color);
 `)])]), cNotM("show-line", "height: 0;")]), cB("tree-node-switcher", `
 cursor: pointer;
 display: inline-flex;
 flex-shrink: 0;
 height: var(--n-node-content-height);
 align-items: center;
 justify-content: center;
 transition: transform .15s var(--n-bezier);
 vertical-align: bottom;
 `, [cE("icon", `
 position: relative;
 height: 14px;
 width: 14px;
 display: flex;
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 font-size: 14px;
 `, [cB("icon", [iconSwitchTransitionNode]), cB("base-loading", `
 color: var(--n-loading-color);
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 `, [iconSwitchTransitionNode]), cB("base-icon", [iconSwitchTransitionNode])]), cM("hide", "visibility: hidden;"), cM("expanded", "transform: rotate(90deg);")]), cB("tree-node-checkbox", `
 display: inline-flex;
 height: var(--n-node-content-height);
 vertical-align: bottom;
 align-items: center;
 justify-content: center;
 `), cB("tree-node-content", `
 user-select: none;
 position: relative;
 display: inline-flex;
 align-items: center;
 min-height: var(--n-node-content-height);
 box-sizing: border-box;
 line-height: var(--n-line-height);
 vertical-align: bottom;
 padding: 0 6px 0 4px;
 cursor: default;
 border-radius: var(--n-node-border-radius);
 color: var(--n-node-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [c("&:last-child", "margin-bottom: 0;"), cE("prefix", `
 display: inline-flex;
 margin-right: 8px;
 `), cE("text", `
 border-bottom: 1px solid #0000;
 transition: border-color .3s var(--n-bezier);
 flex-grow: 1;
 max-width: 100%;
 `), cE("suffix", `
 display: inline-flex;
 `)]), cE("empty", "margin: auto;")]);
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, [])).next());
  });
};
function createTreeMateOptions(keyField, childrenField, disabledField, getChildren) {
  const settledGetChildren = getChildren || ((node) => {
    return node[childrenField];
  });
  return {
    getIsGroup() {
      return false;
    },
    getKey(node) {
      return node[keyField];
    },
    getChildren: settledGetChildren,
    getDisabled(node) {
      return !!(node[disabledField] || node.checkboxDisabled);
    }
  };
}
const treeSharedProps = {
  allowCheckingNotLoaded: Boolean,
  filter: Function,
  defaultExpandAll: Boolean,
  expandedKeys: Array,
  keyField: {
    type: String,
    default: "key"
  },
  labelField: {
    type: String,
    default: "label"
  },
  childrenField: {
    type: String,
    default: "children"
  },
  disabledField: {
    type: String,
    default: "disabled"
  },
  defaultExpandedKeys: {
    type: Array,
    default: () => []
  },
  indeterminateKeys: Array,
  renderSwitcherIcon: Function,
  onUpdateIndeterminateKeys: [Function, Array],
  "onUpdate:indeterminateKeys": [Function, Array],
  onUpdateExpandedKeys: [Function, Array],
  "onUpdate:expandedKeys": [Function, Array],
  overrideDefaultNodeClickBehavior: Function
};
const treeProps = Object.assign(Object.assign(Object.assign(Object.assign({}, useTheme.props), {
  accordion: Boolean,
  showIrrelevantNodes: {
    type: Boolean,
    default: true
  },
  data: {
    type: Array,
    default: () => []
  },
  expandOnDragenter: {
    type: Boolean,
    default: true
  },
  expandOnClick: Boolean,
  checkOnClick: {
    type: [Boolean, Function],
    default: false
  },
  cancelable: {
    type: Boolean,
    default: true
  },
  checkable: Boolean,
  draggable: Boolean,
  blockNode: Boolean,
  blockLine: Boolean,
  showLine: Boolean,
  disabled: Boolean,
  checkedKeys: Array,
  defaultCheckedKeys: {
    type: Array,
    default: () => []
  },
  selectedKeys: Array,
  defaultSelectedKeys: {
    type: Array,
    default: () => []
  },
  multiple: Boolean,
  pattern: {
    type: String,
    default: ""
  },
  onLoad: Function,
  cascade: Boolean,
  selectable: {
    type: Boolean,
    default: true
  },
  scrollbarProps: Object,
  indent: {
    type: Number,
    default: 24
  },
  allowDrop: {
    type: Function,
    default: defaultAllowDrop
  },
  animated: {
    type: Boolean,
    default: true
  },
  checkboxPlacement: {
    type: String,
    default: "left"
  },
  virtualScroll: Boolean,
  watchProps: Array,
  renderLabel: Function,
  renderPrefix: Function,
  renderSuffix: Function,
  nodeProps: Function,
  keyboard: {
    type: Boolean,
    default: true
  },
  getChildren: Function,
  onDragenter: [Function, Array],
  onDragleave: [Function, Array],
  onDragend: [Function, Array],
  onDragstart: [Function, Array],
  onDragover: [Function, Array],
  onDrop: [Function, Array],
  onUpdateCheckedKeys: [Function, Array],
  "onUpdate:checkedKeys": [Function, Array],
  onUpdateSelectedKeys: [Function, Array],
  "onUpdate:selectedKeys": [Function, Array]
}), treeSharedProps), {
  // internal props for tree-select
  internalTreeSelect: Boolean,
  internalScrollable: Boolean,
  internalScrollablePadding: String,
  // use it to display
  internalRenderEmpty: Function,
  internalHighlightKeySet: Object,
  internalUnifySelectCheck: Boolean,
  internalCheckboxFocusable: {
    type: Boolean,
    default: true
  },
  internalFocusable: {
    // Make tree-select take over keyboard operations
    type: Boolean,
    default: true
  },
  checkStrategy: {
    type: String,
    default: "all"
  },
  /**
   * @deprecated
   */
  leafOnly: Boolean
});
const NTree = defineComponent({
  name: "Tree",
  props: treeProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const rtlEnabledRef = useRtl("Tree", mergedRtlRef, mergedClsPrefixRef);
    const themeRef = useTheme("Tree", "-tree", style$1, treeLight, props, mergedClsPrefixRef);
    const selfElRef = ref(null);
    const scrollbarInstRef = ref(null);
    const virtualListInstRef = ref(null);
    function getScrollContainer() {
      var _a;
      return (_a = virtualListInstRef.value) === null || _a === void 0 ? void 0 : _a.listElRef;
    }
    function getScrollContent() {
      var _a;
      return (_a = virtualListInstRef.value) === null || _a === void 0 ? void 0 : _a.itemsElRef;
    }
    const mergedFilterRef = computed(() => {
      const {
        filter
      } = props;
      if (filter)
        return filter;
      const {
        labelField
      } = props;
      return (pattern, node) => {
        if (!pattern.length)
          return true;
        const label = node[labelField];
        if (typeof label === "string") {
          return label.toLowerCase().includes(pattern.toLowerCase());
        }
        return false;
      };
    });
    const filteredTreeInfoRef = computed(() => {
      const {
        pattern
      } = props;
      if (!pattern) {
        return {
          filteredTree: props.data,
          highlightKeySet: null,
          expandedKeys: void 0
        };
      }
      if (!pattern.length || !mergedFilterRef.value) {
        return {
          filteredTree: props.data,
          highlightKeySet: null,
          expandedKeys: void 0
        };
      }
      return filterTree(props.data, mergedFilterRef.value, pattern, props.keyField, props.childrenField);
    });
    const displayTreeMateRef = computed(() => createTreeMate(props.showIrrelevantNodes ? props.data : filteredTreeInfoRef.value.filteredTree, createTreeMateOptions(props.keyField, props.childrenField, props.disabledField, props.getChildren)));
    const treeSelectInjection = inject(treeSelectInjectionKey, null);
    const dataTreeMateRef = props.internalTreeSelect ? treeSelectInjection.dataTreeMate : computed(() => props.showIrrelevantNodes ? displayTreeMateRef.value : createTreeMate(props.data, createTreeMateOptions(props.keyField, props.childrenField, props.disabledField, props.getChildren)));
    const {
      watchProps
    } = props;
    const uncontrolledCheckedKeysRef = ref([]);
    if (watchProps === null || watchProps === void 0 ? void 0 : watchProps.includes("defaultCheckedKeys")) {
      watchEffect(() => {
        uncontrolledCheckedKeysRef.value = props.defaultCheckedKeys;
      });
    } else {
      uncontrolledCheckedKeysRef.value = props.defaultCheckedKeys;
    }
    const controlledCheckedKeysRef = toRef(props, "checkedKeys");
    const mergedCheckedKeysRef = useMergedState(controlledCheckedKeysRef, uncontrolledCheckedKeysRef);
    const checkedStatusRef = computed(() => {
      const value = dataTreeMateRef.value.getCheckedKeys(mergedCheckedKeysRef.value, {
        cascade: props.cascade,
        allowNotLoaded: props.allowCheckingNotLoaded
      });
      return value;
    });
    const mergedCheckStrategyRef = useMergedCheckStrategy(props);
    const displayedCheckedKeysRef = computed(() => {
      return checkedStatusRef.value.checkedKeys;
    });
    const displayedIndeterminateKeysRef = computed(() => {
      const {
        indeterminateKeys
      } = props;
      if (indeterminateKeys !== void 0)
        return indeterminateKeys;
      return checkedStatusRef.value.indeterminateKeys;
    });
    const uncontrolledSelectedKeysRef = ref([]);
    if (watchProps === null || watchProps === void 0 ? void 0 : watchProps.includes("defaultSelectedKeys")) {
      watchEffect(() => {
        uncontrolledSelectedKeysRef.value = props.defaultSelectedKeys;
      });
    } else {
      uncontrolledSelectedKeysRef.value = props.defaultSelectedKeys;
    }
    const controlledSelectedKeysRef = toRef(props, "selectedKeys");
    const mergedSelectedKeysRef = useMergedState(controlledSelectedKeysRef, uncontrolledSelectedKeysRef);
    const uncontrolledExpandedKeysRef = ref([]);
    const initUncontrolledExpandedKeys = (keys) => {
      uncontrolledExpandedKeysRef.value = props.defaultExpandAll ? dataTreeMateRef.value.getNonLeafKeys() : keys === void 0 ? props.defaultExpandedKeys : keys;
    };
    if (watchProps === null || watchProps === void 0 ? void 0 : watchProps.includes("defaultExpandedKeys")) {
      watchEffect(() => {
        initUncontrolledExpandedKeys(void 0);
      });
    } else {
      watchEffect(() => {
        initUncontrolledExpandedKeys(props.defaultExpandedKeys);
      });
    }
    const controlledExpandedKeysRef = toRef(props, "expandedKeys");
    const mergedExpandedKeysRef = useMergedState(controlledExpandedKeysRef, uncontrolledExpandedKeysRef);
    const fNodesRef = computed(() => displayTreeMateRef.value.getFlattenedNodes(mergedExpandedKeysRef.value));
    const {
      pendingNodeKeyRef,
      handleKeydown
    } = useKeyboard({
      props,
      mergedCheckedKeysRef,
      mergedSelectedKeysRef,
      fNodesRef,
      mergedExpandedKeysRef,
      handleCheck,
      handleSelect,
      handleSwitcherClick
    });
    let expandTimerId = null;
    let nodeKeyToBeExpanded = null;
    const uncontrolledHighlightKeySetRef = ref(/* @__PURE__ */ new Set());
    const controlledHighlightKeySetRef = computed(() => {
      return props.internalHighlightKeySet || filteredTreeInfoRef.value.highlightKeySet;
    });
    const mergedHighlightKeySetRef = useMergedState(controlledHighlightKeySetRef, uncontrolledHighlightKeySetRef);
    const loadingKeysRef = ref(/* @__PURE__ */ new Set());
    const expandedNonLoadingKeysRef = computed(() => {
      return mergedExpandedKeysRef.value.filter((key) => !loadingKeysRef.value.has(key));
    });
    let dragStartX = 0;
    const draggingNodeRef = ref(null);
    const droppingNodeRef = ref(null);
    const droppingMouseNodeRef = ref(null);
    const droppingPositionRef = ref(null);
    const droppingOffsetLevelRef = ref(0);
    const droppingNodeParentRef = computed(() => {
      const {
        value: droppingNode
      } = droppingNodeRef;
      if (!droppingNode)
        return null;
      return droppingNode.parent;
    });
    let isDataReset = false;
    watch(toRef(props, "data"), () => {
      isDataReset = true;
      void nextTick(() => {
        isDataReset = false;
      });
      loadingKeysRef.value.clear();
      pendingNodeKeyRef.value = null;
      resetDndState();
    }, {
      deep: false
    });
    let expandAnimationDisabled = false;
    const disableExpandAnimationForOneTick = () => {
      expandAnimationDisabled = true;
      void nextTick(() => {
        expandAnimationDisabled = false;
      });
    };
    let memoizedExpandedKeys;
    watch(toRef(props, "pattern"), (value, oldValue) => {
      if (props.showIrrelevantNodes) {
        memoizedExpandedKeys = void 0;
        if (value) {
          const {
            expandedKeys: expandedKeysAfterChange,
            highlightKeySet
          } = keysWithFilter(props.data, props.pattern, props.keyField, props.childrenField, mergedFilterRef.value);
          uncontrolledHighlightKeySetRef.value = highlightKeySet;
          disableExpandAnimationForOneTick();
          doUpdateExpandedKeys(expandedKeysAfterChange, getOptionsByKeys(expandedKeysAfterChange), {
            node: null,
            action: "filter"
          });
        } else {
          uncontrolledHighlightKeySetRef.value = /* @__PURE__ */ new Set();
        }
      } else {
        if (!value.length) {
          if (memoizedExpandedKeys !== void 0) {
            disableExpandAnimationForOneTick();
            doUpdateExpandedKeys(memoizedExpandedKeys, getOptionsByKeys(memoizedExpandedKeys), {
              node: null,
              action: "filter"
            });
          }
        } else {
          if (!oldValue.length) {
            memoizedExpandedKeys = mergedExpandedKeysRef.value;
          }
          const {
            expandedKeys
          } = filteredTreeInfoRef.value;
          if (expandedKeys !== void 0) {
            disableExpandAnimationForOneTick();
            doUpdateExpandedKeys(expandedKeys, getOptionsByKeys(expandedKeys), {
              node: null,
              action: "filter"
            });
          }
        }
      }
    });
    function triggerLoading(node) {
      return __awaiter(this, void 0, void 0, function* () {
        const {
          onLoad
        } = props;
        if (!onLoad) {
          yield Promise.resolve();
          return;
        }
        const {
          value: loadingKeys
        } = loadingKeysRef;
        if (!loadingKeys.has(node.key)) {
          loadingKeys.add(node.key);
          try {
            const loadResult = yield onLoad(node.rawNode);
            if (loadResult === false) {
              resetDragExpandState();
            }
          } catch (loadError) {
            console.error(loadError);
            resetDragExpandState();
          }
          loadingKeys.delete(node.key);
        }
      });
    }
    watchEffect(() => {
      var _a;
      const {
        value: displayTreeMate
      } = displayTreeMateRef;
      if (!displayTreeMate)
        return;
      const {
        getNode
      } = displayTreeMate;
      (_a = mergedExpandedKeysRef.value) === null || _a === void 0 ? void 0 : _a.forEach((key) => {
        const node = getNode(key);
        if (node && !node.shallowLoaded) {
          void triggerLoading(node);
        }
      });
    });
    const aipRef = ref(false);
    const afNodesRef = ref([]);
    watch(expandedNonLoadingKeysRef, (value, prevValue) => {
      if (!props.animated || expandAnimationDisabled) {
        void nextTick(syncScrollbar);
        return;
      }
      if (isDataReset) {
        return;
      }
      const nodeHeight = depx(themeRef.value.self.nodeHeight);
      const prevVSet = new Set(prevValue);
      let addedKey = null;
      let removedKey = null;
      for (const expandedKey of value) {
        if (!prevVSet.has(expandedKey)) {
          if (addedKey !== null)
            return;
          addedKey = expandedKey;
        }
      }
      const currentVSet = new Set(value);
      for (const expandedKey of prevValue) {
        if (!currentVSet.has(expandedKey)) {
          if (removedKey !== null)
            return;
          removedKey = expandedKey;
        }
      }
      if (addedKey === null && removedKey === null) {
        return;
      }
      const {
        virtualScroll
      } = props;
      const viewportHeight = (virtualScroll ? virtualListInstRef.value.listElRef : selfElRef.value).offsetHeight;
      const viewportItemCount = Math.ceil(viewportHeight / nodeHeight) + 1;
      let baseExpandedKeys;
      if (addedKey !== null) {
        baseExpandedKeys = prevValue;
      }
      if (removedKey !== null) {
        if (baseExpandedKeys === void 0) {
          baseExpandedKeys = value;
        } else {
          baseExpandedKeys = baseExpandedKeys.filter((key) => key !== removedKey);
        }
      }
      aipRef.value = true;
      afNodesRef.value = displayTreeMateRef.value.getFlattenedNodes(baseExpandedKeys);
      if (addedKey !== null) {
        const expandedNodeIndex = afNodesRef.value.findIndex((node) => node.key === addedKey);
        if (~expandedNodeIndex) {
          const children = afNodesRef.value[expandedNodeIndex].children;
          if (children) {
            const expandedChildren = flatten$1(children, value);
            afNodesRef.value.splice(expandedNodeIndex + 1, 0, {
              __motion: true,
              mode: "expand",
              height: virtualScroll ? expandedChildren.length * nodeHeight : void 0,
              nodes: virtualScroll ? expandedChildren.slice(0, viewportItemCount) : expandedChildren
            });
          }
        }
      }
      if (removedKey !== null) {
        const collapsedNodeIndex = afNodesRef.value.findIndex((node) => node.key === removedKey);
        if (~collapsedNodeIndex) {
          const collapsedNodeChildren = afNodesRef.value[collapsedNodeIndex].children;
          if (!collapsedNodeChildren)
            return;
          aipRef.value = true;
          const collapsedChildren = flatten$1(collapsedNodeChildren, value);
          afNodesRef.value.splice(collapsedNodeIndex + 1, 0, {
            __motion: true,
            mode: "collapse",
            height: virtualScroll ? collapsedChildren.length * nodeHeight : void 0,
            nodes: virtualScroll ? collapsedChildren.slice(0, viewportItemCount) : collapsedChildren
          });
        }
      }
    });
    const getFIndexRef = computed(() => {
      return createIndexGetter(fNodesRef.value);
    });
    const mergedFNodesRef = computed(() => {
      if (aipRef.value)
        return afNodesRef.value;
      else
        return fNodesRef.value;
    });
    function syncScrollbar() {
      const {
        value: scrollbarInst
      } = scrollbarInstRef;
      if (scrollbarInst)
        scrollbarInst.sync();
    }
    function handleAfterEnter() {
      aipRef.value = false;
      if (props.virtualScroll) {
        void nextTick(syncScrollbar);
      }
    }
    function getOptionsByKeys(keys) {
      const {
        getNode
      } = dataTreeMateRef.value;
      return keys.map((key) => {
        var _a;
        return ((_a = getNode(key)) === null || _a === void 0 ? void 0 : _a.rawNode) || null;
      });
    }
    function doUpdateExpandedKeys(value, option, meta) {
      const {
        "onUpdate:expandedKeys": _onUpdateExpandedKeys,
        onUpdateExpandedKeys
      } = props;
      uncontrolledExpandedKeysRef.value = value;
      if (_onUpdateExpandedKeys) {
        call(_onUpdateExpandedKeys, value, option, meta);
      }
      if (onUpdateExpandedKeys) {
        call(onUpdateExpandedKeys, value, option, meta);
      }
    }
    function doUpdateCheckedKeys(value, option, meta) {
      const {
        "onUpdate:checkedKeys": _onUpdateCheckedKeys,
        onUpdateCheckedKeys
      } = props;
      uncontrolledCheckedKeysRef.value = value;
      if (onUpdateCheckedKeys) {
        call(onUpdateCheckedKeys, value, option, meta);
      }
      if (_onUpdateCheckedKeys) {
        call(_onUpdateCheckedKeys, value, option, meta);
      }
    }
    function doUpdateIndeterminateKeys(value, option) {
      const {
        "onUpdate:indeterminateKeys": _onUpdateIndeterminateKeys,
        onUpdateIndeterminateKeys
      } = props;
      if (_onUpdateIndeterminateKeys) {
        call(_onUpdateIndeterminateKeys, value, option);
      }
      if (onUpdateIndeterminateKeys) {
        call(onUpdateIndeterminateKeys, value, option);
      }
    }
    function doUpdateSelectedKeys(value, option, meta) {
      const {
        "onUpdate:selectedKeys": _onUpdateSelectedKeys,
        onUpdateSelectedKeys
      } = props;
      uncontrolledSelectedKeysRef.value = value;
      if (onUpdateSelectedKeys) {
        call(onUpdateSelectedKeys, value, option, meta);
      }
      if (_onUpdateSelectedKeys) {
        call(_onUpdateSelectedKeys, value, option, meta);
      }
    }
    function doDragEnter(info) {
      const {
        onDragenter
      } = props;
      if (onDragenter)
        call(onDragenter, info);
    }
    function doDragLeave(info) {
      const {
        onDragleave
      } = props;
      if (onDragleave)
        call(onDragleave, info);
    }
    function doDragEnd(info) {
      const {
        onDragend
      } = props;
      if (onDragend)
        call(onDragend, info);
    }
    function doDragStart(info) {
      const {
        onDragstart
      } = props;
      if (onDragstart)
        call(onDragstart, info);
    }
    function doDragOver(info) {
      const {
        onDragover
      } = props;
      if (onDragover)
        call(onDragover, info);
    }
    function doDrop(info) {
      const {
        onDrop
      } = props;
      if (onDrop)
        call(onDrop, info);
    }
    function resetDndState() {
      resetDragState();
      resetDropState();
    }
    function resetDragState() {
      draggingNodeRef.value = null;
    }
    function resetDropState() {
      droppingOffsetLevelRef.value = 0;
      droppingNodeRef.value = null;
      droppingMouseNodeRef.value = null;
      droppingPositionRef.value = null;
      resetDragExpandState();
    }
    function resetDragExpandState() {
      if (expandTimerId) {
        (void 0).clearTimeout(expandTimerId);
        expandTimerId = null;
      }
      nodeKeyToBeExpanded = null;
    }
    function handleCheck(node, checked) {
      if (props.disabled || isNodeDisabled(node, props.disabledField)) {
        return;
      }
      if (props.internalUnifySelectCheck && !props.multiple) {
        handleSelect(node);
        return;
      }
      const checkedAction = checked ? "check" : "uncheck";
      const {
        checkedKeys,
        indeterminateKeys
      } = dataTreeMateRef.value[checkedAction](node.key, displayedCheckedKeysRef.value, {
        cascade: props.cascade,
        checkStrategy: mergedCheckStrategyRef.value,
        allowNotLoaded: props.allowCheckingNotLoaded
      });
      doUpdateCheckedKeys(checkedKeys, getOptionsByKeys(checkedKeys), {
        node: node.rawNode,
        action: checkedAction
      });
      doUpdateIndeterminateKeys(indeterminateKeys, getOptionsByKeys(indeterminateKeys));
    }
    function toggleExpand(node) {
      if (props.disabled)
        return;
      const {
        key
      } = node;
      const {
        value: mergedExpandedKeys
      } = mergedExpandedKeysRef;
      const index = mergedExpandedKeys.findIndex((expandNodeId) => expandNodeId === key);
      if (~index) {
        const expandedKeysAfterChange = Array.from(mergedExpandedKeys);
        expandedKeysAfterChange.splice(index, 1);
        doUpdateExpandedKeys(expandedKeysAfterChange, getOptionsByKeys(expandedKeysAfterChange), {
          node: node.rawNode,
          action: "collapse"
        });
      } else {
        const nodeToBeExpanded = displayTreeMateRef.value.getNode(key);
        if (!nodeToBeExpanded || nodeToBeExpanded.isLeaf) {
          return;
        }
        let nextKeys;
        if (props.accordion) {
          const siblingKeySet = new Set(node.siblings.map(({
            key: key2
          }) => key2));
          nextKeys = mergedExpandedKeys.filter((expandedKey) => {
            return !siblingKeySet.has(expandedKey);
          });
          nextKeys.push(key);
        } else {
          nextKeys = mergedExpandedKeys.concat(key);
        }
        doUpdateExpandedKeys(nextKeys, getOptionsByKeys(nextKeys), {
          node: node.rawNode,
          action: "expand"
        });
      }
    }
    function handleSwitcherClick(node) {
      if (props.disabled || aipRef.value)
        return;
      toggleExpand(node);
    }
    function handleSelect(node) {
      if (props.disabled || !props.selectable) {
        return;
      }
      pendingNodeKeyRef.value = node.key;
      if (props.internalUnifySelectCheck) {
        const {
          value: {
            checkedKeys,
            indeterminateKeys
          }
        } = checkedStatusRef;
        if (props.multiple) {
          handleCheck(node, !(checkedKeys.includes(node.key) || indeterminateKeys.includes(node.key)));
        } else {
          doUpdateCheckedKeys([node.key], getOptionsByKeys([node.key]), {
            node: node.rawNode,
            action: "check"
          });
        }
      }
      if (props.multiple) {
        const selectedKeys = Array.from(mergedSelectedKeysRef.value);
        const index = selectedKeys.findIndex((key) => key === node.key);
        if (~index) {
          if (props.cancelable) {
            selectedKeys.splice(index, 1);
          }
        } else if (!~index) {
          selectedKeys.push(node.key);
        }
        doUpdateSelectedKeys(selectedKeys, getOptionsByKeys(selectedKeys), {
          node: node.rawNode,
          action: ~index ? "unselect" : "select"
        });
      } else {
        const selectedKeys = mergedSelectedKeysRef.value;
        if (selectedKeys.includes(node.key)) {
          if (props.cancelable) {
            doUpdateSelectedKeys([], [], {
              node: node.rawNode,
              action: "unselect"
            });
          }
        } else {
          doUpdateSelectedKeys([node.key], getOptionsByKeys([node.key]), {
            node: node.rawNode,
            action: "select"
          });
        }
      }
    }
    function expandDragEnterNode(node) {
      if (expandTimerId) {
        (void 0).clearTimeout(expandTimerId);
        expandTimerId = null;
      }
      if (node.isLeaf)
        return;
      nodeKeyToBeExpanded = node.key;
      const expand = () => {
        if (nodeKeyToBeExpanded !== node.key)
          return;
        const {
          value: droppingMouseNode
        } = droppingMouseNodeRef;
        if (droppingMouseNode && droppingMouseNode.key === node.key && !mergedExpandedKeysRef.value.includes(node.key)) {
          const nextKeys = mergedExpandedKeysRef.value.concat(node.key);
          doUpdateExpandedKeys(nextKeys, getOptionsByKeys(nextKeys), {
            node: node.rawNode,
            action: "expand"
          });
        }
        expandTimerId = null;
        nodeKeyToBeExpanded = null;
      };
      if (!node.shallowLoaded) {
        expandTimerId = (void 0).setTimeout(() => {
          void triggerLoading(node).then(() => {
            expand();
          });
        }, 1e3);
      } else {
        expandTimerId = (void 0).setTimeout(() => {
          expand();
        }, 1e3);
      }
    }
    function handleDragEnter({
      event,
      node
    }) {
      if (!props.draggable || props.disabled || isNodeDisabled(node, props.disabledField)) {
        return;
      }
      handleDragOver({
        event,
        node
      }, false);
      doDragEnter({
        event,
        node: node.rawNode
      });
    }
    function handleDragLeave({
      event,
      node
    }) {
      if (!props.draggable || props.disabled || isNodeDisabled(node, props.disabledField)) {
        return;
      }
      doDragLeave({
        event,
        node: node.rawNode
      });
    }
    function handleDragLeaveTree(e) {
      if (e.target !== e.currentTarget)
        return;
      resetDropState();
    }
    function handleDragEnd({
      event,
      node
    }) {
      resetDndState();
      if (!props.draggable || props.disabled || isNodeDisabled(node, props.disabledField)) {
        return;
      }
      doDragEnd({
        event,
        node: node.rawNode
      });
    }
    function handleDragStart({
      event,
      node
    }) {
      if (!props.draggable || props.disabled || isNodeDisabled(node, props.disabledField)) {
        return;
      }
      dragStartX = event.clientX;
      draggingNodeRef.value = node;
      doDragStart({
        event,
        node: node.rawNode
      });
    }
    function handleDragOver({
      event,
      node
    }, emit = true) {
      var _a;
      if (!props.draggable || props.disabled || isNodeDisabled(node, props.disabledField)) {
        return;
      }
      const {
        value: draggingNode
      } = draggingNodeRef;
      if (!draggingNode)
        return;
      const {
        allowDrop,
        indent
      } = props;
      if (emit)
        doDragOver({
          event,
          node: node.rawNode
        });
      const el = event.currentTarget;
      const {
        height: elOffsetHeight,
        top: elClientTop
      } = el.getBoundingClientRect();
      const eventOffsetY = event.clientY - elClientTop;
      let mousePosition;
      const allowDropInside = allowDrop({
        node: node.rawNode,
        dropPosition: "inside",
        phase: "drag"
      });
      if (allowDropInside) {
        if (eventOffsetY <= 8) {
          mousePosition = "before";
        } else if (eventOffsetY >= elOffsetHeight - 8) {
          mousePosition = "after";
        } else {
          mousePosition = "inside";
        }
      } else {
        if (eventOffsetY <= elOffsetHeight / 2) {
          mousePosition = "before";
        } else {
          mousePosition = "after";
        }
      }
      const {
        value: getFindex
      } = getFIndexRef;
      let finalDropNode;
      let finalDropPosition;
      const hoverNodeFIndex = getFindex(node.key);
      if (hoverNodeFIndex === null) {
        resetDropState();
        return;
      }
      let mouseAtExpandedNonLeafNode = false;
      if (mousePosition === "inside") {
        finalDropNode = node;
        finalDropPosition = "inside";
      } else {
        if (mousePosition === "before") {
          if (node.isFirstChild) {
            finalDropNode = node;
            finalDropPosition = "before";
          } else {
            finalDropNode = fNodesRef.value[hoverNodeFIndex - 1];
            finalDropPosition = "after";
          }
        } else {
          finalDropNode = node;
          finalDropPosition = "after";
        }
      }
      if (!finalDropNode.isLeaf && mergedExpandedKeysRef.value.includes(finalDropNode.key)) {
        mouseAtExpandedNonLeafNode = true;
        if (finalDropPosition === "after") {
          finalDropNode = fNodesRef.value[hoverNodeFIndex + 1];
          if (!finalDropNode) {
            finalDropNode = node;
            finalDropPosition = "inside";
          } else {
            finalDropPosition = "before";
          }
        }
      }
      const droppingMouseNode = finalDropNode;
      droppingMouseNodeRef.value = droppingMouseNode;
      if (!mouseAtExpandedNonLeafNode && draggingNode.isLastChild && draggingNode.key === finalDropNode.key) {
        finalDropPosition = "after";
      }
      if (finalDropPosition === "after") {
        let offset = dragStartX - event.clientX;
        let offsetLevel = 0;
        while (offset >= indent / 2 && finalDropNode.parent !== null && finalDropNode.isLastChild && offsetLevel < 1) {
          offset -= indent;
          offsetLevel += 1;
          finalDropNode = finalDropNode.parent;
        }
        droppingOffsetLevelRef.value = offsetLevel;
      } else {
        droppingOffsetLevelRef.value = 0;
      }
      if (draggingNode.contains(finalDropNode) || finalDropPosition === "inside" && ((_a = draggingNode.parent) === null || _a === void 0 ? void 0 : _a.key) === finalDropNode.key) {
        if (draggingNode.key === droppingMouseNode.key && draggingNode.key === finalDropNode.key)
          ;
        else {
          resetDropState();
          return;
        }
      }
      if (!allowDrop({
        node: finalDropNode.rawNode,
        dropPosition: finalDropPosition,
        phase: "drag"
      })) {
        resetDropState();
        return;
      }
      if (draggingNode.key === finalDropNode.key) {
        resetDragExpandState();
      } else {
        if (nodeKeyToBeExpanded !== finalDropNode.key) {
          if (finalDropPosition === "inside") {
            if (props.expandOnDragenter) {
              expandDragEnterNode(finalDropNode);
              if (!finalDropNode.shallowLoaded && nodeKeyToBeExpanded !== finalDropNode.key) {
                resetDndState();
                return;
              }
            } else {
              if (!finalDropNode.shallowLoaded) {
                resetDndState();
                return;
              }
            }
          } else {
            resetDragExpandState();
          }
        } else {
          if (finalDropPosition !== "inside") {
            resetDragExpandState();
          }
        }
      }
      droppingPositionRef.value = finalDropPosition;
      droppingNodeRef.value = finalDropNode;
    }
    function handleDrop({
      event,
      node,
      dropPosition
    }) {
      if (!props.draggable || props.disabled || isNodeDisabled(node, props.disabledField)) {
        return;
      }
      const {
        value: draggingNode
      } = draggingNodeRef;
      const {
        value: droppingNode
      } = droppingNodeRef;
      const {
        value: droppingPosition
      } = droppingPositionRef;
      if (!draggingNode || !droppingNode || !droppingPosition) {
        return;
      }
      if (!props.allowDrop({
        node: droppingNode.rawNode,
        dropPosition: droppingPosition,
        phase: "drag"
      })) {
        return;
      }
      if (draggingNode.key === droppingNode.key) {
        return;
      }
      if (droppingPosition === "before") {
        const nextNode = draggingNode.getNext({
          includeDisabled: true
        });
        if (nextNode) {
          if (nextNode.key === droppingNode.key) {
            resetDropState();
            return;
          }
        }
      }
      if (droppingPosition === "after") {
        const prevNode = draggingNode.getPrev({
          includeDisabled: true
        });
        if (prevNode) {
          if (prevNode.key === droppingNode.key) {
            resetDropState();
            return;
          }
        }
      }
      doDrop({
        event,
        node: droppingNode.rawNode,
        dragNode: draggingNode.rawNode,
        dropPosition
      });
      resetDndState();
    }
    function handleScroll() {
      syncScrollbar();
    }
    function handleResize() {
      syncScrollbar();
    }
    function handleFocusout(e) {
      var _a;
      if (props.virtualScroll || props.internalScrollable) {
        const {
          value: scrollbarInst
        } = scrollbarInstRef;
        if ((_a = scrollbarInst === null || scrollbarInst === void 0 ? void 0 : scrollbarInst.containerRef) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget)) {
          return;
        }
        pendingNodeKeyRef.value = null;
      } else {
        const {
          value: selfEl
        } = selfElRef;
        if (selfEl === null || selfEl === void 0 ? void 0 : selfEl.contains(e.relatedTarget))
          return;
        pendingNodeKeyRef.value = null;
      }
    }
    watch(pendingNodeKeyRef, (value) => {
      var _a, _b;
      if (value === null)
        return;
      if (props.virtualScroll) {
        (_a = virtualListInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo({
          key: value
        });
      } else if (props.internalScrollable) {
        const {
          value: scrollbarInst
        } = scrollbarInstRef;
        if (scrollbarInst === null)
          return;
        const targetEl = (_b = scrollbarInst.contentRef) === null || _b === void 0 ? void 0 : _b.querySelector(`[data-key="${createDataKey(value)}"]`);
        if (!targetEl)
          return;
        scrollbarInst.scrollTo({
          el: targetEl
        });
      }
    });
    provide(treeInjectionKey, {
      loadingKeysRef,
      highlightKeySetRef: mergedHighlightKeySetRef,
      displayedCheckedKeysRef,
      displayedIndeterminateKeysRef,
      mergedSelectedKeysRef,
      mergedExpandedKeysRef,
      mergedThemeRef: themeRef,
      mergedCheckStrategyRef,
      nodePropsRef: toRef(props, "nodeProps"),
      disabledRef: toRef(props, "disabled"),
      checkableRef: toRef(props, "checkable"),
      selectableRef: toRef(props, "selectable"),
      expandOnClickRef: toRef(props, "expandOnClick"),
      onLoadRef: toRef(props, "onLoad"),
      draggableRef: toRef(props, "draggable"),
      blockLineRef: toRef(props, "blockLine"),
      indentRef: toRef(props, "indent"),
      cascadeRef: toRef(props, "cascade"),
      checkOnClickRef: toRef(props, "checkOnClick"),
      checkboxPlacementRef: props.checkboxPlacement,
      droppingMouseNodeRef,
      droppingNodeParentRef,
      draggingNodeRef,
      droppingPositionRef,
      droppingOffsetLevelRef,
      fNodesRef,
      pendingNodeKeyRef,
      showLineRef: toRef(props, "showLine"),
      disabledFieldRef: toRef(props, "disabledField"),
      internalScrollableRef: toRef(props, "internalScrollable"),
      internalCheckboxFocusableRef: toRef(props, "internalCheckboxFocusable"),
      internalTreeSelect: props.internalTreeSelect,
      renderLabelRef: toRef(props, "renderLabel"),
      renderPrefixRef: toRef(props, "renderPrefix"),
      renderSuffixRef: toRef(props, "renderSuffix"),
      renderSwitcherIconRef: toRef(props, "renderSwitcherIcon"),
      labelFieldRef: toRef(props, "labelField"),
      multipleRef: toRef(props, "multiple"),
      overrideDefaultNodeClickBehaviorRef: toRef(props, "overrideDefaultNodeClickBehavior"),
      handleSwitcherClick,
      handleDragEnd,
      handleDragEnter,
      handleDragLeave,
      handleDragStart,
      handleDrop,
      handleDragOver,
      handleSelect,
      handleCheck
    });
    function scrollTo(options, y) {
      var _a, _b;
      if (typeof options === "number") {
        (_a = virtualListInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(options, y || 0);
      } else {
        (_b = virtualListInstRef.value) === null || _b === void 0 ? void 0 : _b.scrollTo(options);
      }
    }
    const exposedMethods = {
      handleKeydown,
      scrollTo,
      getCheckedData: () => {
        if (!props.checkable)
          return {
            keys: [],
            options: []
          };
        const {
          checkedKeys
        } = checkedStatusRef.value;
        return {
          keys: checkedKeys,
          options: getOptionsByKeys(checkedKeys)
        };
      },
      getIndeterminateData: () => {
        if (!props.checkable)
          return {
            keys: [],
            options: []
          };
        const {
          indeterminateKeys
        } = checkedStatusRef.value;
        return {
          keys: indeterminateKeys,
          options: getOptionsByKeys(indeterminateKeys)
        };
      }
    };
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: {
          fontSize,
          nodeBorderRadius,
          nodeColorHover,
          nodeColorPressed,
          nodeColorActive,
          arrowColor,
          loadingColor,
          nodeTextColor,
          nodeTextColorDisabled,
          dropMarkColor,
          nodeWrapperPadding,
          nodeHeight,
          lineHeight,
          lineColor
        }
      } = themeRef.value;
      const lineOffsetTop = getPadding(nodeWrapperPadding, "top");
      const lineOffsetBottom = getPadding(nodeWrapperPadding, "bottom");
      const nodeContentHeight = pxfy(depx(nodeHeight) - depx(lineOffsetTop) - depx(lineOffsetBottom));
      return {
        "--n-arrow-color": arrowColor,
        "--n-loading-color": loadingColor,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-font-size": fontSize,
        "--n-node-border-radius": nodeBorderRadius,
        "--n-node-color-active": nodeColorActive,
        "--n-node-color-hover": nodeColorHover,
        "--n-node-color-pressed": nodeColorPressed,
        "--n-node-text-color": nodeTextColor,
        "--n-node-text-color-disabled": nodeTextColorDisabled,
        "--n-drop-mark-color": dropMarkColor,
        "--n-node-wrapper-padding": nodeWrapperPadding,
        "--n-line-offset-top": `-${lineOffsetTop}`,
        "--n-line-offset-bottom": `-${lineOffsetBottom}`,
        "--n-node-content-height": nodeContentHeight,
        "--n-line-height": lineHeight,
        "--n-line-color": lineColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("tree", void 0, cssVarsRef, props) : void 0;
    return Object.assign(Object.assign({}, exposedMethods), {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      rtlEnabled: rtlEnabledRef,
      fNodes: mergedFNodesRef,
      aip: aipRef,
      selfElRef,
      virtualListInstRef,
      scrollbarInstRef,
      handleFocusout,
      handleDragLeaveTree,
      handleScroll,
      getScrollContainer,
      getScrollContent,
      handleAfterEnter,
      handleResize,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a;
    const {
      fNodes,
      internalRenderEmpty
    } = this;
    if (!fNodes.length && internalRenderEmpty) {
      return internalRenderEmpty();
    }
    const {
      mergedClsPrefix,
      blockNode,
      blockLine,
      draggable,
      disabled,
      internalFocusable,
      checkable,
      handleKeydown,
      rtlEnabled,
      handleFocusout,
      scrollbarProps
    } = this;
    const mergedFocusable = internalFocusable && !disabled;
    const tabindex = mergedFocusable ? "0" : void 0;
    const treeClass = [`${mergedClsPrefix}-tree`, rtlEnabled && `${mergedClsPrefix}-tree--rtl`, checkable && `${mergedClsPrefix}-tree--checkable`, (blockLine || blockNode) && `${mergedClsPrefix}-tree--block-node`, blockLine && `${mergedClsPrefix}-tree--block-line`];
    const createNode = (tmNode) => {
      return "__motion" in tmNode ? h(MotionWrapper, {
        height: tmNode.height,
        nodes: tmNode.nodes,
        clsPrefix: mergedClsPrefix,
        mode: tmNode.mode,
        onAfterEnter: this.handleAfterEnter
      }) : h(TreeNode, {
        key: tmNode.key,
        tmNode,
        clsPrefix: mergedClsPrefix
      });
    };
    if (this.virtualScroll) {
      const {
        mergedTheme,
        internalScrollablePadding
      } = this;
      const padding = getPadding(internalScrollablePadding || "0");
      return h(XScrollbar, Object.assign({}, scrollbarProps, {
        ref: "scrollbarInstRef",
        onDragleave: draggable ? this.handleDragLeaveTree : void 0,
        container: this.getScrollContainer,
        content: this.getScrollContent,
        class: treeClass,
        theme: mergedTheme.peers.Scrollbar,
        themeOverrides: mergedTheme.peerOverrides.Scrollbar,
        tabindex,
        onKeydown: mergedFocusable ? handleKeydown : void 0,
        onFocusout: mergedFocusable ? handleFocusout : void 0
      }), {
        default: () => {
          var _a2;
          (_a2 = this.onRender) === null || _a2 === void 0 ? void 0 : _a2.call(this);
          return !fNodes.length ? resolveSlot(this.$slots.empty, () => [h(NEmpty, {
            class: `${mergedClsPrefix}-tree__empty`,
            theme: this.mergedTheme.peers.Empty,
            themeOverrides: this.mergedTheme.peerOverrides.Empty
          })]) : h(VVirtualList, {
            ref: "virtualListInstRef",
            items: this.fNodes,
            itemSize: depx(mergedTheme.self.nodeHeight),
            ignoreItemResize: this.aip,
            paddingTop: padding.top,
            paddingBottom: padding.bottom,
            class: this.themeClass,
            style: [this.cssVars, {
              paddingLeft: padding.left,
              paddingRight: padding.right
            }],
            onScroll: this.handleScroll,
            onResize: this.handleResize,
            showScrollbar: false,
            itemResizable: true
          }, {
            default: ({
              item
            }) => createNode(item)
          });
        }
      });
    }
    const {
      internalScrollable
    } = this;
    treeClass.push(this.themeClass);
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    if (internalScrollable) {
      return h(XScrollbar, Object.assign({}, scrollbarProps, {
        class: treeClass,
        tabindex,
        onKeydown: mergedFocusable ? handleKeydown : void 0,
        onFocusout: mergedFocusable ? handleFocusout : void 0,
        style: this.cssVars,
        contentStyle: {
          padding: this.internalScrollablePadding
        }
      }), {
        default: () => h("div", {
          onDragleave: draggable ? this.handleDragLeaveTree : void 0,
          ref: "selfElRef"
        }, this.fNodes.map(createNode))
      });
    } else {
      return h("div", {
        class: treeClass,
        tabindex,
        ref: "selfElRef",
        style: this.cssVars,
        onKeydown: mergedFocusable ? handleKeydown : void 0,
        onFocusout: mergedFocusable ? handleFocusout : void 0,
        onDragleave: draggable ? this.handleDragLeaveTree : void 0
      }, !fNodes.length ? resolveSlot(this.$slots.empty, () => [h(NEmpty, {
        class: `${mergedClsPrefix}-tree__empty`,
        theme: this.mergedTheme.peers.Empty,
        themeOverrides: this.mergedTheme.peerOverrides.Empty
      })]) : fNodes.map(createNode));
    }
  }
});
function treeOption2SelectOption(tmNode, labelField) {
  const {
    rawNode
  } = tmNode;
  return Object.assign(Object.assign({}, rawNode), {
    label: rawNode[labelField],
    value: tmNode.key
  });
}
function treeOption2SelectOptionWithPath(tmNode, path, separator, labelField) {
  const {
    rawNode
  } = tmNode;
  return Object.assign(Object.assign({}, rawNode), {
    value: tmNode.key,
    label: path.map((v) => v.rawNode[labelField]).join(separator)
  });
}
const style = c([cB("tree-select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `), cB("tree-select-menu", `
 position: relative;
 overflow: hidden;
 margin: 4px 0;
 transition: box-shadow .3s var(--n-bezier), background-color .3s var(--n-bezier);
 border-radius: var(--n-menu-border-radius);
 box-shadow: var(--n-menu-box-shadow);
 background-color: var(--n-menu-color);
 outline: none;
 `, [cB("tree", "max-height: var(--n-menu-height);"), cE("empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), cE("action", `
 padding: var(--n-action-padding);
 transition: 
 color .3s var(--n-bezier);
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), fadeInScaleUpTransition()])]);
const treeSelectProps = Object.assign(Object.assign(Object.assign(Object.assign({}, useTheme.props), {
  bordered: {
    type: Boolean,
    default: true
  },
  cascade: Boolean,
  checkable: Boolean,
  clearable: Boolean,
  clearFilterAfterSelect: {
    type: Boolean,
    default: true
  },
  consistentMenuWidth: {
    type: Boolean,
    default: true
  },
  defaultShow: Boolean,
  defaultValue: {
    type: [String, Number, Array],
    default: null
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  filterable: Boolean,
  checkStrategy: {
    type: String,
    default: "all"
  },
  loading: Boolean,
  maxTagCount: [String, Number],
  multiple: Boolean,
  showPath: Boolean,
  separator: {
    type: String,
    default: " / "
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: String,
  placement: {
    type: String,
    default: "bottom-start"
  },
  show: {
    type: Boolean,
    default: void 0
  },
  size: String,
  value: [String, Number, Array],
  to: useAdjustedTo.propTo,
  menuProps: Object,
  virtualScroll: {
    type: Boolean,
    default: true
  },
  status: String,
  renderTag: Function,
  ellipsisTagPopoverProps: Object
}), treeSharedProps), {
  renderLabel: Function,
  renderPrefix: Function,
  renderSuffix: Function,
  nodeProps: Function,
  watchProps: Array,
  getChildren: Function,
  onBlur: Function,
  onFocus: Function,
  onLoad: Function,
  onUpdateShow: [Function, Array],
  onUpdateValue: [Function, Array],
  "onUpdate:value": [Function, Array],
  "onUpdate:show": [Function, Array],
  /**
   * @deprecated
   */
  leafOnly: Boolean
});
const NTreeSelect = defineComponent({
  name: "TreeSelect",
  props: treeSelectProps,
  setup(props) {
    const followerInstRef = ref(null);
    const triggerInstRef = ref(null);
    const treeInstRef = ref(null);
    const menuElRef = ref(null);
    const {
      mergedClsPrefixRef,
      namespaceRef,
      inlineThemeDisabled
    } = useConfig(props);
    const {
      localeRef
    } = useLocale("Select");
    const {
      mergedSizeRef,
      mergedDisabledRef,
      mergedStatusRef,
      nTriggerFormBlur,
      nTriggerFormChange,
      nTriggerFormFocus,
      nTriggerFormInput
    } = useFormItem(props);
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, "value");
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const uncontrolledShowRef = ref(props.defaultShow);
    const controlledShowRef = toRef(props, "show");
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef);
    const patternRef = ref("");
    const mergedFilterRef = computed(() => {
      const {
        filter
      } = props;
      if (filter)
        return filter;
      const {
        labelField
      } = props;
      return (pattern, node) => {
        if (!pattern.length)
          return true;
        return node[labelField].toLowerCase().includes(pattern.toLowerCase());
      };
    });
    const dataTreeMateRef = computed(() => createTreeMate(props.options, createTreeMateOptions(props.keyField, props.childrenField, props.disabledField, void 0)));
    const {
      value: initMergedValue
    } = mergedValueRef;
    const pendingNodeKeyRef = ref(props.checkable ? null : Array.isArray(initMergedValue) && initMergedValue.length ? initMergedValue[initMergedValue.length - 1] : null);
    const mergedCascadeRef = computed(() => {
      return props.multiple && props.cascade && props.checkable;
    });
    const uncontrolledExpandedKeysRef = ref(props.defaultExpandAll ? void 0 : props.defaultExpandedKeys || props.expandedKeys);
    const controlledExpandedKeysRef = toRef(props, "expandedKeys");
    const mergedExpandedKeysRef = useMergedState(controlledExpandedKeysRef, uncontrolledExpandedKeysRef);
    const focusedRef = ref(false);
    const mergedPlaceholderRef = computed(() => {
      const {
        placeholder
      } = props;
      if (placeholder !== void 0)
        return placeholder;
      return localeRef.value.placeholder;
    });
    const treeCheckedKeysRef = computed(() => {
      const {
        value: mergedValue
      } = mergedValueRef;
      if (props.multiple) {
        if (Array.isArray(mergedValue))
          return mergedValue;
        else
          return [];
      } else {
        if (mergedValue === null || Array.isArray(mergedValue))
          return [];
        else
          return [mergedValue];
      }
    });
    const treeSelectedKeysRef = computed(() => {
      if (props.checkable)
        return [];
      return treeCheckedKeysRef.value;
    });
    const selectedOptionRef = computed(() => {
      const {
        multiple,
        showPath,
        separator,
        labelField
      } = props;
      if (multiple)
        return null;
      const {
        value: mergedValue
      } = mergedValueRef;
      if (!Array.isArray(mergedValue) && mergedValue !== null) {
        const {
          value: treeMate
        } = dataTreeMateRef;
        const tmNode = treeMate.getNode(mergedValue);
        if (tmNode !== null) {
          return showPath ? treeOption2SelectOptionWithPath(tmNode, treeMate.getPath(mergedValue).treeNodePath, separator, labelField) : treeOption2SelectOption(tmNode, labelField);
        }
      }
      return null;
    });
    const selectedOptionsRef = computed(() => {
      const {
        multiple,
        showPath,
        separator
      } = props;
      if (!multiple)
        return null;
      const {
        value: mergedValue
      } = mergedValueRef;
      if (Array.isArray(mergedValue)) {
        const res = [];
        const {
          value: treeMate
        } = dataTreeMateRef;
        const {
          checkedKeys
        } = treeMate.getCheckedKeys(mergedValue, {
          checkStrategy: props.checkStrategy,
          cascade: mergedCascadeRef.value,
          allowNotLoaded: props.allowCheckingNotLoaded
        });
        const {
          labelField
        } = props;
        checkedKeys.forEach((value) => {
          const tmNode = treeMate.getNode(value);
          if (tmNode !== null) {
            res.push(showPath ? treeOption2SelectOptionWithPath(tmNode, treeMate.getPath(value).treeNodePath, separator, labelField) : treeOption2SelectOption(tmNode, labelField));
          }
        });
        return res;
      }
      return [];
    });
    function focusSelection() {
      var _a;
      (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
    }
    function focusSelectionInput() {
      var _a;
      (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.focusInput();
    }
    function doUpdateShow(value) {
      const {
        onUpdateShow,
        "onUpdate:show": _onUpdateShow
      } = props;
      if (onUpdateShow)
        call(onUpdateShow, value);
      if (_onUpdateShow)
        call(_onUpdateShow, value);
      uncontrolledShowRef.value = value;
    }
    function doUpdateValue(value, option, meta) {
      const {
        onUpdateValue,
        "onUpdate:value": _onUpdateValue
      } = props;
      if (onUpdateValue) {
        call(onUpdateValue, value, option, meta);
      }
      if (_onUpdateValue) {
        call(_onUpdateValue, value, option, meta);
      }
      uncontrolledValueRef.value = value;
      nTriggerFormInput();
      nTriggerFormChange();
    }
    function doUpdateIndeterminateKeys(value, option) {
      const {
        onUpdateIndeterminateKeys,
        "onUpdate:indeterminateKeys": _onUpdateIndeterminateKeys
      } = props;
      if (onUpdateIndeterminateKeys) {
        call(onUpdateIndeterminateKeys, value, option);
      }
      if (_onUpdateIndeterminateKeys) {
        call(_onUpdateIndeterminateKeys, value, option);
      }
    }
    function doUpdateExpandedKeys(keys, option, meta) {
      const {
        onUpdateExpandedKeys,
        "onUpdate:expandedKeys": _onUpdateExpandedKeys
      } = props;
      if (onUpdateExpandedKeys) {
        call(onUpdateExpandedKeys, keys, option, meta);
      }
      if (_onUpdateExpandedKeys) {
        call(_onUpdateExpandedKeys, keys, option, meta);
      }
      uncontrolledExpandedKeysRef.value = keys;
    }
    function doFocus(e) {
      const {
        onFocus
      } = props;
      if (onFocus)
        onFocus(e);
      nTriggerFormFocus();
    }
    function doBlur(e) {
      closeMenu();
      const {
        onBlur
      } = props;
      if (onBlur)
        onBlur(e);
      nTriggerFormBlur();
    }
    function closeMenu() {
      doUpdateShow(false);
    }
    function openMenu() {
      if (!mergedDisabledRef.value) {
        patternRef.value = "";
        doUpdateShow(true);
        if (props.filterable) {
          focusSelectionInput();
        }
      }
    }
    function handleMenuLeave() {
      patternRef.value = "";
    }
    function handleMenuClickoutside(e) {
      var _a;
      if (mergedShowRef.value) {
        if (!((_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(getPreciseEventTarget(e)))) {
          closeMenu();
        }
      }
    }
    function handleTriggerClick() {
      if (mergedDisabledRef.value)
        return;
      if (!mergedShowRef.value) {
        openMenu();
      } else {
        if (!props.filterable) {
          closeMenu();
        }
      }
    }
    function getOptionsByKeys(keys) {
      const {
        value: {
          getNode
        }
      } = dataTreeMateRef;
      return keys.map((key) => {
        var _a;
        return ((_a = getNode(key)) === null || _a === void 0 ? void 0 : _a.rawNode) || null;
      });
    }
    function handleUpdateCheckedKeys(keys, _, meta) {
      const options = getOptionsByKeys(keys);
      const action = meta.action === "check" ? "select" : "unselect";
      const node = meta.node;
      if (props.multiple) {
        doUpdateValue(keys, options, {
          node,
          action
        });
        if (props.filterable) {
          focusSelectionInput();
          if (props.clearFilterAfterSelect)
            patternRef.value = "";
        }
      } else {
        if (keys.length) {
          doUpdateValue(keys[0], options[0] || null, {
            node,
            action
          });
        } else {
          doUpdateValue(null, null, {
            node,
            action
          });
        }
        closeMenu();
        focusSelection();
      }
    }
    function handleUpdateIndeterminateKeys(keys) {
      if (props.checkable) {
        doUpdateIndeterminateKeys(keys, getOptionsByKeys(keys));
      }
    }
    function handleTriggerFocus(e) {
      var _a;
      if ((_a = menuElRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))
        return;
      focusedRef.value = true;
      doFocus(e);
    }
    function handleTriggerBlur(e) {
      var _a;
      if ((_a = menuElRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))
        return;
      focusedRef.value = false;
      doBlur(e);
    }
    function handleMenuFocusin(e) {
      var _a, _b, _c;
      if (((_a = menuElRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget)) || ((_c = (_b = triggerInstRef.value) === null || _b === void 0 ? void 0 : _b.$el) === null || _c === void 0 ? void 0 : _c.contains(e.relatedTarget))) {
        return;
      }
      focusedRef.value = true;
      doFocus(e);
    }
    function handleMenuFocusout(e) {
      var _a, _b, _c;
      if (((_a = menuElRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget)) || ((_c = (_b = triggerInstRef.value) === null || _b === void 0 ? void 0 : _b.$el) === null || _c === void 0 ? void 0 : _c.contains(e.relatedTarget))) {
        return;
      }
      focusedRef.value = false;
      doBlur(e);
    }
    function handleClear(e) {
      e.stopPropagation();
      const {
        multiple
      } = props;
      if (!multiple && props.filterable) {
        closeMenu();
      }
      if (multiple) {
        doUpdateValue([], [], {
          node: null,
          action: "clear"
        });
      } else {
        doUpdateValue(null, null, {
          node: null,
          action: "clear"
        });
      }
    }
    function handleDeleteOption(option) {
      const {
        value: mergedValue
      } = mergedValueRef;
      if (Array.isArray(mergedValue)) {
        const {
          value: treeMate
        } = dataTreeMateRef;
        const {
          checkedKeys: checkedKeysValue
        } = treeMate.getCheckedKeys(mergedValue, {
          cascade: mergedCascadeRef.value,
          allowNotLoaded: props.allowCheckingNotLoaded
        });
        const index = checkedKeysValue.findIndex((key) => key === option.value);
        if (~index) {
          const checkedKeyToBeRemoved = checkedKeysValue[index];
          const checkOptionToBeRemoved = getOptionsByKeys([checkedKeyToBeRemoved])[0];
          if (props.checkable) {
            const {
              checkedKeys
            } = treeMate.uncheck(option.value, checkedKeysValue, {
              checkStrategy: props.checkStrategy,
              cascade: mergedCascadeRef.value,
              allowNotLoaded: props.allowCheckingNotLoaded
            });
            doUpdateValue(checkedKeys, getOptionsByKeys(checkedKeys), {
              node: checkOptionToBeRemoved,
              action: "delete"
            });
          } else {
            const nextValue = Array.from(checkedKeysValue);
            nextValue.splice(index, 1);
            doUpdateValue(nextValue, getOptionsByKeys(nextValue), {
              node: checkOptionToBeRemoved,
              action: "delete"
            });
          }
        }
      }
    }
    function handlePatternInput(e) {
      const {
        value
      } = e.target;
      patternRef.value = value;
    }
    function treeHandleKeydown(e) {
      const {
        value: treeInst
      } = treeInstRef;
      if (treeInst) {
        return treeInst.handleKeydown(e);
      }
      return {
        enterBehavior: null
      };
    }
    function handleKeydown(e) {
      if (e.key === "Enter") {
        if (mergedShowRef.value) {
          const {
            enterBehavior
          } = treeHandleKeydown(e);
          if (!props.multiple) {
            switch (enterBehavior) {
              case "default":
              case "toggleSelect":
                closeMenu();
                focusSelection();
                break;
            }
          }
        } else {
          openMenu();
        }
        e.preventDefault();
      } else if (e.key === "Escape") {
        if (mergedShowRef.value) {
          markEventEffectPerformed(e);
          closeMenu();
          focusSelection();
        }
      } else {
        if (mergedShowRef.value) {
          treeHandleKeydown(e);
        } else if (e.key === "ArrowDown") {
          openMenu();
        }
      }
    }
    function handleTabOut() {
      closeMenu();
      focusSelection();
    }
    function handleMenuMousedown(e) {
      if (!happensIn(e, "action"))
        e.preventDefault();
    }
    const selectionRenderTagRef = computed(() => {
      const {
        renderTag
      } = props;
      if (!renderTag)
        return void 0;
      return function selectionRenderTag({
        option,
        handleClose
      }) {
        const {
          value
        } = option;
        if (value !== void 0) {
          const treeOption = dataTreeMateRef.value.getNode(value);
          if (treeOption) {
            return renderTag({
              option: treeOption.rawNode,
              handleClose
            });
          }
        }
        return value;
      };
    });
    provide(treeSelectInjectionKey, {
      pendingNodeKeyRef,
      dataTreeMate: dataTreeMateRef
    });
    function handleTriggerOrMenuResize() {
      var _a;
      if (!mergedShowRef.value)
        return;
      (_a = followerInstRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
    }
    const mergedCheckStrategyRef = useMergedCheckStrategy(props);
    const exposedCheckedStatusRef = computed(() => {
      if (props.checkable) {
        const mergedValue = mergedValueRef.value;
        if (props.multiple && Array.isArray(mergedValue)) {
          return dataTreeMateRef.value.getCheckedKeys(mergedValue, {
            cascade: props.cascade,
            checkStrategy: mergedCheckStrategyRef.value,
            allowNotLoaded: props.allowCheckingNotLoaded
          });
        } else {
          return {
            checkedKeys: Array.isArray(mergedValue) || mergedValue === null ? [] : [mergedValue],
            indeterminateKeys: []
          };
        }
      }
      return {
        checkedKeys: [],
        indeterminateKeys: []
      };
    });
    const exposedMethods = {
      getCheckedData: () => {
        const {
          checkedKeys
        } = exposedCheckedStatusRef.value;
        return {
          keys: checkedKeys,
          options: getOptionsByKeys(checkedKeys)
        };
      },
      getIndeterminateData: () => {
        const {
          indeterminateKeys
        } = exposedCheckedStatusRef.value;
        return {
          keys: indeterminateKeys,
          options: getOptionsByKeys(indeterminateKeys)
        };
      },
      focus: () => {
        var _a;
        return (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      },
      focusInput: () => {
        var _a;
        return (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.focusInput();
      },
      blur: () => {
        var _a;
        return (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.blur();
      },
      blurInput: () => {
        var _a;
        return (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.blurInput();
      }
    };
    const themeRef = useTheme("TreeSelect", "-tree-select", style, treeSelectLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: {
          menuBoxShadow,
          menuBorderRadius,
          menuColor,
          menuHeight,
          actionPadding,
          actionDividerColor,
          actionTextColor
        }
      } = themeRef.value;
      return {
        "--n-menu-box-shadow": menuBoxShadow,
        "--n-menu-border-radius": menuBorderRadius,
        "--n-menu-color": menuColor,
        "--n-menu-height": menuHeight,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-action-padding": actionPadding,
        "--n-action-text-color": actionTextColor,
        "--n-action-divider-color": actionDividerColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("tree-select", void 0, cssVarsRef, props) : void 0;
    const menuPaddingRef = computed(() => {
      const {
        self: {
          menuPadding
        }
      } = themeRef.value;
      return menuPadding;
    });
    return Object.assign(Object.assign({}, exposedMethods), {
      menuElRef,
      mergedStatus: mergedStatusRef,
      triggerInstRef,
      followerInstRef,
      treeInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      mergedShow: mergedShowRef,
      namespace: namespaceRef,
      adjustedTo: useAdjustedTo(props),
      isMounted: useIsMounted(),
      focused: focusedRef,
      menuPadding: menuPaddingRef,
      mergedPlaceholder: mergedPlaceholderRef,
      mergedExpandedKeys: mergedExpandedKeysRef,
      treeSelectedKeys: treeSelectedKeysRef,
      treeCheckedKeys: treeCheckedKeysRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      selectedOption: selectedOptionRef,
      selectedOptions: selectedOptionsRef,
      pattern: patternRef,
      pendingNodeKey: pendingNodeKeyRef,
      mergedCascade: mergedCascadeRef,
      mergedFilter: mergedFilterRef,
      selectionRenderTag: selectionRenderTagRef,
      handleTriggerOrMenuResize,
      doUpdateExpandedKeys,
      handleMenuLeave,
      handleTriggerClick,
      handleMenuClickoutside,
      handleUpdateCheckedKeys,
      handleUpdateIndeterminateKeys,
      handleTriggerFocus,
      handleTriggerBlur,
      handleMenuFocusin,
      handleMenuFocusout,
      handleClear,
      handleDeleteOption,
      handlePatternInput,
      handleKeydown,
      handleTabOut,
      handleMenuMousedown,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    const {
      mergedTheme,
      mergedClsPrefix,
      $slots
    } = this;
    return h("div", {
      class: `${mergedClsPrefix}-tree-select`
    }, h(VBinder, null, {
      default: () => [h(VTarget, null, {
        default: () => h(NInternalSelection, {
          ref: "triggerInstRef",
          onResize: this.handleTriggerOrMenuResize,
          status: this.mergedStatus,
          focused: this.focused,
          clsPrefix: mergedClsPrefix,
          theme: mergedTheme.peers.InternalSelection,
          themeOverrides: mergedTheme.peerOverrides.InternalSelection,
          ellipsisTagPopoverProps: this.ellipsisTagPopoverProps,
          renderTag: this.selectionRenderTag,
          selectedOption: this.selectedOption,
          selectedOptions: this.selectedOptions,
          size: this.mergedSize,
          bordered: this.bordered,
          placeholder: this.mergedPlaceholder,
          disabled: this.mergedDisabled,
          active: this.mergedShow,
          loading: this.loading,
          multiple: this.multiple,
          maxTagCount: this.maxTagCount,
          showArrow: true,
          filterable: this.filterable,
          clearable: this.clearable,
          pattern: this.pattern,
          onPatternInput: this.handlePatternInput,
          onClear: this.handleClear,
          onClick: this.handleTriggerClick,
          onFocus: this.handleTriggerFocus,
          onBlur: this.handleTriggerBlur,
          onDeleteOption: this.handleDeleteOption,
          onKeydown: this.handleKeydown
        }, {
          arrow: () => {
            var _a, _b;
            return [(_b = (_a = this.$slots).arrow) === null || _b === void 0 ? void 0 : _b.call(_a)];
          }
        })
      }), h(VFollower, {
        ref: "followerInstRef",
        show: this.mergedShow,
        placement: this.placement,
        to: this.adjustedTo,
        teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey,
        containerClass: this.namespace,
        width: this.consistentMenuWidth ? "target" : void 0,
        minWidth: "target"
      }, {
        default: () => h(Transition, {
          name: "fade-in-scale-up-transition",
          appear: this.isMounted,
          onLeave: this.handleMenuLeave
        }, {
          default: () => {
            var _a;
            if (!this.mergedShow)
              return null;
            const {
              mergedClsPrefix: mergedClsPrefix2,
              checkable,
              multiple,
              menuProps,
              options
            } = this;
            (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
            return withDirectives(h("div", Object.assign({}, menuProps, {
              class: [`${mergedClsPrefix2}-tree-select-menu`, menuProps === null || menuProps === void 0 ? void 0 : menuProps.class, this.themeClass],
              ref: "menuElRef",
              style: [(menuProps === null || menuProps === void 0 ? void 0 : menuProps.style) || "", this.cssVars],
              tabindex: 0,
              onMousedown: this.handleMenuMousedown,
              onKeydown: this.handleKeydown,
              onFocusin: this.handleMenuFocusin,
              onFocusout: this.handleMenuFocusout
            }), h(NTree, {
              ref: "treeInstRef",
              blockLine: true,
              allowCheckingNotLoaded: this.allowCheckingNotLoaded,
              showIrrelevantNodes: false,
              animated: false,
              pattern: this.pattern,
              getChildren: this.getChildren,
              filter: this.mergedFilter,
              data: options,
              cancelable: multiple,
              labelField: this.labelField,
              keyField: this.keyField,
              disabledField: this.disabledField,
              childrenField: this.childrenField,
              theme: mergedTheme.peers.Tree,
              themeOverrides: mergedTheme.peerOverrides.Tree,
              defaultExpandAll: this.defaultExpandAll,
              defaultExpandedKeys: this.defaultExpandedKeys,
              expandedKeys: this.mergedExpandedKeys,
              checkedKeys: this.treeCheckedKeys,
              selectedKeys: this.treeSelectedKeys,
              checkable,
              checkStrategy: this.checkStrategy,
              cascade: this.mergedCascade,
              leafOnly: this.leafOnly,
              multiple: this.multiple,
              renderLabel: this.renderLabel,
              renderPrefix: this.renderPrefix,
              renderSuffix: this.renderSuffix,
              renderSwitcherIcon: this.renderSwitcherIcon,
              nodeProps: this.nodeProps,
              watchProps: this.watchProps,
              virtualScroll: this.consistentMenuWidth && this.virtualScroll,
              overrideDefaultNodeClickBehavior: this.overrideDefaultNodeClickBehavior,
              internalTreeSelect: true,
              internalUnifySelectCheck: true,
              internalScrollable: true,
              internalScrollablePadding: this.menuPadding,
              internalFocusable: false,
              internalCheckboxFocusable: false,
              internalRenderEmpty: () => h("div", {
                class: `${mergedClsPrefix2}-tree-select-menu__empty`
              }, resolveSlot($slots.empty, () => [h(NEmpty, {
                theme: mergedTheme.peers.Empty,
                themeOverrides: mergedTheme.peerOverrides.Empty
              })])),
              onLoad: this.onLoad,
              onUpdateCheckedKeys: this.handleUpdateCheckedKeys,
              onUpdateIndeterminateKeys: this.handleUpdateIndeterminateKeys,
              onUpdateExpandedKeys: this.doUpdateExpandedKeys
            }), resolveWrappedSlot($slots.action, (children) => {
              return children ? h("div", {
                class: `${mergedClsPrefix2}-tree-select-menu__action`,
                "data-action": true
              }, children) : null;
            }), h(FocusDetector, {
              onFocus: this.handleTabOut
            })), [[clickoutside, this.handleMenuClickoutside, void 0, {
              capture: true
            }]]);
          }
        })
      })]
    }));
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "product-loading-skeleton",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex gap-3 p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(NSkeleton), {
        width: 129,
        height: 120
      }, null, _parent));
      _push(`<div class="flex flex-col gap-2">`);
      _push(ssrRenderComponent(unref(NSkeleton), {
        width: 200,
        height: 20
      }, null, _parent));
      _push(ssrRenderComponent(unref(NSkeleton), {
        width: 50,
        height: 30
      }, null, _parent));
      _push(ssrRenderComponent(unref(NSkeleton), {
        width: 220,
        height: 15
      }, null, _parent));
      _push(ssrRenderComponent(unref(NSkeleton), {
        width: 200,
        height: 15
      }, null, _parent));
      _push(`<div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(NSkeleton), {
        repeat: 2,
        width: "200",
        text: ""
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product-loading-skeleton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useFilterStore = defineStore("filter-products", {
  state: () => {
    return {
      filterValues: {
        category: null,
        modification: null,
        manufacturer: null,
        axleConfiguration: null,
        bodyType: null,
        capacity: null,
        driveType: null,
        engineDisplacement: null,
        fuelType: null,
        gearType: null,
        numberOfCycle: null,
        numberOfValves: null,
        power: null,
        steeringType: null,
        vinCode: null
      },
      filterData: {}
    };
  },
  actions: {
    loadFilters() {
      axiosInstance.get("/api/car/filters/").then((res) => {
        this.filterData = res.data;
      });
    }
  },
  getters: {
    filtersForm: (state) => {
      const filterForm = [];
      Object.keys(state.filterData).forEach((key) => {
        let type;
        let options;
        let title;
        switch (key) {
          case "axleConfiguration":
            type = "radio";
            options = state.filterData[key].map((item) => {
              return { label: item.name, value: item.id };
            });
            title = "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u043E\u0441\u0438";
            break;
          case "bodyType":
            type = "radio";
            options = state.filterData[key].map((item) => {
              return { label: item.name, value: item.id };
            });
            title = "\u0422\u0438\u043F \u043A\u0443\u0437\u043E\u0432\u0430";
            break;
          case "capacity":
            type = "select";
            options = state.filterData[key].map((item) => {
              return { label: item, value: item };
            });
            title = "E\u043C\u043A\u043E\u0441\u0442\u044C";
            break;
          case "driveType":
            type = "radio";
            options = state.filterData[key].map((item) => {
              return { label: item.name, value: item.id };
            });
            title = "\u0422\u0438\u043F \u0434\u0438\u0441\u043A\u0430";
            break;
          case "engineDisplacement":
            type = "select";
            options = state.filterData[key].map((item) => {
              return { label: item, value: item };
            });
            title = "\u041E\u0431\u044A\u0435\u043C \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044F";
            break;
          case "fuelType":
            type = "radio";
            options = state.filterData[key].map((item) => {
              return { label: item.name, value: item.id };
            });
            title = "\u0422\u0438\u043F \u0442\u043E\u043F\u043B\u0438\u0432\u0430";
            break;
          case "gearType":
            type = "radio";
            options = state.filterData[key].map((item) => {
              return { label: item.name, value: item.id };
            });
            title = "\u0422\u0438\u043F \u0448\u0435\u0441\u0442\u0435\u0440\u043D\u0438";
            break;
          case "numberOfCycle":
            type = "select";
            options = state.filterData[key].map((item) => {
              return { label: item, value: item };
            });
            title = "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0446\u0438\u043A\u043B\u043E\u0432";
            break;
          case "numberOfValves":
            type = "select";
            options = state.filterData[key].map((item) => {
              return { label: item, value: item };
            });
            title = "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u043B\u0430\u043F\u0430\u043D\u043E\u0432";
            break;
          case "power":
            type = "select";
            options = state.filterData[key].map((item) => {
              return { label: item, value: item };
            });
            title = "\u041C\u043E\u0449\u043D\u043E\u0441\u0442\u044C";
            break;
          case "steeringType":
            type = "radio";
            options = state.filterData[key].map((item) => {
              return { label: item.name, value: item.id };
            });
            title = "\u0422\u0438\u043F \u0440\u0443\u043B\u0435\u0432\u043E\u0433\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F";
            break;
          case "vinCode":
            type = "select";
            options = state.filterData[key].map((item) => {
              return { label: item, value: item };
            });
            title = "\u0412\u0438\u043D\u043A\u043E\u0434";
            break;
        }
        filterForm.push({
          type,
          title,
          options,
          key
        });
      });
      return filterForm;
    }
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "filter-form",
  __ssrInlineRender: true,
  setup(__props) {
    const filterStore = useFilterStore();
    const categoryStore = useCategoryStore();
    const manufacturerStore = useManufacturerStore();
    const formRef = ref();
    function handleUpdateValue(value, _) {
      filterStore.filterValues.category = value.join(",");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(NForm), mergeProps({
        model: unref(filterStore).filterValues,
        ref_key: "formRef",
        ref: formRef
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(NFormItem), { label: "\u0418\u0441\u043A\u0430\u0442\u044C \u043F\u043E \u043C\u043E\u0434\u0435\u043B\u0438" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(NSelect), {
                    placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B",
                    filterable: "",
                    options: unref(manufacturerStore).manufacturerOptions,
                    value: unref(filterStore).filterValues.manufacturer,
                    "onUpdate:value": ($event) => unref(filterStore).filterValues.manufacturer = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(NSelect), {
                      placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B",
                      filterable: "",
                      options: unref(manufacturerStore).manufacturerOptions,
                      value: unref(filterStore).filterValues.manufacturer,
                      "onUpdate:value": ($event) => unref(filterStore).filterValues.manufacturer = $event
                    }, null, 8, ["options", "value", "onUpdate:value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(NFormItem), { label: "\u0418\u0441\u043A\u0430\u0442\u044C \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(NTreeSelect), {
                    placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B",
                    multiple: "",
                    cascade: "",
                    filterable: "",
                    checkable: "",
                    "check-strategy": "all",
                    options: unref(categoryStore).categoriesTreeOptions,
                    value: unref(filterStore).filterValues.category != null ? unref(filterStore).filterValues.category.split(",").map((item) => parseInt(item)) : [],
                    "onUpdate:value": handleUpdateValue
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(NTreeSelect), {
                      placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B",
                      multiple: "",
                      cascade: "",
                      filterable: "",
                      checkable: "",
                      "check-strategy": "all",
                      options: unref(categoryStore).categoriesTreeOptions,
                      value: unref(filterStore).filterValues.category != null ? unref(filterStore).filterValues.category.split(",").map((item) => parseInt(item)) : [],
                      "onUpdate:value": handleUpdateValue
                    }, null, 8, ["options", "value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><!--[-->`);
            ssrRenderList(unref(filterStore).filtersForm, (fields) => {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(unref(NFormItem), {
                label: fields.title,
                path: fields.key
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (fields.type == "select") {
                      _push3(ssrRenderComponent(unref(NSelect), {
                        multiple: "",
                        placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D \u0438\u0437 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432",
                        value: unref(filterStore).filterValues[fields.key],
                        "onUpdate:value": ($event) => unref(filterStore).filterValues[fields.key] = $event,
                        options: fields.options
                      }, null, _parent3, _scopeId2));
                    } else if (fields.type == "radio") {
                      _push3(ssrRenderComponent(unref(NRadioGroup), {
                        class: "grid grid-cols-3 gap-1",
                        value: unref(filterStore).filterValues[fields.key],
                        "onUpdate:value": ($event) => unref(filterStore).filterValues[fields.key] = $event,
                        name: fields.key
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(fields.options, (option) => {
                              _push4(ssrRenderComponent(unref(NRadio), {
                                key: option.value,
                                value: option.value,
                                label: option.label
                              }, null, _parent4, _scopeId3));
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(fields.options, (option) => {
                                return openBlock(), createBlock(unref(NRadio), {
                                  key: option.value,
                                  value: option.value,
                                  label: option.label
                                }, null, 8, ["value", "label"]);
                              }), 128))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      fields.type == "select" ? (openBlock(), createBlock(unref(NSelect), {
                        key: 0,
                        multiple: "",
                        placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D \u0438\u0437 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432",
                        value: unref(filterStore).filterValues[fields.key],
                        "onUpdate:value": ($event) => unref(filterStore).filterValues[fields.key] = $event,
                        options: fields.options
                      }, null, 8, ["value", "onUpdate:value", "options"])) : fields.type == "radio" ? (openBlock(), createBlock(unref(NRadioGroup), {
                        key: 1,
                        class: "grid grid-cols-3 gap-1",
                        value: unref(filterStore).filterValues[fields.key],
                        "onUpdate:value": ($event) => unref(filterStore).filterValues[fields.key] = $event,
                        name: fields.key
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(fields.options, (option) => {
                            return openBlock(), createBlock(unref(NRadio), {
                              key: option.value,
                              value: option.value,
                              label: option.label
                            }, null, 8, ["value", "label"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["value", "onUpdate:value", "name"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(unref(NFormItem), { label: "\u0418\u0441\u043A\u0430\u0442\u044C \u043F\u043E \u043C\u043E\u0434\u0435\u043B\u0438" }, {
                  default: withCtx(() => [
                    createVNode(unref(NSelect), {
                      placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B",
                      filterable: "",
                      options: unref(manufacturerStore).manufacturerOptions,
                      value: unref(filterStore).filterValues.manufacturer,
                      "onUpdate:value": ($event) => unref(filterStore).filterValues.manufacturer = $event
                    }, null, 8, ["options", "value", "onUpdate:value"])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", null, [
                createVNode(unref(NFormItem), { label: "\u0418\u0441\u043A\u0430\u0442\u044C \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" }, {
                  default: withCtx(() => [
                    createVNode(unref(NTreeSelect), {
                      placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B",
                      multiple: "",
                      cascade: "",
                      filterable: "",
                      checkable: "",
                      "check-strategy": "all",
                      options: unref(categoryStore).categoriesTreeOptions,
                      value: unref(filterStore).filterValues.category != null ? unref(filterStore).filterValues.category.split(",").map((item) => parseInt(item)) : [],
                      "onUpdate:value": handleUpdateValue
                    }, null, 8, ["options", "value"])
                  ]),
                  _: 1
                })
              ]),
              (openBlock(true), createBlock(Fragment, null, renderList(unref(filterStore).filtersForm, (fields) => {
                return openBlock(), createBlock("div", null, [
                  createVNode(unref(NFormItem), {
                    label: fields.title,
                    path: fields.key
                  }, {
                    default: withCtx(() => [
                      fields.type == "select" ? (openBlock(), createBlock(unref(NSelect), {
                        key: 0,
                        multiple: "",
                        placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D \u0438\u0437 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432",
                        value: unref(filterStore).filterValues[fields.key],
                        "onUpdate:value": ($event) => unref(filterStore).filterValues[fields.key] = $event,
                        options: fields.options
                      }, null, 8, ["value", "onUpdate:value", "options"])) : fields.type == "radio" ? (openBlock(), createBlock(unref(NRadioGroup), {
                        key: 1,
                        class: "grid grid-cols-3 gap-1",
                        value: unref(filterStore).filterValues[fields.key],
                        "onUpdate:value": ($event) => unref(filterStore).filterValues[fields.key] = $event,
                        name: fields.key
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(fields.options, (option) => {
                            return openBlock(), createBlock(unref(NRadio), {
                              key: option.value,
                              value: option.value,
                              label: option.label
                            }, null, 8, ["value", "label"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["value", "onUpdate:value", "name"])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["label", "path"])
                ]);
              }), 256))
            ];
          }
        }),
        _: 1
      }, _parent));
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
  __name: "catalog",
  __ssrInlineRender: true,
  setup(__props) {
    const productStore = useProductStore();
    const filterStore = useFilterStore();
    const breadcrumbs = ref([
      {
        "text": "\u0413\u043B\u0430\u0432\u043D\u0430\u044F",
        "link": null
      },
      {
        "text": "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439",
        "link": null
      }
    ]);
    const sortOptions = [
      { label: "\u0421\u0430\u043C\u044B\u0435 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435", key: 1 },
      { label: "\u041B\u0443\u0447\u0448\u0438\u0439 \u0440\u0435\u0439\u0442\u0438\u043D\u0433", key: 2 },
      { label: "\u041D\u043E\u0432\u0438\u043D\u043A\u0438", key: 3 },
      { label: "\u0426\u0435\u043D\u0430: \u043F\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430\u043D\u0438\u044E", key: 4 },
      { label: "\u0426\u0435\u043D\u0430: \u043F\u043E \u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E", key: 5 }
    ];
    useRoute();
    const router = useRouter();
    function handleBack() {
      router.back();
    }
    watch(filterStore.filterValues, (state) => {
      productStore.loadProducts(state);
    });
    const mobileFiltersOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_product_loading_skeleton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(NDrawer), {
        "z-index": 1e4,
        show: mobileFiltersOpen.value,
        "onUpdate:show": ($event) => mobileFiltersOpen.value = $event,
        width: "100%"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(NDrawerContent), {
              title: "\u041F\u043E\u0438\u0441\u043A \u0437\u0430\u043F\u0447\u0435\u0441\u0442\u0435\u0439",
              closable: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(NDrawerContent), {
                title: "\u041F\u043E\u0438\u0441\u043A \u0437\u0430\u043F\u0447\u0435\u0441\u0442\u0435\u0439",
                closable: ""
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<main class="mx-auto container px-4 mt-4">`);
      _push(ssrRenderComponent(unref(NPageHeader), { onBack: handleBack }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u041F\u043E\u0438\u0441\u043A \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0435\u0439 `);
          } else {
            return [
              createTextVNode(" \u041F\u043E\u0438\u0441\u043A \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0435\u0439 ")
            ];
          }
        }),
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(NBreadcrumb), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(breadcrumbs.value, (option) => {
                    _push3(ssrRenderComponent(unref(NBreadcrumbItem), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(option.text)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(option.text), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(breadcrumbs.value, (option) => {
                      return openBlock(), createBlock(unref(NBreadcrumbItem), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(option.text), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 256))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(NBreadcrumb), null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(breadcrumbs.value, (option) => {
                    return openBlock(), createBlock(unref(NBreadcrumbItem), null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(option.text), 1)
                      ]),
                      _: 2
                    }, 1024);
                  }), 256))
                ]),
                _: 1
              })
            ];
          }
        }),
        extra: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(NDropdown), {
              trigger: "hover",
              options: sortOptions,
              placement: "bottom-start"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Button), {
                    bordered: false,
                    style: { "padding": "0 4px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430 `);
                      } else {
                        return [
                          createTextVNode(" \u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Button), {
                      bordered: false,
                      style: { "padding": "0 4px" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430 ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Button), {
              tertiary: "",
              round: "",
              onClick: ($event) => mobileFiltersOpen.value = !mobileFiltersOpen.value
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(NIcon), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FunnelIcon), {
                          class: "h-5 w-5",
                          "aria-hidden": "true"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(FunnelIcon), {
                            class: "h-5 w-5",
                            "aria-hidden": "true"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(NIcon), null, {
                      default: withCtx(() => [
                        createVNode(unref(FunnelIcon), {
                          class: "h-5 w-5",
                          "aria-hidden": "true"
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-2" }, [
                createVNode(unref(NDropdown), {
                  trigger: "hover",
                  options: sortOptions,
                  placement: "bottom-start"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(Button), {
                      bordered: false,
                      style: { "padding": "0 4px" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430 ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(Button), {
                  tertiary: "",
                  round: "",
                  onClick: ($event) => mobileFiltersOpen.value = !mobileFiltersOpen.value
                }, {
                  icon: withCtx(() => [
                    createVNode(unref(NIcon), null, {
                      default: withCtx(() => [
                        createVNode(unref(FunnelIcon), {
                          class: "h-5 w-5",
                          "aria-hidden": "true"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section aria-labelledby="products-heading" class="pb-24 mt-4"><div class="grid grid-cols-1 relative gap-3 lg:mt-3 items-start lg:grid-cols-[450px_1fr]">`);
      _push(ssrRenderComponent(unref(NCard), { class: "hidden lg:block sticky -top-[500px]" }, {
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
      _push(`<div>`);
      if (unref(productStore).isLoadingProducts && unref(productStore).products.length == 0) {
        _push(`<div class="grid gap-3"><!--[-->`);
        ssrRenderList(Array.from({ length: 10 }, (_, i) => i + 1), (item) => {
          _push(ssrRenderComponent(_component_product_loading_skeleton, null, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(productStore).products.length > 0) {
        _push(`<div class="${ssrRenderClass([{ "opacity-40": unref(productStore).isLoadingProducts }, "relative grid gap-3"])}"><!--[-->`);
        ssrRenderList(unref(productStore).products, (item) => {
          _push(ssrRenderComponent(_sfc_main$3, { item }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div> \u0417\u0430\u043F\u0447\u0430\u0441\u0442\u0435\u0439 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E </div>`);
      }
      _push(`</div></div></section></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/catalog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=catalog-CaQexDFS.mjs.map
