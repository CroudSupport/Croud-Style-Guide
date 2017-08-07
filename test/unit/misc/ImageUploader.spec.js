import Vue from 'vue'
import ImageUploader from '../../../src/components/shared/misc/ImageUploader'


const Constructor = Vue.extend(ImageUploader)

const vm = new Constructor().$mount()

describe('Image Uploader', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
