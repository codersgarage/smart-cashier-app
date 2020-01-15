<template>
    <div>
        <Header/>
        <div class="dashboard-main-wrapper">
            <SideBar/>
            <div class="dashboard-wrapper">
                <div class="container-fluid  dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">Categories</h2>
                                <router-link v-bind:to="newCategoryPath">
                                    <a class="btn btn-brand active">New Category</a>
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <div v-if="categories.length === 0" class="text-center">
                                            <h4 class="py-1 bg-dark text-white">No data found</h4>
                                        </div>
                                        <div v-else>
                                            <table class="table table-striped table-bordered first">
                                                <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Amount</th>
                                                    <th>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="c in categories" v-bind:key="c.id">
                                                    <td>{{ c.name }}</td>
                                                    <td>{{ c.amount }}</td>
                                                    <td>
                                                        <div class="dd-nodrag btn-group ml-auto">
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    @click="onDiarySelected(c.id)">Update
                                                            </button>
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    @click="deleteCategory(c.id)">Delete
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
    import Header from "../Header";
    import SideBar from "../SideBar";
    import Footer from "../Footer";
    import Settings from "../../common/settings";
    import SessionStore from "../../common/session_store";

    export default {
        name: "ListCategories",
        data() {
            return {
                selectedDiaryId: String,
                newCategoryPath: String,
                categories: []
            }
        },
        components: {Footer, SideBar, Header},
        mounted() {
            this.selectedDiaryId = this.$route.params.diary_id;
            this.newCategoryPath = "/diaries/" + this.selectedDiaryId + "/categories/new";
            this.listCategories();
        },
        methods: {
            listCategories: function () {
                axios.get(Settings.GetApiUrl() + "/diaries/" + this.selectedDiaryId + "/categories?page=" + this.currentPage
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
            deleteCategory: function (id) {
                axios.delete(Settings.GetApiUrl() + "/diaries/" + this.selectedDiaryId + "/categories/" + id, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    console.log(resp);
                    alert("Category deleted");
                    this.listCategories();
                }).catch(err => {
                    console.log(err);
                })
            },
        }
    }
</script>
