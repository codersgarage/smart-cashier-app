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
                                <h2 class="pageheader-title">New Category</h2>
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
                                                   class="col-3 col-lg-2 col-form-label text-right">Name</label>
                                            <div class="col-9 col-lg-10">
                                                <input id="inputName" v-model="name" type="text"
                                                       placeholder="Name"
                                                       class="form-control">
                                            </div>
                                        </div>
                                        <div class="row pt-2 pt-sm-5 mt-1">
                                            <div class="col-sm-6 pb-2 pb-sm-4 pb-lg-0 pr-0"></div>
                                            <div class="col-sm-6 pl-0">
                                                <p class="text-right">
                                                    <button type="submit" class="btn btn-space btn-primary"
                                                            :disabled="btnDisabled"
                                                            v-on:click="createNewDiary">Add
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
    import axios from "axios";
    import SessionStore from "../../common/session_store";
    import Settings from "../../common/settings";

    export default {
        name: "CreateCategory",
        components: {Footer, SideBar, Header},
        data() {
            return {
                selectedDiaryId: String,
                name: "",
                btnDisabled: false
            }
        },
        mounted() {
            this.selectedDiaryId = this.$route.params.diary_id;
        },
        methods: {
            onTypeSelected(e) {
                this.type = e.target.value;
            },
            createNewDiary: function () {
                this.btnDisabled = true;

                let pld = {
                    name: this.name
                };

                console.log(pld);

                axios.post(Settings.GetApiUrl() + "/diaries/" + this.selectedDiaryId + "/categories", pld, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    console.log(resp);
                    this.$router.push('/diaries/' + this.selectedDiaryId + "/categories");
                }).catch(err => {
                    console.log(err);
                });

                this.btnDisabled = false;
            }
        }
    }
</script>
