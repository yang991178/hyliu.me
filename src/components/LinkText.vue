<style scoped>
.link {
    display: inline-block;
    padding: .875rem 1.25rem;
    font-size: 1.25rem;
    line-height: 1;
    text-decoration: none;
    color: var(--text-color);
    width: auto;
    transition: transform .075s ease-in;
}
.link:hover {
    transform: translateY(-.25rem);
}
.link:active {
    transform: translateY(0);
}
</style>

<template>
    <a class="link" :href="href" :style="styleObject" target="_blank">{{ text }}</a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        text: String,
        href: String,
        textColor: String,
    },
    setup(props) {
        const text = props.textColor ? props.textColor : '#0078D4'
        return {
            styleObject: {
                '--text-color': text,
            }
        }
    }
})
</script>