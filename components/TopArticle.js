import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../reducers/bookmarks';
import styles from '../styles/TopArticle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';


function TopArticle(props) {

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

	return (
		
		<div className={styles.topContainer}>
			<a className={styles.outLink} href={props.url} target="_blank" rel="noopener noreferrer">
				<img src={props.urlToImage} className={styles.image} alt={props.title} />
			</a>
			<div className={styles.topText}>
				<a className={styles.outLink} href={props.url} target="_blank" rel="noopener noreferrer">
					<h2 className={styles.topTitle}>{props.title}</h2>
				</a>
				<FontAwesomeIcon onClick={() => handleBookmarkClick()} icon={faBookmark} style={iconStyle} className={styles.bookmarkIcon} />
				<a className={styles.outLink} href={props.url} target="_blank" rel="noopener noreferrer">
					<h4>{props.author}</h4>
					<p>{props.description}</p>
				</a>
			</div>
		</div>
		
	);
}

export default TopArticle;
