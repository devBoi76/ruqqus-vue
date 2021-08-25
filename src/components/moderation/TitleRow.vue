<template>

	<div class="flex flex-col border-b" :class="{ 'overflow-hidden': details && !reorder && !readonly }">

		<div class="relative flex flex-wrap items-center px-3 py-2" :class="{'bg-gray-50': details && !reorder && !readonly }">

			<div>
				<span class="block px-1 py-0.5 leading-none border border-transparent rounded-sm text-sm font-medium"
				:style="{ backgroundColor: model.titleColor }">
				{{ model.titleText || '&#128563;' }}
			</span>
		</div>

		<div v-if="!readonly" class="flex items-center ml-auto">
			<button class="flex items-center justify-center px-2 w-8 h-8 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" v-show="!reorder" @click="details = true">
				<i class="far fa-edit fa-fw"></i>
			</button>

			<button class="flex items-center justify-center px-2 w-8 h-8 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" v-show="!reorder">
				<i class="far fa-trash-alt fa-fw"></i>
			</button>

			<button class="flex items-center justify-center px-2 w-8 h-8 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" v-show="reorder">
				<i class="far fa-grip-lines fa-fw fa-lg" :class="{ 'handle': reorder }"></i>
			</button>
		</div>

	</div>

	<div v-if="!readonly" v-show="details && !reorder" class="px-3 py-4">

		<form @submit.prevent="save" @reset.prevent="onReset" class="space-y-6">
			<div class="space-y-6 lg:space-y-0 lg:flex">
				<div class="flex-shrink-0 space-y-6 lg:mr-4">

					<t-input-group class="relative" label="Title Text">
						<div class="w-full md:w-3/4">
							<input type="text" class="form-input" :class="{ 'danger':!titleValidation }" v-model="model.titleText" :placeholder="model.titleText" required maxlength="32"/>
						</div>
						<div class="text-xs text-gray-500 mt-1">
							{{ 32 - model.titleText.length }}/32
						</div>
						<div v-show="!titleValidation" class="text-sm text-red-500 mt-1">
							Whoops. Text or emoji is required!
						</div>
					</t-input-group>

					<div>
						<label class="label">Title Background Color</label>
						<div class="space-y-1">
							<v-swatches
							v-model="model.titleColor"
							:swatches="primarySwatches"
							inline
							swatch-size="24"
							:swatch-style="{ marginRight: '10px', marginBottom: '10px', borderRadius: '3px', boxShadow: 'none' }"
							></v-swatches>
							<div class="w-full md:w-3/4">
								<input v-model="model.titleColor" :placeholder="model.titleColor" class="form-input"/>
							</div>
						</div>
					</div>

				</div>

				<div class="flex-shrink-0">
					<t-input-group class="relative select-none" label="Guild Rep Requirement">
						<t-toggle v-model="model.repCheck"/>
						<div class="mt-2" v-show="model.repCheck">
							<input type="number" class="form-input" :class="{ 'danger':!repValidation }" v-model="model.titleReq" :placeholder="model.titleReq" :required="model.repCheck" maxlength="32"/>
							<div v-show="repValidation" class="text-sm text-red-500 mt-1">
								Hold up. Rep requirements must be greater than zero
							</div>
						</div>
					</t-input-group>
				</div>

			</div>

			<div class="flex items-center space-x-2">
				<button type="submit" class="button" :disabled="!titleValidation || !repValidation || disabled" :class="[{ 'cursor-not-allowed':disabled }], saveColor">
					<i v-show="success" class="fas fa-check fa-sm fa-fw pr-2"></i>
					{{ saveText }}
				</button>
				<button type="reset" class="button linkGray500" @click="reset()">
					Cancel
				</button>
			</div>
		</form>

	</div>

</div>

</template>

<script>
// Import components
import axios from 'axios'
import { mapState, mapActions } from "vuex";

import VSwatches from 'vue-swatches'

// Import styles
import 'vue-swatches/dist/vue-swatches.css'

export default {
	props: {
		reorder: {
			type: Boolean,
			default: false
		},
		id: {
			type: String
		}
	},
	components: {
		VSwatches
	},
	data() {
		return {
			success: false,
			errored: false,
			changed: false,
			initialModel: {},
			emptyWarning: false,
			details: false,
			model: {
				repCheck: false,
				titleReq: 100,
				titleText: 'title',
				titleColor: '#FC8181'
			},
			primarySwatches: ['#FC8181', '#F6AD55', '#F6E05E', '#68D391', '#4FD1C5', '#63B3ED', '#7F9CF5', '#B794F4', '#F687B3', '#E2E8F0']
		}
	},
	computed: {
		...mapState("persist", ["darkMode"]),
		titleValidation() {
			return this.model.titleText !== ''
		},
		repValidation() {
			return ((this.model.repCheck == true && this.model.titleReq > 0) || this.model.repCheck == false)
		},
		titleLength() {
			return this.model.titleText.length
		},
		saveColor() {
			if (this.success && !this.changed) {
				return "green500"
			} else if (this.errored && !this.changed) {
				return "red500"
			} else {
				return "purple500"
			}
		},
		saveText() {
			if (this.success && !this.changed) {
				return "Saved"
			} else if (this.errored && !this.changed) {
				return "Failed to save changes. Try again."
			} else {
				return "Save"
			}
		},
		disabled() {
			return !this.changed && !this.errored
		}
	},
	watch: {
		model: {
			deep: true,
			handler() {
				let initData = JSON.stringify(this.initialModel, (k, v) => v === undefined ? "" : v);
				let newData = JSON.stringify(this.model, (k, v) => v === undefined ? "" : v);
				if (initData !== newData) {
					this.changed = true
				} else {
					this.changed = false
				}
				this.errored = false
			}
		}
	},
	methods: {
		...mapActions('toasts', ['addNotification']),
		showDetails() {
			this.details = !this.details
		},
		save() {
			const formData = new FormData();
			Object.entries(this.model).forEach(([key, value]) => {
				formData.append(key, value);
			});
			axios({
				method: 'post',
				url: this.postUrl,
				data: formData,
				headers: {'Content-Type': 'multipart/form-data'}
			}).then(response => {
				this.initialModel = this.model
				this.success = true;
				// this.addNotification({
				// 	type: 'success',
				// 	header: "Changes saved!",
				// 	message: "Your changes have been saved."
				// }) 
				return response
			}).catch(error => {
				this.errored = true;
				// this.addNotification({
				// 	type: 'error',
				// 	header: "Failed to save changes.",
				// 	message: "Please try again."
				// }) 
				return error
			})
			this.changed = false;
		},
		reset() {
			this.model = Object.assign({}, this.initialModel)
			this.success = false;
			this.errored = false;
			this.changed = false;
			this.emptyWarning = false;
			this.details = !this.details;
		}
	},
	created() {
		this.initialModel = Object.assign({}, this.model)
	}
}
</script>

<style scoped>
/deep/ .vue-swatches__container {
	@apply bg-transparent
}
/deep/ .vue-swatches__swatch {
	@apply w-6 h-6 rounded-sm mr-2 mb-2
}
/deep/ .vue-swatches__swatch {
	&.vue-swatches__swatch--border,
	&.vue-swatches__swatch--selected,
	&:focus,
	&:hover {
		@apply shadow-none
	}
}
/deep/ .vue-swatches__diagonal {
	width: 75%;
	height: 75%;
	background: linear-gradient(to top right, transparent, transparent 45%, #DC2626, transparent 55%, transparent);
}
/deep/ .vue-swatches__check__circle {
	@apply w-3 h-3 bg-transparent
}
</style>