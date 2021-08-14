<div class="mb-2 px-3">
  <span class="text-extra-sm tracking-wider font-weight-bold text-uppercase" :class="darkMode ? 'text-gray-400' : 'text-muted'">
    Direct messages
  </span>
</div>
<div>
  <b-link :to="{ name: 'personal-conversation-view' }" class="d-flex align-items-center flex-shrink-0 px-3 py-2 notification active">
    <b-avatar rounded src="https://i.imgur.com/R5GQldJ.jpg" size="32px" class="mr-2 flex-shrink-0"></b-avatar>
    <div>
      <div>
        <span class="text-gray-100 font-weight-bold">@anders</span>
      </div>
      <div class="text-extra-sm text-muted">Okay cool</div>
    </div>
    <div class="ml-auto text-white-65 text-sm">2 hrs</div>
  </b-link>
  <b-link :to="{ name: 'personal-conversation-view' }" class="d-flex align-items-center flex-shrink-0 px-3 py-2 notification">
    <b-avatar rounded src="https://placekitten.com/300/300" size="32px" class="mr-2 flex-shrink-0"></b-avatar>
    <div>
      <div>
        <span class="text-gray-100 font-weight-bold">@calmcat</span>
      </div>
      <div class="text-extra-sm text-muted">Thanks for the li...</div>
    </div>
    <div class="ml-auto text-white-65 text-sm">1 day</div>
  </b-link>