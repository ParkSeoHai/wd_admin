import { acceptHMRUpdate, defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
    state: () => ({
        showNavbar: false
    }),
    actions: {
        toggleNavbar() {
            this.showNavbar = !this.showNavbar;
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}