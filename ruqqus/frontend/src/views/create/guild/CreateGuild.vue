<template>
	<div class="grid grid-cols-12 h-screen bg-gray-200">
		<div class="col-span-full lg:col-span-4 bg-white border-gray-300 shadow-sm">
			<vue-scroll>
				<router-view></router-view>
			</vue-scroll>
		</div>
		<div class="hidden lg:block col-span-8">
			<div class="flex h-full items-center px-24">
				<div class="flex w-full lg:w-3/4 h-2/4 bg-white border border-gray-300 rounded-sm shadow-sm overflow-hidden transition duration-500" :class="{ 'opacity-20':!formFocused }">
					<div class="flex flex-col w-1/4 bg-purple-500 flex-shrink-0">
						<div class="flex items-center justify-between w-full h-10 border-b border-black border-opacity-10 px-4 py-6 mb-4">
							<div v-show="guild.name == ''" class="w-full h-2 bg-white bg-opacity-20 rounded-full" :class="{ 'animate-pulse':formFocused }"></div>
							<div v-show="guild.name != ''" class="text-sm font-bold text-white truncate">+{{ guild.name }}</div>
							<i v-show="!isFirst" class="fas fa-lock-alt fa-fw text-xs text-white text-opacity-50 transform duration-200" :class="{ 'scale-0':!guild.private }"></i>
						</div>
						<div class="flex flex-shrink-0 flex-col space-y-6 px-4">
							<div class="flex flex-col space-y-2">
								<div class="w-2/4 h-2 bg-white bg-opacity-10 rounded-full"></div>
								<div class="w-5/6 h-2 bg-white bg-opacity-10 rounded-full"></div>
								<div class="w-5/6 h-2 bg-white bg-opacity-10 rounded-full"></div>
								<div class="w-5/6 h-2 bg-white bg-opacity-10 rounded-full"></div>
							</div>
							<div class="flex flex-col space-y-2">
								<div class="w-2/4 h-2 bg-white bg-opacity-10 rounded-full"></div>
								<div class="w-5/6 h-2 bg-white bg-opacity-10 rounded-full"></div>
								<div class="w-5/6 h-2 bg-white bg-opacity-10 rounded-full"></div>
								<div class="w-5/6 h-2 bg-white bg-opacity-10 rounded-full"></div>
							</div>
						</div>
					</div>

					<div class="flex flex-col w-full">
						<div class="flex items-center w-full h-10 border-b px-4 py-6">
							<div class="w-16 h-2 bg-gray-600 bg-opacity-10 rounded-full">
							</div>
						</div>
						<div class="flex justify-center p-4">
							<div class="flex flex-grow space-x-4 p-4 bg-gray-100 rounded-sm transform origin-top transition duration-300 ease-in" :class="{ 'scale-0':isFirst }">
								<div class="relative flex flex-shrink-0 items-center justify-center w-6 h-6 bg-blue-300 rounded-sm text-2xl text-blue-500 overflow-hidden">
									<div class="absolute -bottom-2">
										<i class="fas fa-user"></i>
									</div>
								</div>
								<div class="flex w-full flex-col space-y-2">
									<div v-show="guild.category !== null" class="font-bold text-xs leading-4">We're all about
										<span class="lowercase">{{ guild.category }}</span>!
									</div>
									<div v-show="guild.category === null" class="h-2 w-3/4 bg-gray-300 rounded-full animate-pulse"></div>
									<div class="h-2 w-5/6 bg-gray-200 rounded-full"></div>
									<div class="h-2 w-2/4 bg-gray-200 rounded-full"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="flex flex-col space-y-4 items-center w-20 border-l py-5 flex-shrink-0 px-4">
						<div class="w-full h-2 bg-gray-600 bg-opacity-10 rounded-full"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// Import components
import { mapState } from "vuex";

export default {
	name: "GuildCreation",
	computed: {
		...mapState("create", ["formFocused", "guild"]),
		isFirst() {
			return this.$route.name === 'create-guild-first-step'
		}
	}
};
</script>