import{i as He,d as se,e as p,f as C,c as n,u as W,j as ae,R as U,C as Oe,U as Te,av as Y,n as Ie,K as Pe,G as Fe,J as Me,aw as De,ag as le,a4 as We,b as j,g as O,as as je,a3 as Ne,y as G,at as Le,s as H,ax as _e,au as Ae,N as Ue}from"./Bq_GEINd.js";import{r as B,E as Xe,h as de,j as V,v as Ye,n as N,z as K,C as S,I as Ve,y as c,H as ce,s as ue,f as Ke,A as D,L as X,aa as J,T as he,B as Z,ac as qe}from"./CBD-eXxQ.js";let T=0,Q="",ee="",te="",oe="";const re=B("0px");function Ge(e){if(typeof document>"u")return;const t=document.documentElement;let o,a=!1;const d=()=>{t.style.marginRight=Q,t.style.overflow=ee,t.style.overflowX=te,t.style.overflowY=oe,re.value="0px"};Xe(()=>{o=de(e,l=>{if(l){if(!T){const i=window.innerWidth-t.offsetWidth;i>0&&(Q=t.style.marginRight,t.style.marginRight=`${i}px`,re.value=`${i}px`),ee=t.style.overflow,te=t.style.overflowX,oe=t.style.overflowY,t.style.overflow="hidden",t.style.overflowX="hidden",t.style.overflowY="hidden"}a=!0,T++}else T--,T||d(),a=!1},{immediate:!0})}),V(()=>{o==null||o(),a&&(T--,T||d(),a=!1)})}const q=B(!1);function ne(){q.value=!0}function ie(){q.value=!1}let P=0;function Je(){return He&&(Ye(()=>{P||(window.addEventListener("compositionstart",ne),window.addEventListener("compositionend",ie)),P++}),V(()=>{P<=1?(window.removeEventListener("compositionstart",ne),window.removeEventListener("compositionend",ie),P=0):P--})),q}function Ze(e){const{textColorBase:t,opacity1:o,opacity2:a,opacity3:d,opacity4:l,opacity5:i}=e;return{color:t,opacity1Depth:o,opacity2Depth:a,opacity3Depth:d,opacity4Depth:l,opacity5Depth:i}}const Qe={name:"Icon",common:se,self:Ze},et=p("icon",`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`,[C("color-transition",{transition:"color .3s var(--n-bezier)"}),C("depth",{color:"var(--n-color)"},[n("svg",{opacity:"var(--n-opacity)",transition:"opacity .3s var(--n-bezier)"})]),n("svg",{height:"1em",width:"1em"})]),tt=Object.assign(Object.assign({},W.props),{depth:[String,Number],size:[Number,String],color:String,component:Object}),St=N({_n_icon__:!0,name:"Icon",inheritAttrs:!1,props:tt,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=K(e),a=W("Icon","-icon",et,Qe,e,t),d=S(()=>{const{depth:i}=e,{common:{cubicBezierEaseInOut:h},self:m}=a.value;if(i!==void 0){const{color:w,[`opacity${i}Depth`]:z}=m;return{"--n-bezier":h,"--n-color":w,"--n-opacity":z}}return{"--n-bezier":h,"--n-color":"","--n-opacity":""}}),l=o?ae("icon",S(()=>`${e.depth||"d"}`),d,e):void 0;return{mergedClsPrefix:t,mergedStyle:S(()=>{const{size:i,color:h}=e;return{fontSize:U(i),color:h}}),cssVars:o?void 0:d,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){var e;const{$parent:t,depth:o,mergedClsPrefix:a,component:d,onRender:l,themeClass:i}=this;return!((e=t==null?void 0:t.$options)===null||e===void 0)&&e._n_icon__&&Ve("icon","don't wrap `n-icon` inside `n-icon`"),l==null||l(),c("i",ce(this.$attrs,{role:"img",class:[`${a}-icon`,i,{[`${a}-icon--depth`]:o,[`${a}-icon--color-transition`]:o!==void 0}],style:[this.cssVars,this.mergedStyle]}),d?c(d):this.$slots)}});function ot(e){const{modalColor:t,textColor1:o,textColor2:a,boxShadow3:d,lineHeight:l,fontWeightStrong:i,dividerColor:h,closeColorHover:m,closeColorPressed:w,closeIconColor:z,closeIconColorHover:R,closeIconColorPressed:E,borderRadius:$,primaryColorHover:b}=e;return{bodyPadding:"16px 24px",borderRadius:$,headerPadding:"16px 24px",footerPadding:"16px 24px",color:t,textColor:a,titleTextColor:o,titleFontSize:"18px",titleFontWeight:i,boxShadow:d,lineHeight:l,headerBorderBottom:`1px solid ${h}`,footerBorderTop:`1px solid ${h}`,closeIconColor:z,closeIconColorHover:R,closeIconColorPressed:E,closeSize:"22px",closeIconSize:"18px",closeColorHover:m,closeColorPressed:w,closeBorderRadius:$,resizableTriggerColorHover:b}}const rt=Oe({name:"Drawer",common:se,peers:{Scrollbar:Te},self:ot}),nt=N({name:"NDrawerContent",inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){const t=B(!!e.show),o=B(null),a=ue(Y);let d=0,l="",i=null;const h=B(!1),m=B(!1),w=S(()=>e.placement==="top"||e.placement==="bottom"),{mergedClsPrefixRef:z,mergedRtlRef:R}=K(e),E=Ie("Drawer",R,z),$=r,b=s=>{m.value=!0,d=w.value?s.clientY:s.clientX,l=document.body.style.cursor,document.body.style.cursor=w.value?"ns-resize":"ew-resize",document.body.addEventListener("mousemove",x),document.body.addEventListener("mouseleave",$),document.body.addEventListener("mouseup",r)},F=()=>{i!==null&&(window.clearTimeout(i),i=null),m.value?h.value=!0:i=window.setTimeout(()=>{h.value=!0},300)},L=()=>{i!==null&&(window.clearTimeout(i),i=null),h.value=!1},{doUpdateHeight:_,doUpdateWidth:A}=a,I=s=>{const{maxWidth:f}=e;if(f&&s>f)return f;const{minWidth:v}=e;return v&&s<v?v:s},M=s=>{const{maxHeight:f}=e;if(f&&s>f)return f;const{minHeight:v}=e;return v&&s<v?v:s};function x(s){var f,v;if(m.value)if(w.value){let y=((f=o.value)===null||f===void 0?void 0:f.offsetHeight)||0;const k=d-s.clientY;y+=e.placement==="bottom"?k:-k,y=M(y),_(y),d=s.clientY}else{let y=((v=o.value)===null||v===void 0?void 0:v.offsetWidth)||0;const k=d-s.clientX;y+=e.placement==="right"?k:-k,y=I(y),A(y),d=s.clientX}}function r(){m.value&&(d=0,m.value=!1,document.body.style.cursor=l,document.body.removeEventListener("mousemove",x),document.body.removeEventListener("mouseup",r),document.body.removeEventListener("mouseleave",$))}Ke(()=>{e.show&&(t.value=!0)}),de(()=>e.show,s=>{s||r()}),V(()=>{r()});const u=S(()=>{const{show:s}=e,f=[[J,s]];return e.showMask||f.push([We,e.onClickoutside,void 0,{capture:!0}]),f});function g(){var s;t.value=!1,(s=e.onAfterLeave)===null||s===void 0||s.call(e)}return Ge(S(()=>e.blockScroll&&t.value)),D(Pe,o),D(Fe,null),D(Me,null),{bodyRef:o,rtlEnabled:E,mergedClsPrefix:a.mergedClsPrefixRef,isMounted:a.isMountedRef,mergedTheme:a.mergedThemeRef,displayed:t,transitionName:S(()=>({right:"slide-in-from-right-transition",left:"slide-in-from-left-transition",top:"slide-in-from-top-transition",bottom:"slide-in-from-bottom-transition"})[e.placement]),handleAfterLeave:g,bodyDirectives:u,handleMousedownResizeTrigger:b,handleMouseenterResizeTrigger:F,handleMouseleaveResizeTrigger:L,isDragging:m,isHoverOnResizeTrigger:h}},render(){const{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective==="show"||this.displayed||this.show?X(c("div",{role:"none"},c(De,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>c(he,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>X(c("div",ce(this.$attrs,{role:"dialog",ref:"bodyRef","aria-modal":"true",class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?c("div",{class:[`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`],onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger}):null,this.nativeScrollbar?c("div",{class:[`${t}-drawer-content-wrapper`,this.contentClass],style:this.contentStyle,role:"none"},e):c(le,Object.assign({},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),e)]),this.bodyDirectives)})})),[[J,this.displayDirective==="if"||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:it,cubicBezierEaseOut:st}=j;function at({duration:e="0.3s",leaveDuration:t="0.2s",name:o="slide-in-from-right"}={}){return[n(`&.${o}-transition-leave-active`,{transition:`transform ${t} ${it}`}),n(`&.${o}-transition-enter-active`,{transition:`transform ${e} ${st}`}),n(`&.${o}-transition-enter-to`,{transform:"translateX(0)"}),n(`&.${o}-transition-enter-from`,{transform:"translateX(100%)"}),n(`&.${o}-transition-leave-from`,{transform:"translateX(0)"}),n(`&.${o}-transition-leave-to`,{transform:"translateX(100%)"})]}const{cubicBezierEaseIn:lt,cubicBezierEaseOut:dt}=j;function ct({duration:e="0.3s",leaveDuration:t="0.2s",name:o="slide-in-from-left"}={}){return[n(`&.${o}-transition-leave-active`,{transition:`transform ${t} ${lt}`}),n(`&.${o}-transition-enter-active`,{transition:`transform ${e} ${dt}`}),n(`&.${o}-transition-enter-to`,{transform:"translateX(0)"}),n(`&.${o}-transition-enter-from`,{transform:"translateX(-100%)"}),n(`&.${o}-transition-leave-from`,{transform:"translateX(0)"}),n(`&.${o}-transition-leave-to`,{transform:"translateX(-100%)"})]}const{cubicBezierEaseIn:ut,cubicBezierEaseOut:ht}=j;function ft({duration:e="0.3s",leaveDuration:t="0.2s",name:o="slide-in-from-top"}={}){return[n(`&.${o}-transition-leave-active`,{transition:`transform ${t} ${ut}`}),n(`&.${o}-transition-enter-active`,{transition:`transform ${e} ${ht}`}),n(`&.${o}-transition-enter-to`,{transform:"translateY(0)"}),n(`&.${o}-transition-enter-from`,{transform:"translateY(-100%)"}),n(`&.${o}-transition-leave-from`,{transform:"translateY(0)"}),n(`&.${o}-transition-leave-to`,{transform:"translateY(-100%)"})]}const{cubicBezierEaseIn:mt,cubicBezierEaseOut:gt}=j;function bt({duration:e="0.3s",leaveDuration:t="0.2s",name:o="slide-in-from-bottom"}={}){return[n(`&.${o}-transition-leave-active`,{transition:`transform ${t} ${mt}`}),n(`&.${o}-transition-enter-active`,{transition:`transform ${e} ${gt}`}),n(`&.${o}-transition-enter-to`,{transform:"translateY(0)"}),n(`&.${o}-transition-enter-from`,{transform:"translateY(100%)"}),n(`&.${o}-transition-leave-from`,{transform:"translateY(0)"}),n(`&.${o}-transition-leave-to`,{transform:"translateY(100%)"})]}const vt=n([p("drawer",`
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `,[at(),ct(),ft(),bt(),C("unselectable",`
 user-select: none; 
 -webkit-user-select: none;
 `),C("native-scrollbar",[p("drawer-content-wrapper",`
 overflow: auto;
 height: 100%;
 `)]),O("resize-trigger",`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[C("hover",`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),p("drawer-content-wrapper",`
 box-sizing: border-box;
 `),p("drawer-content",`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[C("native-scrollbar",[p("drawer-body-content-wrapper",`
 height: 100%;
 overflow: auto;
 `)]),p("drawer-body",`
 flex: 1 0 0;
 overflow: hidden;
 `),p("drawer-body-content-wrapper",`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),p("drawer-header",`
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `,[O("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),p("drawer-footer",`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),C("right-placement",`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[O("resize-trigger",`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),C("left-placement",`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[O("resize-trigger",`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),C("top-placement",`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[O("resize-trigger",`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),C("bottom-placement",`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[O("resize-trigger",`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),n("body",[n(">",[p("drawer-container",`
 position: fixed;
 `)])]),p("drawer-container",`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[n("> *",`
 pointer-events: all;
 `)]),p("drawer-mask",`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[C("invisible",`
 background-color: rgba(0, 0, 0, 0)
 `),je({enterDuration:"0.2s",leaveDuration:"0.2s",enterCubicBezier:"var(--n-bezier-in)",leaveCubicBezier:"var(--n-bezier-out)"})])]),pt=Object.assign(Object.assign({},W.props),{show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:"right"},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:"if"},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function}),$t=N({name:"Drawer",inheritAttrs:!1,props:pt,setup(e){const{mergedClsPrefixRef:t,namespaceRef:o,inlineThemeDisabled:a}=K(e),d=Ne(),l=W("Drawer","-drawer",vt,rt,e,t),i=B(e.defaultWidth),h=B(e.defaultHeight),m=G(Z(e,"width"),i),w=G(Z(e,"height"),h),z=S(()=>{const{placement:r}=e;return r==="top"||r==="bottom"?"":U(m.value)}),R=S(()=>{const{placement:r}=e;return r==="left"||r==="right"?"":U(w.value)}),E=r=>{const{onUpdateWidth:u,"onUpdate:width":g}=e;u&&H(u,r),g&&H(g,r),i.value=r},$=r=>{const{onUpdateHeight:u,"onUpdate:width":g}=e;u&&H(u,r),g&&H(g,r),h.value=r},b=S(()=>[{width:z.value,height:R.value},e.drawerStyle||""]);function F(r){const{onMaskClick:u,maskClosable:g}=e;g&&I(!1),u&&u(r)}function L(r){F(r)}const _=Je();function A(r){var u;(u=e.onEsc)===null||u===void 0||u.call(e),e.show&&e.closeOnEsc&&_e(r)&&(_.value||I(!1))}function I(r){const{onHide:u,onUpdateShow:g,"onUpdate:show":s}=e;g&&H(g,r),s&&H(s,r),u&&!r&&H(u,r)}D(Y,{isMountedRef:d,mergedThemeRef:l,mergedClsPrefixRef:t,doUpdateShow:I,doUpdateHeight:$,doUpdateWidth:E});const M=S(()=>{const{common:{cubicBezierEaseInOut:r,cubicBezierEaseIn:u,cubicBezierEaseOut:g},self:{color:s,textColor:f,boxShadow:v,lineHeight:y,headerPadding:k,footerPadding:fe,borderRadius:me,bodyPadding:ge,titleFontSize:be,titleTextColor:ve,titleFontWeight:pe,headerBorderBottom:we,footerBorderTop:ye,closeIconColor:Ce,closeIconColorHover:Se,closeIconColorPressed:$e,closeColorHover:ze,closeColorPressed:xe,closeIconSize:Be,closeSize:Re,closeBorderRadius:Ee,resizableTriggerColorHover:ke}}=l.value;return{"--n-line-height":y,"--n-color":s,"--n-border-radius":me,"--n-text-color":f,"--n-box-shadow":v,"--n-bezier":r,"--n-bezier-out":g,"--n-bezier-in":u,"--n-header-padding":k,"--n-body-padding":ge,"--n-footer-padding":fe,"--n-title-text-color":ve,"--n-title-font-size":be,"--n-title-font-weight":pe,"--n-header-border-bottom":we,"--n-footer-border-top":ye,"--n-close-icon-color":Ce,"--n-close-icon-color-hover":Se,"--n-close-icon-color-pressed":$e,"--n-close-size":Re,"--n-close-color-hover":ze,"--n-close-color-pressed":xe,"--n-close-icon-size":Be,"--n-close-border-radius":Ee,"--n-resize-trigger-color-hover":ke}}),x=a?ae("drawer",void 0,M,e):void 0;return{mergedClsPrefix:t,namespace:o,mergedBodyStyle:b,handleOutsideClick:L,handleMaskClick:F,handleEsc:A,mergedTheme:l,cssVars:a?void 0:M,themeClass:x==null?void 0:x.themeClass,onRender:x==null?void 0:x.onRender,isMounted:d}},render(){const{mergedClsPrefix:e}=this;return c(Le,{to:this.to,show:this.show},{default:()=>{var t;return(t=this.onRender)===null||t===void 0||t.call(this),X(c("div",{class:[`${e}-drawer-container`,this.namespace,this.themeClass],style:this.cssVars,role:"none"},this.showMask?c(he,{name:"fade-in-transition",appear:this.isMounted},{default:()=>this.show?c("div",{"aria-hidden":!0,class:[`${e}-drawer-mask`,this.showMask==="transparent"&&`${e}-drawer-mask--invisible`],onClick:this.handleMaskClick}):null}):null,c(nt,Object.assign({},this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),this.$slots)),[[Ae,{zIndex:this.zIndex,enabled:this.show}]])}})}}),wt={title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},zt=N({name:"DrawerContent",props:wt,setup(){const e=ue(Y,null);e||qe("drawer-content","`n-drawer-content` must be placed inside `n-drawer`.");const{doUpdateShow:t}=e;function o(){t(!1)}return{handleCloseClick:o,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){const{title:e,mergedClsPrefix:t,nativeScrollbar:o,mergedTheme:a,bodyClass:d,bodyStyle:l,bodyContentClass:i,bodyContentStyle:h,headerClass:m,headerStyle:w,footerClass:z,footerStyle:R,scrollbarProps:E,closable:$,$slots:b}=this;return c("div",{role:"none",class:[`${t}-drawer-content`,o&&`${t}-drawer-content--native-scrollbar`]},b.header||e||$?c("div",{class:[`${t}-drawer-header`,m],style:w,role:"none"},c("div",{class:`${t}-drawer-header__main`,role:"heading","aria-level":"1"},b.header!==void 0?b.header():e),$&&c(Ue,{onClick:this.handleCloseClick,clsPrefix:t,class:`${t}-drawer-header__close`,absolute:!0})):null,o?c("div",{class:[`${t}-drawer-body`,d],style:l,role:"none"},c("div",{class:[`${t}-drawer-body-content-wrapper`,i],style:h,role:"none"},b)):c(le,Object.assign({themeOverrides:a.peerOverrides.Scrollbar,theme:a.peers.Scrollbar},E,{class:`${t}-drawer-body`,contentClass:[`${t}-drawer-body-content-wrapper`,i],contentStyle:h}),b),b.footer?c("div",{class:[`${t}-drawer-footer`,z],style:R,role:"none"},b.footer()):null)}});export{St as N,zt as a,$t as b};
