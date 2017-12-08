function get_authors(string) {
    var list = string.split(' and ');
    var authors = [];
    for (var i = 0; i < list.length; i++) {
        var names = list[i].split(', ');
        var author = names[1] + ' ' + names[0];
        authors.push(author);
    }
    return authors.join(' | ');
}

function get_file_name(string) {
    var split_string = string.split('/');
    var str_part = split_string[split_string.length - 1];
    var file_name = str_part.split(':')[0];
    return file_name;
}

function add_item_div(item) {
    var id = item.citationKey;
    var title = (item.entryTags.title).replace('{', '').replace('}', '');
    var authors = get_authors(item.entryTags.author);
    var journ_year = item.entryTags.journal + ' | ' + item.entryTags.year;
    var abstract = item.entryTags.abstract.replace('{\\', '').replace('}', '');
    var link = item.entryTags.url;
    var pdf = 'pubs/' + get_file_name(item.entryTags.file);

    var item_div = $('<div>', {id: id, class: 'pubs-item'});
    var year_div = $('<div>', {class: 'pubs-journ-year'}).text(journ_year);
    var title_div = $('<div>', {class: 'pubs-title'}).text(title);
    var auth_div = $('<div>', {class: 'pubs-authors'}).text(authors);
    var abstr_div = $('<div>', {class: 'pubs-abstr'}).text(abstract);

    var buttons = $('<div>', {class: 'pubs-buttons'});

    var abstr_button = $('<a>')
        .append($('<span>').text('Abstract'))
        .click(function() {abstr_div.slideToggle();});

    var link_button = $('<a>', {href: link})
        .append($('<i>', {class: 'fa fa-link'}))
        .append($('<span>').text('Link'));

    var pdf_button = $('<a>', {href: pdf})
        .append($('<i>', {class: 'fa fa-file-pdf-o'}))
        .append($('<span>').text('PDF'));

    $(buttons).append(abstr_button);
    $(buttons).append(link_button);
    $(buttons).append(pdf_button);

    $(item_div).append(year_div);
    $(item_div).append(title_div);
    $(item_div).append(auth_div);
    $(item_div).append(abstr_div);
    $(item_div).append(buttons);

    $('#pubs').append(item_div);

    return function() { add_item_div(item); };
}

$.get('pubs/pubs.bib', function(data) {
    var bib_data = bibtexParse.toJSON(data);
    for (var i = 0; i < bib_data.length; i++) {
        add_item_div(bib_data[i]);
    }
});
