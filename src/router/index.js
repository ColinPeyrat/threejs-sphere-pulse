import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import InteractiveStory from '@/views/InteractiveStory';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InteractiveStory',
      component: InteractiveStory
    }
    // ,{
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // }
  ]
});
