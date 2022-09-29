<template>
  <base-layout>
    <div class="home">
      <ion-img class="logo" src="../assets/images/logo-white.webp"></ion-img>
      <ion-button type="button" @click="$router.push({name: 'Login'})"><p>Se connecter</p></ion-button>
      <ion-button type="button" @click="$router.push({name: 'Signup'})"><p>S'inscrire</p></ion-button>
      <h5>Rejoignez-nous pour voir les photos et vidéos de vos amis.</h5>
      <section class="meta">
        <p>from</p>
        <ion-img src="../assets/images/logo-meta.webp"></ion-img>
      </section>
    </div>
  </base-layout>
</template>

<script>
import { IonImg, IonButton } from '@ionic/vue';
export default {
  name: 'HomePage',
  components: {
    IonImg,
    IonButton
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right bottom, #002296, #601693, #8d008c, #b10081, #cd0074, #e11367, #f12c59, #fc4449, #ff6437, #ff8225, #ff9e0e, #f6ba00);

  .logo {
    width: 60%;
    transform: translateY(-10vh);
  }

  h5 {
    width: 75%;
    margin: 2vh 0 0 0;
    font-size: 18px;
    text-align: center;
    font-weight: normal;
    font-family: 'Linotte';
    color: var(--ion-color-primary-contrast);
  }

  ion-button {
    width: 75%;
    height: 45px;
    margin: 0 0 25px 0;
    font-size: 15px;
    color: var(--ion-color-primary);
    --background: var(--ion-color-primary-contrast);
    --box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
  }
}
</style>
