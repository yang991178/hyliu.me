<style scoped>
.projects {
    max-width: 1200px;
    height: 18.75rem;
    margin: -1rem auto 4rem;
    overflow: visible;
    position: relative;
}
.container {
    display: inline-flex;
}
</style>

<template>
    <div class="projects" :style="{left: `${-offset}px`}">
        <div class="container" ref="container">
            <project-card v-for="(project, i) in projects" :project="project" :key="i" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, unref, onUnmounted } from 'vue'
import ProjectCard from './ProjectCard.vue'
import projects from "@/assets/projects"

export default defineComponent({
    components: {
        ProjectCard
    },
    setup(props, {attrs}) {
        const container = ref<HTMLElement>()
        const offset = ref(0)

        const onResize = () => {
            const c = container.value as HTMLElement
            const p = c.parentElement as HTMLElement
            document.body.style.marginBottom = `${c.clientWidth - p.clientWidth}px`
        }

        const onScroll = () => {
            const c = container.value as HTMLElement
            const root = document.getElementById("root") as HTMLElement
            const scrollHeight = window.scrollY + window.innerHeight
            const overflowHeight = scrollHeight - root.clientHeight
            offset.value = Math.max(0, overflowHeight)
        }

        onMounted(() => {
            window.addEventListener('resize', onResize)
            window.addEventListener('scroll', onScroll)
            onResize()
        })

        onUnmounted(() => {
            window.removeEventListener('resize', onResize)
            window.removeEventListener('scroll', onScroll)
        })

        return {
            container: container,
            projects: projects,
            offset: offset,
        }
    }
})
</script>