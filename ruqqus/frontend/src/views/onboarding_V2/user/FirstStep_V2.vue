<template>
	<div class="flex flex-col flex-grow h-full">
		<div class="bg-white border shadow-xs rounded overflow-hidden">
			<div class="flex justify-between p-4 border-b bg-gray-50">
				<div>
					<h2 class="text-2xl leading-5 mb-0">
						First, tell us a few things you love.
					</h2>
					<p class="text-gray-500 mt-1">
						Select at least 3 topics. You can always change these later.
					</p>
				</div>
				<Navigation :validated="validated" :skippable="canSkip" :current-step="currentStep"/>
			</div>
			<div class="grid grid-cols-12 gap-4 p-4 border-b">
				<div class="relative col-span-full">
					<div class="absolute right-0 top-0 w-8 h-full fade-wipe"></div>
					<ul class="flex items-center space-x-2.5 mb-0 overflow-x-auto hide-scrollbar">
						<li v-for="category in checkedCats" :key="category">
							<label class="group" :for="category">
								<input type="checkbox" class="hidden" :id="category" :value="category" v-model="checkedCats"/>
								<div class="flex items-center justify-center w-28 h-8 text-purple-500 bg-purple-200 border border-purple-300 rounded-sm cursor-pointer">
									<span class="font-medium leading-none capitalize group-hover:line-through">
										{{ category }}
									</span>
								</div>
							</label>
						</li>
						<li v-if="selectedCatsCount < 3" class="flex items-center space-x-3">
							<div v-for="i in (3 - selectedCatsCount)" :key="i" class="w-28 h-8 border border-dashed border-gray-400 rounded-sm pointer-events-none">
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="p-4">
				<ul class="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap gap-2.5 mb-0">
					<li v-for="category of categories" :key="category.id">
						<CategoryTile :category="category"/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from "vuex"

	import Navigation from '@/components/navigation/OnboardUserButtons.vue';
	import CategoryTile from "@/components/cards/CategoryTile.vue";

	export default {
		data() {
			return {
				loading: false,
				errored: false,
				categories: [
				{
					id: 1,
					title: "arts",
					image: "https://i.ibb.co/VV16pPq/ezgif-6-b4664e314d16.gif",
					subcategories: [
					{
						id: 1,
						title: "photography",
						image: "https://i.ibb.co/WfV515Z/ezgif-6-f1eeb333e869.gif",
					},
					{
						id: 2,
						title: "literature",
						image: "https://i.ibb.co/LdxyVPq/ezgif-6-f04dc2889a2c.gif",
					},
					{
						id: 3,
						title: "performing",
						image: "https://i.ibb.co/c8S3NGW/ezgif-6-3404330193b0.gif",
					},
					{
						id: 4,
						title: "visual",
						image: "https://i.ibb.co/VSVYdKX/ezgif-6-8e5025e251e4.gif",
					},
					]
				},
				{
					id: 2,
					title: "business",
					image: "https://i.ibb.co/mC1zSDq/ezgif-6-248bbfb4be3f.gif",
					subcategories: [
					{
						id: 1,
						title: "entrepreneur",
						image: "https://i.ibb.co/RQ0g3Ww/200w-gif-cid-82a1493bd4gybcpt2qr0vwi0cxjzwdf4lv4paac8axb7sn85-rid-200w.gif",
					},
					{
						id: 2,
						title: "finance",
						image: "https://i.ibb.co/s6xTPQp/ezgif-6-dee4edf16a37.gif",
					},
					{
						id: 3,
						title: "management",
						image: "https://i.ibb.co/9GZttrN/ezgif-6-c4d954eb62b3.gif",
					},
					{
						id: 4,
						title: "startups",
						image: "https://i.ibb.co/Hg40kQm/ezgif-6-7577e4138417.gif",
					},
					]
				},
				{
					id: 3,
					title: "culture",
					image: "https://i.ibb.co/VWWnwYF/ezgif-6-272212f6af18.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				},
				{
					id: 4,
					title: "discussion",
					image: "https://i.ibb.co/rcgFGh1/ezgif-6-26711554728a.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				},
				{
					id: 5,
					title: "entertainment",
					image: "https://i.ibb.co/NFHxc1d/ezgif-6-d1ae3a23db89.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				},
				{
					id: 6,
					title: "gaming",
					image: "https://i.ibb.co/M2f3FhY/ezgif-6-07f85c221c70.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				},
				{
					id: 7,
					title: "health",
					image: "https://i.ibb.co/nsBX0zB/ezgif-6-0429a41e1474.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				},
				{
					id: 8,
					title: "hobbies",
					image: "https://i.ibb.co/xzRHMqB/ezgif-6-8ac28b386f1f.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				},
				{
					id: 9,
					title: "lifestyle",
					image: "https://i.ibb.co/7KBdGM7/ezgif-6-186b9a30b35e.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				},
				{
					id: 10,
					title: "memes",
					image: "https://i.ibb.co/DRQJc23/ezgif-6-0c45e2b88237.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				},
				{
					id: 11,
					title: "news",
					image: "https://i.ibb.co/GdPN2SR/ezgif-6-ef0089afe2ca.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				},
				{
					id: 12,
					title: "politics",
					image: "https://i.ibb.co/0Qx8YQx/ezgif-2-7017c81088ad.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				},
				{
					id: 13,
					title: "science",
					image: "https://i.ibb.co/X8L8dD9/ezgif-2-f034b19067eb.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				},
				{
					id: 14,
					title: "sports",
					image: "https://i.ibb.co/5YFrZ7n/ezgif-2-77cfd2962dfe.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				},
				{
					id: 15,
					title: "technology",
					image: "https://i.ibb.co/j8C65bX/ezgif-2-e4170e4bc0c5.gif",
					subcategories: [
					{
						id: 1,
						title: "history",
						image: "https://i.ibb.co/wc9nvx9/ezgif-6-cc7b2c1e0c5e.gif",
					},
					{
						id: 2,
						title: "language",
						image: "https://i.ibb.co/rtkFnb7/ezgif-6-b6828d6beea1.gif",
					},
					{
						id: 3,
						title: "philosophy",
						image: "https://i.ibb.co/4JvxGjg/ezgif-6-a28553e36420.gif",
					},
					{
						id: 4,
						title: "religion",
						image: "https://i.ibb.co/RNDS6tp/ezgif-6-4a480ac4c9c5.gif",
					},
					]
				}
				]
			};
		},
		props: {
		},
		components: {
			Navigation,
			CategoryTile
		},
		watch: {
		},
		computed: {
			...mapState("persist", ["v"]),
			...mapGetters("onboarding", ["selectedCatsCount"]),
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
				if (this.isLast) {
					return true
				} else {
					return false
				}
			},
			validated() {
				if (this.isLast) {
					return true
				} else if (this.isFirst && this.selectedCatsCount >= 3) {
					return true
				} else {
					return false
				}
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

<style scoped>
.fade-wipe {
	background-image: linear-gradient(90deg,rgba(255,255,255,0),#FFF)
}
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
	display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
}
</style>