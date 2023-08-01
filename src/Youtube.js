import { useYoutubeQuery } from './hooks/useYoutubeQuery';

function Youtube() {
	const { data, isSuccess } = useYoutubeQuery();

	return (
		<div>
			<h1>Youtube</h1>
			{isSuccess &&
				data.map((vid, idx) => {
					return (
						<article key={idx}>
							<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
						</article>
					);
				})}
		</div>
	);
}

export default Youtube;
