console.log("Load script.js");var app={};const body=document.body,burger=document.querySelector("#BurgerMenue"),menue=document.querySelector("div.nlc"),cbtn=document.getElementsByClassName("copy");app.global={init:function(){console.log("load global functions")},MobMenue:function(){console.log("MobMenue()"),body.classList.contains("MobMenue")?body.classList.remove("MobMenue"):body.classList.add("MobMenue")}},app.global.init(),burger.addEventListener("click",(()=>{console.log("clickeddd"),app.global.MobMenue()}));for(let e=0;e<cbtn.length;e++){const o=cbtn[e];o.addEventListener("click",(async()=>{console.log("element clicked"),o.innerHTML="Copied!",setTimeout((()=>{o.innerHTML="Copy"}),2e3)}))}
//# sourceMappingURL=all.js.map