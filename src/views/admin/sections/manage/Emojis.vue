<template>
	<div class="flex flex-col flex-grow overflow-y-auto">

		<!-- Header content section -->
		<div class="grid grid-cols-12 sticky top-0 z-10">
			<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex items-center justify-between p-6 md:px-8 bg-white">
					<h1 class="text-2xl mb-0">
						Emoji
					</h1>
					<div v-show="!loading && !errored" class="flex items-center space-x-2">
						<button class="button primary">
							Add emoji
						</button>
						<form class="relative" @submit.prevent="onSubmit" @submit="search()">
							<div class="absolute left-3 top-[6px]">
								<button class="text-gray-400 hover:text-gray-500" type="submit">
									<i class="far fa-search fa-fw fa-sm"></i>
								</button>
							</div>
							<input required type="text" class="form-input light pl-9" v-model="searchTerm" placeholder="Search members"/>
							<div v-show="searchTerm" class="absolute right-3 top-[6px]">
								<button class="text-gray-400 hover:text-gray-500" @click="searchTerm = ''">
									<i class="far fa-times-circle fa-fw fa-sm"></i>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<!-- Main content section -->

		<!-- Error state if guild data fails to load -->
		<div v-show="errored && !loading" class="w-full h-2/3 p-4 md:px-8">
			<div class="flex flex-col h-full justify-center items-center text-center">
				<i class="block fad fa-ghost text-gray-400 dark:text-gray-200 text-5xl mb-6"></i>
				<div class="h5">
					Unable to Load Moderation Tools
				</div>
				<p class="text-gray-600 dark:text-gray-400">
					Sorry, we're unable to fetch guild reports right now. Please try again later.
				</p>
			</div>
		</div>

		<div class="grid grid-cols-12">

			<!-- Loading state -->
			<div v-show="loading && !errored" class="col-span-full 2xl:col-start-2 2xl:col-end-10 p-4 md:px-8">
				<div class="flex flex-col w-full space-y-3 animate-pulse">
					<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-1/6 h-3"></div>
					<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-full h-20"></div>
				</div>
			</div>

			<!-- Table -->
			<div v-if="!loading && !errored" class="col-span-full 2xl:col-start-2 2xl:col-end-10 p-4 md:px-8">
				<div class="flex flex-col">
					<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div class="overflow-hidden border-b border-gray-200 sm:rounded">
								<table class="min-w-full divide-y divide-gray-200">
									<thead class="bg-gray-50">
										<tr>
											<th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
												Emoji
											</th>
											<th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
												Author
											</th>
											<th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
												Category
											</th>
											<th scope="col" class="relative px-6 py-3">
												<span class="sr-only">Edit</span>
											</th>
										</tr>
									</thead>
									<tbody class="bg-white divide-y divide-gray-200">
										<tr v-for="emoji in emojis" :key="emoji.id">
											<td class="px-6 py-4 whitespace-nowrap">
												<div class="flex items-center">
													<div class="flex-shrink-0 h-10 w-10">
														<img class="h-10 w-10 rounded-full" :src="emoji.image" alt="" />
													</div>
													<div class="ml-4">
														<div class="text-sm font-medium text-gray-900">
															{{ emoji.name }}
														</div>
													</div>
												</div>
											</td>
											<td class="px-6 py-4 whitespace-nowrap">
												<div class="text-sm text-gray-900">{{ emoji.author }}</div>
											</td>
											<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{{ emoji.category }}
											</td>
											<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold">
												<button href="#" class="text-primary hover:text-opacity-70">Edit</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- End Main content section -->
</template>

<script>
// Import components
import { mapState } from 'vuex';

export default {
	name: "UserSettingsBasicInfoView",
	components: {
	},
	data() {
		return {
			searchTerm: '',
			emoteCount: 28,
			loading: false,
			errored: false,
			reorder: false,
			emotes: [
			{
				id: 1,
				name: 'pepe',
				src: 'https://i.imgur.com/3BH7ry5.jpg',
				author: 'throwaway420',
				category: 'memes',
			}
			],
			selected: [],
			selectedEmoji: null,
		}
	},
	computed: {
		...mapState("persist", ["v"]),
	}
};
</script>