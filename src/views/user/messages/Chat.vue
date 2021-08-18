<template>
	<div class="flex flex-col flex-grow bg-white dark:bg-gray-900">
		<!-- Header content section -->
		<div class="flex items-center justify-between flex-shrink-0 h-16 md:px-4 border-b bg-white dark:border-white dark:border-opacity-10 dark:bg-gray-700">
			<div>
				<div class="text-lg font-medium dark:text-gray-100">
					anders
				</div>
				<div class="text-sm text-gray-500">
					<router-link to="/anders" class="text-gray-500">
						@anders
					</router-link>
					<span> | </span>
					conversation started 5 days ago
					<span> | </span>
					<span>{{ $socket.connected ? 'Connected' : 'Disconnected' }}</span>
				</div>
			</div>
			<t-dropdown
			:classes="{
				dropdown: 'origin-top-left right-0 bg-white w-56 py-2'
			}"
			text="Menu">
			<!-- Trigger -->
			<div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler }">
				<button class="w-8 h-8 flex items-center justify-center px-2 py-0 text-gray-500 rounded-sm hover:bg-gray-100 bg-white dark:bg-gray-700" id="logs-channel-menu" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler">
					<i class="fas fa-ellipsis-v"></i>
				</button>
			</div>
			<!-- Menu -->
			<div slot-scope="{ hide }">
				<button class="block w-full px-4 py-2 text-left text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
					<i class="fas fa-long-arrow-left text-center fa-fw mr-2"></i>
					<span>Leave chat</span>
				</button>
				<hr class="my-2">
				<button class="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 hover:text-red-900" role="menuitem" @blur="hide">
					<i class="fas fa-user-slash text-center fa-fw mr-2"></i>
					<span>Block user</span>
				</button>
			</div>
		</t-dropdown>
	</div>
	<!-- Main content section -->
	<vue-scroll>
		<div class="pt-4 pb-3">
			<div class="mb-6 px-5">
				<div class="h3">Welcome to #ruqqus chat</div>
				<!-- Participant avatars -->
				<div class="flex items-center border-b pb-2">
					<div class="flex items-center -space-x-2">
						<img
						v-for="participant in participants"
						:key="participant.id"
						:src="participant.profile_url"
						class="w-7 h-7 rounded border-2 border-white"
						/>
					</div>
					<span class="pl-2 text-xs text-gray-500">
						{{ participants.length }} participating
					</span>
				</div>
			</div>
			<MessageList :messages="messages"/>
		</div>
	</vue-scroll>
	<div class="md:px-5">
		<div class="-mt-1 pb-5">
			<div class="relative">
				<div v-if="selected.username" class="flex items-center w-full h-8 rounded-tl-sm rounded-tr-sm bg-gray-50 px-3 border border-b-0 text-xs leading-none">
					<span class="text-gray-500 pr-1">Replying to</span>
					<span class="font-bold text-purple-500">{{ selected.username }}</span>
					<button class="ml-auto -mr-2 flex items-center justify-center rounded-full w-6 h-6 text-gray-400 hover:text-gray-500" @click="pushMessage({message: null})">
						<i class="fas fa-times-circle fa-fw text-lg"></i>
					</button>
				</div>
				<Editor menuBarBottom :class="{ 'rounded-tl-none rounded-tr-none':selected.username }"/>
			</div>
		</div>
	</div>
</div>
</template>

<script>
// Import components
import { mapState, mapActions } from "vuex";

import MessageList from "@/components/messages/MessageList.vue";
import Editor from "@/components/editors/Editor_V2.vue";

export default {
	name: "PersonalConversationView",
	data() {
		return {
			replying: false,
			messages: [
			{
				id: 1,
				username: 'captainmeta4',
				profile_url: 'https://i.ruqqus.com/uid/7/profile-12.png',
				text: '<p>Oh boy I love jinja!</p>'
			},
			{
				id: 2,
				username: 'kek',
				profile_url: 'https://i.ruqqus.com/users/kek/profile-1.png',
				text: '<p>Take the <strong>vue</strong> pill...</p>'
			},
			{
				id: 3,
				username: 'captainmeta4',
				profile_url: 'https://i.ruqqus.com/uid/7/profile-12.png',
				text: '<p>No kek, take the jinja pill</p>'
			},
			{
				id: 4,
				username: 'kek',
				profile_url: 'https://i.ruqqus.com/users/kek/profile-1.png',
				text: '<p>Talk to me over GIF, oh wait the UI does not have that lol</p><img src="https://i.ibb.co/gdrWv8X/mj.gif"/>'
			},
			{
				id: 5,
				username: 'captainmeta4',
				profile_url: 'https://i.ruqqus.com/uid/7/profile-12.png',
				text: '<p>-_-</p>'
			}
			],
			participants: [
			{
				id: 1,
				username: 'kek',
				profile_url: 'https://i.ruqqus.com/users/kek/profile-1.png'
			},
			{
				id: 2,
				username: 'captainmeta4',
				profile_url: 'https://i.ruqqus.com/uid/7/profile-12.png'
			}
			]
		};
	},
	components: {
		MessageList,
		Editor
	},
	// sockets: {
	// 	connect() {
	// 		console.log('socket connected')
	// 	}
	// },
	computed: {
		...mapState('chat', ['selected'])
	},
	methods: {
		...mapActions('chat', ['pushMessage']),
		joinRoom() {
			// this.$socket.client is `socket.io-client` instance, and we emit guild name through route param data
			this.$socket.client.emit('join room', {'guild':'startups'});
		}
	},
	mounted() {
		// this.$socket.$subscribe('join room', payload => {
		// 	console.log("This event was fired by eg. sio.emit('join room')", payload)
		// });
		// this.$socket.$subscribe('message', payload => {
		// 	console.log("This event was fired by eg. sio.emit('message')", payload)
		// });
		// // subscribe
		// this.$socket.client.on('join room', payload => {
		// 	console.log("This event was fired by eg. sio.emit('join room')", payload)
		// });
		// // subscribe
		// this.$socket.client.on('message', payload => {
		// 	console.log("This event was fired by eg. sio.emit('message')", payload)
		// });
	},
	created() {
		// this.joinRoom()
	}
};
</script>
