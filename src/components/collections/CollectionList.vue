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
                                <h2 class="pageheader-title">Collections</h2>
                                <router-link to="/stores/collections/add">
                                    <a class="btn btn-brand active">Add Collection</a>
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
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="c in collections" v-bind:key="c.id">
                                                    <td>
                                                        <img width="50px" height="50px"
                                                             class="rounded-circle user-avatar-xl"
                                                             v-bind:src="getFullImagePath(c.image)"/>
                                                    </td>
                                                    <td>{{ c.name }}</td>
                                                    <td>{{ c.is_published ? 'Published':'Draft' }}</td>
                                                    <td>
                                                        <div class="dd-nodrag btn-group ml-auto">
                                                            <button class="btn btn-sm btn-outline-light">Add Product
                                                            </button>
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    v-on:click="updateCollection(c.id)">Edit
                                                            </button>
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    v-on:click="deleteCollection(c.id)">
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
    import axios from "axios";
    import { BPagination } from 'bootstrap-vue';
    import Header from "@/components/Header";
    import SideBar from "@/components/SideBar";
    import Footer from "@/components/Footer";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";

    export default {
        name: "CollectionList",
        components: {Header, SideBar, Footer, BPagination},
        data() {
            return {
                collections: [],
                onQuery: "",
                isEmpty: false,
                rows: 100,
                currentPage: 1,
                perPage: 10,
            }
        },
        mounted() {
            this.listCollections();
        },
        computed: {
            getData: function () {
                if (this.onQuery === "") {
                    return this.listCollections();
                } else {
                    return this.onQueryChange(this.onQuery);
                }
            }
        },
        methods: {
            onQueryChange: function(query) {
                this.onQuery = query;

                axios.get(Settings.GetApiUrl() + '/collections?query=' + query
                    + '&limit=' + this.perPage + '&page=' + this.currentPage, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    //console.log(resp);

                    this.isEmpty = resp.data.data.length === 0;
                    this.collections = resp.data.data;
                }).catch(err => {
                    //console.log(err);

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                    }
                })
            },
            listCollections: function () {
                axios.get(Settings.GetApiUrl() + '/collections?page=' + this.currentPage + '&limit='
                    + this.perPage, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    //console.log(resp);
                    this.collections = resp.data.data;
                }).catch(err => {
                    console.log(err);

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                    }
                })
            },
            getFullImagePath(subPath) {
                return Settings.GetMediaUrl() + subPath;
            },
            updateCollection: function (c_id) {
                this.$router.push('/stores/collections/update/' + c_id);
            },
            deleteCollection: function (id) {
                axios.delete(Settings.GetApiUrl() + '/collections/' + id, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    //console.log(resp);
                    this.listCollections();
                    this.$router.push('/stores/collections');
                }).catch(err => {
                    console.log(err);

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                        return
                    }

                    let resp = err.response;
                    alert(resp.title);
                })
            },
        }
    }
</script>

<style lang="css">
    .c_mb {
        padding-bottom: 50px;
    }
</style>
