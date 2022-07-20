//npm i axios
import Layout from '../common/Layout';
import { useSelector } from 'react-redux';

function Department() {
	const path = process.env.PUBLIC_URL;
	const members = useSelector((store) => store.memberReducer.members);

	return (
		<Layout name={'Department'}>
			{members.map((member, idx) => {
				return (
					<article key={idx}>
						<div className='inner'>
							<div className='picFrame'>
								<div className='shadow'>
									<img src={`${path}/img/${member.pic}`} alt={member.name} />
								</div>
								<div className='pic'>
									<img src={`${path}/img/${member.pic}`} alt={member.name} />
								</div>
							</div>
							<h3>{member.name}</h3>
							<p>{member.position}</p>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}

export default Department;
