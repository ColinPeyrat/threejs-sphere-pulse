<template>
  <section class="interactive-story">
    <p>yo</p>
  </section>
</template>

<script>
import WebGL from 'webgl';
export default {
  name: 'interactive-story',
  data() {
    return {
      webgl: null
    };
  },
  mounted() {
    this.webgl = new WebGL();
  }
};
</script>
