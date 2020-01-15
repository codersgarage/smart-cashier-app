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
                                <h2 class="pageheader-title">New Entry</h2>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <div id="form" data-parsley-validate="" novalidate="">
                                        <div class="form-group row">
                                            <label for="inputName"
                                                   class="col-3 col-lg-2 col-form-label text-right">Amount</label>
                                            <div class="col-9 col-lg-10">
                                                <input id="inputName" v-model="amount" type="text"
                                                       placeholder="Amount"
                                                       class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label
                                                    class="col-3 col-lg-2 col-form-label text-right">Note</label>
                                            <div class="col-9 col-lg-10">
                                                <input id="inputNote" v-model="note" type="text"
                                                       placeholder="Note"
                                                       class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label
                                                    class="col-3 col-lg-2 col-form-label text-right">Category</label>
                                            <div class="col-9 col-lg-10">
                                                <select class="form-control form-control-sm"
                                                        v-on:change="onCategorySelected">
                                                    <option v-for="c in categories" v-bind:key="c.id"
                                                            v-bind:value="c.id">
                                                        {{ c.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row pt-2 pt-sm-5 mt-1">
                                            <div class="col-sm-6 pb-2 pb-sm-4 pb-lg-0 pr-0"></div>
                                            <div class="col-sm-6 pl-0">
                                                <p class="text-right">
                                                    <button type="submit" class="btn btn-space btn-primary"
                                                            :disabled="btnDisabled"
                                                            v-on:click="createNewEntry">Add
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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
    import Header from "../Header";
    import SideBar from "../SideBar";
    import Footer from "../Footer";
    import Settings from "../../common/settings";
    import SessionStore from "../../common/session_store";
    import axios from "axios";

    export default {
        name: "CreateEntry",
        components: {Footer, SideBar, Header},
        data() {
            return {
                selectedDiaryId: String,
                amount: 0.00,
                note: "",
                categoryId: "",
                categories: [],
                btnDisabled: false
            }
        },
        mounted() {
            this.selectedDiaryId = this.$route.params.diary_id;
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
                    if (this.categories.length > 0) {
                        this.categoryId = this.categories[0].id;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            onCategorySelected: function (e) {
                console.log(e.target.value);
                this.categoryId = e.target.value;
            },
            createNewEntry: function () {
                this.btnDisabled = true;
                let pld = {
                    category_id: this.categoryId,
                    amount: Number(this.amount),
                    note: this.note
                };

                console.log(pld);

                axios.post(Settings.GetApiUrl() + "/diaries/" + this.selectedDiaryId + "/entries", pld, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    console.log(resp);
                    this.$router.push('/diaries/' + this.selectedDiaryId + "/entries");
                }).catch(err => {
                    console.log(err);
                });

                this.btnDisabled = false;
            }
        }
    }
</script>
