<template>
    <div id="UserConsulta">
        <div v-show="show_table == false" class="container_user_consulta">
            <h2> Consulta de Movimientos</h2>
            <form v-on:submit.prevent="getMovement" >
                <label for="movement">Movimiento:</label>
                <select id="movement" name="movement" placeholder="" v-model="movement">
                    <option value=''>Todos</option>
                    <option value='income'>Ingreso</option>
                    <option value='outcome'>Egreso</option>
                </select> 
                <label for="movement_type">Tipo de Movimiento:</label>
                <select id="movement_type" name="movement_type" placeholder="" v-model="movement_type">
                    <option value=''>Todos</option>
                    <option>Fijo</option>
                    <option>Variable</option>
                </select> 
                <label v-show="movement == 'outcome'" for="movement_category">Categoria:</label>
                <label v-show="movement == 'income'" for="movement_category">Categoria:</label>
                <select v-show="movement == 'income'" id="movement_category" name="movement_category" v-model="movement_category">
                    <option value=''>Todos</option>
                    <option>Salario</option>
                    <option>Arriendos</option>
                    <option>Intereses</option>
                    <option>Otros</option>
                </select>
                <select v-show="movement == 'outcome'" id="movement_category" name="movement_category" v-model="movement_category">
                    <option value=''>Todos</option>
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
        <div v-show="show_table == true">
            <table id="firstTable">
                <thead>
                    <tr>
                        <th>Movimiento</th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in items" :key="row.id_movement">
                        <td>{{row.movement}}</td>
                        <td>{{row.movement_type}}</td>
                        <td>{{row.movement_category}}</td>
                        <td>{{row.amount}}</td>
                    </tr>
                </tbody>
            </table>
            <br><br>
            <button v-on:click="hide_table">Nueva Consulta</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'UserConsulta',
        data: function(){
            return {
                    username: '',
                    movement: '',
                    movement_type: '',
                    movement_category: '',
                    dateFrom: '',
                    dateUntil: '',
                    amountFrom: '',
                    amountUntil: '',
                    items:[],
                    show_table: false
            }
        },
        methods:{
            hide_table: function (event) {
                this.show_table = false
            },
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
                console.warn("consulta_in",consulta_in)
                //axios.get("http://127.0.0.1:8000/user/consulta/")
                axios.get("https://miplaticapp-api.herokuapp.com/user/consulta/", consulta_in)
                .then((response) => {
                    console.warn("result",response.data)
                    this.items = response.data
                    this.show_table = true
                    // self.query = result.data.query
                })
                .catch((error) => {
                    // Error 
                    if (error.response) {
                        /*
                        * The request was made and the server responded with a
                        * status code that falls out of the range of 2xx
                        */
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        /*
                        * The request was made but no response was received, `error.request`
                        * is an instance of XMLHttpRequest in the browser and an instance
                        * of http.ClientRequest in Node.js
                        */
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request and triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);

                // .catch((error) => {
                //     if (error.response.status == "404")
                //         alert("ERROR 404: La búsqueda no arrojó resutlados");
                })
            },
        },
        created: function(){
        this.username = this.$route.params.username
        }
    }
</script>

<style>
    #UserConsulta{
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
        width: 40%;
        height: 90%;
        display: inline-flex;
        flex-direction: column;
        justify-content: initial;
        align-items: center;
        background-color: #e7e6e6;
    }
    #UserConsulta h2{
        font-size: 30px;
        color: #434643;
    }
    #UserConsulta form{
        width: 60%;
    }
    #UserConsulta label {
        display: block;
        text-align: left;
    }
    #UserConsulta select, input{
        height: 25px;
        width: 100%;
        box-sizing: border-box;
        margin: 5px 0;
        border: 1px solid #283747;
    }
    #UserConsulta textarea{
        width: 100%;
        box-sizing: border-box;
        margin: 5px 0;
        border: 1px solid #283747;
        resize: none;
    }    
    #UserConsulta button{
        color: #D0DCD0;
        background: #434643;
        border: 1px solid #0000;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 13px;
        font-weight: bold;
    }
    #UserConsulta button:hover{
        color: #434643;
        background: #6BDEBB;
        border: 1px solid #434643;
    }    
    #UserConsulta span{
        color: #47E5B5;
        font-weight: bold;
    }
</style> 