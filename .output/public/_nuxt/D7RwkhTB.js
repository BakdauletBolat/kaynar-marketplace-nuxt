import{C as u}from"./BhAlBk5K.js";import{o as n,c as r,a as e,n as m,_,b as l,w as g,d as h,t as c,M as s,J as w,O as p,q as x}from"./CBD-eXxQ.js";function f(t,o){return n(),r("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})])}function k(t,o){return n(),r("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})])}function C(t,o){return n(),r("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"})])}const $={class:"grid grid-cols-[100px_1fr] gap-3 rounded-sm"},b={class:"h-[100px] block"},y=["src"],j={class:""},B={class:"flex flex-col justify-between w-full"},L={class:""},S={class:"flex items-center mt-3 gap-2"},G=m({__name:"basket-card",props:["item"],setup(t){const o=u.getInstance();return(v,i)=>{const a=_("RouterLink");return n(),r("div",$,[e("div",b,[e("img",{class:"rounded w-full h-full object-cover",src:t.item.picture_url??"https://demofree.sirv.com/nope-not-here.jpg",alt:""},null,8,y)]),e("div",j,[e("div",B,[l(a,{to:{name:"product-id",params:{id:t.item.id}},class:"text-lg"},{default:g(()=>[h(c(t.item.name),1)]),_:1},8,["to"]),e("span",L,c(t.item.price)+" ₸",1),e("div",S,[e("div",null,[l(s(k),{onClick:i[0]||(i[0]=d=>s(o).increaseGood(t.item.id)),class:"w-[24px] text-slate-600 cursor-pointer"})]),e("div",null,c(t.item.quantity),1),e("div",null,[l(s(f),{onClick:i[1]||(i[1]=d=>s(o).decreaseGood(t.item.id)),class:"w-[24px] text-slate-600 cursor-pointer"})]),e("div",null,[l(s(C),{onClick:i[2]||(i[2]=d=>s(o).removeGood(t.item.id)),class:"w-[24px] text-red-500 cursor-pointer"})])])])])])}}}),H={class:"w-full"},M={key:0,class:"grid grid-cols-1 gap-5"},N={key:1,class:"text-center p-2"},V={class:"border-t bg-white w-full py-5 mt-5 text-lg font-medium"},q={class:"flex w-full justify-between"},I=e("div",null,"Общая стоимость",-1),D=m({__name:"user-card",setup(t){const o=u.getInstance();return(v,i)=>(n(),r("div",H,[s(o).goods.value.length>0?(n(),r("div",M,[(n(!0),r(w,null,p(s(o).goods.value,a=>(n(),x(G,{key:a.name,item:a},null,8,["item"]))),128))])):(n(),r("div",N,"Пока что пусто")),e("div",V,[e("div",q,[I,e("div",null,c(s(o).totalCost)+" ₸",1)])])]))}});export{D as _};