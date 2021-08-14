<template>
	<div class="flex h-full items-center justify-end px-8 md:px-12 xl:px-24">
		<div class="flex flex-grow flex-col space-y-6">
			<div>
				<h2 class="h3">Get the ball rolling. Invite people!</h2>
				<p class="text-gray-700 text-lg">
					Know someone who'd be interested in your guild? Send them an invite when your guild goes live!
				</p>
			</div>
			<div class="flex flex-grow flex-col space-y-4">
				<div>
					<label for="guild-name" class="block uppercase text-gray-900 text-xs tracking-wide font-bold mb-1">Invite People</label>
			<button class="text-sm text-purple-500 hover:underline" @click="addInvite()">
				<i class="far fa-plus-circle pr-2"></i>Add invite
			</button>
		</div>
	</div>
	<Navigation :currentStep="currentStep" :validated="true"></Navigation>
</div>
</div>
</template>

<script>
		// import components
		//import axios from 'axios'
		import Navigation from '@/components/navigation/GuildCreateButtons.vue';

		export default {
			props: {
				currentStep: Number
			},
			data() {
				return {
					invites: 1,
					results: []
				}
			},
			components: {
				Navigation
			},
			computed: {
				guildPrimaryColor: {
					get() {
						return this.$store.state.create.guild.invites
					},
					set (value) {
						this.$store.commit('create/SET_GUILD_INVITES', {invites: value})
					}
				}
			},
			methods: {
				addInvite() {
					this.invites++
				},
				fetchUser (query) {
					return fetch('/api/vue/search?q=@' + query)
					.then((response) => response.json())
					.then((data) => ({ results: data.data }))
				}
			}
		}
	</script>