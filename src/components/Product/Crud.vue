<script setup>
import _ from "lodash";
import { ref, watch } from "vue";
import FormCrud from "../FormCrud.vue";
import { getAllCategories, formatter, getDocById } from "../../utils";
import { toast } from "vue3-toastify";

const collection = "product";

const crudConfig = ref([
  {
    text: "Loại sản phẩm",
    className: "col-span-12",
    type: "label",
  },
  {
    field: "product_type",
    className: "col-span-12 product-type",
    values: [
      {
        text: "MobilePhone",
        icon: `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  class="bi bi-phone"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
                  />
                  <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" /></svg
              >`,
        value: "mobiles",
      },
      {
        text: "Tablet",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-tablet" viewBox="0 0 16 16">
                <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
              </svg>`,
        value: "tablets",
      },
      {
        text: "Laptop",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-laptop" viewBox="0 0 16 16">
                <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5"/>
              </svg>`,
        value: "laptops",
      },
      {
        text: "Sound",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-soundwave" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5m12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5"/>
              </svg>`,
        value: "sounds",
      },
      {
        text: "SmartWatch",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-smartwatch" viewBox="0 0 16 16">
                <path d="M9 5a.5.5 0 0 0-1 0v3H6a.5.5 0 0 0 0 1h2.5a.5.5 0 0 0 .5-.5z"/>
                <path d="M4 1.667v.383A2.5 2.5 0 0 0 2 4.5v7a2.5 2.5 0 0 0 2 2.45v.383C4 15.253 4.746 16 5.667 16h4.666c.92 0 1.667-.746 1.667-1.667v-.383a2.5 2.5 0 0 0 2-2.45V8h.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H14v-.5a2.5 2.5 0 0 0-2-2.45v-.383C12 .747 11.254 0 10.333 0H5.667C4.747 0 4 .746 4 1.667M4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3"/>
              </svg>`,
        value: "watches",
      },
      {
        text: "Accessory",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-usb-drive" viewBox="0 0 16 16">
                <path d="M6 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4H6zM7 1v1h1V1zm2 0v1h1V1zM6 5a1 1 0 0 0-1 1v8.5A1.5 1.5 0 0 0 6.5 16h4a1.5 1.5 0 0 0 1.5-1.5V6a1 1 0 0 0-1-1zm0 1h5v8.5a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5z"/>
              </svg>`,
        value: "accessories",
      },
    ],
    value: "mobiles",
    type: "radio",
  },
  {
    text: "Thông tin chi tiết",
    className: "col-span-12",
    type: "label",
  },
  {
    text: "Ảnh sản phẩm",
    multiple: false,
    className: "col-span-3 row-span-3",
    field: "product_thumbnail",
    value: "",
    type: "image",
  },
  {
    text: "Tên sản phẩm",
    field: "product_name",
    className: "col-span-5",
    value: "",
    type: "text",
  },
  {
    text: "URL sản phẩm",
    field: "product_url",
    className: "col-span-4",
    value: "",
    type: "text",
  },
  {
    text: "Số lượng",
    field: "product_quantity",
    className: "col-span-3",
    value: "",
    type: "number",
  },
  {
    text: "Thương hiệu",
    field: "brand_name",
    className: "col-span-3",
    options: [
      {
        value: "Apple",
        text: "Apple",
      },
      {
        value: "Sumsung",
        text: "Sumsung",
      },
    ],
    value: "Apple",
    type: "select",
  },
  {
    text: "Danh mục",
    field: "category_id",
    className: "col-span-3",
    options: [],
    type: "select",
  },
  {
    text: "Giá bán",
    field: "product_price",
    className: "col-span-3",
    value: "",
    type: "number",
  },
  {
    text: "Giảm giá",
    field: "product_discount",
    className: "col-span-3",
    value: "",
    type: "number",
  },
  {
    text: "Giá bán thực tế",
    field: "product_price_sale",
    className: "col-span-3",
    value: "",
    disabled: true,
    type: "text",
  },
  {
    text: "",
    multiple: false,
    className: "col-span-12",
    field: "product_gallery",
    styleImg: "width: 60px; height: 60px;",
    multiple: true,
    hideText: true,
    value: [],
    type: "image-multiple",
  },
  {
    text: "Danh sách tùy chọn",
    className: "col-span-12",
    type: "label",
  },
  {
    field: "product_options",
    className: "col-span-12",
    columns: [
      {
        text: "Hình ảnh",
        className: "col-span-2 row-span-2",
        field: "option_image",
        style: "height: 100%;",
        multiple: false,
        hideText: true,
        value: "",
        type: "image",
      },
      {
        text: "Tên tùy chọn",
        className: "col-span-2 h-full",
        field: "option_name",
        options: [
          {
            text: "Màu sắc",
            value: "Màu sắc",
          },
        ],
        type: "select",
      },
      {
        text: "Giá trị tùy chọn",
        className: "col-span-2",
        field: "option_value",
        type: "text",
      },
      {
        text: "Giá bán cộng thêm",
        className: "col-span-2",
        field: "price_adjustment",
        type: "number",
      },
      {
        text: "Số lượng có sẵn",
        className: "col-span-2",
        field: "stock",
        type: "number",
      },
    ],
    value: [],
    openCrud: false,
    type: "array",
  },
  {
    text: "Danh sách thuộc tính",
    className: "col-span-12",
    type: "label",
  },
  {
    field: "product_attributes",
    className: "col-span-12",
    columns: [
      {
        text: "Loại thuộc tính",
        className: "col-span-4 h-full",
        field: "attribute_type",
        options: [
          {
            text: "Màn hình",
            value: "Màn hình",
          },
          {
            text: "Camera sau",
            value: "Camera sau",
          },
          {
            text: "Vi xử lý & đồ họa",
            value: "Vi xử lý & đồ họa",
          },
        ],
        type: "select",
      },
      {
        text: "Tên thuộc tính",
        className: "col-span-4",
        field: "attribute_name",
        type: "text",
      },
      {
        text: "Giá trị thuộc tính",
        className: "col-span-4",
        field: "attribute_value",
        type: "text",
      },
    ],
    value: [],
    openCrud: false,
    type: "array",
  },
  {
    text: "Mô tả sản phẩm",
    className: "col-span-12",
    type: "label",
  },
]);

const initFormCrud = async (id) => {
  try {
    // get category
    const itemIndexCrud = _.findIndex(crudConfig.value, { field: "category_id" });
    if (itemIndexCrud !== -1) {
      const itemCrud = crudConfig.value[itemIndexCrud];
      const categories = await getAllCategories({ collection: "category" });
      categories.metadata?.forEach((category) => {
        itemCrud.options.push({
          text: category.category_name,
          value: category._id,
        });
      });
    }
    if (id) {
      // get data by id
      try {
        const data = await getDocById({ collection, id });
        for (const item of crudConfig.value) {
          if (data[item.field]) item.value = data[item.field];
        }
        console.log(data);
      } catch (error) {
        console.error("ERROR initFormCrud", error);
        toast.error(error.response.data.message);
      }
    }
  } catch (error) {
    console.error("ERROR initFormCrud", error.response);
    toast.error(error.response.data.message);
  }
};

watch(crudConfig.value, () => {
  // set url
  const itemIndexUrlCrud = _.findIndex(crudConfig.value, { field: "product_url" });
  const itemIndexNameCrud = _.findIndex(crudConfig.value, { field: "product_name" });
  crudConfig.value[itemIndexUrlCrud].value = convertToSlug(
    crudConfig.value[itemIndexNameCrud].value
  );
  // set price sale
  const itemIndexPriceCrud = _.findIndex(crudConfig.value, { field: "product_price" });
  const itemIndexDiscountCrud = _.findIndex(crudConfig.value, {
    field: "product_discount",
  });
  const itemIndexPriceSaleCrud = _.findIndex(crudConfig.value, {
    field: "product_price_sale",
  });
  crudConfig.value[itemIndexPriceSaleCrud].value = calculateFinalPrice(
    crudConfig.value[itemIndexPriceCrud].value,
    crudConfig.value[itemIndexDiscountCrud].value
  );
});

function calculateFinalPrice(originalPrice, discountPercentage) {
  if (originalPrice < 0 || discountPercentage < 0 || discountPercentage > 100) {
    toast.error(
      "Dữ liệu không hợp lệ: Giá gốc phải >= 0 và phần trăm giảm giá trong khoảng 0-100."
    );
  }
  const discountAmount = (originalPrice * discountPercentage) / 100;
  return `${formatter(originalPrice - discountAmount)}`;
}

function removeVietnameseTones(str) {
  return str
    .normalize("NFD") // Tách các dấu ra khỏi ký tự
    .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
    .replace(/đ/g, "d") // Thay chữ đ thành d
    .replace(/Đ/g, "d") // Thay chữ Đ thành d
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Xóa các ký tự đặc biệt
    .trim(); // Xóa khoảng trắng ở đầu và cuối
}

function convertToSlug(text) {
  return removeVietnameseTones(text)
    .toLowerCase() // Chuyển thành chữ thường
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, "-") // Xóa dấu gạch ngang liên tiếp
    .trim(); // Xóa khoảng trắng thừa
}
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
    <FormCrud
      :crud="crudConfig"
      :collection="collection"
      :init-form-custom="true"
      @init-form-crud="initFormCrud"
    />
  </div>
</template>

<style>
.form-crud__custom--radio.product-type .item {
  max-width: 150px;
}

.form-crud__custom--radio.product-type .radio {
  display: none;
}

.form-crud__custom--radio.product-type .label {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px;
  border-radius: 4px;
  height: 100%;
  background-color: #f8f8f8;
  border: 1px solid #e6e6e6;
  cursor: pointer;
}

.form-crud__custom--radio.product-type .label.active,
.form-crud__custom--radio.product-type .label:hover {
  border: 1px solid var(--color-primary);
  box-shadow: inset 0px 0px 2px 1px var(--color-primary);
  color: var(--color-primary);
}

.form-crud__custom--radio.product-type .label .text {
  line-height: 18px;
  max-width: 100px;
}
</style>
