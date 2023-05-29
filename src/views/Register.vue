<template>
    <div>
        <nav class="navbar is-info" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <h3 class="title is-3">Registro de Usuários</h3>
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
                <p>Nome</p>
                <input type="text" placeholder="nome do usuário" class="input" v-model="name">
                <p>Email</p>
                <input type="email" placeholder="Email" class="input" v-model="email">
                <p>Senha</p>
                <input type="password" placeholder="******" class="input" v-model="password">
                <hr>
                <button class="button is-success" @click="register">Cadastrar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    data(){
        return{
            name: '',
            password: '',
            email: '',
            error: undefined,
        }
    },
    methods:{
        register(){
            axios.post("http://localhost:8686/user",{
                name: this.name,
                password: this.password,
                email: this.email
            }).then(res =>{
                console.log(res);
                this.$router.push({name: 'home'});
            }).catch(err =>{
                var msgErro = err.response.data.err
                console.log(msgErro);
                this.error = msgErro
            })
        }
    }
}
</script>

<style scoped>

</style>