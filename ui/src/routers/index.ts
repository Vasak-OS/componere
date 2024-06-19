import ConfirmView from '@/views/ConfirmView.vue';
import DisksView from '@/views/DisksView.vue';
import EndView from '@/views/EndView.vue';
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
  },
  {
    title: 'Disk',
    image: 'disks',
    tag: 'DISK',
    component: DisksView
  },
  {
    title: 'Confirm',
    image: 'help-info',
    tag: 'CONFIRM',
    component: ConfirmView
  },
  {
    title: 'End',
    image: 'help-info',
    tag: 'END',
    component: EndView
  }
];

export default routers;
