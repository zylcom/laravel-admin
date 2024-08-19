<script setup lang="ts">
import { computed, ref } from "vue";
import {
    Bolt,
    Boxes,
    CircleUserRound,
    Ellipsis,
    LayoutDashboard,
    ListChecks,
    LogOut,
    Package,
    SquareKanban,
} from "lucide-vue-next";
import NavLink from "@/Components/NavLink.vue";
import { useMediaQuery } from "@/composables/mediaQuery";

const isMediumScreen = useMediaQuery("(min-width: 768px)");
const isLargeScreen = useMediaQuery("(min-width: 1024px)");
const isSmallScreen = useMediaQuery("(max-width: 640px)");

const isMenuOpen = ref<boolean>(false);
</script>

<template>
    <div
        class="min-h-screen bg-[#F0F1F3] lg:grid lg:grid-cols-[280px,1fr] lg:grid-rows-[74px,1fr]"
    >
        <aside
            class="fixed bottom-0 left-0 w-full bg-white px-6 py-2 lg:relative lg:row-span-2"
        >
            <div
                class="flex w-full flex-wrap justify-between lg:fixed lg:left-0 lg:top-0 lg:max-h-[960px] lg:w-[280px] lg:flex-col lg:flex-nowrap lg:gap-y-8 lg:overflow-auto lg:p-6"
            >
                <div class="hidden p-1 lg:block">Invtry</div>

                <NavLink
                    href="/dashboard"
                    :icon="LayoutDashboard"
                    :class="!isLargeScreen && 'flex-col gap-y-2 text-xs'"
                    :active="route().current('dashboard')"
                >
                    Dashboard
                </NavLink>

                <NavLink
                    href="/inventories"
                    :icon="Boxes"
                    :class="!isLargeScreen && 'flex-col gap-y-2 text-xs'"
                    :active="route().current('inventories')"
                >
                    Inventory
                </NavLink>

                <NavLink
                    href="/reports"
                    :icon="SquareKanban"
                    :class="{
                        hidden: isSmallScreen,
                        'flex-col gap-y-2 text-xs': !isLargeScreen,
                    }"
                    :active="route().current('reports')"
                >
                    Report
                </NavLink>

                <NavLink
                    href="/suppliers"
                    :icon="CircleUserRound"
                    :class="{
                        hidden: isSmallScreen,
                        'flex-col gap-y-2 text-xs': !isLargeScreen,
                    }"
                    :active="route().current('suppliers')"
                >
                    Supplier
                </NavLink>

                <NavLink
                    href="/orders"
                    :icon="Package"
                    :class="{
                        hidden: isSmallScreen,
                        'flex-col gap-y-2 text-xs': !isLargeScreen,
                    }"
                    :active="route().current('orders')"
                >
                    Order
                </NavLink>

                <NavLink
                    href="/stores"
                    :icon="ListChecks"
                    :class="{
                        hidden: isSmallScreen,
                        'flex-col gap-y-2 text-xs': !isLargeScreen,
                    }"
                    :active="route().current('stores')"
                >
                    Manage Store
                </NavLink>

                <button
                    class="flex flex-col items-center justify-between gap-x-4 px-1 pt-1 text-xs font-medium leading-5 transition duration-150 ease-in-out focus:outline-none sm:hidden"
                    :class="
                        isMenuOpen
                            ? 'text-[color:#1570EF]'
                            : 'text-[color:#5D6679] hover:text-[color:#1570EF]'
                    "
                    @click="isMenuOpen = !isMenuOpen"
                >
                    <Ellipsis class="h-5 w-5" />

                    More
                </button>
            </div>

            <Transition
                enter-from-class="scale-0 opacity-0"
                enter-active-class="transition-all duration-300 ease-out"
                enter-to-class="scale-1 opacity-100"
                leave-from-class="scale-1 opacity-100"
                leave-active-class="transition-all duration-300 ease-out"
                leave-to-class="scale-0 opacity-0"
            >
                <div
                    class="fixed bottom-20 right-5 max-h-40 overflow-auto rounded bg-white shadow-md"
                    v-if="isMenuOpen && isSmallScreen"
                >
                    <div class="flex w-full flex-col gap-y-3 p-3">
                        <NavLink href="/reports" :icon="SquareKanban">
                            Reports
                        </NavLink>

                        <NavLink href="/suppliers" :icon="CircleUserRound">
                            Suppliers
                        </NavLink>

                        <NavLink href="/orders" :icon="Package">Orders</NavLink>

                        <NavLink href="/stores" :icon="ListChecks">
                            Manage Store
                        </NavLink>
                    </div>
                </div>
            </Transition>
        </aside>

        <header class="w-full bg-white p-6">
            <nav class="flex items-center justify-between">
                <div>search bar</div>
                <div>notif user</div>
            </nav>
        </header>

        <main class="px-8 py-6">
            <slot />
        </main>
    </div>
</template>
