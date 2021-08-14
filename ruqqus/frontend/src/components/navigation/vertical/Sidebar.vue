<template>
	<div class="hidden md:flex items-center flex-col flex-shrink-0 w-64 dark:bg-gray-750 dark:border-white-13"
	:class="['bg-'+this.sidebarColor, {'border-r':border}]">

		<slot name="header" v-if="stickyHeader"/>

		<!-- Scrollable section -->
		<vue-scroll :ops="hideBar">

			<slot name="header" v-if="!stickyHeader"/>

			<div class="py-2">
				<draggable
				v-for="(section, index) in menu" :key="index" class="-mt-2 mb-5 last:mb-0 list-unstyled border-gray-200 dark:border-white-13"
				tag="ul"
				v-model="myArray"
				draggable=".item"
				:forceFallback="true"
				delay=300
				@start="drag=true"
				@end="drag=false"
				v-bind="{animation: 200, ghostClass: 'ghost', chosenClass: 'chosen', dragClass: 'drag', disabled: false}"
				:disabled="!section.enableDrag"
				:class="{'pb-2 border-b':section.divider}"
				>
				<template #header>
					<li v-if="section.header" class="z-10 sticky top-0 py-1 dark:bg-gray-750 dark:border-white-13" :class="'bg-'+sidebarColor">
						<div class="px-4 text-xs tracking-wider font-medium uppercase text-gray-500">
							{{ section.name }}
						</div>
					</li>
				</template>
					<transition-group tag="div" type="transition" :name="!drag ? 'flip-list' : null">
						<li v-for="(item, index) in section.items" :key="index" class="item">
							<div v-if="item.header" class="mt-4 mb-2">
								<div class="text-xs tracking-wider font-medium uppercase text-gray-500 dark:text-gray-400">
									{{ item.name }}
								</div>
							</div>
							<div v-if="!item.header">
								<router-link
								:to="item.route"
								v-slot="{ href, navigate, isActive }">
									<a :href="href" @click="navigate" class="relative block px-4 py-2 text-left transition duration-100" :class="isActive ? 'text-gray-900 font-medium bg-gray-100' : 'text-gray-700 hover:bg-gray-100'">
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
											<i class="far fa-fw mr-1" :class="[item.icon,isActive ? 'text-gray-900' : 'text-gray-400']"></i>
											<span :class="item.textCase">
												{{ item.name }}
											</span>
										</span>
										<span v-show="isActive" class="arrow"/>
									</a>
								</router-link>
							</div>
						</li>
					</transition-group>
				</draggable>
			</div>

		</vue-scroll>

		<slot name="footer"/>
	</div>
</template>

<script>
// import components
const draggable = () => import('vuedraggable')

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
		},
		enableDrag: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			drag: false,
		hideBar: { // Vue-Scroll bar
			bar: {
				opacity: 0
			}
		}
	};
},
components: {
	draggable
}
};
</script>

<style scoped>
.flip-list-move {
	transition: transform 0.5s;
}
.no-move {
	transition: transform 0s;
}
.ghost {
	opacity: 0.45;
	transform: scale(5);
	transition: all .15s ease-in-out;
}
.chosen {
	transform: scale(1.1);
	transition: all .15s ease-in-out;
}
.drag {
	opacity: 0.5;
	transition: all .15s ease-in-out;
}
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