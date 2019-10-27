import React from 'react'

const Header = props =>
  <h1>{props.course}</h1>

const Total = props => {
	const a = props.parts.map(p => p.exercises)
	const total = a.reduce( (s, p) => s + p)  
	return <p style={{fontWeight: 'bold'}}>yhteensä {total} tehtävää</p>
}
  

const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = props => {
  return(
  <div>
    {props.parts.map((p,i) => <div key={i}> <Part part={p} /> </div>)}
  </div>
  )
}

const Course = ({course}) => {
	return (
	<div>
		<Header course={course.name} />
    	<Content parts={course.parts} />
    	<Total parts={course.parts} />
    </div>
	)
}

export default Course