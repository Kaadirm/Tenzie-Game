import React from 'react'

function Dies({value}) {
  return (
    <>
        {value === 1 && (
            <div className={`dice-${value}`}>
                <span className="dot"> </span>
            </div>)}
        {value === 2 && (
			<div className={`dice-${value}`}>
				<span className="dot"></span>
				<span className="dot"></span>
			</div>
			)}
		{value === 3 && (
			<div className={`dice-${value}`}>
				<span className="dot"></span>
				<span className="dot"></span>
				<span className="dot"></span>
			</div>
			)}
		{value === 4 && (
			<div className={`dice-${value}`}>
				<div className="column">
					<span className="dot"></span>
					<span className="dot"></span>
			</div>
				<div className="column">
					<span className="dot"></span>
					<span className="dot"></span>
				</div>
			</div>
			)}
		{value === 5 && (
			<div className={`dice-${value}`}>
				<div className="column">
					<span className="dot"></span>
					<span className="dot"></span>
				</div>

				<div className="column">
					<span className="dot"></span>
				</div>

				<div className="column">
					<span className="dot"></span>
					<span className="dot"></span>
				</div>
			</div>
			)}
		{value === 6 && (
			<div className={`dice-${value}`}>
				<div className="column">
					<span className="dot"></span>
					<span className="dot"></span>
					<span className="dot"></span>
				</div>
				<div className="column">
					<span className="dot"></span>
					<span className="dot"></span>
					<span className="dot"></span>
				</div>
			</div>
		)}
    </>
  )
}

export default Dies