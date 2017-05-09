import component from './component';
import './main.css'
import foo from './express.jpg'

document.body.appendChild(component())
const pic = document.createElement('img')

pic.src = foo

document.body.appendChild(pic)

