import { useState, useEffect } from 'react';
import axios from 'axios';

//promise객체를 인수로 받아 상태에 따라 반환되는 값을 리턴해주는 함수를 반환
const promiseWrapper = (promise) => {
	let status = 'pending';
	let result;

	const s = promise.then(
		(value) => {
			status = 'success';
			result = value;
		},
		(error) => {
			status = 'error';
			result = error;
		}
	);

	return () => {
		switch (status) {
			case 'pending':
				throw s;
			case 'success':
				return result;
			case 'error':
				throw result;
			default:
				throw new Error('Unknown status');
		}
	};
};

function useGetData(url) {
	const [resource, setResource] = useState(null);

	useEffect(() => {
		const getData = async () => {
			const promise = await axios.get(url).then((response) => response.data);
			console.log('promise', promise);
			//console.log('promise', promise);
			//console.log('promiseWrapper', promiseWrapper(promise));
			//setResource(promiseWrapper(promise));
			setResource(promise);
		};

		getData();
	}, [url]);

	console.log('resource', resource);

	return resource;
}

export default useGetData;
