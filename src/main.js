import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import VueSimpleMarkdown from 'vue-simple-markdown'

import Index from "@/components/Index";
import ProductList from "@/components/products/ProductList";
import Login from "@/components/Login";
import Register from "@/components/Register";
import ApplyForStore from "@/components/stores/ApplyForStore";
import ProductAdd from "@/components/products/ProductAdd";
import CategoryList from "@/components/categories/CategoryList";
import CollectionList from "@/components/collections/CollectionList";
import CollectionAdd from "@/components/collections/CollectionAdd";
import CategoryAdd from "@/components/categories/CategoryAdd";
import ProductView from "@/components/products/ProductView";
import CollectionUpdate from "./components/collections/CollectionUpdate";
import CategoryUpdate from "@/components/categories/CategoryUpdate";
import ProductUpdate from "@/components/products/ProductUpdate";
import CustomerList from "@/components/customers/CustomerList";
import OrderList from "@/components/orders/OrderList";
import OrderView from "@/components/orders/OrderView";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueSimpleMarkdown);

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/stores/products',
        component: ProductList
    },
    {
        path: '/stores/products/add',
        component: ProductAdd
    },
    {
        path: '/stores/products/view/:id',
        component: ProductView
    },
    {
        path: '/stores/products/update/:id',
        component: ProductUpdate
    },
    {
        path: '/stores/collections',
        component: CollectionList
    },
    {
        path: '/stores/collections/add',
        component: CollectionAdd
    },
    {
        path: '/stores/collections/update/:id',
        component: CollectionUpdate
    },
    {
        path: '/stores/categories',
        component: CategoryList
    },
    {
        path: '/stores/categories/add',
        component: CategoryAdd
    },
    {
        path: '/stores/categories/update/:id',
        component: CategoryUpdate
    },
    {
        path: '/stores/customers',
        component: CustomerList
    },
    {
        path: '/stores/orders',
        component: OrderList
    },
    {
        path: '/stores/orders/view/:id',
        component: OrderView
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/stores/apply',
        component: ApplyForStore
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
