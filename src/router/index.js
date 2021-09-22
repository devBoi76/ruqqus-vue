import { createRouter, createWebHistory } from 'vue-router'

//import { qs } from 'qs';

// Components

// Thread
const ThreadView = () => import('../views/ItemView.vue')

// Profile
const ProfileView = () => import ('../views/profile/ProfileView_V4.vue')
const UserOverviewView = () => import ('../views/profile/sections/Overview.vue')
const UserPostsView = () => import ('../views/profile/sections/Posts.vue')
const UserCommentsView = () => import ('../views/profile/sections/Comments.vue')

// User
const UserView = () => import ('../views/user/UserView.vue')
const UserFollowingView = () => import ('../views/user/Following.vue')
const UserInboxView = () => import ('../views/user/Inbox.vue')
const UserSavedView = () => import ('../views/user/Saved.vue')

// User Settings
const UserSettingsView = () => import ('../views/user/settings/Settings.vue')
const UserProfileSettings = () => import ('../views/user/settings/sections/appearance/BasicInfo.vue')
const UserNotificationsSettings = () => import ('../views/user/settings/sections/notifications/Notifications.vue')
const UserSecuritySettings = () => import ('../views/user/settings/sections/security/Security.vue')
const UserAppsSettings = () => import ('../views/user/settings/sections/apps/Apps.vue')
const UserContentSettings = () => import ('../views/user/settings/sections/filters/Filters.vue')

// Search and Discover
const SearchView = () => import ('../views/SearchView_V2.vue')

// Submit
const SubmitView = () => import ('../views/SubmitView.vue')

// Misc
const FeedView = () => import ('../views/FeedView.vue')

const RegisterView = () => import ('../views/RegisterView.vue')
const LoginView = () => import ('../views/LoginView.vue')

// Onboarding Admin
const SetupView = () => import ('../views/onboarding/admin/Setup.vue')
const SetupFirstStep = () => import ('../views/onboarding/admin/FirstStep.vue')
const SetupSecondStep = () => import ('../views/onboarding/admin/SecondStep.vue')

// // Onboarding User
// const OnboardingView = () => import ('../views/onboarding/user/OnboardUser_V2.vue')
// const OnboardingFirstStep = () => import ('../views/onboarding/user/FirstStep_V2.vue')
// const OnboardingSecondStep = () => import ('../views/onboarding/user/SecondStep.vue')
// const OnboardingThirdStep = () => import ('../views/onboarding/user/ThirdStep.vue')
// const OnboardingFourthStep = () => import ('../views/onboarding/user/FourthStep.vue')

// Admin
const AdminView = () => import ('../views/admin/AdminView.vue')
const AdminModerationView = () => import ('../views/admin/sections/settings/Moderation.vue')
const AdminQueueView = () => import ('../views/admin/sections/manage/Queue.vue')
const AdminGeneralView = () => import ('../views/admin/sections/settings/General.vue')
const AdminDesignView = () => import ('../views/admin/sections/settings/Design.vue')
const AdminUserManagementView = () => import ('../views/admin/sections/manage/Members.vue')
const AdminSecurityView = () => import ('../views/admin/sections/settings/Security.vue')
const AdminRulesView = () => import ('../views/admin/sections/manage/Rules.vue')
const AdminTitlesView = () => import ('../views/admin/sections/manage/Titles.vue')
const AdminEmojisView = () => import ('../views/admin/sections/manage/Emojis.vue')
// Integrations
const AdminIntegrationsView = () => import ('../views/admin/sections/settings/integrations/Integrations.vue')
const AdminIntegrationsListView = () => import ('../views/admin/sections/settings/integrations/IntegrationsList.vue')
const AdminIntegrationStripeView = () => import ('../views/admin/sections/settings/integrations/configs/Stripe.vue')
const AdminIntegrationKoFiView = () => import ('../views/admin/sections/settings/integrations/configs/Ko-Fi.vue')
const AdminIntegrationMailgunView = () => import ('../views/admin/sections/settings/integrations/configs/Mailgun.vue')
const AdminIntegrationPayPalView = () => import ('../views/admin/sections/settings/integrations/configs/PayPal.vue')
const AdminIntegrationGumroadView = () => import ('../views/admin/sections/settings/integrations/configs/Gumroad.vue')
const AdminIntegrationDiscordView = () => import ('../views/admin/sections/settings/integrations/configs/Discord.vue')
const AdminIntegrationUnsplashView = () => import ('../views/admin/sections/settings/integrations/configs/Unsplash.vue')

// Errors
const ErrorView = () => import ('../views/error/ErrorView.vue')

import { store } from "@/store";

const routes = [

	// Feed View
	{ path: '/', name: 'HotView', component: FeedView, props: true, meta: {title: 'front', sidebar: false, requiresAuth: true} },
	{ path: '/featured', name: 'FeaturedView', component: FeedView, props: true, meta: {title: 'featured', sidebar: false, requiresAuth: true} },
	{ path: '/trending', name: 'TrendingView', component: FeedView, props: true, meta: {title: 'trending', sidebar: false, requiresAuth: true} },
	{ path: '/all', name: 'AllView', component: FeedView, props: true, meta: {title: 'all', sidebar: false, requiresAuth: true} },

	// Thread View
	{ path: '/post/:id/:title?/:commentId?', name: 'item-view', component: ThreadView, props: true, meta: {sidebar: false, requiresAuth: false} },

	{ path: '/settings', component: UserSettingsView, meta: {sidebar: false, requiresAuth: true} },

	{ path: '/notifications', alias: ['/notifications/all','/inbox','/inbox/all'], component: UserInboxView, name: 'user-inbox-view', props: { sort: 'all' }, meta: {sidebar: false, requiresAuth: true} },
	{ path: '/notifications/unread', alias: '/inbox/unread', component: UserInboxView, name: 'user-inbox-unread-view', props: { sort: 'unread' }, meta: {sidebar: false, requiresAuth: true} },
	{ path: '/notifications/replies', alias: '/inbox/replies', component: UserInboxView, name: 'user-inbox-replies-view', props: { sort: 'replies' }, meta: {sidebar: false, requiresAuth: true} },
	{ path: '/notifications/mentions', alias: '/inbox/mentions', component: UserInboxView, name: 'user-inbox-mentions-view', props: { sort: 'mentions' }, meta: {sidebar: false, requiresAuth: true} },
	{ path: '/notifications/posts', alias: '/inbox/posts', component: UserInboxView, name: 'user-inbox-posts-view', props: { sort: 'posts' }, meta: {sidebar: false, requiresAuth: true} },
	//{ path: '/notifications/system', alias: '/inbox/system', component: UserInboxView, name: 'user-inbox-system-view', props: { sort: 'system' }, meta: {sidebar: false, requiresAuth: true} },

	// { path: '/saved', component: UserSettingsView, meta: {sidebar: false, requiresAuth: true} },
	// { path: '/following', component: UserSettingsView, meta: {sidebar: false, requiresAuth: true} },

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

		// // Onboarding User View
		// {
		// 	path: '/welcome', component: OnboardingView, props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false},
		// 	children: [
		// 	{ path: '', alias: ['/welcome/interests','/welcome/1'], component: OnboardingFirstStep, name: 'onboard-user-first-step', props: { currentStep: 1 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
		// 	{ path: '/welcome/guilds', alias: '/welcome/2', component: OnboardingSecondStep, name: 'onboard-user-second-step', props: { currentStep: 2 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
		// 	{ path: '/welcome/profile', alias: '/welcome/3', component: OnboardingThirdStep, name: 'onboard-user-third-step', props: { currentStep: 3 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
		// 	{ path: '/welcome/extra', alias: '/welcome/4', component: OnboardingFourthStep, name: 'onboard-user-fourth-step', props: { currentStep: 4 }, meta: {requiresAuth: true, sidebar: false, dropImage: false} }
		// 	]
		// },

		// Error View
		{ path: '/:pathMatch(.*)*', name: '404View', component: ErrorView, props: { statusCode: '404', heading: 'Page not found :/' , message: 'The page you were looking for does not exist' } },
		{ path: '/time-out', name: '503View', component: ErrorView, props: { statusCode: '503', heading: 'Service unavailable' , message: 'Our servers are overloaded at the moment. Please try again later.' } },
		{ path: '/too-many', name: '429View', component: ErrorView, props: { statusCode: '429', heading: 'Too many requests' , message: 'Sorry, you have sent us too many requests. Please try again later.' } },
		{ path: '/access-denied', name: '403View', component: ErrorView, props: { statusCode: '403', heading: 'Access denied' , message: 'Sorry, you do not have permission to view this page.' } },

		// Admin view
		{
			path: '/admin', component: AdminView, props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false},
			children: [
			{ path: '', component: AdminGeneralView, name: 'admin-general-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/general', component: AdminGeneralView, name: 'admin-general-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/moderation', component: AdminModerationView, name: 'admin-moderation-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{
				path: '/admin/integrations', component: AdminIntegrationsView, props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false},
				children: [
				{ path: '', component: AdminIntegrationsListView, name: 'admin-integrations-list-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
				{ path: '/admin/integrations/stripe', component: AdminIntegrationStripeView, name: 'admin-integration-stripe-view', meta: {requiresAuth: true, dropImage: false} },
				{ path: '/admin/integrations/ko-fi', component: AdminIntegrationKoFiView, name: 'admin-integration-kofi-view', meta: {requiresAuth: true, dropImage: false} },
				{ path: '/admin/integrations/mailgun', component: AdminIntegrationMailgunView, name: 'admin-integration-mailgun-view', meta: {requiresAuth: true, dropImage: false} },
				{ path: '/admin/integrations/paypal', component: AdminIntegrationPayPalView, name: 'admin-integration-paypal-view', meta: {requiresAuth: true, dropImage: false} },
				{ path: '/admin/integrations/gumroad', component: AdminIntegrationGumroadView, name: 'admin-integration-gumroad-view', meta: {requiresAuth: true, dropImage: false} },
				{ path: '/admin/integrations/discord', component: AdminIntegrationDiscordView, name: 'admin-integration-discord-view', meta: {requiresAuth: true, dropImage: false} },
				{ path: '/admin/integrations/unsplash', component: AdminIntegrationUnsplashView, name: 'admin-integration-unsplash-view', meta: {requiresAuth: true, dropImage: false} }
				]
			},
			{ path: '/admin/queue/:filter?', component: AdminQueueView, name: 'admin-queue-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/design', component: AdminDesignView, name: 'admin-design-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/members/:sort?', component: AdminUserManagementView, name: 'admin-user-management-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/security', component: AdminSecurityView, name: 'admin-security-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/rules', component: AdminRulesView, name: 'admin-rules-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/titles', component: AdminTitlesView, name: 'admin-titles-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			{ path: '/admin/emojis', component: AdminEmojisView, name: 'admin-emojis-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} }
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
			{ path: '/:username/comments', component: UserCommentsView, name: 'user-profile-comments-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} },
			//{ path: '/:username/followers', component: UserFollowersView, name: 'user-followers-view', props: true, meta: {requiresAuth: false, sidebar: false, dropImage: false} },
			//{ path: '/:username/saved', component: UserSavedView, name: 'user-saved-view', props: true, meta: {requiresAuth: true, sidebar: false, dropImage: false} }
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

		// router.beforeEach((to , from, next) => {
		// 	console.log(`Coming from : ${from.path} | going to ${to.path}`)
		// 	console.log(from.fullPath)
		// 	if (to.matched.some(record => record.meta.requiresAuth)) {
		// 		if (!store.state.persist.is_authenticated) {
		// 			console.log(`is_authenticated : ${store.state.persist.is_authenticated} | Redirecting to login`)
		// 			next({
		// 				name: "LoginView"
		// 			})
		// 		}
		// 		else if (!store.state.persist.v){
		// 			console.log(`v doesn't exist | Redirecting to login`)
		// 			next({
		// 				name: "LoginView"
		// 			})
		// 		}
		// 		// else if (store.state.persist.v.admin_level != -1 && store.state.persist.v.admin_level != 6){
		// 		// 	console.log(`only admins allowed | redirecting to login`)
		// 		// 	next({
		// 		// 		name: "LoginView"
		// 		// 	})
		// 		// }
		// 		else{next();}
		// 	}else{next();}
		// })

		// Cancel all pending API requests on route change
		router.beforeEach((to, from, next) => {
			store.dispatch('base/CANCEL_PENDING_REQUESTS');
			next();
		})

// Add router push method to automatically redirect to previously-requested page after successfull auth

export default router
