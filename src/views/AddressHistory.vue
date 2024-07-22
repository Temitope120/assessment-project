<template>
  <b-form @submit.prevent="handleSubmit">
    <div v-for="(address, index) in addresses" :key="index" class="mb-3">
      <b-form-group :label="'Address Line 1 ' + (index + 1)">
        <b-form-input v-model="address.addressLine1" required></b-form-input>
      </b-form-group>
      <b-form-group :label="'Postcode ' + (index + 1)">
        <b-form-input
          v-model="address.postcode"
          @input="autocompletePostcode(index)"
          required
        ></b-form-input>
        <b-list-group v-if="address.suggestions.length">
          <b-list-group-item
            v-for="suggestion in address.suggestions"
            :key="suggestion"
            @click="selectSuggestion(index, suggestion)"
            class="autocomplete-suggestion"
          >
            {{ suggestion }}
          </b-list-group-item>
        </b-list-group>
      </b-form-group>
      <b-form-group :label="'Date Moved In ' + (index + 1)">
        <b-form-input
          type="date"
          v-model="address.dateMovedIn"
          required
        ></b-form-input>
      </b-form-group>
    </div>
    <b-button @click="addAddress" v-if="addresses.length < 3"
      >Add Address</b-button
    >
    <b-button type="submit">Submit</b-button>
    <div v-if="errors.length" class="mt-3">
      <div v-for="(error, index) in errors" :key="index" class="text-danger">
        {{ error }}
      </div>
    </div>
  </b-form>
</template>

<script lang="ts">
import defineComponent from "vue";
import {
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BListGroup,
  BListGroupItem,
} from "bootstrap-vue";
import axios from "axios";

interface Address {
  addressLine1: string;
  postcode: string;
  dateMovedIn: string;
  suggestions: string[];
}

export default defineComponent({
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BListGroup,
    BListGroupItem,
  },
  data() {
    return {
      addresses: [
        { addressLine1: "", postcode: "", dateMovedIn: "", suggestions: [] },
      ] as Address[],
      errors: [] as string[],
    };
  },
  methods: {
    addAddress() {
      this.addresses.push({
        addressLine1: "",
        postcode: "",
        dateMovedIn: "",
        suggestions: [],
      });
    },
    async autocompletePostcode(index: number) {
      const postcode = this.addresses[index].postcode;
      if (postcode.length < 3) {
        this.addresses[index].suggestions = [];
        return;
      }

      try {
        const response = await axios.get(
          `https://api.postcodes.io/postcodes/${postcode}/autocomplete`
        );
        if (response.data.result) {
          this.addresses[index].suggestions = response.data.result;
        }
      } catch (error) {
        console.error("Error fetching postcode data:", error);
      }
    },
    selectSuggestion(index: number, suggestion: string) {
      this.addresses[index].postcode = suggestion;
      this.addresses[index].suggestions = [];
    },
    handleSubmit() {
      this.errors = [];
      if (this.addresses.length === 0) {
        this.errors.push("Please add at least one address.");
        return;
      }
      const now = new Date();
      let totalMonths = 0;
      this.addresses.forEach((address) => {
        const dateMovedIn = new Date(address.dateMovedIn);
        const months =
          (now.getFullYear() - dateMovedIn.getFullYear()) * 12 +
          (now.getMonth() - dateMovedIn.getMonth());
        totalMonths += months;
      });
      if (totalMonths < 36) {
        this.errors.push("Address history must cover at least 3 years.");
      }
      if (this.errors.length === 0) {
        // Submit the form
        console.log("Form submitted", this.addresses);
      }
    },
  },
});
</script>

<style scoped>
.autocomplete-suggestion {
  cursor: pointer;
}
.text-danger {
  color: red;
}
</style>
