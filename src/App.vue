<style>
html, body {
    margin: 0;
    background: #faf9f8;
    overflow-x: hidden;
}
body {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
html.detail-on {
    overflow: hidden;
}
@media (max-width: 700px) {
    html {
        font-size: 11px;
    }
}

#root {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
#root.fixed {
    position: fixed;
    top: unset;
    bottom: 0;
}

header {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
header h1, header h2, header h3 {
    font-weight: 700;
    line-height: 1.5;
    margin: 0 0 1rem;
}
header h1 {
    font-size: 3.25rem;
}
header h2 {
    font-size: 2rem;
    color: #605E5C;
}
header .links {
    margin-top: 32px;
}
</style>

<template>
    <div id="root" :class="{fixed: fixed}" ref="app">
        <header>
            <h1>Hello there.</h1>
            <h2>I'm Haoyuan Liu, <br />a senior at UC Berkeley.</h2>
            <h2>I build software for an open web.</h2>
            <link-group :links="links" />
        </header>
        <project-list @detail="onDetail" />
        <project-detail @dismiss="onDismiss" :project="detail" v-if="detail" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import LinkGroup from '@/components/LinkGroup.vue'
import ProjectList from '@/components/ProjectList.vue'
import ProjectDetail from '@/components/ProjectDetail.vue'

export default defineComponent({
    props: {},
    components: {
        LinkGroup, ProjectList, ProjectDetail
    },
    setup() {
        const fixed = ref(false)
        const app = ref<HTMLElement>()
        const detail = ref<Project>()

        const onResize = () => {
            const root = app.value as HTMLElement
            document.body.style.paddingTop = `${root.clientHeight}px`
        }

        const onScroll = () => {
            const root = app.value as HTMLElement
            const scrollHeight = window.scrollY + window.innerHeight
            const overflowHeight = scrollHeight - root.clientHeight
            fixed.value = overflowHeight >= 0
        }

        onMounted(() => {
            window.addEventListener('scroll', onScroll)
            window.addEventListener('resize', onResize)
            onResize()
        })
        onUnmounted(() => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
        })

        return {
            fixed: fixed,
            app: app,
            detail: detail,
            links: [
                ['GitHub', 'https://github.com/yang991178'],
                ['Resume', '/resume.pdf'],
            ],
        }
    },
    methods: {
        onDetail(project: Project) {
            this.detail = project
            document.documentElement.classList.add('detail-on')
        },
        onDismiss() {
            this.detail = undefined
            document.documentElement.classList.remove('detail-on')
        },
    }
})
</script>