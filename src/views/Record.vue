<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length"> Категорий пока нет. <router-link to="categories"> Добавить новую категорию</router-link> </p>

    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
          v-for="c in categories"
          :key="c.id"
          :value="c.id"
          >{{c.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid">
            Минимальное значение {{$v.amount.$params.minValue.min}}
          </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.minValue}"
        >
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >
            Введите описание
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {required, minValue} from 'vuelidate/lib/validators'

  export default {
    name: 'record',
    data: () => ({
      loading: true,
      select: null,
      categories: [],
      category: null,
      type: 'outcome',
      amount: 1,
      description: ''
    }),
    validations: {
      amount: {minValue: minValue(1)},
      description: {required}
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false

      if (this.categories.length){
        this.category = this.categories[0].id
      }
      setTimeout(() => {
        this.select = window.M.FormSelect.init(this.$refs.select)
        window.M.updateTextFields()
      }, 0)
    },
    methods: {
      handleSubmit() {
        if (this.$v.$invalid) {
          this.$v.touch()
          return
        }
      }
    },
    destroyed() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    }
  }
</script>
