import React, { FormEvent } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

// 鸭子类型 ，面向接口编程 ，而不是面向对象编程
export const LoginScreen = () => {
    // XMLHttpRequest 发送post请求可以拿到请求对象
    const requestFunc = () => {
        let xhr = new XMLHttpRequest()
        xhr.open('POST','http://localhost:3001/login')
        xhr.setRequestHeader('Content-type','application/json')
        xhr.send(JSON.stringify({username:'sola',password:'123'}))
        xhr.addEventListener('load', function () {
            console.log(this.response)
       }) 
    }
    const login = (param:{username:string,password:string}) => {
        // requestFunc()
        fetch(`${apiUrl}/login`,{
            method:'post',
            body:JSON.stringify({username:'sola',password:'123'}),
            headers: {
                'Content-Type': 'application/json'
              }
        }).then(
            async (response) => {
              if (response.ok) {
                
              }
            }
          )
    }
    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        login({username,password})
    }
    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id="username"/>
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id="password"/>
        </div>
        <button type="submit">登录</button>
    </form>
}