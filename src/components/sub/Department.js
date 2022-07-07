//npm i axios
import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Department() {
	const path = process.env.PUBLIC_URL;
	const [Members, setMembers] = useState([]);

	useEffect(() => {
		axios.get(`${path}/DB/members.json`).then((json) => {
			setMembers(json.data.members);
		});
	}, []);

	useEffect(() => {
		console.log(Members);
	}, [Members]);

	return (
		<Layout name={'Department'}>
			<p>Department content</p>
		</Layout>
	);
}

export default Department;
