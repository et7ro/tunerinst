import{_ as v,l as B,r as o,o as m,c,d as s,w as r,e as i,n as k,g as S,h as y,F as C,f as d,t as w,p as I,k as P}from"./index-B7Vbrecb.js";const x={name:"drums",computed:{baseUrl(){return"/"},device(){return B()},inputDevices(){return this.$store.state.inputDevices},outputDevices(){return this.$store.state.outputDevices}},data(){return{data:[],loading:!1,playing:!1,bpm:parseInt(localStorage.getItem("drumsPBM")||"80"),rhythm:null,audioCtx:new AudioContext,audio:new Audio,destination:null,audioSrc:null}},mounted(){window.addEventListener("keydown",this.toggleByKeyboard),this.getData()},beforeUnmount(){this.audio.pause(),this.audioCtx.close(),window.removeEventListener("keydown",this.toggleByKeyboard)},methods:{getData(){fetch(`${this.baseUrl}json/drums.json`).then(t=>{if(t.status!=200)throw null;return t.json()}).then(t=>{this.data=t,this.rhythm=this.data.find(a=>a.dir==localStorage.getItem("drumsRhythm")),this.rhythm||(this.rhythm=this.data[0]),this.resetRhythm()})},toggleByKeyboard(t){if(document.hidden)return!1;["ArrowLeft","MediaTrackPrevious","-"].includes(t.key)&&this.subtractBpm(),["ArrowRight","MediaTrackNext","+"].includes(t.key)&&this.addBpm(),[" ","MediaPlayPause"].includes(t.key)&&(this.togglePlay(),t.preventDefault())},createAudioBuffer(){this.destination=this.audioCtx.createMediaStreamDestination(),this.audio.srcObject=this.destination.stream,this.$store.state.defaultOutputId&&this.outputDevices.find(t=>t.deviceId==this.$store.state.defaultOutputId)&&this.audio.setSinkId(this.$store.state.defaultOutputId),this.audioSrc=this.audioCtx.createBufferSource(),this.audioSrc.connect(this.destination),this.audioSrc.loop=!0},setBPM(t){localStorage.setItem("drumsPBM",t),this.resetPlay()},setRhythm(t){localStorage.setItem("drumsRhythm",t.dir),this.resetRhythm(),this.resetPlay()},resetRhythm(){this.rhythm.bpms.includes(this.bpm)||(this.bpm=this.rhythm.bpms[0])},resetPlay(){if(this.$refs.drumsRhythm.blur(),this.playing&&this.audioSrc.stop(),!this.playing)return!1;this.playing=!1,this.togglePlay()},togglePlay(){this.playing?(this.audio.pause(),this.audioSrc.stop(),this.playing=!1):(this.createAudioBuffer(),this.loading=!0,fetch(`${this.baseUrl}audio/drums/${this.rhythm.dir}/${this.bpm}.${this.device.name=="ios"?"aac":"opus"}`).then(t=>{if(t.status!=200)throw null;return t.arrayBuffer()}).then(t=>{this.audioCtx.decodeAudioData(t,a=>{this.audioSrc.buffer=a,this.audioSrc.start(),this.audio.play(),this.loading=!1,this.playing=!0})}))},subtractBpm(){if(this.$refs.subtractBpmButton.$el.blur(),this.bpm<=this.rhythm.bpms[0])return!1;let t=this.rhythm.bpms.indexOf(this.bpm);this.bpm=this.rhythm.bpms[t-1],this.setBPM(this.bpm)},addBpm(){if(this.$refs.addBpmButton.$el.blur(),this.bpm>=this.rhythm.bpms[this.rhythm.bpms.length-1])return!1;let t=this.rhythm.bpms.indexOf(this.bpm);this.bpm=this.rhythm.bpms[t+1],this.setBPM(this.bpm)}}},p=t=>(I("data-v-c8544e7b"),t=t(),P(),t),D=p(()=>i("mark",{class:"cymbal"},[i("span")],-1)),M=p(()=>i("mark",{class:"bass"},[i("span")],-1)),R=p(()=>i("mark",{class:"snare"},[i("span")],-1)),V=[D,M,R];function A(t,a,O,U,e,l){const f=o("v-progress-linear"),b=o("v-select"),g=o("v-slider"),n=o("v-icon"),h=o("v-btn"),_=o("v-main");return m(),c("main",null,[s(_,null,{default:r(()=>[i("section",{class:k({playing:e.playing})},V,2),i("footer",null,[!e.data.length&&!e.rhythm?(m(),S(f,{key:0,indeterminate:""})):y("",!0),e.data.length&&e.rhythm?(m(),c(C,{key:1},[s(b,{modelValue:e.rhythm,"onUpdate:modelValue":a[0]||(a[0]=u=>e.rhythm=u),ref:"drumsRhythm",items:e.data,"item-title":"name","return-object":"",label:t.$t("drums.rhythm"),onInput:l.setRhythm},null,8,["modelValue","items","label","onInput"]),s(g,{modelValue:e.bpm,"onUpdate:modelValue":a[1]||(a[1]=u=>e.bpm=u),step:"20",color:"primary",min:e.rhythm.bpms[0],max:e.rhythm.bpms[e.rhythm.bpms.length-1],"thumb-label":"always",onChange:l.setBPM},null,8,["modelValue","min","max","onChange"]),i("nav",null,[s(h,{fab:"",small:"",onClick:l.subtractBpm,ref:"subtractBpmButton",title:t.$t("metronome.subtractStep",{n:20})},{default:r(()=>[s(n,null,{default:r(()=>[d("remove")]),_:1})]),_:1},8,["onClick","title"]),s(h,{color:e.playing?"primary":null,loading:e.loading,onClick:l.togglePlay,title:e.playing?t.$t("home.stop"):t.$t("home.play")},{default:r(()=>[s(n,null,{default:r(()=>[d(w(e.playing?"pause":"play_arrow"),1)]),_:1})]),_:1},8,["color","loading","onClick","title"]),s(h,{fab:"",small:"",onClick:l.addBpm,ref:"addBpmButton",title:t.$t("metronome.addStep",{n:20})},{default:r(()=>[s(n,null,{default:r(()=>[d("add")]),_:1})]),_:1},8,["onClick","title"])])],64)):y("",!0)])]),_:1})])}const N=v(x,[["render",A],["__scopeId","data-v-c8544e7b"]]);export{N as default};
