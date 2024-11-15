<template>
  <div>
    <!-- <div class="flex flex-col sm:flex-row items-center text-white text-center font-semibold">
      <div
        class="w-full sm:basis-1/5 bg-black p-1 cursor-pointer"
        @click="category = 9"
      >全部公告</div>
      <div
        class="w-full sm:basis-1/5 bg-red-800 p-1 cursor-pointer"
        @click="category = 3"
      >重要消息</div>
      <div
        class="w-full sm:basis-1/5 bg-yellow-800 p-1 cursor-pointer"
        @click="category = 0"
      >一般公告</div>
      <div
        class="w-full sm:basis-1/5 bg-green-800 p-1 cursor-pointer"
        @click="category = 2"
      >賽事資訊</div>
      <div
        class="w-full sm:basis-1/5 bg-blue-800 p-1 cursor-pointer"
        @click="category = 1"
      >檔案下載</div>
    </div> -->
    <table class="w-full text-center text-lg items-center">
      <tbody
        v-for="(item, index) in bulletins.data"
        :key="index"
        @click="router.push(`/news/${item.bulletin_id}`)"
      >
        <tr>
          <td class="text-left lg:w-1/12">
            <Tag v-if="item.pinned">置頂</Tag>
          </td>
          <td class="lg:w-2/12">
            <div :class="['category', categoryList[item.category].css]">{{ categoryList[item.category].label }}</div>
          </td>
          <td class="hidden lg:block w-7/12 font-bold text-left overflow-hidden">
            <div class="p-1">{{ item.title_ch }}</div>
          </td>
          <td class="lg:w-2/12">[{{ item.post_date }}]</td>
        </tr>
        <tr class="lg:hidden">
          <td
            colspan="4"
            class="font-bold text-left"
          >{{ item.title_ch }}</td>
        </tr>
      </tbody>

    </table>
    <div class="flex items-center gap-2 mt-5">
      <template
        v-for="(item, index) in bulletins.links"
        :key="index"
      >
        <Button
          :disabled="item.url === null"
          text
          @click="getData(item.url)"
        >{{ paginationText(item.label) }}
        </Button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const isLoading = ref(false);
  const toast = useToast();
  const bulletins: any = ref({});
  const currentUrl = ref('');
  const category = ref(9);
  const router = useRouter();

  function getUrlParams(url: string, params: string | string[]) {
    let urlParams: URLSearchParams;
    try {
      urlParams = new URL(url).searchParams;
    } catch (error) {
      console.error(error);
      return null;
    }
    if (Array.isArray(params)) {
      const data: (string | null)[] = [];
      params.forEach(param => { data.push(urlParams.get(param)); });
      return data;
    } else {
      return urlParams.get(params);
    }
  }

  function paginationText(page: string | number) {
    if (!isNaN(Number(page))) {
      return page;
    } else if (page === 'pagination.previous') {
      return '❮';
    } else {
      return '❯';
    }
  }

  async function getData(url = `4/bulletin-game/36`) {
    isLoading.value = true;
    currentUrl.value = url;
    const page = getUrlParams(url, 'page');
    if (page) {
      url = `4/bulletin-game/36?page=${page}`;
    }
    // bulletins
    {
      try {
        const response = await fetch(`https://athletics.nsysu.dev/sepserver/api/${url}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        bulletins.value = data;
      } catch (error) {
        toast.add({ severity: 'error', summary: '取得公告資料失敗', life: 5000 });
        console.error('Fetch error:', error);
      }
    }
    isLoading.value = false;
  }

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

  setTimeout(() => {
    getData();
  }, 0);
</script>

<style scoped>
  .category {
    @apply p-1 text-white w-24 text-center;
  }

  tbody:nth-child(odd) {
    @apply bg-gray-50;
  }

  tr {
    @apply hover:bg-red-50 duration-150 cursor-pointer;
  }

  td {
    @apply p-2;
  }
</style>