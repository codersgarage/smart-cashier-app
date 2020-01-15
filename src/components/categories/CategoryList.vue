<template>
    <div>
        <Header v-on:getSearchQuery="onCategorySearch"/>
        <div class="dashboard-main-wrapper">
            <SideBar/>
            <div class="dashboard-wrapper">
                <div class="container-fluid  dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">Categories</h2>
                                <router-link to="/stores/categories/add">
                                    <a class="btn btn-brand active">Add Category</a>
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
                                                    <th>Description</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="c in categories" v-bind:key="c.id">
                                                    <td>
                                                        <img width="50px" height="50px"
                                                             class="rounded-circle user-avatar-xl"
                                                             v-bind:src="getFullImagePath(c.image)"/>
                                                    </td>
                                                    <td>{{ c.name }}</td>
                                                    <td>{{ c.description }}</td>
                                                    <td>{{ c.is_published ? 'Published':'Draft' }}</td>
                                                    <td>
                                                        <div class="dd-nodrag btn-group ml-auto">
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    @click="updateCategory(c.id)">Edit</button>
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    v-on:click="onDeleteCategory(c.id)">
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
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import { BPagination } from 'bootstrap-vue';
    import axios from "axios";

    import Header from "@/components/Header";
    import SideBar from "@/components/SideBar";
    import Footer from "@/components/Footer";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";

    export default {
        name: "CategoryList",
        components: {Footer, SideBar, Header, BPagination},
        data() {
            return {
                categories: [],
                isEmpty: false,
                onQuery: "",
                rows: 100,
                currentPage: 1,
                perPage: 10,
            }
        },
        mounted() {
            this.listCategories();
        },
        computed: {
            getData: function () {
                //console.log(this.currentPage);

                if (this.onQuery === "") {
                    return this.listCategories();
                } else {
                    return this.onCategorySearch(this.onQuery);
                }
            },
        },
        methods: {
            onCategorySearch: function (query) {
                this.onQuery = query;

                axios.get(Settings.GetApiUrl() + "/categories?query=" + query
                    + '&limit=' + this.perPage + '&page=' + this.currentPage, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    //console.log(resp);

                    this.isEmpty = resp.data.data.length === 0;
                    this.categories = resp.data.data;
                }).catch(err => {
                    console.log(err);

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                    }
                })
            },
            listCategories: function () {
                axios.get(Settings.GetApiUrl() + "/categories?page=" + this.currentPage
                    + "&limit" + this.perPage, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    console.log(resp);
                    this.categories = resp.data.data;
                }).catch(err => {
                    console.log(err);
                })
            },
            getFullImagePath(subPath) {
                return Settings.GetMediaUrl() + subPath;
            },
            updateCategory: function (c_id) {
                this.$router.push('/stores/categories/update/' + c_id);
            },
            onDeleteCategory: function (id) {
                axios.delete(Settings.GetApiUrl() + '/categories/' + id, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    console.log(resp);
                    this.listCategories();
                }).catch(err => {
                    console.log(err.response);

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                        return
                    }

                    let data = err.response.data;
                    alert(data.title);
                })
            },
        }
    }
</script>
