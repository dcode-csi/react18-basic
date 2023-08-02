import React from 'react';
import useGetData from './useGetData';

function CommentsComponent() {
	console.log('comments');
	const data = useGetData('https://jsonplaceholder.typicode.com/comments');

	return (
		<div>
			{data &&
				data.map((comment) => (
					<div key={comment.id} style={{ backgroundColor: 'pink' }}>
						<h2>{comment.title}</h2>
						<hr />
						<p>{comment.body}</p>
					</div>
				))}
		</div>
	);
}

export default CommentsComponent;
