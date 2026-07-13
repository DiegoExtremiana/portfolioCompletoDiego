/**
 * Zero-dependency WebGL background.
 *
 * Renders a full-screen fragment shader: a domain-warped aurora that
 * "evolves" with a scroll uniform (0 → 1). Because the visual is a pure
 * function of the scroll uniform, scrolling back up reverses it seamlessly.
 *
 * Designed for performance: single draw call, capped DPR, pauses when the
 * tab is hidden, and switches to an event-driven (non-animated) mode when the
 * user prefers reduced motion. Returns false from init() if WebGL is missing,
 * letting the caller fall back to a CSS gradient.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
uniform float uMotion;
uniform vec3 uBg;
uniform vec3 uAccent;
uniform vec3 uAccent2;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0;
  float amp = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++){
    v += amp * noise(p);
    p = m * p;
    amp *= 0.5;
  }
  return v;
}

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / uRes.y;
  float t = uTime * 0.045 * uMotion;
  float s = uScroll;

  // Domain warping for organic flow.
  vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, t) + s * 2.2),
                fbm(p * 1.4 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.4 + 3.0 * q + vec2(1.7, 9.2) + s),
                fbm(p * 1.4 + 3.0 * q + vec2(8.3, 2.8)));
  float f = fbm(p * 1.4 + 3.4 * r);

  float m1 = smoothstep(0.15, 0.9, f + 0.2 * sin(s * 6.2831 + r.x * 3.0));
  float m2 = smoothstep(0.30, 1.0, length(r));

  vec3 col = uBg;
  col = mix(col, uAccent,  m1 * (0.34 + 0.24 * sin(s * 3.1415)));
  col = mix(col, uAccent2, m2 * (0.28 + 0.24 * cos(s * 3.1415)));

  // Drifting glow that tracks scroll position.
  vec2 gc = vec2(mix(-0.35, 0.35, s), 0.4 - 0.8 * s);
  float glow = 0.12 / (0.12 + dot(p - gc, p - gc));
  col += uAccent * glow * 0.05;

  // Vignette + dither to avoid banding.
  float vig = smoothstep(1.35, 0.2, length(p));
  col *= mix(0.82, 1.06, vig);
  col += hash(gl_FragCoord.xy + t) * 0.02 - 0.01;

  gl_FragColor = vec4(col, 1.0);
}
`;

type RGB = [number, number, number];

export interface BackgroundColors {
  bg: RGB;
  accent: RGB;
  accent2: RGB;
}

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export class WebGLBackground {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private raf = 0;
  private startTime = 0;
  private scroll = 0;
  private targetScroll = 0;
  private motion = 1;
  private colors: BackgroundColors = {
    bg: [0.03, 0.03, 0.05],
    accent: [0.55, 0.48, 1],
    accent2: [0.2, 0.88, 0.77],
  };
  private dpr = 1;
  private running = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  init(): boolean {
    const gl = (this.canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'low-power',
    }) || this.canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    if (!gl) return false;
    this.gl = gl;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return false;

    const program = gl.createProgram();
    if (!program) return false;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
    this.program = program;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    for (const name of ['uRes', 'uTime', 'uScroll', 'uMotion', 'uBg', 'uAccent', 'uAccent2']) {
      this.uniforms[name] = gl.getUniformLocation(program, name);
    }

    this.startTime = performance.now();
    this.resize();
    return true;
  }

  setColors(colors: BackgroundColors) {
    this.colors = colors;
    this.draw();
  }

  setMotion(enabled: boolean) {
    this.motion = enabled ? 1 : 0;
    if (enabled) this.start();
    else {
      this.stop();
      this.draw();
    }
  }

  /** target: normalized scroll progress 0..1 */
  setScroll(target: number) {
    this.targetScroll = Math.min(1, Math.max(0, target));
    if (!this.motion) {
      // Event-driven: ease directly and repaint once.
      this.scroll += (this.targetScroll - this.scroll) * 0.5;
      this.draw();
    }
  }

  resize() {
    if (!this.gl) return;
    const cap = window.innerWidth < 768 ? 1.25 : 1.5;
    this.dpr = Math.min(window.devicePixelRatio || 1, cap);
    const w = Math.floor(window.innerWidth * this.dpr);
    const h = Math.floor(window.innerHeight * this.dpr);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.gl.viewport(0, 0, w, h);
    this.draw();
  }

  private draw() {
    const gl = this.gl;
    if (!gl || !this.program) return;
    const t = (performance.now() - this.startTime) / 1000;
    gl.uniform2f(this.uniforms.uRes, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.uniforms.uTime, t);
    gl.uniform1f(this.uniforms.uScroll, this.scroll);
    gl.uniform1f(this.uniforms.uMotion, this.motion);
    gl.uniform3fv(this.uniforms.uBg, this.colors.bg);
    gl.uniform3fv(this.uniforms.uAccent, this.colors.accent);
    gl.uniform3fv(this.uniforms.uAccent2, this.colors.accent2);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  private loop = () => {
    if (!this.running) return;
    this.scroll += (this.targetScroll - this.scroll) * 0.06;
    this.draw();
    this.raf = requestAnimationFrame(this.loop);
  };

  start() {
    if (this.running || !this.motion) return;
    this.running = true;
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  dispose() {
    this.stop();
    const gl = this.gl;
    if (gl && this.program) gl.deleteProgram(this.program);
    this.gl = null;
    this.program = null;
  }
}
