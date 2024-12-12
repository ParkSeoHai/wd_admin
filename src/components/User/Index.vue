<script setup>
import AggregateFilter from "../AggregateFilter.vue";
import Table from "../Table.vue";

const collection = "user";
const table = {
  columns: [
    {
      text: "Tên người dùng",
      field: "name",
      type: "text",
    },
    {
      text: "Email",
      field: "email",
      type: "text",
    },
    {
      text: "Số điện thoại",
      field: "phone_number",
      type: "text",
    },
    {
      text: "Giới tính",
      field: "gender",
      type: "gender",
    },
    {
      text: "Quyền",
      field: "role",
      type: "text",
    },
  ],
  search: ["email", "name"],
  size: 15,
};
</script>

<template>
  <!-- <div id="b1">
    <AggregateFilter />
  </div> -->
  <div id="b2">
    <Table :title="'Danh sách người dùng'" :colection="collection" :table="table" />
  </div>
</template>
