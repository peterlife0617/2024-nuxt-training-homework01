<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import { useScreens } from 'vue-screen-utils'

/*
起始日期 => 當前日期
結束日期 => 下一天
日期格式需要是  YYYY-MM-DD

const date = ref({
  start: ...,
  end: ...,
});
*/

const date = ref({
  start: getDateString(new Date()),
  end: getDateString(addDay(new Date(), 1)),
})

/*
調整日期的格式
const masks = {
 ...
};
*/

const masks = {
  title: '西元 YYYY 年 MM 月',
  modelValue: 'YYYY-MM-DD',
}

/*
  使用  vue-screen-utils 套件調整響應式設定

  const rows = mapCurrent( ... );
*/

const { mapCurrent } = useScreens({
  md: '768px',
})

const rows = 1
const columns = mapCurrent({
  md: 2,
}, 1)

const isExpanded = mapCurrent({
  md: false,
}, true)

const titlePosition = mapCurrent({
  md: 'left',
}, 'center')

const minDate = new Date()
const maxDate = addYear(new Date(), 1)
</script>

<template>
  <div class="container mt-5 date-picker">
    <ClientOnly>
      <!-- 加入 DatePicker 實作日期選取的功能  -->
      <!-- <DatePicker v-model.range.string="date"  /> -->

      <DatePicker
        v-model.range.string="date"
        :masks="masks"
        :columns="columns"
        :rows="rows"
        :expanded="isExpanded"
        :title-position="titlePosition"
        :min-date="minDate"
        :max-date="maxDate"
        color="custom-theme"
      />
    </ClientOnly>
    <div>
      {{ date }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.date-picker {
  // 使用 CSS 變數覆蓋 VCalendar 套件的預設樣式

  :deep(.vc-title) {
    background: none;
  }

  :deep(.vc-arrow) {
    background: none;
  }

  :deep(.vc-pane-layout) {
    gap: 60px;
  }

  :deep(.vc-custom-theme) {
    --vc-accent-50: #f0f9ff;
    --vc-accent-100: #e0f2fe;
    --vc-accent-200: #f9f9f9;
    --vc-accent-300: #7dd3fc;
    --vc-accent-400: #38bdf8;
    --vc-accent-500: #0ea5e9;
    --vc-accent-600: #000;
    --vc-accent-700: #0369a1;
    --vc-accent-800: #075985;
    --vc-accent-900: #0c4a6e;
  }
}
</style>
