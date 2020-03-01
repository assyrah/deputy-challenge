<template>
  <div id="app">
    <app-header></app-header>
    <list-employees :employees="employees"></list-employees>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import axios from 'axios';
  import listEmployees from './components/listEmployees.vue'
  import appHeader from './components/header.vue'
  import appFooter from './components/footer.vue'

  export default {
    name: 'App',
    components: {
      'list-employees': listEmployees,
      'app-header': appHeader,
      'app-footer': appFooter
    },
      data() {
          return {  
              employees: []
          };
      },
      created: function () {
          axios.get('https://randomuser.me/api/?results=100&inc=id,name,location,email,dob,picture&seed=012b173efcc779f9')
            .then(response => {
                const result = response.data.results;
                for (let i = 0; i < result.length; i++) {
                  this.employees.push({
                    id: result[i].id.value,
                    name: result[i].name.first + " " + result[i].name.last,
                    location: result[i].location.street.number + " " + result[i].location.city + " " + result[i].location.state,
                    email: result[i].email,
                    dob: this.formatDate(result[i].dob.date),
                    status: this.assignStatus(result[i].id.value),
                    picture: result[i].picture.large
                  })
                }
            })
      },
      methods: {
        formatDate (givenDate) {
          return new Date(givenDate).toLocaleDateString();
        },
        assignStatus (employeeId) {
          let status = "Discarded";
          if (employeeId) {
            status = "Employed";
          }
          return status;
        }
      }
  }
</script>

<style lang="scss">
  @import "./styles/main.scss"
</style>
