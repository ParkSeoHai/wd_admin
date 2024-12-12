<script setup></script>

<template>
  <div class="aggregate-filter">
    <div class="aggs-item">
      <div class="header_custom">
        <p class="font-semibold text-white title_custom w-fit">Loại sản phẩm</p>
      </div>
      <ul class="aggs-list bg-white">
        <li class="aggs-list__item flex items-center">
          <input id="agg1" type="checkbox" />
          <label
            for="agg1"
            class="flex items-center justify-between w-full ms-4 cursor-pointer py-2"
          >
            <span>Mobile</span>
            <span class="aggs-list__item--number">2</span>
          </label>
        </li>
        <li class="aggs-list__item flex items-center">
          <input id="agg2" type="checkbox" />
          <label
            for="agg2"
            class="flex items-center justify-between w-full ms-4 cursor-pointer py-2"
          >
            <span>Tablet</span>
            <span class="aggs-list__item--number">2</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
