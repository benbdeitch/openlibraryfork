
<script>

import sampleBar from './sample_bar.vue'
import {BulkSearchState, ExtractedBook, BookMatch} from '../utils/classes.js';
import {buildSearchUrl} from '../utils/searchUtils.js'
export default {

    components: {
        sampleBar
    },
    props: {
        bulkSearchState: BulkSearchState
    },
    data() {
        return {

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
                const data = [...this.bulkSearchState.inputText.matchAll(regex)]

                this.bulkSearchState.extractedBooks = data.map((entry) =>  new ExtractedBook(entry.groups?.title, entry.groups?.author))
                this.bulkSearchState.matchedBooks = this.bulkSearchState.extractedBooks.map((entry) => new BookMatch(entry, []))
            }
        },
        async matchBooks(){
            const fetchSolrBook= async function (book, matchOptions){

                try {

                    const data = await fetch(buildSearchUrl(book, matchOptions, true))
                    return await data.json()
                }
                catch (error) {
                    return
                }

            }

            for (const bookMatch of this.bulkSearchState.matchedBooks) {
                bookMatch.solrDocs = await fetchSolrBook(bookMatch.extractedBook, this.bulkSearchState.matchOptions)

            }
        },

    }
}


</script>




<template>
    <details open>

        <summary>Input</summary>
  <div>
    <textarea  v-model="bulkSearchState.inputText"></textarea>
    <br />

    <label>Format: <select @change="selectAlgorithm">
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
</details>
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
