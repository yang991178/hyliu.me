<style scoped>
.link-btn {
    display: inline-block;
    padding: .875rem 1.25rem;
    font-size: 1.125rem;
    line-height: 1;
    text-decoration: none;
    color: var(--text-color);
    width: auto;
    background: var(--bg-color);
    transition: transform .075s ease-in, box-shadow .075s ease-in;
}
.link-btn:hover {
    transform: translateY(-.25rem);
    box-shadow: 0 .25rem 1rem var(--shadow-color);
}
.link-btn:active {
    transform: translateY(0);
    box-shadow: 0 .25rem 1rem #0000;
}
</style>

<template>
    <a class="link-btn" :href="href" :style="styleObject" target="_blank">{{ text }}</a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        text: String,
        href: String,
        bgColor: String,
        textColor: String,
    },
    setup(props) {
        const text = props.textColor ? props.textColor : '#fff'
        const bg = props.bgColor ? props.bgColor : '#0078D4'
        const shadow = props.bgColor ? (props.bgColor + '80') : '#0078D480'
        return {
            styleObject: {
                '--text-color': text,
                '--bg-color': bg,
                '--shadow-color': shadow,
            }
        }
    }
})
</script>