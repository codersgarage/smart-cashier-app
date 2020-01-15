<template>
    <div>
        <Header/>
        <div class="dashboard-main-wrapper">
            <SideBar/>
        </div>
    </div>
</template>

<script>
    import Header from "./Header";
    import SessionStore from "../common/session_store";
    import SideBar from "./SideBar";

    export default {
        name: "Index",
        components: {SideBar, Header},
        data() {
            return {
                has_store: true,
                is_active: false
            }
        },
        mounted() {
            if (!SessionStore.IsLoggedIn()) {
                this.$router.push('/login');
            }
        },
        methods: {}
    }
</script>
