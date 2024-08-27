<script setup lang="ts">
import { Stats as TStats } from "@/types";
import Stats from "./Stats.vue";

defineProps<{
    overviewName: string;
    overviewStats: TStats[];
}>();
</script>

<template>
    <h2>{{ overviewName }}</h2>

    <div
        class="grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-4 sm:gap-x-0 sm:divide-x"
    >
        <Stats
            v-for="(stats, index) in overviewStats"
            :key="index"
            :icon="stats.icon"
            :data="stats.data"
            :name="stats.name"
            variant="success"
        />
    </div>
</template>
