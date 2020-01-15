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
                                <h2 class="pageheader-title">Customers</h2>
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
                                                    <th>Email</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="customer in customers" v-bind:key="customer.id">
                                                    <td>
                                                        <img width="50px" height="50px"
                                                             class="rounded-circle user-avatar-xl"
                                                             v-bind:src="getFullImagePath(customer.profile_picture)"/>
                                                    </td>
                                                    <td>{{ customer.name }}</td>
                                                    <td>{{ customer.email }}</td>
                                                    <td>{{ customer.IsEmailVerified ? 'Verified':'Not Verified' }}</td>
                                                    <td>
                                                        <div class="dd-nodrag btn-group ml-auto">
                                                            <button class="btn btn-sm btn-outline-light">View Profile</button>
                                                            <!--<button class="btn btn-sm btn-outline-light"
                                                                    v-on:click="onDeleteCategory(customer.id)">
                                                                <i class="far fa-trash-alt"/>
                                                            </button>-->
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
    import { BPagination } from 'bootstrap-vue';
    import axios from "axios";

    import Header from "@/components/Header";
    import SideBar from "@/components/SideBar";
    import Footer from "@/components/Footer";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";

    export default {
        name: "CustomerList",
        components: {Footer, SideBar, Header, BPagination},
        data() {
            return {
                customers: [],
                isEmpty: false,
                onQuery: "",
                rows: 100,
                currentPage: 1,
                perPage: 10,
            }
        },
        mounted() {
            this.getCustomerList();
        },
        computed: {
            getData: function () {
                if (this.onQuery === "") {
                    return this.getCustomerList();
                } else {
                    return this.onCategorySearch(this.onQuery);
                }
            },
        },
        methods: {
            getCustomerList: function () {
                axios.get(Settings.GetApiUrl() + '/customers?page=' + this.currentPage
                    + "&limit" + this.perPage, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    this.customers = resp.data.data;
                }).catch(err => {
                    console.log(err);
                })
            },
            getFullImagePath(subPath) {
                return Settings.GetMediaUrl() + subPath;
            },
            onCategorySearch: function (query) {
                this.onQuery = query;

                axios.get(Settings.GetApiUrl() + "/customers?query=" + query
                    + '&limit=' + this.perPage + '&page=' + this.currentPage, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    this.isEmpty = resp.data.data.length === 0;
                    this.customers = resp.data.data;
                }).catch(err => {
                    console.log(err);
                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
