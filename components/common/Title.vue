<template>
  <div class="flex flex-col gap-1 mb-3">
    <div class="text-2xl font-bold">{{ props.title }}</div>
    <hr class="border border-red-950">
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    title: string;
  }>();
</script>

<style></style>