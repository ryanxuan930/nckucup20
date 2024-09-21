<template>
  <Menubar
    :model="items"
    breakpoint="1024px"
    :pt="{
      start: {
        class: 'flex-grow',
      },
      item: {
        class: 'text-xl xl:text-2xl font-bold',
      },
      itemContent: {
        class: 'hover:bg-red-900 text-white',
      }
    }"
  >
    <template #start>
      <div class="w-full">
        <div
          class="cursor-pointer"
          @click="router.push('/')"
        >
          <img
            src="/images/banner.svg"
            alt="Logo"
            class="h-12 sm:h-16 xl:h-20"
          >
        </div>
        <div class="flex-grow" />
      </div>
    </template>
    <template #item="{ item, root }">
      <NuxtLink
        v-bind="item.action"
        :class="{ 'link': root, 'sublink': !root }"
      >
        {{ item.link }}
      </NuxtLink>
    </template>
  </Menubar>
</template>

<script lang="ts" setup>
  const router = useRouter();
  const items = ref([
    { link: '最新消息', action: { to: '/news' } },
    {
      link: '競賽資訊', action: { to: '/info' }, items: [
        { link: '賽事簡介', action: { to: '/info' } },
        { link: '競賽規程', action: { to: '/info/regulation' } },
        { link: '競賽場地', action: { to: '/info/venue' } },
        { link: '秩序冊', action: { to: '/info/program' } },
      ]
    },
    { link: '競賽成績', action: { to: '/result' } },
    { link: '報名系統', action: { to: 'https://athletix.technsport.co/registration/login/user/nckucup20', external: true, target: '_blank' } },
  ]);
</script>

<style lang="scss" scoped>
  .link {
    @apply lg:hover:bg-red-900 lg:py-2 lg:px-4 lg:hover:text-white duration-150 rounded-sm text-black;
  }
</style>

<style></style>