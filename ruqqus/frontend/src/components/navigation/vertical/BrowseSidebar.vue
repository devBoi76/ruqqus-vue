<template>
  <div class="d-none d-xl-flex flex-column flex-shrink-0 w-72 bg-gray-500">
    <vue-scroll>
      <div class="sticky-top p-3 text-sm font-weight-bold text-gray-200 bg-gray-500">Categories</div>
      <div class="mt-n4 p-3">
        <b-link v-for="category of categories" :key="category.id" class="d-block py-2 px-2 text-capitalize rounded tab" to="">
          <div class="d-flex align-items-center">
            <i class="far text-sm mr-3 w-4 text-center" :class="[category.icon, 'text-'+category.color]"></i>{{ category.name }}
            <i v-show="category.subCats.length > 0"
              class="far ml-auto p-1 collapse-icon"
              :class="category.visible ? 'fa-minus' : 'fa-plus'"
              @click="category.visible = !category.visible">
            </i>
          </div>
          <b-collapse v-model="category.visible" v-if="category.subCats">
            <ul class="no-bullets mb-0">
              <li v-for="subCat of category.subCats" :key="subCat.name" class="pl-4">
                <b-link class="d-block py-2 px-2 text-capitalize rounded tab" @click="toggleActive($event, subCat)">
                  <div class="d-flex align-items-center">
                    <i class="far text-sm mr-3 w-4 text-center"
                    :class="['text-'+category.color, subCat.active ? 'fa-check-square font-weight-bold' : 'fa-square']"
                    ></i>{{ subCat.name }}
                  </div>
                </b-link>
              </li>
            </ul>
          </b-collapse>
        </b-link>
      </div>
    </vue-scroll>
    <div class="text-center w-100 p-4 bg-gray-500 shadow">
      <b-button :variant="disable ? 'secondary' : 'purple-400'" block :disabled="disable" @click="applyFilters()">Apply filters</b-button>
      <b-button variant="link" size="sm" class="text-danger mb-n3" :class="{'d-none': newlySelectedSubCats.length == 0 }" @click="clearFilters()">Reset</b-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedSubCats: [],
        newlySelectedSubCats: [],
        categories: [
        { id: 0,
          name: 'all guilds',
          subCats: [],
          icon: 'fa-globe',
          color: null,
          visible: false
        },
        { id: 1,
          name: 'arts',
          subCats: [{name:'animation'}, {name:'production'}, {name:'photography'}, {name:'crafts'}],
          icon: 'fa-palette',
          color: 'purple-400',
          visible: false
        },
        { id: 2,
          name: 'business',
          subCats: [{name:'finance'}, {name:'cryptocurrency'}, {name:'entrepreneur'}],
          icon: 'fa-chart-line',
          color: 'purple-400',
          visible: false
        },
        { id: 3,
          name: 'culture',
          subCats: [{name:'history'}, {name:'language'}],
          icon: 'fa-users',
          color: 'purple-400',
          visible: false
        },
        { id: 4,
          name: 'discussion',
          subCats: [{name:'casual'}, {name:'serious'}, {name:'Q&A'}],
          icon: 'fa-podium',
          color: 'purple-400',
          visible: false
        },
        { id: 5,
          name: 'entertainment',
          subCats: [{name:'celebrities'}, {name:'industry news'}, {name:'film & TV'}],
          icon: 'fa-theater-masks',
          color: 'purple-400',
          visible: false
        },
        { id: 6,
          name: 'gaming',
          subCats: [{name:'PC'}, {name:'console'}, {name:'industry news'}, {name:'development'}],
          icon: 'fa-alien-monster',
          color: 'purple-400',
          visible: false
        },
        { id: 7,
          name: 'hobby',
          subCats: [{name:'crafts'}, {name:'outdoors'}, {name:'DIY'}, {name:'niche'}],
          icon: 'fa-wrench',
          color: 'purple-400',
          visible: false
        },
        { id: 8,
          name: 'health',
          subCats: [{name:'medical'}, {name:'fitness'}, {name:'mental health'}],
          icon: 'fa-heart',
          color: 'purple-400',
          visible: false
        },
        { id: 9,
          name: 'lifestyle',
          subCats: [{name:'fashion'}, {name:'beauty'}, {name:'food'}, {name:'relationships'}],
          icon: 'fa-tshirt',
          color: 'purple-400',
          visible: false
        },
        { id: 10,
          name: 'memes',
          subCats: [{name:'casual'}, {name:'dank'}, {name:'political'}],
          icon: 'fa-grin',
          color: 'purple-400',
          visible: false
        },
        { id: 11,
          name: 'news',
          subCats: [{name:'local'}, {name:'north america'}, {name:'world'}, {name:'upbeat'}],
          icon: 'fa-newspaper',
          color: 'purple-400',
          visible: false
        },
        { id: 12,
          name: 'politics',
          subCats: [{name:'left'}, {name:'right'}, {name:'authoritarian'}, {name:'libertarian'}, {name:'activism'}, {name:'offbeat'}, {name:'news'}],
          icon: 'fa-university',
          color: 'purple-400',
          visible: false
        },
        { id: 13,
          name: 'science',
          subCats: [{name:'biology'}, {name:'physics'}, {name:'AI'}, {name:'space'}, {name:'news'}],
          icon: 'fa-flask',
          color: 'purple-400',
          visible: false
        },
        { id: 14,
          name: 'sports',
          subCats: [{name:'baseball'}, {name:'basketball'}, {name:'American football'}, {name:'soccer'}, {name:'tennis'}, {name:'hockey'}, {name:'combat'}, {name:'news'}],
          icon: 'fa-baseball-ball',
          color: 'purple-400',
          visible: false
        },
        { id: 15,
          name: 'technology',
          subCats: [{name:'gadgets'}, {name:'programming'}, {name:'hardware'}, {name:'software'}, {name:'design'}, {name:'industry news'}],
          icon: 'fa-microchip',
          color: 'purple-400',
          visible: false
        }
        ]
      };
    },
    computed: {
      disable() {
        const oldSelection = this.selectedSubCats;
        const newSelection = this.newlySelectedSubCats;

        if((oldSelection.sort().join(',')=== newSelection.sort().join(','))) {
          return true
        } else {
          return false
        }
      },
      subCats() {
       const categories = this.categories;
       for(var i=0; i< categories.length; i++) {
        const subCats = categories[i].subCats;
        for(var j=0; j< subCats.length; j++) {
          var v = 2
        }
      }
      return v;
    }
  },
  methods: {
    toggleActive: function(event, subCat) {
      if (subCat.active) {
        subCat.active = false;
      } else if (!subCat.active) {
        this.$set(subCat, 'active', true);
      }
        // Add or remove sub cat from list
        const selected = this.selectedSubCats
        const index = selected.indexOf(subCat.name)
        if(selected.includes(subCat.name)) {
          selected.splice(index, 1)
        } else {
          selected.push(subCat.name)
        }
      },
      applyFilters() {
        this.newlySelectedSubCats = JSON.parse(JSON.stringify(this.selectedSubCats));
      },
      clearFilters() {
        this.newlySelectedSubCats = []
        this.selectedSubCats = []
      }
    }
  };
</script>

<style scoped>
/*
.tab {
  color: $gray-200;
  font-weight: 600;
  &:focus,
  &:hover,
  &.router-link-active {
    color: $gray-100;
  }
  &.router-link-active {
    background-color: $white-07;
  }
}
.collapse-icon {
  color: $gray-200;
  &:focus,
  &:hover {
    color: $gray-100
  }
}
*/
</style>