<template>
  <div class="container">
    <section v-if="assignment" class="hero is-primary m-t-md">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ assignment.Name }}
          </h1>
          <h2 class="subtitle">Created: {{ assignment.DateCreated }}</h2>
        </div>
      </div>
    </section>
    <b-button size="is-large" icon-left="plus" @click="isModalActive = true">
      Add book
    </b-button>
    <div class="list is-hoverable">
      <template v-for="book in books">
        <div :key="book.BookId" class="list-item">
          {{ book.Title }}
          <p class="has-text-grey-light is-pulled-right">
            Joined: {{ book.Author }}
          </p>
        </div>
      </template>
    </div>

    <!-- <section>
      <b-tabs position="is-centered" class="block">
        <b-tab-item label="Assignments">
          <b-button
            size="is-large"
            icon-left="plus"
            @click="isModalActive = true"
          >
            Create assignment
          </b-button>
          <div class="list is-hoverable m-t-md">
            <template v-for="assignment in assignments">
              <a :key="assignment.AssignmentId" class="list-item">
                {{ assignment.Name }}
                <p class="has-text-grey-light">
                  Created: {{ assignment.DateCreated }}
                </p>
              </a>
            </template>
          </div>
        </b-tab-item>
        <b-tab-item :label="membersTabText">
          <div class="list is-hoverable">
            <template v-for="member in members">
              <div :key="member.BookClubMemberId" class="list-item">
                {{ member.Name }}

                <b-tooltip
                  v-if="member.IsLeader"
                  label="Leader"
                  position="is-right"
                  class="is-pulled-right"
                >
                  <b-icon class="has-text-yellow " icon="crown"></b-icon>
                </b-tooltip>
                <p :key="member.BookClubMemberId" class="has-text-grey-light">
                  Joined: {{ member.DateJoined }}
                </p>
              </div>
            </template>
          </div>
        </b-tab-item>
      </b-tabs>
    </section> -->
    <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
      <Search />
    </b-modal>
  </div>
</template>

<script>
import Search from './Search';
export default {
  components: {
    Search
  },
  data: () => ({
    assignment: null,
    books: [],
    isModalActive: false
  }),
  created() {
    const id = this.$route.params.assignmentId;

    this.$store
      .dispatch('getAssignment', id)
      .then(response => {
        this.assignment = response;
      })
      .catch(err => console.log(err));
  },
  methods: {}
};
</script>

<style></style>
