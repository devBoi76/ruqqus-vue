<template>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="capitalize text-gray-500">
          <!-- Current Sort -->
          <!-- Sorting defaults to "hot" otherwise pull query from URL -->
          <span>{{ $route.query.sort || 'hot' }}</span>
          <!-- If time sort present, display the time sort -->
          <span v-if="$route.query.t">: {{ $route.query.t }}</span>
          <i class="fas fa-chevron-down fa-sm pl-2"></i>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem>
              <!-- Sort Link -->
              <router-link v-for="sort in sorts" :key="sort.name" custom v-slot="{ href, navigate, isExactActive }" :to="sort.route" @click="hide">
                <a :href="href" @click="navigate" role="menuitem">
                  <div class="group flex rounded-md items-center w-full px-2 py-2" :class="isExactActive ? 'text-primary font-bold' : 'text-gray-700 hover:text-gray-900'">
                    {{ sort.name }}
                  </div>
                </a>
              </router-link>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
</template>

<script>
	import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

	export default {
		components: {
			Menu,
			MenuButton,
			MenuItems,
			MenuItem
		},
    data() {
    return {
      selected: null,
      sorts: [
      {
        name: "hot",
        route: {
          path: "?sort=hot"
        }
      },
      {
        name: "new",
        route: {
          path: "?sort=new"
        }
      },
      {
        name: "week",
        route: {
          path: "?sort=top&t=week"
        }
      },
      {
        name: "month",
        route: {
          path: "?sort=top&t=month"
        }
      },
      {
        name: "year",
        route: {
          path: "?sort=top&t=year"
        }
      },
      {
        name: "all",
        route: {
          path: "?sort=top&t=all"
        }
      },
      {
        name: "disputed",
        route: {
          path: "?sort=disputed"
        }
      }
      ]
    };
  }
	}
</script>
