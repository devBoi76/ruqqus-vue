<template>
	<div class="flex flex-col space-y-3">
		<button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-sm disabled:opacity-50 disabled:pointer-events-none" :disabled="!validated" @click="navigateNext()">
			{{ nextButtonText() }}
			<i class="fas fa-long-arrow-right pl-2" v-show="!isLast()"></i>
		</button>
		<button class="text-gray-400 hover:text-gray-500" @click="navigatePrevious()" v-show="!isFirst()">
			Previous
		</button>
	</div>
</template>

<script>
	export default {
		props: {
			currentStep: Number,
			validated: Boolean
		},
		methods: {
			nextButtonText() {
				if (this.$route.name === 'create-guild-fourth-step') {
					return 'Invite people'
				} else if (this.$route.name === 'create-guild-fifth-step') {
					return 'Launch guild';
				}
				return 'Next';
			},
			isFirst() {
				return this.$route.name === 'create-guild-first-step'
			},
			isLast() {
				return this.$route.name === 'create-guild-fifth-step'
			},
			navigateNext() {
				if (this.$route.name === 'create-guild-fifth-step') {
					//submit();
				}
				this.$router.push('/create/guild/' + (this.currentStep + 1));
			},
			navigatePrevious() {
				if (this.$route.name === 'create-guild-fifth-step') {
					this.$router.push('/create/guild/4');
				} else if (this.$route.name === 'create-guild-fourth-step') {
					this.$router.push('/create/guild/3');
				} else if (this.$route.name === 'create-guild-third-step') {
					this.$router.push('/create/guild/2');
				} else if (this.$route.name === 'create-guild-second-step') {
					this.$router.push('/create/guild/1');
				}
			}
		}
	}
</script>