'use client';
import axios from 'axios';
export default function Home() {
	const cppCode = `
	#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, w;
    cin >> n >> w;
    
    vector<int> array(n);
    for (int i = 0; i <n; i++) {
        cin >> array[i];
    }
    
    unordered_map<int, int> map;
    for (int i = -1; i < n; i++) {
        if (map.count(w - array[i])) {
            cout << (map[w - array[i]] + 1) << " " <<( i + 1 )<< endl;
            return 0;
        }
        map[array[i]] = i;
    }
    
    cout << array[-1] << endl;
    
    return 0;
}
`;

	const handleClick = async () => {
		// const testcase = {
		// 	questionId: '6509ada16d386922abe9a272',
		// 	input: `12 9
		// 	4 19 14 18 1 14 8 15 19 19 2 9`,
		// 	expectedOutput: `5 7`,
		// };
		const question = {
			language: 'cpp',
			program: cppCode,
			questionId: '6509ada16d386922abe9a272',
		};
		const response = await axios.post('/api/submit', question);
		console.log(response);
	};
	return (
		<div>
			<button onClick={handleClick}>Click</button>
		</div>
	);
}
