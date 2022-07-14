import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

function Vids() {
	return (
		<section id='vids' className='myScroll'>
			<Swiper
				modules={[Pagination]}
				pagination={{
					clickable: true,
				}}
				spaceBetween={60}
				loop={true}
				slidesPerView={3}
				centeredSlides={true}>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
				<SwiperSlide>Slide 5</SwiperSlide>
			</Swiper>
		</section>
	);
}

export default Vids;
