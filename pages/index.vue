<template>
  <div>
    <div class="p-5">
      <div class="mb-4">
        <form @submit.prevent="onSubmit">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="text"
            type="text"
            placeholder="Text Something..."
            v-model="message"
          />
        </form>
      </div>
    </div>

    <div v-if="allMessages" class="p-5">
      <div v-for="item in allMessages" :key="item.index" class="grid grid-cols-2 gap-4">
        <h1>
          <span class="text-green-700">Author:</span>
          {{item.author}}
        </h1>
        <h2>
          <span class="text-purple-600">Text:</span>
          {{item.body}}
        </h2>
      </div>
    </div>
    <div v-else>
      <h1>Loading...</h1>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    fetch("http://localhost:3000/api/send-text")
      .then((response) => response.json())
      .then((data) => {
        this.allMessages = data;
      });
  },
  data() {
    return {
      message: null,
      allMessages: [],
    };
  },
  methods: {
    onSubmit() {
      fetch(
        `http://localhost:3000/api/send-text?text=${this.message}`
      ).catch((e) => console.log(e));

      this.message = null;
    },
  },
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
