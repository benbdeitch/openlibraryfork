class ExtractedBook {
    constructor(title = '', author = '') {
        /** @type {string} */
        this.title = title;
        /**@type {string} */
        this.author = author;

    }
}

class ExtractionAlgorithm{
    constructor(option = ''){
        this.regex = ''
        this.option= option
    }
}

class ExtractionOptions {
    constructor() {
        this.isBookList = false;
        this.extractionAlgorithm = new ExtractionAlgorithm()
    }
}
class MatchOptions  {
    constructor (){
        this.includeAuthor = true;
    }
}
class BookMatch {
    constructor(extractedBook, solrDocs){
        /** @type {ExtractedBook} */
        this.extractedBook = extractedBook;
        /** @type {SolrDoc[]} */
        this.solrDocs = solrDocs
    }
}



class BulkSearchState{
    constructor(){
        /** @type {string} */
        this.inputText= '';
        /** @type {extractedBooks[]} */
        this.extractedBooks = [];
        /** @type {BookMatch[]} */
        this.matchedBooks = [];
        /** @type {MatchOptions} */
        this.matchOptions =  new MatchOptions()
        /** @type {ExtractedOptions} */
        this.extractionOptions = new ExtractionOptions();
    }

}

export {BulkSearchState, ExtractedBook, BookMatch}
