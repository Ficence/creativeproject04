<template>
  <div class="event">
    <h1>Event Upload Page</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add an Event</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Title">

        <p></p>
        <span class="labelSpace">Month</span>
        <select class="scroll" name="months" id="months" v-model="month">
          <option v-for="index in 12" :value="index" :key="index">{{index}}</option>
        </select>

        <span v-if="posDays !== -1">
          <span class="labelSpace">Day</span>
          <select class="scroll" name="days" id="days" v-model="day">
            <option v-for="index in posDays" :value="index" :key="index">{{index}}</option>
          </select>
        </span>
        <p></p>

        <textarea class="textLimit" v-model="description" placeholder="Description"></textarea>
        <p></p>
        <button @click="addEvent" :disabled="!submittable">Add Event</button>
      </div>
    </div>

    <div class="heading">
      <div class="circle">2</div>
      <h2>Manage Event</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions scroll" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findEvent">
        <input v-model="findEvent.title">
        <p></p>

        <span class="labelSpace">Month</span>
        <select class="scroll" name="months" id="months" v-model="findEvent.month">
          <option v-for="index in 12" :value="index" :key="index">{{index}}</option>
        </select>

        <span v-if="posDays_manage !== -1">
          <span class="labelSpace">Day</span>
          <select class="scroll" name="days" id="days" v-model="findEvent.day">
            <option v-for="index in posDays_manage" :value="index" :key="index">{{index}}</option>
          </select>
        </span>

        <p></p>
        <textarea class="textLimit" v-model="findEvent.description"></textarea>
        <p></p>
      </div>
      <div class="actions" v-if="findEvent">
        <button @click="deleteEvent(findEvent)">Delete</button>
        <button @click="editEvent(findEvent)" :disabled="!submittable_manage">Edit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  background-color:#0088ff;
  width: 18px;
  height: 18px;
  padding: 8px;
  color: #fff;
  text-align: center
}

.scroll {
  overflow-y:scroll;
}

input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

textarea{
  resize: none;
}

.form {
  margin-right: 50px;
}

.labelSpace{
  margin: 0 5px 0 5px;
}
.textLimit{
  width: 200px;
  height: 150px;
}
.suggestions{
  height: 175px;
}

.suggestion{
  margin: 2px;
  padding: 2px 0 2px 0;
  text-align: center;
  background-color: #ddd;
  border-radius: 1pc;
  user-select: none;
}
.suggestion:hover{
  background-color: #ccc;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Event',
  data(){
    return {
      title: "",
      description: "",
      month: 0,
      day: 0,
      posDays: -1,

      event: null,
      events: [],
      findTitle: "",
      findEvent: null,
    }
  },
  computed: {
    suggestions() {
      let events = this.events.filter(event => event.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return events.sort((a, b) => a.title > b.title);
    },
    submittable(){
      if(this.month !== 0 && this.day !== 0 && this.title !== "" && this.description !== "")
        return true;
      return false;
    },
    submittable_manage(){
      if(this.findEvent !== null){
        if(this.findEvent.title !== "" && this.findEvent.description !== "")
          return true;
      }
      return false;
    },
  },
  created() {
    this.getEvents();
  },
  watch: {
    month: function(val){
      this.posDays = this.getProperDay(val);
    },
  },
  methods: {
    async addEvent() {
      try {
        let response = await axios.post('/api/events', {
          title: this.title,
          description: this.description,
          month: this.month,
          day: this.day,
        });
        this.event = response.data;

        this.title = "";
        this.month = 0;
        this.day = 0;
        this.description = "";
        this.posDays = -1;

      } catch (error) {
        console.log(error);
      }
    },
    async getEvents() {
      try {
        let response = await axios.get("/api/events");
        this.events = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findEvent = item;
      this.posDays_manage = this.getProperDay(item.month);
    },
    async deleteEvent(event) {
      try {
        await axios.delete("/api/events/" + event._id);
        this.findEvent = null;
        this.getEvents();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editEvent(event) {
      try {
        await axios.put("/api/events/" + event._id,{
          title: this.findEvent.title,
          description: this.findEvent.description,
          month: this.findEvent.month,
          day: this.findEvent.day,
        });
        this.findEvent = null;
        this.getEvents();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    getProperDay(val){
      if(val === 1 || val === 3 || val === 5 || val === 7 || val === 8 || val === 10 || val === 12){
        return 31;
      }
      else if(val === 4 || val === 6 || val === 9 || val === 11){
        if(this.day === 31)
          this.day = 0;
       return 30;
      }
      else if (val === 2){
        if(this.day > 29)
          this.day = 0;
        return 29;
      }
    }
  }
}
</script>
