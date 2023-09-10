'use client';
import axios from 'axios';
export default function Home() {
	const handleClick = async () => {
		const user = { name: 'Shardul1', email: 'sspathak200@gmail.com', password: 'ssp@1234' };
		const response = await axios.post('/api/signup', user);
		console.log(response);
	};
	return (
		<div>
			<button onClick={handleClick}>Click</button>
		</div>
	);
}
