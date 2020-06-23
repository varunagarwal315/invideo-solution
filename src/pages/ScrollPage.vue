<template>
  <div id="app">
    <aside class="sidebar" ref="sidebar">
      <ul>
        <li v-for="(item, index) in list">
          <img :src="item.download_url" alt="Loading..." draggable="true">
        </li>
      </ul>
    </aside>
    <div>
      <v-btn @click="toggleAspectRatio(16/9)">Landscape</v-btn>
      <v-btn @click="toggleAspectRatio(9/16)">Portrait</v-btn>
    </div>
    <div style="margin-top:24px;">
      {{this.progressMsg}}
    </div>
    <div class="main">
      <k-stage :config="configKonva" ref="kStage" style="border: 1px solid black">
        <k-layer ref="kLayer">
        </k-layer>
      </k-stage>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getImagesFromPiscumApi, AxiosError } from '@/services/piscumApi';
import { IPiscumRes } from '@/interfaces/IPiscumResponse';
interface ConfigKona { width: number; height: number; aspectRatio: number; };

@Component({
  components: {}
})
export default class ScrollPage extends Vue {
  private list: IPiscumRes[] = [];
  private page: number = 1;
  private limit: number = 2; // TODO: Decides number of images to fetch
  private isLoading: boolean = false;
  private loadedImages: any = []; // For multiple image manipulation
  private selectedImg: string = '';
  private progressMsg: string = ``;
  // Build .d.ts files
  private stage: any;
  private con: any;
  private layer: any;

  private configKonva = {
    width: 200,
    height: 500,
    aspectRatio: 9/16
  }

  async mounted() {
    await this.getImagesFromPiscum();
    (this.$refs.sidebar as HTMLDivElement).addEventListener(
      'scroll',
      () => this.handleScroll()
    );
    (this.$refs.sidebar as HTMLDivElement)
      .addEventListener('dragstart', (e) => {
        console.log('dragging ' + e.target.src);
        this.progressMsg = `Dragging ${e.target.src}`;
        this.selectedImg = e.target.src;
    });

    this.stage = this.$refs.kStage.getNode();
    this.layer = this.$refs.kLayer.getNode();
    this.con = this.stage.container();

    this.con.addEventListener('dragover', function (e) {
      this.progressMsg = `Dragging image over canvas`;
      e.preventDefault(); // !important
    });

    this.con.addEventListener('drop', (e) => {
      e.preventDefault();
      this.progressMsg = 'Image dropped';
      this.stage.setPointersPositions(e); // optional
      this.redrawCanvas();
    });
    this.toggleAspectRatio(); // initial aspect hardcoded as it is
  }

  public redrawCanvas() {
    if (!this.selectedImg) {
      console.log('blank canvas...');
      return;
    }
    this.clearCanvas();
    this.drawBlurredImg();
    this.progressMsg = `Completed - ${this.selectedImg}`;
  }

  public drawPrimaryImage() {
    Konva.Image.fromURL(this.selectedImg, (image: any) => {
      this.progressMsg = `Resizing original image - ${this.selectedImg}`;
      this.layer.add(image);
      let width = image.getAttr('width');
      let height = image.getAttr('height');
      let configAR = this.configKonva.aspectRatio;
      let aspectRatio = width / height;
      console.log(`Original ${width}, ${height}`);
      if (configAR > 1) {
        console.log('Landscape mode');
        height = this.configKonva.height;
        width = height * aspectRatio;

      } else {
        width = this.configKonva.width;
        height = width / aspectRatio;
      }
      console.log(`New ${width}, ${height}`);
      // If its larger, we will get negative offset !
      const x = (this.configKonva.width - width) / 2;
      const y = (this.configKonva.height - height) / 2;
      image.setAttrs({
        width,
        height,
        x,
        y
      });
      this.layer.add(image);
      this.loadedImages.push(image);
      // image.position(stage.getPointerPosition());
      image.draggable(false);
      this.layer.draw();
    });
  }

  public drawBlurredImg() {
    this.progressMsg = `Blurring corners - ${this.selectedImg}`;
    Konva.Image.fromURL(this.selectedImg, (image: any) => {
      this.layer.add(image);
      let width = image.getAttr('width');
      let height = image.getAttr('height');
      let configAR = this.configKonva.aspectRatio;
      let aspectRatio = width / height;
      image.setAttrs({
        width,
        height,
        blurRadius: 20
      });
      image.cache();
      image.filters([Konva.Filters.Blur]);
      this.layer.add(image);
      this.loadedImages.push(image);
      // image.position(stage.getPointerPosition());
      image.draggable(false);
      this.layer.draw();
      this.drawPrimaryImage();
    });
  }

  public clearCanvas() {
    // this.loadedImages.map(item => this.layer.remove(item));
    // this.loadedImages = [];
    this.layer.removeChildren();
    this.layer.draw();
  }

  beforeDestroy () {
    const bar = this.$refs.sidebar as HTMLDivElement;
    if (bar) {
      bar.removeEventListener('scroll', this.handleScroll);
    }
    // Remove other listeners as well
  }

 public async getImagesFromPiscum(limit: number = 12, page = 0) {
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
  }

  public async handleScroll() {
    const { clientHeight, scrollTop, scrollHeight  } = this.$refs.sidebar as HTMLDivElement;
    if (scrollTop + clientHeight === scrollHeight && !this.isLoading) {
      this.isLoading = true;
      console.log('reached bottom');
      this.page++;
      const response = await getImagesFromPiscumApi(this.limit, this.page);
      const data: IPiscumRes[] = response.data;
      this.list = [...this.list, ...response.data];
      this.isLoading = false; // can delay this a bit
    } else {
      // Blocked scrolling
    }
  }

  public toggleAspectRatio(aspectRatio: number = (9/16)) {
    this.configKonva.width = this.configKonva.height * aspectRatio;
    this.configKonva.aspectRatio = aspectRatio;
    this.redrawCanvas();
  }
}

</script>

<style lang="scss">
.main {
  max-width: 1200px;
  padding: 64px;
  position: relative;
  margin-left: 20rem;
  display: flex;
  justify-content: space-around;
}
.sidebar {
  font-size: 16px;
  background-color: #fff;
  width: 20rem;
  position: fixed;
  z-index: 10;
  margin: 0;
  top: 3.6rem;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  border-right: 1px solid #eaecef;
  overflow-y: auto;
}
.sidebar ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.sidebar ul li {
  display: flex;
  justify-content: space-around;
  padding: 24px;
}
</style>
