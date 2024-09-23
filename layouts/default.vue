<template>
  <div class="flex flex-col h-dvh bg-neutral-100 overflow-hidden">
    <div>
      <CommonHeader />
    </div>
    <div class="flex-grow overflow-auto flex flex-col">
      <img
        src="/images/background.jpg"
        alt=""
      >
      <div class="bg-red-800 p-2 flex">
        <div class="m-auto flex flex-col md:flex-row gap-1 sm:gap-3 items-center text-white font-semibold">
          <div class="text-lg">20th NCKU Cup</div>
          <div
            style="font-family: digital;"
            class="py-1 px-3 bg-black text-2xl"
          >{{ countdownText }}</div>
          <div class="flex items-center gap-2 font-normal text-xs md:text-base">
            <span>Countdown by</span>
            <span style="font-family: Audiowide">TechNSport</span>
            <span>the Official Timekeeper</span>
          </div>
        </div>
      </div>
      <div class="flex-grow flex justify-center px-5 py-10">
        <div class="w-full lg:w-[1024px] mx-auto">
          <slot />
        </div>
      </div>
      <CommonFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const countdownText = ref('');
  onNuxtReady(() => {
    setInterval(() => {
      const now = new Date();
      const target = new Date('2024-11-16T00:00:00');
      const diff = target.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
      countdownText.value = `${days} D ${hours} H ${minutes} M ${seconds} S`;
      if (diff <= 0) {
        countdownText.value = '0 D 0 H 0 M 0 S';
      }
    }, 1000);
  });
</script>

<style></style>