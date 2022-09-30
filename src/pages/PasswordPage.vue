<template>
  <base-layout :header="true" :navbar="true" :previous="true" @save-profile="SaveProfile()">
    <div class="edit-password">
      <ion-label for="name">Mot de passe actuel</ion-label>
      <div class="password">
        <ion-input :type="show1 ? 'text' : 'password'" v-model="currentPassword" placeholder="Mot de passe actuel"></ion-input>
        <ion-icon name="eye-outline" v-if="!show1" @click="show1 = !show1"></ion-icon>
        <ion-icon name="eye-off-outline" v-else @click="show1 = !show1"></ion-icon>
      </div>
      <ion-label for="name">Nouveau mot de passe</ion-label>
      <div class="password">
        <ion-input :type="show2 ? 'text' : 'password'" v-model="newPassword" placeholder="Nouveau mot de passe" @keyup.enter="EditPassword()"></ion-input>
        <ion-icon name="eye-outline" v-if="!show2" @click="show2 = !show2"></ion-icon>
        <ion-icon name="eye-off-outline" v-else @click="show2 = !show2"></ion-icon>
      </div>    
      <ion-button type="button" @click="EditPassword()">
        <load-spinner v-if="loading"></load-spinner>
        <p v-else>Modifier</p>
      </ion-button>
      <small v-if="message">{{ message }}</small>
    </div>
  </base-layout>
</template>

<script>
import { IonLabel, IonInput, IonButton, IonIcon } from '@ionic/vue';
export default {
  name: 'PasswordPage',
  components: {
    IonLabel,
    IonInput,
    IonButton,
    IonIcon
  },
  data() {
    return {
      show1: false,
      show2: false,
      currentPassword: '',
      newPassword: '',
      message: '',
      loading: false,
      Pregex: /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/
    }
  },
  methods: {
    async EditPassword() {
      this.loading = true;
      if (this.currentPassword && this.newPassword) {
        this.message = '';
        if (!this.Pregex.test(this.newPassword)) {
          this.message = 'Le mot de passe doit contenir au moins 8 caractères et au minimum 1: majuscule, minuscule, chiffre, caractère spécial';
          this.loading = false;
          return;
        }
        const res = await this.$users.editPassword({
          password: this.currentPassword,
          newPassword: this.newPassword
        });
        this.message = res.data;
        if (res.status == 201)
        setTimeout(() => { this.$router.go(-1);}, 1000);
      } else {
        this.message = 'Veuillez remplir tous les champs';
      }      
      this.loading = false;
    }
  },
}
</script>

<style lang="scss" scoped>
.edit-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  ion-label {
    width: 100%;
    color: var(--ion-color-dark-tint);
  }
  
  .password {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 30px 0;
    padding: 0 12px 0 0;
    border-radius: 15px;
    box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.05);

    ion-input {
      margin: 0;
      box-shadow: none;
    }

    ion-icon {
      font-size: 20px;
    }
  }
  
  small {
    margin: 20px 0;
    color: var(--ion-color-danger);
  }
}
</style>