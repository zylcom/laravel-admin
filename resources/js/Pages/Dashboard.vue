<script setup lang="ts">
import { ref } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {
    ArrowUpDown,
    ChartNoAxesCombined,
    CircleDollarSign,
    Coins,
    HandCoins,
} from "lucide-vue-next";
import { Head, usePage } from "@inertiajs/vue3";
import {
    useVueTable,
    createColumnHelper,
    getCoreRowModel,
    SortingState,
    getSortedRowModel,
    FlexRender,
} from "@tanstack/vue-table";
import NavLink from "@/Components/NavLink.vue";
import type { Product } from "@/types";

const props = defineProps<{
    popularProducts: Product[];
    lowStockProducts: Product[];
}>();

const options = ref({
    chart: { id: "example" },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
});

const lineChartOptions = ref({
    chart: {
        id: "example",
        type: "line",
    },
    stroke: { curve: "smooth" },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
});

const series = ref([
    { name: "series-1", data: [30, 40, 45, 50, 49, 60, 70, 91] },
]);

const columnHelper = createColumnHelper<Product>();
const popularProductColumns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "stock", header: "Stock" },
    { accessorKey: "sold", header: "Sold" },
    { accessorKey: "price", header: "Price" },
];
const sorting = ref<SortingState>([{ id: "sold", desc: true }]);

const popularData = ref<Product>(props.popularProducts);

const popularProductTable = useVueTable({
    columns: popularProductColumns,
    data: popularData,
    getCoreRowModel: getCoreRowModel(),
    state: {
        get sorting() {
            return sorting.value;
        },
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value =
            typeof updaterOrValue === "function"
                ? updaterOrValue(sorting.value)
                : updaterOrValue;
    },
    getSortedRowModel: getSortedRowModel(),
});
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div
            class="grid grid-cols-1 gap-6 lg:grid-cols-6 [&>div]:rounded-lg [&_div_h2]:mb-6 [&_div_h2]:text-xl [&_div_h2]:font-medium"
        >
            <div class="bg-white px-5 py-6 lg:col-span-4">
                <h2>Purchase Overview</h2>

                <div
                    class="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-4 sm:gap-x-0 sm:divide-x [&_div]:flex [&_div]:flex-col [&_div]:items-center [&_div]:gap-y-0 sm:[&_div]:grid sm:[&_div]:grid-cols-2 sm:[&_div]:gap-y-8 lg:[&_div]:flex lg:[&_div]:gap-y-0 xl:[&_div]:grid xl:[&_div]:gap-y-8 [&_span:first-of-type]:mt-2 [&_span:first-of-type]:text-base [&_span:first-of-type]:font-semibold [&_span:first-of-type]:text-[color:#5D6679] sm:[&_span:first-of-type]:mt-0 lg:[&_span:first-of-type]:mt-2 xl:[&_span:first-of-type]:mt-0 [&_span:last-of-type]:text-right [&_span:last-of-type]:text-sm [&_span:last-of-type]:font-medium [&_span:last-of-type]:text-[color:#667085]"
                >
                    <div class="basis-1/4 sm:pr-2 md:pr-5">
                        <Coins
                            class="col-span-2 mx-auto h-9 w-9 rounded bg-[#E8F1FD] p-1 text-[color:#629FF4]"
                        />

                        <span>1740</span>
                        <span>Purchase</span>
                    </div>

                    <div class="basis-1/4 grid-cols-2 sm:px-2 md:px-5">
                        <HandCoins
                            class="col-span-2 mx-auto h-9 w-9 rounded bg-[#ECEAFF] p-1 text-[color:#817AF3]"
                        />

                        <span>12740</span>
                        <span>Cost</span>
                    </div>

                    <div class="basis-1/4 grid-cols-2 sm:px-2 md:px-5">
                        <ChartNoAxesCombined
                            class="col-span-2 mx-auto h-9 w-9 rounded bg-[#E8F1FD] p-1 text-[color:#DBA362]"
                        />

                        <span>12740</span>
                        <span>Cancel</span>
                    </div>

                    <div class="basis-1/4 sm:pl-2 md:pl-5">
                        <CircleDollarSign
                            class="col-span-2 mx-auto h-9 w-9 rounded bg-[#ECEAFF] p-1 text-[color:#58D365]"
                        />

                        <span>12740</span>
                        <span>Return</span>
                    </div>
                </div>
            </div>

            <div class="bg-white px-5 py-6 lg:col-span-2">
                <h2>Inventory Summary</h2>

                <div
                    class="flex [&_div]:flex [&_div]:flex-col [&_div]:items-center"
                >
                    <div class="basis-1/2 pr-5">
                        <ChartNoAxesCombined
                            class="col-span-2 mx-auto h-9 w-9 rounded bg-[#E8F1FD] p-1"
                        />

                        <span
                            class="mt-2 text-base font-semibold text-[color:#5D6679]"
                            >858</span
                        >
                        <span
                            class="text-center text-xs font-medium text-[color:#444444] lg:text-sm"
                            >Quantity in hand</span
                        >
                    </div>

                    <div class="basis-1/2 pl-5">
                        <CircleDollarSign
                            class="col-span-2 mx-auto h-9 w-9 rounded bg-[#ECEAFF] p-1"
                        />

                        <span
                            class="mt-2 text-base font-semibold text-[color:#5D6679]"
                            >2740</span
                        >
                        <span
                            class="text-center text-xs font-medium text-[color:#444444] lg:text-sm"
                            >To be received</span
                        >
                    </div>
                </div>
            </div>

            <div class="bg-white px-5 py-6 lg:col-span-4">
                <h2>Purchase Overview</h2>

                <div
                    class="flex divide-x [&_div]:grid [&_div]:grid-cols-2 [&_div]:items-center [&_div]:gap-y-8 [&_span:first-of-type]:text-base [&_span:first-of-type]:font-semibold [&_span:first-of-type]:text-[color:#5D6679] [&_span:last-of-type]:text-right [&_span:last-of-type]:text-sm [&_span:last-of-type]:font-medium [&_span:last-of-type]:text-[color:#667085]"
                >
                    <div class="basis-1/4 pr-5">
                        <Coins
                            class="col-span-2 mx-auto h-9 w-9 rounded bg-[#E8F1FD] p-1 text-[color:#629FF4]"
                        />

                        <span>1740</span>
                        <span>Purchase</span>
                    </div>

                    <div class="basis-1/4 grid-cols-2 px-5">
                        <HandCoins
                            class="col-span-2 mx-auto h-9 w-9 rounded bg-[#ECEAFF] p-1 text-[color:#817AF3]"
                        />

                        <span>12740</span>
                        <span>Cost</span>
                    </div>

                    <div class="basis-1/4 grid-cols-2 px-5">
                        <ChartNoAxesCombined
                            class="col-span-2 mx-auto h-9 w-9 rounded bg-[#E8F1FD] p-1 text-[color:#DBA362]"
                        />

                        <span>12740</span>
                        <span>Cancel</span>
                    </div>

                    <div class="basis-1/4 pl-5">
                        <CircleDollarSign
                            class="col-span-2 mx-auto h-9 w-9 rounded bg-[#ECEAFF] p-1 text-[color:#58D365]"
                        />

                        <span>12740</span>
                        <span>Return</span>
                    </div>
                </div>
            </div>

            <div class="bg-white px-5 py-6 lg:col-span-2">
                <h2>Order Summary</h2>

                <div
                    class="flex [&_div]:flex [&_div]:flex-col [&_div]:items-center"
                >
                    <div class="basis-1/2">
                        <ChartNoAxesCombined
                            class="col-span-2 mx-auto h-9 w-9 rounded bg-[#E8F1FD] p-1"
                        />

                        <span
                            class="mt-2 text-base font-semibold text-[color:#5D6679]"
                            >858</span
                        >
                        <span
                            class="text-center text-sm font-medium text-[color:#444444]"
                            >Number of suppliers</span
                        >
                    </div>

                    <div class="basis-1/2">
                        <CircleDollarSign
                            class="col-span-2 mx-auto h-9 w-9 rounded bg-[#ECEAFF] p-1"
                        />

                        <span
                            class="mt-2 text-base font-semibold text-[color:#5D6679]"
                            >2740</span
                        >
                        <span
                            class="text-center text-sm font-medium text-[color:#444444]"
                            >Number of categories</span
                        >
                    </div>
                </div>
            </div>

            <div class="bg-white px-5 py-6 lg:col-span-3">
                <h2>Sales & Purchase chart</h2>

                <div>
                    <apexchart type="bar" :options="options" :series="series" />
                </div>
            </div>

            <div class="bg-white px-5 py-6 lg:col-span-3">
                <h2>Order Summary chart</h2>

                <div>
                    <apexchart
                        type="line"
                        :options="lineChartOptions"
                        :series="series"
                    />
                </div>
            </div>

            <div class="bg-white py-6 lg:col-span-4">
                <h2 class="px-5">Top Selling</h2>

                <div class="w-full overflow-auto">
                    <table class="[&_*]:borders w-full table-auto">
                        <thead>
                            <tr
                                v-for="headerGroup in popularProductTable.getHeaderGroups()"
                                :key="headerGroup.id"
                                class="border-y"
                            >
                                <th
                                    v-for="header in headerGroup.headers"
                                    :key="header.id"
                                    @click="
                                        header.column.getToggleSortingHandler()?.(
                                            $event,
                                        )
                                    "
                                    class="py-3"
                                    :class="{
                                        'cursor-pointer':
                                            header.column.getCanSort(),
                                    }"
                                >
                                    <FlexRender
                                        :render="header.column.columnDef.header"
                                        :props="header.getContext()"
                                    />

                                    <ArrowUpDown
                                        v-show="header.column.getCanSort()"
                                        class="ml-2 inline-block h-4 w-4"
                                    />
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="row in popularProductTable.getRowModel()
                                    .rows"
                                :key="row.id"
                                class="border-b [&_td:first-of-type]:pl-4 [&_td:last-of-type]:pr-4"
                            >
                                <td
                                    v-for="cell in row.getVisibleCells()"
                                    :key="cell.id"
                                    class="py-6"
                                >
                                    <FlexRender
                                        :render="cell.column.columnDef.cell"
                                        :props="cell.getContext()"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="bg-white px-5 py-6 lg:col-span-2">
                <h2>Low Quantity Stock</h2>

                <div class="flex flex-col gap-y-4">
                    <div
                        class="flex items-center gap-x-4"
                        v-for="{ id, name, stock } in lowStockProducts"
                        :key="id"
                    >
                        <div class="h-16 w-14 shrink-0 bg-gray-100"></div>

                        <div class="flex flex-col">
                            <span class="text-base font-semibold">{{
                                name
                            }}</span>
                            <span class="text-sm">Stock: {{ stock }} pcs</span>
                        </div>

                        <div class="ml-auto">
                            <span
                                class="rounded-full bg-[color:#FEECEB] p-2 text-xs font-medium text-[color:#AA3028]"
                            >
                                Low
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
