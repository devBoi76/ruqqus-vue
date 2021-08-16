<template>
	<div class="flex flex-grow bg-gray-100">
		<div class="relative hidden lg:block w-1/4 bg-purple-500">
			<div class="flex h-screen items-center justify-end px-8 md:px-12">
				<!-- Show on first step -->
				<img v-show="isFirst && begin" src="https://i.ibb.co/sbkkygZ/clapping.gif" class="w-32 h-24 object-cover absolute bottom-4 left-4">
				<!-- Show on first step -->
				<img v-show="isSecond" src="https://i.ibb.co/VvKsWs4/giving-crown.gif" class="w-32 h-24 object-cover absolute bottom-4 left-4">
				<!-- Show on first step -->
				<img v-show="isLast" src="https://i.ibb.co/J2XYxnC/surprised.gif" class="w-32 h-24 object-cover absolute bottom-4 left-4">
				<div class="flex flex-grow flex-col space-y-8">
					<div class="transition-opacity duration-200" :class="{ 'opacity-0':!begin && isFirst }">
						<div class="text-xs uppercase tracking-wider">
							<span class="text-white text-opacity-70 pr-1">Step {{ currentStep }}</span>
							<span class="text-white font-bold">{{ currentStepText }}</span>
						</div>
						<div class="flex items-center justify-between space-x-2 mt-3">
							<router-link v-for="i in 4" :key="i" :to="`/welcome/${i}`" class="w-1/3 h-1 rounded-full bg-white" :class="{ 'bg-opacity-40':currentStep !== i }">
							</router-link>
						</div>
					</div>
					<!-- Show on first step -->
					<div v-show="isFirst && !begin" class="h-48">
						<h2 class="h3 text-white">Welcome to Ruqqus</h2>
						<p class="text-white text-opacity-90">
							Woohoo, happy to have you here {{ v.username }}! We'll walk you through a few easy steps to get familiar with Ruqqus.
						</p>
						<button class="button white relative mt-8 w-full animate-pulse" @click="begin = true">
							Begin
						</button>
					</div>
					<!-- Show on first step after clicking "begin" -->
					<div v-show="isFirst && begin" class="h-48">
						<h2 class="h3 text-white">What Are You Into?</h2>
						<p class="text-white text-opacity-80">
							Pick a few topics you like so we can best recommend relevant communities.
						</p>
					</div>
					<!-- Show on second step -->
					<div v-show="isSecond" class="h-48">
						<h2 class="h3 text-white">Join Some Communities</h2>
						<p class="text-white text-opacity-80">
							Communities on Ruqqus are called guilds. Join at least three guilds to populate your homepage and start using Ruqqus.
						</p>
					</div>
					<!-- Show on last step -->
					<div v-show="isLast" class="h-48">
						<h2 class="h3 text-white">Introduce Yourself</h2>
						<p class="text-white text-opacity-80">
							Tell the Ruqqus community a bit about yourself. You can furthur customize your profile later on. Or skip this step entirely.
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col w-full lg:w-3/4 shadow-sm">
			<vue-scroll>
				<keep-alive max=5>
					<router-view :key="$route.fullPath" class="transition-opacity duration-200" :class="{ 'opacity-25 pointer-events-none':!begin && isFirst }"/>
				</keep-alive>
			</vue-scroll>
			<div class="grid grid-cols-3 gap-4 p-4 md:px-12 border-t bg-white" v-show="begin">
				<div v-show="isFirst" class="col-span-2 relative">
					<div class="absolute right-0 top-0 w-8 h-full fade-wipe"></div>
					<ul class="flex items-center space-x-3 mb-0 overflow-x-auto hide-scrollbar">
						<li v-for="category in checkedCats" :key="category">
							<label class="group" :for="category">
								<input type="checkbox" class="hidden" :id="category" :value="category" v-model="checkedCats"/>
								<div class="flex items-center justify-center w-28 h-8 text-purple-500 bg-purple-100 border border-purple-200 rounded-sm cursor-pointer">
									<span class="font-medium leading-none capitalize group-hover:line-through">
										{{ category }}
									</span>
								</div>
							</label>
						</li>
						<li v-if="selectedCatsCount < 3" class="flex items-center space-x-3">
							<div v-for="i in (3 - selectedCatsCount)" :key="i" class="w-28 h-8 border border-dashed border-gray-300 rounded-sm pointer-events-none">
							</div>
						</li>
					</ul>
				</div>
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
			begin: false
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
		isLast() {
			return this.$route.name === 'onboard-user-third-step'
		},
		currentStep() {
			if (this.isFirst) {
				return 1
			} else if (this.isSecond) {
				return 2
			} else {
				return 3
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