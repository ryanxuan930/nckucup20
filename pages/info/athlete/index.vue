<template>
  <div>
    <CommonTitle title="選手編配" />
    <DataTable :value="schedules">
      <Column
        field="scheduled_time"
        header="時間"
      >
        <template #body="slot">
          <span>{{ slot.data.scheduled_time.slice(0, 16) }}</span>
        </template>
      </Column>
      <Column
        field="division_name_ch"
        header="組別"
      />
      <Column
        field="event_name_ch"
        header="項目"
      />
      <Column
        field="round"
        header="賽別"
      >
        <template #body="slotProps">
          <span>{{ slotProps.data.round === 1 ? '預賽' : '決賽' }}</span>
        </template>
      </Column>
      <Column header="操作">
        <template #body="slotProps">
          <Button
            label="選手編配"
            text
            @click="router.push(`/info/athlete/${slotProps.data.division_id}/${slotProps.data.event_id}/${slotProps.data.round}`)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
  const toast = useToast();
  const router = useRouter();
  const schedules: Ref<any[]> = ref([]);
  async function getData() {
    {
      const { data, error }: { data: any, error: any; } = await useRequest(`game-data/1/athl/schedule`, null, 'GET');
      if (error) {
        toast.add({ severity: 'error', summary: '取得參數資料失敗', life: 5000 });
        return;
      }
      if (data) {
        schedules.value = data;
      }
    }
  }

  setTimeout(() => {
    getData();
  }, 0);
</script>

<style></style>