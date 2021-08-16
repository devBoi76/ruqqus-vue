<template>
	<div class="flex flex-col flex-grow h-full">
		<div class="bg-white border shadow-xs rounded overflow-hidden">
			<div class="flex justify-between p-4 border-b bg-gray-50">
				<div>
					<h2 class="text-2xl leading-5 mb-0">
						Ruqqus Extras
					</h2>
					<p class="text-gray-500 mt-1">
						Get involved by following the codebase, socials, and more.
					</p>
				</div>
				<Navigation :validated="validated" :skippable="canSkip" :current-step="currentStep"/>
			</div>
			<div class="flex flex-wrap -mx-2 -my-2 overflow-hidden p-4">

				<div class="my-2 px-2 w-1/2 overflow-hidden">
					<a href="https://github.com/ruqqus" class="block p-5 bg-white border hover:border-purple-500 rounded-sm">
						<div class="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded mb-4">
							<i class="fab fa-github-alt text-white shadow-sm"/>
						</div>
						<div class="text-lg text-gray-900 font-medium">GitHub Repository</div>
						<p class="text-gray-600 mt-1">
							Ruqqus is an open-source project. You're more than welcome to report issues, open pull requests, and more by visiting our codebase on Github!
						</p>
					</a>
				</div>

				<div class="my-2 px-2 w-1/2 overflow-hidden">
					<a href="https://github.com/ruqqus" class="block p-5 bg-white border hover:border-purple-500 rounded-sm">
						<div class="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded mb-4">
							<i class="fas fa-tshirt text-white shadow-sm"/>
						</div>
						<div class="text-lg text-gray-900 font-medium">Merch</div>
						<p class="text-gray-600 mt-1">
							Ruqqus is funded by the community. Help keep the servers running by purchasing our sweet merch. Designed in-house and ruqqie-approved.
						</p>
					</a>
				</div>

				<div class="my-2 px-2 w-1/2 overflow-hidden">
					<a href="https://github.com/ruqqus" class="block p-5 bg-white border hover:border-purple-500 rounded-sm">
						<div class="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded mb-4">
							<i class="fab fa-discord text-white shadow-sm"/>
						</div>
						<div class="text-lg text-gray-900 font-medium">Discord Server</div>
						<p class="text-gray-600 mt-1">
							Chat all-things Ruqqus in our official Discord server. We have channels ranging from feedback requests, bug reports, to open-source contributing.
						</p>
					</a>
				</div>

				<div class="my-2 px-2 w-1/2 overflow-hidden">
					<a href="https://github.com/ruqqus" class="block p-5 bg-white border hover:border-purple-500 rounded-sm">
						<div class="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded mb-4">
							<i class="fab fa-twitter text-white shadow-sm"/>
						</div>
						<div class="text-lg text-gray-900 font-medium">Twitter</div>
						<p class="text-gray-600 mt-1">
							Follow us on Twitter to receive occasional tweets featuring community original content, server maintenance updates, and more.
						</p>
					</a>
				</div>

			</div>
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
				errored: false,
				guilds: [
				{
					id: 1,
					name:'ruqqus',
					profile_url:'https://i.ruqqus.com/board/ruqqus/profile-3.png',
					description:'The official guild for all things Ruqqus.'
				},
				{
					id: 2,
					name:'gaming',
					profile_url:'https://i.ruqqus.com/board/gaming/profile-2.png',
					description:'For all things gaming.'
				},
				{
					id: 3,
					name:'AskRuqqus',
					profile_url:'https://i.ruqqus.com/board/askruqqus/profile-4.png',
					description:'Ask and answer questions.'
				},
				{
					id: 4,
					name:'technology',
					profile_url:'https://i.ruqqus.com/board/technology/profile-3.png',
					description:'For all things tech.'
				},
				{
					id: 5,
					name:'ruqquscraft',
					profile_url:'https://i.ruqqus.com/board/ruqquscraft/profile-4.png',
					description:'Official Guild for the Ruqquscraft Minecraft Server!'
				},
				{
					id: 6,
					name:'cooking',
					profile_url:'https://i.ruqqus.com/board/cooking/profile-2.png',
					description:'Cooking and Food Related. A Place For The Cooks Of Ruqqus or Aspiring Cooks. Post Your Recipes Here As Well. All Welcome to Participate.'
				},
				{
					id: 7,
					name:'privacy',
					profile_url:'https://i.ruqqus.com/board/privacy/profile-2.png',
					description:'Privacy and freedom in a digital world'
				}
				]
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