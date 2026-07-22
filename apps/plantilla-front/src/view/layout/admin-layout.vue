<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon icon="mdi-reorder-horizontal"></v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Admin Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/admin">Dashboard</v-btn>
      <v-btn text to="/">Logout</v-btn>
    </v-app-bar>

    <MenuLateral v-model:drawer="drawer" :permanent="permanent"></MenuLateral>
    <!-- <v-navigation-drawer permanent app>
      <v-list>
        <v-list-item to="/admin" link>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/admin/users" link>
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>
        <v-list-item to="/admin/settings" link>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-main class="bg-gray-100">
      <v-container fluid class="p-6">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import MenuLateral from '../../components/MenuLateral.vue'

const drawer = ref(true)
const permanent = ref(false)
</script>

<style scoped>
/* Tailwind classes are used in the template, so custom CSS is minimized */
</style>