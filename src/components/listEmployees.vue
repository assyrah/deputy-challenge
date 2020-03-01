<template>
  <div id="list-employees" class="container">
    <div class="row">
      <div class="col-sm-6">
        <h2>People</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6 col-md-1">
        <input class="input search-input" type="text" v-model="search" placeholder="Search People.."/>
      </div>
      <div class="col-sm-6 col-md-1">
        <select class="select select-filter" v-model="selectedFilter">
          <option v-for="category in categories" :key="category">{{category}}</option>
        </select>
        </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <table class="table table--headerTop">
          <thead>
            <tr>
              <th scope="col" v-for="category in categories.slice(1)" class="employee-header" :key="category" @click="toggleSort(category)">{{category}}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr class="employee" v-for="employee in searchEmployee" :key="employee.id">
              <td data-label="Name">{{employee.name}}</td>
              <td data-label="Location">{{employee.location}}</td>
              <td data-label="Email">{{employee.email}}</td>
              <td data-label="Status">{{employee.status}}</td>
              <td><button class="button view-modal" @click="showModal(employee)">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <nav class="pagination row">
      <button 
        type="button" 
        class="button page-prev"
        @click="page--"
        :disabled="page == 1"
      > 
        Previous 
      </button>
      <div>
        <button 
          type="button" 
          class="button button--text page-num" 
          v-for="pageNumber in pages" 
          @click="page = pageNumber" 
          :key="pageNumber"
          :class="{active: pageNumber == page}"
        >
          {{pageNumber}}
        </button>
      </div>
      <button 
        type="button" 
        @click="page++"
        class="button page-next"
        :disabled="page == numberOfPages"
      >
        Next
      </button>
		</nav>
    <app-modal v-show="isModalActive" @close="closeModal" :employee="modalContent"></app-modal>
  </div> 
</template>

<script>
    import appModal from './modal.vue';
    export default {
        props: ['employees'],
        name: 'list-employees',
        components: {
          'app-modal': appModal,
        },
        data() {
            return {
                search: '',
                selectedFilter: '',
                categories: ['','name', 'location', 'email', 'status'],
                isModalActive: false,
                modalContent: [],
                page: 1,
                perPage: 10,
                sortVal: true,
                selectedSort: 'name',
                previousSearch: '',
                storeEmployee: this.employees,
                maxVisibleButtons: 3,
                numberOfPages: 0
            };
        },
        computed: {
          searchEmployee () {
            let sortChange = this.sortVal ? 1 : -1;
            let sortBy = this.selectedSort
            let searchTerm = this.search.toLowerCase();
            let filter = this.selectedFilter.toLowerCase();
            //update stored employees on search
            this.storeFilteredEmployees(this.employees.filter((employee)=> {
              return this.searchFilter(searchTerm, filter, employee);
            }));
            this.setPages();
            //paginate and sort the filtered list
            return this.paginate(this.storeEmployee).sort((a,b) =>  sortChange * a[sortBy].localeCompare(b[sortBy]));
          },
          startPage () {
            if (this.page === 1) {
              return 1;
            }
            return this.page - 1;
          },
          endPage () {
            return Math.min(this.startPage + this.maxVisibleButtons - 1, this.numberOfPages);
          },
          //returns the page and page range
          pages () {
            const range = [];
            for (let i = this.startPage; i <= this.endPage; i+= 1 ) {
              range.push(i);
            }
            return range;
          }
        },
        methods: {
          showModal (employee) {
            this.isModalActive = true;
            this.modalContent = employee
          },
          closeModal () {
            this.isModalActive = false;
          },
          setPages () {
            this.numberOfPages = Math.ceil(this.storeEmployee.length / this.perPage);
          },
          paginate (employees) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  employees.slice(from, to);
          },
          searchFilter (searchTerm, filter, employee) {
            let searchMatch = "";
              //if it has selected filter
              if (filter) {
                searchMatch = employee[filter].toLowerCase().includes(searchTerm)
              }
              //otherwise search on all columns
              else {
                searchMatch =  Object.values(employee).some(val =>
                String(val).toLowerCase().includes(searchTerm)
                )
              }
              //reset to page on new query
              if (searchTerm != this.previousSearch) {
                this.page = 1
              }
              //store previous search query
              this.previousSearch = searchTerm;
              return searchMatch;
          },
          storeFilteredEmployees (passedEmp) {
            this.storeEmployee = passedEmp;
          },
          toggleSort (category) {
            this.sortVal = !this.sortVal;
            this.selectedSort = category;
          }
        }
    }
</script>