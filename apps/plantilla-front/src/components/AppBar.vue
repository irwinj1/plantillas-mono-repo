<template>
    <v-app-bar>
      <v-app-bar-nav-icon @click="toggleDrawer">
        <v-icon icon="mdi-reorder-horizontal"></v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Admin Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/admin">Dashboard</v-btn>
      <v-btn text to="/">Logout</v-btn>
    </v-app-bar>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    drawer: Boolean,
})
const emit = defineEmits(['update:drawer'])
const toggleDrawer = () => emit('update:drawer', !props.drawer)
</script>
