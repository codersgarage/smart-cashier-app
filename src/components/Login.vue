<template>
    <div>
        <div class="splash-container">
            <div class="card ">
                <div class="card-header text-center">
                    <a href="/"><img class="logo-img" alt="Shopicano"></a>
                    <span class="splash-description">Please enter your user information.</span>
                </div>
                <div class="card-body" align="center">
                    <div>
                        <div class="form-group">
                            <input class="form-control form-control-lg" type="text" placeholder="Email"
                                   autocomplete="off" v-model="email">
                        </div>
                        <div class="form-group">
                            <input class="form-control form-control-lg" type="password"
                                   placeholder="Password" v-model="password">
                        </div>
                        <button class="btn btn-primary btn-lg btn-block" v-on:click="onLogin" :disabled="is_loading">
                            Login
                        </button>
                    </div>
                </div>
                <div class="card-footer bg-white p-0  ">
                    <div class="card-footer-item card-footer-item-bordered">
                        <router-link to="/register">
                            <a class="footer-link">Create An Account</a>
                        </router-link>
                    </div>
                    <div class="card-footer-item card-footer-item-bordered">
                        <router-link to="/reset-password">
                            <a class="footer-link">Forgot Password</a>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";

    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: "",
                is_loading: false
            }
        },
        methods: {
            toggleLoading: function (ok) {
                this.is_loading = ok;
            },
            onLogin: function () {
                this.toggleLoading(true);

                if (this.email === "") {
                    alert("Email is required");
                    this.toggleLoading(false);
                    return;
                }
                if (this.password === "") {
                    alert("Password is required");
                    this.toggleLoading(false);
                    return;
                }

                this.requestLogin();
            },
            requestLogin: function () {
                axios.post(Settings.GetApiUrl() + "/login", {
                    email: this.email,
                    password: this.password
                }).then(resp => {
                    let data = resp.data.data;
                    SessionStore.SetSession(data);
                    this.$router.push("/");
                }).catch(err => {
                    this.toggleLoading(false);
                    let result = err.response;
                    if (result === undefined) {
                        alert("Server seems busy!");
                        return;
                    }
                    console.log(result);
                    alert(result.data.title);
                })
            },
            onRegister: function () {

            }
        }
    }
</script>
