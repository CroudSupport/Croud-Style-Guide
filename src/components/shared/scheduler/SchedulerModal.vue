<template>
    <span>
        <button class="ui mini basic blue button" title="Edit schedule" @click="showModal = true">
            Edit
        </button>
        <semantic-modal title="Recurring Journal Schedule" :active="showModal" :settings="{content_classes: {content: true}, closeable: true, closeable_button: true}" @close-modal="closeModal">
            <croud-scheduler-editor v-if="showModal" :root-object="rootObject" @schedule-set="scheduleSet"/>
        </semantic-modal>
    </span>
</template>

<script>
    import CroudSchedulerEditor from './SchedulerEditor'

    /**
     * @example ./croud-scheduler-modal.md
     */
    export default {
        name: 'croud-scheduler-modal',

        components: {
            CroudSchedulerEditor,
        },

        props: {
            /**
             * Root object to contain scheulder schema
             *
            */
            rootObject: {
                type: Object,
                required: true,
            },
        },

        data() {
            return {
                showModal: false,
            }
        },

        methods: {
            scheduleSet(schedule) {
                this.$emit('schedule-set', schedule)
                this.closeModal()
            },

            closeModal() {
                this.$emit('closed')
                this.showModal = false
            },
        },
    }
</script>
