<template>
    <div>
        <Header placeholder="Search by hash.." v-on:getSearchQuery="onSearchByHash"/>

        <div class="dashboard-main-wrapper">
            <SideBar/>

            <div class="dashboard-wrapper">
                <div class="container-fluid  dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">Orders</h2>
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
                                                    <th>Order Id</th>
                                                    <th>Hash</th>
                                                    <th>Created at</th>
                                                    <!--<th>Username</th>-->
                                                    <th>Number of products</th>
                                                    <th>Total price</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="order in orders" v-bind:key="order.id">
                                                    <td>{{ order.id }}</td>
                                                    <td>{{ order.hash }}</td>
                                                    <td>{{ order.created_at.split('T')[0] }}</td>
                                                    <td class="text-center">{{ order.items.length }}</td>
                                                    <td>${{ order.grand_total }}</td>
                                                    <td>{{ order.status }}</td>
                                                    <td>
                                                        <div class="dd-nodrag btn-group ml-auto">
                                                            <button @click="viewDetails(order.id)" class="btn btn-sm btn-outline-light">View Details</button>
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

    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";
    import Header from "@/components/Header";
    import SideBar from "@/components/SideBar";
    import Footer from "@/components/Footer";

    export default {
        name: "OrderList",
        components: {Footer, SideBar, Header, BPagination},
        data() {
            return {
                orders: [],
                isEmpty: false,
                onQuery: "",
                rows: 100,
                currentPage: 1,
                perPage: 10,
                orderDate: ''
            }
        },
        mounted() {
            this.getOrderList();
        },
        computed: {
            getData: function () {
                if (this.onQuery === "") {
                    return this.getOrderList();
                } else {
                    return this.onSearchByHash(this.onQuery);
                }
            },
        },
        methods: {
            getOrderList: function () {
                axios.get(Settings.GetApiUrl() + '/orders?page=' + this.currentPage
                    + "&limit" + this.perPage, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    this.orders = resp.data.data;
                }).catch(err => {
                    console.log(err);
                })
            },
            onSearchByHash: function (query) {
                this.onQuery = query;

                axios.get(Settings.GetApiUrl() + "/orders?query=" + query
                    + '&limit=' + this.perPage + '&page=' + this.currentPage, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    this.isEmpty = resp.data.data.length === 0;
                    this.orders = resp.data.data;
                }).catch(err => {
                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                    }
                })
            },
            viewDetails: function (id) {
                this.$router.push('/stores/orders/view/' + id);
            }
        }
    }
</script>

<style scoped>

</style>
