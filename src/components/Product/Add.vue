<script setup>
import { ref } from "vue";
import FormCrud from "../FormCrud.vue";

const collection = "product";

// actions crud
const actions = ref([
  {
    text: "Lưu",
    className: "btn-primary",
    action: "add",
    emit: false,
    show: false,
  },
  {
    text: "Cập nhật",
    className: "btn-primary",
    action: "update",
    emit: false,
    show: false,
  },
  {
    text: "Xóa",
    className: "btn-danger",
    action: "delete",
    emit: false,
    show: false,
  },
]);

const crudConfig = ref([
  {
    text: "Thông tin người dùng",
    className: "col-span-12",
    type: "label",
  },
  {
    text: "Ảnh đại diện",
    multiple: false,
    className: "col-span-3 row-span-4",
    field: "avatar",
    value: "",
    type: "image",
  },
  {
    text: "Họ và tên",
    field: "name",
    className: "col-span-3",
    value: "",
    type: "text",
  },
  {
    text: "Email",
    className: "col-span-3",
    field: "email",
    value: "",
    type: "text",
  },
  {
    text: "Số điện thoại",
    field: "phone_number",
    className: "col-span-3",
    value: "",
    type: "text",
  },
  {
    text: "Giới tính",
    field: "gender",
    className: "col-span-3",
    values: [
      {
        value: 0,
        text: "Nam",
      },
      {
        value: 1,
        text: "Nữ",
      },
    ],
    value: 0,
    type: "radio",
  },
  {
    text: "Ngày sinh",
    field: "birthday",
    className: "col-span-3",
    value: "",
    type: "date",
  },
  {
    text: "Quyền sử dụng",
    field: "role",
    className: "col-span-3",
    options: [
      {
        value: "customer",
        text: "Khách hàng",
      },
      {
        value: "admin",
        text: "Quản trị",
      },
    ],
    value: "customer",
    type: "select",
  },
  {
    text: "Địa chỉ người dùng",
    className: "col-span-12",
    type: "label",
  },
  {
    text: "Địa chỉ",
    field: "address",
    className: "col-span-12",
    columns: [
      {
        text: "Họ và tên",
        className: "col-span-3",
        field: "name",
      },
      {
        text: "Số điện thoại",
        className: "col-span-3",
        field: "phone_number",
      },
      {
        text: "Thành phố",
        className: "col-span-3",
        field: "city",
      },
      {
        text: "Quận huyện",
        className: "col-span-3",
        field: "quan_huyen",
      },
      {
        text: "Xã phường",
        className: "col-span-3",
        field: "xa_phuong",
      },
      {
        text: "Địa chỉ chi tiết",
        className: "col-span-9",
        field: "detail",
      },
    ],
    value: [],
    openCrud: false,
    type: "array",
  },
]);
</script>
<template>
  <div id="b1">
    <div class="p-4 ps-0">
      <div class="header_custom">
        <p class="font-semibold text-white title_custom w-fit">Thông tin chung</p>
      </div>
    </div>
  </div>
  <div id="b2">
    <FormCrud :crud="crudConfig" :collection="collection" :actions="actions" />
  </div>
</template>
