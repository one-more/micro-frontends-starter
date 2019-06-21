<script>
    import {store} from "~/store";
    import {xChatActions} from "~/modules/x-chat";

    function handleSubmit(event) {
        event.preventDefault();

        store.dispatch(
            xChatActions.sendMessage(
                name + "(svelte)",
                text,
                "left"
            )
        );

        text = ""
    }

    let name = "";
    let text = "";
</script>

<form class="chat-form" on:submit={handleSubmit} >
    <div class="form-group">
        <label for="name">name:</label>
        <input
            id="name"
            type="text"
            class="form-control"
            bind:value={name}
            required
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
            bind:value={text}
            required
        ></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>