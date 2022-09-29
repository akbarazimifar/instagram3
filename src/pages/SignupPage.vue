<template>
  <base-layout>
  <div class="signup">
    <ion-img class="logo" src="../assets/images/logo2.webp"></ion-img>
    <form>
      <ion-input type="email" v-model="email" placeholder="E-mail"></ion-input>
      <ion-input type="text" v-model="name" placeholder="Nom complet"></ion-input>
      <ion-input type="text" v-model="username" placeholder="Nom d'utilisateur"></ion-input>
      <div class="password">
        <ion-input :type="show ? 'text' : 'password'" v-model="password" placeholder="Mot de passe" @keyup.enter="Signup()"></ion-input>
        <ion-icon name="eye-outline" v-if="!show" @click="show = !show"></ion-icon>
        <ion-icon name="eye-off-outline" v-else @click="show = !show"></ion-icon>
      </div>      
      <small v-if="message">{{ message }}</small>
      <ion-button type="button" @click="Signup()">
        <load-spinner v-if="loading"></load-spinner>
        <p v-else>S'inscrire</p>
      </ion-button>
    </form>
    <section class="meta">
      <p>Vous avez un compte ? <a @click="$router.push({name: 'Login'})">Connectez-vous</a></p>
    </section>
  </div>
  </base-layout>
</template>

<script>
import { IonImg, IonInput, IonButton, IonIcon } from '@ionic/vue';
export default {
  name: 'SignupPage',
  components: {
    IonImg,
    IonInput,
    IonButton,
    IonIcon
  },
  data() {
    return {
      show: false,
      email: '',
      name: '',
      username: '',
      password: '',
      message: '',
      loading: false,
      Uregex: /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/,
      Pregex: /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/
    }
  },
  methods: {
    async Signup() {
      this.loading = true;
      if (this.email && this.password && this.name && this.username) {
        this.message = '';
        if (!this.Uregex.test(this.username)) {
          this.message = 'Nom d\'utilisateur invalide';
          this.loading = false;
          return;
        }
        if (!this.Pregex.test(this.password)) {
          this.message = 'Le mot de passe doit contenir au moins 8 caractères et au minimum 1: majuscule, minuscule, chiffre, caractère spécial';
          this.loading = false;
          return;
        }
        this.message = await this.$users.register({
          email: this.email,
          name: this.name,
          username: this.username,
          password: this.password
        });
        !this.message ? this.$router.push({name: 'Feed'}) : null;
      } else {
        this.message = 'Veuillez remplir tous les champs';
      }      
      this.loading = false;
    }
  },
  async mounted() {
    const ret = await this.$Preferences.get({ key: 'user' });
    const user = JSON.parse(ret.value)
    user ? this.$router.push({name: 'Feed'}) : null;
  }
}
</script>