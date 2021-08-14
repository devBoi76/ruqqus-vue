const namespaced = true

const state = {
	notifications: [
	{
		id: 1,
		type: 1,
		author: {
			id: '1h4',
			username: 'Nath_SoM',
			profile_url: 'https://i.ruqqus.com/users/Nath_SoM/profile-1.png'
		},
		title: "Daily Niko #178",
		url: 'https://i.ruqqus.com/post/bqq8/DPoEK67iN_4',
		thumb_url: 'https://i.ruqqus.com/posts/bqq8/thumb.png',
		created_utc: 1622826415
	},
	{
		id: 2,
		type: 3,
		author: {
			id: 'bt0',
			username: 'trickleyum',
			profile_url: 'https://i.ruqqus.com/uid/bt0/profile-2.png'
		},
		title: "Aw man, I'm sorry to hear that. The bot grabs the full title and posts it just like it says in the post and the automaton title should be plainly displayed for everyone. I also named the bot to the most obvious bot name I could so no one would be tricked T_T. Maybe I should just append 'Botpost: ' to the title or something by default? Unfortunately its not possible to change a post title after it has been posted. Maybe @captainmeta4 or @kek can remove the coin and reimburse you?",
		created_utc: 1622826415
	},
	{
		id: 3,
		type: 2,
		author: {
			id: '3eb',
			username: 'CrystalVulpine',
			profile_url: 'https://i.ruqqus.com/users/CrystalVulpine/profile-7.png'
		},
		title: "It's obviously staged. It's mocking Dream's speedruns. But that dungeon actually was there. I just removed the mob spawner and added completely insane loot to the chest.",
		created_utc: 1622826415
	}
	]
}

const getters = {
	notificationsCount(state) {
		return state.notifications.length
	}
}

export default {
	namespaced,
	state,
	getters
}
