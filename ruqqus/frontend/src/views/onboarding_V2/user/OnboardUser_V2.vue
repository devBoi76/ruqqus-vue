<template>
	<div class="flex flex-col flex-grow bg-white h-full">
		<vue-scroll>
			<div class="relative grid grid-cols-12">
				<div class="col-span-full md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11 flex gap-6 p-4 lg:p-0 lg:my-12">
					<keep-alive max=5>
						<router-view :key="$route.fullPath" class="transition-opacity duration-200" :class="{ 'opacity-25 pointer-events-none':!begin && isFirst }"/>
					</keep-alive>
				</div>
			</div>
		</vue-scroll>
		<div class="hidden grid grid-cols-12 gap-4 px-4 md:px-0 py-4 border-t bg-white" v-show="begin">
			<div v-show="isFirst" class="col-span-8 md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-8 relative">
				<div class="absolute right-0 top-0 w-8 h-full fade-wipe"></div>
				<ul class="flex items-center space-x-2.5 mb-0 overflow-x-auto hide-scrollbar">
					<li v-for="category in checkedCats" :key="category">
						<label class="group" :for="category">
							<input type="checkbox" class="hidden" :id="category" :value="category" v-model="checkedCats"/>
							<div class="flex items-center justify-center w-28 h-8 text-purple-500 bg-purple-200 border border-purple-300 rounded-sm cursor-pointer">
								<span class="font-medium leading-none capitalize group-hover:line-through">
									{{ category }}
								</span>
							</div>
						</label>
					</li>
					<li v-if="selectedCatsCount < 3" class="flex items-center space-x-3">
						<div v-for="i in (3 - selectedCatsCount)" :key="i" class="w-28 h-8 border border-dashed border-gray-400 rounded-sm pointer-events-none">
						</div>
					</li>
				</ul>
			</div>
			<div :class="isFirst ? 'col-span-3' : 'lg:col-start-3 lg:col-end-11 relative'">
				<Navigation :validated="validated" :skippable="canSkip" :current-step="currentStep"/>
			</div>
		</div>
	</div>
</template>

<script>
// Import components
import { mapState, mapGetters } from "vuex"

import Navigation from '@/components/navigation/OnboardUserButtons.vue';

export default {
	name: "UserOnboarding",
	data() {
		return {
			begin: true,
			image: {
				src: 'https://i.ibb.co/pLYS5Dw/artem-sapegin-XGDBd-SQ70-O0-unsplash.jpg'
			}
		};
	},
	components: {
		Navigation
	},
	computed: {
		...mapState("persist", ["v"]),
		...mapGetters("onboarding", ["selectedCatsCount"]),
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
			if (this.isLast) {
				return true
			} else {
				return false
			}
		},
		validated() {
			if (this.isLast) {
				return true
			} else if (this.isFirst && this.selectedCatsCount >= 3) {
				return true
			} else {
				return false
			}
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
	}
};
</script>

<style scoped>
.fade-wipe {
	background-image: linear-gradient(90deg,rgba(255,255,255,0),#FFF)
}
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
	display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
}

.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>