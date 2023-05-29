<template>
    <div>
        <nav class="navbar is-info" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <h3 class="title is-3">Login</h3>
            </div>
        </nav>
        <br>
        <div class="columns is-centered">
            <div class="column is-half">
                <div v-if="error != undefined">
                    <div class="notification is-danger">
                        <p>{{ error }}</p>
                    </div>
                </div>
                <p>Email</p>
                <input type="email" placeholder="Email" class="input" v-model="email">
                <p>Senha</p>
                <input type="password" placeholder="******" class="input" v-model="password">
                <hr>
                <button class="button is-success" @click="login">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    data(){
        return{
            password: '',
            email: '',
            error: undefined,
        }
    },
    methods:{
        login(){
            axios.post("http://localhost:8686/login",{
                password: this.password,
                email: this.email
            }).then(res =>{
                console.log(res);
                localStorage.setItem('token', res.data.token)
                this.$router.push({name: 'users'});
            }).catch(err =>{
                var msgErro = err.response.data.err
                console.log(msgErro);
                this.error = msgErro;
            })
        }
    }
}
</script>

<style scoped>

</style>