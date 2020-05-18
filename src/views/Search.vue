<template>
  <div :class="{ 'modal-card': assignment }" style="width: auto">
    <header v-if="assignment" class="modal-card-head">
      <p class="modal-card-title">Add book to assignment</p>
    </header>

    <div :class="{ 'modal-card-body': assignment }">
      <b-field label="Search">
        <b-input v-model="query" @change.native="onSearch"></b-input>
      </b-field>
      <p v-if="books && books.length" class="m-b-md m-t-lg">
        Found
        <span class="has-text-primary has-text-weight-bold ">{{
          books.length
        }}</span>
        results
      </p>
      <div class="columns is-multiline">
        <template v-if="books && books.length">
          <div v-for="book in books" :key="book.etag" class="column is-4">
            <Book :book="book" :assignment="assignment" @bookAdded="addBook" />
          </div>
        </template>
        <div
          v-else
          class="column is-centered has-text-centered is-size-4 m-t-lg has-text-grey"
        >
          <b-icon size="is-large" icon="magnify"></b-icon>
          <p class="m-l-md">Search...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Book from './Book';

export default {
  components: {
    Book
  },
  props: ['assignment'],
  data() {
    return {
      books: [],
      query: ''
    };
  },
  methods: {
    onSearch() {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${this.query}`)
        .then(response => {
          this.books = response.data.items;
        })
        .catch(err => console.log(err));
    },
    addBook(item) {
      this.$emit('addToAssignment', item);
    }
  }
};
</script>

<style></style>
