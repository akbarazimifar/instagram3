<template>
  <base-layout :header="true" :navbar="true" :previous="true">
    <label class="select" v-if="!images.length" for="files">Choisir des images</label>
    <input type="file" id='files' multiple @change="changeImages" />
    <div v-if="images.length" class="slider">
      <label for="files" v-for="image in images" :key="image" :style="{backgroundImage: 'url(' + image + ')'}"></label>
    </div>    
    <textarea id="description" v-model="description" placeholder="Description du post..."></textarea>
    <ion-button type="button" @click="Post()">
      <load-spinner v-if="loading"></load-spinner>
      <p v-else>Publier</p>
    </ion-button>
    <small v-if="message">{{ message }}</small>
  </base-layout>
</template>

<script>
import { IonButton } from '@ionic/vue';
export default {
  name: 'NewPostPage',
  components: {
    IonButton
  },
  data() {
    return {
      user: {},
      images: [],
      description: '',
      loading: false,
      message: ''
    }
  },
  methods: {
    changeImages(event) {
      this.images = [];
      this.files = event.target.files;
      for (let i = 0; i < this.files.length; i++) {
        this.images.push(URL.createObjectURL(this.files[i]));
      }
    },
    async Post() {
      this.loading = true;
      this.message = '';
      if (this.images.length) {
        let formData = new FormData();
        for( var i = 0; i < this.files.length; i++ ){
          formData.append('images', this.files[i]);
        }
        formData.append('description', this.description);
        formData.append('userId', this.user.id);
        const res = await this.$posts.create(formData);
        if (res.status == 201) {
          this.$router.push({name: 'Feed'});
        } else {
          this.message = res.data;
        }
      } else {
        this.message = 'Veuillez sélectionenr au moins 1 image';
      }
      this.loading = false;      
    }
  },
  async mounted() {
    this.user = await this.$users.fetchCurrent();
  },
  async ionViewWillEnter() {
    this.user = await this.$users.fetchCurrent();
  }
}
</script>

<style lang="scss" scoped>
.select {
  align-items: center;
  justify-content: center;
}
.select, .slider {
  display: flex;
  min-width: calc(100vw - 40px);
  min-height: calc(100vw - 40px);
  margin: 20px 0 0 0;
  overflow: auto;
  border-radius: 15px;
  scroll-snap-type: x mandatory;
  background-color: var(--ion-color-light-shade);
  label {
    min-width: 100%;
    scroll-snap-align: start;
    background-size: cover;
    background-position: center center;
  }
}

input {
  display: none;
}

textarea {
  min-width: calc(100% - 40px);
  max-width: calc(100% - 40px);
  min-height: 200px;
  max-height: 200px;
  margin: 20px;
  outline: none;
}

ion-button {
  width: calc(100% - 40px);
}

small {
  margin: 20px 0;
  color: var(--ion-color-danger);
}
</style>

