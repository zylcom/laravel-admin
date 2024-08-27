<script setup lang="ts">
import { ref } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {
    ArrowUpDown,
    ChartNoAxesCombined,
    CircleDollarSign,
    Coins,
    HandCoins,
    TrendingUp,
} from "lucide-vue-next";
import { Head } from "@inertiajs/vue3";
import {
    useVueTable,
    createColumnHelper,
    getCoreRowModel,
    SortingState,
    getSortedRowModel,
    FlexRender,
} from "@tanstack/vue-table";
import Card from "@/Components/Card.vue";
import OverviewStats from "@/Components/OverviewStats.vue";
import type { Product, Stats } from "@/types";
import SummaryStats from "@/Components/SummaryStats.vue";

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

const popularData = ref<Product[]>(props.popularProducts);

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

const salesStats = ref<Stats[]>([
    { icon: TrendingUp, name: "Sales", data: 1234 },
    { icon: HandCoins, name: "Revenue", data: 1234 },
    { icon: Coins, name: "Profit", data: 1234 },
    { icon: CircleDollarSign, name: "Cost", data: 1234 },
]);
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div
            class="grid grid-cols-1 gap-6 lg:grid-cols-6 [&>div]:rounded-lg [&_div_h2]:mb-6 [&_div_h2]:text-xl [&_div_h2]:font-medium"
        >
            <Card class="lg:col-span-4">
                <OverviewStats
                    overviewName="Sales Overview"
                    :overviewStats="salesStats"
                />
            </Card>

            <Card class="lg:col-span-2">
                <SummaryStats title="Inventory Summary" />
            </Card>

            <Card class="lg:col-span-4">
                <OverviewStats
                    overviewName="Purchase Overview"
                    :overviewStats="salesStats"
                />
            </Card>

            <Card class="lg:col-span-2">
                <SummaryStats title="Order Summary" />
            </Card>

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
