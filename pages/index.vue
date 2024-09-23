<template>
  <div class="flex flex-col gap-5">
    <div>
      <CommonTitle title="最新消息" />
      <NewsList />
    </div>
    <div class="bg-red-900 p-5 text-white rounded-sm flex justify-center italic gap-3">
      <div>
        <div class="text-sm lg:text-xl font-semibold flex flex-col md:flex-row items-baseline">
          <span>報名截止：</span>
          <span class="text-xl lg:text-4xl">2024-10-19</span>
        </div>
        <div class="text-sm lg:text-xl font-semibold flex flex-col md:flex-row items-baseline">
          <span>繳費截止：</span>
          <span class="text-xl lg:text-4xl">2024-10-26</span>
        </div>
      </div>
      <Divider layout="vertical" />
      <div class="flex flex-col">
        <button
          class="border-white border-2 text-white m-auto font-semibold text-lg lg:text-2xl px-5 lg:px-10 py-2 lg:py-5 rounded-sm hover:bg-white hover:text-red-950 duration-150"
          @click="openLink('https://athletix.technsport.co/registration/login/user/nckucup20')"
        >即刻報名</button>
      </div>
    </div>
    <div>
      <CommonTitle title="社群媒體" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-1">
        <iframe
          :src="`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100063566606627&tabs=timeline&width=${frameWidth}&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId`"
          :width="frameWidth"
          height="500"
          style="border:none;overflow:hidden"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          class="m-auto"
        />
        <iframe
          :src="`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FNCKUTF&tabs=timeline&width=${frameWidth}&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId`"
          :width="frameWidth"
          height="500"
          style="border:none;overflow:hidden"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          class="m-auto"
        />
      </div>
    </div>
    <div>
      <CommonTitle title="贊助商" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useWindowSize } from '@vueuse/core';

  const { width } = useWindowSize();

  const frameWidth = computed(() => {
    if (width.value < 600) {
      return width.value - 100;
    }
    return 500;
  });
  function openLink(url: string) {
    window.open(url, '_blank');
  }
</script>

<style></style>