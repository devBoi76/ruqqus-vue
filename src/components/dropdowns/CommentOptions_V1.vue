<template>
	<t-dropdown text="Menu">
		<!-- Trigger -->
		<div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler }">
			<button class="leading-6 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" id="comment-options-menu" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler">
				<i class="far fa-ellipsis-h fa-sm"></i>
			</button>
		</div>
		<!-- Menu -->
		<div slot-scope="{ hide, blurHandler }">
			<router-link to="#" class="block px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
				<i class="far fa-link text-center fa-fw mr-2"></i><span>Copy Link</span>
			</router-link>
			<div v-if="self">
				<router-link to="#" class="block px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="blurHandler">
					<i class="far fa-edit text-center fa-fw mr-2"></i><span>Edit Comment</span>
				</router-link>
				<router-link to="#" class="block px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-700" role="menuitem" @blur="blurHandler">
					<i class="far fa-trash-alt text-center fa-fw mr-2"></i><span>Delete Comment</span>
				</router-link>
			</div>
			<hr class="my-2">
			<router-link v-if="!self" to="#" class="block px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-700" role="menuitem" @blur="blurHandler">
				<i class="far fa-flag text-center fa-fw mr-2"></i><span>Report</span>
			</router-link>
			<hr class="my-2">
			<div v-if="!self">
				<div class="text-2xs font-bold uppercase tracking-wide text-gray-400 px-4 py-2">Guild Master Tools</div>
				<router-link to="/settings/theming" class="block px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-700" role="menuitem" @blur="hide">
					<i class="far fa-comment-alt-minus text-center fa-fw mr-2"></i><span>Collapse</span>
				</router-link>
				<router-link to="/settings/reports" class="block px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-700" role="menuitem" @blur="hide">
					<i class="far fa-gavel text-center fa-fw mr-2"></i><span>Exile</span>
				</router-link>
			</div>
		</div>
	</t-dropdown>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'CommentOptions',
		props: {
			username: String
		},
		computed:{
			...mapState("persist", ["v"]),
			self() {
				return this.username === this.v.username;
			}
		}
	}
</script>
