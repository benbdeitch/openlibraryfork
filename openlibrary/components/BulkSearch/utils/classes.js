class ExtractedBook {
    constructor(title = '', author = '', index = 0) {
        this.title = title;
        /** @type {string} */
        this.author = author;
        /**@type {string} */
        this.index = index
        /** @type {Number} */
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
    constructor(extractedBook, solrDocs, index='0'){
        this.extractedBook = extractedBook;
        /** @type {ExtractedBook} */
        this.solrDocs = solrDocs
        /** @type {SolrDoc[]} */
        this.index=  index
    }
}

class SolrDoc {
    constructor() {

    }
}
//Used to match ids to books, and avoid checking through an array to find a matching book when all that is provided is the extractedBook
class IdToBookMatch {
    constructor(){

    }
}
class IdToExtractedBook{
    constructor(){

    }
}

class BulkSearchState{
    constructor(){
        this.inputText= '';
        /** @type {string} */
        this.extractedBooks = new IdToExtractedBook;
        /** @type {IdToExtractedBook} */
        this.matchedBooks = new IdToBookMatch();
        /** @type {IdToBookMatch} */
        this.matchOptions =  new MatchOptions()
        /** @type {MatchOptions} */
        this.extractionOptions = new ExtractionOptions();
        /** @type {ExtractedOptions} */
    }

}

export {BulkSearchState, IdToExtractedBook, IdToBookMatch, ExtractedBook, BookMatch, SolrDoc}
