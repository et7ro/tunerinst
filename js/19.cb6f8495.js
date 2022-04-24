"use strict";(globalThis["webpackChunkTunerinst"]=globalThis["webpackChunkTunerinst"]||[]).push([[19],{3019:(t,e,i)=>{i.r(e),i.d(e,{default:()=>f});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-main",[i("section",{class:{loading:t.loading}},t._l(t.notes,(function(e,s){return i("mark",{key:s,ref:"key-"+e,refInFor:!0,class:{semi:e.includes("s"),active:t.isActive(e)},attrs:{id:e}})})),0),t.loading?i("v-progress-linear",{attrs:{indeterminate:""}}):t._e()],1)},a=[],o=i(2476);const n={name:"piano",computed:{baseUrl(){return"/tunerinst/"},device(){return(0,o.Z)()},inputDevices(){return this.$store.state.inputDevices},outputDevices(){return this.$store.state.outputDevices}},data(){return{loading:!1,audioCtx:new AudioContext,audio:new Audio,destination:null,gain:null,audioSrcs:{},buffers:{},playing:[],notes:["C4","Cs4","D4","Ds4","E4","F4","Fs4","G4","Gs4","A4","As4","B4"]}},mounted(){this.getAudios(),this.destination=this.audioCtx.createMediaStreamDestination(),this.audio.srcObject=this.destination.stream,this.$store.state.defaultOutputId&&this.outputDevices.find((t=>t.deviceId==this.$store.state.defaultOutputId))&&this.audio.setSinkId(this.$store.state.defaultOutputId),this.gain=this.audioCtx.createGain(),this.gain.gain.value=3,this.gain.connect(this.destination),window.addEventListener("keydown",this.activateKeyboard),window.addEventListener("keyup",this.stop);for(let t in this.$refs)this.device.isMobile?(this.$refs[t][0].ontouchstart=t=>{this.play(t.target.id)},this.$refs[t][0].ontouchend=t=>{this.stop(t.target.id)}):(this.$refs[t][0].onmousedown=t=>{this.play(t.target.id)},this.$refs[t][0].onmouseup=t=>{this.stop(t.target.id)},this.$refs[t][0].onmouseleave=t=>{this.stop(t.target.id)})},beforeDestroy(){this.audio.pause(),this.audioCtx.close(),window.removeEventListener("keydown",this.activateKeyboard),window.removeEventListener("keyup",this.stop)},methods:{getAudios(){this.loading=!0;let t=[];for(let e of this.notes)t.push(this.axios.get(`${baseUrl}audio/piano/${e}.${"ios"==this.device.name?"aac":"opus"}`,{responseType:"arraybuffer",headers:{"x-note":e}}));Promise.all(t).then((t=>{for(let e of t){let t=e.config.headers["x-note"];this.audioCtx.decodeAudioData(e.data,(e=>{this.buffers[t]=e}))}this.loading=!1}))},play(t){if(this.audio.paused&&this.audio.play(),this.loading||this.playing.includes(t))return!1;this.audioSrcs[t]=this.audioCtx.createBufferSource(),this.audioSrcs[t].buffer=this.buffers[t],this.audioSrcs[t].connect(this.gain),this.audioSrcs[t].start(),this.audioSrcs[t].stop(this.audioCtx.currentTime+1),this.playing.push(t),this.$forceUpdate()},stop(t){let e=t.key?this.getNoteByKey(t.key):t;if(null===e)return!1;let i=t.key?this.notes[e]:t,s=this.playing.indexOf(i);this.playing.splice(s,1),delete this.audioSrcs[i],this.$forceUpdate()},activateKeyboard(t){let e=this.getNoteByKey(t.key);if(null===e)return!1;let i=this.notes[e];this.play(i)},getNoteByKey(t){return"a"==t?0:"w"==t?1:"s"==t?2:"e"==t?3:"d"==t?4:"f"==t?5:"t"==t?6:"g"==t?7:"y"==t?8:"h"==t?9:"u"==t?10:"j"==t?11:null},isActive(t){return void 0!=this.audioSrcs[t]}}},r=n;var u=i(1001),d=i(3453),h=i.n(d),l=i(4768),c=i(5212),p=(0,u.Z)(r,s,a,!1,null,"3ead70fe",null);const f=p.exports;h()(p,{VMain:l.Z,VProgressLinear:c.Z})}}]);