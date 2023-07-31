import { useState } from 'react';

function App() {
	const [Count, setCount] = useState(0);
	const [Items, setItems] = useState([]);

	const handleClick = () => {
		setCount(Count + 1);
		const arr = Array(20000)
			.fill(1)
			.map((el, idx) => Count + 20000 - idx);

		setItems(arr);
	};

	return (
		<div className='App'>
			<button onClick={handleClick}>{Count}</button>
			<ul>
				{Items.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</div>
	);
}

export default App;

/*
	useTransition 
	- 연산에 우선순위를 둬서 좀 늦게 실행해도 될 것들을 지정
*/
