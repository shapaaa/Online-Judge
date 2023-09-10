'use client';
import axios from 'axios';
import { useEffect } from 'react';
export default function verifyUserEmail({ params: userInfo }) {
	useEffect(() => {
		const verifyEmailToken = async () => {
			try {
				const res = await axios.post('/api/verifyEmailToken', userInfo);
				console.log(res);
			} catch (error) {
				console.log(error.message);
			}
		};
		verifyEmailToken();
	}, []);
	return <div>Verify</div>;
}
