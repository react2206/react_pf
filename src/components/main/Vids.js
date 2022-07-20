import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import { useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Popup from '../common/Popup';
import { useRef, useState } from 'react';

function Vids() {
	const pop = useRef(null);
	const swiperRef = useRef(null);
	const [Index, setIndex] = useState(0);
	const { youtube } = useSelector((store) => store.youtubeReducer);
	return (
		<>
			<section id='vids' className='myScroll'>
				<Swiper
					ref={swiperRef}
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
									<div
										className='pic'
										onClick={() => {
											setIndex(idx);
											pop.current.open();
											//스와이퍼 컴포넌트를 참조한 다음 autoplay.stop()메서드로 특정 이벤트 발생시 자동롤링기능 제어가능
											swiperRef.current.swiper.autoplay.stop();
										}}>
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

			<Popup ref={pop}></Popup>
		</>
	);
}

export default Vids;
