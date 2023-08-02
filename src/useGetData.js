import { useState, useEffect } from 'react';
import axios from 'axios';

//promise객체를 인수로 받아 상태에 따라 반환되는 값을 리턴해주는 함수를 반환
const promiseWrapper = (promise) => {
	let status = 'pending';
	let result;

	//promise의 상태에 따라 현재 상태값과 반환값을 각각  status, result에 담아줌
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

	//status값에 따라 에러  혹은 fetching결과값을 반환하는 함수를 리턴
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
			//데이터 요청후 현재 데이터 상태를 확인하는 promise객체 자체를 비동기적으로 받음
			const promise = axios.get(url).then((response) => response.data);
			//해당 promise객체를 promiseWrapper를 이용하여 직접 동기화하는 커스텀 함수 호출후 결과값을 리턴
			setResource(promiseWrapper(promise));
		};

		getData();
	}, [url]);

	//console.log('resource', resource);

	return resource;
}

export default useGetData;
