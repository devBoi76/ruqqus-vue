<!-- For information on using and configuring TipTap, view their docs -->
<!-- https://tiptap.dev -->

<template>
	<div class="relative bg-white dark:bg-gray-950 border dark:border-gray-700 dark:border-opacity-70 rounded-sm focus:bg-white dark:focus:bg-gray-950 focus:ring-2 focus:border-primary focus:ring-primary" :style="cssProps">

		<!-- Editor -->
		<editor-content v-if="menuBarBottom" :editor="editor" :style="`min-height:${minHeight}`"/>

		<!-- Editor Menu Buttons -->
		<div v-if="editor" class="hidden md:block space-x-1 p-1 text-sm font-bold text-gray-500" :class="menuBarBottom ? 'bg-white' : 'bg-gray-50 border-b border-dashed'">
			<button class="w-7 h-7 hover:text-gray-700 rounded-sm" @click="editor.chain().focus().toggleBold().run()" :class="editor.isActive('bold') ? 'text-gray-900' : 'text-gray-500 hover:bg-gray-200'">
				<i class="far fa-bold"></i>
			</button>
			<button class="w-7 h-7 hover:text-gray-700 rounded-sm" @click="editor.chain().focus().toggleItalic().run()" :class="editor.isActive('italic') ? 'text-gray-900' : 'text-gray-500 hover:bg-gray-200'">
				<i class="far fa-italic"></i>
			</button>
			<button class="w-7 h-7 hover:text-gray-700 rounded-sm rounded-sm" @click="editor.chain().focus().toggleStrike().run()" :class="editor.isActive('strike') ? 'text-gray-900' : 'text-gray-500 hover:bg-gray-200'">
				<i class="far fa-strikethrough"></i>
			</button>
			<button class="w-7 h-7 hover:text-gray-700 rounded-sm" @click="editor.chain().focus().toggleCode().run()" :class="editor.isActive('code') ? 'text-gray-900' : 'text-gray-500 hover:bg-gray-200'">
				<i class="far fa-code"></i>
			</button>
			<button class="w-7 h-7 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-sm" @click="addImage()">
				<i class="far fa-image"></i>
			</button>
			<button class="w-7 h-7 hover:text-gray-700 rounded-sm" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="editor.isActive('heading', { level: 1 }) ? 'text-gray-900' : 'text-gray-500 hover:bg-gray-200'">
				<i class="far fa-h1"></i>
			</button>
			<button class="w-7 h-7 hover:text-gray-700 rounded-sm" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="editor.isActive('heading', { level: 2 }) ? 'text-gray-900' : 'text-gray-500 hover:bg-gray-200'">
				<i class="far fa-h2"></i>
			</button>
			<button class="w-7 h-7 hover:text-gray-700 rounded-sm" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="editor.isActive('heading', { level: 3 }) ? 'text-gray-900' : 'text-gray-500 hover:bg-gray-200'">
				<i class="far fa-h3"></i>
			</button>
			<button class="w-7 h-7 hover:text-gray-700 rounded-sm" @click="editor.chain().focus().toggleBulletList().run()" :class="editor.isActive('bulletList') ? 'text-gray-900' : 'text-gray-500 hover:bg-gray-200'">
				<i class="far fa-list-ul"></i>
			</button>
			<button class="w-7 h-7 hover:text-gray-700 rounded-sm" @click="editor.chain().focus().toggleOrderedList().run()" :class="editor.isActive('OrderedList') ? 'text-gray-900' : 'text-gray-500 hover:bg-gray-200'">
				<i class="far fa-list-ol"></i>
			</button>
			<button class="w-7 h-7 hover:text-gray-700 rounded-sm" @click="editor.chain().focus().toggleBlockquote().run()" :class="editor.isActive('Blockquote') ? 'text-gray-900' : 'text-gray-500 hover:bg-gray-200'">
				<i class="far fa-quote-right"></i>
			</button>
			<button class="w-7 h-7 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-sm" @click="editor.chain().focus().setHorizontalRule().run()">
				<i class="far fa-horizontal-rule"></i>
			</button>
			<button class="w-7 h-7 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-sm" @click="editor.chain().focus().undo().run()">
				<i class="far fa-undo-alt"></i>
			</button>
			<button class="w-7 h-7 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-sm" @click="editor.chain().focus().redo().run()">
				<i class="far fa-redo-alt"></i>
			</button>
		</div>

		<!-- Editor -->
		<editor-content v-if="!menuBarBottom" :editor="editor" :style="`min-height:${minHeight}`"/>

		<div v-if="showEmotes" class="p-2.5 border-t">
			<EmoteTabs class="shadow-sm"/>
		</div>

		<div class="flex items-center justify-between px-2 py-1.5 bg-gray-50 dark:bg-gray-950 border-t dark:border-gray-700 dark:border-opacity-70 border-dashed">
			<div class="flex items-center space-x-2">
				<!-- GIF Picker -->
				<button class="ml-1 font-bold text-xs text-gray-600 hover:text-primary" @click="toggleModal()">
					GIF
				</button>
				<!-- Emote Picker Trigger -->
				<button class="flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="showEmotes = !showEmotes">
					<span class="sr-only">Emote Picker</span>
					<i class="far fa-grin fa-fw"></i>
				</button>
			</div>
			<!-- Character Count -->
			<div class="text-xs text-gray-400">
				{{ limit - editor.getCharacterCount() }}
			</div>
		</div>

		<!-- <GIFPicker v-on:select-gif="addGif" :show-modal="show" :key="count"/> -->

	</div>
</template>

<script>
	import { mapState } from "vuex"
	import tippy from 'tippy.js'
	import { Editor, EditorContent, VueRenderer } from '@tiptap/vue-3'
	import StarterKit from '@tiptap/starter-kit'
	import Mention from '@tiptap/extension-mention'
	import MentionList from '@/components/MentionList.vue'
	import CharacterCount from '@tiptap/extension-character-count'
	import Placeholder from '@tiptap/extension-placeholder'
	import Dropcursor from '@tiptap/extension-dropcursor'
	import Image from '@tiptap/extension-image'

	const EmoteTabs = defineAsyncComponent(() => import('@/components/popovers/EmoteTabs.vue'));

	export default {
		components: {
			EditorContent,
			EmoteTabs
		},
		props: {
			value: {
				type: String,
				default: ''
			},
			limit: {
				type: Number,
				default: 100
			},
			minHeight: {
				type: String,
				default: '7rem'
			},
			menuBarBottom: Boolean
		},
		data() {
			return {
				showEmotes: false,
				count: 0,
				loadModal: false,
				show: false,
				editor: null
			}
		},
		computed: {
			...mapState("comments", ["mentions"]),
			cssProps() {
				return {
					'--editor-min-height': this.minHeight,
				}
			}
		},
		methods: {
			addImage() {
				const url = window.prompt('Enter an image URL')

				if (url) {
					this.editor.chain().focus().setImage({ src: url }).run()
				}
			},
			addGif(e) {
				console.log(e)
				if (e) {
					this.editor.chain().focus().setImage({ src: e }).run()
				}
			},
			toggleModal() {
				this.loadModal = true;
				this.show = !this.show;
				this.count = this.count + 1;
			}
		},
		mounted() {
			this.editor = new Editor({
				extensions: [
				Image,
				Dropcursor,
				Placeholder.configure({
					emptyEditorClass: "is-editor-empty",
					emptyNodeClass: "is-empty",
					emptyNodeText: "Write something, anything...",
					showOnlyWhenEditable: true,
					showOnlyCurrent: true
				}),
				CharacterCount.configure({
					limit: this.limit,
				}),
				StarterKit.configure({
					heading: {
						levels: [1, 2, 3],
					},
				}),
				Mention.configure({
					HTMLAttributes: {
						class: 'mention',
					},
					suggestion: {
						items: query => {
							let people = [...this.mentions];
							return people.filter(item => item.username.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10)
						},
						render: () => {
							let component
							let popup

							return {
								onStart: props => {
									component = new VueRenderer(MentionList, {
										parent: this,
										propsData: props,
									})

									popup = tippy('body', {
										getReferenceClientRect: props.clientRect,
										appendTo: () => document.body,
										content: component.element,
										showOnCreate: true,
										interactive: true,
										trigger: 'manual',
										placement: 'bottom-start',
									})
								},
								onUpdate(props) {
									component.updateProps(props)

									popup[0].setProps({
										getReferenceClientRect: props.clientRect,
									})
								},
								onKeyDown(props) {
									return component.ref?.onKeyDown(props)
								},
								onExit() {
									popup[0].destroy()
									component.destroy()
								},
							}
						},
					},
				}),
				],
				content: this.value,
				onUpdate: ({ getHTML }) => {
					this.$emit('input', getHTML())
				}
			})
		},
		beforeUnmount() {
			this.editor.destroy()
		}
	}
</script>

<style scoped>

::v-deep .ProseMirror {
	min-height: var(--editor-min-height);
	@apply bg-gray-50 focus:bg-white dark:bg-gray-950 dark:focus:bg-gray-950 text-lg sm:text-base p-3
}

::v-deep .ProseMirror>*+* {
	margin-top: 0.75em;
}

::v-deep .mention {
	@apply inline-flex text-primary leading-4 bg-primary bg-opacity-10 rounded-sm px-1 py-0.5
}

/* Placeholder (only at the top) */
::v-deep .ProseMirror p.is-editor-empty:first-child::before {
	content: attr(data-placeholder);
	float: left;
	color: #ced4da;
	pointer-events: none;
	height: 0;
}

/* Placeholder (on every new line) */
::v-deep .ProseMirror p.is-empty::before {
	content: attr(data-placeholder);
	float: left;
	color: #ced4da;
	pointer-events: none;
	height: 0;
}

::v-deep .ProseMirror img {
	max-width: 100%;
	height: auto;
};

::v-deep .ProseMirror img.ProseMirror-selectednode {
	outline: 3px solid #7DD3FC;
}

</style>