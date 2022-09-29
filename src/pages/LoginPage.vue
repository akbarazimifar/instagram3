<template>
  <base-layout>
  <div class="login">
    <ion-img class="logo" src="../assets/images/logo2.webp"></ion-img>
    <form>
      <ion-input type="email" v-model="email" placeholder="Nom d'utilisateur ou e-mail"></ion-input>
      <div class="password">
        <ion-input :type="show ? 'text' : 'password'" v-model="password" placeholder="Mot de passe" @keyup.enter="Login()"></ion-input>
        <ion-icon name="eye-outline" v-if="!show" @click="show = !show"></ion-icon>
        <ion-icon name="eye-off-outline" v-else @click="show = !show"></ion-icon>
      </div>
      <small v-if="message">{{ message }}</small>
      <ion-button type="button" @click="Login()">
        <load-spinner v-if="loading"></load-spinner>
        <p v-else>Se connecter</p>
      </ion-button>
      <a href="">Mot de passe oublié ?</a>
    </form>
    <section class="meta">
      <p>Vous n'avez pas de compte ? <a @click="$router.push({name: 'Signup'})">Inscrivez-vous</a></p>
    </section>
  </div>
  </base-layout>
</template>

<script>
import { IonImg, IonInput, IonButton, IonIcon } from '@ionic/vue';
export default {
  name: 'LoginPage',
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
      password: '',
      message: '',
      loading: false,
    }
  },
  methods: {
    async Login() {
      this.loading = true;
      if (this.email && this.password) {
        this.message = '';
        this.message = await this.$users.login({
          email: this.email,
          password: this.password
        });
        !this.message ? this.$router.push({name: 'Feed'}) : null;
      }else {
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
