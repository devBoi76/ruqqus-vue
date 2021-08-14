<template>
	<t-dropdown text="Guild menu" :classes="{dropdown: 'w-56 origin-top-left right-0 bg-white py-2'}">
		<!-- Trigger -->
		<div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler, isShown }">
			<button id="user-menu" class="relative flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" :class="{ 'bg-gray-100 dark:bg-gray-700 text-primary': isShown }" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler">
				<span class="sr-only">View guild options</span>
				<i class="far" :class="icon"></i>
			</button>
		</div>
		<!-- Menu -->
		<div slot-scope="{ hide, blurHandler }">
			<div class="text-2xs font-bold uppercase tracking-wide text-gray-500 px-4 py-2">Membership</div>
			<router-link to="#" class="hidden px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
				<i class="far fa-sliders-h text-center fa-fw mr-2"></i><span>Your Preferences</span>
			</router-link>
			<router-link to="#" class="block px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-700" role="menuitem" @blur="blurHandler">
				<i class="far fa-sign-out fa-rotate-180 text-center fa-fw mr-2"></i><span>Leave Guild</span>
			</router-link>
			<hr class="my-2">
			<div class="text-2xs font-bold uppercase tracking-wide text-gray-500 px-4 py-2">Guild Master Tools</div>
			<router-link :to="`/+${$route.params.name}/settings/general`" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
				<i class="far fa-cog text-center fa-fw mr-2"></i><span>Guild Settings</span>
			</router-link>
			<router-link :to="`/+${$route.params.name}/settings/reports`" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
				<i class="far fa-flag text-center fa-fw mr-2"></i><span>Reported Content</span>
			</router-link>
			<router-link :to="`/+${$route.params.name}/settings/theming`" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
				<i class="far fa-paint-roller text-center fa-fw mr-2"></i><span>Appearance</span>
			</router-link>
			<router-link :to="`/+${$route.params.name}/settings/access`" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
				<i class="far fa-lock-alt text-center fa-fw mr-2"></i><span>Access and Privacy</span>
			</router-link>
		</div>
	</t-dropdown>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: 'far fa-ellipsis-h'
			},
		},
		data() {
			return {
				cancel: false
			};
		},
		methods: {
			toggle() {
				return this.cancel = !this.cancel
			}
		}
	};
</script>

