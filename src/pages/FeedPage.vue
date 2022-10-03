<template>
  <base-layout :header="true" :navbar="true">
    <div class="stories">
      <ion-avatar class="stories__user">
        <ion-img :src="'http://localhost:3000/images/profile/' + user.profile_picture"></ion-img>
      </ion-avatar>
      <ion-avatar v-for="(story, index) in stories" :key="index" :class="{new: index < 3}">
        <ion-img :src="story"></ion-img>
      </ion-avatar>
    </div>
    <div class="posts">
      <div class="post" v-for="(post, index) in posts" :key="index">
        <div class="post__user">
          <section>
            <ion-avatar><ion-img :src="post.user.img"></ion-img></ion-avatar>
            <p>{{ post.user.pseudo}}<br><small>{{ $moment(post.date, "YYYYMMDDkkmmss").fromNow() }}</small></p>
          </section>
          <section class="params">
            <ion-icon name="paper-plane-outline"></ion-icon>
            <ion-icon name="ellipsis-vertical"></ion-icon>
          </section>
        </div>
        <ion-img class="post__content" :src="post.img"></ion-img>
        <div class="post__infos">
          <section>
            <div>
              <ion-icon name="heart" class="liked" v-if="post.liked"></ion-icon>
              <ion-icon name="heart-outline" v-else></ion-icon>
              <p>{{ post.likes }}</p>
            </div>
            <div><ion-icon name="chatbox-ellipses-outline" class="reverse"></ion-icon><p>{{ post.comments }}</p></div>
          </section>
          <ion-icon name="bookmark" v-if="post.saved" class="favs"></ion-icon>
          <ion-icon name="bookmark-outline" v-else class="favs"></ion-icon>
        </div>
        <!-- <p class="desc">{{ post.description }}</p> -->
      </div>
    </div>
  </base-layout>
</template>

<script>
import { IonAvatar, IonImg, IonIcon } from '@ionic/vue';
export default {
  name: 'FeedPage',
  components: {
    IonAvatar,
    IonImg,
    IonIcon
  },
  data() {
    return {
      user: {},
      stories: [
        './assets/images/stories/3.jpg',
        './assets/images/stories/4.jpg',
        './assets/images/stories/5.jpg',
        './assets/images/stories/6.jpg',
        './assets/images/stories/7.jpg',
        './assets/images/stories/8.jpg',
      ],
      posts: [
        {
          user: {img: './assets/images/stories/7.jpg', pseudo: 'AnnaBulle'},
          img: './assets/images/posts/7.jpg',
          saved: false,
          liked: true,
          likes: '1,398',
          comments: '164',
          description: 'Une journée de plus qui s\'achève avec ce soleil radieux.',
          date: new Date(2022, 8, 27, 11, 45, 18)
        },
        {
          user: {img: './assets/images/stories/8.jpg', pseudo: 'Yoan Pares'},
          img: './assets/images/posts/9.jpg',
          saved: false,
          liked: true,
          likes: '53',
          comments: '8',
          description: 'L\'art est le plasir des yeux',
          date: new Date(2022, 8, 26, 17, 53, 37)
        },
        {
          user: {img: './assets/images/stories/6.jpg', pseudo: 'Yoan Pares'},
          img: './assets/images/posts/8.jpg',
          saved: true,
          liked: false,
          likes: '674',
          comments: '53',
          description: 'Le plasir de voyager dans le monde ne pourra jamais me rendre aussi heureux',
          date: new Date(2022, 8, 23, 8, 31, 42)
        }
      ]
    }
  },
  async mounted() {
    const ret = await this.$Preferences.get({ key: 'user' });
    this.user = JSON.parse(ret.value);
  }
}
</script>

<style lang="scss" scoped>
.stories {
  display: flex;
  justify-content: start;
  width: 100%;
  min-height: 100px;
  margin: 0 0 10px 0;
  padding: 20px;
  overflow-x: scroll;

  ion-avatar {
    min-width: 65px;
    width: 65px;
    min-height: 65px;
    height: 65px;
    margin: 0 25px 0 0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    &.new {
      padding: 3px;
      background: linear-gradient(to left, #4f5bd5, #7f50c9, #9f45b9, #b738a6, #c82e92, #db3582, #e94473, #f15665, #fd785c, #ff9a5b, #ffbb62, #feda75);
    }
  }

  &__user:after {
    content: "+";
    display: flex;
    justify-content: center;
    position: relative;
    width: 18px;
    height: 18px;
    z-index: 2;
    font-size: 14px;
    border-radius: 50%;
    border: 2px solid var(--ion-color-light-shade);
    transform: translate(45px, -20px);
    color: var(--ion-color-light-shade);
    background-color: var(--ion-color-dark-tint);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  }
}

.post {
  margin: 0 0 25px 0;
  padding: 15px;
  border-radius: 25px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  &__user, &__infos, section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    ion-avatar {
      min-width: 35px;
      width: 35px;
      min-height: 35px;
      height: 35px;
      margin: 0 15px 0 0;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    }

    p {
      line-height: 14px;
    }

    .params ion-icon {    
        font-size: 22px;
      &:nth-child(2) {
      font-size: 22px;
        transform: translateX(8px);
      }
    }

    div {
      display: flex;
      align-items: center;
      margin: 0 25px 0 0;
      ion-icon {margin: 0 4px 0 0;}
      p {font-size: 15px;}
    }

    .liked {
      color: var(--ion-color-danger);
    }
  }
  &__content {
    margin: 15px 0;
    &::part(image) {
      border-radius: 15px;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
    }
  }
  .desc {
    width: 100%;
    margin: 20px 0 0 0;
  }
}


.reverse {
  transform: rotateY(180deg);
}
</style>