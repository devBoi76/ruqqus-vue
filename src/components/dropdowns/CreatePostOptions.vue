<template>
  <t-dropdown :classes="{dropdown: 'origin-top-left right-0 bg-white w-56 py-2'}" text="Menu">
    <!-- Trigger -->
    <div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler }">
      <button class="w-8 h-8 flex items-center justify-center px-2 py-0 text-gray-600 rounded-sm hover:bg-gray-100 bg-white dark:bg-gray-700" id="logs-channel-menu" aria-label="Post creation options menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler">
      <i class="far fa-cog text-lg"></i>
    </button>
  </div>
  <!-- Menu -->
  <div slot-scope="{ hide }">
    <button class="block w-full px-4 py-2 text-left text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
      <span>Rating</span>
    </button>
    <button class="block w-full px-4 py-2 text-left text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
      <span>Disable yanking</span>
    </button>
    <button class="block w-full px-4 py-2 text-left text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
      <span>Turn off notifications</span>
    </button>
  </div>
</t-dropdown>
</template>