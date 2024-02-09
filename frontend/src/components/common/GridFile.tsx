import React, { useContext, useState } from "react";
import CarouselFile from "./CarouselFile";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { handleDate } from "utils/DateFormat";
import { Link } from "react-router-dom";
import FileActionMenu from "./dropdown/FileActionMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { fileContext } from "utils/context/FileContext";
export type GridFileProps = {
	filesCarousel: Array<{
		id: number;
		filename: string;
		content: string;
		createdAt: string;
		isPublic: boolean;
		language: {
			name: string;
		};
	}>;
	title: string;
};

const GridFile = ({ title, filesCarousel }: GridFileProps) => {
	const { setFileId } = useContext(fileContext);

	const [isActionOpen, setIsActionOpen] = useState<number | null>(null);

	const HandleToggleAction = (id: number) => {
		if (isActionOpen === id) {
			setIsActionOpen(null);
			return;
		}
		setIsActionOpen(id);
		setFileId(id);
	};
	const settings = {
		dots: true,
		infinite: false,
		speed: 600,
		slidesToShow: 4,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
				},
			},
		],
	};

	return (
		<div className="container-title-carousel">
			<div className="container-title">
				<h3>{title}</h3>
			</div>

			<div className="container-carousel">
				<Slider {...settings}>
					{filesCarousel.map((file) => (
						<div className="main-card-carousel" key={file.id}>
							<div className="action-container">
								<button
									onClick={() => HandleToggleAction(file.id)}
									className="action-button"
								>
									<FontAwesomeIcon icon={faEllipsis} size="xl" />
								</button>
								{isActionOpen === file.id ? <FileActionMenu /> : null}
							</div>

							<Link to={`/coding/${file.id}`}>
								<CarouselFile
									filename={file.filename}
									content={file.content}
									createdAt={handleDate(file.createdAt)}
									isPublic={file.isPublic}
									language={file.language.name}
								/>
							</Link>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default GridFile;

// <div className="container-carousel-no-slider">
//   {filesCarousel.map((file) => (
//     <CarouselFile
//       key={file.id}
//       filename={file.filename}
//       content={file.content}
//       createdAt={handleDate(file.createdAt)}
//       isPublic={file.isPublic}
//     />
//   ))}
// </div>
