import { createRouter, createWebHistory } from 'vue-router'

//import { qs } from 'qs';

// Components

// Thread

const ThreadView = () => import('../views/ItemView.vue')

// Guild
const GuildView = () => import('../views/guild/GuildViewV3.vue')
const GuildPostsView = () => import('../views/guild/sections/PostsV3.vue')
const GuildThreadView = () => import('../views/guild/sections/Thread.vue')

const GuildAboutView = () => import('../views/guild/sections/AboutV2_2.vue')
const GuildMembersView = () => import ('../views/guild/sections/AboutV2_2.vue')

const GuildAuditLogView = () => import ('../views/guild/sections/LogsV2.vue')
const GuildSavedView = () => import ('../views/guild/sections/Saved.vue')

// Guild Moderation and Settings
const ModerationView = () => import ('../views/moderation/ModeratorView.vue')
const ModerationOverviewView = () => import ('../views/moderation/sections/other/Overview.vue')
const ModerationQueueView = () => import ('../views/moderation/sections/queue/Queue.vue')
const ModerationBasicInfoView = () => import ('../views/moderation/sections/appearance/BasicInfo.vue')
const ModerationThemingView = () => import ('../views/moderation/sections/appearance/Theming.vue')
const ModerationUserManagementView = () => import ('../views/moderation/sections/members/Members.vue')
const ModerationAccessView = () => import ('../views/moderation/sections/other/Access.vue')
const ModerationRulesView = () => import ('../views/moderation/sections/other/Rules.vue')
const ModerationTitlesView = () => import ('../views/moderation/sections/other/Titles.vue')
const ModerationLodgesView = () => import ('../views/moderation/sections/other/Lodges.vue')

// Profile
const ProfileView = () => import ('../views/profile/ProfileView_V4.vue')
const UserOverviewView = () => import ('../views/profile/sections/Overview.vue')
const UserPostsView = () => import ('../views/profile/sections/Posts.vue')
const UserCommentsView = () => import ('../views/profile/sections/Comments.vue')

// User
const UserView = () => import ('../views/user/UserView.vue')

//const UserFriendsView = () => import ('../views/user/Friends.vue')
const UserFollowingView = () => import ('../views/user/Following.vue')
const UserInboxView = () => import ('../views/user/Inbox.vue')
//const UserMessagesView = () => import (/* webpackChunkName: "group-user" */ '../views/user/messages/Messages.vue')
//const UserChatView = () => import (/* webpackChunkName: "group-user" */ '../views/user/messages/Chat.vue')
const UserSavedView = () => import ('../views/user/Saved.vue')
const UserGuildsView = () => import ('../views/user/Guilds.vue')

// User Settings
const UserSettingsView = () => import ('../views/user/settings/UserSettings_V2.vue')
const UserProfileSettings = () => import ('../views/user/settings/sections/appearance/BasicInfo.vue')
const UserNotificationsSettings = () => import ('../views/user/settings/sections/notifications/Notifications.vue')
const UserSecuritySettings = () => import ('../views/user/settings/sections/security/Security.vue')
const UserAppsSettings = () => import ('../views/user/settings/sections/apps/Apps.vue')
const UserContentSettings = () => import ('../views/user/settings/sections/filters/Filters.vue')

// Search and Discover
const SearchView = () => import ('../views/SearchView.vue')
const BrowseView = () => import ('../views/BrowseView_V2.vue')

// Submit
const SubmitView = () => import ('../views/SubmitView.vue')

// Misc
const FeedView = () => import ('../views/FeedView.vue')

const RegisterView = () => import ('../views/LoginView.vue')
const LoginView = () => import ('../views/LoginView_V2.vue')

// Create Guild
const CreateGuildView = () => import ('../views/create/guild/CreateGuild.vue')
const CreateGuildFirstStep = () => import ('../views/create/guild/FirstStep.vue')
const CreateGuildSecondStep = () => import ('../views/create/guild/SecondStep.vue')
const CreateGuildThirdStep = () => import ('../views/create/guild/ThirdStep.vue')
const CreateGuildFourthStep = () => import ('../views/create/guild/FourthStep.vue')
//const CreateGuildFifthStep = () => import ('../views/create/guild/FifthStep.vue')

// Onboarding Admin
const SetupView = () => import ('../views/onboarding/admin/Setup.vue')
const SetupFirstStep = () => import ('../views/onboarding/admin/FirstStep.vue')
const SetupSecondStep = () => import ('../views/onboarding/admin/SecondStep.vue')

// Onboarding Users
const OnboardingView = () => import ('../views/onboarding/user/OnboardUser_V2.vue')
const OnboardingFirstStep = () => import ('../views/onboarding/user/FirstStep_V2.vue')
const OnboardingSecondStep = () => import ('../views/onboarding/user/SecondStep.vue')
const OnboardingThirdStep = () => import ('../views/onboarding/user/ThirdStep.vue')
const OnboardingFourthStep = () => import ('../views/onboarding/user/FourthStep.vue')

// Admin
const AdminView = () => import ('../views/admin/AdminView.vue')
const AdminOverviewView = () => import ('../views/admin/sections/other/Overview.vue')
const AdminQueueView = () => import ('../views/admin/sections/queue/Queue.vue')
const AdminBasicInfoView = () => import ('../views/admin/sections/appearance/BasicInfo.vue')
const AdminThemingView = () => import ('../views/admin/sections/appearance/Theming.vue')
const AdminUserManagementView = () => import ('../views/admin/sections/members/Members.vue')
const AdminAccessView = () => import ('../views/admin/sections/other/Access.vue')
const AdminRulesView = () => import ('../views/admin/sections/other/Rules.vue')
const AdminTitlesView = () => import ('../views/admin/sections/other/Titles.vue')

import { store } from "@/store";

const routes = [

	// Home View
	{ path: '/', name: 'HomeView', component: FeedView, props: true, meta: {title: 'home', sidebar: false, requiresAuth: true} },
	// Starred View
	{ path: '/stargazed', name: 'StargazedView', component: FeedView, props: true, meta: {title: 'stargazed', sidebar: false, requiresAuth: true} },
	{ path: '/trending', name: 'TrendingView', component: FeedView, props: true, meta: {title: 'trending', sidebar: false, requiresAuth: true} },
	{ path: '/all', name: 'AllView', component: FeedView, props: true, meta: {title: 'all', sidebar: false, requiresAuth: true} },

	// Thread View
	{ path: '/post/:id/:title?/:commentId?', name: 'item-view', component: ThreadView, props: true, meta: {sidebar: false, requiresAuth: false} },

	// Guild View
	{
		path: '/+:name', component: GuildView, props: true, meta: {sidebar: false, requiresAuth: true},
		children: [
		{ path: '', name: 'guild-posts-view', component: GuildPostsView, props: true, meta: {sidebar: false, requiresAuth: true} },
		{ path: '/+:name/post/:id/:title?/:commentId?', name: 'guild-item-view', component: GuildThreadView, props: true, meta: {sidebar: false, requiresAuth: true} },
		{ path: '/+:name/about', component: GuildAboutView, name: 'guild-about-view', props: true, meta: {sidebar: false, requiresAuth: true} },
		{ path: '/+:name/members', component: GuildMembersView, name: 'guild-members-view', props: true, meta: {sidebar: false, requiresAuth: true} },
		{ path: '/+:name/logs', component: GuildAuditLogView, name: 'guild-logs-view', props: true, meta: {sidebar: false, requiresAuth: true} },
		{ path: '/+:name/saved', alias: '/+:name/ruqqsack', component: GuildSavedView, name: 'guild-saved-view', props: true, meta: {sidebar: false, requiresAuth: true} }
		]
	},

		// // Dashboard view
		// {
		//   path: '/settings', component: UserSettingsView, props: true,
		//   children: [
		//   { path: '', component: UserProfileSettings, name: 'user-settings', props: true },
		//   { path: '/settings/profile', component: UserProfileSettings, name: 'user-settings-profile-view', props: true },
		//   { path: '/settings/filters', alias: '/settings/content', component: UserContentSettings, name: 'user-settings-content-view', props: true }
		//   ]
		// },

		// User Personal view
		{
			path: '/dashboard', component: UserView, props: true, meta: {requiresAuth: true},
			children: [
			{ path: '/following', component: UserFollowingView, name: 'user-following-view', props: true, meta: {sidebar: false, requiresAuth: true} },
			{ path: '/notifications', alias: ['/notifications/all','/inbox','/inbox/all'], component: UserInboxView, name: 'user-inbox-view', props: { sort: 'all' }, meta: {sidebar: false, requiresAuth: true} },
			{ path: '/notifications/unread', alias: '/inbox/unread', component: UserInboxView, name: 'user-inbox-unread-view', props: { sort: 'unread' }, meta: {sidebar: false, requiresAuth: true} },
			{ path: '/notifications/replies', alias: '/inbox/replies', component: UserInboxView, name: 'user-inbox-replies-view', props: { sort: 'replies' }, meta: {sidebar: false, requiresAuth: true} },
			{ path: '/notifications/mentions', alias: '/inbox/mentions', component: UserInboxView, name: 'user-inbox-mentions-view', props: { sort: 'mentions' }, meta: {sidebar: false, requiresAuth: true} },
			{ path: '/notifications/posts', alias: '/inbox/posts', component: UserInboxView, name: 'user-inbox-posts-view', props: { sort: 'posts' }, meta: {sidebar: false, requiresAuth: true} },
			{ path: '/notifications/system', alias: '/inbox/system', component: UserInboxView, name: 'user-inbox-system-view', props: { sort: 'system' }, meta: {sidebar: false, requiresAuth: true} },
			// {
			// 	path: '/messages', component: UserMessagesView, props: true, meta: {requiresAuth: true, sidebar: false},
			// 	children: [
			// 	{ path: '/messages/:person?', alias:'/', component: UserChatView, name: 'user-chat-view', props: true, meta: {requiresAuth: true} },
			// 	]
			// },
			{ path: '/saved', alias:'/ruqqsack', name: 'user-saved-view', component: UserSavedView, props: true, meta: {sidebar: false, requiresAuth: true} },
			{
				path: '/settings', component: UserSettingsView, props: true, meta: {sidebar: false, requiresAuth: true},
				children: [
				{ path: '', alias:'/settings/profile', component: UserProfileSettings, name: 'user-settings-profile-view', props: true, meta: {sidebar: false, requiresAuth: true} },
				{ path: '/settings/notifications', component: UserNotificationsSettings, name: 'user-settings-notifications-view', props: true, meta: {sidebar: false, requiresAuth: true}},
				{ path: '/settings/security', component: UserSecuritySettings, name: 'user-settings-security-view', props: true, meta: {sidebar: false, requiresAuth: true} },
				{ path: '/settings/apps', component: UserAppsSettings, name: 'user-settings-apps-view', props: true, meta: {sidebar: false, requiresAuth: true} },
				{ path: '/settings/filters', component: UserContentSettings, name: 'user-settings-content-view', props: true, meta: {sidebar: false, requiresAuth: true} }
				]
			},
			{ path: '/guilds/:sort?', name: 'user-guilds-view', component: UserGuildsView, props: true, meta: {sidebar: false, requiresAuth: true} }
			]
		},

		// Moderation view
		{
			path: '/+:name/settings', component: ModerationView, props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false},
			children: [
			{ path: '', component: ModerationOverviewView, name: 'moderation-overview-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/+:name/settings/queue/:filter?', component: ModerationQueueView, name: 'moderation-queue-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/+:name/settings/general', component: ModerationBasicInfoView, name: 'moderation-general-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/+:name/settings/theming', component: ModerationThemingView, name: 'moderation-theming-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/+:name/settings/members/:sort?', component: ModerationUserManagementView, name: 'moderation-user-management-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/+:name/settings/access', component: ModerationAccessView, name: 'moderation-access-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/+:name/settings/rules', component: ModerationRulesView, name: 'moderation-rules-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/+:name/settings/titles', component: ModerationTitlesView, name: 'moderation-titles-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/+:name/settings/lodges', component: ModerationLodgesView, name: 'moderation-lodges-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} }
			]
		},

		{ path: '/browse/:category', name: 'BrowseView', component: BrowseView, props: true, meta: {requiresAuth: true} },
		{ path: '/create/post', alias: '/submit', name: 'SubmitView', component: SubmitView, props: true, meta: {requiresAuth: true, sidebar: false} },
		{ path: '/register', name: 'RegisterView', component: RegisterView, props: true, meta: {sidebar: false, dropImage: false} },
		{ path: '/login', name: 'LoginView', component: LoginView, props: true, meta: {sidebar: false, dropImage: false} },

		// Search View
		{ path: '/search', name: 'SearchView', component: SearchView, props: true, meta: {requiresAuth: true} },

		// Onboarding Admin View
		{
			path: '/setup', component: SetupView, props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false},
			children: [
			{ path: '', alias: ['/setup/intro','/setup/1'], component: SetupFirstStep, name: 'onboard-admin-first-step', props: { currentStep: 1 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/setup/profile', alias: '/setup/2', component: SetupSecondStep, name: 'onboard-admin-second-step', props: { currentStep: 2 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} }
			]
		},

		// Onboarding View
		{
			path: '/welcome', component: OnboardingView, props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false},
			children: [
			{ path: '', alias: ['/welcome/interests','/welcome/1'], component: OnboardingFirstStep, name: 'onboard-user-first-step', props: { currentStep: 1 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/welcome/guilds', alias: '/welcome/2', component: OnboardingSecondStep, name: 'onboard-user-second-step', props: { currentStep: 2 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/welcome/profile', alias: '/welcome/3', component: OnboardingThirdStep, name: 'onboard-user-third-step', props: { currentStep: 3 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/welcome/extra', alias: '/welcome/4', component: OnboardingFourthStep, name: 'onboard-user-fourth-step', props: { currentStep: 4 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} }
			]
		},

		// Create Guild View
		{
			path: '/create/guild', component: CreateGuildView, meta: {requiresAuth: true, sidebar: false},
			children: [
			{ path: '/create/guild/name', alias: '/create/guild/1', component: CreateGuildFirstStep, name: 'create-guild-first-step', props: { currentStep: 1 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/create/guild/about', alias: '/create/guild/2', component: CreateGuildSecondStep, name: 'create-guild-second-step', props: { currentStep: 2 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/create/guild/details', alias: '/create/guild/3', component: CreateGuildThirdStep, name: 'create-guild-third-step', props: { currentStep: 3 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/create/guild/invite', alias: '/create/guild/4', component: CreateGuildFourthStep, name: 'create-guild-fourth-step', props: { currentStep: 4 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			//{ path: '/create/guild/go', alias: '/create/guild/5', component: CreateGuildFifthStep, name: 'create-guild-fifth-step', props: { currentStep: 5 } },
			//{ path: '/welcome/account', component: OnboardingAccountView, name: 'onboarding-account-view', props: true }
			]
		},

		// Admin view
		{
			path: '/admin', component: AdminView, props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false},
			children: [
			{ path: '', component: AdminOverviewView, name: 'admin-overview-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/queue/:filter?', component: AdminQueueView, name: 'admin-queue-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/general', component: AdminBasicInfoView, name: 'admin-general-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/theming', component: AdminThemingView, name: 'admin-theming-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/members/:sort?', component: AdminUserManagementView, name: 'admin-user-management-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/access', component: AdminAccessView, name: 'admin-access-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/rules', component: AdminRulesView, name: 'admin-rules-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/titles', component: AdminTitlesView, name: 'admin-titles-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} }
			]
		},

		// Route level code-splitting this generates a separate chunk (about.[hash].js) for this route which is lazy-loaded when the route is visited.
		{ path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/static/About.vue') },

			// User Profile View
			{
				path: '/:username', alias: '/@:username', component: ProfileView, props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} ,
				children: [
				{ path: '', component: UserOverviewView, name: 'user-profile-overview-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
				{ path: '/:username/posts', component: UserPostsView, name: 'user-profile-posts-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
				{ path: '/:username/comments', component: UserCommentsView, name: 'user-profile-comments-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} }
				]
			}
			]

			const router = createRouter({
				history: createWebHistory(),
				scrollBehavior: () => ({ top: 0 }),
				// parseQuery(query) {
				// 	return qs.parse(query);
				// },
				// stringifyQuery  : query => {
				// 	let result = qs.stringify(query, { format: 'RFC1738' })
				// 	return result ? ('?' + result) : ''
				// },
				routes
			})

			router.beforeEach((to , from, next) => {
				console.log(`Coming from : ${from.path} | going to ${to.path}`)
				console.log(from.fullPath)
				if (to.matched.some(record => record.meta.requiresAuth)) {
					if (!store.state.persist.is_authenticated) {
						console.log(`is_authenticated : ${store.state.persist.is_authenticated} | Redirecting to login`)
						next({
							name: "LoginView"
						})
					}
					else if (!store.state.persist.v){
						console.log(`v doesn't exist | Redirecting to login`)
						next({
							name: "LoginView"
						})
					}
					// else if (store.state.persist.v.admin_level != -1 && store.state.persist.v.admin_level != 6){
					// 	console.log(`only admins allowed | redirecting to login`)
					// 	next({
					// 		name: "LoginView"
					// 	})
					// }
					else{next();}
				}else{next();}
			})

			// Cancel all pending API requests on route change
			router.beforeEach((to, from, next) => {
				store.dispatch('base/CANCEL_PENDING_REQUESTS');
				next();
			})

			// Reset primary color to porpl
			router.beforeEach((to, from, next) => {
				if (to.params.name !== from.params.name) {
					document.documentElement.style.setProperty('--color-primary', `139, 92, 246`)
				}
				next();
			})

// Add router push method to automatically redirect to previously-requested page after successfull auth

export default router
