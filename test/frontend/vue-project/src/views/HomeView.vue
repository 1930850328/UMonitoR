<template>
  <div class="about">
    <el-button type="primary" @click="jsErr">js错误</el-button>
    <el-button type="primary" @click="xhrErr">xhr错误</el-button>
    <el-button type="primary" @click="fetchErr">fetch错误</el-button>
    <el-button type="primary" @click="unhandlerErr">异步错误</el-button>
  </div>
</template>
<script>
export default {
  name: "",
  methods: {
    fn(name, content) {
      if (!name) return;
      if (typeof content !== "string") {
        content = JSON.stringify(content);
      }
      window.sessionStorage.setItem(name, content);
    },
    jsErr() {
      var num = new Number(12.34);
      console.log(num.toFixed(-1));
    },
    xhrErr() {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:3000/api", true);
      xhr.send();
    },
    fetchErr() {
      fetch("https://jsonplaceholder.typicode.com/posts/a", {
        method: "POST",
        header: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: { id: 1 },
      });
    },
    unhandlerErr() {
      new Promise((resolve) => {
        let person = {};
        person.name.age();
        resolve();
      });
    },
  },
};
</script>
