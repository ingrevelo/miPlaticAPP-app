<template>
    <div id="UserMovement">
        <div class="continer_user_transaction">
            <h2> Transacción {{username}}</h2>
            <form v-on:submit.prevent="submitData" >
                <label for="movement">Movimiento:</label>
                <select id="movement" name="movement" placeholder="" v-model="movement">
                    <option value="income">Ingreso</option>
                    <option value="outcome">Egreso</option>
                </select> 
                <label for="movement_type">Tipo de Movimiento:</label>
                <select id="movement_type" name="movement_type" placeholder="" v-model="movement_type">
                    <option>Fijo</option>
                    <option>Variable</option>
                </select> 
                <label v-show="movement == 'outcome'" for="movement_category">Categoria:</label>
                <label v-show="movement == 'income'" for="movement_category">Categoria:</label>
                <select v-show="movement == 'income'" id="movement_category" name="movement_category" v-model="movement_category">
                    <option>Salario</option>
                    <option>Arriendos</option>
                    <option>Intereses</option>
                    <option>Otros</option>
                </select>
                <select v-show="movement == 'outcome'" id="movement_category" name="movement_category" v-model="movement_category">
                    <option>Educacion</option>
                    <option>Vivienda</option>
                    <option>Diversion y Ocio</option>
                    <option>Otros</option>
                </select>
                <label for="description">Descripción:</label>
                <textarea rows="2" id="description" name="description" v-model="description"></textarea>
                <label for="description">Monto($):</label>
                <input type="number" min="0" id="amount" name="amount" v-model="amount">    
                <br><br>
                <button type="submit">Guardar</button>  
                <br><br> 
            </form>
        </div>        
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'UserMovement',
        data: function(){
            return{
                username: null,
                movement: null,
                movement_type: null,
                movement_category: null,
                description: null,
                amount: null                
            }
        },
        methods:{
            submitData: function(){
                var self = this
                let movement_in = {
                    username: this.username,
                    movement: this.movement,
                    movement_type: this.movement_type,
                    movement_category: this.movement_category,
                    description: this.description,
                    amount: this.amount
                }
                axios.put("https://miplaticapp-api.herokuapp.com/user/movement/",
                movement_in, {headers: {}})
                .then((result) => {
                    console.warn("result",result)
                    alert("Registro Guardado Correctamente, Ahorro Actual: $" + result.data.actual_balance);
                    this.clear();
                })
                .catch((error) => {
                    if (error.response.status == "400")
                        alert("ERROR 400: El gasto ingresado supera su balance actual de ahorro.");
                        this.clear();
                });
            },
            clear: function(){
                var self = this
                this.movement = null,
                this.movement_type = null,
                this.movement_category = null,
                this.description = null,
                this.amount = null
            }
        },
        created: function(){
            this.username = this.$route.params.username
        }
    }
</script>

<style>
    #UserMovement{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .continer_user_transaction {
        border: 1px solid #666769;
        border-radius: 10px;
        width: 45%;
        height: 80%;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #e7e6e6;
    }

    #UserMovement h2{
        font-size: 30px;
        color: #434643;
    }

    #UserMovement form{
        width: 40%;
    }

    #UserMovement label {
        display: block;
        text-align: left;
    }

    #UserMovement select, input{
        height: 25px;
        width: 100%;
        box-sizing: border-box;
        margin: 5px 0;
        border: 1px solid #283747;
    }

    #UserMovement textarea{
        width: 100%;
        box-sizing: border-box;
        margin: 5px 0;
        border: 1px solid #283747;
        resize: none;
    }    

    #UserMovement button{
        color: #D0DCD0;
        background: #434643;
        border: 2px solid #0000;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 14px;
        font-weight: normal;
    }

    #UserMovement button:hover{
        color: #434643;
        background: #6BDEBB;
        border: 2px solid #434643;
    }    

    #UserMovement span{
        color: #47E5B5;
        font-weight: bold;
    }
</style>

