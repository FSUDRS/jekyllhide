links = document.getElementsByTagName("link");
body_index = [];
for(i = 0; i < links.length; i++){
    parent = links[i].parentNode.nodeName;
    if(parent == "DIV"){
        body_index.push(i);
    }
}
for(index in body_index){
    insertAfter(links[body_index[index]], links[body_index[index] - 1]);
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}