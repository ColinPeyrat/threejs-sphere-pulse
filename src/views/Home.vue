<template>
</template>

<script>
import WebGL from 'webgl';
export default {
  name: 'home',
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

<style lang="scss" scoped>
h1 {
  color: mediumaquamarine;
}
</style>


