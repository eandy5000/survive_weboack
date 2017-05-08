export default (text = "Hello") => {
    const element = document.createElement('div');
    element.innerText = text;
    return element;
}