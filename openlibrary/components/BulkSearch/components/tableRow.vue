

<script>
import {BulkSearchState, ExtractedBook} from '../utils/classes.js'
import {searchUrl} from '../utils/searchUtils.js'
import BookCard from './BookCard.vue'
export default {
    components: {
        BookCard
    },
    props: {
        bulkSearchState: BulkSearchState,
        book: ExtractedBook,

    },

    data() {
        return {
            OL_SEARCH_BASE: 'openlibrary.org',
        }
    },
    computed: {
        searchUrlVue(){
            return searchUrl(this.book, this.bulkSearchState.matchOptions, false)
        },
        bookMatch(){
            return this.bulkSearchState.matchedBooks? this.bulkSearchState.matchedBooks[this.book.index] : {solrDocs: []}

        }
    }


}
</script>

<template>
<tr>
    <td>{{book.index+1}}</td>
    <td>{{book.title}}</td>
    <td>{{book.author}}</td>
      <td class="bookCards">
        <a :href="searchUrlVue">L</a>
        <div v-if="!bookMatch?.solrDocs" class="empty"></div>
    <BookCard v-for="doc, index in bookMatch?.solrDocs" :doc="doc" :key ="index" /></td>
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
