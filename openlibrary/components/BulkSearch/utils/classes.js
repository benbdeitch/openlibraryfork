class ExtractedBook {
    constructor(title = '', author = '') {
        this.title = title;
        /** @type {string} */
        this.author = author;
        /**@type {string} */
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
        this.extractedBook = extractedBook;
        /** @type {ExtractedBook} */
        this.solrDocs = solrDocs
        /** @type {SolrDoc[]} */
    }
}



class BulkSearchState{
    constructor(){
        this.inputText= '';
        /** @type {string} */
        this.extractedBooks = [];
        /** @type {extractedBooks[]} */
        this.matchedBooks = [];
        /** @type {BookMatch[]} */
        this.matchOptions =  new MatchOptions()
        /** @type {MatchOptions} */
        this.extractionOptions = new ExtractionOptions();
        /** @type {ExtractedOptions} */
    }

}

export {BulkSearchState, ExtractedBook, BookMatch}
