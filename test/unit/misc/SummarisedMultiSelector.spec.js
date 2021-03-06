import Vue from 'vue'
import VueSemantic from 'croud-vue-semantic'
import SummarisedMultiSelector from '../../../src/components/shared/misc/SummarisedMultiSelector'
import '../../../semantic/dist/semantic'

Vue.use(VueSemantic)

const Constructor = Vue.extend(SummarisedMultiSelector)

const vm = new Constructor({
    propsData: {
        readOnly: false,
        options: [
            { id: 1, name: 'PPC' },
            { id: 2, name: 'Paid Social' },
            { id: 3, name: 'SEO' },
        ],
    },
}).$mount()

describe('summarised multi selector', () => {
    describe('none selected', () => {
        it('should match the snapshot', () => {
            expect(vm.$el).toMatchSnapshot()
        })

        describe('read only', () => {
            beforeEach(() => {
                vm.readOnly = true
            })

            it('should match the snapshot', () => {
                expect(vm.$el).toMatchSnapshot()
            })
        })
    })

    describe('some selected', () => {
        describe('build summary', () => {
            describe('from array', () => {
                it('should handle single value', () => {
                    vm.value = [1]
                    vm.$nextTick(() => {
                        expect(vm.selectedItems).toBe('PPC')
                        expect(vm.displayText).toBe('PPC')
                    })
                })

                it('should handle multiple values', () => {
                    vm.value = [1, 2]
                    vm.$nextTick(() => {
                        expect(vm.selectedItems).toBe('PPC, Paid Social')
                        expect(vm.displayText).toBe('2 Selected')
                    })
                })

                it('should match the snapshot', () => {
                    vm.value = [1, 2]
                    expect(vm.$el).toMatchSnapshot()
                })
            })

            describe('from string', () => {
                it('should handle single value', () => {
                    vm.value = '1'
                    vm.$nextTick(() => {
                        expect(vm.selectedItems).toBe('PPC')
                        expect(vm.displayText).toBe('PPC')
                    })
                })

                it('should handle multiple values', () => {
                    vm.value = '1,2'
                    vm.$nextTick(() => {
                        expect(vm.selectedItems).toBe('PPC, Paid Social')
                        expect(vm.displayText).toBe('2 Selected')
                    })
                })

                it('should match the snapshot', () => {
                    vm.value = '1,2'
                    expect(vm.$el).toMatchSnapshot()
                })
            })

            describe('with different summary field', () => {
                it('should use the id field', () => {
                    vm.value = '1'
                    vm.fields = {
                        summary: 'id',
                    }
                    vm.$nextTick(() => {
                        expect(vm.selectedItems).toBe('1')
                        expect(vm.displayText).toBe('1')
                    })
                })
            })

            describe('if dropdown is open', () => {
                beforeEach(() => {
                    vm.showSummary = false
                    vm.value = '1,2'
                    vm.fields = {
                        summary: 'id',
                    }
                })

                it('should not render the summary field', () => {
                    vm.$nextTick(() => {
                        expect(vm.dropdownSummary).toBe(false)
                    })
                })

                it('should match the snapshot', () => {
                    expect(vm.$el).toMatchSnapshot()
                })
            })
        })

        describe('read only', () => {
            beforeEach(() => {
                vm.showSummary = true
                vm.readOnly = true
                vm.value = '1,2'
                vm.fields = {}
            })

            it('should match the snapshot', () => {
                expect(vm.$el).toMatchSnapshot()
            })
        })
    })

    describe('get array', () => {
        it('should return an empty array if value is undefined', () => {
            vm.value = undefined

            const result = vm.getArray(vm.value)
            const isArray = Array.isArray(result)

            expect(isArray).toBe(true)
            expect(result).toEqual([])
        })

        it('should return an empty array if value is an empty string', () => {
            vm.value = ''

            const result = vm.getArray(vm.value)
            const isArray = Array.isArray(result)

            expect(isArray).toBe(true)
            expect(result).toEqual([])
        })

        it('should return an array of selected options', () => {
            vm.value = 'foo,bar,baz'

            const result = vm.getArray(vm.value)
            const isArray = Array.isArray(result)

            expect(isArray).toBe(true)
            expect(result).toEqual([
                'foo', 'bar', 'baz',
            ])
        })
    })

    describe('model setter', () => {
        const mock = jest.fn()
        vm.$emit = mock

        beforeEach(() => {
            mock.mockClear()
        })

        describe('should always emit an array', () => {
            const modelSetterTests = {
                undefined: {
                    input: undefined,
                    output: [],
                },
                'empty string': {
                    input: '',
                    output: [],
                },
                'populated string': {
                    input: '1,2,3',
                    output: ['1', '2', '3'],
                },
            }

            Object.keys(modelSetterTests).forEach((test) => {
                it(test, (done) => {
                    vm.model = modelSetterTests[test].input

                    vm.$nextTick(() => {
                        expect(mock).toBeCalledWith('input', modelSetterTests[test].output)
                        done()
                    })
                })
            })
        })
    })
})
