<template>
  <div v-if="isLoaded">
    <div class="flex justify-between items-center">
      <div class="text-xl font-semibold">{{ paramsData.division_name_ch }} {{ paramsData.event_name_ch }}
        {{ paramsData.round === 1 ? '預賽' : '決賽' }}
      </div>
      <div>Q:{{ paramsData[`aq_${paramsData.round}`] }} q:{{ paramsData[`sq_${paramsData.round}`] }}</div>
    </div>
    <hr class="my-2">
    <DataTable
      :value="athleteData"
      sort-mode="multiple"
    >
      <Column
        :field="`heat_${route.params.round}`"
        header="組別"
        sortable
      />
      <Column
        :field="`lane_${route.params.round}`"
        header="道次"
        sortable
      />
      <Column
        field="unit_name_ch"
        header="單位"
      />
      <Column
        field="last_name_ch"
        header="姓名"
      >
        <template #body="slotProps">
          <span>{{ slotProps.data.bib }} {{ slotProps.data.last_name_ch }}{{ slotProps.data.first_name_ch }}</span>
        </template>
      </Column>
      <Column
        field="ref_result"
        header="參考成績"
      />
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
  const toast = useToast();
  const route = useRoute();
  const paramsData: Ref<any> = ref({});
  const athleteData: Ref<any[]> = ref([]);
  const isLoaded = ref(false);
  async function getData() {
    isLoaded.value = false;
    {
      const { data, error }: { data: any, error: any; } = await useRequest(`game-data/1/athl/params-with-division-event/${route.params.divisionId}/${route.params.eventId}`, null, 'GET');
      if (error) {
        toast.add({ severity: 'error', summary: '取得參數資料失敗', life: 5000 });
        return;
      }
      if (data) {
        paramsData.value = data;
      }
    }
    {
      const { data, error }: { data: any, error: any; } = await useRequest(`game-data/1/athl/individual-by-division-event/${route.params.divisionId}/${route.params.eventId}`, null, 'GET');
      if (error) {
        toast.add({ severity: 'error', summary: '取得選手資料失敗', life: 5000 });
        return;
      }
      if (data) {
        athleteData.value = data.sort((a: any, b: any) => {
          return a[`heat_${route.params.round}`] - b[`heat_${route.params.round}`] || a[`lane_${route.params.round}`] - b[`lane_${route.params.round}`];
        });
      }
    }
    isLoaded.value = true;
  }

  setTimeout(() => {
    getData();
  }, 0);
</script>

<style></style>