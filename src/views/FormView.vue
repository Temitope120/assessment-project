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
import { defineComponent } from 'vue';
import AddressHistory from './AddressHistory.vue';

export default defineComponent({
  components: {
    AddressHistory,
  },
});
</script>