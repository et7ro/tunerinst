import{_ as S,a as I,r as m,b as _,o as d,c as g,d as h,w as a,e as r,n as T,f as c,t as u,g as y,h as k,F as L,i as M,j as R,p as U,k as Y}from"./index-CwCTyS_u.js";const x=[{name:"Gravissimo",bpm:10},{name:"Grave",bpm:20},{name:"Larghissimo",bpm:30},{name:"Largo",bpm:40},{name:"Larghetto",bpm:50},{name:"Adagio",bpm:60},{name:"Adagietto",bpm:70},{name:"Andante",bpm:80},{name:"Andantino",bpm:90},{name:"Moderato",bpm:100},{name:"Allegretto",bpm:110},{name:"Allegro moderato",bpm:120},{name:"Allegro ma non troppo",bpm:130},{name:"Allegro",bpm:140},{name:"Vivace",bpm:150},{name:"Vivacissimo",bpm:160},{name:"Alegricissimo",bpm:170},{name:"Presto",bpm:180},{name:"Presto vivace",bpm:190},{name:"Prestissimo",bpm:200}],D={name:"metronome",computed:{baseUrl(){return"/"},darkTheme(){return this.$vuetify.theme.current.dark},inputDevices(){return this.$store.state.inputDevices},outputDevices(){return this.$store.state.outputDevices},tempos(){return x},bpm:{get(){return this.tempo?this.tempo*parseInt(this.speed)/100:this.srcTrack?this.$store.state.metronomeBPM*parseInt(this.speed)/100:this.$store.state.metronomeBPM},set(e){this.$store.dispatch("setMetronomeBPM",e)}},bpmStep:{get(){return this.$store.state.metronomeBPMStep},set(e){this.$store.dispatch("setMetronomeBPMStep",e)}},autoBPM(){return!!this.tempo},youtubeEnabled(){return this.playing!=null||!this.youtubeLink?!0:this.youtubeReady}},data(){return{metronomeWorker:new Worker("/assets/metronome-worker.js"),reader:new FileReader,audio:new Audio,audioCtx:null,destination:null,envelope:null,playing:null,rhythm:1,index:0,tic:null,toc:null,buttons:[],srcTrack:null,srcTrackBuffer:null,strTrackTitle:null,bufferSize:512,tempo:null,loadingTempo:!1,youtubePlayer:null,youtubeReady:!1,youtubeLink:null,delay:0,speed:100,lastUpdate:null,nextTickTime:null,tickIndex:0}},created(){this.buttons=[{strokes:1,icon:`${this.baseUrl}img/note-seminima`},{strokes:2,icon:`${this.baseUrl}img/note-colcheia`},{strokes:3,icon:`${this.baseUrl}img/note-tercina`},{strokes:4,icon:`${this.baseUrl}img/note-semi-colcheia`}]},mounted(){window.addEventListener("keydown",this.handleKeyboard),this.loadYoutubeApi(),this.loadSrcAudioElement(),this.reader.onload=e=>{e.target.result&&(this.srcTrackBuffer=e.target.result)},this.metronomeWorker.onmessage=e=>{e.data=="tick"&&this.schedule()}},beforeUnmount(){this.metronomeWorker.postMessage("stop"),this.playing!==null&&(this.audio.pause(),this.audioCtx.close()),window.removeEventListener("keydown",this.handleKeyboard)},methods:{handleKeyboard(e){if(document.hidden)return!1;e.key=="1"&&this.toggle(1,0),e.key=="2"&&this.toggle(2,1),e.key=="3"&&this.toggle(3,2),e.key=="4"&&this.toggle(4,3),["+","ArrowRight"].includes(e.key)&&this.changeBpm(5),["-","ArrowLeft"].includes(e.key)&&this.changeBpm(-5),[" ","MediaPlayPause"].includes(e.key)&&(this.toggle(this.rhythm,this.index),e.preventDefault()),e.key=="Escape"&&this.stop()},toggle(e,t,n=!1){var l,i;if(!(this.lastUpdate>performance.now()-100)&&(this.lastUpdate=performance.now(),this.playing!==null&&(this.metronomeWorker.postMessage("stop"),(l=this.youtubePlayer)==null||l.stopVideo(),this.audio.pause(),this.audioCtx.close()),!(n&&this.playing==null))){if(!n&&this.playing==t)return this.audio.pause(),(i=this.youtubePlayer)==null||i.stopVideo(),this.playing=null;this.rhythm=e,this.index=t,this.playing=t,this.tickIndex=0,document.documentElement.style.setProperty("--tempo",`${12e4/this.bpm}ms`),this.createAudioCtx()}},createAudioCtx(){this.audioCtx=new AudioContext,this.destination=this.audioCtx.createMediaStreamDestination(),this.envelope=this.audioCtx.createGain(),this.envelope.connect(this.destination),this.audio.srcObject=this.destination.stream;const e=this.audioCtx.createBufferSource();e.buffer=this.audioCtx.createBuffer(1,1,22050),e.start(0),this.$store.state.defaultOutputId&&this.outputDevices.find(t=>t.deviceId==this.$store.state.defaultOutputId)&&this.audio.setSinkId(this.$store.state.defaultOutputId),this.nextTickTime=this.audioCtx.currentTime,this.metronomeWorker.postMessage("start"),this.srcTrackBuffer?this.playSrcTrack():this.play()},schedule(){for(;this.nextTickTime<this.audioCtx.currentTime+.1;){const e=this.audioCtx.createOscillator();e.frequency.value=this.getSound(this.tickIndex%this.rhythm),e.connect(this.audioCtx.destination),e.start(this.nextTickTime),e.stop(this.nextTickTime+.05),this.nextTickTime+=60/(this.bpm*this.rhythm),this.tickIndex++}},playSrcTrack(){this.srcTrackBuffer&&(this.envelope2=this.audioCtx.createGain(),this.envelope2.connect(this.destination),this.envelope2.gain.value=.35,this.audioCtx.decodeAudioData(this.srcTrackBuffer.slice(0)).then(e=>{this.srcTrack=this.audioCtx.createBufferSource(),this.srcTrack.buffer=e,this.srcTrack.loop=!0,this.srcTrack.connect(this.envelope2),this.play()}))},play(){var t,n;this.youtubeLink&&((t=this.youtubePlayer)==null||t.playVideo()),parseFloat(this.delay/60),this.audio.play();const e=parseInt(this.speed)/100;this.srcTrack&&(this.srcTrack.start(),this.srcTrack.playbackRate.value=e,this.srcTrack.detune.value=Math.abs(parseInt(this.speed)*600/100-600)),(n=this.youtubePlayer)==null||n.setPlaybackRate(e)},stop(){var e;(e=this.youtubePlayer)==null||e.stopVideo(),this.playing&&this.audioCtx.close(),this.metronomeWorker.postMessage("stop"),this.audio.pause(),this.playing=null},changeBpm(e){this.bpm+=e,this.toggle(this.rhythm,this.index,!0)},getSound(e,t=!1){return this.rhythm<=1?440:this.rhythm%2==0?e%2==0?440:880:e==0?440:880},loadYoutubeApi(){const e=document.createElement("script");e.src="https://www.youtube.com/iframe_api",this.$el.append(e),window.onYouTubeIframeAPIReady=()=>{this.youtubePlayer=new YT.Player("player",{with:"320",height:"240",events:{onReady:this.onYoutubePlayerReady,onError:this.onYoutubePlayerError,onStateChange:this.onYoutubePlayerStateChange}})}},loadSrcAudioElement(){if(!this.$refs.srcTrack)return setTimeout(()=>this.loadSrcAudioElement(),100);this.$refs.srcTrack.onchange=e=>{this.stop();const t=e.target.files[0];if(this.loadingTempo=!1,this.tempo=null,!t){this.speed=100,this.srcTrack=null,this.strTrackTitle=null,this.srcTrackBuffer=null;return}this.strTrackTitle=t.name.replace(/_-/," "),this.reader.readAsArrayBuffer(t)}},calcBPM(){if(!this.srcTrackBuffer)return;this.stop(),this.tempo=null,this.loadingTempo=!0,this.audioCtx=new AudioContext;const e=this.audioCtx.createScriptProcessor(this.bufferSize,1,1),t=this.audioCtx.createGain();t.gain.value=0,t.connect(this.audioCtx.destination),e.connect(t),this.audioCtx.decodeAudioData(this.srcTrackBuffer.slice(0)).then(n=>{this.srcTrack=this.audioCtx.createBufferSource(),this.srcTrack.buffer=n,this.srcTrack.connect(e),this.srcTrack.connect(t),I().then(({Tempo:l})=>{const i=new l(e.bufferSize*4,e.bufferSize,this.audioCtx.sampleRate);e.onaudioprocess=o=>{let f=i.do(o.inputBuffer.getChannelData(0)),p=i.getBpm();f&&(this.tempo=parseInt(p))},this.srcTrack.start(10,0,5),this.srcTrack.onended=()=>{this.audioCtx.close(),this.loadingTempo=!1}})})},toggleAutoBPM(){this.tempo?this.tempo=null:this.calcBPM()},onYoutubePlayerReady(){this.youtubeReady=!0},onYoutubePlayerError(e){this.youtubeReady=!1},onYoutubePlayerStateChange(e){this.youtubeReady=e.data==5},pasteYoutubeLink(){this.youtubeReady=!1,navigator.clipboard.readText().then(e=>{e&&(this.youtubeLink=e,this.refreshYoutubeLink())})},refreshYoutubeLink(){var l,i;if(this.stop(),!this.youtubeLink)return;this.youtubeReady=!1;const e=new URL(this.youtubeLink),t=e.searchParams.get("v")??e.pathname.replace("/",""),n=parseInt(e.searchParams.get("t")??"0");(l=this.youtubePlayer)==null||l.cueVideoById(t,n),(i=this.youtubePlayer)==null||i.setVolume(50)},bpmName(e){var t;return(t=x.find(n=>n.bpm>=e.value))==null?void 0:t.name}}},C=e=>(U("data-v-c13a3e65"),e=e(),Y(),e),E=C(()=>r("div",{id:"player"},null,-1)),N=C(()=>r("figure",null,null,-1)),W=["src"],z={type:"file",id:"srcTrack",ref:"srcTrack",accept:"audio/*,video/*"};function F(e,t,n,l,i,o){const f=m("v-select"),p=m("v-slider"),P=m("v-progress-linear"),v=m("v-btn"),B=m("v-icon"),w=m("v-text-field"),V=m("v-main"),A=_("ripple");return d(),g("main",null,[h(V,null,{default:a(()=>[E,r("section",null,[N,r("mark",{class:T({animating:i.playing!=null})},null,2)]),r("section",null,[r("header",null,[h(f,{modelValue:o.bpm,"onUpdate:modelValue":t[0]||(t[0]=s=>o.bpm=s),items:o.tempos,"item-title":"name","item-value":"bpm",label:e.$t("metronome.tempo"),disabled:i.loadingTempo||o.autoBPM},{selection:a(({item:s,index:b})=>[c(u(o.bpmName(s)),1)]),_:1},8,["modelValue","items","label","disabled"]),!i.loadingTempo&&!i.tempo?(d(),y(p,{key:0,"hide-details":"",modelValue:o.bpm,"onUpdate:modelValue":[t[1]||(t[1]=s=>o.bpm=s),t[2]||(t[2]=s=>o.toggle(i.rhythm,i.index,!0))],step:"5",max:"200","thumb-label":"always",color:"primary"},{"thumb-label":a(({modelValue:s})=>[c(u(`${s} ${e.$t("drums.bpm")}`),1)]),_:1},8,["modelValue"])):k("",!0),!i.loadingTempo&&i.tempo?(d(),y(p,{key:1,"hide-details":"",readonly:"",modelValue:i.tempo,"onUpdate:modelValue":[t[3]||(t[3]=s=>i.tempo=s),t[4]||(t[4]=s=>o.toggle(i.rhythm,i.index,!0))],step:"1",max:"250","thumb-label":"always"},{"thumb-label":a(({modelValue:s})=>[c(u(`${s} ${e.$t("drums.bpm")}`),1)]),_:1},8,["modelValue"])):k("",!0),i.loadingTempo?(d(),y(P,{key:2,indeterminate:""})):k("",!0)]),r("nav",null,[(d(!0),g(L,null,M(i.buttons,(s,b)=>(d(),y(v,{key:b,onClick:G=>o.toggle(s.strokes,b),color:i.playing==b?"primary":null,class:"elevation-4",disabled:i.loadingTempo||!o.youtubeEnabled,title:e.$t("metronome.play",{n:`Numpad ${b+1}`})},{default:a(()=>[r("img",{src:`${s.icon}${o.darkTheme?"-dark":"-light"}.svg`},null,8,W)]),_:2},1032,["onClick","color","disabled","title"]))),128))]),r("article",null,[r("div",null,[r("input",z,null,512),R((d(),g("label",{for:"srcTrack",class:T(["v-btn v-btn--elevated v-btn--density-default v-btn--size-default v-btn--variant-elevated elevation-4",{"bg-accent":!!i.strTrackTitle,"v-btn--disabled":i.playing!=null||i.loadingTempo}])},[r("span",null,u(i.strTrackTitle??e.$t("metronome.srcTrack")),1)],2)),[[A]]),h(v,{loading:i.loadingTempo,disabled:i.playing!=null||!i.strTrackTitle,onClick:t[5]||(t[5]=s=>o.toggleAutoBPM())},{default:a(()=>[h(B,null,{default:a(()=>[c(u(o.autoBPM?"pan_tool":"speed"),1)]),_:1}),c(" "+u(o.autoBPM?e.$t("metronome.manualBpm"):e.$t("metronome.detectBpm")),1)]),_:1},8,["loading","disabled"])]),r("div",null,[h(w,{modelValue:i.youtubeLink,"onUpdate:modelValue":t[6]||(t[6]=s=>i.youtubeLink=s),label:e.$t("metronome.youtubeVideo"),"append-inner-icon":"content_paste",disabled:i.playing!=null,"onClick:appendInner":t[7]||(t[7]=s=>o.pasteYoutubeLink()),onInput:t[8]||(t[8]=s=>o.refreshYoutubeLink())},null,8,["modelValue","label","disabled"])]),r("div",null,[h(p,{"hide-details":"",modelValue:i.delay,"onUpdate:modelValue":t[9]||(t[9]=s=>i.delay=s),step:"1",max:"180","thumb-label":"always",color:"primary",disabled:i.playing!=null||!i.strTrackTitle&&!i.youtubeLink},{"thumb-label":a(({modelValue:s})=>[c(u(`${e.$t("metronome.delay")} ${(s/60).toFixed(2)}`)+"s",1)]),_:1},8,["modelValue","disabled"])]),r("div",null,[h(p,{"hide-details":"",modelValue:i.speed,"onUpdate:modelValue":[t[10]||(t[10]=s=>i.speed=s),t[11]||(t[11]=s=>o.toggle(i.rhythm,i.index,!0))],step:"5",max:"100","thumb-label":"always",color:"primary",disabled:!i.strTrackTitle&&!i.youtubeLink},{"thumb-label":a(({modelValue:s})=>[c(u(`${e.$t("metronome.speed")} ${s}`)+"%",1)]),_:1},8,["modelValue","disabled"])])])])]),_:1})])}const j=S(D,[["render",F],["__scopeId","data-v-c13a3e65"]]);export{j as default};
