#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;

void main() {
	vec2 position = vUv;

	gl_FragColor = vec4(position.x,position.y,1.0,1.0);
}