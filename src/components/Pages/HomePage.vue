<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
    <!-- Main Content -->
    <main class="flex flex-col flex-grow items-center justify-center text-center px-4">
      <!-- Title with Animation -->
      <h1
        class="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 animate-fade-in"
      >
        Welcome to <span class="text-indigo-500">Users Dashboard</span> 🚀
      </h1>

      <!-- Subtitle -->
      <p class="text-gray-600 mb-10 max-w-2xl text-base md:text-lg">
        Manage your users easily with powerful features: add new users, view
        details, edit profiles, and delete with just a few clicks.
      </p>

      <!-- Call To Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4">
        <router-link
          to="/users"
          class="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow-lg transform hover:scale-105 transition"
        >
          Go to Users
        </router-link>
        <router-link
          to="/adduser"
          class="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-lg transform hover:scale-105 transition"
        >
          Add New User
        </router-link>
      </div>

      <!-- Features Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full max-w-5xl px-4">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <div class="text-3xl mb-3 text-indigo-500">
            <i :class="feature.icon"></i>
          </div>
          <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-500 text-sm">{{ feature.desc }}</p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-indigo-600 text-white text-sm text-center py-4 mt-10">
      © 2025 Users Dashboard. All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      features: [
        {
          title: "Add Users",
          desc: "Easily add new users with simple forms.",
          icon: "fas fa-user-plus",
        },
        {
          title: "View Details",
          desc: "Check complete details of each user.",
          icon: "fas fa-id-card",
        },
        {
          title: "Edit Profiles",
          desc: "Update user information anytime.",
          icon: "fas fa-user-edit",
        },
        {
          title: "Delete Users",
          desc: "Remove users quickly and securely.",
          icon: "fas fa-user-times",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Simple fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 1.2s ease-out;
}
</style>