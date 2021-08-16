<template>
  <t-modal
  v-model="showModal"
  escToClose
  :clickToClose="!submission"
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
    <div class="flex items-center flex-shrink-0 space-x-2">
      <img :src="v.profile_url" class="w-9 h-9 rounded-sm"/>
      <div class="font-bold text-sm">{{ v.username }}</div>
    </div>
    <div class="flex items-center space-x-1">
      <button class="w-8 h-8 flex items-center justify-center px-2 py-0 text-gray-500 rounded-sm hover:bg-gray-100 bg-white dark:bg-gray-700" id="expand-post-creation" aria-label="Post creation expand option" @click="toggleFullScreen()">
        <i class="fas fa-expand-alt"></i>
      </button>
      <PostOptions/>
    </div>
  </template>
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
  <div v-if="submission.image.source" class="bg-white">
    <div class="relative group">
      <button class="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-2xs font-bold text-white transform scale-0 group-hover:scale-100 transition duration-200 delay-100" @click="removeImage" tabindex="0">
        <i class="fas fa-times fa-sm"></i>
      </button>
      <img :src="submission.image.source" class="w-full h-full object-cover">
    </div>
  </div>
  <div class="bg-white px-4 py-6 flex flex-col space-y-6">
    <t-input-group label="Title" class="relative">
      <input v-model="submission.title" class="form-input white" placeholder="Give your post a cool title \o/"/>
      <div v-if="submission.title" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-red-500':submission.title.length >= 32}">
        {{32 - submission.title.length}}
      </div>
    </t-input-group>
    <div>
      <div class="label">Body</div>
      <Editor style="min-height: 100px" @input="getEditorContent" :value="submission.body" :max-length="10000"/>
    </div>
    <div class="relative flex items-center space-x-2">
      <button v-show="!submission.image.source" class="rounded-full px-4 py-1.5 bg-white hover:bg-gray-100 border-2 border-dashed flex items-center justify-center text-xs font-bold text-gray-500 leading-5" @click="chooseLink">
        <i class="fas fa-link opacity-80 pl-1 pr-2"></i>{{ response.domain || 'Link' | truncate(25) }}
      </button>
      <div v-show="!response.url" class="rounded-full px-4 py-1.5 border-2 border-dashed flex items-center justify-center text-sm font-bold text-gray-500 cursor-pointer leading-5" :class="submission.image.source ? 'bg-gray-50' : 'bg-white hover:bg-gray-100'" @click="chooseImage">
        <i class="fas fa-image opacity-80 pl-1 pr-2"></i>{{ submission.image.filename ? 'Change image' : 'Add image'  }}
        <input
        class="hidden"
        ref="fileInput"
        type="file"
        accept="image/*"
        @input="onSelectFile"
        >
      </div>
      <button class="text-red-500 text-xs hover:underline" v-if="submission.image.source" @click="removeImage" tabindex="0">
        Remove image
      </button>
      <button class="text-red-500 text-xs hover:underline" v-if="response.url" @click="removeLink" tabindex="0">
        Remove link
      </button>
    </div>
  </div>
  <template v-slot:footer>
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div class="text-sm font-bold text-gray-500">To:</div>
        <SelectGuild/>
        <t-rich-select
        v-model="currentValue"
        :options="lodges"
        hideSearchBox="true"
        closeOnSelect
        maxHeight="150px"
        />
      </div>
      <div class="flex items-center space-x-1">
        <button type="button" @click="showModal=false" class="button linkGray500">
          Cancel
        </button>
        <button type="button" class="button primary" @click="createPost()">
          Create post
        </button>
      </div>
    </div>
  </template>
</t-modal>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import Editor from "@/components/editors/Editor_V2.vue";
  import PostOptions from "@/components/dropdowns/CreatePostOptions.vue";
  import SelectGuild from "@/components/select/SelectGuild.vue";

  import LinkPreview from "@/components/embeds/Link.vue";

  export default {
    components: {
      Editor,
      PostOptions,
      SelectGuild,
      LinkPreview
    },
    data() {
      return {
        name: "",
        response: {},
        loadingPreview: false,
        showLinkInput: false,
        selected: null,
        lodges: [
        { value: null, text: "#All" },
        { value: "1", text: "#Memes" },
        { value: "2", text: "#Misc" }
        ],
        submission: {}
      };
    },
    computed: {
      ...mapState("persist", ["v"]),
      showModal: {
        get() {
          return this.$store.state.create.post.modal
        },
        set (value) {
          this.$store.commit('create/TOGGLE_POST_CREATION_MODAL', {show: value})
        }
      }
    },
    methods: {
      ...mapActions("create", ["submitPost"]),
      toggleFullScreen() {
        this.$store.commit('create/SET_SUBMISSION', {submission: this.submission})
        this.showModal = false;
        this.$router.push({ path: '/create/post', query: { guild: this.$route.query.name } })
      },
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
        if (this.submission.image.source) {
          this.submission.image.source = null;
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
            this.submission.image.filename = file.name
            reader.readAsDataURL(file)
            this.$emit('input', file)
          }
        }
        this.showLinkInput = false
      }
    },
    mounted() {
      this.submission = Object.assign({}, this.$store.state.create.post.submission);
    }
  };
</script>