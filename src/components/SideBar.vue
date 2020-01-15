<template>
    <div class="nav-left-sidebar sidebar-dark">
        <div class="menu-list">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="collapse navbar-collapse" id="navbarNavAdmin">
                    <ul class="navbar-nav flex-column">
                        <li class="nav-divider">
                            Main Menu
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false"
                               data-target="#submenu-2" aria-controls="submenu-2"><i class="fa fa-fw fa-rocket"/>
                                Catalog
                            </a>
                            <div id="submenu-2" class="collapse submenu" style="">
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <router-link to="/diaries">
                                            <a class="nav-link">Diaries</a>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SideBar",
        data() {
            return {}
        },
        mounted() {

        },
        methods: {}
    }
</script>
