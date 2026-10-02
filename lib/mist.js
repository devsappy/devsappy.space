// Drifting valley mist, drawn into a transparent canvas with one fragment shader.
// The hero uses two of these: one behind the cut-out (it veils the title in the
// sky) and one in front (low mist over the hills, and the scroll dissolve).

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseAmt;
uniform float uDissolve;
uniform float uDensity;
uniform float uLow;
uniform float uTop;
uniform float uSeed;
uniform vec3 uColor;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.1, 9.2);
    a *= 0.5;
  }
  return v;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 1.3 + uSeed;
  float t = uTime;
  vec2 warp = vec2(fbm(p + vec2(t * 0.020, t * 0.007)), fbm(p + vec2(5.2 - t * 0.013, 1.3)));
  float n = fbm(p * 1.7 + warp * 1.25 + vec2(-t * 0.05, 0.0));
  float pool = mix(1.0, smoothstep(uTop, 0.0, uv.y), uLow);
  float d = smoothstep(0.40, 0.88, n) * pool * uDensity;
  vec2 m = (uv - uMouse) * vec2(aspect, 1.0);
  d *= 1.0 - 0.85 * smoothstep(0.30, 0.0, length(m)) * uMouseAmt;
  d = clamp(mix(d, 1.0, uDissolve), 0.0, 1.0);
  gl_FragColor = vec4(uColor * d, d);
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(log || 'shader compile failed');
  }
  return s;
}

export function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/**
 * @returns {null | { render(state), resize(), destroy() }}
 */
export function createMist(canvas, { density = 0.6, low = 0.6, top = 1.05, seed = 0, color = '#D5E2F1', scale = 0.5 } = {}) {
  let gl;
  try {
    gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });
  } catch {
    gl = null;
  }
  if (!gl) return null;

  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'link failed');
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.warn('[mist]', err);
    return null;
  }
  gl.useProgram(program);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = {};
  ['uRes', 'uTime', 'uMouse', 'uMouseAmt', 'uDissolve', 'uDensity', 'uLow', 'uTop', 'uSeed', 'uColor'].forEach((name) => {
    u[name] = gl.getUniformLocation(program, name);
  });
  const rgb = hexToRgb(color);
  gl.uniform3f(u.uColor, rgb[0], rgb[1], rgb[2]);
  gl.uniform1f(u.uDensity, density);
  gl.uniform1f(u.uLow, low);
  gl.uniform1f(u.uTop, top);
  gl.uniform1f(u.uSeed, seed);
  gl.clearColor(0, 0, 0, 0);

  const resize = () => {
    const w = Math.max(2, Math.round(canvas.clientWidth * scale));
    const h = Math.max(2, Math.round(canvas.clientHeight * scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.uniform2f(u.uRes, w, h);
  };
  resize();

  return {
    render({ time, mouseX, mouseY, mouseAmt, dissolve }) {
      gl.uniform1f(u.uTime, time);
      gl.uniform2f(u.uMouse, mouseX, mouseY);
      gl.uniform1f(u.uMouseAmt, mouseAmt);
      gl.uniform1f(u.uDissolve, dissolve);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    resize,
    // Don't force-lose the context here: a canvas keeps handing back the same
    // context, and a remount (React StrictMode, fast refresh) would get a dead one.
    destroy() {
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    },
  };
}
