import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import Index from "./components/Index";
import ListDiaries from "./components/diary/ListDiaries";
import CreateDiary from "./components/diary/CreateDiary";
import ListEntries from "./components/entries/ListEntries";
import CreateEntry from "./components/entries/CreateEntry";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Index
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
