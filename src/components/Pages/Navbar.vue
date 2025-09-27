<template>
  <nav class="bg-indigo-600 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <img
            src="/src/Assets/dashboard.png"
            alt="Logo"
            class="h-8 w-auto mr-2"
          />
          <span class="text-xl font-bold tracking-wide">User Manager</span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-6">
          <router-link
            to="/"
            exact-active-class="bg-indigo-700"
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition"
          >
            Home
          </router-link>
          <router-link
            to="/users"
            exact-active-class="bg-indigo-700"
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition"
          >
            Users
          </router-link>
          <router-link
            to="/adduser"
            exact-active-class="bg-indigo-700"
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition"
          >
            Add User
          </router-link>
        </div>

        <!-- Mobile Hamburger -->
        <div class="md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="p-2 rounded-md hover:bg-indigo-500 focus:outline-none"
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!isOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-indigo-700">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          exact-active-class="bg-indigo-800"
          class="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 transition"
        >
          Home
        </router-link>
        <router-link
          to="/users"
          exact-active-class="bg-indigo-800"
          class="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 transition"
        >
          Users
        </router-link>
        <router-link
          to="/adduser"
          exact-active-class="bg-indigo-800"
          class="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 transition"
        >
          Add User
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>