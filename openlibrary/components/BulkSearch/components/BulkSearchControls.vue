
<script>

import sampleBar from './sample_bar.vue'
import {BulkSearchState, IdToExtractedBook, IdToBookMatch, ExtractedBook, BookMatch} from '../utils/classes.js';
import {searchUrl} from '../utils/searchUtils.js'
export default {

    components: {
        sampleBar
    },
    props: {
        bulkSearchState: BulkSearchState
    },
    data() {
        return {
            textArea: '',
            regexDict: {
                '': '',
                1: /(^|>)(?<title>[A-Za-z][A-Za-z0-9\- ,]{1,250})\s+(by|[-–—])\s+(?<author>[A-Za-z][A-Za-z.\- ]{3,70})( \(.*)?($|<\/)/gm,
                2: /^(?<title>[A-Za-z].{1,250})\s\(?<author>(.{3,70})\)$$/gm,
                3: /^(?<author>[^.()]+).*?\)\. (?<title>[^.]+)/gm
            }
        }
    },
    methods: {
        selectAlgorithm(e){
            this.bulkSearchState.extractionOptions.extractionAlgorithm.regex= this.regexDict[e.target.value]
        },
        extractBooks() {

            const regex = this.bulkSearchState.extractionOptions.extractionAlgorithm.regex
            if (regex && this.bulkSearchState.inputText){
                let data = [...this.bulkSearchState.inputText.matchAll(regex)]

                data = data.map((entry, index) =>  new ExtractedBook(entry.groups?.title, entry.groups?.author, index))
                const extractedBooks = new IdToExtractedBook()
                for (let i = 0; i<data.length; i++){
                    extractedBooks[i] = data[i]
                }
                this.bulkSearchState.extractedBooks = extractedBooks
            }
        },
        async matchBooks(){
            const fetchSolrBook= async function (book, matchOptions){

                try {

                    const data = await fetch(searchUrl(book, matchOptions, true))
                    return await data.json()
                }
                catch (error) {
                    return
                }

            }
            const matchedBooks = new IdToBookMatch()
            for (const key in Object.keys(this.bulkSearchState.extractedBooks)){
                const book = this.bulkSearchState.extractedBooks[key]
                const solrDocs = await fetchSolrBook(book, this.bulkSearchState.matchOptions)
                matchedBooks[book.index] = new BookMatch(book, solrDocs.docs, book.index)
            }
            this.bulkSearchState.matchedBooks = matchedBooks
        },

    }
}


</script>




<template>
    <div class="page">

        <summary>Input</summary>
  <div>
    <textarea ref="textArea" v-model="bulkSearchState.inputText" id="text"></textarea>
    <br />

    <label>Format: <select id="regex" @change="selectAlgorithm">
      <!-- order matters and is referenced in JS, useSample! -->
      <option value="1">e.g. "The Wizard of Oz by L. Frank Baum"</option>
      <option value="2">e.g. "The Wizard of Oz (L. Frank Baum)"</option>
      <option value="3">Wikipedia Citation (e.g. Baum, Frank L. (1994). The Wizard of Oz)</option>
    </select></label>
    <sampleBar @sample="(msg) => this.bulkSearchState.inputText = msg"/>
    <label>
      <input id="use-author" checked v-model="bulkSearchState.matchOptions.includeAuthor" type="checkbox"  /> Use author in search query
    </label>
    <label>
      <input id="is-list" v-model="bulkSearchState.extractionOptions.isBookList" type="checkbox"/> Input is a list of books (i.e. each line is a book)
    </label>
    <br>
    <button @click="extractBooks">Extract Books</button>
    <button @click="matchBooks">Match Books</button>
  </div>
</div>
</template>

<style lang="less">
body { padding :0;
    font-family: Roboto, Helvetica, sans-serif;
}

label input { flex: 1; }
textarea {
  width: 100%;
  display: flex;
}
</style>
