<template>
	<div class="flex flex-grow" @dragover.prevent="dragOver">

		<ModalCreatePost/>
		<DropAnImage/>

		<div v-show="loadingGuild" class="hidden md:flex items-center flex-col flex-shrink-0 w-64 bg-white border-l border-r dark:bg-gray-750">
			<div class="flex flex-col w-full p-4 animate-pulse">
				<div class="flex flex-col w-full space-y-2 mb-8">
					<div class="w-full h-4 bg-gray-100 rounded-sm"></div>
					<div class="flex items-center">
						<div class="w-1/3 h-3 bg-gray-100 rounded-sm"></div>
						<div class="w-3 h-3 bg-gray-100 rounded-sm ml-2"></div>
					</div>
				</div>
				<div class="space-y-2 mb-12">
					<div class="w-full h-3 bg-gray-100 rounded-sm"></div>
					<div class="w-3/4 h-3 bg-gray-100 rounded-sm"></div>
				</div>
				<div class="space-y-2">
					<div class="w-full h-3 bg-gray-100 rounded-sm"></div>
					<div class="w-3/4 h-3 bg-gray-100 rounded-sm"></div>
				</div>
			</div>
		</div>

		<!-- Desktop - Main content section -->
		<div class="flex flex-col h-full shadow-sm bg-gray-200 dark:bg-gray-700">
			<!-- Header content section -->
			<div class="flex items-center justify-between flex-shrink-0 h-16 md:px-4 border-b border-gray-300 bg-white dark:border-white dark:border-opacity-10 dark:bg-gray-700">
				<div>
					<div class="text-base font-bold dark:text-gray-100">Search</div>
					<p class="text-sm text-gray-600 dark:text-white dark:text-opacity-65 mb-0">
						Automagically keeping tabs on guild master actions
					</p>
				</div>
				<div class="flex items-center space-x-1">
					<button class="w-9 h-9 flex items-center justify-center px-2 py-0 text-gray-500 bg-white dark:bg-gray-700 rounded-sm" :class="filtersVisible ? 'lg:bg-gray-100' : 'hover:bg-gray-100'" @click="filtersVisible = !filtersVisible">
						<i class="fas fa-sliders-h"></i>
					</button>
				</div>
			</div>

			<!-- Tabs -->
			<div class="flex flex-shrink-0 w-full items-end h-12 px-4 border-b dark:border-white dark:border-opacity-10 dark:bg-gray-700">
				<router-link v-for="tab in tabs" :key="tab.name" v-slot="{ href, navigate, isExactActive }" :to="tab.route">
					<a :href="href" @click="navigate" class="group">
						<div class="border-b-2 px-3 pb-2 capitalize" :class="isExactActive ? 'text-purple-500 border-purple-500' : 'text-gray-500 hover:text-gray-700 border-transparent'">
							{{ tab.name }}
						</div>
					</a>
				</router-link>
			</div>

			<!-- Main Content Desktop -->

			<vue-scroll class="hidden md:block">
				<div class="md:px-4 py-4">
					<div class="flex space-x-4">
						<div class="w-full" :class="{ 'lg:w-2/3':filtersVisible }">
							<div class="hidden lg:flex items-center justify-between mb-2" v-show="filtersVisible">
								<t-dropdown :classes="{dropdown: 'origin-top-left left-0 bg-white w-56 py-2'}" text="Menu">
									<!-- Trigger -->
									<div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler }">
										<button class="font-bold text-gray-600" id="sort-logs-menu" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler">
											Most recent<i class="fas fa-chevron-down fa-sm pl-2"></i>
										</button>
									</div>
									<!-- Menu -->
									<div slot-scope="{ hide }">
										<router-link to="?sort=hot" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
											<span>Oldest</span>
										</router-link>
										<router-link to="?sort=newest" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
											<span>Most recent</span>
										</router-link>
									</div>
								</t-dropdown>
							</div>

						</div>

						<div class="hidden lg:block lg:w-1/3" v-show="filtersVisible">
							<div class="flex flex-col flex-shrink-0 space-y-6">
								<div>
									<div class="flex items-center justify-between mb-2">
										<div class="text-sm font-bold">Filters</div>
										<button class="hidden text-sm text-red-500 hover:text-red-700" @click="filtersVisible = false">
											Clear
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</vue-scroll>
		</div>
		<!-- End Desktop - Main content section -->

		<!-- Mobile - Main content section -->

		<!-- Right bar -->
		<div class="hidden xl:flex flex-col flex-shrink-0 w-64 bg-white border-l dark:bg-gray-700">
			<div v-show="loadingGuild" class="flex flex-col w-full p-4 animate-pulse">
				<div class="space-y-4">
					<div class="flex space-x-3">
						<div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-sm"></div>
						<div class="flex flex-col justify-between flex-grow">
							<div class="w-3/4 h-3 bg-gray-100 rounded-sm"></div>
							<div class="w-16 h-3 bg-gray-100 rounded-sm"></div>
						</div>
					</div>
					<div class="flex space-x-3">
						<div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-sm"></div>
						<div class="flex flex-col justify-between flex-grow">
							<div class="w-full h-3 bg-gray-100 rounded-sm"></div>
							<div class="w-24 h-3 bg-gray-100 rounded-sm"></div>
						</div>
					</div>
					<div class="flex space-x-3">
						<div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-sm"></div>
						<div class="flex flex-col justify-between flex-grow">
							<div class="w-2/4 h-3 bg-gray-100 rounded-sm"></div>
							<div class="w-16 h-3 bg-gray-100 rounded-sm"></div>
						</div>
					</div>
					<div class="flex space-x-3">
						<div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-sm"></div>
						<div class="flex flex-col justify-between flex-grow">
							<div class="w-3/4 h-3 bg-gray-100 rounded-sm"></div>
							<div class="w-24 h-3 bg-gray-100 rounded-sm"></div>
						</div>
					</div>
				</div>
			</div>
			<vue-scroll v-show="!loadingGuild">
				<div class="p-3">
				</div>
			</vue-scroll>
		</div>
		<!-- End Right bar -->
	</div>
</template>

<script>
// Import our components
const ModalCreatePost = () => import('@/components/modals/ModalCreatePost.vue')

import DropAnImage from "@/components/DropAnImage.vue";

import ItemList from "@/views/ItemList.vue";

import ItemSort from "@/components/dropdowns/ItemSort.vue";
import ListingToggle from "@/components/forms/ListingToggle.vue";

import { mapState, mapGetters, mapActions } from "vuex";

//import axios from "axios";

export default {
	name: "guild-view",
	props: ["users"],
	data() {
		return {
			filtersVisible: false,
			items: [],
			page: 1,
			tabs: [
			{
				id: 1,
				name: "discussion",
				route: {
					name: 'guild-posts-view',
				}
			},
			{
				id: 2,
				name: "about",
				route: {
					name: 'guild-about-view',
				},
				exact: true
			},
			{
				id: 3,
				name: "members",
				route: {
					name: 'guild-members-view',
				},
				exact: true,
				number: "250 online"
			},
			{
				id: 4,
				name: "audit log",
				route: {
					name: 'guild-logs-view',
				},
				exact: true
			},
			{
				id: 5,
				name: "saved",
				route: {
					name: 'guild-saved-view',
				},
				exact: true
			}
			],
			menu: [
			{
				header: true,
				mobileDivider: true,
				name: 'sections',
				items: [
				{
					name: 'all posts',
					route: {
						name: 'guild-posts-view',
					},
					icon: 'fa-list',
					textCase: 'capitalize'
				},
				{
					name: 'about',
					route: {
						name: 'guild-about-view',
					},
					icon: 'fa-info-circle',
					textCase: 'capitalize'
				},
				{
					name: 'members',
					route: {
						name: 'guild-members-view',
					},
					icon: 'fa-users-crown',
					textCase: 'capitalize'
				},
				{
					name: 'audit log',
					route: {
						name: 'guild-logs-view',
					},
					icon: 'fa-scroll-old',
					textCase: 'capitalize'
				},
				{
					name: 'ruqqsack',
					route: {
						name: 'guild-saved-view',
					},
					icon: 'fa-backpack',
					textCase: 'capitalize'
				},
				]
			},
			{
				header: true,
				mobileDivider: true,
				name: 'lodges',
				enableDrag: true,
				items: [
				{
					name: 'illustrations',
					route: '/lodge/new-tracks',
					icon: 'fa-hashtag'
				},
				{
					name: 'photos',
					route: '/lodge/streams',
					icon: 'fa-hashtag'
				},
				{
					name: 'gifs',
					route: '/lodge/production',
					icon: 'fa-hashtag'
				},
				{
					name: 'music',
					route: '/lodge/meta',
					icon: 'fa-hashtag'
				},
				{
					name: 'videos',
					route: '/lodge/memes',
					icon: 'fa-hashtag'
				},
				{
					name: 'memes',
					route: '/lodge/memes',
					icon: 'fa-hashtag'
				},
				{
					name: 'meta',
					route: '/lodge/memes',
					icon: 'fa-hashtag'
				}
				]
			}
			]
		};
	},
	computed:{
		...mapState("persist", ["v"]),
		...mapState("guild", [
			"guild",
			"lodges",
			"loading_guild",
			"loading_lodges",
			"guildmasters"
			]),
		...mapGetters("create", ["canDropImage"]),
		loadingGuild() {
			return Object.keys(this.$store.state.guild.guild).length < 1
		}
	},
	watch: {
		// call again the method if the route changes
		'$route.query.sort': 'getPosts',
		'$route.params.name': ['getGuildInfo', 'getPosts']
	},
	components: {
		ModalCreatePost,
		DropAnImage,
		ItemList,
		ItemSort,
		ListingToggle
	},
	methods: {
		...mapActions("items", ["getItems", "resetItems"]),
		...mapActions("guild", ["loadGuildPage", "getLodges", "getGuild", "resetGuild"]),
		getPosts() {
			let name = this.$route.params.name || "General";
			let page = this.$route.query.page || 1;
			let sort = this.$route.query.sort || "hot";
			let time = this.$route.query.t || "all";

			let obj = {
				type: "guild",
				url: `/api/vue/guild/+${name}/listing?page=${page}&sort=${sort}&t=${time}`,
				sort: sort
			}
			this.getItems(obj)
		},
		getGuildInfo() {
			this.resetGuild()
			this.resetItems()
			let obj = {
				type: "guild",
				name: this.$route.params.name || "General",
				page: this.$route.query.page || 1,
				lodge: this.$route.query.lodge || "all",
				sort: this.$route.query.sort || "hot",
				t: this.$route.query.t || "all"
			}
			this.getGuild(obj)
		},
		dragOver(){
			if (this.canDropImage === true) {
				this.$store.commit('create/TOGGLE_POST_DROPZONE', {show: true})
			}
		},
		showModal() {
			this.$store.commit('create/TOGGLE_POST_CREATION_MODAL', {show: true}) // show post creation modal
		}
	},
	created() {
		this.getGuildInfo()
		this.getPosts()
	},
};
</script>
