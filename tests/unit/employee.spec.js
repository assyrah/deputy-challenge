import { shallowMount } from '@vue/test-utils'
import ListEmployees from '@/components/listEmployees.vue'
import Vue from 'vue'

const employee = {
    id: '1',
    name: 'assyrah honra',
    location: 'Manila, Philippines',
    email: 'assyrah@gmail.com',
    dob: '11/01/1993',
    status: 'employed',
    picture: 'assyrah.jpg'
}

const employees = [employee];

describe('listEmployees.vue', () => {
    const wrapper = shallowMount(ListEmployees, {
      propsData: { employees }
    })

    it('renders props.employees when passed', () => {
      expect(wrapper.find('.employee').exists()).toBe(true);
      wrapper.props().employees.forEach(element => {
          expect(element.id).toEqual('1')
          expect(element.name).toEqual('assyrah honra')
          expect(element.location).toEqual('Manila, Philippines')
          expect(element.email).toEqual('assyrah@gmail.com')
          expect(element.dob).toEqual('11/01/1993')
          expect(element.picture).toEqual('assyrah.jpg')
      });
    })
    
    it('shows modal on view modal click', () => {
        expect(wrapper.vm.isModalActive).toBe(false)
        const button = wrapper.find('.view-modal')
        button.trigger('click')
        expect(wrapper.vm.isModalActive).toBe(true)
    })

    it('updates employee display on user query', async () => {
      const newQuery = 'assyrah'
      const query = wrapper.find('.search-input')
      query.element.value = newQuery
      query.trigger('input')
      await Vue.nextTick()
      expect(wrapper.find('.employee').text()).toContain('assyrah')
    })

    it('updates employee display on change of filter', async () => {
      const newQuery = 'Manila'
      const filters = ['name', 'location', 'email', 'status']
      const query = wrapper.find('.search-input')
      const filterInput = wrapper.find('.select-filter')
      query.element.value = newQuery
      query.trigger('input')
      for(let i=0; i<filters.length; i++){
        filterInput.element.value = filters[i]
        filterInput.trigger('change')
        await Vue.nextTick()
        if (filterInput.element.value == 'location') {
          expect(wrapper.find('.employee').text()).toContain(newQuery)
        }
        else {
          expect(wrapper.findAll('.employee').length).toBe(0)
        }
      }
    })

    const pageNumber = 1
    wrapper.vm.page = pageNumber
    it('should switch to next page on click of next', () => {
      const nextButton = wrapper.find('.page-next')
      nextButton.trigger('click')
      expect(wrapper.vm.page).toBe(2)
    })

    it('should switch to previous page on click of previous', () => {
      const prevButton = wrapper.find('.page-prev')
      prevButton.trigger('click')
      expect(wrapper.vm.page).toBe(1)
    })
})