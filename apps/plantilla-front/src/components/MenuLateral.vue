<template>
    <v-navigation-drawer app :model-value="drawer" @update:model-value="$emit('update:drawer', $event)" :permanent="permanent">
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
    </v-navigation-drawer>
</template>
<script setup>
    defineProps({
        drawer: {
            type: Boolean,
            default: false
        },
        permanent: {
            type: Boolean,
            default: false
        }
    })
    
    defineEmits(['update:drawer'])
</script>
<style scoped>

</style>