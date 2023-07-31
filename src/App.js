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
	- 기존엔 한번 렌더링 연산이 시작되면 멈출수 없었음
	- 때문에 특정 핸들러 함수에 의해 화면을 재 연산해야 되는 로직을 수행하면 개중 무거운 연산이 있을때 나머지 연산도 같이 지연이 일어나 
	- 대형 화면 렌더링때 페이지 지연 발생
	- 연산에 우선순위를 둬서 좀 늦게 실행해도 될 것들을 지정
	
*/
