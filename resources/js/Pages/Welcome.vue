<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import NavLink from '../Components/NavLink.vue'

defineProps<{
    canLogin?: boolean;
    canRegister?: boolean;
    laravelVersion: string;
    phpVersion: string;
}>();

</script>

<template>

    <Head title="Welcome" />

    <div>
        <header class='px-9 py-4'>
            <nav class="w-full flex justify-between">
                <Link href="/">Invtry</Link>

                <ul class="flex gap-4">
                    <li>
                        <NavLink href='/login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink href='/register'>Register</NavLink>
                    </li>
                </ul>
            </nav>
        </header>

        <div class="px-9">
            <h1 class="text-5xl">
                Welcome World!
            </h1>
        </div>
    </div>
</template>
