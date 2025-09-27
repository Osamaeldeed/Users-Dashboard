<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <!-- Main Content -->
    <div class="flex-grow flex items-center justify-center px-4">
      <div
        class="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-2xl animate-fade-in"
      >
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-600">
          ✏️ Edit User
        </h2>
        <form @submit.prevent="updateUser" class="space-y-5">
          <!-- First Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >First Name</label
            >
            <input
              v-model="user.firstName"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Enter first name"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Last Name</label
            >
            <input
              v-model="user.lastName"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Enter last name"
            />
          </div>

          <!-- Age -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Age</label
            >
            <input
              v-model="user.age"
              type="number"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Enter age"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Email</label
            >
            <input
              v-model="user.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Enter email"
            />
          </div>

          <!-- Button -->
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition"
          >
            Update User
          </button>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-indigo-600 text-white text-sm text-center py-4 mt-10">
      © 2025 Users Dashboard. All rights reserved.
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
      },
    };
  },
  created() {
    const id = this.$route.params.id;
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => console.error(err));
  },
  methods: {
    updateUser() {
      const id = this.$route.params.id;
      axios
        .put(`http://localhost:3000/users/${id}`, this.user)
        .then(() => {
          this.$router.push("/users");
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style scoped>
/* Animation for form fade-in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
</style>