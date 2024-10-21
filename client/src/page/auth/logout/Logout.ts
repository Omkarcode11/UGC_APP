import { redirect } from "react-router-dom"

export function loader(){
    localStorage.removeItem('token')
    return redirect('/')
}