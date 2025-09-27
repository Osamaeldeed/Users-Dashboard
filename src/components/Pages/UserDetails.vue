<template>
  <div class="flex flex-col min-h-screen"> 
    <!-- Main Content -->
    <div class="flex-grow">
      <div class="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <!-- Loader -->
        <div v-if="isLoading" class="text-center py-10">
          <div class="size-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="mt-4 text-gray-500 animate-pulse">Loading user details...</p>
        </div>

        <!-- User Found -->
        <div v-else-if="user" class="space-y-6 animate-fadeIn">
          <!-- Header -->
          <div class="flex flex-col sm:flex-row items-center gap-6">
            <img :src="user.image" alt="user image" class="w-28 h-28 rounded-full border-4 border-indigo-200 shadow-md" />
            <div class="text-center sm:text-left">
              <h1 class="text-3xl font-bold text-gray-800">
                {{ user.firstName }} {{ user.lastName }}
              </h1>
              <p class="text-indigo-500 font-medium">@{{ user.username }}</p>
              <p class="text-sm text-gray-400">ID: {{ user.id }}</p>
            </div>
          </div>

          <!-- Details Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div class="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <p class="font-semibold text-gray-600">Age</p>
              <p class="text-lg text-gray-800">{{ user.age }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <p class="font-semibold text-gray-600">Gender</p>
              <p>
                <span
                  :class="[ 
                    'px-3 py-1 rounded-full text-sm font-semibold',
                    user.gender === 'male'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-pink-100 text-pink-600',
                  ]"
                >
                  {{ user.gender }}
                </span>
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <p class="font-semibold text-gray-600">Email</p>
              <p class="text-gray-800">{{ user.email }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <p class="font-semibold text-gray-600">Country</p>
              <p class="text-gray-800">{{ user.address.country }}</p>
            </div>
          </div>

          <!-- Buttons -->
          <div class="mt-6 flex flex-wrap gap-4">
            <router-link
              to="/users"
              class="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition"
            >
              ← Back to Users
            </router-link>
            <router-link
              :to="`/edituser/${user.id}`"
              class="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg shadow-md transition"
            >
              ✏️ Edit
            </router-link>
            <button
              @click="deleteUser"
              class="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition cursor-pointer"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        <!-- Not Found -->
        <div v-else class="text-center text-red-500 font-bold animate-bounce">
          User not found ❌
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-indigo-600 text-white text-sm text-center py-4">
      © 2025 Users Dashboard. All rights reserved.
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserDetails",
  data() {
    return {
      user: null,
      isLoading: true,
    };
  },
  methods: {
    async getUser() {
      try {
        const res = await axios.get(`http://localhost:3000/users/${this.$route.params.id}`);
        this.user = res.data;
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteUser() {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          await axios.delete(`http://localhost:3000/users/${this.$route.params.id}`);
          this.$router.push("/users");
        } catch (err) {
          console.error("Error deleting user:", err);
        }
      }
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-in-out;
}
</style>