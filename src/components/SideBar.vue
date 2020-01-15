<template>
    <div class="nav-left-sidebar sidebar-dark">
        <div class="menu-list">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="collapse navbar-collapse" id="navbarNavAdmin">
                    <ul class="navbar-nav flex-column">
                        <li v-if="is_admin" class="nav-divider">
                            Admin Menu
                        </li>
                        <li v-if="is_admin" class="nav-item ">
                            <router-link to="/admin/users">
                                <a class="nav-link">
                                    <i class="fa fa-fw fa-user-circle"/>Users<span
                                        class="badge badge-success">6</span></a>
                            </router-link>
                        </li>
                        <li v-if="is_admin" class="nav-item ">
                            <router-link to="/admin/members">
                                <a class="nav-link">
                                    <i class="fa fa-fw fa-user-circle"/>Members<span
                                        class="badge badge-success">6</span></a>
                            </router-link>
                        </li>
                        <li v-if="is_admin || is_manager" class="nav-divider">
                            Manager Menu
                        </li>
                        <li v-if="is_admin || is_manager" class="nav-item ">
                            <router-link to="/admin/shops">
                                <a class="nav-link">
                                    <i class="fa fa-fw fa-user-circle"/>Shops<span
                                        class="badge badge-success">6</span></a>
                            </router-link>
                        </li>
                        <li v-if="is_admin || is_manager" class="nav-item ">
                            <router-link to="/admin/reports">
                                <a class="nav-link">
                                    <i class="fa fa-fw fa-user-circle"/>Reports</a>
                            </router-link>
                        </li>
                        <li v-if="has_store" class="nav-divider">
                            Shop Menu
                        </li>
                        <li v-if="has_store" class="nav-item">
                            <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false"
                               data-target="#submenu-2" aria-controls="submenu-2"><i class="fa fa-fw fa-rocket"/>
                                Catalog
                            </a>
                            <div id="submenu-2" class="collapse submenu" style="">
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <router-link to="/stores/products">
                                            <a class="nav-link">Products</a>
                                        </router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link to="/stores/collections">
                                            <a class="nav-link">Collections</a>
                                        </router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link to="/stores/categories">
                                            <a class="nav-link">Categories</a>
                                        </router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link to="/stores/customers">
                                            <a class="nav-link">Customers</a>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li v-if="has_store" class="nav-item ">
                            <router-link to="/stores/orders">
                                <a class="nav-link">
                                    <i class="fa fa-fw fa-shopping-bag"/>Orders</a>
                            </router-link>
                        </li>
                        <li v-if="has_store" class="nav-item ">
                            <router-link to="/stores/reports">
                                <a class="nav-link">
                                    <i class="fa fa-fw fa-file-contract"/>Reports</a>
                            </router-link>
                        </li>
                        <li v-if="has_store" class="nav-item ">
                            <router-link to="/stores/apply">
                                <a class="nav-link">
                                    <i class="fa fa-fw fa-store"/>Store</a>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    import SessionStore from "@/common/session_store";
    import Settings from "@/common/settings";
    import axios from "axios";

    export default {
        name: "SideBar",
        data() {
            return {
                is_admin: false,
                is_manager: false,
                is_user: false,
                has_store: false
            }
        },
        mounted() {
            this.is_admin = SessionStore.IsAdmin();
            this.is_manager = SessionStore.IsManager();
            this.is_user = SessionStore.IsUser();

            this.hasStore();
        },
        methods: {
            hasStore: function () {
                axios.get(Settings.GetApiUrl() + "/stores", {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    //console.log(resp);
                    let store = resp.data.data;
                    if (store.status === "registered") {
                        this.has_store = false;
                        return
                    }

                    this.has_store = true;
                }).catch(err => {
                    console.log(err);

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                        return
                    }

                    this.has_store = false;
                })
            }
        }
    }
</script>
