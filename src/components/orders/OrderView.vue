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
                                <h2 class="pageheader-title">Order Details</h2>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered first">
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>Ordered Item</th>
                                                <th>Quantity</th>
                                                <th>Subtotal</th>
                                                <th>SKU</th>
                                                <th>Digital</th>
                                                <th>Shippable</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in order.items" v-bind:key="item.id">
                                                <td>
                                                    <img height="50px"
                                                         class="rounded-circle user-avatar-xl"
                                                         v-bind:src="getFullImagePath(item.image)"/>
                                                </td>
                                                <td>{{ item.name }}</td>
                                                <td>{{ item.quantity }}</td>
                                                <td>${{ item.sub_total }}</td>
                                                <td>{{ item.sku }}</td>
                                                <td>{{ item.is_digital ? 'Yes':'No'  }}</td>
                                                <td>{{ item.is_published ? 'Yes':'No' }}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="container mt-5">
                                        <h3>Order information</h3>
                                        <hr>

                                        <div class="row">
                                            <div class="col-6">
                                                <h4 class="bg-light">Payment</h4>

                                                <div>
                                                    <p>Payment Method: <span class="pl-2 text-dark">{{ order.payment_method_name}}</span></p>
                                                    <p>Offline: <span class="pl-2 text-dark">{{ order.payment_method_is_offline ? 'Yes':'No' }}</span></p>
                                                    <p>Payment Gateway: <span class="pl-2 text-dark">{{ order.payment_gateway }}</span></p>
                                                    <p>Subtotal: <span class="pl-2 text-dark">{{ order.sub_total }}</span></p>
                                                    <p>Vat: <span class="pl-2 text-dark">{{ order.total_vat }}</span></p>
                                                    <p>Tax: <span class="pl-2 text-dark">{{ order.total_tax }}</span></p>
                                                    <p>Shipping Charge: <span class="pl-2 text-dark">{{ order.ordershipping_charge }}</span></p>
                                                    <p>Payment Processing Fee: <span class="pl-2 text-dark">{{ order.payment_processing_fee }}</span></p>
                                                    <p>Grand Total: <span class="pl-2 text-dark">{{ order.grand_total }}</span></p>
                                                    <p>Payment Done: <span class="pl-2 text-dark">{{ order.is_paid }}</span></p>
                                                    <p>Status: <span class="pl-2 text-dark">{{ order.status }}</span></p>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <h4 class="bg-light">Billing</h4>

                                                <div>
                                                    <p>Id: <span class="pl-2 text-dark">{{ order.billing_id }}</span></p>
                                                    <p>Name: <span class="pl-2 text-dark">{{ order.billing_name }}</span></p>
                                                    <p>Email: <span class="pl-2 text-dark">{{ order.billing_email }}</span></p>
                                                    <p>Phone: <span class="pl-2 text-dark">{{ order.billing_phone }}</span></p>
                                                    <p>Address: <span class="pl-2 text-dark">{{ order.billing_house + ', ' + order.billing_city + ', ' + order.billing_postcode + ', ' + order.billing_country }}</span></p>
                                                    <p>City: <span class="pl-2 text-dark">{{ order.billing_city }}</span></p>
                                                    <p>Country: <span class="pl-2 text-dark">{{ order.billing_country }}</span></p>
                                                    <p>Postcode: <span class="pl-2 text-dark">{{ order.billing_postcode }}</span></p>
                                                </div>
                                            </div>

                                            <div class="mt-4">
                                                <h5>Order Created at: {{ order.created_at.split('T')[0] }}</h5>
                                                <h5>Order Updated at: {{ order.updated_at.split('T')[0]}}</h5>
                                            </div>
                                        </div>

                                        <div class="mt-5">
                                            <h3>Additional information</h3>
                                            <hr>

                                            <div>
                                                <p>Store Id: <span class="pl-2 text-dark">{{ order.store_id }}</span></p>
                                                <p>Store Name: <span class="pl-2 text-dark">{{ order.store_name }}</span></p>
                                                <p>Store Email: <span class="pl-2 text-dark">{{ order.store_email }}</span></p>
                                                <p>Store Phone: <span class="pl-2 text-dark">{{ order.store_phone }}</span></p>
                                                <p>Store Status: <span class="pl-2 text-dark">{{ order.store_status }}</span></p>
                                                <p>Store Address: <span class="pl-2 text-dark">{{ order.store_address }}</span></p>
                                                <p>Store Postcode: <span class="pl-2 text-dark">{{ order.store_postcode }}</span></p>
                                                <p>Store City: <span class="pl-2 text-dark">{{ order.store_city }}</span></p>
                                                <p>Store Country: <span class="pl-2 text-dark">{{ order.store_country }}</span></p>
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
        name: "OrderView",
        components: {Footer, SideBar, Header},
        data() {
            return {
                order_id: this.$route.params.id,
                order: [],
            }
        },
        mounted() {
            this.getProduct(this.order_id);
        },
        methods: {
            getProduct: function (id) {
                axios.get(Settings.GetApiUrl() + '/orders/' + id,{
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    this.order = resp.data.data;
                    console.log(this.order)
                }).catch(err => {
                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                    }
                })
            },
            getFullImagePath(subPath) {
                return Settings.GetMediaUrl() + subPath;
            },

        }
    }
</script>

<style scoped>
tbody tr img{
    padding: 1px;
    border:2px solid #021a40;
}
</style>
