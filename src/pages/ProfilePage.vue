<template>
  <base-layout :navbar="!modal" :header="true" :previous="true" :modal="modal" @toggle-modal="ToggleModal">
    <div class="profile">
      <ion-avatar>
        <ion-img :src="user.profile_picture"></ion-img>
      </ion-avatar>    
      <h4>{{ user.name }}</h4>
      <small>{{ user.account_type }}</small>
      <p v-if="user.description" class="desc">{{ user.description }}</p>
      <div class="stats">
        <div>
          <h5>{{ user.nbposts }}</h5>
          <p>Posts</p>
        </div>
        <div>
          <h5>{{ user.nbfollowers }}</h5>
          <p>Abonnés</p>
        </div>
        <div>
          <h5>{{ user.nbfollowing }}</h5>
          <p>Suivis</p>
        </div>
      </div>
      <div class="buttons">
        <ion-button @click="$router.push({name: 'EditProfile'})">Modifier</ion-button>
        <ion-button>Enregistré</ion-button>
      </div>
    </div>
    <div class="stories">
      <div class="story" v-for="story in stories" :key="story.name">
        <ion-avatar>
          <ion-img v-if="story.img" :src="story.img"></ion-img>
          <ion-icon v-else name="add-outline"></ion-icon>
        </ion-avatar>
        <p>{{ story.name }}</p>
      </div>
    </div>
    <div class="posts__select">
      <div :class="{selected: userPosts}" @click="userPosts = true"><ion-icon name="grid-outline"></ion-icon></div>
      <div :class="{selected: !userPosts}" @click="userPosts = false"><ion-icon name="person-outline"></ion-icon></div>
    </div>
    <Transition name="slide-fade" mode="out-in">
      <div class="posts" v-if="userPosts">
        <div class="post" v-for="(post, index) in posts" :key="index" :style="{backgroundImage: 'url(' + post + ')'}"></div>
      </div>
      <div class="posts" v-else>
        <div class="post" v-for="(post, index) in identified" :key="index" :style="{backgroundImage: 'url(' + post + ')'}"></div>
      </div>    
    </Transition>
    <Modal :modal="modal" @toggle-modal="ToggleModal" />
  </base-layout>
</template>

<script>
import { IonAvatar, IonImg, IonIcon, IonButton } from '@ionic/vue';
import Modal from '../components/basics/MainModal';
export default {
  name: 'ProfilePage',
  components: {
    IonAvatar,
    IonImg,
    IonIcon,
    IonButton,
    Modal,
  },
  data() {
    return {
      userPosts: true,
      modal: false,
      user: {},
      stories: [
        {img: '../assets/images/stories/1.jpg', name: 'Piano'},
        {img: '../assets/images/stories/2.jpg', name: 'Rollers'},
        {img: '', name: 'Nouveau'}
      ],
      posts: [
        '../assets/images/posts/1.jpg',
        '../assets/images/posts/2.jpg',
        '../assets/images/posts/3.jpg',
        '../assets/images/posts/4.jpg',
        // "http://localhost:3000/images/profile/16645432857068.jpg",
      ],
      identified: [
        '../assets/images/posts/5.jpg',
        '../assets/images/posts/6.jpg',
        '../assets/images/posts/8.jpg'
      ],
      saved: [
        '../assets/images/posts/8.jpg',
        '../assets/images/posts/10.jpg',
      ]
    }
  },
  methods: {
    ToggleModal (value) {
      this.modal = value;
    }
  },
  async mounted() {
    const ret = await this.$Preferences.get({ key: 'user' });
    this.user = JSON.parse(ret.value);
  },
  async ionViewWillEnter() {
    const ret = await this.$Preferences.get({ key: 'user' });
    this.user = JSON.parse(ret.value);
  }
}
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 20px 20px 25px 20px;
  border-radius: 0 0 35px 35px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);

  ion-avatar {
    height: 100px;
    width: 100px;
    margin: 0 0 5px 0;
    padding: 3px;
    border-radius: 50%;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    background: linear-gradient(to left, #4f5bd5, #7f50c9, #9f45b9, #b738a6, #c82e92, #db3582, #e94473, #f15665, #fd785c, #ff9a5b, #ffbb62, #feda75);
  }

  small {
    margin: -5px 0 0 0;
  }

  p.desc {
    width: 100%;
    margin: 25px 0 0 0;
    font-size: 15px;
    text-align: center;
  }
}

.stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 35px 0 0 0;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
    height: auto;
  }
  p {color:  var(--ion-color-medium);}
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

ion-button {
  width: 45%;
  min-height: 35px;
  height: 35px;
  margin: 30px 0 0px 0;
  font-size: 15px;
  font-weight: 300;
  letter-spacing: 0;
  color: var(--ion-color-dark-tint);
  --background: var(--ion-color-light);
  --box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
}

.stories {
  display: flex;
  justify-content: start;
  width: 100%;
  min-height: 120px;
  height: 120px;
  margin: 30px 0;
  padding: 15px;
  overflow-x: scroll;

  .story {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 25px 0 0;
    ion-avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 65px;
      min-height: 65px;
      width: 65px;
      height: 65px;
      box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
    }
    p {
      margin: 15px 0 0 0;
      font-size: 14px;
      color: var(--ion-color-medium);
    }
    ion-icon {
      font-size: 30px;
      color: var(--ion-color-medium);
    }
  }
}

.posts {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  padding: 8px 11px;
  width: 100%;
  .post {
    margin: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc((100vw - 54px) / 3);
    height: calc((100vw - 54px) / 3);
    border-radius: 20px;
    background-size: cover;
    background-position: center center;
  }
  
  
  &__select {
    display: flex;
    width: 100%;
    padding: 1px 15px;
    position: sticky;
    top: -10px;
    div {
      position: relative;
      display: flex;
      justify-content: center;
      width: 50%;
      padding: 5px 0;
      border-radius: 5px;
      transition: 0.3s;
      ion-icon {
        z-index: 2;
        color: var(--ion-color-medium);
      }
      &:nth-child(2) ion-icon {
        border-radius: 5px;
        font-size: 21px;
        border: 2px solid var(--ion-color-medium);
      }
      &::after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        border-radius: 5px;
        background-color: var(--ion-color-light-shade);
        transition: all .25s;
      }
      &:nth-child(1)::after {
        left: auto;
        right: 0;
      }
      &.selected::after {
        width: 100%;
      }
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
  transform: translateY(20px);
  opacity: 0;
}

h5 {
  margin: 0;
}
</style>