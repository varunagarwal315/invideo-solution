<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>ssssssssssssss</p>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Prop, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import { getImagesFromPiscumApi } from '@/services/piscumApi';

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {


}
</script>
