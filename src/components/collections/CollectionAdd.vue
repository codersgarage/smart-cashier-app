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
                                <h2 class="pageheader-title">Add Collection</h2>
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
                                                    <select class="form-control form-control-sm"
                                                            v-on:change="onCheckBoxHandle" name="is_published">
                                                        <option v-bind:key="'yes'" v-bind:value="'yes'">Yes</option>
                                                        <option v-bind:key="'no'" v-bind:value="'no'" selected>No
                                                        </option>
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
                                                            v-on:click="createNewCollection">Add
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
        name: "CollectionAdd",
        components: {Header, Footer, SideBar, VueSimplemde},
        data() {
            return {
                name: "",
                description: "",
                isPublished: false,
                image: "",
                btnDisabled: false,
                nameEmpty: false,
                descriptionEmpty: false,
                imgEmpty: false,
            }
        },
        mounted() {
        },
        methods: {
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
                console.log(e.target.files || e.dataTransfer.files);
            },
            onCheckBoxHandle: function (e) {
                console.log(e.target.name);
                console.log(e.target.value);

                let name = e.target.name;
                let value = e.target.value;

                if (name === 'is_published') {
                    this.isPublished = value === 'yes';
                }
            },
            getFullImagePath: function (subPath) {
                return Settings.GetMediaUrl() + subPath;
            },
            createNewCollection: function () {
                let colctn = {};
                colctn.name = this.name;
                colctn.description = this.description;
                colctn.is_published = this.isPublished;
                colctn.image = this.image;

                console.log(colctn);

                this.nameEmpty = colctn.name === "";
                this.descriptionEmpty = colctn.description === "";
                this.imgEmpty = colctn.image === "";

                if ((colctn.name !== "") && (colctn.description !== "") && (colctn.image !== "")) {
                    axios.post(Settings.GetApiUrl() + "/collections", colctn, {
                        headers: {
                            "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                        }
                    }).then(resp => {
                        console.log(resp);
                        this.$router.push('/stores/collections');
                    }).catch(err => {
                        console.log(err);

                        if (SessionStore.isUnauthorized(err)) {
                            this.$router.push("/login");
                        }

                        //let resp = err.response;
                        //alert(resp.title);
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

    .invalid{
        color: #dc3545;
    }

    /* Tooltip container */
    .custom-tooltip {
        position: relative;
        display: inline-block;
    }

    .custom-tooltip .tooltiptext {
        visibility: visible;
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        top: -20px;
        left: 110%;
    }

    .custom-tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 100%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent black transparent transparent;
    }

</style>
