<template>
  <div id="app">
    <div class="inApp">
      <!-- <Header></Header> -->
      <TabBar></TabBar>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <!-- <Login></Login> -->
    </div>
  </div>
</template>
<script>
import Header from "./components/Header/Header.vue";
import Main from "./views/Main/Main.vue";
import TabBar from './components/TabBar/TabBar.vue';
// import Login from './components/Login/Login.vue';
export default {
  name: "App",
  components: {
    Header,
    Main,
    TabBar
    // Login
  },
};
</script>

<style lang="less">
// @import './assets/public.less';

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
.inApp {
  
  max-width: 1200px;
  margin: 0 auto;
}

// /* 中型大小设备（横屏的平板, 小于 768px） */
// @media only screen and (max-width: 768px) {
//   .inApp {
//     width: 500px;
//   }
// }
// /* 大型设备（电脑, 大于 768和小于1200） */
// @media only screen and (min-width: 768px) and (max-width: 1200px) {
//   .inApp {
//     width: 1000px;
//   }
// }
// /* 超大型设备（大尺寸电脑屏幕, 大于 1200px） */
// @media only screen and (min-width: 1200px) {
//   .inApp {
//     width: 1200px;
//   }
// }


</style>
