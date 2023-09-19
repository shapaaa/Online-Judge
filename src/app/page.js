'use client';
import axios from 'axios';
export default function Home() {
	const cppCode = `
	#include <iostream>
	int main() {
	  int a, b, c;
	  std::string str;
	  std::cin >> a >> b >> c;
	  std::getline(std::cin, str);
	  std::cout << "Total: " << (a + b + c) << std::endl;
	  std::cout<<str<< std::endl;
	  return 0;
	}
`;

	const handleClick = async () => {
		const question = {
			language: 'cpp',
			program: cppCode,
			inputs: [`34 23 32 "Hello World"`, `34 23 32 "Hello World"`],
		};
		const response = await axios.post('/api/run', question);
		console.log(response);
	};
	return (
		<div>
			<button onClick={handleClick}>Click</button>
		</div>
	);
}
