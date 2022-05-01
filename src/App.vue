<template>
  <div id="app">
    <div class="inApp">
      <TabBar></TabBar>
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </div>
      <!-- <img src="https://api.ixiaowai.cn/api/api.php" alt=""> -->
  </div>
</template>
<script>
import TabBar from "./components/TabBar/TabBar.vue";
export default {
  name: "App",
  components: {
    TabBar,
  },
};
</script>

<style lang="less">
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  text-decoration: none;
}
#app {
  max-width: 1220px;
  margin: 0 auto;
}
.inApp {
  margin: 0 10px;
}

// body {
//   background: url("https://api.ixiaowai.cn/api/api.php") center/cover no-repeat;
//   // filter: blur(0.3);
// }
</style>
