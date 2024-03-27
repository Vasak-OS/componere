import UserView from '@/views/UserView.vue';
import WelcomeView from '../views/WelcomeView.vue';
import type { VSKRoute } from '@/types/VSKRoute';

const routers: Array<VSKRoute> = [
  {
    title: 'Welcome',
    image: 'start-here-archlinux',
    tag: 'WELCOME',
    component: WelcomeView
  },
  {
    title: 'User',
    image: 'user_icon',
    tag: 'USER',
    component: UserView
  }
];

export default routers;
