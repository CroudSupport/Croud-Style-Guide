import Vue from 'vue'
import moment from 'moment'
import DateRange from '../../../src/components/shared/forms/DateRange'
import '../../../semantic/dist/semantic'

const Constructor = Vue.extend(DateRange)

const vm = new Constructor({
    propsData: {
        start: moment('2017-08-08'),
        end: moment('2017-08-08').add(1, 'days'),
    },
}).$mount()

describe('Date Range', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
