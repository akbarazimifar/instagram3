<template>
  <div class="navbar">
    <ion-icon :name="`home${route != 'Feed' ? '-outline' : ''}`" @click="$router.push({ name: 'Feed'})"></ion-icon>
    <ion-icon :name="`search${route != 'Search' ? '-outline' : ''}`" @click="$router.push({ name: 'Search'})"></ion-icon>
    <ion-icon :name="`add-circle${route != 'NewPost' ? '-outline' : ''}`" @click="$router.push({ name: 'NewPost'})"></ion-icon>
    <ion-icon :name="`heart${route != 'Notifs' ? '-outline' : ''}`" @click="$router.push({ name: 'Notifs'})"></ion-icon>
    <ion-icon :name="`person${route != 'Profile' ? '-outline' : ''}`" @click="$router.push({ name: 'Profile'})"></ion-icon>
  </div>
</template>

<script>
import { IonIcon } from '@ionic/vue';
export default {
  name: 'NavBar',
  components: {
    IonIcon
  },
  data() {
    return {
      route: 'Feed'
    }
  },
  mounted() {
    this.route = this.$route.name;
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 55px;
  padding: 0 15px;
  z-index: 10;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  background-color: var(--ion-color-primary-contrast);
  ion-icon {
    font-size: 27px;
  }
}
</style>
