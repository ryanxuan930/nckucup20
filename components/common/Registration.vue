<template>
  <div>
    <DataTable
      :value="dataList"
      :loading="!isLoaded"
      sort-mode="multiple"
    >
      <Column
        field="unit_name_full_ch"
        header="名稱"
      />
      <Column
        field="ind_checked"
        header="個人報名表"
        class="w-28"
      >
        <template #body="slotProps">
          <div class="flex justify-center items-center">
            <Tag
              v-if="slotProps.data.ind_checked"
              value="已繳交"
              severity="success"
            />
            <Tag
              v-else
              value="未繳交"
              severity="danger"
            />
          </div>
        </template>
      </Column>
      <Column
        field="grp_checked"
        header="團體報名表"
        class="w-28"
      >
        <template #body="slotProps">
          <div class="flex justify-center items-center">
            <Tag
              v-if="slotProps.data.grp_checked"
              value="已繳交"
              severity="success"
            />
            <Tag
              v-else-if="slotProps.data.type == 'individual'"
              value="不適用"
              severity="info"
            />
            <Tag
              v-else
              value="未繳交"
              severity="danger"
            />
          </div>
        </template>
      </Column>
      <Column
        field="fee_checked"
        header="繳費狀態"
        class="w-28"
      >
        <template #body="slotProps">
          <div class="flex justify-center items-center">
            <Tag
              v-if="slotProps.data.fee_checked"
              value="已繳費"
              severity="success"
            />
            <Tag
              v-else
              value="未繳費"
              severity="danger"
            />
          </div>
        </template>
      </Column>
      <Column
        field="status"
        header="狀態"
      >
        <template #body="slotProps">
          <div>
            {{ statusList.find((status) => status.value === slotProps.data.status)?.label }}
          </div>
        </template>
      </Column>
      <Column
        field="status_note"
        header="備註"
      >
        <template #body="slotProps">
          <div>
            {{ slotProps.data.status_note }}
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
  const isLoaded = ref(false);
  const dataList = ref([]);
  const statusList: Ref<{ label: string, value: number; }[]> = ref([
    {
      label: '■ 報名中',
      value: 0,
    },
    {
      label: '✓ 已繳費',
      value: 1,
    },
    {
      label: '▲ 審核中',
      value: 2,
    },
    {
      label: '● 報名完成',
      value: 3,
    },
    {
      label: '✕ 報名失敗',
      value: 4,
    }
  ]);
  const optionFeePrototype = {
    checked: false,
    fee_diff: 0,
    timestamp: '',
  };

  const optionFormPrototype = {
    registrationForm: [
      {
        index: 0,
        checked: false,
      },
      {
        index: 1,
        checked: false,
      },
      {
        index: 2,
        checked: false,
      }
    ],
    customizedForm: [],
  };
  async function getData() {
    isLoaded.value = false;
    const { data, error }: { data: any, error: any; } = await useFetch('https://athletix.technsport.co/registration-server/api/game-data-code/nckucup20/unit', {
      method: 'GET',
    });
    if (error.value) {
      console.log(error.value);
      return;
    }
    if (data.value) {
      dataList.value = data.value.map((item: any) => {

        if (!item.options.feeCheck) {
          item.options.feeCheck = JSON.parse(JSON.stringify(optionFeePrototype));
        }
        if (!item.options.formCheck) {
          item.options.formCheck = JSON.parse(JSON.stringify(optionFormPrototype));
        }
        return {
          id: item.id,
          unit_name_full_ch: item.unit_name_full_ch,
          type: item.type,
          ind_checked: item.options.formCheck.registrationForm[0].checked,
          grp_checked: item.options.formCheck.registrationForm[1].checked,
          fee_checked: item.options.feeCheck.checked,
          options: item.options,
          status: item.status,
          status_note: item.status_note,
        };
      }).slice(1);
    }
    isLoaded.value = true;
  }
  setTimeout(() => {
    getData();
  }, 0);
</script>

<style></style>