<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps<{
    href: string;
    active?: boolean;
    icon?: Function
}>();

const classes = computed(() =>
    props.active
        ? 'text-[color:#1570EF]'
        : 'text-[color:#5D6679] hover:text-[color:#1570EF]'
);

</script>

<template>
    <Link :href="href"
        class="focus:outline-none transition duration-150 ease-in-out px-1 pt-1 text-sm font-medium leading-5 flex items-center gap-x-4"
        :class="classes">
    <component :is="icon" class='h-5 w-5' />

    <slot />
    </Link>
</template>
