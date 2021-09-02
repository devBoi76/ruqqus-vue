<template>
	<Popover class="relative">
		<PopoverButton class="flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm">
			<i class="far fa-cog fa-fw text-lg"></i>
		</PopoverButton>

		<!-- Use the built-in <transition> component to add transitions. -->
			<transition
			enter-active-class="transition duration-100 ease-out"
			enter-from-class="transform scale-95 opacity-0"
			enter-to-class="transform scale-100 opacity-100"
			leave-active-class="transition duration-75 ease-in"
			leave-from-class="transform scale-100 opacity-100"
			leave-to-class="transform scale-95 opacity-0"
			>
			<PopoverPanel class="absolute right-0 w-72 z-10 bg-white border rounded shadow-lg">
				<div class="divide-y">
					<div class="uppercase tracking-wide font-semibold leading-none text-2xs text-gray-500 px-4 py-3">
						Post options
					</div>
					<div class="flex flex-col space-y-5 p-4">
						<div class="flex flex-col space-y-5">
							<label class="inline-flex">
								<input type="radio" class="form-radio primary" name="time" value="immediately" @change="$emit('changeTime', $event.target.value)" :checked="time === 'immediately'"/>
								<div class="ml-3 -mt-0.5 w-full">
									<div class="text-sm text-gray-900 font-bold select-none">
										Publish now
									</div>
									<div class="text-xs text-gray-500">
										Publish the post immediately
									</div>
								</div>
							</label>
							<label class="inline-flex">
								<input type="radio" class="form-radio primary" name="time" value="scheduled" @change="$emit('changeTime', $event.target.value)" :checked="time === 'scheduled'"/>
								<div class="ml-3 -mt-0.5 w-full">
									<div class="text-sm text-gray-900 font-bold select-none">
										Schedule for later
									</div>
									<input type="datetime-local" id="time" name="time" class="flex items-center form-input light mt-2"/>
									<div class="mt-2 text-xs text-gray-500">
										Automatically publish the post later on
									</div>
								</div>
							</label>
						</div>
						<div class="flex flex-col space-y-2">
							<label class="flex items-center">
								<input type="checkbox" class="form-checkbox primary" id="feature" value="feature" v-model="computedOptions"/>
								<span class="pl-2 text-sm text-gray-700 select-none">
									Feature this post
								</span>
							</label>
							<label class="flex items-center">
								<input type="checkbox" class="form-checkbox primary" id="pin" value="pin" v-model="computedOptions"/>
								<span class="pl-2 text-sm text-gray-700 select-none">
									Pin to profile
								</span>
							</label>
							<label class="flex items-center">
								<input type="checkbox" class="form-checkbox primary" id="nsfw" value="nsfw" v-model="computedOptions"/>
								<span class="pl-2 text-sm text-gray-700 select-none">
									Mark as mature content
								</span>
							</label>
							<label class="flex items-center">
								<input type="checkbox" class="form-checkbox primary" id="notifications" value="notifications" v-model="computedOptions"/>
								<span class="pl-2 text-sm text-gray-700 select-none">
									Turn off notifications
								</span>
							</label>
						</div>
					</div>
				</div>
			</PopoverPanel>
		</transition>
	</Popover>
</template>

<script>
	import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

	export default {
		components: { Popover, PopoverButton, PopoverPanel },
		props: {
			time: String,
			options: Array
		},
		computed: {
			computedOptions: {
				get: function() {
					return this.options
				},
				set: function(value) {
				// some logic
				this.$emit('changeOptions', value)
			}
		}
	}
}
</script>