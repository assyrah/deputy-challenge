<template>
    <transition name="modal-fade">
        <div id="app-modal">
            <div class="modal-layer">
                <div class="modal modal--employee">
                    <header class="modal-header">
                        <h3>Employee</h3>
                        <button
                            type="button"
                            class="button button--text button--lg close"
                            @click="close"
                        >
                            X
                        </button>
                    </header>
                    <section class="modal-body row">
                        <div class="col-md-2 col-sm-6 modal-left">
                            <img class="employee-image" :src="employee.picture"/>
                            <h3 class="employee-name">{{employee.name}}</h3>
                            <p>
                                <small>{{employee.status}}</small>
                            </p>
                            <div class="details-title">
                                <small><strong>Details</strong></small>
                            </div>
                        </div>
                        <form class="col-md-3 col-sm-6 modal-right">
                            <div>
                                <label>Address</label>
                                <input class="input employee-address" type="text" v-model.lazy="employee.location"/>
                            </div>
                            <div>
                                <label>Email</label>
                                <input class="input employee-email" type="text" v-model.lazy="employee.email"/>
                            </div>
                            <div>
                                <label>Date of Birth</label>
                                <input class="input employee-dob" type="text" v-model.lazy="employee.dob"/>
                            </div>
                        </form>
                    </section>
                    <footer class="modal-footer">
                        <button
                            type="button"
                            class="button button--inverted close col-sm-6"
                            @click="close"
                        >
                            Save
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal',
        props: ['employee'],
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>