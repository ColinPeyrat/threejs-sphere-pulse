#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
uniform float u_time;

void main() {
	vec2 position = vUv;

	float red = position.x * abs(sin(u_time));
  float green = position.y * abs(sin(u_time));

	gl_FragColor = vec4(red,green,1.0,1.0);
}