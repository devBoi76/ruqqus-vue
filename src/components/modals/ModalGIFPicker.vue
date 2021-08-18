<template>
	<t-modal
	v-model="show"
	:hideCloseButton="true"
	:classes="{
		overlay: 'bg-black',
		wrapper: 'max-w-2xl',
		modal: 'bg-white shadow',
		body: '',
		header: 'flex items-center justify-between px-4 py-3 bg-white border-b',
		footer: 'bg-gray-100',
		close: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
		closeIcon: 'fill-current h-4 w-4',
		overlayEnterClass: '',
		overlayEnterActiveClass: 'opacity-0 transition ease-out duration-100',
		overlayEnterToClass: 'opacity-100',
		overlayLeaveClass: 'transition ease-in opacity-100',
		overlayLeaveActiveClass: '',
		overlayLeaveToClass: 'opacity-0 duration-75',
		enterClass: '',
		enterActiveClass: '',
		enterToClass: '',
		leaveClass: '',
		leaveActiveClass: '',
		leaveToClass: ''
	}"
	>
	<template v-slot:header>
		<div class="font-bold text-lg">Find a GIF</div>
	</template>
	<div class="mt-4 px-4">
		<input v-model="searchTerm" placeholder="Search for that perfect gif" class="font-input"/> <!-- Add debounce function -->
	</div>
	<div v-show="searchTerm" class="p-4">
		<div v-if="gifs" class="masonry mb-4">
			<div v-for="gif in gifs" :key="gif.id" class="mb-3.5 transform hover:scale-95 active:scale-90 transition duration-150"
			@click="selectGif(gif.preview); show = false;">
				<img
				:src="gif.preview"
				class="w-full h-auto"
				:class="gif.bgColor ? gif.bgColor : 'bg-primary bg-opacity-20'"
				:alt="`gif-${gif.id}`"/>
			</div>
		</div>
		<div v-if="suggestions && gifs" class="my-8 text-center">
			<div class="text-lg text-gray-600 font-medium mb-4">
				How about exploring these suggestions?
			</div>
			<ul class="flex items-center justify-center space-x-3 mb-0">
				<li v-for="suggestion in suggestions.slice(0, 4)" :key="suggestion">
					<button class="block px-4 py-1.5 rounded-sm transition text-sm leading-4 font-bold duration-100 ease-in-out focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:text-white bg-transparent border border-gray-300 hover:bg-purple-500 hover:border-transparent" @click="searchTerm = suggestion">
						<span class="capitalize">
							{{ suggestion }}
						</span>
					</button>
				</li>
			</ul>
		</div>
		<!-- <t-button v-if="next || gifs.length <= 45" variant="gray200" class="w-full" @click="position++">
			Load more {{ position }}
		</t-button> -->
	</div>
	<div v-show="!searchTerm" class="flex flex-wrap px-2 py-4 overflow-hidden">
		<div v-for="category in categories" :key="category.id" class="mb-3.5 px-2 w-1/2 overflow-hidden">
			<div class="relative w-full h-56 transform hover:scale-95 active:scale-90 transition duration-150" @click="searchTerm = category.searchterm">
				<div class="absolute w-full h-full bg-black bg-opacity-50"></div>
				<div class="absolute top-1 left-2 text-white font-bold capitalize">
					{{ category.searchterm }}
				</div>
				<img
				v-lazy="category.image"
				class="w-full h-full object-cover bg-gray-100"
				:alt="`gif-category-${category.searchterm}`"/>
			</div>
		</div>
	</div>
</t-modal>
</template>

<script>
	//import { mapState, mapActions } from "vuex";
	export default {
		props: {
			showModal: Boolean
		},
		data() {
			return {
				show: this.showModal,
				searchTerm: "",
				position: 1,
				next: null,
				awaitingSearch: false,
				categories: [],
				suggestions: [],
				gifs: []
			};
		},
		computed: {
		},
		watch: {
			position: function() {
				this.getGifs();
			},
			searchTerm: function (newSearch, oldSearch) {
				if (!this.awaitingSearch) {
					setTimeout(() => {
						this.getGifs();
						this.awaitingSearch = false;
					}, 750); // .75 sec delay
				}
				this.awaitingSearch = true;
				return [newSearch, oldSearch]
			}
		},
		methods: {
			getCategories() {
				let url = "https://g.tenor.com/v1/categories?featured"
				fetch(url)
				.then(response => {
					return response.json();
				})
				.then(json => {
					this.categories = json.tags
				})
				.catch(err => console.log(err));
			},
			getSuggestions() {
				let apiKey = "8DR2CVCSDQPL";
				let url = "https://g.tenor.com/v1/search_suggestions?q=" + this.searchTerm + "&key=" + apiKey
				fetch(url)
				.then(response => {
					return response.json();
				})
				.then(json => {
					this.suggestions = json.results
				})
				.catch(err => console.log(err));
			},
			getGifs() {
				//search = search || this.searchTerm;
				//let append = Boolean(search === this.searchTerm) // make "appendable" if search term has not changed
				let apiKey = "8DR2CVCSDQPL";
				let lmt = 20;
				let url = "https://g.tenor.com/v1/search?q=" + this.searchTerm + "&key=" + apiKey + "&limit=" + lmt + "&pos=" + this.position;
				fetch(url)
				.then(response => {
					return response.json();
				})
				.then(json => {
					//this.next = json.next;
					this.buildGifs(json.results);
					this.getSuggestions();
				})
				.catch(err => console.log(err));
			},
			buildGifs(data) {
				let results = data.map(function(obj) {
					return {
						id: obj.id,
						preview: obj.media[0].tinygif.url,
						url: obj.media[0].gif.url,
						source: obj.url,
						bgColor: obj.bg_color
					}
				});
				this.gifs = results
				// if (append) { // if loading next page of results for same search term, append to array
				// 	console.log('appended')
				// 	this.gifs = this.gifs.concat(results);
				// } else {
				// 	console.log('not appended')
				// 	this.gifs = results
				// }
			},
			selectGif(gif) {
				this.$emit('select-gif', gif)
			}
		},
		mounted() {
			//this.getCategories()
		}
	};
</script>

<style scoped>
.masonry {
	column-count: 2;
}
@media (min-width: 1024px) {
	.masonry {
		column-count: 3
	}
}
</style>
