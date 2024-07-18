import { useEffect, useState } from 'react';
import NewsBaner from '../../NewsBaner/NewsBaner';
import styles from './styles.module.css'
import { getNews } from '../../../api/apiNews';
import NewsList from '../../NewsList/NewsList';
import Skeleton from '../../Skeleton/Skeleton';
import Pagination from '../../Pagination/Pagination';

const Main = () => {
	const [news, setNews] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const totalPages = 10
	const pageSize = 10

	const fetchNews = async (currentPage) => {
			try {
				setIsLoading(true)
				const response = await getNews(currentPage,pageSize);
				setNews(response.news);
				setIsLoading(false)
			}
			catch (error) {
				console.log(error);
			}
		}
	useEffect(() => {
		
		fetchNews(currentPage);

	},[currentPage])

	const handleNextPage = () => {
		if(currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}
	const handlePreviousPage = () => {
		if(currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}
	const handlePageClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}
  return (
	<div>
		<main className={styles.main} >
			{news.length > 0 && !isLoading ? (
				<NewsBaner item={news[0]} />
			) : (
				<Skeleton type='banner' count={1}/>
			)}
			<Pagination 
				handleNextPage={handleNextPage} 
				handlePreviousPage={handlePreviousPage} 
				handlePageClick={handlePageClick} 
				totalPages={totalPages} 
				currentPage={currentPage}
			/>
			{!isLoading ? (
				<NewsList news={news} />
			) : (
				<Skeleton type='item' count={10}/>
			)}
			<Pagination 
				handleNextPage={handleNextPage} 
				handlePreviousPage={handlePreviousPage} 
				handlePageClick={handlePageClick} 
				totalPages={totalPages} 
				currentPage={currentPage}
			/>
		</main>
	</div>
  )
}

export default Main;
