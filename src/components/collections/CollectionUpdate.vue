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
                                <h2 class="pageheader-title">Update Collection</h2>
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
                                                <div v-if="nameEmpty">
                                                    <span class="invalid">*Required</span>
                                                </div>
                                                <input id="inputName"
                                                       v-model="name"
                                                       type="text"
                                                       placeholder="Name"
                                                       class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-3 col-lg-2 col-form-label text-right">Description</label>
                                            <div class="col-9 col-lg-10">
                                                <div v-if="descriptionEmpty">
                                                    <span class="invalid">*Required</span>
                                                </div>
                                                <vue-simplemde v-model="description" preview-class="markdown-body"/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-3 col-lg-2 col-form-label text-right">
                                                Is Published
                                            </label>
                                            <div class="col-9 col-lg-10">
                                                <label class="custom-control custom-radio custom-control-inline">
                                                    <select v-model="isPublished"
                                                            class="form-control form-control-sm"
                                                            name="is_published">
                                                        <option v-bind:value="true">Yes</option>
                                                        <option v-bind:value="false">No</option>
                                                    </select>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-3 col-lg-2 col-form-label text-right">Default Image</label>
                                            <div class="col-9 col-lg-10">
                                                <div v-if="imgEmpty">
                                                    <span class="invalid">*Image is not added</span>
                                                </div>

                                                <input type="file" id="customFile" v-on:change="onImageSelected">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img v-if="image !== ''"
                                                     v-bind:src="getFullImagePath(image)"
                                                     alt="Default Image"
                                                     class="rounded-circle user-avatar-xl">
                                            </div>
                                        </div>
                                        <div class="row pt-2 pt-sm-5 mt-1">
                                            <div class="col-sm-6 pb-2 pb-sm-4 pb-lg-0 pr-0"></div>
                                            <div class="col-sm-6 pl-0">
                                                <p class="text-right">
                                                    <button type="submit" class="btn btn-space btn-primary"
                                                            :disabled="btnDisabled"
                                                            v-on:click="updateCollection">Update
                                                    </button>
                                                    <button class="btn btn-space btn-secondary" v-on:click="onCancel">
                                                        Cancel
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
    import axios from "axios";
    import VueSimplemde from 'vue-simplemde';
    import SideBar from "@/components/SideBar";
    import Footer from "@/components/Footer";
    import Header from "@/components/Header";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";
    import MediaService from "@/common/media_service";


    export default {
        name: "CollectionUpdate",
        components: {Header, Footer, SideBar, VueSimplemde},
        data() {
            return {
                id: this.$route.params.id,
                name: "",
                description: "",
                isPublished: '',
                image: "",
                collection: [],
                btnDisabled: false,
                nameEmpty: false,
                descriptionEmpty: false,
                imgEmpty: false,
            }
        },
        mounted() {
            this.getCollection(this.id);
        },
        methods: {
            getCollection: function(id) {
                axios.get(Settings.GetApiUrl() + '/collections/' + id, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    let instance = resp.data.data;

                    this.name = instance.name;
                    this.description = instance.description;
                    this.isPublished = instance.is_published;
                    this.image = instance.image;
                })
            },
            onImageSelected: function (e) {
                let files = e.target.files || e.dataTransfer.files;
                if (files.length > 0) {
                    this.btnDisabled = true;
                    this.imgEmpty = false;

                    MediaService.uploadFile(files[0], "collections").then(resp => {
                        let data = resp.data;
                        this.image = data.path;
                        this.btnDisabled = false;
                    }).catch(err => {
                        console.log(err);
                        let resp = err.response;
                        console.log(resp);
                    });
                }
                //console.log(e.target.files || e.dataTransfer.files);
            },
            getFullImagePath: function (subPath) {
                return Settings.GetMediaUrl() + subPath;
            },
            updateCollection: function () {
                let collection = {};
                collection.name = this.name;
                collection.description = this.description;
                collection.is_published = this.isPublished;
                collection.image = this.image;

                this.nameEmpty = collection.name === "";
                this.descriptionEmpty = collection.description === "";
                this.imgEmpty = collection.image === "";

                if ((collection.name !== "") && (collection.description !== "") && (collection.image !== "")) {
                    axios.patch(Settings.GetApiUrl() + "/collections/" + this.id, collection, {
                        headers: {
                            "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                        }
                    }).then(resp => {
                        //console.log(resp);
                        this.$router.push('/stores/collections');
                    }).catch(err => {
                        //console.log(err);
                        if (SessionStore.isUnauthorized(err)) {
                            this.$router.push("/login");
                        }
                    });
                }
            },
            onCancel: function () {
                this.$router.push('/stores/collections');
            }
        }
    }
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
    @import '~github-markdown-css';
</style>
