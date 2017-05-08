export default (text="Hi world ") => {
    const component = document.createElement("div")
    component.innerText = text;

    return component;
}