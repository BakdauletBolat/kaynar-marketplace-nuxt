import{_ as a}from"./Bo7bj1_A.js";import{a as n}from"./CxyL4IgC.js";import{n as i,o as c,c as m,a as e,b as r,w as d,d as f,t as s,A as x}from"./BdcIS8BQ.js";const u={class:"flex bg-white rounded-lg lg:flex-row flex-col p-2 lg:p-5 gap-3 hover:border-slate-400"},h=["src"],p={class:"w-full"},_={class:"flex justify-between flex-col md:flex-row w-full"},g={class:"text-sm mt-3"},w=e("p",{class:"text-sm text-slate-500 font-light max-w-[400px]"},"Продаю раму на Прадо 78.5 дверный. В отличном состоянии с документами",-1),v={class:"flex flex-col md:gap-3 md:flex-row mt-3"},b={class:"text-sm text-slate-400 font-light"},C={class:"text-sm text-slate-400 font-light"},V=i({__name:"Card",props:["item"],setup(t){const o=n(t.item.created_at,"MMMM DD");return(M,N)=>{const l=a;return c(),m("div",u,[e("div",null,[e("img",{class:"rounded border lg:h-[120px] h-[200px] object-cover w-full lg:w-[160px]",src:t.item.pictures.length!=0?t.item.pictures[0].image:"https://demofree.sirv.com/nope-not-here.jpg",alt:""},null,8,h)]),e("div",p,[e("div",_,[e("h2",null,[r(l,{class:"text-lg font-medium text-blue-500 hover:underline-offset-1 hover:underline",to:{name:"product-id",params:{id:t.item.id}}},{default:d(()=>[f(s(t.item.name),1)]),_:1},8,["to"])]),e("span",null,s(t.item.price)+" ₸",1)]),e("p",g,"б/у "+s(t.item.modification.modelCar.name),1),w,e("ul",v,[e("li",b,s(t.item.warehouse??"Шымкент"),1),e("li",C,s(x(o)),1)])])])}}});export{V as _};
