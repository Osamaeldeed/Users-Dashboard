<template>
  <div class="flex flex-col min-h-screen animate-fadeIn">
    <!-- Main Content -->
    <div class="flex-grow">
      <div class="max-w-6xl mx-auto mt-10 px-4">
        <h2 class="text-2xl font-bold text-indigo-600 mb-6">Users List</h2>

        <!-- Search -->
        <form class="max-w-md mb-5">
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              v-model="search"
              type="search"
              class="block w-full p-3 ps-10 text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search by name..."
            />
          </div>
        </form>

        <!-- Loading Spinner -->
        <div v-if="isLoading" class="flex justify-center items-center py-10">
          <div
            class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"
          ></div>
        </div>

        <!-- Content (table on desktop + cards on mobile) -->
        <div v-else>
          <!-- Users Table (Desktop: md and up) -->
          <div class="overflow-x-auto rounded-lg shadow-lg hidden md:block">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-indigo-600 text-white text-left">
                  <th class="px-6 py-3 cursor-pointer" @click="sortBy('firstName')">
                    First Name
                    <span v-if="sortKey === 'firstName'">
                      {{ sortOrder === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th class="px-6 py-3 cursor-pointer" @click="sortBy('age')">
                    Age
                    <span v-if="sortKey === 'age'">
                      {{ sortOrder === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th class="px-6 py-3">Gender</th>
                  <th class="px-6 py-3 cursor-pointer" @click="sortBy('email')">
                    Email
                    <span v-if="sortKey === 'email'">
                      {{ sortOrder === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th class="px-6 py-3 cursor-pointer" @click="sortBy('country')">
                    Country
                    <span v-if="sortKey === 'country'">
                      {{ sortOrder === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th class="px-6 py-3">Actions</th>
                </tr>
              </thead>

              <!-- animated rows -->
              <transition-group name="list" tag="tbody">
                <tr
                  v-for="user in paginatedUsers"
                  :key="user.id"
                  class="odd:bg-gray-50 even:bg-gray-100 hover:bg-indigo-50 transition-colors"
                >
                  <td class="px-6 py-4 font-medium text-gray-800">
                    {{ user.firstName }}
                  </td>
                  <td class="px-6 py-4 text-gray-700">{{ user.age }}</td>
                  <td class="px-6 py-4">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-semibold',
                        user.gender === 'male'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-pink-100 text-pink-600',
                      ]"
                    >
                      {{ user.gender }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-gray-700">{{ user.email }}</td>
                  <td class="px-6 py-4 text-gray-700">
                    {{ user.address.country }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="relative inline-block text-left">
                      <button
                        @click="toggleDropdown(user.id)"
                        class="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                      >
                        ⋮
                      </button>

                      <transition name="pop">
                        <div
                          v-if="openDropdown === user.id"
                          class="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10 animate-scaleUp"
                        >
                          <ul class="py-1 text-sm text-gray-700">
                            <li>
                              <router-link
                                :to="`/userdetails/${user.id}`"
                                class="block px-4 py-2 hover:bg-gray-100 text-green-600"
                                >Show</router-link
                              >
                            </li>
                            <li>
                              <router-link
                                :to="`/edituser/${user.id}`"
                                class="block px-4 py-2 hover:bg-gray-100 text-blue-600"
                                >Edit</router-link
                              >
                            </li>
                            <li>
                              <button
                                class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                                @click="deleteUser(user.id)"
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </transition>

                    </div>
                  </td>
                </tr>

                <tr v-if="paginatedUsers.length === 0" :key="'no-users'">
                  <td
                    colspan="6"
                    class="text-center py-5 text-gray-400 font-semibold"
                  >
                    {{ search ? `No users match "${search}"` : "No users found" }}
                  </td>
                </tr>
              </transition-group>
            </table>
          </div>

          <!-- Users Cards (Mobile / Tablet: below md) -->
          <div class="grid gap-4 md:hidden mt-6">
            <transition-group name="card-fade" tag="div" class="grid gap-4">
              <div
                v-for="(user, idx) in paginatedUsers"
                :key="user.id"
                class="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition transform"
                :class="idx % 3 === 0 ? '' : ''"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="text-lg font-bold text-indigo-600 mb-1">
                      {{ user.firstName }}
                    </h3>
                    <p class="text-gray-700"><strong>Age:</strong> {{ user.age }}</p>
                    <p class="text-gray-700">
                      <strong>Gender:</strong>
                      <span
                        :class="[ 
                          'px-2 py-1 rounded-full text-xs font-semibold',
                          user.gender === 'male'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-pink-100 text-pink-600',
                        ]"
                      >
                        {{ user.gender }}
                      </span>
                    </p>
                    <p class="text-gray-700"><strong>Email:</strong> {{ user.email }}</p>
                    <p class="text-gray-700"><strong>Country:</strong> {{ user.address.country }}</p>
                  </div>

                  <!-- vertical actions for mobile card -->
                  <div class="flex flex-col items-end gap-2 ml-4">
                    <router-link
                      :to="`/userdetails/${user.id}`"
                      class="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200"
                      >Show</router-link
                    >
                    <router-link
                      :to="`/edituser/${user.id}`"
                      class="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200"
                      >Edit</router-link
                    >
                    <button
                      @click="deleteUser(user.id)"
                      class="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!-- Pagination Controls (unchanged) -->
        <div class="flex justify-center items-center gap-3 mt-6">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
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
  name: "UsersPage",
  data() {
    return {
      users: [],
      search: "",
      isLoading: true,
      openDropdown: null,
      sortKey: "",
      sortOrder: "asc",
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((u) =>
        u.firstName.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    sortedUsers() {
      if (!this.sortKey) return this.filteredUsers;
      return [...this.filteredUsers].sort((a, b) => {
        let valA =
          this.sortKey === "country"
            ? a.address.country
            : a[this.sortKey];
        let valB =
          this.sortKey === "country"
            ? b.address.country
            : b[this.sortKey];

        if (valA < valB) return this.sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return this.sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.sortedUsers.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.sortedUsers.length / this.itemsPerPage);
    },
  },
  methods: {
    getAllUsers() {
      this.isLoading = true;
      axios
        .get("http://localhost:3000/users")
        .then((res) => {
          this.users = res.data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          this.isLoading = false;
        });
    },
    toggleDropdown(id) {
      this.openDropdown = this.openDropdown === id ? null : id;
    },
    deleteUser(id) {
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then(() => {
          this.users = this.users.filter((u) => u.id !== id);
        })
        .catch((err) => console.error("Error deleting user:", err));
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
  created() {
    this.getAllUsers();
  },
};
</script>

<style scoped>
/* container fade-in */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.45s ease-out;
}

/* transition-group for table rows */
.list-enter-active, .list-leave-active {
  transition: all 360ms cubic-bezier(.2,.8,.2,1);
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* card transition for mobile */
.card-fade-enter-active, .card-fade-leave-active {
  transition: all 360ms cubic-bezier(.2,.8,.2,1);
}
.card-fade-enter-from, .card-fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

/* dropdown pop */
@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scaleUp {
  animation: scaleUp 160ms ease-out;
}
.pop-enter-active, .pop-leave-active {
  transition: all 160ms ease;
}
.pop-enter-from, .pop-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>