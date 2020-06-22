<!-- <template>
  <section>
    <div class="btn-wrapper">
      <v-btn type="button" name="button" @click="toggleAspectRatio(1)">Square</v-btn>
      <v-btn type="button" name="button" @click="toggleAspectRatio(16/9)">Landscape</v-btn>
      <v-btn type="button" name="button" @click="toggleAspectRatio(9/16)">Portrait</v-btn>
    </div>
    <div class="canvas-wrapper">
      <canvas ref="canvas"></canvas>
    </div>
  </section>
</template>

<script lang="ts">
import { getImagesFromPiscumApi, AxiosError } from '@/services/piscumApi';
import { IPiscumRes } from '@/interfaces/IPiscumResponse';

export default {
  name: 'CanvasPage',
  data: () => ({
    list: IPiscumRes[] = [],
    page: number = 1,
    limit: number = 12
  }),
  mounted() {
    this.$refs.canvas.height = '400';
    this.$refs.canvas.width = this.$refs.canvas.height * 1;
  },
  methods: {
    toggleAspectRatio(aspectRatio: number = (9/16)) {
      this.$refs.canvas.height = '300';
      this.$refs.canvas.width = this.$refs.canvas.height * aspectRatio;
    },
    async getImagesFromPiscum(limit: number = 12, page = 0) {
      try {
        const response = await getImagesFromPiscumApi(limit, page);
        this.list = response.data;
        console.log(this.list);

      } catch (e) {
        // do something?
        console.log(e);
        if (e.response) {
          // interface ServerError { } --> AxiosError<ServerError>
          const myError = e as AxiosError<any>;
          console.log(e.response);
        }
      };
    },
    scroll() {
      const self = this;
      window.onscroll = async () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          console.log('reached bottom');
          self.page++;
          const response = await getImagesFromPiscumApi(this.limit, this.page);
          const data: IPiscumRes[] = response.data;
          self.list = [...self.list, ...response.data];
        }
      }
    }
  }
}
</script>

<style lang="scss">
.canvas-wrapper {
  margin-top: 64px;
  // background: white;
  // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}
.btn-wrapper {
  margin-top: 24px;
  display: flex;
  justify-content: space-around;
}
canvas {
  box-shadow: 1px 1px 2px 3px rgba(0, 0, 0, 0.2);
  // height: 100px;
  // width: 100px
}
</style> -->
