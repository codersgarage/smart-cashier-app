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
                                <h2 class="pageheader-title">Diaries</h2>
                                <router-link to="/diaries/new">
                                    <a class="btn btn-brand active">New Diary</a>
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <div v-if="diaries.length === 0" class="text-center">
                                            <h4 class="py-1 bg-dark text-white">No data found</h4>
                                        </div>
                                        <div v-else>
                                            <table class="table table-striped table-bordered first">
                                                <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Type</th>
                                                    <th>Options</th>
                                                    <th>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="d in diaries" v-bind:key="d.id">
                                                    <td>{{ d.name }}</td>
                                                    <td>{{ d.type }}</td>
                                                    <td>
                                                        <div class="dd-nodrag btn-group ml-auto">
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    @click="onListEntriesSelected(d.id)">Entries
                                                            </button>
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    @click="onDiarySelected(d.name, d.id)">Categories
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="dd-nodrag btn-group ml-auto">
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    @click="onDiarySelected(d.name, d.id)">Update
                                                            </button>
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    @click="onDiarySelected(d.name, d.id)">Delete
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
    import Header from "../Header";
    import SideBar from "../SideBar";
    import axios from "axios";
    import Settings from "../../common/settings";
    import SessionStore from "../../common/session_store";
    import Footer from "../Footer";

    export default {
        name: "ListDiaries",
        components: {Footer, SideBar, Header},
        data() {
            return {
                diaries: []
            }
        },
        mounted() {
            this.listDiaries();
        },
        methods: {
            listDiaries: function () {
                axios.get(Settings.GetApiUrl() + "/diaries?page=" + this.currentPage
                    + "&limit" + this.perPage, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    console.log(resp);
                    this.diaries = resp.data.data;
                }).catch(err => {
                    console.log(err);
                })
            },
            onListEntriesSelected: function (id) {
                this.$router.push('/diaries/' + id + "/entries");
            }
        }
    }
</script>
