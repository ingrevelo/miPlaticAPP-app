<template>
    <div id="UserAuth">
        <div class="container_auth_user">
            <h2>Autenticación</h2>
            <form v-on:submit.prevent="processAuthUser" >
                <input type="text" v-model="user_in.username" placeholder="Usuario">
                <br>
                <input type="password" v-model="user_in.password" placeholder="Contraseña">
                <br><br>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "UserAuth",
        data: function(){
            return {
                user_in: {
                    username:"",
                    password:""
                }
            }
        },
        methods: {
            processAuthUser: function(){
                var self = this
                axios.post("https://miplaticapp-api.herokuapp.com/user/auth/", self.user_in,  {headers: {}})
                    .then((result) => {
                        alert("Autenticación Exitosa");
                        self.$emit('log-in', self.user_in.username)
                    })
                    .catch((error) => {
                        
                        if (error.response.status == "404")
                            alert("ERROR 404: Usuario no encontrado.");
                        
                        if (error.response.status == "403")
                            alert("ERROR 403: Contraseña Erronea.");  
                    });
            }
        }
    }
</script>

<style>
    #UserAuth{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container_auth_user {
        border: 1px solid #666769;
        border-radius: 10px;
        width: 30%;
        height: 50%;
        display: inline-flex;
        flex-direction: column;
        justify-content: initial;
        align-items: center;
        background-color: #e7e6e6;
    }

    #UserAuth h2{
        font-size: 30px;
        color: #434643;
    }

    #UserAuth form{
        width: 40%;
        
    }

    #UserAuth input{
        height: 25px;
        width: 100%;
        box-sizing: border-box;
        margin: 5px 0;
        border: 1px solid #283747;    
    }
    
    #UserAuth button{
        color: #D0DCD0;
        background: #434643;
        border: 1px solid #0000;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 13px;
        font-weight: bold;
    }

    #UserAuth button:hover{
        color: #434643;
        background: #6BDEBB;
        border: 1px solid #434643;
    }

    #UserAuth span{
        color: #47E5B5;
        font-weight: bold;
    }    
</style>