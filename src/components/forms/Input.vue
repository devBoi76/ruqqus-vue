<template>
	<form @submit.prevent="save">
		<!-- Form Slot -->
		<slot name="form"/>
		<div class="flex items-center justify-end mt-5">
			<!-- Submit Button -->
			<button class="button" type="submit" :disabled="disabled" :class="[{ 'cursor-not-allowed':disabled }, saveColor]">
				<i v-show="success && !changed" class="fas fa-check fa-sm fa-fw pr-2"></i>
				{{ saveText }}
			</button>
		</div>
	</form>
</template>

<script>
	import axios from 'axios'
	import { mapActions } from "vuex"
	export default {
		props: {
			showSuccessToast: Boolean,
			showErrorToast: Boolean,
			model: {
				type: Object,
				default: null
			},
			postUrl: {
				type: String,
				default: ""
			},
			toastSuccess: {
				type: Object,
				default () {
					return {
						header: "Changes saved!",
						message: "Your changes have been saved."
					}
				}
			},
			toastError: {
				type: Object,
				default () {
					return {
						header: "Failed to save changes.",
						message: "Please try again."
					}
				}
			}
		},
		data() {
			return {
				success: false,
				errored: false,
				changed: false,
				initialModel: {}
			};
		},
		computed: {
			saveColor() { // if success and data has not changed, set button to green
				if (this.success && !this.changed) {
					return "green500"
				} else if (this.errored && !this.changed) {
					return "red500"
				} else {
					return "purple500"
				}
			},
			saveText() {
				if (this.success && !this.changed) { // if success and data has not changed, set text to "saved"
					return "Saved"
				} else if (this.errored && !this.changed) {
					return "Failed to save changes. Try again."
				} else {
					return "Save"
				}
			},
			disabled() {
				return !this.success && !this.changed && !this.errored // disabled state if met with these conditions
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
			save() {
				if (this.changed) { // if data changes, allow saving
					const formData = new FormData();
					Object.entries(this.model).forEach(([key, value]) => { // for each key/val pair in object, add a new form entry
						formData.append(key, value);
					});
					formData.append('formkey', this.$store.state.persist.v.formkey); // append auth'd user form key
					axios({
						method: 'post',
						url: this.postUrl,
						data: formData,
						headers: {'Content-Type': 'multipart/form-data'}
					}).then(response => {
						this.initialModel = Object.assign({}, this.model); // on success, update old data with new data
						this.success = true;
						if (this.showSuccessToast) { // show success toast
							this.addNotification({
								type: 'success',
								header: this.toastSuccess.header,
								message: this.toastSuccess.message
							}) 
						} else {
							console.log("Success saving changes")
						}
						return response
					}).catch(error => {
						this.errored = true;
						if (this.showErrorToast) { // show error toast
							this.addNotification({
								type: 'error',
								header: this.toastError.header,
								message: this.toastError.message
							}) 
						} else {
							console.log("Error saving changes")
						}
						return error
					})
					this.changed = false;
				}
			}
		},
		created() {
			this.initialModel = Object.assign({}, this.model); // set initial data when component is created
		}
	};
</script>