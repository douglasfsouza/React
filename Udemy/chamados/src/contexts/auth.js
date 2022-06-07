import {React, createContext, useEffect, useState} from 'react';
import {toast} from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loadingAuth,setLoadingAuth] = useState(false);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        function loadStorage(){
            const storageUser = localStorage.getItem('SistemaUser');

            if (storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(true)
            }

            setLoading(false);
        }

        loadStorage();
        
    },[])

    async function signIn(email,password){
        setLoadingAuth(true);
        let url = "http://localhost:61749/User/acessar";
        let body = {Email: email, Senha:password};
        fetch(url,{method: 'post', body:JSON.stringify(body), headers: new Headers({
            'Content-Type' : 'application/json;charset=UTF-8'
        })})
        .then((r)=> {
            return r.json();
        })
        .then((x)=> {
            if (x.id ){
                let data = {
                    uid: x.id,
                    nome: x.nome,
                    email: x.email,
                    avatarURL: x.avatarURL
                };
                setUser(data);
                storageUser(data);
            }
            else{                 
                toast.error(x);
            }
            
            setLoadingAuth(false);
            
        })
        .catch((ex)=>{
            console.log(ex);
            setLoadingAuth(false);
        })     

    }

    async function signUp(nome,email,password){
        setLoadingAuth(true);
        let url = "http://localhost:61749/User/createUserWithEmailAndPassword";
        
        let body = {Nome:nome, Email:email, Senha:password};
        fetch(url, {method:'post',body:JSON.stringify(body), headers: new Headers({
            'Content-Type': 'application/json;charset=UTF-8'
        })})
        .then((r)=>{
            return r.json();
        })
        .then((x)=>{
            console.log(x);
            let data = {
                uid: x.id,
                nome: x.nome,
                email: x.email,
                avatarURL: x.avatarURL
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
        })
        .catch((ex)=>{
            console.log(ex);
            setLoadingAuth(false);
        })     

    }

    function storageUser(data){
        localStorage.setItem("sistemaUser",JSON.stringify(data));
    }

    function signOut(){
        localStorage.removeItem("sistemaUser");
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{signed: !!user, 
                                     user, 
                                     loading, 
                                     signUp, 
                                     signOut, 
                                     signIn,
                                     loadingAuth,
                                     setUser,
                                     storageUser}}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthProvider;