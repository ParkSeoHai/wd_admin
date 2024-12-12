<script setup>
import { onMounted } from "vue";
import { useGlobalStore } from "../stores";

const globalStore = useGlobalStore();
</script>

<template>
  <!-- Header -->
  <header id="header" class="header">
    <div class="main-container flex items-center h-full">
      <div class="logo">
        <a href="/">
          <img
            src="https://demo.bootstrapdash.com/skydash/themes/assets/images/logo.svg"
            alt="Logo"
            class="logo__img"
          />
        </a>
      </div>
      <div class="header__body flex items-center justify-between w-full text-[#6C7383]">
        <div class="header__body--left flex">
          <button class="navbar-toggle" type="button" @click="globalStore.toggleNavbar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
          <div class="search-group ms-[40px] flex items-center">
            <div class="search-group__icon me-[12px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                />
              </svg>
            </div>
            <input
              type="text"
              class="search-group__input outline-none mb-1"
              placeholder="Search now"
            />
          </div>
        </div>
        <div class="header__body--right">
          <ul class="navbar flex items-center gap-8">
            <li class="nav-item">
              <button type="button" class="nav-item__icon bell-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-bell"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"
                  />
                </svg>
              </button>
            </li>
            <li class="nav-item nav-profile">
              <div class="avatar">
                <img
                  src="https://avatars.githubusercontent.com/u/105920262?v=4"
                  alt=""
                  class="nav-profile__img"
                />
              </div>
            </li>
            <li class="nav-item nav-settings">
              <button class="nav-item__icon" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-three-dots"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
