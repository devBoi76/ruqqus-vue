<template>
	<div class="flex items-center space-x-2">
		<button class="button linkGray500" @click="navigatePrevious()" v-show="!isFirst">
			Back
		</button>
		<button class="button ml-auto" :class="[skippable ? 'white' : 'purple500']" :disabled="!validated" @click="navigateNext()">
			{{ nextButtonText }}
			<i class="fas fa-long-arrow-right pl-2" v-show="!isLast"></i>
		</button>
	</div>
</template>

<script>
	export default {
		props: {
			currentStep: Number,
			validated: Boolean,
			skippable: Boolean
		},
		computed: {
			checkedCatsCount() {
				return this.$store.getters['onboarding/selectedCatsCount']
			},
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
			nextButtonText() {
				if (this.isLast) {
					return 'No thanks, enter Ruqqus'
				} else if (this.isFirst && this.checkedCatsCount < 3) {
					return `Select at least ${3 - this.checkedCatsCount} more ${3 - this.checkedCatsCount === 1 ? 'category' : 'categories'}`
				} else if (this.skippable) {
					return 'Skip'
				} else {
					return 'Next'
				}
			},
		},
		methods: {
			navigateNext() {
				if (this.isLast) {
					//submit();
				}
				this.$router.push('/welcome/' + (this.currentStep + 1));
			},
			navigatePrevious() {
				if (this.isLast) {
					this.$router.push('/welcome/3');
				} else if (this.isThird) {
					this.$router.push('/welcome/2');
				} else if (this.isSecond) {
					this.$router.push('/welcome/1');
				}
			}
		}
	}
</script>