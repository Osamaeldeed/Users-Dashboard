import { createApp } from 'vue'
import App from './App.vue'
import { createRouter , createWebHistory } from 'vue-router'
import UsersPage from './components/Pages/UsersPage.vue'
import AddUser from './components/Pages/AddUser.vue'
import HomePage from './components/Pages/HomePage.vue'
import NotFound from './components/Pages/NotFound.vue'
import UserDetails from './components/Pages/UserDetails.vue'
import EditUser from './components/Pages/EditUser.vue'

const routes = [
    { path: "/", component: HomePage},
    { path: "/users", component: UsersPage},
    { path: "/adduser", component: AddUser},
    { path: "/userdetails/:id", component: UserDetails},
    { path: "/edituser/:id", component: EditUser},
 {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    meta: {
      hideNavbar: true,
    },
  },
];

const router = createRouter({history:createWebHistory(),routes});
createApp(App).use(router).mount('#app');