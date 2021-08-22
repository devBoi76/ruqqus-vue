<template>
	<Popover v-slot="{ open }">
		<PopoverButton as="div">
			<input type="text" class="form-input light" v-model="searchTerm" placeholder="Search posts or @users" @keyup.enter="search()"/>
		</PopoverButton>

		<!-- Conditionally render your panel using `v-if` on another element -->
		<transition
		enter-active-class="transition duration-200 ease-out"
		enter-from-class="translate-y-1 opacity-0"
		enter-to-class="translate-y-0 opacity-100"
		leave-active-class="transition duration-150 ease-in"
		leave-from-class="translate-y-0 opacity-100"
		leave-to-class="translate-y-1 opacity-0"
		>
		<div v-if="open">
			<!-- Don't forget to add static to your PopoverPanel! -->
			<PopoverPanel static class="absolute right-0 w-96 z-10 bg-white border rounded shadow-lg">
				<div class="flex items-center px-4 py-3">
					<div class="uppercase tracking-wide font-semibold leading-none text-2xs text-gray-500">
						Recent searches
					</div>
					<div class="ml-auto">
						Clear
					</div>
				</div>
				<div class="px-4 py-2">
					<button class="'group flex items-center w-full px-4 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100">
						<i class="far fa-search text-center fa-fw mr-2"></i>
						<span>search term</span>
					</button>
				</div>
			</PopoverPanel>
		</div>
	</transition>
</Popover>
</template>

<script>
	import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

	export default {
		components: { Popover, PopoverButton, PopoverPanel },
		data() {
			return {
				searchTerm: this.$route.query.q
			}
		},
		methods: {
			search() {
				this.$router.push("/search?q="+this.searchTerm);
			}
		}
	}
</script>