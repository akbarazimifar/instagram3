import { createRouter, createWebHistory } from '@ionic/vue-router';
import { Preferences } from '@capacitor/preferences';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import("../pages/HomePage.vue"),
    meta: {
      checkAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../pages/LoginPage.vue"),
    meta: {
      checkAuth: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import("../pages/SignupPage.vue"),
    meta: {
      checkAuth: true
    }
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import("../pages/FeedPage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import("../pages/SearchPage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notifs',
    name: 'Notifs',
    component: () => import("../pages/NotifsPage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import("../pages/ProfilePage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile/edit',
    name: 'EditProfile',
    component: () => import("../pages/EditProfilePage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/params',
    name: 'Params',
    component: () => import("../pages/ParamsPage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/password',
    name: 'Password',
    component: () => import("../pages/PasswordPage.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const ret = await Preferences.get({ key: 'user' });
  const user = JSON.parse(ret.value)
  if (to.matched.some(record => record.meta.checkAuth)) {
    if (user) {
      next({name: 'Feed'});
      return;
    } else {
      next();
      return;
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user) {
      next({name: 'Home'});
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
