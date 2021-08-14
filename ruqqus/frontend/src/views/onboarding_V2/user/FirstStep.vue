<template>
	<div class="flex flex-col h-full p-4 md:py-10 md:px-12 space-y-8">
		<div>
			<h2 class="h4">
				Select at Least 3 Topics You Like
			</h2>
			<p class="text-gray-500">
				You can always adjust these categories afterwards.
			</p>
		</div>
		<div class="mx-auto">
			<ul class="grid grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-2.5">
				<li v-for="category of categories" :key="category.id">
					<CategoryTile :category="category"/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex"

	import CategoryTile from "@/components/cards/CategoryTile.vue";

	//import Navigation from '@/components/navigation/OnboardUserButtons.vue';
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
			CategoryTile
		},
		watch: {
		},
		computed: {
			...mapState("persist", ["v"]),
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