<template>
    <form class="chat-form" v-on:submit="onSubmit" >
        <div class="form-group">
            <label for="name">name:</label>
            <input
                id="name"
                type="text"
                class="form-control"
                required
                v-model="name"
            >
        </div>
        <div class="form-group" >
            <label for="text">text</label>
            <textarea
                name="text"
                id="text"
                cols="30"
                rows="10"
                class="form-control"
                required
                v-model="text"
            ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                name: "",
                text: ""
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault();

                this.$parent.sendMessage(
                    this.name + "(vue)",
                    this.text,
                    "right",
                );

                this.text = "";
            }
        }
    }
</script>