<template>
  <base-layout :header="true" :navbar="true" :previous="true" @save-profile="SaveProfile()">
    <div class="edit">
      <ion-avatar>
        <ion-img :src="'https://vueinsta.herokuapp.com/images/profile/' + user.profile_picture"></ion-img>
      </ion-avatar> 
      <label for="file" class="file">
        <load-spinner v-if="loading2"></load-spinner>
        <p v-else>Changer l'image de profile</p>
      </label>
      <input type="file" id='file' @change="changePicture" />
      <ion-label for="name">Nom complet</ion-label>
      <ion-input id="name" type="text" v-model="user.name" placeholder="Nom complet"></ion-input>
      <ion-label for="username">Nom d'utilisateur</ion-label>
      <ion-input id="username" type="text" v-model="user.username" placeholder="Nom d'utilisateur"></ion-input>
      <ion-label for="website">Lien ou site web</ion-label>
      <ion-input id="website" type="text" v-model="user.website" placeholder="Lien ou site web"></ion-input>
      <ion-label for="category">Catégorie</ion-label>
      <ion-select id="category" v-model="user.account_type" interface="action-sheet" placeholder="Choisir une catégorie" cancel-text="Annuler" @ionChange="user.account_type = $event.detail.value">
        <ion-select-option v-for="category in categories" :key="category" :value="category">{{ category }}</ion-select-option>
      </ion-select>
      <ion-label for="description">Biographie</ion-label>
      <textarea id="description" v-model="user.description" placeholder="Bio"></textarea>
      <ion-button type="button" @click="SaveProfile()">
        <load-spinner v-if="loading1"></load-spinner>
        <p v-else>Sauvegarder</p>
      </ion-button>
      <small v-if="message">{{ message }}</small>
    </div>
  </base-layout>
</template>

<script>
import { IonAvatar, IonImg, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
export default {
  name: 'EditProfile',
  components: {
    IonAvatar,
    IonImg,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton
  },
  data() {
    return {
      user: {},
      categories: [
        'Artiste', 'Musicien', 'Blogueur', 'Mode',
        'Communauté', 'Créateur digital', 'Education',
        'Entrepreneur', 'Santé', 'Beauté', 'Écrivain',
        'Produit ou service', 'Gamer', 'Restauration',
        'Épicerie', 'Photographe', 'Shopping', 'Vidéaste'
      ],
      message: '',
      loading1: false,
      loading2: false,
      Uregex: /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/
    }
  },
  methods: {
    async changePicture(event) {
      this.loading2 = true;
      const img = event.target.files[0];
      let fd = new FormData();
      fd.append('image', img, this.user.id);
      const res = await this.$users.profilePicture({image: fd, type: img.type});
      res == 201 ? location.reload() : null;
      this.loading2 = false;
    },
    async SaveProfile() {
      this.loading1 = true;
      if (!this.Uregex.test(this.user.username)) {
        this.message = 'Nom d\'utilisateur invalide';
        this.loading1 = false;
        return;
      } else {
        const res = await this.$users.editProfile(this.user);
        this.message = res.data;
        if (res.status == 201)
        setTimeout(() => { this.$router.go(-1);}, 1000);
      }
      this.loading1 = false;
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
.edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 15px;
  ion-avatar {
    height: 100px;
    width: 100px;
    margin: 0 0 20px 0;
    padding: 3px;
    border-radius: 50%;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    background: linear-gradient(to left, #4f5bd5, #7f50c9, #9f45b9, #b738a6, #c82e92, #db3582, #e94473, #f15665, #fd785c, #ff9a5b, #ffbb62, #feda75);
  }
  .file {
    display: flex;
    justify-content: center;
    width: 65%;
    margin: 0 0 40px 0;
    padding: 8px 0;
    border-radius: 10px;
    transition: all 0.2s linear;
    background-color: var(--ion-color-light);
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
    &:active {
      background-color: var(--ion-color-light-shade);
    }
  }
  ion-label {
    width: 100%;
    color: var(--ion-color-dark-tint);
  }
  ion-input, ion-select {
    margin: 5px 0 20px 0;
  }
  input[type="file"] {
    display: none;
  }
  textarea {
    min-width: 100%;
    max-width: 100%;
    min-height: 100px;
    max-height: 200px;
    margin: 5px 0 40px 0;
    outline: none;
  }
  small {
    margin: 20px 0;
    color: var(--ion-color-danger);
  }
}
</style>