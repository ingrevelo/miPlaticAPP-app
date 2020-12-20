<template>
    <div id="UserConsulta">
        <div class="container_user_consulta">
            <h2> Consultar {{username}}</h2>
            <form v-on:submit.prevent="submitData" >
                <label for="movement">Movimiento:</label>
                <select id="movement" name="movement" placeholder="" v-model="movement">
                    <option value="None">Todos</option>
                    <option value="income">Ingreso</option>
                    <option value="outcome">Egreso</option>
                </select> 
                <label for="movement_type">Tipo de Movimiento:</label>
                <select id="movement_type" name="movement_type" placeholder="" v-model="movement_type">
                    <option value="None">Todos</option>
                    <option>Fijo</option>
                    <option>Variable</option>
                </select> 
                <label v-show="movement == 'outcome'" for="movement_category">Categoria:</label>
                <label v-show="movement == 'income'" for="movement_category">Categoria:</label>
                <select v-show="movement == 'income'" id="movement_category" name="movement_category" v-model="movement_category">
                    <option value="None">Todos</option>
                    <option>Salario</option>
                    <option>Arriendos</option>
                    <option>Intereses</option>
                    <option>Otros</option>
                </select>
                <select v-show="movement == 'outcome'" id="movement_category" name="movement_category" v-model="movement_category">
                    <option value="None">Todos</option>
                    <option>Educacion</option>
                    <option>Vivienda</option>
                    <option>Diversion y Ocio</option>
                    <option>Otros</option>
                </select>
                <label for="description">Monto desde($):</label>
                <input type="number" min="0" id="amountFrom" name="amountFrom" v-model="amountFrom">
                <label for="description">Monto hasta($):</label>
                <input type="number" min="0" id="amountUntil" name="amountUntil" v-model="amountUntil">
                <label for="description">Fecha desde:</label>
                <input type="date" min="2000-01-01" max="2050-12-31" value="2000-01-01" id="dateFrom" name="dateFrom" v-model="dateFrom">
                <label for="description">Fecha hasta:</label>
                <input type="date" min="2000-01-01" max="2050-12-31" value="2050-12-31" id="dateUntil" name="dateUntil" v-model="dateUntil">     
                <br><br>
                <button type="submit">Buscar</button>  
                <br><br> 
            </form>
        </div>        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'UserConsulta',
    data: function(){
        return {
            query: null
        }
    },
    methods:{
        getMovement: function(){
            var self = this
            let consulta_in = {
                username: this.username,
                movement: this.movement,
                movement_type: this.movement_type,
                movement_category: this.movement_category,
                dateFrom: this.dateFrom,
                dateUntil: this.dateUntil,
                amountFrom: this.amountFrom,
                amountUntil: this.amountUntil
            }
            axios.get("http://127.0.0.1:8000/user/consulta/")
            .then((result) => {
                self.query = result.data.query
            })
            .catch((error) => {
                if (error.response.status == "400")
                    alert("ERROR 400: La búsqueda no arrojó resutlados");
            })
        },
        created: function(){
            this.username = this.$route.params.username
        }
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

    .container_user_consulta {
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