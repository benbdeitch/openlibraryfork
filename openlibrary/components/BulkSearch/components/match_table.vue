

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
}</script>


<template>
  <div>
    <table  :v-if= "this.bulkSearchState.matchedBooks" id="results">
  <thead>
    <tr>
      <th>i</th>
      <th style="min-width: 200px">Title</th>
      <th style="min-width: 200px">Author</th>
      <th style="width: 100%">Matches</th>
    </tr>
  </thead>
  <tbody>
    <TableRow v-for= "bookMatch,index  in this.bulkSearchState.matchedBooks" :bookMatch = "bookMatch" :index="index" :bulkSearchState= "bulkSearchState"  :key="index" />
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
