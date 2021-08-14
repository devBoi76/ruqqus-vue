<template>
	<!-- Profile dropdown -->
	<t-dropdown :classes="{dropdown: 'w-56 origin-top-left right-0 bg-white py-2'}">
		<!-- Trigger -->
		<div slot="trigger" slot-scope="{mousedownHandler,focusHandler,blurHandler,keydownHandler,isShown}">
			<button id="user-menu" class="flex items-center p-1 text-sm text-gray-900 font-bold bg-white dark:bg-gray-800 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:shadow-solid focus:outline-none focus:shadow-solid" :class="{ 'bg-gray-100 dark:bg-gray-700': isShown }" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler">
				<img class="w-8 h-8 object-cover rounded-sm mr-2" :src="v.profile_url" alt="user avatar"/>
				<i class="far fa-chevron-down fa-sm text-gray-700 dark:text-gray-400 mr-2"></i>
			</button>
		</div>
		<!-- Menu -->
		<div slot-scope="{ hide, blurHandler }">
			<router-link :to="`/${v.username}`" class="flex items-center px-4 py-2">
				<img class="w-10 h-10 object-cover rounded-sm" :src="v.profile_url" alt="user avatar"/>
				<div class="pl-3 truncate">
					<div class="text-gray-900 font-bold leading-4">{{ v.username }}</div>
					<div class="text-2xs text-gray-600 mt-1">
						<i class="fad fa-fire text-purple-500 pr-1"></i>{{ v.post_rep + v.comment_rep }} rep
					</div>
				</div>
			</router-link>
			<div class="hidden text-2xs font-bold uppercase tracking-wide text-gray-500 px-4 py-2">Account</div>
			<router-link to="/following" class="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-900" role="menuitem" @click.native="hide">
				<i class="far fa-user text-center fa-fw mr-2"></i><span>Following</span>
			</router-link>
			<router-link to="/guilds" class="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-900" role="menuitem" @click.native="hide">
				<i class="far fa-users-crown text-center fa-fw mr-2"></i><span>Guilds</span>
			</router-link>
			<router-link to="/saved" class="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-900" role="menuitem" @click.native="hide">
				<i class="far fa-bookmark text-center fa-fw mr-2"></i><span>Saved</span>
			</router-link>
			<router-link to="/settings" class="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-900" role="menuitem" @click.native="hide">
				<i class="far fa-cog text-center fa-fw mr-2"></i><span>Settings</span>
			</router-link>
			<div class="border-b dark:border-gray-700 dark:border-opacity-70 my-2"></div>
			<router-link to="/mod" class="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-900" role="menuitem" @click.native="hide">
				<i class="far fa-crown text-center fa-fw mr-2"></i><span>Moderation</span>
			</router-link>
			<router-link to="/create/guild/1" class="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-900" role="menuitem" @click.native="hide">
				<i class="far fa-swords text-center fa-fw mr-2"></i><span>Create New Guild</span>
			</router-link>
			<div class="border-b dark:border-gray-700 dark:border-opacity-70 my-2"></div>
			<router-link to="" class="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-900" role="menuitem" @click.native="hide">
				<i class="far fa-user-plus text-center fa-fw mr-2"></i><span>Invite Friends</span>
			</router-link>
			<div class="border-b dark:border-gray-700 dark:border-opacity-70 my-2"></div>
			<div class="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-900" role="menuitem">
				<i class="far text-center fa-fw mr-3" :class="dark ? 'fa-sun' : 'fa-moon'"></i><span>Dark Theme</span>
				<t-toggle v-model="dark" class="ml-auto"/>
			</div>
			<hr class="my-2">
			<router-link to="#" class="block px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-700" role="menuitem" @click.native="blurHandler">
				<i class="far fa-sign-out fa-rotate-180 text-center fa-fw mr-2"></i><span>Sign Out</span>
			</router-link>
		</div>
	</t-dropdown>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		name: "ProfileDropdown",
		data() {
			return {
				online: false,
				dark: false
			}
		},
		computed: {
			...mapState("persist", ["v", "darkMode"]),
			// Dark Mode toggle
			// dark: {
			// 	get () {
			// 		return this.darkMode
			// 	},
			// 	set (value) {
			// 		this.$store.dispatch('persist/toggle_dark', value)
			// 	}
			// }
		},
		methods: {
			...mapActions("persist", ["logout"]),
		}
	}
</script>
