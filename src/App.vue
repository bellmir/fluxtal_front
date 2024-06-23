<template>
	<ProgressBar v-show="loadingStore.isPageLoading" class="pageProgressBar" mode="indeterminate"></ProgressBar>
	<main>
		<Menubar :model="menuList" />

		<router-view />
	</main>
</template>

<script setup lang="ts">
// core
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoadingStore } from '@/stores/loading';
// components
import ProgressBar from 'primevue/progressbar';
import Menubar from 'primevue/menubar';

const route = useRoute();
const router = useRouter();
const loadingStore = useLoadingStore();

const menuList = ref([
	{
		label: 'Home',
		icon: 'pi pi-home',
		command: () => {
			router.push('/');
		},
	},
	{
		label: 'AutoContract',
		icon: 'pi pi-AutoContract',
		command: () => {
			router.push('/AutoContract');
		},
	},
	// {
	// 	label: 'Projects',
	// 	icon: 'pi pi-search',
	// 	items: [
	// 		{
	// 			label: 'Components',
	// 			icon: 'pi pi-bolt',
	// 		},
	// 		{
	// 			label: 'Blocks',
	// 			icon: 'pi pi-server',
	// 		},
	// 	],
	// },
]);
</script>

<style scoped lang="scss">
.pageProgressBar {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 5px;
}
</style>
