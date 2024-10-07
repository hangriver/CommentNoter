<template>
  <router-view />
</template>

<script setup lang="ts">
import { initJsStore } from './service/idb_service';

defineOptions({
  name: 'App',
});

initJsStore();
</script>
