function generateBib()
{
    
    var bibString = loadFile("bib.js");
    var bibList = Cite(bibString);
    document.getElementById("publications").innerHTML = "All Publication";
    
}

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    }
    return result;
  }