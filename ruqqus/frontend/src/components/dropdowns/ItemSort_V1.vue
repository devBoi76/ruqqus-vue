<template>
	<t-dropdown :classes="{dropdown: 'w-56 origin-top-left right-0 bg-white py-2'}" text="Menu">
		<!-- Trigger -->
		<div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler }" class="flex items-center">
			<button class="capitalize text-sm text-gray-500" id="user-menu" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler">
				<span>{{ $route.query.sort || 'hot' }}</span>
        <span v-if="$route.query.t">: {{ $route.query.t }}</span>
        <i class="fas fa-chevron-down fa-sm pl-2"></i>
			</button>
		</div>
		<!-- Menu -->
		<div slot-scope="{ hide }">
			<router-link v-for="sort in sorts" :key="sort.name" v-slot="{ href, navigate, isExactActive }" :to="sort.route" @click.native="hide">
				<a :href="href" @click="navigate" role="menuitem">
					<div class="block px-4 py-2 hover:bg-gray-100 capitalize" :class="isExactActive ? 'text-primary font-bold' : 'text-gray-700 hover:text-gray-900'">
						{{ sort.name }}
					</div>
				</a>
			</router-link>
		</div>
	</t-dropdown>
</template>

<script>
export default {
  name: "ItemSort",
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