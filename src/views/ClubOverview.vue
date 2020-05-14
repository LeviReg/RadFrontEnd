<template>
  <div class="container">
    <section v-if="club" class="hero is-primary m-t-md">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ club.Name }}
          </h1>
          <h2 class="subtitle">Created: {{ club.DateCreated }}</h2>
        </div>
      </div>
    </section>

    <section>
      <b-tabs position="is-centered" class="block">
        <b-tab-item label="Assignments">
          <b-button
            size="is-large"
            icon-left="plus"
            @click="isModalActive = true"
          >
            Create assignment
          </b-button>
          <div v-if="assignments.length" class="list is-hoverable m-t-md">
            <template v-for="assignment in assignments">
              <a
                :key="assignment.AssignmentId"
                class="list-item"
                @click="gotoAssignment(assignment)"
              >
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
    </section>
    <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
      <form @submit.prevent="submitAssignment">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Create Assignment</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Assignment name">
              <b-input
                v-model="assignmentName"
                type="text"
                :value="assignmentName"
                placeholder="..."
                required
              >
              </b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="isModalActive = false">
              Close
            </button>
            <button class="button is-primary" type="submit">Create</button>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data: () => ({
    club: null,
    members: [],
    isModalActive: false,
    assignments: [],
    assignmentName: ''
  }),
  computed: {
    membersTabText() {
      return `Members (${this.members.length})`;
    }
  },
  created() {
    const id = this.$route.params.bookClubId;

    this.$store
      .dispatch('getBookClub', id)
      .then(response => {
        this.club = response;
      })
      .catch(err => console.log(err));

    this.$store
      .dispatch('getClubMembers', id)
      .then(response => {
        this.members.push(...response);
      })
      .catch(err => console.log(err));

    this.$store
      .dispatch('getAssignmentsByClub', id)
      .then(response => {
        this.assignments.push(...response);
      })
      .catch(err => console.log(err));
  },
  methods: {
    submitAssignment() {
      const assignmentData = {
        Name: this.assignmentName,
        BookClubId: this.$route.params.bookClubId
      };
      this.$store
        .dispatch('postAssignment', assignmentData)
        .then(response => {
          console.log(response);

          this.assignments.push(response);
        })
        .catch(err => console.log(err));
    },
    gotoAssignment(assignment) {
      this.$router.push({
        name: 'Assignment',
        params: { assignmentId: assignment.AssignmentId }
      });
    }
  }
};
</script>

<style></style>
