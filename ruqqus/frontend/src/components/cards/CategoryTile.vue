<template>
	<div :class="{'transform hover:scale-95 active:scale-90 transition duration-150':showParent}" tabindex="0">
		<!-- Parent Category -->
		<transition
		enter-active-class="transform transition-all duration-200 ease-in origin-center"
		leave-active-class="transform transition-all duration-300 ease-in origin-center"
		enter-class="opacity-0 scale-50"
		enter-to-class="opacity-100 scale-100"
		leave-class="opacity-100 scale-100"
		leave-to-class="opacity-0 scale-0"
		mode="out-in"
		:duration="300"
		>
			<div v-if="showParent" key="showParent">
				<label class="group" :for="category.title" @click="showParent = false">
					<input type="checkbox" class="hidden" :id="category.title" :value="category.title" v-model="checkedCats"/>
					<div class="relative rounded overflow-hidden cursor-pointer">
						<div class="absolute w-full h-full" :class="checkedCats.includes(category.title) ? 'bg-purple-500 bg-opacity-70' : 'bg-black bg-opacity-50'">
						</div>
						<div class="absolute top-1 left-2 text-white font-bold capitalize">
							{{ category.title }}
						</div>
						<img :src="category.image" class="object-cover w-full md:w-56 h-56"/>
					</div>
				</label>
			</div>
			<!-- Sub categories -->
			<div v-else key="showSub">
				<ul class="w-56 h-56 grid grid-cols-2 gap-2.5 mb-0">
					<li class="col-span-1 flex flex-col transform hover:scale-95 active:scale-90 transition duration-150" v-for="sub in category.subcategories" :key="sub.id" tabindex="0">
						<div class="relative w-full h-full">
							<label class="group" :for="sub.title">
								<input type="checkbox" class="hidden" :id="sub.title" :value="sub.title" v-model="checkedCats"/>
								<div class="absolute w-full h-full rounded overflow-hidden cursor-pointer bg-cover bg-center" v-lazy:background-image="sub.image">
									<div class="absolute w-full h-full" :class="checkedCats.includes(sub.title) ? 'bg-purple-500 bg-opacity-70' : 'bg-black bg-opacity-50'">
									</div>
									<div class="absolute top-1 left-2 text-white font-bold capitalize">
										{{ sub.title }}
									</div>

								</div>
							</label>
						</div>
					</li>
					<li v-if="category.subcategories.length < 3"></li>
					<li v-if="category.subcategories.length < 2"></li>
				</ul>
			</div>
		</transition>
	</div>
</template>

<script>
	import { mapState } from "vuex"

	//import Navigation from '@/components/navigation/OnboardUserButtons.vue';
	export default {
		data() {
			return {
				showParent: true
			};
		},
		props: {
			category: Object
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
		}
	}
</script>