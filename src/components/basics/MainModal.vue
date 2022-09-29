<template>
  <div class="modal" v-if="show1">
    <Transition name="slide-fade">
      <div v-if="show2">
        <p v-for="option in options" :key="option" @click="Choose(option.value)">{{ option.name }}</p>
        <ion-button @click="$emit('toggle-modal', false)">Annuler</ion-button>
      </div>
    </Transition>
  </div>
</template>

<script>
import { IonButton } from '@ionic/vue';
export default {
  name: 'MainModal',
  props: ['modal'],
  components: {
    IonButton
  },
  data() {
    return {
      show1: false,
      show2: false,
      options: [
        {name: 'Paramètres généraux', value: 'Params'},
        {name: 'Confidentialité et sécurité', value: 'CGU'},
        {name: 'Signaler un problème', value: 'Signal'},
        {name: 'Se déconnecter', value: 'Logout'},
      ]
    }
  },
  watch: {
    modal() {
      if (!this.show1) {
        this.show1 = true;
        setTimeout(async () => {
          this.show2 = true;
        }, "10")
      } else {
        this.show2 = false;
        setTimeout(async () => {
          this.show1 = false;
        }, "200")
      }      
    }
  },
  methods: {
    async Choose (value) {
      if (value == 'Logout') {
        this.show2 = false;
        setTimeout(async () => {
          await this.$Preferences.remove({key: 'user'});
          await this.$Preferences.remove({key: 'token'});
          this.$emit('toggle-modal', false);
          setTimeout(async () => {
            this.show1 = false;
          this.$router.push({name: 'Home'})
          }, "200")
        }, "200");        
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: end;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  padding: 0 15px;
  z-index: 15;
  background-color: rgba(146, 148, 156, 0.5);

  div {
    width: 100%;
    height: auto;
    padding: 20px 15px;
    border-radius: 10px 10px 0 0;
    background-color: var(--ion-color-primary-contrast);

    ion-button {
      color: var(--ion-color-dark-tint);
      --background: var(--ion-color-light);
      --box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
    }

    p {
      width: 90%;
      margin: auto;
      padding: 15px;
      text-align: center;
      border-bottom: 1px solid var(--ion-color-light-shade);
      &:first-child {
        padding: 0 0 15px 0;
      }
      &:nth-child(4) {
        border: none;
        padding: 15px 0 30px 0;
      }
    }
  }

  .slide-fade-enter-active {
    transition: all 0.2s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(100%);
  }
}
</style>