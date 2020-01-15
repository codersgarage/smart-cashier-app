<template>
    <div>
        <Header/>
        <div class="dashboard-main-wrapper">
            <SideBar/>
            <ApplyForStore v-if="!has_store" v-bind:is_active="is_active"/>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Header from "@/components/Header";
    import SideBar from "@/components/SideBar";
    import SessionStore from "@/common/session_store";
    import ApplyForStore from "@/components/stores/ApplyForStore";
    import Settings from "@/common/settings";

    export default {
        name: "Index",
        components: {ApplyForStore, SideBar, Header},
        data() {
            return {
                has_store: true,
                is_active: false
            }
        },
        mounted() {
            if (!SessionStore.IsLoggedIn()) {
                this.$router.push('/login');
                return;
            }

            this.hasStore();
        },
        methods: {
            hasStore: function () {
                axios.get(Settings.GetApiUrl() + "/stores", {
                    headers: {
                        "Authorization": "Bearer " + SessionStore.GetAccessToken(),
                    }
                }).then(resp => {
                    console.log(resp);

                    let store = resp.data.data;
                    if (store.status === "registered") {
                        this.has_store = false;
                        this.is_active = false;
                        return
                    }

                    this.has_store = true;
                }).catch(err => {
                    console.log(err);
                    this.has_store = false;

                    if (SessionStore.isUnauthorized(err)) {
                        this.$router.push("/login");
                    }
                })
            }
        }
    }
</script>
