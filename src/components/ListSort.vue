<script setup lang="ts">
import { sentenceCase } from "change-case";
import { useStore } from "@/store";
import { SortingKeys, SortingOrders } from "@/utils/sort";

const { sort } = useStore();
const { order, key } = sort;
</script>
<template>
  <div class="container mx-auto flex items-center gap-8 px-8 text-neutral-800 md:justify-end">
    <div>
      <label for="sort" class="mb-2 inline-block">Sort by</label>
      <select id="sort" v-model="key">
        <option v-for="sort in SortingKeys" :value="sort" :key="sort">{{ sentenceCase(sort) }}</option>
      </select>
    </div>

    <div>
      <label for="order" class="mb-2 inline-block">Order</label>
      <select id="order" v-model="order">
        <option v-for="order in SortingOrders" :value="order" :key="order">{{ sentenceCase(order) }}</option>
      </select>
    </div>
  </div>
</template>
