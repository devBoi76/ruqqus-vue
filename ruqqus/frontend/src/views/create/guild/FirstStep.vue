<template>
	<div class="flex h-screen items-center justify-end px-8 md:px-12 xl:px-24">
		<div class="flex flex-grow flex-col space-y-6">
			<div>
				<h2 class="h3">Let's give your guild a name</h2>
				<p class="text-gray-700 text-lg">Communities on Ruqqus are called guilds.</p>
			</div>
			<div class="flex flex-grow flex-col space-y-4">
				<div>
					<label for="guild-name" class="block uppercase text-gray-900 text-xs tracking-wide font-bold mb-1">Guild Name</label>
					<t-input name="guildName" v-model="guildName" maxlength="25" placeholder="Ex. MyAwesomeGuild" variant="light" @focus="formFocused = true"/>
					<div v-show="guildName.length > 25" class="mt-1 text-xs text-red-500">
						Must be 25 characters or less, no spaces
					</div>
				</div>
			</div>
			<Navigation :currentStep="currentStep" :validated="validated"></Navigation>
		</div>
	</div>
</template>

<script>
	// import components
	import axios from 'axios'
	import Navigation from '@/components/navigation/GuildCreateButtons.vue';

	export default {
		data() {
			return {
				loading: false,
				errored: false,
				guildAvailable: true
			};
		},
		props: {
			currentStep: Number
		},
		components: {
			Navigation
		},
		watch: {
		},
		computed: {
			validated() {
				return this.$store.state.create.firstStepValidated
			},
			guildName: {
				get() {
					return this.$store.state.create.guild.name
				},
				set (value) {
					this.$store.commit('create/SET_GUILD_NAME', {name: value});
					if (value.length > 1 && value.length <= 25) {
						this.$store.commit('create/SET_FIRST_STEP_VALID', {firstStepValidated: true})
					} else {
						this.$store.commit('create/SET_FIRST_STEP_VALID', {firstStepValidated: false})
					}
				}
			},
			formFocused: {
				get() {
					return this.$store.state.create.formFocused
				},
				set (value) {
					this.$store.commit('create/TOGGLE_FORM_FOCUS', {formFocused: value})
				}
			}
		},
		methods: {
		},
		mounted() {
			axios
			.get('/api/vue/search?q=%2B' + this.$store.state.create.guild.name)
			.then(response => {
				if (response.data === null) {
					this.guildAvailable = true
				} else {
					this.guildAvailable = false
				}
				console.log(this.guildAvailable)
			})
			.catch(error => {
				console.log(error)
				this.errored = true
			})
			.finally(() => this.loading = false)
		}
	}
</script>