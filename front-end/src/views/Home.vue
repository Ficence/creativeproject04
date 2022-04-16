<template>
  <div class="home">
    <section class="todo-events">
      <div style="text-align:center">
        <h1>Upcoming Events</h1>
      </div>
      <div id="eventContainer">
        <div class="event" v-for="event in events" :key="event.id">
          <h2>{{event.title}}</h2>
          <p>{{event.description}}</p>
          <p>{{event.month}}/{{event.day}}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  data(){
    return {
      events: [],
    }
  },
  created(){
    this.getEvents();
  },
  methods: {
    async getEvents(){
      try{
        let response = await axios.get("/api/events");
        this.events = response.data;
        this.ascendingDate();
        return true;
      } catch (error){
        console.log(error);
      }
    },
    ascendingDate(){
      this.events.sort(function(a,b){
        if(a.month > b.month)
          return 1;
        if(a.month < b.month)
          return -1;
        if(a.month === b.month){
          if(a.day > b.day)
            return 1;
          if(a.day < b.day)
            return -1;
        }
        return 0;
      });
    },
  }
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}

#eventContainer{
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.event{
  flex:20%;
  max-width: 25%;
  text-align: center;
  background-color: #ffe5e5;
  border: 1px solid #ff478e;
  border-radius: 1pc;
  margin: 0 2px 5px 2px;
}

</style>
