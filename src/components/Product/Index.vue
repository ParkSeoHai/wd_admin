<script setup>
import AggregateFilter from "../AggregateFilter.vue";
import Table from "../Table.vue";

const collection = "product";
const table = {
  columns: [
    {
      text: "Hình ảnh",
      field: "product_thumb",
      type: "image",
    },
    {
      text: "Tên sản phẩm",
      field: "product_name",
      type: "text",
    },
    {
      text: "Giá bán",
      field: "product_price",
      type: "price",
    },
    {
      text: "Số lượng",
      field: "product_quantity",
      type: "number",
    },
    {
      text: "Giảm giá",
      field: "product_discount",
      type: "number",
    },
    {
      text: "Trạng thái",
      field: "publish",
      type: "text",
    },
  ],
  search: ["product_name"],
  size: 15,
};
</script>

<template>
  <div id="b1">
    <AggregateFilter />
  </div>
  <div id="b2">
    <Table :title="'Danh sách sản phẩm'" :colection="collection" :table="table" />
  </div>
</template>
