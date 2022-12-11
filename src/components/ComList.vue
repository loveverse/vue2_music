<template>
  <div>
    aa
    <!-- <template  -->
    <!-- <el-menu-item :index="menuItem.path" v-if="!menuItem.children.length"
      >>{{ menuItem.title }}</el-menu-item
    > -->
    <!-- </template> -->
    <!-- <template v-else> -->
    <!-- <el-sub-menu :index="menuItem.path" v-else>
      <List :menuItem="menuItem.children"></List>
    </el-sub-menu> -->
    <!-- </template> -->
  </div>
</template>
<script setup lang="ts" name="ComList">
const props = withDefaults(defineProps<{}>(), {
  menuItem: {
    required: true,
    type: () => {},
  },
});
// onMounted(() => {
//   console.log("[ props.item ] >", props);
// });
</script>
<style lang="scss" scoped></style>
