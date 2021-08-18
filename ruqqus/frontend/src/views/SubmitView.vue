<template>
	<div class="w-full overflow-y-auto">
		<div class="grid grid-cols-12 xl:grid-cols-10">

			<div class="col-span-full xl:col-start-2 xl:col-end-10 sm:p-4 xl:p-0 my-2.5 sm:my-8">

				<div class="mb-4 md:mb-6">
					<h1 class="h3">
						Create post
					</h1>
				</div>

				<div class="flex gap-6">
					<!-- Main Content Section -->
					<div class="w-full">
						<div class="flex flex-grow">
							<div class="w-full bg-white dark:bg-gray-800 sm:rounded-sm">
								<div v-if="showLinkInput && !submission.image.source" class="relative bg-white border-t-2 border-b-2 border-dashed bg-gray-100 -mt-0.5">
									<div v-show="!submission.link" class="absolute w-full px-10 py-12 text-gray-500 pointer-events-none">
										Type or paste a link
									</div>
									<div v-show="loadingPreview && response.url" class="absolute bottom-2 right-2 text-gray-400 pointer-events-none">
										<i class="far fa-spinner-third fa-lg animate-spin"></i>
									</div>
									<div v-show="!response.url" ref="linkInput" class="flex items-center px-10 py-12" contenteditable @input="onLinkInput">
									</div>
									<div v-if="response.url" class="relative group">
										<button class="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-2xs font-bold text-white transform scale-0 group-hover:scale-100 transition duration-200 delay-100" @click="removeLink" tabindex="0">
											<i class="fas fa-times fa-sm"></i>
										</button>
										<LinkPreview
										v-if="response.url"
										:domain="response.domain"
										:title="response.title"
										:thumbnail="response.thumb_url"
										:url="response.url"
										:preview="response.url"
										/>
									</div>
								</div>
								<div class="p-2.5 space-y-2.5">
									<div class="flex items-center justify-between border-l border-r border-transparent">
										<div class="flex items-center">
											<img class="w-9 h-9 md:w-8 md:h-8 object-cover mr-2 rounded-sm bg-gray-100 dark:bg-gray-700" :src="v.profile_url"/>
											<div class="font-bold text-sm">
												{{ v.username }}
											</div>
										</div>
										<div class="-ml-2 flex items-center">
											<button class="flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" :class="{'bell':notifications}" :content="notifications ? 'Notifications on' : 'Notifications off'" v-tippy @click="notifications = !notifications">
												<i class="far fa-fw text-lg" :class="notifications ? 'fa-bell' : 'fa-bell-slash'"></i>
											</button>
										</div>
									</div>
									<div class="relative">
										<input type="text" class="form-input light" v-model="submission.title" placeholder="Give your post a title"/>
										<div v-if="submission.title" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-red-500':submission.title.length >= 32}">
											{{32 - submission.title.length}}
										</div>
									</div>

									<div v-show="!submission.image.source">
										<input type="text" class="form-input light" v-model="submission.link" placeholder="Add a link to something cool (optional)"/>
									</div>

									<iframe v-if="embed" :src="embed" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"/>

									<Editor @input="getEditorContent" min-height="9rem" :limit="10000"/>
									<!-- Image upload -->
									<div :class="{'opacity-50':link}" class="hidden">
										<div class="rounded-sm w-28 h-28 border border-gray-300 border-dashed flex items-center justify-center cursor-pointer text-sm text-gray-400 bg-gray-50 hover:bg-gray-100" @click="chooseImage">
											<i class="far fa-image text-gray-400 text-lg"></i>
											<input
											class="hidden"
											ref="fileInput"
											type="file"
											accept="image/*"
											@input="onSelectFile"
											>
										</div>
									</div>
									<!-- Image preview -->
									<div v-if="submission.image.source" class="relative group w-28 h-28 rounded-sm">
										<button class="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-2xs font-bold text-white transform scale-0 group-hover:scale-100 transition duration-200 delay-100 shadow-xs" @click="removeImage" tabindex="0">
											<i class="fas fa-times fa-sm"></i>
										</button>
										<img :src="submission.image.source" class="w-full h-full object-cover rounded-sm">
									</div>
								</div>
								<div class="flex items-center space-x-1 p-2.5 border-t">
									<button :disabled="submission.link" class="flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="chooseImage" content="Upload an image" v-tippy="{ placement : 'top' }">
										<i class="far fa-image fa-fw text-lg"></i>
									</button>
									<button class="flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="poll = !poll" content="Add a poll" v-tippy="{ placement : 'top' }">
										<i class="far fa-poll-h fa-fw text-lg"></i>
									</button>
									<button class="flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="poll = !poll" content="Add music" v-tippy="{ placement : 'top' }">
										<i class="far fa-waveform fa-fw text-lg"></i>
									</button>
								</div>
								<div class="flex justify-between p-2.5 border-t">
									<button type="button" class="button purple500" @click="createPost()">
										Post
									</button>
									<button type="button" class="button gray100">
										Discard
									</button>
								</div>
							</div>
						</div>
					</div>
					<!-- End Main Content Section -->

					<!-- Right Bar -->
					<div class="hidden lg:block flex-shrink-0 w-80">
						<div class="space-y-4">
							<div class="flex flex-col">
								<div class="bg-white rounded-sm">
									<div class="p-4">
										<div class="text-lg font-medium">
											Post options
										</div>
										<div class="divide-y">
											<div class="flex flex-col space-y-5 py-4">
												<label class="inline-flex">
													<input type="radio" class="form-radio purple500" name="publishType" value="immediately">
													<div class="ml-3 -mt-0.5">
														<div class="text-sm text-gray-900 font-bold select-none">
															Publish now
														</div>
														<div class="text-xs text-gray-500">
															Publish the post immediately
														</div>
													</div>
												</label>
												<label class="inline-flex">
													<input type="radio" class="form-radio purple500" name="publishType" value="immediately">
													<div class="ml-3 -mt-0.5">
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
											<div class="flex flex-col space-y-2 pt-4">
												<label class="flex items-center">
													<input type="checkbox" class="form-checkbox green500" name="pin" value="pin"/>
													<span class="pl-2 text-sm text-gray-700 select-none">
														Pin this post
													</span>
												</label>
												<label class="flex items-center">
													<input type="checkbox" class="form-checkbox red500" name="pin" value="pin"/>
													<span class="pl-2 text-sm text-gray-700 select-none">
														Mark as mature content
													</span>
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- End Right bar -->
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import MediaFormat from '../helpers/media-format.js'
	import Editor from "@/components/editors/Editor_V2.vue";

	const LinkPreview = () => import('@/components/embeds/Link.vue')

	import Toggle from '@/components/Toggle.vue';

	export default {
		components: {
			Editor,
			LinkPreview,
			Toggle
		},
		data() {
			return {
				embed: null,
				poll: false,
				pin: false,
				rating: null,
				yank: false,
				search: '',
				name: '',
				response: {},
				loadingPreview: false,
				showLinkInput: false,
				notifications: true,
				link: false,
				selected: null,
				lodges: [
				{ value: null, text: "#All" },
				{ value: "1", text: "#Memes" },
				{ value: "2", text: "#Misc" },
				],
				ratings: ['All ages','NSFW','NSFL']
				// submission: {
				//   title: null,
				//   link: null,
				//   image: {
				//     file: null,
				//     source: null,
				//     filename: null
				//   },
				//   body: null,
				//   guild: null,
				//   NSFW: false,
				// }
			};
		},
		computed: {
			...mapState("persist", ["v"]),
			submission() {
				return this.$store.state.create.post.submission
			}
		},
		watch: {
			'submission.link': {
				handler() {
					let url = this.submission.link
					if (/^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/.test(url)) {
						console.log('spotify regex matched!')
						let id = MediaFormat().getSpotifyID(url)
						this.embed = MediaFormat().getSpotifyUrl(id)
					} else {
						this.embed = null
					}
				}
			}
		},
		methods: {
			...mapActions("create", ['submitPost', 'resetSubmission']),
			createPost() {
				this.$store.commit('create/SET_SUBMISSION', {submission: this.submission})
				this.submitPost()
			},
			getEditorContent(value) {
				this.submission.body = value;
			},
			onLinkInput: function(e){
				this.submission.link = e.target.innerHTML
			},
			chooseLink() {
				this.showLinkInput = true
				this.$nextTick(function(){
					this.$refs.linkInput.focus();
				});
			},
			removeLink() {
				this.showLinkInput = false;
				this.submission.link = null
			},
			chooseImage () {
				this.$refs.fileInput.value = null;
				this.$refs.fileInput.click()
			},
			removeImage() {
				if (this.submission.image) {
					this.submission.image = {};
				}
			},
			onSelectFile () {
				const input = this.$refs.fileInput
				let files = input.files
				if (files.length === 1) {
					let file = files[0]
					if (file.type.indexOf('image/') >= 0) {
						let reader = new FileReader
						reader.onload = e => {
							this.submission.image.source = e.target.result
						}
						this.submission.image.file = file
						this.submission.image.name = file.name
						reader.readAsDataURL(file)
						this.$emit('input', file)
					}
				}
				this.showLinkInput = false
			}
		},
		beforeUnmount() {
			this.resetSubmission()
		}
	};
</script>

<style scoped>
.bell:hover *, .bell:focus *{
	animation: bellshake .5s cubic-bezier(.36,.07,.19,.97) both;
	backface-visibility: hidden;
	transform-origin: center top;
}
@keyframes bellshake {
	0% { transform: rotate(0); }
	15% { transform: rotate(5deg); }
	30% { transform: rotate(-5deg); }
	45% { transform: rotate(4deg); }
	60% { transform: rotate(-4deg); }
	75% { transform: rotate(2deg); }
	85% { transform: rotate(-2deg); }
	92% { transform: rotate(1deg); }
	100% { transform: rotate(0); }
}
</style>