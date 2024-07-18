import { useEffect, useState } from 'react';
import NewsBaner from '../../NewsBaner/NewsBaner';
import styles from './styles.module.css'
import { getNews } from '../../../api/apiNews';
import NewsList from '../../NewsList/NewsList';
import Skeleton from '../../Skeleton/Skeleton';

const Main = () => {
	const [news, setNews] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		const fetchNews = async () => {
			try {
				setIsLoading(true)
				const response = await getNews();
				setNews(response.news);
				setIsLoading(false)
			}
			catch (error) {
				console.log(error);
			}
		}
		fetchNews();

	},[])
  return (
	<div>
		<main className={styles.main} >
			{news.length > 0 && !isLoading ? (
				<NewsBaner item={news[0]} />
			) : (
				<Skeleton type='banner' count={1}/>
			)}
			{!isLoading ? (
				<NewsList news={news} />
			) : (
				<Skeleton type='item' count={10}/>
			)}
		</main>
	</div>
  )
}

export default Main;
