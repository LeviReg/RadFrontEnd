<template>
  <div class="container">
    <section v-if="club" class="hero is-danger m-t-md">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ club.Name }}
          </h1>
          <h2 v-if="club.Description" class="subtitle">
            {{ club.Description }}
          </h2>
          <h2 class="subtitle ">
            Created: {{ format(new Date(club.DateCreated), 'dd-MM-yyyy') }}
          </h2>
          <b-button
            v-if="!isMember"
            type="is-primary"
            icon-left="plus"
            @click="joinClub()"
          >
            Join
          </b-button>
          <b-button
            v-if="isOwner"
            type="is-light"
            outlined
            icon-left="delete"
            @click="deleteClub()"
          >
            Delete Club
          </b-button>
        </div>
      </div>
    </section>

    <section>
      <b-tabs position="is-centered" class="block">
        <b-tab-item label="Assignments">
          <b-button
            v-if="isOwner"
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

          <div
            v-else
            class="column is-centered has-text-centered is-size-5 m-t-lg has-text-grey"
          >
            <p>This club has no assignments</p>
          </div>
        </b-tab-item>
        <b-tab-item :label="membersTabText">
          <div v-if="members.length" class="list is-hoverable">
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
                  Joined:
                  {{
                    formatDistanceToNow(new Date(member.DateJoined), {
                      addSuffix: true
                    })
                  }}
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
            <b-field label="Name">
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
import { format, formatDistanceToNow } from 'date-fns';
import { mapState } from 'vuex';

export default {
  data: () => ({
    club: null,
    members: [],
    isModalActive: false,
    assignments: [],
    assignmentName: '',
    format,
    formatDistanceToNow
  }),
  computed: {
    ...mapState(['user']),
    membersTabText() {
      return `Members (${this.members.length})`;
    },
    isOwner() {
      if (!this.members.length) {
        return false;
      }
      const leader = this.members.find(m => m.IsLeader === true);

      return leader && leader.UserId === this.user.Id;
    },
    isMember() {
      return this.members.length
        ? this.members.some(m => m.UserId === this.user.Id)
        : false;
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
          this.assignments.push(response);
          this.isModalActive = false;
        })
        .catch(err => console.log(err));
    },
    gotoAssignment(assignment) {
      this.$router.push({
        name: 'Assignment',
        params: { assignmentId: assignment.AssignmentId }
      });
    },
    joinClub() {
      this.$store
        .dispatch('postClubMember', {
          UserId: this.user.Id,
          BookClubId: this.club.BookClubId,
          IsLeader: false,
          Name: this.user.Email
        })
        .then(response => {
          this.members.push(response);
        });
    },
    deleteClub() {
      this.$store.dispatch('deleteClub', this.club.BookClubId).then(() => {
        this.$router.push({ name: 'clubs' });
      });
    }
  }
};
</script>

<style></style>
