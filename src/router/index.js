import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/clubs',
    name: 'Clubs',
    component: () => import('../views/Clubs.vue')
  },
  {
    path: '/bookclub/:bookClubId',
    name: 'BookClub',
    component: () => import('../views/ClubOverview.vue')
  },
  {
    path: '/assignment/:assignmentId',
    name: 'Assignment',
    component: () => import('../views/AssignmentOverview.vue')
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('../views/Books.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
