import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

const App = () => {
    const [tasks, setTasks] = useState([
        {
             id:1,
             text: 'Doctors Appointment',
             day: 'Feb 19th @ 2pm',
             reminder: true
        },
        {
            id:2,
            text: 'Football',
            day: 'Feb 29th @ 8pm',
            reminder: true
        },
        {
            id:3,
            text: 'Work Call',
            day: 'Feb 1st @ 4pm',
            reminder: true
        }]
    )
    return (
        <div className='container'>
            <h1>
                <Header title="Tasks"/>
                <Tasks tasks={tasks}/>
            </h1>
        </div>
    )
}

export default App