<template>
	<div class="flex flex-col flex-grow items-center">
		<ul class="flex space-x-1 mb-4">
			<li>
				<div class="w-10 h-1 rounded-full bg-purple-100"/>
			</li>
			<li>
				<div class="w-10 h-1 rounded-full bg-purple-300"/>
			</li>
			<li>
				<div class="w-10 h-1 rounded-full bg-purple-100"/>
			</li>
		</ul>
		<h1 class="text-4xl font-medium">
			Create an account
		</h1>
		<div class="w-96 bg-white border shadow-sm rounded md:p-8 md:mt-10">
			<div class="flex justify-center w-full -mt-16 mb-3">
				<!-- <img :src="avatar" class="w-16 h-16 rounded-sm"/> -->
				<div class="w-16 h-16 flex items-center justify-center rounded-sm bg-gray-200 overflow-hidden shadow-inner">
					<span class="-mb-8">
						<i class="fas fa-user text-6xl text-gray-400"></i>
					</span>
				</div>
			</div>
			<form class="flex flex-col space-y-4 mb-8" @submit.prevent="onSubmit">
				<div>
					<label class="label">
						Community name
					</label>
					<input required type="text" v-model="name" placeholder="i.e. The Guild" class="form-input light w-full"/>
					<p class="mt-2 text-xs text-gray-500">
						You can set up your custom domain later.
					</p>
				</div>
				<div>
					<label class="label">
						Username
					</label>
					<input required type="text" v-model="username" placeholder="i.e. ruqqie" class="form-input light w-full"/>
				</div>
				<div>
					<label class="label">
						Email address
					</label>
					<input required type="email" v-model="email" placeholder="john@example.com" class="form-input light w-full"/>
				</div>
				<div>
					<label class="label">
						Password
					</label>
					<input required type="password" v-model="password" placeholder="At least 10 characters" class="form-input light w-full"/>
				</div>
			</form>
			<router-link to="/admin" custom v-slot="{ navigate }">
				<button class="button primary w-full" @click="navigate" @keypress.enter="navigate" role="link">
					Continue
					<i class="far fa-long-arrow-right pl-2"></i>
				</button>
			</router-link>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex"

	import Navigation from '@/components/navigation/OnboardUserButtons.vue';

	export default {
		data() {
			return {
				loading: false,
				errored: false
			};
		},
		props: {
		},
		components: {
			Navigation
		},
		watch: {
		},
		computed: {
			...mapState("persist", ["v"]),
			isFirst() {
				return this.$route.name === 'onboard-user-first-step'
			},
			isSecond() {
				return this.$route.name === 'onboard-user-second-step'
			},
			isThird() {
				return this.$route.name === 'onboard-user-third-step'
			},
			isLast() {
				return this.$route.name === 'onboard-user-fourth-step'
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
					return 'interests'
				} else if (this.isSecond) {
					return 'communities'
				} else {
					return 'profile'
				}
			},
			canSkip() {
				return false
			},
			validated() {
				return true
			},
			checkedCats: {
				get () {
					return this.$store.state.onboarding.selectedCats
				},
				set (value) {
					this.$store.dispatch('onboarding/updateCats', value)
					console.log(this.$store.state.onboarding.selectedCats)
				}
			}
		},
		methods: {
		}
	}
</script>