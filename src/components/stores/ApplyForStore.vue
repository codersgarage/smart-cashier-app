<template>
    <div>
        <Header v-on:getSearchQuery="onQueryChange"/>

        <div class="dashboard-main-wrapper">
            <SideBar/>

            <div class="dashboard-wrapper">
                <div class="container-fluid dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">Store</h2>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="card-body" v-if="!is_active">
                                <blockquote class="blockquote mb-0">
                                    <p>You have applied for store. Please wait till it gets the approval.<br/>Thanks for your
                                        patience.</p>
                                </blockquote>
                            </div>

                            <div class="card-body">
                                <div>
                                    <div class="form-group">
                                        <input class="form-control form-control-lg" id="store-name" type="text"
                                               placeholder="Store Name" autocomplete="off" v-model="store_name">
                                    </div>
                                    <div class="form-group">
                                <textarea class="form-control" id="store-description" rows="5"
                                          placeholder="Store Description" v-on:change="onDescriptionChange"
                                          v-model="store_description"/>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control form-control-lg" id="store-email" type="text"
                                               placeholder="Store Email" autocomplete="off" v-model="email">
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control form-control-lg" id="store-phone" type="text"
                                               placeholder="Store Phone" autocomplete="off" v-model="phone">
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control form-control-lg" id="store-address" type="text"
                                               placeholder="Address" autocomplete="off" v-model="address">
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control form-control-lg" id="store-city" type="text"
                                               placeholder="City" autocomplete="off" v-model="city">
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control form-control-lg" id="store-postcode" type="text"
                                               placeholder="Postcode" autocomplete="off" v-model="postcode">
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control form-control-lg" id="store-country" type="text"
                                               placeholder="Country" autocomplete="off" v-model="country">
                                    </div>
                                    <button class="btn btn-primary btn-lg btn-block" v-on:click="applyForStore"
                                            :disabled="is_loading || !is_active">Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Footer from "@/components/Footer";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";
    import Header from "@/components/Header";
    import SideBar from "@/components/SideBar";

    export default {
        name: "ApplyForStore",
        components: {SideBar, Header, Footer},
        data() {
            return {
                is_loading: false,
                store_name: "",
                store_description: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                postcode: "",
                country: "",
                is_open: Boolean
            }
        },
        props: {
            is_active: Boolean
        },
        mounted() {
            this.is_open = this.is_active;

            if (!this.is_open) {
                this.getStore();
            }
        },
        methods: {
            applyForStore: function () {
                this.is_loading = true;

                axios.post(Settings.GetApiUrl() + "/stores", {
                    "name": this.store_name,
                    "address": this.address,
                    "city": this.city,
                    "country": this.country,
                    "postcode": this.postcode,
                    "email": this.email,
                    "phone": this.phone,
                    "description": this.store_description
                }, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken()
                    }
                }).then(resp => {
                    console.log(resp);
                    this.is_loading = false;
                    this.refresh();
                }).catch(err => {
                    this.is_loading = false;

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                        return
                    }

                    let result = err.response;
                    if (result === undefined) {
                        alert("Server seems busy!");
                        return;
                    }
                    console.log(result);
                    alert(result.data.title);
                });
            },
            onDescriptionChange: function (e) {
                console.log(e.target.value);
                this.store_description = e.target.value;
            },
            getStore: function () {
                axios.get(Settings.GetApiUrl() + "/stores", {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    console.log(resp);

                    let store = resp.data.data;

                    this.store_name = store.name;
                    this.store_description = store.description;
                    this.email = store.email;
                    this.phone = store.phone;
                    this.address = store.address;
                    this.city = store.city;
                    this.country = store.country;
                    this.postcode = store.postcode;
                }).catch(err => {
                    console.log(err);

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                        return
                    }
                    if (SessionStore.isStoreNotFound(err)) {
                        this.is_open = true;
                        return
                    }

                    alert("Server seems busy !!!");
                })
            }
        }
    }
</script>
