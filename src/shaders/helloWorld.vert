/**
 * Multiply each vertex by the
 * model-view matrix and the
 * projection matrix (both provided
 * by Three.js) to get a final
 * vertex position
 */


uniform float u_amplitude;
attribute float displacement;

// create a shared variable for the
// VS and FS containing the normal
varying vec3 vNormal;

void main() {
  // set the vNormal value with
  // the attribute value passed
  // in by Three.js
  vNormal = normal;

  // push the displacement into the
  // three slots of a 3D vector so
  // it can be used in operations
  // with other 3D vectors like
  // positions and normals
  //vec3 newPosition = position + normal * vec3(displacement);

  // multiply our displacement by
  // the amplitude. The amp will
  // get animated so we'll have
  // animated displacement
  vec3 newPosition =
    position + normal *
    vec3(displacement * u_amplitude);

  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(newPosition,1.0);
}