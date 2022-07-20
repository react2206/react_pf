import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import { useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Vids() {
	const { youtube } = useSelector((store) => store.youtubeReducer);
	return (
		<section id='vids' className='myScroll'>
			<Swiper
				modules={[Pagination, Navigation, Autoplay]}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				spaceBetween={60}
				loop={true}
				slidesPerView={3}
				centeredSlides={true}
				autoplay={{
					delay: 2000,
					disableOnInteraction: true,
				}}>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return;
					return (
						<SwiperSlide key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img
										src={vid.snippet.thumbnails.standard.url}
										alt={vid.snippet.title}
									/>
								</div>
								<h2>{vid.snippet.title}</h2>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</section>
	);
}

export default Vids;
