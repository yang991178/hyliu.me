<style scoped>
.project-card {
    display: inline-block;
    width: 18.75rem;
    height: 18.75rem;
    margin-right: 4rem;
    background: var(--bg-color);
    color: var(--text-color);
    box-shadow: 0 .25rem 1rem var(--shadow-color);
    position: relative;
    overflow: hidden;
    transition: all .075s ease-in;
    cursor: pointer;
    flex-shrink: 0;
}
.project-card:hover {
    transform: translateY(-.25rem);
    box-shadow: 0 .25rem 3rem var(--shadow-color);
}
.project-card:active {
    transform: translateY(0);
    box-shadow: 0 .25rem 1rem #0000;
}
.project-card.wide {
    width: 37.5rem;
}

.project-card > img.icon {
    display: block;
    height: 5rem;
    margin: 2.1875rem 1.5rem;
}
.project-card > .info {
    box-sizing: border-box;
    padding: 0 1rem 0 1.5rem;
    width: 18.75rem;
}
.project-card > img.screenshot {
    position: absolute;
    top: 1.5rem;
    left: 20.25rem;
    height: 15.75rem;
    box-shadow: -3px 0 10px #0004;
}
h3, p {
    margin: 0 0 .8rem;
}
h3 {
    font-size: 1.7rem;
}
p {
    font-size: 1.2rem;
}
</style>

<template>
    <div class="project-card" :class="{wide: project.screenshot}" :style="styleObject">
        <img class="icon" :src="project.icon ? project.icon : `images/${project.slug}-icon.png`" />
        <div class="info">
            <h3>{{project.title}}</h3>
            <p>{{project.slogan}}</p>
        </div>
        <img v-if="project.screenshot" class="screenshot" :src="project.screenshot" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        project: Object as PropType<Project>
    },
    setup(props) {
        const text = (props.project && props.project.textColor) ? props.project.textColor : '#000'
        const bg = (props.project && props.project.themeColor) ? props.project.themeColor : '#fff'
        const shadow = (props.project && props.project.themeColor) ? (props.project.themeColor + '80') : '#0003'
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