import React, {Component} from 'react';
import './App.css';
import TodoList from "./TodoList";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {tasks: []}
    }

    componentDidMount() {
        this.getTasks()
    }

    fetchJSON(endpoint, method = "GET", body = null) {
        return window.fetch(endpoint, {
            method: method,
            body: body,
            headers: {
                "Content-Type": "application/json",
                "access-token": "OvGURim4m_9a3ztN7EQYaw",
                "client": "JZZ8ZwbXkL2kdOrJlthyeQ",
                "uid": "cyrilfind@gmail.com",
            }
        })
            .then(response => response.json())
            .catch(error => console.log(error))
    }

    getTasks() {
        this.fetchJSON('/api/tasks')
            .then(tasks => {
                if (tasks) {
                    this.setState({tasks: tasks})
                } else {
                    this.setState({tasks: []})
                }
            })
    }

    putTask(task) {
        return this.fetchJSON('/api/tasks/' + task.id, "PUT", JSON.stringify(task))
    }

    postTask(task) {
        return this.fetchJSON('/api/tasks/', "POST", JSON.stringify({title: "New Task!"}))
    }

    onCheckTaskChanged(key, value) {
        let tasks = Object.assign(this.state.tasks);
        let task = tasks[key]
        task.done = value
        this.putTask(task).then(() => this.setState({tasks: tasks}))
    };

    onClickAdd() {
        this.postTask().then(task => {
            let tasks = Object.assign(this.state.tasks)
            tasks.unshift(task)
            this.setState({tasks: tasks})
        })
    }

    render() {
        return <TodoList onClickAdd={() => this.onClickAdd()}>
            {this.state.tasks.map(
                (item, key) =>
                    <ListItem key={key}>
                        <ListItemText>
                            <Checkbox checked={item.done} onChange={(event, value) =>
                                this.onCheckTaskChanged(key, value)
                            }/>
                            {item.title}
                        </ListItemText>
                    </ListItem>
            )}
        </TodoList>
    }
}

export default App