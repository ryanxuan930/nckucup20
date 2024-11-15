<template>
  <div v-if="!isLoading && bulletin">
    <div class="mb-3">
      <NuxtLink
        to="/news"
        class="text-red-800 font-semibold"
      >回最新消息</NuxtLink>
    </div>
    <CommonTitle :title="bulletin.title_ch" />
    <div class="flex justify-between items-center">
      <div :class="['category', categoryList[bulletin.category].css]">{{ categoryList[bulletin.category].label }}</div>
    </div>
    <div
      class="p-2"
      v-html="bulletin.content_ch"
    />
    <div
      v-if="bulletin.links && bulletin.links.length > 0"
      class="py-4"
    >
      <div class="mb-3 text-xl font-semibold">檔案連結</div>
      <template
        v-for="(item, index) in bulletin.links"
        :key="index"
      >
        <div class="text-red-800">
          <a
            :href="item.url"
            target="_blank"
          >{{ item.title }}</a>
        </div>
      </template>
    </div>
  </div>
  <div
    v-else
    class="flex"
  >
    <ProgressSpinner class="m-auto" />
  </div>
</template>

<script lang="ts" setup>
  const isLoading = ref(false);
  const bulletin: any = ref(null);
  const toast = useToast();
  const route = useRoute();
  async function getData() {
    isLoading.value = true;
    // bulletins
    {
      try {
        const response = await fetch(`https://athletics.nsysu.dev/sepserver/api/4/bulletin/${route.params.newsId}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        bulletin.value = data;
      } catch (error: any) {
        toast.add({ severity: 'error', summary: error, life: 5000 });
      } finally {
        isLoading.value = false;
      }
    }
    isLoading.value = false;
  }
  setTimeout(() => {
    getData();
  }, 0);

  const categoryList = [
    {
      label: '一般公告',
      css: 'bg-yellow-800',
    },
    {
      label: '檔案下載',
      css: 'bg-blue-800',
    },
    {
      label: '賽事資訊',
      css: 'bg-green-800',
    },
    {
      label: '重要消息',
      css: 'bg-red-800',
    },
  ];
</script>

<style scoped>
  .category {
    @apply p-1 text-white w-24 text-center;
  }
</style>