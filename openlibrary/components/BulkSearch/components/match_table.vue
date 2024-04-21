

<script>
import TableRow from './tableRow.vue'
import {BulkSearchState} from '../utils/classes.js'

export default {
    components: {
        TableRow
    },
    props: {
        bulkSearchState: BulkSearchState
    },
    computed: {
        entries(){
            return Object.keys(this.bulkSearchState.extractedBooks)
        }
    }
}</script>


<template>
  <div>
    <table  v-if="entries.length" id="results">
  <thead>
    <tr>
      <th>i</th>
      <th style="min-width: 200px">Title</th>
      <th style="min-width: 200px">Author</th>
      <th style="width: 100%">Matches</th>
    </tr>
  </thead>
  <tbody>
    <TableRow v-for= "value, key in bulkSearchState.extractedBooks" :book="value"  :bulkSearchState= "bulkSearchState"  :key="key" />
  </tbody>
  <tfoot>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td><a href="#" target="_blank" id="listMakerLink">Create list of first matches</a></td>
    </tr>
  </tfoot>
</table>
</div>
</template>

<style>
table { border-collapse: collapse; }

</style>
