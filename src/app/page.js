'use client';
import axios from 'axios';
export default function Home() {
	const handleClick = async () => {
		const question = {
			language: 'cpp',
			program: '#include <iostream>using namespace std;int main(){cout << "Hello World";return 0;}',
		};
		// email: 'sspathak200@gmail.com',
		// password: 'ssp@1234',
		const response = await axios.post('/api/run', question);
		console.log(response);
	};
	return (
		<div>
			<button onClick={handleClick}>Click</button>
		</div>
	);
}
