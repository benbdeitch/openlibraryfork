

<script>
import {BulkSearchState, BookMatch} from '../utils/classes.js'
import {searchUrl} from '../utils/searchUtils.js'
import BookCard from './BookCard.vue'
export default {
    components: {
        BookCard
    },
    props: {
        bulkSearchState: BulkSearchState,
        bookMatch: BookMatch,
        index: Number

    },

    data() {
        return {
            OL_SEARCH_BASE: 'openlibrary.org',
        }
    },
    computed: {
        searchUrlVue(){
            return searchUrl(this.bookMatch.extractedBook, this.bulkSearchState.matchOptions, false)
        }
    }


}
</script>

<template>
<tr>
    <td>{{index+1}}</td>
    <td>{{bookMatch.extractedBook.title}}</td>
    <td>{{bookMatch.extractedBook.author}}</td>
      <td class="bookCards">
        <a :href="searchUrlVue">L</a>

    <BookCard v-for="(doc, index) in bookMatch.solrDocs.docs" :doc="doc" :key ="index" />

    </td>
</tr>
</template>

<style>

    td,th { border: 1px solid; padding: 4px; }
   .bookCards {
  font-family: Roboto, sans-serif;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;

  .empty {
    display: none;
    &:first-child:last-child {
      display: flex;
    }
    width: 80vw;
    max-width: 300px;
    height: 80px;
    border: 1px dashed;
    justify-content: center;
    align-items: center;
    vertical-align: center;
    flex-shrink: 0;
    border-radius: 4px;
  }
}
</style>
