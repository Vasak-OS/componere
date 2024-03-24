import WelcomeView from "../views/WelcomeView.vue";
import type { VSKRoute } from "@/types/VSKRoute";

const routers: Array<VSKRoute> = [
  {
    title: 'Welcome',
    image: 'help-info',
    tag: 'WELCOME',
    component: WelcomeView
  }
];

export default routers;
