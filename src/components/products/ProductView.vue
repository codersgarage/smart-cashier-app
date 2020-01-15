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
                                <h2 class="pageheader-title">View Product - {{ productName }}</h2>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pr-xl-0 pr-lg-0 pr-md-0  m-b-30">
                                    <img class="d-inline-block imageDim" v-bind:src="getFullImagePath(images[currentImageIndex])"

                                         alt="First slide">
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-xl-0 pl-lg-0 pl-md-0 border-left m-b-30">
                                    <div class="product-details">
                                        <div class="border-bottom pb-3 mb-3">
                                            <h2 class="mb-3">{{ productName }}</h2>
                                            <div class="product-rating d-inline-block float-right">
                                                <i class="fa fa-fw fa-star"/>
                                                <i class="fa fa-fw fa-star"/>
                                                <i class="fa fa-fw fa-star"/>
                                                <i class="fa fa-fw fa-star"/>
                                                <i class="fa fa-fw fa-star"/>
                                            </div>
                                            <h3 class="mb-0 text-primary">${{ price }}</h3>
                                        </div>
                                        <div class="product-size border-bottom">
                                            <h4>SKU</h4>
                                            <div class="btn-group" role="group" aria-label="First group">
                                                {{ sku }}
                                            </div>
                                            <div class="product-qty">
                                                <h4>Stock</h4>
                                                <div class="quantity" align="center">
                                                    <h4>{{ stock }}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-size border-bottom">
                                            <h4>Is Published ?</h4>
                                            <div class="btn-group" role="group" aria-label="First group">
                                                <button type="button" class="btn btn-outline-light">
                                                    {{ isPublished ? "Yes" : "No" }}
                                                </button>
                                            </div>
                                            <div class="product-qty">
                                                <h4>Is Shippable ?</h4>
                                                <div class="quantity" align="center">
                                                    <button type="button" class="btn btn-outline-light">
                                                        {{ isShippable ? "Yes" : "No" }}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-size border-bottom">
                                            <h4>Is Digital ?</h4>
                                            <div class="btn-group" role="group" aria-label="First group">
                                                <button type="button" class="btn btn-outline-light">
                                                    {{ isDigital ? "Yes" : "No" }}
                                                </button>

                                                <button v-if="isDigital" type="button" class="btn btn-outline-light"
                                                        v-on:click="onDownloadClicked">Download
                                                </button>
                                            </div>
                                        </div>
                                        <div class="border-bottom pb-3 mb-3">
                                            <div class="product-rating d-inline-block float-right">
                                                <span v-for="(col,i) in collections" v-bind:key="col">
                                                    {{ i === 0 ? col : " | " + col}}
                                                </span>
                                            </div>
                                            <h3 class="mb-0 text-primary">{{ categoryName }}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 m-b-60">
                                    <div class="simple-card">
                                        <ul class="nav nav-tabs" id="myTab5" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active border-left-0" id="product-tab-1"
                                                   data-toggle="tab" href="#tab-1" role="tab"
                                                   aria-controls="product-tab-1" aria-selected="true">Descriptions</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="product-tab-2" data-toggle="tab" href="#tab-2"
                                                   role="tab" aria-controls="product-tab-2" aria-selected="false">Reviews</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="myTabContent5">
                                            <div class="tab-pane fade show active" id="tab-1" role="tabpanel"
                                                 aria-labelledby="product-tab-1">
                                                <vue-simple-markdown :source="description"/>
                                            </div>
                                            <div class="tab-pane fade" id="tab-2" role="tabpanel"
                                                 aria-labelledby="product-tab-2">
                                                <div class="review-block">
                                                    <p class="review-text font-italic m-0">“Vestibulum cursus felis vel
                                                        arcu convallis, viverra commodo felis bibendum. Orci varius
                                                        natoque penatibus et magnis dis parturient montes, nascetur
                                                        ridiculus mus. Proin non auctor est, sed lacinia velit. Orci
                                                        varius natoque penatibus et magnis dis parturient montes
                                                        nascetur ridiculus mus.”</p>
                                                    <div class="rating-star mb-4">
                                                        <i class="fa fa-fw fa-star"/>
                                                        <i class="fa fa-fw fa-star"/>
                                                        <i class="fa fa-fw fa-star"/>
                                                        <i class="fa fa-fw fa-star"/>
                                                        <i class="fa fa-fw fa-star"/>
                                                    </div>
                                                    <span class="text-dark font-weight-bold">Virgina G. Lightfoot</span><small
                                                        class="text-mute"> (Company name)</small>
                                                </div>
                                                <div class="review-block border-top mt-3 pt-3">
                                                    <p class="review-text font-italic m-0">“Integer pretium laoreet mi
                                                        ultrices tincidunt. Suspendisse eget risus nec sapien malesuada
                                                        ullamcorper eu ac sapien. Maecenas nulla orci, varius ac
                                                        tincidunt non, ornare a sem. Aliquam sed massa volutpat, aliquet
                                                        nibh sit amet, tincidunt ex. Donec interdum pharetra
                                                        dignissim.”</p>
                                                    <div class="rating-star mb-4">
                                                        <i class="fa fa-fw fa-star"/>
                                                        <i class="fa fa-fw fa-star"/>
                                                        <i class="fa fa-fw fa-star"/>
                                                        <i class="fa fa-fw fa-star"/>
                                                        <i class="fa fa-fw fa-star"/>
                                                    </div>
                                                    <span class="text-dark font-weight-bold">Ruby B. Matheny</span><small
                                                        class="text-mute"> (Company name)</small>
                                                </div>
                                                <div class="review-block  border-top mt-3 pt-3">
                                                    <p class="review-text font-italic m-0">“ Cras non rutrum neque. Sed
                                                        lacinia ex elit, vel viverra nisl faucibus eu. Aenean faucibus
                                                        neque vestibulum condimentum maximus. In id porttitor nisi.
                                                        Quisque sit amet commodo arcu, cursus pharetra elit. Nam
                                                        tincidunt lobortis augueat euismod ante sodales non. ”</p>
                                                    <div class="rating-star mb-4">
                                                        <i class="fa fa-fw fa-star"/>
                                                        <i class="fa fa-fw fa-star"/>
                                                        <i class="fa fa-fw fa-star"/>
                                                        <i class="fa fa-fw fa-star"/>
                                                        <i class="fa fa-fw fa-star"/>
                                                    </div>
                                                    <span class="text-dark font-weight-bold">Gloria S. Castillo</span><small
                                                        class="text-mute"> (Company name)</small>
                                                </div>
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
    import Header from "@/components/Header";
    import SideBar from "@/components/SideBar";
    import Footer from "@/components/Footer";
    import axios from "axios";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";

    export default {
        name: "ProductView",
        components: {Header, SideBar, Footer},
        data() {
            return {
                id: "",
                productName: "",
                images: [],
                currentImageIndex: 0,
                price: 0,
                description: "",
                stock: 0,
                isPublished: false,
                isDigital: false,
                isShippable: false,
                sku: "",
                categoryName: "",
                createdAt: "",
                updatedAt: "",
                digitalDownloadLink: "",
                collections: []
            }
        },
        mounted() {
            this.getProductDetails(this.$route.params.id);
        },
        methods: {
            getProductDetails: function (id) {
                axios.get(Settings.GetApiUrl() + "/products/" + id, {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    let p = resp.data.data;
                    console.log(p);

                    this.id = p.id;
                    this.productName = p.name;
                    this.price = p.price;
                    this.description = p.description;
                    this.stock = p.stock;
                    this.isPublished = p.is_published;
                    this.isDigital = p.is_digital;
                    this.isShippable = p.is_shippable;
                    this.sku = p.sku;
                    this.categoryName = p.category_name;
                    this.createdAt = p.created_at;
                    this.updatedAt = p.updated_at;
                    this.digitalDownloadLink = p.digital_download_link;

                    // TODO
                    this.collections.push("resume");
                    this.collections.push("winter sell");
                    this.collections.push("black friday");

                    let images = [];
                    images.push(p.image);

                    let ai = p.additional_images.split(",");

                    for (let i in ai) {
                        images.push(ai[i]);
                    }

                    this.images = images;
                    this.currentImageIndex = 0;
                    this.startSlide();
                }).catch(err => {
                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                    }
                })
            },
            getFullImagePath(subPath) {
                return Settings.GetMediaUrl() + subPath;
            },
            startSlide: function () {
                this.timer = setInterval(this.next, 3000);
            },
            next: function () {
                if (this.currentImageIndex >= this.images.length - 1) {
                    this.currentImageIndex = 0;
                    return
                }
                this.currentImageIndex = this.currentImageIndex + 1;
            },
            onDownloadClicked: function () {
                let link = Settings.GetMediaUrl() + this.digitalDownloadLink;
                window.open(link, '_blank');
            }
        }
    }
</script>

<style scoped>
    .imageDim {
        width: 400px;
        height: 520px;
        vertical-align: middle;
    }
</style>
