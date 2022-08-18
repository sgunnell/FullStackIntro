import React from "react"

const Course = ({courses}) =>
    <div>
        {courses.map(course=>
            <div key = {course.id}>
                <Header name={course.name} />
                <Content parts={course.parts} />
                <Total  parts ={course.parts}/>
            </div>
        )}
    </div>


const Header = ({name}) => <h1> {name}</h1>

const Content = ({parts}) => 
    <div>
        {parts.map(part => 
            <Part key = {part.id} part = {part}/>
        )}
    </div>



const Part = ({part}) => 
    <p>
        {part.name} {part.exercises}
    </p>

const Total = ({parts}) => {
   
    return (
        <p>
            Numer of exercises {parts.reduce((sum,part) => sum + part.exercises,0)}
        </p>
    )
}


export default Course