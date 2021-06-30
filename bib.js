async function generateBib()
{
    
    var bibString = await loadFile("pubs.bib");
    var bibList = Cite(bibString);
    bibList.sort(function(entryA, entryB)
    {
      return entryA.issued["date-parts"][0].toString() < entryB.issued["date-parts"][0].toString();
    });
    printPublications(bibList);    
}

async function loadFile(filePath) {
  var response = await fetch(filePath);
  if(response.status != 200) {
		throw new Error("Server Error:" + response.status);
	}
		
	// read response stream as text
	let text_data = await response.text();

	return text_data;
}

function printPublications(publist)
{
    let root = document.getElementById("publications");
    for (let i = 0; i < publist.data.length; i++)
    {
      let pubToProcess = publist.data[i];
      let authors = getAuthors(pubToProcess.author);
      let year = pubToProcess.issued["date-parts"][0].toString()
      let title = pubToProcess.title;
      let place = pubToProcess["container-title"];
      
      let pubDiv = document.createElement("div");
      pubDiv.className = "publication";
      pubDiv.innerHTML = title + " (" +  year + ") <i>" + authors + "</i> " + place;

      root.appendChild(pubDiv);
    }
}

function getAuthors(authors){
  let allAuthors = "";
  for (let j = 0; j < authors.length; j++)
  {
    allAuthors += authors[j].given + " " + authors[j].family;
    if (j != authors.length - 1)
    {
      allAuthors += ", ";
    }
  }
  return allAuthors;
};