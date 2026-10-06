/* LUDO EDUKASI V13 — FX layer (HUD • 3D • Animation)
   Hanya MEMBACA state (S, G) dan DOM. Tidak mengubah logic game.
   Flag: window.FX_ENABLED / html[data-fx = high|medium|low|reduced|off] */
(function(){
"use strict";
var D=document,R=D.documentElement,B=D.body,$=function(i){return D.getElementById(i)};
window.FX_ENABLED=window.FX_ENABLED!==false;
B.classList.add("v13");
var PRESETS=["high","medium","low","reduced"],LIM={high:60,medium:30,low:0,reduced:0,off:0};
var preset="high",userChose=false;
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function setPreset(p,save){preset=p;R.setAttribute("data-fx",window.FX_ENABLED?p:"off");if(save){userChose=true;store("ludo_fx",p)}
  var b=$("v13-fxbtn");if(b)b.title="Efek: "+p}
var saved=store("ludo_fx");
if(PRESETS.indexOf(saved)>-1){userChose=true;setPreset(saved)}
else if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)setPreset("reduced");
else setPreset("high");
if(!window.FX_ENABLED)R.setAttribute("data-fx","off");

/* Auto-downgrade: ukur FPS ~2.5 dtk pertama */
(function(){if(userChose)return;var n=0,t0=performance.now();
  function f(t){n++;if(t-t0<2500&&!D.hidden){requestAnimationFrame(f);return}
    var fps=n/((t-t0)/1000);if(!userChose&&!D.hidden){if(fps<30)setPreset("low");else if(fps<40)setPreset("medium")}window.__fxFps=Math.round(fps)}
  requestAnimationFrame(f)})();

/* ---------- Particle (satu rAF terpusat + pool) ---------- */
var cv=D.createElement("canvas");cv.id="v13-fx";B.appendChild(cv);
var cx=cv.getContext("2d"),W=0,H=0,P=[],pool=[],raf=0;
function size(){var r=Math.min(window.devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*r;cv.height=H*r;cx.setTransform(r,0,0,r,0,0)}
size();addEventListener("resize",size);
var COLS=["#ffb703","#e4572e","#0f9ea8","#2f9e5b","#fbf1dc","#7b5cff"];
function burst(x,y,n,spread){var lim=LIM[R.getAttribute("data-fx")]||0;if(!lim||!window.FX_ENABLED)return;
  n=Math.min(n,lim-P.length);for(var i=0;i<n;i++){var p=pool.pop()||{};var a=Math.random()*6.283,v=2+Math.random()*(spread||5);
    p.x=x;p.y=y;p.vx=Math.cos(a)*v;p.vy=Math.sin(a)*v-3;p.l=1;p.s=4+Math.random()*5;p.c=COLS[i%COLS.length];p.r=Math.random()*6;P.push(p)}
  if(!raf&&!D.hidden)raf=requestAnimationFrame(loop)}
function loop(){cx.clearRect(0,0,W,H);
  for(var i=P.length-1;i>=0;i--){var p=P[i];p.vy+=.22;p.x+=p.vx;p.y+=p.vy;p.l-=.018;p.r+=.2;
    if(p.l<=0){pool.push(P.splice(i,1)[0]);continue}
    cx.globalAlpha=p.l;cx.fillStyle=p.c;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);cx.restore()}
  cx.globalAlpha=1;raf=P.length?requestAnimationFrame(loop):0;if(!raf)cx.clearRect(0,0,W,H)}
D.addEventListener("visibilitychange",function(){if(D.hidden){if(raf)cancelAnimationFrame(raf);raf=0}else if(P.length&&!raf)raf=requestAnimationFrame(loop)});

/* ---------- HUD: dock, banner, streak ---------- */
var dock=D.createElement("div");dock.id="v13-dock";
dock.innerHTML='<div class="who"><span>GILIRAN</span><b id="v13-who">—</b></div>'+
 '<button class="roll" id="v13-roll" type="button" aria-label="Lempar dadu">🎲 LEMPAR</button>'+
 '<button id="v13-menu" type="button" aria-label="Menu">☰</button>'+
 '<button id="v13-snd" type="button" aria-label="Suara">🔊</button>'+
 '<button id="v13-fxbtn" type="button" aria-label="Kualitas efek">✨</button>'+
 '<button id="v13-focus" type="button" aria-label="Mode fokus">◩</button>';
B.appendChild(dock);
var banner=D.createElement("div");banner.id="v13-banner";banner.setAttribute("role","status");B.appendChild(banner);
var streakEl=D.createElement("div");streakEl.className="v13-streak";B.appendChild(streakEl);
function click(id){var e=$(id);if(e)e.click()}
$("v13-roll").onclick=function(){var d=$("dice");if(d&&!d.disabled)d.click()};
$("v13-menu").onclick=function(){click("menuBtn")};
$("v13-snd").onclick=function(){click("snd");setTimeout(syncSnd,30)};
$("v13-fxbtn").onclick=function(){var i=(PRESETS.indexOf(preset)+1)%PRESETS.length;setPreset(PRESETS[i],true);toast("Efek: "+PRESETS[i].toUpperCase())};
$("v13-focus").onclick=function(){B.classList.toggle("focus")};
function syncSnd(){var s=$("snd");$("v13-snd").textContent=s&&/mati/i.test(s.textContent)?"🔇":"🔊"}
function team(){try{return{n:G[S.cur].n,c:G[S.cur].c,s:S.streak[S.cur]|0}}catch(e){return null}}
var lastTurn="";
function turnChanged(){var t=team();if(!t)return;
  $("v13-who").innerHTML='<i style="display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;border:2px solid #fbf1dc;background:'+t.c+'"></i>'+t.n.replace("Kelompok","Kel.");
  if(t.n!==lastTurn){lastTurn=t.n;banner.innerHTML='<i style="background:'+t.c+'"></i>Giliran '+t.n;banner.classList.remove("show");void banner.offsetWidth;banner.classList.add("show")}
  streak(t.s)}
function streak(n){if(n>=2){streakEl.textContent=(n>=5?"🔥🔥🔥":n>=3?"🔥🔥":"🔥")+" x"+n;streakEl.classList.remove("on");void streakEl.offsetWidth;streakEl.classList.add("on")}else streakEl.classList.remove("on")}
function toast(t){banner.textContent=t;banner.classList.remove("show");void banner.offsetWidth;banner.classList.add("show")}
function dsync(){var d=$("dice"),b=$("v13-roll");if(d&&b)b.disabled=d.disabled}
if($("turn"))new MutationObserver(turnChanged).observe($("turn"),{childList:true,subtree:true});
if($("dice"))new MutationObserver(dsync).observe($("dice"),{attributes:true,attributeFilter:["disabled"]});
turnChanged();dsync();syncSnd();

/* ---------- Timer ring + feedback (observer pada modal soal) ---------- */
var seen=new WeakSet(),box=$("bx");
function ring(){var tm=$("tm");if(!tm)return;var left=parseInt(tm.textContent,10);if(isNaN(left))return;
  tm.style.setProperty("--p",Math.max(0,Math.min(100,left/60*100)));
  if(left<=30&&left>10)tm.classList.add("mid")}
function vib(p){try{if(window.FX_ENABLED&&store("ludo_haptic")!=="0"&&!(window.S&&S.mute)&&navigator.vibrate)navigator.vibrate(p)}catch(e){}}
function feedback(){var f=box&&box.querySelector(".answer-feedback");if(!f||seen.has(f))return;seen.add(f);
  var r=f.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+20;
  if(f.classList.contains("ok")){
    var m=(f.textContent||"").match(/\+(\d+)\s*poin/);
    if(m&&window.FX_ENABLED&&R.getAttribute("data-fx")!=="off"){var e=D.createElement("div");e.className="v13-pop";e.textContent="+"+m[1];
      e.style.left=x+"px";e.style.top=y+"px";B.appendChild(e);setTimeout(function(){e.remove()},1150)}
    burst(x,y,28,6);vib(40);var t=team();if(t)streak(t.s)}
  else{vib([60,40,60]);streak(0)}}
if(box)new MutationObserver(function(){ring();feedback()}).observe(box,{childList:true,subtree:true,characterData:true});

/* ---------- Finish / celebration ---------- */
var ft=$("finishToast");
if(ft)new MutationObserver(function(){if(ft.classList.contains("show")){var k=0;
  [0,350,700].forEach(function(d){setTimeout(function(){burst(W*(.25+.25*k++),H*.25,30,7)},d)});vib([80,50,80,50,160])}})
  .observe(ft,{attributes:true,attributeFilter:["class"]});
window.FX={setPreset:function(p){setPreset(p,true)},burst:burst,get preset(){return preset}};
})();
