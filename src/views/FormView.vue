<script lang="ts">
import Vue from "vue";
import FormComponent from "@/components/form.vue";
import TextComponent from "@/components/text.vue";
export default Vue.extend({
  name: "FormView",
  components: {
    FormComponent,
    TextComponent,
  },
  computed: {
    selectedUser() {
      return this.$store.getters["user/user"];
    },
  },
});
</script>
<template>
  <div>
    <TextComponent
      :text="`Welcome ${selectedUser.firstName}`"
      type="h2"
    ></TextComponent>
    <FormComponent>
      <!-- TODO add relevant components to render form here -->
    </FormComponent>
  </div>
</template>
