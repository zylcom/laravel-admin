<script setup lang="ts">
import Summary from "./Summary.vue";

defineProps<{ title: string }>();
</script>

<template>
    <div>
        <h2>{{ title }}</h2>

        <div class="flex [&_div]:flex [&_div]:flex-col [&_div]:items-center">
            <Summary class="basis-1/2" />
            <Summary class="basis-1/2" />
        </div>
    </div>
</template>
