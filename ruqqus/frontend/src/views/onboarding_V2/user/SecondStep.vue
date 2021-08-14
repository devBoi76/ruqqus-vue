<template>
	<div class="flex flex-col flex-grow h-full">
		<div class="bg-white border shadow-xs rounded overflow-hidden">
			<div class="flex justify-between p-4 border-b bg-gray-50">
				<div>
					<h2 class="text-2xl leading-5 mb-0">
						Now choose your communities.
					</h2>
					<p class="text-gray-500 mt-1">
						Select at least 3 guilds. Their content will populate your personal home feed.
					</p>
				</div>
				<Navigation :validated="validated" :skippable="canSkip" :current-step="currentStep"/>
			</div>
			<div class="flex flex-col">
				<div class="p-4 border-b">
					<t-input placeholder="Search for Guilds"/>
				</div>
				<GuildList :guilds="guilds"/>
			</div>
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