function addPerson() {
}

function searchPerson() {
    var searchName = document.getElementById('searchName').value;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "search.php?name=" + searchName, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('resultArea').innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}
