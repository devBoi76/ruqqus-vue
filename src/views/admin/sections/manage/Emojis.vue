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
						<EditModal/>
						<Select v-model:selected="selected" :options="options"/>
						<button class="button primary">
							Add Emoji
						</button>
						<form class="relative" @submit.prevent="onSubmit" @submit="search()">
							<div class="absolute left-3 top-[6px]">
								<button class="text-gray-400 hover:text-gray-500" type="submit">
									<i class="far fa-search fa-fw fa-sm"></i>
								</button>
							</div>
							<input required type="text" class="form-input light pl-9" v-model="searchTerm" placeholder="Search emoji"/>
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
							<div class="overflow-hidden border sm:rounded">
								<table class="min-w-full divide-y divide-gray-200">
									<thead class="bg-gray-50">
										<tr>
											<th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
												Emoji
											</th>
											<th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
												Uploaded By
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
										<tr v-for="emoji in emojis" :key="emoji.id" class="hover:bg-gray-50">
											<td class="px-6 py-3 whitespace-nowrap">
												<div class="flex items-center">
													<div class="flex-shrink-0 w-8 h-8">
														<img class="w-8 h-8" :src="emoji.image" :alt="emoji.name" />
													</div>
													<div class="ml-3">
														<div class="flex items-center font-medium text-gray-900">
															<span class="text-gray-500 pr-[1px]">:</span>
															<span>{{ emoji.name }}</span>
															<span class="text-gray-500 pl-[1px]">:</span>
														</div>
													</div>
												</div>
											</td>
											<td class="px-6 py-3 whitespace-nowrap">
												<div class="flex items-center">
													<img class="w-5 h-5 rounded-sm" :src="emoji.author.image" :alt="`${emoji.author.name} avatar`"/>
													<div class="ml-2 text-gray-900">{{ emoji.author.name }}</div>
												</div>
											</td>
											<td class="px-6 py-3 whitespace-nowrap text-gray-500">
												<span class="capitalize">{{ emoji.category }}</span>
											</td>
											<td class="group px-6 py-3 whitespace-nowrap text-right">
												<button href="#" class="font-medium text-primary hover:text-opacity-70">
													Edit
												</button>
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

import Select from "@/components/forms/Select.vue";
import EditModal from "@/components/modals/ModalEmoji.vue"

export default {
	name: "UserSettingsBasicInfoView",
	components: {
		Select,
		EditModal
	},
	data() {
		return {
			selected: { name: 'Wade Cooper' },
			searchTerm: '',
			emojiCount: 3,
			loading: false,
			errored: false,
			reorder: false,
			options: [
			{ name: 'Wade Cooper' },
			{ name: 'Arlene Mccoy' },
			{ name: 'Devon Webb' },
			{ name: 'Tom Cook' },
			{ name: 'Tanya Fox' },
			{ name: 'Hellen Schmidt' },
			],
			emojis: [
			{
				id: 1,
				name: 'pepe',
				image: 'https://i.imgur.com/3BH7ry5.jpg',
				author: {
					name: 'throwaway420',
					image: 'https://i.ruqqus.com/users/throwaway420/profile-2.png'
				},
				category: 'memes',
			},
			{
				id: 2,
				name: 'kekw',
				image: 'https://i.imgur.com/u6zqX6q.jpg',
				author: {
					name: 'throwaway420',
					image: 'https://i.ruqqus.com/users/throwaway420/profile-2.png'
				},
				category: 'memes',
			},
			{
				id: 3,
				name: 'flushed',
				image: 'https://i.imgur.com/R9XCoie.gif',
				author: {
					name: 'throwaway420',
					image: 'https://i.ruqqus.com/users/throwaway420/profile-2.png'
				},
				category: 'animated',
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