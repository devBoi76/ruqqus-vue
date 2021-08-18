<template>
	<div class="flex flex-col flex-grow items-center">
		<ul class="flex space-x-1 mb-4">
			<li>
				<div class="w-10 h-1 rounded-full bg-purple-300"/>
			</li>
			<li>
				<div class="w-10 h-1 rounded-full bg-purple-100"/>
			</li>
			<li>
				<div class="w-10 h-1 rounded-full bg-purple-100"/>
			</li>
		</ul>
		<h1 class="text-4xl font-medium">
			Welcome to Ruqqus
		</h1>
		<p class="mt-1 text-gray-600">
			Glad to have you here. Let's get your community up and running.
		</p>
		<div class="mt-6 mb-8 w-full text-left px-16">
			<div class="h-full relative bg-white shadow-xl rounded-lg overflow-hidden">
				<div class="flex items-center justify-center w-full h-14 bg-gradient-to-t from-gray-200 to-gray-100 border-b px-4">
					<div class="flex space-x-1.5 mr-4">
						<div class="w-3 h-3 bg-red-400 rounded-full border-purple-400"></div>
						<div class="w-3 h-3 bg-yellow-400 rounded-full border-yellow-400"></div>
						<div class="w-3 h-3 bg-green-400 rounded-full border-purple-400"></div>
					</div>
					<div class="w-full bg-gray-50 border border-gray-300 hover:border-gray-400 transition duration-200 px-2 py-1 rounded text-sm text-gray-500 hover:text-gray-600 text-center shadow-inner">
						https://www.ruqqus.com/+ruqqus
					</div>
				</div>
				<div class="px-5 py-5 border rounded-b-lg">
					<div class="grid grid-cols-8 gap-5">
						<div class="col-span-full p-5 rounded border-2 border-purple-400 bg-purple-100">
							<div class="flex items-center">
								<span class="w-24 h-3 bg-purple-200 rounded-full"></span>
								<div class="flex items-center space-x-3 ml-auto">
									<span class="w-8 h-3 bg-purple-200 rounded-full"></span>
									<span class="w-8 h-3 bg-purple-200 rounded-full"></span>
									<span class="w-8 h-3 bg-purple-200 rounded-full"></span>
									<div class="w-6 h-6 flex-shrink-0 rounded bg-green-300"></div>
								</div>
							</div>
						</div>
						<div class="col-span-full md:col-span-6 p-5 h-auto rounded border-2 border-purple-400 bg-purple-100">
							<div class="flex flex-col space-y-8">
								<div class="flex w-full space-x-5">
									<div class="flex flex-col items-center space-y-2">
										<i class="fas fa-arrow-alt-up text-purple-300 text-sm"></i>
										<div class="rounded-full bg-purple-200 w-2 h-2"></div>
										<i class="fas fa-arrow-alt-down text-purple-200 text-sm"></i>
									</div>
									<div class="flex flex-col w-full space-y-3">
										<div class="flex space-x-2 items-center">
											<div class="w-8 h-8 rounded bg-green-400"></div>
											<div class="w-24 h-3 bg-purple-300 rounded-full"></div>
										</div>
										<div class="w-3/4 h-3 bg-purple-300 rounded-full"></div>
										<div class="w-2/4 h-3 bg-purple-300 rounded-full"></div>
									</div>
									<div class="w-24 h-14 bg-purple-300 rounded"></div>
								</div>
								<div class="flex w-full space-x-5">
									<div class="flex flex-col items-center space-y-2">
										<i class="fas fa-arrow-alt-up text-purple-500 text-sm"></i>
										<div class="rounded-full bg-purple-500 w-2 h-2"></div>
										<i class="fas fa-arrow-alt-down text-purple-200 text-sm"></i>
									</div>
									<div class="flex flex-col w-full space-y-3">
										<div class="flex space-x-2 items-center">
											<div class="w-8 h-8 rounded bg-orange-300"></div>
											<div class="w-36 h-3 bg-purple-300 rounded-full"></div>
										</div>
										<div class="w-3/5 h-3 bg-purple-300 rounded-full"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="hidden md:block col-span-2 p-5 rounded border-2 border-purple-400 bg-purple-100">
							<ul class="mb-3">
								<li class="flex items-center text-purple-400 py-2">
									<span class="w-4/5 h-3 bg-purple-200 rounded-full"></span>
								</li>
								<li class="flex items-center text-purple-400 py-2">
									<span class="w-3/5 h-3 bg-purple-200 rounded-full"></span>
								</li>
								<li class="flex items-center text-purple-400 py-2">
									<span class="w-3/4 h-3 bg-purple-200 rounded-full"></span>
								</li>
							</ul>
							<ul>
								<li class="flex items-center space-x-2 py-2">
									<div class="w-8 h-8 flex-shrink-0 rounded bg-green-300"></div>
									<span class="w-3/4 h-3 bg-purple-200 rounded-full"></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<router-link to="/setup/2" custom v-slot="{ navigate }">
			<button class="button primary" @click="navigate" @keypress.enter="navigate" role="link">
				Get started
				<i class="far fa-long-arrow-right pl-2"></i>
			</button>
		</router-link>
	</div>
</template>

<script>
	import { mapState, mapGetters } from "vuex"

	import Navigation from '@/components/navigation/OnboardUserButtons.vue';

	export default {
		data() {
			return {
			}
		},
		components: {
			Navigation
		},
		computed: {
			...mapState("persist", ["v"]),
			isFirst() {
				return this.$route.name === 'onboard-admin-first-step'
			},
			isSecond() {
				return this.$route.name === 'onboard-admin-second-step'
			},
			isThird() {
				return this.$route.name === 'onboard-admin-third-step'
			},
			isLast() {
				return this.$route.name === 'onboard-admin-fourth-step'
			},
			currentStep() {
				if (this.isFirst) {
					return 1
				} else if (this.isSecond) {
					return 2
				} else if (this.isThird) {
					return 3
				} else {
					return 4
				}
			},
			currentStepText() {
				if (this.isFirst) {
					return 'welcome'
				} else if (this.isSecond) {
					return 'profile'
				} else {
					return 'extras'
				}
			},
			canSkip() {
				if (this.isLast) {
					return true
				} else {
					return false
				}
			},
			validated() {
				if (this.isLast) {
					return true
				} else {
					return false
				}
			}
		}
	}
</script>