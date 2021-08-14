<template>
	<div class="flex h-full items-center justify-end px-8 md:px-12 xl:px-24">
		<div class="flex flex-grow flex-col space-y-6">
			<div>
				<h2 class="h3">What is your guild about?</h2>
				<p class="text-gray-700 text-lg">You can always update the category later on.</p>
			</div>
			<div class="flex flex-grow flex-col space-y-4">
				<div>
					<label for="guild-category" class="block uppercase text-gray-900 text-xs tracking-wide font-bold mb-1">Category</label>
					<t-rich-select
					v-model="currentValue"
					:options="options"
					/>
				</div>
			</div>
			<Navigation :currentStep="currentStep" :validated="validated"></Navigation>
		</div>
	</div>
</template>

<script>
	// import components
	import Navigation from '@/components/navigation/GuildCreateButtons.vue';

	export default {
		props: {
			currentStep: Number
		},
		data () {
			return {
				options: [
				'Arts',
				'Business',
				'Culture',
				'Discussion',
				'Entertainment',
				'Gaming',
				'Health',
				'Hobbies',
				'Lifestyle',
				'Memes',
				'News',
				'Politics',
				'Science',
				'Technology'
				]
			}
		},
		components: {
			Navigation
		},
		computed: {
			validated() {
				return this.$store.state.create.secondStepValidated
			},
			currentValue: {
				get() {
					return this.$store.state.create.guild.category
				},
				set (value) {
					this.$store.commit('create/SET_GUILD_CATEGORY', {category: value})
					if (value !== null) {
						this.$store.commit('create/SET_SECOND_STEP_VALID', {secondStepValidated: true})
					}
				}
			}
		}
	}
</script>