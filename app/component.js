export default (text="Hi there") => {
    const component = document.createElement('div')
    component.innerText = text

    return component
}