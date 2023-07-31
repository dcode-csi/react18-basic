import { useState, useTransition } from 'react';

function App() {
	const [Count, setCount] = useState(0);
	const [Items, setItems] = useState([]);
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		//urgent
		setCount(Count + 1);

		//transition update (not urgent)
		startTransition(() => {
			const arr = Array(10000)
				.fill(1)
				.map((el, idx) => Count + 10000 - idx);

			setItems(arr);
		});
	};

	return (
		<div className='App'>
			<button onClick={handleClick} disabled={isPending}>
				{Count}
			</button>
			{isPending ? <p>Loading...</p> : null}
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
