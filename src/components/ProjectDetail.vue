<style scoped>
.container {
    position: fixed;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    background: #fff4;
    overflow: hidden auto;
}
.container::after {
    content: '×';
    display: block;
    margin: 2rem auto;
    padding: .5rem;
    font-size: 2rem;
    line-height: 1;
    text-align: center;
    width: 2rem;
    color: #fff;
    background: #0008;
    align-content: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
}

.detail {
    box-sizing: border-box;
    width: 95%;
    max-width: 900px;
    margin: 4rem auto 2rem;
    padding: 2.5rem;
    background-color: #fff;
    box-shadow: 0 .25rem 2rem #0003;
}
.detail > * {
    margin-bottom: 2.5rem;
}
.detail > *:last-child {
    margin-bottom: 0;
}
.detail-enter-active {
    transition: opacity .25s linear, transform .25s linear;
}
.detail-leave-active {
    transition: opacity .1s linear, transform .1s linear;
}
.detail-enter-from, .detail-leave-to {
    opacity: 0;
    transform: translateY(2rem);
}

.info {
    display: flex;
    align-items: center;
}
.icon {
    display: inline-flex;
    padding: 1.5rem;
    align-content: center;
    justify-content: center;
    background: var(--bg-color);
    box-shadow: 0 .25rem 1rem var(--shadow-color);
    margin-right: 2rem;
}
.icon > img {
    height: 4rem;
}
.info p {
    line-height: 1;
    margin: 0 0 .8rem;
}
.info *:last-child {
    margin: 0;
}
.title {
    font-weight: 700;
    font-size: 1.7rem;
}
.slogan {
    font-size: 1.2rem;
}
.stack {
    color: #605E5C;
}
.stack > span::after {
    content: ' / ';
    color: var(--text-color);
    font-weight: 800;
}
.stack > span:last-child::after {
    content: ''
}

.screenshot {
    display: block;
    width: 100%;
    box-shadow: 0 .25rem 1rem #0003;
}
</style>

<template>
    <div class="container" @click="dismiss" :style="styleObject">
        <transition name="detail" appear>
            <div v-if="show" class="detail" @click="e => e.stopPropagation()">
                <div class="info">
                    <div class="icon">
                        <img :src="`images/${project.slug}-icon.png`" />
                    </div>
                    <div>
                        <p class="title">{{project.title}}</p>
                        <p class="slogan">{{project.slogan}}</p>
                        <div class="stack" v-if="project.stack">
                            <span v-for="(tech, i) in project.stack" :key="i">{{tech}}</span>
                        </div>
                    </div>
                </div>
                <img class="screenshot" v-if="project.screenshot" :src="`images/${project.slug}-screenshot.png`" />
                <link-group 
                    v-if="project.links" 
                    :links="project.links"
                    :themeColor="project.themeColor"
                    :textColor="project.textColor" />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, onUnmounted } from 'vue'
import LinkGroup from './LinkGroup.vue'

export default defineComponent({
    props: {
        project: Object as PropType<Project>
    },
    components: {
        LinkGroup
    },
    setup(props, {emit}) {
        const text = (props.project && props.project.themeColor) 
            ? props.project.themeColor 
            : ((props.project && props.project.textColor) ? props.project.textColor : '#000')
        const bg = (props.project && props.project.themeColor) ? props.project.themeColor : '#fff'
        const shadow = (props.project && props.project.themeColor) ? (props.project.themeColor + '80') : '#0003'
        const styleObject = ref({
            '--text-color': text,
            '--bg-color': bg,
            '--shadow-color': shadow,
            backdropFilter: 'blur(0)'
        })

        const timeout = ref<number>()
        const ms = ref(0)
        const show = ref(true)
        const animateBlur = (target: number, step = 10) => {
            timeout.value = undefined
            let diff = 0
            if (show.value && ms.value < target) {
                diff = step
            } else if (!show.value && ms.value > 0) {
                diff = -step * 2.5
            }
            if (diff !== 0) {
                ms.value += diff
                styleObject.value = Object.assign({}, styleObject.value, {
                    backdropFilter: `blur(${20 * ms.value / target}px)`
                })
                timeout.value = setTimeout(() => animateBlur(target), step)
            }
        }

        const BLUR_LENGTH = 250
        onMounted(() => {
            animateBlur(BLUR_LENGTH)
        })
        onUnmounted(() => {
            clearTimeout(timeout.value)
        })

        const dismiss = () => {
            show.value = false
            if (!timeout.value) animateBlur(BLUR_LENGTH)
            setTimeout(() =>{
                emit('dismiss')
            }, 100)
        }

        return {
            show: show,
            dismiss: dismiss,
            styleObject: styleObject,
        }
    }
})
</script>