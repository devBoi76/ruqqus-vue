<template>
	<Popover v-slot="{ open }">
		<PopoverButton as="div" class="w-96 appearance-none">
			<form class="group relative" @submit.prevent="onSubmit" @submit="search()">
				<div class="absolute left-3 top-[6px]">
					<button class="text-gray-400 hover:text-gray-500" type="submit">
						<i class="far fa-search fa-fw fa-sm"></i>
					</button>
				</div>
				<input required type="text" class="form-input light pl-9" v-model="searchTerm" placeholder="Search posts or @users" @keyup.enter="search()"/>
				<div v-show="searchTerm" class="absolute right-3 top-[6px]">
					<button class="text-gray-400 hover:text-gray-500" @click="searchTerm = ''">
						<i class="far fa-times-circle fa-fw fa-sm"></i>
					</button>
				</div>
			</form>
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
		<div v-if="open && searchHistory.length">
			<!-- Don't forget to add static to your PopoverPanel! -->
			<PopoverPanel static v-slot="{ close }" class="absolute right-0 w-96 z-10 mt-2 bg-white border rounded shadow-lg">
				<div class="divide-y">
					<div class="flex items-center px-4 py-3">
						<div class="uppercase tracking-wide font-semibold leading-none text-2xs text-gray-900">
							Recent searches
						</div>
						<div class="ml-auto">
							<button class="text-sm text-gray-500" @click="clearSearchHistory()">
								Clear
							</button>
						</div>
					</div>
					<div class="py-2">
						<ul class="flex flex-col-reverse mb-0">
							<router-link :to="`/search?q=${item}`" v-for="(item, index) in searchHistory" :key="index" custom v-slot="{ navigate }">
								<PopoverButton as="li" class="appearance-none flex items-center w-full px-4 py-1.5 text-gray-900 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer" @click="navigate" @keypress.enter="navigate" role="link">
									<i class="far fa-history fa-fw text-gray-400 mr-3"></i>
									<span class="w-full truncate ellipsis">{{ item }}</span>
								</PopoverButton>
							</router-link>
						</ul>
					</div>
				</div>
			</PopoverPanel>
		</div>
	</transition>
</Popover>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

	export default {
		components: { Popover, PopoverButton, PopoverPanel },
		data() {
			return {
				searchTerm: this.$route.query.q
			}
		},
		computed: {
			...mapState("persist", ["searchHistory"]),
		},
		methods: {
			...mapActions("persist", ["clearSearchHistory"]),
			search() {
				if (this.searchTerm) this.$router.push("/search?q="+this.searchTerm);
			}
		}
	}
</script>