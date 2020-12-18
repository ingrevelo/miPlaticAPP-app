<template>
    <div id="UserMovement">
        <form @submit="submitData">
            <br><br>
            <label for="movement">Movimiento:</label>
            <br>
            <select id="movement" name="movement" placeholder="" v-model="post.movement">
                <option value="income">Ingreso</option>
                <option value="outcome">Egreso</option>
            </select> 
            <br><br>
            <label for="movement_type">Tipo de Movimiento:</label>
            <br>
            <select id="movement_type" name="movement_type" placeholder="" v-model="post.movement_type">
                <option>Fijo</option>
                <option>Variable</option>
            </select> 
            <br><br>
            <label for="movement_category">Categoria:</label>
            <br>
            <select id="movement_category" name="movement_category" v-model="post.movement_category">
                <option>Educacion</option>
                <option>Vivienda</option>
                <option>Diversion y Ocio</option>
                <option>Vehiculos</option>
            </select>
            <br><br>   
            <label for="description">Descripción:</label>
            <br>
            <input type="text" id="description" name="description" v-model="post.description">
            <br><br>
            <label for="description">Monto($):</label>
            <br>
            <input type="number" min="0" id="amount" name="amount" v-model="post.amount">    
            <br><br>
            <button type="submit">Guardar</button>   
        </form>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    Vue.use(VueAxios, axios)

    export default {
        name: 'UserMovement',
        data()
        {
            return {
                post:{
                username: this.$route.params.username,
                movement: null,
                movement_type: null,
                movement_category: null,
                description: null,
                amount: null
                }                    
            }
        },
        methods:
        {
            // resetForm() { 
            //     this.movement = null,
            //     this.movement_type = null,
            //     this.movement_category = null,
            //     this.description = null,
            //     this.amount = null
            // },

            submitData(e)
            {
                this.axios.put("http://127.0.0.1:8000/user/movement/", this.post).then((result)=>{
                    console.warn("result",result)
                    //this.resetForm()
                })
                e.preventDefault();
            }
        }
    }
</script>

<style>
    #UserBalance{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #UserBalance h2{
        font-size: 50px;
        color: #6D7270;
    }

    #UserBalance span{
        color: #47E5B5;
        font-weight: bold;
    }
</style>