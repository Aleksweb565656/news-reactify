import { useEffect, useState } from 'react';
import NewsBaner from '../../NewsBaner/NewsBaner';
import styles from './styles.module.css'
import { getNews } from '../../../api/apiNews';
import NewsList from '../../NewsList/NewsList';

const Main = () => {
	const [news, setNews] = useState([])
	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await getNews();
				setNews(response.news);
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
			{news.length >0 ? <NewsBaner item={news[0]} /> : null}
			<NewsList news={news} />
		</main>
	</div>
  )
}

export default Main;
