<template>
    <div>
        <Header v-on:getSearchQuery="onQueryChange"/>
        <div class="dashboard-main-wrapper">
            <SideBar/>
            <div class="dashboard-wrapper">
                <div class="container-fluid  dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">Products</h2>
                                <router-link to="/stores/products/add">
                                    <a class="btn btn-brand active">Add Product</a>
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <div v-if="isEmpty" class="text-center">
                                            <h4 class="py-1 bg-dark text-white">No data found</h4>
                                        </div>
                                        <div v-else>
                                            <table class="table table-striped table-bordered first">
                                                <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>SKU</th>
                                                    <th>Price</th>
                                                    <th>Stock</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="p in products" v-bind:key="p.id">
                                                    <td>
                                                        <img width="50px" height="50px"
                                                             class="rounded-circle user-avatar-xl"
                                                             v-bind:src="getFullImagePath(p.image)"/>
                                                    </td>
                                                    <td>{{ p.name }}</td>
                                                    <td>{{ p.sku }}</td>
                                                    <td>${{ p.price }}</td>
                                                    <td>{{ p.stock }}</td>
                                                    <td>{{ p.is_published ? 'Published':'Draft' }}</td>
                                                    <td>
                                                        <div class="dd-nodrag btn-group ml-auto">
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    v-on:click="viewProduct(p.id)">View</button>
                                                            <button @click="editProduct(p.id)"
                                                                    class="btn btn-sm btn-outline-light">Edit</button>
                                                            <button class="btn btn-sm btn-outline-light">
                                                                <i class="far fa-trash-alt"/>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="overflow-auto">
                    <div class="c_mb">
                        <BPagination
                                v-model="currentPage"
                                :limit="3"
                                :hide-goto-end-buttons="true"
                                :total-rows="rows"
                                :per-page="perPage"
                                :link-gen="getData"
                                align="center">
                        </BPagination>
                    </div>
                </div>

                <Footer/>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import { BPagination } from 'bootstrap-vue';
    import Header from "@/components/Header";
    import SideBar from "@/components/SideBar";
    import Footer from "@/components/Footer";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";

    export default {
        name: "ProductList",
        components: {Header, SideBar, Footer, BPagination},
        data() {
            return {
                products: [],
                isEmpty: false,
                onQuery: "",
                rows: 100,
                currentPage: 1,
                perPage: 10,
            }
        },
        mounted() {
            this.listProducts();
        },
        computed: {
            getData: function () {
                //console.log(this.currentPage);

                if (this.onQuery === "") {
                    return this.listProducts();
                } else {
                    return this.onQueryChange(this.onQuery);
                }
            }
        },
        methods: {
            onQueryChange: function (query) {
                this.onQuery = query;

                axios.get(Settings.GetApiUrl() + '/products/search?query=' + query
                    + '&limit=' + this.perPage + '&page=' + this.currentPage, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    //console.log(resp);
                    this.isEmpty = resp.data.data.length === 0;
                    this.products = resp.data.data;
                }).catch(err => {
                    console.log(err);

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                    }
                })
            },
            listProducts: function () {
                axios.get(Settings.GetApiUrl() + "/products?page=" + this.currentPage + "&limit="
                    + this.perPage, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    //console.log(resp);
                    this.products = resp.data.data;
                }).catch(err => {
                    console.log(err);

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                    }
                })
            },
            editProduct: function (id) {
                this.$router.push('/stores/products/update/' + id);
            },
            viewProduct: function (id) {
                this.$router.push("/stores/products/view/" + id)
            },
            getFullImagePath(subPath) {
                return Settings.GetMediaUrl() + subPath;
            }
        }
    }
</script>
