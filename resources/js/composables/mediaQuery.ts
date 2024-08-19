import { onMounted, onUnmounted, ref } from "vue";

export function useMediaQuery(query: string) {
    const matches = ref(false);

    let media: ReturnType<typeof window.matchMedia>;
    let listener: () => void;

    onMounted(() => {
        media = window.matchMedia(query);

        if (media.matches !== matches.value) {
            matches.value = media.matches;
        }

        listener = () => {
            matches.value = media.matches;
        };

        media.addEventListener("change", listener);
    });
    onUnmounted(() => media.removeEventListener("change", listener));

    return matches;
}
