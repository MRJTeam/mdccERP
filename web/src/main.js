import React from 'react'
import ReactDOM from 'react-dom'
import Container from './Container'
const render = () => {
    ReactDOM.render(
        <Container/>,
        document.getElementById('app')
    )
}
render()