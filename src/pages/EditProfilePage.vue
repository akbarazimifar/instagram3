<template>
  <base-layout :header="true" :navbar="true" :previous="true" @save-profile="SaveProfile()">
    <div class="edit">
      <ion-avatar>
        <ion-img :src="'https://vueinsta.herokuapp.com/images/profile/' + user.profile_picture"></ion-img>
      </ion-avatar> 
      <ion-input type="file" ref='file' @change="previewFiles"></ion-input>
      <ion-label for="name">Nom complet</ion-label>
      <ion-input name="name" type="text" v-model="user.name" placeholder="Nom complet"></ion-input>
      <ion-label for="username">Nom d'utilisateur</ion-label>
      <ion-input name="username" type="text" v-model="user.username" placeholder="Nom d'utilisateur"></ion-input>
      <ion-label for="website">Lien ou site web</ion-label>
      <ion-input name="website" type="text" v-model="user.website" placeholder="Lien ou site web"></ion-input>
      <ion-label for="category">Catégorie</ion-label>
      <ion-select name="category" v-model="user.account_type" interface="action-sheet" placeholder="Choisir une catégorie" cancel-text="Annuler" @ionChange="user.account_type = $event.detail.value">
        <ion-select-option v-for="category in categories" :key="category" :value="category">{{ category }}</ion-select-option>
      </ion-select>
      <ion-label for="description">Biographie</ion-label>
      <textarea name="description" v-model="user.description" placeholder="Bio"></textarea>
      <ion-button type="button" @click="SaveProfile()">
        <load-spinner v-if="loading"></load-spinner>
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
      loading: false,
      Uregex: /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/
    }
  },
  methods: {
    async previewFiles(event) {
      const img = event.target.files[0];
      let fd = new FormData();
      fd.append('image', img, this.user.id);
      const res = await this.$users.profilePicture({image: fd, type: img.type});
      res == 201 ? location.reload() : null;
    },
    async SaveProfile() {
      this.loading = true;
      if (!this.Uregex.test(this.user.username)) {
        this.message = 'Nom d\'utilisateur invalide';
        this.loading = false;
        return;
      } else {
        const res = await this.$users.editProfile(this.user);
        this.message = res.data;
        if (res.status == 201)
        setTimeout(() => { this.$router.go(-1);}, 1000);
      }
      this.loading = false;
    }
  },
  async mounted() {
    const ret = await this.$Preferences.get({ key: 'user' });
    this.user = JSON.parse(ret.value);
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
    height: 80px;
    width: 80px;
    margin: 0 0 20px 0;
    padding: 3px;
    border-radius: 50%;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    background: linear-gradient(to left, #4f5bd5, #7f50c9, #9f45b9, #b738a6, #c82e92, #db3582, #e94473, #f15665, #fd785c, #ff9a5b, #ffbb62, #feda75);
  }
  ion-label {
    width: 100%;
    color: var(--ion-color-dark-tint);
  }
  ion-input, ion-select {
    margin: 5px 0 20px 0;
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