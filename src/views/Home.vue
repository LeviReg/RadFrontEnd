<template>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-parent ">
        <article class="tile is-child box has-text-centered">
          <b-icon class="has-text-info m-b-md" icon="book-open" size="is-large">
          </b-icon>
          <p class="title">Find books</p>
          <p class="subtitle">
            Search for your favourite books and add them to your collection
          </p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box has-text-centered">
          <b-icon
            class="has-text-danger m-b-md"
            icon="account-group"
            size="is-large"
          >
          </b-icon>
          <p class="title">Book clubs</p>
          <p class="subtitle">
            Create or join a book club to find likeminded readers
          </p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box has-text-centered">
          <b-icon
            class="has-text-primary m-b-md"
            icon="format-list-checks"
            size="is-large"
          >
          </b-icon>

          <p class="title">Reading assignments</p>
          <p class="subtitle">
            Partake in reading assignments as part of your club
          </p>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {}
};
</script>

<style scoped>
.is-ancestor {
  margin-top: 150px !important;
}
</style>
