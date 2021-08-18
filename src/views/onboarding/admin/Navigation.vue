<template>
	<div class="flex flex-col space-y-2">
		<button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-sm" @click="navigateNext()">
			{{ nextButtonText() }}<i class="fas fa-long-arrow-right pl-2" v-show="!isLast()"></i>
		</button>
		<button class="text-gray-500 hover:text-gray-600" @click="navigatePrevious()" v-show="!isFirst()">
			Previous
		</button>
	</div>
</template>

<script>
	export default {
		methods: {
			nextButtonText() {
				if (this.$route.name === 'create-guild-fourth-step') {
					return 'Launch Guild';
				}
				return 'Next';
			},
			isFirst() {
				return this.$route.name === 'create-guild-first-step'
			},
			isLast() {
				return this.$route.name === 'create-guild-fourth-step'
			},
			navigateNext() {
				if (this.$route.name === 'create-guild-fourth-step') {
					submit();
				}
				this.$router.push('/' + (++currentStep);
			},
			navigatePrevious() {
				if (this.$route.name === 'create-guild-fourth-step') {
					this.$router.push('/3');
				} else if (this.$route.name === 'create-guild-third-step') {
					this.$route.push('/2');
				} else if (this.$route.name === 'create-guild-second-step') {
					this.$route.push('/1');
				}
			}
		}
	}
</script>