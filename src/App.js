import { useState } from 'react';

function fetchSomething() {
	return new Promise((res) => setTimeout(res, 100));
}

function App() {
	const [Count, setCount] = useState(0);
	const [Count2, setCount2] = useState(0);

	const handleClick = () => {
		fetchSomething().then(() => {
			setCount((c) => c + 1);
			setCount2((c) => c + 2);
		});
		//setCount(Count + 1);
		//setCount2(Count2 + 1);
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
