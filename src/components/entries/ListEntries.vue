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
                                <h2 class="pageheader-title">Entries</h2>
                                <router-link v-bind:to="newEntryPath">
                                    <a class="btn btn-brand active">New Entry</a>
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <div v-if="entries.length === 0" class="text-center">
                                            <h4 class="py-1 bg-dark text-white">No data found</h4>
                                        </div>
                                        <div v-else>
                                            <table class="table table-striped table-bordered first">
                                                <thead>
                                                <tr>
                                                    <th>Amount</th>
                                                    <th>Note</th>
                                                    <th>Category</th>
                                                    <th>When</th>
                                                    <th>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="e in entries" v-bind:key="e.id">
                                                    <td>{{ e.amount }}</td>
                                                    <td>{{ e.note }}</td>
                                                    <td>{{ e.category_name }}</td>
                                                    <td>{{ e.created_at }}</td>
                                                    <td>
                                                        <div class="dd-nodrag btn-group ml-auto">
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    @click="onDiarySelected(e.name, e.id)">Update
                                                            </button>
                                                            <button class="btn btn-sm btn-outline-light"
                                                                    @click="onDiarySelected(e.name, e.id)">Delete
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
    import Footer from "../Footer";
    import Settings from "../../common/settings";
    import SessionStore from "../../common/session_store";
    import axios from "axios";

    export default {
        name: "ListEntries",
        components: {Footer, SideBar, Header},
        data() {
            return {
                selectedDiaryId: String,
                newEntryPath: String,
                entries: []
            }
        },
        mounted() {
            this.selectedDiaryId = this.$route.params.diary_id;
            this.newEntryPath = "/diaries/" + this.selectedDiaryId + "/entries/new";
            this.listEntries();
        },
        methods: {
            listEntries: function () {
                axios.get(Settings.GetApiUrl() + "/diaries/" + this.selectedDiaryId + "/entries?page=" + this.currentPage
                    + "&limit" + this.perPage, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    console.log(resp);
                    this.entries = resp.data.data;
                }).catch(err => {
                    console.log(err);
                })
            },
        }
    }
</script>
