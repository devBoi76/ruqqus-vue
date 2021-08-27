<template>
	<div class="hidden md:flex items-center flex-col flex-shrink-0 w-72 dark:bg-gray-750" :class="['bg-'+sidebarColor, {'border-r':border}]">

		<slot name="header" v-if="stickyHeader"/>

		<div class="w-full h-full py-4 overflow-y-auto scrollbar-hidden">

			<slot name="header" v-if="!stickyHeader"/>

			<ul v-for="(section, index) in menu" :key="index" class="-mt-2 mb-8 last:mb-0 list-unstyled border-gray-200 dark:border-white-13" :class="{'pb-2 border-b':section.divider}">
				<li v-if="section.header" class="z-10 sticky -top-4 py-2 dark:bg-gray-750 dark:border-white-13" :class="`bg-${sidebarColor}`">
					<div class="px-6 uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-700">
						{{ section.name }}
					</div>
				</li>
				<li v-for="(item, index) in section.items" :key="index" class="item">
					<div v-if="item.header" class="mt-4 mb-2">
						<div class="text-xs tracking-wider font-medium uppercase text-gray-500 dark:text-gray-400">
							{{ item.name }}
						</div>
					</div>
					<div v-if="!item.header">
						<router-link custom :to="item.route" v-slot="{ href, navigate, isActive }">
							<a :href="href" @click="navigate" class="relative block px-6 py-1.5 text-left transition duration-100" :class="isActive ? 'text-gray-900 font-medium bg-gray-200' : 'text-gray-700 hover:bg-gray-100'">
								<span v-if="!item.icon">
									<img
									:id="item.id"
									v-lazy="item.src"
									class="w-12 h-12 object-fit bg-gray-200 dark:bg-gray-700 rouned-sm"
									:alt="item.alt"
									/>
									<span class="pl-3">+{{ item.name }}</span>
								</span>
								<span v-else>
									<i class="far fa-fw mr-2" :class="[item.icon, isActive ? 'text-gray-900' : 'text-gray-500']"></i>
									<span :class="item.textCase">
										{{ item.name }}
									</span>
								</span>
								<!-- <span v-show="isActive" class="arrow"/> -->
							</a>
						</router-link>
					</div>
				</li>
			</ul>
		</div>

		<slot name="footer"/>
	</div>
</template>

<script>
// import components
export default {
	props: {
		menu: {
			type: Array,
			required: true,
			default: () => [{ textCase: 'lowercase' }]
		},
		sidebarColor: {
			type: String,
			default: 'white'
		},
		stickyHeader: {
			type: Boolean,
			default: false
		},
		border: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style scoped>
.shadow-inset-l-2 {
	box-shadow: inset 2px 0 0 #FFFFFF;
}
.arrow {
	position: absolute;
	top: 11px;
	right: 0px;
	border-top: 8px solid rgba(255, 0, 0, 0);
	border-bottom: 8px solid rgba(255, 0, 0, 0);
	border-right: 8px solid rgba(245,245,245,1);
}
</style>