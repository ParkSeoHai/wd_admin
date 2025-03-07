<script setup>
import { onMounted, ref } from "vue";
import _ from "lodash";
import { toast } from "vue3-toastify";
import Button from "./Button.vue";
import { getDataTable, formatter } from "../utils";

const loadingAnimation = ref(true);
const searchStr = ref("");

const props = defineProps({
  title: { type: String, default: "Title" },
  colection: { type: String, default: "" },
  table: { type: Object, default: {} },
});

// get data by collection and columns
const dataTable = ref([]);
const optionsTable = ref();

const getParamsPage = () => {
  const url = new URL(window.location);
  let page = 1;
  if (url.searchParams.get("p")) page = Number(url.searchParams.get("p"));
  return {
    page,
    search: url.searchParams.get("search"),
  };
};

const initTable = async () => {
  try {
    const param = getParamsPage();
    let searchQuery = {
      $or: [],
    };
    if (param.search) {
      searchStr.value = param.search;
      props.table.search?.map((item) => {
        searchQuery.$or.push({ [item]: { $regex: param.search, $options: "i" } });
      });
    }
    let page = param.page;
    if (page < 1) page = 1;
    // get data
    const { msg, data, options } = await getDataTable({
      collection: props.colection,
      columns: props.table.columns,
      page,
      searchQuery,
    });
    dataTable.value = data;
    optionsTable.value = options;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

const searchAction = () => {
  let url = new URL(window.location);
  url.searchParams.delete("p");
  url.searchParams.delete("search");
  url.searchParams.append("search", searchStr.value);
  window.location = url.href;
};

const crudAction = (id = null) => {
  let url = `${window.location.origin}${window.location.pathname}/crud`;
  if (id) url += `?id=${id}`;
  console.log(url);
  window.location = url;
};

const handlePage = (value) => {
  let newPage = optionsTable.value?.page + value;
  location.href = `?p=${newPage}`;
};

onMounted(async () => {
  await initTable();
  loadingAnimation.value = false;
});
</script>

<template>
  <div class="table-custom" :class="{ loading_animation: loadingAnimation }">
    <div class="header_custom">
      <div class="table-header__title flex items-center">
        <p class="font-semibold text-white title_custom w-fit">
          {{ props.title }} - Tổng số: <span>{{ optionsTable?.totalSize }}</span>
        </p>
        <div class="table-header__search flex items-center">
          <input
            type="text"
            class="table-header__search--input"
            placeholder="Tìm kiếm theo từ khóa"
            v-model.trim="searchStr"
            @keyup.enter="searchAction"
          />
          <Button class="btn-primary absolute right-0" @click.prevent="searchAction">
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                />
              </svg>
            </template>
          </Button>
        </div>
        <Button
          class="btn-primary rounded ms-2"
          :text="'Thêm'"
          @click.prevent="crudAction(null)"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
          </template>
        </Button>
      </div>
    </div>
    <div class="table-content">
      <table class="table w-full relative">
        <thead class="bg-white">
          <tr>
            <th scope="col" width="50px">STT</th>
            <template v-for="(item, index) in table.columns" :key="index">
              <th scope="col">
                {{ item.text }}
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in dataTable"
            :key="index"
            class="cursor-pointer hover:bg-[#166e6a]/10"
            @click.prevent="crudAction(item._id)"
          >
            <td>{{ index + 1 }}</td>
            <template v-for="(key, index) in table.columns" :key="index">
              <td :class="key.type">
                <img v-if="key.type === 'image'" :src="item[key.field]" />
                <span v-else-if="key.type === 'price'">{{
                  formatter(item[key.field])
                }}</span>
                <span v-else-if="key.type === 'gender'">
                  <span v-if="item[key.field] === 0"> {{ "Nam" }}</span>
                  <span v-if="item[key.field] === 1"> {{ "Nữ" }}</span>
                </span>
                <span v-else>{{ item[key.field] }}</span>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-pagging flex items-center justify-between">
      <div class="table-pagging__left flex items-center">
        <button
          class="p-4"
          :class="{ disabled: optionsTable?.page === 1 }"
          @click="handlePage(-1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </button>
        <span class="text-[14px] mx-4"
          >Trang {{ optionsTable?.page }} /
          {{ _.ceil(optionsTable?.totalSize / optionsTable?.size) }}</span
        >
        <button
          class="p-4"
          :class="{
            disabled:
              optionsTable?.page === _.ceil(optionsTable?.totalSize / optionsTable?.size),
          }"
          @click="handlePage(1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </button>
      </div>
      <div class="table-pagging__right text-[14px]">
        <p>Hiển thị {{ optionsTable?.size }}</p>
      </div>
    </div>
  </div>
</template>
