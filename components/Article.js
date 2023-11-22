import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../reducers/bookmarks';
import Image from 'next/image';
import styles from '../styles/Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import {  faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { savedHiddenArticles } from '../reducers/hiddenArticles';

function Article(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);

	const handleBookmarkClick = () => {
		if (!user.token) {
			return;
		}

		fetch(`https://morningnews-backend-eight.vercel.app/users/canBookmark/${user.token}`)
			.then(response => response.json())
			.then(data => {
				if (data.result && data.canBookmark) {
					if (props.isBookmarked) {
						dispatch(removeBookmark(props));
					} else {
						dispatch(addBookmark(props));
					}
				}
			});
	}

	let iconStyle = {};
	if (props.isBookmarked) {
		iconStyle = { 'color': '#E9BE59' };
	}

	const hiddeArticle = () => {
		dispatch(savedHiddenArticles(props))
	}

	return (
		!props.isHidden &&
		<div className={styles.articles}>			
			<div className={styles.articleHeader}>
				<a className={styles.outLink} href={props.url} target="_blank" rel="noopener noreferrer">
					<h3>{props.title}</h3>
				</a>
				<div className={styles.iconsFromArticles}>
					<FontAwesomeIcon onClick={() => handleBookmarkClick()} icon={faBookmark} style={iconStyle} className={styles.bookmarkIcon} />
					<FontAwesomeIcon icon={faEyeSlash} onClick={() => hiddeArticle()}/>
				</div>
			</div>			
			<a className={styles.outLink} href={props.url} target="_blank" rel="noopener noreferrer">
				<h4 style={{ textAlign: "right" }}>- {props.author}</h4>
				<div className={styles.divider}></div>
				<Image src={props.urlToImage} alt={props.title} width={600} height={314} />
				<p>{props.description}</p>
			</a>
		</div>
	);
}

export default Article;
