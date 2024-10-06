<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> 评论记录器 </q-toolbar-title>

        <div>CommentNoter v{{ 0.1 }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
//import { ref } from 'vue';

defineOptions({
  name: 'MainLayout',
});
</script>
