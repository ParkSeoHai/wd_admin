<script setup>
import _ from "lodash";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "../stores";
import { ref, onMounted } from "vue";

const globalStore = useGlobalStore();
const { showNavbar } = storeToRefs(globalStore);

const navData = ref([
  {
    text: "Dashboard",
    name: "dashboard",
    href: "/",
    icon: `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-grid"
              viewBox="0 0 16 16"
            >
              <path
                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"
              />
            </svg>`,
    active: false,
  },
  {
    text: "Products",
    name: "product",
    href: "/product",
    icon: `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-shop"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z"
              />
            </svg>`,
    active: false,
  },
  {
    text: "Users",
    name: "user",
    href: "/user",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
      </svg>`,
    active: false,
  },
  {
    text: "About",
    name: "about",
    href: "#about",
    icon: `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-grid"
              viewBox="0 0 16 16"
            >
              <path
                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"
              />
            </svg>`,
    active: false,
    showSubNav: false,
    subnav: [
      {
        text: "Add",
        href: "/about/add",
        name: "add",
        active: false,
      },
      {
        text: "List",
        href: "/about/list",
        name: "list",
        active: false,
      },
    ],
  },
]);

const showSubNav = (index) => {
  navData.value[index].showSubNav = !navData.value[index].showSubNav;
};

const handleActiveNav = () => {
  const url = new URL(window.location);
  if (url.pathname === "/") {
    navData.value[0].active = true;
    return;
  }
  const pathnames = _.compact(url.pathname.split("/"));
  navData.value.forEach((nav) => {
    if (nav.name === pathnames[0]) {
      nav.active = true;
      if (pathnames[1]) {
        nav.subnav?.forEach((subnav) => {
          if (subnav.name === pathnames[1]) {
            subnav.active = true;
            nav.showSubNav = true;
          }
        });
      }
    }
  });
};

onMounted(() => {
  handleActiveNav();
});
</script>

<template>
  <!-- Sidebar -->
  <nav class="sidebar">
    <ul class="sidebar-nav" :class="{ show: showNavbar }">
      <li
        v-for="(navItem, index) in navData"
        :key="index"
        class="nav-item"
        :class="[navItem.active || navItem.showSubNav === true ? 'active' : '']"
      >
        <a :href="navItem.href" class="nav-link" @click="showSubNav(index)">
          <span class="nav-icon" v-html="navItem.icon"></span>
          <span class="nav-text">{{ navItem.text }}</span>
          <span v-if="navItem.subnav?.length > 0" class="nav-icon__arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </span>
        </a>
        <template v-if="navItem.subnav?.length > 0">
          <ul
            v-for="(subNav, index) in navItem.subnav"
            :key="index"
            class="nav-dropdown"
            :class="{ hidden: navItem.showSubNav === false }"
          >
            <li class="nav-dropdown__item" :class="{ active: subNav.active === true }">
              <a :href="subNav.href">{{ subNav.text }}</a>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </nav>
</template>
