const tasks = [
    {id:1,name:"Tarea1",completed:false,assigned:"Daniel"},
    {id:2,name:"Tarea2",completed:true,assigned:"yady"},
    {id:3,name:"Tarea3",completed:false,assigned:"Erick"}
];

const TodoList = () => {
    return (
        <ul>
            {tasks.map(task => (
            <li key={task.id} >{task.name}

            </li>))}
        </ul>
    )
}