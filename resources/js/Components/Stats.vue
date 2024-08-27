<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Stats } from "@/types";
import { cva } from "cva";
import { useAttrs } from "vue";

const iconVariants = cva("col-span-2 mx-auto h-9 w-9 rounded p-1", {
    variants: {
        variant: {
            default: "bg-cotton-boll text-feather-star",
            blanche: "bg-carte-blanche text-hera-blue",
            amber: "bg-sand-crystal text-amber-brew",
            success: "bg-placebo-green text-lightish-green",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

defineProps<
    Stats & {
        variant: "default" | "blanche" | "amber" | "success" | null | undefined;
    }
>();

const className = (useAttrs().class as string) || "";
</script>

<template>
    <div
        class="flex flex-col items-center gap-y-0 sm:grid sm:grid-cols-2 sm:gap-y-8 sm:px-5 sm:first-of-type:pl-0 sm:last-of-type:pr-0 lg:flex lg:gap-y-0 xl:grid xl:gap-y-8"
    >
        <component
            :is="icon"
            :class="cn(iconVariants({ variant, className }))"
        />

        <span
            class="mt-2 text-base font-semibold text-[color:#5D6679] sm:mt-0 lg:mt-2 xl:mt-0"
        >
            {{ data }}
        </span>
        <span class="text-right text-sm font-medium text-[color:#667085]">
            {{ name }}
        </span>
    </div>
</template>
