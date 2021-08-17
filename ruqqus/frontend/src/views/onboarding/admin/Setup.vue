<template>
	<div class="flex flex-col flex-grow bg-white h-full">
		<div class="relative grid grid-cols-12 overflow-y-auto">
			<div class="col-span-full md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11 flex gap-6 p-4 lg:p-0 lg:my-12">
				<keep-alive :max='3'>
					<router-view :key="$route.fullPath"/>
				</keep-alive>
			</div>
		</div>
	</div>
</template>

<script>
// Import components
export default {
	name: "AdminOnboarding",
	data() {
		return {
			begin: true,
			image: {
				src: 'https://i.ibb.co/pLYS5Dw/artem-sapegin-XGDBd-SQ70-O0-unsplash.jpg'
			}
		};
	},
	computed: {
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
		}
	}
};
</script>