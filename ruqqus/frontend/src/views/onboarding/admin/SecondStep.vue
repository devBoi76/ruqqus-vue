<template>
	<div class="flex flex-col flex-grow h-full">
		<div class="bg-white border shadow-xs rounded overflow-hidden">
			<div class="flex justify-center w-full -mt-10">
				<img :src="avatar" class="w-16 h-16 rounded-sm"/>
			</div>
			<div class="flex flex-col md:p-5 space-y-4 mb-6">
				<div>
					<label class="label">
						Community name
					</label>
					<input type="text" v-model="name" class="form-input w-full"/>
				</div>
				<div>
					<label class="label">
						Username
					</label>
					<input type="text" v-model="username" class="form-input w-full"/>
				</div>
				<div>
					<label class="label">
						Email address
					</label>
					<input type="email" v-model="email" class="form-input w-full"/>
				</div>
				<div>
					<label class="label">
						Password
					</label>
					<input type="password" v-model="password" class="form-input w-full"/>
				</div>
			</div>
			<button class="button primary">
				Continue
				<i class="far fa-long-arrow-right pl-2"></i>
			</button>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex"

	import Navigation from '@/components/navigation/OnboardUserButtons.vue';
	import GuildList from '@/components/guild/GuildList.vue';

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
			Navigation,
			GuildList
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