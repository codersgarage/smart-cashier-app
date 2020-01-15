<template>
    <div class="dashboard-header">
        <nav class="navbar navbar-expand-lg bg-white fixed-top">
            <a class="navbar-brand" href="/">Shopicano</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"/>
            </button>
            <div class="collapse navbar-collapse " id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto navbar-right-top">
                    <li class="nav-item">
                        <div id="custom-search" class="top-search-bar">
                            <input class="form-control"
                                   v-model="srchquery"
                                   v-on:keyup="emitQuery"
                                   type="text" :placeholder="placeholder">
                        </div>
                    </li>
                    <li class="nav-item dropdown notification">
                        <a class="nav-link nav-icons" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false"><i class="fas fa-fw fa-bell"/> <span
                                class="indicator"/></a>
                        <ul class="dropdown-menu dropdown-menu-right notification-dropdown">
                            <li>
                                <div class="notification-title"> Notification</div>
                                <div class="notification-list">
                                    <div class="list-group">
                                        <a href="#" class="list-group-item list-group-item-action active">
                                            <div class="notification-info">
                                                <div class="notification-list-user-img"><img
                                                        src="assets/images/avatar-2.jpg" alt=""
                                                        class="user-avatar-md rounded-circle"></div>
                                                <div class="notification-list-user-block"><span
                                                        class="notification-list-user-name">Jeremy Rakestraw</span>accepted
                                                    your invitation to join the team.
                                                    <div class="notification-date">2 min ago</div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action">
                                            <div class="notification-info">
                                                <div class="notification-list-user-img"><img
                                                        src="assets/images/avatar-3.jpg" alt=""
                                                        class="user-avatar-md rounded-circle"></div>
                                                <div class="notification-list-user-block"><span
                                                        class="notification-list-user-name">John Abraham </span>is now
                                                    following you
                                                    <div class="notification-date">2 days ago</div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action">
                                            <div class="notification-info">
                                                <div class="notification-list-user-img"><img
                                                        src="assets/images/avatar-4.jpg" alt=""
                                                        class="user-avatar-md rounded-circle"></div>
                                                <div class="notification-list-user-block"><span
                                                        class="notification-list-user-name">Monaan Pechi</span> is
                                                    watching your main repository
                                                    <div class="notification-date">2 min ago</div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action">
                                            <div class="notification-info">
                                                <div class="notification-list-user-img"><img
                                                        src="assets/images/avatar-5.jpg" alt=""
                                                        class="user-avatar-md rounded-circle"></div>
                                                <div class="notification-list-user-block"><span
                                                        class="notification-list-user-name">Jessica Caruso</span>accepted
                                                    your invitation to join the team.
                                                    <div class="notification-date">2 min ago</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="list-footer"><a href="#">View all notifications</a></div>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown nav-user">
                        <a class="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false"><img
                                v-bind:src="image"
                                alt=""
                                class="user-avatar-md rounded-circle"></a>
                        <div class="dropdown-menu dropdown-menu-right nav-user-dropdown"
                             aria-labelledby="navbarDropdownMenuLink2">
                            <div class="nav-user-info">
                                <h5 class="mb-0 text-white nav-user-name">{{ username }}</h5>
                                <span class="status"/><span class="ml-2">{{ user_status }}</span>
                            </div>
                            <a class="dropdown-item" href="#"><i class="fas fa-user mr-2"/>Account</a>
                            <a class="dropdown-item" href="#"><i class="fas fa-shopping-basket mr-2"/>Store</a>
                            <a class="dropdown-item" v-on:click="onLogout"><i class="fas fa-power-off mr-2"/>Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import axios from "axios";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";

    export default {
        name: "Header",
        props: {
            placeholder: {
                default: 'Search..',
                type: String
            }
        },
        data() {
            return {
                username: "A",
                user_status: "",
                image: "http://128.199.89.247:9119/v1/fs/products/9b502e0f-6f64-4e57-897e-3c4fd49929c8-MS0xOS00LTEyLTEwLTE2LTMwbQ==.jpg",
                srchquery: "",
            }
        },
        mounted() {
            this.getProfile()
        },
        methods: {
            emitQuery: function() {
                this.$emit("getSearchQuery", this.srchquery);
            },
            getProfile: function () {
                axios.get(Settings.GetApiUrl() + "/users", {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    let data = resp.data.data;
                    this.username = data.name;

                    let status = data.status;
                    if (status === "active") {
                        this.user_status = "Active";
                    } else {
                        this.user_status = "None"
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            onLogout: function () {
                SessionStore.CleanSession();
                this.$router.push("/login")
            }
        }
    }
</script>
