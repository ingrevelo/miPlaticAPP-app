import vueRouter from 'vue-router'
import User from './components/User'
import UserAuth from './components/UserAuth'
import UserBalance from './components/UserBalance'
import UserMovement from './components/UserMovement'
import UserConsulta from './components/UserConsulta'
import App from './App'

const router = new vueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: "root",
            component: App
        },
        {
            path: '/user/:username',
            name: "user",
            component: User
        },
        {
            path: '/user/auth',
            name: "user_auth",
            component: UserAuth
        },        
        {
            path: '/user/balance/:username',
            name: "user_balance",
            component: UserBalance
        },
        {
            path: '/user/movement/',
            name: "user_movement",
            component: UserMovement
        },    
        {
            path: '/user/consulta/',
            name: "user_consulta",
            component: UserConsulta
        },                
    ]
})
export default router