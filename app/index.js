import component from './component'
import './main.css'
import bigImg from './bigpic.jpeg'
import gruntImg from './grunt.png'

const grunt = document.createElement('img')
grunt.src = gruntImg

const bigImageComponent = document.createElement('img')
bigImageComponent.src = bigImg

document.body.appendChild(component())
document.body.appendChild(grunt)
document.body.appendChild(bigImageComponent)