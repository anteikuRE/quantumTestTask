import Item from "@/components/Item.vue";
import { createRouter, createWebHashHistory} from "vue-router";
import Home from "@/Home.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/item/:id', component: Item },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router