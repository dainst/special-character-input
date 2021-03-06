# special-character-input
Plain javascript for adding a minimalistic UTF-8 character selection. 

Ugly Demo: https://dainst.github.io/special-character-input

## General 
* The script is originally intended to be used in [Koha](https://koha-community.org), but should work on any website.
* The script automatically attaches a button (⌨️) to your page's body element, fixed to the top right. 
* You can configure your character groups by editing the [specialCharacters.json](specialCharacters.json).
* Backlink to Koha Wiki: https://wiki.koha-community.org/wiki/SpecialCharacters

## Setup in Koha
We added the following function to our IntranetUserJS:

```javascript
function loadSpecialCharacterSelection(){
  var fileRef = document.createElement('script')
  fileRef.setAttribute("type","text/javascript")
  fileRef.setAttribute("src", "/intranet-tmpl/prog/js/specialCharacters.js")
  
  document.querySelector("head").appendChild(fileRef);
}
```

As you can see, the javascript (and implicitely JSON) file is expected to be found at `/intranet-tmpl/prog/js` by default. If you want to change the paths, you have to either edit the snippet above __AND__ the javascript file for the new JSON path, or you can do something like this:

```javascript
var specialCharactersJsonPath = "/path/to/json/specialCharacters.json"

function loadSpecialCharacterSelection(){
  var fileRef = document.createElement('script')
  fileRef.setAttribute("type","text/javascript")
  fileRef.setAttribute("src", "/path/to/javascript/specialCharacters.js")
  
  document.querySelector("head").appendChild(fileRef);
}
```
