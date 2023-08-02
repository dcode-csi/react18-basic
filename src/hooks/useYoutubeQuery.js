import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchYoutube = async () => {
	const key = 'AIzaSyCF8SOz4Cchg53VOMXZe0un2AC7zEP2apU';
	const list = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
	const num = 1;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;
	const response = await axios.get(url);
	return response.data.items;
};

export const useYoutubeQuery = () => {
	return useQuery(['youtubeData'], fetchYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 0,
		staleTime: 0,
		suspense: true,
	});
};
