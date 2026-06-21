(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,82257,e=>{"use strict";var t=e.i(43476),o=e.i(71645);e.s(["Reveal",0,function({children:e,className:i=""}){let r=(0,o.useRef)(null),[a,n]=(0,o.useState)(!1);return(0,o.useEffect)(()=>{let e=r.current;if(!e||"u"<typeof IntersectionObserver)return n(!0);let t=new IntersectionObserver(([e])=>{e.isIntersecting&&(n(!0),t.disconnect())},{rootMargin:"0px 0px -10% 0px"});return t.observe(e),()=>t.disconnect()},[]),(0,t.jsx)("div",{ref:r,className:`reveal ${a?"is-in":""} ${i}`,children:e})}])},39599,e=>{"use strict";var t=e.i(43476),o=e.i(71645);e.s(["RotatingWord",0,function({words:e,className:i="",interval:r=2600}){let[a,n]=(0,o.useState)(0),[l,s]=(0,o.useState)(!0);return(0,o.useEffect)(()=>{if(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches||e.length<=1)return;let t=window.setInterval(()=>{s(!1),window.setTimeout(()=>{n(t=>(t+1)%e.length),s(!0)},420)},r);return()=>window.clearInterval(t)},[e.length,r]),(0,t.jsx)("span",{className:`inline-block transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] ${l?"opacity-100 translate-y-0":"opacity-0 translate-y-[8px]"} ${i}`,children:e[a]})}])},46043,e=>{"use strict";var t=e.i(43476),o=e.i(71645);let i=`
  attribute vec4 aVertexPosition;
  void main() { gl_Position = aVertexPosition; }
`,r=`
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;

  const float overallSpeed = 0.18;
  const float gridSmoothWidth = 0.015;
  const float minLineWidth = 0.01;
  const float maxLineWidth = 0.18;
  const float lineSpeed = 1.0 * overallSpeed;
  const float lineAmplitude = 1.0;
  const float lineFrequency = 0.2;
  const float warpSpeed = 0.2 * overallSpeed;
  const float warpFrequency = 0.5;
  const float warpAmplitude = 1.0;
  const float offsetFrequency = 0.5;
  const float offsetSpeed = 1.33 * overallSpeed;
  const float minOffsetSpread = 0.6;
  const float maxOffsetSpread = 2.0;
  const int linesPerGroup = 12;
  const float scale = 5.0;

  // DigiVia gold + warm near-black
  const vec4 lineColor = vec4(0.82, 0.62, 0.27, 1.0);
  const vec4 bgColor1 = vec4(0.045, 0.038, 0.025, 1.0);
  const vec4 bgColor2 = vec4(0.12, 0.085, 0.03, 1.0);
  const float lineIntensity = 0.62;

  #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float horizontalFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

    float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

    vec4 lines = vec4(0.0);

    for (int l = 0; l < linesPerGroup; l++) {
      float normalizedLineIndex = float(l) / float(linesPerGroup);
      float offsetTime = iTime * offsetSpeed;
      float offsetPosition = float(l) + space.x * offsetFrequency;
      float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
      float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
      float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
      float linePosition = getPlasmaY(space.x, horizontalFade, offset);
      float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

      float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
      float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

      line = line + circle;
      lines += line * lineColor * rand;
    }

    vec4 fragColor = mix(bgColor1, bgColor2, uv.x);
    fragColor *= verticalFade;
    fragColor += lines * lineIntensity;
    fragColor.a = 1.0;
    gl_FragColor = fragColor;
  }
`;function a(e,t,o){let i=e.createShader(t);return(e.shaderSource(i,o),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS))?i:(e.deleteShader(i),null)}e.s(["ShaderBackground",0,function({className:e=""}){let n=(0,o.useRef)(null),[l,s]=(0,o.useState)(!1);return((0,o.useEffect)(()=>{s(function(){try{let e=navigator;if(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches||e.connection?.saveData||window.matchMedia?.("(pointer: coarse)").matches||window.innerWidth<768||"number"==typeof e.deviceMemory&&e.deviceMemory<4)return!1;let t=document.createElement("canvas");return!!(t.getContext("webgl")||t.getContext("experimental-webgl"))}catch{return!1}}())},[]),(0,o.useEffect)(()=>{if(!l)return;let e=n.current;if(!e)return;let t=e.getContext("webgl",{antialias:!1,alpha:!0,premultipliedAlpha:!1,depth:!1});if(!t)return;let o=a(t,t.VERTEX_SHADER,i),s=a(t,t.FRAGMENT_SHADER,r);if(!o||!s)return;let c=t.createProgram();if(t.attachShader(c,o),t.attachShader(c,s),t.linkProgram(c),!t.getProgramParameter(c,t.LINK_STATUS))return;let f=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW);let d=t.getAttribLocation(c,"aVertexPosition"),u=t.getUniformLocation(c,"iResolution"),m=t.getUniformLocation(c,"iTime"),h=()=>{let o=e.clientWidth||1,i=e.clientHeight||1;e.width=Math.max(1,Math.floor(.75*o)),e.height=Math.max(1,Math.floor(.75*i)),t.viewport(0,0,e.width,e.height)},p=new ResizeObserver(h);p.observe(e),h();let g=performance.now(),v=1e3/30,S=0,w=0,x=!0,b=o=>{if(S=requestAnimationFrame(b),o-w<v)return;w=o;let i=(performance.now()-g)/1e3;t.useProgram(c),t.bindBuffer(t.ARRAY_BUFFER,f),t.vertexAttribPointer(d,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(d),t.uniform2f(u,e.width,e.height),t.uniform1f(m,i),t.drawArrays(t.TRIANGLE_STRIP,0,4)},y=()=>x&&"visible"===document.visibilityState,A=()=>{S&&(cancelAnimationFrame(S),S=0)},F=()=>{!S&&y()&&(w=0,S=requestAnimationFrame(b))},P=()=>y()?F():A();document.addEventListener("visibilitychange",P);let R=new IntersectionObserver(([e])=>{x=e.isIntersecting,y()?F():A()},{threshold:0});return R.observe(e),F(),()=>{A(),p.disconnect(),R.disconnect(),document.removeEventListener("visibilitychange",P),t.deleteProgram(c),t.deleteBuffer(f),t.deleteShader(o),t.deleteShader(s)}},[l]),l)?(0,t.jsx)("canvas",{ref:n,"aria-hidden":"true",className:`pointer-events-none ${e}`}):null}])}]);