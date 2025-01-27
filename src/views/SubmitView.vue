<template>
	<div class="w-full overflow-y-auto">
		<div class="grid grid-cols-12 xl:grid-cols-10">
			<div class="col-span-full xl:col-start-3 xl:col-end-9 flex flex-col gap-4 sm:p-6 my-2.5 sm:my-0">
				<h1 class="h3 font-semibold mb-0">
					Create post
				</h1>
				<div class="flex gap-6">
					<!-- Main Content Section -->
					<div class="w-full">
						<div class="flex flex-grow">
							<div class="w-full bg-white dark:bg-gray-800 sm:rounded-sm sm:border">
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
								<div class="p-2.5 space-y-2.5 sm:p-4 sm:space-y-3">
									<div class="flex items-center justify-between">
										<div class="flex items-center">
											<img class="w-9 h-9 md:w-8 md:h-8 object-cover mr-2 rounded-sm bg-gray-100 dark:bg-gray-700" :src="v.avatarUrl"/>
											<div class="font-bold text-sm">
												{{ v.username }}
											</div>
										</div>
										<CreatePostOptions @change-time="setTime" @change-options="setOptions" :time="time" :options="options"/>
									</div>
									<div class="relative">
										<input type="text" class="form-input light" v-model="submission.title" placeholder="Give your post a title"/>
										<div v-if="submission.title" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-red-500':submission.title.length >= 32}">
											{{32 - submission.title.length}}
										</div>
									</div>

									<div v-show="!submission.image.source">
										<input type="text" class="form-input light" v-model="submission.url" placeholder="Add a link to something cool (optional)"/>
									</div>

									<iframe v-if="embed" :src="embed" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"/>

									<!--<Editor @input="getEditorContent()" min-height="10rem" :limit="10000"/>-->
									<Editor v-model="submission.body" min-height="10rem" :limit="10000"/>
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
									<div v-if="submission.image.source" class="relative group w-24 h-24 rounded-sm">
										<button class="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-2xs font-bold text-white transform scale-0 group-hover:scale-100 transition duration-200 delay-100 shadow-xs" @click="removeImage" tabindex="0">
											<i class="fas fa-times fa-sm"></i>
										</button>
										<img :src="submission.image.source" class="w-full h-full object-cover rounded-sm">
									</div>

									<!-- Other post types -->
									<div class="flex items-center space-x-1">
										<button class="button gray100 flex items-center">
											<i class="far fa-image fa-fw text-lg mr-2"></i>
											Photo
										</button>
										<!-- Hidden -->
										<button class="hidden button gray100 flex items-center">
											<i class="far fa-poll-h fa-fw text-lg mr-2"></i>
											Poll
										</button>
										<!-- Hidden -->
										<button class="hidden button gray100 flex items-center">
											<i class="far fa-waveform fa-fw text-lg mr-2"></i>
											Audio
										</button>
									</div>

								</div>
								<div class="flex justify-end p-4 border-t">
									<button type="button" class="button linkGray400">
										Save as Draft
									</button>
									<button type="button" class="button primary" @click="createPost()">
										{{ buttonText }}
									</button>
								</div>
							</div>
						</div>
					</div>
					<!-- End Main Content Section -->
					<!-- Right Bar -->
					<div class="hidden flex-shrink-0 w-80">
						<div class="space-y-4">
							<div class="flex flex-col">
								<div class="bg-white rounded-sm">
									<div class="p-4 divide-y">
										<div class="text-lg font-medium">
											Post options
										</div>
										<div class="flex flex-col space-y-5 mt-4 pt-5">
											<div class="flex flex-col space-y-5">
												<label class="inline-flex">
													<input type="radio" class="form-radio primary" v-model="time" value="immediately" checked>
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
													<input type="radio" class="form-radio primary" v-model="time" value="scheduled">
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
										<div class="flex justify-end mt-5 pt-5">
											<span>
												time: {{ time }}
											</span>
											<button type="button" class="button linkGray400">
												Save as Draft
											</button>
											<button type="button" class="button purple500" @click="createPost()">
												{{ buttonText }}
											</button>
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

	import Editor from "@/components/editors/Editor_V2.vue";
	import CreatePostOptions from "@/components/dropdowns/CreatePostOptions.vue";
	const LinkPreview = () => import('@/components/embeds/Link.vue')
	import Toggle from '@/components/Toggle.vue';

	export default {
		components: {
			CreatePostOptions,
			Editor,
			LinkPreview,
			Toggle
		},
		data() {
			return {
				time: 'immediately',
				options: [],
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
				ratings: ['All ages','NSFW','NSFL'],
				submission: {
				   title: null,
				   url: null,
				   image: {
				     file: null,
				     source: null,
				     filename: null
				   },
				   body: "",
				//   guild: null,
				   NSFW: false
				},
			};
		},
		computed: {
			...mapState("persist", ["v"]),
			/*submission() {
				return this.$store.state.create.post.submission
			}*/
			buttonText() {
				if (this.time === 'immediately') {
					return 'Post'
				} else {
					return 'Schedule Post'
				}
			}
		},
		methods: {
			...mapActions("create", ['submitPost', 'resetSubmission']),
			createPost() {
				this.$store.commit('create/SET_SUBMISSION', {submission: this.submission})
				this.submitPost()
			},
			setTime(time) {
				console.log('setTime method triggered')
				this.time = time;
			},
			setOptions(options) {
				console.log('setOptions method triggered')
				this.options = options
			},
			getEditorContent(value) {
				console.log(`content updated to ${value}`);
				this.submission.body = value;
			},
			onLinkInput: function(e){
				this.submission.url = e.target.innerHTML
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