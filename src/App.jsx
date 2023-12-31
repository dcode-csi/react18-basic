import React, { Suspense } from 'react';
import PostsComponent from './PostsComponent';
import CommentsComponent from './CommentsComponent copy';

function App() {
	return (
		<div className='App'>
			{/* 내부에 직접 promise객체의 상태를 반환하는 컴포넌트를 Suspense로 감싸면 해당 컴포넌트만 독립적으로 동기화처리 */}
			<Suspense fallback={<div>Loading Posts...</div>}>
				<h1>Post</h1>
				<PostsComponent />

				<Suspense fallback={<div>Loaind Comments ...</div>}>
					<h1>Comments</h1>
					<CommentsComponent />
				</Suspense>
			</Suspense>
		</div>
	);
}

export default App;

/*
	기존의 csr vs ssr방식 차이

	예전 ssr 작업흐름
	1. 정적 HTML파일 서버로부터 가져옴
	2. 추후 동적 데이터가 필요할때마다 다시 서버쪽에 요청해서 전체 화면 full로드 (화면 깜빡임)
	3. 이후 ajax라는 비동기 서버통신 기술이 생기면서 전체화면을 다시 full 로드하지 않고 필요한 데이터만 다시 호출가능
	4. 하지만 해당 데이터를 이용해 자바스크립트 일일이 동적 DOM을 생성하고 관리해야 되는 번거로움 존재

	csr 작업흐름
	1. 빈 HTML파일 서버로부터 가져옴
	2. 자바스크립트 파일 로드 (react);
	3. 리액트 컴포넌트 로드 (data-fetching)
	4. 컴포넌트 해석 후 렌더링 시작
	5. 최종 화면에 DOM생성 (이전까지는 계속 빈화면)

	react18에서의 ssr 작업흐름
	1. 서버로부터 static하게 생성된  html파일 로드
	2. 화면에 정적 html화면 바로 생성 (정적 화면 생성)
	3. 자바스크립트 로드
	4. 동적 데이터를 다루는 리액트 컴포넌트 해석후 기존 정적 화면에 동적인 부분만 대체 (hydration) suspense활용

	react18에서의 suspense
	- 각 페이지에 구성되어 있는 컴포넌트들을 동시에 호출하는 것이 아닌 영역별로 렌더링 시점을 동기화 가능
	- 이전 버전까지는 클라이언트 컴포넌트에서만 제한적으로 활용가능하였으나 18버전부터는 ssr방식의 컴포넌트에서도 활용가능하도록 개선
	- 활용예 : 특정 컴포넌트가 렌더링 완료될때까지 특정 컴포넌트의 렌더링을 막고 이전 컴포넌트 렌더링 완료후 동기적으로 렌더링 시작
	- 활용예 : 서버로부터 무거운 데이터를 fetching해야 되는 컴포넌트의 경우 해당 컴포넌트 출력전까지 로딩바 출력

	Next.js (pre-rendering)
	- 예전엔 정적인 화면만 미리 ssr방식으로 가져와서 이후 리액트 컴포넌트로 csr방식의 hydration이 일어났음
	- 아예 서버쪽에서 데이터를 fetching한 결과물을 프로젝트 빌드시에 미리 생성해서 바로 출력 (Stacit Site generation) 
	- 동적으로 자주바꾸는 데이터를 활용하는 컴포넌트의 경우 페이지 요청시 서버쪽에서 아예 데이터 fetching후 프리랜더링해서 클라이언트쪽에 전달 (Server Side Rendering)
	- 정기적으로 바뀌는 데이터를 활용하는 컴포넌트의 경우 따로 서버쪽에 요청이 없어더라도 일정 주기로 새롭게 갱신된 데이터로 서버쪽 pre rendering (Incremental Static Regeneration)

	
*/
