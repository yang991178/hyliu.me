<style scoped>
.links .link-btn, .links .link {
    margin-right: .5rem;
}
</style>

<template>
    <div class="links">
        <template v-for="(link, i) in links">
            <link-button 
                v-if="i === 0"
                :text="link[0]"
                :href="link[1]"
                :bgColor="themeColor" 
                :textColor="textColor" 
                :key="i" />
            <link-text 
                v-else
                :text="link[0]"
                :href="link[1]"
                :textColor="themeColor" 
                :key="i" />
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import LinkButton from './LinkButton.vue'
import LinkText from './LinkText.vue'

export default defineComponent({
    props: {
        links: Array as PropType<[string, string][]>,
        themeColor: String,
        textColor: String,
    },
    components: {
        LinkButton, LinkText
    }
})
</script>