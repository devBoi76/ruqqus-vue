<template>
  <transition enter-class="opacity-0" enter-active-class="ease-out transition-medium" enter-to-class="opacity-100" leave-class="opacity-100" leave-active-class="ease-out transition-medium" leave-to-class="opacity-0">
    <div @keydown.esc="isOpen = false" -show="isOpen" class="z-10 fixed inset-0 transition-opacity">
      <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
    </div>
  </transition>
  <aside class="transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30" :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
    <span @click="isOpen = false" class="flex w-full items-center p-4 border-b">
      ruqqus
    </span>
    <span @click="isOpen = false" class="flex items-center p-4 hover:bg-indigo-500 hover:text-white">
      <span>Home</span>
    </span>
    <span @click="isOpen = false" class="flex items-center p-4 hover:bg-indigo-500 hover:text-white">
      <span>Explore</span>
    </span>
    <span @click="isOpen = false" class="flex items-center p-4 hover:bg-indigo-500 hover:text-white ">
      <span>All</span>
    </span>
    <span @click="isOpen = false" class="flex items-center p-4 hover:bg-indigo-500 hover:text-white ">
      <span>Trending</span>
    </span>
    <span @click="isOpen = false" class="flex items-center p-4 hover:bg-indigo-500 hover:text-white">
      <span>My Guilds</span>
    </span>
    <span @click="isOpen = false" class="flex items-center p-4 hover:bg-indigo-500 hover:text-white">
      <span>My Profile</span>
    </span>
    <span @click="isOpen = false" class="flex items-center p-4 hover:bg-indigo-500 hover:text-white">
      <span>Settings</span>
    </span>
    <div class="fixed bottom-0 w-full">
      <button class="flex items-center p-4 text-white bg-blue-500 hover:bg-blue-600 w-full">
        <span>Share</span>
      </button>
    </div>
  </aside>
</template>