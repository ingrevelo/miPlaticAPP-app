<template>
  <div id="app">
    <div class="header">
      <div id="logo">
        <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/peso-2640441-2188930.png" class="app-logo" alt="Logotipo">
        <span style="font-size: 30px; font-weight:bold"> 
          miPlaticApp
        </span>
      </div>
      <!-- <div id="logo2">
        <h1>miPlaticApp</h1>
      </div> -->
      <nav>
        <button v-on:click="init" v-if="is_auth" > Inicio </button>
        <button v-on:click="getBalance" v-if="is_auth" > Tu Ahorro </button>
        <button v-on:click="putMovement" v-if="is_auth" > Ingresar Movimiento </button>
        <button v-if="is_auth" > Metas </button>
        <button v-on:click="getMovement" v-if="is_auth" > Consultar Movimientos </button>
        <button v-if="is_auth" > Tips </button>
        <button v-on:click="logOut" v-if="is_auth" > Cerrar Sesión </button>
      </nav>
    </div>

    <div class="main-component">
      <router-view  v-on:log-in="logIn" ></router-view>
      <!-- <router-view></router-view> -->
    </div>
    
    <div class="footer">
      <h2>"Ahorrar no es solo guardar, sino saber gastar"</h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data: function(){
      return {
        is_auth: localStorage.getItem('isAuth') || false
      }
    },

    methods: {
      updateAuth: function(){
        var self = this
        self.is_auth  = localStorage.getItem('isAuth') || false
        if(self.is_auth == false)
          self.$router.push({name: "user_auth"})
        else{
          let username = localStorage.getItem("current_username")
          self.$router.push({name: "user", params:{ username: username }})
        }  
      },
      logIn: function(username){
        localStorage.setItem('current_username', username)
        localStorage.setItem('isAuth', true)
        this.updateAuth()
      },
      logOut: function(){
        localStorage.removeItem('isAuth')
        localStorage.removeItem('current_username')
        this.updateAuth()
      },
      init: function(){
        if(this.$route.name != "user"){
          let username = localStorage.getItem("current_username")
          this.$router.push({name: "user", params:{username:username}})
        }
      },
      getBalance: function(){
        if(this.$route.name != "user_balance"){
          let username = localStorage.getItem("current_username")
          this.$router.push({ name:"user_balance", params:{username:username}})
        }
      },
      putMovement: function(){
        if(this.$route.name != "user_movement"){
          let username = localStorage.getItem("current_username")
          this.$router.push({ name:"user_movement", params:{username:username}})
        }
      },  
      getMovement: function(){
        if(this.$route.name != "user_consulta"){
          let username = localStorage.getItem("current_username")
          this.$router.push({ name:"user_consulta", params:{username:username}})
        }    
      },      
    },
    created: function(){
      this.$router.push({name: "root"})
      this.updateAuth()
    }    
    // beforeCreate: function(){
    //   localStorage.setItem('current_username', 'cesarR12')
    //   localStorage.setItem('isAuth', true)
    //   this.$router.push({name:"user",params:{username:'cesarR12'}})
    // }
  }
</script>

<style>
  body{
    margin: 0 0 0 0;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -moz-osx-font-smoothing: antialiased;
  }

  .header{
    margin: 0%;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;
    background-color: #BBCFB9;
    color:#434643;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h1{
    width: 20%;
    text-align: center;
  }

  .header nav {
    height: 100%;
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 35px;
  }

  .header nav button{
    color: #D0DCD0;
    background: #434643;
    border: 1px solid #0000;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: bold;
  }

  .header nav button:hover{
    color: #434643;
    background: #6BDEBB;
    border: 1px solid #434643;
  }

  .header nav button:focus{
    color: #434643;
    background: #6BDEBB;
    border: 1px solid #434643;
  }

  .main-component{
  height: 75vh;
  margin: 0%;
  padding: 0%;
  background: #FDFEFE;
  }

  .footer{
    margin: 0px;
    padding: 0;
    width: 100%;
    height: 6vh;
    min-height: 70px;
    background-color: #BBCFB9;
    color: #434643;
  }

  .footer h2{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #logo {
      width: -10%;
      font-size: 30px;
      float: left;
      margin: 4px 5px 6px 10px;
  }

  /* #logo2 {
      width: -1%;
      font-size: 15px;
      float: left;
      margin: 4px 5px 6px -20px;
  } */

  #logo img {
      display: block;
      float: left;
      height: 60px;
      margin-top: -9px;
      margin-right: 1px;
      animation: girar infinite 30s linear;
  }

  /*Creando animacion*/
  @keyframes girar {
      from {
          transform: rotate(0deg);
      }
      to {
          transform: rotate(360deg);
      }
  }
</style>