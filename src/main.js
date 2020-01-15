import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import Index from "./components/Index";
import ListDiaries from "./components/diary/ListDiaries";
import CreateDiary from "./components/diary/CreateDiary";
import ListEntries from "./components/entries/ListEntries";
import CreateEntry from "./components/entries/CreateEntry";
import Login from "./components/Login";
import ListCategories from "./components/categories/ListCategories";
import CreateCategory from "./components/categories/CreateCategory";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/diaries',
        component: ListDiaries
    },
    {
        path: '/diaries/new',
        component: CreateDiary
    },
    {
        path: '/diaries/:diary_id/entries',
        component: ListEntries
    },
    {
        path: '/diaries/:diary_id/entries/new',
        component: CreateEntry
    },
    {
        path: '/diaries/:diary_id/categories',
        component: ListCategories
    },
    {
        path: '/diaries/:diary_id/categories/new',
        component: CreateCategory
    }
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app');
