<template>
  <div>
    <div>
      <span @click="click">测试</span>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    let s = new URLSearchParams();
    s.set('answer', 42);
    // Example POST method implementation:
    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: s.toString() // body data type must match "Content-Type" header
      });
      return response; // parses JSON response into native JavaScript objects
    }

    postData('http://localhost:3000/post-test/', { answer: 42 })
      .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
      });
  },
  methods: {
    click(e) {
      console.log(e);
    },
  }
};
</script>
