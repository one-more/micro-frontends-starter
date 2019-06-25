import {Todo} from './store.imba'

export tag App
    prop todos

    def addTodo
        @todos.push Todo.new(@newTodoTitle)
        @newTodoTitle = ""

    def toggleTodo todo
        todo.done = !todo.done
        console.log "Toggle todo",todo.title

    def render
        <self>
            <form.header :submit.prevent.addTodo>
                <input[@newTodoTitle] placeholder="Add...">
                <button type='submit'> 'Add item'
            <ul> for todo in @todos
                <li .done=(todo.done) :tap.toggleTodo(todo)> todo.title


export def start root
    Imba.mount <App.vbox todos=[]>, root