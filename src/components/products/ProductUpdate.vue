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
                                <h2 class="pageheader-title">Update Product</h2>
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
                                        <div class="form-group row">
                                            <label
                                                    class="col-3 col-lg-2 col-form-label text-right">Description</label>
                                            <div class="col-9 col-lg-10">
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
                                                            v-model="isPublished">
                                                        <option v-bind:value="true">Yes</option>
                                                        <option v-bind:value="false">No
                                                        </option>
                                                    </select>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-3 col-lg-2 col-form-label text-right">
                                                Is Digital
                                            </label>
                                            <div class="col-9 col-lg-10">
                                                <label class="custom-control custom-radio custom-control-inline">
                                                    <select class="form-control form-control-sm"
                                                            v-model="isDigital">
                                                        <option v-bind:value="true">Yes</option>
                                                        <option v-bind:value="false">No
                                                        </option>
                                                    </select>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-3 col-lg-2 col-form-label text-right">
                                                Is Shippable
                                            </label>
                                            <div class="col-9 col-lg-10">
                                                <label class="custom-control custom-radio custom-control-inline">
                                                    <select class="form-control form-control-sm"
                                                            v-model="isShippable">
                                                        <option v-bind:value="true">Yes</option>
                                                        <option v-bind:value="false" selected>No
                                                        </option>
                                                    </select>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputPrice"
                                                   class="col-3 col-lg-2 col-form-label text-right">Price</label>
                                            <div class="col-9 col-lg-10">
                                                <input id="inputPrice" v-model.number="price" type="number"
                                                       placeholder="Price"
                                                       class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputStock"
                                                   class="col-3 col-lg-2 col-form-label text-right">Stock</label>
                                            <div class="col-9 col-lg-10">
                                                <input id="inputStock" v-model.number="stock" type="number"
                                                       placeholder="Stock"
                                                       class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputSKU"
                                                   class="col-3 col-lg-2 col-form-label text-right">SKU</label>
                                            <div class="col-9 col-lg-10">
                                                <input id="inputSKU" v-model="sku" type="text"
                                                       placeholder="SKU"
                                                       class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputUnit"
                                                   class="col-3 col-lg-2 col-form-label text-right">Unit</label>
                                            <div class="col-9 col-lg-10">
                                                <input id="inputUnit" v-model="unit" type="text"
                                                       placeholder="Unit"
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
                                        <div class="form-group row">
                                            <label class="col-4 col-lg-3 col-form-label text-right">Default
                                                Image</label>
                                            <div class="col-8 col-lg-9">
                                                <input type="file" id="customFile" v-on:change="onDefaultImageSelected">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img v-if="defaultImage !== ''"
                                                     v-bind:src="getFullImagePath(defaultImage)"
                                                     alt="Default Image"
                                                     class="img-thumbnail rounded-circle user-avatar-xl">
                                            </div>
                                        </div>

                                        <div v-if="isDigital" class="form-group row">
                                            <label
                                                    class="col-4 col-lg-3 col-form-label text-right">
                                                Downloadable File</label>
                                            <div class="col-8 col-lg-9">
                                                <input type="file" id="customFileDigitalProduct"
                                                       v-on:change="onDigitalFileSelected">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img v-if="downloadableFile !== ''"
                                                     v-bind:src="downloadAbleFileIcon"
                                                     alt="Downloadable file clicked"
                                                     class="img-thumbnail rounded-circle user-avatar-xl"
                                                     v-on:click="onDownloadAbleFileClicked">
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-4 col-lg-3 col-form-label text-right">Additional Images</label>
                                            <div class="col-8 col-lg-9">
                                                <input type="file" id="customFileAdditionalImages"
                                                       v-on:change="onAdditionalImageSelected">
                                                <div>
                                                    <img v-for="i in additionalImages"
                                                         v-bind:src="getFullImagePath(i)"
                                                         v-on:click="deleteImage(i)"
                                                         alt="Additional Image"
                                                         class="my-3 mx-1 img-thumbnail rounded-circle user-avatar-xl"
                                                         v-bind:key="i">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row pt-2 pt-sm-5 mt-1">
                                            <div class="col-sm-6 pb-2 pb-sm-4 pb-lg-0 pr-0"></div>
                                            <div class="col-sm-6 pl-0">
                                                <p class="text-right">
                                                    <button type="submit" class="btn btn-space btn-primary"
                                                            :disabled="btnDisabled"
                                                            v-on:click="updateProduct">Update
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
    import SideBar from "@/components/SideBar";
    import Footer from "@/components/Footer";
    import Header from "@/components/Header";
    import VueSimplemde from 'vue-simplemde';
    import axios from "axios";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";
    import MediaService from "@/common/media_service";

    export default {
        name: "ProductUpdate",
        components: {Header, Footer, SideBar, VueSimplemde},
        data() {
            return {
                p_id: this.$route.params.id,
                name: "",
                description: "",
                price: '',
                stock: '',
                sku: "",
                unit: "",
                isPublished: '',
                isDigital: '',
                isShippable: '',
                categories: [],
                selectedCategory: String,
                defaultImage: "",
                downloadableFile: "",
                downloadAbleFileIcon: "/assets/images/zip.jpeg",
                btnDisabled: false,
                additionalImages: []
            }
        },
        mounted() {
            this.getProduct(this.p_id);
            this.listCategories();
        },
        methods: {
            getProduct: function(id) {
                axios.get(Settings.GetApiUrl() + '/products/' + id, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    let instance = resp.data.data;

                    console.log(instance);

                    this.name = instance.name;
                    this.description = instance.description;
                    this.price = instance.price;
                    this.stock = instance.stock;
                    //this.sku = instance.sku;
                    this.unit = instance.unit;
                    this.isPublished = instance.is_published;
                    this.isShippable = instance.is_shippable;
                    this.isDigital = instance.is_digital;
                    this.stock = instance.stock;
                    this.selectedCategory = instance.category_id;
                    this.defaultImage = instance.image;
                    this.downloadableFile = instance.digital_download_link;
                    this.additionalImages = instance.additional_images.split(',');
                })
            },
            onCategorySelected: function (e) {
                console.log(e.target.value);
                this.selectedCategory = e.target.value;
            },
            onDefaultImageSelected: function (e) {
                this.defaultImage = "";
                let files = e.target.files || e.dataTransfer.files;

                if (files.length > 0) {
                    this.btnDisabled = true;

                    MediaService.uploadFile(files[0], "products").then(resp => {
                        let data = resp.data;
                        this.defaultImage = data.path;
                        this.btnDisabled = false;
                    }).catch(err => {
                        console.log(err);

                        if (SessionStore.isUnauthorized(err)) {
                            this.$router.push("/login");
                            return
                        }

                        let resp = err.response;
                        console.log(resp);
                    });
                }
                console.log(e.target.files || e.dataTransfer.files);
            },
            onAdditionalImageSelected: function (e) {
                let files = e.target.files || e.dataTransfer.files;

                if (files.length > 0) {
                    this.btnDisabled = true;

                    MediaService.uploadFile(files[0], "products").then(resp => {
                        let data = resp.data;
                        this.additionalImages.push(data.path);
                        this.btnDisabled = false;
                    }).catch(err => {
                        console.log(err);

                        if (SessionStore.isUnauthorized(err)) {
                            this.$router.push("/login");
                            return
                        }

                        let resp = err.response;
                        console.log(resp);
                    });
                }
                console.log(e.target.files || e.dataTransfer.files);
            },
            deleteImage: function (img) {
                this.additionalImages.splice(this.additionalImages.indexOf(img), 1)
            },
            onDigitalFileSelected: function (e) {
                this.downloadableFile = "";
                let files = e.target.files || e.dataTransfer.files;

                if (files.length > 0) {
                    this.btnDisabled = true;

                    MediaService.uploadFile(files[0], "products").then(resp => {
                        let data = resp.data;
                        this.downloadableFile = data.path;
                        this.btnDisabled = false;
                    }).catch(err => {
                        console.log(err);

                        if (SessionStore.isUnauthorized(err)) {
                            this.$router.push("/login");
                            return
                        }

                        let resp = err.response;
                        console.log(resp);
                    });
                }
                console.log(e.target.files || e.dataTransfer.files);
            },
            listCategories: function () {
                axios.get(Settings.GetApiUrl() + "/categories?page=1&limit=10", {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    console.log(resp);
                    this.categories = resp.data.data;
                    if (this.categories.length > 0) {
                        this.selectedCategory = this.categories[0].id;
                    }
                }).catch(err => {
                    console.log(err);

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                    }
                })
            },
            getFullImagePath: function (subPath) {
                return Settings.GetMediaUrl() + subPath;
            },
            onDownloadAbleFileClicked: function () {
                window.open(Settings.GetMediaUrl() + this.downloadableFile, '_blank');
            },
            updateProduct: function () {
                let pld = {};
                pld.name = this.name;
                pld.description = this.description;
                pld.price = this.price;
                pld.stock = this.stock;
                pld.sku = this.sku;
                pld.unit = this.unit;
                pld.is_published = this.isPublished;
                pld.is_digital = this.isDigital;
                pld.is_shippable = this.isShippable;
                pld.category_id = this.selectedCategory;
                pld.image = this.defaultImage;
                pld.digital_download_link = this.downloadableFile;
                pld.additional_images = this.additionalImages;

                console.log(pld);

                axios.patch(Settings.GetApiUrl() + "/products/" + this.p_id, pld, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    console.log(resp);
                    this.$router.push('/stores/products');
                }).catch(err => {
                    console.log(err.response);

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                        return
                    }

                    let resp = err.response.data;
                    alert(resp.title);
                })
            },
            onCancel: function () {
                this.$router.push('/stores/products');
            }
        }
    }
</script>

<style scoped>

</style>
