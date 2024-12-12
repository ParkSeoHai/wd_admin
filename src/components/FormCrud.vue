<script setup>
import _ from "lodash";
import { nextTick, onMounted, ref } from "vue";
import Button from "./Button.vue";
import { addOrUpdateDocument, getDocById, getParamsPage } from "../utils";

const loadingAnimation = ref(true);

const props = defineProps({
  collection: { type: String, default: "" },
  crud: { type: Array, default: [] },
  actions: { type: Array, default: [] },
});

const emits = defineEmits(["doActions"]);

// init form crud
const initFormCrud = async () => {
  const { id } = getParamsPage(["id"]);
  if (!id) {
    props.actions[0].show = true;
  } else {
    for (const action of props.actions.slice(1, props.actions.length)) {
      action.show = true;
    }
    // get data by id
    const data = await getDocById({ collection: props.collection, id });
    for (const item of props.crud) {
      if (data[item.field]) item.value = data[item.field];
    }
  }
};

// func get item props crud by field
const getItemCrudByField = (field) => {
  const itemIndexCrud = _.findIndex(props.crud, { field: field });
  if (itemIndexCrud === -1) throw Error("addRowArray ITEM NOT FOUND");
  return props.crud[itemIndexCrud];
};

// func toggle form crud type = array
const toggleFormCrud = (field, value = true) => {
  const itemCrud = getItemCrudByField(field);
  itemCrud.openCrud = value;
};

// func add row item type = array
const addRowArray = (field) => {
  nextTick(() => {
    const formElement = document.querySelector(".form-crud__custom--array .form-action");
    if (formElement) {
      const itemIndexCrud = _.findIndex(props.crud, { field: field });
      if (itemIndexCrud === -1) console.error(`addRowArray ITEM NOT FOUND`);
      // get item props crud
      const itemCrud = getItemCrudByField(field);
      // data form
      let data = {};
      for (const column of itemCrud?.columns) {
        const inputElement = formElement.querySelector(`.input__${column.field}`);
        data[column.field] = inputElement.value;
        inputElement.value = "";
      }
      itemCrud?.value?.push(data);
      itemCrud.openCrud = false;
    }
  });
};

// func convert file to base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

// func handle upload file
const uploadFile = async (event, field) => {
  try {
    // get item props crud
    const itemCrud = getItemCrudByField(field);
    const files = event.target.files;

    if (itemCrud.multiple === true) {
      console.log("CHUA LAM CHUC NANG");
    } else {
      const file = files[0];
      const result = await toBase64(file);
      itemCrud.value = result;
    }
  } catch (error) {
    console.error(error);
  }
};

// func action crud
const doActions = async ({ action, emit = false }) => {
  if (emit) {
    emits("doActions", action, props.crud);
  } else {
    if (action === "delete") {
      console.log("DELETE");
    } else {
      let object = {};
      for (const item of props.crud) {
        if (item.field) {
          //   if (item.type === "array") object[item.field] = item.rows;
          //   else object[item.field] = item.value;
          object[item.field] = item.value;
        }
      }
      const { id } = getParamsPage(["id"]);
      object.id = id;
      try {
        const result = await addOrUpdateDocument({
          collection: props.collection,
          data: object,
        });
        window.location = `${location.origin}${location.pathname}?id=${result.id}`;
      } catch (error) {
        console.error("ERROR addOrUpdateDocument", error);
      }
    }
  }
};

onMounted(async () => {
  await initFormCrud();
  loadingAnimation.value = false;
});
</script>
<template>
  <div :class="{ loading_animation: loadingAnimation }">
    <div class="form-crud__custom p-4">
      <template v-for="(item, index) in props.crud" :key="index">
        <template v-if="item.type === 'label'">
          <div class="form-crud__custom--label header_custom" :class="item.className">
            <p class="title_custom w-fit">
              <span class="icon"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-columns-gap"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"
                  /></svg
              ></span>
              {{ item.text }}
            </p>
          </div>
        </template>
        <template v-if="item.type === 'image'">
          <div class="form-crud__custom--image" :class="item.className">
            <label for="fileImage" class="cursor-pointer label">
              <img v-if="item.value" :src="item.value" class="image" />
              <div v-else class="label-input__img">
                <span class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    class="bi bi-file-earmark-arrow-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707z"
                    />
                    <path
                      d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"
                    />
                  </svg>
                </span>
                <span class="text">{{ item.text }}</span>
              </div>
            </label>
            <input
              type="file"
              id="fileImage"
              :multiple="item.multiple"
              class="hidden"
              @change="(event) => uploadFile(event, item.field)"
            />
          </div>
        </template>
        <template v-if="item.type === 'text'">
          <div class="form-crud__custom--text" :class="item.className">
            <label class="text"
              ><span>{{ item.text }}</span></label
            >
            <input
              type="text"
              v-model="item.value"
              class="input"
              :placeholder="item.text"
            />
          </div>
        </template>
        <template v-if="item.type === 'radio'">
          <div class="form-crud__custom--radio" :class="item.className">
            <p class="text">
              <span>{{ item.text }}</span>
            </p>
            <div class="list">
              <div v-for="(itemRadio, index) in item.values" :key="index" class="item">
                <input
                  :id="itemRadio.value"
                  type="radio"
                  :name="item.field"
                  class="radio"
                  :value="itemRadio.value"
                  :placeholder="item.text"
                  v-model="item.value"
                />
                <label :for="itemRadio.value" class="label"
                  ><span>{{ itemRadio.text }}</span></label
                >
              </div>
            </div>
          </div>
        </template>
        <template v-if="item.type === 'date'">
          <div class="form-crud__custom--date" :class="item.className">
            <label class="text"
              ><span>{{ item.text }}</span></label
            >
            <input
              type="date"
              v-model="item.value"
              class="input"
              :placeholder="item.text"
            />
          </div>
        </template>
        <template v-if="item.type === 'select'">
          <div class="form-crud__custom--select" :class="item.className">
            <label class="text"
              ><span>{{ item.text }}</span></label
            >
            <select class="input" v-model="item.value">
              <option
                v-for="(option, index) in item.options"
                :key="index"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
        </template>
        <template v-if="item.type === 'array'">
          <div class="form-crud__custom--array table-custom" :class="item.className">
            <div class="table-content">
              <div class="flex justify-end">
                <div v-if="item.openCrud" class="flex">
                  <Button @click.prevent="toggleFormCrud(item.field, false)" class="me-3">
                    <template #icon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-x-circle"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                        />
                        <path
                          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    </template>
                  </Button>
                  <Button
                    @click.prevent="addRowArray(item.field)"
                    class="btn-primary"
                    :text="'Lưu'"
                  />
                </div>
                <Button
                  v-else
                  class="btn-primary"
                  :text="'Thêm mới'"
                  @click.prevent="toggleFormCrud(item.field, true)"
                />
              </div>
              <form class="form-action" v-if="item.openCrud">
                <div
                  v-for="(column, index) in item.columns"
                  :key="index"
                  :class="column.className"
                >
                  <input
                    type="text"
                    class="input"
                    :class="`input__${column.field}`"
                    :placeholder="column.text"
                  />
                </div>
              </form>
              <table class="table w-full relative">
                <thead class="bg-white">
                  <tr>
                    <th scope="col" width="50px">STT</th>
                    <th scope="col" v-for="(column, index) in item.columns" :key="index">
                      {{ column.text }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in item.value" :key="index">
                    <td>{{ index + 1 }}</td>
                    <template v-for="(column, index) in item.columns" :key="index">
                      <td>{{ row[column.field] }}</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </template>
    </div>
    <div class="form-crud__custom--bottom">
      <template v-for="(action, index) in props.actions" :key="index">
        <button
          v-if="action.show"
          class="btn-base btn"
          :class="action.className"
          @click="doActions(action)"
        >
          {{ action.text }}
        </button>
      </template>
    </div>
  </div>
</template>
