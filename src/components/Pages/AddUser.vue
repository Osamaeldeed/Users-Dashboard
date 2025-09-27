<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
    <!-- Form Container -->
    <div
      class="max-w-lg w-full mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-2xl animate-fade-in"
    >
      <h1 class="text-3xl font-bold mb-6 text-center text-indigo-600">
        ➕ Add New User
      </h1>

      <form @submit.prevent="addUser" class="space-y-5">
        <!-- First Name -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">First Name</label>
          <input
            v-model="newUser.firstName"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
            placeholder="Enter first name"
          />
        </div>

        <!-- Age -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Age</label>
          <input
            v-model="newUser.age"
            type="number"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
            placeholder="Enter age"
          />
        </div>

        <!-- Gender -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Gender</label>
          <select
            v-model="newUser.gender"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
          >
            <option disabled value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Email</label>
          <input
            v-model="newUser.email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
            placeholder="Enter email"
          />
        </div>

        <!-- Country -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Country</label>
          <input
            v-model="newUser.address.country"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
            placeholder="Enter country"
          />
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <button
            type="submit"
            class="px-6 py-3 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition"
          >
            Add User
          </button>
        </div>
      </form>
    </div>

    <!-- Footer -->
    <footer
      class="bg-indigo-600 text-white text-sm text-center py-4 mt-10 border-t"
    >
      © 2025 Users Dashboard. All rights reserved.
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddUser",
  data() {
    return {
      newUser: {
        firstName: "",
        age: "",
        gender: "",
        email: "",
        address: {
          country: "",
        },
      },
    };
  },
  methods: {
    addUser() {
      axios
        .post("http://localhost:3000/users", this.newUser)
        .then(() => {
          alert("User Added Successfully ✅");
          this.$router.push("/users");
        })
        .catch((err) => console.error("Error adding user:", err));
    },
  },
};
</script>

<style scoped>
/* Animation for fade-in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.7s ease-out;
}
</style>