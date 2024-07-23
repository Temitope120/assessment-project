<script lang="ts">
import Vue from "vue";
import FormComponent from "@/components/form.vue";
export default Vue.extend({
  name: "FormView",
  components: {
    FormComponent,
  },
});
</script>
<template>
  <div>
    <!-- TODO placeholder, remove this text -->
    <p>Form View</p>
    <FormComponent>
      <address-history></address-history>
    </FormComponent>
  </div>
</template>

<script lang="ts">
import AddressHistory from "./AddressHistory.vue";


</script>
