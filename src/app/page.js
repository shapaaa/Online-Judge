'use client';
import axios from 'axios';
export default function Home() {
	const handleClick = async () => {
		const user = { name: 'Chinamy', email: 'name@gmail.com', password: 'ssp@1234' };
		const response = await axios.post('/api/signup', user);
		console.log('clicked');
		console.log(response);
	};
	return (
		<div>
			<button onClick={handleClick}>Click</button>
		</div>
	);
}
