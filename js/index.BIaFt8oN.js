import{f as m,h as p,g as D,i as t,F as g,j as y,o as n,k as s,t as o,l as c,m as k,w as H,E as M,n as _,p as w}from"./vendor.QTq7UbUO.js";import{_ as b}from"./index.C77Ott-F.js";const V={class:"chat-area"},j={class:"avatar"},A={class:"message"},$={class:"message-content"},B={class:"content"},F={class:"message-conOption"},I=["onClick"],L={key:0,class:"replies"},O={class:"reply-meta"},T=["onClick"],U={class:"message-actions"},q={key:0},z=["onClick"],G={key:1,class:"reply-box"},P=b({__name:"index",setup(J){const x=m([{id:1,author:"暖心",content:"暖心pro哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",time:"2024-09-25 18:00",replies:[{id:1,author:"用户B",to:"用户A",content:"真厉害",time:p().subtract(1,"days").format("YYYY-MM-DD HH:mm:ss")},{id:2,author:"用户C",to:"用户A",content:"真牛",time:p().subtract(3,"days").format("YYYY-MM-DD HH:mm:ss")}],isExpanded:!1},{id:2,author:"李某",content:"你什么身份？",time:"2024-09-25 19:00",replies:[],isExpanded:!1}]),i=m(""),e=m({message:null,to:null}),d=m(!1),Y=D(()=>e.value.to?`回复 @${e.value.to}:`:`回复 ${e.value.message.author}:`),h=(r,u=null)=>{e.value.message===r&&d.value&&e.value.to===u?(d.value=!1,e.value={message:null,to:null},i.value=""):(e.value={message:r,to:u},d.value=!0,i.value="")},f=()=>{if(i.value.trim()){const r={id:Date.now(),author:"暖心pro",to:e.value.to||e.value.message.author,content:i.value,time:p().format("YYYY-MM-DD HH:mm:ss")};e.value.message.replies.unshift(r),e.value.message.isExpanded||(e.value.message.isExpanded=!0),i.value="",e.value={message:null,to:null},d.value=!1}};return(r,u)=>{const E=M,C=_;return n(),t("div",V,[(n(!0),t(g,null,y(x.value,a=>(n(),t("div",{key:a.id,class:"chart-content"},[s("div",j,o(a.author),1),s("div",A,[s("div",$,[s("div",B,o(a.content),1),s("div",F,[s("span",null,o(a.time),1),s("span",{onClick:l=>h(a)},"回复",8,I)])]),a.isExpanded?(n(),t("div",L,[(n(!0),t(g,null,y(a.replies,l=>(n(),t("div",{key:l.id,class:"reply-item"},[s("span",null,o(l.author)+" 回复 "+o(l.to)+"："+o(l.content),1),s("div",O,[s("span",null,o(l.time),1),s("span",{class:"replayTwoLevel",onClick:v=>h(a,l.author)},"回复",8,T)])]))),128))])):c("",!0),s("div",U,[a.replies.length>0?(n(),t("span",q," 共 "+o(a.replies.length)+" 条回复， ",1)):c("",!0),a.replies.length>0?(n(),t("span",{key:1,class:"isExpand",onClick:l=>(v=>{v.isExpanded=!v.isExpanded})(a)},o(a.isExpanded?"收起":"点击查看"),9,z)):c("",!0)]),e.value.message===a&&d.value?(n(),t("div",G,[k(E,{modelValue:i.value,"onUpdate:modelValue":u[0]||(u[0]=l=>i.value=l),placeholder:Y.value,type:"textarea",maxlength:"50","show-word-limit":""},null,8,["modelValue","placeholder"]),k(C,{type:"primary",onClick:f,style:{height:"100%"}},{default:H(()=>u[1]||(u[1]=[w("发送")])),_:1})])):c("",!0)])]))),128))])}}},[["__scopeId","data-v-8f84d676"]]);export{P as default};
