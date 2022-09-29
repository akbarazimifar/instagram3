<template>
  <ion-page>
    <div class="header" v-if="header">
      <ion-icon name="chevron-back" class="previous" v-if="previous" @click="modal ? $emit('toggle-modal', false) : $router.go(-1)"></ion-icon>
      <h2 v-if="$route.name == 'Feed'">Instagram</h2>
      <ion-icon v-if="$route.name == 'Feed'" class="messages" name="chatbubble-ellipses"></ion-icon>
      <ion-icon v-if="$route.name == 'Profile'" name="ellipsis-vertical" @click="$emit('toggle-modal', !modal ? true : false)"></ion-icon>
    </div>
    <ion-content :fullscreen="true">
      <ion-refresher v-if="$route.name == 'Feed' && scroll < 200" :class="{modal: scrolling}" slot="fixed" @ionRefresh="doRefresh($event)" pull-min="5" pull-max="100">
        <load-spinner :refresher="true"></load-spinner>
      </ion-refresher>
      <div class="screen" ref="screen" :style="screenStyle" @scroll="setScroll()">
        <slot />
      </div>      
    </ion-content>
    <Transition name="fade">
      <Navbar v-if="navbar" />
    </Transition>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonIcon, IonRefresher } from '@ionic/vue';
import Navbar from './NavBar.vue'
export default {
  name: 'BaseLayout',
  props: ['header', 'previous', 'navbar', 'modal'],
  components: {
    IonPage,
    IonContent,
    IonIcon,
    Navbar,
    IonRefresher
  },
  data() {
    return {
      screenStyle: {
        paddingTop: '0',
        paddingBottom: '0',
      },
      user: {},
      scroll: 0,
      scrolling: true
    }
  },
  methods: {
    setScroll () {
      this.scrolling ? this.scroll = this.$refs.screen.scrollTop : null;
    },
    doRefresh (event) {
      this.scrolling = false;
      setTimeout(() => {
        event.target.complete();
        this.scrolling = true;
      }, 2000);
    }
  },
  async mounted() {
    const ret = await this.$Preferences.get({ key: 'user' });
    this.user = JSON.parse(ret.value);
    this.header ? this.screenStyle.paddingTop = '55px' : null;
    this.navbar ? this.screenStyle.paddingBottom = '65px' : null;
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 55px;
  padding: 0 15px;
  z-index: 10;
  background-color: var(--ion-color-primary-contrast);

  h2 {
    margin: 0;
    font-weight: bold;
  }

  ion-icon {
    margin: 0 0 0 10px;
    &.previous {
      margin: 0;
    }
    &.messages {
      transform: rotateY(180deg);
    }
  }
}

ion-refresher   {
  display: flex;
  align-items: end;
  z-index: 1;
  height: 60px;
  transition: all 0.4s;
}

.modal {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.2s ease-out;
}
.fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(100%);
}
</style>