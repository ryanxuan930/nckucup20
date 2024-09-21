<template>
  <div class="flex flex-col h-dvh bg-neutral-100 overflow-hidden">
    <div>
      <MainHeader />
    </div>
    <div class="flex-grow overflow-auto flex flex-col">
      <img
        src="/images/background.jpg"
        alt=""
      >
      <div class="flex-grow">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>