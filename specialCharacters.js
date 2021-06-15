if (typeof specialCharactersJsonPath !== 'undefined') {
    var jsonPath = specialCharactersJsonPath
} else {
    var jsonPath = "/intranet-tmpl/prog/js/specialCharacters.json"
}

var lastSelectedCategory = null;
var characterGroup = document.createElement("div");
characterGroup.style.maxWidth = "300px";

var categoryButtons = [];

function setCategory(category) {
    for (var i = 0; i < categoryButtons.length; i++) {
        if (category === null) {
            categoryButtons[i].style.display = ""
        } else {
            if (categoryButtons[i].id !== "character-category-" + category) {
                categoryButtons[i].style.display = "none"
            } else {
                categoryButtons[i].style.display = ""
            }
        }
    }
    lastSelectedCategory = category;
}

function createCharacterButton(character) {
    var characterButton = document.createElement("button");
    characterButton.innerHTML = character;
    characterButton.style.fontSize = "large";
    characterButton.onmousedown = function (event) {
        event.preventDefault(); // Prevent focus change which would deselect input
        var element = document.activeElement;
        if (element.tagName.toUpperCase() !== "INPUT")
            return;
        element.value += character;
    }
    return characterButton;
}

function createCategoryButton(categoryName, characters) {
    var categoryButton = document.createElement("button");
    categoryButton.innerHTML = categoryName;
    categoryButton.id = "character-category-" + categoryName

    categoryButton.onmousedown = function (event) {
        event.preventDefault();  // Prevent focus change which would deselect input
        while (characterGroup.firstChild) {
            characterGroup.removeChild(characterGroup.lastChild);
        }

        if (lastSelectedCategory != categoryName) {
            for (var i = 0; i < characters.length; i++) {
                characterGroup.appendChild(
                    createCharacterButton(characters[i])
                );
            }
            setCategory(categoryName);
        } else {
            setCategory(null);
        }
    };
    categoryButtons.push(categoryButton);
    return categoryButton
}

function createInterface(characterData) {
    var mainGroup = document.createElement("div");
    mainGroup.style.top = "50px";
    mainGroup.style.position = "fixed";
    mainGroup.style.zIndex = 400;
    mainGroup.style.right = "2px";

    var mainButton = document.createElement("button");
    mainButton.innerHTML = "&#x2328;"; // UTF-8 Code for keyboard symbol
    mainButton.style.width = "100%";

    var categoryGroup = document.createElement("div");

    entries = Object.entries(characterData);

    for (var i = 0; i < entries.length; i++) {
        var category = entries[i][0];
        var characters = entries[i][1];
        categoryGroup.appendChild(createCategoryButton(entries[i][0], entries[i][1]));
    }

    categoryGroup.style.display = "none";

    mainButton.onmousedown = function (event) {
        event.preventDefault(); // Prevent focus change which would deselect input
        if (categoryGroup.style.display == "none") {
            categoryGroup.style.display = "grid"
        } else {
            categoryGroup.style.display = "none"
        }
        setCategory(null);
        while (characterGroup.firstChild) {
            characterGroup.removeChild(characterGroup.lastChild);
        }
    }

    mainGroup.appendChild(mainButton);
    mainGroup.appendChild(categoryGroup);
    mainGroup.appendChild(characterGroup);
    document.querySelector("body").appendChild(mainGroup);
}

function setup() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            createInterface(JSON.parse(this.responseText));
        }
    };
    xmlhttp.open("GET", jsonPath);
    xmlhttp.send();
}

setup();
