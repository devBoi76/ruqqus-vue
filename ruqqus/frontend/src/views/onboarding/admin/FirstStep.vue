<template>
	<div class="flex flex-col flex-grow h-full">
		<div class="bg-white border shadow-xs rounded overflow-hidden">
			<h1>
				Welcome to Ruqqus
			</h1>
			<p class="mt-1">
				descriptive copy text
			</p>
			<button class="button primary">
				Get started
				<i class="far fa-long-arrow-right pl-2"></i>
			</button>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from "vuex"

	import Navigation from '@/components/navigation/OnboardUserButtons.vue';
	import CategoryTile from "@/components/cards/CategoryTile.vue";

	export default {
		data() {
			return {
				loading: false,
				errored: false,
			}
		},
		components: {
			Navigation,
			CategoryTile
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