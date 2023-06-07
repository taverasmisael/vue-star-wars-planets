<script setup lang="ts">
import { headerCase, constantCase } from "change-case";
import { useStore } from "@/store";
import { SortingKeys, SortingOrders } from "@/utils/sort";

const { sort } = useStore();
const { order, key } = sort;
</script>
<template>
  <div>
    <label for="sort">Sort by:</label>
    <select id="sort" v-model="key">
      <option v-for="sort in SortingKeys" :value="sort" :key="sort">{{ headerCase(sort) }}</option>
    </select>

    <label for="order">Order:</label>
    <select id="order" v-model="order">
      <option v-for="order in SortingOrders" :value="order" :key="order">{{ constantCase(order) }}</option>
    </select>
  </div>
</template>
