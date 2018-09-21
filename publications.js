// TODO Should non journal stuff be added to a different section or be mixed in among the journal articles?



// FUNCTIONS

function toggleAbstract(event) {
  var parentEntry = event.target.parentElement.parentElement;
  var abstrDiv = parentEntry.getElementsByClassName('pubs-abstr')[0];
  var abstrIcon = event.target.getElementsByTagName('i')[0];
  if (abstrDiv.style.display === "none") {
    var allAbstracts = document.getElementsByClassName('pubs-abstr');
    for (var k = 0; k < allAbstracts.length; k++) {
      allAbstracts[k].style.display = 'none';
    }
    abstrDiv.style.display = "block";
    abstrIcon.classList.remove('fa-angle-double-down');
    abstrIcon.classList.add('fa-angle-double-up');
  }
  else {
    abstrDiv.style.display = "none";
    abstrIcon.classList.remove('fa-angle-double-up');
    abstrIcon.classList.add('fa-angle-double-down');
  }
}

function addSection(parentDiv, htmlClass, htmlString, display=null){
    var div = document.createElement('div');
    if (display === 'none') {
        div.style.display = 'none';
      }
      div.classList.add(htmlClass);
      var node = document.createTextNode(htmlString);
      div.appendChild(node);
      parentDiv.appendChild(div);
}

function addButton(parent, text, iconClass, link, funct) {
  var button = document.createElement('a');
  button.classList.add('pubs-link-button');
  var buttonIcon = document.createElement('i');
  buttonIcon.classList.add('fa', iconClass);
  var buttonNode = document.createTextNode(text);
  if (link !== null) {
    console.log(link)
    button.href = link;
  }
  if (funct === 'toggle') {
    button.onclick = function(event){
      toggleAbstract(event);
    };
  }
  button.appendChild(buttonIcon);
  button.appendChild(buttonNode);
  parent.appendChild(button);
}

////////////////////////////////////////////////////////////////////////////////

// Retrieve pubs.bib file from server
var url = 'pubs/pubs.bib';
xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", url, false);
xmlhttp.send();

// Parse .bib into array and sort by year
var bibArray = bibtexParse.toJSON(xmlhttp.responseText);
var sortedBibArray = bibArray.sort(function(a, b){
  return b.entryTags.year - a.entryTags.year;
});

// Build html for each entry in array
var pubsDiv = document.getElementById('pubs');
for (var i = 0; i < sortedBibArray.length; i++) {
  var entry = sortedBibArray[i];
  var title = entry.entryTags.title.replace('{', '').replace('}', '');




  // Make author line string
  var individuals = entry.entryTags.author.split('and');
  var authorArray= [];
  for (var j = 0; j < individuals.length; j++) {
    var names = individuals[j].split(', ');
    var authorName = names[1] + ' ' + names[0];
    authorArray.push(authorName);
  }
  var authors = authorArray.join(' | ');

  // Get pdf file path
  var split = entry.entryTags.file.split('/');
  var part = split[split.length - 1];
  var pdfPath = 'pubs/' + part.split(':')[0];


  var entryDiv = document.createElement('div');
  entryDiv.classList.add('pubs-entry');

  // Make this more flexible to accomodate book titles for when the pub is a book chapter
  var year = entry.entryTags.journal + ' | ' + entry.entryTags.year;
  addSection(entryDiv, 'pubs-journ-year', year);


  // TODO Make more flexible to accomodate books and book chapters
  addSection(entryDiv, 'pubs-title', title);


  addSection(entryDiv, 'pubs-authors', authors);


  // TODO Add check for whether abstract exists or not before adding div
  var abstract = entry.entryTags.abstract.replace('{\\', '').replace('}', '');
  addSection(entryDiv, 'pubs-abstr', abstract, display='none');




  // Make buttons and add to entry
  var buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('pubs-buttons');


  // Add Buttons

  // TODO Add if statement to check for abstract before adding toggle
  addButton(buttonsDiv, 'Abstract', 'fa-angle-double-down', null, 'toggle')


  // DOI link button if DOI is available
  // TODO Add if statement to check for doi link before adding button
  // TODO Check if link is non doi link and change text to "link"
  var doiLink = entry.entryTags.url;
  addButton(buttonsDiv, 'DOI', 'fa-link', doiLink, null)



  // Add pdf button if pdf is available
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("HEAD", pdfPath, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    addButton(buttonsDiv, 'PDF', 'fa-file-pdf', pdfPath, null)
  }

  // TODO Add tweet button
  // TODO Add data button

  // Add buttons to entry and entry to webpage
  entryDiv.appendChild(buttonsDiv);
  pubsDiv.appendChild(entryDiv);

}
