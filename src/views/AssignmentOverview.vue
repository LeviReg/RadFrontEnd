<template>
  <div class="container">
    <section v-if="assignment" class="hero is-primary m-t-md">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ assignment.Name }}
          </h1>
          <h2 class="subtitle">
            Created:
            {{
              formatDistanceToNow(new Date(assignment.DateCreated), {
                addSuffix: true
              })
            }}
          </h2>
        </div>
      </div>
    </section>
    <b-button
      size="is-large"
      icon-left="plus"
      class="m-t-md"
      @click="isModalActive = true"
    >
      Add book
    </b-button>
    <p v-if="books.length" class="m-t-lg m-b-sm">
      Books in assignment
      <span class="has-text-primary has-text-weight-bold"
        >({{ books.length }})</span
      >
    </p>
    <div v-if="books.length" class="list">
      <template v-for="book in books">
        <a :key="book.BookId" class="list-item">
          <p class="has-text-primary">{{ book.Title }}</p>
          <p class="has-text-grey-light is-pulled-right">
            {{ book.Genre }}
          </p>
          <p>By: {{ book.Author }}</p>
          <p class="has-text-grey-light m-b-md">
            Added: {{ formatDistanceToNow(new Date(book.DateCreated)) }}
          </p>
          <p :key="book.BookId" class="has-text-grey-light">
            {{ book.Description }}
          </p>
        </a>
      </template>
    </div>
    <div
      v-else
      class="column is-centered has-text-centered is-size-5 m-t-lg has-text-grey"
    >
      <p>This collection has no books yet</p>
    </div>
    <b-modal :active.sync="isModalActive" scroll="keep">
      <Search :assignment="true" @addToAssignment="bookToAssignment" />
    </b-modal>
  </div>
</template>

<script>
import { format, formatDistanceToNow } from 'date-fns';
import Search from './Search';
export default {
  components: {
    Search
  },
  data: () => ({
    assignment: null,
    books: [],
    isModalActive: false,
    format,
    formatDistanceToNow
  }),
  created() {
    const id = this.$route.params.assignmentId;

    this.$store
      .dispatch('getAssignment', id)
      .then(response => {
        this.assignment = response;
      })
      .catch(err => console.log(err));

    this.$store
      .dispatch('getBooksByAssignment', id)
      .then(response => {
        this.books.push(...response);
      })
      .catch(err => console.log(err));
  },
  methods: {
    bookToAssignment(item) {
      this.books.push(item);

      this.isModalActive = false;
    }
  }
};
</script>

<style></style>
