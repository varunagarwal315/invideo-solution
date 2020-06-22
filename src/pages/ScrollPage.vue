<template>
  <div id="app">
    <aside class="sidebar" ref="sidebar">
      <ul>
        <li v-for="(item, index) in list">
          <v-img
             width="250px"
             :src="item.download_url"
             draggable=""
             alt="IMAGE"
           ></v-img>
        </li>
      </ul>
    </aside>
    <div class="main">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getImagesFromPiscumApi, AxiosError } from '@/services/piscumApi';
import { IPiscumRes } from '@/interfaces/IPiscumResponse';

@Component({
  components: {}
})
export default class ScrollPage extends Vue {
  private list: IPiscumRes[] = [];
  private page: number = 1;
  private limit: number = 1; // increase to 4
  private isLoading: boolean = false;

  async mounted() {
    this.getImagesFromPiscum();
    // this.scroll();
    this.$refs.sidebar.addEventListener('scroll', () => this.handleScroll(this.$refs.sidebar));
  }

  destroyed () {
    if (this.$refs.sidebar) {
      this.$refs.sidebar.removeEventListener('scroll', () => this.handleScroll(this.$refs.sidebar));
    }
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

  async public handleScroll(sidebar: any) {
    const { offsetHeight, clientHeight } = sidebar;
    if (offsetHeight === clientHeight && !this.isLoading) {
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

  // remove scroll onDestroy
}

</script>

<style lang="scss">
.images-container {
  max-width: 1200px;
  padding-bottom: 30px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}

.images-item {
  width: 33.333%;
  padding: 1%;
}

.images-card {
  width: 100%;
  height: 0;
  padding-bottom: 70%;
  position: relative;
}

.images-card__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: middle;
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
.main {
  position: relative;
  margin-left: 20rem;
  height: 500px;
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
