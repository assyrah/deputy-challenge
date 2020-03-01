import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/modal.vue'

const employee = {
    id: '1',
    name: 'assyrah honra',
    location: 'Manila, Philippines',
    email: 'assyrah@gmail.com',
    dob: '11/01/1993',
    picture: 'assyrah.jpg'
}

describe('modal.vue', () => {
    const wrapper = shallowMount(Modal, {
      propsData: { employee }
    })

    it('hides modal when close is clicked', () => {
        const closeButton = wrapper.find('.close')
        closeButton.trigger('click')
        expect(wrapper.emitted().close.length).toBe(1)
        setTimeout(() => {
            expect(wrapper.find('#appModal').isVisible()).toBe(false) }
        , 1000);
    })

    it('updates employee details on user input', () => {
        const newAddress = "Sydney, Australia"
        const newEmail = "assyrah@outlook.com"
        const newDob = "12/25/1993"
        const newValues = [newAddress, newEmail, newDob]
        const inputs = ['.employee-address', '.employee-email', '.employee-dob']
        const empProp = ['location', 'email', 'dob']
        for (let i=0; i<inputs.length; i++) {
            const input = wrapper.find(inputs[i])
            input.element.value = newValues[i]
            input.trigger('change')
            expect(wrapper.props().employee[empProp[i]]).toEqual(newValues[i])
        }
    })
})