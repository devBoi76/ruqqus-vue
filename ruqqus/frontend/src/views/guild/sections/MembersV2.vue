<template>
  <b-container>
    <b-row class="justify-content-center py-4">
      <b-col>
        <div class="d-flex flex-row-reverse">
          <Sidebar>
            <GuildSidebar />
          </Sidebar>
          <div class="w-100 pr-xl-4">
            <div class="d-none d-md-flex justify-content-between h-10 mb-4">
              <div>
                <div class="h5 mb-0" :class="{'text-gray-100':darkMode}">Members</div>
                <p class="text-sm mb-0" :class="darkMode ? 'text-white-65' : 'text-muted'"><i class="far fa-users mr-1"></i>2503 members</p>
              </div>
            </div>

            <b-row class="mb-3 mb-xl-0">
              <b-col>
                <div class="shadow-sm" :class="{'text-gray-100':darkMode}">
                  <div class="d-flex align-items-center justify-content-between px-4 py-3 border-bottom rounded-top"
                  :class="darkMode ? 'bg-gray-800 border-white-13' : 'bg-white border-gray-100'">
                  <div class="d-flex align-items-end w-100">
                    <div class="h5 mb-0">
                      <i class="fas fa-users-crown w-8 pr-3 text-center text-primary text-lg"></i>Guild Masters</div>
                      <b-link to="./settings/rules" class="ml-auto text-muted">
                        Manage<i class="far fa-chevron-right text-sm pl-2"></i>
                      </b-link>
                    </div>
                  </div>

                  <MemberRow
                  v-for="(member,key) of guild.members"
                  :key="member.id"
                  :member="member"
                  is-guildmaster
                  no-hover
                  :row-class="['px-4', key != member.length - 1 ? 'py-3 border-bottom' : 'pb-0 border-0',
                  darkMode ? 'border-white-07' : 'border-gray-100']"
                  />

                  <div v-show="loadingMembers">
                    <div v-for="i in 3" :key="i" class="d-flex align-items-center mb-2 px-3 py-2 h-min-16 rounded"
                    :class="darkMode ? 'bg-gray-900' : 'bg-white'">
                    <div class="d-flex w-100">
                      <b-skeleton variant="white-25" animation="fade" type="avatar" width="34px" height="34px" class="rounded mr-2"></b-skeleton>
                      <div class="d-flex flex-column w-100 justify-content-between">
                        <b-skeleton variant="white-25" animation="fade" width="20%" class="mb-2"></b-skeleton>
                        <b-skeleton variant="white-25" animation="fade" width="10%" height="10px" class="mb-0"></b-skeleton>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </b-col>
          </b-row>

            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </template>

  <script>
  // Import components
  import { mapState } from "vuex";

  import Sidebar from "@/components/navigation/vertical/Sidebar.vue";
  import GuildSidebar from "@/components/guild/sidebar/GuildSidebar.vue";

  import MemberRow from "@/components/MemberRow.vue";

  export default {
    data() {
      return {
        loadingMembers: true,
        members: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        },
        {
          id: 6
        },
        {
          id: 7
        },
        {
          id: 8
        }
        ]
      };
    },
    components: {
      Sidebar,
      GuildSidebar,
      MemberRow
    },
    computed: {
     guild() {
      return this.$route.query.name || null
    },
    ...mapState("guild", ["members"]),
    ...mapState("persist", ["darkMode"])
  },
  methods: {
    fetchMembers() {
      this.$store.dispatch('guild/getMembers', this.guild)
      .then(response => {
        this.loadingMembers = false;
        console.log(response);
      });
    }
  },
  created() {
    this.fetchMembers()
  }
};
</script>
