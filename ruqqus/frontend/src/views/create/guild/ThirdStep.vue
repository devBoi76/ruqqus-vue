<template>
	<div class="flex h-full items-center justify-end px-8 md:px-12 xl:px-24">
		<div class="flex flex-grow flex-col space-y-6">
			<div>
				<h2 class="h3">Who can participate in the guild?</h2>
				<p class="text-gray-700 text-lg">These settings can always be changed later.</p>
			</div>
			<div class="flex flex-grow flex-col space-y-4">
				<div>
					<label for="guild-name" class="block uppercase text-gray-900 text-xs tracking-wide font-bold mb-1">Visibilty</label>
					<div class="flex space-x-4">
						<div class="flex w-2/4 items-center justify-between px-4 py-2 rounded-sm" :class="!guildPrivate ? 'border-2 border-purple-500 bg-white' : 'border bg-gray-50'" @click="guildPrivate = false" @keyup.enter="guildPrivate = false" tabindex="0">
							<div class="flex flex-grow flex-row-reverse items-center justify-between">
								<i class="fas fa-eye fa-fw text-xl ml-3" :class="!guildPrivate ? 'text-purple-500' : 'text-gray-200'"></i>
								<div>
									<div class="font-medium text-lg">Public</div>
									<p class="text-sm text-gray-500">
										Anyone can view the guild.
									</p>
								</div>
							</div>
						</div>
						<div class="flex w-2/4 items-center justify-between px-4 py-2 rounded-sm" :class="guildPrivate ? 'border-2 border-purple-500 bg-white' : 'border bg-gray-50'" @click="guildPrivate = true" @keyup.enter="guildPrivate = true" tabindex="0">
							<div class="flex flex-grow flex-row-reverse items-center justify-between">
								<i class="fas fa-eye-slash fa-fw text-xl ml-3" :class="guildPrivate ? 'text-purple-500' : 'text-gray-200'"></i>
								<div>
									<div class="font-medium text-lg">Private</div>
									<p class="text-sm text-gray-500">
										Must be approved to view the guild.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<label for="guild-name" class="block uppercase text-gray-900 text-xs tracking-wide font-bold mb-1">Adult Content</label>
					<t-checkbox-group v-model="guildNSFW" name="NSFW" :options="[{ value: 1, text: 'This guild is not safe for work.' }]"></t-checkbox-group>
				</div>
			</div>
			<Navigation :currentStep="currentStep" :validated="true"></Navigation>
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
			components: {
				Navigation
			},
			computed: {
				guildPrivate: {
					get() {
						return this.$store.state.create.guild.private
					},
					set (value) {
						this.$store.commit('create/TOGGLE_GUILD_PRIVATE', {private: value})
					}
				},
				guildNSFW: {
					get() {
						return this.$store.state.create.guild.NSFW
					},
					set (value) {
						this.$store.commit('create/TOGGLE_GUILD_NSFW', {NSFW: value})
					}
				}
			}
		}
	</script>