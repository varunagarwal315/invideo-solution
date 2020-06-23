<template>
  <div id="app">
    <div style="margin-bottom:24px;">
      <h1>Hello InVideo!</h1>
      <v-btn @click="loadSolution">Click to test</v-btn>
    </div>
    <!-- <div class="mt-24">
      <router-link :to="{ name: 'CanvasPage' }">Go to canvas editor</router-link>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class App extends Vue {
  public loadSolution() { this.$router.push({ name: 'ScrollPage' }) };
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mt-24 {
  margin-top: 24px;
}
</style>
