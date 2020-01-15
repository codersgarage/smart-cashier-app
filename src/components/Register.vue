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
                            <input class="form-control form-control-lg" type="text" placeholder="Full Name"
                                   autocomplete="off" v-model="name">
                        </div>
                        <div class="form-group">
                            <input class="form-control form-control-lg" type="text" placeholder="Email"
                                   autocomplete="off" v-model="email">
                        </div>
                        <div class="form-group">
                            <input class="form-control form-control-lg" type="password"
                                   placeholder="Password" v-model="password">
                        </div>
                        <button class="btn btn-primary btn-lg btn-block" v-on:click="onRegister" :disabled="is_loading">
                            Register
                        </button>
                    </div>
                </div>
                <div class="card-footer bg-white p-0" align="center">
                    <div class="card-footer-item card-footer-item-bordered">
                        <router-link to="/login">
                            <a class="footer-link">Login</a>
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

    export default {
        name: "Register",
        data() {
            return {
                name: "",
                email: "",
                password: "",
                is_loading: false
            }
        },
        methods: {
            toggleLoading: function (ok) {
                this.is_loading = ok;
            },
            onRegister: function () {
                axios.post(Settings.GetApiUrl() + "/register", {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(resp => {
                    console.log(resp);
                    alert("Please check email to activate your account");
                    this.$router.push("/login");
                }).catch(err => {
                    this.toggleLoading(false);

                    let result = err.response;
                    if (result === undefined) {
                        alert("Server seems busy!");
                        return
                    }
                    alert(result.data.title);
                })
            }
        }
    }
</script>
