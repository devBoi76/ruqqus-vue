<template>
  <div :class="{'absolute bottom-0 w-full h-full':showDropzone}">
    <transition
    enter-active-class="transition-all duration-150 ease-out"
    leave-active-class="transition-all duration-300 ease-in"
    enter-class="opacity-0 scale-60"
    enter-to-leave-class="opacity-100 scale-100"
    leave-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-60"
    >
    <div v-if="canDropImage && showDropzone" class="absolute flex items-center justify-center overflow-hidden w-full h-screen z-100 bg-opacity-90" :class="wrapperClass" @drop.prevent="drop($event)" @click.self="wrongFileReset()" @keydown.esc="showDropzone=false; reset()" tabindex="0">
      <div class="rounded-lg sm:w-2/4 md:1/4 lg:w-1/3 bg-white shadow transition duration-200 ease-in transform" :class="{ 'animate-shake':wrongFile }">
        <div class="w-full p-3">
          <div class="border-2 border-dashed py-16 rounded text-center select-none">
            <!-- Wrong file icon -->
            <div v-show="wrongFile" class="flex items-center justify-center w-10 h-10 bg-red-100 rounded mx-auto mb-5">
              <i class="far fa-frown fa-lg text-red-400"></i>
            </div>
            <!-- Correct file icon -->
            <div v-show="!wrongFile" class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded mx-auto mb-5">
              <i class="far fa-long-arrow-down fa-lg text-purple-500 animate-bounce"></i>
            </div>
            <div class="h4">
              {{ wrongFile ? 'Wrong file type. Try again.' : 'Drop to create a post' }}
            </div>
            <p class="text-sm text-gray-500">
              PNG, JPG, and GIF files are allowed
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: 'DropAnImage',
    data(){
      return{
        wrongFile:false
      }
    },
    computed:{
      ...mapGetters("create", ["canDropImage"]),
      showDropzone: {
        get() {
          return this.$store.state.create.post.dropzone
        },
        set (value) {
          this.$store.commit('create/TOGGLE_POST_DROPZONE', {show: value})
        }
      },
      image: {
        get() {
          return this.$store.state.create.post.submission.image
        },
        set (value) {
          this.$store.commit('create/SET_SUBMISSION', {submission: value})
        }
      },
      wrapperClass() {
        return this.wrongFile ? 'bg-red-700' : 'bg-black'
      }
    },
    methods:{
      drop(e){
        let files = e.dataTransfer.files
        this.wrongFile = false
      // allows only 1 file
      if (files.length === 1) {
        let file = files[0]
        // allows image only
        if (file.type.indexOf('image/') >= 0) {
          var reader = new FileReader()
          reader.onload = f => {
            this.image.source = f.target.result // set image source to image content
            this.image.filename = file.name // set file name
            this.showDropzone = false // hide dropzone
            //this.$store.commit('create/TOGGLE_POST_CREATION_MODAL', {show: true}) // show post creation modal
            this.$router.push('/create/post')
          }
          reader.readAsDataURL(file)
        } else {
          this.wrongFile = true
        }
      }
    },
    onRequestUploadFiles(){

    },
    reset(){
      this.wrongFile = false
      this.image = null
    },
    wrongFileReset() {
      if (this.wrongFile === true) {
        this.showDropzone = false;
        this.reset();
      }
    }
  }
}
</script>

<style scoped>
.animate-shake {
  animation: shake 0.5s;
  animation-iteration-count: once;
}
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>