import { useState } from 'react';
import { flushSync } from 'react-dom';

function fetchSomething() {
	return new Promise((res) => setTimeout(res, 100));
}

function App() {
	const [Count, setCount] = useState(0);
	const [Count2, setCount2] = useState(0);

	const handleClick = () => {
		fetchSomething().then(() => {
			//flushSync를 활용하면 예전처럼 State마다 개별적으로 리랜더 가능
			flushSync(() => setCount((c) => c + 1));
			setCount((c) => c + 1);
			setCount2((c) => c + 2);
		});
	};

	console.log('Rendered!!');

	return (
		<div className='App'>
			<h1>
				{Count}-{Count2}
			</h1>
			<button onClick={handleClick}>button</button>
		</div>
	);
}

export default App;

/*
	Automatic Batching
	- 특정 이벤트 핸들러 함수 안쪽에서 복수개의 State가 변경될때 한번에 묶어서 한번만 리랜더 처리
	- react17버전에서는 위와 같이 promise를 반환하는 동기 구문 콜백 안쪽에서 복수개의 state가 변경되면 여러번 리랜더가 일어남
*/
